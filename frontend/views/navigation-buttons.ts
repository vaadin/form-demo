import { customElement, html, LitElement, query } from 'lit-element';

import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons';

import { Binder} from '@vaadin/flow-frontend/Binder';
import {router} from '../index';

@customElement('navigation-buttons')
export class NavigationButtons extends LitElement {
  public binder!: Binder<any, any>;
  public submit!: (value: any) => Promise<void>;
  public load!: (value: any) => Promise<any>;
  public location = router.location;
  @query('#notification') private notification: any;

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" class="button-layout">
        <vaadin-button id="prev" @click="${this.prev}">
          <iron-icon icon="vaadin:arrow-left"></iron-icon>
        </vaadin-button>
        <vaadin-button id="next" @click="${this.next}">
         <iron-icon icon="vaadin:arrow-right"></iron-icon>
        </vaadin-button>
        <vaadin-button id="new" @click="${this.new}">
          <iron-icon icon="vaadin:plus"></iron-icon>
          New
        </vaadin-button>        
        <div id="total" style="flex-grow: 1"></div>
        <vaadin-button id="cancel" @click="${this.cancel}">
          <iron-icon icon="vaadin:close-small"></iron-icon>
          Cancel
        </vaadin-button>
        <vaadin-button id="review" theme="primary" @click="${this.save}">
          <iron-icon icon="vaadin:check"></iron-icon>
          Save
        </vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-notification duration="5000" id="notification"> </vaadin-notification>
    `;
  }

  async firstUpdated(arg: any) {
    super.firstUpdated(arg);
    this.loadForm();
  }

  private async loadForm() {
    const id = this.location.params.id;
    const item = await this.load(String(id));
    if (item) {
      this.binder.reset(item);
    }
  }

  private prev() {
    this.navigate(-1);
  }

  private next() {
    this.navigate(1);
  }

  private navigate(dir: number) {
    if (this.dirty()) {
      this.show("Please save your modifications");
      return;
    }
    let id = parseInt(String(this.location.params.id));
    id = id + dir < 0 ? id : id + dir;
    this.go(id);
  }

  private go(id?: number) {
    let path = this.location.pathname.replace(/\/\d*$/, '') + '/';
    path += typeof id === 'number' ? String(id) : '';
    window.dispatchEvent(new CustomEvent(
      'vaadin-router-go',
      {detail: new URL(path, document.baseURI)}));
  }

  private dirty() {
    return this.binder.isDirty;
  }

  private async save() {
    if (!this.submit) {
      this.show('save is not implemented yet');
      return;
    }
    const item = await this.binder.submitTo(this.submit);
    this.go(parseInt(item.idString));
  }

  private async new() {
    this.go();
  }  

  private cancel() {
    this.binder.reset();
  }

  private show(message: string) {
    this.notification.renderer = (root:HTMLElement) =>  root.textContent = message;
    this.notification.open();
  }
}
