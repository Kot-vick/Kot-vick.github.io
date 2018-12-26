'use strict';

//Global Vars
var $window = $(window);
var $document = $(document);
var $body = $('body');
var $html = $('html');
var $wrapper = $('.wrapper');
var $overlay = $('.overlay');
var $header = $('.header');
var $main = $('.cabinet');
var $btnFloat = $document.find('.js-btn-floating');

/**

 * Base.js

 *

 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>

 */

$(function () {

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    var isChrome = !!window.chrome && !isOpera;

    var isExplorer = typeof document !== 'undefined' && !!document.documentMode && !isEdge;

    var isFirefox = typeof window.InstallTrigger !== 'undefined';

    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isChrome) {

        $('html').addClass('is-chrome');
    } else if (isSafari) {

        $('html').addClass('is-safari');
    } else if (isFirefox) {

        $('html').addClass('is-firefox');
    } else {}
});

var Base = {

    init: function init() {

        this.removePreloader();

        // this.accordeon();

        // this.checkbox();

        this.tab();

        this.listToggle();

        this.copyText();

        this.ownerPhone();

        this.changeCity();

        this.slider();

        this.catalogItemSlider();

        this.headerSearchBtn();

        // this.dropdown.init();

        this.select.init();

        this.inputs.init();

        this.buttons.init();

        this.popup.init();

        // this.form.init();


        //Init modules

        // Tab.init();


        // let s = new Select();

        // s.init();


        if ($(window).width() > 768) {

            this.scrollBar();
        } else {}

        // this.menu.hamburgerBtn();

        // this.menu.clickOuside();

        // this.menu.searchBtnOpenClose();

        //Stop drag Img

        $('img').on('dragstart', function (e) {

            e.preventDefault();
        });
    },

    scrollBar: function scrollBar() {

        var scrollBar = $('.js-scroll');

        if (scrollBar.length) {

            scrollBar.niceScroll({

                cursorcolor: '#585a59',

                // horizrailenabled: false,

                // autohidemode: false,

                boxzoom: false,

                verge: 500,

                cursorwidth: '2px',

                cursorborder: 'none',

                cursorborderradius: '2'

            });

            scrollBar.on('mouseover mousedown', function () {

                $(this).getNiceScroll().resize();
            });
        }
    },

    //Remove preloader

    removePreloader: function removePreloader() {

        setTimeout(function () {

            $('body').removeClass('loading loading-animation');
        }, 1000);
    },

    //Custom checbox & checkboxPseudo

    // checkbox: function() {

    //     $document.on('click', '.js-bb-checkbox', function(e) {

    //         if (

    //             $(this)

    //                 .find('input')

    //                 .is(':checked')

    //         ) {

    //             $(this).addClass('is-checked');

    //         } else {

    //             $(this).removeClass('is-checked');

    //         }

    //     });


    //     //BB checkbox pseudo

    //     $document.on('click', '.js-bb-checkbox--pseudo', function() {

    //         if ($(this).hasClass('is-checked')) {

    //             $(this).removeClass('is-checked');

    //         } else {

    //             $(this).addClass('is-checked');

    //         }

    //     });


    //     //Select All Checkbox

    //     $document.on('click', '.js-bb-checkbox-select-all', function() {

    //         if ($(this).hasClass('is-selected')) {

    //             $(this)

    //                 .removeClass('is-selected')

    //                 .parent()

    //                 .find('.js-bb-checkbox')

    //                 .removeClass('is-checked')

    //                 .find('input')

    //                 .removeAttr('checked');

    //         } else {

    //             $(this)

    //                 .addClass('is-selected')

    //                 .parent()

    //                 .find('.js-bb-checkbox')

    //                 .addClass('is-checked')

    //                 .find('input')

    //                 .prop('checked', 'checked');

    //         }

    //         return false;

    //     });

    // },

    //Custom accordeon

    // accordeon: function() {

    //     let $accordeon = $('.js-bb-accordeon');


    //     if ($accordeon.length) {

    //         $accordeon.find('.bb-accordeon__content').slideUp();

    //         $accordeon.find('.bb-accordeon__item').each(function() {

    //             if ($(this).hasClass('is-open')) {

    //                 $(this)

    //                     .find('.bb-accordeon__content')

    //                     .slideDown();

    //             }

    //         });

    //     }


    //     //Accordeon collapse

    //     $document.on('click', '.js-bb-accordeon .bb-accordeon__title', function(

    //         e

    //     ) {

    //         let $parent = $(this).closest('.js-bb-accordeon');

    //         let $item = $(this).parent('.bb-accordeon__item');


    //         if ($parent.data('accordeon') === 'collapse') {

    //             if ($item.hasClass('is-open')) {

    //                 $item

    //                     .removeClass('is-open')

    //                     .find('.bb-accordeon__content')

    //                     .slideUp();

    //             } else {

    //                 $parent

    //                     .find('.bb-accordeon__item')

    //                     .removeClass('is-open')

    //                     .find('.bb-accordeon__content')

    //                     .slideUp();

    //                 $item

    //                     .addClass('is-open')

    //                     .find('.bb-accordeon__content')

    //                     .slideDown();

    //             }

    //         } else {

    //             if ($item.hasClass('is-open')) {

    //                 $item

    //                     .removeClass('is-open')

    //                     .find('.bb-accordeon__content')

    //                     .slideUp();

    //             } else {

    //                 $item

    //                     .addClass('is-open')

    //                     .find('.bb-accordeon__content')

    //                     .slideDown();

    //             }

    //         }

    //     });

    // },

    listToggle: function listToggle() {

        if ($('.js-list').length) {
            var listToggle = function listToggle() {

                var list = $('.js-list');

                var checkbox = list.find('.js-bb-checkbox');

                var workList = list.find('.js-list-toggle');

                checkbox.on('click', function () {

                    if (checkbox.hasClass('is-checked')) {

                        workList.removeAttr('style');
                    } else {

                        workList.css('display', 'none');
                    }
                });
            };

            listToggle();
        }
    },

    //Copy text click link

    copyText: function copyText() {

        var cb = new Clipboard('.js-user-link');

        //if has input then copy input value in data attr

        $document.find('.js-input').each(function () {

            var $inputBox = $(this).closest('.js-input-box');

            var $inputIcon = $inputBox.find('.bb-input__icon');

            var $btnReset = $inputBox.find('.js-input--clear');

            var $hint = $(this).closest('.js-search').find('.search__hint');

            $(this).on('keyup', function () {

                var $parent = $(this).closest('.js-input-block');

                var btn = $parent.find('.js-user-link');

                var $btnData = $(this).data('clipboard-text');

                var $inputVal = $(this).val();

                btn.attr('data-clipboard-text', $btnData + $inputVal);
            }).on('focus', function () {

                if ($(this).val() == '') {

                    $inputIcon.show().not('.js-input--clear').hide();
                }
            }).on('blur', function () {

                if ($(this).val() == '') {

                    $inputIcon.show().filter('.js-input--clear').hide();
                }
            });
        });

        $document.on('click', '.js-input--clear', function () {

            $(this).closest('.js-search').find('.js-input').val('');

            $(this).fadeOut().closest('.js-search').find('.bb-input__icon').not('.js-input--clear').fadeIn();

            $(this).closest('.js-search').find('.search__hint').css('display', 'none');
        });
    },

    //Show phone number

    ownerPhone: function ownerPhone() {

        $('.js-user-phone').each(function () {

            $(this).attr('href', 'javascript:void(0);').text($(this).data('phone-hiden'));
        });

        $(document).on('click', '.js-user-phone--show', function () {

            var userPhone = $(this).parent().find('.js-user-phone');

            var phone = userPhone.data('phone');

            userPhone.removeAttr('style').attr('href', 'tel:' + phone).text(phone);

            $(this).css('display', 'none');
        });
    },

    //City select

    changeCity: function changeCity() {

        var $changeCity = $('.js-city-select');

        var $changeCityTitle = $changeCity.find('.city-select__title span');

        var $input = $changeCity.find('input');

        $input.on('click focus', function (e) {

            e.stopPropagation();
        });

        $changeCity.find('.city-select__item').on('click', function () {

            $changeCityTitle.text($(this).text());
        });
    },

    //Base slider

    slider: function slider() {

        var $slider = $('.js-bb-slider');

        if ($slider.length) {

            $slider.each(function () {

                var $slids = $(this).find('.bb-slider__slides');

                var $slide = $(this).find('.bb-slider__slide');

                var $prevArrow = $(this).find('.bb-slider__arrow--prev');

                var $nextArrow = $(this).find('.bb-slider__arrow--next');

                if ($slide.length) {

                    $slids.not('.slick-initialized').slick({

                        prevArrow: $prevArrow,

                        nextArrow: $nextArrow,

                        autoplay: true,

                        autoplaySpeed: 2000,

                        speed: 1000,

                        slidesToShow: 3,

                        slidesToScroll: 1,

                        infinite: true,

                        arrows: true,

                        dots: false,

                        responsive: [{

                            breakpoint: 481,

                            settings: {

                                slidesToShow: 1,

                                dots: true,

                                arrows: false

                            }

                        }]

                    });
                }
            });
        }
    },

    //Catalog Item Slider

    catalogItemSlider: function catalogItemSlider() {

        if ($('.js-catalog-item-slider').length) {

            var $catalogItemSlider = $('.js-catalog-item-slider');

            $catalogItemSlider.each(function () {

                var _this = $(this);

                var $slides = $(this).find('.bb-slider__slides');

                var $slide = $(this).find('.bb-slider__slide');

                var $sliderDots = $(this).find('.bb-slider__dots');

                $sliderDots.hide();

                _this.on('init', function (event, slick) {

                    $sliderDots.prepend("<span class='bb-slider__pager bb-slider__pager--now'>1</span>" + '/');

                    $sliderDots.append("<span class='bb-slider__pager bb-slider__pager--total'>" + slick.slideCount + '</span>');
                }).on('afterChange', function (event, slick, currentSlide, nextSlide) {

                    var i = (currentSlide ? currentSlide : 0) + 1;

                    _this.find('.bb-slider__pager--now').html(i);
                });

                if ($slide.length > 1) {

                    $sliderDots.show();

                    $slides.not('.slick-initialized').slick({

                        lazyLoad: 'ondemand',

                        speed: 400,

                        slidesToShow: 1,

                        slidesToScroll: 1,

                        arrows: true,

                        infinite: false,

                        dots: false,

                        responsive: [{

                            breakpoint: 481,

                            settings: {

                                arrows: false

                            }

                        }]

                    });
                }
            });

            if ($(window).width() > 480) {

                $('.js-catalog-item').find('.bb-slider__slides').on('click', function (e) {

                    if ($(this).hasClass('slick-initialized')) {

                        e.stopPropagation();

                        e.preventDefault();
                    }
                });
            }
        }
    },

    tab: function tab() {

        $('.js-bb-tab').tabs();
    },

    //Mobile Search Btn open/close

    headerSearchBtn: function headerSearchBtn() {

        var searchBtn = $('.js-mobile-search-btn');

        searchBtn.on('click', function () {

            if ($wrapper.hasClass('mobile-search--open')) {

                $wrapper.removeClass('mobile-search--open');

                $html.removeClass('is-fixed');

                return false;
            } else {

                $wrapper.addClass('mobile-search--open');

                $html.css('is-fixed');

                return false;
            }
        });
    },

    buttons: {

        init: function init() {

            this.btnExpanded();

            this.btnHoverAnimate();

            this.btnStatusAnimate();

            this.btnGoTop();

            this.btnGoTo();

            this.btnFloating();

            this.btnPush();
        },

        //btn expanded

        btnExpanded: function btnExpanded() {

            addRemoveClass('.js-btn-expanded', 'is-active');
        },

        //btn animate on hover

        btnHoverAnimate: function btnHoverAnimate() {

            $document.on('mouseenter', '.js-btn-animate', function (e) {

                var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;

                $(this).find('.button-animate__hover').css({

                    top: relY,

                    left: relX

                });
            }).on('mouseout', '.js-btn-animate', function (e) {

                var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;

                $(this).find('.button-animate__hover').css({

                    top: relY,

                    left: relX

                });
            });
        },

        //btn status animate

        btnStatusAnimate: function btnStatusAnimate() {

            var click = 0;

            $document.on('click', '.btn-animate', function (e) {
                var _this2 = this;

                click++;

                $(this).addClass('is-animate is-ready');

                if (click <= 1) {

                    setTimeout(function () {

                        $(_this2).removeClass('is-animate is-ready');
                    }, 2500);

                    setTimeout(function () {

                        $(_this2).addClass('is-ready');

                        click = 0;
                    }, 5000);
                }

                e.preventDefault();
            });
        },

        //floating btn animatin

        btnFloating: function btnFloating() {

            var $btn = $document.find('.js-btn-floating');

            var run = true;

            if (!$btn.find('.btn-floating__list').length) {

                $btn.find('.btn-floating__link').css('pointer-events', 'auto');
            }

            //Обработчик добавляет классы затем отписыватеся от события

            var hendler = function hendler() {
                var _this3 = this;

                $(this).removeClass('fa-enter-active').addClass('fa-leave-active');

                $btn.off('transitionend webkitTransitionEnd oTransitionEnd', hendler);

                setTimeout(function () {

                    $(_this3).removeClass('fa-leave-active');
                }, 1000);
            };

            //Анимация закрытия

            function _removeAnimation(el) {

                el.on('transitionend webkitTransitionEnd oTransitionEnd', hendler);

                setTimeout(function () {

                    el.removeClass('fa-leave-active');
                }, 1000);
            }

            if ($(window).width() > 768) {

                if (!run) {

                    return;
                }

                $document.on('mouseenter', '.js-btn-floating', function () {

                    run = false;

                    $(this).addClass('fa-enter-active');
                }).on('mouseleave', '.js-btn-floating', hendler);
            } else {

                $document.on('click', '.js-btn-floating', function () {

                    if ($(this).find('.btn-floating__list').length) {

                        $(this).addClass('fa-enter-active').css('z-index', 1000);

                        $overlay.addClass('is-visible').addClass('overlay--btn-floating');
                    } else {

                        var btnId = $(this).find('.btn-floating__link').not('.md-hide');

                        btnId.trigger('click');
                    }
                });

                $document.on('click', '.js-btn-floating .btn-floating__link', function (e) {

                    $btn.removeClass('fa-enter-active').removeAttr('style');

                    _removeAnimation($(this));

                    $overlay.removeClass('is-visible');

                    e.stopPropagation();
                });

                //Клик в не кнопки скрывает оверлей и кнопки

                $document.on('click touchstart', '.overlay--btn-floating', function (e) {

                    $btn.removeClass('fa-enter-active').addClass('fa-leave-active');

                    setTimeout(function () {

                        $overlay.removeClass('is-visible').removeClass('overlay--btn-floating');
                    }, 100);

                    setTimeout(function () {

                        $btn.removeClass('fa-leave-active');
                    }, 1500);
                });
            }

            // $window.on('scroll', function() {

            //     let scrollHeight = $document.height();

            //     let scrollPosition = $window.height() + $window.scrollTop();

            //     if ((scrollHeight - scrollPosition) / scrollHeight === 0) {

            //         $btn.fadeOut();

            //     } else {

            //         $btn.fadeIn();

            //     }

            // });


            //Если ссылка открывает модалку, то по открытию модалки скрывает кнопки

            $('.modal').on('show.bs.modal', function () {

                $btn.removeClass('fa-enter-active').addClass('fa-leave-active');

                $overlay.removeAttr('style');

                setTimeout(function () {

                    $btn.removeClass('fa-leave-active');
                }, 1500);
            });
        },

        btnPush: function btnPush() {

            $document.find('[data-push]').on('click', function () {
                var _this4 = this;

                var messageSuccess = $(this).attr('data-push-message-success');

                var messageError = $(this).attr('data-push-message-error');

                var delay = $(this).attr('data-push-delay') || 0;

                var status = void 0;

                setTimeout(function () {

                    status = $(_this4).attr('data-push-status') || 'success';
                }, 100);

                setTimeout(function () {

                    if (status === 'error') {

                        pushUp({

                            text: messageError,

                            status: status

                        });
                    } else {

                        pushUp({

                            text: messageSuccess,

                            status: status

                        });
                    }
                }, delay);
            });
        },

        //btn scroll to top

        btnGoTop: function btnGoTop() {

            $('.js-go-top').on('click', function (e) {

                e.preventDefault();

                $('html, body').animate({

                    scrollTop: 0

                }, 800);
            });
        },

        //btn scroll to element

        btnGoTo: function btnGoTo() {

            //Click event to scroll to section whith id like href

            $('.js-goto').on('click', function (e) {

                e.preventDefault();

                e.stopPropagation();

                var elementClick = $(this).attr('href');

                var destination = $(elementClick).offset().top;

                if ($(window).width() > 480) {

                    $('html, body').animate({

                        scrollTop: destination - 90 + 'px'

                    }, 400);
                } else {

                    $('html, body').animate({

                        scrollTop: destination - 60 + 'px'

                    }, 400);
                }
            });
        }

    },

    inputs: {

        init: function init() {

            this.inputEvents();

            this.inputMask();
        },

        //Masked inputmask https://github.com/RobinHerbots/Inputmask

        inputMask: function inputMask() {

            if ($('.js-phone-mask').length) {

                $('.js-phone-mask').inputmask({

                    mask: '+7 (999) 999-99-99'

                });
            }

            if ($('.js-time-mask').length) {

                $('.js-time-mask').inputmask({

                    mask: '99:99'

                });
            }

            if ($('.js-code-mask').length) {

                $('.js-code-mask').inputmask({

                    mask: '9 9 9 9'

                });
            }

            if ($('.js-born-mask').length) {

                $('.js-born-mask').inputmask({

                    mask: '99.99.9999'

                });
            }

            if ($('.js-confirm-mask').length) {

                $('.js-confirm-mask').inputmask({

                    mask: '9999'

                });
            }

            if ($('.js-email-mask').length) {

                $('.js-email-mask').inputmask({

                    mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',

                    greedy: false,

                    onBeforePaste: function onBeforePaste(pastedValue, opts) {

                        pastedValue = pastedValue.toLowerCase();

                        return pastedValue.replace('mailto:', '');
                    },

                    definitions: {

                        '*': {

                            validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",

                            cardinality: 1,

                            casing: 'lower'

                        }

                    }

                });
            }
        },

        inputEvents: function inputEvents() {

            $('.js-input--copy').on('click', function () {

                var input = $(this).parent().find('input');

                input.select();

                document.execCommand('Copy');
            });

            $('.js-copy-text').on('click', function () {

                var input = $(this).parent().find('.user-share__link');

                input.text();

                document.execCommand('Copy');
            });

            //Click input select value

            $('.js-input-focus--copy').on('focus', function () {

                $(this).select();
            });

            //Show Password

            $('.js-bb-input-password--show').on('click', function () {

                $(this).css('display', 'none');

                $(this).next().css('display', 'block');

                $(this).parent().find('input[type="password"]').attr('type', 'text');
            });

            //Hide Password

            $('.js-bb-input-password--hide').on('click', function () {

                $(this).css('display', 'none');

                $(this).prev().css('display', 'block');

                $(this).parent().find('input[type="text"]').attr('type', 'password');
            });

            if ($document.find('.js-bb-input').length) {

                $document.find('.js-bb-input').on('focus', function () {

                    var $parent = $(this).parent('.bb-input, .bb-text');

                    $parent.addClass('is-focus');
                }).on('blur', function () {

                    var $parent = $(this).parent('.bb-input, .bb-text');

                    if ($(this).val() === '') {

                        $parent.removeClass('is-focus');
                    }
                });
            }

            $document.on('click', '.js-bb-input-tip', function () {

                if ($(this).hasClass('no-close')) {

                    return;
                }

                $(this).parent().removeClass('is-info is-error is-invalid').end().hide();
            });
        }

    },

    select: {

        //Custom Select https://select2.org/

        init: function init() {

            $('.js-select').select2();

            $('.js-select--multiple').select2({

                tags: true

            });

            $('.js-select.bb-select--metro').select2({

                templateResult: addUserPic

            });

            $('.js-select--services').select2({

                templateSelection: timeAndPrice,

                templateResult: timeAndPrice

            });

            $('.js-select.no-search').select2({

                minimumResultsForSearch: -1

            });

            //Icon mentro inside select

            function addUserPic(opt) {

                if (!opt.id) {

                    return opt.text;
                }

                var optimage = $(opt.element).data('image');

                if (!optimage) {

                    return opt.text;
                } else {

                    var $opt = $('<span class="metro-icon metro-icon--' + optimage + '">' + $(opt.element).text() + '</span>');

                    return $opt;
                }
            }

            //Select Add Price Time & Price

            function timeAndPrice(opt) {

                var originalTime = $(opt.element).data('time');

                var originalPrice = $(opt.element).data('price');

                return $('<div class=custom-select__results>' + '<span>' + opt.text + '</span>' + '<span>' + originalTime + '</span>' + '<span>' + originalPrice + '</span>' + '</div>');
            }

            this.nativeSelect();

            this.colorSelect();

            // this.selectIcon();

            this.bornSelect();

            this.iconSelect();

            this.showYear();

            this.hideYear();

            this.phoneCode();

            this.mobileSelect();

            this.events();
        },

        nativeSelect: function nativeSelect() {

            var $selectNative = $document.find('.js-select-native');

            if ($selectNative.length) {

                if ($window.width() > 480) {

                    $selectNative.select2({

                        minimumResultsForSearch: -1

                    });
                } else {

                    $selectNative.each(function () {

                        var _this = $(this);

                        var $parent = _this.closest('.bb-input');

                        var $title = $parent.find('.bb-input__title');

                        var titleText = $title.text();

                        var placeholder = _this.data('placeholder');

                        var $firstOption = _this.find('option:first-child');

                        var $newOption = $('<option>').attr({

                            disabled: 'disabled',

                            selected: 'selected'

                        });

                        var type = $parent.data('type');

                        var text = void 0;

                        if (titleText !== '' || titleText !== 'undefined') {

                            text = titleText;
                        } else if (placeholder !== '' || placeholder !== 'undefined') {

                            text = placeholder;
                        } else {

                            return;
                        }

                        if ($parent.hasClass('bb-input--transform')) {

                            if ($firstOption.is(':empty')) {

                                if (type === 'selected') {

                                    $firstOption.remove();

                                    $parent.addClass('is-focus');
                                } else {

                                    $firstOption.remove();

                                    _this.removeAttr('data-placeholder').val(text);

                                    Base.select.addResetBtn(_this);
                                }

                                //firstOption not empty
                            } else {

                                if (type === 'selected') {

                                    $parent.addClass('is-focus');
                                } else {

                                    $newOption.prependTo(_this);

                                    Base.select.addResetBtn(_this);
                                }
                            }
                        } else {

                            if ($firstOption.is(':empty')) {

                                $firstOption.val(placeholder).text(placeholder).attr({

                                    selected: 'selected',

                                    disabled: 'disabled'

                                });

                                _this.addClass('has-placeholder').removeAttr('data-placeholder').val(placeholder);
                            }
                        }

                        $(this).on('change', function () {

                            if ($(this).hasClass('has-placeholder')) {

                                $(this).removeClass('has-placeholder');
                            }

                            var $firstOption = _this.find('option:first-child');

                            if ($(this).val() !== '') {

                                $parent.addClass('is-focus');

                                if ($firstOption.is(':empty')) {

                                    $firstOption.remove();
                                }
                            } else {

                                $parent.removeClass('is-focus');
                            }
                        });

                        $(this).wrap('<label class="bb-select">');
                    });
                }
            }
        },

        // selectIcon: function() {

        //     //Transform select in icon select

        //     let $select = $(document).find('.js-select-icon');

        //     $select.each(function() {

        //         let icon = $(this).data('select-icon');

        //         let iconHtml = `<span class="bb-select__icon">

        //                                         <svg class="icon icon-user bb-select__ico">

        //                                             <use xlink:href="img/sprite.svg#${icon}"></use>

        //                                         </svg>

        //                                     </span>`;

        //         let $iconHtml = $(iconHtml);

        //         $iconHtml.prependTo($(this));

        //         $(this).addClass('bb-select--icon');

        //     });

        // },

        events: function events() {

            $document.on('focus', '.select2-search__field', function (e) {

                e.stopPropagation();
            });
        },

        iconSelect: function iconSelect() {

            var $iconSelect = $document.find('.js-select--icon');

            $iconSelect.each(function () {

                var $parent = $(this).closest('.bb-input--select');

                $(this).select2({

                    templateSelection: iformat,

                    templateResult: iformat,

                    dropdownParent: $parent,

                    minimumResultsForSearch: -1

                });
            });

            //Icon fontawesome inside select

            function iformat(icon) {

                var originalOption = icon.element;

                return $('<span><i class="select2__icon' + ' ' + $(originalOption).data('icon') + '"></i> ' + icon.text + '</span>');
            }
        },

        colorSelect: function colorSelect() {

            var $colorSelect = $document.find('.js-select--color');

            $colorSelect.each(function () {

                var $parent = $(this).closest('.select-color');

                if ($(this).hasClass('search-enabled')) {

                    $(this).select2({

                        templateSelection: iBall,

                        templateResult: iBall,

                        dropdownParent: $parent

                    });
                } else {

                    $(this).select2({

                        minimumResultsForSearch: -1,

                        templateSelection: iBall,

                        templateResult: iBall,

                        dropdownParent: $parent

                    });
                }

                // Color ball inside select

                function iBall(color) {

                    var $originalOption = color.element;

                    var colorBall = $($originalOption).data('color');

                    if (color.text.length) {

                        $parent.removeClass('select-color--palette');

                        return $('<div class=select-color__item> <span class="select-color__line" style="background-color: ' + colorBall + '"></span><p> ' + color.text + ' </p></div>');
                    } else {

                        $parent.addClass('select-color--palette');

                        return $('<div class=select-color__item> <span class="select-color__ball" style="background-color: ' + colorBall + ' "> </span> </div>');
                    }
                }
            });
        },

        bornSelect: function bornSelect() {

            var $bornSelect = $document.find('.js-select-born');

            if ($bornSelect.length) {

                if ($(window).width() > 480) {

                    $bornSelect.select2({

                        minimumResultsForSearch: -1,

                        allowClear: true

                    });
                } else {

                    $bornSelect.each(function () {

                        var $parent = $(this).closest('.bb-input--born');

                        var $select = $(this).closest('.bb-input-born__select');

                        var placeholder = $(this).data('placeholder');

                        var $firstOption = $(this).find('option:first-child');

                        if ($parent.hasClass('bb-input--transform')) {

                            $parent.find('.bb-input-born').addClass('bb-input-born--transform');
                        }

                        $parent.find('.bb-input__title').remove();

                        $firstOption.text(placeholder).val(placeholder).attr('disabled', 'disabled');

                        $(this).removeAttr('data-placeholder');

                        $(this).on('change', function () {

                            if ($(this).val() !== '') {

                                $select.addClass('is-focus');
                            } else {

                                $select.removeClass('is-focus');
                            }
                        });

                        $(this).wrap('<label class="bb-select">');
                    });
                }

                Base.select.addResetBtn($bornSelect);
            }
        },

        showYear: function showYear() {

            $document.on('click', '.js-set-year', function () {

                $(this).hide();

                $(this).prev().show();
            });
        },

        hideYear: function hideYear() {

            var $yearSelect = $('.js-select-born--clear');

            $yearSelect.on('select2:unselecting', function () {

                $(this).on('select2:opening', function (e) {

                    e.preventDefault();
                });
            }).on('select2:unselect', function () {
                var _this5 = this;

                setTimeout(function () {

                    $(_this5).off('select2:opening');
                }, 100);
            }).on('change', function () {

                if ($(this).val() == '' && $(this).attr('data-born') === 'year') {

                    $('.js-set-year').show();

                    $('.js-set-year').prev().hide();
                }
            });
        },

        addResetBtn: function addResetBtn(el) {

            var $select = el;

            var $parent = $select.closest('.bb-input');

            var resetBtn = '<span class="bb-select__reset js-select--reset"><i class="fas fa-times-circle"></i></span>';

            var $newOption = $('<option>').attr({

                disabled: 'disabled',

                selected: 'selected'

            });

            $select.on('change', function () {

                var $parent = $(this).parent('.bb-select');

                if ($(window).width() > 480) {

                    $(this).next().find('.select2-selection__clear').text('').append(resetBtn);
                } else {

                    $parent.append(resetBtn);
                }
            });

            $document.on('click touchstart', '.js-select--reset', function (e) {

                var $parent = void 0;

                var $select = void 0;

                if ($(this).siblings('.js-select-born').length) {

                    $select = $(this).siblings('.js-select-born');

                    $parent = $(this).closest('.bb-input-born__select');
                } else {

                    $select = $(this).siblings('.js-select-native');

                    $parent = $(this).closest('.bb-input--transform');

                    $newOption.prependTo($select);
                }

                $select.val($parent.find('option:first-child').val()).blur();

                $parent.removeClass('is-focus');

                $(this).remove();

                if ($parent.hasClass('bb-input-born__select--year')) {

                    $parent.next('.bb-input-born__btn').show();

                    $parent.hide();
                }

                e.stopPropagation();

                e.preventDefault();
            });
        },

        phoneCode: function phoneCode() {

            //Change select results to option value

            function selectCodeSelection(opt) {

                var optVal = $(opt.element).val();

                return $('<span class=custom-select__results>' + optVal + '</span>');
            }

            //Add city name to option

            function selectCodeResult(opt) {

                var country = $(opt.element).data('country'),
                    optVal = $(opt.element).val();

                return $('<div class=custom-select__results>' + '<span>' + country + '</span>' + '<span>' + optVal + '</span>' + '</div>');
            }

            var $phoneCodeBox = $document.find('.js-input-phone-code');

            if ($phoneCodeBox.length) {

                $phoneCodeBox.each(function () {

                    var $select = $(this).find('.select-value');

                    var $parent = $(this).parent();

                    var $input = $(this).find('.bb-input__input');

                    if ($window.width() >= 768) {

                        $select.select2({

                            templateResult: selectCodeResult,

                            templateSelection: selectCodeSelection,

                            dropdownParent: $(this)

                        }).on('select2:select', function () {

                            $(this).parent().parent().find('input').focus();
                        });
                    } else {

                        $parent.addClass('bb-select').append('<div class="bb-input--select-value"></div>');

                        var optionSelect = $parent.find('option');

                        var selectValue = $parent.find('.bb-input--select-value');

                        selectValue.text(optionSelect.eq(0).val());

                        $select.change(function () {

                            var counter = $(this)[0].selectedIndex;

                            selectValue.text(optionSelect.eq(counter).val());

                            $(this).parent().parent().find('input').focus();
                        });
                    }

                    $input.inputmask({

                        mask: '(999) 999-99-99'

                    });

                    $input.on('focus', addFocus).on('blur', removeFocus);

                    $select.on('select2:open', addFocus).on('select2:close', removeFocus);

                    function addFocus() {

                        $(this).closest('.js-input-phone-code').addClass('is-focus');
                    }

                    function removeFocus() {

                        if ($(this).val() == '') {

                            $(this).closest('.js-input-phone-code').removeClass('is-focus');
                        }
                    }
                });
            }
        },

        mobileSelect: function mobileSelect() {

            var $select = $document.find('.js-move-select');

            $select.each(function () {

                var $inputSearch = $(this).find('.move-select__field');

                var $resultItem = $(this).find('.move-select__result');

                var $item = $(this).find('.move-select__result');

                var $btnClose = $(this).find('.js-move-select--close');

                $inputSearch.on('focus', function () {

                    $(this).closest('.js-move-select').addClass('is-active');

                    $('html, body').animate({

                        scrollTop: 0

                    });
                });

                $item.on('click', function (e) {

                    var $name = $(this).find('.user__name').text().trim();

                    var $service = $(this).find('.item-info__title span').text().trim().split(' ').join(' + ');

                    $inputSearch.val($name || $service);

                    $(this).closest('.js-move-select').removeClass('is-active').closest('.bb-input--transform').addClass('is-focus');

                    // e.stopPropagation();

                    e.preventDefault();
                });

                $btnClose.on('click mousedown touchstart', function (e) {

                    e.preventDefault();

                    $(this).closest('.js-move-select').removeClass('is-active');

                    $inputSearch.blur();
                });

                $(document).on('click mousedown touchstart', '.move-select__result', function () {

                    $resultItem.removeClass('is-selected');

                    $(this).addClass('is-selected');
                });
            });
        }

    },

    popup: {

        init: function init() {

            this.popupFancyBox();

            this.whoIs();

            this.changeFormTitle();

            this.reinit();
        },

        //Modal FancyBox 3 https://fancyapps.com/fancybox/3/

        popupFancyBox: function popupFancyBox() {

            if ($('[data-fancybox]').length) {

                $('[data-fancybox]').fancybox({

                    baseClass: 'bb-window__wrap',

                    closeClickOutside: true,

                    autoFocus: false,

                    image: {

                        preload: true

                    },

                    helpers: {

                        overlay: {

                            locked: false

                        }

                    }

                });
            }

            if ($('[data-fancybox="images"]').length) {

                $('[data-fancybox="image"]').fancybox({

                    baseClass: 'fancybox-container--image',

                    toolbar: true,

                    mobile: {

                        clickContent: 'close',

                        clickSlide: 'close'

                    }

                });
            }

            if ($('[data-fancybox-no-touch]').length) {

                $('[data-fancybox-no-touch]').fancybox({

                    baseClass: 'bb-window__wrap',

                    touch: false,

                    toolbar: false,

                    smallBtn: true,

                    closeClickOutside: true,

                    autoFocus: false,

                    helpers: {

                        overlay: {

                            locked: false

                        }

                    }

                });
            }

            if ($('[data-fancybox-no-close]').length) {

                $('[data-fancybox-no-close]').fancybox({

                    baseClass: 'bb-window__wrap',

                    touch: false,

                    closeClickOutside: false,

                    // smallBtn: false,

                    autoFocus: false,

                    // modal: true,

                    helpers: {

                        overlay: {

                            locked: false

                        }

                    }

                });
            }
        },

        //Form Who Is?

        whoIs: function whoIs() {

            $('.js-whois').on('click', function () {

                var whois = $(this).data('whois');

                var form = $('#auth-form').find('.form');

                if (whois === 'master') {

                    form.addClass('is-master');
                } else if (whois === 'studio') {

                    form.addClass('is-studio');
                } else {

                    form.addClass('is-client');
                }
            });
        },

        //Dunamicly change form title

        changeFormTitle: function changeFormTitle() {

            $document.on('click mousedown touchstart', '.js-form-title', function () {

                var text = $(this).data('title');

                $('.js-form-title').removeClass('is-active');

                $(this).addClass('is-active');

                $(this).closest('.form').find('.form__btn').text(text);
            });
        },

        reinit: function reinit() {

            $document.on('show.bs.modal', '.modal', function (e) {

                Base.select.colorSelect();
            });
        }

    },

    form: {

        // init: function() {

        //     this.checkValidation();

        // },


        checkValidation: function checkValidation() {
            var _this6 = this;

            var $btn = $('.form-success__role');

            var $formSuccess = $('.form-success__roles');

            $(this).css('z-index', '200');

            $btn.not($(this)).addClass('move-out');

            $formSuccess.addClass('is-error');

            setTimeout(function () {

                $btn.not($(_this6)).hide();
            }, 100);
        }

    }

};

