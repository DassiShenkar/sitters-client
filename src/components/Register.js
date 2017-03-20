import React from 'react';
import '../styles/css/register.scss';
import 'react-select/dist/react-select.css';
import ParentForm from './ParentForm'
import SitterForm from './SitterForm'

class Register extends React.Component {
    constructor() {
        super();
        //let userType = localStorage.getItem('userType');
        this.state = {
            selectedForm: localStorage.getItem('userType')
        }
    }

    // onChange(filterName) {
    //     if (filterName === "parent") {
    //         this.setState({selectedForm: "sitter"});
    //     }
    //     else {
    //         this.setState({selectedForm: "parent"});
    //     }
    // }

    render() {
        let form = this.state.selectedForm === 'I\'m a Parent' ? <ParentForm/> : <SitterForm/>;
        return (
            <div id="register-page">
                <section className="invite-info">
                    <h1 className="login-title">Sign Up</h1>
                </section>
                {/*<input id="parentRadio" value="parent" type="radio"*/}
                       {/*checked={this.state.selectedForm === "parent"} name="radio-register"*/}
                       {/*onChange={this.onChange.bind(this, "sitter")}/>*/}
                {/*<label htmlFor="parentRadio">I'm a Parent</label>*/}
                {/*<input id="sitterRadio" value="sitter" type="radio"*/}
                       {/*checked={this.state.selectedForm === "sitter"} name="radio-register"*/}
                       {/*onChange={this.onChange.bind(this, "parent")}/>*/}
                {/*<label htmlFor="sitterRadio">I'm a Sitter</label>*/}
                {form}
            </div>
        );
    }
}
export default Register;
