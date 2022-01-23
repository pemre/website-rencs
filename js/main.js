$(document).ready(function () {

    "use strict";

    var $window = $(window),
        sections = $("section, footer"),
        navigation_links = $("#main-nav-wrap li a"),
        topBar = $('header'),
        $menuLang = $('.menu-lang'),
        $linkGoTop = $('#go-top'),
        $textLogo = $('.logo > span'),
        $form = $("#mc-form");

    /** ----------------------------------------------------
     *   Sticky navigation & Back to top
     *  ---------------------------------------------------- */
    $window.on('scroll', function () {
        //Sticky navigation
        var y = $window.scrollTop();
        if (y > 1) {
            topBar.addClass('sticky');
            $menuLang.addClass('fill-back');
            $textLogo.fadeIn();
        } else {
            topBar.removeClass('sticky');
            $menuLang.removeClass('fill-back');
            $textLogo.fadeOut();
        }
        // Back to top button
        if (y > 300)
            $linkGoTop.fadeIn();
        else
            $linkGoTop.fadeOut();
    });

    /** ----------------------------------------------------
     *   Mobile Menu
     *  ---------------------------------------------------- */
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation');

    toggleButton.on('click', function (event) {
        event.preventDefault();
        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
    });

    if (toggleButton.is(':visible')) nav.addClass('mobile');

    $window.resize(function () {
        if (toggleButton.is(':visible')) nav.addClass('mobile');
        else nav.removeClass('mobile');
    });

    navigation_links.on("click", function () {
        if (nav.hasClass('mobile') && !$(this).parent().hasClass('menu-lang-container')) {
            toggleButton.toggleClass('is-clicked');
            nav.fadeOut();
        }
    });

    /** ----------------------------------------------------
     *   Highlight the current section in the navigation bar
     *  ---------------------------------------------------- */
    sections.waypoint({

        handler: function (direction) {
            var active_section;

            if (this.element.id == 'contact')
                active_section = $('footer#' + this.element.id);
            else
                active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prevAll("section:first");

            var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");
        },
        offset: '45%'
    });

    /** ----------------------------------------------------
     *   Smooth Scrolling
     *  ---------------------------------------------------- */
    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });

    });

    /** ----------------------------------------------------
     *   Placeholder Plugin Settings
     *  ---------------------------------------------------- */
    $('input, textarea, select').placeholder();

    /** ----------------------------------------------------
     *   Modal Popup
     *  ---------------------------------------------------- */
    $('a.popup').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'
    });

    $(document).on('click', '.close-popup', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    /** ----------------------------------------------------
     *   Language Menu
     *  ---------------------------------------------------- */
    $('.menu-lang-container').hover(
        function () {
            $menuLang.stop().slideDown(100);
        },
        function () {
            $menuLang.stop().slideUp(100);
        }
    ).click(function () {
        $menuLang.stop().slideDown(100);
    });

    /** ----------------------------------------------------
     *   Language Plugin
     *  ---------------------------------------------------- */
    var lang = new Lang();
    lang.dynamic('tr', 'i18n/tr.json');
    lang.init({defaultLang: 'en'});

    var menuItems = $('.menu-lang span');
    menuItems.click(function () {
        lang.change(this.id);
        $('.menu-lang-container a').text(this.innerText);
        menuItems.show();
        $(this).hide();
    });

    /** ----------------------------------------------------
     *   Captcha Plugin
     *  ---------------------------------------------------- */
    $form.captcha();

    /** ----------------------------------------------------
     *   Contact Form
     *  ---------------------------------------------------- */
    // Variable to hold request
    var request;
    // Bind to the submit event of our form
    $form.submit(function (event) {
        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: "../message/send.php",
            type: "post",
            data: serializedData
        });

        // Callback handler that will be called on success
        request.done(function (/*response, textStatus, jqXHR*/) {
            $form.captcha();
            $('#mc-form input[type=email], #mc-form input[type=text], #mc-form textarea').val("");
            $.magnificPopup.open({
                items: {
                    src: '#message',
                    type: 'inline'
                }
            });
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {
            // Log the error to the console
            console.error(
                "The following error occurred: " +
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });

        // Prevent default posting of form
        event.preventDefault();
    });

    /** ----------------------------------------------------
     *   Lazy load images
     *  ---------------------------------------------------- */
    $('img.lazy').lazyload();

    /** ----------------------------------------------------
     *   Preloader
     *  ---------------------------------------------------- */
    // will first fade out the loading animation
    $("#loader").fadeOut("fast", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(100).fadeOut("fast", function () {

            /** ----------------------------------------------------
             *   Filtr Plugin
             *  ---------------------------------------------------- */
            $('.filtr-container').filterizr({
                animationDuration: 0.2,
                filter: '2'
            });
            var worksButtons = $('.works-content > a');
            worksButtons.click(function () {
                worksButtons.addClass('button-primary');
                $(this).toggleClass('button-primary');
            });

        });
    });
});
