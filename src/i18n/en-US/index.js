export default {
  // Application Labels
  application: {
    // Application Title
    title: "Cloud Data Modeling",
    // Copyright Message
    copyright: "&copy; Copyright 2024 Dirk Michael.",
    // Version Information
    version: "Version 0.1"
  },

  // Languages
  language: {
    // English (US)
    enUS: "English (US)",
    // German (DE)
    deDE: "German (DE)"
  },

  // Common Labels
  common: {
    // Email Address
    emailAddress: "Email Address",
    // First Name
    firstName: "First Name",
    // Last Name
    lastName: "Last Name",
    // Password
    password: "Password",
    // Repeat Password
    passwordRepeat: "Repeat Password"
  },

  // Button Labels
  button: {
    // Back
    back: "Back",
    // Close
    close: "Close",
    // Login
    login: "Log In",
    // Register Account
    registerAccount: "Register Account",
    // Reset Password
    resetPassword: "Reset Password"
  },

  // Error Labels
  error: {
    // Unexpected Error
    unexpected: {
      // Title
      title: "Unexpected Error",
      // Message
      message: "An unexpected error has occurred."
    },
    // Error labels for input fields
    input: {
      // Input field must not be empty.
      empty: "This field must not be empty."
    }
  },

  // Authentication Labels
  authentication: {
    // Login Labels
    login: {
      // Login Message
      message: "Welcome to the “Cloud Data Modeling” application. Please enter your login credentials in the fields " +
        "below. If you don't have an account yet, you can create a new one by clicking on the link " +
        "\"Register Account\". However, keep in mind that an administrator must first activate your new account before " +
        "you can log in. If you forgot you password, you can reset it by clicking on the link \"Reset Password\"."
    },
    // Register Labels
    register: {
      // Register Message
      message: "Here you can create a new account to gain access to the application. To do this, enter the relevant " +
        "information in the fields below. The email address must not already be used by another account. After " +
        "successful registration, an administrator must activate your account before you can log in.",
      // Error Messages
      error: {
        // Password Check Failed
        passwordCheck: "The both passwords are different.",
        // Invalid Email Address
        invalidEmail: "The email address is invalid.",
        // Email Address In Use
        emailInUse: "The email address is already in use.",
        // Weak Password
        weakPassword: "The password must have at least 6 characters."
      },
      // Successful registration
      success: {
        // Title
        title: "Account successfully registered",
        // Message
        message: "Your account was successfully created. Before you can log in, an administrator still needs to " +
          "activate the new account."
      }
    }
  }
}
