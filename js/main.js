'use strict';

//Global Vars
var $window = $(window);
var $document = $(document);
var $html = $('html');
var $wrapper = $('.wrapper');
var $header = $('.header');
var $main = $('.main');
var $overlay = $('.overlay');

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
    var $pushIconSuccess = $('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n        width="611.994px" height="611.994px" viewBox="0 0 611.994 611.994"\n        xml:space="preserve" class="push-up__icon">\n            <path d="M248.172,423.918l-89.545-89.534c-5.637-5.637-5.637-14.778,0-20.416c5.643-5.644,14.78-5.644,20.417,0l69.128,69.122\n                l184.796-184.802c5.644-5.643,14.78-5.643,20.417,0c5.644,5.637,5.644,14.78,0,20.417L248.172,423.918z"/>\n                <path d="M306.031,611.994v-14.438l-0.022,14.438C137.286,611.994,0.012,474.726,0,306.003C0,137.274,137.274,0,305.997,0\n                    c168.729,0,305.997,137.274,305.997,305.997C612,474.726,474.743,611.994,306.031,611.994z M305.997,28.878\n                    c-152.805,0-277.119,124.314-277.119,277.119C28.89,458.796,153.209,583.11,306.009,583.11h0.022\n                    c152.788,0,277.091-124.314,277.091-277.113C583.122,153.192,458.802,28.878,305.997,28.878z"/>\n        </svg>');

    var $pushIconError = $('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n            viewBox="0 0 78.561 78.561" xml:space="preserve" class="push-up__icon">\n            <circle cx="39.28" cy="57.772" r="3.632"/>\n            <path d="M38.792,48.347c1.104,0,2-0.896,2-2v-19c0-1.104-0.896-2-2-2s-2,0.896-2,2v19C36.792,47.451,37.688,48.347,38.792,48.347z\n                "/>\n            <path d="M46.57,11.542l-0.091-0.141c-1.852-2.854-3.766-5.806-7.199-5.806c-3.578,0-5.45,2.994-7.26,5.891\n                c-0.009,0.014-0.065,0.104-0.074,0.119L0.278,65.266C0.096,65.574,0,65.735,0,66.092c0,3.896,3.135,6.874,6.988,6.874h64.585\n                c3.854,0,6.988-2.979,6.988-6.874c0-0.357-0.096-0.614-0.277-0.921L46.57,11.542z M71.573,68.966H6.988\n                c-1.461,0-2.717-0.951-2.95-2.394l31.374-53.061c1.554-2.487,2.572-3.963,3.868-3.963c1.261,0,2.457,1.87,3.843,4.006\n                l31.399,53.007C74.29,68.003,73.034,68.966,71.573,68.966z"/>\n        </svg>\n');

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
 * Catalog
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var catalog = {
    init: function init() {
        catalog.mapToggle();
        catalog.btnFilterOpen();
        catalog.btnShowCatalog();
        catalog.btnShowMap();
        catalog.stickyFilter();
        catalog.filterCategory();
        catalog.moveBlocks();
        catalog.ifPageCatalog();
    },
    //Catalog map Toggle
    mapToggle: function mapToggle() {
        $('.js-catalog--show').on('click', function () {
            $(this).addClass('is-active');
            $('.js-catalog-map--show').removeClass('is-active');
        });
        $('.js-catalog-map--show').on('click', function () {
            $(this).addClass('is-active');
            $('.js-catalog--show').removeClass('is-active');
        });
    },
    //Btn filter open
    btnFilterOpen: function btnFilterOpen() {
        $('.js-mobile-filter--open').on('click', function () {
            var catalogFilter = $('.catalog-filter');
            if (catalogFilter.hasClass('is-open')) {
                catalogFilter.removeClass('is-open');
                $html.removeAttr('style');
            } else {
                catalogFilter.addClass('is-open');
                $html.css('overflow', 'hidden');
            }
        });
    },
    //Btn show catalog
    btnShowCatalog: function btnShowCatalog() {
        $('.js-show--list').on('click', function () {
            $('.js-catalog-map').removeAttr('style');
            $('.catalog-content__inner').removeAttr('style');
            $('.js-catalog-map').removeClass('is-checked');
            $(this).parent().removeClass('is-active');
        });
    },
    //Btn show map - hide catalog
    btnShowMap: function btnShowMap() {
        $('.js-show--map').on('click', function () {
            $('.js-catalog-map').css('display', 'block');
            $('.catalog-content__inner').css('display', 'none');
            $('.js-stiky-block').removeAttr('style');
            $('.js-catalog-map').addClass('is-checked');
            $(this).parent().addClass('is-active');
        });
    },
    //Sticky Filter https://github.com/abouolia/sticky-sidebar
    stickyFilter: function stickyFilter() {
        if ($('.js-stiky-block').length && $(window).width() > 768) {
            // Высота блока фильтра
            var filterHeight = document.querySelector('.catalog-filter__inner').clientHeight;

            // Отступ сверху
            var topSpacing = 110;

            // Отступ справа
            var bottomSpacing = 10;

            // Меняем topSpacing по скроллу страницы (чтобы всегда было видно низ фильтра)
            $(window).scroll(function () {
                if ($(window).scrollTop() > 110 + filterHeight) {
                    topSpacing = $(window).height() - filterHeight;
                }
            });

            new StickySidebar('.js-stiky-block', {
                topSpacing: topSpacing,
                bottomSpacing: bottomSpacing,
                containerSelector: '.catalog-content',
                innerWrapperSelector: '.catalog-filter__inner'
            });
        }
    },
    //filter category
    filterCategory: function filterCategory() {
        if ($(window).width() > 768) {
            $('.js-category').find('.category__link').on('click', function () {
                $(this).parent().addClass('is-selected');
                $('.js-category').addClass('is-checked').find('.category__link').not(this).parent().css('display', 'none');
            });
            $('.js-category--reset').on('click', function () {
                $(this).parent().removeClass('is-selected').closest('.js-category').removeClass('is-checked');
                $(this).closest('.js-category').find('.category__item').removeAttr('style');
            });
        } else {
            $('.js-category').find('.category__link').on('click', function () {
                if ($(this).parent().hasClass('is-selected')) {
                    $(this).parent().removeClass('is-selected');
                    $('.js-category').removeClass('is-checked').find('.category__link').parent().removeAttr('style');
                } else {
                    $(this).parent().addClass('is-selected');
                    $('.js-category').addClass('is-checked').find('.category__link').not(this).parent().css('display', 'none');
                }
            });
        }
    },
    //Move block in media screen
    moveBlocks: function moveBlocks() {
        if ($(window).width() <= 480) {
            $('.js-view-toggle').insertBefore('.catalog__inner');
        }
    },
    //If page catalog filter transform accordeon
    ifPageCatalog: function ifPageCatalog() {
        if ($wrapper.hasClass('page-catalog')) {
            $header.addClass('header--fixed');
            $main.css('padding-top', $('.header').outerHeight());
            if ($window.width() <= 768) {
                $('.catalog-filter__body').addClass('bb-accordeon bb-accordeon--other js-bb-accordeon');
                $('.js-catalog-filter-item').each(function () {
                    $(this).addClass('bb-accordeon__item').find('.catalog-filter__title').not('.catalog-filter__title_category').addClass('bb-accordeon__title');
                    $(this).find('.catalog-filter__content').addClass('bb-accordeon__content').slideUp();
                });
                $('.js-catalog-filter-item:lt(2)').addClass('is-open').find('.bb-accordeon__content').slideDown();
            }
        }
    }
};

