// seedUsers.js

const sequelize = require('./config/config'); // Database configuration
const User = require('./models/user'); // User model

// User data
const userData = [
    {
        username: "niaz",
        firstName: "Niaz",
        lastName: "Ahmed",
        email: "niaz.ahmed@example.com"
    },
    {
        username: "janifar",
        firstName: "Janifar",
        lastName: "Wilson",
        email: "janifar.wilson@example.com"
    },
    {
        username: "waseef",
        firstName: "Waseef",
        lastName: "Khan",
        email: "waseef.khan@example.com"
    },
    {
        username: "alice",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com"
    },
    {
        username: "bob",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob.smith@example.com"
    }
];

// Function to seed users
const seedUsers = async () => {
  try {
    await sequelize.sync(); // Sync the database
    await User.bulkCreate(userData); // Bulk insert users
    console.log("Dummy users have been successfully created in the database.");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    sequelize.close();
  }
};

// Run the seed function
seedUsers();
