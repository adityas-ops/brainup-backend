import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const userResolver = {
  Query: {
    greeting: () => "Hello World",
  },

  Mutation: {
    signup: async (_, { name, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            success: false,
            message: "User already exists with this email.",
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          provider: "custom",
        });

        await newUser.save();
        // create a token as well 
        const token = jwt.sign(
          { userId: newUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return {
          success: true,
          message: "User signed up successfully!",
          token,
        };
      } catch (error) {
        console.error("Error during signup:", error);
        return {
          success: false,
          message: "An error occurred during signup.",

        };
      }
    },

    loginEmail: async (_, { email, password }) => {
      try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
          return {
            success: false,
            message: "Invalid email or password or you are not signup yet.",
          };
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return {
            success: false,
            message: "Invalid email or password.",
          };
        }

        // Generate a token
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" } // Token expires in 7 days
        );

        return {
          success: true,
          message: "Login successful!",
          token,
          email: user.email,
          name: user.name,
        };
      } catch (error) {
        console.error("Error during login:", error);
        return {
          success: false,
          message: "An error occurred during login.",
        };
      }
    },

    loginGoogle: async (_, { email }) => {
      try {
        // find user with the email
        const user = await User.findOne({ email });
        if (!user) {
          return {
            success: false,
            message: "You are signup yet..",
          };
        }
        // Generate a token
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" } // Token expires in 7 days
        );
        return {
          success: true,
          message: "Login successful!",
          token,
          email: user.email,
          name: user.name,
        };
      } catch (error) {
        console.error("Error during login with Google:", error);
        return {
          success: false,
          message: "An error occurred during login with Google.",
        };
      }
    },
    validateToken: async (_, { token }) => {
        try {
          // Verify the token using your secret key
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
          // Use the `userId` from the token to find the user
          const user = await User.findOne({ _id: decoded.userId });
  
          if (!user) {
            return {
              success: false,
              message: "User not found",
              user: null,
            };
          }
  
          // Return the user details
          return {
            success: true,
            message: "Token is valid",
            user: {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
            },
          };
        } catch (err) {
          console.error("Token validation error:", err);
          return {
            success: false,
            message: "Invalid or expired token",
            user: null,
          };
        }
      },
  },
};

export default userResolver;
