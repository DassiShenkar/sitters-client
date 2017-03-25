import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import LocationIcon from '../styles/icons/Location'


export default class Location extends React.Component {
    static propTypes = {
        text: React.PropTypes.string
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <div>
                <LocationIcon/>
            </div>
        );
    }
}