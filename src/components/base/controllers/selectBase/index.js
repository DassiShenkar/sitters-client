// external sources
import React from 'react';


export default class SelectBase extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };
    onChange(values){
        this.props.action(values);
    }
}
