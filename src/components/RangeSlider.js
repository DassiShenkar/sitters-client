import React from 'react';
import 'rc-slider/assets/index.css'
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import RangeBase from '../base/controllers/RangeBase'
class RangeSlider extends RangeBase {
    render(){
        const wrapperStyle = { width: 200, margin: 50 };
        return (
            <div>
                    <div style={wrapperStyle}>
                        <p>{this.state.minRange}</p>
                        <Range allowCross={false} min={this.props.min} max={this.props.max} defaultValue={[this.props.min,this.props.max]} onChange={this.onChange} tipFormatter={value => `${value}$`}  />
                        <p>{this.state.maxRange}</p>
                    </div>
            </div>
        );
    }
}
export default RangeSlider;
