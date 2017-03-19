import React from 'react';
import ReactRating from 'react-rating'

class Rating extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }
    onChange(newRating){
        // this.setState({
        //     rating: newRating
        // })
        console.log(newRating);
    }


    render() {

        return (
            <div>
                <ReactRating onChange={this.onChange}/>
            </div>
        );
    }
}
export default Rating;
