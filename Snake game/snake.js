function init()
{
    canvas=document.getElementById("c");
    pen=canvas.getContext("2d");
    W=H=canvas.height=canvas.width=600;
    cs=50;
    game_over=false;
    score=0;
    canvas.style="green";
    
    fruit_img=new Image();
    fruit_img.src="fruit2.png";

    tail=new Image();
    tail.src="body.png"; 
    shead=new Image();
    shead.src="head2.png";
    fruit=getRandomFruit();
    
    snake={
        init_len:2,
        dir:"ArrowRight",
        color:"grey",
        cell:[],
        createSnake:function(){
            for(let i=this.init_len-1;i>=0;i--)
                this.cell.push({x:i,y:0});
          },

          drawSnake:function(){
            pen.drawImage(shead,this.cell[0].x*cs,this.cell[0].y*cs,cs-2,cs-2);
              for(let i=1;i<this.cell.length;i++)
              {   
                  pen.drawImage(tail,this.cell[i].x*cs,this.cell[i].y*cs,cs-2,cs-2);
              }
          },

          updateSnake:function(){
            var headX=this.cell[0].x;
            var headY=this.cell[0].y;
            
            if(headX==fruit.x&&headY==fruit.y)
            {
                fruit=getRandomFruit();
                score++;
            }
            else 
            this.cell.pop();

            switch(snake.dir)
            {
                case "ArrowRight":headX+=1;break;
                case "ArrowLeft":headX-=1;break;
                case "ArrowDown":headY+=1;break;
                case "ArrowUp":headY-=1;break;
                default:
            }

            var ex=Math.round((W-cs)/cs);
            var ey=Math.round((H-cs)/cs);
            // if(headY<0 || headX<0 || headX>ex || headY>ey)
            // game_over=true;

            if(headX<0)headX+=ex+1;
            if(headY<0)headY+=ey+1;
            if(headX>ex)headX=0;
            if(headY>ey)headY=0;

            for(let i=1;i<this.cell.length;i++)//self-bite
            {
                if(headX==this.cell[i].x&& headY==this.cell[i].y)
                game_over=true;
            }
            this.cell.unshift({x:headX,y:headY});
          },
          

        };
        
        snake.createSnake();

        function keyPressed(e)
        {
            snake.dir=e.key;
            // console.log("NEWWWWWWWWWWWWWWW");
            // for(let i=0;i<snake.cell.length;i++)
            //     console.log("cords: ",snake.cell[i].x,snake.cell[i].y);
        }
        
        document.addEventListener('keydown',keyPressed);    
        
    }

    function draw()
    {   
        pen.clearRect(0,0,W,H);
        snake.drawSnake();

        pen.fillStyle=fruit.color;
        pen.drawImage(fruit_img,fruit.x*cs+4,fruit.y*cs+3,cs-10,cs-10);

        document.getElementById("sc").innerHTML=score;

    }   
    function getRandomFruit()
    {
        var frX=Math.round(Math.random()*((W-cs)/cs));
        var frY=Math.round(Math.random()*((W-cs)/cs));

        var fruit={
            x:frX,
            y:frY,
            color:"red",
        }
        return fruit;
    }
    
    function update()
    {
      snake.updateSnake();
    }
    
    function gameLoop(){
        if(game_over)
        {  
            clearInterval(f);
            alert("\t SORRY!! GAME OVER\n\t FINAL SCORE: "+score);
            return;
        }  
        draw();
        update();  
    }
    
    init();
    var f=setInterval(gameLoop,50);