/**
 * Card
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var card = {
    init: function init() {
        card.slider();
        card.cardScrollspy();
        card.cardSticky();

        if ($(window).width() <= 768) {
            card.cardRequestToggle();
            card.cardRequestBlockMoveItems();
            $window.resize(card.cardRequestBlockMoveItems);
        }
    },
    //Card Slider
    slider: function slider() {
        if ($('.js-card-slider').length) {
            var $cardSlider = $('.js-card-slider');

            $cardSlider.each(function () {
                var _this = $(this);
                var $slides = _this.find('.bb-slider__slides');
                var $sliderDots = $(this).find('.bb-slider__dots');
                $sliderDots.hide();

                if ($(window).width() <= 480) {
                    $sliderDots.show();

                    _this.on('init', function (event, slick) {
                        $sliderDots.prepend("<span class='bb-slider__pager bb-slider__pager--now'>1</span>" + '/');
                        $sliderDots.append("<span class='bb-slider__pager bb-slider__pager--total'>" + slick.slideCount + '</span>');
                    }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
                        var i = (currentSlide ? currentSlide : 0) + 1;
                        _this.find('.bb-slider__pager--now').html(i);
                    });
                }

                $slides.slick({
                    nextArrow: '.bb-slider__arrow--next',
                    prevArrow: '.bb-slider__arrow--prev',
                    speed: 400,
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,

                    responsive: [{
                        breakpoint: 1201,
                        settings: {
                            slidesToShow: 3
                        }
                    }, {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }, {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                });
            });
        }
    },
    //Card request show / hide
    cardRequestToggle: function cardRequestToggle() {
        var cardInfoRequest = $('.card-info__request');

        $('.js-card-request--show').on('click', function () {
            if (cardInfoRequest.hasClass('is-open')) {
                $html.removeAttr('style');
            } else {
                cardInfoRequest.addClass('is-open');
                $html.css('overflow', 'hidden');
            }
            return false;
        });
        $('.js-card-request--hide').on('click', function () {
            if (cardInfoRequest.hasClass('is-open')) {
                cardInfoRequest.removeClass('is-open');
                $html.removeAttr('style');
            }
        });
    },
    //Move blocks when window width < 768
    cardRequestBlockMoveItems: function cardRequestBlockMoveItems() {
        $('.js-card-title').insertAfter('.card-gallary__wrap');
        $('.js-card-about').insertBefore('.card-adress');
        $('.card-info__inner').insertAfter('.card-adress');

        $('.card-info__request').wrapInner('<div class="card-info__request_inner">');
        $('.card-info__header--mobile').insertBefore('.card-info__request_inner');
        $('.js-card-info-category').prependTo('.card-info__request_inner');
        $('.js-move-card-policy').appendTo('.card-request-form');
    },
    //Card Scrollspy
    cardScrollspy: function cardScrollspy() {
        if ($('.js-scrollspy').length) {
            setTimeout(function () {
                if ($(window).width() > 480) {
                    $('.js-scrollspy').scrollspy({ offset: -100 });
                } else {
                    $('.js-scrollspy').scrollspy({ offset: -60 });
                }
            }, 2000);
        }
    },
    cardSticky: function cardSticky() {
        if ($('.js-card-sticky').length && $('.js-card-fixed').length) {
            var fixCardUserInfo = function fixCardUserInfo() {
                $window.scroll(function () {
                    var scroll = $(this).scrollTop();
                    if (scroll >= stickyBlockOffset && scroll < fixedBlock.outerHeight(true) + fixedBlockOffset - stickyBlock.outerHeight()) {
                        stickyBlock.css({
                            position: 'fixed',
                            top: -1 + 'px',
                            width: 375 + 'px',
                            bottom: 'auto'
                        });
                    } else if (scroll >= stickyBlockOffset && scroll > fixedBlock.outerHeight(true) + fixedBlockOffset - stickyBlock.outerHeight() - 30) {
                        stickyBlock.css({
                            position: 'absolute',
                            top: 'auto',
                            bottom: 0,
                            width: 375 + 'px'
                        });
                    } else {
                        stickyBlock.removeAttr('style');
                    }
                });
            };

            var cardMenuFixed = function cardMenuFixed() {
                $window.scroll(function () {
                    var scroll = $(this).scrollTop();
                    if (scroll >= cardMenuOffset) {
                        cardMenuClone.show();
                        cardMenu.css({
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 99
                        }).addClass('is-sticky');
                    } else {
                        cardMenuClone.hide();
                        cardMenu.removeAttr('style').removeClass('is-sticky');
                    }
                });
            };

            var stickyBlock = $('.js-card-sticky');
            var stickyBlockOffset = stickyBlock.offset().top;
            var fixedBlock = $('.js-card-fixed');
            var fixedBlockOffset = fixedBlock.offset().top;

            var cardContent = $('.js-card-content-fixed');

            var cardMenu = $('.js-card-menu');
            var cardMenuClone = $('<div class="card-menu__clone">').css('height', $('.js-card-menu').outerHeight(true)).insertAfter(cardMenu).hide();
            var cardMenuOffset = cardMenu.offset().top;

            if (stickyBlock.length > 0 && fixedBlock.length > 0 && stickyBlock.height() < cardContent.height() && $(window).width() > 768) {
                fixCardUserInfo();
            }

            if (cardMenu.length) {
                cardMenuFixed();
            }
        }
    }
};

/**
 * Main
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Main = {
    init: function init() {}
};

$(function () {
    $(catalog.init());
    $(card.init());
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkaGVhZGVyIiwiJG1haW4iLCIkb3ZlcmxheSIsImlzT3BlcmEiLCJvcGVyYSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJpc0Nocm9tZSIsImNocm9tZSIsImlzRXhwbG9yZXIiLCJkb2N1bWVudE1vZGUiLCJpc0VkZ2UiLCJpc0ZpcmVmb3giLCJJbnN0YWxsVHJpZ2dlciIsImlzU2FmYXJpIiwidGVzdCIsImFkZENsYXNzIiwiQmFzZSIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJ0YWIiLCJsaXN0VG9nZ2xlIiwiY29weVRleHQiLCJvd25lclBob25lIiwiY2hhbmdlQ2l0eSIsInNsaWRlciIsImNhdGFsb2dJdGVtU2xpZGVyIiwiaGVhZGVyU2VhcmNoQnRuIiwic2VsZWN0IiwiaW5wdXRzIiwiYnV0dG9ucyIsInBvcHVwIiwid2lkdGgiLCJzY3JvbGxCYXIiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImxlbmd0aCIsIm5pY2VTY3JvbGwiLCJjdXJzb3Jjb2xvciIsImJveHpvb20iLCJ2ZXJnZSIsImN1cnNvcndpZHRoIiwiY3Vyc29yYm9yZGVyIiwiY3Vyc29yYm9yZGVycmFkaXVzIiwiZ2V0TmljZVNjcm9sbCIsInJlc2l6ZSIsInNldFRpbWVvdXQiLCJyZW1vdmVDbGFzcyIsImxpc3QiLCJjaGVja2JveCIsImZpbmQiLCJ3b3JrTGlzdCIsImhhc0NsYXNzIiwicmVtb3ZlQXR0ciIsImNzcyIsImNiIiwiQ2xpcGJvYXJkIiwiZWFjaCIsIiRpbnB1dEJveCIsImNsb3Nlc3QiLCIkaW5wdXRJY29uIiwiJGJ0blJlc2V0IiwiJGhpbnQiLCIkcGFyZW50IiwiYnRuIiwiJGJ0bkRhdGEiLCJkYXRhIiwiJGlucHV0VmFsIiwidmFsIiwiYXR0ciIsInNob3ciLCJub3QiLCJoaWRlIiwiZmlsdGVyIiwiZmFkZU91dCIsImZhZGVJbiIsInRleHQiLCJ1c2VyUGhvbmUiLCJwYXJlbnQiLCJwaG9uZSIsIiRjaGFuZ2VDaXR5IiwiJGNoYW5nZUNpdHlUaXRsZSIsIiRpbnB1dCIsInN0b3BQcm9wYWdhdGlvbiIsIiRzbGlkZXIiLCIkc2xpZHMiLCIkc2xpZGUiLCIkcHJldkFycm93IiwiJG5leHRBcnJvdyIsInNsaWNrIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwiYXJyb3dzIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCIkY2F0YWxvZ0l0ZW1TbGlkZXIiLCJfdGhpcyIsIiRzbGlkZXMiLCIkc2xpZGVyRG90cyIsImV2ZW50IiwicHJlcGVuZCIsImFwcGVuZCIsInNsaWRlQ291bnQiLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCJpIiwiaHRtbCIsImxhenlMb2FkIiwidGFicyIsInNlYXJjaEJ0biIsImJ0bkV4cGFuZGVkIiwiYnRuSG92ZXJBbmltYXRlIiwiYnRuU3RhdHVzQW5pbWF0ZSIsImJ0bkdvVG9wIiwiYnRuR29UbyIsImJ0bkZsb2F0aW5nIiwiYnRuUHVzaCIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwiJGJ0biIsInJ1biIsImhlbmRsZXIiLCJvZmYiLCJfcmVtb3ZlQW5pbWF0aW9uIiwiZWwiLCJidG5JZCIsInRyaWdnZXIiLCJtZXNzYWdlU3VjY2VzcyIsIm1lc3NhZ2VFcnJvciIsImRlbGF5Iiwic3RhdHVzIiwicHVzaFVwIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImVsZW1lbnRDbGljayIsImRlc3RpbmF0aW9uIiwiaW5wdXRFdmVudHMiLCJpbnB1dE1hc2siLCJpbnB1dG1hc2siLCJtYXNrIiwiZ3JlZWR5Iiwib25CZWZvcmVQYXN0ZSIsInBhc3RlZFZhbHVlIiwib3B0cyIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImRlZmluaXRpb25zIiwidmFsaWRhdG9yIiwiY2FyZGluYWxpdHkiLCJjYXNpbmciLCJpbnB1dCIsImV4ZWNDb21tYW5kIiwibmV4dCIsInByZXYiLCJlbmQiLCJzZWxlY3QyIiwidGFncyIsInRlbXBsYXRlUmVzdWx0IiwiYWRkVXNlclBpYyIsInRlbXBsYXRlU2VsZWN0aW9uIiwidGltZUFuZFByaWNlIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwibmF0aXZlU2VsZWN0IiwiY29sb3JTZWxlY3QiLCJib3JuU2VsZWN0IiwiaWNvblNlbGVjdCIsInNob3dZZWFyIiwiaGlkZVllYXIiLCJwaG9uZUNvZGUiLCJtb2JpbGVTZWxlY3QiLCJldmVudHMiLCIkc2VsZWN0TmF0aXZlIiwiJHRpdGxlIiwidGl0bGVUZXh0IiwicGxhY2Vob2xkZXIiLCIkZmlyc3RPcHRpb24iLCIkbmV3T3B0aW9uIiwiZGlzYWJsZWQiLCJzZWxlY3RlZCIsInR5cGUiLCJpcyIsInJlbW92ZSIsImFkZFJlc2V0QnRuIiwicHJlcGVuZFRvIiwid3JhcCIsIiRpY29uU2VsZWN0IiwiaWZvcm1hdCIsImRyb3Bkb3duUGFyZW50IiwiaWNvbiIsIm9yaWdpbmFsT3B0aW9uIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJjb2xvciIsIiRvcmlnaW5hbE9wdGlvbiIsImNvbG9yQmFsbCIsIiRib3JuU2VsZWN0IiwiYWxsb3dDbGVhciIsIiRzZWxlY3QiLCIkeWVhclNlbGVjdCIsInJlc2V0QnRuIiwic2libGluZ3MiLCJibHVyIiwic2VsZWN0Q29kZVNlbGVjdGlvbiIsIm9wdFZhbCIsInNlbGVjdENvZGVSZXN1bHQiLCJjb3VudHJ5IiwiJHBob25lQ29kZUJveCIsImZvY3VzIiwib3B0aW9uU2VsZWN0Iiwic2VsZWN0VmFsdWUiLCJlcSIsImNoYW5nZSIsImNvdW50ZXIiLCJzZWxlY3RlZEluZGV4IiwiYWRkRm9jdXMiLCJyZW1vdmVGb2N1cyIsIiRpbnB1dFNlYXJjaCIsIiRyZXN1bHRJdGVtIiwiJGl0ZW0iLCIkYnRuQ2xvc2UiLCIkbmFtZSIsInRyaW0iLCIkc2VydmljZSIsInNwbGl0Iiwiam9pbiIsInBvcHVwRmFuY3lCb3giLCJ3aG9JcyIsImNoYW5nZUZvcm1UaXRsZSIsInJlaW5pdCIsImZhbmN5Ym94IiwiYmFzZUNsYXNzIiwiY2xvc2VDbGlja091dHNpZGUiLCJhdXRvRm9jdXMiLCJpbWFnZSIsInByZWxvYWQiLCJoZWxwZXJzIiwib3ZlcmxheSIsImxvY2tlZCIsInRvb2xiYXIiLCJtb2JpbGUiLCJjbGlja0NvbnRlbnQiLCJjbGlja1NsaWRlIiwidG91Y2giLCJzbWFsbEJ0biIsIndob2lzIiwiZm9ybSIsImNoZWNrVmFsaWRhdGlvbiIsIiRmb3JtU3VjY2VzcyIsIk1lbnUiLCJtZW51IiwiJG1lbnUiLCIkaGFtYnVyZ2VyIiwiJGhhbWJ1cmdlckNybSIsIiRtZW51SXRlbSIsIiRtZW51T3ZlbGF5IiwiJG1lbnVJdGVtRHJvcGRvd24iLCIkYnRuRmxvYXQiLCJhY3RpdmVDbGFzcyIsImRyb3Bkb3duQWN0aXZlQ2xhc3MiLCJtZW51SXRlbURyb3Bkb3duRXZlbnQiLCJfY2xvc2UiLCJfb3BlbiIsIiR0YXJnZXQiLCJ0YXJnZXQiLCJEcm9wZG93biIsImRyb3Bkb3duIiwiJGRyb3Bkb3duIiwiJGJ0bkRyb3Bkb3duQ2xvc2UiLCIkYnRuRmxvYXRpbmciLCIkbGlzdCIsInN0eWxlVHJhbnNmb3JtIiwicG9zaXRpb24iLCJib3R0b20iLCJyaWdodCIsInpJbmRleCIsInN0eWxlIiwicmVuZGVyIiwiJGRyb3Bkb3duT3ZlcmxheSIsIiRkcm9wZG93bkxpc3QiLCJhcHBlbmRUbyIsImluc2VydEFmdGVyIiwiX3RvZ2dsZSIsImNvbnNvbGUiLCJsb2ciLCJ0b2dnbGVDbGFzcyIsIm9wdGlvbnMiLCIkcHVzaENvbnRhaW5lciIsIiRwdXNoSWNvblN1Y2Nlc3MiLCIkcHVzaEljb25FcnJvciIsInBvc2hQb3MiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsIkNoZWNrYm94IiwicHJvcCIsIiRhY2NvcmRlb24iLCIkY29udGVudCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJjYXRhbG9nIiwibWFwVG9nZ2xlIiwiYnRuRmlsdGVyT3BlbiIsImJ0blNob3dDYXRhbG9nIiwiYnRuU2hvd01hcCIsInN0aWNreUZpbHRlciIsImZpbHRlckNhdGVnb3J5IiwibW92ZUJsb2NrcyIsImlmUGFnZUNhdGFsb2ciLCJjYXRhbG9nRmlsdGVyIiwiZmlsdGVySGVpZ2h0IiwicXVlcnlTZWxlY3RvciIsImNsaWVudEhlaWdodCIsInRvcFNwYWNpbmciLCJib3R0b21TcGFjaW5nIiwic2Nyb2xsIiwiU3RpY2t5U2lkZWJhciIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJpbnNlcnRCZWZvcmUiLCJjYXJkIiwiY2FyZFNjcm9sbHNweSIsImNhcmRTdGlja3kiLCJjYXJkUmVxdWVzdFRvZ2dsZSIsImNhcmRSZXF1ZXN0QmxvY2tNb3ZlSXRlbXMiLCIkY2FyZFNsaWRlciIsImNhcmRJbmZvUmVxdWVzdCIsIndyYXBJbm5lciIsInNjcm9sbHNweSIsImZpeENhcmRVc2VySW5mbyIsInN0aWNreUJsb2NrT2Zmc2V0IiwiZml4ZWRCbG9jayIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsImNhcmRNZW51Rml4ZWQiLCJjYXJkTWVudU9mZnNldCIsImNhcmRNZW51Q2xvbmUiLCJjYXJkTWVudSIsImNhcmRDb250ZW50IiwiTWFpbiIsImFkZFJlbW92ZUNsYXNzQmxvY2siLCJibG9jayIsImNsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtB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QWtCNlYsRUFBbEI7QUFDSCxLQUZEO0FBR0FwWCxNQUFFbVgsUUFBUSxTQUFWLEVBQXFCMVUsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4Q3pDLFVBQUVtWCxLQUFGLEVBQVM1VCxXQUFULENBQXFCNlQsRUFBckI7QUFDSCxLQUZEO0FBR0g7O0FBRUQsU0FBUy9PLGNBQVQsQ0FBd0I4TyxLQUF4QixFQUErQkMsRUFBL0IsRUFBbUM7QUFDL0JwWCxNQUFFbVgsS0FBRixFQUFTMVUsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBVztBQUM1QnpDLFVBQUUsSUFBRixFQUFRMlQsV0FBUixDQUFvQnlELEVBQXBCO0FBQ0gsS0FGRDs7QUFJQXBYLE1BQUVHLFFBQUYsRUFBWXNDLEVBQVosQ0FBZSxrQkFBZixFQUFtQyxVQUFTQyxDQUFULEVBQVk7QUFDM0MsWUFBSTFDLEVBQUUwQyxFQUFFNFAsTUFBSixFQUFZbk8sT0FBWixDQUFvQmdULEtBQXBCLEVBQTJCdlUsTUFBL0IsRUFBdUM7QUFDdkM1QyxVQUFFbVgsS0FBRixFQUFTNVQsV0FBVCxDQUFxQjZULEVBQXJCO0FBQ0ExVSxVQUFFaUQsZUFBRjtBQUNILEtBSkQ7QUFLSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyc1xuY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcbmNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuY29uc3QgJGh0bWwgPSAkKCdodG1sJyk7XG5jb25zdCAkd3JhcHBlciA9ICQoJy53cmFwcGVyJyk7XG5jb25zdCAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuY29uc3QgJG1haW4gPSAkKCcubWFpbicpO1xuY29uc3QgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xuXG4vKipcclxuICogQmFzZS5qc1xyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGlzT3BlcmEgPSAhIXdpbmRvdy5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMDtcclxuXHJcbiAgICB2YXIgaXNDaHJvbWUgPSAhIXdpbmRvdy5jaHJvbWUgJiYgIWlzT3BlcmE7XHJcblxyXG4gICAgdmFyIGlzRXhwbG9yZXIgPVxyXG5cclxuICAgICAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlICYmICFpc0VkZ2U7XHJcblxyXG4gICAgdmFyIGlzRmlyZWZveCA9IHR5cGVvZiB3aW5kb3cuSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgIHZhciBpc1NhZmFyaSA9IC9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcblxyXG5cclxuXHJcbiAgICBpZiAoaXNDaHJvbWUpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1jaHJvbWUnKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGlzU2FmYXJpKSB7XHJcblxyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtc2FmYXJpJyk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChpc0ZpcmVmb3gpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1maXJlZm94Jyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlUHJlbG9hZGVyKCk7XHJcbiAgICAgICAgLy8gdGhpcy5hY2NvcmRlb24oKTtcclxuICAgICAgICAvLyB0aGlzLmNoZWNrYm94KCk7XHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuICAgICAgICB0aGlzLmxpc3RUb2dnbGUoKTtcclxuICAgICAgICB0aGlzLmNvcHlUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDaXR5KCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIoKTtcclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJTZWFyY2hCdG4oKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3QuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzLmluaXQoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMucG9wdXAuaW5pdCgpO1xyXG4gICAgICAgIC8vIHRoaXMuZm9ybS5pbml0KCk7XHJcblxyXG4gICAgICAgIC8vSW5pdCBtb2R1bGVzXHJcbiAgICAgICAgLy8gVGFiLmluaXQoKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IHMgPSBuZXcgU2VsZWN0KCk7XHJcbiAgICAgICAgLy8gcy5pbml0KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWVudS5oYW1idXJnZXJCdG4oKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5tZW51LmNsaWNrT3VzaWRlKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWVudS5zZWFyY2hCdG5PcGVuQ2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xyXG4gICAgICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzY3JvbGxCYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjNTg1YTU5JyxcclxuICAgICAgICAgICAgICAgIC8vIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5vbignbW91c2VvdmVyIG1vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL1JlbW92ZSBwcmVsb2FkZXJcclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8vQ3VzdG9tIGNoZWNib3ggJiBjaGVja2JveFBzZXVkb1xyXG4gICAgLy8gY2hlY2tib3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94JywgZnVuY3Rpb24oZSkge1xyXG4gICAgLy8gICAgICAgICBpZiAoXHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcclxuICAgIC8vICAgICAgICAgKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgLy9CQiBjaGVja2JveCBwc2V1ZG9cclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgIC8vICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAvL1NlbGVjdCBBbGwgQ2hlY2tib3hcclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC1zZWxlY3QtYWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9LFxyXG4gICAgLy9DdXN0b20gYWNjb3JkZW9uXHJcbiAgICAvLyBhY2NvcmRlb246IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIGxldCAkYWNjb3JkZW9uID0gJCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuICAgIC8vICAgICBpZiAoJGFjY29yZGVvbi5sZW5ndGgpIHtcclxuICAgIC8vICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVVcCgpO1xyXG4gICAgLy8gICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgLy9BY2NvcmRlb24gY29sbGFwc2VcclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1hY2NvcmRlb24gLmJiLWFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbihcclxuICAgIC8vICAgICAgICAgZVxyXG4gICAgLy8gICAgICkge1xyXG4gICAgLy8gICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG4gICAgLy8gICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYgKCRwYXJlbnQuZGF0YSgnYWNjb3JkZW9uJykgPT09ICdjb2xsYXBzZScpIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAkcGFyZW50XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9LFxyXG4gICAgbGlzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RUb2dnbGUoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9ICQoJy5qcy1saXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tib3ggPSBsaXN0LmZpbmQoJy5qcy1iYi1jaGVja2JveCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtMaXN0ID0gbGlzdC5maW5kKCcuanMtbGlzdC10b2dnbGUnKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrYm94Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja2JveC5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaXN0VG9nZ2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ29weSB0ZXh0IGNsaWNrIGxpbmtcclxuICAgIGNvcHlUZXh0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2IgPSBuZXcgQ2xpcGJvYXJkKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG4gICAgICAgIC8vaWYgaGFzIGlucHV0IHRoZW4gY29weSBpbnB1dCB2YWx1ZSBpbiBkYXRhIGF0dHJcclxuICAgICAgICAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRpbnB1dEJveCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJveCcpO1xyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRpbnB1dEJveC5maW5kKCcuYmItaW5wdXRfX2ljb24nKTtcclxuICAgICAgICAgICAgbGV0ICRidG5SZXNldCA9ICRpbnB1dEJveC5maW5kKCcuanMtaW5wdXQtLWNsZWFyJyk7XHJcbiAgICAgICAgICAgIGxldCAkaGludCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG4gPSAkcGFyZW50LmZpbmQoJy5qcy11c2VyLWxpbmsnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkRhdGEgPSAkKHRoaXMpLmRhdGEoJ2NsaXBib2FyZC10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dFZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hdHRyKCdkYXRhLWNsaXBib2FyZC10ZXh0JywgJGJ0bkRhdGEgKyAkaW5wdXRWYWwpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtaW5wdXQtLWNsZWFyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5mYWRlT3V0KClcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX2ljb24nKVxyXG4gICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1Nob3cgcGhvbmUgbnVtYmVyXHJcbiAgICBvd25lclBob25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtdXNlci1waG9uZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKTsnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoJCh0aGlzKS5kYXRhKCdwaG9uZS1oaWRlbicpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy11c2VyLXBob25lLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB1c2VyUGhvbmUgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtdXNlci1waG9uZScpO1xyXG4gICAgICAgICAgICB2YXIgcGhvbmUgPSB1c2VyUGhvbmUuZGF0YSgncGhvbmUnKTtcclxuICAgICAgICAgICAgdXNlclBob25lXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAndGVsOicgKyBwaG9uZSlcclxuICAgICAgICAgICAgICAgIC50ZXh0KHBob25lKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQ2l0eSBzZWxlY3RcclxuICAgIGNoYW5nZUNpdHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkY2hhbmdlQ2l0eSA9ICQoJy5qcy1jaXR5LXNlbGVjdCcpO1xyXG4gICAgICAgIGxldCAkY2hhbmdlQ2l0eVRpdGxlID0gJGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X190aXRsZSBzcGFuJyk7XHJcbiAgICAgICAgbGV0ICRpbnB1dCA9ICRjaGFuZ2VDaXR5LmZpbmQoJ2lucHV0Jyk7XHJcblxyXG4gICAgICAgICRpbnB1dC5vbignY2xpY2sgZm9jdXMnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkY2hhbmdlQ2l0eVRpdGxlLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQmFzZSBzbGlkZXJcclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtYmItc2xpZGVyJyk7XHJcbiAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcHJldkFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tcHJldicpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZHMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJHByZXZBcnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAkbmV4dEFycm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2F0YWxvZyBJdGVtIFNsaWRlclxyXG4gICAgY2F0YWxvZ0l0ZW1TbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgJGNhdGFsb2dJdGVtU2xpZGVyID0gJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgICAgICRjYXRhbG9nSXRlbVNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGFiOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG4gICAgfSxcclxuICAgIC8vTW9iaWxlIFNlYXJjaCBCdG4gb3Blbi9jbG9zZVxyXG4gICAgaGVhZGVyU2VhcmNoQnRuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2VhcmNoQnRuID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtYnRuJyk7XHJcbiAgICAgICAgc2VhcmNoQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLmNzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5idG5FeHBhbmRlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkhvdmVyQW5pbWF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0blN0YXR1c0FuaW1hdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5idG5Hb1RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkdvVG8oKTtcclxuICAgICAgICAgICAgdGhpcy5idG5GbG9hdGluZygpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0blB1c2goKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vYnRuIGV4cGFuZGVkXHJcbiAgICAgICAgYnRuRXhwYW5kZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vYnRuIGFuaW1hdGUgb24gaG92ZXJcclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnV0dG9uLWFuaW1hdGVfX2hvdmVyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWxYXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAnLmpzLWJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiByZWxZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc3RhdHVzIGFuaW1hdGVcclxuICAgICAgICBidG5TdGF0dXNBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBjbGljaysrO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjbGljayA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtcmVhZHknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2sgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG4gICAgICAgIGJ0bkZsb2F0aW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRidG4gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG4gICAgICAgICAgICBsZXQgcnVuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuICAgICAgICAgICAgbGV0IGhlbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICRidG4ub2ZmKFxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPINC30LDQutGA0YvRgtC40Y9cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcnVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsICcuanMtYnRuLWZsb2F0aW5nJywgaGVuZGxlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtdmlzaWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ292ZXJsYXktLWJ0bi1mbG9hdGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5tZC1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICAnLm92ZXJsYXktLWJ0bi1mbG9hdGluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmYS1sZWF2ZS1hY3RpdmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3ZlcmxheS0tYnRuLWZsb2F0aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAkd2luZG93Lm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBzY3JvbGxIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSAkd2luZG93LmhlaWdodCgpICsgJHdpbmRvdy5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgLy8gICAgIGlmICgoc2Nyb2xsSGVpZ2h0IC0gc2Nyb2xsUG9zaXRpb24pIC8gc2Nyb2xsSGVpZ2h0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgJGJ0bi5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICRidG4uZmFkZUluKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG4gICAgICAgICAgICAkKCcubW9kYWwnKS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5maW5kKCdbZGF0YS1wdXNoXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VTdWNjZXNzID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtZGVsYXknKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXR1cztcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1zdGF0dXMnKSB8fCAnc3VjY2Vzcyc7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVwKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2VFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlU3VjY2VzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBzY3JvbGwgdG8gdG9wXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDgwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBzY3JvbGwgdG8gZWxlbWVudFxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG4gICAgICAgICAgICAkKCcuanMtZ290bycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbnB1dHM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEV2ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtdGltZS1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtdGltZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk6OTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvZGUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvZGUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzkgOSA5IDknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ljk5Ljk5OTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvbmZpcm0tbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvbmZpcm0tbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5OTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWVtYWlsLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1lbWFpbC1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKnsxLDIwfVsuKnsxLDIwfV1bLip7MSwyMH1dWy4qezEsMjB9XUAqezEsMjB9Wy4qezIsNn1dWy4qezEsMn1dJyxcclxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uKHBhc3RlZFZhbHVlLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhc3RlZFZhbHVlLnJlcGxhY2UoJ21haWx0bzonLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS16ISMkJSYnKisvPT9eX2B7fH1+LV1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiAnbG93ZXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXRFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtLWNvcHknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtY29weS10ZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLXNoYXJlX19saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgaW5wdXQgc2VsZWN0IHZhbHVlXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC1mb2N1cy0tY29weScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL1Nob3cgUGFzc3dvcmRcclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWlucHV0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWlucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWlucHV0LXRpcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ25vLWNsb3NlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1pbmZvIGlzLWVycm9yIGlzLWludmFsaWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZWxlY3Q6IHtcclxuICAgICAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLW11bHRpcGxlJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICB0YWdzOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5iYi1zZWxlY3QtLW1ldHJvJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLXNlcnZpY2VzJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogdGltZUFuZFByaWNlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHRpbWVBbmRQcmljZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0ljb24gbWVudHJvIGluc2lkZSBzZWxlY3RcclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWV0cm8taWNvbiBtZXRyby1pY29uLS0nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1NlbGVjdCBBZGQgUHJpY2UgVGltZSAmIFByaWNlXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRpbWVBbmRQcmljZShvcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFRpbWUgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCd0aW1lJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxQcmljZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3ByaWNlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQudGV4dCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxUaW1lICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFByaWNlICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sb3JTZWxlY3QoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zZWxlY3RJY29uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9yblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmljb25TZWxlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93WWVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVZZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVDb2RlKCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBuYXRpdmVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgJHNlbGVjdE5hdGl2ZSA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LW5hdGl2ZScpO1xyXG4gICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9IF90aGlzLmNsb3Nlc3QoJy5iYi1pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0aXRsZSA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X190aXRsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGVUZXh0ID0gJHRpdGxlLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciA9IF90aGlzLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSBfdGhpcy5maW5kKCdvcHRpb246Zmlyc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRuZXdPcHRpb24gPSAkKCc8b3B0aW9uPicpLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogJ3NlbGVjdGVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSAkcGFyZW50LmRhdGEoJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVUZXh0ICE9PSAnJyB8fCB0aXRsZVRleHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGl0bGVUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIgIT09ICcnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gcGxhY2Vob2xkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdiYi1pbnB1dC0tdHJhbnNmb3JtJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24uaXMoJzplbXB0eScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvbi5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmFzZS5zZWxlY3QuYWRkUmVzZXRCdG4oX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZpcnN0T3B0aW9uIG5vdCBlbXB0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NlbGVjdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRuZXdPcHRpb24ucHJlcGVuZFRvKF90aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmFkZFJlc2V0QnRuKF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGZpcnN0T3B0aW9uLmlzKCc6ZW1wdHknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChwbGFjZWhvbGRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogJ2Rpc2FibGVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hhcy1wbGFjZWhvbGRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2hhcy1wbGFjZWhvbGRlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaGFzLXBsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9IF90aGlzLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi5pcygnOmVtcHR5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLndyYXAoJzxsYWJlbCBjbGFzcz1cImJiLXNlbGVjdFwiPicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBzZWxlY3RJY29uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgLy9UcmFuc2Zvcm0gc2VsZWN0IGluIGljb24gc2VsZWN0XHJcbiAgICAgICAgLy8gICAgIGxldCAkc2VsZWN0ID0gJChkb2N1bWVudCkuZmluZCgnLmpzLXNlbGVjdC1pY29uJyk7XHJcbiAgICAgICAgLy8gICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBpY29uID0gJCh0aGlzKS5kYXRhKCdzZWxlY3QtaWNvbicpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGljb25IdG1sID0gYDxzcGFuIGNsYXNzPVwiYmItc2VsZWN0X19pY29uXCI+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJpY29uIGljb24tdXNlciBiYi1zZWxlY3RfX2ljb1wiPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjJHtpY29ufVwiPjwvdXNlPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+YDtcclxuICAgICAgICAvLyAgICAgICAgIGxldCAkaWNvbkh0bWwgPSAkKGljb25IdG1sKTtcclxuICAgICAgICAvLyAgICAgICAgICRpY29uSHRtbC5wcmVwZW5kVG8oJCh0aGlzKSk7XHJcbiAgICAgICAgLy8gICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdiYi1zZWxlY3QtLWljb24nKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICBldmVudHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGljb25TZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGljb25TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0taWNvbicpO1xyXG5cclxuICAgICAgICAgICAgJGljb25TZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0ljb24gZm9udGF3ZXNvbWUgaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpZm9ybWF0KGljb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbE9wdGlvbiA9IGljb24uZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c3Bhbj48aSBjbGFzcz1cInNlbGVjdDJfX2ljb24nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvcmlnaW5hbE9wdGlvbikuZGF0YSgnaWNvbicpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjwvaT4gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24udGV4dCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sb3JTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAkY29sb3JTZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NlYXJjaC1lbmFibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2xvciBiYWxsIGluc2lkZSBzZWxlY3RcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlCYWxsKGNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRvcmlnaW5hbE9wdGlvbiA9IGNvbG9yLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yQmFsbCA9ICQoJG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdjb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IudGV4dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2xpbmVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfVwiPjwvc3Bhbj48cD4gJHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvci50ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDwvcD48L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2JhbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfSBcIj4gPC9zcGFuPiA8L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvcm5TZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGJvcm5TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1ib3JuJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGJvcm5TZWxlY3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkYm9yblNlbGVjdC5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRib3JuU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLWJvcm4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC1ib3JuX19zZWxlY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gJCh0aGlzKS5maW5kKCdvcHRpb246Zmlyc3QtY2hpbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdiYi1pbnB1dC0tdHJhbnNmb3JtJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0LWJvcm4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItaW5wdXQtYm9ybi0tdHJhbnNmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X190aXRsZScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3QuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3QucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53cmFwKCc8bGFiZWwgY2xhc3M9XCJiYi1zZWxlY3RcIj4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5hZGRSZXNldEJ0bigkYm9yblNlbGVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dZZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtc2V0LXllYXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVZZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICR5ZWFyU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC1ib3JuLS1jbGVhcicpO1xyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3RcclxuICAgICAgICAgICAgICAgIC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoKSA9PSAnJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtYm9ybicpID09PSAneWVhcidcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9IGVsO1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICRzZWxlY3QuY2xvc2VzdCgnLmJiLWlucHV0Jyk7XHJcbiAgICAgICAgICAgIGxldCByZXNldEJ0biA9XHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJiYi1zZWxlY3RfX3Jlc2V0IGpzLXNlbGVjdC0tcmVzZXRcIj48aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2k+PC9zcGFuPic7XHJcbiAgICAgICAgICAgIGxldCAkbmV3T3B0aW9uID0gJCgnPG9wdGlvbj4nKS5hdHRyKHtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChyZXNldEJ0bik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYXBwZW5kKHJlc2V0QnRuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmpzLXNlbGVjdC0tcmVzZXQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudDtcclxuICAgICAgICAgICAgICAgIGxldCAkc2VsZWN0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnNpYmxpbmdzKCcuanMtc2VsZWN0LWJvcm4nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0ID0gJCh0aGlzKS5zaWJsaW5ncygnLmpzLXNlbGVjdC1ib3JuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LWJvcm5fX3NlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0ID0gJCh0aGlzKS5zaWJsaW5ncygnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXRyYW5zZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbmV3T3B0aW9uLnByZXBlbmRUbygkc2VsZWN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2VsZWN0LnZhbCgkcGFyZW50LmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZCcpLnZhbCgpKS5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ2JiLWlucHV0LWJvcm5fX3NlbGVjdC0teWVhcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5uZXh0KCcuYmItaW5wdXQtYm9ybl9fYnRuJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGhvbmVDb2RlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9DaGFuZ2Ugc2VsZWN0IHJlc3VsdHMgdG8gb3B0aW9uIHZhbHVlXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVTZWxlY3Rpb24ob3B0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0VmFsID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArIG9wdFZhbCArICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9BZGQgY2l0eSBuYW1lIHRvIG9wdGlvblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlUmVzdWx0KG9wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50cnkgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdjb3VudHJ5JyksXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0VmFsID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRWYWwgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0ICRwaG9uZUNvZGVCb3ggPSAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0LXBob25lLWNvZGUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkcGhvbmVDb2RlQm94Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJHBob25lQ29kZUJveC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzKS5maW5kKCcuc2VsZWN0LXZhbHVlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJy5iYi1pbnB1dF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBzZWxlY3RDb2RlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBzZWxlY3RDb2RlU2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1pbnB1dC0tc2VsZWN0LXZhbHVlXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25TZWxlY3QgPSAkcGFyZW50LmZpbmQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0VmFsdWUgPSAkcGFyZW50LmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmJiLWlucHV0LS1zZWxlY3QtdmFsdWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcSgwKS52YWwoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gJCh0aGlzKVswXS5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoY291bnRlcikudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKDk5OSkgOTk5LTk5LTk5J1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQub24oJ2ZvY3VzJywgYWRkRm9jdXMpLm9uKCdibHVyJywgcmVtb3ZlRm9jdXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOm9wZW4nLCBhZGRGb2N1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOmNsb3NlJywgcmVtb3ZlRm9jdXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRGb2N1cygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUZvY3VzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1tb3ZlLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19maWVsZCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vdmUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaXRlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRuYW1lID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXJfX25hbWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2VydmljZSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5pdGVtLWluZm9fX3RpdGxlIHNwYW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJyArICcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gudmFsKCRuYW1lIHx8ICRzZXJ2aWNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmJiLWlucHV0LS10cmFuc2Zvcm0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICAnLm1vdmUtc2VsZWN0X19yZXN1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcG9wdXA6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3B1cEZhbmN5Qm94KCk7XHJcbiAgICAgICAgICAgIHRoaXMud2hvSXMoKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb3JtVGl0bGUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWluaXQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94XScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnZmFuY3lib3gtY29udGFpbmVyLS1pbWFnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tDb250ZW50OiAnY2xvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja1NsaWRlOiAnY2xvc2UnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc21hbGxCdG46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuICAgICAgICB3aG9JczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSAkKCcjYXV0aC1mb3JtJykuZmluZCgnLmZvcm0nKTtcclxuICAgICAgICAgICAgICAgIGlmICh3aG9pcyA9PT0gJ21hc3RlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2hvaXMgPT09ICdzdHVkaW8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtc3R1ZGlvJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLWNsaWVudCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vRHVuYW1pY2x5IGNoYW5nZSBmb3JtIHRpdGxlXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBmb3JtOiB7XHJcbiAgICAgICAgLy8gaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2hlY2tWYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgLy8gfSxcclxuXHJcbiAgICAgICAgY2hlY2tWYWxpZGF0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRidG4gPSAkKCcuZm9ybS1zdWNjZXNzX19yb2xlJyk7XHJcbiAgICAgICAgICAgIGxldCAkZm9ybVN1Y2Nlc3MgPSAkKCcuZm9ybS1zdWNjZXNzX19yb2xlcycpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3otaW5kZXgnLCAnMjAwJyk7XHJcblxyXG4gICAgICAgICAgICAkYnRuLm5vdCgkKHRoaXMpKS5hZGRDbGFzcygnbW92ZS1vdXQnKTtcclxuICAgICAgICAgICAgJGZvcm1TdWNjZXNzLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkYnRuLm5vdCgkKHRoaXMpKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgTWVudSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgbWVudSA9IHt9O1xyXG5cclxuICAgIGxldCAkd3JhcHBlciA9ICQoJy53cmFwcGVyJyk7XHJcblxyXG4gICAgbGV0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcblxyXG4gICAgbGV0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcclxuXHJcbiAgICBsZXQgJG1lbnUgPSAkKCcuanMtbWVudScpO1xyXG5cclxuICAgIGxldCAkaGFtYnVyZ2VyID0gJCgnLmpzLW1haW4tbmF2LWJ0bicpO1xyXG5cclxuICAgIGxldCAkaGFtYnVyZ2VyQ3JtID0gJCgnLmpzLWhhbWJ1cmdlcicpO1xyXG5cclxuICAgIGxldCAkbWVudUl0ZW0gPSAkKCcuanMtbWVudSAubWVudV9faXRlbScpO1xyXG5cclxuICAgIGxldCAkbWVudU92ZWxheSA9ICQoJy5qcy1tZW51LW92ZXJsYXknKTtcclxuXHJcbiAgICBsZXQgJG1lbnVJdGVtRHJvcGRvd24gPSAkKGRvY3VtZW50KS5maW5kKCcuanMtbWVudS1pdGVtLWRyb3Bkb3duJyk7XHJcblxyXG4gICAgbGV0ICRidG5GbG9hdCA9ICQoZG9jdW1lbnQpLmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcbiAgICBsZXQgYWN0aXZlQ2xhc3MgPSAnaXMtYWN0aXZlJztcclxuXHJcbiAgICBsZXQgZHJvcGRvd25BY3RpdmVDbGFzcyA9ICdtZW51LWRyb3Bkb3duLS1vcGVuJztcclxuXHJcblxyXG5cclxuICAgIG1lbnUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50cygpO1xyXG5cclxuICAgICAgICB0aGlzLm1lbnVJdGVtRHJvcGRvd25FdmVudCgpO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBtZW51LmV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkaGFtYnVyZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVudS5fY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVudS5fb3BlbigpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJGhhbWJ1cmdlckNybS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb24nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtZW51Ll9vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRtZW51SXRlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDQvdC10YIg0LLQu9C+0LbQtdC90L3QvtCz0L4g0LzQtdC90Y5cclxuXHJcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnanMtbWVudS1pdGVtLWRyb3Bkb3duJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudUl0ZW0ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8v0JXRgdC70Lgg0LXRgdGC0Ywg0LLQu9C+0LbQtdC90L3QvtC1INC80LXQvdGOXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QldGB0LvQuCDRgtCw0YDQs9C10YIg0YHRgdGL0LvQutCwINC90L4g0L3QtSDQutC90L7QutCwINCe0YLQvNC10L3QuNGC0YxcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR0YXJnZXQuaGFzQ2xhc3MoJ21lbnUtZHJvcGRvd25fX2xpbmsnKSAmJlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAhJHRhcmdldC5oYXNDbGFzcygnbWVudS1kcm9wZG93bl9fbGluay0tYWJvcnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICR0YXJnZXQucGFyZW50KCcubWVudS1kcm9wZG93bl9faXRlbScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v0J/QtdGA0LXQutC70Y7Rh9Cw0LXQvCDQsNC60YLQuNCy0L3Ri9C5INC60LvQsNGB0YEg0YMg0LPQu9Cw0LLQvdC+0Lkg0YHRgdGL0LvQutC4INC80LXQvdGOINC4INC+0YLQutGA0YvQstCw0LXQvCDQstC70L7QttC10L3QvdC+0LUg0LzQtdC90Y5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJG1lbnVJdGVtLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v0J/QtdGA0LXQutC70Y7Rh9Cw0LXQvCDQsNC60YLQuNCy0L3Ri9C5INC60LvQsNGB0YEg0YMg0LLQu9C+0LbQtdC90L3Ri9GFIGxpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5tZW51LWRyb3Bkb3duX19pdGVtJykucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v0KHQtNCy0LjQs9Cw0LXQvCDQutC+0L3RgtC10L3RglxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v0JXRgdC70Lgg0YLQsNGA0LPQtdGCINC60L3QvtC60LAg0J7RgtC80LXQvdC40YLRjCDQv9GA0L7RgdGC0L4g0LfQsNC60YDRi9Cy0LDQtdC8INC80LXQvdGOXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR0YXJnZXQuaGFzQ2xhc3MoJ21lbnUtZHJvcGRvd25fX2xpbmsnKSAmJlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0Lmhhc0NsYXNzKCdtZW51LWRyb3Bkb3duX19saW5rLS1hYm9ydCcpXHJcblxyXG4gICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v0JXRgdC70Lgg0YLQsNGA0LPQtdGCINCd0JUg0YHRgdGL0LvQutCwLCDQv9GA0L7QstC10YDRj9C10Lwg0L3QsCDQvdCw0LvQuNGH0LjQtSDQsNC60YLQuNCy0L3QvtCz0L4g0LrQu9Cw0YHRgdCwINGDINC00YDQvtC/0LTQsNGD0L3QsFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRtZW51SXRlbURyb3Bkb3duLnJlbW92ZUNsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXQuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRtZW51T3ZlbGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL9CY0LLQtdC90YIg0LrQu9C40LrQsCDQv9C+INCw0LDQutC+0LTQtdC+0L3RgyDQstC90YPRgtGA0Lgg0LzQtdC90Y5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudClcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuanMtbW9iaWxlLW5hdicpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLm1vYmlsZS1uYXZfX2l0ZW0nKVxyXG5cclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2JiLWFjY29yZGVvbl9faXRlbScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuZW5kKClcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50IGEnKVxyXG5cclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v0JfQsNC60YDQstCw0LXQvCDQvNC10L3RjiDQv9C+INC60LvRjtC60YMg0L3QsCDQvtCy0LXRgNC70Y3QuVxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLm92ZXJsYXktLW1lbnUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v0JfQsNC60YDQstCw0LXQvCDQvNC10L3RjiDQv9C+INC60LvRjtC60YMg0L3QsCDQvtCy0LXRgNC70Y3QuVxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLW1lbnUtb3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJCgnLmpzLW1lbnUgLm1lbnVfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBtZW51Lm1lbnVJdGVtRHJvcGRvd25FdmVudCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLW1lbnUtaXRlbS1kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtbWVudS1pdGVtLWRyb3Bkb3duIC5tZW51X19saW5rJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICBlXHJcblxyXG4gICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgbWVudS5fb3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCEkKGRvY3VtZW50KS5maW5kKCcuanNDcm1CbHVyRXZlbnRTdG9wJykpIHtcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAuYmx1cigpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAkaGFtYnVyZ2VyQ3JtLmFkZENsYXNzKCdvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2UtY2FiaW5ldCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdpcy1tb3ZpbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbWVudS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJykuYWRkQ2xhc3MoJ292ZXJsYXktLW1lbnUnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXIuYWRkQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKS5hZGRDbGFzcygnb3ZlcmxheS0tbWVudScpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLW9uZXBhZ2UnKSkge1xyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5hZGRDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpLmFkZENsYXNzKCdvdmVybGF5LS1tZW51Jyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgbWVudS5fY2xvc2UgPSBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICRoYW1idXJnZXIucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICRoYW1idXJnZXJDcm0ucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgICRtZW51SXRlbURyb3Bkb3duLnJlbW92ZUNsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdpcy1tb3ZpbmcnKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICAkYnRuRmxvYXQuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQuaXMoJy5qcy1oYW1idXJnZXInKSB8fCB0YXJnZXQuaXMoJy5qcy1tZW51LWl0ZW0tZHJvcGRvd24nKSkge1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICB9LCAyMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG1lbnVPdmVsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIG1lbnU7XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbmNvbnN0IERyb3Bkb3duID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcclxuXHJcbiAgICBsZXQgZHJvcGRvd24gPSB7fTtcclxuICAgIGxldCAkZHJvcGRvd24gPSAkKGRvY3VtZW50KS5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuICAgIGxldCAkYnRuRHJvcGRvd25DbG9zZSA9ICQoXHJcbiAgICAgICAgJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPjwvaT4nXHJcbiAgICApO1xyXG4gICAgbGV0ICRidG5GbG9hdGluZyA9ICQoZG9jdW1lbnQpLmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuICAgIGxldCBfdGhpcywgJGxpc3Q7XHJcbiAgICBsZXQgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHN0eWxlVHJhbnNmb3JtID0ge1xyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgIHRvcDogJ2F1dG8nLFxyXG4gICAgICAgIGJvdHRvbTogMTAsXHJcbiAgICAgICAgbGVmdDogMTAsXHJcbiAgICAgICAgcmlnaHQ6IDEwLFxyXG4gICAgICAgIHpJbmRleDogOTk5OVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgdG9wOiA2MCxcclxuICAgICAgICBsZWZ0OiAxMCxcclxuICAgICAgICByaWdodDogMTAsXHJcbiAgICAgICAgekluZGV4OiA5OTk5XHJcbiAgICB9O1xyXG5cclxuICAgIGRyb3Bkb3duLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJGRyb3Bkb3duLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLnJlbmRlcigpO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5ldmVudHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRyb3Bkb3duLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICQoZG9jdW1lbnQpLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duLmJiLWRyb3Bkb3duLS10cmFuc2Zvcm0nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQoXHJcbiAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJiYi1kcm9wZG93bl9fY2xvc2UganMtYmItZHJvcGRvd24tLWNsb3NlXCI+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93bk92ZXJsYXkgPSAkKCc8ZGl2IGNsYXNzPVwiYmItZHJvcGRvd25fX292ZXJsYXlcIj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLmFwcGVuZFRvKCRkcm9wZG93bkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duT3ZlcmxheS5pbnNlcnRBZnRlcigkZHJvcGRvd25MaXN0KTtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkcm9wZG93bi5ldmVudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJiLWRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICRsaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5fdG9nZ2xlKCQodGhpcykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tYW5vdGhlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkbGlzdC5pbnNlcnRBZnRlcignLndyYXBwZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRsaXN0LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy12aXNpYmxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdvdmVybGF5LS1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYmItZHJvcGRvd24tLXRyYW5zZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRsaXN0LmNzcyhzdHlsZVRyYW5zZm9ybSkuYWRkQ2xhc3MoJ190cmFuc2Zvcm0nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuRHJvcGRvd25DbG9zZS5wcmVwZW5kVG8oJGxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbGlzdC5jc3Moc3R5bGUpLmFkZENsYXNzKCdfdHJhbnNmb3JtX2luZm8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duLl90b2dnbGUoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vVG9nZ2xlIGZpeHJkIGNsYXNzIGZyb20gYm9keVxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24ucmVxdWVzdC1pbmZvJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnRFJPUERPV04gQ0xPU0UnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5vdmVybGF5LS1kcm9wZG93bicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5fY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICAgICAgICdjbGljayB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgJy5iYi1kcm9wZG93bl9fbGlzdCAuaW5mby1ibG9ja19faXRlbScsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLl9jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuICAgICAgICAgICAgZHJvcGRvd24uX2Nsb3NlKCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRyb3Bkb3duLl90b2dnbGUgPSBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgIGlmIChlbC5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgZWwudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRyb3Bkb3duLl9jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAkbGlzdC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgJGxpc3RcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ190cmFuc2Zvcm0nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdfdHJhbnNmb3JtX2luZm8nKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKF90aGlzKTtcclxuICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKS5yZW1vdmVDbGFzcygnb3ZlcmxheS0tZHJvcGRvd24nKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZHJvcGRvd247XHJcbn0pKCk7XHJcblxyXG4vL1B1c2hVcFxyXG5mdW5jdGlvbiBwdXNoVXAob3B0aW9ucykge1xyXG4gICAgdmFyIHRleHQgPSBvcHRpb25zLnRleHQgfHwgJ9CS0LDQvCDQvdC+0LLQsNGPINC30LDRj9Cy0LrQsCc7XHJcbiAgICB2YXIgc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgfHwgJ3N1Y2Nlc3MnO1xyXG5cclxuICAgIHZhciAkcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3B1c2gtdXAgcHVzaC11cC0tY2VudGVyJyk7XHJcbiAgICB2YXIgJHB1c2hJY29uU3VjY2VzcyA9ICQoXHJcbiAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcclxuICAgICAgICB3aWR0aD1cIjYxMS45OTRweFwiIGhlaWdodD1cIjYxMS45OTRweFwiIHZpZXdCb3g9XCIwIDAgNjExLjk5NCA2MTEuOTk0XCJcclxuICAgICAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIGNsYXNzPVwicHVzaC11cF9faWNvblwiPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTI0OC4xNzIsNDIzLjkxOGwtODkuNTQ1LTg5LjUzNGMtNS42MzctNS42MzctNS42MzctMTQuNzc4LDAtMjAuNDE2YzUuNjQzLTUuNjQ0LDE0Ljc4LTUuNjQ0LDIwLjQxNywwbDY5LjEyOCw2OS4xMjJcclxuICAgICAgICAgICAgICAgIGwxODQuNzk2LTE4NC44MDJjNS42NDQtNS42NDMsMTQuNzgtNS42NDMsMjAuNDE3LDBjNS42NDQsNS42MzcsNS42NDQsMTQuNzgsMCwyMC40MTdMMjQ4LjE3Miw0MjMuOTE4elwiLz5cclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzA2LjAzMSw2MTEuOTk0di0xNC40MzhsLTAuMDIyLDE0LjQzOEMxMzcuMjg2LDYxMS45OTQsMC4wMTIsNDc0LjcyNiwwLDMwNi4wMDNDMCwxMzcuMjc0LDEzNy4yNzQsMCwzMDUuOTk3LDBcclxuICAgICAgICAgICAgICAgICAgICBjMTY4LjcyOSwwLDMwNS45OTcsMTM3LjI3NCwzMDUuOTk3LDMwNS45OTdDNjEyLDQ3NC43MjYsNDc0Ljc0Myw2MTEuOTk0LDMwNi4wMzEsNjExLjk5NHogTTMwNS45OTcsMjguODc4XHJcbiAgICAgICAgICAgICAgICAgICAgYy0xNTIuODA1LDAtMjc3LjExOSwxMjQuMzE0LTI3Ny4xMTksMjc3LjExOUMyOC44OSw0NTguNzk2LDE1My4yMDksNTgzLjExLDMwNi4wMDksNTgzLjExaDAuMDIyXHJcbiAgICAgICAgICAgICAgICAgICAgYzE1Mi43ODgsMCwyNzcuMDkxLTEyNC4zMTQsMjc3LjA5MS0yNzcuMTEzQzU4My4xMjIsMTUzLjE5Miw0NTguODAyLDI4Ljg3OCwzMDUuOTk3LDI4Ljg3OHpcIi8+XHJcbiAgICAgICAgPC9zdmc+YFxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgJHB1c2hJY29uRXJyb3IgPSAkKFxyXG4gICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXHJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgNzguNTYxIDc4LjU2MVwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgY2xhc3M9XCJwdXNoLXVwX19pY29uXCI+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIzOS4yOFwiIGN5PVwiNTcuNzcyXCIgcj1cIjMuNjMyXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTM4Ljc5Miw0OC4zNDdjMS4xMDQsMCwyLTAuODk2LDItMnYtMTljMC0xLjEwNC0wLjg5Ni0yLTItMnMtMiwwLjg5Ni0yLDJ2MTlDMzYuNzkyLDQ3LjQ1MSwzNy42ODgsNDguMzQ3LDM4Ljc5Miw0OC4zNDd6XHJcbiAgICAgICAgICAgICAgICBcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNDYuNTcsMTEuNTQybC0wLjA5MS0wLjE0MWMtMS44NTItMi44NTQtMy43NjYtNS44MDYtNy4xOTktNS44MDZjLTMuNTc4LDAtNS40NSwyLjk5NC03LjI2LDUuODkxXHJcbiAgICAgICAgICAgICAgICBjLTAuMDA5LDAuMDE0LTAuMDY1LDAuMTA0LTAuMDc0LDAuMTE5TDAuMjc4LDY1LjI2NkMwLjA5Niw2NS41NzQsMCw2NS43MzUsMCw2Ni4wOTJjMCwzLjg5NiwzLjEzNSw2Ljg3NCw2Ljk4OCw2Ljg3NGg2NC41ODVcclxuICAgICAgICAgICAgICAgIGMzLjg1NCwwLDYuOTg4LTIuOTc5LDYuOTg4LTYuODc0YzAtMC4zNTctMC4wOTYtMC42MTQtMC4yNzctMC45MjFMNDYuNTcsMTEuNTQyeiBNNzEuNTczLDY4Ljk2Nkg2Ljk4OFxyXG4gICAgICAgICAgICAgICAgYy0xLjQ2MSwwLTIuNzE3LTAuOTUxLTIuOTUtMi4zOTRsMzEuMzc0LTUzLjA2MWMxLjU1NC0yLjQ4NywyLjU3Mi0zLjk2MywzLjg2OC0zLjk2M2MxLjI2MSwwLDIuNDU3LDEuODcsMy44NDMsNC4wMDZcclxuICAgICAgICAgICAgICAgIGwzMS4zOTksNTMuMDA3Qzc0LjI5LDY4LjAwMyw3My4wMzQsNjguOTY2LDcxLjU3Myw2OC45NjZ6XCIvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG5gXHJcbiAgICApO1xyXG5cclxuICAgICRwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcbiAgICAkcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAkcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtZXJyb3InKTtcclxuICAgICAgICAkcHVzaEljb25FcnJvci5wcmVwZW5kVG8oJHB1c2hDb250YWluZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtc3VjY2VzcycpO1xyXG4gICAgICAgICRwdXNoSWNvblN1Y2Nlc3MucHJlcGVuZFRvKCRwdXNoQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3NoUG9zKCk7XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAkcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA0NTAwKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaC11cC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLnB1c2gtdXAnKTtcclxuICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zaFBvcygpIHtcclxuICAgICAgICAkKCcucHVzaC11cCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLnB1c2gtdXAnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIGhlaWdodCAqIGUgKyAxMCArIGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgICQoQmFzZS5pbml0KCkpO1xyXG4gICAgTWVudS5pbml0KCk7XHJcbiAgICBEcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgKGZ1bmN0aW9uIENoZWNrYm94KCkge1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgLy9CQiBjaGVja2JveCBwc2V1ZG9cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAvL1NlbGVjdCBBbGwgQ2hlY2tib3hcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC1zZWxlY3QtYWxsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG4gICAgXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRhY2NvcmRlb24gPSAkKCcuanMtYmItYWNjb3JkZW9uJyk7XHJcbiAgICAgICAgbGV0ICRjb250ZW50ID0gJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50Jyk7XHJcbiAgICAgICAgbGV0ICRpdGVtID0gJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJyk7XHJcbiAgICBcclxuICAgICAgICBpZiAoJGFjY29yZGVvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJGNvbnRlbnQuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAkaXRlbS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAgICAgICAnY2xpY2snLFxyXG4gICAgICAgICAgICAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuICAgICAgICAgICAgICAgIGxldCAkaXRlbSA9ICQodGhpcykucGFyZW50KCcuYmItYWNjb3JkZW9uX19pdGVtJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmICgkcGFyZW50LmRhdGEoJ2FjY29yZGVvbicpID09PSAnY29sbGFwc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSkoKTtcclxuICAgIFxyXG59KTtcclxuXG4vKipcclxuICogQ2F0YWxvZ1xyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3QgY2F0YWxvZyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhdGFsb2cubWFwVG9nZ2xlKCk7XHJcbiAgICAgICAgY2F0YWxvZy5idG5GaWx0ZXJPcGVuKCk7XHJcbiAgICAgICAgY2F0YWxvZy5idG5TaG93Q2F0YWxvZygpO1xyXG4gICAgICAgIGNhdGFsb2cuYnRuU2hvd01hcCgpO1xyXG4gICAgICAgIGNhdGFsb2cuc3RpY2t5RmlsdGVyKCk7XHJcbiAgICAgICAgY2F0YWxvZy5maWx0ZXJDYXRlZ29yeSgpO1xyXG4gICAgICAgIGNhdGFsb2cubW92ZUJsb2NrcygpO1xyXG4gICAgICAgIGNhdGFsb2cuaWZQYWdlQ2F0YWxvZygpO1xyXG4gICAgfSxcclxuICAgIC8vQ2F0YWxvZyBtYXAgVG9nZ2xlXHJcbiAgICBtYXBUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1tYXAtLXNob3cnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0YWxvZy0tc2hvdycpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0J0biBmaWx0ZXIgb3BlblxyXG4gICAgYnRuRmlsdGVyT3BlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLW1vYmlsZS1maWx0ZXItLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGNhdGFsb2dGaWx0ZXIgPSAkKCcuY2F0YWxvZy1maWx0ZXInKTtcclxuICAgICAgICAgICAgaWYgKGNhdGFsb2dGaWx0ZXIuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2F0YWxvZ0ZpbHRlci5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhdGFsb2dGaWx0ZXIuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0J0biBzaG93IGNhdGFsb2dcclxuICAgIGJ0blNob3dDYXRhbG9nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtc2hvdy0tbGlzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1tYXAnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAkKCcuY2F0YWxvZy1jb250ZW50X19pbm5lcicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcCcpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0J0biBzaG93IG1hcCAtIGhpZGUgY2F0YWxvZ1xyXG4gICAgYnRuU2hvd01hcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXNob3ctLW1hcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1tYXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgJCgnLmNhdGFsb2ctY29udGVudF9faW5uZXInKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtc3Rpa3ktYmxvY2snKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1tYXAnKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9TdGlja3kgRmlsdGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9hYm91b2xpYS9zdGlja3ktc2lkZWJhclxyXG4gICAgc3RpY2t5RmlsdGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLXN0aWt5LWJsb2NrJykubGVuZ3RoICYmICQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgIC8vINCS0YvRgdC+0YLQsCDQsdC70L7QutCwINGE0LjQu9GM0YLRgNCwXHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZy1maWx0ZXJfX2lubmVyJylcclxuICAgICAgICAgICAgICAgIC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAvLyDQntGC0YHRgtGD0L8g0YHQstC10YDRhdGDXHJcbiAgICAgICAgICAgIGxldCB0b3BTcGFjaW5nID0gMTEwO1xyXG5cclxuICAgICAgICAgICAgLy8g0J7RgtGB0YLRg9C/INGB0L/RgNCw0LLQsFxyXG4gICAgICAgICAgICBsZXQgYm90dG9tU3BhY2luZyA9IDEwO1xyXG5cclxuICAgICAgICAgICAgLy8g0JzQtdC90Y/QtdC8IHRvcFNwYWNpbmcg0L/QviDRgdC60YDQvtC70LvRgyDRgdGC0YDQsNC90LjRhtGLICjRh9GC0L7QsdGLINCy0YHQtdCz0LTQsCDQsdGL0LvQviDQstC40LTQvdC+INC90LjQtyDRhNC40LvRjNGC0YDQsClcclxuICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMTAgKyBmaWx0ZXJIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3BTcGFjaW5nID0gJCh3aW5kb3cpLmhlaWdodCgpIC0gZmlsdGVySGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG5ldyBTdGlja3lTaWRlYmFyKCcuanMtc3Rpa3ktYmxvY2snLCB7XHJcbiAgICAgICAgICAgICAgICB0b3BTcGFjaW5nOiB0b3BTcGFjaW5nLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tU3BhY2luZzogYm90dG9tU3BhY2luZyxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmNhdGFsb2ctY29udGVudCcsXHJcbiAgICAgICAgICAgICAgICBpbm5lcldyYXBwZXJTZWxlY3RvcjogJy5jYXRhbG9nLWZpbHRlcl9faW5uZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL2ZpbHRlciBjYXRlZ29yeVxyXG4gICAgZmlsdGVyQ2F0ZWdvcnk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubm90KHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0ZWdvcnktLXJlc2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19saW5rJylcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19saW5rJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vTW92ZSBibG9jayBpbiBtZWRpYSBzY3JlZW5cclxuICAgIG1vdmVCbG9ja3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgJCgnLmpzLXZpZXctdG9nZ2xlJykuaW5zZXJ0QmVmb3JlKCcuY2F0YWxvZ19faW5uZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9JZiBwYWdlIGNhdGFsb2cgZmlsdGVyIHRyYW5zZm9ybSBhY2NvcmRlb25cclxuICAgIGlmUGFnZUNhdGFsb2c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1jYXRhbG9nJykpIHtcclxuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnaGVhZGVyLS1maXhlZCcpO1xyXG4gICAgICAgICAgICAkbWFpbi5jc3MoJ3BhZGRpbmctdG9wJywgJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNhdGFsb2ctZmlsdGVyX19ib2R5JykuYWRkQ2xhc3MoXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JiLWFjY29yZGVvbiBiYi1hY2NvcmRlb24tLW90aGVyIGpzLWJiLWFjY29yZGVvbidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLWFjY29yZGVvbl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX3RpdGxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLmNhdGFsb2ctZmlsdGVyX190aXRsZV9jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItYWNjb3JkZW9uX190aXRsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW06bHQoMiknKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG4vKipcclxuICogQ2FyZFxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3QgY2FyZCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhcmQuc2xpZGVyKCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU2Nyb2xsc3B5KCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU3RpY2t5KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgY2FyZC5jYXJkUmVxdWVzdFRvZ2dsZSgpO1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRSZXF1ZXN0QmxvY2tNb3ZlSXRlbXMoKTtcclxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoY2FyZC5jYXJkUmVxdWVzdEJsb2NrTW92ZUl0ZW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNsaWRlclxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2FyZFNsaWRlciA9ICQoJy5qcy1jYXJkLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhcmRTbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9IF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCByZXF1ZXN0IHNob3cgLyBoaWRlXHJcbiAgICBjYXJkUmVxdWVzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNhcmRJbmZvUmVxdWVzdCA9ICQoJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL01vdmUgYmxvY2tzIHdoZW4gd2luZG93IHdpZHRoIDwgNzY4XHJcbiAgICBjYXJkUmVxdWVzdEJsb2NrTW92ZUl0ZW1zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2FyZC10aXRsZScpLmluc2VydEFmdGVyKCcuY2FyZC1nYWxsYXJ5X193cmFwJyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtYWJvdXQnKS5pbnNlcnRCZWZvcmUoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5jYXJkLWluZm9fX2lubmVyJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWFkcmVzcycpO1xyXG5cclxuICAgICAgICAkKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jykud3JhcElubmVyKFxyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtaW5mb19fcmVxdWVzdF9pbm5lclwiPidcclxuICAgICAgICApO1xyXG4gICAgICAgICQoJy5jYXJkLWluZm9fX2hlYWRlci0tbW9iaWxlJykuaW5zZXJ0QmVmb3JlKFxyXG4gICAgICAgICAgICAnLmNhcmQtaW5mb19fcmVxdWVzdF9pbm5lcidcclxuICAgICAgICApO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWluZm8tY2F0ZWdvcnknKS5wcmVwZW5kVG8oJy5jYXJkLWluZm9fX3JlcXVlc3RfaW5uZXInKTtcclxuICAgICAgICAkKCcuanMtbW92ZS1jYXJkLXBvbGljeScpLmFwcGVuZFRvKCcuY2FyZC1yZXF1ZXN0LWZvcm0nKTtcclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2Nyb2xsc3B5XHJcbiAgICBjYXJkU2Nyb2xsc3B5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLXNjcm9sbHNweScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC0xMDAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC02MCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhcmRTdGlja3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zdGlja3knKS5sZW5ndGggJiYgJCgnLmpzLWNhcmQtZml4ZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrID0gJCgnLmpzLWNhcmQtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9ja09mZnNldCA9IHN0aWNreUJsb2NrLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2sgPSAkKCcuanMtY2FyZC1maXhlZCcpO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9ja09mZnNldCA9IGZpeGVkQmxvY2sub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRDb250ZW50ID0gJCgnLmpzLWNhcmQtY29udGVudC1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51ID0gJCgnLmpzLWNhcmQtbWVudScpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJjYXJkLW1lbnVfX2Nsb25lXCI+JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICQoJy5qcy1jYXJkLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKSlcclxuICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihjYXJkTWVudSlcclxuICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudU9mZnNldCA9IGNhcmRNZW51Lm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suaGVpZ2h0KCkgPCBjYXJkQ29udGVudC5oZWlnaHQoKSAmJlxyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjhcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhDYXJkVXNlckluZm8oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZml4Q2FyZFVzZXJJbmZvKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtMSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMzBcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FyZE1lbnUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTWVudUZpeGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmRNZW51Rml4ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID49IGNhcmRNZW51T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51LnJlbW92ZUF0dHIoJ3N0eWxlJykucmVtb3ZlQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cblxuLyoqXG4gKiBNYWluXG4gKlxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cbiAqL1xuY29uc3QgTWFpbiA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpIHt9XG59O1xuXG4kKGZ1bmN0aW9uKCkge1xuICAgICQoY2F0YWxvZy5pbml0KCkpO1xuICAgICQoY2FyZC5pbml0KCkpO1xufSk7XG5cbi8qKlxyXG4gKiBmdW5jdGlvbnMuanNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoYmxvY2spLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbn1cclxuXG4iXX0=
