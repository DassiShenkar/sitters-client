//external sources
import React from 'react';
import axios from 'axios';

//components
import Nav from '../components/Nav';
import SearchByTab from "./SearchByTab";
import Notifications from "./Notifications";
import Invites from "./Invites";
import SitterList from "./SitterList";

class Feed extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        let self = this;
        const userId = localStorage.getItem('auth_token');
        if (userId) {
            axios.post('http://localhost:4444/parent/get', {
                id: userId
            })
                .then(function (parent) {
                    if (parent.data) {  // user exists
                        axios.post('http://localhost:4444/parent/getMatches' ,
                            parent.data
                        )
                            .then(function (sitters) {
                                if(sitters.data.length > 0) {
                                    self.props.actions.feedActions.setMatches(sitters.data);
                                }
                                else {
                                    console.log('no matches found');
                                }
                            })
                            .catch(function(error) {
                               console.log(error);
                            });
                        self.props.actions.actionCreators.setUserData(parent.data);
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
        let navView = <SitterList sitters={this.props.feed.matches.length > 0 ? this.props.feed.matches : []}/>;
        if(this.props.feed.navView !== null){
            let view = this.props.feed.navView;
            if(view === "searchBy")
                navView = <SearchByTab {...this.props} sitters={this.props.user.sitters}/>;
            else if(view === "notifications")
                navView = <Notifications {...this.props} />
            else if(view === "invites")
                navView = <Invites {...this.props} />
        }

        return (
            <div id="feed">
                <h1>Feed</h1>
                <Nav name={this.props.user.name}
                     image={this.props.user.profilePicture}
                     alt={this.props.user.name}
                     invites={this.props.user.invites}
                     notifications={this.props.user.notifications}
                     action={this.props.actions.feedActions.setNavView}
                     {...this.props}/>
                {/*<SearchByTab {...this.props} sitters={this.props.feed.matches}/>*/}
                {navView}
                {/*<SitterList sitters={this.props.feed.matches.length > 0 ? this.props.feed.matches : []}/>*/}
            </div>
        );
    }
}

export default Feed;
