import React, { Component } from 'react';
import LabelSelect from 'react-native-label-select';

export default class MyMultiSelect extends Component {

    constructor(props) {
        super(props);
        this.generateList = this.generateList.bind(this);
        this.generateLabels = this.generateLabels.bind(this);
    }

    render() {
        return (
            <LabelSelect
                ref="labelSelect"
                title="Choose Languages"
                enable={true}
                readOnly={false}
                enableAddBtn={true}
                style={this.props.style ? this.props.style : {}}
                customStyle={{
                    confirmButton:{
                        backgroundColor: '#f7a1a1'
                    },
                    cancelButton: {
                        backgroundColor: '#f7a1a1'
                    }
                }}
                onConfirm={(list) => this.props.update(list)}>
                {this.generateList()}
                {this.generateLabels()}
            </LabelSelect>
        );
    }

    generateList() {
        return this.props.items.map(function(item) {
            return <LabelSelect.ModalItem
                    key={item.value}
                    data={item.label}>{item.label}</LabelSelect.ModalItem>;
        });
    }

    generateLabels() {
        return this.props.selected.map(function(item) {
            return <LabelSelect.Label
                    key={item.id}
                    data={item.name}>{item.name}</LabelSelect.Label>;
        });
    }
}