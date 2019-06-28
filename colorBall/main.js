const BALLS_COUNT = 10;
const BALL_SIZE_MIN = 10;
const BALL_SIZE_MAX = 20;
const BALL_SPEED_MAX = 7;
// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//储存小球的容器
const balls = [];

// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' + 
         random(0, 255) + ', ' + 
         random(0, 255) + ', ' + 
         random(0, 255) + ')';
}

//建立小球模型
function Ball(x, y, velX, velY, color, size){
  this.x = x;//小球开始的坐标x，y
  this.y = y;
  this.velX = velX;//小球的运动速度 垂直 和水平速度 
  this.velY = velY;
  this.color = color;//小球的颜色
  this.size = size;//小球的大小
}
//给小球加上运作的方法
Ball.prototype.draw = function(){
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x ,this.y ,this.size, 0, 2*Math.PI);
  ctx.fill();
  ctx.restore();
}

//给小球加上update方法  碰到边缘后 朝相反方向运动
Ball.prototype.update = function(){
  if((this.x + this.size) >= width){
     this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0){
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height){
     this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0){
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}; 

// 碰撞 检测  碰撞后颜色改变 
Ball.prototype.collisionDatect = function(){
  for(let j = 0; j<balls.length; j++ ){
    if(! (this === balls[j]) ){
      let dx = this.x - balls[j].x;
      let dy = this.y - balls[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);//sqrt 方法返回一个数的平方根
      
      if(distance < this.size + balls[j].size){
        balls[j].color = this.color = randomColor();
      }
    }
  }
}



//创建一些小球让他们动起来
function loop(){
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < BALLS_COUNT){
    const size = random(BALL_SIZE_MIN,BALL_SIZE_MAX);
    const ball = new Ball(
      random(0 + size, width - size),//x坐标
      random(0 + size, height - size),//y坐标
      random(-BALL_SPEED_MAX,BALL_SPEED_MAX),//x轴运动速度
      random(-BALL_SPEED_MAX,BALL_SPEED_MAX),// y轴运动速度
      randomColor(),//小球颜色
      size//小球大小
    );
    balls.push(ball);//操  忘记给数组添加元素了 找半天！！！
  }
//给每个小球加上运动的方法 和规则
  for(let i = 0; i < balls.length; i++){
     balls[i].draw();
     balls[i].update();
     balls[i].collisionDatect();
  }

  requestAnimationFrame(loop);//运行完后再运行一次 自己调用自己形成循环
}

loop();

