// debug purposes
function addS(string, caption, value) {
    return string + "<br>" + caption + ":\t<strong>" + value + "</strong>";
}

$(document).ready(function(){
    var nav_bar = $("div.navigation")
    var base_navigation_bottom = nav_bar.height() + nav_bar.offset().top;


    /*
        makes the left NAVIGATION BAR
        scrollable only until it's bottom is reached
        or fixed if it's size is too small to scroll
    */

    $(window).scroll(function() {
        var window_height = $(window).height();

        var scroll_status = window_height + $(window).scrollTop();
        var current_navigation_bottom = nav_bar.height() + nav_bar.offset().top; 

        if (base_navigation_bottom < window_height) {
            nav_bar.removeClass('bottom');
            nav_bar.addClass('stick');
            nav_bar.addClass('top');
        } else {
            nav_bar.removeClass('top');
            if (!$("div.navigation.stick").length) {
                if (scroll_status >= current_navigation_bottom) {
                    nav_bar.addClass('stick');
                    nav_bar.addClass('bottom');
                }
            }
            else {
                if (scroll_status <= base_navigation_bottom) {
                    nav_bar.removeClass('stick');
                    nav_bar.removeClass('bottom');
                }
            }
        }

    });

    /*
        changes the focused item on the SUPER-HERO
    */
    $("a.thumbnail").hover(function() {
        
        $("a.thumbnail").removeClass("selected");
        $(this).addClass("selected");

        
        var title = $(this).find("meta[name='title']").attr("content") || "";
        var text = $(this).find("meta[name='text']").attr("content") || "";
        var links = $(this).find("meta[name='links']").attr("content") || "[]";
        var ribbon = $(this).find("meta[name='ribbon']").attr("content") || "";

        $("div.main div.title a").text(title);

        $("div.main div.text").text(text);

        links = JSON.parse(links);
        links_html = links.map(function(e, i) {
            return "<li>\n\t<a href ='" + e["href"] + "'>" + e["label"] + "</a>\n</li>";
        }).join("\n");
        $("div.main div.links ul").html(links_html);

        if (ribbon) {
            $("div.main div.ribbon").text(ribbon);
            $("div.main div.ribbon").css("display","inline-block");
        } else {
            $("div.main div.ribbon").css("display","none");
        }


        var new_img = "url(\"" + $(this).find("img").attr("src") + "\")";
        $("div.main").css({"background": new_img});
    });


    /*
        controls the overlay mask for the 'slideshow' type articles
    */
    $("div.content_item ul li.small_article a.hover_overlay").hover(
        function() {
            $(this).find("div.overlay_mask").removeClass("hidden");
        },
        function() {
            $(this).find("div.overlay_mask").addClass("hidden");
        }
    );
});
