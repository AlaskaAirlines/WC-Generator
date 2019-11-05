import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/ods-[name].js';
 
describe('ods-[name]', () => {
  it('sets the CSS class on the div', async () => {
    const el = await fixture(html`
      <ods-[name] cssclass="testClass"></ods-[name]>
    `);
 
    const div = el.shadowRoot.querySelector('div');
    expect(div.className).to.equal('testClass');
  });

  it('is accessible', async () => {
    const el = await fixture(html`
      <ods-[name] cssclass="testClass"></ods-[name]>
    `);

    await expect(el).to.be.accessible();
  });
});