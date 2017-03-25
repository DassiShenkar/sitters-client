import React from 'react';
import SimpleMap from "./GoogleMaps";



class Test extends React.Component {
    constructor(){
        super();
    }

    render(){

        return (
            <div style={{width: '100%', height: '400px'}}>
                <SimpleMap/>
            </div>
        );
    }
}
export default Test;
