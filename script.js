// Ali Sbeih - 7/12/22 - Lines and Dots Project



// A class for the nodes
class graphNode {
// Nodes have the following properties
    name;
    adjacencyList=new Array();
    highlighted=false;
    position=new Array();
//   A node constructor that initializes its name and position
    constructor(name,position) {
      this.name = name;
      this.position=position; 
    }
  }
  

// Panel representing the graph drawing area
const panel=document.getElementById('main');
// An array of the nodes
let graphList=[];
// An array of the edges
let edgeList=[];
// A counter used for naming
let counter=0;

// Add an event listener that listens for a click and calls the following function 
panel.addEventListener('click',createCircle)

// -------------------------------------------------------------------CREATE CIRCLE FUNCTION-----------------------------------------------------------------------------
function createCircle(e){
    // Get the x and y values of the click
        var xPosition = e.clientX - document.body.clientWidth*0.5;
        var yPosition = e.clientY;
//If the new click overlaps with a previous click don't do anything
if(checkOverLap(xPosition,yPosition)==true)return;

// Create a new graph node
        let dummyNode=new graphNode(counter,[xPosition,yPosition])
        // Add it to the nodes array
    graphList.push(dummyNode);
    // Make the maximum input for the starting and finishing nodes equal to the number of nodes
    startingNode.setAttribute('max',graphList.length-1)
    finishingNode.setAttribute('max',graphList.length-1)

// Create an svg cicle element that corresponds to the above node
    const nodeCircle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
// Give it a radius, color, position, and an id
    nodeCircle.setAttribute('r','25')
    nodeCircle.setAttribute('fill','black')
    nodeCircle.setAttribute('cx',xPosition)
nodeCircle.setAttribute('cy',yPosition)
nodeCircle.setAttribute('id',counter)
// Create an svg text element that corresponds to the circle above
const nodeNumber=document.createElementNS("http://www.w3.org/2000/svg","text");
// Give it a position, font size, placement, color, and text content
nodeNumber.setAttribute('x',xPosition)
nodeNumber.setAttribute('y',yPosition+7)
nodeNumber.setAttribute('font-size',28)
nodeNumber.setAttribute('text-anchor','middle')
nodeNumber.setAttribute('fill','lime')
nodeNumber.textContent=counter;

//Add an event listener that listens for a click and calls the following function
nodeCircle.addEventListener('click',function(){
    //If the node was originally highlighted, un-highlight it
    if(dummyNode.highlighted==true){
        nodeCircle.setAttribute('stroke-width','0');
        dummyNode.highlighted=false;
                 }
        //Otherwise, highlight it
       else {
        nodeCircle.setAttribute('stroke','red');
        nodeCircle.setAttribute('stroke-width','5')
        dummyNode.highlighted=true;
        //Iterate throgh all the other nodes
        for(let i=0;i<graphList.length;i++){
            //Check that the node is not the same as the current on and that it not a neighbor of the current one
            if(graphList[i].name!=nodeCircle.id&dummyNode.adjacencyList.indexOf(graphList[i])==-1){
                //Check that the node is highlighted
            if(graphList[i].highlighted==true){
                //Create an svg line element 
                const drawLine=document.createElementNS("http://www.w3.org/2000/svg", "line");
                //Give it the two centers of the nodes to create an edge between them. Give the line a stroke color, type, and width
                drawLine.setAttribute('x1',xPosition)
                drawLine.setAttribute('x2',graphList[i].position[0])
                drawLine.setAttribute('y1',yPosition)
                drawLine.setAttribute('y2',graphList[i].position[1])
                drawLine.setAttribute('stroke','red');
                drawLine.setAttribute('stroke-dasharray','10 5');
                drawLine.setAttribute('stroke-width','3')
                //Name the edge as a combination of the names of the two nodes, which are numbers. Name it starting with the smaller number
                if(Number(graphList[i].name)<Number(nodeCircle.id))drawLine.setAttribute('name',graphList[i].name+''+nodeCircle.id)
                else drawLine.setAttribute('name',nodeCircle.id+''+graphList[i].name)
                //Add the edge to the edge list
                edgeList.push(drawLine); 

                //Add the line to the panel
                document.querySelector('.edges').appendChild(drawLine)
// Add the nodes to each other's adjacency lists
                dummyNode.adjacencyList.push(graphList[i]);
                graphList[i].adjacencyList.push(dummyNode);
// Un-highlight both nodes
                dummyNode.highlighted=false;
                graphList[i].highlighted=false;
                nodeCircle.setAttribute('stroke-width','0');
                document.getElementById(graphList[i].name).setAttribute('stroke-width','0')

                break;
            }
        }
    }
           }
})

// Add the circle and the number to the panel
panel.appendChild(nodeCircle);
panel.appendChild(nodeNumber);
// increment the counter
counter++;
}
//start and finish variables that will represent the starting circle and target circle
let start;
let finish;

