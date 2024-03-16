// noinspection SpellCheckingInspection

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
    enUS: "Englisch (US)",
    // German (DE)
    deDE: "Deutsch (DE)"
  },

  // Common Labels
  common: {
    // Email Address
    emailAddress: "Email-Adresse",
    // First Name
    firstName: "Vorname",
    // Last Name
    lastName: "Nachname",
    // Password
    password: "Kennwort",
    // Repeat Password
    passwordRepeat: "Kennwort wiederholen"
  },

  // Button Labels
  button: {
    // Back
    back: "Zurück",
    // Close
    close: "Schließen",
    // Login
    login: "Anmelden",
    // Logout
    logout: "Abmelden",
    // Register Account
    registerAccount: "Konto erstellen",
    // Reset Password
    resetPassword: "Kennwort zurücksetzen"
  },

  // Error Labels
  error: {
    // Unexpected Error
    unexpected: {
      // Title
      title: "Unerwarteter Fehler",
      // Message
      message: "Es ist ein unerwarteter Fehler aufgetreten."
    },
    // Error labels for input fields
    input: {
      // Input field must not be empty.
      empty: "Dieses Feld darf nicht leer sein."
    }
  },

  // Authentication Labels
  authentication: {
    // Login Labels
    login: {
      // Login Message
      message: "Willkommen bei der Anwendung \"Cloud Data Modeling\". Bitte geben Sie Ihre Anmeldedaten in die folgenden " +
        "Felder ein. Wenn Sie noch kein Konto haben, können Sie über den Link \"Konto registrieren\" ein neues erstellen. " +
        "Beachten Sie jedoch, dass Ihr neues Konto zunächst von einem Administrator aktiviert werden muss, bevor Sie " +
        "sich anmelden können. Wenn Sie Ihr Passwort vergessen haben, können Sie es zurücksetzen, indem Sie auf den " +
        "Link \"Passwort zurücksetzen\" klicken.",
      // Error Messages
      error: {
        // Invalid Credentials
        invalidCredentials: "Email-Adresse und/oder Kennwort ist nicht korrekt.",
        // Too many failed attempts
        tooManyFailedAttempts: "Temporäre Sperre wegen zu vieler fehlgeschlagener Anmeldeversuche.",
        // Account is locked
        accountLocked: "Das Konto ist nicht durch einen Administrator freigegeben."
      }
    },
    // Register Labels
    register: {
      // Register Message
      message: "Hier können Sie ein neues Konto erstellen, um Zugriff auf die Anwendung zu erhalten. Geben Sie dazu die " +
        "entsprechenden Informationen in die untenstehenden Felder ein. Die Email-Adresse darf nicht bereits von einem " +
        "anderen Konto verwendet werden. Nach erfolgreicher Registrierung muss noch ein Administrator Ihr Konto " +
        "freischalten, bevor Sie sich anmelden können.",
      // Error Messages
      error: {
        // Password Check Failed
        passwordCheck: "Die beiden Kennwörter sind unterschiedlich.",
        // Invalid Email Address
        invalidEmail: "Die Email-Adresse ist ungültig.",
        // Email Address In Use
        emailInUse: "Die Email-Adresse wird bereits verwendet.",
        // Weak Password
        weakPassword: "Das Kennwort muss mindestens 6 Zeichen haben."
      },
      // Successful registration
      success: {
        // Title
        title: "Konto erfolgreich erstellt",
        // Message
        message: "Ihr Konto wurde erfolgreich erstellt. Bevor Sie sich anmelden können, muss noch ein Administrator " +
          "das neue Konto freischalten."
      }
    },
    // Reset Password Labels
    reset: {
      // Reset Message
      message: "Falls Sie Ihr Kennwort vergessen haben, können Sie sich hier eine Email zuschicken lassen, die einen " +
        "Link enthält, über den Sie ein neues Kennwort vergeben können.",
      // Successful request
      success: {
        // Title
        title: "Email erfolgreich versendet",
        // Message
        message: "Sie erhalten in Kürze eine Email an die angegebene Adresse mit einem Link, über den Sie dann ein " +
          "neues Kennwort vergeben können."
      }
    }
  }
}
