// external sources
import React from 'react';

export default class DropDownMenuBase extends React.Component {
    nav(target) {
        if (target === 'logout') {  // delete cookies
            document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = 'is_parent=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            target = 'login';
        }
        this.props.router.push('/' + target);
    }
}