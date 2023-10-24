let optionButtons = document.querySelectorAll(".btn-option");
let advancedOptionButtons = document.querySelectorAll(".btn-option-advanced");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let linkButton = document.getElementById("createLink");

const ACTIVE_CLASS = "active";

const init = () => {
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
}

const highlighter = (elements, needsRemoval) => {
    elements.forEach((element) => {
        element.addEventListener("click", () => {
            if (!needsRemoval) {
                element.classList.toggle(ACTIVE_CLASS);
            } else {
                let alreadyActive = false;
                
                if (element.classList.contains(ACTIVE_CLASS)) {
                    alreadyActive = true;
                }

                highlightRemover(elements);

                if (!alreadyActive) {
                    element.classList.add(ACTIVE_CLASS);
                }
            }
        });
    });
}

const highlightRemover = (elements) => {
    elements.forEach((element) => {
        element.classList.remove(ACTIVE_CLASS);
    });
}

const modifyText = (commandName, showDefaultUI, value) => {
    document.execCommand(commandName, showDefaultUI, value);
}

optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButtons.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", () => {
    let url = prompt("Enter a URL: ");
    if (!(/http/i.test(url))) {
        link = "http://" + url;
    }
    modifyText(linkButton.id, false, url);
});

window.onload = init();