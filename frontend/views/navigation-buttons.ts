import { customElement, html, LitElement, query } from 'lit-element';

import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-notification'

import { Binder, ValidationError} from '@vaadin/form';
import {router} from '../index';

@customElement('navigation-buttons')
export class NavigationButtons extends LitElement {
  public location = router.location;

  // These should be provided by parent view
  public parent!: any;
  public binder!: Binder<any, any>;
  public submit!: (value: any) => Promise<any>;
  public load!: (value: any) => Promise<any>;
  public delete!: (value: any) => Promise<void>;

  @query('#notification') private notification: any;

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" class="button-layout">
        <vaadin-button id="prev" theme="small" @click="${this.btnPrev}">
          <iron-icon icon="vaadin:arrow-left"></iron-icon>
        </vaadin-button>
        <vaadin-button id="next" theme="small" @click="${this.btnNext}">
         <iron-icon icon="vaadin:arrow-right"></iron-icon>
        </vaadin-button>
        <vaadin-button id="new" theme="small" @click="${this.btnNew}">
          <iron-icon icon="vaadin:plus"></iron-icon>
          New
        </vaadin-button>
        <div id="total" style="flex-grow: 1"></div>
        <vaadin-button id="cancel" theme="small" @click="${this.btnCancel}">
          <iron-icon icon="vaadin:arrow-backward"></iron-icon>
          Cancel
        </vaadin-button>
        <vaadin-button id="delete" theme="small error" @click="${this.btnDelete}">
          <iron-icon icon="vaadin:close-small"></iron-icon>
          Delete
        </vaadin-button>
        <vaadin-button id="review" theme="small primary" @click="${this.btnSave}">
          <iron-icon icon="vaadin:check"></iron-icon>
          Save
        </vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-notification id="notification" position="bottom-stretch"></vaadin-notification>
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

    this.parent.onBeforeLeave = (_loc: any, commands: any) => {
      if (this.binder.isDirty) {
        this.show('Please save your modifications');
        return commands.prevent();
      }
    }
  }

  private getId() {
    let id = parseInt(String(this.location.params.id));
    return Number.isNaN(id) ? 0 : id;
  }

  private navigate(dir: number) {
    let id = this.getId();
    id = !id ? 1 : id + dir < 0 ? id : id + dir;
    this.routerGo(id ? id : undefined);
  }

  private routerGo(id?: number) {
    let path = this.location.pathname.replace(/\/\d*$/, '') + '/';
    path += typeof id === 'number' ? String(id) : '';
    window.dispatchEvent(new CustomEvent('vaadin-router-go', {detail: new URL(path, document.baseURI)}));
  }

  private btnPrev() {
    this.navigate(-1);
  }
  private btnNext() {
    this.navigate(1);
  }
  private async btnNew() {
    this.routerGo();
  }
  private btnCancel() {
    this.binder.reset();
  }
  private async btnSave() {
    try {
      const item = await this.binder.submitTo(this.submit);
      this.routerGo(item.id);
      this.show(`Item #${item.id} saved`);
    } catch (error) {
      (error as ValidationError).errors?.forEach(e => {
        if (e.validator.constructor.name === 'ServerValidator' && this.parent[e.property]) {
          this.parent[e.property].invalid = true;
          this.parent[e.property].errorMessage = e.validator.message;
        }
      })
      this.show(error.message);
    }
  }
  private async btnDelete() {
    const id = this.binder.model.id.valueOf();
    if (id) {
      try {
        await this.delete(this.binder.defaultValue);
        this.show(`Item #${id} deleted`);
        this.routerGo();
      } catch (error) {
        this.show(error.message);
      }
    }
  }

  private show(message: string) {
    this.notification.close();
    this.notification.renderer = (root: HTMLElement) => root.innerHTML = '<br/>' + message.replace(/\n/g, '<br/>') + '<br/><br/>';
    this.notification.open();
  }
}
