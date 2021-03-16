var results = document.getElementById('results')
var completed = document.getElementById('completed-tasks')
var taskInput = document.getElementById("new-task"); 
let addButton = document.getElementsByTagName("button")[0]; 
let count=201;
let flag = "none";
let flag1 = "none";
list = []
//display all tasks
function todo()
{
    if(flag === "none")
    {
    fetch('https://jsonplaceholder.typicode.com/todos')
  .then(/*function(data) {*/ (response)=>{
  //  console.log(data)
  // return data.json()})
   return response.json()})
  .then(function(data) {
      for(i=0; i<data.length;i++)
      {
        console.log("All tasks")
        results.style.display="block";
        flag="block";
        let listItem = document.createElement("li"); 
        listItem.innerHTML = `${data[i].id}&ensp; ${data[i].title} `;  
        results.appendChild(listItem);
      }
      if(list.length>0)
      {
        for(i=0;i<list.length;i++)
        {
        let listItem = document.createElement("li"); 
        listItem.innerHTML = `${list[i].Id}&ensp; ${list[i].title} `;  
        results.appendChild(listItem);
        }
      }
   })
  .catch(function(error){
    console.log(error)})
  }
  else
  {
    console.log("Closed all tasks")
    results.style.display="none";
    flag="none";
  }
}
//display only completed tasks
function complete()
{
    if(flag1 === "none")
    {
        
    fetch('https://jsonplaceholder.typicode.com/todos')
  .then(function(data) {
   console.log(data)
   return data.json()})
  .then(function(data) {
      for(i=0; i<data.length;i++)
      {
        console.log(data[i]);
        console.log("Completed tasks")
        completed.style.display="block";
        flag1="block";
        if( `${data[i].completed}` === "true")
        {
            
            let listItem = document.createElement("li"); 
            listItem.innerHTML = `${data[i].id}&ensp;  ${data[i].title}`;  
            completed.appendChild(listItem);
        }
      }
   })
  .catch(function(error){
    console.log(error)})
}
else
{
    console.log("Closed completed tasks")
    completed.style.display="none";
    flag1="none";
}
}
// add tasks
function addtodo()
{
    // JSON Object
fetch('https://jsonplaceholder.typicode.com/todos', {
	method: 'POST',
	body: JSON.stringify({
        "userId": 1,
        "Id": count++,
        "title": taskInput.value,
        "completed": false
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
  list.push(data);
	console.log(data);
}).catch(function (error) {
	console.warn('Something went wrong.', error);
});
document.getElementById('new-task').value=null;
}