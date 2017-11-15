/* eslint-disable react/react-in-jsx-scope */

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import { storiesOf } from '@storybook/vue';

import Prism from 'prismjs';

// workaround for https://github.com/bootstrap-vue/bootstrap-vue/issues/1201
let originalVueComponent = Vue.component
Vue.component = function(name, definition) {
  if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
      name === 'bCheckGroup' || name === 'bFormRadioGroup') {
    definition.components = {bFormCheckbox: definition.components[0]}
  }
  originalVueComponent.apply(this, [name, definition])
}
Vue.use(BootstrapVue)
Vue.component = originalVueComponent

import '../main.scss';

const files = [
  {
    name: 'Getting Started',
    modules: require.context('./getting_started', false, /\.md$/),
  },
  {
    name: 'Styles',
    modules: require.context('./styles', false, /\.md$/),
  },
  {
    name: 'Components',
    modules: require.context('./components', false, /\.md$/),
  },
];

files.forEach(({name, modules}) => {
  modules.keys().forEach(fileName => {
    const htmlContent = modules(fileName);

    const dummyElement = document.createElement('div');
    dummyElement.innerHTML = htmlContent;
    const title = dummyElement.querySelector('h1');

    storiesOf(name, module)
      .add(title ? title.innerText : fileName, () => ({
        mounted() {
          const codeBlocks = this.$el.querySelectorAll('pre > code');
          codeBlocks.forEach(block => {
            block.classList.add('language-html');
            const preElement = block.parentNode;
            preElement.insertAdjacentHTML('afterend', '<div>');
            const el = preElement.nextSibling;
            const vueComponent = new Vue({
              el,
              template: `
                <div class="component-preview">${block.innerText}</div>
              `,
            });
          });
          Prism.highlightAll();
        },
        template: `<div>${htmlContent}</div>`,
      }));
  });
});
