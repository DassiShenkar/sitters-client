import React from 'react'
import TabPanel, { TabStrip } from 'react-tab-panel'
import Star from '../styles/icons/Star'
class SearchByTab extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <TabPanel onActivate={(index) => console.log('Tab ' + index + ' was activated!')}>
                <div tabTitle={<Star/>}>
                    Lorem ipsum Veniam aliquip esse ex nulla anim aliquip et in
                    dolore consectetur dolor aliqua dolor consectetur fugiat in Excepteur voluptate.
                </div>

                <div tabTitle="Second2 tab">
                    Lorem ipsum Sunt nisi sint.
                </div>
            </TabPanel>
        );
    }

}

export default SearchByTab;
