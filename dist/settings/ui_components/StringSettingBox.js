"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringSettingBox = void 0;
const SettingBox_1 = require("../../SettingBox");
class StringSettingBox extends SettingBox_1.SettingBox {
    createLeft() {
        return `
            <div class="left-component" style="display: flex;"></div>
        `;
    }
    createRight() {
        return `
            <div class="right-component">
                <div style="display: flex; flex-wrap: wrap">
                    <h1><span id='${this.resetID}'>↩</span> ${this.getSetting().getName()}</h1>
                    <p style="align-self: flex-end; padding-left: 24px;">${this.getSetting().getDescription()}</p>
                </div>

                <input type="text" style="width: 500px; box-sizing: border-box; padding-left: 15px; margin-top: 5px;" 
                    value="${this.getSetting().getValue()}" id="${this.getSetting().getID()}">
            </div>
        `;
    }
    getInputIdAndType() {
        return [{ id: this.getSetting().getID(), inputType: 'text' }];
    }
    onChange(newValue) {
        return [{ id: this.getSetting().getID(), attribute: 'value', value: newValue }];
    }
}
exports.StringSettingBox = StringSettingBox;
