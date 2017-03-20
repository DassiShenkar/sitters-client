import React from 'react';
import AppBase from './base/AppBase.js';
import FBLogin from './components/FBlogin';
import Nav from './components/Nav'
import SitterList from './components/SitterList'
class App extends AppBase {
    constructor(){
        super();
        this.state = {
            loggedIn : false
        }
    }

    componentWillMount(){
        if (localStorage.getItem("user") === null) {
            this.setState({loggedIn : true});
        }
    }

    changeStatus(){
        this.setState({loggedIn : true});
    }

    render() {
        let sitters = [{
            name: "arel",
            matchScore: 85,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }, {
            name: "arel1",
            matchScore: 80,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }, {
            name: "arel2",
            matchScore: 75,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }];
        let login;
        if(this.state.loggedIn === false){
            login = <div><FBLogin myFunc={this.changeStatus.bind(this)}/></div>;
        }
        else {
            login =   <div>
                <h1>Feed</h1>
                <Nav name="Arel"
                     image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTYLooZuD2jyZ_RGPegqe1mmDhavIfmZeSpjYLsjSfsKRHpXcffHmMrmA"
                     alt="Arel"/>
                <SitterList sitters={sitters}/>
            </div>;
        }
        return (<div>
            {login}
            </div>
        );
    }
}

export default App;
