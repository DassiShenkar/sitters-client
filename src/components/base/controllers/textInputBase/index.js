// external sources
import React from 'react';

export default class TextInputBase extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        this.props.action(e.target.value);
    }
}

TextInputBase.propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.string
};

TextInputBase.defaultProps = {
    label: 'label',
    value: 'name'
};