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
    // Altered
    altered: "Geändert",
    // Custom Properties
    customAttributes: {
      // Title
      title: "Eigene Attribute",
      // Message
      message: "Hier können Sie eigene Attribute für Projekt festlegen. Diese können später zum Beispiel in Vorlagen " +
        "zur Erstellung von Skripten verwendet werden.",
      // No Data Message
      noData: "Sie haben bisher noch keine eigenen Attribute erstellt.",
      // Attribute Name
      name: "Name des Attributes",
      // Attribute Type
      type: "Datentyp",
      // Attribute Value
      value: "Wert",
      // Data Types
      types: {
        // String
        string: "Zeichenkette",
        // Number
        number: "Zahl",
        // Boolean
        boolean: "Wahrheitswert"
      }
    },
    // Created
    created: "Erstellt",
    // Description
    description: "Beschreibung",
    // Email Address
    emailAddress: "Email-Adresse",
    // False
    false: "Falsch",
    // First Name
    firstName: "Vorname",
    // Common
    general: "Allgemein",
    // Last Name
    lastName: "Nachname",
    // Owner
    owner: "Eigentümer",
    // Password
    password: "Kennwort",
    // Repeat Password
    passwordRepeat: "Kennwort wiederholen",
    // Project Manager
    projectManager: "Projektleiter",
    // Project Name
    projectName: "Name des Projekts",
    // Records per page
    recordsPerPage: "Zeilen pro Seite",
    // True
    true: "Wahr",
    // Role
    yourRole: "Deine Rolle"
  },

  // Button Labels
  button: {
    // Apply
    apply: "Übernehmen",
    // Back
    back: "Zurück",
    // Cancel
    cancel: "Abbrechen",
    // Change Password
    changePassword: "Kennwort ändern",
    // Close
    close: "Schließen",
    // Dark Mode
    darkMode: "Dunkler Modus",
    // Language
    language: "Sprache",
    // Light Mode
    lightMode: "Heller Mode",
    // Login
    login: "Anmelden",
    // Logout
    logout: "Abmelden",
    // No
    no: "Nein",
    // Okay
    okay: "Okay",
    // Register Account
    registerAccount: "Konto erstellen",
    // Reset Password
    resetPassword: "Kennwort zurücksetzen",
    // Yes
    yes: "Ja"
  },

  // Hint Labels
  hint: {
    // Please enter an email address
    enterEmail: "Bitte geben Sie eine Email-Adresse an."
  },

  // Column Header Labels
  column: {
    // Member Name
    memberName: "Name des Mitglieds",
    // Role
    role: "Rolle"
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
      empty: "Dieses Feld darf nicht leer sein.",
      // Email not found
      emailNotFound: "Email-Adresse ist unbekannt."
    }
  },

  // Left Drawer Labels
  leftDrawer: {
    // Dashboard
    project: "Projekte"
  },

  // Common Dialogs
  dialog: {
    // Discard changes in editor
    discardEditor: {
      // Title
      title: "Änderungen verwerfen",
      // Message
      message: "Wollen Sie die bisher gemachten Änderungen im Editor wirklich verwerfen?"
    },
    // Choose Account Dialog
    chooseAccount: {
      // Title
      title: "Konto auswählen",
      // Message
      message: "Geben Sie hier die Email-Adresse der Person ein, die Sie auswählen möchten. Prüfen Sie die " +
        "Verfügbarkeit und klicken Sie dann auf \"Okay\", um die Auswahl abzuschließen.",
      // Error Messages
      error: {
        // Account not found
        accountNotFound: "Es gibt kein Konto mit dieser Email-Adresse"
      }
    }
  },

  // Role Labels
  role: {
    // Visitor
    visitor: "Besucher",
    // Developer
    developer: "Entwickler",
    // Deployer
    deployer: "Bereitsteller",
    // Owner
    owner: "Eigentümer"
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
  },

  // Change Password Dialog
  changePasswordDialog: {
    // Title
    title: "Kennwort ändern",
    // Message
    message: "Hier können Sie ein neues Kennwort für Ihren Account vergeben. Dazu müssen Sie aus Sicherheitsgründen " +
      "auch Ihr altes Kennwort angeben.",
    // Labels
    label: {
      // Old Password
      oldPassword: "Altes Kennwort",
      // New Password
      newPassword: "Neues Kennwort"
    },
    // Error Labels
    error: {
      // Invalid Password
      invalidPassword: "Kennwort ist nicht korrekt."
    },
    // Success Dialog
    success: {
      // Title
      title: "Kennwort erfolgreich geändert",
      // Message
      message: "Ihr Kennwort wurde erfolgreich geändert. Sie können sich ab sofort mit dem neuen Kennwort anmelden."
    }
  },

  // Project Labels
  project: {
    // Title
    title: "Projekte",
    // Empty Message
    emptyMessage: "Wie es scheint, haben Sie bisher noch kein Projekt erstellt und wurden auch noch keinem Projekt " +
      "als Mitarbeiter zugeordnet. Sie können nun entweder selbst ein neues Projekt erstellen oder Ihren Projektleiter " +
      "bitten, Sie einem Projekt zuzuordnen.",
    // Overview Message
    overviewMessage: "Hier sehen Sie eine Übersicht über alle Projekte, in die Sie involviert sind.",
    // Create New Project Button
    createButton: "Neues Projekt erstellen",
    // Editor Labels
    editor: {
      // Create Project Labels
      create: {
        // Title
        title: "Neues Projekt",
        // Message
        message: "Hier können Sie ein neues Projekt erstellen. In einem Projekt verwalten Sie alle Artefakte Ihres " +
          "gesamten Modells. Weiterhin können Sie hier festlegen, wer in welcher Rolle an dem Projekt mitwirken darf. " +
          "Sie können einen eigenen Projektleiter bestimmen, der innerhalb des Projekts alle Rechte (außer dem Löschen " +
          "des Projekts) innehat. Sie bleiben jedoch weiterhin Eigentümer des Projekts und können den Projektleiter " +
          "jederzeit austauschen. Sie können natürlich auch selbst die Rolle des Projektleiters übernehmen."
      },
      // Tab Labels
      tab: {
        // Project Team
        team: {
          // Title
          title: "Projekt-Team",
          // Message
          message: "Fügen Sie hier Mitglieder zu Ihrem Projekt-Team hinzu, wobei jedes Mitglied eine bestimmte Rolle " +
            "einnehmen kann, die bestimmt, welche Berechtigungen das Mitglied hat.",
          // Team Table Labels
          table: {
            // No Data Message
            noData: "Bisher wurden diesem Projekt bis auf den Projektleiter noch keine weiteren Mitglieder zugeordnet. " +
              "Sie können durch einen Klick auf das \"+\" Icon ein neues Mitglied hinzufügen."
          },
          // Dialog title when adding a member has failed
          addFailed: "Konto nicht hinzugefügt",
          // Account is already a member
          alreadyMember: "Das gewählte Konto ist bereits ein Mitglied dieses Projektteams.",
          // Account is project manager
          alreadyProjectManager: "Das gewählte Konto ist bereits als Projektleiter eingesetzt."
        }
      }
    }
  }
}
