import React from 'react';
import * as ReactD3 from "react-d3-components";
var PieChart1 = ReactD3.PieChart;
import './style.css'


class PieChart extends React.Component {

    render(){
        let data = {label: 'Matcher Pie Chart', values: []};
        let sitter = {};
        if(typeof this.props.sitter !== "undefined") {
            sitter = this.props.sitter;
            delete sitter.match['matchScore'];
            for (let k in sitter.match) {
                if (sitter.match.hasOwnProperty(k))
                     data.values.push({x: sitter.match[k].label+ ' ' + sitter.match[k].value + '%', y: sitter.match[k].value})
            }
        }
        return (
                <PieChart1
                    data={data}
                    width={800}
                    height={600}
                    margin={{top: 10, bottom: 10, left: 100, right: 100}}
                    sort={null}
                />
        )
    }
}

export default PieChart;
