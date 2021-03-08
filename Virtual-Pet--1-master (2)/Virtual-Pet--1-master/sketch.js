//Create variables here

function preload()
{
	//load images here
}

function setup() {
	createCanvas(800, 700);
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();  
})
readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
})

}


function draw() { 
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    Dog.addImage(dogHappy)
  }
   
  feed=createButton("Feed the dog ")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  Fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
  text("Last Feed:"+ lastFed%12+"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed:"+ lastFed +"AM",350,30)
  }
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  currentTime=hour();
  if(current==(lastFed+1)){
    update("Playing")
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime==(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
  foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }
  

  
  drawSprites();
  //add styles here

}


function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
  x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foods
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}




