
export function sendDataToLog(name, key, value) {

    const password = "password1111";

    fetch('http://colinmcgovern.com:5678/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, key, value, password }),
    })
}

