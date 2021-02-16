const apiPath = 'https://localhost:5001/'

export function GetRequest(method, apiMethodPath, cred = false){
    const xhr = new XMLHttpRequest();

    xhr.open("get", apiPath + apiMethodPath, true);
    xhr.onload = function () {
        let status = xhr.status;
        let result = xhr.response;
        method({status, result});
    }.bind(this);
    if (cred)
        xhr.withCredentials = true;
    xhr.send();
}

export function PostRequest(method, apiMethodPath, cred = false){
    const xhr = new XMLHttpRequest();

    xhr.open("post", apiPath + apiMethodPath, true);
    xhr.onload = function () {
        let status = xhr.status;
        let result = xhr.response;
        method({status, result});
    }.bind(this);
    if (cred)
        xhr.withCredentials = true;
    xhr.send();
}

export function DeleteRequest(method, apiMethodPath, cred = false){
    const xhr = new XMLHttpRequest();

    xhr.open("DELETE", apiPath + apiMethodPath, true);
    xhr.onload = function () {
        let status = xhr.status;
        let result = xhr.response;
        method({status, result});
    }.bind(this);
    if (cred)
        xhr.withCredentials = true;
    xhr.send();
}

export function PatchRequest(method, apiMethodPath, cred = false){
    const xhr = new XMLHttpRequest();

    xhr.open("PATCH", apiPath + apiMethodPath, true);
    xhr.onload = function () {
        let status = xhr.status;
        let result = xhr.response;
        method({status, result});
    }.bind(this);
    if (cred)
        xhr.withCredentials = true;
    xhr.send();
}