var Menu = function () {

    var menu = {};

    var $wrapper = $('.wrapper');

    var $header = $('.header');

    var $overlay = $('.overlay');

    var $menu = $('.js-menu');

    var $hamburger = $('.js-main-nav-btn');

    var $hamburgerCrm = $('.js-hamburger');

    var $menuItem = $('.js-menu .menu__item');

    var $menuOvelay = $('.js-menu-overlay');

    var $menuItemDropdown = $(document).find('.js-menu-item-dropdown');

    var $btnFloat = $(document).find('.js-btn-floating');

    var activeClass = 'is-active';

    var dropdownActiveClass = 'menu-dropdown--open';

    menu.init = function () {

        this.events();

        this.menuItemDropdownEvent();
    };

    menu.events = function () {

        $hamburger.on('click', function (e) {

            if ($(this).hasClass('on')) {

                menu._close();
            } else {

                menu._open();
            }

            e.stopPropagation();

            e.preventDefault();
        });

        $hamburgerCrm.on('click', function (e) {

            if ($(this).hasClass('on')) {

                menu._close(e);
            } else {

                menu._open();
            }
        });

        $menuItem.on('click', function (e) {

            var $target = $(e.target);

            //Если нет вложенного меню


            if (!$(this).hasClass('js-menu-item-dropdown')) {

                $menuItem.removeClass(activeClass);

                $(this).addClass(activeClass);

                e.stopPropagation();
            } else {

                //Если есть вложенное меню


                //Если таргет ссылка но не кнока Отменить


                if ($target.hasClass('menu-dropdown__link') && !$target.hasClass('menu-dropdown__link--abort')) {

                    var $parent = $target.parent('.menu-dropdown__item');

                    //Переключаем активный класс у главной ссылки меню и открываем вложенное меню


                    $menuItem.removeClass(activeClass);

                    $(this).addClass(dropdownActiveClass).addClass(activeClass);

                    //Переключаем активный класс у вложенных li


                    $('.menu-dropdown__item').removeClass(activeClass);

                    $parent.addClass(activeClass);

                    if ($(window).width() > 480) {

                        //Сдвигаем контент


                        $wrapper.addClass('menu-open');
                    } else {

                        menu._close(e);
                    }

                    e.stopPropagation();
                } else if (

                //Если таргет кнока Отменить просто закрываем меню


                $target.hasClass('menu-dropdown__link') && $target.hasClass('menu-dropdown__link--abort')) {

                    menu._close(e);

                    e.stopPropagation();
                } else {

                    //Если таргет НЕ ссылка, проверяем на наличие активного класса у дропдауна


                    if ($(this).hasClass(dropdownActiveClass)) {

                        $(this).removeClass(dropdownActiveClass);

                        $wrapper.removeClass('menu-open');
                    } else {

                        $menuItemDropdown.removeClass(dropdownActiveClass);

                        $(this).addClass(dropdownActiveClass);

                        if ($(window).width() > 480) {

                            $wrapper.addClass('menu-open');
                        } else {

                            $btnFloat.fadeOut();

                            $menuOvelay.addClass('is-visible');
                        }
                    }
                }
            }
        });

        $('.js-mobile-nav--close').on('click', function (e) {

            menu._close(e);
        });

        //Ивент клика по аакодеону внутри меню


        $(document).find('.js-mobile-nav').find('.mobile-nav__item').on('click', function (e) {

            if (!$(this).hasClass('bb-accordeon__item')) {

                menu._close(e);
            }
        }).end().find('.bb-accordeon__content a').on('click', function (e) {

            menu._close(e);
        });

        //Закрваем меню по клюку на оверлэй


        $(document).on('click', '.overlay--menu', function (e) {

            menu._close(e);

            e.stopPropagation();
        });

        //Закрваем меню по клюку на оверлэй


        $(document).on('click', '.js-menu-overlay', function (e) {

            menu._close(e);

            e.stopPropagation();
        });

        $('.js-menu .menu__link').on('click', function (e) {

            e.preventDefault();
        });
    };

    menu.menuItemDropdownEvent = function () {

        $(document).on('click', '.js-menu-item-dropdown', function (e) {

            if ($(this).hasClass(dropdownActiveClass)) {

                $menuItemDropdown.removeClass(dropdownActiveClass);

                $(this).addClass(dropdownActiveClass);
            } else {

                $(this).removeClass(dropdownActiveClass);
            }

            e.stopPropagation();
        });

        $(document).on('click', '.js-menu-item-dropdown .menu__link', function (e) {

            e.preventDefault();
        });
    };

    menu._open = function () {

        $('html').addClass('is-fixed');

        if (!$(document).find('.jsCrmBlurEventStop')) {

            $(document).find('input').blur();
        }

        if ($(window).width() > 480) {

            $hamburgerCrm.addClass('on');

            if ($wrapper.hasClass('page-cabinet')) {

                $menu.addClass('is-open');

                $header.addClass('is-moving');

                $wrapper.addClass('menu-open');

                $menuItemDropdown.removeClass('is-active');
            } else {

                $wrapper.addClass('mobile-nav--open');

                $overlay.addClass('is-visible').addClass('overlay--menu');
            }
        } else {

            $hamburger.addClass('on');

            $wrapper.addClass('mobile-nav--open');

            $overlay.addClass('is-visible').addClass('overlay--menu');
        }

        if ($wrapper.hasClass('page-onepage')) {

            $hamburger.addClass('on');

            $wrapper.addClass('mobile-nav--open');

            $overlay.addClass('is-visible').addClass('overlay--menu');
        }
    };

    menu._close = function (e) {

        $hamburger.removeClass('on');

        $hamburgerCrm.removeClass('on');

        $menu.removeClass('is-open');

        $menuItemDropdown.removeClass(dropdownActiveClass);

        $header.removeClass('is-moving').removeClass('is-open');

        $btnFloat.fadeIn();

        $wrapper.removeClass('mobile-nav--open');

        $('html').removeClass('is-fixed');

        var target = $(e.target);

        if (target.is('.js-hamburger') || target.is('.js-menu-item-dropdown')) {

            $wrapper.removeClass('menu-open');
        }

        setTimeout(function () {

            $overlay.removeClass('is-visible');
        }, 200);

        if ($(window).width() < 480) {

            setTimeout(function () {

                $menuOvelay.removeClass('is-visible');
            }, 100);
        }
    };

    return menu;
}();

