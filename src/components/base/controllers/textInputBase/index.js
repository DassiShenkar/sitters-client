// external sources
import React from 'react';
import PropTypes from 'prop-types';

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
    label: PropTypes.string,
    value: PropTypes.string
};

TextInputBase.defaultProps = {
    label: 'label',
    value: 'name'
};