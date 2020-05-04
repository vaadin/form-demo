import { css, customElement, html, LitElement, property } from 'lit-element';

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
    {route: 'order/1', name: 'Orders Editor'},
    {route: 'customer/1', name: 'Customer Editor'},
    {route: 'product/1', name: 'Product Editor'}
  ];

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

  render() {
    return html`
      <vaadin-app-layout id="layout">
        <vaadin-tabs slot="navbar" id="tabs" .selected="${this.getIndexOfSelectedTab()}">
          ${this.menuTabs.map(
            menuTab => html`
              <vaadin-tab>
                <a href="${router.urlForPath(menuTab.route)}" tabindex="-1">${menuTab.name}</a>
              </vaadin-tab>
            `
          )}
        </vaadin-tabs>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  private isCurrentLocation(route: string): boolean {
    return router.urlForPath(route) === this.location.getUrl();
  }

  private getIndexOfSelectedTab(): number {
    const index = this.menuTabs.findIndex(menuTab => this.isCurrentLocation(menuTab.route));

    // Select first tab if there is no tab for home in the menu
    if (index === -1 && this.isCurrentLocation('')) {
      return 0;
    }

    return index;
  }
}
