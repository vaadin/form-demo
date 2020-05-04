import { customElement, html, LitElement, unsafeCSS} from 'lit-element';

import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '../navigation-buttons';

import {field,  Binder} from '@vaadin/flow-frontend/Binder';
import * as viewEndpoint from '../../generated/OrdersEndpoint';

import CustomerModel from '../../generated/com/vaadin/forms/orders/entities/CustomerModel';

import { CSSModule } from '../../css-utils';
import styles from '../form-view.css';

@customElement('customer-form')
export class CustomerForm extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  private binder = new Binder(this, CustomerModel, () => this.requestUpdate());

  render() {
    return html`
      <div class="meta-row" id="metaContainer">
        <h2 id="title">Customer</h2>
        <span class="dim">Customer #${this.binder.model.id}</span>
      </div>

      <vaadin-form-layout id="form1">
        <vaadin-text-field id="fullName" label="Customer"
          ...="${field(this.binder.model.fullName)}">
          >
          <iron-icon slot="prefix" icon="vaadin:user"></iron-icon>
        </vaadin-text-field>
        <vaadin-text-field id="phoneNumber" label="Phone number"
          ...="${field(this.binder.model.phoneNumber)}">
        >
          <iron-icon slot="prefix" icon="vaadin:phone"></iron-icon>
        </vaadin-text-field>
        <vaadin-text-field id="email" label="Email" colspan="2"
          ...="${field(this.binder.model.email)}">
        ></vaadin-text-field>
      </vaadin-form-layout>

      <navigation-buttons
        .binder="${this.binder}"
        .submit="${viewEndpoint.saveCustomer}"
        .load="${viewEndpoint.getCustomer}"
      ></navigation-buttons>
    `;
  }

  public onBeforeLeave(_location: any, commands: any) {
    return this.binder.isDirty && commands.prevent();
  }
}
