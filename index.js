var InsertArrayClicked = false;
var ArrayElements = [];
const HighlightColor = "orange"
const DefaultColor = "#333333"
const mediumSpeed = 100
const fastSpeed = 10

function createNumberBars(ArrayElements){
    var VisualArea = document.getElementById("SortingArea")
    console.log(screen.availWidth)
    var WidthOfBars = screen.availWidth/(ArrayElements.length)
    VisualArea.innerHTML = ''
    var a= 0;
    for(var i=0; i<ArrayElements.length; i++){
        var Element = document.createElement("span");
        Element.style.width = (WidthOfBars*3/4).toString() + "px"
        Element.style.height = (ArrayElements[i]*2).toString() + "px"
        Element.style.backgroundColor = "#333333"
        Element.style.marginRight = (WidthOfBars/5).toString() + "px"
        Element.style.display = "inline-block"
        VisualArea.appendChild(Element)
    }
    window.scrollTo(0,document.body.scrollHeight);
}

function SetBarsColor(index1, index2, color){
    var AllBars = document.getElementById("SortingArea").childNodes
    var Bar1 = AllBars[index1]
    var Bar2 = AllBars[index2]
    Bar1.style.backgroundColor = color
    Bar2.style.backgroundColor = color
}

function Swapbars(index1, index2){
    var temp
    var AllBars = document.getElementById("SortingArea").childNodes
    var Bar1 = AllBars[index1]
    var Bar2 = AllBars[index2]
    temp = Bar2.style.height
    Bar2.style.height = Bar1.style.height
    Bar1.style.height = temp
}

function SwapNumbers(Array, index1, index2){
    var temp;
    temp = Array[index1]
    Array[index1] = Array[index2]
    Array[index2] = temp
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function BubbleSort(Numbers){
    //50 60 20 30 10 50 60 70 200
    for(var i=0; i<Numbers.length; i++){
        var swapped = false
        for(var j=0; j<Numbers.length-i-1; j++){
            if( Numbers[j] > Numbers[j+1] ){
                setTimeout(SetBarsColor(j, j+1, HighlightColor))
                await sleep(fastSpeed)
                Swapbars(j, j+1)
                SetBarsColor(j, j+1, DefaultColor)
                SwapNumbers(Numbers, j, j+1)
                swapped = true
            }
        }
        if(!swapped){
            break
        }
    }
    console.log(Numbers)
}

function OnClickInsertAnArray(){
    if(!InsertArrayClicked){
        InsertArrayClicked = true;
        var InputTextArea = document.createElement("textarea");
        InputTextArea.setAttribute("id", "InputTextArea");
        
        var InfoMessage = document.createTextNode("Enter the numbers separated by space:"); 
        var SubmitButtonText = document.createTextNode("Submit"); 
        var InputSubmitButton = document.createElement("button");
        InputSubmitButton.setAttribute("id", "InputSubmitButton");
        InputSubmitButton.setAttribute("onclick", "OnClickInputSubmitButton()");
        InputSubmitButton.appendChild(SubmitButtonText)
        
        var InputArea = document.getElementById("InputArea");
        InputArea.appendChild(InfoMessage);
        InputArea.appendChild(InputTextArea);
        InputArea.appendChild(InputSubmitButton);
    }
    else{
        InsertArrayClicked = false;
        var InputArea = document.getElementById("InputArea");
        InputArea.innerHTML = '';                    
    }
}

function OnClickInputSubmitButton(){
    console.log("Submit button clicked")
    var UserInput = document.getElementById("InputTextArea").value
    var Numbers = UserInput.split(' ')
    ArrayElements = []
    if( Numbers.length != 0){
        for(var i=0; i< Numbers.length; i++){
            if( isNaN(Numbers[i]) == false && Numbers[i] != "" ){
                ArrayElements.push(parseInt(Numbers[i]))
            }
        }
        var SortingChoice = document.getElementById('SortingAlgos').value;
        createNumberBars(ArrayElements)
        if( SortingChoice == "Bubble" ){
            BubbleSort(ArrayElements)
        }
        else if( SortingChoice == "Selection" ){
            console.log(SortingChoice)
        }
        else if( SortingChoice == "Insertion" ){
            console.log(SortingChoice)
        }
        else if( SortingChoice == "Merge" ){
            console.log(SortingChoice)
        }
        else if( SortingChoice == "Heap" ){
            console.log(SortingChoice)
        }
        else if( SortingChoice == "Quick" ){
            console.log(SortingChoice)
        }
    }
}
