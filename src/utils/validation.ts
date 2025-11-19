export const formRules = {
  username: {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters long",
    },
    maxLength: {
      value: 30,
      message: "Username must be at most 30 characters long",
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/i,
      message: "Only letters, numbers and underscores allowed",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
      message: "Invalid email address",
    },
    maxLength: {
      value: 255,
      message: "Email must be at most 255 characters long",
    },
    minLength: {
      value: 5,
      message: "Email must be at least 5 characters long",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
    maxLength: {
      value: 255,
      message: "Password must be at most 255 characters long",
    },
  },
};
