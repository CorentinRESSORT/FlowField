"use strict";

const canv = document.querySelector("#canvas1");
const ctx = canv.getContext("2d");

canv.width = window.innerWidth;
canv.height = window.innerHeight;

// canvas settings
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 1;

class Particle
{
    constructor(effect)
    {
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.floor(Math.random() * 4 + 1)
        this.history = [{x: this.x, y:this.y}];
        this.maxLength = Math.floor(Math.random() * 200 + 10);
        this.angle = 0;
        this.timer = this.maxLength * 2;
        this.colors = ["#42014d", "#710582", "#b908d4", "#db84e8"];
        this.color = this.colors[Math.floor(Math.random()*this.colors.length)];
    }

    draw(context)
    {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for(let i = 0; i < this.history.length; i++)
            {
                context.lineTo(this.history[i].x, this.history[i].y);
            }
        context.strokeStyle = this.color;
        context.stroke();
        context.closePath();
    }

    update()
    {
        this.timer--;
        if (this.timer >= 1)
            {
                let x = Math.floor(this.x / this.effect.cellSize);
                let y = Math.floor(this.y / this.effect.cellSize);
                let index = y * this.effect.cols + x;
                this.angle = this.effect.flowField[index];
        
                this.speedX = Math.cos(this.angle);
                this.speedY = Math.sin(this.angle)
        
                this.x += this.speedX * this.speedModifier;
                this.y += this.speedY * this.speedModifier;
        
                this.history.push({x: this.x, y:this.y});
                if (this.history.length > this.maxLength)
                    this.history.shift();
            }
        else if (this.history.length > 1) {
            this.history.shift();
        }
        else
        {
            this.reset();
        }
    }
    reset()
    {
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.history = [{x: this.x, y:this.y}];
        this.timer = this.maxLength * 2;
    }
}

class Effect
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles = 2000;
        this.cellSize = 5;
        this.rows;
        this.cols;
        this.flowField = [];
        this.curve = 1.02;
        this.zoom = .08;
        this.#init();
    }

    #init()
    {
        // create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];

        for(let y = 0; y < this.rows; y++)
            {
                for(let x = 0; x < this.cols; x++)
                    {
                        let angle = (Math.cos(x * this.zoom) * Math.sin(y * this.zoom)) * this.curve;
                        this.flowField.push(angle);
                    }
            }
            console.table(this.flowField);
        // create Particle
        for(let i = 0; i < this.numberOfParticles; i++)
            {
                this.particles.push(new Particle(this));
            }
    }

    drawgrid(ctx)
    {
        for (let c = 0; c < this.cols; c++)
            {
                ctx.beginPath();
                ctx.moveTo(this.cellSize * c, 0);
                ctx.lineTo(this.cellSize* c, this.height);
                ctx.stroke();
            }
            for (let r = 0; r < this.rows; r++)
                {
                    ctx.beginPath();
                    ctx.moveTo(0, this.cellSize * r);
                    ctx.lineTo(this.width ,this.cellSize* r);
                    ctx.stroke();
                }
    }
    render(ctx)
    {
        // this.drawgrid(ctx);
        this.particles.forEach(particles =>
            {
                particles.draw(ctx);
                particles.update();
            }
        )
    }
}

const ef = new Effect(canv.width, canv.height);

function animate()
{
    ctx.clearRect(0,0, canv.width,canv.height);
    ef.render(ctx);
    requestAnimationFrame(animate);
}

animate();

function dechiffre(pass_enc){
    var pass = "55,56,54,79,115,69,114,116,107,49,50";
    var tab  = pass_enc.split(',');
    var tab2 = pass.split(',');
    var i,j,k,l=0,m,n,o,p = "";
    i = 0;
    j = tab.length; // => la longueur du mdp entrer
    k = j + (l) + (n=0); // => k égal à la longueur de passenc sans les virgules
    n = tab2.length; // => égal a la longueur de pass sans les virgules
    
    for(i = (o=0); i < (k = j = n); i++ ) // => i = 0 tant que i est inférieur a k (longueur de pass) continue
        {
            o = tab[i-l]; // => o égal tab[i]
            p += String.fromCharCode((o = tab2[i])); // p tab2[i] jusqu'a 5 soit FAUX
            if(i == 5)break;
        }
        for(i = (o=0); i < (k = j = n); i++ ){ // i = 0, i < tab2.length,  
            o = tab[i-l];  // o tab[i]
            if(i > 5 && i < k-1) // k = tab2 length 17
                p += String.fromCharCode((o = tab2[i]));
        }
    p += String.fromCharCode(tab2[17]);
    pass = p;
    return pass;
}
String["fromCharCode"](dechiffre("\x35\x35\x2c\x35\x36\x2c\x35\x34\x2c\x37\x39\x2c\x31\x31\x35\x2c\x36\x39\x2c\x31\x31\x34\x2c\x31\x31\x36\x2c\x31\x30\x37\x2c\x34\x39\x2c\x35\x30"));

let h = window.prompt('Entrez le mot de passe / Enter password');
alert( dechiffre(h) );

console.log(String.fromCharCode(("55,56,54,79,115,69,114,116,107,49,50").split(",")));
let p = "";
(("55,56,54,79,115,69,114,116,107,49,50").split(',')).forEach((elem)=>{
p += String.fromCharCode(elem);
})
console.log(p);