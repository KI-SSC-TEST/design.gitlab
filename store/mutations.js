import { getDefaultFrontmatter } from './state';

export default {
  resetFrontmatter(state) {
    state.frontmatter = getDefaultFrontmatter();
  },
  setFrontmatter(state, frontmatter) {
    state.frontmatter = frontmatter;
  },
  setActiveNavItem(state, navItem) {
    state.activeNavItem = navItem;
  },
};
