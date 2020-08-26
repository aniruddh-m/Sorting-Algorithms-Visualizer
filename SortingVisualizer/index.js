var InsertArrayClicked = false;
var ArrayElements = [];

function BubbleSort(Numbers){
    for(var i=0; i<Numbers.length; i++){
        for(var j=0; j<Numbers.length-i-1; j++){
            if( Numbers[j] > Numbers[j+1] ){
                var temp;
                temp = Numbers[j]
                Numbers[j] = Numbers[j+1]
                Numbers[j+1] = temp
            }
        }
    }
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
                ArrayElements.push(Numbers[i])
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