var Dropdown = function () {

    var $overlay = $('.overlay');

    var dropdown = {};

    var $dropdown = $(document).find('.js-bb-dropdown');

    var $btnDropdownClose = $('<i class="fal fa-times js-bb-dropdown--close"></i>');

    var $btnFloating = $(document).find('.js-btn-floating');

    var _this = void 0,
        $list = void 0;

    var run = false;

    var styleTransform = {

        position: 'fixed',

        top: 'auto',

        bottom: 10,

        left: 10,

        right: 10,

        zIndex: 9999

    };

    var style = {

        position: 'fixed',

        top: 60,

        left: 10,

        right: 10,

        zIndex: 9999

    };

    dropdown.init = function () {

        if ($dropdown.length) {

            if ($(window).width() <= 768) {

                $dropdown.removeClass('bb-dropdown--hover');
            }

            dropdown.render();

            dropdown.events();
        }
    };

    dropdown.render = function () {

        if ($(window).width() <= 768) {

            var _$dropdown = $(document).find('.js-bb-dropdown.bb-dropdown--transform');

            _$dropdown.each(function () {

                var $btnClose = $('<button class="bb-dropdown__close js-bb-dropdown--close">Закрыть</button>');

                var $dropdownOverlay = $('<div class="bb-dropdown__overlay">');

                var $dropdownList = $(this).find('.bb-dropdown__list');

                $btnClose.appendTo($dropdownList);

                $dropdownOverlay.insertAfter($dropdownList);

                $dropdownList.find('.info-block__icon').remove();
            });
        }
    };

    dropdown.events = function () {

        $(document).on('click', '.js-bb-dropdown', function (e) {

            _this = $(this);

            $list = $(this).find('.bb-dropdown__list');

            if ($(window).width() > 768) {

                dropdown._toggle($(this));
            } else {

                if (!$(this).hasClass('bb-dropdown--another')) {

                    $btnFloating.fadeOut();

                    $list.insertAfter('.wrapper');

                    setTimeout(function () {

                        $list.addClass('is-visible');
                    }, 200);

                    $overlay.addClass('is-visible').addClass('overlay--dropdown');

                    if ($(this).hasClass('bb-dropdown--transform')) {

                        $list.css(styleTransform).addClass('_transform');
                    } else {

                        $btnDropdownClose.prependTo($list);

                        $list.css(style).addClass('_transform_info');
                    }
                } else {

                    dropdown._toggle($(this));
                }
            }

            e.stopPropagation();
        });

        //Toggle fixrd class from body

        $(document).on('click', '.js-bb-dropdown.request-info', function (e) {

            if ($(window).width() <= 480) {

                if ($(this).hasClass('is-active')) {

                    $('html').addClass('is-fixed');
                } else {

                    $('html').removeClass('is-fixed');
                }
            }
        });

        $(document).on('click', function (e) {

            if ($(e.target).closest('.js-bb-dropdown').length) return;

            $dropdown.removeClass('is-active');

            if ($(window).width() <= 480) {

                $('html').removeClass('is-fixed');
            }

            console.log('---', 'DROPDOWN CLOSE');
        });

        $(document).on('click', '.overlay--dropdown', function () {

            $dropdown.removeClass('is-active');

            dropdown._close();
        });

        $(document).on('click touchstart', '.bb-dropdown__list .info-block__item', function () {

            $dropdown.removeClass('is-active');

            $btnFloating.fadeIn();

            dropdown._close();
        });

        $(document).on('click', '.js-bb-dropdown--close', function (e) {

            $btnFloating.fadeIn();

            dropdown._close();

            e.stopPropagation();
        });
    };

    dropdown._toggle = function (el) {

        if (el.hasClass('is-active')) {

            el.removeClass('is-active');

            $btnFloating.fadeIn();
        } else {

            $dropdown.removeClass('is-active');

            el.toggleClass('is-active');

            if (el.hasClass('bb-dropdown--transform')) {

                $btnFloating.fadeOut();
            }
        }
    };

    dropdown._close = function () {

        setTimeout(function () {

            $list.removeClass('is-visible');

            _this.removeClass('is-active');

            $btnFloating.fadeIn();
        }, 100);

        setTimeout(function () {

            $list.removeAttr('style').removeClass('_transform').removeClass('_transform_info').appendTo(_this);

            $overlay.removeClass('is-visible').removeClass('overlay--dropdown');
        }, 300);
    };

    return dropdown;
}();

//PushUp

function pushUp(options) {

    var text = options.text || 'Вам новая заявка';

    var status = options.status || 'success';

    var $pushContainer = $('<div>').addClass('push-up push-up--center');

    var $pushIconSuccess = $('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\n        width="611.994px" height="611.994px" viewBox="0 0 611.994 611.994"\n\n        xml:space="preserve" class="push-up__icon">\n\n            <path d="M248.172,423.918l-89.545-89.534c-5.637-5.637-5.637-14.778,0-20.416c5.643-5.644,14.78-5.644,20.417,0l69.128,69.122\n\n                l184.796-184.802c5.644-5.643,14.78-5.643,20.417,0c5.644,5.637,5.644,14.78,0,20.417L248.172,423.918z"/>\n\n                <path d="M306.031,611.994v-14.438l-0.022,14.438C137.286,611.994,0.012,474.726,0,306.003C0,137.274,137.274,0,305.997,0\n\n                    c168.729,0,305.997,137.274,305.997,305.997C612,474.726,474.743,611.994,306.031,611.994z M305.997,28.878\n\n                    c-152.805,0-277.119,124.314-277.119,277.119C28.89,458.796,153.209,583.11,306.009,583.11h0.022\n\n                    c152.788,0,277.091-124.314,277.091-277.113C583.122,153.192,458.802,28.878,305.997,28.878z"/>\n\n        </svg>');

    var $pushIconError = $('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\n            viewBox="0 0 78.561 78.561" xml:space="preserve" class="push-up__icon">\n\n            <circle cx="39.28" cy="57.772" r="3.632"/>\n\n            <path d="M38.792,48.347c1.104,0,2-0.896,2-2v-19c0-1.104-0.896-2-2-2s-2,0.896-2,2v19C36.792,47.451,37.688,48.347,38.792,48.347z\n\n                "/>\n\n            <path d="M46.57,11.542l-0.091-0.141c-1.852-2.854-3.766-5.806-7.199-5.806c-3.578,0-5.45,2.994-7.26,5.891\n\n                c-0.009,0.014-0.065,0.104-0.074,0.119L0.278,65.266C0.096,65.574,0,65.735,0,66.092c0,3.896,3.135,6.874,6.988,6.874h64.585\n\n                c3.854,0,6.988-2.979,6.988-6.874c0-0.357-0.096-0.614-0.277-0.921L46.57,11.542z M71.573,68.966H6.988\n\n                c-1.461,0-2.717-0.951-2.95-2.394l31.374-53.061c1.554-2.487,2.572-3.963,3.868-3.963c1.261,0,2.457,1.87,3.843,4.006\n\n                l31.399,53.007C74.29,68.003,73.034,68.966,71.573,68.966z"/>\n\n        </svg>\n\n');

    $pushContainer.appendTo($('body'));

    $pushContainer.text(text);

    if (status === 'error') {

        $pushContainer.addClass('is-error');

        $pushIconError.prependTo($pushContainer);
    } else {

        $pushContainer.addClass('is-success');

        $pushIconSuccess.prependTo($pushContainer);
    }

    poshPos();

    window.requestAnimationFrame(function () {

        $pushContainer.addClass('is-active');
    });

    setTimeout(function () {

        $pushContainer.removeClass('is-active');

        poshPos();
    }, 4500);

    setTimeout(function () {

        $pushContainer.remove();

        poshPos();
    }, 5000);

    $(document).on('click', '.js-push-up--close', function () {

        var $parent = $(this).closest('.push-up');

        $parent.removeClass('is-active');

        setTimeout(function () {

            $parent.remove();
        }, 300);

        poshPos();
    });

    function poshPos() {

        $('.push-up').each(function (e) {

            var height = $('.push-up').outerHeight(true);

            $(this).css('top', height * e + 10 + e);
        });
    }
}

$(function () {

    $(Base.init());

    Menu.init();

    Dropdown.init();

    (function Checkbox() {

        $(document).on('click', '.js-bb-checkbox', function () {

            if ($(this).find('input').is(':checked')) {

                $(this).addClass('is-checked');
            } else {

                $(this).removeClass('is-checked');
            }
        });

        //BB checkbox pseudo


        $(document).on('click', '.js-bb-checkbox--pseudo', function () {

            if ($(this).hasClass('is-checked')) {

                $(this).removeClass('is-checked');
            } else {

                $(this).addClass('is-checked');
            }
        });

        //Select All Checkbox


        $(document).on('click', '.js-bb-checkbox-select-all', function () {

            if ($(this).hasClass('is-selected')) {

                $(this).removeClass('is-selected').parent().find('.js-bb-checkbox').removeClass('is-checked').find('input').removeAttr('checked');
            } else {

                $(this).addClass('is-selected').parent().find('.js-bb-checkbox').addClass('is-checked').find('input').prop('checked', 'checked');
            }

            return false;
        });
    })();

    (function () {

        var $accordeon = $('.js-bb-accordeon');

        var $content = $accordeon.find('.bb-accordeon__content');

        var $item = $accordeon.find('.bb-accordeon__item');

        if ($accordeon.length) {

            $content.slideUp();

            $item.each(function () {

                if ($(this).hasClass('is-open')) {

                    $(this).find('.bb-accordeon__content').slideDown();
                }
            });
        }

        $(document).on('click', '.js-bb-accordeon .bb-accordeon__title', function () {

            var $parent = $(this).closest('.js-bb-accordeon');

            var $item = $(this).parent('.bb-accordeon__item');

            if ($parent.data('accordeon') === 'collapse') {

                if ($item.hasClass('is-open')) {

                    $item.removeClass('is-open').find('.bb-accordeon__content').slideUp();
                } else {

                    $parent.find('.bb-accordeon__item').removeClass('is-open').find('.bb-accordeon__content').slideUp();

                    $item.addClass('is-open').find('.bb-accordeon__content').slideDown();
                }
            } else {

                if ($item.hasClass('is-open')) {

                    $item.removeClass('is-open').find('.bb-accordeon__content').slideUp();
                } else {

                    $item.addClass('is-open').find('.bb-accordeon__content').slideDown();
                }
            }
        });
    })();
});

