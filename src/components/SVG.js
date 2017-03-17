import React from 'react';
import SVGBase from '../base/SVGBase';
import Isvg from 'react-inlinesvg';

class SVG extends SVGBase {
    constructor(props) {
        super(props);
    };
    render() {
        var svg = require('../styles/images/search.svg');
        return (
           <div>{svg}</div>
        )
    }
}

export default SVG;