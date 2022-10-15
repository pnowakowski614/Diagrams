import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Toolbar } from "@mui/material";
import styles from "./diagramList.module.scss";
import { jsonGraphSliceActions } from "app/store/store";
import { useDispatch } from "react-redux";
import { fetchFromJSON } from "../../API/fetchMethods";

const DiagramList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [jsonObject, setJsonObject] = useState<[{ cells: [], diagramName: string, id: number }]>([{
        cells: [],
        diagramName: "",
        id: 0
    }]);

    const getJSONObject = async () => {
        const JSONObject = await fetchFromJSON();
        setJsonObject(JSONObject);
    }

    useEffect(() => {
        getJSONObject();
    }, [])

    const handleOpen = (object: {}, id: number) => {
        dispatch(jsonGraphSliceActions.addObject({object, id}));
        history.push("/diagram");
    }

    return (
        <>
            {
                jsonObject.map(object => {
                    return (
                        <Toolbar key={object.id} className={styles.toolbar}>
                            <h4>{object.id}</h4>
                            <h4>{object.diagramName}</h4>
                            <Button variant="contained" className={styles.button}
                                    onClick={() => handleOpen(jsonObject, object.id)}>
                                Open
                            </Button>
                        </Toolbar>
                    );
                })
            }
        </>
    )
}

export default DiagramList;
