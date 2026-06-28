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
    var emailjsServiceID = 'default_service',
        emailjsTemplateID = 'template_rencs_0ypc68h',
        $email = $('#contact-email'),
        $message = $('#contact-message'),
        $submit = $('#contact-submit'),
        $emailError = $('#email-error'),
        $messageError = $('#message-error'),
        $captchaError = $('#captcha-error');

    if (window.emailjs) {
        emailjs.init('sWNprp7XA8KpG7MNg');
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function showError($error, show) {
        $error.prop('hidden', !show);
    }

    function translateContactText(text) {
        if (lang && typeof lang.translate === 'function') {
            return lang.translate(text);
        }

        return text;
    }

    function validateContactForm(showErrors) {
        var hasValidEmail = isValidEmail($email.val()),
            hasMessage = $.trim($message.val()).length > 0,
            hasCaptcha = !$submit.prop('disabled');

        if (showErrors) {
            showError($emailError, !hasValidEmail);
            showError($messageError, !hasMessage);
            showError($captchaError, !hasCaptcha);
        }

        return hasValidEmail && hasMessage && hasCaptcha;
    }

    $email.on('blur input', function (event) {
        validateContactForm(event.type === 'blur' || $emailError.is(':visible'));
    });

    $message.on('blur input', function (event) {
        validateContactForm(event.type === 'blur' || $messageError.is(':visible'));
    });

    $form.on('keyup', '#captchaInput', function () {
        if ($captchaError.is(':visible')) {
            validateContactForm(true);
        }
    });

    $form.submit(function (event) {
        event.preventDefault();

        if (!validateContactForm(true)) {
            return;
        }

        if (!window.emailjs) {
            alert(translateContactText('Could not load the e-mail service. Please try again later.'));
            return;
        }

        $submit.prop('disabled', true);

        emailjs.sendForm(emailjsServiceID, emailjsTemplateID, this)
            .then(function () {
                alert(translateContactText('Sent!'));
                $form[0].reset();
                showError($emailError, false);
                showError($messageError, false);
                showError($captchaError, false);
                $form.captcha();
            }, function (err) {
                alert(JSON.stringify(err));
                $submit.prop('disabled', false);
            })
            .then(function () {
                validateContactForm(false);
            });
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
