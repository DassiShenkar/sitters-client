import React from 'react';
import {Legend, RadialBar, RadialBarChart} from "recharts";


class RainbowChart extends React.Component {
    render() {
        const colors = ["#8884d8","#83a6ed","#8dd1e1","#82ca9d","#a4de6c","#d0ed57","#ffc658"];
        let data = this.props.sitter? this.props.sitter.match.data:[];
        if (data){
            for(let index = 0; index < data.length;index++){
                data[index].fill = colors[index];
            }
        }
        const style = {
            top: 0,
            left: 350,
            lineHeight: '24px'
        };
        return (
            <div>
                <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
                    <RadialBar minAngle={15} label background clockWise={true} dataKey='value'/>
                    <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
                </RadialBarChart>
            </div>
        )
    }
}
export default RainbowChart;