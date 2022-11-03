export const postInJSON = (jsonString: string) => {
    callApiMethod('http://localhost:5000/diagramList', 'POST', "Diagram saved!",
        jsonString, {'Content-Type': 'application/json'})
}

export const getFromJSON = async () => {
    const response = await fetch('http://localhost:5000/diagramList');
    return response.json();
}

export const deleteFromJSON = (id: string) => {
    callApiMethod(`http://localhost:5000/diagramList/${id}`, 'DELETE', "Diagram deleted!")
}

const callApiMethod = (url: string, methodName: string, message?: string, body?: BodyInit, headers?: HeadersInit) => {
    fetch(url, {
        method: methodName,
        headers: headers,
        body: body
    }).then(async response => {
            alert(message);
            return response.json()
        }
    ).catch((error) => {
        alert("Error!: " + error.toString());
    })
}
