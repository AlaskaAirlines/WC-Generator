import { fixture, html, expect } from '@open-wc/testing';
import '../src/[namespace]-[name].js';

describe('[namespace]-[name]', () => {
  it('sets the CSS class on [namespace]-[name] > div element', async () => {
    const el = await fixture(html`
      <[namespace]-[name] cssclass="testClass"></[namespace]-[name]>
    `);

    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('[namespace]-[name] is accessible', async () => {
    const el = await fixture(html`
      <[namespace]-[name] cssclass="testClass"></[namespace]-[name]>
    `);

    await expect(el).to.be.accessible();
  });

  it('[namespace]-[name] custom element is defined', async () => {
    const el = await !!customElements.get('[namespace]-[name]');

    await expect(el).to.be.true;
  });
});
