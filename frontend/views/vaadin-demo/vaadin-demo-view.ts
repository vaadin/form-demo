import { css, customElement, LitElement, html} from 'lit-element';

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

import * as endpoint from '../../generated/MyEndpoint';
import MyEntityModel from '../../generated/com/vaadin/forms/orders/docs/MyEntityModel';
import { field, Binder } from '@vaadin/form';


@customElement('vaadin-demo-view')
export class VaadinDemoView extends LitElement {
static get styles() {
  return css`
    vaadin-checkbox[invalid], vaadin-radio-button[invalid],
      background: var(--lumo-error-color-10pct);
    }`;
}

  private binder = new Binder(this, MyEntityModel);

  async firstUpdated(arg: any) {
    super.firstUpdated(arg);
    this.binder.reset(await endpoint.getMyEntity());
  }

  async updated() {
    console.log('updated')
  }


render() {
  return html`
  <vaadin-form-layout>
  <vaadin-custom-field ...="${field(this.binder.model.myTextField)}" label="custom-field">
    <vaadin-text-field></vaadin-text-field>
  </vaadin-custom-field>

  </vaadin-form-layout>


  `;
}
}
