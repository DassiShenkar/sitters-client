import React from 'react';

class WorkingHoursBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    handleRadio(e) {
        this.setState({ value: e.target.value });
    }
}

export default WorkingHoursBase;

