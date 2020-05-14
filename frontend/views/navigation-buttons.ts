import { customElement, html, LitElement, query } from 'lit-element';

import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-notification'

import { Binder} from '@vaadin/flow-frontend/Binder';
import {router} from '../index';

@customElement('navigation-buttons')
export class NavigationButtons extends LitElement {
  public parent!: any;
  public binder!: Binder<any, any>;
  public submit!: (value: any) => Promise<any>;
  public load!: (value: any) => Promise<any>;
  public delete!: (value: any) => Promise<void>;
  public location = router.location;
  @query('#notification') private notification: any;

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" class="button-layout">
        <vaadin-button id="prev" theme="small" @click="${this.prev}">
          <iron-icon icon="vaadin:arrow-left"></iron-icon>
        </vaadin-button>
        <vaadin-button id="next" theme="small" @click="${this.next}">
         <iron-icon icon="vaadin:arrow-right"></iron-icon>
        </vaadin-button>
        <vaadin-button id="new" theme="small" @click="${this.new}">
          <iron-icon icon="vaadin:plus"></iron-icon>
          New
        </vaadin-button>
        <div id="total" style="flex-grow: 1"></div>
        <vaadin-button id="cancel" theme="small" @click="${this.cancel}">
          <iron-icon icon="vaadin:arrow-backward"></iron-icon>
          Cancel
        </vaadin-button>
        <vaadin-button id="delete" theme="small error" @click="${this.trash}">
          <iron-icon icon="vaadin:close-small"></iron-icon>
          Delete
        </vaadin-button>
        <vaadin-button id="review" theme="small primary" @click="${this.save}">
          <iron-icon icon="vaadin:check"></iron-icon>
          Save
        </vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-notification id="notification" position="bottom-center"></vaadin-notification>
    `;
  }

  async firstUpdated(arg: any) {
    super.firstUpdated(arg);

    const id = this.getId();
    if (id) {
      const item = await this.load(String(id));
      if (item) {
        this.binder.reset(item);
      }
    }

    this.parent.onBeforeLeave = this.onBeforeLeave.bind(this);
  }

  private onBeforeLeave(_loc: any, commands: any) {
    if (this.binder.isDirty) {
      this.show('Please save your modifications');
      return commands.prevent();
    }
  }

  private prev() {
    this.navigate(-1);
  }

  private next() {
    this.navigate(1);
  }

  private navigate(dir: number) {
    let id = this.getId();
    id = !id ? 1 : id + dir < 0 ? id : id + dir;
    this.go(id ? id : undefined);
  }

  private getId() {
    let id = parseInt(String(this.location.params.id));
    return Number.isNaN(id) ? 0 : id;
  }

  private go(id?: number) {
    let path = this.location.pathname.replace(/\/\d*$/, '') + '/';
    path += typeof id === 'number' ? String(id) : '';
    window.dispatchEvent(new CustomEvent('vaadin-router-go', {detail: new URL(path, document.baseURI)}));
  }

  private async save() {
    try {
      const item = await this.binder.submitTo(this.submit);
      item && this.go(item.id);
      this.show(`Item #${item.id} saved`);
    } catch (error) {
      this.show(error.message);
    }
  }

  private async new() {
    this.go();
  }

  private cancel() {
    this.binder.reset();
  }

  private async trash() {
    const id = this.binder.model.id.valueOf();
    if (id) {
      await this.delete(this.binder.defaultValue);
      this.show(`Item #${id} deleted`);
      this.go();
    }
  }

  private show(message: string) {
    this.notification.close();
    this.notification.renderer = (root: HTMLElement) => root.innerHTML = message.replace(/\n/g, '<br />');
    this.notification.open();
  }
}
