import React from 'react'
import TabPanel, { TabStrip } from 'react-tab-panel'
import Location from '../styles/icons/Location'
import Clock from '../styles/icons/Clock'
import Dollar from '../styles/icons/Dollar'
class SearchByTab extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <TabPanel onActivate={(index) => console.log('Tab ' + index + ' was activated!')}>
                <div tabTitle={<Location/>}>
                    Lorem ipsum Veniam aliquip esse ex nulla anim aliquip et in
                    dolore consectetur dolor aliqua dolor consectetur fugiat in Excepteur voluptate.
                </div>

                <div tabTitle={<Clock/>}>
                    Lorem ipsum Sunt nisi sint.
                </div>

                <div tabTitle={<Dollar/>}>
                    Lorem ipsum Sunt nisi sint.
                </div>
            </TabPanel>
        );
    }

}

export default SearchByTab;
