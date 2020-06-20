showNotes();  
//if user add  a note add it to local storage
//event for add note button
let addBtn=document.getElementById('addBtn').addEventListener('click',function(event){

//get reference to text input
let addTxt=document.getElementById('addTxt');

//get reference to title input
let addTitle=document.getElementById('title');
  
  //get the item form local storgae
  let notes=localStorage.getItem('notes');
  if(notes==null){//if notes is empty
     notesArr=[]
  }
  else{//if notes is not empty
    notesArr=JSON.parse(notes);
  }
  
  //object for title and texts
  let myObj={
    title:addTitle.value,
    text:addTxt.value
  }
  
  //creating array of objects
  notesArr.push(myObj);
  
  //setting the items in local storage
  localStorage.setItem('notes',JSON.stringify(notesArr));
  
  //emptying the input field once added note
  addTxt.value='';
  
  //emptying the input field
  addTitle.value='';
  
  //calling the function to display the notes in UI
  showNotes();
})

//function for showing notes in UI
function showNotes(){
  //get item from local storage
  let notes=localStorage.getItem('notes');
  
  //condition if empty
  if(notes==null){
    notesArr=[];
  }else{
    notesArr=JSON.parse(notes);
  }
  
  //display UI
  let html='';
  notesArr.forEach(function(element,index){
    html+=`<div class="noteCard my-2 mx-2      card" style="width: 18rem;">
            
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id='${index}' onclick='deleteNote(this.id)' class="btn btn-primary">Delete Note</button>
            </div>
          </div>`
    
  })
  
  //get reference to notes id
  let notesElm=document.getElementById('notes');
  
  //condition for showing UI
  if(notesArr.length !=0){
    notesElm.innerHTML=html
  }else{
    notesElm.innerHTML=`Nothing to show.`
  }
}

//function for deletion
function deleteNote(index){
  //get item from local storage
  let notes=localStorage.getItem('notes');
  
  //condition if empty
  if(notes ==null){
    notesArr=[]
  } else {
    notesArr=JSON.parse(notes);
    }
    
    //splicing the note
    notesArr.splice(index,1);
    
    //setting back to local storage
    localStorage.setItem('notes',JSON.stringify(notesArr));
    
    showNotes();
  }
  
  //get reference to search input
 let search=document.getElementById('searchTxt');
 
 //adding an event to the search
   search.addEventListener('input',function(){
     
     //grabbing the value of the input search
   let inputVal=search.value.toLowerCase();
   
   //get reference to all classes that have noteCard as a classname
   let noteCards=document.querySelectorAll('.noteCard');
   
   //creating an array of the notes having noteCard as a class and looping through it
   Array.from(noteCards).forEach(function(element){
     
     //grabbing the innertext of paragraph tag 
     let cardTxt=element.getElementsByTagName('p')[0].innerText.toLowerCase();
     
     //condition for matching
     if(cardTxt.includes(inputVal)){
       element.style.display='block';
     }else{
       element.style.display='none';
     }
   })
 })