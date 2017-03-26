import React from 'react';
import SimpleMap from "./GoogleMaps";
import SearchBy from "./SearchByTab";
import BaseData from '../data/BaseData'
var geocoder = require('geocoder');


class Test extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){

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
