import React from 'react';
import PieChart from 'react-svg-piechart'

import './style.css'
class SitterPieMatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this);
        this.handleMouseLeaveFromSector = this.handleMouseLeaveFromSector.bind(this);
        this.state = {
            expandedSector: null,
        };
    };
    handleMouseEnterOnSector(sector) {
        this.setState({ expandedSector: sector })
    }

    handleMouseLeaveFromSector() {
        this.setState({ expandedSector: null })
    }

    render(){
        let colors = ["#4D4D4D ", "#5DA5DA ","#FAA43A","#60BD68","#F17CB0","#B2912F","#B276B2","#DECF3F","#F15854"];
        let data = [];
        let sitter = {};
        let index = 0;
        if(typeof this.props.sitter !== "undefined") {
            sitter = this.props.sitter;
            delete sitter.match['matchScore'];
            for (let k in sitter.match) {
                if (sitter.match.hasOwnProperty(k)) {
                    //console.log(this.props.sitter.match[k]);
                    let obj = sitter.match[k];
                    obj['color'] = colors[index++];
                    // sitter.match[k]['color'] = colors[index++];
                    data.push(obj);
                }
            }
            console.log(sitter);
        }

        // this.props.sitter.match.forEach(function(m){
        //     if(m!)
        // })
        // let total = 0;
        // let params = 2;
        // let data = [];
        // let bonus = 5;
        // let info;
        // if(typeof this.props.sitter !== "undefined"){
        //     if(this.props.sitter.hobbies.length > 0)
        //         params++;
        //     if(this.props.sitter.expertise.length >0)
        //         params++;
        //     let locationScore =  this.props.sitter.match.locationScore  / params;
        //     let experienceScore =  this.props.sitter.match.experienceScore / params;
        //     data = [
        //         { label: 'Location', value: Math.round(locationScore) , color: '#17becf' },
        //         { label: 'Experience', value: Math.round(experienceScore), color: '#bcbd22' },
        //     ];
        //     total += locationScore;
        //     total += experienceScore;
        //     if(this.props.sitter.match.highSchool !== -1){
        //         data.push( { label: 'HighSchool', value: bonus , color: '#7f7f7f' },);
        //         total += bonus;
        //     }
        //     if(this.props.sitter.match.college !== -1){
        //         data.push( { label: 'College', value: bonus , color: '#e377c2' },);
        //         total += bonus;
        //     }
        //     if(this.props.sitter.match.mobility){
        //         data.push( { label: 'Mobility', value: bonus , color: '#8c564b' },);
        //         total += bonus;
        //     }
        //     if(this.props.sitter.match.availableNow){
        //         data.push( { label: 'Available Now', value: bonus , color: '#9467bd' },);
        //         total += bonus;
        //     }
        //     if(total < 100){
        //         data.push( { label: 'Unreached score', value: 100 - total , color: '#d62728' },);
        //     }
        //     console.log(data);
        // }
        //    data = [
        //     { label: 'Facebook', value: 40, color: '#3b5998' },
        //     { label: 'Twitter', value: 30, color: '#00aced' },
        //     { label: 'Google Plus', value: 30, color: '#dd4b39' },
        //     // { label: 'Pinterest', value: 20, color: '#cb2027' },
        //     // { label: 'Linked In', value: 10, color: '#007bb6' },
        // ];
        // info =   data.map((element, i) => (
        //     <div key={i}>
        //         <span style={{ background: element.color }}></span>
        //         <span style={{ fontWeight: this.state.expandedSector === i ? 'bold' : null }}>
        //         {element.label} : {Math.floor((element.value / total) * 100) + '%'}
        //       </span>
        //     </div>
        // ));
        const { expandedSector } = this.state;
        return (
            <div id="pie-chart">
                <PieChart
                    data={ data }
                    expandedSector={expandedSector}
                    onSectorHover={this.handleMouseEnterOnSector}
                    sectorStrokeWidth={2}
                    expandOnHover
                />
                <div>
                    {
                       data.map((element, i) => (
                            <div key={i}>
                                <span style={{ background: element.color }}></span>
                                <span style={{ fontWeight: this.state.expandedSector === i ? 'bold' : null }}>
                {element.label} : {element.value}
              </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default SitterPieMatch;
