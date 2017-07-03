//external sources
import React from 'react';
import { PageHeader } from 'react-bootstrap';

//components
import EditProfileParent from './editProfileParent';
import EditProfileSitter from './editProfileSitter';

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
