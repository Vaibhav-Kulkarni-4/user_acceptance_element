import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `user-details`
 * element that captures user details
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class UserDetails extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'user-details',
      },
    };
  }
}

window.customElements.define('user-details', UserDetails);
