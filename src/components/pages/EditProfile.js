import React from 'react';

import ParentForm from '../forms/ParentForm';
import SitterForm from '../SitterForm';

class Register extends React.Component {
    render() {
        let form = this.props.user.userType === "I'm a Parent" ?  <ParentForm {...this.props}/> : <SitterForm {...this.props}/>;
        return (
            <div id="editProfile-page">
                <h1>Edit Profile</h1>
                {form}
            </div>
        );
    }
}
export default Register;
