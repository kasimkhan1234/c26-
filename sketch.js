const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var balls = [];
var con ;
var btn1;
var boats=[];
let engine;
let world;

var isGameOver = false;
var isLaughing = false;

var spaceship,spaceshipImg,backgroundImg;
var cannon,enemyImg,enemy,boats,backgroundMusic,cannonExplosion,enemyLaugh,earth;

function preload(){
spaceshipImg = loadImage("spaceship.png")
backgroundImg = loadImage("space.png")
enemyImg = loadImage("enemy.png");
backgroundMusic = loadSound("spaceSound.mp3");
cannonExplosion = loadSound("shoot.mp3");
enemyLaugh = loadSound("pirate_laugh.mp3");
}

function setup() {
canvas = createCanvas(1800,800);
engine = Engine.create();
  world = engine.world;
  angle = 0

 spaceship = new Spaceship(180, 500, 350, 400);
 cannon = new Cannon(300,490,200,10,angle);
 cannonball = new CannonBall(cannon.x , cannon.y);
earth = new Earth(100,50,600,600)
 

 





  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{

 

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided) {
          //boats[j].remove(j);
          Matter.World.remove(world, boats[j].body,j);
          boats.splice(i,1);
          j--;

          Matter.World.remove(world, balls[i].body);
          balls.splice(i,1);
          i--;
          
        }
      } 
    }
  }

  if(!backgroundMusic.isPlaying()){
    backgroundMusic.play()
    backgroundMusic.setVolume(4)
  }

  background("pink");
  image(backgroundImg,0,0,width,height)
  Engine.update(engine);
   spaceship.display();
  earth.display();
  cannon.display();
  cannonball.display()

showBoats();

  for(var i=0 ; i < balls.length; i++){
    showCannonBalls(balls[i],i)
  }
}

//function keyReleased(){
 // if (keyCode === 32){
 //   cannonball.shoot()
 // }
//}

function keyPressed(){
  if(keyCode === 32){
   var cannonball = new CannonBall(cannon.x,cannon.y)
   cannonball.trajectory = [];
   balls.push(cannonball)
   cannonExplosion.play();
  }
}

function showCannonBalls(ball,index){
  ball.display()
  if(ball.body.position.x >= width || ball.body.position.y >= height-50){
    Matter.World.remove(world,ball.body)
    balls.splice(index,1)
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 9 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [300, 290];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 500,
        370,
        270,
        position
        
      );

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -2,
        y: -1,
      });

      boats[i].display();
      //boats[i].animate();

      
      var collision = Matter.SAT.collides(earth.body,boats[i].body)
      if(collision.collided ){
        if(!isLaughing && !enemyLaugh.isPlaying()){
        enemyLaugh.play()
          isLaughing = true;
        }
        isGameOver = true;
        GameOver()
      }

    }
  } else {
    var boat = new Boat(width, height - 200, 170, 170, -60);
    boats.push(boat);
  }
}


function keyReleased() {
  if (keyCode === 32) {
   balls[balls.length-1].shoot()
  }
}

function GameOver(){
  backgroundMusic.isPlaying = false;
    //Matter.World.remove(world, boats[j].body,j);
    //boats.splice(i,1);
    //j--;
  swal (
    {
      title: 'GameOver',
      text : 'Thanks for playing',
     // imageurl: 'https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png',
     // imageSize: "150x150",
      confirmButtonText: "PLAY AGAIN"
    },
    function (isConfirm){
      if(isConfirm){
        location.reload()
      }
    }

  )
}



