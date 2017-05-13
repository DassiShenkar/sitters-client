import React from "react";
import {Button} from "react-bootstrap";

export default class NotAuthorized extends React.Component {
    onClick(e){
        e.preventDefault;
        this.props.router.push('/login');
    }
    render() {
        return(
            <div>
                <h1>You must login with facebook in order to use our app</h1>
                <Button onClick={this.onClick.bind(this)} type="button" bsStyle="primary" bsSize="large" value="Home Page">Back to HomePage</Button>
            </div>
        );
    }
}

