import React from 'react';
import ListBase from '../base/ListBase';
import ListItem from './ListItem';

class List extends ListBase {
    render(){
        const list = this.props.items.map((item) => {
            return (
                <ListItem key={this.props.items.indexOf(item)} item={item}/>
            )});

        return(
            <ul>{list}</ul>
        )
    }
}

export default List;
