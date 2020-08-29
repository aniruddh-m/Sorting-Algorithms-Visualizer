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
    var tempH = Bar2.style.height
    var tempBC = Bar2.style.backgroundColor
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

function sleep(time){
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

function SetSubmitButtonDisabledState(state){
    InputSubmitButton = document.getElementById('InputSubmitButton')
    InputSubmitButton.disabled = state
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
    SetSubmitButtonDisabledState(false)
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
    SetSubmitButtonDisabledState(false)
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
    SetSubmitButtonDisabledState(false)
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
        SetBarsColor([left+absPos], HighlightColor)
        SetBarsColor([mid+1+ptr2], TraverseColor)
        await sleep(mediumSpeed)
        if(LeftArray[ptr1] <= RightArray[ptr2]){
            Numbers[left+absPos] = LeftArray[ptr1]
            SetBarsColor([left+absPos, mid+1+ptr2], DefaultColor)
            ptr1++;
            absPos++;
        }
        else{
            Numbers[left+absPos] = RightArray[ptr2]
            InsertElementInSpecifiedPosition(mid+1+ptr2, left+absPos)
            await sleep(mediumSpeed)
            SetBarsColor([mid+1+ptr2, left+absPos, left+absPos+1], DefaultColor)
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

async function MergeSortDriver(Numbers){
    await MergeSort(Numbers, 0, Numbers.length-1)
    var RangeArray;
    RangeArray = range(0, Numbers.length)
    SetBarsColor(RangeArray, CompletedColor)
    SetSubmitButtonDisabledState(false)
}

async function QuickSortPartition(Numbers, left, right, PartitionIndex){
    var i = left - 1
    var pivot = Numbers[right]
    SetBarsColor([right], HighlightColor)
    for(var j=left; j < right; j++){
        SetBarsColor([i+1, j], TraverseColor)
        await sleep(slowSpeed)
        if(Numbers[j] < pivot){
            i++
            Swapbars(j, i)
            SwapNumbers(Numbers, j, i)
            await sleep(slowSpeed)
            SetBarsColor([i, j], DefaultColor)
        }
        else{
            SetBarsColor([i+1, j], DefaultColor)
        }
    }
    SwapNumbers(Numbers, right, i+1)
    Swapbars(right, i+1)
    await sleep(slowSpeed)
    PartitionIndex[0] = i+1
}

async function QuickSort(Numbers, left, right){
    if(left < right){
        var PartitionIndex = [-1]
        await QuickSortPartition(Numbers, left, right, PartitionIndex)
        SetBarsColor([PartitionIndex[0]], CompletedColor)
        await QuickSort(Numbers, left, PartitionIndex[0]-1)
        await QuickSort(Numbers, PartitionIndex[0]+1, right)
    }
}

async function QuickSortDriver(Numbers){
    await QuickSort(Numbers, 0, Numbers.length-1)
    SetSubmitButtonDisabledState(false)
    RangeArray = range(0, Numbers.length)
    SetBarsColor(RangeArray, CompletedColor)
}

async function Max_Heapify(Numbers, i, n){
    var largestNodeIndex = i
    var left = 2*i + 1, right = 2*i + 2

    SetBarsColor([i], TraverseColor)
    if(left < n){
        SetBarsColor([left], TraverseColor)
    }
    if(right < n){
        SetBarsColor([right], TraverseColor)
    }
    await sleep(slowSpeed)

    if(left < n && Numbers[largestNodeIndex] < Numbers[left]){
        largestNodeIndex = left
    }
    if(right < n && Numbers[largestNodeIndex] < Numbers[right]){
        largestNodeIndex = right
    }

    SetBarsColor([largestNodeIndex], HighlightColor)
    await sleep(slowSpeed)
  
    SetBarsColor([i], DefaultColor)
    if(left < n){
        SetBarsColor([left], DefaultColor)
    }
    if(right < n){
        SetBarsColor([right], DefaultColor)
    }

    if(largestNodeIndex != i){
        SetBarsColor([largestNodeIndex], HighlightColor)
        SwapNumbers(Numbers, largestNodeIndex, i)
        Swapbars(largestNodeIndex, i)
        await sleep(slowSpeed)
        SetBarsColor([i], DefaultColor)
        await Max_Heapify(Numbers, largestNodeIndex, n)
    }
}

async function BuildMaxHeap(Numbers){
    for(var i=Math.floor(Numbers.length/2)-1; i>=0; i--){
        await Max_Heapify(Numbers, i, Numbers.length)
    }
}

async function HeapSort(Numbers){
    await BuildMaxHeap(Numbers)

    for(var i=Numbers.length-1; i>=0; i--){
        SwapNumbers(Numbers, i, 0)
        Swapbars(i, 0)
        SetBarsColor([i], CompletedColor)
        await sleep(mediumSpeed)
        await Max_Heapify(Numbers, 0, i)
    }
}

async function HeapSortDriver(Numbers){
    await HeapSort(Numbers)
    SetBarsColor([0], CompletedColor)
    SetSubmitButtonDisabledState(false)
}

function OnClickInsertAnArray(){
    if(!InsertArrayClicked){
        InsertArrayClicked = true;
        var InputArea = document.getElementById("InputArea");
        InputArea.innerHTML = '\
        <div class="row" style="padding-top: 10px;padding-left: 10px">\
            <div style="padding-left: 4px; padding-right: 2px" class="col-md-12">\
                <textarea style="width: 600px;" id="InputTextArea" placeholder="Input space separated numbers here"></textarea>\
            </div>\
            <button onclick="OnClickInputSubmitButton()" id="InputSubmitButton" type = "button" class="btn" style="background-color: #008CBA; color: white;">Submit</button>\
        </div>'
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
        SetSubmitButtonDisabledState(true)
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
        else if( SortingChoice == "Quick" ){
            QuickSortDriver(ArrayElements)
        }
        else if( SortingChoice == "Heap" ){
            HeapSortDriver(ArrayElements)
        }
    }
}
