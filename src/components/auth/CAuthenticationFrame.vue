<!--suppress JSUnresolvedReference, JSCheckFunctionSignatures -->
<template>
  <!-- Authentication Card -->
  <c-frame :width="500" shadow>

    <!-- Header Section -->
    <c-frame-section>
      <!-- Header Title -->
      <div class="row">
        <div class="col cdm-header-title">{{ $t("application.title") }}</div>
      </div>
      <!-- Header Copyright -->
      <div class="row">
        <div class="col cdm-header-subtitle" v-html="$t('application.copyright')"/>
      </div>
      <!-- Version Information -->
      <div class="row">
        <div class="col cdm-header-subtitle">
          {{ $t("application.version", {major: version.major, minor: version.minor, build: version.build})}}
        </div>
      </div>
    </c-frame-section>

    <!-- Message Section -->
    <c-frame-section separator :height="110">
      <!-- Message -->
      <div class="row">
        <div class="col">{{ message }}</div>
      </div>
    </c-frame-section>

    <!-- Content Section -->
    <c-frame-section separator>
      <!-- Content Slot -->
      <slot/>
    </c-frame-section>

    <!-- Options Section -->
    <c-frame-section dense>
      <!-- Options Row -->
      <div class="row items-center">
        <!-- Dark Mode Column -->
        <!-- Language Column -->
        <div class="col-6">
          <!-- Language Selection -->
          <div class="row">
            <div class="col-3"/>
            <div class="col-6">
              <c-select v-model="language" :options="languageOptions" :icon="languageIcon" style="font-size: 8pt">
                <!-- Template Option Entry -->
                <template v-slot:option="props">
                  <!-- Item Option Entry -->
                  <q-item dense clickable v-close-popup @click="onSwitchLanguage(props.opt)">
                    <!-- Flag Icon -->
                    <q-item-section avatar>
                      <q-icon :name="props.opt.icon" size="xs"/>
                    </q-item-section>
                    <!-- Language Label -->
                    <q-item-section>
                      <q-item-label>{{ props.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </c-select>
            </div>
            <div class="col-3"/>
          </div>
        </div>
        <div class="col-6 text-center">
          <q-btn round flat size="sm" :icon="darkModeIcon" color="primary" @click="onSwitchDarkMode"/>
        </div>
        <div class="col-2"/>
      </div>
    </c-frame-section>
  </c-frame>
</template>

<style lang="scss">
.cdm-header-title {
  font-size: 16pt;
  font-weight: bold;
  text-align: center;
}

.cdm-header-subtitle {
  font-size: 8pt;
  text-align: center;
  color: #909090;
}

.body--dark .cdm-header-subtitle {
  color: #707070;
}
</style>

<script>
import BasicMixin from "src/mixins/BasicMixin";
import CFrame from "components/common/CFrame.vue";
import CFrameSection from "components/common/CFrameSection.vue";
import CSelect from "components/common/CSelect.vue";
import {version} from "src/scripts/version";

import {getLanguageOptions, getLanguageOption} from "src/scripts/options";

export default {
  // This is the name of this component.
  name: "CAuthenticationFrame",

  // The used mixins of this component.
  mixins: [
    BasicMixin
  ],

  // The used components of this component.
  components: {
    CFrame,
    CFrameSection,
    CSelect
  },

  // The public attributes of this component.
  props: {
    // The message of the authentication page.
    message: {
      type: String,
      required: true
    }
  },

  // The variables of this component.
  data() {
    return {
      // Language
      language: "en-US",
      languageIcon: null,
      // Version
      version: version
    }
  },

  // Called before this component is mounted.
  beforeMount() {
    // Get language attributes from cookie
    this.language = this.q.cookies.get("language");
    this.languageIcon = getLanguageOption(this.$t, this.language)?.icon;
    this.$i18n.locale = this.language;
    // Get dark mode from cookie
    this.q.dark.set(this.q.cookies.get("darkMode") === "true");
  },

  // The methods of this component.
  methods: {
    /**
     * Toggles the dark mode on or off.
     */
    onSwitchDarkMode() {
      // Switch application dark mode.
      this.q.dark.set(!this.q.dark.isActive);
      // Set cookie.
      this.q.cookies.set("darkMode", this.q.dark.isActive ? "true" : "false");
    },

    /**
     * Update the language of the application.
     *
     * @param {{value:string, label:string, icon:string}} option - The selected language option containing the value and icon.
     */
    onSwitchLanguage(option) {
      // Switch application language
      this.$i18n.locale = option.value;
      // Set language and language icon.
      this.language = option.value;
      this.languageIcon = option.icon;
      // Set cookie
      this.q.cookies.set("language", option.value, {expires: 365});
      // Send event
      this.$bus.emit("language-changed", this.language);
    }
  },

  // Computed values of this component.
  computed: {
    // The icon of the dark mode button.
    darkModeIcon() {
      return this.q.dark.isActive ? "light_mode" : "dark_mode";
    },
    // The language options.
    languageOptions() {
      return getLanguageOptions(this.$t);
    }
  }
}
</script>
