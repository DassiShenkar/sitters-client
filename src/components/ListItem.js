import React from 'react';

class ListItem extends React.Component {
    render(){
        let item = this.props.item;
            return (
                <li>
                    <img src={item.sitterImage} alt={item.sitterID}/>
                    <p>{item.sitterName}</p>
                    <p>{item.status}</p>
                </li>
            );
    }
}

export default ListItem;
