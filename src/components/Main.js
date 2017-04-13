import React from "react";

class Main extends React.Component {
    render() {
        return(
        <div id="main">
            {React.cloneElement(this.props.children, this.props)}
        </div>
        );
    }
}

export default Main;