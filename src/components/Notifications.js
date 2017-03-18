import React from 'react';
import List from './List';

class Notifications  extends React.Component{

    constructor() {
        super();
        this.state = {
            items: [{name: 'name1', image: 'image1', text: 'text1', time: 'time1'}, {name: 'name2', image: 'image2', text: 'text2', time: 'time2'}, {name: 'name3', image: 'image3', text: 'text3', time: 'time3'}]
        }
    }

    render(){
        return(
            <List items={this.state.items}/>
        )
    }
}

export default Notifications;
