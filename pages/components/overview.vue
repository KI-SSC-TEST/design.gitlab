<script>
import contentTree from '../../content_tree.json'; // eslint-disable-line import/no-unresolved

export default {
  contentTree,
  head: {
    title: 'Components overview',
  },
};
</script>

<template>
  <div class="content limited m-t-7 m-b-7 app-styles">
    <div class="structure md">
      <h1>Pajamas components</h1>
      <p class="mt-4">
        Pajamas components are written in Vue and designed in Figma. Select a component to learn
        more about how to use them for your design or development project.
      </p>
      <ul class="components-list mt-4 gl-display-grid gl-list-style-none gl-pl-0!">
        <li
          v-for="component in $options.contentTree.components"
          :key="component.id"
          class="gl-display-flex"
        >
          <nuxt-link
            class="component-card gl-text-decoration-none! gl-text-black-normal! gl-rounded-base gl-bg-white gl-p-5 gl-w-full gl-border-1 gl-border-solid gl-border-gray-100"
            :to="`/components/${component.id}`"
          >
            <h3 class="component-name">{{ component.name }}</h3>
            <p class="component-description gl-mb-0 gl-mt-2 gl-reset-line-height gl-font-lg">
              {{ component.description }}
            </p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
