const callApiMethod = (url: string, methodName: string, body?: BodyInit, headers?: HeadersInit): Promise<any> | void => {
    return fetch(url, {
        method: methodName,
        headers: headers,
        body: body
    }).then(response => {
            return response.json()
        }
    ).catch((error) => {
        alert("Error!: " + error.toString());
    })
}

export const postToDb = async (diagram: JSON, diagramName: string): Promise<any> => {
    const body: BodyInit = JSON.stringify({
        diagram,
        diagramName
    })
    return callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/diagrams`, 'POST',
        body, {'Content-Type': 'application/json', "x-access-token": localStorage.getItem('token')!})
}

export const getDiagramListFromDb = async (): Promise<any> => {
    const headers: HeadersInit = {
        "x-access-token": localStorage.getItem('token') ?? ""
    }

    return callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/diagrams`, 'GET', undefined, headers);
}

export const getSingleDiagramFromDb = async (id: string): Promise<any> => {
    return callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/diagrams/${id}`, 'GET', undefined, {'Content-Type': 'application/json'});
}

export const updateDiagramInDb = async (cells: JSON, diagramName: string, id: string): Promise<any> => {
    const body: BodyInit = JSON.stringify({
        cells,
        diagramName
    })

    return callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/diagrams/${id}`, 'PATCH',
        body, {'Content-Type': 'application/json'})
}

export const deleteFromDb = async (id: string): Promise<any> => {
    return callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/diagrams/${id}`, 'DELETE')
}

export const loginUser = async (username: string, password: string): Promise<any> => {
    const body = JSON.stringify({
        username,
        password
    })

    const data = await callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/users/login`, 'POST',
        body, {'Content-Type': 'application/json'})

    if (data.user) {
        localStorage.setItem('token', data.user);
        alert("Login successful!");
        window.location.href = "/diagram";
    } else {
        alert("Incorrect username or password!");
    }

    return data;
}

export const registerUser = async (username: string, password: string, email: string): Promise<any> => {
    const body = JSON.stringify({
        username,
        email,
        password
    })

    const data = await callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/users/register`, 'POST',
        body, {'Content-Type': 'application/json'})

    if (data.status === 'ok') {
        window.location.href = "/login";
    } else {
        alert("Registration unsuccessful!")
    }
}
