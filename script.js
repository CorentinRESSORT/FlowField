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
    }

    draw(context)
    {
        context.fillRect(this.x, this.y, 10, 10);
    }
}

class Effect
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles = 50;
    }

    init()
    {
        for(let i = 0; i < this.numberOfParticles; i++)
            {
                this.particles.push(new Particle(this));
            }
    }
    render(ctx)
    {
        this.particles.forEach(particles =>
            {
                particles.draw(ctx);
            }
        )
    }
}

const ef = new Effect(canv.width, canv.height);

ef.init();
ef.render(ctx);
