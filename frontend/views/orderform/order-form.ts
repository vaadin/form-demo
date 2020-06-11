import {customElement, html, LitElement, query, unsafeCSS} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-ordered-layout';

import '../navigation-buttons';

import {field, Binder} from '@vaadin/form';
import * as viewEndpoint from '../../generated/OrdersEndpoint';

import Product from '../../generated/com/vaadin/forms/orders/entities/Product';
import OrderModel from '../../generated/com/vaadin/forms/orders/entities/OrderModel';

import { CSSModule } from '../../css-utils';
import styles from '../form-view.css';

@customElement('order-form')
export class OrderForm extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @query('#form1') private form1: any;
  @query('#form2') private form2: any;
  @query('#form3') private form3: any;

  private binder = new Binder(this, OrderModel);

  private static productList: ReadonlyArray<Product> = [];
  private static locationList: ReadonlyArray<string> = [];
  private static timesList: ReadonlyArray<string> = [];

  async firstUpdated(arg: any) {
    super.firstUpdated(arg);
    this.form1.responsiveSteps = [
      {columns: 1, labelsPosition: 'top'},
      {minWidth: '600px', columns: 4, labelsPosition: 'top'}
    ];
    this.form2.responsiveSteps = [
      {columns: 1, labelsPosition: 'top'},
      {minWidth: '360px', columns: 2, labelsPosition: 'top'}
    ];
    this.form3.responsiveSteps = [
      {columns: 1, labelsPosition: 'top'},
      {minWidth: '500px', columns: 3, labelsPosition: 'top'}
    ];
    OrderForm.locationList = await viewEndpoint.getLocations();
    OrderForm.productList = await viewEndpoint.getProducts();
    OrderForm.timesList = await viewEndpoint.getTimes();
    this.requestUpdate();

    this.binder.addValidator({
      message: 'Select at least one product for the order',
      validate: (value) => value.lines.length > 0
    });
  }

  render() {
    return html`
      <div class="meta-row">
        <h2>New order</h2>
        <span class="dim">Order #${this.binder.model.id}</span>
      </div>

      <p>Submitting: ${this.binder.submitting}</p>

      <navigation-buttons
        .parent="${this}"
        .binder="${this.binder}"
        .submit="${viewEndpoint.saveOrder}"
        .load="${viewEndpoint.getOrder}"
        .delete="${viewEndpoint.deleteOrder}"
      ></navigation-buttons>

      <vaadin-form-layout id="form1">
        <vaadin-form-layout id="form2">
          <vaadin-date-picker
           label="Due"
           ...="${field(this.binder.model.dueDate)}">
          </vaadin-date-picker>
          <vaadin-combo-box
           .items="${OrderForm.timesList}"
           ...="${field(this.binder.model.dueTime)}">
            <iron-icon slot="prefix" icon="vaadin:clock"></iron-icon>
          </vaadin-combo-box>
          <vaadin-combo-box
           colspan="2"
           .items="${OrderForm.locationList}"
           ...="${field(this.binder.model.pickupLocation.description)}">
            <iron-icon slot="prefix" icon="vaadin:at"></iron-icon>
          </vaadin-combo-box>
        </vaadin-form-layout>

        <vaadin-form-layout id="form3" colspan="3">
          <vaadin-text-field
            label="Customer"
            colspan="3"
            ...="${field(this.binder.model.customer.fullName)}">
            <iron-icon slot="prefix" icon="vaadin:user"></iron-icon>
          </vaadin-text-field>
          <vaadin-text-field
           label="Email"
           colspan="2"
           ...="${field(this.binder.model.customer.email)}">
            <iron-icon slot="prefix" icon="vaadin:mailbox"></iron-icon>
          </vaadin-text-field>
          <vaadin-text-field
           label="Phone number"
           ...="${field(this.binder.model.customer.phoneNumber)}">
            <iron-icon slot="prefix" icon="vaadin:phone"></iron-icon>
          </vaadin-text-field>
          <vaadin-text-area
           label="Additional Details"
           colspan="3"
           ...="${field(this.binder.model.notes)}"
           ></vaadin-text-area>

          <div colspan="3">
            <h3>Products</h3>
            <vaadin-form-layout>
            ${repeat(this.binder.model.lines,
              (lineBinder, index) => html`
              <div class="flex-row">
                <vaadin-combo-box class="flex-1"
                 .label="${index === 0 ? 'Product' : undefined}"
                 .items="${OrderForm.productList}"
                 item-label-path="description"
                 item-value-path="description"
                 ...="${
                  field(lineBinder.model.product.description, (comboBox: any) => {
                    this.binder.for(lineBinder.model.product.price).value = comboBox.selectedItem?.price;
                  })
                 }"
                 ></vaadin-combo-box>
                <vaadin-integer-field
                 .label="${index === 0 ? 'Quantity' : undefined}"
                 min="1"
                 max="15"
                 has-controls
                 prevent-invalid-input
                 ...="${field(lineBinder.model.quantity)}"
                 ></vaadin-integer-field>
              </div>
              <div class="flex-row">
                <vaadin-number-field
                  readonly
                  theme="align-right"
                  .value="${lineBinder.model.product.price.valueOf()}"
                >
                <div slot="prefix">x</div>
                <div slot="suffix">€</div>
                </vaadin-number-field>
                <vaadin-number-field
                  readonly
                  theme="align-right"
                  .value="${lineBinder.value.product.price * lineBinder.value.quantity}"
                >
                  <div slot="suffix">€</div>
                </vaadin-number-field>
                <vaadin-button theme="icon tertiary error"
                 aria-label="remove product"
                 @click=${() => lineBinder.removeItem()}
                >
                 <iron-icon slot="prefix" icon="vaadin:trash"></iron-icon>
                </vaadin-button>
              </div>
              `
            )}
            </vaadin-form-layout>

            <h5 class="flex-row">
              <vaadin-button theme="small" @click="${() => this.binder.for(this.binder.model.lines).appendItem()}">
                <iron-icon slot="prefix" icon="vaadin:plus"></iron-icon>Add line
              </vaadin-button>
              <span class="flex-1" style="text-align: right; padding-right: 1em">Total:</span>
              <span>${this.binder.value.lines
                .map(line => line.product.price * line.quantity)
                .reduce((total, nth) => total + nth, 0)} €
              </span>
              <vaadin-button theme="icon" aria-label="" style="visibility: hidden;">
               <iron-icon slot="prefix" icon="vaadin:trash"></iron-icon>
              </vaadin-button>
            </h5>
          </div>
        </vaadin-form-layout>
      </vaadin-form-layout>
    `;
  }
}
