// external sources
import React from "react";

// components
import {Accordion, Panel} from "react-bootstrap";


class AccordionPanel extends React.Component {
    render() {
        const list = this.props.list.map((item) => {
            return(
                <p key={this.props.list.indexOf(item)}>{item}</p>
            );
        });
        return(
            <div className="accordion-panel">
                <Accordion>
                    <Panel header={this.props.header} eventKey={this.props.header.toLowerCase()}>
                        {list}
                    </Panel>
                </Accordion>
            </div>
        );
    }
}

export default AccordionPanel;