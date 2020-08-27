var InsertArrayClicked = false;
var ArrayElements = [];
const HighlightColor = "orange"
const DefaultColor = "#333333"
const CompletedColor = "green"
const TraverseColor = "purple"
const slowSpeed = 1000
const mediumSpeed = 100
const highSpeed = 10

function createNumberBars(ArrayElements){
    var VisualArea = document.getElementById("SortingArea")
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

function SetBarsColor(BarsIndices, color){
    var AllBars = document.getElementById("SortingArea").childNodes
    for(var i=0; i<BarsIndices.length; i++){
        var temp = AllBars[BarsIndices[i]]
        temp.style.backgroundColor = color
    }
}

function Swapbars(index1, index2){
    var temp
    var AllBars = document.getElementById("SortingArea").childNodes
    var Bar1 = AllBars[index1]
    var Bar2 = AllBars[index2]
    tempH = Bar2.style.height
    tempBC = Bar2.style.backgroundColor
    Bar2.style.height = Bar1.style.height
    Bar2.style.backgroundColor = Bar1.style.backgroundColor
    Bar1.style.height = tempH
    Bar1.style.backgroundColor = tempBC
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

function range(Start, End){
    var RangeArray = []
    for(var i=Start; i < End; i++){
        RangeArray.push(i)
    }
    return RangeArray
}

async function BubbleSort(Numbers){
    for(var i=0; i<Numbers.length; i++){
        var swapped = false
        for(var j=0; j<Numbers.length-i-1; j++){
            if( Numbers[j] > Numbers[j+1] ){
                SetBarsColor([j, j+1], HighlightColor)
                await sleep(mediumSpeed)
                Swapbars(j, j+1)
                SetBarsColor([j, j+1], DefaultColor)
                SwapNumbers(Numbers, j, j+1)
                swapped = true
            }
        }
        if(!swapped){
            var RangeArray = range(0, Numbers.length-i)
            SetBarsColor(RangeArray, CompletedColor)
            break
        }
        SetBarsColor([Numbers.length-i-1], CompletedColor)
    }
    InputSubmitButton = document.getElementById('InputSubmitButton')
    InputSubmitButton.disabled = false
}

async function SelectionSort(Numbers){
    for(var i=0; i<Numbers.length; i++){
        var maxInd = 0
        SetBarsColor([0], HighlightColor)
        for(var j=1; j<Numbers.length-i; j++){
            SetBarsColor([j], TraverseColor)
            await sleep(mediumSpeed)
            if(Numbers[j] > Numbers[maxInd]){
                SetBarsColor([maxInd], DefaultColor)
                maxInd = j
                SetBarsColor([maxInd], HighlightColor)
            }
            else{
                SetBarsColor([j], DefaultColor)
            }
        }
        Swapbars(maxInd, Numbers.length-i-1)
        SwapNumbers(Numbers, Numbers.length-i-1, maxInd)
        SetBarsColor([maxInd], DefaultColor)
        SetBarsColor([Numbers.length-i-1], CompletedColor)
    }
    InputSubmitButton = document.getElementById('InputSubmitButton')
    InputSubmitButton.disabled = false
}

async function InsertionSort(Numbers){
    for(var i=1; i<Numbers.length; i++){
        j = i-1
        SetBarsColor([i], HighlightColor)
        while(Numbers[j] > Numbers[j+1] && j >= 0){
            await sleep(mediumSpeed)
            SwapNumbers(Numbers, j, j+1)
            Swapbars(j, j+1)
            j = j-1
        }
        SetBarsColor([j+1], DefaultColor)
        var RangeArray = range(0, i+1)
        SetBarsColor(RangeArray, TraverseColor)
    }
    var RangeArray = range(0, i)
    SetBarsColor(RangeArray, CompletedColor)
    InputSubmitButton = document.getElementById('InputSubmitButton')
    InputSubmitButton.disabled = false
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
    var UserInput = document.getElementById("InputTextArea").value
    var SplitArray = UserInput.split(' ')
    ArrayElements = []
    if( SplitArray.length != 0){
        for(var i=0; i< SplitArray.length; i++){
            if( isNaN(SplitArray[i]) == false && SplitArray[i] != "" ){
                ArrayElements.push(parseInt(SplitArray[i]))
            }
        }
        var SortingChoice = document.getElementById('SortingAlgos').value;
        var InputSubmitButton = document.getElementById('InputSubmitButton')
        InputSubmitButton.disabled = true
        createNumberBars(ArrayElements)
        if( SortingChoice == "Bubble" ){
            BubbleSort(ArrayElements)
        }
        else if( SortingChoice == "Selection" ){
            SelectionSort(ArrayElements)
        }
        else if( SortingChoice == "Insertion" ){
            InsertionSort(ArrayElements)
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
