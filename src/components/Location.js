import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import LocationIcon from '../styles/icons/Location'
import {Image} from "react-bootstrap";


export default class Location extends React.Component {
    static propTypes = {
        text: React.PropTypes.string
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <div>
                <Image src={this.props.sitter.profilePicture} width="30px" height="30px" circle={true}/>
            </div>
        );
    }
}