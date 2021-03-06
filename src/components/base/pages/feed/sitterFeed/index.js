//external sources
import React from 'react';

//utils
import {request} from '../../../../../utils/requestHandler';
import {sittersApi} from "../../../../../sittersAPI/sittersAPI";

export default class SitterFeedBase extends React.Component {
    componentWillMount() {
        let self = this;
        const userId = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (userId) {
            request('post', sittersApi.GET_USER, {_id: userId}, function(sitter){
                if (sitter.data)   // user exists
                    self.props.actions.actionCreators.setSitterData(sitter.data);
                else // user not exist
                    self.props.router.push('/login');
            });
        }
    }
}