/**
 * Crm.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Crm = {
    init: function init() {
        this.controlBox();

        this.mobileBlock.bodyPosition();
        this.mobileBlock.requestItemClick();
        this.mobileBlock.callAplicationMobileBlock();
        this.mobileBlock.moveBlockBodyPosition();

        this.graphic.init();
        this.calendar.init();

        Crm.aplication.init();
        Crm.request.init();
        Crm.steps.init();
        Crm.studio.init();
        Crm.services.init();

        if ($(window).width() <= 768) {
            this.sliders.triumph();
            this.sliders.sliderPopupReinit();
        }

        if ($window.width() > 480) {
            new WOW().init();
        }

        this.boxResize();
        $window.resize(function () {
            Crm.boxResize();
        });
    },
    controlBox: function controlBox() {
        $document.on('click', '.js-control-box-btn', function (e) {
            $(this).parent().find('.js-control-box').slideToggle({
                start: function start() {
                    $(this).css({
                        display: 'flex'
                    });
                }
            });
            e.preventDefault();
            e.stopPropagation();
        });
    },
    boxResize: function boxResize() {
        var $menu = $('.js-menu');
        if ($window.width() <= 480) {
            $header.addClass('bg--dark');
            $menu.addClass('bg--white');
            $('.js-control-box').slideUp();
        } else {
            $header.removeClass('bg--dark');
            $menu.removeClass('bg--white');
        }
    },
    sliders: {
        //Triumph slider
        triumph: function triumph() {
            var $slider = $('.js-bb-slider--triumph');

            $slider.each(function () {
                var $slides = $(this).find('.bb-slider__slides');
                var $slide = $(this).find('.bb-slider__slide');
                var $btnNext = $(this).find('.js-bb-slider-btn--next');
                if ($slide.length > 1) {
                    $slides.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        touchMove: false,
                        infinite: false
                    });
                }

                $(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
                    if (currentSlide + 1 === slick.slideCount) {
                        $btnNext.on('click', function () {
                            $('.modal').modal('hide');
                        });
                    } else {
                        $btnNext.on('click', function () {
                            $slides.slick('slickNext');
                        });
                    }
                });

                $btnNext.on('click', function () {
                    $slides.slick('slickNext');
                });

                //Disable change slide on click dots
                $slider.find('.slick-dots li button').on('click', function (e) {
                    e.stopPropagation();
                });
            });
        },
        //Reinit slider after popup open
        sliderPopupReinit: function sliderPopupReinit() {
            $('.modal').on('shown.bs.modal', function () {
                var $slider = $(this).find('.bb-slider__slides').filter('.slick-initialized');
                if ($slider.length) {
                    $slider[0].slick.setPosition();
                }
            });
        }
    },
    mobileBlock: {
        bodyPosition: function bodyPosition() {
            var $parrent = $('.js-mobile-block');
            var $footer = $parrent.children('.mobile-block__footer');
            $parrent.children('.mobile-block__body').css('bottom', $footer.outerHeight(true));

            $parrent.find('.mobile-block__box').each(function () {
                if ($(this).children('.mobile-block__footer').length) {
                    $(this).children('.mobile-block__body').css('bottom', $('.mobile-block__box').children('.mobile-block__footer').outerHeight(true));
                }
            });
        },
        //Show / Hide mobile aplication
        callAplicationMobileBlock: function callAplicationMobileBlock() {
            var $btn = $document.find('.js-move-block--show');

            $btn.each(function () {
                if ($window.width() <= 768 && $(this).hasClass('request-item')) {
                    $(this).attr('data-move-block-target', 'request');
                }
            });

            $document.on('click', '.js-move-block--show', function () {
                var btnId = $(this).attr('data-move-block-target');
                $document.find('[data-move-block]').filter('[data-move-block=' + btnId + ']').addClass('is-open');

                $html.addClass('is-fixed');

                Crm.mobileBlock.bodyPosition();
            });

            $document.on('click', '.js-move-block--close', function (e) {
                var $box = $(this).closest('.move-block__box');
                var $parent = $(this).closest('.move-block');

                if ($box.length) {
                    $box.removeClass('is-open');
                    Crm.mobileBlock.bodyPosition();
                } else {
                    $parent.removeClass('is-open');
                    bodyFixed();
                }

                e.stopPropagation();
                e.preventDefault();
            });

            function bodyFixed() {
                if (!$document.find('.js-move-block').hasClass('is-open')) {
                    $html.removeClass('is-fixed');
                }
            }
        },
        //Click request item
        requestItemClick: function requestItemClick() {
            if ($(window).width() <= 768) {
                $document.on('click', '.js-request-item', function (e) {
                    $('.js-move-block-aplication').addClass('is-open');
                    $html.addClass('is-fixed');

                    e.preventDefault();
                    e.stopPropagation();
                });
                $document.on('click', '.js-move-block-aplication--close', function () {
                    $('.js-move-block-aplication').removeClass('is-open');

                    $html.removeClass('is-fixed');
                });
            }
        },
        moveBlockBodyPosition: function moveBlockBodyPosition() {
            var $moveBlick = $('.js-move-block');

            $moveBlick.each(function () {
                var $body = $(this).children('.move-block__body');
                var $footer = $(this).children('.move-block__footer');
                var footerHeight = void 0;

                _getHeight();

                $window.resize(function () {
                    _getHeight();
                });

                function _getHeight() {
                    footerHeight = $footer.outerHeight(true);

                    _setHeight();
                }

                function _setHeight() {
                    $body.css('bottom', footerHeight);
                }
            });
        }
    },
    graphic: {
        init: function init() {
            var _this7 = this;

            setTimeout(function () {
                _this7.detectHeight();
            }, 1500);

            $window.resize(function () {
                Crm.graphic.detectHeight();
            });
        },
        detectHeight: function detectHeight() {
            var $table = $document.find('.js-graph-table');

            $table.each(function () {
                var $tableWorker = $(this).find('.graph-table__worker');
                var $tableWorkerTr = $tableWorker.find('tr').not(':first');
                var $tableHours = $(this).find('.graph-table__hours');
                var $tableHoursTr = $tableHours.find('tr').not(':first');

                $tableHoursTr.each(function (i) {
                    var currentHoursItem = $(this).closest('.js-graph-table').find('.graph-table__worker').find('tr').not(':first').eq(i);

                    maxHeight($(this), currentHoursItem);
                });

                $tableWorkerTr.each(function (i) {
                    var currentWorkerItem = $(this).closest('.js-graph-table').find('.graph-table__hours').find('tr').not(':first').eq(i);

                    maxHeight($(this), currentWorkerItem);
                });

                function maxHeight(_this, elem) {
                    var maxHeight = 0;
                    var currentHeight = _this.outerHeight();
                    if (currentHeight > maxHeight) {
                        maxHeight = currentHeight;
                    }
                    if (currentHeight > elem.outerHeight()) {
                        elem.css('height', maxHeight);
                    }
                }
            });
        }
    },
    calendar: {
        init: function init() {
            this.moveBlock();
        },
        moveBlock: function moveBlock() {
            if ($(window).width() > 480) {
                // $('.calendar__view').appendTo('.calendar__sorting');
            } else {
                // $('.calendar__view').appendTo('.js-control-box');
                $('.js-control-box').appendTo('.calendar__sorting');
            }
        }
    }
};

/**
 * Crm Aplication
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.aplication = {
    init: function init() {
        Crm.aplication.aplicationTab();
        Crm.aplication.showNewClienForm();
        Crm.aplication.showAplicationItemOptions();
        Crm.aplication.aplicationItemCounter();
        Crm.aplication.selectShowService();
        Crm.aplication.aplicationItemReset();

        if ($window.width() >= 768) {
            Crm.aplication.searchOverlay.init();
        }
    },
    //Init Aplication tabs
    aplicationTab: function aplicationTab() {
        var $aplicationTab = $('.js-bb-tab.aplication-success__tab');

        //If aplication tab chat then hide aplication btns
        $aplicationTab.find('.tab__link').on('click', function () {
            var $btn = $('.aplication__btns, .move-block__footer');
            var $blockFooter = $('.js-move-block').children('.move-block__box').find('.move-block__footer');
            var href = $(this).attr('href');

            if (href === '#aplication-chat') {
                $btn.addClass('is-hidden');
                $blockFooter.addClass('is-hidden');
            } else {
                $btn.removeClass('is-hidden');
                $blockFooter.removeClass('is-hidden');
            }

            Crm.mobileBlock.bodyPosition();

            $('.js-scroll').getNiceScroll().resize();
        });
    },
    //Show New Client Form
    showNewClienForm: function showNewClienForm() {
        addRemoveClassBlock('.js-new-client', 'is-open');
    },
    //When click btn edit
    showAplicationItemOptions: function showAplicationItemOptions() {
        $document.on('click', '.js-aplication-item--edit', function (e) {
            $(this).addClass('is-hidden');
            $(this).closest('.js-aplication-item-service').find('.bb-input__wrap').removeClass('is-hidden');
            e.preventDefault();
        });
    },
    //Counter init function
    aplicationItemCounter: function aplicationItemCounter() {
        $('.js-aplication-item').each(function (e) {
            if (!$(this).hasClass('aplication-item--short')) {
                $(this).find('.aplication-item__counter').text(e + 1);
            }
        });
    },
    //After select master change
    selectShowService: function selectShowService() {
        $document.on('select2:select', '.js-select-show-service', function () {
            var $parrent = $(this).closest('.js-aplication-item');
            if ($parrent.hasClass('aplication-item--short')) {
                $parrent.find('.js-aplication-item-service').slideDown({
                    start: function start() {
                        $(this).css({
                            display: 'flex'
                        });
                    }
                }).end().find('.js-aplication-item-btn--reset').removeClass('is-hidden');
                $parrent.removeClass('aplication-item--short');
            } else {
                $parrent.find('.js-aplication-item-service').slideDown({
                    start: function start() {
                        $(this).css({
                            display: 'flex'
                        });
                    }
                });
            }
            Crm.aplication.aplicationItemCounter();
        });
    },
    //Aplication item reset
    aplicationItemReset: function aplicationItemReset() {
        $document.on('click', '.js-aplication-item-btn--reset', function () {
            var $parrent = $(this).closest('.js-aplication-item');
            if (!$parrent.hasClass('aplication-item--short')) {
                $parrent.addClass('aplication-item--short').find('.js-select--master, .js-select--time, .js-select-dur').val('').trigger('change').end().find('.js-aplication-item-btn--reset').addClass('is-hidden').end().find('.js-aplication-item-service').slideUp().end().find('.bb-input__wrap').addClass('is-hidden').end().find('.js-aplication-item--edit').removeClass('is-hidden').end().find('input').val('').end().find('.aplication-item__counter').html('');
            }
        });
    },
    //Serch focus show client + overlay
    searchOverlay: {
        init: function init() {
            $document.on('focus', '.js-search-overlay-input', function () {
                Crm.aplication.searchOverlay.show();
            }).on('keyup', function (e) {
                if (e.keyCode == 27) {
                    Crm.aplication.searchOverlay.hide();
                }
            }).on('click', '.js-search-overlay', Crm.aplication.searchOverlay.hide);
        },

        show: function show() {
            var $overlay = $document.find('.js-search-overlay');
            var $aplication = $document.find('.aplication');
            var $aplicationLeft = $document.find('.aplication__left');
            var $user = $document.find('.aplication__user');
            var $emptyBlock = $document.find('.aplication__empty');
            var $btnNewClient = $document.find('.js-move-block--show');

            $overlay.addClass('is-visible');
            $aplication.addClass('is-focus');
            $aplicationLeft.css('overflow', 'hidden');
            $user.addClass('animated fadeInLeft').css('display', 'block');
            $emptyBlock.hide();
            $btnNewClient.show();
        },

        hide: function hide() {
            var $input = $document.find('.js-search-overlay-input');
            var $overlay = $document.find('.js-search-overlay');
            var $aplication = $document.find('.aplication');
            var $aplicationLeft = $document.find('.aplication__left');
            var $user = $document.find('.aplication__user');
            var $emptyBlock = $document.find('.aplication__empty');
            var $btnNewClient = $document.find('.js-move-block--show');

            $overlay.removeClass('is-visible');
            $aplication.removeClass('is-focus');
            $aplicationLeft.removeAttr('style');
            $user.removeClass('animated fadeInLeft').removeAttr('style');
            $input.blur();
            $emptyBlock.show();
            $btnNewClient.hide();
        }
    }
};

/**
 * Crm Request
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.request = {
    tabInit: false,

    init: function init() {
        this.itemInfo();
        // Crm.request.tabs();

        $window.on('resize', function () {
            // Crm.request.tabs();
        });
    },
    //Replace icon when drag item
    wigetReplaceIcon: function wigetReplaceIcon(el) {
        var widget = el.closest('.request__widget');
        var item = el.closest('.request-item');
        var icon = el.find('.request-item__icon');

        var iconNew = 'request-item__icon fal fa-smile';
        var iconWork = 'request-item__icon fal fa-clock';
        var iconDone = 'request-item__icon fal fa-check-circle';
        var iconAbort = 'request-item__icon fal fa-frown';

        if (widget.hasClass('request__widget--new')) {
            icon.removeClass().addClass(iconNew);
        } else if (widget.hasClass('request__widget--work')) {
            icon.removeClass().addClass(iconWork);
        } else if (widget.hasClass('request__widget--done')) {
            icon.removeClass().addClass(iconDone);
        } else if (widget.hasClass('request__widget--abort')) {
            icon.removeClass().addClass(iconAbort);
        }
    },
    itemInfo: function itemInfo() {
        $('.request__widget').find('.request-item').each(function () {
            var icon = $(this).find('.request-item__icon');

            if ($(this).hasClass('request-item--notfilled')) {
                icon.removeClass().addClass('fal fa-info-circle').wrap('<div class="request-item__icon" tooltip="Заявка не заполненна">');
            }
        });
    },
    //Request tabs
    tabs: function tabs() {
        if ($window.width() < 1200) {
            $('.js-tab-request').tabs();
            Crm.request.tabInit = true;
        } else {
            if (Crm.request.tabInit) {
                $('.js-tab-request').tabs('destroy');
                Crm.request.tabInit = false;
            }
        }
    }
};

/**
 * Crm Services
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.services = {
    init: function init() {
        Crm.services.selectTime();
        Crm.services.showAddService();
        Crm.services.showServiceItem();

        if ($(window).width() >= 1024) {
            // Crm.services.itemHover();
            // Crm.request.sortMultiple();
        }
    },
    itemHover: function itemHover() {
        var $item = $('.js-service-item');

        $item.on('mouseenter', function (e) {
            $(this).addClass('is-hover');
        }).on('mouseleave', function () {
            var $input = $(this).find('input');
            var $select = $(this).find('select').next();
            if ($input.is(':focus') || $select.hasClass('select2-container--open')) {} else {
                $(this).removeClass('is-hover');
            }
        });
    },
    selectTime: function selectTime() {
        var $select = $('.js-service-item').find('select');
        $select.on('select2:select', function () {
            $(this).closest('.js-service-item').removeClass('is-hover');
        });
    },
    showAddService: function showAddService() {
        $document.on('click', '.js-add-service--add', function () {
            var $parent = $(this).closest('.js-add-service');
            var $btnClose = $parent.find('.js-add-service--close');
            var $blocks = $parent.find('.add-service__inner');

            $(this).hide();
            $btnClose.show();
            $blocks.removeAttr('style');
        });

        $document.on('click', '.js-add-service--close', function () {
            var $parent = $(this).closest('.js-add-service');
            var $btnOpen = $parent.find('.js-add-service--add');
            var $blocks = $parent.find('.add-service__inner');

            $(this).hide();
            $btnOpen.show();
            $blocks.css('display', 'none');
        });
    },
    showServiceItem: function showServiceItem() {
        $document.on('click', '.js-toggle', function (e) {
            var $parent = $(this).parent();
            var id = $(this).attr('data-block-target');

            $parent.find('.js-toggle').removeClass('is-checked');
            $(this).addClass('is-checked');

            $(this).closest('.js-add-service').find('input').filter(':text').toggleClass('jsCrmComboTitleServices');

            $(this).closest('.js-add-service').find('[data-block]').css('display', 'none').filter('[data-block=' + id + ']').removeAttr('style');

            e.preventDefault();
        });
    }
};

/**
 * Crm Steps
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.steps = {
    init: function init() {
        if ($(window).width() > 480) {
            // Crm.steps.sortable();
        }
        Crm.steps.tabs();
        Crm.steps.showSearch();
    },
    //Steps tabs
    tabs: function tabs() {
        $('.js-studio-step').tabs();
    },
    //Steps btn show search
    showSearch: function showSearch() {
        $document.on('click', '.js-btn-steps-search--show', function () {
            $('.steps__search').fadeToggle();
        });
    },
    //Steps sortable item
    sortable: function sortable() {
        if ($('.bb-upload__list').length) {
            $('.bb-upload__list').sortable({
                items: '.bb-upload__item:not(.is-unsortable)',
                containment: 'parent',
                cursor: 'move',
                tolerance: 'pointer',
                start: function start(e, ui) {
                    ui.item.addClass('drag-sort');
                },
                stop: function stop(e, ui) {
                    steps.replaceTitleAfterSortable();
                    ui.item.removeClass('drag-sort');
                }
            }).disableSelection();
        }
    },
    //Replace item title after sorttable
    replaceTitleAfterSortable: function replaceTitleAfterSortable() {
        var home = $('<span class="bb-upload__home">');
        home.text('Главная').appendTo($('.bb-upload__item:first'));
        $('.bb-upload__item').not(':first').find('.bb-upload__home').remove();
    }
};

/**
 * Crm Studio
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.studio = {
    init: function init() {
        Crm.studio.avatarToggleBtn();
        // Crm.studio.workerPageToggle();
        Crm.studio.categoryShow();
    },
    //Avatar btn open / close
    avatarToggleBtn: function avatarToggleBtn() {
        $document.on('click touchstart', '.js-add-avatar--open', function () {
            $('.js-add-avatar').fadeIn({
                start: function start() {
                    $(this).css({
                        display: 'flex'
                    });
                }
            });
        });
        $document.on('click touchstart', '.js-add-avatar--close', function () {
            $('.js-add-avatar').fadeOut();
        });
    },
    //Open / Close AddWorker page
    workerPageToggle: function workerPageToggle() {
        // if ($(window).width() <= 480) {
        //     //Open add warker page
        //     let $addWorker = $('.js-worker-add');

        //     $('.js-worker-item').each(function() {
        //         $(this)
        //             .removeAttr('href')
        //             .removeAttr('data-toggle');
        //     });

        //     $document.on('click', '.js-worker-item', function(e) {
        //         if ($addWorker.hasClass('is-visible')) {
        //             $addWorker.removeClass('is-visible');
        //         } else {
        //             $addWorker.addClass('is-visible');
        //         }
        //         e.stopPropagation();
        //         e.preventDefault();
        //     });
        //     //Close add worker page
        //     $('.js-worker-add--close').on('click touchstart', function() {
        //         $addWorker.removeClass('is-visible');
        //     });
        // }

        //Open add warker page
        var $addWorker = $('.js-worker-add');
        var open = false;

        $document.on('click', '.js-worker-item', function (e) {
            e.stopPropagation();
            e.preventDefault();

            if (!open) {
                _open();
            } else {
                _close();
            }
        });

        $('.js-worker-add--close').on('click touchstart', _close);

        function _open() {
            $addWorker.addClass('is-visible');
            $overlay.addClass('is-visible').addClass('.overlay--add-worker');
            $html.addClass('is-fixed');
            open = true;
        }

        function _close() {
            $addWorker.removeClass('is-visible');
            $overlay.removeClass('is-visible').removeClass('.overlay--add-worker');
            $html.removeClass('is-fixed');
            open = false;
        }
    },
    categoryShow: function categoryShow() {
        $document.on('click', '.js-category', function (e) {
            var $target = $(e.target);
            var $parent = $(this).closest('.js-category');
            var $itemHidden = $parent.find('.category__item').filter('[data-hidden="true"]');

            if ($target.is('.category__item--more')) {
                if ($parent.hasClass('is-visible')) {
                    $parent.removeClass('is-visible');
                    $itemHidden.addClass('is-hidden');
                    $(this).find('.category__item--more').text('Еще');
                } else {
                    $parent.addClass('is-visible');
                    $itemHidden.removeClass('is-hidden');
                    $(this).find('.category__item--more').text('Скрыть');
                }
            }
        });
    }
};

$(function () {
    $(Crm.init());
});

/**

 * functions.js

 *

 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>

 */

//Function Add Remove Class from Block

function addRemoveClassBlock(block, cl) {

    $(block + '--open').on('click', function () {

        $(block).addClass(cl);
    });

    $(block + '--close').on('click', function () {

        $(block).removeClass(cl);
    });
}

