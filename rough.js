function init()
{
    canvas=document.getElementById('c');
    W=canvas.width=500;
    H=canvas.height=500;    
    game_over=false;
    pen=canvas.getContext('2d');
    r={
        x:10,
        y:5,
        w:15,
        h:15,
        sp:10,
    };
}

function draw()
{   
    pen.clearRect(0,0,W,H);
    pen.fillStyle="green";
    pen.fillRect(r.x,r.y,r.w,r.h);
}

function update()
{
    r.x+=r.sp;
    if(r.x>(W-r.w) || r.x<0)
        r.sp*=-1;
}

function gameLoop(){
if(game_over==true)
{
    return;
}
draw();
update();
}

init();
var f=setInterval(gameLoop,100);
