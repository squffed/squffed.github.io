
class Vector2D {
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

class Orb {
    constructor(id, position, velocity, radius, colour) //position and velocity are Vector2D's, but are not forced due to lack of TypeScript
    {
        this.id = id;
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.colour = colour;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColour()
{
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function changeNumberOfOrbs(slider)
{
    document.getElementById('numberOfOrbsText').innerText = "number of orbs: " + slider.value;
    numberOfOrbs = slider.value;
    init(slider.value);
}

function changeInterval(slider)
{
    document.getElementById('intervalText').innerText = "interval: " + slider.value;
    interval = slider.value;
}

function changeShowIds(checkbox)
{
    if(checkbox.checked)
    {
        showIds = true;
    }
    else
    {
        showIds = false;
    }
}

function changeAllowCollisions(checkbox)
{
    if(checkbox.checked)
    {
        allowCollisions = true;
    }
    else
    {
        allowCollisions = false;
    }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var mousePos = null;

function getMouse(e)
{
    mousePos = getMousePos(canvas,e);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

window.addEventListener('mousemove', getMouse, false);

var orbs = [];
var numberOfOrbs = 10;
var interval = 10;
var showIds = false;
var allowCollisions = false;

function init(amount)
{
    orbs.length = 0;
    for (let index = 0; index < amount; index++) {
        let radius = getRandomInt(10,30);
        let x = getRandomInt(radius,canvas.width-radius);
        let y = getRandomInt(radius,canvas.height-radius);
        let dx = getRandomInt(-5,5);
        let dy = getRandomInt(-5,5);
        let colour = getRandomColour();
        let orb = new Orb(index+1,new Vector2D(x,y),new Vector2D(dx,dy),radius,colour);
        orbs.push(orb);   
    }
}

// x,y is the point to test
// cx, cy is circle center, and radius is circle radius
function pointInOrb(x, y, cx, cy, radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
}

function addOrRemoveOrb()
{
    var deletedAnyOrbs = false;
    orbs.forEach(orb => {
        if(pointInOrb(mousePos.x,mousePos.y,orb.position.x,orb.position.y,orb.radius)) //remove orb
        {
            orbs.splice(orb.id-1,1);
            numberOfOrbs--;
            document.getElementById('numberOfOrbsText').innerText = "number of orbs: " + numberOfOrbs;
            for (let index = 0; index < orbs.length; index++) {
                let innerOrb = orbs[index];
                innerOrb.id = index + 1;
            }
            deletedAnyOrbs = true;
        }
    });
    if(!deletedAnyOrbs) //add orb
    {
        let radius = getRandomInt(10,30);
        let x = getRandomInt(radius,canvas.width-radius);
        let y = getRandomInt(radius,canvas.height-radius);
        let dx = getRandomInt(-5,5);
        let dy = getRandomInt(-5,5);
        let colour = getRandomColour();
        let orb = new Orb(orbs.length+1,new Vector2D(mousePos.x,mousePos.y),new Vector2D(dx,dy),radius,colour);
        orbs.push(orb);  
        numberOfOrbs++;
        document.getElementById('numberOfOrbsText').innerText = "number of orbs: " + numberOfOrbs;
    }
}

function collideOrbs(orb1,orb2) { //http://www.java2s.com/example/javascript-book/multiple-balls-bouncing-and-colliding.html

    let dx = orb1.position.x - orb2.position.x;
    let dy = orb1.position.y - orb2.position.y;

    let collisionAngle = Math.atan2(dy, dx);

    let speed1 = Math.sqrt(orb1.velocity.x * orb1.velocity.x + orb1.velocity.y * orb1.velocity.y);
    let speed2 = Math.sqrt(orb2.velocity.x * orb2.velocity.x + orb2.velocity.y * orb2.velocity.y);

    let direction1 = Math.atan2(orb1.velocity.y, orb1.velocity.x);
    let direction2 = Math.atan2(orb2.velocity.y, orb2.velocity.x);

    let velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
    let velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
    let velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
    let velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
    
    let final_velocityx_1 = ((orb1.radius - orb2.radius) * velocityx_1 + (orb2.radius + orb2.radius) * velocityx_2)/(orb1.radius + orb2.radius);
    let final_velocityx_2 = ((orb1.radius + orb1.radius) * velocityx_1 + (orb2.radius - orb1.radius) * velocityx_2)/(orb1.radius + orb2.radius);

    let final_velocityy_1 = velocityy_1;
    let final_velocityy_2 = velocityy_2;

    orb1.velocity.x = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
    orb1.velocity.y = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
    orb2.velocity.x = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
    orb2.velocity.y = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;

    orb1.position.x = (orb1.position.x += orb1.velocity.x);
    orb1.position.y = (orb1.position.y += orb1.velocity.y);
    orb2.position.x = (orb2.position.x += orb2.velocity.x);
    orb2.position.y = (orb2.position.y += orb2.velocity.y);
}

function drawOrbs() {
    orbs.forEach(orb => {
        ctx.beginPath();
        ctx.arc(orb.position.x, orb.position.y, orb.radius, 0, Math.PI*2);
        ctx.fillStyle = orb.colour;
        ctx.fill();
        ctx.closePath();
    });
}

function drawIds() {
    orbs.forEach(orb => {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillText(orb.id, orb.position.x-orb.velocity.x-3, orb.position.y-orb.velocity.y+4);
        ctx.closePath();
    });
}

function orbPhysics()
{
    orbs.forEach(orb => {
        if(orb.position.x + orb.velocity.x > canvas.width-orb.radius || orb.position.x + orb.velocity.x < orb.radius) {
            orb.velocity.x = -orb.velocity.x;
        }
        if(orb.position.y + orb.velocity.y > canvas.height-orb.radius || orb.position.y + orb.velocity.y < orb.radius) {
            orb.velocity.y = -orb.velocity.y;
        }

        if(allowCollisions)
        {
            orbs.forEach(innerOrb => {
            if(orb.id != innerOrb.id)
            {
                let distanceX = orb.position.x - innerOrb.position.x;
                let distanceY = orb.position.y - innerOrb.position.y;
                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                let sumOfRadii = orb.radius + innerOrb.radius;
                let unitX = distanceX / distance;
                let unitY = distanceY / distance;
                if(distance <= sumOfRadii)
                {
                    //Colliding

                    //Resolve collision - sometimes bugs in bounds
                    //orb.position.x = innerOrb.position.x + (sumOfRadii + 1) * unitX;
                    //orb.position.y = innerOrb.position.y + (sumOfRadii + 1) * unitY;

                    //Do math
                    collideOrbs(orb,innerOrb);
                }
            }
        });
        }
        
        orb.position.x += orb.velocity.x;
        orb.position.y += orb.velocity.y;
    });
    setTimeout(draw, interval);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOrbs();
    orbPhysics();
    if(showIds)
    {
        drawIds();
    }
}

init(10);

setTimeout(draw, interval);