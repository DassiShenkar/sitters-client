//external sources
import React from 'react';

//components
import ListItem from '../listItem/index';

export default class List extends React.Component {
    render() {
        return (
            <ul>{this.props.items.map((item, index) => {
                return <ListItem key={index} item={item} type={this.props.type} isParent={this.props.isParent}/>
            })}</ul>
        )
    }
}