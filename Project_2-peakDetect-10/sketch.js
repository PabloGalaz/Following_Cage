var sound, amplitude, cnv, button, peakDetect, img;
var cagePhrases = ["I BELIEVE THAT THE USE OF NOISE", "new listening","silences", "sounds to be heard ", "No purposes","logically related","arbitrarily",  "freely moving", "material", "structure", "But is this music? ","playing",  "Sounds",  "performing's another","listening's a","another",  "New music","Composing's one thing", "experimental","sound-silence", "sound-space", "TIME","silence", "Once upon a time", "music has changed", "times have changed","NOISE","noises", "TO MAKE MUSIC", "noise", "ALL SOUNDS THAT CAN BE HEARD", "SILENCE"];

function preload(){
  sound = loadSound('sounds/Living.mp3');
  img = loadImage("images/cage_02.jpeg");
  img2 = loadImage("images/cage_01.jpeg");
  img3 = loadImage("images/cage_03.jpeg");

}
//var cages = ["img", "img2", "img3"]

function setup() {
  cnv = createCanvas(windowWidth,windowHeight);
  amplitude = new p5.Amplitude();
  amplitude.toggleNormalize(true);
  //amplitude.smooth(.1); 
  cnv.position(0, 0);
  cnv.style("z-index", "-1");
   /* myHeader = createElement('header', "Following Cage");
  myHeader.position(width/2, 10);*/
  //image(img, 0, 0);
  button = createButton("play/stop");
  button.mousePressed(playSound);
  button.position(10, windowHeight - 25) ; 
  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();
  peakDetect.threshold = 0.09;
  

  
}

// start / stop the sound when canvas is clicked
  function playSound () {
    if (sound.isPlaying() ){
      sound.stop();
    } else {
      sound.play();
    }
  }
  
  function windowResized(){
            resizeCanvas(windowWidth,windowHeight);
        }




function draw() {
    
  var ampLevel = amplitude.getLevel();
  var alfa = map(ampLevel, 0, 0.1, 0, 5);
  
  noStroke();
  
  fill(alfa, alfa, alfa, alfa );
  rect(0, 0, windowWidth, windowHeight)

  fft.analyze();
  peakDetect.update(fft);



  if (peakDetect.isDetected){
    //console.log("got attack");
  
  /*var textX = 50+random(100);
  var textY = 50+random(50);
  fill((random (255)), 0 , 0, (random(200, 255)));
  fill(random(255), 0 , random(50), alfa);*/
  

  function random_item(items){
  return items[Math.floor(Math.random()*items.length)];    
  }

  var phrase = random_item(cagePhrases);
/*  textX = 30;
  textY = 50;*/

  var txtspace = Math.round (map(ampLevel, 0, 1, 0, 200));
  var txtsize = map(ampLevel, 0, 0.05, 10, 80);

  textLeading(txtspace);
  var mywindowWidth = windowWidth;
  var mywindowHeight = windowHeight;
  fill(random (255));
  textSize(txtsize);
  rotate(random (-.1));
  text(phrase, 10+random(mywindowWidth), 0 + random(mywindowHeight));
  
  var imageTint = map(ampLevel, 0, 0.1, 0, 50);
  tint(255,  imageTint);
  background(img);

  }
  else {
    var imageTint = map(ampLevel, 0, 0.1, 0, .1);
  tint(random(255), imageTint);
   //background(img);
 
  var invisibleText = lerp(255, random(255), .001);


  fill(255, invisibleText , invisibleText, random(100));
  rotate(random (.5));
  textX = 30;
  textY = 50;
  //fill(0, (random (100)) , (random (100)), (random (90)));

  //console.log(invisibleText);
  }
  
  
  //text("Following\nCage", textX+random(1), textY+random(1));

  
  
}







