//external sources
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as actionCreators from '../actions/actionCreators';
import * as ReviewActions from '../actions/ReviewActions';

//components
import Main from './Main'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        reviews: state.reviews,
        // radios: state.radios,
        user: state.user
    }
}

/*
* bind app to action creators
* */

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            actionCreators: bindActionCreators(actionCreators, dispatch),
            reviewActions: bindActionCreators(ReviewActions, dispatch)
        }
    };
}


const App = connect(mapStateToProps, mapDispatchToProps)(Main);


export default App;
