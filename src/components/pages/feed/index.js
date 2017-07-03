//external sources
import React from 'react';

//components
//style
import './style.css';
import ParentFeed from "./parentFeed/index";
import SitterFeed from "./sitterFeed/index";

class Feed extends React.Component {
    render() {
        const feed = this.props.user.isParent && document.cookie.replace(/(?:(?:^|.*;\s*)is_parent\s*=\s*([^;]*).*$)|^.*$/, "$1") === "true"? <ParentFeed {...this.props}/>: <SitterFeed {...this.props}/>;
        return (
            <div id="feed-page">
                {feed}
            </div>
        );
    }
}

export default Feed;
