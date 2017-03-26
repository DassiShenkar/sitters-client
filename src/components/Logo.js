import React from 'react';

class Logo extends React.Component {

    render(){
        const style = {
            fontFamily: '"Poiret One", "Helvetica Neue", Helvetica, Arial, cursive',
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#f7a1a1'
        };
        let companyName = this.props.companyName;
            return (
                <p id="logo" style={style}>{companyName}</p>
            );
    }
}

export default Logo;
