//external sources
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//actions
import * as actionCreators from '../actions/actionCreators';
import * as ReviewActions from '../actions/ReviewActions';
import * as RegisterActions from '../actions/RegisterActions';
import * as RangeActions from '../actions/RangeActions';
import * as SitterProfileActionsOld from '../actions/SitterProfileActionsOld';
import * as InviteActions from '../actions/InviteActions';
import * as WorkingHours from '../actions/WorkingHoursActions';
import * as PersonalityQuestions from '../actions/PersonalityQuestionsActions';

//new actions
import * as LoginActions from './base/pages/login/action';
import * as SitterProfileActions from './base/pages/sitterProfile/action';
import * as SettingsActions from './base/pages/settings/action';
import * as SearchByActions from './base/panels/searchPanel/action';
import * as EditProfileActions from './base/pages/editProfile/action';
import * as FeedActions from './base/pages/feed/action';
import * as SitterFeedActions from './base/pages/feed/sitterFeed/action';



//components
import Main from './Main'

//style
import './App.css';

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
        invite: state.invite,
        workingHours: state.workingHours,
        personalityQuestions: state.personalityQuestions,
        sitterFeed: state.sitterFeed,
        editProfile: state.editProfile
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
            rangeActions: bindActionCreators(RangeActions, dispatch),
            sitterProfileActionsOld: bindActionCreators(SitterProfileActionsOld, dispatch),
            inviteActions: bindActionCreators(InviteActions, dispatch),
            workingHoursActions: bindActionCreators(WorkingHours, dispatch),
            personalityQuestionsActions: bindActionCreators(PersonalityQuestions, dispatch),

            loginActions: bindActionCreators(LoginActions, dispatch),
            sitterProfileActions: bindActionCreators(SitterProfileActions, dispatch),
            settingsActions: bindActionCreators(SettingsActions, dispatch),
            searchByActions: bindActionCreators(SearchByActions, dispatch),
            editProfileActions: bindActionCreators(EditProfileActions, dispatch),
            feedActions: bindActionCreators(FeedActions, dispatch),
            sitterFeedActions: bindActionCreators(SitterFeedActions, dispatch)
        }
    };
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);


export default App;
