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
        this.mockupVideo();
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
        var $sliderVideo = $fullscreenSlider.find('.slick-slide');

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
                        speed: 400,
                        autoplaySpeed: 4000,
                        autoplay: true,
                        dots: true
                    }).on('afterChange', function (event, slick, currentSlide) {
                        var $slide = $(this).find('.slick-slide');

                        $slide.each(function () {
                            var $video = $(this).find('video');

                            if ($(this).hasClass('slick-active')) {
                                if ($video.length) {
                                    $video.trigger('play');
                                }
                            }
                        });
                    }).on('beforeChange', function (event, slick, currentSlide) {
                        var $slide = $(this).find('.slick-slide');

                        $slide.each(function () {
                            var $video = $(this).find('video');

                            if ($(this).hasClass('slick-active')) {
                                if ($video.length) {
                                    $video.trigger('pause');
                                }
                            }
                        });
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
    mockupVideo: function mockupVideo() {
        var $videoContainer = $('.js-mockup-video');
        var $video = $videoContainer.find('video');
        var $playBtn = $videoContainer.find('.video-mockup__play-btn');

        $video.on('click', function () {
            var _this = $(this);

            _this.trigger('pause');
            _this.parent().find('.video-mockup__play-btn').fadeIn();
        });

        $playBtn.on('click', function () {
            var _this = $(this);

            _this.parent().find('video').trigger('play');

            _this.fadeOut();
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
            var $equalH = $('.js-equalheights');

            if ($(window).width() >= 1024) {
                $equalH.equalHeights();
            }

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
            var $modalForm = $('.js-modal-form');

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
                $modalForm.appendTo('.modal-body');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiaXNPcGVyYSIsIm9wZXJhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaW5kZXhPZiIsImlzQ2hyb21lIiwiY2hyb21lIiwiaXNFeHBsb3JlciIsImRvY3VtZW50TW9kZSIsImlzRWRnZSIsImlzRmlyZWZveCIsIkluc3RhbGxUcmlnZ2VyIiwiaXNTYWZhcmkiLCJ0ZXN0IiwiYWRkQ2xhc3MiLCJCYXNlIiwiaW5pdCIsInJlbW92ZVByZWxvYWRlciIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJoZWFkZXJTZWFyY2hCdG4iLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwicG9wdXAiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwibGlzdCIsImNoZWNrYm94IiwiZmluZCIsIndvcmtMaXN0IiwiaGFzQ2xhc3MiLCJyZW1vdmVBdHRyIiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCJlYWNoIiwiJGlucHV0Qm94IiwiY2xvc2VzdCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsIiRwYXJlbnQiLCJidG4iLCIkYnRuRGF0YSIsImRhdGEiLCIkaW5wdXRWYWwiLCJ2YWwiLCJhdHRyIiwic2hvdyIsIm5vdCIsImhpZGUiLCJmaWx0ZXIiLCJmYWRlT3V0IiwiZmFkZUluIiwidGV4dCIsInVzZXJQaG9uZSIsInBhcmVudCIsInBob25lIiwiJGNoYW5nZUNpdHkiLCIkY2hhbmdlQ2l0eVRpdGxlIiwiJGlucHV0Iiwic3RvcFByb3BhZ2F0aW9uIiwiJHNsaWRlciIsIiRzbGlkcyIsIiRzbGlkZSIsIiRwcmV2QXJyb3ciLCIkbmV4dEFycm93Iiwic2xpY2siLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiaW5maW5pdGUiLCJhcnJvd3MiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIiRjYXRhbG9nSXRlbVNsaWRlciIsIl90aGlzIiwiJHNsaWRlcyIsIiRzbGlkZXJEb3RzIiwiZXZlbnQiLCJwcmVwZW5kIiwiYXBwZW5kIiwic2xpZGVDb3VudCIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsImkiLCJodG1sIiwibGF6eUxvYWQiLCJ0YWJzIiwic2VhcmNoQnRuIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsIm1lc3NhZ2VTdWNjZXNzIiwibWVzc2FnZUVycm9yIiwiZGVsYXkiLCJzdGF0dXMiLCJwdXNoVXAiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCJpbnB1dEV2ZW50cyIsImlucHV0TWFzayIsImlucHV0bWFzayIsIm1hc2siLCJncmVlZHkiLCJvbkJlZm9yZVBhc3RlIiwicGFzdGVkVmFsdWUiLCJvcHRzIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiZGVmaW5pdGlvbnMiLCJ2YWxpZGF0b3IiLCJjYXJkaW5hbGl0eSIsImNhc2luZyIsImlucHV0IiwiZXhlY0NvbW1hbmQiLCJuZXh0IiwicHJldiIsImVuZCIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCJuYXRpdmVTZWxlY3QiLCJjb2xvclNlbGVjdCIsImJvcm5TZWxlY3QiLCJpY29uU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsInBob25lQ29kZSIsIm1vYmlsZVNlbGVjdCIsImV2ZW50cyIsIiRzZWxlY3ROYXRpdmUiLCIkdGl0bGUiLCJ0aXRsZVRleHQiLCJwbGFjZWhvbGRlciIsIiRmaXJzdE9wdGlvbiIsIiRuZXdPcHRpb24iLCJkaXNhYmxlZCIsInNlbGVjdGVkIiwidHlwZSIsImlzIiwicmVtb3ZlIiwiYWRkUmVzZXRCdG4iLCJwcmVwZW5kVG8iLCJ3cmFwIiwiJGljb25TZWxlY3QiLCJpZm9ybWF0IiwiZHJvcGRvd25QYXJlbnQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJGJvcm5TZWxlY3QiLCJhbGxvd0NsZWFyIiwiJHNlbGVjdCIsIiR5ZWFyU2VsZWN0IiwicmVzZXRCdG4iLCJzaWJsaW5ncyIsImJsdXIiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiJGlucHV0U2VhcmNoIiwiJHJlc3VsdEl0ZW0iLCIkaXRlbSIsIiRidG5DbG9zZSIsIiRuYW1lIiwidHJpbSIsIiRzZXJ2aWNlIiwic3BsaXQiLCJqb2luIiwicG9wdXBGYW5jeUJveCIsIndob0lzIiwiY2hhbmdlRm9ybVRpdGxlIiwicmVpbml0IiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2hlY2tWYWxpZGF0aW9uIiwiJGZvcm1TdWNjZXNzIiwiTWVudSIsIm1lbnUiLCIkaGVhZGVyIiwiJG1lbnUiLCIkaGFtYnVyZ2VyIiwiJGhhbWJ1cmdlckNybSIsIiRtZW51SXRlbSIsIiRtZW51T3ZlbGF5IiwiJG1lbnVJdGVtRHJvcGRvd24iLCIkYnRuRmxvYXQiLCJhY3RpdmVDbGFzcyIsImRyb3Bkb3duQWN0aXZlQ2xhc3MiLCJtZW51SXRlbURyb3Bkb3duRXZlbnQiLCJfY2xvc2UiLCJfb3BlbiIsIiR0YXJnZXQiLCJ0YXJnZXQiLCJEcm9wZG93biIsImRyb3Bkb3duIiwiJGRyb3Bkb3duIiwiJGJ0bkRyb3Bkb3duQ2xvc2UiLCIkYnRuRmxvYXRpbmciLCIkbGlzdCIsInN0eWxlVHJhbnNmb3JtIiwicG9zaXRpb24iLCJib3R0b20iLCJyaWdodCIsInpJbmRleCIsInN0eWxlIiwicmVuZGVyIiwiJGRyb3Bkb3duT3ZlcmxheSIsIiRkcm9wZG93bkxpc3QiLCJhcHBlbmRUbyIsImluc2VydEFmdGVyIiwiX3RvZ2dsZSIsImNvbnNvbGUiLCJsb2ciLCJ0b2dnbGVDbGFzcyIsIm9wdGlvbnMiLCIkcHVzaENvbnRhaW5lciIsIiRwdXNoSWNvblN1Y2Nlc3MiLCIkcHVzaEljb25FcnJvciIsInBvc2hQb3MiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsIkNoZWNrYm94IiwicHJvcCIsIiRhY2NvcmRlb24iLCIkY29udGVudCIsInNsaWRlVXAiLCJzbGlkZURvd24iLCJjYXJkIiwiY2FyZFNjcm9sbHNweSIsImNhcmRTdGlja3kiLCJjYXJkUmVxdWVzdFRvZ2dsZSIsImNhcmRSZXF1ZXN0QmxvY2tNb3ZlSXRlbXMiLCIkY2FyZFNsaWRlciIsImNhcmRJbmZvUmVxdWVzdCIsImluc2VydEJlZm9yZSIsIndyYXBJbm5lciIsInNjcm9sbHNweSIsImZpeENhcmRVc2VySW5mbyIsInNjcm9sbCIsInN0aWNreUJsb2NrT2Zmc2V0IiwiZml4ZWRCbG9jayIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsImNhcmRNZW51Rml4ZWQiLCJjYXJkTWVudU9mZnNldCIsImNhcmRNZW51Q2xvbmUiLCJjYXJkTWVudSIsImNhcmRDb250ZW50IiwiT25lcGFnZSIsImhlcm9BbmltYXRlIiwibW9iaWxlU2xpZGVyIiwiY291bnRlclNwaW4iLCJwbGF5VmlkZW8iLCJtb2NrdXBWaWRlbyIsInNldEhlaWdodCIsInByb21vIiwicmVnaXN0cmF0aW9uIiwidGwiLCJUaW1lbGluZU1heCIsImZyb21UbyIsInkiLCJvcGFjaXR5IiwiJGZ1bGxzY3JlZW5TbGlkZXIiLCIkc2xpZGVyVmlkZW8iLCIkdmlkZW8iLCJzY3JvbGxlZCIsImNvdW50ZXJDb250YWluZXIiLCJjb3VudGVyQ29udGFpbmVyT2Zmc2V0Iiwic2NyZWVuIiwiJHNwaW4iLCJDb3VudGVyIiwiZHVyYXRpb24iLCJlYXNpbmciLCJzdGVwIiwibm93IiwiTWF0aCIsImNlaWwiLCJzcmMiLCJmcmFtZSIsIiR2aWRlb0NvbnRhaW5lciIsIiRwbGF5QnRuIiwiY2hhbmdlSGVpZ2h0Iiwid2luZG93SGVpZ2h0IiwiaGVhZGVySGVpZ2h0IiwiJGZpcnN0c2NyZWVuIiwiJGVxdWFsSCIsImVxdWFsSGVpZ2h0cyIsImFuaW1hdGlvbiIsInNsaWRlcnMiLCJ4IiwiZmFkZSIsImNlbnRlck1vZGUiLCJjZW50ZXJQYWRkaW5nIiwibW92ZUJsb2NrIiwiJGF1dGhGb3JtIiwiJG1vZGFsRm9ybSIsIm1vdmVGb3JtIiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssV0FBV0wsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU0sUUFBUU4sRUFBRSxPQUFGLENBQWQ7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7O0FBRUE7Ozs7OztBQU1BQSxFQUFFLFlBQVc7O0FBRVQsUUFBSVEsVUFBVSxDQUFDLENBQUNQLE9BQU9RLEtBQVQsSUFBa0JDLFVBQVVDLFNBQVYsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLEtBQXdDLENBQXhFOztBQUVBLFFBQUlDLFdBQVcsQ0FBQyxDQUFDWixPQUFPYSxNQUFULElBQW1CLENBQUNOLE9BQW5DOztBQUVBLFFBQUlPLGFBRUEsT0FBT1osUUFBUCxLQUFvQixXQUFwQixJQUFtQyxDQUFDLENBQUNBLFNBQVNhLFlBQTlDLElBQThELENBQUNDLE1BRm5FOztBQUlBLFFBQUlDLFlBQVksT0FBT2pCLE9BQU9rQixjQUFkLEtBQWlDLFdBQWpEOztBQUVBLFFBQUlDLFdBQVcsaUNBQWlDQyxJQUFqQyxDQUFzQ1gsVUFBVUMsU0FBaEQsQ0FBZjs7QUFJQSxRQUFJRSxRQUFKLEVBQWM7O0FBRVZiLFVBQUUsTUFBRixFQUFVc0IsUUFBVixDQUFtQixXQUFuQjtBQUVILEtBSkQsTUFJTyxJQUFJRixR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QUNKLGlCQWhCRDtBQWlCSDtBQUNKO0FBM0JDO0FBcmJNLENBQWhCOztBQW9kQTFHLEVBQUUsWUFBVztBQUNUQSxNQUFFMFUsS0FBS2xULElBQUwsRUFBRjtBQUNBeEIsTUFBRStWLFFBQVF2VSxJQUFSLEVBQUY7QUFDSCxDQUhEOztBQUtBOzs7QUFHQTs7Ozs7O0FBTUE7QUFDQSxTQUFTd1gsbUJBQVQsQ0FBNkJDLEtBQTdCLEVBQW9DQyxFQUFwQyxFQUF3QztBQUNwQ2xaLE1BQUVpWixRQUFRLFFBQVYsRUFBb0J6VyxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDeEMsVUFBRWlaLEtBQUYsRUFBUzNYLFFBQVQsQ0FBa0I0WCxFQUFsQjtBQUNILEtBRkQ7QUFHQWxaLE1BQUVpWixRQUFRLFNBQVYsRUFBcUJ6VyxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFXO0FBQ3hDeEMsVUFBRWlaLEtBQUYsRUFBUzNWLFdBQVQsQ0FBcUI0VixFQUFyQjtBQUNILEtBRkQ7QUFHSDs7QUFFRCxTQUFTOVEsY0FBVCxDQUF3QjZRLEtBQXhCLEVBQStCQyxFQUEvQixFQUFtQztBQUMvQmxaLE1BQUVpWixLQUFGLEVBQVN6VyxFQUFULENBQVksT0FBWixFQUFxQixZQUFXO0FBQzVCeEMsVUFBRSxJQUFGLEVBQVEyVCxXQUFSLENBQW9CdUYsRUFBcEI7QUFDSCxLQUZEOztBQUlBbFosTUFBRUcsUUFBRixFQUFZcUMsRUFBWixDQUFlLGtCQUFmLEVBQW1DLFVBQVNDLENBQVQsRUFBWTtBQUMzQyxZQUFJekMsRUFBRXlDLEVBQUU2UCxNQUFKLEVBQVlwTyxPQUFaLENBQW9CK1UsS0FBcEIsRUFBMkJ0VyxNQUEvQixFQUF1QztBQUN2QzNDLFVBQUVpWixLQUFGLEVBQVMzVixXQUFULENBQXFCNFYsRUFBckI7QUFDQXpXLFVBQUVpRCxlQUFGO0FBQ0gsS0FKRDtBQUtIIiwiZmlsZSI6Im9uZXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcbmNvbnN0ICRtYWluID0gJCgnLm1haW4nKTtcbmNvbnN0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcblxuLyoqXHJcbiAqIEJhc2UuanNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBpc09wZXJhID0gISF3aW5kb3cub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgT1BSLycpID49IDA7XHJcblxyXG4gICAgdmFyIGlzQ2hyb21lID0gISF3aW5kb3cuY2hyb21lICYmICFpc09wZXJhO1xyXG5cclxuICAgIHZhciBpc0V4cGxvcmVyID1cclxuXHJcbiAgICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhIWRvY3VtZW50LmRvY3VtZW50TW9kZSAmJiAhaXNFZGdlO1xyXG5cclxuICAgIHZhciBpc0ZpcmVmb3ggPSB0eXBlb2Ygd2luZG93Lkluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgICB2YXIgaXNTYWZhcmkgPSAvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG5cclxuXHJcblxyXG4gICAgaWYgKGlzQ2hyb21lKSB7XHJcblxyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtY2hyb21lJyk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChpc1NhZmFyaSkge1xyXG5cclxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLXNhZmFyaScpO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoaXNGaXJlZm94KSB7XHJcblxyXG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtZmlyZWZveCcpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcbmNvbnN0IEJhc2UgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVByZWxvYWRlcigpO1xyXG4gICAgICAgIC8vIHRoaXMuYWNjb3JkZW9uKCk7XHJcbiAgICAgICAgLy8gdGhpcy5jaGVja2JveCgpO1xyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcbiAgICAgICAgdGhpcy5jb3B5VGV4dCgpO1xyXG4gICAgICAgIHRoaXMub3duZXJQaG9uZSgpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5jYXRhbG9nSXRlbVNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyU2VhcmNoQnRuKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuZHJvcGRvd24uaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuICAgICAgICB0aGlzLmlucHV0cy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmluaXQoKTtcclxuICAgICAgICB0aGlzLnBvcHVwLmluaXQoKTtcclxuICAgICAgICAvLyB0aGlzLmZvcm0uaW5pdCgpO1xyXG5cclxuICAgICAgICAvL0luaXQgbW9kdWxlc1xyXG4gICAgICAgIC8vIFRhYi5pbml0KCk7XHJcblxyXG4gICAgICAgIC8vIGxldCBzID0gbmV3IFNlbGVjdCgpO1xyXG4gICAgICAgIC8vIHMuaW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWVudS5jbGlja091c2lkZSgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1lbnUuc2VhcmNoQnRuT3BlbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcclxuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2Nyb2xsQmFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzU4NWE1OScsXHJcbiAgICAgICAgICAgICAgICAvLyBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzJweCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcbiAgICByZW1vdmVQcmVsb2FkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH0sXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuICAgIC8vIGNoZWNrYm94OiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgIC8vICAgICAgICAgaWYgKFxyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcbiAgICAvLyAgICAgICAgICkge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfSxcclxuICAgIC8vQ3VzdG9tIGFjY29yZGVvblxyXG4gICAgLy8gYWNjb3JkZW9uOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcbiAgICAvLyAgICAgaWYgKCRhY2NvcmRlb24ubGVuZ3RoKSB7XHJcbiAgICAvLyAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpLnNsaWRlVXAoKTtcclxuICAgIC8vICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIC8vQWNjb3JkZW9uIGNvbGxhcHNlXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItYWNjb3JkZW9uIC5iYi1hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oXHJcbiAgICAvLyAgICAgICAgIGVcclxuICAgIC8vICAgICApIHtcclxuICAgIC8vICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuICAgIC8vICAgICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuXHJcbiAgICAvLyAgICAgICAgIGlmICgkcGFyZW50LmRhdGEoJ2FjY29yZGVvbicpID09PSAnY29sbGFwc2UnKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfSxcclxuICAgIGxpc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0VG9nZ2xlKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSAkKCcuanMtbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrYm94ID0gbGlzdC5maW5kKCcuanMtYmItY2hlY2tib3gnKTtcclxuICAgICAgICAgICAgICAgIHZhciB3b3JrTGlzdCA9IGxpc3QuZmluZCgnLmpzLWxpc3QtdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tib3guaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGlzdFRvZ2dsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NvcHkgdGV4dCBjbGljayBsaW5rXHJcbiAgICBjb3B5VGV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNiID0gbmV3IENsaXBib2FyZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuICAgICAgICAvL2lmIGhhcyBpbnB1dCB0aGVuIGNvcHkgaW5wdXQgdmFsdWUgaW4gZGF0YSBhdHRyXHJcbiAgICAgICAgJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkaW5wdXRCb3ggPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ib3gnKTtcclxuICAgICAgICAgICAgbGV0ICRpbnB1dEljb24gPSAkaW5wdXRCb3guZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgPSAkaW5wdXRCb3guZmluZCgnLmpzLWlucHV0LS1jbGVhcicpO1xyXG4gICAgICAgICAgICBsZXQgJGhpbnQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuID0gJHBhcmVudC5maW5kKCcuanMtdXNlci1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5EYXRhID0gJCh0aGlzKS5kYXRhKCdjbGlwYm9hcmQtdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXRWYWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uYXR0cignZGF0YS1jbGlwYm9hcmQtdGV4dCcsICRidG5EYXRhICsgJGlucHV0VmFsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCcuanMtaW5wdXQtLWNsZWFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWlucHV0LS1jbGVhcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWlucHV0JylcclxuICAgICAgICAgICAgICAgIC52YWwoJycpO1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuZmFkZU91dCgpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X19pY29uJylcclxuICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9TaG93IHBob25lIG51bWJlclxyXG4gICAgb3duZXJQaG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXVzZXItcGhvbmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICdqYXZhc2NyaXB0OnZvaWQoMCk7JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KCQodGhpcykuZGF0YSgncGhvbmUtaGlkZW4nKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdXNlci1waG9uZS0tc2hvdycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgdXNlclBob25lID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXVzZXItcGhvbmUnKTtcclxuICAgICAgICAgICAgdmFyIHBob25lID0gdXNlclBob25lLmRhdGEoJ3Bob25lJyk7XHJcbiAgICAgICAgICAgIHVzZXJQaG9uZVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ3RlbDonICsgcGhvbmUpXHJcbiAgICAgICAgICAgICAgICAudGV4dChwaG9uZSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0NpdHkgc2VsZWN0XHJcbiAgICBjaGFuZ2VDaXR5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJGNoYW5nZUNpdHkgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuICAgICAgICBsZXQgJGNoYW5nZUNpdHlUaXRsZSA9ICRjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9fdGl0bGUgc3BhbicpO1xyXG4gICAgICAgIGxldCAkaW5wdXQgPSAkY2hhbmdlQ2l0eS5maW5kKCdpbnB1dCcpO1xyXG5cclxuICAgICAgICAkaW5wdXQub24oJ2NsaWNrIGZvY3VzJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGNoYW5nZUNpdHlUaXRsZS50ZXh0KCQodGhpcykudGV4dCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlcicpO1xyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHByZXZBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkbmV4dEFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICRwcmV2QXJyb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJG5leHRBcnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhdGFsb2cgSXRlbSBTbGlkZXJcclxuICAgIGNhdGFsb2dJdGVtU2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0ICRjYXRhbG9nSXRlbVNsaWRlciA9ICQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAkY2F0YWxvZ0l0ZW1TbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJylcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRhYjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWJiLXRhYicpLnRhYnMoKTtcclxuICAgIH0sXHJcbiAgICAvL01vYmlsZSBTZWFyY2ggQnRuIG9wZW4vY2xvc2VcclxuICAgIGhlYWRlclNlYXJjaEJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlYXJjaEJ0biA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLWJ0bicpO1xyXG4gICAgICAgIHNlYXJjaEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBidXR0b25zOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRXhwYW5kZWQoKTtcclxuICAgICAgICAgICAgdGhpcy5idG5Ib3ZlckFuaW1hdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5idG5TdGF0dXNBbmltYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuR29Ub3AoKTtcclxuICAgICAgICAgICAgdGhpcy5idG5Hb1RvKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRmxvYXRpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5idG5QdXNoKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG4gICAgICAgIGJ0bkV4cGFuZGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWRkUmVtb3ZlQ2xhc3MoJy5qcy1idG4tZXhwYW5kZWQnLCAnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBhbmltYXRlIG9uIGhvdmVyXHJcbiAgICAgICAgYnRuSG92ZXJBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiByZWxZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcmVsWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcbiAgICAgICAgYnRuU3RhdHVzQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGljayA9IDA7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgY2xpY2srKztcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2sgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9mbG9hdGluZyBidG4gYW5pbWF0aW5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuICAgICAgICAgICAgbGV0IHJ1biA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoISRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v0J7QsdGA0LDQsdC+0YLRh9C40Log0LTQvtCx0LDQstC70Y/QtdGCINC60LvQsNGB0YHRiyDQt9Cw0YLQtdC8INC+0YLQv9C40YHRi9Cy0LDRgtC10YHRjyDQvtGCINGB0L7QsdGL0YLQuNGPXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuLm9mZihcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8v0JDQvdC40LzQsNGG0LjRjyDQt9Cw0LrRgNGL0YLQuNGPXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVBbmltYXRpb24oZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJ1bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCAnLmpzLWJ0bi1mbG9hdGluZycsIGhlbmRsZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCd6LWluZGV4JywgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdvdmVybGF5LS1idG4tZmxvYXRpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnRuSWQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcubWQtaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5JZC50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYnRuLWZsb2F0aW5nIC5idG4tZmxvYXRpbmdfX2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlbW92ZUFuaW1hdGlvbigkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v0JrQu9C40Log0LIg0L3QtSDQutC90L7Qv9C60Lgg0YHQutGA0YvQstCw0LXRgiDQvtCy0LXRgNC70LXQuSDQuCDQutC90L7Qv9C60LhcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgdG91Y2hzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5vdmVybGF5LS1idG4tZmxvYXRpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ292ZXJsYXktLWJ0bi1mbG9hdGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gJHdpbmRvdy5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgc2Nyb2xsSGVpZ2h0ID0gJGRvY3VtZW50LmhlaWdodCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gJHdpbmRvdy5oZWlnaHQoKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoKHNjcm9sbEhlaWdodCAtIHNjcm9sbFBvc2l0aW9uKSAvIHNjcm9sbEhlaWdodCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICRidG4uZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAkYnRuLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0YHRgdGL0LvQutCwINC+0YLQutGA0YvQstCw0LXRgiDQvNC+0LTQsNC70LrRgywg0YLQviDQv9C+INC+0YLQutGA0YvRgtC40Y4g0LzQvtC00LDQu9C60Lgg0YHQutGA0YvQstCw0LXRgiDQutC90L7Qv9C60LhcclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0blB1c2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlU3VjY2VzcyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2Utc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VFcnJvciA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2UtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXM7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtc3RhdHVzJykgfHwgJ3N1Y2Nlc3MnO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIHRvcFxyXG4gICAgICAgIGJ0bkdvVG9wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIGVsZW1lbnRcclxuICAgICAgICBidG5Hb1RvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuICAgICAgICAgICAgJCgnLmpzLWdvdG8nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDYwICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5wdXRzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dE1hc2soKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ojk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb2RlLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1lbWFpbC1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazpcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyp7MSwyMH1bLip7MSwyMH1dWy4qezEsMjB9XVsuKnsxLDIwfV1AKnsxLDIwfVsuKnsyLDZ9XVsuKnsxLDJ9XScsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXN0ZWRWYWx1ZSA9IHBhc3RlZFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXN0ZWRWYWx1ZS5yZXBsYWNlKCdtYWlsdG86JywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEteiEjJCUmJyorLz0/Xl9ge3x9fi1dXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogJ2xvd2VyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGlucHV0IHNlbGVjdCB2YWx1ZVxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1pbnB1dCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VsZWN0OiB7XHJcbiAgICAgICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgdGFnczogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QuYmItc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGFkZFVzZXJQaWNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1zZXJ2aWNlcycpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiB0aW1lQW5kUHJpY2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9JY29uIG1lbnRybyBpbnNpZGUgc2VsZWN0XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1ldHJvLWljb24gbWV0cm8taWNvbi0tJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TZWxlY3QgQWRkIFByaWNlIFRpbWUgJiBQcmljZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0aW1lQW5kUHJpY2Uob3B0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxUaW1lID0gJChvcHQuZWxlbWVudCkuZGF0YSgndGltZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsUHJpY2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdwcmljZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0LnRleHQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVGltZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQcmljZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZVNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2VsZWN0SWNvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmJvcm5TZWxlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5pY29uU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1llYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlWWVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50cygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmF0aXZlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyICRzZWxlY3ROYXRpdmUgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuICAgICAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSBfdGhpcy5jbG9zZXN0KCcuYmItaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdGl0bGUgPSAkcGFyZW50LmZpbmQoJy5iYi1pbnB1dF9fdGl0bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpdGxlVGV4dCA9ICR0aXRsZS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSBfdGhpcy5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gX3RoaXMuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkbmV3T3B0aW9uID0gJCgnPG9wdGlvbj4nKS5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBlID0gJHBhcmVudC5kYXRhKCd0eXBlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlVGV4dCAhPT0gJycgfHwgdGl0bGVUZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRpdGxlVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyICE9PSAnJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXIgIT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHBsYWNlaG9sZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnYmItaW5wdXQtLXRyYW5zZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGZpcnN0T3B0aW9uLmlzKCc6ZW1wdHknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2VsZWN0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb24ucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtcGxhY2Vob2xkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmFkZFJlc2V0QnRuKF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9maXJzdE9wdGlvbiBub3QgZW1wdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbmV3T3B0aW9uLnByZXBlbmRUbyhfdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5hZGRSZXNldEJ0bihfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi5pcygnOmVtcHR5JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdkaXNhYmxlZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdoYXMtcGxhY2Vob2xkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdoYXMtcGxhY2Vob2xkZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hhcy1wbGFjZWhvbGRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSBfdGhpcy5maW5kKCdvcHRpb246Zmlyc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24uaXMoJzplbXB0eScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvbi5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53cmFwKCc8bGFiZWwgY2xhc3M9XCJiYi1zZWxlY3RcIj4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gc2VsZWN0SWNvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgIC8vVHJhbnNmb3JtIHNlbGVjdCBpbiBpY29uIHNlbGVjdFxyXG4gICAgICAgIC8vICAgICBsZXQgJHNlbGVjdCA9ICQoZG9jdW1lbnQpLmZpbmQoJy5qcy1zZWxlY3QtaWNvbicpO1xyXG4gICAgICAgIC8vICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaWNvbiA9ICQodGhpcykuZGF0YSgnc2VsZWN0LWljb24nKTtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBpY29uSHRtbCA9IGA8c3BhbiBjbGFzcz1cImJiLXNlbGVjdF9faWNvblwiPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXVzZXIgYmItc2VsZWN0X19pY29cIj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnIyR7aWNvbn1cIj48L3VzZT5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPmA7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgJGljb25IdG1sID0gJChpY29uSHRtbCk7XHJcbiAgICAgICAgLy8gICAgICAgICAkaWNvbkh0bWwucHJlcGVuZFRvKCQodGhpcykpO1xyXG4gICAgICAgIC8vICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYmItc2VsZWN0LS1pY29uJyk7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgZXZlbnRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdmb2N1cycsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpY29uU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRpY29uU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWljb24nKTtcclxuXHJcbiAgICAgICAgICAgICRpY29uU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9JY29uIGZvbnRhd2Vzb21lIGluc2lkZSBzZWxlY3RcclxuICAgICAgICAgICAgZnVuY3Rpb24gaWZvcm1hdChpY29uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxPcHRpb24gPSBpY29uLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4+PGkgY2xhc3M9XCJzZWxlY3QyX19pY29uJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQob3JpZ2luYWxPcHRpb24pLmRhdGEoJ2ljb24nKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj48L2k+ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uLnRleHQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbG9yU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRjb2xvclNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgJGNvbG9yU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLnNlbGVjdC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzZWFyY2gtZW5hYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaUJhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaUJhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29sb3IgYmFsbCBpbnNpZGUgc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpQmFsbChjb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkb3JpZ2luYWxPcHRpb24gPSBjb2xvci5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvckJhbGwgPSAkKCRvcmlnaW5hbE9wdGlvbikuZGF0YSgnY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yLnRleHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19saW5lXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH1cIj48L3NwYW4+PHA+ICR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IudGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA8L3A+PC9kaXY+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19iYWxsXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH0gXCI+IDwvc3Bhbj4gPC9kaXY+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBib3JuU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRib3JuU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtYm9ybicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRib3JuU2VsZWN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvcm5TZWxlY3Quc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkYm9yblNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LS1ib3JuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtYm9ybl9fc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciA9ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9ICQodGhpcykuZmluZCgnb3B0aW9uOmZpcnN0LWNoaWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnYmItaW5wdXQtLXRyYW5zZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dC1ib3JuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLWlucHV0LWJvcm4tLXRyYW5zZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmZpbmQoJy5iYi1pbnB1dF9fdGl0bGUnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChwbGFjZWhvbGRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgQmFzZS5zZWxlY3QuYWRkUmVzZXRCdG4oJGJvcm5TZWxlY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93WWVhcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXNldC15ZWFyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNob3coKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlWWVhcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkeWVhclNlbGVjdCA9ICQoJy5qcy1zZWxlY3QtYm9ybi0tY2xlYXInKTtcclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0XHJcbiAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdzZWxlY3QyOm9wZW5pbmcnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6dW5zZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vZmYoJ3NlbGVjdDI6b3BlbmluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKCkgPT0gJycgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJvcm4nKSA9PT0gJ3llYXInXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRSZXNldEJ0bjogZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSBlbDtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkc2VsZWN0LmNsb3Nlc3QoJy5iYi1pbnB1dCcpO1xyXG4gICAgICAgICAgICBsZXQgcmVzZXRCdG4gPVxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYmItc2VsZWN0X19yZXNldCBqcy1zZWxlY3QtLXJlc2V0XCI+PGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBsZXQgJG5ld09wdGlvbiA9ICQoJzxvcHRpb24+JykuYXR0cih7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogJ2Rpc2FibGVkJyxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAnc2VsZWN0ZWQnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQocmVzZXRCdG4pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFwcGVuZChyZXNldEJ0bik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5qcy1zZWxlY3QtLXJlc2V0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5zaWJsaW5ncygnLmpzLXNlbGVjdC1ib3JuJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdCA9ICQodGhpcykuc2libGluZ3MoJy5qcy1zZWxlY3QtYm9ybicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC1ib3JuX19zZWxlY3QnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdCA9ICQodGhpcykuc2libGluZ3MoJy5qcy1zZWxlY3QtbmF0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LS10cmFuc2Zvcm0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJG5ld09wdGlvbi5wcmVwZW5kVG8oJHNlbGVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNlbGVjdC52YWwoJHBhcmVudC5maW5kKCdvcHRpb246Zmlyc3QtY2hpbGQnKS52YWwoKSkuYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdiYi1pbnB1dC1ib3JuX19zZWxlY3QtLXllYXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQubmV4dCgnLmJiLWlucHV0LWJvcm5fX2J0bicpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHNlbGVjdCByZXN1bHRzIHRvIG9wdGlvbiB2YWx1ZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlU2VsZWN0aW9uKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGNpdHkgbmFtZSB0byBvcHRpb25cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVJlc3VsdChvcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0VmFsICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCAkcGhvbmVDb2RlQm94ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dC1waG9uZS1jb2RlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHBob25lQ29kZUJveC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICRwaG9uZUNvZGVCb3guZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnNlbGVjdC12YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzKS5maW5kKCcuYmItaW5wdXRfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPj0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogc2VsZWN0Q29kZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogc2VsZWN0Q29kZVNlbGVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmItaW5wdXQtLXNlbGVjdC12YWx1ZVwiPjwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uU2VsZWN0ID0gJHBhcmVudC5maW5kKCdvcHRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdFZhbHVlID0gJHBhcmVudC5maW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5iYi1pbnB1dC0tc2VsZWN0LXZhbHVlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoMCkudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9ICQodGhpcylbMF0uc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKGNvdW50ZXIpLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogJyg5OTkpIDk5OS05OS05OSdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdmb2N1cycsIGFkZEZvY3VzKS5vbignYmx1cicsIHJlbW92ZUZvY3VzKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpjbG9zZScsIHJlbW92ZUZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtbW92ZS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19yZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkaXRlbSA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19yZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb3ZlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkbmFtZSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyX19uYW1lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlcnZpY2UgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuaXRlbS1pbmZvX190aXRsZSBzcGFuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcgKyAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLnZhbCgkbmFtZSB8fCAkc2VydmljZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5iYi1pbnB1dC0tdHJhbnNmb3JtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb3ZlLXNlbGVjdF9fcmVzdWx0JyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBvcHVwOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9wdXBGYW5jeUJveCgpO1xyXG4gICAgICAgICAgICB0aGlzLndob0lzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9ybVRpdGxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVpbml0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL01vZGFsIEZhbmN5Qm94IDMgaHR0cHM6Ly9mYW5jeWFwcHMuY29tL2ZhbmN5Ym94LzMvXHJcbiAgICAgICAgcG9wdXBGYW5jeUJveDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94XScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VzXCJdJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlXCJdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2ZhbmN5Ym94LWNvbnRhaW5lci0taW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrQ29udGVudDogJ2Nsb3NlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tTbGlkZTogJ2Nsb3NlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc21hbGxCdG46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tY2xvc2VdJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNtYWxsQnRuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vRm9ybSBXaG8gSXM/XHJcbiAgICAgICAgd2hvSXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtd2hvaXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3aG9pcyA9ICQodGhpcykuZGF0YSgnd2hvaXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gJCgnI2F1dGgtZm9ybScpLmZpbmQoJy5mb3JtJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2hvaXMgPT09ICdtYXN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtbWFzdGVyJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdob2lzID09PSAnc3R1ZGlvJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLXN0dWRpbycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1jbGllbnQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL0R1bmFtaWNseSBjaGFuZ2UgZm9ybSB0aXRsZVxyXG4gICAgICAgIGNoYW5nZUZvcm1UaXRsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAnLmpzLWZvcm0tdGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5jb2xvclNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZm9ybToge1xyXG4gICAgICAgIC8vIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNoZWNrVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIC8vIH0sXHJcblxyXG4gICAgICAgIGNoZWNrVmFsaWRhdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJCgnLmZvcm0tc3VjY2Vzc19fcm9sZScpO1xyXG4gICAgICAgICAgICBsZXQgJGZvcm1TdWNjZXNzID0gJCgnLmZvcm0tc3VjY2Vzc19fcm9sZXMnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd6LWluZGV4JywgJzIwMCcpO1xyXG5cclxuICAgICAgICAgICAgJGJ0bi5ub3QoJCh0aGlzKSkuYWRkQ2xhc3MoJ21vdmUtb3V0Jyk7XHJcbiAgICAgICAgICAgICRmb3JtU3VjY2Vzcy5hZGRDbGFzcygnaXMtZXJyb3InKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5ub3QoJCh0aGlzKSkuaGlkZSgpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IE1lbnUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0IG1lbnUgPSB7fTtcclxuXHJcbiAgICBsZXQgJHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xyXG5cclxuICAgIGxldCAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xyXG5cclxuICAgIGxldCAkb3ZlcmxheSA9ICQoJy5vdmVybGF5Jyk7XHJcblxyXG4gICAgbGV0ICRtZW51ID0gJCgnLmpzLW1lbnUnKTtcclxuXHJcbiAgICBsZXQgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuXHJcbiAgICBsZXQgJGhhbWJ1cmdlckNybSA9ICQoJy5qcy1oYW1idXJnZXInKTtcclxuXHJcbiAgICBsZXQgJG1lbnVJdGVtID0gJCgnLmpzLW1lbnUgLm1lbnVfX2l0ZW0nKTtcclxuXHJcbiAgICBsZXQgJG1lbnVPdmVsYXkgPSAkKCcuanMtbWVudS1vdmVybGF5Jyk7XHJcblxyXG4gICAgbGV0ICRtZW51SXRlbURyb3Bkb3duID0gJChkb2N1bWVudCkuZmluZCgnLmpzLW1lbnUtaXRlbS1kcm9wZG93bicpO1xyXG5cclxuICAgIGxldCAkYnRuRmxvYXQgPSAkKGRvY3VtZW50KS5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgbGV0IGFjdGl2ZUNsYXNzID0gJ2lzLWFjdGl2ZSc7XHJcblxyXG4gICAgbGV0IGRyb3Bkb3duQWN0aXZlQ2xhc3MgPSAnbWVudS1kcm9wZG93bi0tb3Blbic7XHJcblxyXG5cclxuXHJcbiAgICBtZW51LmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tZW51SXRlbURyb3Bkb3duRXZlbnQoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgbWVudS5ldmVudHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb24nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIG1lbnUuX2Nsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIG1lbnUuX29wZW4oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRoYW1idXJnZXJDcm0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVudS5fb3BlbigpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkbWVudUl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0L3QtdGCINCy0LvQvtC20LXQvdC90L7Qs9C+INC80LXQvdGOXHJcblxyXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2pzLW1lbnUtaXRlbS1kcm9wZG93bicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG1lbnVJdGVtLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9CV0YHQu9C4INC10YHRgtGMINCy0LvQvtC20LXQvdC90L7QtSDQvNC10L3RjlxyXG5cclxuICAgICAgICAgICAgICAgIC8v0JXRgdC70Lgg0YLQsNGA0LPQtdGCINGB0YHRi9C70LrQsCDQvdC+INC90LUg0LrQvdC+0LrQsCDQntGC0LzQtdC90LjRgtGMXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0Lmhhc0NsYXNzKCdtZW51LWRyb3Bkb3duX19saW5rJykgJiZcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgISR0YXJnZXQuaGFzQ2xhc3MoJ21lbnUtZHJvcGRvd25fX2xpbmstLWFib3J0JylcclxuXHJcbiAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkdGFyZ2V0LnBhcmVudCgnLm1lbnUtZHJvcGRvd25fX2l0ZW0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL9Cf0LXRgNC10LrQu9GO0YfQsNC10Lwg0LDQutGC0LjQstC90YvQuSDQutC70LDRgdGBINGDINCz0LvQsNCy0L3QvtC5INGB0YHRi9C70LrQuCDQvNC10L3RjiDQuCDQvtGC0LrRgNGL0LLQsNC10Lwg0LLQu9C+0LbQtdC90L3QvtC1INC80LXQvdGOXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRtZW51SXRlbS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL9Cf0LXRgNC10LrQu9GO0YfQsNC10Lwg0LDQutGC0LjQstC90YvQuSDQutC70LDRgdGBINGDINCy0LvQvtC20LXQvdC90YvRhSBsaVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcubWVudS1kcm9wZG93bl9faXRlbScpLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9Ch0LTQstC40LPQsNC10Lwg0LrQvtC90YLQtdC90YJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtZW51LW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUuX2Nsb3NlKGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL9CV0YHQu9C4INGC0LDRgNCz0LXRgiDQutC90L7QutCwINCe0YLQvNC10L3QuNGC0Ywg0L/RgNC+0YHRgtC+INC30LDQutGA0YvQstCw0LXQvCDQvNC10L3RjlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0Lmhhc0NsYXNzKCdtZW51LWRyb3Bkb3duX19saW5rJykgJiZcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5oYXNDbGFzcygnbWVudS1kcm9wZG93bl9fbGluay0tYWJvcnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL9CV0YHQu9C4INGC0LDRgNCz0LXRgiDQndCVINGB0YHRi9C70LrQsCwg0L/RgNC+0LLQtdGA0Y/QtdC8INC90LAg0L3QsNC70LjRh9C40LUg0LDQutGC0LjQstC90L7Qs9C+INC60LvQsNGB0YHQsCDRgyDQtNGA0L7Qv9C00LDRg9C90LBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtZW51LW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0LmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKCcuanMtbW9iaWxlLW5hdi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/QmNCy0LXQvdGCINC60LvQuNC60LAg0L/QviDQsNCw0LrQvtC00LXQvtC90YMg0LLQvdGD0YLRgNC4INC80LXQvdGOXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLmpzLW1vYmlsZS1uYXYnKVxyXG5cclxuICAgICAgICAgICAgLmZpbmQoJy5tb2JpbGUtbmF2X19pdGVtJylcclxuXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdiYi1hY2NvcmRlb25fX2l0ZW0nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmVuZCgpXHJcblxyXG4gICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCBhJylcclxuXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL9CX0LDQutGA0LLQsNC10Lwg0LzQtdC90Y4g0L/QviDQutC70Y7QutGDINC90LAg0L7QstC10YDQu9GN0LlcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5vdmVybGF5LS1tZW51JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgbWVudS5fY2xvc2UoZSk7XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL9CX0LDQutGA0LLQsNC10Lwg0LzQtdC90Y4g0L/QviDQutC70Y7QutGDINC90LAg0L7QstC10YDQu9GN0LlcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1tZW51LW92ZXJsYXknLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBtZW51Ll9jbG9zZShlKTtcclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoJy5qcy1tZW51IC5tZW51X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgbWVudS5tZW51SXRlbURyb3Bkb3duRXZlbnQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1tZW51LWl0ZW0tZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICRtZW51SXRlbURyb3Bkb3duLnJlbW92ZUNsYXNzKGRyb3Bkb3duQWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoZHJvcGRvd25BY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLW1lbnUtaXRlbS1kcm9wZG93biAubWVudV9fbGluaycsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgZVxyXG5cclxuICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIG1lbnUuX29wZW4gPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICghJChkb2N1bWVudCkuZmluZCgnLmpzQ3JtQmx1ckV2ZW50U3RvcCcpKSB7XHJcblxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmJsdXIoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlckNybS5hZGRDbGFzcygnb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLWNhYmluZXQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICRtZW51LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnaXMtbW92aW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICRtZW51SXRlbURyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpLmFkZENsYXNzKCdvdmVybGF5LS1tZW51Jyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAkaGFtYnVyZ2VyLmFkZENsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJykuYWRkQ2xhc3MoJ292ZXJsYXktLW1lbnUnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1vbmVwYWdlJykpIHtcclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXIuYWRkQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKS5hZGRDbGFzcygnb3ZlcmxheS0tbWVudScpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIG1lbnUuX2Nsb3NlID0gZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAkaGFtYnVyZ2VyLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAkaGFtYnVyZ2VyQ3JtLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcyhkcm9wZG93bkFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgJGJ0bkZsb2F0LmZhZGVJbigpO1xyXG5cclxuICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0LmlzKCcuanMtaGFtYnVyZ2VyJykgfHwgdGFyZ2V0LmlzKCcuanMtbWVudS1pdGVtLWRyb3Bkb3duJykpIHtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgfSwgMjAwKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA0ODApIHtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICRtZW51T3ZlbGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHJldHVybiBtZW51O1xyXG5cclxufSkoKTtcclxuXHJcblxyXG5jb25zdCBEcm9wZG93biA9IChmdW5jdGlvbigpIHtcclxuICAgIGxldCAkb3ZlcmxheSA9ICQoJy5vdmVybGF5Jyk7XHJcblxyXG4gICAgbGV0IGRyb3Bkb3duID0ge307XHJcbiAgICBsZXQgJGRyb3Bkb3duID0gJChkb2N1bWVudCkuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcbiAgICBsZXQgJGJ0bkRyb3Bkb3duQ2xvc2UgPSAkKFxyXG4gICAgICAgICc8aSBjbGFzcz1cImZhbCBmYS10aW1lcyBqcy1iYi1kcm9wZG93bi0tY2xvc2VcIj48L2k+J1xyXG4gICAgKTtcclxuICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkKGRvY3VtZW50KS5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcbiAgICBsZXQgX3RoaXMsICRsaXN0O1xyXG4gICAgbGV0IHJ1biA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBzdHlsZVRyYW5zZm9ybSA9IHtcclxuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICB0b3A6ICdhdXRvJyxcclxuICAgICAgICBib3R0b206IDEwLFxyXG4gICAgICAgIGxlZnQ6IDEwLFxyXG4gICAgICAgIHJpZ2h0OiAxMCxcclxuICAgICAgICB6SW5kZXg6IDk5OTlcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgIHRvcDogNjAsXHJcbiAgICAgICAgbGVmdDogMTAsXHJcbiAgICAgICAgcmlnaHQ6IDEwLFxyXG4gICAgICAgIHpJbmRleDogOTk5OVxyXG4gICAgfTtcclxuXHJcbiAgICBkcm9wZG93bi5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdiYi1kcm9wZG93bi0taG92ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcm9wZG93bi5yZW5kZXIoKTtcclxuICAgICAgICAgICAgZHJvcGRvd24uZXZlbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkcm9wZG93bi5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkKGRvY3VtZW50KS5maW5kKFxyXG4gICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93bi5iYi1kcm9wZG93bi0tdHJhbnNmb3JtJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25PdmVybGF5ID0gJCgnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSAkKHRoaXMpLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5hcHBlbmRUbygkZHJvcGRvd25MaXN0KTtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LmZpbmQoJy5pbmZvLWJsb2NrX19pY29uJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZHJvcGRvd24uZXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAkbGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uX3RvZ2dsZSgkKHRoaXMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYmItZHJvcGRvd24tLWFub3RoZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxpc3QuaW5zZXJ0QWZ0ZXIoJy53cmFwcGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbGlzdC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRvdmVybGF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtdmlzaWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnb3ZlcmxheS0tZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS10cmFuc2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbGlzdC5jc3Moc3R5bGVUcmFuc2Zvcm0pLmFkZENsYXNzKCdfdHJhbnNmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkRyb3Bkb3duQ2xvc2UucHJlcGVuZFRvKCRsaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGxpc3QuY3NzKHN0eWxlKS5hZGRDbGFzcygnX3RyYW5zZm9ybV9pbmZvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi5fdG9nZ2xlKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1RvZ2dsZSBmaXhyZCBjbGFzcyBmcm9tIGJvZHlcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJiLWRyb3Bkb3duLnJlcXVlc3QtaW5mbycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ0RST1BET1dOIENMT1NFJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcub3ZlcmxheS0tZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgZHJvcGRvd24uX2Nsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAgICAgICAnY2xpY2sgdG91Y2hzdGFydCcsXHJcbiAgICAgICAgICAgICcuYmItZHJvcGRvd25fX2xpc3QgLmluZm8tYmxvY2tfX2l0ZW0nLFxyXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bi5fY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLl9jbG9zZSgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBkcm9wZG93bi5fdG9nZ2xlID0gZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICBpZiAoZWwuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGVsLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbC5oYXNDbGFzcygnYmItZHJvcGRvd24tLXRyYW5zZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkcm9wZG93bi5fY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgJGxpc3QucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcbiAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICRsaXN0XHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdfdHJhbnNmb3JtJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnX3RyYW5zZm9ybV9pbmZvJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhfdGhpcyk7XHJcbiAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJykucmVtb3ZlQ2xhc3MoJ292ZXJsYXktLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRyb3Bkb3duO1xyXG59KSgpO1xyXG5cclxuLy9QdXNoVXBcclxuZnVuY3Rpb24gcHVzaFVwKG9wdGlvbnMpIHtcclxuICAgIHZhciB0ZXh0ID0gb3B0aW9ucy50ZXh0IHx8ICfQktCw0Lwg0L3QvtCy0LDRjyDQt9Cw0Y/QstC60LAnO1xyXG4gICAgdmFyIHN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICB2YXIgJHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdwdXNoLXVwIHB1c2gtdXAtLWNlbnRlcicpO1xyXG4gICAgdmFyICRwdXNoSWNvblN1Y2Nlc3MgPSAkKFxyXG4gICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXHJcbiAgICAgICAgd2lkdGg9XCI2MTEuOTk0cHhcIiBoZWlnaHQ9XCI2MTEuOTk0cHhcIiB2aWV3Qm94PVwiMCAwIDYxMS45OTQgNjExLjk5NFwiXHJcbiAgICAgICAgeG1sOnNwYWNlPVwicHJlc2VydmVcIiBjbGFzcz1cInB1c2gtdXBfX2ljb25cIj5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0yNDguMTcyLDQyMy45MThsLTg5LjU0NS04OS41MzRjLTUuNjM3LTUuNjM3LTUuNjM3LTE0Ljc3OCwwLTIwLjQxNmM1LjY0My01LjY0NCwxNC43OC01LjY0NCwyMC40MTcsMGw2OS4xMjgsNjkuMTIyXHJcbiAgICAgICAgICAgICAgICBsMTg0Ljc5Ni0xODQuODAyYzUuNjQ0LTUuNjQzLDE0Ljc4LTUuNjQzLDIwLjQxNywwYzUuNjQ0LDUuNjM3LDUuNjQ0LDE0Ljc4LDAsMjAuNDE3TDI0OC4xNzIsNDIzLjkxOHpcIi8+XHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMwNi4wMzEsNjExLjk5NHYtMTQuNDM4bC0wLjAyMiwxNC40MzhDMTM3LjI4Niw2MTEuOTk0LDAuMDEyLDQ3NC43MjYsMCwzMDYuMDAzQzAsMTM3LjI3NCwxMzcuMjc0LDAsMzA1Ljk5NywwXHJcbiAgICAgICAgICAgICAgICAgICAgYzE2OC43MjksMCwzMDUuOTk3LDEzNy4yNzQsMzA1Ljk5NywzMDUuOTk3QzYxMiw0NzQuNzI2LDQ3NC43NDMsNjExLjk5NCwzMDYuMDMxLDYxMS45OTR6IE0zMDUuOTk3LDI4Ljg3OFxyXG4gICAgICAgICAgICAgICAgICAgIGMtMTUyLjgwNSwwLTI3Ny4xMTksMTI0LjMxNC0yNzcuMTE5LDI3Ny4xMTlDMjguODksNDU4Ljc5NiwxNTMuMjA5LDU4My4xMSwzMDYuMDA5LDU4My4xMWgwLjAyMlxyXG4gICAgICAgICAgICAgICAgICAgIGMxNTIuNzg4LDAsMjc3LjA5MS0xMjQuMzE0LDI3Ny4wOTEtMjc3LjExM0M1ODMuMTIyLDE1My4xOTIsNDU4LjgwMiwyOC44NzgsMzA1Ljk5NywyOC44Nzh6XCIvPlxyXG4gICAgICAgIDwvc3ZnPmBcclxuICAgICk7XHJcblxyXG4gICAgdmFyICRwdXNoSWNvbkVycm9yID0gJChcclxuICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxyXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDc4LjU2MSA3OC41NjFcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiIGNsYXNzPVwicHVzaC11cF9faWNvblwiPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMzkuMjhcIiBjeT1cIjU3Ljc3MlwiIHI9XCIzLjYzMlwiLz5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0zOC43OTIsNDguMzQ3YzEuMTA0LDAsMi0wLjg5NiwyLTJ2LTE5YzAtMS4xMDQtMC44OTYtMi0yLTJzLTIsMC44OTYtMiwydjE5QzM2Ljc5Miw0Ny40NTEsMzcuNjg4LDQ4LjM0NywzOC43OTIsNDguMzQ3elxyXG4gICAgICAgICAgICAgICAgXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTQ2LjU3LDExLjU0MmwtMC4wOTEtMC4xNDFjLTEuODUyLTIuODU0LTMuNzY2LTUuODA2LTcuMTk5LTUuODA2Yy0zLjU3OCwwLTUuNDUsMi45OTQtNy4yNiw1Ljg5MVxyXG4gICAgICAgICAgICAgICAgYy0wLjAwOSwwLjAxNC0wLjA2NSwwLjEwNC0wLjA3NCwwLjExOUwwLjI3OCw2NS4yNjZDMC4wOTYsNjUuNTc0LDAsNjUuNzM1LDAsNjYuMDkyYzAsMy44OTYsMy4xMzUsNi44NzQsNi45ODgsNi44NzRoNjQuNTg1XHJcbiAgICAgICAgICAgICAgICBjMy44NTQsMCw2Ljk4OC0yLjk3OSw2Ljk4OC02Ljg3NGMwLTAuMzU3LTAuMDk2LTAuNjE0LTAuMjc3LTAuOTIxTDQ2LjU3LDExLjU0MnogTTcxLjU3Myw2OC45NjZINi45ODhcclxuICAgICAgICAgICAgICAgIGMtMS40NjEsMC0yLjcxNy0wLjk1MS0yLjk1LTIuMzk0bDMxLjM3NC01My4wNjFjMS41NTQtMi40ODcsMi41NzItMy45NjMsMy44NjgtMy45NjNjMS4yNjEsMCwyLjQ1NywxLjg3LDMuODQzLDQuMDA2XHJcbiAgICAgICAgICAgICAgICBsMzEuMzk5LDUzLjAwN0M3NC4yOSw2OC4wMDMsNzMuMDM0LDY4Ljk2Niw3MS41NzMsNjguOTY2elwiLz5cclxuICAgICAgICA8L3N2Zz5cclxuYFxyXG4gICAgKTtcclxuXHJcbiAgICAkcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgJHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuXHJcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgJHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWVycm9yJyk7XHJcbiAgICAgICAgJHB1c2hJY29uRXJyb3IucHJlcGVuZFRvKCRwdXNoQ29udGFpbmVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLXN1Y2Nlc3MnKTtcclxuICAgICAgICAkcHVzaEljb25TdWNjZXNzLnByZXBlbmRUbygkcHVzaENvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAkcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAkcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2gtdXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5wdXNoLXVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLnB1c2gtdXAnKS5lYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGhlaWdodCA9ICQoJy5wdXNoLXVwJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCBoZWlnaHQgKiBlICsgMTAgKyBlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKEJhc2UuaW5pdCgpKTtcclxuICAgIE1lbnUuaW5pdCgpO1xyXG4gICAgRHJvcGRvd24uaW5pdCgpO1xyXG5cclxuICAgIChmdW5jdGlvbiBDaGVja2JveCgpIHtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIFxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkYWNjb3JkZW9uID0gJCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG4gICAgICAgIGxldCAkY29udGVudCA9ICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpO1xyXG4gICAgICAgIGxldCAkaXRlbSA9ICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKCRhY2NvcmRlb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRjb250ZW50LnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgJGl0ZW0uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgJy5qcy1iYi1hY2NvcmRlb24gLmJiLWFjY29yZGVvbl9fdGl0bGUnLFxyXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pKCk7XHJcbiAgICBcclxufSk7XHJcblxuLyoqXHJcbiAqIENhcmRcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IGNhcmQgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJkLnNsaWRlcigpO1xyXG4gICAgICAgIGNhcmQuY2FyZFNjcm9sbHNweSgpO1xyXG4gICAgICAgIGNhcmQuY2FyZFN0aWNreSgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZFJlcXVlc3RUb2dnbGUoKTtcclxuICAgICAgICAgICAgY2FyZC5jYXJkUmVxdWVzdEJsb2NrTW92ZUl0ZW1zKCk7XHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGNhcmQuY2FyZFJlcXVlc3RCbG9ja01vdmVJdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTbGlkZXJcclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXNsaWRlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgJGNhcmRTbGlkZXIgPSAkKCcuanMtY2FyZC1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgICAgICRjYXJkU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgcmVxdWVzdCBzaG93IC8gaGlkZVxyXG4gICAgY2FyZFJlcXVlc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYXJkSW5mb1JlcXVlc3QgPSAkKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrcyB3aGVuIHdpbmRvdyB3aWR0aCA8IDc2OFxyXG4gICAgY2FyZFJlcXVlc3RCbG9ja01vdmVJdGVtczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtdGl0bGUnKS5pbnNlcnRBZnRlcignLmNhcmQtZ2FsbGFyeV9fd3JhcCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWFib3V0JykuaW5zZXJ0QmVmb3JlKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuY2FyZC1pbmZvX19pbm5lcicpLmluc2VydEFmdGVyKCcuY2FyZC1hZHJlc3MnKTtcclxuXHJcbiAgICAgICAgJCgnLmNhcmQtaW5mb19fcmVxdWVzdCcpLndyYXBJbm5lcihcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWluZm9fX3JlcXVlc3RfaW5uZXJcIj4nXHJcbiAgICAgICAgKTtcclxuICAgICAgICAkKCcuY2FyZC1pbmZvX19oZWFkZXItLW1vYmlsZScpLmluc2VydEJlZm9yZShcclxuICAgICAgICAgICAgJy5jYXJkLWluZm9fX3JlcXVlc3RfaW5uZXInXHJcbiAgICAgICAgKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1pbmZvLWNhdGVnb3J5JykucHJlcGVuZFRvKCcuY2FyZC1pbmZvX19yZXF1ZXN0X2lubmVyJyk7XHJcbiAgICAgICAgJCgnLmpzLW1vdmUtY2FyZC1wb2xpY3knKS5hcHBlbmRUbygnLmNhcmQtcmVxdWVzdC1mb3JtJyk7XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNjcm9sbHNweVxyXG4gICAgY2FyZFNjcm9sbHNweTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1zY3JvbGxzcHknKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2Nyb2xsc3B5Jykuc2Nyb2xsc3B5KHsgb2Zmc2V0OiAtMTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2Nyb2xsc3B5Jykuc2Nyb2xsc3B5KHsgb2Zmc2V0OiAtNjAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYXJkU3RpY2t5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc3RpY2t5JykubGVuZ3RoICYmICQoJy5qcy1jYXJkLWZpeGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9jayA9ICQoJy5qcy1jYXJkLXN0aWNreScpO1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2tPZmZzZXQgPSBzdGlja3lCbG9jay5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrID0gJCgnLmpzLWNhcmQtZml4ZWQnKTtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2tPZmZzZXQgPSBmaXhlZEJsb2NrLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkQ29udGVudCA9ICQoJy5qcy1jYXJkLWNvbnRlbnQtZml4ZWQnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudSA9ICQoJy5qcy1jYXJkLW1lbnUnKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51Q2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiY2FyZC1tZW51X19jbG9uZVwiPicpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAkKCcuanMtY2FyZC1tZW51Jykub3V0ZXJIZWlnaHQodHJ1ZSkpXHJcbiAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoY2FyZE1lbnUpXHJcbiAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVPZmZzZXQgPSBjYXJkTWVudS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmhlaWdodCgpIDwgY2FyZENvbnRlbnQuaGVpZ2h0KCkgJiZcclxuICAgICAgICAgICAgICAgICQod2luZG93KS53aWR0aCgpID4gNzY4XHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZml4Q2FyZFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpeENhcmRVc2VySW5mbygpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogLTEgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3NSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KCkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3NSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNhcmRNZW51Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2FyZE1lbnVGaXhlZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjYXJkTWVudUZpeGVkKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+PSBjYXJkTWVudU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogOTlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudS5yZW1vdmVBdHRyKCdzdHlsZScpLnJlbW92ZUNsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cbi8qKlxuICogT25lcGFnZVxuICpcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XG4gKi9cbmNvbnN0IE9uZXBhZ2UgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1vbmVwYWdlJykpIHtcbiAgICAgICAgICAgIE9uZXBhZ2UuaGVyb0FuaW1hdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XG4gICAgICAgIHRoaXMubW9iaWxlU2xpZGVyKCk7XG4gICAgICAgIHRoaXMuY291bnRlclNwaW4oKTtcbiAgICAgICAgdGhpcy5wbGF5VmlkZW8oKTtcbiAgICAgICAgdGhpcy5tb2NrdXBWaWRlbygpO1xuICAgICAgICB0aGlzLnNldEhlaWdodCgpO1xuXG4gICAgICAgIHRoaXMucHJvbW8uaW5pdCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5pbml0KCk7XG4gICAgICAgIHRoaXMuaWNvbi5pbml0KCk7XG4gICAgfSxcbiAgICBoZXJvQW5pbWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHRsLmZyb21UbygnLmhlcm8nLCAxLCB7IHk6IC0zMDAsIG9wYWNpdHk6IDAgfSwgeyB5OiAwLCBvcGFjaXR5OiAxIH0pXG4gICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICcuaGVyb19fdGl0bGUnLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAnLT0uMydcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5oZXJvX19zdWJ0aXRsZScsXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPS43J1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3dpZGdldCcsXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICB7IHk6IDcwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgJy09LjUnXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICcuc29jaWFsJyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogNTAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAnLT0wLjYnXG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtb25lcGFnZS1zbGlkZXInKTtcbiAgICAgICAgbGV0ICRmdWxsc2NyZWVuU2xpZGVyID0gJCgnLmpzLWZ1bGxzY3JlZW4tc2xpZGVyJyk7XG4gICAgICAgIGxldCAkc2xpZGVyVmlkZW8gPSAkZnVsbHNjcmVlblNsaWRlci5maW5kKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogODE1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRmdWxsc2NyZWVuU2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgJGZ1bGxzY3JlZW5TbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLnNsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGUuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR2aWRlbyA9ICQodGhpcykuZmluZCgndmlkZW8nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2xpY2stYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkdmlkZW8ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHZpZGVvLnRyaWdnZXIoJ3BsYXknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHZpZGVvID0gJCh0aGlzKS5maW5kKCd2aWRlbycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzbGljay1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCR2aWRlby5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdmlkZW8udHJpZ2dlcigncGF1c2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vYmlsZVNsaWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKGRvY3VtZW50KS53aWR0aCgpIDwgODE1KSB7XG4gICAgICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1vbmVwYWdlLXNsaWRlci0tbW9iaWxlJyk7XG5cbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvdW50ZXJTcGluOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHNjcm9sbGVkID0gZmFsc2U7XG5cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc2Nyb2xsZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lciA9ICQoJy5qcy1jb3VudGVyLS13cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ZXJDb250YWluZXJPZmZzZXQgPSBjb3VudGVyQ29udGFpbmVyLmRhdGEoJ29mZnNldCcpO1xuICAgICAgICAgICAgICAgIGxldCBzY3JlZW4gPSBjb3VudGVyQ29udGFpbmVyLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JlZW4gLSBjb3VudGVyQ29udGFpbmVyT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc3BpbiA9ICQoJy5qcy1jb3VudGVyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICRzcGluLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFuaW1hdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb3VudGVyOiAkKHRoaXMpLnRleHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiAnc3dpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbihub3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudGV4dChNYXRoLmNlaWwobm93KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcGxheVZpZGVvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmpzLXZpZGVvJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzcmMgPSAkKHRoaXMpLmRhdGEoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSAkKCc8aWZyYW1lPicpO1xuICAgICAgICAgICAgbGV0ICRidG4gPSAkKHRoaXMpLmZpbmQoJy52aWRlb19fYnRuJyk7XG5cbiAgICAgICAgICAgICRidG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgIGZyYW1lXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdzcmMnLCBzcmMgKyAnP2F1dG9wbGF5PTEmYXV0b2hpZGU9MScpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkKHRoaXMpLnBhcmVudCgnLmpzLXZpZGVvJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgbW9ja3VwVmlkZW86IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHZpZGVvQ29udGFpbmVyID0gJCgnLmpzLW1vY2t1cC12aWRlbycpO1xuICAgICAgICBsZXQgJHZpZGVvID0gJHZpZGVvQ29udGFpbmVyLmZpbmQoJ3ZpZGVvJyk7XG4gICAgICAgIGxldCAkcGxheUJ0biA9ICR2aWRlb0NvbnRhaW5lci5maW5kKCcudmlkZW8tbW9ja3VwX19wbGF5LWJ0bicpO1xuXG4gICAgICAgICR2aWRlby5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXIoJ3BhdXNlJyk7XG4gICAgICAgICAgICBfdGhpc1xuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxuICAgICAgICAgICAgICAgIC5maW5kKCcudmlkZW8tbW9ja3VwX19wbGF5LWJ0bicpXG4gICAgICAgICAgICAgICAgLmZhZGVJbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcGxheUJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIF90aGlzXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICAudHJpZ2dlcigncGxheScpO1xuXG4gICAgICAgICAgICBfdGhpcy5mYWRlT3V0KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2V0SGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gJHdpbmRvdy53aWR0aCgpO1xuICAgICAgICBjaGFuZ2VIZWlnaHQoKTtcblxuICAgICAgICAkd2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh3aWR0aCA+PSAkd2luZG93LndpZHRoKCkgfHwgd2lkdGggPD0gJHdpbmRvdy53aWR0aCgpKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlSGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZUhlaWdodCgpIHtcbiAgICAgICAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpO1xuICAgICAgICAgICAgbGV0IGhlYWRlckhlaWdodCA9ICQoJy5oZWFkZXInKS5oZWlnaHQoKTtcbiAgICAgICAgICAgIGxldCAkZmlyc3RzY3JlZW4gPSAkKCcuZmlyc3RzY3JlZW4nKTtcbiAgICAgICAgICAgIGxldCAkZXF1YWxIID0gJCgnLmpzLWVxdWFsaGVpZ2h0cycpO1xuXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gMTAyNCkge1xuICAgICAgICAgICAgICAgICRlcXVhbEguZXF1YWxIZWlnaHRzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDEwMjQpIHtcbiAgICAgICAgICAgICAgICAkZmlyc3RzY3JlZW4uY3NzKCdoZWlnaHQnLCB3aW5kb3dIZWlnaHQgLSBoZWFkZXJIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwcm9tbzoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlcnMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgYW5pbWF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKCcuaGVyby0taWNvbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgICAgdGwuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAnLmxvZ28nLFxuICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICB7IHg6IC0xMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm8taW5jb19faW1nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDUwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvLWluY29fX3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogLTUwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLXByb21vJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICAgIHRsLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgJy5sb2dvJyxcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvX190aXRsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC41J1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm9fX3N1YnRpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0uNidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5zbGljay1uZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuc2xpY2stcHJldicsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTEnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuYWR2LWltYWdlX19pbWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMzAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNydcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2xpZGVyczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci1hZHYnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWFkdicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci1hZHYtaW1hZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWFkdi1pbWFnZScpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci11c2VycycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItdXNlcnMnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMjBweCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWljb25zJykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDQwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzIwcHgnLFxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlZ2lzdHJhdGlvbjoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZUJsb2NrKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbW92ZUJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCAkYXV0aEZvcm0gPSAkKCcuanMtcHJvbW8tZm9ybScpO1xuICAgICAgICAgICAgbGV0ICRtb2RhbEZvcm0gPSAkKCcuanMtbW9kYWwtZm9ybScpO1xuXG4gICAgICAgICAgICBpZiAoJGRvY3VtZW50LndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgICAgICAgICBtb3ZlRm9ybSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJGRvY3VtZW50LndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgICAgICAgICAgICAgbW92ZUZvcm0oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc2NyZWVuLS1yZWcnKS5hcHBlbmQoJGF1dGhGb3JtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbW92ZUZvcm0oKSB7XG4gICAgICAgICAgICAgICAgJGF1dGhGb3JtLmluc2VydEFmdGVyKCcuZmlyc3RzY3JlZW5fX3dyYXBwZXInKTtcbiAgICAgICAgICAgICAgICAkbW9kYWxGb3JtLmFwcGVuZFRvKCcubW9kYWwtYm9keScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBpY29uOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtc2xpZGVyJyk7XG5cbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiQoZnVuY3Rpb24oKSB7XG4gICAgJChjYXJkLmluaXQoKSk7XG4gICAgJChPbmVwYWdlLmluaXQoKSk7XG59KTtcblxuLypcbiAqKiogZnVuY3Rpb25zLmpzXG4gKi9cbi8qKlxyXG4gKiBmdW5jdGlvbnMuanNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoYmxvY2spLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbn1cclxuXG4iXX0=
