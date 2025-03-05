// seedUserEntitlements.js

const sequelize = require('./config/config'); // Database configuration
const User = require('./models/user'); // User model
const Entitlement = require('./models/entitlement'); // Entitlement model
const UserEntitlement = require('./models/userentitlements'); // UserEntitlement model

// Association data
const userEntitlementData = [
  // niaz with Normal User entitlements
  { username: "niaz", entitlementName: "L-norm_user-TP1" },
  { username: "niaz", entitlementName: "L-norm_user-TP2" },
  { username: "niaz", entitlementName: "L-norm_user-TP3" },

  // janifar with Supervisor User entitlements
  { username: "janifar", entitlementName: "P-supervisor-Qw1" },
  { username: "janifar", entitlementName: "P-supervisor-Qw2" },
  { username: "janifar", entitlementName: "P-supervisor-Qw3" },

  // waseef with Seller User entitlements
  { username: "waseef", entitlementName: "L-seller_user-XP1" },
  { username: "waseef", entitlementName: "L-seller_user-XP2" },
  { username: "waseef", entitlementName: "L-seller_user-XP3" },

  // alice with Buyer User entitlements
  { username: "alice", entitlementName: "k-buyer_user-zs1" },
  { username: "alice", entitlementName: "k-buyer_user-zs2" },
  { username: "alice", entitlementName: "k-buyer_user-zs3" },

  // bob with Admin User entitlements
  { username: "bob", entitlementName: "P-admin-AB1" },
  { username: "bob", entitlementName: "P-admin-AB2" },
  { username: "bob", entitlementName: "P-admin-AB3" }
];

// Function to seed user entitlements
const seedUserEntitlements = async () => {
  try {
    await sequelize.sync(); // Sync the database

    // Loop through association data and create user-entitlement relationships
    for (const { username, entitlementName } of userEntitlementData) {
      const user = await User.findOne({ where: { username } });
      const entitlement = await Entitlement.findOne({ where: { entitlementName } });
      
      if (user && entitlement) {
        await user.addEntitlement(entitlement); // Associate user with entitlement
      }
    }

    console.log("User-entitlement associations have been successfully created.");
  } catch (error) {
    console.error("Error seeding user entitlements:", error);
  } finally {
    sequelize.close();
  }
};

// Run the seed function
seedUserEntitlements();
