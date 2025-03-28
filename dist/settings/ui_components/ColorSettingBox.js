"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorSettingBox = void 0;
const StringSettingBox_1 = require("./StringSettingBox");
/**
 *  Color setting box. The user can use a color picker or paste in
 *      a color of their choosing, in hexadecimal.
 *
 *  @author aarontburn
 */
class ColorSettingBox extends StringSettingBox_1.StringSettingBox {
    createLeft() {
        return `
            <div class="left-component">
                <input id='${this.getSetting().getID() + "_color-picker"}' style='width: 115px; height: 48px' type="color" value="${super.getSetting().getValue()}" />
            </div>
        `;
    }
    getInputIdAndType() {
        return [
            { id: this.getSetting().getID(), inputType: 'text' },
            { id: this.getSetting().getID() + "_color-picker", inputType: 'color' }
        ];
    }
    onChange(newValue) {
        return [
            { id: this.getSetting().getID(), attribute: 'value', value: newValue },
            { id: this.getSetting().getID() + "_color-picker", attribute: 'value', value: newValue }
        ];
    }
}
exports.ColorSettingBox = ColorSettingBox;
