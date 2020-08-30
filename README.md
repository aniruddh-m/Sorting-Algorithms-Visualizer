https://aniruddh-m.github.io/Sorting-Algorithms-Visualizer/.

Input:
    If the user wants to specify an array of their choice, they can do so by clicking on the "Insert an array" button on the top, which presents the users with a text box for them to enter their inputs. 
    The numbers entered by the user have be separated by space and negative numbers and numbers greater than 250 are not allowed. The total number of numbers that a user specifies in the text box can not be more than 60.

Sorting:

    1) Bubble Sort:
        -> GREEN bars represent numbers that are present in the correct position and don't have to be moved anymore
        -> The two BLUE bars represent the numbers that are compared while swapping
    
    2) Selection Sort:
        -> GREEN bars represent numbers that are present in the correct position and don't have to be moved anymore
        -> The PURPLE bar represent the number that traverses through the array searching for the maximum value 
        -> The BLUE bar indicates the maximum number that has been encountered by the PURPLE bar in an interation
    
    3) Insertion Sort:
        -> PURPLE bars indicate the sorted end of the array
        -> The BLUE bar represents the number that has to be placed in the correct postion in the sorted array
    
    4) Merge Sort:
        -> The BLUE bar represents the pointer that traverses through the left array and the PURPLE bar represents the pointer that traverse through the right array
    
    5) Quick Sort:
        -> GREEN bars represent numbers that are present in the correct position and don't have to be moved anymore
        -> The BLUE bar represents the number we use to partition the array
        -> The PURPLE bars represent the pointers used to swap the elements for making the partition
    
    6) Heap Sort:
        -> GREEN bars represent numbers that are present in the correct position and don't have to be moved anymore
        -> PURPLE bars indicate the node in considertion and its left and right children
        -> The BLUE bar indicates the maximum of the values at the three nodes
