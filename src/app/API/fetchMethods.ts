import { dia } from "@clientio/rappid";

export const postInJSON = (graph: dia.Graph) => {
    const graphJSON = graph.toJSON();
    const jsonString = JSON.stringify(graphJSON);

    callApiMethod('http://localhost:7000/graphs', 'POST',
        jsonString, {'Content-Type': 'application/json'}, "Diagram saved!")
}

export const fetchFromJSON = async () => {
    const response = await fetch('http://localhost:7000/graphs')
    return response.json();
}

export const deleteFromJSON = (id: number) => {
    callApiMethod(`http://localhost:7000/graphs/${id}`, 'DELETE')
}

const callApiMethod = (url: string, methodName: string, body?: BodyInit, headers?: HeadersInit, message?: string) => {
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
