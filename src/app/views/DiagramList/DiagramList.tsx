import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { jsonGraphSliceActions } from "app/store/store";
import { useDispatch } from "react-redux";
import { deleteFromDb, getFromDb } from "../../API/fetchMethods";
import { DiagramBar } from "./DiagramBar";

const DiagramList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [jsonObject, setJsonObject] = useState<[{ cells: [], diagramName: string, id: number, _id: string }]>([{
        cells: [],
        diagramName: "",
        id: 0,
        _id: ""
    }]);

    const getJSONObject = async () => {
        const JSONObject = await getFromDb();
        setJsonObject(JSONObject);
    }

    useEffect(() => {
        getJSONObject();
    })

    const renderComponents = () => {
        return jsonObject.map((object, index) => {
            return (
                <DiagramBar key={index} index={index} diagramList={jsonObject} object={object} handleOpen={handleOpen}
                            handleDelete={handleDelete}/>
            );
        })
    }

    const handleOpen = (object: [{ cells: [], diagramName: string, _id: string }], _id: string) => {
        dispatch(jsonGraphSliceActions.addObject({object, _id}));
        history.push("/diagram");
    }

    const handleDelete = (object: [{ cells: [], diagramName: string, _id: string }], _id: string) => {
        deleteFromDb(_id);
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
