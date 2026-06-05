const jwt =
  require(
    "jsonwebtoken"
  );

const User =
  require(
    "../user/user.model"
  );

// Generate JWT
const generateToken =
  (id) => {
    return jwt.sign(
      { id },
      process.env
        .JWT_SECRET,
      {
        expiresIn:
          "7d",
      }
    );
  };

// ==================
// SIGNUP
// ==================
const signup =
  async (
    req,
    res
  ) => {
    try {
      const {
        email,
        password,
        fullName,
      } = req.body;

      if (
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Email and password are required",
          });
      }

      const existingUser =
        await User.findOne(
          {
            email:
              email.toLowerCase(),
          }
        );

      if (
        existingUser
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "User already exists",
          });
      }

      const username =
        email.split(
          "@"
        )[0];

      const user =
        await User.create(
          {
            email:
              email.toLowerCase(),

            password,

            fullName:
              fullName ||
              username,

            username,
          }
        );

      const token =
        generateToken(
          user._id
        );

      res.status(
        201
      ).json({
        success:
          true,
        token,
        user,
      });
    } catch (
      error
    ) {
      console.log(
        error
      );

      res.status(
        500
      ).json({
        success:
          false,
        message:
          error.message,
      });
    }
  };

// ==================
// LOGIN
// ==================
const login =
  async (
    req,
    res
  ) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Email and password are required",
          });
      }

      const user =
        await User.findOne(
          {
            email:
              email.toLowerCase(),
          }
        ).select(
          "+password"
        );

      if (
        !user
      ) {
        return res
          .status(401)
          .json({
            success:
              false,
            message:
              "Invalid credentials",
          });
      }

      const isMatch =
        await user.matchPassword(
          password
        );

      if (
        !isMatch
      ) {
        return res
          .status(401)
          .json({
            success:
              false,
            message:
              "Invalid credentials",
          });
      }

      const token =
        generateToken(
          user._id
        );

      res.status(
        200
      ).json({
        success:
          true,
        token,
        user,
      });
    } catch (
      error
    ) {
      console.log(
        error
      );

      res.status(
        500
      ).json({
        success:
          false,
        message:
          error.message,
      });
    }
  };

// ==================
// OAUTH LOGIN
// ==================
const oauthLogin =
  async (
    req,
    res
  ) => {
    try {
      const {
        email,
        fullName,
        profilePic,
      } = req.body;

      if (
        !email
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Email required",
          });
      }

      let user =
        await User.findOne(
          {
            email:
              email.toLowerCase(),
          }
        );

      // Create new user if not exists
      if (
        !user
      ) {
        const username =
          email.split(
            "@"
          )[0];

        user =
          await User.create(
            {
              email:
                email.toLowerCase(),

              fullName:
                fullName ||
                username,

              username,

              profilePic,

              password:
                "oauth-user",
            }
          );
      }

      const token =
        generateToken(
          user._id
        );

      res.status(
        200
      ).json({
        success:
          true,
        token,
        user,
      });
    } catch (
      error
    ) {
      console.log(
        error
      );

      res.status(
        500
      ).json({
        success:
          false,
        message:
          error.message,
      });
    }
  };

// ==================
// PROFILE
// ==================
const profile =
  async (
    req,
    res
  ) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select(
          "-password"
        );

      if (
        !user
      ) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "User not found",
          });
      }

      res.status(
        200
      ).json({
        success:
          true,
        user,
      });
    } catch (
      error
    ) {
      console.log(
        error
      );

      res.status(
        500
      ).json({
        success:
          false,
        message:
          error.message,
      });
    }
  };

module.exports =
  {
    signup,
    login,
    oauthLogin,
    profile,
  };