<script>
import {
  ComponentDocumentations,
  GlComponentDocumentation,
  GlExampleExplorer,
} from '@gitlab/ui/documentation';

import componentExamples from '../examples';

import ContributeToComponent from './contribute_to_component.vue';
import mdDisplay from './md_display.vue';
import RelatedPages from './related_pages.vue';

const componentNameToLabelMap = {
  dropdowns: 'dropdown',
  forms: 'form',
  labels: 'label',
  modals: 'modal',
  'radio-button': 'radio',
  tables: 'table',
  tabs: 'tab',
  toggles: 'toggle',
};

export default {
  components: {
    ContributeToComponent,
    'md-display': mdDisplay,
    GlComponentDocumentation,
    GlExampleExplorer,
    RelatedPages,
  },
  props: {
    frontmatterInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      componentName: this.$route.params.componentinfo,
      componentAttributes: null,
      componentBody: null,
      vueComponents: null,
      vueComponentDocumentations: {},
      tabIndex: 0,
    };
  },
  head() {
    return {
      title: this.frontmatterInfo.attributes.name,
    };
  },
  computed: {
    componentLabel() {
      const { section, slug } = this.$route.params;
      if (section !== 'components') {
        return null;
      }
      return componentNameToLabelMap[slug] || slug;
    },
    showTabs() {
      return Boolean(
        this.vueComponents?.length || this.frontmatterInfo?.attributes?.stories?.length,
      );
    },
  },
  created() {
    this.componentAttributes = this.frontmatterInfo.attributes;

    this.vueComponents = this.frontmatterInfo.attributes.vueComponents;

    this.componentBody = this.frontmatterInfo.body;

    if (this.vueComponents) {
      this.vueComponents.forEach((vueComponentName) => {
        let snakeName = vueComponentName.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
        if (snakeName.indexOf('_') === 0) snakeName = snakeName.substr(1);
        snakeName = snakeName.replace(/gl_/, '');

        Object.keys(ComponentDocumentations).forEach((component) => {
          if (component === `${vueComponentName}Documentation`) {
            this.vueComponentDocumentations[vueComponentName] = ComponentDocumentations[component];
            if (componentExamples[vueComponentName]) {
              this.vueComponentDocumentations[vueComponentName].examples =
                componentExamples[vueComponentName];
            }
          }
        });
      });
    }
  },
  mounted() {
    if (this.$route.hash) {
      const targetAnchor = this.$el.querySelector(this.$route.hash);

      if (!targetAnchor) {
        return;
      }

      const tabContainingAnchor = targetAnchor.closest('.js-gl-tab');
      if (!tabContainingAnchor) {
        return;
      }

      this.setActiveTab(tabContainingAnchor);

      this.$nextTick(() => {
        window.scrollTo(0, targetAnchor.offsetTop);
      });
    }
  },
  methods: {
    setActiveTab(tabEl) {
      this.tabIndex = [...tabEl.parentNode.children].indexOf(tabEl);
    },
    activateTab(tab = null) {
      this.$router.push({
        ...this.$route,
        params: {
          ...this.$route.params,
          tab,
        },
      });
    },
  },
};
</script>

<template>
  <div>
    <div v-if="componentAttributes">
      <div class="md typography gl-mb-6!">
        <h1 id="skipTarget" tabindex="-1">{{ componentAttributes.name }}</h1>
        <p>{{ componentAttributes.description }}</p>
      </div>
      <div v-if="showTabs">
        <gl-tabs v-model="tabIndex" nav-wrapper-class="app-styles gl-mb-5" lazy>
          <gl-tab title="Usage" active class="p-t-3 js-gl-tab" @click.prevent="activateTab()">
            <md-display :prerendered-md="componentBody" />
            <related-pages :related="frontmatterInfo.attributes.related" class="m-t-6" />
          </gl-tab>
          <gl-tab
            title="Implementation"
            :active="this.$route.params.tab === 'code'"
            class="app-styles js-gl-tab"
            @click.prevent="activateTab('code')"
          >
            <div class="gl-pt-0">
              <div
                v-for="story in frontmatterInfo.attributes.stories"
                :key="story"
                class="container"
              >
                <story-viewer :story-name="story" view-mode="docs" />
              </div>
              <template v-for="vueComponentName in vueComponents">
                <div :key="`header-${vueComponentName}`" class="component md mb-3">
                  <h2 :key="`hl-${vueComponentName}`" class="mb-3">
                    Vue Component - {{ vueComponentName }}
                  </h2>
                  <b-alert
                    v-if="!vueComponentDocumentations[vueComponentName].followsDesignSystem"
                    :key="`design-alert-${vueComponentName}`"
                    show
                    variant="warning"
                    class="mt-3 mb-3"
                  >
                    This component does not yet conform to the correct styling defined in our
                    <a href="/">Design System</a>. Refer to the
                    <a href="/">Design System</a> documentation when referencing visuals for this
                    component.
                  </b-alert>
                </div>
                <gl-example-explorer
                  :key="`examples-${vueComponentName}`"
                  :component-name="vueComponentName"
                />
                <md-display
                  v-if="
                    vueComponentDocumentations[vueComponentName] &&
                    vueComponentDocumentations[vueComponentName].description
                  "
                  :key="`description-${vueComponentName}`"
                  :md="vueComponentDocumentations[vueComponentName].description"
                  class="mt-3 mb-3"
                />
                <div :key="`props-${vueComponentName}`" class="component md mt-3">
                  <h3>Component Properties</h3>
                  <gl-component-documentation
                    :key="`docs-${vueComponentName}`"
                    :component-name="vueComponentName"
                    class="mt-3 component-documentation"
                  />
                </div>
              </template>
            </div>
          </gl-tab>
          <gl-tab
            v-if="componentLabel"
            title="Contribute"
            class="p-t-3 js-gl-tab"
            :active="this.$route.params.tab === 'contribute'"
            @click.prevent="activateTab('contribute')"
          >
            <contribute-to-component :component-label="componentLabel" />
          </gl-tab>
        </gl-tabs>
      </div>
      <div v-else class="md typography">
        <md-display :prerendered-md="componentBody" />
        <related-pages :related="frontmatterInfo.attributes.related" class="m-t-6" />
      </div>
    </div>
    <div v-else>Loading ...</div>
  </div>
</template>
