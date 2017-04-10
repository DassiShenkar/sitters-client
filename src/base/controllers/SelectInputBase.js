import React from 'react';


class SelectBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };
    onChange(langArray){
        this.props.action(langArray);
    }
}

export default SelectBase;