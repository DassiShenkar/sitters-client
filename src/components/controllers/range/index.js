// external sources
import React from 'react';

// components
import Slider from "rc-slider";
import RangeBase from '../../base/controllers/range/index'

// style
import 'rc-slider/assets/index.css';

export default class RangeSlider extends RangeBase {
    render() {
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);
        let minValue = typeof this.props.searchBy.priceMinRange === "undefined" ? this.props.min : this.props.searchBy.priceMinRange;
        let maxValue = typeof this.props.searchBy.priceMaxRange === "undefined" ? this.props.max : this.props.searchBy.priceMaxRange;

        return (
            <div id="search-range">
                <Range allowCross={false}
                       min={this.props.min}
                       max={this.props.max}
                       defaultValue={[minValue, maxValue]}
                       onChange={this.onChange} tipFormatter={value => `${value}$`} disabled={this.props.disabled}/>
                <label>{'Price Range: ' + minValue + '-' + maxValue}</label>
            </div>
        );
    }
}