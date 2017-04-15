import React from 'react';

import strings from '../../static/strings';

import Logo from '../Logo';

class About extends React.Component {
    render() {
        return (
            <div id="about-page">
                <Logo companyName="Sitters"/>
                <h2>{'Sitters Version: ' + strings.VERSION}</h2>
                <p>All Right Reserved to <strong>{strings.DEVELOPERS}</strong></p>
            </div>
        );
    }
}
export default About;
