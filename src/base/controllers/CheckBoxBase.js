import React from 'react';

class CheckBoxBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };
    onChange(newValue){
        this.props.action(newValue);
    }
}

export default CheckBoxBase;