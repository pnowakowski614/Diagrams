export const postToDb = async (jsonString: string) => {
    const response = await callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/diagrams`, 'POST',
        jsonString, {'Content-Type': 'application/json', "x-access-token": localStorage.getItem('token')!})

    if (!response.error) {
        alert("Diagram saved!");
    }
}

export const getFromDb = async () => {
    const headers: HeadersInit = {
        "x-access-token": localStorage.getItem('token')!
    }

    return callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/diagrams`, 'GET', undefined, headers);
}

export const deleteFromDb = (id: string) => {
    callApiMethod(`${process.env.REACT_APP_BACKEND_URL}/diagrams/${id}`, 'DELETE')
}

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

export const loginUser = async (username: string, password: string) => {
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
}

export const registerUser = async (username: string, password: string, email: string) => {
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
