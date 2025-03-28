"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownSettingBox = void 0;
const SettingBox_1 = require("../../SettingBox");
/**
 *  Alternative SettingBox to the radio buttons to hold choice input.
 *
 *  @author aarontburn
 */
class DropdownSettingBox extends SettingBox_1.SettingBox {
    constructor(setting) {
        super(setting);
    }
    createLeft() {
        return `
            <div class="left-component" style="display: flex;"></div>
        `;
    }
    createRight() {
        const html = `
            <div class="right-component">
                <div style="display: flex; flex-wrap: wrap">
                    <h1><span id='${this.resetID}'>↩</span> ${this.getSetting().getName()}</h1>
                    <p style="align-self: flex-end; padding-left: 24px;">${this.getSetting().getDescription()}</p>
                </div>

                <div class='select'>
                    <select id=${this.getSetting().getID()}>
                        ${this.getInputOptions()}
                    </select>
                </div>


            </div>
        `;
        return html;
    }
    getInputOptions() {
        let s = '';
        const setting = this.getSetting();
        setting.getOptionNames().forEach((optionName) => {
            s += `
                <option value=${optionName} ${setting.getValue() === optionName ? 'selected' : ''}>${optionName}</option>
                \n
            `;
        });
        return s;
    }
    getInputIdAndType() {
        return [{ id: this.getSetting().getID(), inputType: "select" }];
    }
    getStyle() {
        return `
            select {
                /* Reset Select */
                appearance: none;
                outline: 10px red;
                border: 0;
                box-shadow: none;

                /* Personalize */
                flex: 1;
                padding: 0 1em;
                color: var(--accent-color);
                background-color: var(--off-black);
                cursor: pointer;
                font-size: 18px;
            }

            /* Custom Select wrapper */
            .select {
                position: relative;
                display: flex;
                width: 500px;
                height: 2.5em;
                border-radius: .25em;
                overflow: hidden;
                margin-top: 5px;
                border: 1px solid var(--off-white);
            }

            select option {
                color: var(--off-white);
            }

            /* Arrow */
            .select::after {
                content: '\\25BC';
                position: absolute;
                
                right: 0;
                padding: 0.5em;
                transition: .25s all ease;
                pointer-events: none;
            }

            /* Transition */
            .select:hover::after {
                color: var(--accent-color);
            }
        
        `;
    }
}
exports.DropdownSettingBox = DropdownSettingBox;
