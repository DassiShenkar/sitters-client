// external sources
import React from "react";
import geodist from "geodist";

//utils
import {request} from '../../../../utils/requestHandler';
import {sittersApi} from "../../../../sittersAPI/sittersAPI";

export default class SitterProfileBase extends React.Component {

    componentWillMount() {
        let self = this;
        let sitterID = location.href.split('sitter/')[1];

        request('post', sittersApi.GET_USER, {_id: sitterID}, function(sitter){
            if (sitter.data) {
                self.props.actions.sitterProfileActions.setSitter(sitter.data);
                let parentCoord = {lat: self.props.user.address.latitude, lon: self.props.user.address.longitude};
                let sitterCoord = {lat: sitter.data.address.latitude, lon: sitter.data.address.longitude};
                self.props.actions.sitterProfileActions.setDistance(geodist(parentCoord, sitterCoord, {unit: 'meters'})); // calculate distance from parent to sitter
            }
        });
    }

    componentWillUnmount(){
        this.props.actions.sitterProfileActions.setSitter( {workingHours:{}, hobbies: [], languages: [], education: [], address: {}, reviews: [], expertise: [], mobility: []});
    }

    addReview() {
        this.props.actions.feedActions.showReviewPopup(true);
    }

    displayMatchInfo(shouldDisplay) {
        this.props.actions.sitterProfileActions.displayMatchInfo(shouldDisplay);
    }
}