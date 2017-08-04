//external sources
import React from 'react';

//components
import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";

export default class ReactBarChart extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <BarChart width={300} height={200} data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}
                      layout="vertical">
                <XAxis dataKey="value" type="number"/>
                <YAxis dataKey="name" type="category"/>
                <Tooltip cursor={false}/>
                <Bar type="monotone" barSize={20} dataKey="value" fill="#fff"/>
            </BarChart>
        )
    }
}