// external sources
import React from 'react';
import dateFormat from 'dateformat';

// components
import {Image} from 'react-bootstrap';

class ListItem extends React.Component {
    render(){
        let item = this.props.item;
            return (
                <li className="invite-item">
                    <div className="invite-info">
                        <Image src={this.props.isParent? item.sitterImage: item.parentImage} alt={this.props.isParent? item.sitterName: item.parentName} circle/>
                        <div>
                            <h4>{this.props.isParent? item.sitterName: item.parentName}</h4>
                            <p>{item.date + ' ' + dateFormat(item.startTime, "HH:mm") + '-' + dateFormat(item.endTime, "HH:mm")}</p>
                        </div>
                    </div>
                    {this.props.type === 'invites' ? <p className="invite-status">{'Status: ' + item.status}</p> : ''}
                </li>
            );
    }
}

export default ListItem;
