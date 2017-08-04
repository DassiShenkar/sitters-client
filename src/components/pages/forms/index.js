// external sources
import React from 'react';

// components
import ParentForm from './parentForm/index';
import SitterForm from './sitterForm/index';
import { PageHeader } from 'react-bootstrap';

export default class Register extends React.Component {
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