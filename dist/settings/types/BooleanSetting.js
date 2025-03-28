"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanSetting = void 0;
const Setting_1 = require("../../Setting");
const BooleanSettingBox_1 = require("../ui_components/BooleanSettingBox");
/**
 *  Setting to receive boolean input. Will render in the form of a toggle switch
 *      instead of a checkbox.
 *
 *  @author aarontburn
 */
class BooleanSetting extends Setting_1.Setting {
    constructor(module) {
        super(module);
    }
    validateInput(input) {
        if (input === null) {
            return null;
        }
        if (typeof input === "boolean") {
            return input;
        }
        const s = JSON.stringify(input).replace(/"/g, '');
        if (s === "true") {
            return true;
        }
        else if (s === "false") {
            return false;
        }
        return null;
    }
    setUIComponent() {
        return new BooleanSettingBox_1.BooleanSettingBox(this);
    }
}
exports.BooleanSetting = BooleanSetting;
