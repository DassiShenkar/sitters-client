import React from 'react';
import '../styles/css/feed.scss'
import Nav from './Nav'

class Feed extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <h1>Feed</h1>
                <Nav name="Arel" image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTYLooZuD2jyZ_RGPegqe1mmDhavIfmZeSpjYLsjSfsKRHpXcffHmMrmA"/>
            </div>
        )
    }
}

export default Feed;