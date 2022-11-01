import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { jsonGraphSliceActions } from "app/store/store";
import { useDispatch } from "react-redux";
import { deleteFromJSON, fetchFromJSON } from "../../API/fetchMethods";
import { DiagramBar } from "./DiagramBar";

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

    const renderComponents = () => {
        return jsonObject.map(object => {
            return (
                <DiagramBar jsonObject={jsonObject} object={object} handleOpen={handleOpen}
                            handleDelete={handleDelete}/>
            );
        })
    }

    useEffect(() => {
        renderComponents();
    })

    const handleOpen = (object: [{ cells: [], diagramName: string, id: number }], id: number) => {
        dispatch(jsonGraphSliceActions.addObject({object, id}));
        history.push("/diagram");
    }

    const handleDelete = (object: [{ cells: [], diagramName: string, id: number }], id: number) => {
        deleteFromJSON(id);
        dispatch(jsonGraphSliceActions.addObject({object, id}));
        getJSONObject();
    }

    return (
        <>
            {
                renderComponents()
            }
        </>
    )
}

export default DiagramList;
