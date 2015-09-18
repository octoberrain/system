/*
 * Inspector string editor class.
 */
+function ($) { "use strict";

    var Base = $.oc.inspector.propertyEditors.base,
        BaseProto = Base.prototype

    var StringEditor = function(inspector, propertyDefinition, containerCell) {
        Base.call(this, inspector, propertyDefinition, containerCell)
    }

    StringEditor.prototype = Object.create(BaseProto)
    StringEditor.prototype.constructor = Base

    StringEditor.prototype.dispose = function() {
        this.unregisterHandlers()

        BaseProto.dispose.call(this)
    }

    StringEditor.prototype.build = function() {
        var editor = document.createElement('input'),
            placeholder = this.propertyDefinition.placeholder !== undefined ? this.propertyDefinition.placeholder : '',
            value = this.inspector.getPropertyValue(this.propertyDefinition.property)

        editor.setAttribute('type', 'text')
        editor.setAttribute('class', 'string-editor')
        editor.setAttribute('placeholder', 'placeholder')

        if (value === undefined) {
            value = this.propertyDefinition.default
        }

        editor.value = value

        $.oc.foundation.element.addClass(this.containerCell, 'text')

        this.containerCell.appendChild(editor)
    }

    StringEditor.prototype.getInput = function() {
        return this.containerCell.querySelector('input')
    }

    StringEditor.prototype.registerHandlers = function() {
        var input = this.getInput()

        input.addEventListener('focus', this.proxy(this.onInputFocus))
        input.addEventListener('keyup', this.proxy(this.onInputKeyUp))
    }

    StringEditor.prototype.unregisterHandlers = function() {
        var input = this.getInput()

        input.removeEventListener('focus', this.proxy(this.onInputFocus))
        input.removeEventListener('keyup', this.proxy(this.onInputKeyUp))
    }

    StringEditor.prototype.onInputFocus = function(ev) {
        this.inspector.makeCellActive(this.containerCell)
    }

    StringEditor.prototype.onInputKeyUp = function() {
        var value = this.getInput().value

        this.inspector.setPropertyValue(this.propertyDefinition.property, value)
    }

    $.oc.inspector.propertyEditors.string = StringEditor
}(window.jQuery);