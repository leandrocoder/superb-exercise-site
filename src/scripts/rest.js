//const HOST = "http://localhost:3000"
const HOST = `http://${window.location.hostname}:3000`

async function get(path) {
    return new Promise(res => {
        fetch(HOST+path).then(response => response.json()).then(json => res(json));
    })
}

async function del(path, id) {
    return new Promise(res => {
        const config = {
            method: 'DELETE'
        }
        fetch(HOST+path + "/" + id, config).then(response => response.json()).then(json => res(json));
    })
}

async function post(path, body) {
    return new Promise(res => {
        const config = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
        fetch(HOST+path, config).then(response => response.json()).then(json => res(json));
    })
}

export default {get, post, del}