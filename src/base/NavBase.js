import React from 'react';
import '../styles/css/nav.sass';

class NavBase extends React.Component {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(e){
        e.preventDefault();
        console.log("clicked");
    }
}

export default NavBase;
