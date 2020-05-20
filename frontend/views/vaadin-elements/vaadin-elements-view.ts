import { css, customElement, LitElement, unsafeCSS, query, html} from 'lit-element';
import {until} from 'lit-html/directives/until.js';
import {repeat} from 'lit-html/directives/repeat.js';

import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-date-time-picker';
import '@vaadin/vaadin-time-picker';
import '@vaadin/vaadin-select';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-item';
import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-rich-text-editor';
import '@vaadin/vaadin-login';
import '@vaadin/vaadin-custom-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-notification';

import * as endpoint from '../../generated/ElementsEndpoint';
import ElementsModel from '../../generated/com/vaadin/forms/orders/entities/ElementsModel';
import { field, Binder } from '@vaadin/form';

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
      }
      vaadin-checkbox[invalid], vaadin-radio-button[invalid], vaadin-checkbox-group[invalid],
      vaadin-radio-group[invalid], vaadin-list-box[invalid], vaadin-rich-text-editor[invalid], vaadin-custom-field[invalid] > * {
        background: var(--lumo-error-color-10pct);
      }
      `
    ];
  }

  private binder = new Binder(this, ElementsModel);
  private options = endpoint.getOptions();
  @query('vaadin-notification') private notification: any;

  async firstUpdated(arg: any) {
    super.firstUpdated(arg);
    const item = await endpoint.getElements();
    this.binder.reset(item);
  }

  render() {
    return html`
      <vaadin-button @click="${() => this.submit()}">save</vaadin-button>
      <vaadin-button @click="${() => this.binder.clear()}">clear</vaadin-button>
      <vaadin-button @click="${() => this.binder.reset()}">reset</vaadin-button>

      <vaadin-form-layout style="border: solid 1px grey">
        <vaadin-checkbox ...="${field(this.binder.model.checkbox)}">checkbox</vaadin-checkbox>
        <vaadin-radio-button ...="${field(this.binder.model.radioButton)}">radio-button</vaadin-radio-button>
        <vaadin-checkbox-group ...="${field(this.binder.model.checkboxGroup)}" label="checkbox-group">
          ${until(this.options.then(opts => repeat(opts, (item, _i) => html`
            <vaadin-checkbox value="${item}">${item}</vaadin-checkbox>
          `)))}
        </vaadin-checkbox-group>
        <vaadin-radio-group ...="${field(this.binder.model.radioButtonGroup)}" label="radio-group" invalid>
          ${until(this.options.then(opts => repeat(opts, (item, _i) => html`
            <vaadin-radio-button value="${item}">${item}</vaadin-radio-button>
          `)))}
        </vaadin-radio-group>
        <vaadin-combo-box ...="${field(this.binder.model.comboBox)}" label="combo-box"
          .items="${until(this.options)}">
        </vaadin-combo-box>
        <vaadin-select ...="${field(this.binder.model.select)}" allow-custom-value label="select">
          <template>
            <!-- https://github.com/vaadin/vaadin-select/issues/224 -->
            <vaadin-list-box>
              <vaadin-item><span>item-1</span></vaadin-item>
              <vaadin-item><span>item-2</span></vaadin-item>
            </vaadin-list-box>
          </template>
        </vaadin-select>

        <vaadin-custom-field ...="${field(this.binder.model.customField)}" label="custom-field">
          <vaadin-text-field></vaadin-text-field>
        </vaadin-custom-field>
        <vaadin-text-field ...="${field(this.binder.model.textField)}"  label="text-field"></vaadin-text-field>
        <vaadin-password-field ...="${field(this.binder.model.passwordField)}" label="password-field"></vaadin-password-field>
        <vaadin-integer-field ...="${field(this.binder.model.integerField)}" label="integer-field" has-controls></vaadin-integer-field>
        <vaadin-number-field ...="${field(this.binder.model.numberField)}" label="number-field" has-controls></vaadin-number-field>
        <vaadin-email-field ...="${field(this.binder.model.emailField)}" label="email-field"></vaadin-email-field>
        <vaadin-text-area ...="${field(this.binder.model.textArea)}" label="textarea"></vaadin-text-area>

        <vaadin-form-item>
          <label slot="label">list-box</label>
          <vaadin-list-box ...="${field(this.binder.model.listBox)}" label="list-box" id="list-box">
            ${until(this.options.then(opts => repeat(opts, (item, _i) => html`
              <vaadin-item><span>${item}</span></vaadin-item>
            `)))}
          </vaadin-list-box>
        </vaadin-form-item>

        <vaadin-date-picker ...="${field(this.binder.model.datePicker)}" label="date-picker"></vaadin-date-picker>
        <vaadin-time-picker ...="${field(this.binder.model.timePicker)}" label="time-picker"></vaadin-time-picker>
        <vaadin-date-time-picker ...="${field(this.binder.model.dateTimePicker)}" label="date-time-picker">
          <vaadin-date-time-picker-date-picker slot="date-picker"></vaadin-date-time-picker-date-picker>
          <vaadin-date-time-picker-time-picker slot="time-picker"></vaadin-date-time-picker-time-picker>
        </vaadin-date-time-picker>

        <vaadin-rich-text-editor ...="${field(this.binder.model.richText)}" label="rich-text-editor" theme="compact" colspan="2"></vaadin-rich-text-editor>

      </vaadin-form-layout>
      <vaadin-notification position="bottom-stretch"></vaadin-notification>
    `;
  }

  async submit() {
    let message: string;
    try {
      await this.binder.submitTo(endpoint.saveElements);
      message = "<h3>saved</h3>";
    } catch (error) {
      message = error.message.replace(/\n/g, '<br/>');
    }
    this.notification.renderer = (root: HTMLElement) => root.innerHTML = '<br/>' + message + '<br/><br/>';
    this.notification.open();
  }
}
