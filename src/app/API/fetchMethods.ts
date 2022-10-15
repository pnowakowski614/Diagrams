import { dia } from "@clientio/rappid";

export const postInJSON = (graph: dia.Graph) => {
    const graphJSON = graph.toJSON();
    const jsonString = JSON.stringify(graphJSON);

    fetch('http://localhost:7000/graphs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: jsonString
    }).then(async response => {
            if (!response.ok) {
                const error = response.status;
                return Promise.reject(error);
            }

            alert("Diagram saved!")
        }
    ).catch((error) => {
        alert("Error!: " + error.toString());
    })
}

export const fetchFromJSON = async () => {
    const response = await fetch('http://localhost:7000/graphs')
    return response.json();
}
