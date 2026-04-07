document.addEventListener("DOMContentLoaded",()=>{

const board=document.getElementById("board")
const restartBtn=document.getElementById("restartBtn")
const timerText=document.getElementById("timer")
const cellColor=document.getElementById("cellColor")

let cells=[]
let currentPlayer=0
let gameActive=true
let time=180

const themes={
classic:["❌","⭕"],
animals:["🐱","🐶"],
stars:["⭐","🔥"]
}

function createBoard(){

board.innerHTML=""
cells=[]

for(let i=0;i<9;i++){

let cell=document.createElement("div")
cell.classList.add("cell")

if(i%2===0){
cell.classList.add("light")
}else{
cell.classList.add("dark")
}

cell.addEventListener("click",playMove)

board.appendChild(cell)
cells.push(cell)

}

}

function playMove(e){

if(!gameActive) return

let cell=e.target

if(cell.textContent!=="") return

let theme=document.getElementById("theme").value

cell.textContent=themes[theme][currentPlayer]

checkWinner()

currentPlayer=currentPlayer===0?1:0

}

function checkWinner(){

const combos=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

for(let combo of combos){

let a=cells[combo[0]].textContent
let b=cells[combo[1]].textContent
let c=cells[combo[2]].textContent

if(a!=="" && a===b && b===c){

let color=document.getElementById("winColor").value

cells[combo[0]].style.background=color
cells[combo[1]].style.background=color
cells[combo[2]].style.background=color

gameActive=false

setTimeout(()=>{
alert("Tenemos un ganador")
},100)

return
}

}

}

restartBtn.addEventListener("click",()=>{
currentPlayer=0
gameActive=true
time=180
createBoard()
})

cellColor.addEventListener("input",()=>{

let color=cellColor.value

document.querySelectorAll(".light").forEach(c=>{
c.style.background=color
})

})

createBoard()

setInterval(()=>{

if(!gameActive) return

time--

timerText.textContent="Tiempo: "+time

if(time<=0){

gameActive=false

alert("Tiempo terminado. Juego bloqueado.")

}

},1000)

})