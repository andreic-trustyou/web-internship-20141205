$(document).ready(function(){
    $(window).scroll(function() {
        var scroll_status = $(window).height() + $(window).scrollTop();
        var navigation_height = $("div.navigation").height() + $("div.navigation").offset().top ; 
        
        console.log("scroll_status:\t" + scroll_status);
        console.log("nav_height:\t" + navigation_height);

        if (scroll_status >= navigation_height) {
            $('div.navigation').addClass('stick');
        } else {
            $('div.navigation').removeClass('stick');
        }
    });

});
