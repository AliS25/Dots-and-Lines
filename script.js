class graphNode {

    name;
    adjacencyList;
    highlighted=false;
    position=new Array();
  
    constructor(name,position) {
      this.name = name;
      this.position=position;
    }
  
    
  }
  


const panel=document.getElementById('main');
const body=document.body;
const graphList=[];
let counter=0;

panel.addEventListener('click',createCircle)

function createCircle(e){
        var xPosition = e.clientX;
        var yPosition = e.clientY;

if(checkOverLap(xPosition,yPosition)==true)return;

        let dummyNode=new graphNode('node'+counter,[xPosition,yPosition])
    graphList.push(dummyNode);
    const test=document.createElementNS("http://www.w3.org/2000/svg", "circle");

test.setAttribute('r','25')
test.setAttribute('fill','black')
test.setAttribute('cx',xPosition)
test.setAttribute('cy',yPosition)


test.addEventListener('click',function(){
    if(test.getAttribute('stroke-width')==5){
        test.setAttribute('stroke-width','0');
                 }
       else {
        test.setAttribute('stroke','red');
        test.setAttribute('stroke-width','5')
           }
})


panel.appendChild(test);
counter++;
}


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