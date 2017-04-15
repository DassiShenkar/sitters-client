//external sources
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//actions
import * as actionCreators from '../actions/actionCreators';
import * as ReviewActions from '../actions/ReviewActions';
import * as RegisterActions from '../actions/RegisterActions';
import * as FeedActions from '../actions/FeedActions';
import * as SettingsActions from '../actions/SettingsActions';
import * as SearchByActions from '../actions/SearchByActions';
import * as RangeActions from '../actions/RangeActions';
import * as SitterProfileActions from '../actions/SitterProfileActions';
import * as InviteActions from '../actions/InviteActions';

//components
import Main from './Main'

//style
import '../App.css';

function mapStateToProps(state) {
    return {
        reviews: state.reviews,
        user: state.user,
        feed: state.feed,
        settings: state.settings,
        register: state.register,
        searchBy: state.searchBy,
        range: state.range,
        sitterProfile: state.sitterProfile,
        invite: state.invite
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
            reviewActions: bindActionCreators(ReviewActions, dispatch),
            settingsActions: bindActionCreators(SettingsActions, dispatch),
            feedActions: bindActionCreators(FeedActions, dispatch),
            searchByActions: bindActionCreators(SearchByActions, dispatch),
            rangeActions: bindActionCreators(RangeActions, dispatch),
            sitterProfileActions: bindActionCreators(SitterProfileActions, dispatch),
            inviteActions: bindActionCreators(InviteActions, dispatch)
        }
    };
}


const App = connect(mapStateToProps, mapDispatchToProps)(Main);


export default App;
