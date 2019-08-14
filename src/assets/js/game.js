
function startGame() {
  console.log('running game in js');
  var score = 0;   
  function smile() {
    var a;
    a = document.getElementById("div1");
    a.innerHTML = "score " + score;
    // setTimeout(function () {
    //     a.innerHTML = "score " + score;
    //   }, 100);
    // setTimeout(function () {
    //     a.innerHTML = "&#xf119;";
    //   }, 2000);
    // setTimeout(function () {
    //     a.innerHTML = "&#xf11a;";
    //   }, 3000);
  }
  smile();
//  var interval2 = setInterval(smile, 4000);


  function myFunction(x) {
      x.classList.toggle("fa-thumbs-down");
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //
   var ctx = canvas.getContext("2d"); 
   var FPS = 40;                  
   var jump_amount = -10;              
   var max_fall_speed= +10;             
   var acceleration = 1;          
   var pipe_speed = -2;                
   var game_mode = 'prestart';          
   var time_game_last_running;        
   var bottom_bar_offset = 0;    
   var endedGame = false;     
   var pipes = [];                      
  
  
   function MySprite (img_url) {
      this.x = 0;
      this.y = 0; 
      this.visible= true;
      this.velocity_x = 0;
      this.velocity_y = 0;
      this.MyImg = new Image();
      this.MyImg.src = img_url || '';
      this.angle = 0;                                 
      this.flipV = false;             
      this.flipH = false;                              
      }
   MySprite.prototype.Do_Frame_Things = function() {
      ctx.save();
      ctx.translate(this.x + this.MyImg.width/2, this.y + this.MyImg.height/2);
      ctx.rotate(this.angle * Math.PI / 180);                       
      if (this.flipV) ctx.scale(1,-1);                              
      if (this.flipH) ctx.scale(-1,1);
     if (this.visible) ctx.drawImage(this.MyImg, -this.MyImg.width/2, -this.MyImg.height/2);
      this.x = this.x + this.velocity_x;
      this.y = this.y + this.velocity_y;                            
      ctx.restore();                                               
      }
   function ImagesTouching(thing1, thing2) {
       if (!thing1.visible  || !thing2.visible) return false;         
       if (thing1.x >= thing2.x + thing2.MyImg.width || thing1.x + thing1.MyImg.width <= thing2.x) return false;  
       if (thing1.y >= thing2.y + thing2.MyImg.height || thing1.y + thing1.MyImg.height <= thing2.y) return false;
      //  return true;                                                                                            
       }
  function Got_Player_Input(MyEvent) {
     switch (game_mode) {
        case 'prestart': {
                          game_mode = 'running';
                          break;
                          } 
        case 'running': {
                          bird.velocity_y = jump_amount;
                          break;
                          } 
        case 'over': if (new Date() - time_game_last_running > 1000) {
                      reset_game();
                      game_mode = 'running';          
                      break;
                      } 
         }
     MyEvent.preventDefault();
 
     }

   var x = addEventListener("touchstart", Got_Player_Input);     
   var y = addEventListener("mousedown", Got_Player_Input);     
  //  var z = addEventListener("keydown", Got_Player_Input);     

  function make_bird_slow_and_fall() {
      if (bird.velocity_y < max_fall_speed) {
           bird.velocity_y = bird.velocity_y + acceleration;    
           }  
      if (bird.y > canvas.height - bird.MyImg.height)  {      
           bird.velocity_y = 0;
           game_mode = 'over';
           }
      }
  function add_pipe(x_pos, top_of_gap, gap_width) {             
      var top_pipe = new MySprite();
      top_pipe.MyImg = pipe_piece;                              
      top_pipe.x = x_pos;                                       
      top_pipe.y = top_of_gap - pipe_piece.height;              
      top_pipe.velocity_x = pipe_speed;            
      pipes.push(top_pipe);         
      var bottom_pipe = new MySprite();
      bottom_pipe.MyImg = pipe_piece;
      bottom_pipe.flipV = true;                                
      bottom_pipe.x = x_pos;
      bottom_pipe.y = top_of_gap + gap_width;
      bottom_pipe.velocity_x = pipe_speed;
      pipes.push(bottom_pipe );
      }
  function make_bird_tilt_appropriately() {
      if (bird.velocity_y < 0)  {
                   bird.angle= -15;                   
                   }
         else if (bird.angle < 70) {                   
                   bird.angle = bird.angle + 4;        
                   }
      }
  function show_the_pipes() {                          
      for (var i=0; i < pipes.length; i++) {
               pipes[i].Do_Frame_Things(); 
               }
      }
  function check_for_end_game() {
     for (var i=0; i < pipes.length; i++) 
       if (ImagesTouching(bird, pipes[i])) game_mode = "over";   
     }
  function display_intro_instructions () {
     ctx.font= "25px Arial";
     ctx.fillStyle= "red";
     ctx.textAlign="center";
     ctx.fillText("Press, touch or click to start", canvas.width / 2, canvas.height / 4);  
     }
  function display_game_over () {
    //  var score = 0;                                             
     for (var i=0; i < pipes.length; i++) 
          if (pipes[i].x < bird.x) score = score + 0.5;           
     ctx.font= "30px Arial";
     ctx.fillStyle= "red";
     ctx.textAlign="center";
     ctx.fillText("Game Over", canvas.width / 2, 100);  
     ctx.fillText("Score: " + score, canvas.width / 2, 150);  
     smile();
     ctx.font= "20px Arial";
     ctx.fillText("Click, touch, or press to play again", canvas.width / 2, 300);  
     }
  function display_bar_running_along_bottom() {
       if (bottom_bar_offset < -23) bottom_bar_offset = 0;
       ctx.drawImage(bottom_bar, bottom_bar_offset, canvas.height - bottom_bar.height);
       }
  function reset_game() {
        bird.y = canvas.height / 2;
        bird.angle= 0;
        pipes=[];                           // erase all the pipes from the array
        add_all_my_pipes();                 // and load them back in their starting positions 
        }
  function add_all_my_pipes() {
      add_pipe(500,  100, 140);
      add_pipe(800,   50, 140);
      add_pipe(1000, 250, 140);
      add_pipe(1200, 150, 120);
      add_pipe(1600, 100, 120);
      add_pipe(1800, 150, 120);
      add_pipe(2000, 200, 120);
      add_pipe(2200, 250, 120);
      add_pipe(2400,  30, 100);
      add_pipe(2700, 300, 100);
      add_pipe(3000, 100,  80);
      add_pipe(3300, 250,  80);
      add_pipe(3600,  50,  60);
      var finish_line = new MySprite("http://s2js.com/img/etc/flappyend.png");
      finish_line.x = 3900;
      finish_line.velocity_x = pipe_speed;
      pipes.push(finish_line);
      }
   var pipe_piece = new Image();
   pipe_piece.onload = add_all_my_pipes;                       
   pipe_piece.src = "assets/images/flappypipe.png/" ;
  //  http://s2js.com/img/etc/flappypipe.png
  function Do_a_Frame () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);   
      bird.Do_Frame_Things(); 
      display_bar_running_along_bottom();
      switch (game_mode) {
          case 'prestart': {
                            display_intro_instructions();
                            break;
                            } 
          case 'running': {
                           time_game_last_running = new Date(); 
                           bottom_bar_offset = bottom_bar_offset + pipe_speed; 
                           show_the_pipes();
                           make_bird_tilt_appropriately();
                           make_bird_slow_and_fall();
                           check_for_end_game();
                           break;
                           }
          case 'over': {
                        make_bird_slow_and_fall();
                        display_game_over();
                        clearInterval(interval1);
                        // clearInterval(interval2);
                        x = removeEventListener("touchstart", Got_Player_Input) 
                        y = removeEventListener("mousedown", Got_Player_Input);   
                        console.log('ended game in js');  
                        // z = removeEventListener("keydown", Got_Player_Input); 
                        return;
                        // break;
                        } 
          } 
      }
   var bottom_bar = new Image();
   bottom_bar.src = "http://s2js.com/img/etc/flappybottom.png" ;
  
   var bird = new MySprite("assets/images/laika.png");
  //  http://s2js.com/img/etc/flappybird.png
   bird.x = canvas.width / 3;
   bird.y = canvas.height / 2;
  
   
     
 var interval1 = setInterval(Do_a_Frame, 1000/FPS);  
    
   
 
}
