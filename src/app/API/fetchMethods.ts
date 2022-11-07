export const postToDb = async (jsonString: string) => {
    const response = await callApiMethod('http://localhost:5000/diagrams', 'POST',
        jsonString, {'Content-Type': 'application/json', "x-access-token": localStorage.getItem('token')!})

    if (!response.error) {
        alert("Diagram saved!");
    }
}

export const getFromDb = async () => {
    const headers: HeadersInit = {
        "x-access-token": localStorage.getItem('token')!
    }
    const response = await fetch('http://localhost:5000/diagrams', {
        headers: headers,
    });
    return response.json();
}

export const deleteFromDb = (id: string) => {
    callApiMethod(`http://localhost:5000/diagrams/${id}`, 'DELETE')
}

const callApiMethod = (url: string, methodName: string, body?: BodyInit, headers?: HeadersInit): Promise<any> | void => {
    return fetch(url, {
        method: methodName,
        headers: headers,
        body: body
    }).then(async response => {
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

    const data = await callApiMethod('http://localhost:5000/users/login', 'POST',
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

    const data = await callApiMethod('http://localhost:5000/users/register', 'POST',
        body, {'Content-Type': 'application/json'})

    if (data.status === 'ok') {
        window.location.href = "/login";
    } else {
        alert("Registration unsuccessful!")
    }
}
