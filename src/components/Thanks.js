import React from "react";

import Logo from './Logo';


class Thanks extends React.Component {
    render() {
        return(
        <div className="page">
            <Logo companyName="Registered Successfully! Thank You"/>
        </div>
        );
    }
}

export default Thanks;