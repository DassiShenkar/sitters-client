import React from 'react';
import AppBase from './base/AppBase.js';
import FBLogin from './components/FBlogin';
import Nav from './components/Nav'
import SitterList from './components/SitterList'
import RadioInput from './components/controllers/RadioInput'
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
            //TODO: check if user in db go to feed, else go to register
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
            login = <div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <RadioInput ref="userInput" types={['I\'m a Parent' , 'I\'m a Sitter']} default={'I\'m a Parent'} saveInLocalStorage={'true'} radioName="userType"/>
                        <FBLogin myFunc={this.changeStatus.bind(this)}/>
                    </div>;
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
