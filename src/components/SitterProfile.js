import React from 'react';
import SitterProfileBase from '../base/SitterProfileBase'

class SitterProfile extends SitterProfileBase {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src={this.props.profilePicture}/>
                <p>{this.props.name + "," + this.props.age}</p>
                <p>{this.props.matchScore + "% Match!"}</p>
                <section>

                </section>
            </div>
        )
    }
}
export default SitterProfile;
