import React from 'react';
import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";


class ReactBarChart extends React.Component {
    render() {
        const data = [
            {name: 'Page A', value: 100},
            {name: 'Page B', value: 80},
            {name: 'Page C', value: 10},
            {name: 'Page D', value: 70},
            {name: 'Page E', value: 65},
            {name: 'Page F', value: 80}
        ];
            return (
                <BarChart width={600} height={300} data={data}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}
                          layout="vertical">
                    <XAxis dataKey="value" type="number"/>
                    <YAxis type="category" dataKey="name"/>
                    <Tooltip/>
                    <Bar dataKey="value" fill="#82ca9d" minPointSize={10}/>
                </BarChart>
        )
    }
}
export default ReactBarChart;