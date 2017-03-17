import React from 'react';
import NavBase from '../base/NavBase'
import SVG from './SVG'
class Nav extends NavBase {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <img src={this.props.image}/>
                <p>Hi,{this.props.name}</p>
                <SVG/>
                {/*<SVG type="search"/>*/}
                {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>*/}
                <button onClick={this.onClickSearch}>Search</button>
                <button onClick={this.onClickMail}>Mail</button>
                <button onClick={this.onClickNotification}>Notification</button>
            </div>
        )
    }
}

export default Nav;