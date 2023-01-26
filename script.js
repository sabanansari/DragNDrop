// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];
listArrays = [backlogListArray,progressListArray,completeListArray,onHoldListArray];
    const arrayNames = ['backlog','progress','complete','onHold'];

// Set localStorage Arrays
function updateSavedColumns(){
    
    arrayNames.forEach((arrayName,index)=>{
        localStorage.setItem(`${arrayName}Items`,JSON.stringify(listArrays[index]));
    });
}

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns(){
    arrayNames.forEach((arrayName,index)=>{
        if(localStorage.getItem(`${arrayName}Items`)){
            listArrays[index] = JSON.parse(localStorage.getItem(`${arrayName}Items`));
        }else{
            listArrays[index] = ['Get some sleep'];
        }
    }); 
}

getSavedColumns();
updateSavedColumns();