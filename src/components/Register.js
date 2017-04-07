import React from 'react';
import '../styles/css/register.scss';

import ParentForm from './ParentForm';
import SitterForm from './SitterForm';

class Register extends React.Component {
    render() {
        return (
            <div id="register-page">
                    <h1>Sign Up</h1>
                {this.props.user.userType === "I'm a Parent" ?  <ParentForm/> : <SitterForm/>}
            </div>
        );
    }
}
export default Register;
