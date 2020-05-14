import { customElement, html, LitElement, unsafeCSS } from 'lit-element';

import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-integer-field';
import '../navigation-buttons';


import {field,  Binder} from '@vaadin/flow-frontend/Binder';
import * as viewEndpoint from '../../generated/OrdersEndpoint';

import ProductModel from '../../generated/com/vaadin/forms/orders/entities/ProductModel';

import { CSSModule } from '../../css-utils';
import styles from '../form-view.css';

@customElement('product-form')
export class ProductForm extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  private binder = new Binder(this, ProductModel, () => this.requestUpdate());

  render() {
    return html`
      <div class="meta-row" id="metaContainer">
        <h2 id="title">Product</h2>
        <span class="dim">Product #${this.binder.model.id}</span>
      </div>

      <navigation-buttons
        .parent="${this}"
        .binder="${this.binder}"
        .submit="${viewEndpoint.saveProduct}"
        .load="${viewEndpoint.getProduct}"
        .delete="${viewEndpoint.deleteProduct}"
      ></navigation-buttons>

      <vaadin-form-layout id="form1" .responsiveSteps="${[{minWidth: "0", columns: 3}]}">
        <vaadin-text-field id="description" label="Product" colspan="2"
          ...="${field(this.binder.model.description)}"
        >
          <iron-icon slot="prefix" icon="vaadin:cutlery"></iron-icon>
        </vaadin-text-field>
        <vaadin-integer-field id="price" label="Price"
          ...="${field(this.binder.model.price)}"
        >
          <div slot="suffix">€</div>
        </vaadin-integer-field>
      </vaadin-form-layout>
    `;
  }
}
