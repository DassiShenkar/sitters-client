import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import * as ReviewActions from '../actions/ReviewActions';
import Main from './Main'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        reviews: state.reviews,
        radios: state.radios,
        user: state.user
    }
}

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
