//external sources
import React from 'react';

//components
import ParentFeed from "./parentFeed/index";
import SitterFeed from "./sitterFeed/index";

//style
import './style.css';

export default class Feed extends React.Component {
    render() {
        const feed = this.props.user.isParent && document.cookie.replace(/(?:(?:^|.*;\s*)is_parent\s*=\s*([^;]*).*$)|^.*$/, "$1") === "true"? <ParentFeed {...this.props}/>: <SitterFeed {...this.props}/>;
        return (
            <div id="feed-page">
                {feed}
            </div>
        );
    }
}