let gridWidth = document.getElementById("width-range");
let widthValue = document.getElementById("width-value");
let gridHeight = document.getElementById("height-range");
let heightValue = document.getElementById("height-value");
let btnCreateGrid = document.getElementById("btn-create-grid");
let btnClearGrid = document.getElementById("btn-clear-grid");
let btnErase = document.getElementById("btn-erase");
let btnPaint = document.getElementById("btn-paint");
let color = document.getElementById("input-color");
let container = document.querySelector(".container");

const events = {
    mouse: {
        up: "mouseup",
        down: "mousedown",
        move: "mousemove"
    },
    touch: {
        up: "touchend",
        down: "touchstart",
        move: "touchmove"
    }
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (error) {
        deviceType = "mouse";
        return false;
    }
}

isTouchDevice();

btnCreateGrid.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let column = document.createElement("div");
            column.classList.add("gridColumn");
            column.setAttribute("id", `gridColumn${count}`);

            column.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            column.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    column.style.backgroundColor = "transparent";
                } else {
                    column.style.backgroundColor = color.value;
                }
            });

            column.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId);
            });

            div.appendChild(column);
        }
        container.appendChild(div);
    }
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridColumn");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = color.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

btnClearGrid.addEventListener("click", () => {
    container.innerHTML = "";
});

btnErase.addEventListener("click", () => {
    erase = true;
});

btnPaint.addEventListener("click", () => {
    erase = false;
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};