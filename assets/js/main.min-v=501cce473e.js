if (switcherActive) {
    var scolors = ["orange", "purple", "green", "pink", "blue"],
        pcolors = ["dark", "light"],
        secColor = localStorage.getItem("sec-color"),
        priColor = localStorage.getItem("pri-color");
    $("body").addClass(null == secColor ? "orange" : secColor), $("body").addClass(null == priColor ? "dark" : priColor), $(".secondary-colors .circular-selector").on("click", function(e) {
        scolors.forEach(function(e) {
            $("body").hasClass(e) && $("body").removeClass(e)
        });
        var a = $(e.delegateTarget).data("value");
        $("body").addClass(a), localStorage.setItem("sec-color", a)
    }), $(".primary-colors .circular-selector").on("click", function(e) {
        pcolors.forEach(function(e) {
            $("body").hasClass(e) && $("body").removeClass(e)
        });
        var a = $(e.delegateTarget).data("value");
        $("body").addClass(a), localStorage.setItem("pri-color", a)
    })
}
$("#horizontal-navbar .search-panel-toggle, #main-navbar.only-mob .search-panel-toggle").on("click", function() {
    $("#search-sidebar").toggleClass("visible")
}), $("#main-navbar .secondary-bar").hover(function(e) {
    $(e.delegateTarget).prev().addClass("active")
}, function(e) {
    $(e.delegateTarget).prev().removeClass("active")
}), $("#main-navbar").hover(function() {
    $("#main-content, footer, #instafeed").addClass("menu-activated")
}, function() {
    $("#main-content, footer, #instafeed").removeClass("menu-activated"), $(".collapse-menu").collapse("hide")
}), 


$(".nav-mob-menu").on("click", function() {
$('#menu-icon i').toggleClass('fa-times fa-bars');
$("#main-navbar").toggleClass("nav-visible"), 
$("#main-navbar").toggleClass("slideInRight animated")
}), 

$(document).on("click",function(e) {
                    
    var container = $(".nav-mob-menu");
                       
       if (!container.is(e.target) && container.has(e.target).length === 0) { 
        $("#main-navbar").toggleClass("fadeOut")              
       }
});





$(".navbar-item.collapsable-item").click(function(e) {
    $(e.delegateTarget).find(".collapse, .collapsing").collapse("show")
}, function(e) {
    $(e.delegateTarget).find(".collapse, .collapsing").collapse("hide")
}), 
$(".collapse-menu").on("shown.bs.collapse", function(e) {
    0 == $("#main-navbar:hover").length && $(e.delegateTarget).collapse("hide")
}), 



$(".carousel").carousel({
    interval: 5e3
}), $("#featured-carousel").on("slide.bs.carousel", function(e) {
    var a = $("#featured-carousel-indicators .indicators .list-group-item");
    $(a[e.from]).removeClass("active"), $(a[e.to]).addClass("active")
});
var masonryLayout = $(".post-loop").packery({
    itemSelector: ".grid-item",
    columnWidth: ".grid-sizer",
    gutter: ".gutter-sizer",
    percentPosition: !0,
    resize: !1,
    stagger: 0,
    transitionDuration: 0
});
// Hide header on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('nav').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If scrolled down and past the navbar, add class .nav-up.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('nav').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('nav').removeClass('nav-up').addClass('nav-down');
        }
    }
  
    lastScrollTop = st;
}
$(".carousel").each(function() {
    var e = $(this),
        a = new Hammer(this, {
            recognizers: [
                [Hammer.Swipe, {
                    direction: Hammer.DIRECTION_HORIZONTAL
                }]
            ]
        });
    a.on("swipeleft", function() {
        e.carousel("next")
    }), a.on("swiperight", function() {
        e.carousel("prev")
    })
});
var cssImageLazyLoad = new LazyLoad({
    elements_selector: ".lazy"
});
$("#search-field").ghostHunter({
    results: "#search-results",
    onKeyUp: !0,
    onPageLoad: !1,
    result_template: "<a href='{{link}}' id='gh-{{ref}}' class='gh-search-item media post-presentation'><div class='media-body'><h6>{{title}}</h6><p>{{pubDate}}</p></div></a>",
    info_template: "<p>Number of posts found: <span>{{amount}}</span>.</p>",
    indexing_start: function() {
        $("#search-sidebar").addClass("searching"), $("#search-field").prop("disabled", !0)
    },
    indexing_end: function() {
        $("#search-sidebar").removeClass("searching"), $("#search-field").prop("disabled", !1)
    }
}), AOS.init({
    once: !0,
    delay: 250,
    duration: 500
}), $(function(e) {
    e(".load-more > a").click(function(e) {
        e.preventDefault()
    });
    var a = 1,
        o = window.location.pathname,
        n = (e(document), e(".post-loop"), !1);
    e(".load-more").on("click", function() {
        if (l = /(?:page\/)(\d)(?:\/)$/i, (r = (r = o).replace(/#(.*)$/g, "").replace("////g", "/")).match(l) && (a = parseInt(r.match(l)[1]), r = r.replace(l, "")), o = r, !(n || a >= maxPages)) {
            a + 1 >= maxPages && e(".load-more > a").text(endMessage), n = !0;
            var t = o + "page/" + (a += 1) + "/";
            console.log(t), e.get(t, function(e) {
                var a = document.createRange().createContextualFragment(e).querySelectorAll(".grid-item");
                a.length && [].forEach.call(a, function(e) {
                    masonryLayout.append(e).packery("appended", e), cssImageLazyLoad.update()
                })
            }).fail(function(a) {
                404 === a.status && e(".load-more > a").text(endMessage)
            }).always(function() {
                n = !1
            })
        }
        var r, l
    })
});
var waitForFinalEvent = function() {
    var e = {};
    return function(a, o, n) {
        n || (n = "Don't call this twice without a uniqueId"), e[n] && clearTimeout(e[n]), e[n] = setTimeout(a, o)
    }
}();

/*
$(window).resize(function() {
    $("#main-navbar").removeClass("slideInRight"), waitForFinalEvent(function() {
        masonryLayout.packery()
    }, 500, ""), 
    $("#main-navbar").removeClass("nav-visible")
  

}); 
*/
$(".nav-mob-menu, .search-panel-toggle").click(function(e) {
    e.preventDefault()
});

