const people = [
    "philip",
    "mj"
]

people.forEach(person => {
    const addBtn = document.querySelector(`#${person}-container #addBtn`);
    const removeBtn = document.querySelector(`#${person}-container #removeBtn`);
    const setBtn = document.querySelector(`#${person}-container #setBtn`);

    addBtn.addEventListener('click', () => adding(person));
    removeBtn.addEventListener('click', () => removing(person));
    setBtn.addEventListener('click', () => setting(person));
});

function adding(person) {
    fetch("/strichliste/add/" + person)
        .then((res) => {
            if (res.ok) {
                updateCounter();
            } else {
                console.error("Failed to increment counter");
            }
        })
        .catch((error) => {
            console.error("Error occured while incrementing counter: ", error);
        });
}

function removing(person) {
    fetch('/strichliste/remove/' + person)
        .then((res) => {
            if (res.ok) {
                updateCounter();
            } else {
                console.error('Failed to decrement counter');
            }
        })
        .catch((error) => {
            console.error('Error occured while decremting counter: ', error);
        });
}

function setting(person) {
    let input = window.prompt(
        "Please enter a value that cannot be less or requal to 0: "
    );
    if (input && input < 0) {
        console.error('Too Low!');
        return;
    }
    if (input) {
        fetch('/strichliste/set/' + person, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ value: input, person: person })
        })
            .then((res) => {
                if (!res.ok) {
                    console.error("Error setting value. Please contact an admin about this issue!")
                    return;
                };
                updateCounter();
            })
            .catch((error) => {
                console.error("Error setting value. Please contact an admin about this issue: ", error);
            })
    }
}

function updateCounter() {
    fetch("/strichliste/info")
        .then((res) => res.json())
        .then((data) => {
            document.querySelector('#philip-container #counter').innerText = data.philip.counter;
            document.querySelector('#mj-container #counter').innerText = data.mj.counter;
        })
        .catch((error) => {
            console.error("Error occurred while fetching counter info:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    updateCounter();
    setInterval(() => {
        updateCounter();
    }, 100);
});
