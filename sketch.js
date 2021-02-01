var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;

var turn = 0;

var gameState = "Play"

var posRand;

var showT;

var posX = 400

var scores = [300, 150, 500, 250, 50, 100, 450, 200, 350, 400]

var divisX = [[0, 80], [80, 160], [160, 240], [240, 320], [320, 400], [400, 480], [480, 560], [560, 640], [640, 720], [720, 800]]


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50){
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

   
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   for (var t = 0; t < divisions.length; t++) {
     
    plinkos[t].display();
  }

  if(posRand == "position"){

    text("500", 25, 550)
    text("500", 105, 550)
    text("500", 185, 550)
    text("500", 265, 550)
  
    text("100", 345, 550)
    text("100", 425, 550)
    text("100", 505, 550)
  
    text("200", 585, 550)
    text("200", 665, 550)
    text("200", 745, 550)
    
    if(particle != null){
    particle.display()

    if(particle.body.position.y > 760){
      if(particle.body.position.x < 300){
        score += 500
        particle = null
      } else if(particle.body.position.x > 301 && particle.body.position.x < 600){
        score += 100
        particle = null
      } else if(particle.body.position.x > 601){
        score += 200
        particle = null
      }
    }
  }
}

if(posRand == "really random"){

  if(particle != null){
    particle.display()

    if(particle.body.position.y > 760){
      score += Math.round(random(1, 10)) * 50
      particle = null
    }
  }
}

if(posRand == "random"){
  if(particle != null){
    particle.display()

    

    if(particle.body.position.y > 760){
      for(x = 0; x < 10; x++){
        if(particle.body.position.x > divisX[x][0] && particle.body.position.x < divisX[x][1]){
          score += scores[x]
          // particle = null;
        }
      }
    }
    
    if(particle != null){
      if(particle.body.position.y > 760){
        particle = null
      }
    }
  }

  if(keyCode == 115){
    showT = true
  }

  if(keyCode== 72){
    showT = false
  }

  if(showT){
    text("300", 25, 550)
    text("150", 105, 550)
    text("500", 185, 550)
    text("250", 265, 550)
  
    text("50", 350, 550)
    text("100", 425, 550)
    text("450", 505, 550)
  
    text("200", 585, 550)
    text("350", 665, 550)
    text("400", 745, 550)

    //300, 150, 500, 250, 50, 100, 450, 200, 350, 400
  }
}


  if(turn == 5 && particle == null){
    gameState = "End"

    textSize(100)
    noStroke()
    fill(255, 0, 0)
    text("Game Over", 150, 300)
    fill(255, 255, 255)
  }

  stroke("yellow")
  strokeWeight(4)
  line(0, 450, width, 450)
  stroke("black")

  fill(0)
  rectMode(CENTER)
  rect(posX, 400, 800, 800)

  fill(255)
  text("Press 1 for positioned incrementing", posX - 185, 385)
  text("Press 2 for really random incrementing", posX - 195, 415)
  text("Press 3 for random incrementing", posX - 175, 500)
  textSize(15)
  text("(Press S to show numbers)", posX - 130, 515)
  text("(Press H to hide numbers)", posX - 127, 535)


  if(keyCode == 49){
    posRand = "position"
    console.log(posRand)
    posX += 800
  }

  if(keyCode == 50){
    posRand = "really random"
    console.log(posRand)
    posX += 800
  }

  if(keyCode == 51){
    posRand = "random"
    console.log(posRand)
    posX += 800
  }

}


function mousePressed(){

  if(posRand != null){
    if(gameState != "End"){
      if(gameState == "Play"){
      particle = new Particle(mouseX, 10, 10, 10)
      turn++
      }
    }
  }

}