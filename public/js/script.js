window.onload = ()=>{
    game.startButton.addEventListener('click', game.startGame);
    game.restartButton.addEventListener('click', game.restartGame);
    game.body.addEventListener("keydown", game.keyPressHandler);
};
let game = {
    /*начало игры. Запускается по клику на кнопку старт*/
    startButton: document.querySelector('.startButton'),
    restartButton: document.querySelector('.end__restartButton'),
    body: document.querySelector("body"),
    field: document.getElementsByClassName("square"),//поле — все блоки с классом square
    count: 0,
    level: 0,
    isLevelUp: function(count){
        if(count%(this.level*3+2) == 0){
            clearInterval(snake.intervalID);          
            this.level++;
            field.levelBlock.innerHTML = "Level: " + this.level;
            field.gameplayBlock.style.width = field.gameplayBlock.offsetWidth + 78 + "px";
            field.addSquares(field.width*2+1);
            field.width++;
            console.log("ВОТ ЗДЕСЬ БЛЕАТЬ!!!!!! " + field.width);
            this.clearField();
            snake.generateNewChords();
            snake.place();
            food.setFood();
            return true;
            
        }
    },
    startGame : ()=>{
        let startWindow = document.querySelector(".startWindow");
        startWindow.style.display = "none";
        snake.place("START GAME");
        food.setFood();
        console.dir(field.gameplayBlock);
    },
    endGame : (intervalID)=>{
        clearInterval(intervalID);
        let endBlock = document.querySelector(".end");
        endBlock.style.display = "flex";
        console.log(game.count);
        setNumber(numbersCount, game.count);
        console.log("END GAME");
    },
    restartGame: ()=>{
        document.location.reload();
    },
    keyPressHandler: function(target){
        if(target.key == "w" || target.key == "ArrowUp") snake.moveUp();
        if(target.key == "s" || target.key == "ArrowDown") snake.moveDown();
        if(target.key == "a" || target.key == "ArrowLeft") snake.moveLeft();
        if(target.key == "d" || target.key == "ArrowRight") snake.moveRight();
    },
    clearField: function(){
        for(let i = 0; i < this.field.length; i++){
            this.field[i].setAttribute("class", "square");
        }
    }

};
let field = {
    width : 5,
    area: game.field.length, // площа поля — кількість квадратів на ньому
    levelBlock: document.querySelector("#level"),
    gameplayBlock: document.querySelector("#gameplayBlock"),
    getLeftBorder: function(){
        let leftBorderChords = [];
        for(let i = 0; i < (this.area/this.width); i++){
            leftBorderChords.push(i*this.width);
        }
        return leftBorderChords;
    },
    getRightBorder: function(){
        let rightBorderChords = [];
        for(let i = 0; i < (this.area/this.width); i++){
            rightBorderChords.push(this.width*(i+1) - 1);
        }
        return rightBorderChords;
    },
    leftBorder: function(){return this.getLeftBorder()},
    rightBorder: function(){return this.getRightBorder()},
    addSquares: function(amount){
        for (let i = 0; i < amount; i++) {
           
            let div = document.createElement("div")
            div.setAttribute("class", "square");
            this.gameplayBlock.appendChild(div);
            field.area =  game.field.length;
            }
    },
};
//объект игры

