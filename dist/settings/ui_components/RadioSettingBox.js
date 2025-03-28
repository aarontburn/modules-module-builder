"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioSettingBox = void 0;
const SettingBox_1 = require("../../SettingBox");
/**
 *  Setting UI to handle selection input. The user will be presented with multiple options,
 *
 *  @author aarontburn
 */
class RadioSettingBox extends SettingBox_1.SettingBox {
    optionsIDMap = new Map();
    constructor(setting) {
        super(setting);
        const options = this.getSetting().getOptionNames();
        let i = 0;
        options.forEach((option) => {
            this.optionsIDMap.set(option, this.getSetting().getID() + 'option_' + i);
            i++;
        });
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

                <div style='display: flex; flex-wrap: wrap; align-items: center'>
                    ${this.getInputOptions()}
                </div>
            </div>
        `;
        return html;
    }
    getInputOptions() {
        let s = '';
        const setting = this.getSetting();
        this.optionsIDMap.forEach((id, optionName) => {
            s += `
                <input type="radio" id="${id}" name="${this.getSetting().getName()}" 
                    value="${optionName}" ${setting.getValue() === optionName ? 'checked' : ''}>

                <label class='radio-label' for="${id}">${optionName}</label>
                \n
            `;
        });
        return s;
    }
    getInputIdAndType() {
        const inputElements = [];
        this.optionsIDMap.forEach((id, optionName) => {
            inputElements.push({ id: id, inputType: 'radio', returnValue: optionName });
        });
        return inputElements;
    }
    onChange(newValue) {
        const changeEvents = [];
        this.optionsIDMap.forEach((id, optionName) => {
            changeEvents.push({ id: id, attribute: 'checked', value: newValue === optionName });
        });
        return changeEvents;
    }
    getStyle() {
        return `
            .radio-label {
                margin-left: 10px;
                margin-right: 25px;
                font-size: 18px;
            }

            input[type='radio'] {
                margin: 0;
                padding: 0;
            }

            input[type='radio']:after {
                width: 15px;
                height: 15px;
                border-radius: 15px;
                top: -3px;
                left: -1px;
                position: relative;
                background-color: #6a6a6a;
                content: '';
                display: inline-block;
                visibility: visible;
                transition: 0.2s;
                cursor: pointer;
            }

            input[type='radio']:checked:after {
                background-color: var(--accent-color);
            }
        `;
    }
}
exports.RadioSettingBox = RadioSettingBox;
