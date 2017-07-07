// external sources
import React from 'react';

// components
import {Image} from 'react-bootstrap';
import {Link} from 'react-router';

class ListItem extends React.Component {
    render() {
        let item = this.props.item;
        const url = this.props.type === 'invite' ? this.props.type + '/' + item._id : 'sitter/' + item.sitterID;
        return (
            <li className="item">
                <Link className="item-link" to={url}>
                    <Image src={this.props.isParent ? item.sitterImage : item.parentImage}
                           alt={this.props.isParent ? item.sitterName : item.parentName} circle/>
                    <div className="item-info">
                        <p><strong>{this.props.isParent ? 'Introducing: ' + item.sitterName : item.parentName}</strong></p>
                        {this.props.type === 'invite' ? <p><span className={'icon-circle ' + item.status}/>{item.status + ' ' + item.date}</p> : <p>New Sitter In Town!</p>}
                    </div>
                </Link>
            </li>
        );
    }
}

export default ListItem;
