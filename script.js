class graphNode {

    name;
    adjacencyList=new Array();
    highlighted=false;
    position=new Array();
  
    constructor(name,position) {
      this.name = name;
      this.position=position;
      
    }
  
    
  }
  


const panel=document.getElementById('main');
let graphList=[];
let edgeList=[];
let counter=0;

panel.addEventListener('click',createCircle)

function createCircle(e){
    
        var xPosition = e.clientX - document.body.clientWidth*0.5;
        var yPosition = e.clientY;

if(checkOverLap(xPosition,yPosition)==true)return;

        let dummyNode=new graphNode(counter,[xPosition,yPosition])
    graphList.push(dummyNode);
    startingNode.setAttribute('max',graphList.length-1)
    finishingNode.setAttribute('max',graphList.length-1)


    const test=document.createElementNS("http://www.w3.org/2000/svg", "circle");

test.setAttribute('r','25')
test.setAttribute('fill','black')
test.setAttribute('cx',xPosition)
test.setAttribute('cy',yPosition)
test.setAttribute('id',counter)

const nodeNumber=document.createElementNS("http://www.w3.org/2000/svg","text");
nodeNumber.setAttribute('x',xPosition)
nodeNumber.setAttribute('y',yPosition+7)
nodeNumber.setAttribute('font-size',28)
nodeNumber.setAttribute('text-anchor','middle')
nodeNumber.setAttribute('fill','lime')
nodeNumber.textContent=counter;


test.addEventListener('click',function(){
    if(dummyNode.highlighted==true){
        test.setAttribute('stroke-width','0');
        dummyNode.highlighted=false;
                 }
       else {
        test.setAttribute('stroke','red');
        test.setAttribute('stroke-width','5')
        dummyNode.highlighted=true;
        for(let i=0;i<graphList.length;i++){
            if(graphList[i].name!=test.id&dummyNode.adjacencyList.indexOf(graphList[i])==-1){
            if(graphList[i].highlighted==true){
                const drawLine=document.createElementNS("http://www.w3.org/2000/svg", "line");
                drawLine.setAttribute('x1',xPosition)
                drawLine.setAttribute('x2',graphList[i].position[0])
                drawLine.setAttribute('y1',yPosition)
                drawLine.setAttribute('y2',graphList[i].position[1])
                drawLine.setAttribute('stroke','red');
                drawLine.setAttribute('stroke-dasharray','10 5');
                drawLine.setAttribute('stroke-width','3')
                if(Number(graphList[i].name)<Number(test.id))drawLine.setAttribute('name',graphList[i].name+''+test.id)
                else drawLine.setAttribute('name',test.id+''+graphList[i].name)
                edgeList.push(drawLine); 

                
                panel.appendChild(drawLine)

                dummyNode.adjacencyList.push(graphList[i]);
                graphList[i].adjacencyList.push(dummyNode);

                dummyNode.highlighted=false;
                graphList[i].highlighted=false;
                test.setAttribute('stroke-width','0');
                document.getElementById(graphList[i].name).setAttribute('stroke-width','0')

                break;
            }
        }
    }
           }
})


panel.appendChild(test);
panel.appendChild(nodeNumber);
counter++;
}
let start;
let finish;
const startingNode=document.getElementById('start');
startingNode.setAttribute('min','0')

startingNode.addEventListener('input', function(){
    for (const node of graphList) {
        if(document.getElementById(node.name).getAttribute('stroke')=='lime')document.getElementById(node.name).setAttribute('stroke-width','0')
    }
    start=document.getElementById(startingNode.value)
    start.setAttribute('stroke','lime');
    start.setAttribute('stroke-width','5')

})

const finishingNode=document.getElementById('finish');
finishingNode.setAttribute('min','0')

finishingNode.addEventListener('input', function(){
    for (const node of graphList) {
if(document.getElementById(node.name).getAttribute('stroke')=='blue')document.getElementById(node.name).setAttribute('stroke-width','0')
    }
    finish=document.getElementById(finishingNode.value)
    finish.setAttribute('stroke','blue');
    finish.setAttribute('stroke-width','5')

})

function checkOverLap(xPosition,yPosition){
    for(let i=0;i<graphList.length;i++){
        if(xPosition-30<graphList[i].position[0]+30&&xPosition+30>graphList[i].position[0]-30){
            if(yPosition-30<graphList[i].position[1]+30&&yPosition+30>graphList[i].position[1]-30){
    return true;
        }
    }
    }
return false;
}
//start and finish are the circles
//origin and goal are the nodes



const dfs=document.getElementById('DFS');
dfs.addEventListener('click',function(){depthFS()});


let foundMessage=document.createElement('p');

