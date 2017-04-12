import React from 'react';
import axios from 'axios';

import Nav from '../components/Nav';
import SitterList from '../components/SitterList';
import BaseData from '../data/BaseData';
import TimeInput from "./controllers/TimeInput";
import SearchByTab from "./SearchByTab";

class Feed extends React.Component {
    
    componentWillMount() {
        let self = this;
        const userId = localStorage.getItem('auth_token');
        if (userId) {
            axios.post('https://sitters-server.herokuapp.com/parent/get', {
                id: userId
            })
                .then(function (res) {
                    if (res.data) {  // user exists
                        console.log(res.data);
                        self.props.actions.actionCreators.getUserData(res.data);
                    }
                    else { // user not exist
                        self.props.router.push('/login');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }



    render() {
        return (
            <div>
                <h1>Feed</h1>
                <Nav name={this.props.user.name}
                     image={this.props.user.profilePicture}
                     alt={this.props.user.name}
                     invites={this.props.user.invites}
                     notifications={this.props.user.notifications}
                     {...this.props}/>
                {/*<SearchByTab {...this.props} sitters={BaseData.getSitters()}/>*/}
                {/*<SitterList sitters={this.props.user.matches}/>*/}
            </div>
        );
    }
}

export default Feed;
