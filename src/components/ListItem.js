import React from 'react';

class ListItem extends React.Component {
    render(){
        let item = this.props.item;
            return (
                <li>
                    <img src={item.image} alt={item.name}/>
                    <p>{item.name}</p>
                    <p>{item.text}</p>
                    <p>{item.time}</p>
                </li>
            );
    }
}

export default ListItem;
