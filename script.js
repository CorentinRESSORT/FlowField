"use strict";

let canv = document.querySelector("canvas");
let ctx = canv.getContext("2d");

canv.width = window.innerWidth;
canv.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0,0,canv.width, canv.height);


