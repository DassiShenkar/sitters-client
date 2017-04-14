import React from 'react';
class RangeBase extends React.Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        // this.state = {
        //     minRange : this.props.min,
        //     maxRange : this.props.max,
        // }
    }
    onChange(values){
        this.props.action(values[0], values[1]);
        // this.state = {
        //     minRange : values[0],
        //     maxRange : values[1],
        // };
        let sitters = this.props.feed.matches;
        this.props.changeSitters(sitters.filter(sitter => sitter.hourFee >= values[0] && sitter.hourFee <= values[1]));
        // sitters.forEach(function(sitter))
        //     if(sitter.hourFee >= values[0] && sitter.hourFee <= values[1])
        //         sitters.push(sitter);
        // }
        // this.setState({
        //     sitters : sitters,
        // });
        // this.refs.sitterList.state.sitters = sitters;
    }
}
export default RangeBase;
