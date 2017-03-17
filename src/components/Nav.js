import React from 'react';
import NavBase from '../base/NavBase'
import ReactSVG from 'react-svg'
class Nav extends NavBase {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <img src={this.props.image}/>
                <p>Hi,&nbsp{this.props.name}</p>
                <button onClick={this.onClick}>

                </button>
                {/*<SVG path="logo.svg" class="svg-search"/>*/}
                <ReactSVG
                    path="../styles/images/search.svg"
                    //callback={svg => console.log(svg)}
                    className="hello"
                />
            </div>
        )
    }
}

export default Nav;