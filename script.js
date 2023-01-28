// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];
listArrays = [backlogListArray,progressListArray,completeListArray,onHoldListArray];
    const arrayNames = ['backlog','progress','complete','onHold'];

// Drag Functionality
let draggedItem;
let currentColumn;

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
            listArrays[index].push(JSON.parse(localStorage.getItem(`${arrayName}Items`)));
        }else{
            listArrays[index] = ['Get some sleep'];
        }
    }); 
}

// Create DOM Elements for each list item
function createItemEl(columnEl,column,item,index){
    // List Item
    const listEl = document.createElement('li');
    listEl.classList.add('drag-item');
    listEl.textContent = item;
    listEl.draggable = true;
    listEl.setAttribute('ondragstart','drag(event)');
    //Append
    columnEl.appendChild(listEl);
}

function updateDOM(){
    // Check localStorage once
    if(!updatedOnLoad){
        getSavedColumns();
    }
    // Backlog Column
    backlogList.textContent = '';
    backlogListArray.forEach((backlogItem,index)=>{
        createItemEl(backlogList,0,backlogItem,index);
    });

    // Progress Column
    progressList.textContent = '';
    progressListArray.forEach((progressItem,index)=>{
        createItemEl(progressList,1,progressItem,index);
    });

    // Complete Column
    completeList.textContent = '';
    completeListArray.forEach((completeItem,index)=>{
        createItemEl(completeList,2,completeItem,index);
    });
    
    // OnHold Column
    onHoldList.textContent = '';
    onHoldListArray.forEach((onHoldItem,index)=>{
        createItemEl(onHoldList,3,onHoldItem,index);
    });
}

// When Item Starts Dragging
function drag(e){
    draggedItem = e.target;
}

// Column Allows for Item to Drop
function allowDrop(e){
    e.preventDefault();
}

// When Items Enter Column Area
function dragEnter(column){
    itemLists[column].classList.add('over');
    currentColumn = column;
}

// Dropping Item in Column
function drop(e){
    e.preventDefault();
    // Remove Background Color/Padding
    itemLists.forEach((column)=>{
        column.classList.remove('over');
    });
    // Add Item to Column
    const parent = itemLists[currentColumn];
    parent.appendChild(draggedItem);
}



// On Load
updateDOM();