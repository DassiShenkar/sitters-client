import React from "react";
import {Accordion, Panel} from "react-bootstrap";


class StringsAccordion extends React.Component {
    render() {
        const dataArr = this.props.data.map((str) => {
            return(
                <p key={this.props.data.indexOf(str)}>{str}</p>
            );
        });
        return(
            <div>
                <Accordion>
                    <Panel header={this.props.header} eventKey={this.props.header.toLowerCase()}>
                        {dataArr}
                    </Panel>
                </Accordion>

            </div>
        );
    }
}

export default StringsAccordion;