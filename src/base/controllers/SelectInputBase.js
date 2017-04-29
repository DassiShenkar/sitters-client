import React from 'react';


class SelectBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };
    onChange(values){
        this.props.action(values);
    }
}

export default SelectBase;