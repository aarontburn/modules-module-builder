"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeSettingBox = void 0;
const NumberSettingBox_1 = require("./NumberSettingBox");
/**
 *  Range setting UI. Will render as a slider.
 *
 *  @author aarontburn
 */
class RangeSettingBox extends NumberSettingBox_1.NumberSettingBox {
    constructor(setting) {
        super(setting);
    }
    createRight() {
        const setting = this.getSetting();
        const range = setting.getRange();
        const step = setting.getStep();
        return `
            <div class="right-component">
                <div style="display: flex; flex-wrap: wrap">
                    <h1><span id='${this.resetID}'>↩</span> ${setting.getName()}</h1>
                    <p style="align-self: flex-end; padding-left: 24px;">${setting.getDescription()}</p>
                </div>

                <input type="range" 
                    style='width: 500px;'
                    min="${range.min}" max="${range.max}" step='${step}' 
                    id="${setting.getID()}_slider" value='${setting.getValue()}'>
            </div>
        `;
    }
    getInputIdAndType() {
        return [
            { id: this.getSetting().getID(), inputType: 'number' },
            { id: this.getSetting().getID() + "_slider", inputType: "range" }
        ];
    }
    onChange(newValue) {
        return [
            { id: this.getSetting().getID(), attribute: 'value', value: newValue },
            { id: this.getSetting().getID() + "_slider", attribute: 'value', value: newValue }
        ];
    }
}
exports.RangeSettingBox = RangeSettingBox;
