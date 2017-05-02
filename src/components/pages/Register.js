// external sources
import React from 'react';

import { PageHeader } from 'react-bootstrap';

// components
import ParentForm from '../forms/ParentForm';
import SitterForm from '../forms/SitterForm';

class Register extends React.Component {
    render() {
        let form = this.props.user.userType === "I'm a Parent" ?  <ParentForm {...this.props}/> : <SitterForm {...this.props}/>;
        return (
            <div id="register-page" className="page">
                <PageHeader>Register</PageHeader>
                {form}
            </div>
        );
    }
}
export default Register;
