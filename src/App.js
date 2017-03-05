import React, { PropTypes, Component } from 'react';

import './App.css';
class App extends Component {

    constructor() {
        super();
    }

    update(e) {
        this.setState({txt: e.target.value});
    }


    render() {
        // let txt = this.props.txt;
        return (
            <div>

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
