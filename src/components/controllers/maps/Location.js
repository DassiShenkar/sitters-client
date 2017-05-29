import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
// import LocationIcon from '../styles/icons/Location'
import {Image} from "react-bootstrap";


export default class Location extends React.Component {
    static propTypes = {
        text: React.PropTypes.string
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        if(this.props.$hover) {

        }
        return (
            <div onClick={console.log("image")}>
                <Image src={this.props.sitter.profilePicture} height="30px" circle={true}/>
            </div>
        );
    }
}