import React from 'react';

import ParentForm from './ParentForm';
import SitterForm from './SitterForm';

class Register extends React.Component {
    render() {
        let form = this.props.user.userType === "I'm a Parent" ?  <ParentForm {...this.props}/> : <SitterForm {...this.props}/>;
        return (
            <div id="register-page">
                <h1>Sign Up</h1>
                {form}
            </div>
        );
    }
}
export default Register;
