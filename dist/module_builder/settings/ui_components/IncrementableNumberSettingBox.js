"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrementableNumberSettingBox = void 0;
const NumberSettingBox_1 = require("./NumberSettingBox");
/**
 *  Similar to NumberSettingBox, but has buttons to increment.
 *
 *  @author aarontburn
 */
class IncrementableNumberSettingBox extends NumberSettingBox_1.NumberSettingBox {
    constructor(setting) {
        super(setting);
    }
    createLeft() {
        const setting = this.getSetting();
        const range = setting.getRange();
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
                <div style='display: flex; align-items: center'>
                    <p class='spinner' id='${setting.getID() + "_decrease"}'>–</p>

                        <input type="number" 
                            style="width: 70px; text-align: center; margin: 0px 5px;"
                            id="${setting.getID()}" value='${setting.getValue()}'>

                    <p class='spinner' id='${setting.getID() + "_increase"}'>+</p>
                </div>
                ${rangeText !== undefined
            ? `<p style='line-height: 21px; text-align: center'>${rangeText}</p>`
            : ''}
            </div>
        `;
    }
    getInputIdAndType() {
        return [
            { id: this.getSetting().getID(), inputType: 'number' },
            { id: this.getSetting().getID() + "_decrease", inputType: 'click', returnValue: 'decrease' },
            { id: this.getSetting().getID() + '_increase', inputType: 'click', returnValue: "increase" }
        ];
    }
    getStyle() {
        return `
            .spinner.spinner {
                font-size: 25px;
                width: 0.7em;
            }

            .spinner:hover {
                color: var(--accent-color);
                transition: 0.2s; 
            }
        `;
    }
}
exports.IncrementableNumberSettingBox = IncrementableNumberSettingBox;