// -------------------------------------------------------------------START NODE-----------------------------------------------------------------------------------------
//startingNode represents the input that determines the starting node
const startingNode=document.getElementById('start');
//give it a minimum attribute
startingNode.setAttribute('min','0')
//Add an event listener that listens for input and calls the following function
startingNode.addEventListener('input', function(){
    //iterate through all the nodes
    for (const node of graphList) {
        //turn the previous starting circle green highlight off
        if(document.getElementById(node.name).getAttribute('stroke')=='lime')document.getElementById(node.name).setAttribute('stroke-width','0')
    }
    //make start refer to the starting circle 
    start=document.getElementById(startingNode.value)
    //give it a stroke and stroke-width attributes
    start.setAttribute('stroke','lime');
    start.setAttribute('stroke-width','5')

})

// -------------------------------------------------------------------FINISH NODE---------------------------------------------------------------------------------------
//finishingNode represents the input that determines the target node
const finishingNode=document.getElementById('finish');
//give it a minimum attribute
finishingNode.setAttribute('min','0')
//Add an event listener that listens for input and calls the following function
finishingNode.addEventListener('input', function(){
        //iterate through all the nodes
    for (const node of graphList) {
                //turn the previous finishing circle blue highlight off
if(document.getElementById(node.name).getAttribute('stroke')=='blue')document.getElementById(node.name).setAttribute('stroke-width','0')
    }
        //make finiish refer to the target circle 
    finish=document.getElementById(finishingNode.value)
        //give it a stroke and stroke-width attributes
    finish.setAttribute('stroke','blue');
    finish.setAttribute('stroke-width','5')

})

// -------------------------------------------------------------------OVERLAP FUNCTION----------------------------------------------------------------------------------
//Function that checks for overlap
function checkOverLap(xPosition,yPosition){
    //iterate through the graph list
    for(let i=0;i<graphList.length;i++){
        if(xPosition-30<graphList[i].position[0]+30&&xPosition+30>graphList[i].position[0]-30){
            if(yPosition-30<graphList[i].position[1]+30&&yPosition+30>graphList[i].position[1]-30){
    return true;
        }
    }
    }
return false;
}

// -------------------------------------------------------------------DFS BUTTON----------------------------------------------------------------------------------------
//dfs represents the DFS button
const dfs=document.getElementById('DFS');
//Add an event listener that listens to a click and calls the following function
dfs.addEventListener('click',function(){depthFS()});

//create a paragraph element that will display the result of the search
let foundMessage=document.createElement('p');

function depthFS(){
    //Create a visited and an active array
let visited=new Array();
let active=new Array();
//let origin refer to the starting node and goal to the target node
let origin=graphList[start.getAttribute('id')];
let goal=graphList[finish.getAttribute('id')];
//Add the origin to the two lists
visited.push(origin);
active.push(origin);

while(active.length>0){
    //Make cur the last item in the list
let cur=active[active.length-1]; 

//if it is the goal
if(cur===goal){
    //give it a stroke attribute
    finish.setAttribute('stroke','lime');
    //Create a string that will hold the path found
    let positionString='';
    //iterate through the active list
    for(let i=0;i<active.length;i++){
        if(i+1<active.length){
            //iterate through the edge list
        for(edge of edgeList){
            //Find the correct edge by combining names(which are numbers) in increasing order and give the edge a stroke attribute
            if(Number(active[i].name)<Number(active[i+1].name)){
            if(edge.getAttribute('name')==active[i].name+''+active[i+1].name){
            edge.setAttribute('stroke','blue')
            break;
        }
    }
    else {
        if(edge.getAttribute('name')==active[i+1].name+''+active[i].name){
        edge.setAttribute('stroke','blue')
        break;
    }
}
    }
}
//Add to the string the name of the active item
positionString+=active[i].name;
//Add a comma if it's not the last element
if(i!=active.length-1)positionString+=', '
    }
    //Display the found message
foundMessage.textContent='A path has been found from node '+origin.name+' to node '+goal.name+'. ('+positionString+')';
//Add it to the controls section
document.querySelector('#controls').appendChild(foundMessage);
return;
}
//iterate through cur's adjacency list
for(let i=0;i<cur.adjacencyList.length;i++){
    //make neighbor equal to the adjacency list item
    let neighbor=cur.adjacencyList[i];
    //if it is not visited
    if(visited.indexOf(neighbor)==-1){
        //add it to the two arrays
        visited.push(neighbor);
        active.push(neighbor);
        //iterate through the edge list
        for(edge of edgeList){
            //Based on the correct name of the edge, find it and give it a stroke and stroke-dasharray attributes
    if(Number(cur.name)<Number(neighbor.name)){
            if(edge.getAttribute('name')==cur.name+''+neighbor.name){
            edge.setAttribute('stroke','lime')
            edge.setAttribute('stroke-dasharray','0') 
            break;
        }
    }
    else {
        if(edge.getAttribute('name')==neighbor.name+''+cur.name){
            edge.setAttribute('stroke','lime')
            edge.setAttribute('stroke-dasharray','0') 
            break;
        }
    }
    }
        break;
    }
    //if all neighbors have been visited remove the node from the active list
    else if(i==cur.adjacencyList.length-1)active.pop();
}
//if it has no neighbors then end the loop   
if (cur.adjacencyList.length==0) break;
}
//no path has been found message
foundMessage.textContent='No path has been found from node '+origin.name+' to node '+goal.name;
//Add the message to the controls section
document.querySelector('#controls').appendChild(foundMessage);
}



