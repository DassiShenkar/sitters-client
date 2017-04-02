import React from "react";

class Main extends React.Component {
    render() {
        return(
        <div>
            {React.cloneElement(this.props.children, this.props)}
        </div>
        );
    }
}

export default Main;