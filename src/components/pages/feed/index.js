//external sources
import React from 'react';
import axios from 'axios';

//components
import Nav from '../../panels/nav/index';
import SearchByTab from "../../SearchByTab";
import Notifications from "../../Notifications";
import Invites from "../../InvitesList";
import SitterList from "../../sitterList/index";
import SitterActionBar from "../../panels/actionPanel/index";

//style
import './style.css';

class Feed extends React.Component {

    componentWillMount() {
        let self = this;
        const userId = localStorage.getItem('auth_token');
        if (userId) {
            axios.post('https://sitters-server.herokuapp.com/parent/get', {
                id: userId
            })
                .then(function (parent) {
                    if (parent.data) {  // user exists
                        axios.post('https://sitters-server.herokuapp.com/parent/getMatches' ,
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
        let navView = null;
        let showSitters = true;
        if(this.props.feed.navView !== null){
            let view = this.props.feed.navView;
            if(view === "searchBy"){
                showSitters = true;
                navView = <SearchByTab {...this.props} sitters={this.props.user.sitters}/>;
            }
            else if(view === "notifications"){
                showSitters = false;
                navView = <Notifications {...this.props} />
            }
            else if(view === "invites"){
                showSitters = false;
                navView = <Invites {...this.props} />
            }

        }



        return (
            <div id="feed-page">
                <Nav name={this.props.user.name}
                image={this.props.user.profilePicture}
                alt={this.props.user.name}
                invites={this.props.user.invites}
                notifications={this.props.user.notifications}
                action={this.props.actions.feedActions.setNavView}
                {...this.props}/>
                {navView}
                {showSitters? <SitterList {...this.props} sitters={this.props.feed.filteredMatches.length > 0 ? this.props.feed.filteredMatches : []}/> :""}
                {showSitters? this.props.feed.filteredMatches.length >  0 ? <SitterActionBar {...this.props}/> : '' : ''}
                </div>
        );
    }
}

export default Feed;
