import React from 'react';

class BackArrow extends React.Component {

    render() {
        const style = {
            transform: 'scale(-1, 1)'
        };
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" style={style} viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 17v-4h-8v-2h8v-4l6 5-6 5z"/></svg>
        )
    }
}
export default BackArrow;


