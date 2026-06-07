// require("dotenv").config();

// const app =
//   require("./app");

// const connectDB =
//   require("./config/db");

// // DB Connection
// connectDB();

// const PORT =
//   process.env.PORT ||
//   5000;

// app.listen(PORT, () => {
//   console.log(
//     `Server running on port ${PORT}`
//   );
// });

require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// INCREASE TIMEOUT TO 15 MINUTES
// This prevents the server from closing the connection during a 1GB upload
server.timeout = 900000; 
