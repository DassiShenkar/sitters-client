import React from 'react';
class RangeBase extends React.Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(values){
        this.props.action(values[0], values[1]);
        let sitters = this.props.feed.matches;
        this.props.changeSitters(sitters.filter(sitter => sitter.hourFee >= values[0] && sitter.hourFee <= values[1]));
    }
}
export default RangeBase;