// -------------------------------------------------------------------BFS BUTTON----------------------------------------------------------------------------------------
//bfs represents the BFS button
const bfs=document.getElementById('BFS');
//Add an event listener that listens to a click and calls the following function
bfs.addEventListener('click',function(){breadthFS()});


function breadthFS(){
        //Create a visited and an active array and a map
let visited=new Array();
let active=new Array();
let pathMap=new Map;
//let origin refer to the starting node and goal to the target node
let origin=graphList[start.getAttribute('id')];
let goal=graphList[finish.getAttribute('id')];
//Add the origin to the two lists
visited.push(origin);
active.push(origin);

while(active.length>0){
    //Make cur the removed first item in the list
let cur=active.shift();   

//if it is the goal
if(cur===goal){
        //give it a stroke attribute
finish.setAttribute('stroke','lime');
        //Create an array that will hold the path found
let positionArray=new Array();
//make the variable path equal to the current node
    let path=cur;
    //add the node's name to the position array
    positionArray.push(path.name);
    while(true){
        //if it has no neighbors then end the loop   
        if(cur.adjacencyList.length==0)break;
    //iterate through the edge list
        for(edge of edgeList){
    //Find the correct edge by combining names(which are numbers) in increasing order and give the edge a stroke attribute
            if(Number(path.name)<Number(pathMap.get(path).name)){

            if(edge.getAttribute('name')==path.name+''+pathMap.get(path).name){
            edge.setAttribute('stroke','blue')
            break;
        }
    }
        else{
            if(edge.getAttribute('name')==pathMap.get(path).name+''+path.name){
                edge.setAttribute('stroke','blue')
                break;
            }
    }
    }
    //Add to the position array the name of the active item at the start
    positionArray.unshift(pathMap.get(path).name);
    //stop the loop once the path is completed from the origin to the goal
if(pathMap.get(path).name==origin.name)break;
//Make the path variable equal to its parent
path=pathMap.get(path);
    }
        //Display the found message
foundMessage.textContent='A path has been found from node '+origin.name+' to node '+goal.name+'. ('+positionArray.join()+')';
//Add it to the controls section
document.querySelector('#controls').appendChild(foundMessage);
return;
}

//iterate through cur's adjacency list
for(let i=0;i<cur.adjacencyList.length;i++){
        //make neighbor equal to the adjacency list item
let neighbor=cur.adjacencyList[i];
        //if it is not visited
if(visited.indexOf(neighbor)==-1){
                //add it to the two arrays and make it the key to its parent value
    pathMap.set(neighbor,cur)
        visited.push(neighbor);
        active.push(neighbor);
                //iterate through the edge list
        for(edge of edgeList){
      //Based on the correct name of the edge, find it and give it a stroke and stroke-dasharray attributes
            if(Number(cur.name)<Number(neighbor.name)){
            if(edge.getAttribute('name')==cur.name+''+neighbor.name){
            edge.setAttribute('stroke','lime')
            edge.setAttribute('stroke-dasharray','0') 
            break;
        }
            }
            else{
                if(edge.getAttribute('name')==neighbor.name+''+cur.name){
                    edge.setAttribute('stroke','lime')
                    edge.setAttribute('stroke-dasharray','0') 
                    break;
                }
            }
    }
    }
}
}
//no path has been found message
foundMessage.textContent='No path has been found from node '+origin.name+' to node '+goal.name;
//Add the message to the controls section
document.querySelector('#controls').appendChild(foundMessage);
}

// -------------------------------------------------------------------RESET Panel BUTTON--------------------------------------------------------------------------------
//The variable resetPage refers to the reset button
const resetPage=document.getElementById('reset');
//Add an event listener that listens for a  click and calls the following function
resetPage.addEventListener('click',function(){
    //remove all the elements inside the panel
    while(panel.firstChild!=null){
        panel.removeChild(panel.firstChild);
    }
    //empty the graph list
    graphList=[];
    //empty the edge list
    edgeList=[];
    //reset the counter
    counter=0;
    //remove the foundMessage
    foundMessage.remove();
    //Add the g element as the first element in svg which will contain the edges 
    let edgegroup=document.createElementNS("http://www.w3.org/2000/svg","g")
    edgegroup.setAttribute("class","edges")
    document.querySelector('svg').appendChild(edgegroup)
});
// -------------------------------------------------------------------RESET GRAPH BUTTON--------------------------------------------------------------------------------
//The variable resetGraph refers to the reset graph button
const resetGraph=document.getElementById('resetGraph');
//Add an event listener that listens for a  click and calls the following function
resetGraph.addEventListener('click',function(){
        //remove the foundMessage
foundMessage.remove();
//Give the finish circle a stroke attribute
    finish.setAttribute('stroke','blue');
    //iterate through the edge list
    for(edge of edgeList){
        //give all edges same initial stroke and stroke-dasharray properties
        edge.setAttribute('stroke','red')
        edge.setAttribute('stroke-dasharray','10 5') 
            }
        });