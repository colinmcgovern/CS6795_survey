
export function sendDataToLog(name, key, value) {

    const password = "password1111";

    console.log("asdf")

    fetch('https://awae8rrii1.execute-api.us-west-2.amazonaws.com/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, key, value, password }),
    })
}

