//external sources
import React from 'react';

//components
import ListItem from './ListItem';

class List extends React.Component {
    render() {
        return (
            <ul>{this.props.items.map((item, index) => {
                return <ListItem key={index} item={item}/>
            })}</ul>
        )
    }
}
export default List;
