import React from 'react';
import '../styles/css/nav.sass';

class NavBase extends React.Component {

    onClick(view) {
        this.props.action(view);
    }
}

export default NavBase;
