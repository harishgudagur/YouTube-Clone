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

// DEBUGGING: This will show up in your Render logs
console.log("Checking app type:", typeof app); 
console.log("App content:", app);

connectDB();

const PORT = process.env.PORT || 5000;

// Use a check to prevent the crash
if (app && typeof app.listen === 'function') {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  server.timeout = 900000; 
} else {
  console.error("FATAL ERROR: The 'app' object was not imported correctly. Check app.js module.exports.");
  process.exit(1);
}

