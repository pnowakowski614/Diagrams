import { DbCellAttrs } from "../types/types";

const callApiMethod = async (
  url: string,
  methodName: string,
  body?: BodyInit,
  headers?: HeadersInit
): Promise<any> => {
  const response = await fetch(url, {
    method: methodName,
    headers: headers,
    body: body,
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error!");
  }
};

export const postToDb = (
  diagram: DbCellAttrs[],
  diagramName: string
): Promise<any> => {
  const body: BodyInit = JSON.stringify({
    diagram,
    diagramName,
  });
  return callApiMethod(
    `${process.env.REACT_APP_BACKEND_URL}/diagrams`,
    "POST",
    body,
    {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token")!,
    }
  );
};

export const getDiagramListFromDb = (): Promise<any> => {
  const headers: HeadersInit = {
    "x-access-token": localStorage.getItem("token") ?? "",
  };

  return callApiMethod(
    `${process.env.REACT_APP_BACKEND_URL}/diagrams`,
    "GET",
    undefined,
    headers
  );
};

export const getSingleDiagramFromDb = (id: string): Promise<any> => {
  return callApiMethod(
    `${process.env.REACT_APP_BACKEND_URL}/diagrams/${id}`,
    "GET",
    undefined,
    { "Content-Type": "application/json" }
  );
};

export const updateDiagramInDb = (
  cells: DbCellAttrs[],
  diagramName: string,
  id: string
): Promise<any> => {
  const body: BodyInit = JSON.stringify({
    cells,
    diagramName,
  });

  return callApiMethod(
    `${process.env.REACT_APP_BACKEND_URL}/diagrams/${id}`,
    "PATCH",
    body,
    { "Content-Type": "application/json" }
  );
};

export const deleteFromDb = (id: string): Promise<any> => {
  return callApiMethod(
    `${process.env.REACT_APP_BACKEND_URL}/diagrams/${id}`,
    "DELETE"
  );
};

export const loginUser = async (
  username: string,
  password: string
): Promise<any> => {
  const body = JSON.stringify({
    username,
    password,
  });

  return callApiMethod(
    `${process.env.REACT_APP_BACKEND_URL}/users/login`,
    "POST",
    body,
    { "Content-Type": "application/json" }
  );
};

export const registerUser = async (
  username: string,
  password: string,
  email: string
): Promise<any> => {
  const body = JSON.stringify({
    username,
    email,
    password,
  });

  return callApiMethod(
    `${process.env.REACT_APP_BACKEND_URL}/users/register`,
    "POST",
    body,
    { "Content-Type": "application/json" }
  );
};
