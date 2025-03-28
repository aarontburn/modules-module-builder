"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSetting = void 0;
const Setting_1 = require("../../Setting");
const NumberSettingBox_1 = require("../ui_components/NumberSettingBox");
const RangeSettingBox_1 = require("../ui_components/RangeSettingBox");
const IncrementableNumberSettingBox_1 = require("../ui_components/IncrementableNumberSettingBox");
/**
 *  Setting to receive number input.
 *
 *  Without specifying a min and max, the user may enter any number they want.
 *
 *  @author aarontburn
 */
class NumberSetting extends Setting_1.Setting {
    /**
     *  The minimum possible value. By default, it is unrestrained.
     */
    min = undefined;
    /**
     *  The maximum possible value. By default, it is unrestrained.
     */
    max = undefined;
    step = 1;
    useSlider = false;
    withoutIncrement = false;
    constructor(module, defer = false) {
        super(module, defer);
    }
    useRangeSliderUI() {
        this.withoutIncrement = false;
        this.useSlider = true;
        if (this.min === undefined) {
            this.setMin(0);
        }
        if (this.max === undefined) {
            this.setMax(100);
        }
        this.reInitUI();
        return this;
    }
    useNonIncrementableUI() {
        this.useSlider = false;
        this.withoutIncrement = true;
        this.reInitUI();
        return this;
    }
    /**
     *  Sets a minimum value. If the user inputs a number less than
     *      the specified minimum, it will default to the minimum.
     *
     *  @param min The lowest possible value for this setting.
     *  @returns itself.
     */
    setMin(min) {
        if (this.max !== undefined && min > this.max) {
            throw new Error(`Attempted to set a greater min than max. Min: ${min} | Max: ${this.max}`);
        }
        this.min = min;
        return this;
    }
    /**
     *  Sets a maximum value. If the user inputs a number greater than the
     *      specified maximum, it will default to the maximum.
     *
     *  @param max The maximum possible value.
     *  @returns itself.
     */
    setMax(max) {
        if (this.min !== undefined && max < this.min) {
            throw new Error(`Attempted to set a lower max than min. Min: ${this.min} | Max: ${max}`);
        }
        this.max = max;
        return this;
    }
    /**
     *  Sets the minimum and maximum possible values. If the
     *      user enters a number outside of the bounds, it will
     *      default to the minimum or the maximum, depending
     *      on which bound was exceeded.
     *
     *  @param min The minimum possible value.
     *  @param max The maximum possible value.
     *  @returns itself.
     */
    setRange(min, max) {
        if (min > max) {
            throw new Error(`Attempted to set a greater min than max. Min: ${min} | Max: ${max}`);
        }
        this.min = min;
        this.max = max;
        return this;
    }
    setStep(step) {
        this.step = step;
        return this;
    }
    getStep() {
        return this.step;
    }
    /**
     *  Returns the range. If both the minimum and maximum are
     *      undefined, it will return undefined. Otherwise,
     *      it will return an object, where the minimum and maximum could
     *      either be a number or undefined.
     *
     *  @returns An object with the specified minimum and maximum.
     */
    getRange() {
        if (this.min === undefined && this.max === undefined) {
            return undefined;
        }
        return { min: this.min, max: this.max };
    }
    validateInput(input) {
        let value;
        if (input === 'increase') {
            value = this.getValue() + this.step;
        }
        else if (input === 'decrease') {
            value = this.getValue() - this.step;
        }
        else if (typeof input === 'number') {
            value = Number(input);
        }
        else {
            try {
                const parsedValue = parseFloat(JSON.stringify(input).replace(/"/g, ''));
                if (!isNaN(parsedValue)) {
                    value = Number(parsedValue);
                }
                else {
                    return null;
                }
            }
            catch (err) {
                return null;
            }
        }
        const roundedValue = (value) => Number(value.toFixed(1));
        if (this.min === undefined && this.max === undefined) {
            return roundedValue(value);
        }
        if (this.min !== undefined) {
            value = Math.max(this.min, value);
        }
        if (this.max !== undefined) {
            value = Math.min(this.max, value);
        }
        return roundedValue(value);
    }
    setUIComponent() {
        if (this.useSlider) {
            return new RangeSettingBox_1.RangeSettingBox(this);
        }
        else if (this.withoutIncrement) {
            return new NumberSettingBox_1.NumberSettingBox(this);
        }
        return new IncrementableNumberSettingBox_1.IncrementableNumberSettingBox(this);
    }
}
exports.NumberSetting = NumberSetting;
