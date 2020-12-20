import { Person } from "./person.js";

const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const ctx = canvas.getContext('2d');

const button = document.querySelector('#activator');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

const counter = document.querySelector('#counter');


const slider = document.getElementById("myRange");
let fps = 50;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  fps = this.value;
}

// Generate array of people


const generatePeople = function (){
    const people = [];
    for(let i = 0; i < 3000; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let particle = new Person(x, y, 'uninfected', ctx, canvas);
        people.push(particle);
    }
    return people;
}
let people = generatePeople()
let animation;


// Draw particles for every person in array of people
let chance;
let numbers = [];
function update() {
    setTimeout(function(){ //throttle requestAnimationFrame to 50fps
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        for(let index = 0; index < people.length; index++) {
            chance = Math.floor(Math.random() * 200000);
            if(numbers.includes(chance)) {
            people[index].state = 'infected';
            numbers.push(Math.floor(Math.random() * 1900000));
            }
            people[index].animate();
        }

        animation = requestAnimationFrame(update);
        if(clicked){
            let infected = people.filter((p) => p.state == "infected")
            counter.innerText = `Infected: ${infected.length}`;
        }
        
    }, 1000/fps)
    
}


button.addEventListener('click', () => {
    update()
    counter.style.visibility = "visible";
    canvas.addEventListener('click', () => {
        clicked = true;
        people[1000].state="infected";
        numbers.push(1);

        
    })
})

stop.addEventListener('click', () => {
    cancelAnimationFrame(animation);
    console.log(people);
})

reset.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    numbers = [];
    people = generatePeople();
    counter.innerText = `Infected: 0`;
})
let clicked;


