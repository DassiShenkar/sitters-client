import React from 'react'
import Location from '../styles/icons/Location'
import Clock from '../styles/icons/Clock'
import Dollar from '../styles/icons/Dollar'
import Range from './RangeSlider'
import {Tabs, Tab} from 'react-bootstrap-tabs';
import SitterList from './SitterList'
import DatePicker from './controllers/DatePicker'
import TimeInput from './controllers/TimeInput'
class SearchByTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitters   : this.props.sitters,
        }
    }

    handleRangeValues(values){
        this.state = {
            minRange : values[0],
            maxRange : values[1],
        };
        let sitters = [];
        for(let sitter of this.props.sitters){
            if(sitter.hourFee >= values[0] && sitter.hourFee <= values[1])
                sitters.push(sitter);
        }
        this.setState({
            sitters : sitters,
        });
        this.refs.sitterList.state.sitters = sitters;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // You can access `this.props` and `this.state` here
        // This function should return a boolean, whether the component should re-render.
        return false;
    }
    render() {
        return (
            <div>
                <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                    <Tab label={<Location/>}>Tab 1 content</Tab>
                    <Tab label={<Clock/>}>
                        <p>Search by Time</p>
                        <DatePicker/>
                        <p>From</p>
                        <TimeInput/>
                        <p>To</p>
                        <TimeInput/>

                    </Tab>
                    <Tab label={<Dollar/>}>
                        <p>Hour Rare</p>
                        <Range ref="hourRateRange"  changeRangeValues={this.handleRangeValues.bind(this)} min={0} max={50}/>
                    </Tab>
                </Tabs>
                <SitterList ref='sitterList' sitters={this.state.sitters}/>
            </div>
        );
    }
}

export default SearchByTab;
