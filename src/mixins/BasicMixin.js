import {useQuasar} from "quasar";

export default {
  // The name of this mixin.
  name: "BasicMixin",

  // The variables of this mixin.
  data() {
    return {
      // Quasar
      q: useQuasar(),
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
        const result = await taskFunction(t);
        // Unlock screen
        this.q.loading.hide();
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
          this.showUnexpectedError(t,"default", error);
        }
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
    }
  }
}
