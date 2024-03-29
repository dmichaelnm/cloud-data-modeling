import {useQuasar} from "quasar";
import {useSessionStore} from "stores/session-store";
import {Timestamp} from "firebase/firestore";

export default {
  // The name of this mixin.
  name: "BasicMixin",

  // The variables of this mixin.
  data() {
    return {
      // Quasar
      q: useQuasar(),
      // Session Store
      session: useSessionStore(),
      // Message Dialog
      messageDialog: {
        visible: false,
        action: "default",
        title: "",
        message: "",
        details: "",
        color: "primary",
        data: null,
        buttons: null
      }
    }
  },

  // The methods of this mixin.
  methods: {
    /**
     * Format a timestamp to a string representation based on the specified language.
     *
     * @param {Timestamp} timestamp - The timestamp object to be formatted.
     * @param {string} language - The language code used to determine the formatting.
     * @return {string} - The formatted timestamp string.
     */
    formatTimestamp(timestamp, language) {
      if (timestamp instanceof Timestamp) {
        return timestamp.toDate().toLocaleString(language);
      }
      return "";
    },

    /**
     * Runs a task function asynchronously.
     *
     * @param {function} t - The localization function.
     * @param {function} taskFunction - The task function to be executed.
     * @param {function} [errorFunction] - The error function to be called if an error occurs (optional).
     * @param {function} [resultFunction] - The result function to be called when the task finished successfully (optional).
     */
    async run(t, taskFunction, errorFunction, resultFunction) {
      // Look the screen
      this.q.loading.show();
      // Try catch block to handle errors
      try {
        // Run the task function
        const result = await taskFunction(t ? t : this.$t);
        // Run result function if necessary.
        if (resultFunction) {
          resultFunction(t, result);
        }
      } catch (error) {
        // Log error to console
        console.error(error);
        // If there is a custom error function, call it.
        let showErrorDialog = true;
        if (errorFunction) {
          // Call the error function
          showErrorDialog = errorFunction(t, error);
        }
        // If necessary, show unexpected error dialog
        if (showErrorDialog) {
          this.showUnexpectedError(t, "default", error);
        }
      } finally {
        // Unlock screen
        this.q.loading.hide();
      }
    },

    /**
     * Show a message dialog.
     *
     * @param {string} action The action that causes the message dialog.
     * @param {string} color The color used as indicator for the message type.
     * @param {string} title The dialog title.
     * @param {string} message The message of the dialog.
     * @param {string} details An optional additional detailed message.
     * @param {{value:string, label:string}[]} buttons Array of buttons for the dialog.
     * @param {*} data Optional user data.
     */
    showMessageDialog(action, color, title, message, details, buttons, data) {
      this.messageDialog.action = action;
      this.messageDialog.color = color;
      this.messageDialog.title = title;
      this.messageDialog.message = message;
      this.messageDialog.details = details;
      this.messageDialog.buttons = buttons;
      this.messageDialog.data = data;
      this.messageDialog.visible = true;
    },

    /**
     * Shows an error message.
     *
     * @param {string} action The action that causes the error dialog.
     * @param {string} title The error dialog title.
     * @param {string} message The error message of the dialog.
     * @param {string} details An optional additional detailed message.
     * @param {*} data Optional user data.
     */
    showErrorMessage(action, title, message, details = undefined, data = undefined) {
      this.showMessageDialog(
        action,
        "negative",
        title,
        message,
        details,
        [{value: "close", label: "button.close"}],
        data
      );
    },

    /**
     * Shows an unexpected error dialog.
     *
     * @param {function} t The localization function.
     * @param {string} action The action that causes the error dialog.
     * @param {*} error The error object.
     * @param {*} data Optional user data.
     */
    showUnexpectedError(t, action, error, data = undefined) {
      const details = error.message ? error.message : error.toString();
      this.showErrorMessage(
        action,
        t("error.unexpected.title"),
        t("error.unexpected.message"),
        details,
        data
      );
    },

    /**
     * Shows a success message.
     *
     * @param {string} action The action that causes the success dialog.
     * @param {string} title The success dialog title.
     * @param {string} message The success message of the dialog.
     * @param {string} details An optional additional detailed message.
     * @param {*} data Optional user data.
     */
    showSuccessDialog(action, title, message, details = undefined, data = undefined) {
      this.showMessageDialog(
        action,
        "positive",
        title,
        message,
        details,
        [{value: "close", label: "button.close"}],
        data
      );
    },

    /**
     * Shows a warning message.
     *
     * @param {string} action The action that causes the warning dialog.
     * @param {string} title The warning dialog title.
     * @param {string} message The warning message of the dialog.
     * @param {string} details An optional additional detailed message.
     * @param {*} data Optional user data.
     */
    showWarningDialog(action, title, message, details = undefined, data = undefined) {
      this.showMessageDialog(
        action,
        "warning",
        title,
        message,
        details,
        [{value: "close", label: "button.close"}],
        data
      );
    },

    /**
     * Show a confirmation dialog.
     *
     * @param {string} action - The action that triggered the dialog.
     * @param {string} title - The title of the dialog.
     * @param {string} message - The message displayed in the dialog.
     * @param {string} [color="primary"] - The color scheme of the dialog.
     * @param {string} [details=undefined] - Additional details to be displayed in the dialog.
     * @param {Object} [data=undefined] - Additional data to be passed.
     */
    showConfirmationDialog(action, title, message, color = "primary", details = undefined, data = undefined) {
      this.showMessageDialog(
        action,
        color,
        title,
        message,
        details,
        [{value: "yes", label: "button.yes"}, {value: "no", label: "button.no"}],
        data
      );
    }
  }
}
