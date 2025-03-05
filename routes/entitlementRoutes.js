// routes/entitlementRoutes.js
const express = require('express');
const { createEntitlement, getEntitlements } = require('../controllers/entitlementControllers');
const router = express.Router();

router.post('/', createEntitlement); // Create a new entitlement
router.get('/', getEntitlements);    // Retrieve all entitlements

module.exports = router;
