// external sources
import React from 'react';

import { PageHeader } from 'react-bootstrap';

// components
import Logo from '../../Logo';

// statics
import strings from '../../../static/strings';


class About extends React.Component {
    render() {
        return (
            <div id="about-page" className="page">
                <PageHeader>About</PageHeader>
                <Logo companyName="Sitters"/>
                <h2>{'Sitters Version: ' + strings.VERSION}</h2>
                <p>All Right Reserved to <strong>{strings.DEVELOPERS}</strong></p>
            </div>
        );
    }
}
export default About;
