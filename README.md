# Sailpoint Webservice POC

This project is a Proof of Concept (POC) for integrating with Sailpoint Identity Management using a Node.js webservice. It demonstrates user entitlement management and role-based access control functionalities.

## Purpose

- Demonstrate integration capabilities with Sailpoint IIQ
- Showcase user entitlement management
- Provide API endpoints for user and entitlement operations
- Simulate role-based access control scenarios

## Features

- User Management (CRUD operations)
- Entitlement Management
- User-Entitlement Associations
- Role-based Access Assignment
- Bulk Operations Support

## Technical Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL/PostgreSQL Database

## Project Structure

```
SailpointApp/
├── config/
│   └── config.js         # Database configuration
├── controllers/
│   ├── userControllers.js
│   └── entitlementControllers.js
├── models/
│   ├── user.js
│   ├── entitlement.js
│   └── userentitlements.js
├── routes/
│   ├── userRoutes.js
│   └── entitlementRoutes.js
└── seeders/
    ├── userseeder.js
    ├── entitlementseeder.js
    └── userentitlementseed.js
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure database in `.env` file:
   ```
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   ```
4. Run database seeders in order:
   ```bash
   node entitlementseeder.js
   node userseeder.js
   node userentitlementseed.js
   ```
5. Start the application:
   ```bash
   node server.js
   ```

## API Endpoints

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id/entitlements` - Get user's entitlements
- POST `/api/users` - Create new user
- PUT `/api/users/:id` - Update user
- GET `/api/users/usersentitlements` - Get all users with their entitlements

### Entitlements
- GET `/api/entitlements` - Get all entitlements
- POST `/api/users/assignroles` - Assign entitlements to user
- DELETE `/api/users/removeroles` - Remove entitlements from user

## Testing

The POC includes sample data for:
- Different user types (Normal, Supervisor, Seller, Buyer, Admin)
- Various entitlement levels
- Role-based access patterns

## Note

This is a POC implementation and should be enhanced with additional security measures before production use.
