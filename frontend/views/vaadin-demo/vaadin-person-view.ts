import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-custom-field';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-date-time-picker';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-item';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-rich-text-editor';
import '@vaadin/vaadin-select';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-time-picker';

import { customElement, html, LitElement } from 'lit-element';
import { Binder, field, getModelValidators, getValue } from '@vaadin/form';
import PersonModel from '../../generated/com/vaadin/forms/orders/docs/PersonModel';


@customElement('vaadin-person-view')
export class VaadinPersonView extends LitElement {
  private binder = new Binder(this, PersonModel);

  async firstUpdated(arg: any) {
    super.firstUpdated(arg);

    getModelValidators(this.binder.model).add({
      message: 'password entries must match',
      validate: () => 
        getValue(this.binder.model.password) === getValue(this.binder.model.repeatPassword)
    });
  }
  render() {
    return html`
      <vaadin-password-field label="password"
        ...="${field(this.binder.model.password)}" ></vaadin-password-field>
      <vaadin-password-field label="repeat password"
        ...="${field(this.binder.model.repeatPassword)}" ></vaadin-password-field>

      <vaadin-button @click="${this.submit}">submit</vaadin-button>      
    `;
  }

  async submit() {
    return this.binder.submitTo(Promise.resolve)
      .catch(error => alert(error.errors[0].validator.message));
  }
}
