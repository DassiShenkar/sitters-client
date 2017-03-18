import React from 'react';
import '../styles/css/nav.sass';

class NavBase extends React.Component {

    constructor() {
        super();
        this.onClickSearch = this.onClickSearch.bind(this);
        this.onClickMail = this.onClickMail.bind(this);
        this.onClickNotification = this.onClickNotification.bind(this);
    }

    onClickSearch(e) {
        e.preventDefault();
    }

    onClickMail(e) {
        e.preventDefault();
    }

    onClickNotification(e) {
        e.preventDefault();
    }
}

export default NavBase;
