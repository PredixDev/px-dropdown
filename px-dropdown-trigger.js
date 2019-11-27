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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-icon-set/px-icon-set.js';
import 'px-icon-set/px-icon.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import './css/px-dropdown-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="px-dropdown-styles"></style>
    <div class="trigger">
      <div id="trigger" class\$="dropdown-trigger btn {{_getClass(buttonStyle)}}" tabindex="0">
        <template is="dom-if" if="{{!_isEqual(buttonStyle,'icon')}}">
          <div id="label" class="dropdown-label">{{displayValueSelected}}</div>
        </template>
        <template is="dom-if" if="{{_isEqual(buttonStyle,'icon')}}">
          <px-icon class="custom-icon" icon="{{icon}}"></px-icon>
        </template>
        <template is="dom-if" if="{{_showClearButton(disableClear,buttonStyle,opened,selected,selectedValues,selectedValues.*)}}">
          <px-icon class="dropdown-icon" icon="px-nav:close" on-tap="clear"></px-icon>
        </template>
        <template is="dom-if" if="{{_showChevron(disableClear,hideChevron,buttonStyle,opened,selected,selectedValues,selectedValues.*)}}">
          <px-icon class="dropdown-icon" icon="px-utl:chevron"></px-icon>
        </template>
      </div>
    </div>
`,

  is: 'px-dropdown-trigger',

  behaviors: [
    AppLocalizeBehavior
  ],

  listeners: {
    'tap' : '_handleTapped'
  },

  properties: {
    /**
     * A flag which reflects if the dropdown trigger has been clicked or not.
     */
    opened: {
      type: Boolean,
      notify: true,
      value: false
    },
    /**
     * Read-only reference to the trigger element. Data-bind this property
     * into the px-context-browser `openTrigger` or `favoritedTrigger`
     * property to open the context browser when this icon is tapped.
     */
    trigger: {
      type: HTMLElement,
      readOnly: true,
      notify: true,
      value: null
    },
    /**
     * Whether or not to hide the chevron icon from the dropdown.
     */
    hideChevron: {
      type: Boolean,
      value: false
    },
    /**
     * The placeholder text to display in the dropdown. If the
     * selected value(s) are cleared out, the displayValue will be
     * replaced in the dropdown.
     */
    displayValue: {
      type: String,
      notify: true,
      value: 'Select',
      observer: '_displayValueChanged'
    },
    /**
     * The text that is displayed in the label of the dropdown.
     * Updated when the selections change.
     */
    displayValueSelected: {
      type: String,
      notify: true
    },
    /**
     * Style for the button that invokes the dropdown.
     * One of 'default','bare','bare--primary', 'tertiary', or 'icon'.
     */
    buttonStyle: {
      type: String,
      value: 'default'
    },
    /**
     * If set to true, the display-value will always show up in the
     * invoking button of the dropdown. Useful in cases like the
     * px-data-table, where "Show/Hide Columns" should always appear.
     */
    hideSelected: {
      type: Boolean,
      value: false
    },
    /**
     * If buttonStyle is set to 'icon' this property will dictate
     * which icon will be displayed inside of the dropdown button.
     * The `displayValue`, selected values, and chevron will not be displayed.
     * Perfect for icon-invoked menus. The value of this property should
     * be a valid px-icon name, e.g. 'px-utl:app-settings'
     */
    icon: {
      type: String,
      value: ''
    },
    /**
     * If set, the items list will be in read only mode, the list is disabled
     * and the user can not click the items. No events are fired.
     */
    disabledViewable: {
      type: Boolean,
      observer: '_setDisabledViewableClass'
    },
    /**
     * If set, the items list will be in read only mode, the list is disabled
     * and the user can not click the items. No events are fired.
     */
    readOnly: {
      type: Boolean,
      observer: '_setReadOnlyClass'
    },
    /**
     * If set, the items list will be in read only mode, the list is disabled
     * and the user can not click the items. No events are fired.
     */
    disabled: {
      type: Boolean,
      observer: '_setDisabledClass'
    }
  },

  attached: function() {
    this._setTrigger(this);
  },

  detached: function() {
    this._setTrigger(null);
  },

  /**
   * Fires an event to the main px-dropdown component to toggle the open state.
   */
  _handleTapped: function(evt) {
    evt.preventDefault();
    if(!this.disabled) {
      this.fire('trigger-tapped');
    }
  },

  /**
   * Fires an event to the main px-dropdown component to clear all selections.
   */
  clear: function() {
    this.fire('clear-tapped');
  },

  /**
   * Calculates if two things are equal.
   */
  _isEqual: function(a,b) {
    return a === b;
  },

  /**
   * Calculates the class for a disabled dropdown.
   */
  _setDisabledClass: function() {
    if(this.disabled) {
      this.toggleClass('btn--disabled',true,dom(this.$.trigger));
    } else {
      this.toggleClass('btn--disabled',false,dom(this.$.trigger));
    }
  },

  /**
   * Calculates the class for a disabled viewable dropdown.
   */
  _setDisabledViewableClass: function() { 
    if(this.disabledViewable) {
      this.toggleClass('dropdown--disabled-viewable',true,dom(this.$.trigger));
    } else {
      this.toggleClass('dropdown--disabled-viewable',false,dom(this.$.trigger));
    }
  },

  /**
   * Calculates the class for a disabled viewable dropdown.
   */
  _setReadOnlyClass: function() { 
    if(this.readOnly) {
      this.toggleClass('dropdown--read-only',true,dom(this.$.trigger));
    } else {
      this.toggleClass('dropdown--read-only',false,dom(this.$.trigger));
    }
  },

  /**
   * Calculates the class for a bare dropdown.
   */
  _getClass: function() {
    if(this.buttonStyle === 'bare') return 'btn--bare u-ph0';
    else if(this.buttonStyle === 'bare--primary') return 'btn--bare--primary u-ph0';
    else if(this.buttonStyle === 'tertiary') return 'btn--tertiary';
    else if(this.buttonStyle === 'icon') return 'btn--bare btn--icon';
    else return ''
  },

  /**
   * When `displayValue` update `displayValueSelected`
   */
  _displayValueChanged: function(){
    this.displayValueSelected = this.displayValue;
  },

  /**
   * Determines whether to display the clear button inside the dropdown.
   */
  _showClearButton: function(disableClear, buttonStyle, opened, selected, selectedValues) {
    // Always hide it if the configuration is present or the 'icon' button style is used.
    if(this.readOnly || this.disabledViewable || disableClear || buttonStyle === 'icon') {
      return false;
    }
    // Show it if the dropdown is opened and something is selected.
    else if(opened && (typeof selected === 'string' || typeof selected === 'number' || selectedValues.length > 0)) {
      return true;
    }
    // Otherwise hide it.
    else {
      return false;
    }
  },

  /**
   * Determines whether to display the chevron button inside the dropdown.
   */
  _showChevron: function(disableClear, hideChevron, buttonStyle, opened, selected, selectedValues) {
    // Always hide it if the configuration is present or the 'icon' button style is used.
    if(hideChevron || buttonStyle === 'icon') {
      return false;
    }
    // Show it if the clear button is disabled, or if nothing is selected, otherwise it looks too empty.
    else if(this.readOnly || this.disabledViewable || !opened || disableClear || (opened && !selected && selectedValues.length === 0)) {
      return true;
    }
    // Otherwise hide it.
    else {
      return false;
    }

  }
});
