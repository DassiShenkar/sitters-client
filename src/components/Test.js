import React from 'react';
import store from '../store'
import actions from '../actions/actionCreators'

class Test extends React.Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){

    }

    render(){
        this.props.addRadio("female");
        return (
            <div>
                {/*<SearchBy sitters={BaseData.getSitters()}/>*/}
                <h1>Hello world</h1>
            </div>
        );
    }
}
export default Test;
