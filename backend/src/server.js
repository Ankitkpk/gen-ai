require("dotenv").config();

const connectToMongoDB = require("./config/database");
const app = require("./app");

connectToMongoDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});