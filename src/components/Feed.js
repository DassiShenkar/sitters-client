import React from 'react';
import BaseData from '../data/BaseData';
import Nav from '../components/Nav';
import SitterList from '../components/SitterList';

class Feed extends React.Component {

    render() {
        const style = {
            width: '80%',
            margin: 'auto'
        };
        const sitters = BaseData.getSitters();
        return (
            <div style={style}>
                <h1>Feed</h1>
                <Nav name="Arel"
                     image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTYLooZuD2jyZ_RGPegqe1mmDhavIfmZeSpjYLsjSfsKRHpXcffHmMrmA"
                     alt="Arel"/>
                <SitterList sitters={sitters}/>
            </div>
        );
    }
}

export default Feed;