//объект змеи. Здесь — функции, которые отвечают за движение, и переменные, относящиеся к змее
let snake = {
    speed: 500, //скорость змейfrtttки в миллисекндах
    snakeColor: "#29E75E",
    intervalID: "", // задается в функциях движения (moveLeft, moveUp и т.д.). Нужен, чтобы остановить змейку при смене
    chords: [2,7,12], //координаты змейки — закрашенные ячейки из коллекции game.field
    getLength: function(){return this.chords.length}, // длина змейки
    isMoveUp: false, //змейка двигается вверх?
    isMoveRight: false, // змейка двигается вправо?
    isMoveDown: false, //змейка двигается вниз?
    isMoveLeft: false, //змейка двигается влево?
    /* Переключить направление движения*/
    generateNewChords : function(){
        let chord1 = 2;
        let chord2 = 2 + field.width;
        let chord3 = 2 + field.width*2;
        this.chords = [chord1,chord2, chord3];
    },
    setMoveDirection: function(direction){
        if(direction == "up"){
            this.isMoveUp = true;
            this.isMoveRight = false;
            this.isMoveDown = false;
            this.isMoveLeft = false;
        }
        if(direction == "right"){
            this.isMoveUp = false;
            this.isMoveRight = true;
            this.isMoveDown = false;
            this.isMoveLeft = false;
        }
        if(direction == "down"){
            this.isMoveUp = false;
            this.isMoveRight = false;
            this.isMoveDown = true;
            this.isMoveLeft = false;
        }
        if(direction == "left"){
            this.isMoveUp = false;
            this.isMoveRight = false;
            this.isMoveDown = false;
            this.isMoveLeft = true;
        }
    },
    /*поставить змейку на координаты, указанные в массиве chords*/
    place: function(identifire){
        console.log("Placing " + identifire);
        for(let i = 0; i < this.getLength(); i++){
            if(i == 0){
            game.field[this.chords[i]].setAttribute("class", "square square_head");
            }
            else  game.field[this.chords[i]].setAttribute("class", "square square_body");
        }
    },
    isAte: function(snakeHeadChord){
        if (numField == snakeHeadChord) {
            game.count++;
            score.innerText = "Count: " + game.count;
            this.chords.push(numField);
            food.setFood();
            if (game.isLevelUp(game.count)) return true;
          }
          return false;
    },
    isSelfCollision: function(){
        for(let i = 1; i < this.chords.length; i++){
            if(this.chords[0] == this.chords[i]) game.endGame();
        }
    },
    //ФУНКЦИИ ДВИЖЕНИЯ
    moveLeft: function(){
        if(!this.isMoveRight){
        let rightBorder = field.getRightBorder();
        this.setMoveDirection("left");
        let intervalID = setInterval(()=>{
            if(this.isMoveLeft){
                let previousChord = this.chords[0];
                let nextChord;
                this.chords[0]--;
                let isAte = this.isAte(this.chords[0]);
                    if(isAte == false){
                for(let i = 0; i < rightBorder.length; i++){
                    if(this.chords[0] < 0 || this.chords[0] == rightBorder[i]){
                        game.endGame(intervalID);
                        return;
                    }
                }
                for(let i = 1; i < this.chords.length; i++){
                        game.field[this.chords[i]].setAttribute("class", "square");
                        nextChord = this.chords[i];
                        this.chords[i] = previousChord;
                        previousChord = nextChord;
                    }
                this.intervalID = intervalID;
                this.place("MOVE LEFT");
                this.isSelfCollision();
            }}
            else clearInterval(intervalID);

        }, this.speed)
        
        
        }
    },
    moveUp: function(){
        if(!this.isMoveDown){
            this.setMoveDirection("up");
            let intervalID = setInterval(()=>{
                if(this.isMoveUp){
                    let previousChord = this.chords[0];
                    let nextChord;
                    this.chords[0] -= field.width;
                    let isAte = this.isAte(this.chords[0]);
                    if(isAte == false){
                    if(this.chords[0] < 0){
                        game.endGame(intervalID);
                        return;
                    }
                    for(let i = 1; i < this.chords.length; i++){
                            game.field[this.chords[i]].setAttribute("class", "square");
                            nextChord = this.chords[i];
                            this.chords[i] = previousChord;
                            previousChord = nextChord;
                    }
                    this.intervalID = intervalID;
                    this.place("MOVE UP");
                    this.isSelfCollision();
                }}
                else clearInterval(intervalID);

            }, this.speed)
            
        }
    
    },
    moveRight: function(){
        let leftBorder = field.getLeftBorder();
        if(!this.isMoveLeft){
            this.setMoveDirection("right");
            let intervalID = setInterval(()=>{
                if(this.isMoveRight){
                    let previousChord = this.chords[0];
                    let nextChord;
                    this.chords[0]++;
                    let isAte = this.isAte(this.chords[0]);
                    if(isAte == false){
                    for(let i = 0; i < leftBorder.length; i++){
                        if(this.chords[0] >= field.area || this.chords[0] == leftBorder[i]){
                            game.endGame(intervalID);
                            return;
                        }
                    }
                    for(let i = 1; i < this.chords.length; i++){
                            game.field[this.chords[i]].setAttribute("class", "square");
                            nextChord = this.chords[i];
                            this.chords[i] = previousChord;
                            previousChord = nextChord;
                    }
                    this.intervalID = intervalID;
                    this.place("MOVE RIGHT");
                    this.isSelfCollision();
                }}
                else clearInterval(intervalID);

            }, this.speed)
            
        }
     
    },
    moveDown: function(){
        if(!this.isMoveUp){
            this.setMoveDirection("down");
            let intervalID = setInterval(()=>{
                if(this.isMoveDown){
                    let previousChord = this.chords[0];
                    let nextChord;
                    this.chords[0] += field.width;
                    let isAte = this.isAte(this.chords[0]);
                    if(isAte == false){
                    if(this.chords[0] >= field.area){
                        game.endGame(intervalID);
                        return;
                    }
                    for(let i = 1; i < this.chords.length; i++){
                            game.field[this.chords[i]].setAttribute("class", "square");
                            nextChord = this.chords[i];
                            this.chords[i] = previousChord;
                            previousChord = nextChord;
                        
                    }
                    this.intervalID = intervalID;
                    this.place("MOVE DOWN");
                    this.isSelfCollision();
                }
                }
                else clearInterval(intervalID);

            }, this.speed)
            
        }
    },
};


/* Окончание игры и вспомогательные функции*/
const numbersImg = ["0.png","1.png", "2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png",];
const numbersCount = document.querySelector(".numbers_count").children;
const numbersLvl = document.querySelector(".numbers_lvl").children;


function setNumber(objectsArrayToPutNumber, number){
    let numbersArray = numToArray(number);
    for(let i = 0; i < objectsArrayToPutNumber.length; i++){
        let source = "img/numbers/" + numbersImg[numbersArray[i]]
        objectsArrayToPutNumber[i].children[0].setAttribute("src", source);
    }
}
//разделить число на массив символов. Например, numToArray(800) вернет [8,0,0]
function numToArray(num){
    num += "";
    let resultArrayOfNumbers = num.split("");
    return resultArrayOfNumbers;

}
let food = {
    setFood: () => {
      numField = random(1, game.field.length);
  
      let flag = () => {
        let bool = false;
        for (let elem of snake.chords) {
          if (numField == elem) {
            bool = true;
          }
        }
        return bool;
      }
  
      if (flag()) {
        food.setFood();
      } else {
        game.field[numField].setAttribute("class", "square square_food");
      }
  
    }
  }
  
  function random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand - 1);
  }
  