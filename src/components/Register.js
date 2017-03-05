import React, { PropTypes, Component } from 'react';
import '../styles/css/register.css'

class Register extends Component {

    constructor() {
        super();
        console.log('in const user:');
        let usr = localStorage.getItem('user');
        console.log(JSON.parse(usr));
        // console.log("hello register");
        // var user = localStorage.getItem('user');
        // console.log(user.name);
    }

    update(e) {
        // this.setState({txt: e.target.value});
    }


    render() {
        // let txt = this.props.txt;
        return (
            <div>
                <h1>Hello world i am in</h1>
            </div>

        );
    }
}

// const Widget = (props) =>
//     <input type="text" onChange={props.update}/>;

// Register.propTypes = {
//     user: "hello"
// };
//
// Register.defaultProps = {
//     txt: "default text"
// };

export default Register;
