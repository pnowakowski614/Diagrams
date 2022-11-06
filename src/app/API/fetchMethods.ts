export const postInJSON = (jsonString: string) => {
    callApiMethod('http://localhost:5000/diagrams', 'POST',
        jsonString, {'Content-Type': 'application/json'})
}

export const getFromJSON = async () => {
    const response = await fetch('http://localhost:5000/diagrams');
    return response.json();
}

export const deleteFromJSON = (id: string) => {
    callApiMethod(`http://localhost:5000/diagrams/${id}`, 'DELETE')
}

const callApiMethod = (url: string, methodName: string, body?: BodyInit, headers?: HeadersInit) => {
    fetch(url, {
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

    callApiMethod('http://localhost:5000/users/login', 'POST',
        body, {'Content-Type': 'application/json'})
}

export const registerUser = async (username: string, password: string, email: string) => {
    const body = JSON.stringify({
        username,
        email,
        password
    })

    callApiMethod('http://localhost:5000/users/register', 'POST',
        body, {'Content-Type': 'application/json'})
}
