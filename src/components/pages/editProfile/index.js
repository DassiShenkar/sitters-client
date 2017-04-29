//external sources
import React from 'react';

import { PageHeader } from 'react-bootstrap';

//components
import ParentForm from '../../forms/ParentForm';
import SitterForm from '../../SitterForm';

class Register extends React.Component {
    render() {
        let form = this.props.user.userType === "I'm a Parent" ?  <ParentForm {...this.props}/> : <SitterForm {...this.props}/>;
        return (
            <div id="editProfile-page" className="page">
                <PageHeader>Edit Profile</PageHeader>
                {form}
            </div>
        );
    }
}
export default Register;
