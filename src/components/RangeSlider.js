import Slider from "rc-slider";
import React from 'react';
import 'rc-slider/assets/index.css'
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import RangeBase from '../base/controllers/RangeBase'
class RangeSlider extends RangeBase {
    render() {

        let minValue = typeof this.props.searchBy.priceMinRange === "undefined" ? this.props.min : this.props.searchBy.priceMinRange;
        let maxValue = typeof this.props.searchBy.priceMaxRange === "undefined" ? this.props.max : this.props.searchBy.priceMaxRange;

        return (
            <div id="search-range">
                <Range allowCross={false} min={this.props.min} max={this.props.max} defaultValue={[minValue, maxValue]}
                       onChange={this.onChange} tipFormatter={value => `${value}$`} disabled/>
                <label>{'Price Range: ' + minValue + '-' + maxValue}</label>
            </div>
        );
    }
}
export default RangeSlider;
