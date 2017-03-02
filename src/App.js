import React, { PropTypes, Component } from 'react';
//import Login from "./loginWithFB";
//import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor() {
        super();

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=268453370262293";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    update(e) {
        this.setState({txt: e.target.value});
    }

    render() {
        // let txt = this.props.txt;
        return (
            <div>
                <div id="fb-root"></div>
                <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="false"></div>
            </div>
            // <div className="App">
            //     <div className="App-header">
            //         <img src={logo} className="App-logo" alt="logo"/>
            //         <Widget update={this.update.bind(this)}/>
            //         <h2>{txt}</h2>
            //         <h3>{this.state.txt}</h3>
            //     </div>
            //     <p className="App-intro">
            //         To get started, edit <code>src/App.js</code> and save to reload.
            //     </p>
            // </div>
        );
    }
}

const Widget = (props) =>
    <input type="text" onChange={props.update}/>;

App.propTypes = {
    txt: React.PropTypes.string
};

App.defaultProps = {
    txt: "default text"
};

export default App;
