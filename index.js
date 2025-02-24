// Get the display element from the HTML document
const display = document.getElementById("display");

var hiddenDisplay = "";

/**
 * Function to append input to the display.
 * @param {string} input - The input to be appended to the display.
 */

function appendToDisplay(input) {

    hiddenDisplay += input;

    switch (input) {
        case '**': display.value += '^'; break;
        case 'Math.sin': display.value += 'sin'; break;
        case 'Math.cos': display.value += 'cos'; break;
        case 'Math.tan': display.value += 'tan'; break;
        case 'Math.E': display.value += 'e'; break;
        case 'Math.PI': display.value += 'π'; break;
        case 'Math.log': display.value += 'ln'; break;  
        case '* Math.PI/180': display.value += '°'; break;    
        case 'Math.sqrt': display.value += '√'; break;
        case '/': display.value += '÷'; break;
        case '*': display.value += '×'; break;
        default : {display.value += input; break;} 
    }
}


/**
 * Function to clear the display.
 */
function clearDisplay() {
    display.value = "";
    hiddenDisplay= "";
}

/**
 * Asynchronous function to perform calculation based on the input in the display.
 */
async function calculate() {
    
    if( display.value.includes("Math.tan(90°)") ||
        display.value.includes("√(-") ||
        display.value.includes("÷0") ||
        display.value.includes("0^0")
    ){
        display.value = "Math Error"
        await delay(1000);
        clearDisplay(); 
    } 

    else try {
        // Evaluate the expression in the display and update the display with the result
        display.value = eval(hiddenDisplay);   
        hiddenDisplay = eval(hiddenDisplay);  
    } catch (error) {
        // Display "Syntax Error" if evaluation fails and clear the display after 1 second
        display.value = "Syntax ERROR";
        await delay(1000);
        clearDisplay();
    }    
}

/**
 * Asynchronous function to introduce a delay.
 * @param {number} delayInms - The delay time in milliseconds.
 */
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

/**
 * Function to simulate backspace functionality by removing the last character from the display.
 */
function backspace() {
    // Get the current value from the display
    let currentValue = display.value;
    
    // Check if the display is not empty
    if (currentValue.length > 0) {
        // Remove the last character from the display
        display.value = currentValue.slice(0, -1);
    }
}

//Cursor code:
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e){
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    //cursorOutline.style.left = `${posX}px`;
    //cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {duration: 250, fill: "forwards"});
});