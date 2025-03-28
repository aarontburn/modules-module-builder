"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringSetting = void 0;
const Setting_1 = require("../../Setting");
const StringSettingBox_1 = require("../ui_components/StringSettingBox");
/**
 *  Setting to hold string input.
 *
 *  @author aarontburn
 */
class StringSetting extends Setting_1.Setting {
    constructor(module) {
        super(module);
    }
    validateInput(input) {
        const s = JSON.stringify(input).replace(/"/g, '');
        return s === "" ? null : s;
    }
    setUIComponent() {
        return new StringSettingBox_1.StringSettingBox(this);
    }
}
exports.StringSetting = StringSetting;
