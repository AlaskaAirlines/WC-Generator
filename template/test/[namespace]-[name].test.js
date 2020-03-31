import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/auro-[name].js';

describe('auro-[name]', () => {
  it('sets the CSS class on auro-[name] > div element', async () => {
    const el = await fixture(html`
      <auro-[name] cssclass="testClass"></auro-[name]>
    `);

    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('auro-[name] is accessible', async () => {
    const el = await fixture(html`
      <auro-[name] cssclass="testClass"></auro-[name]>
    `);

    await expect(el).to.be.accessible();
  });

  it('auro-[name] custom element is defined', async () => {
    const el = await !!customElements.get("auro-[name]");

    await expect(el).to.be.true;
  });
});
