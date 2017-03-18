import React from 'react';
import ListBase from '../base/ListBase';
import ListItem from './ListItem';

class List extends ListBase {
    render(){
        let i = 0;
        const list = this.props.items.map((item) => {
            return (
                <ListItem key={i++} item={item}/>
            )});

        return(
            <ul>{list}</ul>
        )
    }
}

export default List;
