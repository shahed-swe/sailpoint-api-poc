// routes/userRoutes.js
const express = require('express');
const { check } = require('express-validator');
const { createUser, getUserEntitlements, getAllUsers, getAllUsersEntitlements, AssignRoles, RemoveRoles, updateUser } = require('../controllers/userControllers');
const router = express.Router();

router.post('/', [
    check('username').notEmpty().withMessage('Username is required'),
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
], createUser);

router.put('/:id', [
    check('username').notEmpty().withMessage('Username is required'),
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
], updateUser);

router.get('/:id/entitlements', getUserEntitlements); // Get user's entitlements
router.get('/', getAllUsers) // get all users
router.get('/usersentitlements', getAllUsersEntitlements)
router.post('/assignroles', AssignRoles)
// router.delete('/removeroles', RemoveRoles)

module.exports = router;
