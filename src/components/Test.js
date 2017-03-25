import React from 'react';
import SearchBy from './SearchByTab'
import TimeInput from './controllers/TimeInput'
import DatePicker from './controllers/DatePicker'
import BaseData from '../data/BaseData'
class Test extends React.Component {
    constructor(){
        super();
    }

    render(){

        return (

            <div>
                {/*<SearchBy sitters={BaseData.getSitters()}/>*/}
                {/*<TimeInput/>*/}
                <DatePicker/>
            </div>
        );
    }
}
export default Test;
