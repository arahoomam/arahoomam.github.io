/*=============================================
=            Some random functions            =
=============================================*/
var options = [
	{selector:"#staggered-lang", offset: 140, callback: 'showStaggeredList("#staggered-lang")'},
	{selector:"#staggered-lang1", offset: 140, callback: 'showStaggeredList("#staggered-lang1")'}
];

$(document).ready(function(){
	moveNav();
	$('.parallax').parallax();
	$('.scrollspy').scrollSpy();

	scrollFire(options);

	$("#n-p,#n-r,#n-l,#n-pr").mouseenter(nav_enter).mouseleave(nav_exit);
	
	$(function(){	
		var $window = $(window);
		var scrollTime = 0.0;
		var scrollDistance = 90;

		$window.on("mousewheel DOMMouseScroll", function(event){

			event.preventDefault();	

			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);

			TweenMax.to($window, scrollTime, {
				scrollTo : { y: finalScroll, autoKill:true },
					ease: Power1.easeOut,
					overwrite: 5							
			});
		});
	});
});

// functions for nav bar
function nav_enter(){
	$(this).transit({
			background: '#d9d9d9',
			scale: 1.05,
			duration: 100,
			easing: 'in'
	});
}

function nav_exit(){
	$(this).transit({
			background: 'white',
			scale: 1,
			duration: 100,
			easing: 'out'
	});
}

// Toasts for pictures
function photoDesc(id){
	var desc = "";

	switch(id){
		case "1pic": 
			desc = "This photo was taken right outside my house in Ojai!";
			toast(desc, 5000);
			break;

		case "2pic":
			desc = "This photo was taken at June Mountain in Northern CA winter 2015 when my family and I went skiing!";
			toast(desc, 5000);
			break;

		case "3pic":
			desc = "This photo was taken at Meditation Mount, a place with an amazing view just a few minutes from my house!";
			toast(desc, 5000);
			break;
	}
}

// moving nav to top on resize
function resize(){
	if($(document).width() < (screen.width*0.6) ){
		$(".side-nav").css({'top' : '2%'});
	}else{
		$(".side-nav").css({'top' : '31%'});
	}
}
function moveNav(){
	resize();
	$(window).resize(function(){
		resize();
	});
};