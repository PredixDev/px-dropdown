/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-dropdown" description="Dropdowns have two primary use cases. First, as a form control, dropdown lists are ideal for a user to choose from a preconfigured list of options – ideally, between 5 and 15. If there are fewer than 5 options, consider using a radio button. For very large lists of options, consider adding typeahead functionality in addition to, or instead of, a dropdown. The second primary use case for a dropdown list is as a filter or navigation item, where invoking an option from the dropdown menu results in an action of some kind." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Code Editor -->
      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component" style="width:250px;">
        <px-dropdown items="{{props.items.value}}" display-value="{{props.displayValue.value}}" multi="{{props.multi.value}}" hide-chevron="{{props.hideChevron.value}}" allow-outside-scroll="{{props.allowOutsideScroll.value}}" disable-clear="{{props.disableClear.value}}" disable-select="{{props.disableSelect.value}}" disabled="{{props.disabled.value}}" sort-mode="{{props.sortMode.value}}" search-mode="{{props.searchMode.value}}" button-style="{{props.buttonStyle.value}}" icon="{{props.icon.value}}" show-caret="{{props.showCaret.value}}" trigger-height="{{props.triggerHeight.value}}" hoist="[[props.hoist.value]]">
        </px-dropdown>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-dropdown">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-dropdown"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-dropdown-demo',

  properties: {

    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    configs: {
      type: Array,
      value: function() {
        return [
          {
            configName: "Default",
            configReset: true
          },
          {
            configName: "Multiple select",
            displayValue: "Select",
            icon: "",
            sortMode: "key",
            buttonStyle: "bare--primary",
            multi: true,
            searchMode: true,
            disableClear: false,
            disableSelect: false,
            showCaret: false,
            triggerHeight: 30,
            items: [{"key":"1", "val": "iPhone"},{"key":"2", "val": "Android"},{"key":"3", "val": "Blackberry"},{"key":"4", "val": "Windows Phone"},{"key":"5", "val": "Flip Phone", "disabled": true}]
          },
          {
            configName: "Iconic menu",
            icon: "px-utl:app-settings",
            buttonStyle: "icon",
            multi: false,
            searchMode: false,
            disableClear: true,
            disableSelect: true,
            showCaret: true,
            triggerHeight: 20,
            items: [{"key":"1", "val": "Edit", "icon":"px-utl:edit","color":"black"},{"key":"2", "val": "Save", "icon":"px-utl:save","color":"green"},{"key":"3", "val": "Delete", "icon":"px-utl:delete","color":"red"}]
          }
        ];
      }
    }
  },

  demoProps: {
    items: {
      type: Array,
      defaultValue: [
        {"key":"1", "val": "iPhone"},
        {"key":"2", "val": "Android"},
        {"key":"3", "val": "Blackberry"},
        {"key":"4", "val": "Windows Phone"},
        {"key":"5", "val": "Flip Phone", "disabled": true}
      ],
      inputType: 'code:JSON'
    },
    sortMode: {
      type: String,
      defaultValue: 'key',
      inputType: 'dropdown',
      inputChoices: ['key','val']
    },
    buttonStyle: {
      type: String,
      defaultValue: 'default',
      inputType: 'dropdown',
      inputChoices: ['bare','bare--primary','default','tertiary','icon']
    },
    displayValue: {
      type: String,
      defaultValue: "Select",
      inputType: 'text'
    },
    icon: {
      type: String,
      defaultValue: '',
      inputType: 'text',
      inputPlaceholder: 'e.g. px-utl:app-settings',
      inputHelpText: 'Use with button style "icon"'
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    disableClear: {
      type: Boolean,
      defaultValue: true,
      inputType: 'toggle'
    },
    disableSelect: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    hideChevron:{
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    allowOutsideScroll:{
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    multi: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    searchMode: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    showCaret: {
      type: Boolean,
      defaultValue: false
    },
    triggerHeight: {
      type: Number,
      defaultValue: 30
    },
    hoist: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
  }
});
