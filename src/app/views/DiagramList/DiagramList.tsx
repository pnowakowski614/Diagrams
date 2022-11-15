import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from "app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { DiagramBar } from "./DiagramBar";
import { getDiagrams } from "../../store/getDiagramsSlice";
import { clearCurrentDiagram, getSingleDiagram } from "../../store/singleDiagramSlice";
import { deleteDiagram } from "../../store/deleteDiagramSlice";

const DiagramList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory();
    const {diagrams, loading} = useSelector((state: any) => state.diagrams)
    const {currentDiagram, loadingDiagram, id} = useSelector((state: any) => state.singleDiagram)

    useEffect(() => {
        dispatch(getDiagrams())
    }, [])

    if (loading) return <h2>Loading...</h2>

    const renderComponents = () => {
        return diagrams.map((object: { cells: [], _id: string }, index: number) => {
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