function addRemoveClass(block, cl) {

    $(block).on('click', function () {

        $(this).toggleClass(cl);
    });

    $(document).on('click touchstart', function (e) {

        if ($(e.target).closest(block).length) return;

        $(block).removeClass(cl);

        e.stopPropagation();
    });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXQuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRib2R5IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRvdmVybGF5IiwiJGhlYWRlciIsIiRtYWluIiwiJGJ0bkZsb2F0IiwiZmluZCIsImlzT3BlcmEiLCJvcGVyYSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJpc0Nocm9tZSIsImNocm9tZSIsImlzRXhwbG9yZXIiLCJkb2N1bWVudE1vZGUiLCJpc0VkZ2UiLCJpc0ZpcmVmb3giLCJJbnN0YWxsVHJpZ2dlciIsImlzU2FmYXJpIiwidGVzdCIsImFkZENsYXNzIiwiQmFzZSIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJ0YWIiLCJsaXN0VG9nZ2xlIiwiY29weVRleHQiLCJvd25lclBob25lIiwiY2hhbmdlQ2l0eSIsInNsaWRlciIsImNhdGFsb2dJdGVtU2xpZGVyIiwiaGVhZGVyU2VhcmNoQnRuIiwic2VsZWN0IiwiaW5wdXRzIiwiYnV0dG9ucyIsInBvcHVwIiwid2lkdGgiLCJzY3JvbGxCYXIiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImxlbmd0aCIsIm5pY2VTY3JvbGwiLCJjdXJzb3Jjb2xvciIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNldFRpbWVvdXQiLCJyZW1vdmVDbGFzcyIsImxpc3QiLCJjaGVja2JveCIsIndvcmtMaXN0IiwiaGFzQ2xhc3MiLCJyZW1vdmVBdHRyIiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCJlYWNoIiwiJGlucHV0Qm94IiwiY2xvc2VzdCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsIiRwYXJlbnQiLCJidG4iLCIkYnRuRGF0YSIsImRhdGEiLCIkaW5wdXRWYWwiLCJ2YWwiLCJhdHRyIiwic2hvdyIsIm5vdCIsImhpZGUiLCJmaWx0ZXIiLCJmYWRlT3V0IiwiZmFkZUluIiwidGV4dCIsInVzZXJQaG9uZSIsInBhcmVudCIsInBob25lIiwiJGNoYW5nZUNpdHkiLCIkY2hhbmdlQ2l0eVRpdGxlIiwiJGlucHV0Iiwic3RvcFByb3BhZ2F0aW9uIiwiJHNsaWRlciIsIiRzbGlkcyIsIiRzbGlkZSIsIiRwcmV2QXJyb3ciLCIkbmV4dEFycm93Iiwic2xpY2siLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiaW5maW5pdGUiLCJhcnJvd3MiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIiRjYXRhbG9nSXRlbVNsaWRlciIsIl90aGlzIiwiJHNsaWRlcyIsIiRzbGlkZXJEb3RzIiwiZXZlbnQiLCJwcmVwZW5kIiwiYXBwZW5kIiwic2xpZGVDb3VudCIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsImkiLCJodG1sIiwibGF6eUxvYWQiLCJ0YWJzIiwic2VhcmNoQnRuIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsIm1lc3NhZ2VTdWNjZXNzIiwibWVzc2FnZUVycm9yIiwiZGVsYXkiLCJzdGF0dXMiLCJwdXNoVXAiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCJpbnB1dEV2ZW50cyIsImlucHV0TWFzayIsImlucHV0bWFzayIsIm1hc2siLCJncmVlZHkiLCJvbkJlZm9yZVBhc3RlIiwicGFzdGVkVmFsdWUiLCJvcHRzIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiZGVmaW5pdGlvbnMiLCJ2YWxpZGF0b3IiLCJjYXJkaW5hbGl0eSIsImNhc2luZyIsImlucHV0IiwiZXhlY0NvbW1hbmQiLCJuZXh0IiwicHJldiIsImVuZCIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCJuYXRpdmVTZWxlY3QiLCJjb2xvclNlbGVjdCIsImJvcm5TZWxlY3QiLCJpY29uU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsInBob25lQ29kZSIsIm1vYmlsZVNlbGVjdCIsImV2ZW50cyIsIiRzZWxlY3ROYXRpdmUiLCIkdGl0bGUiLCJ0aXRsZVRleHQiLCJwbGFjZWhvbGRlciIsIiRmaXJzdE9wdGlvbiIsIiRuZXdPcHRpb24iLCJkaXNhYmxlZCIsInNlbGVjdGVkIiwidHlwZSIsImlzIiwicmVtb3ZlIiwiYWRkUmVzZXRCdG4iLCJwcmVwZW5kVG8iLCJ3cmFwIiwiJGljb25TZWxlY3QiLCJpZm9ybWF0IiwiZHJvcGRvd25QYXJlbnQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJGJvcm5TZWxlY3QiLCJhbGxvd0NsZWFyIiwiJHNlbGVjdCIsIiR5ZWFyU2VsZWN0IiwicmVzZXRCdG4iLCJzaWJsaW5ncyIsImJsdXIiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiJGlucHV0U2VhcmNoIiwiJHJlc3VsdEl0ZW0iLCIkaXRlbSIsIiRidG5DbG9zZSIsIiRuYW1lIiwidHJpbSIsIiRzZXJ2aWNlIiwic3BsaXQiLCJqb2luIiwicG9wdXBGYW5jeUJveCIsIndob0lzIiwiY2hhbmdlRm9ybVRpdGxlIiwicmVpbml0IiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2hlY2tWYWxpZGF0aW9uIiwiJGZvcm1TdWNjZXNzIiwiTWVudSIsIm1lbnUiLCIkbWVudSIsIiRoYW1idXJnZXIiLCIkaGFtYnVyZ2VyQ3JtIiwiJG1lbnVJdGVtIiwiJG1lbnVPdmVsYXkiLCIkbWVudUl0ZW1Ecm9wZG93biIsImFjdGl2ZUNsYXNzIiwiZHJvcGRvd25BY3RpdmVDbGFzcyIsIm1lbnVJdGVtRHJvcGRvd25FdmVudCIsIl9jbG9zZSIsIl9vcGVuIiwiJHRhcmdldCIsInRhcmdldCIsIkRyb3Bkb3duIiwiZHJvcGRvd24iLCIkZHJvcGRvd24iLCIkYnRuRHJvcGRvd25DbG9zZSIsIiRidG5GbG9hdGluZyIsIiRsaXN0Iiwic3R5bGVUcmFuc2Zvcm0iLCJwb3NpdGlvbiIsImJvdHRvbSIsInJpZ2h0IiwiekluZGV4Iiwic3R5bGUiLCJyZW5kZXIiLCIkZHJvcGRvd25PdmVybGF5IiwiJGRyb3Bkb3duTGlzdCIsImFwcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJfdG9nZ2xlIiwiY29uc29sZSIsImxvZyIsInRvZ2dsZUNsYXNzIiwib3B0aW9ucyIsIiRwdXNoQ29udGFpbmVyIiwiJHB1c2hJY29uU3VjY2VzcyIsIiRwdXNoSWNvbkVycm9yIiwicG9zaFBvcyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImhlaWdodCIsIm91dGVySGVpZ2h0IiwiQ2hlY2tib3giLCJwcm9wIiwiJGFjY29yZGVvbiIsIiRjb250ZW50Iiwic2xpZGVVcCIsInNsaWRlRG93biIsIkNybSIsImNvbnRyb2xCb3giLCJtb2JpbGVCbG9jayIsImJvZHlQb3NpdGlvbiIsInJlcXVlc3RJdGVtQ2xpY2siLCJjYWxsQXBsaWNhdGlvbk1vYmlsZUJsb2NrIiwibW92ZUJsb2NrQm9keVBvc2l0aW9uIiwiZ3JhcGhpYyIsImNhbGVuZGFyIiwiYXBsaWNhdGlvbiIsInJlcXVlc3QiLCJzdGVwcyIsInN0dWRpbyIsInNlcnZpY2VzIiwic2xpZGVycyIsInRyaXVtcGgiLCJzbGlkZXJQb3B1cFJlaW5pdCIsIldPVyIsImJveFJlc2l6ZSIsInNsaWRlVG9nZ2xlIiwic3RhcnQiLCJkaXNwbGF5IiwiJGJ0bk5leHQiLCJ0b3VjaE1vdmUiLCJtb2RhbCIsInNldFBvc2l0aW9uIiwiJHBhcnJlbnQiLCIkZm9vdGVyIiwiY2hpbGRyZW4iLCIkYm94IiwiYm9keUZpeGVkIiwiJG1vdmVCbGljayIsImZvb3RlckhlaWdodCIsIl9nZXRIZWlnaHQiLCJfc2V0SGVpZ2h0IiwiZGV0ZWN0SGVpZ2h0IiwiJHRhYmxlIiwiJHRhYmxlV29ya2VyIiwiJHRhYmxlV29ya2VyVHIiLCIkdGFibGVIb3VycyIsIiR0YWJsZUhvdXJzVHIiLCJjdXJyZW50SG91cnNJdGVtIiwibWF4SGVpZ2h0IiwiY3VycmVudFdvcmtlckl0ZW0iLCJlbGVtIiwiY3VycmVudEhlaWdodCIsIm1vdmVCbG9jayIsImFwbGljYXRpb25UYWIiLCJzaG93TmV3Q2xpZW5Gb3JtIiwic2hvd0FwbGljYXRpb25JdGVtT3B0aW9ucyIsImFwbGljYXRpb25JdGVtQ291bnRlciIsInNlbGVjdFNob3dTZXJ2aWNlIiwiYXBsaWNhdGlvbkl0ZW1SZXNldCIsInNlYXJjaE92ZXJsYXkiLCIkYXBsaWNhdGlvblRhYiIsIiRibG9ja0Zvb3RlciIsImhyZWYiLCJhZGRSZW1vdmVDbGFzc0Jsb2NrIiwia2V5Q29kZSIsIiRhcGxpY2F0aW9uIiwiJGFwbGljYXRpb25MZWZ0IiwiJHVzZXIiLCIkZW1wdHlCbG9jayIsIiRidG5OZXdDbGllbnQiLCJ0YWJJbml0IiwiaXRlbUluZm8iLCJ3aWdldFJlcGxhY2VJY29uIiwid2lkZ2V0IiwiaXRlbSIsImljb25OZXciLCJpY29uV29yayIsImljb25Eb25lIiwiaWNvbkFib3J0Iiwic2VsZWN0VGltZSIsInNob3dBZGRTZXJ2aWNlIiwic2hvd1NlcnZpY2VJdGVtIiwiaXRlbUhvdmVyIiwiJGJsb2NrcyIsIiRidG5PcGVuIiwic2hvd1NlYXJjaCIsImZhZGVUb2dnbGUiLCJzb3J0YWJsZSIsIml0ZW1zIiwiY29udGFpbm1lbnQiLCJjdXJzb3IiLCJ0b2xlcmFuY2UiLCJ1aSIsInN0b3AiLCJyZXBsYWNlVGl0bGVBZnRlclNvcnRhYmxlIiwiZGlzYWJsZVNlbGVjdGlvbiIsImhvbWUiLCJhdmF0YXJUb2dnbGVCdG4iLCJjYXRlZ29yeVNob3ciLCJ3b3JrZXJQYWdlVG9nZ2xlIiwiJGFkZFdvcmtlciIsIm9wZW4iLCIkaXRlbUhpZGRlbiIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssUUFBUUwsRUFBRSxNQUFGLENBQWQ7QUFDQSxJQUFNTSxXQUFXTixFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUSxVQUFVUixFQUFFLFNBQUYsQ0FBaEI7QUFDQSxJQUFNUyxRQUFRVCxFQUFF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WUFBVzs7QUFFdkM1QyxVQUFFNGEsS0FBRixFQUFTbFosUUFBVCxDQUFrQm1aLEVBQWxCO0FBRUgsS0FKRDs7QUFNQTdhLE1BQUU0YSxRQUFRLFNBQVYsRUFBcUJoWSxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFXOztBQUV4QzVDLFVBQUU0YSxLQUFGLEVBQVNsWCxXQUFULENBQXFCbVgsRUFBckI7QUFFSCxLQUpEO0FBTUg7O0FBSUQsU0FBU3RTLGNBQVQsQ0FBd0JxUyxLQUF4QixFQUErQkMsRUFBL0IsRUFBbUM7O0FBRS9CN2EsTUFBRTRhLEtBQUYsRUFBU2hZLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVc7O0FBRTVCNUMsVUFBRSxJQUFGLEVBQVE0VCxXQUFSLENBQW9CaUgsRUFBcEI7QUFFSCxLQUpEOztBQVFBN2EsTUFBRUcsUUFBRixFQUFZeUMsRUFBWixDQUFlLGtCQUFmLEVBQW1DLFVBQVNDLENBQVQsRUFBWTs7QUFFM0MsWUFBSTdDLEVBQUU2QyxFQUFFMFAsTUFBSixFQUFZbE8sT0FBWixDQUFvQnVXLEtBQXBCLEVBQTJCN1gsTUFBL0IsRUFBdUM7O0FBRXZDL0MsVUFBRTRhLEtBQUYsRUFBU2xYLFdBQVQsQ0FBcUJtWCxFQUFyQjs7QUFFQWhZLFVBQUVnRCxlQUFGO0FBRUgsS0FSRDtBQVVIIiwiZmlsZSI6ImNhYmluZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXHJcbmNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbmNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xyXG5jb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcclxuY29uc3QgJGh0bWwgPSAkKCdodG1sJyk7XHJcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcclxuY29uc3QgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xyXG5jb25zdCAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xyXG5jb25zdCAkbWFpbiA9ICQoJy5jYWJpbmV0Jyk7XHJcbmNvbnN0ICRidG5GbG9hdCA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4vKipcclxuXHJcbiAqIEJhc2UuanNcclxuXHJcbiAqXHJcblxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG5cclxuICovXHJcblxyXG5cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgaXNPcGVyYSA9ICEhd2luZG93Lm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwO1xyXG5cclxuXHJcblxyXG4gICAgdmFyIGlzQ2hyb21lID0gISF3aW5kb3cuY2hyb21lICYmICFpc09wZXJhO1xyXG5cclxuXHJcblxyXG4gICAgdmFyIGlzRXhwbG9yZXIgPVxyXG5cclxuXHJcblxyXG4gICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgISFkb2N1bWVudC5kb2N1bWVudE1vZGUgJiYgIWlzRWRnZTtcclxuXHJcblxyXG5cclxuICAgIHZhciBpc0ZpcmVmb3ggPSB0eXBlb2Ygd2luZG93Lkluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJztcclxuXHJcblxyXG5cclxuICAgIHZhciBpc1NhZmFyaSA9IC9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgaWYgKGlzQ2hyb21lKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1jaHJvbWUnKTtcclxuXHJcblxyXG5cclxuICAgIH0gZWxzZSBpZiAoaXNTYWZhcmkpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLXNhZmFyaScpO1xyXG5cclxuXHJcblxyXG4gICAgfSBlbHNlIGlmIChpc0ZpcmVmb3gpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWZpcmVmb3gnKTtcclxuXHJcblxyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRhYigpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RUb2dnbGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb3B5VGV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLm93bmVyUGhvbmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDaXR5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2F0YWxvZ0l0ZW1TbGlkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5oZWFkZXJTZWFyY2hCdG4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyB0aGlzLmRyb3Bkb3duLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3QuaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0cy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAuaW5pdCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmZvcm0uaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vSW5pdCBtb2R1bGVzXHJcblxyXG4gICAgICAgIC8vIFRhYi5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gbGV0IHMgPSBuZXcgU2VsZWN0KCk7XHJcblxyXG4gICAgICAgIC8vIHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXIoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMubWVudS5oYW1idXJnZXJCdG4oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMubWVudS5jbGlja091c2lkZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5tZW51LnNlYXJjaEJ0bk9wZW5DbG9zZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TdG9wIGRyYWcgSW1nXHJcblxyXG4gICAgICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2Nyb2xsQmFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyM1ODVhNTknLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzJweCcsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMidcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm9uKCdtb3VzZW92ZXIgbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL1JlbW92ZSBwcmVsb2FkZXJcclxuXHJcbiAgICByZW1vdmVQcmVsb2FkZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG5cclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIGNoZWNib3ggJiBjaGVja2JveFBzZXVkb1xyXG5cclxuICAgIC8vIGNoZWNrYm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgLy8gICAgICAgICBpZiAoXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcclxuXHJcbiAgICAvLyAgICAgICAgICkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIC8vICAgICAvL0JCIGNoZWNrYm94IHBzZXVkb1xyXG5cclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy8gICAgIC8vU2VsZWN0IEFsbCBDaGVja2JveFxyXG5cclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC1zZWxlY3QtYWxsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKSkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy9DdXN0b20gYWNjb3JkZW9uXHJcblxyXG4gICAgLy8gYWNjb3JkZW9uOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyAgICAgbGV0ICRhY2NvcmRlb24gPSAkKCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAgaWYgKCRhY2NvcmRlb24ubGVuZ3RoKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XHJcblxyXG4gICAgLy8gICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAgLy9BY2NvcmRlb24gY29sbGFwc2VcclxuXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItYWNjb3JkZW9uIC5iYi1hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgLy8gICAgICAgICBlXHJcblxyXG4gICAgLy8gICAgICkge1xyXG5cclxuICAgIC8vICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcbiAgICAvLyAgICAgICAgIGxldCAkaXRlbSA9ICQodGhpcykucGFyZW50KCcuYmItYWNjb3JkZW9uX19pdGVtJyk7XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAgICAgIGlmICgkcGFyZW50LmRhdGEoJ2FjY29yZGVvbicpID09PSAnY29sbGFwc2UnKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgbGlzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdFRvZ2dsZSgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9ICQoJy5qcy1saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrYm94ID0gbGlzdC5maW5kKCcuanMtYmItY2hlY2tib3gnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya0xpc3QgPSBsaXN0LmZpbmQoJy5qcy1saXN0LXRvZ2dsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrYm94Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tib3guaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3RUb2dnbGUoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9Db3B5IHRleHQgY2xpY2sgbGlua1xyXG5cclxuICAgIGNvcHlUZXh0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGNiID0gbmV3IENsaXBib2FyZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vaWYgaGFzIGlucHV0IHRoZW4gY29weSBpbnB1dCB2YWx1ZSBpbiBkYXRhIGF0dHJcclxuXHJcbiAgICAgICAgJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGlucHV0Qm94ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYm94Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRpbnB1dEJveC5maW5kKCcuYmItaW5wdXRfX2ljb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgPSAkaW5wdXRCb3guZmluZCgnLmpzLWlucHV0LS1jbGVhcicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRoaW50ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG4gPSAkcGFyZW50LmZpbmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5EYXRhID0gJCh0aGlzKS5kYXRhKCdjbGlwYm9hcmQtdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0VmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uYXR0cignZGF0YS1jbGlwYm9hcmQtdGV4dCcsICRidG5EYXRhICsgJGlucHV0VmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtaW5wdXQtLWNsZWFyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC52YWwoJycpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5mYWRlT3V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9faWNvbicpXHJcblxyXG4gICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZhZGVJbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL1Nob3cgcGhvbmUgbnVtYmVyXHJcblxyXG4gICAgb3duZXJQaG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy11c2VyLXBob25lJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICdqYXZhc2NyaXB0OnZvaWQoMCk7JylcclxuXHJcbiAgICAgICAgICAgICAgICAudGV4dCgkKHRoaXMpLmRhdGEoJ3Bob25lLWhpZGVuJykpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXVzZXItcGhvbmUtLXNob3cnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB1c2VyUGhvbmUgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy11c2VyLXBob25lJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGhvbmUgPSB1c2VyUGhvbmUuZGF0YSgncGhvbmUnKTtcclxuXHJcbiAgICAgICAgICAgIHVzZXJQaG9uZVxyXG5cclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcblxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAndGVsOicgKyBwaG9uZSlcclxuXHJcbiAgICAgICAgICAgICAgICAudGV4dChwaG9uZSk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DaXR5IHNlbGVjdFxyXG5cclxuICAgIGNoYW5nZUNpdHk6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJGNoYW5nZUNpdHkgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgbGV0ICRjaGFuZ2VDaXR5VGl0bGUgPSAkY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX3RpdGxlIHNwYW4nKTtcclxuXHJcbiAgICAgICAgbGV0ICRpbnB1dCA9ICRjaGFuZ2VDaXR5LmZpbmQoJ2lucHV0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJGlucHV0Lm9uKCdjbGljayBmb2N1cycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGNoYW5nZUNpdHlUaXRsZS50ZXh0KCQodGhpcykudGV4dCgpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcblxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtYmItc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZHMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICRwcmV2QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICRuZXh0QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2F0YWxvZyBJdGVtIFNsaWRlclxyXG5cclxuICAgIGNhdGFsb2dJdGVtU2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNhdGFsb2dJdGVtU2xpZGVyID0gJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHRhYjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iYi10YWInKS50YWJzKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL01vYmlsZSBTZWFyY2ggQnRuIG9wZW4vY2xvc2VcclxuXHJcbiAgICBoZWFkZXJTZWFyY2hCdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgc2VhcmNoQnRuID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtYnRuJyk7XHJcblxyXG4gICAgICAgIHNlYXJjaEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25zOiB7XHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idG5Ib3ZlckFuaW1hdGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3RhdHVzQW5pbWF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idG5Hb1RvKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ0bkZsb2F0aW5nKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ0blB1c2goKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gZXhwYW5kZWRcclxuXHJcbiAgICAgICAgYnRuRXhwYW5kZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgYWRkUmVtb3ZlQ2xhc3MoJy5qcy1idG4tZXhwYW5kZWQnLCAnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIGFuaW1hdGUgb24gaG92ZXJcclxuXHJcbiAgICAgICAgYnRuSG92ZXJBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiByZWxZLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiByZWxZLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBzdGF0dXMgYW5pbWF0ZVxyXG5cclxuICAgICAgICBidG5TdGF0dXNBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGljaysrO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjbGljayA8PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAyNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1yZWFkeScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2sgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9mbG9hdGluZyBidG4gYW5pbWF0aW5cclxuXHJcbiAgICAgICAgYnRuRmxvYXRpbmc6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRidG4gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJ1biA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICghJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v0J7QsdGA0LDQsdC+0YLRh9C40Log0LTQvtCx0LDQstC70Y/QtdGCINC60LvQsNGB0YHRiyDQt9Cw0YLQtdC8INC+0YLQv9C40YHRi9Cy0LDRgtC10YHRjyDQvtGCINGB0L7QsdGL0YLQuNGPXHJcblxyXG4gICAgICAgICAgICBsZXQgaGVuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG4ub2ZmKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPINC30LDQutGA0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVBbmltYXRpb24oZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcnVuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1biA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsICcuanMtYnRuLWZsb2F0aW5nJywgaGVuZGxlcik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy12aXNpYmxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ292ZXJsYXktLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bklkID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcubWQtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuSWQudHJpZ2dlcignY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLmpzLWJ0bi1mbG9hdGluZyAuYnRuLWZsb2F0aW5nX19saW5rJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZW1vdmVBbmltYXRpb24oJCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL9Ca0LvQuNC6INCyINC90LUg0LrQvdC+0L/QutC4INGB0LrRgNGL0LLQsNC10YIg0L7QstC10YDQu9C10Lkg0Lgg0LrQvdC+0L/QutC4XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheS0tYnRuLWZsb2F0aW5nJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZhLWxlYXZlLWFjdGl2ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ292ZXJsYXktLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy8gICAgIGxldCBzY3JvbGxIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gJHdpbmRvdy5oZWlnaHQoKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgaWYgKChzY3JvbGxIZWlnaHQgLSBzY3JvbGxQb3NpdGlvbikgLyBzY3JvbGxIZWlnaHQgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgJGJ0bi5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgJGJ0bi5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0czoge1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG5cclxuICAgICAgICBpbnB1dE1hc2s6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy10aW1lLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtdGltZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ojk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb2RlLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29kZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzkgOSA5IDknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTkuOTkuOTk5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29uZmlybS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvbmZpcm0tbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1lbWFpbC1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWVtYWlsLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyp7MSwyMH1bLip7MSwyMH1dWy4qezEsMjB9XVsuKnsxLDIwfV1AKnsxLDIwfVsuKnsyLDZ9XVsuKnsxLDJ9XScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uKHBhc3RlZFZhbHVlLCBvcHRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXN0ZWRWYWx1ZSA9IHBhc3RlZFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFzdGVkVmFsdWUucmVwbGFjZSgnbWFpbHRvOicsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqJzoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS16ISMkJSYnKisvPT9eX2B7fH1+LV1cIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6ICdsb3dlcidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnB1dEV2ZW50czogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtLWNvcHknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1jb3B5LXRleHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItc2hhcmVfX2xpbmsnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGlucHV0IHNlbGVjdCB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LWZvY3VzLS1jb3B5Jykub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1Nob3cgUGFzc3dvcmRcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9IaWRlIFBhc3N3b3JkXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWlucHV0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItaW5wdXQtdGlwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ25vLWNsb3NlJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWluZm8gaXMtZXJyb3IgaXMtaW52YWxpZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjdDoge1xyXG5cclxuICAgICAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLXNlcnZpY2VzJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogdGltZUFuZFByaWNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0ljb24gbWVudHJvIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW1hZ2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdpbWFnZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1ldHJvLWljb24gbWV0cm8taWNvbi0tJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vU2VsZWN0IEFkZCBQcmljZSBUaW1lICYgUHJpY2VcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRpbWVBbmRQcmljZShvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxUaW1lID0gJChvcHQuZWxlbWVudCkuZGF0YSgndGltZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFByaWNlID0gJChvcHQuZWxlbWVudCkuZGF0YSgncHJpY2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0LnRleHQgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVGltZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQcmljZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3RJY29uKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJvcm5TZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaWNvblNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93WWVhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oaWRlWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5waG9uZUNvZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50cygpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBuYXRpdmVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyICRzZWxlY3ROYXRpdmUgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSBfdGhpcy5jbG9zZXN0KCcuYmItaW5wdXQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0aXRsZSA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X190aXRsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpdGxlVGV4dCA9ICR0aXRsZS50ZXh0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciA9IF90aGlzLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gX3RoaXMuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJG5ld09wdGlvbiA9ICQoJzxvcHRpb24+JykuYXR0cih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSAkcGFyZW50LmRhdGEoJ3R5cGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVUZXh0ICE9PSAnJyB8fCB0aXRsZVRleHQgIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRpdGxlVGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIgIT09ICcnIHx8XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIgIT09ICd1bmRlZmluZWQnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gcGxhY2Vob2xkZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ2JiLWlucHV0LS10cmFuc2Zvcm0nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24uaXMoJzplbXB0eScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2VsZWN0ZWQnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb24ucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uLnJlbW92ZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHRleHQpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5hZGRSZXNldEJ0bihfdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9maXJzdE9wdGlvbiBub3QgZW1wdHlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NlbGVjdGVkJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRuZXdPcHRpb24ucHJlcGVuZFRvKF90aGlzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmFzZS5zZWxlY3QuYWRkUmVzZXRCdG4oX3RoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGZpcnN0T3B0aW9uLmlzKCc6ZW1wdHknKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogJ3NlbGVjdGVkJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogJ2Rpc2FibGVkJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hhcy1wbGFjZWhvbGRlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdoYXMtcGxhY2Vob2xkZXInKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdoYXMtcGxhY2Vob2xkZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gX3RoaXMuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi5pcygnOmVtcHR5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvbi5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gc2VsZWN0SWNvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAvL1RyYW5zZm9ybSBzZWxlY3QgaW4gaWNvbiBzZWxlY3RcclxuXHJcbiAgICAgICAgLy8gICAgIGxldCAkc2VsZWN0ID0gJChkb2N1bWVudCkuZmluZCgnLmpzLXNlbGVjdC1pY29uJyk7XHJcblxyXG4gICAgICAgIC8vICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGljb24gPSAkKHRoaXMpLmRhdGEoJ3NlbGVjdC1pY29uJyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGljb25IdG1sID0gYDxzcGFuIGNsYXNzPVwiYmItc2VsZWN0X19pY29uXCI+XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXVzZXIgYmItc2VsZWN0X19pY29cIj5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyMke2ljb259XCI+PC91c2U+XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPmA7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0ICRpY29uSHRtbCA9ICQoaWNvbkh0bWwpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICRpY29uSHRtbC5wcmVwZW5kVG8oJCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYmItc2VsZWN0LS1pY29uJyk7XHJcblxyXG4gICAgICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gfSxcclxuXHJcbiAgICAgICAgZXZlbnRzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGljb25TZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpY29uU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWljb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGljb25TZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpZm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaWZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBmb250YXdlc29tZSBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpZm9ybWF0KGljb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxPcHRpb24gPSBpY29uLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3Bhbj48aSBjbGFzcz1cInNlbGVjdDJfX2ljb24nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdpY29uJykgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjwvaT4gJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uLnRleHQgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29sb3JTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRjb2xvclNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1jb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkY29sb3JTZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLnNlbGVjdC1jb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NlYXJjaC1lbmFibGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2xvciBiYWxsIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpQmFsbChjb2xvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJG9yaWdpbmFsT3B0aW9uID0gY29sb3IuZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yQmFsbCA9ICQoJG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdjb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvci50ZXh0Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2xpbmVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfVwiPjwvc3Bhbj48cD4gJHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IudGV4dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPC9wPjwvZGl2PmBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fYmFsbFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9IFwiPiA8L3NwYW4+IDwvZGl2PmBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYm9yblNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJvcm5TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1ib3JuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkYm9yblNlbGVjdC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJvcm5TZWxlY3Quc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRib3JuU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LS1ib3JuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LWJvcm5fX3NlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9ICQodGhpcykuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdiYi1pbnB1dC0tdHJhbnNmb3JtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXQtYm9ybicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItaW5wdXQtYm9ybi0tdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X190aXRsZScpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmFkZFJlc2V0QnRuKCRib3JuU2VsZWN0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd1llYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtc2V0LXllYXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoaWRlWWVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHllYXJTZWxlY3QgPSAkKCcuanMtc2VsZWN0LWJvcm4tLWNsZWFyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnVuc2VsZWN0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6dW5zZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtYm9ybicpID09PSAneWVhcidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSBlbDtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJHNlbGVjdC5jbG9zZXN0KCcuYmItaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXNldEJ0biA9XHJcblxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYmItc2VsZWN0X19yZXNldCBqcy1zZWxlY3QtLXJlc2V0XCI+PGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPjwvc3Bhbj4nO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRuZXdPcHRpb24gPSAkKCc8b3B0aW9uPicpLmF0dHIoe1xyXG5cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChyZXNldEJ0bik7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hcHBlbmQocmVzZXRCdG4pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmpzLXNlbGVjdC0tcmVzZXQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzZWxlY3Q7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5zaWJsaW5ncygnLmpzLXNlbGVjdC1ib3JuJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3QgPSAkKHRoaXMpLnNpYmxpbmdzKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LWJvcm5fX3NlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3QgPSAkKHRoaXMpLnNpYmxpbmdzKCcuanMtc2VsZWN0LW5hdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXRyYW5zZm9ybScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRuZXdPcHRpb24ucHJlcGVuZFRvKCRzZWxlY3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRzZWxlY3QudmFsKCRwYXJlbnQuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJykudmFsKCkpLmJsdXIoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdiYi1pbnB1dC1ib3JuX19zZWxlY3QtLXllYXInKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50Lm5leHQoJy5iYi1pbnB1dC1ib3JuX19idG4nKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVTZWxlY3Rpb24ob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlUmVzdWx0KG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0VmFsICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkcGhvbmVDb2RlQm94ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dC1waG9uZS1jb2RlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkcGhvbmVDb2RlQm94Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRwaG9uZUNvZGVCb3guZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzKS5maW5kKCcuYmItaW5wdXRfX2lucHV0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBzZWxlY3RDb2RlUmVzdWx0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogc2VsZWN0Q29kZVNlbGVjdGlvbixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1pbnB1dC0tc2VsZWN0LXZhbHVlXCI+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25TZWxlY3QgPSAkcGFyZW50LmZpbmQoJ29wdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdFZhbHVlID0gJHBhcmVudC5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoY291bnRlcikudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1tb3ZlLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19maWVsZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19yZXN1bHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vdmUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRuYW1lID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyX19uYW1lJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZXJ2aWNlID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLWluZm9fX3RpdGxlIHNwYW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcgKyAnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gudmFsKCRuYW1lIHx8ICRzZXJ2aWNlKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuYmItaW5wdXQtLXRyYW5zZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb3ZlLXNlbGVjdF9fcmVzdWx0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBvcHVwOiB7XHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wb3B1cEZhbmN5Qm94KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndob0lzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWluaXQoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG5cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZDogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlc1wiXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2ZhbmN5Ym94LWNvbnRhaW5lci0taW1hZ2UnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrQ29udGVudDogJ2Nsb3NlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGU6ICdjbG9zZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0bjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNtYWxsQnRuOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuXHJcbiAgICAgICAgd2hvSXM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXdob2lzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gJCgnI2F1dGgtZm9ybScpLmZpbmQoJy5mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdob2lzID09PSAnbWFzdGVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdob2lzID09PSAnc3R1ZGlvJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1zdHVkaW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1jbGllbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9EdW5hbWljbHkgY2hhbmdlIGZvcm0gdGl0bGVcclxuXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZm9ybToge1xyXG5cclxuICAgICAgICAvLyBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2hlY2tWYWxpZGF0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIH0sXHJcblxyXG5cclxuXHJcbiAgICAgICAgY2hlY2tWYWxpZGF0aW9uOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJCgnLmZvcm0tc3VjY2Vzc19fcm9sZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRmb3JtU3VjY2VzcyA9ICQoJy5mb3JtLXN1Y2Nlc3NfX3JvbGVzJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd6LWluZGV4JywgJzIwMCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkYnRuLm5vdCgkKHRoaXMpKS5hZGRDbGFzcygnbW92ZS1vdXQnKTtcclxuXHJcbiAgICAgICAgICAgICRmb3JtU3VjY2Vzcy5hZGRDbGFzcygnaXMtZXJyb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5ub3QoJCh0aGlzKSkuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuXHJcbmNvbnN0IE1lbnUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHJcbiAgICBsZXQgbWVudSA9IHt9O1xyXG5cclxuXHJcblxyXG4gICAgbGV0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcclxuXHJcblxyXG5cclxuICAgIGxldCAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xyXG5cclxuXHJcblxyXG4gICAgbGV0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcclxuXHJcblxyXG5cclxuICAgIGxldCAkbWVudSA9ICQoJy5qcy1tZW51Jyk7XHJcblxyXG5cclxuXHJcbiAgICBsZXQgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuXHJcblxyXG5cclxuICAgIGxldCAkaGFtYnVyZ2VyQ3JtID0gJCgnLmpzLWhhbWJ1cmdlcicpO1xyXG5cclxuXHJcblxyXG4gICAgbGV0ICRtZW51SXRlbSA9ICQoJy5qcy1tZW51IC5tZW51X19pdGVtJyk7XHJcblxyXG5cclxuXHJcbiAgICBsZXQgJG1lbnVPdmVsYXkgPSAkKCcuanMtbWVudS1vdmVybGF5Jyk7XHJcblxyXG5cclxuXHJcbiAgICBsZXQgJG1lbnVJdGVtRHJvcGRvd24gPSAkKGRvY3VtZW50KS5maW5kKCcuanMtbWVudS1pdGVtLWRyb3Bkb3duJyk7XHJcblxyXG5cclxuXHJcbiAgICBsZXQgJGJ0bkZsb2F0ID0gJChkb2N1bWVudCkuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuXHJcblxyXG4gICAgbGV0IGFjdGl2ZUNsYXNzID0gJ2lzLWFjdGl2ZSc7XHJcblxyXG5cclxuXHJcbiAgICBsZXQgZHJvcGRvd25BY3RpdmVDbGFzcyA9ICdtZW51LWRyb3Bkb3duLS1vcGVuJztcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBtZW51LmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLmV2ZW50cygpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMubWVudUl0ZW1Ecm9wZG93bkV2ZW50KCk7XHJcblxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIG1lbnUuZXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbWVudS5fb3BlbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgJGhhbWJ1cmdlckNybS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIG1lbnUuX29wZW4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAkbWVudUl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CV0YHQu9C4INC90LXRgiDQstC70L7QttC10L3QvdC+0LPQviDQvNC10L3RjlxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2pzLW1lbnUtaXRlbS1kcm9wZG93bicpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudUl0ZW0ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QldGB0LvQuCDQtdGB0YLRjCDQstC70L7QttC10L3QvdC+0LUg0LzQtdC90Y5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8v0JXRgdC70Lgg0YLQsNGA0LPQtdGCINGB0YHRi9C70LrQsCDQvdC+INC90LUg0LrQvdC+0LrQsCDQntGC0LzQtdC90LjRgtGMXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5oYXNDbGFzcygnbWVudS1kcm9wZG93bl9fbGluaycpICYmXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgISR0YXJnZXQuaGFzQ2xhc3MoJ21lbnUtZHJvcGRvd25fX2xpbmstLWFib3J0JylcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJHRhcmdldC5wYXJlbnQoJy5tZW51LWRyb3Bkb3duX19pdGVtJyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v0J/QtdGA0LXQutC70Y7Rh9Cw0LXQvCDQsNC60YLQuNCy0L3Ri9C5INC60LvQsNGB0YEg0YMg0LPQu9Cw0LLQvdC+0Lkg0YHRgdGL0LvQutC4INC80LXQvdGOINC4INC+0YLQutGA0YvQstCw0LXQvCDQstC70L7QttC10L3QvdC+0LUg0LzQtdC90Y5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWVudUl0ZW0ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v0J/QtdGA0LXQutC70Y7Rh9Cw0LXQvCDQsNC60YLQuNCy0L3Ri9C5INC60LvQsNGB0YEg0YMg0LLQu9C+0LbQtdC90L3Ri9GFIGxpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLm1lbnUtZHJvcGRvd25fX2l0ZW0nKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9Ch0LTQstC40LPQsNC10Lwg0LrQvtC90YLQtdC90YJcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/QldGB0LvQuCDRgtCw0YDQs9C10YIg0LrQvdC+0LrQsCDQntGC0LzQtdC90LjRgtGMINC/0YDQvtGB0YLQviDQt9Cw0LrRgNGL0LLQsNC10Lwg0LzQtdC90Y5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0Lmhhc0NsYXNzKCdtZW51LWRyb3Bkb3duX19saW5rJykgJiZcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0Lmhhc0NsYXNzKCdtZW51LWRyb3Bkb3duX19saW5rLS1hYm9ydCcpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICApIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL9CV0YHQu9C4INGC0LDRgNCz0LXRgiDQndCVINGB0YHRi9C70LrQsCwg0L/RgNC+0LLQtdGA0Y/QtdC8INC90LAg0L3QsNC70LjRh9C40LUg0LDQutGC0LjQstC90L7Qs9C+INC60LvQsNGB0YHQsCDRgyDQtNGA0L7Qv9C00LDRg9C90LBcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtZW51LW9wZW4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdC5mYWRlT3V0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8v0JjQstC10L3RgiDQutC70LjQutCwINC/0L4g0LDQsNC60L7QtNC10L7QvdGDINCy0L3Rg9GC0YDQuCDQvNC10L3RjlxyXG5cclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuanMtbW9iaWxlLW5hdicpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdl9faXRlbScpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2JiLWFjY29yZGVvbl9faXRlbScpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC5lbmQoKVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCBhJylcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/Ql9Cw0LrRgNCy0LDQtdC8INC80LXQvdGOINC/0L4g0LrQu9GO0LrRgyDQvdCwINC+0LLQtdGA0LvRjdC5XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5vdmVybGF5LS1tZW51JywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/Ql9Cw0LrRgNCy0LDQtdC8INC80LXQvdGOINC/0L4g0LrQu9GO0LrRgyDQvdCwINC+0LLQtdGA0LvRjdC5XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1tZW51LW92ZXJsYXknLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAkKCcuanMtbWVudSAubWVudV9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBtZW51Lm1lbnVJdGVtRHJvcGRvd25FdmVudCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtbWVudS1pdGVtLWRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLW1lbnUtaXRlbS1kcm9wZG93biAubWVudV9fbGluaycsIGZ1bmN0aW9uKFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBlXHJcblxyXG5cclxuXHJcbiAgICAgICAgKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgbWVudS5fb3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtZml4ZWQnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCEkKGRvY3VtZW50KS5maW5kKCcuanNDcm1CbHVyRXZlbnRTdG9wJykpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJChkb2N1bWVudClcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAuYmx1cigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXJDcm0uYWRkQ2xhc3MoJ29uJyk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2UtY2FiaW5ldCcpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnaXMtbW92aW5nJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbWVudS1vcGVuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKS5hZGRDbGFzcygnb3ZlcmxheS0tbWVudScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5hZGRDbGFzcygnb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKS5hZGRDbGFzcygnb3ZlcmxheS0tbWVudScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLW9uZXBhZ2UnKSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkaGFtYnVyZ2VyLmFkZENsYXNzKCdvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpLmFkZENsYXNzKCdvdmVybGF5LS1tZW51Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBtZW51Ll9jbG9zZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAkaGFtYnVyZ2VyLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRoYW1idXJnZXJDcm0ucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdpcy1tb3ZpbmcnKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRidG5GbG9hdC5mYWRlSW4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuaXMoJy5qcy1oYW1idXJnZXInKSB8fCB0YXJnZXQuaXMoJy5qcy1tZW51LWl0ZW0tZHJvcGRvd24nKSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICB9LCAyMDApO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA0ODApIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIG1lbnU7XHJcblxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgRHJvcGRvd24gPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcclxuXHJcblxyXG5cclxuICAgIGxldCBkcm9wZG93biA9IHt9O1xyXG5cclxuICAgIGxldCAkZHJvcGRvd24gPSAkKGRvY3VtZW50KS5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICBsZXQgJGJ0bkRyb3Bkb3duQ2xvc2UgPSAkKFxyXG5cclxuICAgICAgICAnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXMganMtYmItZHJvcGRvd24tLWNsb3NlXCI+PC9pPidcclxuXHJcbiAgICApO1xyXG5cclxuICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkKGRvY3VtZW50KS5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgbGV0IF90aGlzLCAkbGlzdDtcclxuXHJcbiAgICBsZXQgcnVuID0gZmFsc2U7XHJcblxyXG5cclxuXHJcbiAgICBsZXQgc3R5bGVUcmFuc2Zvcm0gPSB7XHJcblxyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG5cclxuICAgICAgICB0b3A6ICdhdXRvJyxcclxuXHJcbiAgICAgICAgYm90dG9tOiAxMCxcclxuXHJcbiAgICAgICAgbGVmdDogMTAsXHJcblxyXG4gICAgICAgIHJpZ2h0OiAxMCxcclxuXHJcbiAgICAgICAgekluZGV4OiA5OTk5XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIGxldCBzdHlsZSA9IHtcclxuXHJcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcblxyXG4gICAgICAgIHRvcDogNjAsXHJcblxyXG4gICAgICAgIGxlZnQ6IDEwLFxyXG5cclxuICAgICAgICByaWdodDogMTAsXHJcblxyXG4gICAgICAgIHpJbmRleDogOTk5OVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBkcm9wZG93bi5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkZHJvcGRvd24ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdiYi1kcm9wZG93bi0taG92ZXInKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyb3Bkb3duLnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgZHJvcGRvd24uZXZlbnRzKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgZHJvcGRvd24ucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkKGRvY3VtZW50KS5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJiYi1kcm9wZG93bl9fY2xvc2UganMtYmItZHJvcGRvd24tLWNsb3NlXCI+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoJzxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fb3ZlcmxheVwiPicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSAkKHRoaXMpLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLmFwcGVuZFRvKCRkcm9wZG93bkxpc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5maW5kKCcuaW5mby1ibG9ja19faWNvbicpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgZHJvcGRvd24uZXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAkbGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5fdG9nZ2xlKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS1hbm90aGVyJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGxpc3QuaW5zZXJ0QWZ0ZXIoJy53cmFwcGVyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbGlzdC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRvdmVybGF5XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdvdmVybGF5LS1kcm9wZG93bicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRsaXN0LmNzcyhzdHlsZVRyYW5zZm9ybSkuYWRkQ2xhc3MoJ190cmFuc2Zvcm0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5Ecm9wZG93bkNsb3NlLnByZXBlbmRUbygkbGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbGlzdC5jc3Moc3R5bGUpLmFkZENsYXNzKCdfdHJhbnNmb3JtX2luZm8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duLl90b2dnbGUoJCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL1RvZ2dsZSBmaXhyZCBjbGFzcyBmcm9tIGJvZHlcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi5yZXF1ZXN0LWluZm8nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtZml4ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnRFJPUERPV04gQ0xPU0UnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5vdmVybGF5LS1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGRyb3Bkb3duLl9jbG9zZSgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICdjbGljayB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICcuYmItZHJvcGRvd25fX2xpc3QgLmluZm8tYmxvY2tfX2l0ZW0nLFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uX2Nsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICBkcm9wZG93bi5fY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBkcm9wZG93bi5fdG9nZ2xlID0gZnVuY3Rpb24oZWwpIHtcclxuXHJcbiAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGVsLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIGRyb3Bkb3duLl9jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICRsaXN0LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAkbGlzdFxyXG5cclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcblxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdfdHJhbnNmb3JtJylcclxuXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ190cmFuc2Zvcm1faW5mbycpXHJcblxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKF90aGlzKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ292ZXJsYXktLWRyb3Bkb3duJyk7XHJcblxyXG4gICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHJldHVybiBkcm9wZG93bjtcclxuXHJcbn0pKCk7XHJcblxyXG5cclxuXHJcbi8vUHVzaFVwXHJcblxyXG5mdW5jdGlvbiBwdXNoVXAob3B0aW9ucykge1xyXG5cclxuICAgIHZhciB0ZXh0ID0gb3B0aW9ucy50ZXh0IHx8ICfQktCw0Lwg0L3QvtCy0LDRjyDQt9Cw0Y/QstC60LAnO1xyXG5cclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgJHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdwdXNoLXVwIHB1c2gtdXAtLWNlbnRlcicpO1xyXG5cclxuICAgIHZhciAkcHVzaEljb25TdWNjZXNzID0gJChcclxuXHJcbiAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcclxuXHJcbiAgICAgICAgd2lkdGg9XCI2MTEuOTk0cHhcIiBoZWlnaHQ9XCI2MTEuOTk0cHhcIiB2aWV3Qm94PVwiMCAwIDYxMS45OTQgNjExLjk5NFwiXHJcblxyXG4gICAgICAgIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgY2xhc3M9XCJwdXNoLXVwX19pY29uXCI+XHJcblxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTI0OC4xNzIsNDIzLjkxOGwtODkuNTQ1LTg5LjUzNGMtNS42MzctNS42MzctNS42MzctMTQuNzc4LDAtMjAuNDE2YzUuNjQzLTUuNjQ0LDE0Ljc4LTUuNjQ0LDIwLjQxNywwbDY5LjEyOCw2OS4xMjJcclxuXHJcbiAgICAgICAgICAgICAgICBsMTg0Ljc5Ni0xODQuODAyYzUuNjQ0LTUuNjQzLDE0Ljc4LTUuNjQzLDIwLjQxNywwYzUuNjQ0LDUuNjM3LDUuNjQ0LDE0Ljc4LDAsMjAuNDE3TDI0OC4xNzIsNDIzLjkxOHpcIi8+XHJcblxyXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zMDYuMDMxLDYxMS45OTR2LTE0LjQzOGwtMC4wMjIsMTQuNDM4QzEzNy4yODYsNjExLjk5NCwwLjAxMiw0NzQuNzI2LDAsMzA2LjAwM0MwLDEzNy4yNzQsMTM3LjI3NCwwLDMwNS45OTcsMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjMTY4LjcyOSwwLDMwNS45OTcsMTM3LjI3NCwzMDUuOTk3LDMwNS45OTdDNjEyLDQ3NC43MjYsNDc0Ljc0Myw2MTEuOTk0LDMwNi4wMzEsNjExLjk5NHogTTMwNS45OTcsMjguODc4XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGMtMTUyLjgwNSwwLTI3Ny4xMTksMTI0LjMxNC0yNzcuMTE5LDI3Ny4xMTlDMjguODksNDU4Ljc5NiwxNTMuMjA5LDU4My4xMSwzMDYuMDA5LDU4My4xMWgwLjAyMlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjMTUyLjc4OCwwLDI3Ny4wOTEtMTI0LjMxNCwyNzcuMDkxLTI3Ny4xMTNDNTgzLjEyMiwxNTMuMTkyLDQ1OC44MDIsMjguODc4LDMwNS45OTcsMjguODc4elwiLz5cclxuXHJcbiAgICAgICAgPC9zdmc+YFxyXG5cclxuICAgICk7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgJHB1c2hJY29uRXJyb3IgPSAkKFxyXG5cclxuICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxyXG5cclxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCA3OC41NjEgNzguNTYxXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiBjbGFzcz1cInB1c2gtdXBfX2ljb25cIj5cclxuXHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIzOS4yOFwiIGN5PVwiNTcuNzcyXCIgcj1cIjMuNjMyXCIvPlxyXG5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0zOC43OTIsNDguMzQ3YzEuMTA0LDAsMi0wLjg5NiwyLTJ2LTE5YzAtMS4xMDQtMC44OTYtMi0yLTJzLTIsMC44OTYtMiwydjE5QzM2Ljc5Miw0Ny40NTEsMzcuNjg4LDQ4LjM0NywzOC43OTIsNDguMzQ3elxyXG5cclxuICAgICAgICAgICAgICAgIFwiLz5cclxuXHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDYuNTcsMTEuNTQybC0wLjA5MS0wLjE0MWMtMS44NTItMi44NTQtMy43NjYtNS44MDYtNy4xOTktNS44MDZjLTMuNTc4LDAtNS40NSwyLjk5NC03LjI2LDUuODkxXHJcblxyXG4gICAgICAgICAgICAgICAgYy0wLjAwOSwwLjAxNC0wLjA2NSwwLjEwNC0wLjA3NCwwLjExOUwwLjI3OCw2NS4yNjZDMC4wOTYsNjUuNTc0LDAsNjUuNzM1LDAsNjYuMDkyYzAsMy44OTYsMy4xMzUsNi44NzQsNi45ODgsNi44NzRoNjQuNTg1XHJcblxyXG4gICAgICAgICAgICAgICAgYzMuODU0LDAsNi45ODgtMi45NzksNi45ODgtNi44NzRjMC0wLjM1Ny0wLjA5Ni0wLjYxNC0wLjI3Ny0wLjkyMUw0Ni41NywxMS41NDJ6IE03MS41NzMsNjguOTY2SDYuOTg4XHJcblxyXG4gICAgICAgICAgICAgICAgYy0xLjQ2MSwwLTIuNzE3LTAuOTUxLTIuOTUtMi4zOTRsMzEuMzc0LTUzLjA2MWMxLjU1NC0yLjQ4NywyLjU3Mi0zLjk2MywzLjg2OC0zLjk2M2MxLjI2MSwwLDIuNDU3LDEuODcsMy44NDMsNC4wMDZcclxuXHJcbiAgICAgICAgICAgICAgICBsMzEuMzk5LDUzLjAwN0M3NC4yOSw2OC4wMDMsNzMuMDM0LDY4Ljk2Niw3MS41NzMsNjguOTY2elwiLz5cclxuXHJcbiAgICAgICAgPC9zdmc+XHJcblxyXG5gXHJcblxyXG4gICAgKTtcclxuXHJcblxyXG5cclxuICAgICRwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcblxyXG4gICAgJHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuXHJcblxyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgJHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWVycm9yJyk7XHJcblxyXG4gICAgICAgICRwdXNoSWNvbkVycm9yLnByZXBlbmRUbygkcHVzaENvbnRhaW5lcik7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgJHB1c2hJY29uU3VjY2Vzcy5wcmVwZW5kVG8oJHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHBvc2hQb3MoKTtcclxuXHJcblxyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICRwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICRwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG5cclxuICAgIH0sIDQ1MDApO1xyXG5cclxuXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuXHJcbiAgICB9LCA1MDAwKTtcclxuXHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaC11cC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5wdXNoLXVwJyk7XHJcblxyXG4gICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgfSwgMzAwKTtcclxuXHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gcG9zaFBvcygpIHtcclxuXHJcbiAgICAgICAgJCgnLnB1c2gtdXAnKS5lYWNoKGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAkKCcucHVzaC11cCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIGhlaWdodCAqIGUgKyAxMCArIGUpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAkKEJhc2UuaW5pdCgpKTtcclxuXHJcbiAgICBNZW51LmluaXQoKTtcclxuXHJcbiAgICBEcm9wZG93bi5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAoZnVuY3Rpb24gQ2hlY2tib3goKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC1zZWxlY3QtYWxsJywgZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9KSgpO1xyXG5cclxuXHJcblxyXG4gICAgXHJcblxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcbiAgICAgICAgbGV0ICRjb250ZW50ID0gJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50Jyk7XHJcblxyXG4gICAgICAgIGxldCAkaXRlbSA9ICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICBpZiAoJGFjY29yZGVvbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRjb250ZW50LnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICRpdGVtLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgJy5qcy1iYi1hY2NvcmRlb24gLmJiLWFjY29yZGVvbl9fdGl0bGUnLFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkcGFyZW50LmRhdGEoJ2FjY29yZGVvbicpID09PSAnY29sbGFwc2UnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIFxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBDcm0uanNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IENybSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY29udHJvbEJveCgpO1xyXG5cclxuICAgICAgICB0aGlzLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMubW9iaWxlQmxvY2sucmVxdWVzdEl0ZW1DbGljaygpO1xyXG4gICAgICAgIHRoaXMubW9iaWxlQmxvY2suY2FsbEFwbGljYXRpb25Nb2JpbGVCbG9jaygpO1xyXG4gICAgICAgIHRoaXMubW9iaWxlQmxvY2subW92ZUJsb2NrQm9keVBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JhcGhpYy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhci5pbml0KCk7XHJcblxyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmluaXQoKTtcclxuICAgICAgICBDcm0ucmVxdWVzdC5pbml0KCk7XHJcbiAgICAgICAgQ3JtLnN0ZXBzLmluaXQoKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLmluaXQoKTtcclxuICAgICAgICBDcm0uc2VydmljZXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVycy50cml1bXBoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVycy5zbGlkZXJQb3B1cFJlaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICBuZXcgV09XKCkuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ib3hSZXNpemUoKTtcclxuICAgICAgICAkd2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgQ3JtLmJveFJlc2l6ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGNvbnRyb2xCb3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWNvbnRyb2wtYm94LWJ0bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWNvbnRyb2wtYm94JylcclxuICAgICAgICAgICAgICAgIC5zbGlkZVRvZ2dsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBib3hSZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkbWVudSA9ICQoJy5qcy1tZW51Jyk7XHJcbiAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnYmctLWRhcmsnKTtcclxuICAgICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoJ2JnLS13aGl0ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtY29udHJvbC1ib3gnKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnYmctLWRhcmsnKTtcclxuICAgICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2JnLS13aGl0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzbGlkZXJzOiB7XHJcbiAgICAgICAgLy9Ucml1bXBoIHNsaWRlclxyXG4gICAgICAgIHRyaXVtcGg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1iYi1zbGlkZXItLXRyaXVtcGgnKTtcclxuXHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bk5leHQgPSAkKHRoaXMpLmZpbmQoJy5qcy1iYi1zbGlkZXItYnRuLS1uZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNsaWRlICsgMSA9PT0gc2xpY2suc2xpZGVDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuTmV4dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soJ3NsaWNrTmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9EaXNhYmxlIGNoYW5nZSBzbGlkZSBvbiBjbGljayBkb3RzXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyLmZpbmQoJy5zbGljay1kb3RzIGxpIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9SZWluaXQgc2xpZGVyIGFmdGVyIHBvcHVwIG9wZW5cclxuICAgICAgICBzbGlkZXJQb3B1cFJlaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5tb2RhbCcpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLnNsaWNrLWluaXRpYWxpemVkJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyWzBdLnNsaWNrLnNldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb2JpbGVCbG9jazoge1xyXG4gICAgICAgIGJvZHlQb3NpdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFycmVudCA9ICQoJy5qcy1tb2JpbGUtYmxvY2snKTtcclxuICAgICAgICAgICAgbGV0ICRmb290ZXIgPSAkcGFycmVudC5jaGlsZHJlbignLm1vYmlsZS1ibG9ja19fZm9vdGVyJyk7XHJcbiAgICAgICAgICAgICRwYXJyZW50XHJcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5tb2JpbGUtYmxvY2tfX2JvZHknKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnYm90dG9tJywgJGZvb3Rlci5vdXRlckhlaWdodCh0cnVlKSk7XHJcblxyXG4gICAgICAgICAgICAkcGFycmVudC5maW5kKCcubW9iaWxlLWJsb2NrX19ib3gnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuY2hpbGRyZW4oJy5tb2JpbGUtYmxvY2tfX2Zvb3RlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19ib2R5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdib3R0b20nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLm1vYmlsZS1ibG9ja19fYm94JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5tb2JpbGUtYmxvY2tfX2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm91dGVySGVpZ2h0KHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9TaG93IC8gSGlkZSBtb2JpbGUgYXBsaWNhdGlvblxyXG4gICAgICAgIGNhbGxBcGxpY2F0aW9uTW9iaWxlQmxvY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtbW92ZS1ibG9jay0tc2hvdycpO1xyXG5cclxuICAgICAgICAgICAgJGJ0bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICR3aW5kb3cud2lkdGgoKSA8PSA3NjggJiZcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCdyZXF1ZXN0LWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLW1vdmUtYmxvY2stdGFyZ2V0JywgJ3JlcXVlc3QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1tb3ZlLWJsb2NrLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuSWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbW92ZS1ibG9jay10YXJnZXQnKTtcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdbZGF0YS1tb3ZlLWJsb2NrXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignW2RhdGEtbW92ZS1ibG9jaz0nICsgYnRuSWQgKyAnXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGh0bWwuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgQ3JtLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLW1vdmUtYmxvY2stLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRib3ggPSAkKHRoaXMpLmNsb3Nlc3QoJy5tb3ZlLWJsb2NrX19ib3gnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcubW92ZS1ibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkYm94Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRib3gucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBDcm0ubW9iaWxlQmxvY2suYm9keVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBib2R5Rml4ZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGJvZHlGaXhlZCgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghJGRvY3VtZW50LmZpbmQoJy5qcy1tb3ZlLWJsb2NrJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL0NsaWNrIHJlcXVlc3QgaXRlbVxyXG4gICAgICAgIHJlcXVlc3RJdGVtQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1yZXF1ZXN0LWl0ZW0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLW1vdmUtYmxvY2stYXBsaWNhdGlvbicpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAnLmpzLW1vdmUtYmxvY2stYXBsaWNhdGlvbi0tY2xvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtbW92ZS1ibG9jay1hcGxpY2F0aW9uJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdmVCbG9ja0JvZHlQb3NpdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkbW92ZUJsaWNrID0gJCgnLmpzLW1vdmUtYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICRtb3ZlQmxpY2suZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkYm9keSA9ICQodGhpcykuY2hpbGRyZW4oJy5tb3ZlLWJsb2NrX19ib2R5Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGZvb3RlciA9ICQodGhpcykuY2hpbGRyZW4oJy5tb3ZlLWJsb2NrX19mb290ZXInKTtcclxuICAgICAgICAgICAgICAgIGxldCBmb290ZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgX2dldEhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICR3aW5kb3cucmVzaXplKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBfZ2V0SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBfZ2V0SGVpZ2h0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3RlckhlaWdodCA9ICRmb290ZXIub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9zZXRIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBfc2V0SGVpZ2h0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmNzcygnYm90dG9tJywgZm9vdGVySGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdyYXBoaWM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgQ3JtLmdyYXBoaWMuZGV0ZWN0SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGV0ZWN0SGVpZ2h0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICR0YWJsZSA9ICRkb2N1bWVudC5maW5kKCcuanMtZ3JhcGgtdGFibGUnKTtcclxuXHJcbiAgICAgICAgICAgICR0YWJsZS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICR0YWJsZVdvcmtlciA9ICQodGhpcykuZmluZCgnLmdyYXBoLXRhYmxlX193b3JrZXInKTtcclxuICAgICAgICAgICAgICAgIGxldCAkdGFibGVXb3JrZXJUciA9ICR0YWJsZVdvcmtlci5maW5kKCd0cicpLm5vdCgnOmZpcnN0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRhYmxlSG91cnMgPSAkKHRoaXMpLmZpbmQoJy5ncmFwaC10YWJsZV9faG91cnMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkdGFibGVIb3Vyc1RyID0gJHRhYmxlSG91cnMuZmluZCgndHInKS5ub3QoJzpmaXJzdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICR0YWJsZUhvdXJzVHIuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRIb3Vyc0l0ZW0gPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZ3JhcGgtdGFibGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmdyYXBoLXRhYmxlX193b3JrZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgndHInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCgkKHRoaXMpLCBjdXJyZW50SG91cnNJdGVtKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICR0YWJsZVdvcmtlclRyLmVhY2goZnVuY3Rpb24oaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50V29ya2VySXRlbSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1ncmFwaC10YWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZ3JhcGgtdGFibGVfX2hvdXJzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3RyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnOmZpcnN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQoJCh0aGlzKSwgY3VycmVudFdvcmtlckl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWF4SGVpZ2h0KF90aGlzLCBlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRIZWlnaHQgPSBfdGhpcy5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SGVpZ2h0ID4gZWxlbS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY3NzKCdoZWlnaHQnLCBtYXhIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhbGVuZGFyOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUJsb2NrKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3ZlQmxvY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgIC8vICQoJy5jYWxlbmRhcl9fdmlldycpLmFwcGVuZFRvKCcuY2FsZW5kYXJfX3NvcnRpbmcnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICQoJy5jYWxlbmRhcl9fdmlldycpLmFwcGVuZFRvKCcuanMtY29udHJvbC1ib3gnKTtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb250cm9sLWJveCcpLmFwcGVuZFRvKCcuY2FsZW5kYXJfX3NvcnRpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gQXBsaWNhdGlvblxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuQ3JtLmFwbGljYXRpb24gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5hcGxpY2F0aW9uVGFiKCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uc2hvd05ld0NsaWVuRm9ybSgpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLnNob3dBcGxpY2F0aW9uSXRlbU9wdGlvbnMoKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5hcGxpY2F0aW9uSXRlbUNvdW50ZXIoKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5zZWxlY3RTaG93U2VydmljZSgpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmFwbGljYXRpb25JdGVtUmVzZXQoKTtcclxuXHJcbiAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuICAgICAgICAgICAgQ3JtLmFwbGljYXRpb24uc2VhcmNoT3ZlcmxheS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vSW5pdCBBcGxpY2F0aW9uIHRhYnNcclxuICAgIGFwbGljYXRpb25UYWI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkYXBsaWNhdGlvblRhYiA9ICQoJy5qcy1iYi10YWIuYXBsaWNhdGlvbi1zdWNjZXNzX190YWInKTtcclxuXHJcbiAgICAgICAgLy9JZiBhcGxpY2F0aW9uIHRhYiBjaGF0IHRoZW4gaGlkZSBhcGxpY2F0aW9uIGJ0bnNcclxuICAgICAgICAkYXBsaWNhdGlvblRhYi5maW5kKCcudGFiX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJCgnLmFwbGljYXRpb25fX2J0bnMsIC5tb3ZlLWJsb2NrX19mb290ZXInKTtcclxuICAgICAgICAgICAgbGV0ICRibG9ja0Zvb3RlciA9ICQoJy5qcy1tb3ZlLWJsb2NrJylcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLm1vdmUtYmxvY2tfX2JveCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLm1vdmUtYmxvY2tfX2Zvb3RlcicpO1xyXG4gICAgICAgICAgICBsZXQgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGhyZWYgPT09ICcjYXBsaWNhdGlvbi1jaGF0Jykge1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkYmxvY2tGb290ZXIuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkYmxvY2tGb290ZXIucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBDcm0ubW9iaWxlQmxvY2suYm9keVBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2Nyb2xsJylcclxuICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1Nob3cgTmV3IENsaWVudCBGb3JtXHJcbiAgICBzaG93TmV3Q2xpZW5Gb3JtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBhZGRSZW1vdmVDbGFzc0Jsb2NrKCcuanMtbmV3LWNsaWVudCcsICdpcy1vcGVuJyk7XHJcbiAgICB9LFxyXG4gICAgLy9XaGVuIGNsaWNrIGJ0biBlZGl0XHJcbiAgICBzaG93QXBsaWNhdGlvbkl0ZW1PcHRpb25zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1hcGxpY2F0aW9uLWl0ZW0tLWVkaXQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX3dyYXAnKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQ291bnRlciBpbml0IGZ1bmN0aW9uXHJcbiAgICBhcGxpY2F0aW9uSXRlbUNvdW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0nKS5lYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhcGxpY2F0aW9uLWl0ZW0tLXNob3J0JykpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmFwbGljYXRpb24taXRlbV9fY291bnRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoZSArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9BZnRlciBzZWxlY3QgbWFzdGVyIGNoYW5nZVxyXG4gICAgc2VsZWN0U2hvd1NlcnZpY2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignc2VsZWN0MjpzZWxlY3QnLCAnLmpzLXNlbGVjdC1zaG93LXNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYXBsaWNhdGlvbi1pdGVtJyk7XHJcbiAgICAgICAgICAgIGlmICgkcGFycmVudC5oYXNDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkcGFycmVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLXNlcnZpY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tYnRuLS1yZXNldCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICRwYXJyZW50LnJlbW92ZUNsYXNzKCdhcGxpY2F0aW9uLWl0ZW0tLXNob3J0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkcGFycmVudC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLXNlcnZpY2UnKS5zbGlkZURvd24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENybS5hcGxpY2F0aW9uLmFwbGljYXRpb25JdGVtQ291bnRlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQXBsaWNhdGlvbiBpdGVtIHJlc2V0XHJcbiAgICBhcGxpY2F0aW9uSXRlbVJlc2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1hcGxpY2F0aW9uLWl0ZW0tYnRuLS1yZXNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcnJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hcGxpY2F0aW9uLWl0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKCEkcGFycmVudC5oYXNDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkcGFycmVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuanMtc2VsZWN0LS1tYXN0ZXIsIC5qcy1zZWxlY3QtLXRpbWUsIC5qcy1zZWxlY3QtZHVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAudmFsKCcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLWJ0bi0tcmVzZXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9fd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLS1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAudmFsKCcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYXBsaWNhdGlvbi1pdGVtX19jb3VudGVyJylcclxuICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1NlcmNoIGZvY3VzIHNob3cgY2xpZW50ICsgb3ZlcmxheVxyXG4gICAgc2VhcmNoT3ZlcmxheToge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCAnLmpzLXNlYXJjaC1vdmVybGF5LWlucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLmFwbGljYXRpb24uc2VhcmNoT3ZlcmxheS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENybS5hcGxpY2F0aW9uLnNlYXJjaE92ZXJsYXkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAnLmpzLXNlYXJjaC1vdmVybGF5JyxcclxuICAgICAgICAgICAgICAgICAgICBDcm0uYXBsaWNhdGlvbi5zZWFyY2hPdmVybGF5LmhpZGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkb3ZlcmxheSA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VhcmNoLW92ZXJsYXknKTtcclxuICAgICAgICAgICAgbGV0ICRhcGxpY2F0aW9uID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uJyk7XHJcbiAgICAgICAgICAgIGxldCAkYXBsaWNhdGlvbkxlZnQgPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb25fX2xlZnQnKTtcclxuICAgICAgICAgICAgbGV0ICR1c2VyID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uX191c2VyJyk7XHJcbiAgICAgICAgICAgIGxldCAkZW1wdHlCbG9jayA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fZW1wdHknKTtcclxuICAgICAgICAgICAgbGV0ICRidG5OZXdDbGllbnQgPSAkZG9jdW1lbnQuZmluZCgnLmpzLW1vdmUtYmxvY2stLXNob3cnKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICRhcGxpY2F0aW9uLmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAkYXBsaWNhdGlvbkxlZnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJHVzZXIuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJbkxlZnQnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgJGVtcHR5QmxvY2suaGlkZSgpO1xyXG4gICAgICAgICAgICAkYnRuTmV3Q2xpZW50LnNob3coKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VhcmNoLW92ZXJsYXktaW5wdXQnKTtcclxuICAgICAgICAgICAgbGV0ICRvdmVybGF5ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWFyY2gtb3ZlcmxheScpO1xyXG4gICAgICAgICAgICBsZXQgJGFwbGljYXRpb24gPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb24nKTtcclxuICAgICAgICAgICAgbGV0ICRhcGxpY2F0aW9uTGVmdCA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fbGVmdCcpO1xyXG4gICAgICAgICAgICBsZXQgJHVzZXIgPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb25fX3VzZXInKTtcclxuICAgICAgICAgICAgbGV0ICRlbXB0eUJsb2NrID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uX19lbXB0eScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bk5ld0NsaWVudCA9ICRkb2N1bWVudC5maW5kKCcuanMtbW92ZS1ibG9jay0tc2hvdycpO1xyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgJGFwbGljYXRpb24ucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICRhcGxpY2F0aW9uTGVmdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAkdXNlci5yZW1vdmVDbGFzcygnYW5pbWF0ZWQgZmFkZUluTGVmdCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICRpbnB1dC5ibHVyKCk7XHJcbiAgICAgICAgICAgICRlbXB0eUJsb2NrLnNob3coKTtcclxuICAgICAgICAgICAgJGJ0bk5ld0NsaWVudC5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENybSBSZXF1ZXN0XHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0ucmVxdWVzdCA9IHtcclxuICAgIHRhYkluaXQ6IGZhbHNlLFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbUluZm8oKTtcclxuICAgICAgICAvLyBDcm0ucmVxdWVzdC50YWJzKCk7XHJcblxyXG4gICAgICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBDcm0ucmVxdWVzdC50YWJzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9SZXBsYWNlIGljb24gd2hlbiBkcmFnIGl0ZW1cclxuICAgIHdpZ2V0UmVwbGFjZUljb246IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgbGV0IHdpZGdldCA9IGVsLmNsb3Nlc3QoJy5yZXF1ZXN0X193aWRnZXQnKTtcclxuICAgICAgICBsZXQgaXRlbSA9IGVsLmNsb3Nlc3QoJy5yZXF1ZXN0LWl0ZW0nKTtcclxuICAgICAgICBsZXQgaWNvbiA9IGVsLmZpbmQoJy5yZXF1ZXN0LWl0ZW1fX2ljb24nKTtcclxuXHJcbiAgICAgICAgbGV0IGljb25OZXcgPSAncmVxdWVzdC1pdGVtX19pY29uIGZhbCBmYS1zbWlsZSc7XHJcbiAgICAgICAgbGV0IGljb25Xb3JrID0gJ3JlcXVlc3QtaXRlbV9faWNvbiBmYWwgZmEtY2xvY2snO1xyXG4gICAgICAgIGxldCBpY29uRG9uZSA9ICdyZXF1ZXN0LWl0ZW1fX2ljb24gZmFsIGZhLWNoZWNrLWNpcmNsZSc7XHJcbiAgICAgICAgbGV0IGljb25BYm9ydCA9ICdyZXF1ZXN0LWl0ZW1fX2ljb24gZmFsIGZhLWZyb3duJztcclxuXHJcbiAgICAgICAgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS1uZXcnKSkge1xyXG4gICAgICAgICAgICBpY29uLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoaWNvbk5ldyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0td29yaycpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uV29yayk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0tZG9uZScpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uRG9uZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0tYWJvcnQnKSkge1xyXG4gICAgICAgICAgICBpY29uLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoaWNvbkFib3J0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaXRlbUluZm86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5yZXF1ZXN0X193aWRnZXQnKVxyXG4gICAgICAgICAgICAuZmluZCgnLnJlcXVlc3QtaXRlbScpXHJcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljb24gPSAkKHRoaXMpLmZpbmQoJy5yZXF1ZXN0LWl0ZW1fX2ljb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygncmVxdWVzdC1pdGVtLS1ub3RmaWxsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhbCBmYS1pbmZvLWNpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC53cmFwKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJyZXF1ZXN0LWl0ZW1fX2ljb25cIiB0b29sdGlwPVwi0JfQsNGP0LLQutCwINC90LUg0LfQsNC/0L7Qu9C90LXQvdC90LBcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vUmVxdWVzdCB0YWJzXHJcbiAgICB0YWJzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDwgMTIwMCkge1xyXG4gICAgICAgICAgICAkKCcuanMtdGFiLXJlcXVlc3QnKS50YWJzKCk7XHJcbiAgICAgICAgICAgIENybS5yZXF1ZXN0LnRhYkluaXQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChDcm0ucmVxdWVzdC50YWJJbml0KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtdGFiLXJlcXVlc3QnKS50YWJzKCdkZXN0cm95Jyk7XHJcbiAgICAgICAgICAgICAgICBDcm0ucmVxdWVzdC50YWJJbml0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JtIFNlcnZpY2VzXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uc2VydmljZXMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBDcm0uc2VydmljZXMuc2VsZWN0VGltZSgpO1xyXG4gICAgICAgIENybS5zZXJ2aWNlcy5zaG93QWRkU2VydmljZSgpO1xyXG4gICAgICAgIENybS5zZXJ2aWNlcy5zaG93U2VydmljZUl0ZW0oKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDEwMjQpIHtcclxuICAgICAgICAgICAgLy8gQ3JtLnNlcnZpY2VzLml0ZW1Ib3ZlcigpO1xyXG4gICAgICAgICAgICAvLyBDcm0ucmVxdWVzdC5zb3J0TXVsdGlwbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaXRlbUhvdmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJGl0ZW0gPSAkKCcuanMtc2VydmljZS1pdGVtJyk7XHJcblxyXG4gICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdzZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmlzKCc6Zm9jdXMnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3QuaGFzQ2xhc3MoJ3NlbGVjdDItY29udGFpbmVyLS1vcGVuJylcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1ob3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzZWxlY3RUaW1lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1zZXJ2aWNlLWl0ZW0nKS5maW5kKCdzZWxlY3QnKTtcclxuICAgICAgICAkc2VsZWN0Lm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlcnZpY2UtaXRlbScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0FkZFNlcnZpY2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFkZC1zZXJ2aWNlLS1hZGQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJHBhcmVudC5maW5kKCcuanMtYWRkLXNlcnZpY2UtLWNsb3NlJyk7XHJcbiAgICAgICAgICAgIGxldCAkYmxvY2tzID0gJHBhcmVudC5maW5kKCcuYWRkLXNlcnZpY2VfX2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bkNsb3NlLnNob3coKTtcclxuICAgICAgICAgICAgJGJsb2Nrcy5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1hZGQtc2VydmljZS0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bk9wZW4gPSAkcGFyZW50LmZpbmQoJy5qcy1hZGQtc2VydmljZS0tYWRkJyk7XHJcbiAgICAgICAgICAgIGxldCAkYmxvY2tzID0gJHBhcmVudC5maW5kKCcuYWRkLXNlcnZpY2VfX2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bk9wZW4uc2hvdygpO1xyXG4gICAgICAgICAgICAkYmxvY2tzLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2hvd1NlcnZpY2VJdGVtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy10b2dnbGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWJsb2NrLXRhcmdldCcpO1xyXG5cclxuICAgICAgICAgICAgJHBhcmVudC5maW5kKCcuanMtdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcignOnRleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdqc0NybUNvbWJvVGl0bGVTZXJ2aWNlcycpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnW2RhdGEtYmxvY2tdJylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCdbZGF0YS1ibG9jaz0nICsgaWQgKyAnXScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gU3RlcHNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5zdGVwcyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAvLyBDcm0uc3RlcHMuc29ydGFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ3JtLnN0ZXBzLnRhYnMoKTtcclxuICAgICAgICBDcm0uc3RlcHMuc2hvd1NlYXJjaCgpO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgdGFic1xyXG4gICAgdGFiczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXN0dWRpby1zdGVwJykudGFicygpO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgYnRuIHNob3cgc2VhcmNoXHJcbiAgICBzaG93U2VhcmNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1idG4tc3RlcHMtc2VhcmNoLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5zdGVwc19fc2VhcmNoJykuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgc29ydGFibGUgaXRlbVxyXG4gICAgc29ydGFibGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuYmItdXBsb2FkX19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJy5iYi11cGxvYWRfX2xpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnNvcnRhYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogJy5iYi11cGxvYWRfX2l0ZW06bm90KC5pcy11bnNvcnRhYmxlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ21vdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvbGVyYW5jZTogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbihlLCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLmFkZENsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGUsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzLnJlcGxhY2VUaXRsZUFmdGVyU29ydGFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5yZW1vdmVDbGFzcygnZHJhZy1zb3J0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kaXNhYmxlU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vUmVwbGFjZSBpdGVtIHRpdGxlIGFmdGVyIHNvcnR0YWJsZVxyXG4gICAgcmVwbGFjZVRpdGxlQWZ0ZXJTb3J0YWJsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGhvbWUgPSAkKCc8c3BhbiBjbGFzcz1cImJiLXVwbG9hZF9faG9tZVwiPicpO1xyXG4gICAgICAgIGhvbWUudGV4dCgn0JPQu9Cw0LLQvdCw0Y8nKS5hcHBlbmRUbygkKCcuYmItdXBsb2FkX19pdGVtOmZpcnN0JykpO1xyXG4gICAgICAgICQoJy5iYi11cGxvYWRfX2l0ZW0nKVxyXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxyXG4gICAgICAgICAgICAuZmluZCgnLmJiLXVwbG9hZF9faG9tZScpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gU3R1ZGlvXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uc3R1ZGlvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgQ3JtLnN0dWRpby5hdmF0YXJUb2dnbGVCdG4oKTtcclxuICAgICAgICAvLyBDcm0uc3R1ZGlvLndvcmtlclBhZ2VUb2dnbGUoKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLmNhdGVnb3J5U2hvdygpO1xyXG4gICAgfSxcclxuICAgIC8vQXZhdGFyIGJ0biBvcGVuIC8gY2xvc2VcclxuICAgIGF2YXRhclRvZ2dsZUJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5qcy1hZGQtYXZhdGFyLS1vcGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1hZGQtYXZhdGFyJykuZmFkZUluKHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmpzLWFkZC1hdmF0YXItLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1hZGQtYXZhdGFyJykuZmFkZU91dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vT3BlbiAvIENsb3NlIEFkZFdvcmtlciBwYWdlXHJcbiAgICB3b3JrZXJQYWdlVG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgLy8gICAgIC8vT3BlbiBhZGQgd2Fya2VyIHBhZ2VcclxuICAgICAgICAvLyAgICAgbGV0ICRhZGRXb3JrZXIgPSAkKCcuanMtd29ya2VyLWFkZCcpO1xyXG5cclxuICAgICAgICAvLyAgICAgJCgnLmpzLXdvcmtlci1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgICQodGhpcylcclxuICAgICAgICAvLyAgICAgICAgICAgICAucmVtb3ZlQXR0cignaHJlZicpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtdG9nZ2xlJyk7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtd29ya2VyLWl0ZW0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoJGFkZFdvcmtlci5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgJGFkZFdvcmtlci5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAkYWRkV29ya2VyLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyAgICAgLy9DbG9zZSBhZGQgd29ya2VyIHBhZ2VcclxuICAgICAgICAvLyAgICAgJCgnLmpzLXdvcmtlci1hZGQtLWNsb3NlJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgICRhZGRXb3JrZXIucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvL09wZW4gYWRkIHdhcmtlciBwYWdlXHJcbiAgICAgICAgbGV0ICRhZGRXb3JrZXIgPSAkKCcuanMtd29ya2VyLWFkZCcpO1xyXG4gICAgICAgIGxldCBvcGVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXdvcmtlci1pdGVtJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW9wZW4pIHtcclxuICAgICAgICAgICAgICAgIF9vcGVuKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuanMtd29ya2VyLWFkZC0tY2xvc2UnKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIF9jbG9zZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9vcGVuKCkge1xyXG4gICAgICAgICAgICAkYWRkV29ya2VyLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJykuYWRkQ2xhc3MoJy5vdmVybGF5LS1hZGQtd29ya2VyJyk7XHJcbiAgICAgICAgICAgICRodG1sLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICBvcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9jbG9zZSgpIHtcclxuICAgICAgICAgICAgJGFkZFdvcmtlci5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkb3ZlcmxheVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnLm92ZXJsYXktLWFkZC13b3JrZXInKTtcclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgIG9wZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2F0ZWdvcnlTaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1jYXRlZ29yeScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0ICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1jYXRlZ29yeScpO1xyXG4gICAgICAgICAgICBsZXQgJGl0ZW1IaWRkZW4gPSAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19pdGVtJylcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoJ1tkYXRhLWhpZGRlbj1cInRydWVcIl0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKCcuY2F0ZWdvcnlfX2l0ZW0tLW1vcmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbUhpZGRlbi5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19pdGVtLS1tb3JlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CV0YnQtScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1IaWRkZW4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9faXRlbS0tbW9yZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQodC60YDRi9GC0YwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgICQoQ3JtLmluaXQoKSk7XHJcbn0pO1xyXG5cclxuLyoqXHJcblxyXG4gKiBmdW5jdGlvbnMuanNcclxuXHJcbiAqXHJcblxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG5cclxuICovXHJcblxyXG5cclxuXHJcbi8vRnVuY3Rpb24gQWRkIFJlbW92ZSBDbGFzcyBmcm9tIEJsb2NrXHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG5cclxuICAgICQoYmxvY2sgKyAnLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoYmxvY2spLmFkZENsYXNzKGNsKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGJsb2NrICsgJy0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuXHJcbiAgICAkKGJsb2NrKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoYmxvY2spLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcblxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuIl19
