// const User = require("./user.model");

// const findUserByEmail = async (email) => {
//   return await User.findOne({ email });
// };

// const findUserById = async (id) => {
//   return await User.findById(id);
// };

// const createUser = async (userData) => {
//   return await User.create(userData);
// };

// module.exports = {
//   findUserByEmail,
//   findUserById,
//   createUser,
// };

const User = require("./user.model");

// Find user by email - used for Login/Signup checks
const findUserByEmail = async (email) => {
  // .lean() converts the Mongoose document into a plain JS object.
  // This makes the query significantly faster and uses less memory.
  return await User.findOne({ email }).lean();
};

// Find user by ID - used for Profile/Channel pages
const findUserById = async (id) => {
  // .select("-password") ensures the hashed password is NEVER 
  // sent to the controller or the frontend.
  return await User.findById(id).select("-password").lean();
};

// Create a new user
const createUser = async (userData) => {
  // Create is a write operation, so we don't use .lean()
  return await User.create(userData);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
