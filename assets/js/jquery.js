var playing = false;
var score;
var trials;
var step;
var action; //used for setInterval
var fruits = [
  "coconut",
  "maracuja",
  "banana",
  "strawberry",
  "watermelon",
  "cherries",
  "peach",
  "fig",
  "pineapple",
];

$(function () {
  //click on start reset button
  $("#startreset").click(function () {
    //we are playing
    if (playing == true) {
      //reload page
      location.reload();
    } else {
      //not playing
      playing = true; //game initiated
      score = 0; //set score to 0
      $("#scorevalue").html(score);
      //show trials left
      $("#trials").show();
      trials = 3;
      addHearts();
      //hide game over box
      $("#gameOver").hide();
      //change button text to reset game
      $("#startreset").html("Reset Game");
      //start sending fruits
      startAction();
    }
  });

  //slice fruit
  //making speed increase every 12 points
  $("#fruit1").mouseover(function () {
    if (score % 12 === 0) {
      //score is devided by 12 and the rest is 0, like 24:12 is 2, without rest..
      startLevel = true; //then this is true and later(dole u kodu).. and if it's not true it just ignore
    }

    score++;
    $("#scoreValue").html(score); //update score

    //play sound
    $("#sliceSound")[0].play(); //posto ima dva izvora, onda koristimo array sa pozicijom onog zvuka koji zelimo da iskoristimo sada. a drugi nacin je sledeci:
    // document.getElementById("sliceSound").play();

    //stop fruit
    clearInterval(action);

    //hide fruit and explode it
    $("#fruit1").hide("explode", 250); //this explode animation will only work if jquery ui is embeded, not gonna work on jquery alone

    //send new fruit
    setTimeout(startAction, 400); //delay for 400ms for new fruit, until explode animation of sliced fruit is done
  });

  //////////functions////////

  //show hearts
  function addHearts() {
    $("#trials").empty();
    for (i = 0; i < trials; i++) {
      $("#trials").append(' <img src="assets/imgs/heart.png" class="life"> ');
    }
  }

  //increase speed every 12 points
  var startLevel;
  function verifyScore(score) {
    if (score < 12) {
      //up until score is 12 or higher, step is 1px and the speed is same
      step = 1;
    }

    if (score % 12 === 0 && startLevel) {
      //da se ne bi brzina uvecavala i onda kada ne uhvatimo vocku, jer je srtatLevel i dalje true time sto je score i dalje deljiv sa 12 bez ostatka, onda cemo reci da je sada srtartLevel false i povecati brzinu cineci step vecim
      startLevel = false;
      return (step += 2);
    }
  }

  //start sending fruits
  function startAction() {
    $("#fruit1").show();
    chooseFruit(); //choose random fruit
    $("#fruit1").css({ left: Math.round(550 * Math.random()), top: -100 }); //random position

    //generate a random step
    // step = 1 + Math.round(5 * Math.random()); //change step(speed?)= this 5 is bc height of one step is 1-5px
    //check speed / increase speed
    verifyScore(score);

    action = setInterval(function () {
      $("#fruit1").css("top", $("#fruit1").position().top + step); //move fruit by one step

      //check if fruit is too low
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        //check if we have trials left
        if (trials > 1) {
          $("#fruit1").show(); //generate fruit
          chooseFruit(); //show random fruit
          $("#fruit1").css({
            //generate a random step
            left: Math.round(550 * Math.random()),
            top: -100,
          }); //random position

          // step = 1 + Math.round(5 * Math.random());
          verifyScore(score); //change step

          //reduce trials by one
          trials--;
          //populate trials box
          addHearts();
        } else {
          //game over
          playing = false; //we are not playing anymore
          $("#startreset").html("Start Game"); //change button to start game
          //show game over box
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#trials").hide();
          stopAction();
        }
      }
    }, 10); // move fruit down by one step every 10ms
  }

  //generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "assets/imgs/" + fruits[Math.round(8 * Math.random())] + ".png"
    );
  }

  //stop dropping fruits
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
