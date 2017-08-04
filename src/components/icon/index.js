// external sources
import React from 'react';

// style
import './style.css';

export default class Icon extends React.Component {
    render() {
        return (
            <span className={this.props.name} onClick={this.props.action}/>
        );
    }
}