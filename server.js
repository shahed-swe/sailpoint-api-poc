// app.js
const express = require('express');
const sequelize = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const entitlementRoutes = require('./routes/entitlementRoutes');

const app = express();
app.use(express.json());


app.get("/", async(req, res) => {
    console.log("hello this is called")
    res.json({"message":"Hello World!!"})
})
app.use('/users', userRoutes);
app.use('/entitlements', entitlementRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server is running on port 3000'));
}).catch(error => console.error('Unable to connect to the database:', error));
