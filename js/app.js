var sortedData = data.sort(function(obj1, obj2) {
  // sort from smallest to largest
  return obj1.order - obj2.order;
});

var populate = sortedData.map(item => {
  var href = "s"+item.id;
  return ('<div class="timeline__block"><div class="timeline__content-holder"><a class="timeline__content" href="#'+href+'"><h2 class="timeline__title">'+item.title+'</h2><time>'+item.time+'</time>'+item.short_text+'</a><div class="morphingmodal" aria-hidden="true"><div class="morphingmodal__content container"><button class="morphingmodal--close"></button><h2>'+item.title+'</h2>'+item.long_text+'</div></div></div></div>');
});

document.getElementById("timeline").innerHTML = populate.join("");

window.addEventListener('hashchange', router);

function router(){
  var hash = (window.location.hash).replace('#', '');
  
  if(hash.length == 0){
    // close modal
    console.log("close modal");
    findAndCloseOpenModal();
  } else {
    // open modal
    console.log("open modal");
    openModalByHash(hash);
  }
}

/*
$(window).bind("hashchange", function(event) {
  if(event.target.location.hash.substring(1)){
    openModalByHash(event.target.location.hash.substring(1));
  }
});
*/

function openModalByHash(hash){
  var elem = $("a[href*=#"+hash+"]");
  var target = $(elem).closest("div").find('.morphingmodal');
  openMorphingModal(target);
}

// check hash on load for hash
window.onload = function(){
  var hash = (window.location.hash).replace('#', '');
  if (hash.length == 0) {} else {
    openModalByHash(hash);
  }
}

// set height / width on all timeline__content-holder blocks
$(window).load(function() { //$( document ).ready(function() {
  var elem =  $('.timeline__content-holder');
  calculateElementSize(elem);
});

function calculateElementSize(elems){
   $(elems).each(function(i, obj) {
    var size = obj.getBoundingClientRect();  
    $(this).css({
        width: size.width,
        height: size.height
      });
  });
}



/* In view code */ 

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

var items = document.querySelectorAll(".timeline .timeline__content-holder");

// code for the isElementInViewport function

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add("in-view");
    }
  }
}

window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);


/* /In view code */ 

/* Morphing main code */

// close modal trigger
$('.morphingmodal--close').click(function(){
  findAndCloseOpenModal();
});


function openMorphingModal(modal){
  var modalParent = $(modal).parent(),
      modalParentPos = modalParent.get(0).getBoundingClientRect();

    var left = modalParentPos.left,
        top = modalParentPos.top,
        width = modalParentPos.width,
        height = modalParentPos.height;

    $(modal).css({
      transition : 'none',
      position:'fixed',
      top:top,
      left:left,
      width:width,
      height:height
    });

    $(modal).attr("aria-hidden","false");

    $("body").addClass("no-scroll");

    setTimeout(function() {
      $(modal).css({
        transition : 'width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s'
      });

      modalParent.addClass("open");

      $(modal).css({
        top:0,
        left:0,
        height: '100%',
        width: '100%',
      });
    }, 10);

   setTimeout(function() {
      $(modal).css({
        overflowY: 'scroll'
      });
    }, 600);
}

var findAndCloseOpenModal = function(){
  $('.morphingmodal').each(function(i, obj) {
    var open = $(obj).attr('aria-hidden') === 'false' ? true : false;
    if(open){  
      closeMorphingModal(obj);
    }
  });
}


function closeMorphingModal(modal){
  var modalParent = $(modal).parent(),
      modalParentPos = modalParent.get(0).getBoundingClientRect();

    var left = modalParentPos.left,
        top = modalParentPos.top,
        width = modalParentPos.width,
        height = modalParentPos.height;

    // close 
    window.location.hash = "_";  
  //history.pushState(null, null,  window.location.pathname);
    //history.pushState("", document.title, window.location.pathname + window.location.search);

    $(modal).css({
      position:'fixed',
      top:top,
      left:left,
      width: width,
      height: height,
      overflow: 'hidden'
    });

    $(modal).addClass("closing");

    setTimeout(function() {
      $(modal).css({
        transition : 'width 0.4s 0.1s, height 0.4s 0.1s, top 0.4s 0.1s, left 0.4s 0.1s, margin 0.4s 0.1s'
      });
    }, 100);

    setTimeout(function(){
      modalParent.removeClass("open");
      $("body").removeClass("no-scroll");
      $(modal).removeClass("closing");
    }, 500);
}


 $(document).ready(function () {
  $('.modal').on('show.bs.modal', function () {
      if ($(document).height() > $(window).height()) {
          // no-scroll
          $('body').addClass("modal-open-noscroll");
      }
      else {
          $('body').removeClass("modal-open-noscroll");
      }
  });

   $('.modal').on('hide.bs.modal', function () {
      $('body').removeClass("modal-open-noscroll");
  });
})


document.addEventListener( 'keydown', function( ev ) {
  var keyCode = ev.keyCode || ev.which;
  if( keyCode === 27 ) {
    findAndCloseOpenModal();
  }
});


// Event test
// Add an event listener
document.addEventListener("name-of-event", function(e) {
  console.log(e.detail); // Prints "Example of an event"
});

// Create the event
var event = new CustomEvent("name-of-event", { "detail": "Example of an event" });

// Dispatch/Trigger/Fire the event
document.dispatchEvent(event);

// End event test