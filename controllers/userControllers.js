// controllers/userController.js
const User = require('../models/user');
const Entitlement = require('../models/entitlement');
const UserEntitlement = require('../models/userentitlements');

exports.createUser = async (req, res) => {
    try {
        const { username, firstName, lastName, email } = req.body;
        const user = await User.create({
            username,
            firstName,
            lastName,
            email
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.findAll({});
        res.json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

exports.getUserEntitlements = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: Entitlement });
        res.json(user ? user.Entitlements : 'User not found');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, firstName, lastName, email } = req.body;
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update({
                username,
                firstName,
                lastName,
                email
            });
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsersEntitlements = async(req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Entitlement,
                    through: UserEntitlement, // Explicitly specify the join table
                    attributes: ['entitlementName', 'application', 'attribute', 'value', 'displayName', 'iiqElevatedAccess', 'owner', 'requestable', 'classifications']
                }
            ]
        });
        console.log(users)
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function processEntitlements(entitlements) {
    const processedEntitlements = [];

    entitlements.forEach(item => {
        // Check if the item is a string that looks like a list
        if (typeof item === 'string' && item.startsWith('[') && item.endsWith(']')) {
            // Remove the outer brackets and split by commas
            const parsedItems = item
                .slice(1, -1) // Remove the square brackets
                .split(',')    // Split by commas
                .map(ent => ent.trim().replace(/^'|'$/g, '')); // Trim spaces and single quotes
            processedEntitlements.push(...parsedItems); // Add parsed items individually
        } else {
            // If it's a regular entitlement, add it directly
            processedEntitlements.push(item);
        }
    });

    return processedEntitlements;
}

exports.AssignRoles = async (req, res) => {
    const { username, entitlements } = req.body; // Expecting 'username' and 'entitlements' array in the request body()
    console.log(req.body)
    const newentitlements = processEntitlements(entitlements)

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ error: `User with username ${username} not found` });

        // Loop through each entitlement and assign it to the user
        for (const entitlementName of newentitlements) {
            // Find the entitlement by name
            const entitlement = await Entitlement.findOne({ where: { entitlementName } });
            if (!entitlement) {
                console.warn(`Entitlement ${entitlementName} not found, skipping.`);
                continue;
            }

            // Assign the entitlement to the user by creating a record in the join table
            await UserEntitlement.findOrCreate({
                where: { UserId: user.id, EntitlementId: entitlement.id }
            });
        }

        res.status(200).json({ message: `Roles [${newentitlements.join(", ")}] assigned to user ${username}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.RemoveRoles = async (req, res) => {
    const { username, entitlements } = req.body; // Expecting 'username' and 'entitlements' array in the request body

    if (!username || !entitlements || entitlements.length === 0) {
        return res.status(400).json({ error: "Username and entitlements are required" });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: `User with username ${username} not found` });
        }

        // Loop through each entitlement and remove it for the user
        for (const entitlementName of entitlements) {
            // Find the entitlement by name
            const entitlement = await Entitlement.findOne({ where: { entitlementName } });
            if (!entitlement) {
                console.warn(`Entitlement ${entitlementName} not found, skipping.`);
                continue;
            }

            // Remove the association between the user and the entitlement in the join table
            await UserEntitlement.destroy({
                where: {
                    UserId: user.id,
                    EntitlementId: entitlement.id,
                },
            });
        }

        res.status(200).json({
            message: `Roles [${entitlements.join(", ")}] removed from user ${username}`,
        });
    } catch (error) {
        console.error("Error removing roles:", error);
        res.status(500).json({ error: error.message });
    }
};
