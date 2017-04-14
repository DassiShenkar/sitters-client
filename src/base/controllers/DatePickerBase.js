import React from 'react';
import dateFormat from 'dateformat'
import 'rc-time-picker/assets/index.css';
import moment from "moment";
class DatePickerBase extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value, formattedValue){
        if(this.props.action){
            this.props.action(formattedValue,dateFormat(value, "dddd"),value);
            let day = this.props.searchBy.inviteDay.toLowerCase();
            let from = this.props.searchBy.fromTime;
            let to = this.props.searchBy.toTime;
            let sitters = [];

            // let ms = moment(to,"HH:mm").diff(moment(from,"HH:mm"));
            // var d = moment.duration(ms);
            // var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
            //console.log(s[0] === '-'? "notOk":'ok');
            for(let sitter of this.props.feed.matches){
                let startMS = moment(sitter.workingHours[day]['start'],"HH:mm").diff(moment(from,"HH:mm"));
                let startDuration = moment.duration(startMS);
                let startDiff = Math.floor(startDuration.asHours()) + moment.utc(startMS).format(":mm");
                console.log(sitter.name + "  " +  startDiff);
                if(startDiff[0] !== '-'){
                    console.log(startDiff);
                    let finishMS = moment(to,"HH:mm").diff(moment(sitter.workingHours[day]['finish'],"HH:mm"));
                    let finishDuration = moment.duration(finishMS);
                    let finishDiff = Math.floor(finishDuration.asHours()) + moment.utc(finishMS).format(":mm");
                    console.log(finishDiff);
                    if(finishDiff[0] !== '-'){
                        sitters.push(sitter);
                    }
                }
                console.log(sitters);
                //console.log(s[0] === '-'? "notOk":'ok');
                //let finishMS = moment(finish,"HH:mm").diff(moment(sitter.workingHours[day]['finish'],"HH:mm"));
                //let start = sitter.workingHours[day]['start'].split(':');
                //let finish = sitter.workingHours[day]['finish'].split(':');
                //if()
                // console.log(parseInt(start[0]));
                // console.log(parseInt(start[1]));

            }
            if(this.props.changeSitters){
                this.props.changeSitters(sitters);
            }
            // this.setState({
            //     sitters : sitters,
            // });
            // this.refs.sitterList.state.sitters = sitters;
            // console.log(sitters.length);


        }


    }
}

export default DatePickerBase;
