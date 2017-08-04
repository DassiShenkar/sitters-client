// external sources
import * as React from "react";
import * as _ from "lodash";

export default class CheckBoxBase extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };

    onChange(newValue) {
        this.props.action(newValue, this.props.day);
        if(this.props.filterMatches){
            let sitters = [];
            for(let sitter of this.props.feed.matches){
                let sameHours = _.intersection(newValue, sitter.workingHours[this.props.searchBy.inviteDay.toLowerCase()]);
                if(sameHours.length > 0)
                    sitters.push(sitter);
            }
            this.props.changeSitters(sitters);
        }
    }
}