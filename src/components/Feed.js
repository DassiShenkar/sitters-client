//external sources
import React from 'react';
import axios from 'axios';

//components
import Nav from '../components/Nav';
import SearchByTab from "./SearchByTab";
import SitterList from "./SitterList";

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
                        self.props.actions.actionCreators.setUserData(res.data);
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
                {/*<SearchByTab {...this.props} sitters={this.props.user.sitters}/>*/}
                <SitterList sitters={this.props.user.matches.length > 0 ? this.props.user.matches : []}/>
            </div>
        );
    }
}

export default Feed;
