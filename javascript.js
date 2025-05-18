let bottomNumber = 0;
let topNumber = 0;
let operator = '';

function paintFragment(fragment, color){

    if (fragment.classList[0] == 'vertical')
    {
        let topChild = fragment.querySelector('.top');
        let centerChild = fragment.querySelector('.center');
        let bottomChild = fragment.querySelector('.bottom');

        topChild.style.borderBottomColor = color;
        centerChild.style.backgroundColor = color;
        bottomChild.style.borderTopColor = color;
    }
    else
    {
        let leftChild = fragment.querySelector('.left');
        let centerChild = fragment.querySelector('.center');
        let rightChild = fragment.querySelector('.right');

        leftChild.style.borderRightColor = color;
        centerChild.style.backgroundColor = color;
        rightChild.style.borderLeftColor = color;
    }
    
}

let numberHtml =` <div class="digit">
      <div class="horizontal" id="one">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
      </div>

      <div class="verticalContainer">
        <div class="vertical" id="four">
          <div class="top"></div>
          <div class="center"></div>
          <div class="bottom"></div>
        </div>
        <div class="vertical" id="five">
          <div class="top"></div>
          <div class="center"></div>
          <div class="bottom"></div>
        </div>
      </div>

      <div class="horizontal" id="two">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
      </div>

      <div class="verticalContainer">
        <div class="vertical" id="six">
          <div class="top"></div>
          <div class="center"></div>
          <div class="bottom"></div>
        </div>
        <div class="vertical" id="seven">
          <div class="top"></div>
          <div class="center"></div>
          <div class="bottom"></div>
        </div>
      </div>

      <div class="horizontal" id="three">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right" ></div>
    </div>`

let topNumberContainer = document.querySelector('.topDisplay');
function resetTopNumberContainer(){
    topNumberContainer.innerHTML= '';
    for (let i=0; i < 6; i++)
        {
            topNumberContainer.innerHTML += numberHtml
        }
}
resetTopNumberContainer();

let bottomNumberContainer = document.querySelector('.bottomDisplay');
function resetBottomNumberContainer(){
    bottomNumberContainer.innerHTML = '';
    for (let i=0; i < 6; i++)
    {
        bottomNumberContainer.innerHTML += numberHtml
    }
}
resetBottomNumberContainer();


