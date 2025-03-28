"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoiceSetting = void 0;
const Setting_1 = require("../../Setting");
const DropdownSettingBox_1 = require("../ui_components/DropdownSettingBox");
const RadioSettingBox_1 = require("../ui_components/RadioSettingBox");
/**
 *  A setting that allows the user to selected from preset options.
 *      Only one option is able to be selected.
 *
 *  @author aarontburn
 */
class ChoiceSetting extends Setting_1.Setting {
    /**
     *  The stored options. Does not allow duplicate options.
     */
    options = new Set();
    /**
     *  @see useDropdown()
     *
     *  If this is true, the UI will be a dropdown selector
     *      instead of radio buttons.
     */
    dropdown = false;
    /**
     *  @param module The parent module.
     */
    constructor(module) {
        super(module, true);
    }
    /**
     *  @see dropdown
     *  If this function is called, the UI will be replaced with
     *      a dropdown selector instead of radio buttons.
     *
     *  @returns itself.
     */
    useDropdown() {
        this.dropdown = true;
        this.reInitUI();
        return this;
    }
    /**
     *  Adds a single option.
     *
     *  To add multiple at once, @see addOptions
     *
     *  @example addOption("Apple");
     *  @param option The name of the option to add.
     *  @returns itself.
     */
    addOption(option) {
        return this.addOptions(option);
    }
    /**
     *  Add option(s).
     *
     *  @example addOptions("Apple", "Orange", "Banana");
     *  @param options The option(s) to add.
     *  @returns itself.
     */
    addOptions(...options) {
        for (const option of options) {
            this.options.add(option);
        }
        this.reInitUI();
        return this;
    }
    /**
     *  @returns a copy of all options.
     */
    getOptionNames() {
        return new Set(this.options.keys());
    }
    validateInput(input) {
        const s = JSON.stringify(input).replace(/"/g, '');
        if (!this.options.has(s)) {
            return null;
        }
        return s;
    }
    setUIComponent() {
        if (this.dropdown) {
            return new DropdownSettingBox_1.DropdownSettingBox(this);
        }
        return new RadioSettingBox_1.RadioSettingBox(this);
    }
}
exports.ChoiceSetting = ChoiceSetting;
