//external sources
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as actionCreators from '../actions/actionCreators';
import * as ReviewActions from '../actions/ReviewActions';
import * as RegisterActions from '../actions/RegisterActions';
import * as InviteActions from '../actions/InviteActions';
import * as FeedActions from '../actions/FeedActions';

//components
import Main from './Main'

function mapStateToProps(state) {
    return {
        reviews: state.reviews,
        invites: state.invites,
        user: state.user,
        register: state.register
    }
}

/*
* bind app to action creators
* */

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            actionCreators: bindActionCreators(actionCreators, dispatch),
            registerActions: bindActionCreators(RegisterActions, dispatch),
            inviteActions: bindActionCreators(InviteActions, dispatch),
            reviewActions: bindActionCreators(ReviewActions, dispatch),
            feedActions: bindActionCreators(FeedActions, dispatch)
        }
    };
}


const App = connect(mapStateToProps, mapDispatchToProps)(Main);


export default App;
