import React, { useState } from "react";
import styles from './inspector.module.scss';
import { Input, List, ListSubheader } from "@mui/material";
import { dia } from "@clientio/rappid";

interface InspectorProps {
    elementView: dia.ElementView
}

const Inspector = ({elementView}: InspectorProps) => {

    const [textValue, setTextValue] = useState(elementView.model.attr("label/text"))

    const handleChange = (event: any) => {
        setTextValue(event.target.value);
        elementView.model.attr("label/text", event.target.value);
    }

    return (
        <div className={styles.inspector}>
            <List
                sx={{
                    width: "100%",
                    bgcolor: '#c9ba91',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader"
                                   sx={{
                                       bgcolor: "#B68839",
                                       width: "100%",
                                       fontWeight: "bold",
                                   }}>
                        Text
                    </ListSubheader>
                }
            >
                <Input value={textValue} onChange={handleChange}/>
            </List>
        </div>
    )
}

export default Inspector;
