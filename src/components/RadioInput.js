import React from 'react';

class Radio extends React.Component {// need to get default and types
    constructor(props) {
        super(props);
        this.state = {
            pick: this.props.default.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})// make first letter upper case
        }
    }
    handleRadio(e) {
        this.setState({ pick: e.target.value });
        console.log(this.state.pick);
    }
    getValue(){
        return this.state.pick;
    }
    render() {
        const options = this.props.types.map((loan) => {
            return (
                        <label>
                            <input type="radio" name="coffeeTypes" id={loan} value={loan} checked={this.state.pick == loan} onChange={this.handleRadio.bind(this)}/>
                            {loan}
                        </label>
            )
        });
        return (
            <div>
                {options}
            </div>
        )
    }
}
export default Radio;