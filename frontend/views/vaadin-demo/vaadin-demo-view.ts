import {customElement, LitElement, html} from 'lit-element';

import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-date-time-picker';
import '@vaadin/vaadin-time-picker';
import '@vaadin/vaadin-item';

import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-select';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

import '@vaadin/vaadin-rich-text-editor';
import '@vaadin/vaadin-custom-field';

import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-text-field';

import PersonModel from '../../generated/com/vaadin/forms/orders/docs/PersonModel';
import { field, Binder, getModelValidators } from '@vaadin/form';


@customElement('vaadin-demo-view')
export class VaadinDemoView extends LitElement {
  private binder = new Binder(this, PersonModel);

  async firstUpdated(arg: any) {
    super.firstUpdated(arg);

    getModelValidators(this.binder.model.name).add({
      message: 'Name must start with letter B',
      validate: value => value.startsWith('B')
    });
  }

  render() {
    return html`
      <vaadin-text-field ...="${field(this.binder.model.name)}" label="Name"></vaadin-text-field>
    `;
  }
}
