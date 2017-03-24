import React from 'react';
import SearchBy from './SearchByTab'
import BaseData from '../data/BaseData'
class Test extends React.Component {
    constructor(){
        super();
    }

    render(){

        return (

            <div>
                <SearchBy sitters={BaseData.getSitters()}/>
            </div>
        );
    }
}
export default Test;
