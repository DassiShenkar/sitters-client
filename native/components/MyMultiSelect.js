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
                title="Choose"
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
                {this.props.selected ? this.generateLabels() : null}
            </LabelSelect>
        );
    }

    generateList() {
        let localArray = this.props.items;
        this.props.selected.map(function(select) {
            let name = typeof select.name === "undefined" ? select : select.name;
            localArray = localArray.filter(function(el) {
                return el.label !== name;
            });
        });
        return localArray.map(function(item) {
            return <LabelSelect.ModalItem
                    key={Math.random()}
                    data={{name: item.label}}>{item.label}</LabelSelect.ModalItem>;
        });
    }

    generateLabels() {
        const self = this;
        if(this.props.selected.length <= 0) {
            return null;
        }
        return this.props.selected.map(function(item) {
            let name = typeof item.name === "undefined" ? item : item.name;
            return <LabelSelect.Label
                    key={Math.random()}
                    data={item}
                    onCancel={() => self.props.remove(item)}>{name}</LabelSelect.Label>;

        });
    }
}