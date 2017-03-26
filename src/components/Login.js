import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import FBLogin from '../components/FBlogin';
import Logo from '../components/Logo';
import RadioInput from '../components/controllers/RadioInput';
import strings from '../static/strings';

class Login extends React.Component {

    changeStatus() {
        this.setState({loggedIn: true});
    }

    render() {
        const style = {
            width: '80%',
            margin: 'auto'
        };
        return (
            <div style={style}>
                <PageHeader><Logo companyName={strings.APP_NAME}/><small>{strings.APP_DESCRIPTION}</small></PageHeader>
                <Jumbotron>
                    <h1>Login</h1>
                    <RadioInput ref="userInput" types={['I\'m a Parent', 'I\'m a Sitter']} default={'I\'m a Parent'}
                                saveInLocalStorage={'true'} radioName="userType"/>
                    <FBLogin myFunc={this.changeStatus.bind(this)}/>
                </Jumbotron>
            </div>
        )
    }
}

export default Login;
