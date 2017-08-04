//external sources
import React from 'react'

export default class SearchByBase extends React.Component {
    handleSelect(selectedKey) {
        this.props.actions.searchByActions.setView(selectedKey); // set the view of the tab
    }
}