import React from 'react';
import '../styles/css/nav.sass';

class NavBase extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick(view) {
        this.props.action(view);
    }
}

export default NavBase;
