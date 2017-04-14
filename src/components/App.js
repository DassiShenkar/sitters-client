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

//components
import Main from './Main'

function mapStateToProps(state) {
    return {
        reviews: state.reviews,
        user: state.user,
        feed: state.feed,
        register: state.register,
        settings: state.settings
        register: state.register,
        searchBy: state.searchBy,
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
            feedActions: bindActionCreators(FeedActions, dispatch),
            settingsActions: bindActionCreators(SettingsActions, dispatch)
            feedActions: bindActionCreators(FeedActions, dispatch),
            searchByActions: bindActionCreators(SearchByActions, dispatch),
        }
    };
}


const App = connect(mapStateToProps, mapDispatchToProps)(Main);


export default App;
