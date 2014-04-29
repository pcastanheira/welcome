/**
 *
 * welcome.js by pcosta
 */

App.WelcomeView = Backbone.View.extend({
    el: window,
    value: null, // ???
    checkWin: String, // verifica a orientação do browser
    //id: String, // o id dos buttons
    subMenuId: String, // os ids dos sub-menus
    //n: 0,   // o estado da tab (open ou close)
    lastStatus: 0, // o last status da tab
    initState: true,
    timer: null,
    initialize: function() {

        var __this = this;

        App.vent.on('state:event', function(event) {
            __this.stateHandler(event);
        });

        var $wrapperText = $('.wrapper-text');
        $wrapperText.css('display', 'none');

        //resize browser timeout
        var timer;

    },
    events: {
        //'resize': 'resizeHandler'
    },
    render: function() {

    },
    resizeHandler: function(event) {

    },
    checkSize: function() {
        var winW = $(window).width();
        var winH = $(window).height();
        var maxWin = Math.max(winH, winW);

        if (winH < maxWin) {
            this.checkWin = 'horizontal';
        } else {
            this.checkWin = 'vertical';
        }
    },
    vegasIn: function(val) {

        var __this = this;
        var arrayImages = null;
        var $backImage = $('#backImage');
        var $imgText = $('.img-text');
        var $body = $('body');

        var arrayW = JSON.stringify([
            {url: '../images/wit_welcome_1.jpg', color: '#F54060', text: 'DIZ SIM MAIS VEZES4'},
            {url: '../images/wit_welcome_2.jpg', color: '#4DB6F7', text: 'DIZ SIM MAIS VEZES5'},
            {url: '../images/wit_welcome_2.jpg', color: '#4DB6F7', text: 'DIZ SIM MAIS VEZES6'}
        ]);

        var arrayH = JSON.stringify([
            {url: '../images/wit_welcome_3.jpg', color: '#E25B44', text: 'DIZ SIM MAIS VEZES1'},
            {url: '../images/wit_welcome_3.jpg', color: '#E25B44', text: 'DIZ SIM MAIS VEZES2'},
            {url: '../images/wit_welcome_3.jpg', color: '#E25B44', text: 'DIZ SIM MAIS VEZES3'}
        ]);

        var objW = JSON.parse(arrayW);
        var objH = JSON.parse(arrayH);

        if (val === null) {
            var winW = $(window).width();
            var winH = $(window).height();

            if (winW < winH) {
                arrayImages = objW;
            } else {
                arrayImages = objH;
            }
        } else if (val === 'vertical') {
            arrayImages = objW;
        } else if (val === 'horizontal') {
            arrayImages = objH;
        } else {
            alert('No specific value found.');
        }

        var i = Math.floor(Math.random() * 3);

        if (arrayImages !== null) {
            $backImage.css('background', 'url(' + arrayImages[i].url + ') no-repeat center center fixed');
            $backImage.fadeIn(1000);
            $imgText.html('<p style="text-align:center">' + arrayImages[i].text + '<p>');
            $body.css({'background-color': arrayImages[i].color});
        }
        __this.centerElements();
    },
    updateSize: function(view) {
        view.checkSize();

        if (view.value !== view.checkWin) {
            view.value = view.checkWin;
            view.vegasIn(view.value);
        }

        return false;
    },
    centerElements: function() {
        var theWindow = $(window),
                $bg = $("#backImage"),
                aspectRatio = $bg.width() / $bg.height(),
                $formWrapper = $('.form-wrapper'),
                $wrapperText = $('.wrapper-text');


        if ((theWindow.width() / theWindow.height()) < aspectRatio) {
            $bg.removeClass().addClass('bi-height');
        } else {
            $bg.removeClass().addClass('bi-width');
        }

        $wrapperText.css({
            'position': 'absolute',
            'left': (theWindow.width() - $wrapperText.outerWidth()) / 2,
            'top': (theWindow.height() - $wrapperText.outerHeight()) / 2
        });
        $wrapperText.fadeIn(1000);
    },
    closeTab: function() {
        this.toggleTab(0);
    },
    toggleTab: function(n) {
        var __this = this;

        if (parseInt(n) !== parseInt(this.lastStatus)) {
            var $menuClose = $('#menuClose');
            var $menuMore = $('#menuMore');
            var $menuLogin = $('#menuLogin');
            var $wrapperText = $('.wrapper-text');

            var winW = $(window).width();
            var outW = $wrapperText.outerWidth();

            if (n === 1) {
                $('#backImage').delay(100).animate({left: '-300px'}, 500);
                $wrapperText.delay(70).animate({left: ((winW - 300) - outW) / 2}, 400);
                $('.menu').delay(100).animate({right: '55px'}, 500);
                $('.menu-btn').animate({color: '#4FC4FF'}, 1000);
                $('.tab').delay(100).animate({right: '0'}, 500, function() {
                    $menuClose.css({'visibility': 'visible'});
                    $menuClose.bind('click', function() {
                        __this.toggleTab(0);
                    });
                });
            } else if (n === 0) {
                //clear icon classes
                $menuMore.removeClass('wit-th-circle-open');
                $menuLogin.removeClass('wit-user-circle-open');
                $menuMore.addClass('wit-th-circle');
                $menuLogin.addClass('wit-user-circle');

                $menuClose.css({'visibility': 'hidden'});
                $('#backImage').animate({left: '0'}, 500);
                $wrapperText.delay(200).animate({left: (winW - outW) / 2}, 400);
                $('.menu').delay(100).animate({right: '-55px'}, 500);
                $('.menu-btn').animate({color: '#ffffff'}, 1000);
                $('.tab').delay(100).animate({right: '-300px'}, 500, function() {
                    $('#menuMore').bind('click', function(evt) {
                        __this.tabContent(evt.target.id);
                        __this.toggleTab(1);
                    });
                    $('#menuLogin').bind('click', function(evt) {
                        __this.tabContent(evt.target.id);
                        __this.toggleTab(1);
                    });
                });
            } else {
                alert('No specific value found for toggleTab.');
            }
        }

        this.lastStatus = n;
    },
    tabContent: function(id) {
        var __this = this;
        var $about = $('.about');
        var $login = $('.login');
        var $menuMore = $('#menuMore');
        var $menuLogin = $('#menuLogin');
        var $menuClose = $('#menuClose');

        var state;

        $about.css({'visibility': 'hidden'});
        $login.css({'visibility': 'hidden'});

        if (id === 'menuMore') {
            state = $about.css('visibility');
            switch (state) {
                case 'visible':
                    $about.css({visibility: 'hidden'});
                    $login.css({visibility: 'visible'});
                    $menuLogin.unbind('click');
                    $menuMore.bind('click', function(evt) {
                        __this.tabContent(evt.target.id);
                        __this.toggleTab(1);
                    });

                    if ($menuMore.attr('class') === 'wit-th-circle-open') {
                        $menuMore.removeClass('wit-th-circle');
                        $menuMore.addClass('wit-th-circle-open');
                        $menuLogin.removeClass('wit-user-circle-open');
                        $menuLogin.addClass('wit-user-circle');
                    }

                    break;
                case 'hidden':
                    $about.css({visibility: 'visible'});
                    $login.css({visibility: 'hidden'});
                    $menuMore.unbind('click');
                    $menuLogin.bind('click', function(evt) {
                        __this.tabContent(evt.target.id);
                        __this.toggleTab(1);
                    });

                    if ($menuMore.attr('class') === 'wit-th-circle') {
                        $menuMore.removeClass('wit-th-circle');
                        $menuMore.addClass('wit-th-circle-open');
                        $menuLogin.removeClass('wit-user-circle-open');
                        $menuLogin.addClass('wit-user-circle');
                    }

                    break;
                default :
                    alert('No specific value found for About visibility.');
            }
        } else if (id === 'menuLogin') {
            state = $login.css('visibility');
            switch (state) {
                case 'visible':
                    $login.css({visibility: 'hidden'});
                    $about.css({visibility: 'visible'});
                    $menuMore.unbind('click');
                    $menuLogin.bind('click', function(evt) {
                        __this.tabContent(evt.target.id);
                        __this.toggleTab(1);
                    });
                    $menuClose.bind('click', function(evt) {
                        __this.toggleTab(0);
                    });

                    if ($menuLogin.attr('class') === 'wit-user-circle-open') {
                        $menuLogin.removeClass('wit-user-circle-open');
                        $menuLogin.addClass('wit-user-circle');
                        $menuMore.removeClass('wit-th-circle');
                        $menuMore.addClass('wit-th-circle-open');
                    }

                    break;
                case 'hidden':
                    $login.css({visibility: 'visible'});
                    $about.css({visibility: 'hidden'});
                    $menuLogin.unbind('click');
                    $menuMore.bind('click', function(evt) {
                        __this.tabContent(evt.target.id);
                        __this.toggleTab(1);
                    });
                    $menuClose.bind('click', function(evt) {
                        __this.toggleTab(0);
                    });
                    //add icons
                    if ($menuLogin.attr('class') === 'wit-user-circle') {
                        $menuLogin.removeClass('wit-user-circle');
                        $menuLogin.addClass('wit-user-circle-open');
                        $menuMore.removeClass('wit-th-circle-open');
                        $menuMore.addClass('wit-th-circle');
                    }

                    break;
                default :
                    alert('No specific value found for Login visibility.');
            }
        } else {
            alert('No specific value found for tabContent.');
        }
    },
    bigTab: function(subMenuId) {
        
        //debugger;
        
        var __this = this;
        var $menuBack = $('#menuBack');
        var $about = $('.about');
        var $infoWrapper = $('.info-wrapper');

        var $window = this.$el;

        $window.unbind('resize');

        $('.menu-login, .menu-more, .menu-close').fadeOut(1000);

        $('.tab').delay(100).animate({width: '100%'}, 700, function() {
            $menuBack.fadeIn(1300);
            $infoWrapper.fadeIn(1300);
        });

        $about.delay(100).animate({opacity: '0'}, 300, function() {
            $menuBack.bind('click', function() {
                $infoWrapper.fadeOut(300);
                $.when($menuBack.fadeOut(300)).done(function() {
                    $('.tab').delay(100).animate({'width': '300px', 'right': '0'}, 700, function() {
                        $about.delay(100).animate({opacity: '1'}, 300);
                        __this.submenuBinds();
                        $window.bind('resize', {view: __this}, __this.dragWindow);
                    });
                    $('.menu-login, .menu-more, .menu-close').fadeIn(500);
                });
            });
        });


        var infoView = new App.InfoView({value: subMenuId});

    },
    signAction: function() {
        $('.bottom').delay(100).slideToggle(500);
    },
    menuBinds: function() {
        var __this = this;
        var $menuBtn = $('.menu-btn');

        $menuBtn.bind('click', function(evt) {
            if (evt.target.id !== 'menuClose' && evt.target.id !== 'menuBack') {
                __this.tabContent(evt.target.id);
                __this.toggleTab(1);

            } else if (evt.target.id === 'menuClose') {
                $('#menuClose').css({'visibility': 'hidden'});

                __this.toggleTab(0);
            } else if (evt.target.id === 'menuBack') {
                __this.bigTab(evt.target.id);
            }

            $menuBtn.unbind('click');
        });
    },   
    animatedHover: function(element, animation, time) {
            element.addClass('animated ' + animation);
            window.setTimeout(function() {
                element.removeClass('animated ' + animation);
            }, time ? time : 1000);
    },   
    submenuBinds: function() {
        var __this = this;
        var $subMenuBtn = $('.submenu-btn');

        //about events
        $subMenuBtn.hover(function(evt) {
            var element = evt.target.id;
            var $element = null;
            var animationType = null;

            switch (element) {
                case 'menuPeople' :
                    $element = $('#menuPeople');
                    animationType = 'fadeInLeft';
                    __this.animatedHover($element,animationType);
                    break;
                case 'menuBusiness' :
                    $element = $('#menuBusiness');
                    animationType = 'fadeInDown';
                    __this.animatedHover($element,animationType);
                    break;
                case 'menuNpo' :
                    $element = $('#menuNpo');
                    animationType = 'fadeInUp';
                    __this.animatedHover($element,animationType);
                    break;
                case 'menuDevelopers':
                    $element = $('#menuDevelopers');
                    animationType = 'fadeInRight';
                    __this.animatedHover($element,animationType);
                    break;
                default :
                    console.log('no element chosen');
            }
            evt.stopPropagation();
        });
     
        $subMenuBtn.bind('click', function(event) {
            $subMenuBtn.unbind('click');
            //debugger;
            console.log('unbind click');            
            __this.bigTab(event.target.id);
            event.stopImmediatePropagation();
        });
    },
    dragWindow: function(event) {
        var __this = event.data.view;

        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            __this.updateSize(__this);

            if (!__this.initState) {
                __this.closeTab();
            }
            __this.initState = false;
        }, 100);
    },
    stateHandler: function(info) {

        switch (info) {
            case 'about' :
                this.tabContent('menuMore');
                this.toggleTab(1);
                $('.wrapper-text').css('display', 'block');
                break;
            case 'login' :
                this.tabContent('menuLogin');
                this.toggleTab(1);
                $('.wrapper-text').css('display', 'block');
                break;
            case 'sign-up' :
                //TODO CLEAR STATE
                this.signAction();
                break;
            case 'info-people' :
                this.toggleTab(1);
                this.bigTab('menuPeople');
                break;
            case 'info-business' :
                this.toggleTab(1);
                this.bigTab('menuBusiness');
                break;
            case 'info-npo' :
                this.toggleTab(1);
                this.bigTab('menuNpo');
                break;
            case 'info-developers' :
                this.toggleTab(1);
                this.bigTab('menuDevelopers');
                break;
            default :
                alert('no value specified');
        }

    }
});
