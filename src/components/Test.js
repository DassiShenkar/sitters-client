import React from 'react';
import PersonalityTest from './PersonalityTest'
class Test extends React.Component {
    constructor() {
        super();
    }
    render(){
        let questions =[{
            "question": "I consider myself as an investor in his own field",
            "category": "characteristics",
            "method": "normal",
            "choice": 0
        },{
            "question": "I consider myself a responsible person",
            "category": "characteristics",
            "method": "normal",
            "choice": 0
        },{
            "question": "I consider myself as having a sensitivity to the needs of others",
            "category": "characteristics",
            "method": "normal",
            "choice": 0
        },{
            "question": "I used to invest mainly in the things I'm good, and to give up when I'm having difficulty",
            "category": "characteristics",
            "method": "reverse",
            "choice": 0
        },{
            "question": "I consider myself as a creative person who can provide children with an interest",
            "category": "characteristics",
            "method": "normal",
            "choice": 0
        },{
            "question": "It is important for me to know everything you expect me to clearly and completely",
            "category": "expectations",
            "method": "normal",
            "choice": 0
        },{
            "question": "I consider myself punctual times",
            "category": "expectations",
            "method": "normal",
            "choice": 0
        },{
            "question": "I believe I can fulfill the expectations of parents",
            "category": "expectations",
            "method": "normal",
            "choice": 0
        },{
            "question": "It is important to me that parents will be satisfied with my work",
            "category": "expectations",
            "method": "normal",
            "choice": 0
        },{
            "question": "I expect myself to demonstrate assertiveness in cases where children have demonstrated a lack of discipline",
            "category": "expectations",
            "method": "normal",
            "choice": 0
        },{
            "question": "Especially problematic situations of stress I can't handle",
            "category": "Integrity",
            "method": "reverse",
            "choice": 0
        },{
            "question": "I think that all people in the world are honest",
            "category": "Integrity",
            "method": "special",
            "choice": 0
        },{
            "question": "At least once in life I took an object that belongs to someone without permission",
            "category": "Integrity",
            "method": "normal",
            "choice": 0
        },{
            "question": "In the case of an extreme lack of knowledge of how to correctly operate, I will be relying on my intuition and not call to ask the parents.",
            "category": "Integrity",
            "method": "reverse",
            "choice": 0
        },{
            "question": "The boy cursed his brother and will be punished if parents know, so you'd rather not tell his parents of child care",
            "category": "Integrity",
            "method": "reverse",
            "choice": 0
        }];
        return (

            <div>
                <PersonalityTest questions={questions} />
            </div>
        );
    }
}
export default Test;
