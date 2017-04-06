import React from 'react';

class RadioInputBase extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     value: this.props.default.replace(/\b[a-z]/g, function (f) {
        //         return f.toUpperCase();
        //     })// make first letter upper case
        // };
        this.handleRadio = this.handleRadio.bind(this);
    };

    handleRadio(e) {
        this.props.action(e.target.value);
        if(this.props.actions.actionCreators.saveInLocalStorage === 'true'){ // pass in props if want to save in localStorage
            let radioName = this.props.radioName;
            localStorage.setItem(radioName,e.target.value);
        }
    }
}

export default RadioInputBase;


