// external sources
import React from 'react';

export default class RangeBase extends React.Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(values){
        this.props.action(values[0], values[1]);
        this.props.changeSitters(this.props.feed.matches.filter(sitter => sitter.hourFee >= values[0] && sitter.hourFee <= values[1])); // filter sitters require hourFee
    }
}