"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSettingBox = void 0;
const SettingBox_1 = require("../../SettingBox");
/**
 *  Number setting box.
 *
 *  @author aarontburn
 */
class NumberSettingBox extends SettingBox_1.SettingBox {
    createLeft() {
        const range = this.getSetting().getRange();
        let rangeText;
        if (range !== undefined) {
            if (range.min === undefined && range.max !== undefined) {
                rangeText = '≤ ' + range.max;
            }
            else if (range.min !== undefined && range.max === undefined) {
                rangeText = '≥ ' + range.min;
            }
            else if (range.min !== undefined && range.max !== undefined) {
                rangeText = `${range.min} - ${range.max}`;
            }
        }
        return `
            <div class="left-component">
                <input type="number" style="width: 110px; text-align: center;"
                    id="${this.getSetting().getID()}" value='${this.getSetting().getValue()}'>
                ${rangeText !== undefined
            ? `<p style='line-height: 21px;'>${rangeText}</p>`
            : ''}
            </div>
        `;
    }
    getInputIdAndType() {
        return [{ id: this.getSetting().getID(), inputType: 'number' }];
    }
    onChange(newValue) {
        return [{ id: this.getSetting().getID(), attribute: 'value', value: newValue }];
    }
}
exports.NumberSettingBox = NumberSettingBox;
