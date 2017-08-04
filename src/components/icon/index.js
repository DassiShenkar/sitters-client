// external sources
import React from 'react';

export default class Icon extends React.Component {
    render() {
        return (
            <span className={this.props.name} onClick={this.props.action}/>
        );
    }
}