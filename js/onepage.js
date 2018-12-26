'use strict';

//Global Vars
var $window = $(window);
var $document = $(document);
var $html = $('html');
var $wrapper = $('.wrapper');
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
 * Onepage
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Onepage = {
    init: function init() {
        if ($wrapper.hasClass('page-onepage')) {
            Onepage.heroAnimate();
        }

        this.slider();
        this.mobileSlider();
        this.counterSpin();
        this.playVideo();
        this.setHeight();

        this.promo.init();
        this.registration.init();
        this.icon.init();
    },
    heroAnimate: function heroAnimate() {
        var tl = new TimelineMax();
        tl.fromTo('.hero', 1, { y: -300, opacity: 0 }, { y: 0, opacity: 1 }).fromTo('.hero__title', 1, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=.3').fromTo('.hero__subtitle', 1, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=.7').fromTo('.hero__widget', 1, { y: 70, opacity: 0 }, { y: 0, opacity: 1 }, '-=.5').fromTo('.social', 1, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6');
    },
    slider: function slider() {
        var $slider = $('.js-onepage-slider');
        var $fullscreenSlider = $('.js-fullscreen-slider');

        if ($slider.length) {
            $slider.each(function () {
                var $slides = $(this).find('.bb-slider__slides');
                var $slide = $(this).find('.bb-slider__slide');

                if ($slide.length > 1) {
                    $slides.slick({
                        arrows: false,
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        speed: 1000,
                        autoplaySpeed: 5000,
                        autoplay: true,
                        dots: false,

                        responsive: [{
                            breakpoint: 815,
                            settings: {
                                slidesToShow: 2
                            }
                        }, {
                            breakpoint: 426,
                            settings: {
                                slidesToShow: 1
                            }
                        }]
                    });
                }
            });
        }

        if ($fullscreenSlider.length) {
            $fullscreenSlider.each(function () {
                var $slides = $(this).find('.bb-slider__slides');
                var $slide = $(this).find('.bb-slider__slide');

                if ($slide.length > 1) {
                    $slides.slick({
                        arrows: false,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 1000,
                        autoplaySpeed: 5000,
                        autoplay: false,
                        dots: true
                    });
                }
            });
        }
    },
    mobileSlider: function mobileSlider() {
        if ($(document).width() < 815) {
            var $slider = $('.js-onepage-slider--mobile');

            if ($slider.length) {
                $slider.each(function () {
                    var $slides = $(this).find('.bb-slider__slides');
                    var $slide = $(this).find('.bb-slider__slide');

                    if ($slide.length > 1) {
                        $slides.slick({
                            arrows: false,
                            infinite: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            speed: 1000,
                            autoplaySpeed: 5000,
                            autoplay: false,
                            dots: false
                        });
                    }
                });
            }
        }
    },
    counterSpin: function counterSpin() {
        var scrolled = false;

        $(window).scroll(function () {
            if (!scrolled) {
                var counterContainer = $('.js-counter--wrapper');
                var counterContainerOffset = counterContainer.data('offset');
                var screen = counterContainer.offset().top;

                if ($(window).scrollTop() > screen - counterContainerOffset) {
                    var $spin = $('.js-counter');

                    scrolled = true;

                    $spin.each(function () {
                        $(this).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function step(now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                    });
                }
            }
        });
    },
    playVideo: function playVideo() {
        $('.js-video').each(function () {
            var src = $(this).data('video');
            var frame = $('<iframe>');
            var $btn = $(this).find('.video__btn');

            $btn.on('click', function () {
                $(this).css('display', 'none');
                frame.prop('src', src + '?autoplay=1&autohide=1').appendTo($(this).parent('.js-video'));
            });
        });
    },
    setHeight: function setHeight() {
        var width = $window.width();
        changeHeight();

        $window.resize(function () {
            if (width >= $window.width() || width <= $window.width()) {
                changeHeight();
            }
        });

        function changeHeight() {
            var windowHeight = $window.height();
            var headerHeight = $('.header').height();
            var $firstscreen = $('.firstscreen');

            if ($(window).width() < 1024) {
                $firstscreen.css('height', windowHeight - headerHeight);
            }
        }
    },
    promo: {
        init: function init() {
            this.animation();
            this.sliders();
        },
        animation: function animation() {
            if ($('.hero--icon').length) {
                var tl = new TimelineMax();
                tl.fromTo('.logo', 1, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }).fromTo('.hero-inco__img', 1, { x: 50, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.5').fromTo('.hero-inco__text', 1, { x: -50, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.5');
            }

            if ($wrapper.hasClass('page-promo')) {
                var _tl = new TimelineMax();
                _tl.fromTo('.logo', 1, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }).fromTo('.hero__title', 1, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.5').fromTo('.hero__subtitle', 1, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=.6').fromTo('.slick-next', 1, { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.5').fromTo('.slick-prev', 1, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, '-=1').fromTo('.adv-image__img', 1, { y: 300, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.7');
            }
        },
        sliders: function sliders() {
            if ($('.js-bb-slider-adv').length) {
                $('.js-bb-slider-adv').slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 1000,
                    autoplaySpeed: 5000,
                    autoplay: true,
                    dots: true,
                    fade: true
                });
            }

            if ($('.js-bb-slider-adv-image').length) {
                $('.js-bb-slider-adv-image').slick({
                    arrows: true,
                    dots: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 1000,
                    autoplaySpeed: 5000,
                    autoplay: true,
                    fade: true
                });
            }

            if ($('.js-bb-slider-users').length) {
                $('.js-bb-slider-users').slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: 1000,
                    autoplaySpeed: 4000,
                    autoplay: true,
                    dots: false,
                    centerMode: true,
                    centerPadding: '20px'
                });
            }

            if ($('.js-bb-slider-icons').length) {
                $('.js-bb-slider-icons').slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    speed: 1000,
                    autoplaySpeed: 4000,
                    autoplay: true,
                    dots: false,
                    centerMode: true,
                    centerPadding: '20px',

                    responsive: [{
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                });
            }
        }
    },
    registration: {
        init: function init() {
            this.moveBlock();
        },

        moveBlock: function moveBlock() {
            var $authForm = $('.js-promo-form');

            if ($document.width() > 768) {
                moveForm();
            }

            $window.resize(function () {
                if ($document.width() > 768) {
                    moveForm();
                } else {
                    $('.screen--reg').append($authForm);
                }
            });

            function moveForm() {
                $authForm.insertAfter('.firstscreen__wrapper');
            }
        }
    },
    icon: {
        init: function init() {
            this.slider();
        },

        slider: function slider() {
            var $slider = $('.js-slider');

            if ($slider.length) {
                $slider.each(function () {
                    var $slides = $(this).find('.bb-slider__slides');
                    var $slide = $(this).find('.bb-slider__slide');

                    if ($slide.length > 1) {
                        $slides.slick({
                            arrows: false,
                            infinite: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            speed: 1000,
                            autoplaySpeed: 5000,
                            autoplay: true,
                            dots: false
                        });
                    }
                });
            }
        }
    }
};

$(function () {
    $(card.init());
    $(Onepage.init());
});

