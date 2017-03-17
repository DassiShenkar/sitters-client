import React from 'react';
import '../styles/css/feed.scss'
import SVGBase from '../base/controllers/SVGBase'
import ReactSVG from 'react-svg'
class SVG extends SVGBase {
    constructor(props) {
        super(props);
    };
    render() {
        let className = this.props.class?this.props.class:"svg";
        return (
            <ReactSVG
                path={this.props.path}
                //callback={svg => console.log(svg)}
                className={className}
            />
        )
    }
}

export default SVG;