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
const graphList=[];
let counter=0;

panel.addEventListener('click',createCircle)

function createCircle(e){
        var xPosition = e.clientX - document.body.clientWidth*0.5;
        var yPosition = e.clientY;

if(checkOverLap(xPosition,yPosition)==true)return;

        let dummyNode=new graphNode(counter,[xPosition,yPosition])
    graphList.push(dummyNode);
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
    if(test.getAttribute('stroke-width')==5){
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
                drawLine.setAttribute('stroke-width','3')

                
                panel.appendChild(drawLine)

                dummyNode.adjacencyList.push(graphList[i]);
                graphList[i].adjacencyList.push(dummyNode);
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