$(document).ready(function() {
    $('.starter').click(function() {
      randoms();
      $(this).delay(2000).fadeOut().hide();
    });
    $('.check_score').click(function() {
      $('.score_input').val(Math.round(start[2]));
      return start = [0, 0, 0, -1, 1];
    });

    var $window = $(window);
    var height = $(window).height();
    var cell = $('.cell').height()/2 + 20;
    if (height > 1300) {height = 1300}
          
    function checkWidth() {
    var windowsize = $window.width();
    var hole = $('.field div');

    $('body, .get_score').css({"height":(height-2)+'px'});
    $('.cell').css({"margin-top":(height/2 - cell)+'px'});
    $('.panel, .container').css({"height":(height*0.20)+'px'});  
    hole.css({"height":(height*0.1)+'px',"margin-top":(height*0.1)+'px' });
    }

    checkWidth();
    $(window).resize(checkWidth);

});

var start = [0, 0, 0, -1, 1];    //var [i, points, score, combo, stack] = [0, 0, 0, -1, 1];
var last_doge;

function randoms() { 

    var limit = 40; //number of jumps
    var initial = 2000; //starting interval 
    var bunny_duration = 685; //time bunny exists
    var progress = start[0]/limit;
    var max_speed = bunny_duration / initial;
    var speed = initial - (progress * initial * (1-max_speed));
    var random = [1,2,3,4,5,6,7,8,9][Math.floor(Math.random()*9)];
    var black = Math.random();
    var bunny = $('.field div').width();
    var triple = 1;

    if (black > 1 - (progress/6) ) {
      while (random === last_doge) {
        random = [1,2,3,4,5,6,7,8,9][Math.floor(Math.random()*9)];
      }
      speed = speed/3;
      triple = 2;
      // WOW!
    }

    setTimeout(function () 
    {
      spawn(random, black, progress);
    $('.field div span').css({"height":(bunny*0.85)+'px'});
        if (start[0] < (limit) )
        { 
           randoms();  
        }
        else
        {
          $('.score_input').val(Math.round(start[2]));
          $('.score_display').html(Math.round(start[2]));
          setTimeout(function () {show_board()}, 1500);
        }
    }, speed);

    setTimeout(function () {
          destroy(random);
    }, speed+(bunny_duration-1));

    $('span.white').bind('click touchstart', function () {

        $(this).hide();
        start[1]++;
        if (start[0] == start[3]+1) {
            start[4]++;
            if (start[4] % 3 !== 0) {
              hit = 10 * (Math.round(progress*10) / 5 + 1); 
              $('#wombo').removeClass("combo");
            }
            else {
              wombo = 2*(start[4]/5);
              hit = wombo * 10 * triple * (Math.round(progress*10) / 5 + 1); 
              $('#wombo').html("COMBO:<br>"+wombo+"X !!").show().addClass("combo").fadeOut(2200); 
              $('#wows').fadeIn(160).delay(300).fadeOut(480);
              //start[4] - stack
            }
        }       
        else {
            hit = 10 * (Math.round(progress*10) / 5 + 1); 
            start[4] = 1;
        }
        start[2] += (hit * triple);     
        start[3] = start[0];
        $('#calculator').html("+"+Math.round(hit)+"pkt").fadeIn(160).delay(300).fadeOut(480);
        $('#points').html(Math.round(start[2]));
    });

    $('span.black').bind('click touchstart', function() {
        $(this).hide();
        start[2] *= 0.8;     
        start[4] = 1;
        $('#calculator').html(" -20%").fadeIn(160).delay(300).fadeOut(480);
        $('#points').html(Math.round(start[2]));
    });
   // return start[0] = 0; infinite
   return last_doge = random;
}

function spawn(random, black, progress, bunny_size) {
  if (black < (progress*0.5)) {
    $(".rabbit"+random).append("<span class='jump black'></span>");
  }
  else {
    start[0]++; 
    $(".rabbit"+random).append("<span class='jump white'></span>");
  }
}
function destroy(random) {
    $(".rabbit"+random+" span").remove();
}

function show_board() {
  $('.get_score').css({"top":0});
}