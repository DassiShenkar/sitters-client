import React from 'react';
import 'rc-time-picker/assets/index.css';
class TimeInputBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(value) {
       this.props.action((value && value.format('H:mm')).toString());
    }

}

export default TimeInputBase;
