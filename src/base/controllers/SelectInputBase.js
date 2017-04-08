import React from 'react';


class SelectBase extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    };
    onChange(langArray){
        // let languages = [];
        // langArray.forEach(function(language){
        //     languages.push(language.value);
        // });
        this.props.action(langArray);
    }
}

export default SelectBase;