import React, { useEffect, useState } from "react";
import styles from './inspector.module.scss';
import { Input, Select, SelectChangeEvent } from "@mui/material";
import { dia } from "@clientio/rappid";
import { getShapeLabelWidth, portSelectRender } from "../../../utils/rappid-utils";


interface InspectorProps {
    elementView: dia.ElementView
}

const Inspector = ({elementView}: InspectorProps) => {
    const inspectedElementText = elementView.model.attr("label/text");
    const inspectedElementPortsIn = elementView.model.prop("ports/groups/in/position/name");
    const inspectedElementPortsOut = elementView.model.prop("ports/groups/out/position/name");

    const [textValue, setTextValue] = useState(inspectedElementText);
    const [portsInValue, setPortsInValue] = useState(inspectedElementPortsIn);
    const [portsOutValue, setPortsOutValue] = useState(inspectedElementPortsOut);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        elementView.model.attr("label/textWrap", {
            width: getShapeLabelWidth(elementView),
            height: 20,
            ellipsis: true
        })

        setTextValue(event.target.value);
        elementView.model.attr("label/text", event.target.value);
    }

    const handleChangePortIn = (event: SelectChangeEvent) => {
        setPortsInValue(event.target.value);
        elementView.model.prop("ports/groups/in/position/name", event.target.value);
    }

    const handleChangePortOut = (event: SelectChangeEvent) => {
        setPortsOutValue(event.target.value);
        elementView.model.prop("ports/groups/out/position/name", event.target.value);
    }

    useEffect(() => {
        setTextValue(inspectedElementText);
    }, [inspectedElementText])

    if (inspectedElementPortsIn !== portsInValue) {
        setPortsInValue(inspectedElementPortsIn);
    }

    if (inspectedElementPortsOut !== portsOutValue) {
        setPortsOutValue(inspectedElementPortsOut);
    }

    return (
        <div className={styles.inspector}>
            <div className={styles.inspectorCategoryContainer}>
                <h4 className={styles.inspectorCategoryHeader}>Label</h4>
            </div>
            <Input className={styles.input} value={textValue} onChange={handleInputChange}/>
            <div className={styles.inspectorCategoryContainer}>
                <h4 className={styles.inspectorCategoryHeader}>Port placement</h4>
            </div>
            <h5 className={styles.portsSubheader}>Ports In</h5>
            <Select
                id="ports-in-select"
                defaultValue=""
                value={portsInValue}
                label={portsInValue}
                onChange={handleChangePortIn}
            >
                {portSelectRender(elementView)};
            </Select>
            <h5 className={styles.portsSubheader}>Ports Out</h5>
            <Select
                id="ports-out-select"
                defaultValue=""
                value={portsOutValue}
                label={portsOutValue}
                onChange={handleChangePortOut}
            >
                {portSelectRender(elementView)}
            </Select>
            <div className={styles.inspectorCategoryContainer}>
                <h4 className={styles.inspectorCategoryHeader}>Background Color</h4>
            </div>
        </div>
    )
}

export default Inspector;
