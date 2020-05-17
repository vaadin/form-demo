import { css, customElement, html, LitElement, unsafeCSS} from 'lit-element';
import {until} from 'lit-html/directives/until.js';
import {repeat} from 'lit-html/directives/repeat.js';

import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-date-time-picker';
import '@vaadin/vaadin-time-picker';
import '@vaadin/vaadin-select';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-item';
import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-upload';
import '@vaadin/vaadin-rich-text-editor';
import '@vaadin/vaadin-login';
import '@vaadin/vaadin-custom-field';

import * as endpoint from '../../generated/ElementsEndpoint';
import ElementsModel from '../../generated/com/vaadin/forms/orders/entities/ElementsModel';
import { field, Binder, getValue, setValue } from '@vaadin/form';

import { CSSModule } from '../../css-utils';
import styles from '../form-view.css';

@customElement('vaadin-elements-view')
export class VaadinElementsView extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles),
      css`
      :host {
        display: block;
        height: calc(100% - 80px);
        overflow-y: auto;
      }`
    ];
  }  

  private binder = new Binder(this, ElementsModel, () => this.requestUpdate());
  private options = endpoint.getOptions();

  async firstUpdated(arg: any) {
    super.firstUpdated(arg);
    const item = await endpoint.getElementValues();
    this.binder.reset(item);
    this.requestUpdate();
    (window as any).binder = this.binder;
    (window as any).g = getValue;
    (window as any).s = setValue;
  }

  render() {
    return html`
      <vaadin-form-layout>
        <vaadin-checkbox ...="${field(this.binder.model.checkbox)}" label="checkbox">Checkbox</vaadin-checkbox>
        <vaadin-checkbox-group ...="${field(this.binder.model.checkboxGroup)}" label="checkbox-group">
          ${until(this.options.then(opts => repeat(opts, (item, _i) => html`
            <vaadin-checkbox name="${item}">${item}</vaadin-checkbox>
          `)))}          
        </vaadin-checkbox-group>
        <vaadin-combo-box ...="${field(this.binder.model.comboBox)}" label="combo-box" allow-custom-value
            .items="${until(this.options)}"></vaadin-combo-box>
        <vaadin-custom-field ...="${field(this.binder.model.customField)}" label="custom-field">
          <vaadin-text-field></vaadin-text-field>
        </vaadin-custom-field>
        <vaadin-date-picker ...="${field(this.binder.model.datePicker)}" label="date-picker"></vaadin-date-picker>

        <vaadin-time-picker ...="${field(this.binder.model.timePicker)}" label="time-picker"></vaadin-time-picker>

        <vaadin-date-time-picker ...="${field(this.binder.model.dateTimePicker)}" label="date-time-picker">
          <vaadin-date-time-picker-date-picker slot="date-picker"></vaadin-date-time-picker-date-picker>
          <vaadin-date-time-picker-time-picker slot="time-picker"></vaadin-date-time-picker-time-picker>
        </vaadin-date-time-picker>
        
         <vaadin-select ...="${field(this.binder.model.select)}" allow-custom-value label="select">
          <template>
            <vaadin-list-box>
              ${until(this.options.then(opts => repeat(opts, (item, _i) => html`
                <vaadin-item><span>${item}</span></vaadin-item>
              `)))}
            </vaadin-list-box>
          </template>
        </vaadin-select>        
        <vaadin-radio-button ...="${field(this.binder.model.radioButton)}" label="radio-button">radio-button</vaadin-radio-button>
        <vaadin-radio-group ...="${field(this.binder.model.radioButtonGroup)}" label="radio-button-group">
          ${until(this.options.then(opts => repeat(opts, (item, _i) => html`
            <vaadin-radio-button name="${item}"><span>${item}</span></vaadin-radio-button>
          `)))}
        </vaadin-radio-group>
        <vaadin-text-field ...="${field(this.binder.model.textField)}"  label="text-field"></vaadin-text-field>
        <vaadin-password-field ...="${field(this.binder.model.passwordField)}" label="password-field"></vaadin-password-field>
        <vaadin-integer-field ...="${field(this.binder.model.integerField)}" label="integer-field"></vaadin-integer-field>
        <vaadin-number-field ...="${field(this.binder.model.numberField)}" label="number-field"></vaadin-number-field>
        <vaadin-email-field ...="${field(this.binder.model.emailField)}" label="email-field"></vaadin-email-field>
        <vaadin-form-item>
          <label slot="label" for="list-box">list-box</label>
          <vaadin-list-box ...="${field(this.binder.model.listBox)}" label="list-box" id="list-box">
            ${until(this.options.then(opts => repeat(opts, (item, _i) => html`
              <vaadin-item><span>${item}</span></vaadin-item>
            `)))}           
          </vaadin-list-box>
        </vaadin-form-item>
        <vaadin-text-area ...="${field(this.binder.model.textArea)}" label="textarea" colspan="2"></vaadin-text-area>
        <vaadin-rich-text-editor ...="${field(this.binder.model.richText)}" label="rich-text-editor" theme="compact" colspan="2"></vaadin-rich-text-editor>
        <vaadin-upload label="upload" target="VAADIN/dynamic/resource/0/f80c6c7c-c69a-4bda-b397-ef206683f161/upload"></vaadin-upload>
    </vaadin-form-layout>
    `;
  }
}
