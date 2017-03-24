import React from 'react';
class RangeBase extends React.Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            minRange : this.props.min,
            maxRange : this.props.max,
        }
    }
    onChange(value){
        this.setState({
            minRange:value[0],
            maxRange:value[1]
        });
    }
}
export default RangeBase;
