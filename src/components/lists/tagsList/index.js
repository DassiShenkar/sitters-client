//external sources
import React from 'react';

//style
import './style.css';

export default class TagsTable extends React.Component {

    render() {
        const items = this.props.items;
        return (
            <div className="tags-list">
                <ul>
                    <li className="label">{items[0]}</li>
                    <li className="label">{items[1]}</li>
                </ul>
                <ul>
                    <li className="label">{items[2]}</li>
                    <li className="label">{items[3]}</li>
                </ul>
                <ul>
                    <li className="label">{items[4]}</li>
                    <li className="label">{items[5]}</li>
                </ul>
            </div>
        )
    }
}