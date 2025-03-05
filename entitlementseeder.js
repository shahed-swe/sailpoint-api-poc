const sequelize = require('./config/config');
const Entitlement = require('./models/entitlement');

const entitlementData = [
    // Normal User entitlements
    {
        entitlementName: "L-norm_user-TP1",
        application: "TestApp1",
        attribute: "NormalUser",
        value: "true",
        displayName: "Normal User Test Permission 1",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Normal Access"
    },
    {
        entitlementName: "L-norm_user-TP2",
        application: "TestApp2",
        attribute: "NormalUser",
        value: "true",
        displayName: "Normal User Test Permission 2",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Normal Access"
    },
    {
        entitlementName: "L-norm_user-TP3",
        application: "TestApp3",
        attribute: "NormalUser",
        value: "true",
        displayName: "Normal User Test Permission 3",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Normal Access"
    },

    // Supervisor entitlements
    {
        entitlementName: "P-supervisor-Qw1",
        application: "SuperApp1",
        attribute: "Supervisor",
        value: "true",
        displayName: "Supervisor Permission 1",
        iiqElevatedAccess: true,
        owner: "System Admin",
        requestable: false,
        classifications: "Supervisor Access"
    },
    {
        entitlementName: "P-supervisor-Qw2",
        application: "SuperApp2",
        attribute: "Supervisor",
        value: "true",
        displayName: "Supervisor Permission 2",
        iiqElevatedAccess: true,
        owner: "System Admin",
        requestable: false,
        classifications: "Supervisor Access"
    },
    {
        entitlementName: "P-supervisor-Qw3",
        application: "SuperApp3",
        attribute: "Supervisor",
        value: "true",
        displayName: "Supervisor Permission 3",
        iiqElevatedAccess: true,
        owner: "System Admin",
        requestable: false,
        classifications: "Supervisor Access"
    },

    // Seller entitlements
    {
        entitlementName: "L-seller_user-XP1",
        application: "SellerApp1",
        attribute: "Seller",
        value: "true",
        displayName: "Seller Permission 1",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Seller Access"
    },
    {
        entitlementName: "L-seller_user-XP2",
        application: "SellerApp2",
        attribute: "Seller",
        value: "true",
        displayName: "Seller Permission 2",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Seller Access"
    },
    {
        entitlementName: "L-seller_user-XP3",
        application: "SellerApp3",
        attribute: "Seller",
        value: "true",
        displayName: "Seller Permission 3",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Seller Access"
    },

    // Buyer entitlements
    {
        entitlementName: "k-buyer_user-zs1",
        application: "BuyerApp1",
        attribute: "Buyer",
        value: "true",
        displayName: "Buyer Permission 1",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Buyer Access"
    },
    {
        entitlementName: "k-buyer_user-zs2",
        application: "BuyerApp2",
        attribute: "Buyer",
        value: "true",
        displayName: "Buyer Permission 2",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Buyer Access"
    },
    {
        entitlementName: "k-buyer_user-zs3",
        application: "BuyerApp3",
        attribute: "Buyer",
        value: "true",
        displayName: "Buyer Permission 3",
        iiqElevatedAccess: false,
        owner: "System Admin",
        requestable: false,
        classifications: "Buyer Access"
    },

    // Admin entitlements
    {
        entitlementName: "P-admin-AB1",
        application: "AdminApp1",
        attribute: "Admin",
        value: "true",
        displayName: "Admin Permission 1",
        iiqElevatedAccess: true,
        owner: "System Admin",
        requestable: false,
        classifications: "Admin Access"
    },
    {
        entitlementName: "P-admin-AB2",
        application: "AdminApp2",
        attribute: "Admin",
        value: "true",
        displayName: "Admin Permission 2",
        iiqElevatedAccess: true,
        owner: "System Admin",
        requestable: false,
        classifications: "Admin Access"
    },
    {
        entitlementName: "P-admin-AB3",
        application: "AdminApp3",
        attribute: "Admin",
        value: "true",
        displayName: "Admin Permission 3",
        iiqElevatedAccess: true,
        owner: "System Admin",
        requestable: false,
        classifications: "Admin Access"
    }
];

const seedEntitlements = async () => {
    try {
        await sequelize.sync();
        await Entitlement.bulkCreate(entitlementData);
        console.log("Entitlements have been successfully created in the database.");
    } catch (error) {
        console.error("Error seeding entitlements:", error);
    } finally {
        sequelize.close();
    }
};

seedEntitlements();
