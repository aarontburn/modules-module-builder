"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexColorSetting = void 0;
const Setting_1 = require("../../Setting");
const ColorSettingBox_1 = require("../ui_components/ColorSettingBox");
/**
 *  Setting to receive color input.
 *
 *  @author aarontburn
 */
class HexColorSetting extends Setting_1.Setting {
    constructor(module) {
        super(module);
    }
    validateInput(input) {
        if (input === null) {
            return null;
        }
        const s = JSON.stringify(input).replace(/"/g, '').toUpperCase();
        return s.match("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$") ? s : null;
    }
    setUIComponent() {
        return new ColorSettingBox_1.ColorSettingBox(this);
    }
}
exports.HexColorSetting = HexColorSetting;
