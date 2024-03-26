export default {
  // Application Labels
  application: {
    // Application Title
    title: "Cloud Data Modeling",
    // Copyright Message
    copyright: "&copy; Copyright 2024 Dirk Michael.",
    // Version Information
    version: "Version {major}.{minor} (Build: {build})"
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
    // Altered
    altered: "Altered",
    // Custom Properties
    customAttributes: {
      // Title
      title: "Custom Attributes",
      // Message
      message: "Here you can set your own attributes for the project. These can later be used, for example, in " +
        "templates to create scripts.",
      // No Data Message
      noData: "You have not yet created your own attributes.",
      // Attribute Name
      name: "Attribute Name",
      // Attribute Type
      type: "Data Type",
      // Attribute Value
      value: "Value",
      // Data Types
      types: {
        // String
        string: "String",
        // Number
        number: "Number",
        // Boolean
        boolean: "Boolean"
      }
    },
    // Created
    created: "Created",
    // Description
    description: "Description",
    // Email Address
    emailAddress: "Email Address",
    // False
    false: "False",
    // First Name
    firstName: "First Name",
    // Common
    general: "General",
    // Last Name
    lastName: "Last Name",
    // Owner
    owner: "Owner",
    // Password
    password: "Password",
    // Repeat Password
    passwordRepeat: "Repeat Password",
    // Project Manager
    projectManager: "Project Manager",
    // Project Name
    projectName: "Project Name",
    // Records per page
    recordsPerPage: "Records per page",
    // True
    true: "True",
    // Role
    yourRole: "Your Role",
  },

  // Button Labels
  button: {
    // Apply
    apply: "Apply",
    // Back
    back: "Back",
    // Cancel
    cancel: "Cancel",
    // Change Password
    changePassword: "Change Password",
    // Close
    close: "Close",
    // Dark Mode
    darkMode: "Dark Mode",
    // Language
    language: "Language",
    // Light Mode
    lightMode: "Light Mode",
    // Login
    login: "Log In",
    // Logout
    logout: "Log Out",
    // No
    no: "No",
    // Okay
    okay: "Okay",
    // Register Account
    registerAccount: "Register Account",
    // Reset Password
    resetPassword: "Reset Password",
    // Yes
    yes: "Yes"
  },

  // Hint Labels
  hint: {
    // Please enter an email address
    enterEmail: "Please enter an email address."
  },

  // Column Header Labels
  column: {
    // Member Name
    memberName: "Member Name",
    // Role
    role: "Role"
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
      empty: "This field must not be empty.",
      // Email not found
      emailNotFound: "Email address is unknown."
    }
  },

  // Left Drawer Labels
  leftDrawer: {
    // Dashboard
    project: "Projects"
  },

  // Common Dialogs
  dialog: {
    // Discard changes in editor
    discardEditor: {
      // Title
      title: "Discard Changes",
      // Message
      message: "Do you really want to discard the changes you have made so far in the editor?"
    },
    // Choose Account Dialog
    chooseAccount: {
      // Title
      title: "Choose Account",
      // Message
      message: "Enter the email address of the person you would like to select here. Check availability and then " +
        "click \"Okay\" to complete the selection.",
      // Error Messages
      error: {
        // Account not found
        accountNotFound: "There is no account with this email address."
      }
    }
  },

  // Role Labels
  role: {
    // Visitor
    visitor: "Visitor",
    // Developer
    developer: "Developer",
    // Deployer
    deployer: "Deployer",
    // Manager
    manager: "Project Manager",
    // Owner
    owner: "Owner"
  },

  // Authentication Labels
  authentication: {
    // Login Labels
    login: {
      // Login Message
      message: "Welcome to the “Cloud Data Modeling” application. Please enter your login credentials in the fields " +
        "below. If you don't have an account yet, you can create a new one by clicking on the link " +
        "\"Register Account\". However, keep in mind that an administrator must first activate your new account before " +
        "you can log in. If you forgot you password, you can reset it by clicking on the link \"Reset Password\".",
      // Error Messages
      error: {
        // Invalid Credentials
        invalidCredentials: "Email address and/or password is incorrect.",
        // Too many failed attempts
        tooManyFailedAttempts: "Temporary lock due to too many failed login attempts.",
        // Account is locked
        accountLocked: "The account is not authorized by an administrator."
      }
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
    },
    // Reset Password Labels
    reset: {
      // Reset Message
      message: "If you have forgotten your password, you can have an email sent to you here, which contains a link " +
        "through which you can assign a new password.",
      // Successful request
      success: {
        // Title
        title: "Email successfully sent",
        // Message
        message: "You will soon receive an email at the specified address with a link, through which you can then " +
          "assign a new password."
      }
    }
  },

  // Change Password Dialog
  changePasswordDialog: {
    // Title
    title: "Change Password",
    // Message
    message: "Here you can assign a new password for your account. For security reasons, you must also provide your " +
      "old password.",
    // Labels
    label: {
      // Old Password
      oldPassword: "Old Password",
      // New Password
      newPassword: "New Password"
    },
    // Error Labels
    error: {
      // Invalid Password
      invalidPassword: "Password is incorrect."
    },
    // Success Dialog
    success: {
      // Title
      title: "Password successfully changed",
      // Message
      message: "Your password was changed successfully. You can now log in with the new password."
    }
  },

  // Project Labels
  project: {
    // Title
    title: "Projects",
    // Empty Message
    emptyMessage: "It appears that you have not yet created a project and have not yet been assigned to a project as " +
      "a collaborator. You can now either create a new project yourself or ask your project manager to assign you to " +
      "a project.",
    // Overview Message
    overviewMessage: "Here you can see an overview of all the projects in which you are involved.",
    // Create New Project Button
    createButton: "Create New Project",
    // Editor Labels
    editor: {
      // Create Project Labels
      create: {
        // Title
        title: "New Project",
        // Message
        message: "Here you can create a new project. In a project you manage all the artifacts of your entire model. " +
          "You can also specify here who is allowed to participate in the project and in what role. You can designate " +
          "your own project manager who has all rights within the project (except for deleting the project). However, " +
          "you still remain the owner of the project and can change the project manager at any time. Of course, you " +
          "can also take on the role of project manager yourself."
      },
      // Edit Project Labels
      edit: {
        // Title
        title: "Edit Project",
        // Message
        message: "Here you can edit the properties of the project, add new members to the project team, change " +
          "member roles or remove members. If you are the owner of the project, you can also replace the project manager."
      },
      // Tab Labels
      tab: {
        // Project Team
        team: {
          // Title
          title: "Project Team",
          // Message
          message: "Add members to your project team here, where each member can have a specific role that determines " +
            "what permissions the member has.",
          // Team Table Labels
          table: {
            // No Data Message
            noData: "So far, no other members have been assigned to this project apart from the project manager. " +
              "You can add a new member by clicking on the \"+\" icon."
          },
          // Dialog title when adding a member has failed
          addFailed: "Account not added",
          // Account is already a member
          alreadyMember: "The selected account is already a member of the project team.",
          // Account is project manager
          alreadyProjectManager: "The selected account is already assigned as a project manager."
        }
      }
    },
    // Delete Labels
    delete: {
      // Title
      title: "Delete Project?",
      // Message
      message: "Are you sure you really want to delete the project \"{name}\"? This action cannot be undone."
    }
  }
}
