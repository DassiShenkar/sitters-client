import React from 'react';
import ReactRating from 'react-rating'

class PersonalityTest extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            index: 0
        }

    }
    onChange(newRating,number){
        console.log(newRating);
        console.log(number);
        this.setState({
            rating: newRating
        })
    }


    render() {
        const questions = this.props.questions.map((question) => {
            return (
                <div>
                    <p>{question.question}</p>
                    1<ReactRating onChange={this.onChange} />5
                {/*// <label key={this.props.types.indexOf(option)}>*/}
                {/*//     <input type="radio" name={option} value={option} checked={this.state.value === option}*/}
                {/*//            onChange={this.handleRadio}/>*/}
                {/*//     {option}*/}
                {/*// </label>*/}
                {/*</label>*/}
                </div>
            )
        });
        return (
            <div>
                {questions}
            </div>
        );
    }
}
export default PersonalityTest;
