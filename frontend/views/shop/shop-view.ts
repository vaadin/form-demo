import { css, customElement, html, LitElement, property, query } from 'lit-element';

import { router } from '../../index';

import '@vaadin/vaadin-tabs';

interface MenuTab {
  route: string;
  name: string;
}

@customElement('shop-view')
export class ShopEndpoint extends LitElement {
  @property({ type: Object }) location = router.location;
  @property({ type: Array }) menuTabs: MenuTab[] = [
    {route: '', name: 'Welcome'},
    {route: 'order', name: 'Orders Editor'},
    {route: 'customer', name: 'Customer Editor'},
    {route: 'product', name: 'Product Editor'},
    {route: 'vaadin', name: 'Vaadin Elements'},
    {route: 'demo', name: 'Doc Demo'},
    {route: 'person', name: 'Person'},
  ];

  @query('#tabs') tabs!: any;

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }
      #tabs {
        max-width: 100%;
        margin: auto;
      }
    `;
  }

  updated() {
    const clean = (path: string) => path.replace(/^\/?(.*?)(\/.*)?$/, '$1');
    router.ready.then(loc => this.tabs.selected =
      this.menuTabs.findIndex(tab => clean(loc.pathname) === clean(tab.route)));
  }

  render() {
    return html`
      <vaadin-app-layout id="layout">
        <vaadin-tabs slot="navbar" id="tabs">
          ${this.menuTabs.map(
            menuTab => html`
              <vaadin-tab>
                <a href="${router.urlForPath(menuTab.route)}">${menuTab.name}</a>
              </vaadin-tab>
            `
          )}
        </vaadin-tabs>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }
}
