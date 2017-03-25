import React from 'react';
import SimpleMap from "./GoogleMaps";
import SearchBy from "./SearchByTab";
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
            // <div style={{width: '100%', height: '400px'}}>
            //     <SimpleMap/>
            // </div>
            //
        );
    }
}
export default Test;
