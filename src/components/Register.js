import React from 'react';
import '../styles/css/register.scss';
import 'react-select/dist/react-select.css';
// import ParentForm from './ParentForm';
// import SitterForm from './SitterForm';
import RadioInput from '../components/controllers/RadioInput';

class Register extends React.Component {

    render() {
        // let form = this.refs.userInput.state.value === 'I\'m a Parent' ? <ParentForm/> : <SitterForm/>;
        return (
            <div id="register-page">
                <section className="invite-info">
                    <h1 className="login-title">Sign Up</h1>
                </section>
                {/*<RadioInput ref="userInput" types={['I\'m a Parent', 'I\'m a Sitter']} default={'I\'m a Parent'}*/}
                            {/*saveInLocalStorage={'true'} radioName="userType"/>*/}
                {/*{form}*/}
            </div>
        );
    }
}
export default Register;