let digitSegments = {'0':['one', 'four', 'five', 'six', 'seven', 'three'],
    '1':['five','seven'],
    '2':['one', 'five', 'two', 'six', 'three'],
    '3':['one', 'five', 'two', 'three', 'seven'],
    '4':['four', 'two', 'five', 'seven'],
    '5':['one', 'four', 'two', 'seven', 'three'],
    '6':['one', 'four', 'two', 'six', 'seven', 'three'],
    '7':['one', 'five', 'seven'],
    '8':['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
    '9':['one', 'two', 'three', 'four', 'five', 'seven'],
    '.':['three'],
    '-':['two'],
    'P':['six', 'four', 'two', 'one', 'five'],
    'S':['one', 'four', 'two', 'seven', 'three']
}

let bottomDigitContainer = document.querySelectorAll('.bottomDisplay .digit');
let topDigitContainer = document.querySelectorAll('.topDisplay .digit');
bottomDigitContainer = [...bottomDigitContainer];
topDigitContainer = [...topDigitContainer];

function displayDigit(numberStr,itemIndex, container){
    let segmentsToPaint = digitSegments[numberStr];

    let selectedContainer = container[itemIndex];
    let selectedFragments = selectedContainer.querySelectorAll('.vertical,.horizontal')

    for (let i = 0; i < selectedFragments.length; i++){
        if (segmentsToPaint.includes(selectedFragments[i].id))
        {
            // console.log(allFragments[i].id);
            //console.log(selectedFragments[i]);
            
            paintFragment(selectedFragments[i], '#39ff14');
        }
}
}

function clearBottomDisplay(){
    for (let i = 0; i < bottomDisplayBuffer.length; i++){
            let selectedContainer = bottomDigitContainer[i];
            let selectedFragments = selectedContainer.querySelectorAll('.vertical,.horizontal')

            for (let i = 0; i < selectedFragments.length; i++)
            {
                paintFragment(selectedFragments[i], '#2e2e2e');
            }
}
}

function clearTopDisplay(){
    for (let i = 0; i < topDisplayBuffer.length; i++){
            let selectedContainer = topDigitContainer[i];
            let selectedFragments = selectedContainer.querySelectorAll('.vertical,.horizontal')

            for (let i = 0; i < selectedFragments.length; i++)
            {
                paintFragment(selectedFragments[i], '#2e2e2e');
            }
}
}

function populateTopDisplay(numberStr){
    clearTopDisplay();
    for (let i = 0; i < numberStr.length; i++){
            //let selectedContainer = topDigitContainer[i];
            //let selectedFragments = selectedContainer.querySelectorAll('.vertical,.horizontal');
            //console.log(numberStr[i]);
            displayDigit(numberStr[i], i, topDigitContainer);
}
}

function populateBottomDisplay(numberStr){
    clearBottomDisplay();
    for (let i = 0; i < numberStr.length; i++){
            //let selectedContainer = topDigitContainer[i];
            //let selectedFragments = selectedContainer.querySelectorAll('.vertical,.horizontal');
            //console.log(numberStr[i]);
            displayDigit(numberStr[i], i, bottomDigitContainer);
}
}
//populateTopDisplay('523');

//==========================================================
//======================BUTTONS SETUP=======================
//==========================================================
//==========================================================

let topDisplayBuffer = '';
let bottomDisplayBuffer = '';

let digitButtons = document.querySelectorAll('.digitButton');

digitButtons.forEach((element, index) => {element.addEventListener("click", (event) => 
    {   //displayDigit(3,1);
        if (topDisplayBuffer != '' && operator ==='')
        {
            clearTopDisplay();
            topDisplayBuffer = '';

        } 

        if (bottomDisplayBuffer.length == 6) return;
        if (index == 10)
            bottomDisplayBuffer += '0';
        else if (index ==9){
            if (bottomDisplayBuffer.includes('.'))
                return;
            bottomDisplayBuffer += '.';
        }
        
        else 
            bottomDisplayBuffer += index + 1;

        //console.log(bottomDisplayBuffer.length);
        //for (let i=bottomDisplayBuffer.length - 1; i >= 0 ; i--)
        displayDigit(bottomDisplayBuffer[bottomDisplayBuffer.length - 1] , bottomDisplayBuffer.length - 1, bottomDigitContainer);

        //console.log(bottomDisplayBuffer);
        
    } );} );

let equalsButton = document.querySelector('#equalsButton');
equalsButton.addEventListener("click", (event)=>{
    //if (operator == '')
      //  return;

    if (bottomDisplayBuffer === '' || topDisplayBuffer=== '')
    {
        return;
    }

    if (bottomDisplayBuffer == '00PS')
    {
        clearTopDisplay();
        bottomDisplayBuffer = '';
        return;
    }
        
    
    bottomNumber = parseFloat(bottomDisplayBuffer);
    /*
    if (isNaN(bottomNumber))
    {
        return;
    }
    */
    //console.log(operator, topNumber, bottomNumber);

    clearBottomDisplay();
    clearTopDisplay();
    topNumber = operate(operator, topNumber, bottomNumber)
    //console.log(topNumber, '   111111111');
    topDisplayBuffer = topNumber.toString();
    
    if (topDisplayBuffer.length > 6)
    {
        if (topDisplayBuffer.substring(0, 5).includes('.'))
        {
            topDisplayBuffer = topDisplayBuffer.substring(0, 6);
            console.log(topDisplayBuffer);
        }
        else{
            console.log("TOO MUCH!!");
            bottomDisplayBuffer='';
            topDisplayBuffer='00PS';
            populateTopDisplay("00PS");
            bottomNumber =0;
            topNumber=0;
            return;
        }
        
    }
    
    populateTopDisplay(topDisplayBuffer);
    bottomDisplayBuffer='';
    operator = '';
});

let clearAllButton = document.querySelector('#clearAllButton');
clearAllButton.addEventListener("click", (event)=>{
    clearBottomDisplay();
    bottomDisplayBuffer='';
    clearTopDisplay();
    topDisplayBuffer='';
    //console.log("CLEARED ALL");
});

let backspace = document.querySelector('#backspace');
backspace.addEventListener("click", (event)=>{
    clearBottomDisplay();
    let newBuffer = bottomDisplayBuffer.length - 1;
    bottomDisplayBuffer = bottomDisplayBuffer.substring(0, newBuffer);
    

    populateBottomDisplay(bottomDisplayBuffer);
});

let genericOperation = (operatorStr) =>{
    //console.log(bottomDisplayBuffer, '========');

    // jhandles situation, when user does operations one by onw without pressing the equals
    if (topDisplayBuffer != '' && bottomDisplayBuffer != '')
    {
        equalsButton.click();
        operator = operatorStr;
        return;
    }
    

    if (topDisplayBuffer == '00PS')
    {
        clearTopDisplay();
        topDisplayBuffer = '';
    }

    clearBottomDisplay();
    bottomNumber = parseFloat(bottomDisplayBuffer)

    operator = operatorStr;

    if (isNaN(bottomNumber))
    {
        return;
    }

    else if (topDisplayBuffer != '')
    {
        equalsButton.click();
        return;
    }

    populateTopDisplay(bottomDisplayBuffer);
    topDisplayBuffer = bottomDisplayBuffer;
    bottomDisplayBuffer = '';
    topNumber = bottomNumber;
    bottomNumber = 0;
};

let plusButton = document.querySelector('#plusButton');

plusButton.addEventListener("click", () => genericOperation('+'));

let minusButton = document.querySelector('#minusButton');
minusButton.addEventListener("click", () => genericOperation('-'));

let multiplyButton = document.querySelector('#multiplyButton');
multiplyButton.addEventListener("click", () => genericOperation('*'));

let divideButton = document.querySelector('#divideButton');
divideButton.addEventListener("click", () => genericOperation('/'));



//==========================================================
//====================Calculations SETUP====================
//==========================================================
//==========================================================




function add(num1, num2)
{
    return num1 + num2;
}

function substract(num1, num2)
{
    console.log(num2 - num1, "======");
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}

function divide(num1, num2)
{
    return num1 / num2;
}

function operate(operator, num1, num2)
{
    if (operator == '+')
        return add(num1, num2)
    else if (operator == '-')
        return substract(num1, num2);
    else if (operator == '*')
        return multiply(num1, num2);
    else if (operator == '/')
        return divide(num1, num2);
}
