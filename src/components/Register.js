'use strict';
import React, { PropTypes, Component } from 'react';
import '../styles/css/register.scss';
import 'react-select/dist/react-select.css';
import ParentForm from './ParentForm'
import SitterForm from './SitterForm'

class Register extends Component {
    constructor() {
        super();
        this.state ={
            selectedForm: "parent"
        }
    }
    onChange(filterName) {
        if (filterName === "parent") {
            this.setState({selectedForm: "sitter"});
        }
        else {
            this.setState({selectedForm: "parent"});
        }
    }
    render(){
        let form = this.state.selectedForm === 'parent' ? <ParentForm/> : <SitterForm/>;

        return (
            <div id="register-page">
                <section className="invite-info">
                    <h1 className="login-title">Sign Up</h1>
                </section>
                <ul className="user-select">
                    <li className="user-option">
                        <label htmlFor="parentRadio">I'm a Parent</label>
                        <input id="parentRadio" value="parent" type="radio"
                               checked={this.state.selectedForm === "parent"} name="radio-register"
                               onChange={this.onChange.bind(this, "sitter")}/>
                    </li>
                    <li className="filter-option">
                        <label htmlFor="sitterRadio">I'm a Sitter</label>
                        <input id="sitterRadio" value="sitter" type="radio"
                               checked={this.state.selectedForm === "sitter"} name="radio-register"
                               onChange={this.onChange.bind(this, "parent")}/>
                    </li>
                </ul>
                {form}
            </div>
        );
    }
}
export default Register;
