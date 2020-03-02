import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '@polymer/iron-ajax/iron-request.js'

class UserDetails extends mixinBehaviors([],PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>

      <iron-ajax

        id="browserdetails"
        url="/get_my_ip"
        method="post"
        handle-as="string"
        content-type="application/json"
        on-response="_handleRes"
        on-error="_error"
        with-credentials>
      </iron-ajax>

      <p>Browser Name - [[browserName]]</p>
      <p>Browser Version - [[fullVersion]]</p>
      <p>Client IP Adress - [[localIPAddress]]</p>
    `;
  }
  static get properties() {
    return {
      user_details: {
        browserName: {
          type: String,
          notify: true
        },
        fullVersion: {
          type: Float64Array,
          notify: true
        },
        localIPAddress: {
          notify: true
        },
      }
    };
  }

  _handleRes(resp) {
    this.localIPAddress = resp.detail.response;
    console.log("IP Address - ",this.localIPAddress)
  }

  ready() {
    super.ready();

     // console.log(this._root.querySelector('#getOffers'));
      this.nVer = navigator.appVersion;
      this.nAgt = navigator.userAgent;
      this.browserName  = navigator.appName;
      this.fullVersion  = ''+parseFloat(navigator.appVersion);
      var nameOffset,verOffset,ix;

      // In Opera 15+, the true version is after "OPR/"
      if ((verOffset=this.nAgt.indexOf("OPR/"))!=-1) {
        this.browserName = "Opera";
       this.fullVersion = this.nAgt.substring(verOffset+4);
      }
      // In older Opera, the true version is after "Opera" or after "Version"
      else if ((verOffset=this.nAgt.indexOf("Opera"))!=-1) {
        this.browserName = "Opera";
       this.fullVersion = this.nAgt.substring(verOffset+6);
       if ((verOffset=this.nAgt.indexOf("Version"))!=-1)
         this.fullVersion = this.nAgt.substring(verOffset+8);
      }
      // In MSIE, the true version is after "MSIE" in userAgent
      else if ((verOffset=this.nAgt.indexOf("MSIE"))!=-1) {
        this.browserName = "Microsoft Internet Explorer";
       this.fullVersion = this.nAgt.substring(verOffset+5);
      }
      // In Chrome, the true version is after "Chrome"
      else if ((verOffset=this.nAgt.indexOf("Chrome"))!=-1) {
        this.browserName = "Chrome";
       this.fullVersion = this.nAgt.substring(verOffset+7);
      }
      // In Safari, the true version is after "Safari" or after "Version"
      else if ((verOffset=this.nAgt.indexOf("Safari"))!=-1) {
        this.browserName = "Safari";
       this.fullVersion = this.nAgt.substring(verOffset+7);
       if ((verOffset=this.nAgt.indexOf("Version"))!=-1)
         this.fullVersion = this.nAgt.substring(verOffset+8);
      }
      // In Firefox, the true version is after "Firefox"
      else if ((verOffset=this.nAgt.indexOf("Firefox"))!=-1) {
        this.browserName = "Firefox";
       this.fullVersion = this.nAgt.substring(verOffset+8);
      }
      // In most other browsers, "name/version" is at the end of userAgent
      else if ( (nameOffset=this.nAgt.lastIndexOf(' ')+1) <
                (verOffset=this.nAgt.lastIndexOf('/')) )
      {
        this.browserName = this.nAgt.substring(nameOffset,verOffset);
       this.fullVersion = this.nAgt.substring(verOffset+1);
       if (this.browserName.toLowerCase()==this.browserName.toUpperCase()) {
        this.browserName = navigator.appName;
       }
      }
      // trim the this.fullVersion string at semicolon/space if present
      if ((ix=this.fullVersion.indexOf(";"))!=-1)
         this.fullVersion=this.fullVersion.substring(0,ix);
      if ((ix=this.fullVersion.indexOf(" "))!=-1)
         this.fullVersion=this.fullVersion.substring(0,ix);

      this.fullVersion = parseInt(''+this.fullVersion,10);
      if (isNaN(this.fullVersion)) {
       this.fullVersion  = ''+parseFloat(navigator.appVersion);
       this.fullVersion = parseInt(navigator.appVersion,10);
      }

      console.log("Browser name - ", this.browserName);
      console.log("Browser version - ", this.fullVersion);
      console.log("navigator.userAgent - ", navigator.userAgent);

      this.$.browserdetails.body = {
        'browser_name' : this.browserName,
        'browser_version': this.fullVersion
      };

      // console.log(this.$.browserdetails)
      this.$.browserdetails.generateRequest();
  }
}
window.customElements.define('user-details', UserDetails);

// var $ = document.getElementById; //freedom from document.getElementById!