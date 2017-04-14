import React from 'react';
import '../styles/css/nav.sass';

class NavBase extends React.Component {

    constructor(props) {
        super(props);
        // this.onClickSearch = this.onClickSearch.bind(this);
        // this.onClickMail = this.onClickMail.bind(this);
        // this.onClickNotification = this.onClickNotification.bind(this);
    }

    onClick(view) {
        console.log(view);
    }

    // onClickMail(e) {
    //     e.preventDefault();
    // }
    //
    // onClickNotification(e) {
    //     e.preventDefault();
    // }
}

export default NavBase;
