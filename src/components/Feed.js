import React from 'react';
import Nav from '../components/Nav';
import SitterList from '../components/SitterList';
import BaseData from '../data/BaseData';
import TimeInput from "./controllers/TimeInput";
import SearchByTab from "./SearchByTab";

class Feed extends React.Component {


    render() {
        const style = {
            width: '80%',
            margin: 'auto'
        };
        const sitters = BaseData.getSitters();
        const parent = BaseData.getParents();
        return (
            <div style={style}>
                <h1>Feed</h1>
                <Nav name={parent.name}
                     image={parent.image}
                     alt={parent.name}
                     invites={parent.invites}
                     notifications={parent.notifications}
                     {...this.props}/>
                {/*<SearchByTab {...this.props} sitters={BaseData.getSitters()}/>*/}
                <SitterList sitters={sitters}/>
            </div>
        );
    }
}

export default Feed;
