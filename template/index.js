import { [Namespace][Name] } from './src/[namespace]-[name]';

/**
 * Register Custom Element.
 * @param {Object} name - Name to use for custom element.
 * @returns {void}
 */
 const registerComponent = (name = 'custom-[name]') => {
  // alias definition
  if (!customElements.get(name)) {
    customElements.define(name, class extends [Namespace][Name] {});
  }
}

export { registerComponent }
