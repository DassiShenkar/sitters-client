import React from 'react';
import ListBase from '../base/ListBase';

class List extends ListBase {
    render(){
        let i = 0;
        const list = this.props.items.map((item) => {
            return (
                <div key={i++}>{i}
                    <img src={item.image} alt={item.name}/>
                    <p>{item.name}</p>
                    <p>{item.text}</p>
                    <p>{item.time}</p>
                </div>
            )});

        return(
            <div>{list}</div>
        )
    }
}

export default List;
