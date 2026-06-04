require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./config/database");
const app = require("./app");

connectToMongoDB();


app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});