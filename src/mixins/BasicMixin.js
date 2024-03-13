import {useQuasar} from "quasar";

export default {
  // The name of this mixin.
  name: "BasicMixin",

  // The variables of this mixin.
  data() {
    return {
      q: useQuasar()
    }
  }
}
