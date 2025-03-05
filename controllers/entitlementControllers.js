// controllers/entitlementController.js
const Entitlement = require('../models/entitlement');

exports.createEntitlement = async (req, res) => {
  try {
    const entitlement = await Entitlement.create({
      entitlementName: req.body.entitlementName,
      application: req.body.application,
      attribute: req.body.attribute,
      value: req.body.value,
      displayName: req.body.displayName,
      iiqElevatedAccess: req.body.iiqElevatedAccess,
      owner: req.body.owner,
      requestable: req.body.requestable,
      classifications: req.body.classifications
    });
    res.json(entitlement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEntitlements = async (req, res) => {
  try {
    const entitlements = await Entitlement.findAll();
    res.json(entitlements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
