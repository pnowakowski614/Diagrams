import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { DiagramBar } from "./DiagramBar";
import {
  clearCurrentDiagram,
  clearCurrentId,
  deleteDiagram,
  getDiagrams,
  getSingleDiagram,
} from "../../store/diagramsSlice";
import styles from "./diagramList.module.scss";

const DiagramList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { diagrams, loadingList, diagramId } = useSelector(
    (state: RootState) => state.diagrams
  );

  const handleOpen = async (_id: string) => {
    await dispatch(getSingleDiagram(_id));
    history.push("/diagram");
  };

  const handleDelete = async (_id: string) => {
    if (_id === diagramId) {
      dispatch(clearCurrentDiagram());
      dispatch(clearCurrentId());
    }
    await dispatch(deleteDiagram(_id));
    dispatch(getDiagrams());
  };

  useEffect(() => {
    dispatch(getDiagrams());
  }, []);

  if (loadingList) return <h2>Loading...</h2>;

  return (
    <div className={styles.wrapper}>
      {diagrams.map((object, index) => (
        <DiagramBar
          key={index}
          index={index}
          object={object}
          handleOpen={handleOpen}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default DiagramList;
