// external sources
import React from 'react';

// components
import Slider from 'rc-slider';

import SliderBase from "../../base/controllers/sliderBase/index";

export default class OurSlider extends SliderBase {

    render() {
        return (
            <div className={this.props.className}>
                <label className="left-label">{this.props.leftLabel}</label>
                <Slider dots={true} disabled={this.props.disabled} min={this.props.min} max={this.props.max} step={this.props.step}
                        value={this.props.value} defaultValue={this.props.defaultValue}/>
                <label className="right-label">{this.props.rightLabel}</label>
            </div>
        )}
}