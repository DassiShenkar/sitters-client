import React from 'react';
import '../styles/css/feed.scss'
import Nav from './Nav'
import SitterList from './SitterList'

class Feed extends React.Component {

    render() {
        let sitters = [{
            name: "arel",
            matchScore: 85,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }, {
            name: "arel1",
            matchScore: 80,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }, {
            name: "arel2",
            matchScore: 75,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }];
        return (
            <div>
                <h1>Feed</h1>
                <Nav name="Arel"
                     image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTYLooZuD2jyZ_RGPegqe1mmDhavIfmZeSpjYLsjSfsKRHpXcffHmMrmA"
                     alt="Arel"/>
                <SitterList sitters={sitters}/>
            </div>
        )
    }
}

export default Feed;