import React from 'react';

class CheckBoxBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };
    onChange(newValue){
        this.setState({value: newValue});
    }
}

export default CheckBoxBase;