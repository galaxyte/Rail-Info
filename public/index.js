$(".dropdown").hover(function() 
{
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});

$(document).ready(function () {
  $(window).scroll(function () {
    var top =  $(".goto-top");
        if ( $('body').height() <= (    $(window).height() + $(window).scrollTop() + 200 )) {
  top.animate({"margin-left": "0px"},1500);
        } else {
            top.animate({"margin-left": "-100%"},1500);
        }
    });

    $(".goto-top").on('click', function () {
        $("html, body").animate({scrollTop: 0}, 400);
    });
});


var count = 0;
var button = $(".more-button-top").on("click", function(){
  count++;
  if(count%2!=0)
  {
    setTimeout(function(){
      $("#status").css("display", "flex");
      button.text("Less");
    }, 300);
    
  }
  else
  {
    setTimeout(function(){
       $("#status").css("display", "none");
    button.text("More");
    }, 300)
   
  }
})


const animateOnScroll = () => {
  const element = document.querySelector('.animate-on-scroll');
  const elementTop = element.getBoundingClientRect().top;
  const elementHeight = element.offsetHeight;
  const windowHeight = window.innerHeight;

  if (elementTop <= windowHeight - elementHeight / 2) {
    element.classList.add('animate');
    setTimeout(function(){
      element.classList.remove('animate');
    }, 800);
    $(window).off('scroll', animateOnScroll);
  }
};
$(window).on('scroll', animateOnScroll);

const OnScroll = () => {
  const element1 = document.querySelector('.on-scroll');
  const elementTop1 = element1.getBoundingClientRect().top;
  const elementHeight1 = element1.offsetHeight;
  const windowHeight1 = window.innerHeight;

  if (elementTop1 <= windowHeight1 - elementHeight1 / 2) {
    element1.classList.add('animate');
    setTimeout(function(){
      element1.classList.remove('animate');
    }, 800);
    $(window).off('scroll', OnScroll);
  }
};
$(window).on('scroll', OnScroll);


$(document).ready(function() {
  $(".print").click(function() {
    var printContent = $(".pnr-top").html();
    var originalContent = $("body").html();
    $("body").html(printContent);
    window.print();
    $("body").html(originalContent);
  });
});

// $(".source").on('input', (e)=>{
//   var source = e.target.value;
//   console.log(source);});
 var codes;
$.getJSON('Name-Code.json', function(data) {
  // store the data in a variable for later use
  codes = data;
});

$('.source').on('input', function(E) {
  // get the current value of the input field
  var userInput = E.target.value;
  // filter the codes based on the user input
  var filteredCodes = codes.filter(function(item) {
    var keys = Object.keys(item.B);
    var match = false;
    
    keys.forEach(function(key) {
      if (item[key].startsWith(userInput.toUpperCase())) {
        match = true;
      }
    });
    
    return match;
  });
  
  // create a list of options to show to the user
  var optionsList = '';
  
  filteredCodes.forEach(function(item) {
    var keys = Object.keys(item);
    keys.forEach(function(key) {
      optionsList += '<li>' + item[key] + '</li>';
    });
  });
  
  // display the list of options to the user
  console.log(optionsList);
});