function depthFS(){
let visited=new Array();
let active=new Array();
let origin=graphList[start.getAttribute('id')];
let goal=graphList[finish.getAttribute('id')];
visited.push(origin);
active.push(origin);

while(active.length>0){
let cur=active[active.length-1];    console.log(cur.name)
if (cur.adjacencyList.length==0) break;
if(cur===goal){
    finish.setAttribute('stroke','lime');
    let positionString='';
    for(let i=0;i<active.length;i++){
        if(i+1<active.length){
        for(edge of edgeList){
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
positionString+=active[i].name;
if(i!=active.length-1)positionString+=', '
    }
foundMessage.textContent='A path has been found from node '+origin.name+' to node '+goal.name+'. ('+positionString+')';
document.querySelector('#controls').appendChild(foundMessage);
return;
}

for(let i=0;i<cur.adjacencyList.length;i++){
    let neighbor=cur.adjacencyList[i];
    console.log("for "+neighbor.name)
    if(visited.indexOf(neighbor)==-1){
        visited.push(neighbor);
        active.push(neighbor);
        for(edge of edgeList){
            console.log(edge.getAttribute('name'))
    if(Number(cur.name)<Number(neighbor.name)){
            if(edge.getAttribute('name')==cur.name+''+neighbor.name){
                console.log(' worked'+edge.getAttribute('name'))

            edge.setAttribute('stroke','lime')
            edge.setAttribute('stroke-dasharray','0') 
            break;
        }
    }
    else {
        if(edge.getAttribute('name')==neighbor.name+''+cur.name){
            console.log(' worked'+edge.getAttribute('name'))

            edge.setAttribute('stroke','lime')
            edge.setAttribute('stroke-dasharray','0') 
            break;
        }
    }
    }
        break;
    }
    else if(i==cur.adjacencyList.length-1)active.pop();
}
}
foundMessage.textContent='No path has been found from node '+origin.name+' to node '+goal.name;
document.querySelector('#controls').appendChild(foundMessage);
}




const bfs=document.getElementById('BFS');
bfs.addEventListener('click',function(){breadthFS()});


function breadthFS(){
let visited=new Array();
let active=new Array();
let pathMap=new Map;
let origin=graphList[start.getAttribute('id')];
let goal=graphList[finish.getAttribute('id')];
visited.push(origin);
active.push(origin);

while(active.length>0){
let cur=active.shift();    console.log(cur.name)

if(cur===goal){
    finish.setAttribute('stroke','lime');
    let positionArray=new Array();
    let path=cur;
    positionArray.push(path.name);
    while(true){
        for(edge of edgeList){
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
    positionArray.unshift(pathMap.get(path).name);
if(pathMap.get(path).name==origin.name)break;
path=pathMap.get(path);
    }
foundMessage.textContent='A path has been found from node '+origin.name+' to node '+goal.name+'. ('+positionArray.join()+')';
document.querySelector('#controls').appendChild(foundMessage);
return;
}

for(let i=0;i<cur.adjacencyList.length;i++){
    let neighbor=cur.adjacencyList[i];
    console.log("for "+neighbor.name)
    if(visited.indexOf(neighbor)==-1){
        pathMap.set(neighbor,cur)
        visited.push(neighbor);
        active.push(neighbor);
        for(edge of edgeList){
            console.log(edge.getAttribute('name'))
            if(Number(cur.name)<Number(neighbor.name)){
            if(edge.getAttribute('name')==cur.name+''+neighbor.name){
                console.log(' worked'+edge.getAttribute('name'))

            edge.setAttribute('stroke','lime')
            edge.setAttribute('stroke-dasharray','0') 
            break;
        }
            }
            else{
                if(edge.getAttribute('name')==neighbor.name+''+cur.name){
                    console.log(' worked'+edge.getAttribute('name'))

                    edge.setAttribute('stroke','lime')
                    edge.setAttribute('stroke-dasharray','0') 
                    break;
                }
            }
    }
    }
}
}
foundMessage.textContent='No path has been found from node '+origin.name+' to node '+goal.name;
document.querySelector('#controls').appendChild(foundMessage);
}

const resetPage=document.getElementById('reset');
resetPage.addEventListener('click',function(){
    while(panel.firstChild!=null){
        panel.removeChild(panel.firstChild);
    }
    graphList=[];
    edgeList=[];
    console.log(graphList)
    counter=0;
    foundMessage.remove();
});

const resetGraph=document.getElementById('resetGraph');
resetGraph.addEventListener('click',function(){
    foundMessage.remove();
    finish.setAttribute('stroke','blue');
    for(edge of edgeList){
        edge.setAttribute('stroke','red')
        edge.setAttribute('stroke-dasharray','10 5') 
            }
        });