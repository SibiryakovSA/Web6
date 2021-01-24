let result = 'no edited';

function Request(){
    const apiPath = 'https://localhost:5001/'
    const methodName = 'weatherforecast';
    const xhr = new XMLHttpRequest();
    xhr.open("get", apiPath + methodName, false);
    xhr.onload = function () {
        result = xhr.responseText;
        return result;
    }.bind(this);
    xhr.send();
}



export function TestRequest(){
    Request();
    return result;
}

export function RequestStub(){
    return "stub";
}