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

function SynchronousDelay(time){
    start = new Date()
    do {
        end = new Date()
    }
    while(end - start < time)

}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function range(Start, End){
    var RangeArray = []
    for(var i=Start; i < End; i++){
        RangeArray.push(i)
    }
    return RangeArray
}

function InsertElementInSpecifiedPosition(Source, Destination){
    var SortingArea = document.getElementById("SortingArea")
    var AllBars = document.getElementById("SortingArea").childNodes
    var ElementToMove = AllBars[Source]
    SortingArea.removeChild(ElementToMove)
    SortingArea.insertBefore(ElementToMove, AllBars[Destination])
    
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

async function Merge(Numbers, left, mid, right){
    var ptr1 = 0, ptr2 = 0, LeftArray = [], RightArray = [], absPos = 0
    for(var i=0; i<=mid-left; i++){
        LeftArray.push(Numbers[left+i])
    }
    for(var i=0; i<=right-(mid+1); i++){
        RightArray.push(Numbers[mid+1+i])
    }
    
    while(ptr1 <= mid-left && ptr2 <= right-(mid+1)){
        SetBarsColor([left+ptr1, mid+1+ptr2], HighlightColor)
        await sleep(mediumSpeed)
        if(LeftArray[ptr1] <= RightArray[ptr2]){
            Numbers[left+absPos] = LeftArray[ptr1]
            SetBarsColor([left+ptr1, mid+1+ptr2], DefaultColor)
            ptr1++;
            absPos++;
        }
        else{
            Numbers[left+absPos] = RightArray[ptr2]
            InsertElementInSpecifiedPosition(mid+1+ptr2, left+absPos)
            SetBarsColor([left+ptr1, left+absPos], DefaultColor)
            ptr2++;
            absPos++;
        }

    }

    while(ptr1 <= mid-left){
        Numbers[left+absPos] = LeftArray[ptr1]
        ptr1++;
        absPos++;        
    }

    while(ptr2 <= right-(mid+1)){
        Numbers[left+absPos] = RightArray[ptr2]
        ptr2++;
        absPos++;       
    }
}

async function MergeSort(Numbers, left, right){
    if(right - left >= 1){
        var mid = Math.floor((left+right)/2)
        await MergeSort(Numbers, left, mid)
        await MergeSort(Numbers, mid+1, right)
        await Merge(Numbers, left, mid, right)
    }
}

function MergeSortDriver(Numbers){
    MergeSort(Numbers, 0, Numbers.length-1)
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
            MergeSortDriver(ArrayElements)
        }
        else if( SortingChoice == "Heap" ){
            console.log(SortingChoice)
        }
        else if( SortingChoice == "Quick" ){
            console.log(SortingChoice)
        }
    }
}
