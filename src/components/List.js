import React from 'react';
import ListItem from './ListItem';

class List extends React.Component {
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
