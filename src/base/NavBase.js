import React from 'react';
import '../styles/css/nav.sass';

class NavBase extends React.Component {

    onClick(view) {
            this.props.action(view);
            this.props.router.push('/'); // always back to feed with the view chosen
    }
}

export default NavBase;
