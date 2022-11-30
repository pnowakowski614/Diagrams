import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppDispatch, RootState } from "app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { DiagramBar } from "./DiagramBar";
import { clearCurrentDiagram, deleteDiagram, getDiagrams, getSingleDiagram } from "../../store/diagramsSlice";

const DiagramList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory();
    const {diagrams, loadingList} = useSelector((state: RootState) => state.diagrams)
    const {id} = useSelector((state: RootState) => state.diagrams)

    useEffect(() => {
        dispatch(getDiagrams())
    }, [])

    if (loadingList) return <h2>Loading...</h2>

    const renderComponents = () => {
        return diagrams.map((object: { _id: string, diagramName: string }, index: number) => {
            return (
                <DiagramBar key={index} index={index} object={object} handleOpen={handleOpen}
                            handleDelete={handleDelete}/>
            );
        })
    }

    const handleOpen = async (_id: string) => {
        await dispatch(getSingleDiagram(_id));
        history.push("/diagram");
    }

    const handleDelete = async (_id: string) => {
        if (_id === id) {
            dispatch(clearCurrentDiagram());
        }
        await dispatch(deleteDiagram(_id));
        dispatch(getDiagrams());
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