/*
 *** functions.js
 */
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiaXNPcGVyYSIsIm9wZXJhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsImlzQ2hyb21lIiwiY2hyb21lIiwiaXNFeHBsb3JlciIsImRvY3VtZW50TW9kZSIsImlzRWRnZSIsImlzRmlyZWZveCIsIkluc3RhbGxUcmlnZ2VyIiwiaXNTYWZhcmkiLCJ0ZXN0IiwiYWRkQ2xhc3MiLCJCYXNlIiwiaW5pdCIsInJlbW92ZVByZWxvYWRlciIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJoZWFkZXJTZWFyY2hCdG4iLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwicG9wdXAiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwibGlzdCIsImNoZWNrYm94IiwiZmluZCIsIndvcmtMaXN0IiwiaGFzQ2xhc3MiLCJyZW1vdmVBdHRyIiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCJlYWNoIiwiJGlucHV0Qm94IiwiY2xvc2VzdCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsIiRwYXJlbnQiLCJidG4iLCIkYnRuRGF0YSIsImRhdGEiLCIkaW5wdXRWYWwiLCJ2YWwiLCJhdHRyIiwic2hvdyIsIm5vdCIsImhpZGUiLCJmaWx0ZXIiLCJmYWRlT3V0IiwiZmFkZUluIiwidGV4dCIsInVzZXJQaG9uZSIsInBhcmVudCIsInBob25lIiwiJGNoYW5nZUNpdHkiLCIkY2hhbmdlQ2l0eVRpdGxlIiwiJGlucHV0Iiwic3RvcFByb3BhZ2F0aW9uIiwiJHNsaWRlciIsIiRzbGlkcyIsIiRzbGlkZSIsIiRwcmV2QXJyb3ciLCIkbmV4dEFycm93Iiwic2xpY2siLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiaW5maW5pdGUiLCJhcnJvd3MiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIiRjYXRhbG9nSXRlbVNsaWRlciIsIl90aGlzIiwiJHNsaWRlcyIsIiRzbGlkZXJEb3RzIiwiZXZlbnQiLCJwcmVwZW5kIiwiYXBwZW5kIiwic2xpZGVDb3VudCIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsImkiLCJodG1sIiwibGF6eUxvYWQiLCJ0YWJzIiwic2VhcmNoQnRuIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsIm1lc3NhZ2VTdWNjZXNzIiwibWVzc2FnZUVycm9yIiwiZGVsYXkiLCJzdGF0dXMiLCJwdXNoVXAiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCJpbnB1dEV2ZW50cyIsImlucHV0TWFzayIsImlucHV0bWFzayIsIm1hc2siLCJncmVlZHkiLCJvbkJlZm9yZVBhc3RlIiwicGFzdGVkVmFsdWUiLCJvcHRzIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiZGVmaW5pdGlvbnMiLCJ2YWxpZGF0b3IiLCJjYXJkaW5hbGl0eSIsImNhc2luZyIsImlucHV0IiwiZXhlY0NvbW1hbmQiLCJuZXh0IiwicHJldiIsImVuZCIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCJuYXRpdmVTZWxlY3QiLCJjb2xvclNlbGVjdCIsImJvcm5TZWxlY3QiLCJpY29uU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsInBob25lQ29kZSIsIm1vYmlsZVNlbGVjdCIsImV2ZW50cyIsIiRzZWxlY3ROYXRpdmUiLCIkdGl0bGUiLCJ0aXRsZVRleHQiLCJwbGFjZWhvbGRlciIsIiRmaXJzdE9wdGlvbiIsIiRuZXdPcHRpb24iLCJkaXNhYmxlZCIsInNlbGVjdGVkIiwidHlwZSIsImlzIiwicmVtb3ZlIiwiYWRkUmVzZXRCdG4iLCJwcmVwZW5kVG8iLCJ3cmFwIiwiJGljb25TZWxlY3QiLCJpZm9ybWF0IiwiZHJvcGRvd25QYXJlbnQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJGJvcm5TZWxlY3QiLCJhbGxvd0NsZWFyIiwiJHNlbGVjdCIsIiR5ZWFyU2VsZWN0IiwicmVzZXRCdG4iLCJzaWJsaW5ncyIsImJsdXIiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiJGlucHV0U2VhcmNoIiwiJHJlc3VsdEl0ZW0iLCIkaXRlbSIsIiRidG5DbG9zZSIsIiRuYW1lIiwidHJpbSIsIiRzZXJ2aWNlIiwic3BsaXQiLCJqb2luIiwicG9wdXBGYW5jeUJveCIsIndob0lzIiwiY2hhbmdlRm9ybVRpdGxlIiwicmVpbml0IiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2hlY2tWYWxpZGF0aW9uIiwiJGZvcm1TdWNjZXNzIiwiTWVudSIsIm1lbnUiLCIkaGVhZGVyIiwiJG1lbnUiLCIkaGFtYnVyZ2VyIiwiJGhhbWJ1cmdlckNybSIsIiRtZW51SXRlbSIsIiRtZW51T3ZlbGF5IiwiJG1lbnVJdGVtRHJvcGRvd24iLCIkYnRuRmxvYXQiLCJhY3RpdmVDbGFzcyIsImRyb3Bkb3duQWN0aXZlQ2xhc3MiLCJtZW51SXRlbURyb3Bkb3duRXZlbnQiLCJfY2xvc2UiLCJfb3BlbiIsIiR0YXJnZXQiLCJ0YXJnZXQiLCJEcm9wZG93biIsImRyb3Bkb3duIiwiJGRyb3Bkb3duIiwiJGJ0bkRyb3Bkb3duQ2xvc2UiLCIkYnRuRmxvYXRpbmciLCIkbGlzdCIsInN0eWxlVHJhbnNmb3JtIiwicG9zaXRpb24iLCJib3R0b20iLCJyaWdodCIsInpJbmRleCIsInN0eWxlIiwicmVuZGVyIiwiJGRyb3Bkb3duT3ZlcmxheSIsIiRkcm9wZG93bkxpc3QiLCJhcHBlbmRUbyIsImluc2VydEFmdGVyIiwiX3RvZ2dsZSIsImNvbnNvbGUiLCJsb2ciLCJ0b2dnbGVDbGFzcyIsIm9wdGlvbnMiLCIkcHVzaENvbnRhaW5lciIsIiRwdXNoSWNvblN1Y2Nlc3MiLCIkcHVzaEljb25FcnJvciIsInBvc2hQb3MiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsIkNoZWNrYm94IiwicHJvcCIsIiRhY2NvcmRlb24iLCIkY29udGVudCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJjYXJkIiwiY2FyZFNjcm9sbHNweSIsImNhcmRTdGlja3kiLCJjYXJkUmVxdWVzdFRvZ2dsZSIsImNhcmRSZXF1ZXN0QmxvY2tNb3ZlSXRlbXMiLCIkY2FyZFNsaWRlciIsImNhcmRJbmZvUmVxdWVzdCIsImluc2VydEJlZm9yZSIsIndyYXBJbm5lciIsInNjcm9sbHNweSIsImZpeENhcmRVc2VySW5mbyIsInNjcm9sbCIsInN0aWNreUJsb2NrT2Zmc2V0IiwiZml4ZWRCbG9jayIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsImNhcmRNZW51Rml4ZWQiLCJjYXJkTWVudU9mZnNldCIsImNhcmRNZW51Q2xvbmUiLCJjYXJkTWVudSIsImNhcmRDb250ZW50IiwiT25lcGFnZSIsImhlcm9BbmltYXRlIiwibW9iaWxlU2xpZGVyIiwiY291bnRlclNwaW4iLCJwbGF5VmlkZW8iLCJzZXRIZWlnaHQiLCJwcm9tbyIsInJlZ2lzdHJhdGlvbiIsInRsIiwiVGltZWxpbmVNYXgiLCJmcm9tVG8iLCJ5Iiwib3BhY2l0eSIsIiRmdWxsc2NyZWVuU2xpZGVyIiwic2Nyb2xsZWQiLCJjb3VudGVyQ29udGFpbmVyIiwiY291bnRlckNvbnRhaW5lck9mZnNldCIsInNjcmVlbiIsIiRzcGluIiwiQ291bnRlciIsImR1cmF0aW9uIiwiZWFzaW5nIiwic3RlcCIsIm5vdyIsIk1hdGgiLCJjZWlsIiwic3JjIiwiZnJhbWUiLCJjaGFuZ2VIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJoZWFkZXJIZWlnaHQiLCIkZmlyc3RzY3JlZW4iLCJhbmltYXRpb24iLCJzbGlkZXJzIiwieCIsImZhZGUiLCJjZW50ZXJNb2RlIiwiY2VudGVyUGFkZGluZyIsIm1vdmVCbG9jayIsIiRhdXRoRm9ybSIsIm1vdmVGb3JtIiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssV0FBV0wsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU0sUUFBUU4sRUFBRSxPQUFGLENBQWQ7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7O0FBRUE7Ozs7OztBQU1BQSxFQUFFLFlBQVc7O0FBRVQsUUFBSVEsVUFBVSxDQUFDLENBQUNQLE9BQU9RLEtBQVQsSUFBa0JDLFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLEtBQXdDLENBQXhFOztBQUVBLFFBQUlDLFdBQVcsQ0FBQyxDQUFDWixPQUFPYSxNQUFULElBQW1CLENBQUNOLE9BQW5DOztBQUVBLFFBQUlPLGFBRUEsT0FBT1osUUFBUCxLQUFvQixXQUFwQixJQUFtQyxDQUFDLENBQUNBLFNBQVNhLFlBQTlDLElBQThELENBQUNDLE1BRm5FOztBQUlBLFFBQUlDLFlBQVksT0FBT2pCLE9BQU9rQixjQUFkLEtBQWlDLFdBQWpEOztBQUVBLFFBQUlDLFdBQVcsaUNBQWlDQyxJQUFqQyxDQUFzQ1gsVUFBVUMsU0FBaEQsQ0FBZjs7QUFJQSxRQUFJRSxRQUFKLEVBQWM7O0FBRVZiLFVBQUUsTUFBRixFQUFVc0IsUUFBVixDQUFtQixXQUFuQjtBQUVILEtBSkQsTUFJTyxJQUFJRixRQUFKLEVBQWM7O0FBRWpCcEIsVUFBRSxNQUFGLEVBQVVzQixRQUFWLENBQW1CLFdBQW5CO0FBRUgsS0FKTSxNQUlBLElBQUlKLFNBQUosRUFBZTs7QUFFbEJsQixVQUFFLE1BQUYsRUFB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OVYsTUFBL0IsRUFBdUM7QUFDdkMzQyxVQUFFeVksS0FBRixFQUFTblYsV0FBVCxDQUFxQm9WLEVBQXJCO0FBQ0FqVyxVQUFFaUQsZUFBRjtBQUNILEtBSkQ7QUFLSCIsImZpbGUiOiJvbmVwYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyc1xuY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcbmNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuY29uc3QgJGh0bWwgPSAkKCdodG1sJyk7XG5jb25zdCAkd3JhcHBlciA9ICQoJy53cmFwcGVyJyk7XG5jb25zdCAkbWFpbiA9ICQoJy5tYWluJyk7XG5jb25zdCAkb3ZlcmxheSA9ICQoJy5vdmVybGF5Jyk7XG5cbi8qKlxyXG4gKiBCYXNlLmpzXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgaXNPcGVyYSA9ICEhd2luZG93Lm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwO1xyXG5cclxuICAgIHZhciBpc0Nocm9tZSA9ICEhd2luZG93LmNocm9tZSAmJiAhaXNPcGVyYTtcclxuXHJcbiAgICB2YXIgaXNFeHBsb3JlciA9XHJcblxyXG4gICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgISFkb2N1bWVudC5kb2N1bWVudE1vZGUgJiYgIWlzRWRnZTtcclxuXHJcbiAgICB2YXIgaXNGaXJlZm94ID0gdHlwZW9mIHdpbmRvdy5JbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7XHJcblxyXG4gICAgdmFyIGlzU2FmYXJpID0gL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuXHJcblxyXG5cclxuICAgIGlmIChpc0Nocm9tZSkge1xyXG5cclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWNocm9tZScpO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoaXNTYWZhcmkpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1zYWZhcmknKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGlzRmlyZWZveCkge1xyXG5cclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWZpcmVmb3gnKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5jb25zdCBCYXNlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuICAgICAgICAvLyB0aGlzLmFjY29yZGVvbigpO1xyXG4gICAgICAgIC8vIHRoaXMuY2hlY2tib3goKTtcclxuICAgICAgICB0aGlzLnRhYigpO1xyXG4gICAgICAgIHRoaXMubGlzdFRvZ2dsZSgpO1xyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuICAgICAgICB0aGlzLm93bmVyUGhvbmUoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNpdHkoKTtcclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMuY2F0YWxvZ0l0ZW1TbGlkZXIoKTtcclxuICAgICAgICB0aGlzLmhlYWRlclNlYXJjaEJ0bigpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmRyb3Bkb3duLmluaXQoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdC5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5wb3B1cC5pbml0KCk7XHJcbiAgICAgICAgLy8gdGhpcy5mb3JtLmluaXQoKTtcclxuXHJcbiAgICAgICAgLy9Jbml0IG1vZHVsZXNcclxuICAgICAgICAvLyBUYWIuaW5pdCgpO1xyXG5cclxuICAgICAgICAvLyBsZXQgcyA9IG5ldyBTZWxlY3QoKTtcclxuICAgICAgICAvLyBzLmluaXQoKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5tZW51LmhhbWJ1cmdlckJ0bigpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1lbnUuY2xpY2tPdXNpZGUoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5tZW51LnNlYXJjaEJ0bk9wZW5DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9TdG9wIGRyYWcgSW1nXHJcbiAgICAgICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNjcm9sbEJhcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyM1ODVhNTknLFxyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICcycHgnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcyJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm9uKCdtb3VzZW92ZXIgbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vUmVtb3ZlIHByZWxvYWRlclxyXG4gICAgcmVtb3ZlUHJlbG9hZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9LFxyXG4gICAgLy9DdXN0b20gY2hlY2JveCAmIGNoZWNrYm94UHNldWRvXHJcbiAgICAvLyBjaGVja2JveDogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAvLyAgICAgICAgIGlmIChcclxuICAgIC8vICAgICAgICAgICAgICQodGhpcylcclxuICAgIC8vICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxyXG4gICAgLy8gICAgICAgICApIHtcclxuICAgIC8vICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAvL0JCIGNoZWNrYm94IHBzZXVkb1xyXG4gICAgLy8gICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgIC8vU2VsZWN0IEFsbCBDaGVja2JveFxyXG4gICAgLy8gICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LXNlbGVjdC1hbGwnLCBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJykpIHtcclxuICAgIC8vICAgICAgICAgICAgICQodGhpcylcclxuICAgIC8vICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgIC8vICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICQodGhpcylcclxuICAgIC8vICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgIC8vICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0sXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuICAgIC8vIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgbGV0ICRhY2NvcmRlb24gPSAkKCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgLy8gICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XHJcbiAgICAvLyAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG4gICAgLy8gICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG4gICAgLy8gICAgICAgICBlXHJcbiAgICAvLyAgICAgKSB7XHJcbiAgICAvLyAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcbiAgICAvLyAgICAgICAgIGxldCAkaXRlbSA9ICQodGhpcykucGFyZW50KCcuYmItYWNjb3JkZW9uX19pdGVtJyk7XHJcblxyXG4gICAgLy8gICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICRwYXJlbnRcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0sXHJcbiAgICBsaXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWxpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdFRvZ2dsZSgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gJCgnLmpzLWxpc3QnKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya0xpc3QgPSBsaXN0LmZpbmQoJy5qcy1saXN0LXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpc3RUb2dnbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Db3B5IHRleHQgY2xpY2sgbGlua1xyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGlucHV0Qm94ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYm94Jyk7XHJcbiAgICAgICAgICAgIGxldCAkaW5wdXRJY29uID0gJGlucHV0Qm94LmZpbmQoJy5iYi1pbnB1dF9faWNvbicpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0blJlc2V0ID0gJGlucHV0Qm94LmZpbmQoJy5qcy1pbnB1dC0tY2xlYXInKTtcclxuICAgICAgICAgICAgbGV0ICRoaW50ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9ICRwYXJlbnQuZmluZCgnLmpzLXVzZXItbGluaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuRGF0YSA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0VmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9faWNvbicpXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy11c2VyLXBob25lJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgkKHRoaXMpLmRhdGEoJ3Bob25lLWhpZGVuJykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXVzZXItcGhvbmUtLXNob3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy11c2VyLXBob25lJyk7XHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9DaXR5IHNlbGVjdFxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRjaGFuZ2VDaXR5ID0gJCgnLmpzLWNpdHktc2VsZWN0Jyk7XHJcbiAgICAgICAgbGV0ICRjaGFuZ2VDaXR5VGl0bGUgPSAkY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX3RpdGxlIHNwYW4nKTtcclxuICAgICAgICBsZXQgJGlucHV0ID0gJGNoYW5nZUNpdHkuZmluZCgnaW5wdXQnKTtcclxuXHJcbiAgICAgICAgJGlucHV0Lm9uKCdjbGljayBmb2N1cycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRjaGFuZ2VDaXR5VGl0bGUudGV4dCgkKHRoaXMpLnRleHQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CYXNlIHNsaWRlclxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1iYi1zbGlkZXInKTtcclxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJG5leHRBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAkcHJldkFycm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICRuZXh0QXJyb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXRhbG9nIEl0ZW0gU2xpZGVyXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2F0YWxvZ0l0ZW1TbGlkZXIgPSAkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0YWI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1iYi10YWInKS50YWJzKCk7XHJcbiAgICB9LFxyXG4gICAgLy9Nb2JpbGUgU2VhcmNoIEJ0biBvcGVuL2Nsb3NlXHJcbiAgICBoZWFkZXJTZWFyY2hCdG46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzZWFyY2hCdG4gPSAkKCcuanMtbW9iaWxlLXNlYXJjaC1idG4nKTtcclxuICAgICAgICBzZWFyY2hCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYnV0dG9uczoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkV4cGFuZGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuSG92ZXJBbmltYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuU3RhdHVzQW5pbWF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkdvVG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuR29UbygpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkZsb2F0aW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUHVzaCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gZXhwYW5kZWRcclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFkZFJlbW92ZUNsYXNzKCcuanMtYnRuLWV4cGFuZGVkJywgJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG4gICAgICAgIGJ0bkhvdmVyQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcmVsWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnV0dG9uLWFuaW1hdGVfX2hvdmVyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWxYXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBzdGF0dXMgYW5pbWF0ZVxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY2xpY2sgPSAwO1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1yZWFkeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vZmxvYXRpbmcgYnRuIGFuaW1hdGluXHJcbiAgICAgICAgYnRuRmxvYXRpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcbiAgICAgICAgICAgIGxldCBydW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpLmNzcygncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL9Ce0LHRgNCw0LHQvtGC0YfQuNC6INC00L7QsdCw0LLQu9GP0LXRgiDQutC70LDRgdGB0Ysg0LfQsNGC0LXQvCDQvtGC0L/QuNGB0YvQstCw0YLQtdGB0Y8g0L7RgiDRgdC+0LHRi9GC0LjRj1xyXG4gICAgICAgICAgICBsZXQgaGVuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlQW5pbWF0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5vbihcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy12aXNpYmxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnb3ZlcmxheS0tYnRuLWZsb2F0aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bklkID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuSWQudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAnLmpzLWJ0bi1mbG9hdGluZyAuYnRuLWZsb2F0aW5nX19saW5rJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZW1vdmVBbmltYXRpb24oJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9Ca0LvQuNC6INCyINC90LUg0LrQvdC+0L/QutC4INGB0LrRgNGL0LLQsNC10YIg0L7QstC10YDQu9C10Lkg0Lgg0LrQvdC+0L/QutC4XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheS0tYnRuLWZsb2F0aW5nJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZhLWxlYXZlLWFjdGl2ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdvdmVybGF5LS1idG4tZmxvYXRpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHNjcm9sbEhlaWdodCA9ICRkb2N1bWVudC5oZWlnaHQoKTtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9ICR3aW5kb3cuaGVpZ2h0KCkgKyAkd2luZG93LnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKChzY3JvbGxIZWlnaHQgLSBzY3JvbGxQb3NpdGlvbikgLyBzY3JvbGxIZWlnaHQgPT09IDApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAkYnRuLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgJGJ0bi5mYWRlSW4oKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAvL9CV0YHQu9C4INGB0YHRi9C70LrQsCDQvtGC0LrRgNGL0LLQsNC10YIg0LzQvtC00LDQu9C60YMsINGC0L4g0L/QviDQvtGC0LrRgNGL0YLQuNGOINC80L7QtNCw0LvQutC4INGB0LrRgNGL0LLQsNC10YIg0LrQvdC+0L/QutC4XHJcbiAgICAgICAgICAgICQoJy5tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5QdXNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50LmZpbmQoJ1tkYXRhLXB1c2hdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlRXJyb3IgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLWVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVsYXkgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1kZWxheScpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVwKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2VTdWNjZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuICAgICAgICBidG5Hb1RvcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgODAwXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcbiAgICAgICAgYnRuR29UbzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA2MCArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGlucHV0czoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RXZlbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuICAgICAgICBpbnB1dE1hc2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy10aW1lLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy10aW1lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTo5OSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29kZS1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29kZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOSA5IDkgOSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTkuOTkuOTk5OSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29uZmlybS1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29uZmlybS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk5OSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZW1haWwtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWVtYWlsLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqezEsMjB9Wy4qezEsMjB9XVsuKnsxLDIwfV1bLip7MSwyMH1dQCp7MSwyMH1bLip7Miw2fV1bLip7MSwyfV0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24ocGFzdGVkVmFsdWUsIG9wdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzdGVkVmFsdWUgPSBwYXN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFzdGVkVmFsdWUucmVwbGFjZSgnbWFpbHRvOicsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLVphLXohIyQlJicqKy89P15fYHt8fX4tXVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6ICdsb3dlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnB1dEV2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC0tY29weScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1jb3B5LXRleHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItc2hhcmVfX2xpbmsnKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnRleHQoKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBpbnB1dCBzZWxlY3QgdmFsdWVcclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LWZvY3VzLS1jb3B5Jykub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vU2hvdyBQYXNzd29yZFxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0hpZGUgUGFzc3dvcmRcclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRkb2N1bWVudC5maW5kKCcuanMtYmItaW5wdXQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItaW5wdXQtdGlwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnbm8tY2xvc2UnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWluZm8gaXMtZXJyb3IgaXMtaW52YWxpZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdDoge1xyXG4gICAgICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tbXVsdGlwbGUnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tc2VydmljZXMnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiB0aW1lQW5kUHJpY2UsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogdGltZUFuZFByaWNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW1hZ2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdpbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vU2VsZWN0IEFkZCBQcmljZSBUaW1lICYgUHJpY2VcclxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZUFuZFByaWNlKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsVGltZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3RpbWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFByaWNlID0gJChvcHQuZWxlbWVudCkuZGF0YSgncHJpY2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdC50ZXh0ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRpbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2UgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVTZWxlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNlbGVjdEljb24oKTtcclxuICAgICAgICAgICAgdGhpcy5ib3JuU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dZZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVllYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5waG9uZUNvZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5hdGl2ZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciAkc2VsZWN0TmF0aXZlID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtbmF0aXZlJyk7XHJcbiAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gX3RoaXMuY2xvc2VzdCgnLmJiLWlucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHRpdGxlID0gJHBhcmVudC5maW5kKCcuYmItaW5wdXRfX3RpdGxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aXRsZVRleHQgPSAkdGl0bGUudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gX3RoaXMuZGF0YSgncGxhY2Vob2xkZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9IF90aGlzLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJG5ld09wdGlvbiA9ICQoJzxvcHRpb24+JykuYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogJ2Rpc2FibGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9ICRwYXJlbnQuZGF0YSgndHlwZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZVRleHQgIT09ICcnIHx8IHRpdGxlVGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSB0aXRsZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciAhPT0gJycgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBwbGFjZWhvbGRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ2JiLWlucHV0LS10cmFuc2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi5pcygnOmVtcHR5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NlbGVjdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb24ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwodGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5hZGRSZXNldEJ0bihfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZmlyc3RPcHRpb24gbm90IGVtcHR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2VsZWN0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJG5ld09wdGlvbi5wcmVwZW5kVG8oX3RoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmFzZS5zZWxlY3QuYWRkUmVzZXRCdG4oX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24uaXMoJzplbXB0eScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogJ3NlbGVjdGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAnZGlzYWJsZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaGFzLXBsYWNlaG9sZGVyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtcGxhY2Vob2xkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaGFzLXBsYWNlaG9sZGVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdoYXMtcGxhY2Vob2xkZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gX3RoaXMuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGZpcnN0T3B0aW9uLmlzKCc6ZW1wdHknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb24ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHNlbGVjdEljb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAvL1RyYW5zZm9ybSBzZWxlY3QgaW4gaWNvbiBzZWxlY3RcclxuICAgICAgICAvLyAgICAgbGV0ICRzZWxlY3QgPSAkKGRvY3VtZW50KS5maW5kKCcuanMtc2VsZWN0LWljb24nKTtcclxuICAgICAgICAvLyAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGljb24gPSAkKHRoaXMpLmRhdGEoJ3NlbGVjdC1pY29uJyk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaWNvbkh0bWwgPSBgPHNwYW4gY2xhc3M9XCJiYi1zZWxlY3RfX2ljb25cIj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImljb24gaWNvbi11c2VyIGJiLXNlbGVjdF9faWNvXCI+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyMke2ljb259XCI+PC91c2U+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5gO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0ICRpY29uSHRtbCA9ICQoaWNvbkh0bWwpO1xyXG4gICAgICAgIC8vICAgICAgICAgJGljb25IdG1sLnByZXBlbmRUbygkKHRoaXMpKTtcclxuICAgICAgICAvLyAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2JiLXNlbGVjdC0taWNvbicpO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIGV2ZW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWNvblNlbGVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkaWNvblNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1pY29uJyk7XHJcblxyXG4gICAgICAgICAgICAkaWNvblNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC0tc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaWZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaWZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBmb250YXdlc29tZSBpbnNpZGUgc2VsZWN0XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlmb3JtYXQoaWNvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsT3B0aW9uID0gaWNvbi5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPjxpIGNsYXNzPVwic2VsZWN0Ml9faWNvbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdpY29uJykgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi50ZXh0ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xvclNlbGVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkY29sb3JTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0tY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICRjb2xvclNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VhcmNoLWVuYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbG9yIGJhbGwgaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaUJhbGwoY29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJG9yaWdpbmFsT3B0aW9uID0gY29sb3IuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JCYWxsID0gJCgkb3JpZ2luYWxPcHRpb24pLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvci50ZXh0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fbGluZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9XCI+PC9zcGFuPjxwPiAke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPC9wPjwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fYmFsbFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9IFwiPiA8L3NwYW4+IDwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9yblNlbGVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkYm9yblNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkYm9yblNlbGVjdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRib3JuU2VsZWN0LnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93Q2xlYXI6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvcm5TZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC0tYm9ybicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LWJvcm5fX3NlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ2JiLWlucHV0LS10cmFuc2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXQtYm9ybicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1pbnB1dC1ib3JuLS10cmFuc2Zvcm0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5maW5kKCcuYmItaW5wdXRfX3RpdGxlJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUF0dHIoJ2RhdGEtcGxhY2Vob2xkZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLndyYXAoJzxsYWJlbCBjbGFzcz1cImJiLXNlbGVjdFwiPicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmFkZFJlc2V0QnRuKCRib3JuU2VsZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd1llYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zZXQteWVhcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZVllYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHllYXJTZWxlY3QgPSAkKCcuanMtc2VsZWN0LWJvcm4tLWNsZWFyJyk7XHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdFxyXG4gICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnVuc2VsZWN0aW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbignc2VsZWN0MjpvcGVuaW5nJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykub2ZmKCdzZWxlY3QyOm9wZW5pbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1ib3JuJykgPT09ICd5ZWFyJ1xyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkUmVzZXRCdG46IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gZWw7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJHNlbGVjdC5jbG9zZXN0KCcuYmItaW5wdXQnKTtcclxuICAgICAgICAgICAgbGV0IHJlc2V0QnRuID1cclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImJiLXNlbGVjdF9fcmVzZXQganMtc2VsZWN0LS1yZXNldFwiPjxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT48L3NwYW4+JztcclxuICAgICAgICAgICAgbGV0ICRuZXdPcHRpb24gPSAkKCc8b3B0aW9uPicpLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogJ3NlbGVjdGVkJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKHJlc2V0QnRuKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hcHBlbmQocmVzZXRCdG4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcuanMtc2VsZWN0LS1yZXNldCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzZWxlY3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuc2libGluZ3MoJy5qcy1zZWxlY3QtYm9ybicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3QgPSAkKHRoaXMpLnNpYmxpbmdzKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtYm9ybl9fc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3QgPSAkKHRoaXMpLnNpYmxpbmdzKCcuanMtc2VsZWN0LW5hdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC0tdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRuZXdPcHRpb24ucHJlcGVuZFRvKCRzZWxlY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzZWxlY3QudmFsKCRwYXJlbnQuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJykudmFsKCkpLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnYmItaW5wdXQtYm9ybl9fc2VsZWN0LS15ZWFyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50Lm5leHQoJy5iYi1pbnB1dC1ib3JuX19idG4nKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaG9uZUNvZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVNlbGVjdGlvbihvcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICsgb3B0VmFsICsgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVSZXN1bHQob3B0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRyeSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2NvdW50cnknKSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdFZhbCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBob25lQ29kZUJveCA9ICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQtcGhvbmUtY29kZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkcGhvbmVDb2RlQm94LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICQodGhpcykuZmluZCgnLmJiLWlucHV0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHNlbGVjdENvZGVSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHNlbGVjdENvZGVTZWxlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWlucHV0LS1zZWxlY3QtdmFsdWVcIj48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvblNlbGVjdCA9ICRwYXJlbnQuZmluZCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RWYWx1ZSA9ICRwYXJlbnQuZmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3QuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcShjb3VudGVyKS52YWwoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6b3BlbicsIGFkZEZvY3VzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZEZvY3VzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRm9jdXMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLW1vdmUtc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX2ZpZWxkJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJCh0aGlzKS5maW5kKCcuanMtbW92ZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRpdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJG5hbWUgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlcl9fbmFtZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZXJ2aWNlID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLml0ZW0taW5mb19fdGl0bGUgc3BhbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJyAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbignICsgJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC52YWwoJG5hbWUgfHwgJHNlcnZpY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuYmItaW5wdXQtLXRyYW5zZm9ybScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcubW92ZS1zZWxlY3RfX3Jlc3VsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwb3B1cDoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVwRmFuY3lCb3goKTtcclxuICAgICAgICAgICAgdGhpcy53aG9JcygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlaW5pdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG4gICAgICAgIHBvcHVwRmFuY3lCb3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlc1wiXScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZVwiXScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdmYW5jeWJveC1jb250YWluZXItLWltYWdlJyxcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vYmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja0NvbnRlbnQ6ICdjbG9zZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGU6ICdjbG9zZSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtYWxsQnRuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tY2xvc2VdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBzbWFsbEJ0bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL0Zvcm0gV2hvIElzP1xyXG4gICAgICAgIHdob0lzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLXdob2lzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2hvaXMgPSAkKHRoaXMpLmRhdGEoJ3dob2lzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9ICQoJyNhdXRoLWZvcm0nKS5maW5kKCcuZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdob2lzID09PSAnbWFzdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLW1hc3RlcicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aG9pcyA9PT0gJ3N0dWRpbycpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1zdHVkaW8nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtY2xpZW50Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9EdW5hbWljbHkgY2hhbmdlIGZvcm0gdGl0bGVcclxuICAgICAgICBjaGFuZ2VGb3JtVGl0bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgJy5qcy1mb3JtLXRpdGxlJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQodGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgQmFzZS5zZWxlY3QuY29sb3JTZWxlY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZvcm06IHtcclxuICAgICAgICAvLyBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5jaGVja1ZhbGlkYXRpb24oKTtcclxuICAgICAgICAvLyB9LFxyXG5cclxuICAgICAgICBjaGVja1ZhbGlkYXRpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICQoJy5mb3JtLXN1Y2Nlc3NfX3JvbGUnKTtcclxuICAgICAgICAgICAgbGV0ICRmb3JtU3VjY2VzcyA9ICQoJy5mb3JtLXN1Y2Nlc3NfX3JvbGVzJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnei1pbmRleCcsICcyMDAnKTtcclxuXHJcbiAgICAgICAgICAgICRidG4ubm90KCQodGhpcykpLmFkZENsYXNzKCdtb3ZlLW91dCcpO1xyXG4gICAgICAgICAgICAkZm9ybVN1Y2Nlc3MuYWRkQ2xhc3MoJ2lzLWVycm9yJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICRidG4ubm90KCQodGhpcykpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBNZW51ID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCBtZW51ID0ge307XHJcblxyXG4gICAgbGV0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcclxuXHJcbiAgICBsZXQgJGhlYWRlciA9ICQoJy5oZWFkZXInKTtcclxuXHJcbiAgICBsZXQgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xyXG5cclxuICAgIGxldCAkbWVudSA9ICQoJy5qcy1tZW51Jyk7XHJcblxyXG4gICAgbGV0ICRoYW1idXJnZXIgPSAkKCcuanMtbWFpbi1uYXYtYnRuJyk7XHJcblxyXG4gICAgbGV0ICRoYW1idXJnZXJDcm0gPSAkKCcuanMtaGFtYnVyZ2VyJyk7XHJcblxyXG4gICAgbGV0ICRtZW51SXRlbSA9ICQoJy5qcy1tZW51IC5tZW51X19pdGVtJyk7XHJcblxyXG4gICAgbGV0ICRtZW51T3ZlbGF5ID0gJCgnLmpzLW1lbnUtb3ZlcmxheScpO1xyXG5cclxuICAgIGxldCAkbWVudUl0ZW1Ecm9wZG93biA9ICQoZG9jdW1lbnQpLmZpbmQoJy5qcy1tZW51LWl0ZW0tZHJvcGRvd24nKTtcclxuXHJcbiAgICBsZXQgJGJ0bkZsb2F0ID0gJChkb2N1bWVudCkuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgIGxldCBhY3RpdmVDbGFzcyA9ICdpcy1hY3RpdmUnO1xyXG5cclxuICAgIGxldCBkcm9wZG93bkFjdGl2ZUNsYXNzID0gJ21lbnUtZHJvcGRvd24tLW9wZW4nO1xyXG5cclxuXHJcblxyXG4gICAgbWVudS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMubWVudUl0ZW1Ecm9wZG93bkV2ZW50KCk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIG1lbnUuZXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtZW51Ll9vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkaGFtYnVyZ2VyQ3JtLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIG1lbnUuX29wZW4oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJG1lbnVJdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAvL9CV0YHQu9C4INC90LXRgiDQstC70L7QttC10L3QvdC+0LPQviDQvNC10L3RjlxyXG5cclxuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdqcy1tZW51LWl0ZW0tZHJvcGRvd24nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICRtZW51SXRlbS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QldGB0LvQuCDQtdGB0YLRjCDQstC70L7QttC10L3QvdC+0LUg0LzQtdC90Y5cclxuXHJcbiAgICAgICAgICAgICAgICAvL9CV0YHQu9C4INGC0LDRgNCz0LXRgiDRgdGB0YvQu9C60LAg0L3QviDQvdC1INC60L3QvtC60LAg0J7RgtC80LXQvdC40YLRjFxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5oYXNDbGFzcygnbWVudS1kcm9wZG93bl9fbGluaycpICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICEkdGFyZ2V0Lmhhc0NsYXNzKCdtZW51LWRyb3Bkb3duX19saW5rLS1hYm9ydCcpXHJcblxyXG4gICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJHRhcmdldC5wYXJlbnQoJy5tZW51LWRyb3Bkb3duX19pdGVtJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/Qn9C10YDQtdC60LvRjtGH0LDQtdC8INCw0LrRgtC40LLQvdGL0Lkg0LrQu9Cw0YHRgSDRgyDQs9C70LDQstC90L7QuSDRgdGB0YvQu9C60Lgg0LzQtdC90Y4g0Lgg0L7RgtC60YDRi9Cy0LDQtdC8INCy0LvQvtC20LXQvdC90L7QtSDQvNC10L3RjlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWVudUl0ZW0ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/Qn9C10YDQtdC60LvRjtGH0LDQtdC8INCw0LrRgtC40LLQvdGL0Lkg0LrQu9Cw0YHRgSDRgyDQstC70L7QttC10L3QvdGL0YUgbGlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLm1lbnUtZHJvcGRvd25fX2l0ZW0nKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/QodC00LLQuNCz0LDQtdC8INC60L7QvdGC0LXQvdGCXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbWVudS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/QldGB0LvQuCDRgtCw0YDQs9C10YIg0LrQvdC+0LrQsCDQntGC0LzQtdC90LjRgtGMINC/0YDQvtGB0YLQviDQt9Cw0LrRgNGL0LLQsNC10Lwg0LzQtdC90Y5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5oYXNDbGFzcygnbWVudS1kcm9wZG93bl9fbGluaycpICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR0YXJnZXQuaGFzQ2xhc3MoJ21lbnUtZHJvcGRvd25fX2xpbmstLWFib3J0JylcclxuXHJcbiAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/QldGB0LvQuCDRgtCw0YDQs9C10YIg0J3QlSDRgdGB0YvQu9C60LAsINC/0YDQvtCy0LXRgNGP0LXQvCDQvdCwINC90LDQu9C40YfQuNC1INCw0LrRgtC40LLQvdC+0LPQviDQutC70LDRgdGB0LAg0YMg0LTRgNC+0L/QtNCw0YPQvdCwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbWVudS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdC5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJG1lbnVPdmVsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v0JjQstC10L3RgiDQutC70LjQutCwINC/0L4g0LDQsNC60L7QtNC10L7QvdGDINCy0L3Rg9GC0YDQuCDQvNC10L3RjlxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5qcy1tb2JpbGUtbmF2JylcclxuXHJcbiAgICAgICAgICAgIC5maW5kKCcubW9iaWxlLW5hdl9faXRlbScpXHJcblxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYmItYWNjb3JkZW9uX19pdGVtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5lbmQoKVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQgYScpXHJcblxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/Ql9Cw0LrRgNCy0LDQtdC8INC80LXQvdGOINC/0L4g0LrQu9GO0LrRgyDQvdCwINC+0LLQtdGA0LvRjdC5XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcub3ZlcmxheS0tbWVudScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/Ql9Cw0LrRgNCy0LDQtdC8INC80LXQvdGOINC/0L4g0LrQu9GO0LrRgyDQvdCwINC+0LLQtdGA0LvRjdC5XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtbWVudS1vdmVybGF5JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKCcuanMtbWVudSAubWVudV9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIG1lbnUubWVudUl0ZW1Ecm9wZG93bkV2ZW50ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtbWVudS1pdGVtLWRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1tZW51LWl0ZW0tZHJvcGRvd24gLm1lbnVfX2xpbmsnLCBmdW5jdGlvbihcclxuXHJcbiAgICAgICAgICAgIGVcclxuXHJcbiAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBtZW51Ll9vcGVuID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtZml4ZWQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoISQoZG9jdW1lbnQpLmZpbmQoJy5qc0NybUJsdXJFdmVudFN0b3AnKSkge1xyXG5cclxuICAgICAgICAgICAgJChkb2N1bWVudClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5ibHVyKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXJDcm0uYWRkQ2xhc3MoJ29uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1jYWJpbmV0JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ2lzLW1vdmluZycpO1xyXG5cclxuICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtZW51LW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKS5hZGRDbGFzcygnb3ZlcmxheS0tbWVudScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5hZGRDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpLmFkZENsYXNzKCdvdmVybGF5LS1tZW51Jyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2Utb25lcGFnZScpKSB7XHJcblxyXG4gICAgICAgICAgICAkaGFtYnVyZ2VyLmFkZENsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJykuYWRkQ2xhc3MoJ292ZXJsYXktLW1lbnUnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBtZW51Ll9jbG9zZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgJGhhbWJ1cmdlci5yZW1vdmVDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgJGhhbWJ1cmdlckNybS5yZW1vdmVDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLW1vdmluZycpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgICRidG5GbG9hdC5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldC5pcygnLmpzLWhhbWJ1cmdlcicpIHx8IHRhcmdldC5pcygnLmpzLW1lbnUtaXRlbS1kcm9wZG93bicpKSB7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgIH0sIDIwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNDgwKSB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICByZXR1cm4gbWVudTtcclxuXHJcbn0pKCk7XHJcblxyXG5cclxuY29uc3QgRHJvcGRvd24gPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xyXG5cclxuICAgIGxldCBkcm9wZG93biA9IHt9O1xyXG4gICAgbGV0ICRkcm9wZG93biA9ICQoZG9jdW1lbnQpLmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG4gICAgbGV0ICRidG5Ecm9wZG93bkNsb3NlID0gJChcclxuICAgICAgICAnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXMganMtYmItZHJvcGRvd24tLWNsb3NlXCI+PC9pPidcclxuICAgICk7XHJcbiAgICBsZXQgJGJ0bkZsb2F0aW5nID0gJChkb2N1bWVudCkuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG4gICAgbGV0IF90aGlzLCAkbGlzdDtcclxuICAgIGxldCBydW4gPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgc3R5bGVUcmFuc2Zvcm0gPSB7XHJcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgdG9wOiAnYXV0bycsXHJcbiAgICAgICAgYm90dG9tOiAxMCxcclxuICAgICAgICBsZWZ0OiAxMCxcclxuICAgICAgICByaWdodDogMTAsXHJcbiAgICAgICAgekluZGV4OiA5OTk5XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBzdHlsZSA9IHtcclxuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICB0b3A6IDYwLFxyXG4gICAgICAgIGxlZnQ6IDEwLFxyXG4gICAgICAgIHJpZ2h0OiAxMCxcclxuICAgICAgICB6SW5kZXg6IDk5OTlcclxuICAgIH07XHJcblxyXG4gICAgZHJvcGRvd24uaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkZHJvcGRvd24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnYmItZHJvcGRvd24tLWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJvcGRvd24ucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLmV2ZW50cygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZHJvcGRvd24ucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJChkb2N1bWVudCkuZmluZChcclxuICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJiLWRyb3Bkb3duX19jbG9zZSBqcy1iYi1kcm9wZG93bi0tY2xvc2VcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoJzxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fb3ZlcmxheVwiPicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd25PdmVybGF5Lmluc2VydEFmdGVyKCRkcm9wZG93bkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5maW5kKCcuaW5mby1ibG9ja19faWNvbicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRyb3Bkb3duLmV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJGxpc3QgPSAkKHRoaXMpLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLl90b2dnbGUoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS1hbm90aGVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRsaXN0Lmluc2VydEFmdGVyKCcud3JhcHBlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGxpc3QuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ292ZXJsYXktLWRyb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGxpc3QuY3NzKHN0eWxlVHJhbnNmb3JtKS5hZGRDbGFzcygnX3RyYW5zZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5Ecm9wZG93bkNsb3NlLnByZXBlbmRUbygkbGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRsaXN0LmNzcyhzdHlsZSkuYWRkQ2xhc3MoJ190cmFuc2Zvcm1faW5mbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24uX3RvZ2dsZSgkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9Ub2dnbGUgZml4cmQgY2xhc3MgZnJvbSBib2R5XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi5yZXF1ZXN0LWluZm8nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1iYi1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdEUk9QRE9XTiBDTE9TRScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLm92ZXJsYXktLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLl9jbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgICAgICAgJ2NsaWNrIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAnLmJiLWRyb3Bkb3duX19saXN0IC5pbmZvLWJsb2NrX19pdGVtJyxcclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uX2Nsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJiLWRyb3Bkb3duLS1jbG9zZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICBkcm9wZG93bi5fY2xvc2UoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZHJvcGRvd24uX3RvZ2dsZSA9IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBlbC50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZWwuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS10cmFuc2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZHJvcGRvd24uX2Nsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICRsaXN0LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAkbGlzdFxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnX3RyYW5zZm9ybScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ190cmFuc2Zvcm1faW5mbycpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oX3RoaXMpO1xyXG4gICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdvdmVybGF5LS1kcm9wZG93bicpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBkcm9wZG93bjtcclxufSkoKTtcclxuXHJcbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyICRwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygncHVzaC11cCBwdXNoLXVwLS1jZW50ZXInKTtcclxuICAgIHZhciAkcHVzaEljb25TdWNjZXNzID0gJChcclxuICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxyXG4gICAgICAgIHdpZHRoPVwiNjExLjk5NHB4XCIgaGVpZ2h0PVwiNjExLjk5NHB4XCIgdmlld0JveD1cIjAgMCA2MTEuOTk0IDYxMS45OTRcIlxyXG4gICAgICAgIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgY2xhc3M9XCJwdXNoLXVwX19pY29uXCI+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjQ4LjE3Miw0MjMuOTE4bC04OS41NDUtODkuNTM0Yy01LjYzNy01LjYzNy01LjYzNy0xNC43NzgsMC0yMC40MTZjNS42NDMtNS42NDQsMTQuNzgtNS42NDQsMjAuNDE3LDBsNjkuMTI4LDY5LjEyMlxyXG4gICAgICAgICAgICAgICAgbDE4NC43OTYtMTg0LjgwMmM1LjY0NC01LjY0MywxNC43OC01LjY0MywyMC40MTcsMGM1LjY0NCw1LjYzNyw1LjY0NCwxNC43OCwwLDIwLjQxN0wyNDguMTcyLDQyMy45MTh6XCIvPlxyXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zMDYuMDMxLDYxMS45OTR2LTE0LjQzOGwtMC4wMjIsMTQuNDM4QzEzNy4yODYsNjExLjk5NCwwLjAxMiw0NzQuNzI2LDAsMzA2LjAwM0MwLDEzNy4yNzQsMTM3LjI3NCwwLDMwNS45OTcsMFxyXG4gICAgICAgICAgICAgICAgICAgIGMxNjguNzI5LDAsMzA1Ljk5NywxMzcuMjc0LDMwNS45OTcsMzA1Ljk5N0M2MTIsNDc0LjcyNiw0NzQuNzQzLDYxMS45OTQsMzA2LjAzMSw2MTEuOTk0eiBNMzA1Ljk5NywyOC44NzhcclxuICAgICAgICAgICAgICAgICAgICBjLTE1Mi44MDUsMC0yNzcuMTE5LDEyNC4zMTQtMjc3LjExOSwyNzcuMTE5QzI4Ljg5LDQ1OC43OTYsMTUzLjIwOSw1ODMuMTEsMzA2LjAwOSw1ODMuMTFoMC4wMjJcclxuICAgICAgICAgICAgICAgICAgICBjMTUyLjc4OCwwLDI3Ny4wOTEtMTI0LjMxNCwyNzcuMDkxLTI3Ny4xMTNDNTgzLjEyMiwxNTMuMTkyLDQ1OC44MDIsMjguODc4LDMwNS45OTcsMjguODc4elwiLz5cclxuICAgICAgICA8L3N2Zz5gXHJcbiAgICApO1xyXG5cclxuICAgIHZhciAkcHVzaEljb25FcnJvciA9ICQoXHJcbiAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcclxuICAgICAgICAgICAgdmlld0JveD1cIjAgMCA3OC41NjEgNzguNTYxXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIiBjbGFzcz1cInB1c2gtdXBfX2ljb25cIj5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjM5LjI4XCIgY3k9XCI1Ny43NzJcIiByPVwiMy42MzJcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzguNzkyLDQ4LjM0N2MxLjEwNCwwLDItMC44OTYsMi0ydi0xOWMwLTEuMTA0LTAuODk2LTItMi0ycy0yLDAuODk2LTIsMnYxOUMzNi43OTIsNDcuNDUxLDM3LjY4OCw0OC4zNDcsMzguNzkyLDQ4LjM0N3pcclxuICAgICAgICAgICAgICAgIFwiLz5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk00Ni41NywxMS41NDJsLTAuMDkxLTAuMTQxYy0xLjg1Mi0yLjg1NC0zLjc2Ni01LjgwNi03LjE5OS01LjgwNmMtMy41NzgsMC01LjQ1LDIuOTk0LTcuMjYsNS44OTFcclxuICAgICAgICAgICAgICAgIGMtMC4wMDksMC4wMTQtMC4wNjUsMC4xMDQtMC4wNzQsMC4xMTlMMC4yNzgsNjUuMjY2QzAuMDk2LDY1LjU3NCwwLDY1LjczNSwwLDY2LjA5MmMwLDMuODk2LDMuMTM1LDYuODc0LDYuOTg4LDYuODc0aDY0LjU4NVxyXG4gICAgICAgICAgICAgICAgYzMuODU0LDAsNi45ODgtMi45NzksNi45ODgtNi44NzRjMC0wLjM1Ny0wLjA5Ni0wLjYxNC0wLjI3Ny0wLjkyMUw0Ni41NywxMS41NDJ6IE03MS41NzMsNjguOTY2SDYuOTg4XHJcbiAgICAgICAgICAgICAgICBjLTEuNDYxLDAtMi43MTctMC45NTEtMi45NS0yLjM5NGwzMS4zNzQtNTMuMDYxYzEuNTU0LTIuNDg3LDIuNTcyLTMuOTYzLDMuODY4LTMuOTYzYzEuMjYxLDAsMi40NTcsMS44NywzLjg0Myw0LjAwNlxyXG4gICAgICAgICAgICAgICAgbDMxLjM5OSw1My4wMDdDNzQuMjksNjguMDAzLDczLjAzNCw2OC45NjYsNzEuNTczLDY4Ljk2NnpcIi8+XHJcbiAgICAgICAgPC9zdmc+XHJcbmBcclxuICAgICk7XHJcblxyXG4gICAgJHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgICRwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XHJcblxyXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICRwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgICAgICRwdXNoSWNvbkVycm9yLnByZXBlbmRUbygkcHVzaENvbnRhaW5lcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICAgICAgJHB1c2hJY29uU3VjY2Vzcy5wcmVwZW5kVG8oJHB1c2hDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc2hQb3MoKTtcclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDQ1MDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNTAwMCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoLXVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcucHVzaC11cCcpO1xyXG4gICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBwb3NoUG9zKCkge1xyXG4gICAgICAgICQoJy5wdXNoLXVwJykuZWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAkKCcucHVzaC11cCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgJChCYXNlLmluaXQoKSk7XHJcbiAgICBNZW51LmluaXQoKTtcclxuICAgIERyb3Bkb3duLmluaXQoKTtcclxuXHJcbiAgICAoZnVuY3Rpb24gQ2hlY2tib3goKSB7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIFxyXG5cclxuICAgICAgICAvL0JCIGNoZWNrYm94IHBzZXVkb1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIC8vU2VsZWN0IEFsbCBDaGVja2JveFxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LXNlbGVjdC1hbGwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuICAgICAgICBsZXQgJGNvbnRlbnQgPSAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKTtcclxuICAgICAgICBsZXQgJGl0ZW0gPSAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuICAgIFxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkY29udGVudC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICRpdGVtLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICcuanMtYmItYWNjb3JkZW9uIC5iYi1hY2NvcmRlb25fX3RpdGxlJyxcclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuZGF0YSgnYWNjb3JkZW9uJykgPT09ICdjb2xsYXBzZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KSgpO1xyXG4gICAgXHJcbn0pO1xyXG5cbi8qKlxyXG4gKiBDYXJkXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBjYXJkID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2FyZC5zbGlkZXIoKTtcclxuICAgICAgICBjYXJkLmNhcmRTY3JvbGxzcHkoKTtcclxuICAgICAgICBjYXJkLmNhcmRTdGlja3koKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRSZXF1ZXN0VG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZFJlcXVlc3RCbG9ja01vdmVJdGVtcygpO1xyXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShjYXJkLmNhcmRSZXF1ZXN0QmxvY2tNb3ZlSXRlbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2xpZGVyXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zbGlkZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0ICRjYXJkU2xpZGVyID0gJCgnLmpzLWNhcmQtc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAkY2FyZFNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMjAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIHJlcXVlc3Qgc2hvdyAvIGhpZGVcclxuICAgIGNhcmRSZXF1ZXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2FyZEluZm9SZXF1ZXN0ID0gJCgnLmNhcmQtaW5mb19fcmVxdWVzdCcpO1xyXG5cclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbmZvUmVxdWVzdC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbmZvUmVxdWVzdC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vTW92ZSBibG9ja3Mgd2hlbiB3aW5kb3cgd2lkdGggPCA3NjhcclxuICAgIGNhcmRSZXF1ZXN0QmxvY2tNb3ZlSXRlbXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXRpdGxlJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWdhbGxhcnlfX3dyYXAnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1hYm91dCcpLmluc2VydEJlZm9yZSgnLmNhcmQtYWRyZXNzJyk7XHJcbiAgICAgICAgJCgnLmNhcmQtaW5mb19faW5uZXInKS5pbnNlcnRBZnRlcignLmNhcmQtYWRyZXNzJyk7XHJcblxyXG4gICAgICAgICQoJy5jYXJkLWluZm9fX3JlcXVlc3QnKS53cmFwSW5uZXIoXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1pbmZvX19yZXF1ZXN0X2lubmVyXCI+J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgJCgnLmNhcmQtaW5mb19faGVhZGVyLS1tb2JpbGUnKS5pbnNlcnRCZWZvcmUoXHJcbiAgICAgICAgICAgICcuY2FyZC1pbmZvX19yZXF1ZXN0X2lubmVyJ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtaW5mby1jYXRlZ29yeScpLnByZXBlbmRUbygnLmNhcmQtaW5mb19fcmVxdWVzdF9pbm5lcicpO1xyXG4gICAgICAgICQoJy5qcy1tb3ZlLWNhcmQtcG9saWN5JykuYXBwZW5kVG8oJy5jYXJkLXJlcXVlc3QtZm9ybScpO1xyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTY3JvbGxzcHlcclxuICAgIGNhcmRTY3JvbGxzcHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtc2Nyb2xsc3B5JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTEwMCB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTYwIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FyZFN0aWNreTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXN0aWNreScpLmxlbmd0aCAmJiAkKCcuanMtY2FyZC1maXhlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2sgPSAkKCcuanMtY2FyZC1zdGlja3knKTtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrT2Zmc2V0ID0gc3RpY2t5QmxvY2sub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9jayA9ICQoJy5qcy1jYXJkLWZpeGVkJyk7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrT2Zmc2V0ID0gZml4ZWRCbG9jay5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZENvbnRlbnQgPSAkKCcuanMtY2FyZC1jb250ZW50LWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnUgPSAkKCcuanMtY2FyZC1tZW51Jyk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudUNsb25lID0gJCgnPGRpdiBjbGFzcz1cImNhcmQtbWVudV9fY2xvbmVcIj4nKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJCgnLmpzLWNhcmQtbWVudScpLm91dGVySGVpZ2h0KHRydWUpKVxyXG4gICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKGNhcmRNZW51KVxyXG4gICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51T2Zmc2V0ID0gY2FyZE1lbnUub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5oZWlnaHQoKSA8IGNhcmRDb250ZW50LmhlaWdodCgpICYmXHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykud2lkdGgoKSA+IDc2OFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGZpeENhcmRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBmaXhDYXJkVXNlckluZm8oKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IC0xICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYXJkTWVudS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRNZW51Rml4ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2FyZE1lbnVGaXhlZCgpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gY2FyZE1lbnVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDk5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnUucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG4vKipcbiAqIE9uZXBhZ2VcbiAqXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxuICovXG5jb25zdCBPbmVwYWdlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2Utb25lcGFnZScpKSB7XG4gICAgICAgICAgICBPbmVwYWdlLmhlcm9BbmltYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNsaWRlcigpO1xuICAgICAgICB0aGlzLm1vYmlsZVNsaWRlcigpO1xuICAgICAgICB0aGlzLmNvdW50ZXJTcGluKCk7XG4gICAgICAgIHRoaXMucGxheVZpZGVvKCk7XG4gICAgICAgIHRoaXMuc2V0SGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5wcm9tby5pbml0KCk7XG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLmluaXQoKTtcbiAgICAgICAgdGhpcy5pY29uLmluaXQoKTtcbiAgICB9LFxuICAgIGhlcm9BbmltYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgdGwuZnJvbVRvKCcuaGVybycsIDEsIHsgeTogLTMwMCwgb3BhY2l0eTogMCB9LCB7IHk6IDAsIG9wYWNpdHk6IDEgfSlcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5oZXJvX190aXRsZScsXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPS4zJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3N1YnRpdGxlJyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgJy09LjcnXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICcuaGVyb19fd2lkZ2V0JyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogNzAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAnLT0uNSdcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5zb2NpYWwnLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgeyB5OiA1MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPTAuNidcbiAgICAgICAgICAgICk7XG4gICAgfSxcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1vbmVwYWdlLXNsaWRlcicpO1xuICAgICAgICBsZXQgJGZ1bGxzY3JlZW5TbGlkZXIgPSAkKCcuanMtZnVsbHNjcmVlbi1zbGlkZXInKTtcblxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogODE1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRmdWxsc2NyZWVuU2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgJGZ1bGxzY3JlZW5TbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbW9iaWxlU2xpZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoZG9jdW1lbnQpLndpZHRoKCkgPCA4MTUpIHtcbiAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyLS1tb2JpbGUnKTtcblxuICAgICAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgY291bnRlclNwaW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc2Nyb2xsZWQgPSBmYWxzZTtcblxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFzY3JvbGxlZCkge1xuICAgICAgICAgICAgICAgIGxldCBjb3VudGVyQ29udGFpbmVyID0gJCgnLmpzLWNvdW50ZXItLXdyYXBwZXInKTtcbiAgICAgICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lck9mZnNldCA9IGNvdW50ZXJDb250YWluZXIuZGF0YSgnb2Zmc2V0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IHNjcmVlbiA9IGNvdW50ZXJDb250YWluZXIub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcmVlbiAtIGNvdW50ZXJDb250YWluZXJPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzcGluID0gJCgnLmpzLWNvdW50ZXInKTtcblxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNwaW4uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYW5pbWF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvdW50ZXI6ICQodGhpcykudGV4dCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6ICdzd2luZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IGZ1bmN0aW9uKG5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KE1hdGguY2VpbChub3cpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBwbGF5VmlkZW86IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtdmlkZW8nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHNyYyA9ICQodGhpcykuZGF0YSgndmlkZW8nKTtcbiAgICAgICAgICAgIGxldCBmcmFtZSA9ICQoJzxpZnJhbWU+Jyk7XG4gICAgICAgICAgICBsZXQgJGJ0biA9ICQodGhpcykuZmluZCgnLnZpZGVvX19idG4nKTtcblxuICAgICAgICAgICAgJGJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ3NyYycsIHNyYyArICc/YXV0b3BsYXk9MSZhdXRvaGlkZT0xJylcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQodGhpcykucGFyZW50KCcuanMtdmlkZW8nKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzZXRIZWlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgd2lkdGggPSAkd2luZG93LndpZHRoKCk7XG4gICAgICAgIGNoYW5nZUhlaWdodCgpO1xuXG4gICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHdpZHRoID49ICR3aW5kb3cud2lkdGgoKSB8fCB3aWR0aCA8PSAkd2luZG93LndpZHRoKCkpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VIZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlSGVpZ2h0KCkge1xuICAgICAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCk7XG4gICAgICAgICAgICBsZXQgaGVhZGVySGVpZ2h0ID0gJCgnLmhlYWRlcicpLmhlaWdodCgpO1xuICAgICAgICAgICAgbGV0ICRmaXJzdHNjcmVlbiA9ICQoJy5maXJzdHNjcmVlbicpO1xuXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCAxMDI0KSB7XG4gICAgICAgICAgICAgICAgJGZpcnN0c2NyZWVuLmNzcygnaGVpZ2h0Jywgd2luZG93SGVpZ2h0IC0gaGVhZGVySGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHJvbW86IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFuaW1hdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCgnLmhlcm8tLWljb24nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICAgIHRsLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgJy5sb2dvJyxcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvLWluY29fX2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiA1MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX190ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IC01MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1wcm9tbycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgICB0bC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICcubG9nbycsXG4gICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyb19fdGl0bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvX19zdWJ0aXRsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09LjYnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuc2xpY2stbmV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC41J1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLnNsaWNrLXByZXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0xJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmFkdi1pbWFnZV9faW1nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDMwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjcnXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNsaWRlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItYWR2JykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1hZHYnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItYWR2LWltYWdlJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1hZHYtaW1hZ2UnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItdXNlcnMnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLXVzZXJzJykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDQwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzIwcHgnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWljb25zJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1pY29ucycpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4JyxcblxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZWdpc3RyYXRpb246IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVCbG9jaygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1vdmVCbG9jazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgJGF1dGhGb3JtID0gJCgnLmpzLXByb21vLWZvcm0nKTtcblxuICAgICAgICAgICAgaWYgKCRkb2N1bWVudC53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgICAgICAgICAgbW92ZUZvcm0oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRkb2N1bWVudC53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVGb3JtKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNjcmVlbi0tcmVnJykuYXBwZW5kKCRhdXRoRm9ybSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdmVGb3JtKCkge1xuICAgICAgICAgICAgICAgICRhdXRoRm9ybS5pbnNlcnRBZnRlcignLmZpcnN0c2NyZWVuX193cmFwcGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGljb246IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlcigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1zbGlkZXInKTtcblxuICAgICAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuJChmdW5jdGlvbigpIHtcbiAgICAkKGNhcmQuaW5pdCgpKTtcbiAgICAkKE9uZXBhZ2UuaW5pdCgpKTtcbn0pO1xuXG4vKlxuICoqKiBmdW5jdGlvbnMuanNcbiAqL1xuLyoqXHJcbiAqIGZ1bmN0aW9ucy5qc1xyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuXHJcbi8vRnVuY3Rpb24gQWRkIFJlbW92ZSBDbGFzcyBmcm9tIEJsb2NrXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzQmxvY2soYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrICsgJy0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLmFkZENsYXNzKGNsKTtcclxuICAgIH0pO1xyXG4gICAgJChibG9jayArICctLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jaykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdChibG9jaykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxufVxyXG5cbiJdfQ==
