//external sources
import React from 'react';

//components
import EditProfileParent from './editProfileParent/index';
import { PageHeader } from 'react-bootstrap';
import EditProfileSitter from './editProfileSitter/index';

class EditProfile extends React.Component {
    render() {
        let form = this.props.user.isParent?  <EditProfileParent {...this.props}/> : <EditProfileSitter {...this.props}/>;
        return (
            <div id="editProfile-page" className="page">
                <PageHeader>Edit Profile</PageHeader>
                {form}
            </div>
        );
    }
}
export default EditProfile;
