import { dia } from "@clientio/rappid";

export const postInJSON = (graph: dia.Graph) => {
    const graphJSON = graph.toJSON();
    const jsonString = JSON.stringify(graphJSON);

    callApiMethod('http://localhost:7000/graphs', 'POST', "Diagram saved!",
        jsonString, {'Content-Type': 'application/json'})
}

export const fetchFromJSON = async () => {
    const response = await fetch('http://localhost:7000/graphs')
    return response.json();
}

export const deleteFromJSON = (id: number) => {
    callApiMethod(`http://localhost:7000/graphs/${id}`, 'DELETE', "Diagram deleted!")
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
