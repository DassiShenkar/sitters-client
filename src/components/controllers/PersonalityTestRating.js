import React from 'react';
import ReactRating from 'react-rating'

class PersonalityTestRating extends React.Component {
    constructor(props) {
        super(props);
        this.handleRate = this.handleRate.bind(this);
        this.state = {
            key: props.id,
            rating: 0,
            method: this.props.question.method,
            category: this.props.question.category,
            question: this.props.question.question
        }
    }
    handleRate(rate){
        this.state.rating = rate;
    }

    render() {
        return (
            <div onClick={this.getValue}>
                <ReactRating onClick={rate => this.handleRate(rate)}/>
            </div>
        );
    }
}
export default PersonalityTestRating;
