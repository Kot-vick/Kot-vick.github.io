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

//Menu vars
var $menu = $('.js-menu');
var $navMobile = $('.js-mobile-nav');
var $hamburger = $('.js-main-nav-btn');
var $hamburgerCrm = $('.js-hamburger');
var $menuOvelay = $('.js-menu-overlay');
var $menuItemDropdown = $('.js-menu-item-dropdown');
var $btnFloat = $document.find('.js-btn-floating');

/**

 * Base.js

 *

 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>

 */

var Base = {

    init: function init() {

        this.removePreloader();

        this.dropdown.init();

        this.accordeon();

        this.checkbox();

        // this.radioBtn();

        this.tab();

        // this.mobileSelect();

        // this.inputMask();

        // this.inputEvents();

        this.listToggle();

        this.copyText();

        this.ownerPhone();

        this.changeCity();

        this.slider();

        this.catalogItemSlider();

        this.select.init();

        this.inputs.init();

        this.buttons.btnExpanded();

        this.buttons.btnHoverAnimate();

        this.buttons.btnStatusAnimate();

        this.buttons.btnGoTop();

        this.buttons.btnGoTo();

        this.buttons.btnFloating();

        this.buttons.btnPush();

        this.popup.popupFancyBox();

        this.popup.whoIs();

        this.popup.changeFormTitle();

        this.popup.reinit();

        if ($(window).width() > 768) {

            this.scrollBar();
        } else {

            this.menu.hamburgerBtn();

            this.menu.clickOuside();

            this.menu.searchBtnOpenClose();
        }

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

            // $('body').addClass('loading-animation');

            // setTimeout(() => {

            //     $('body').removeClass('loading loading-animation');

            // }, 500);

            $('body').removeClass('loading loading-animation');
        }, 1000);
    },

    //Init base tabs jQ Ui Tabs

    tab: function tab() {

        if ($('.js-bb-tab').length) {

            $('.js-bb-tab').tabs();
        }
    },

    //Custom checbox & checkboxPseudo

    checkbox: function checkbox() {

        $document.on('click', '.js-bb-checkbox', function (e) {

            if ($(this).find('input').is(':checked')) {

                $(this).addClass('is-checked');
            } else {

                $(this).removeClass('is-checked');
            }
        });

        //BB checkbox pseudo

        $document.on('click', '.js-bb-checkbox--pseudo', function () {

            if ($(this).hasClass('is-checked')) {

                $(this).removeClass('is-checked');
            } else {

                $(this).addClass('is-checked');
            }
        });

        //Select All Checkbox

        $document.on('click', '.js-bb-checkbox-select-all', function () {

            if ($(this).hasClass('is-selected')) {

                $(this).removeClass('is-selected').parent().find('.js-bb-checkbox').removeClass('is-checked').find('input').removeAttr('checked');
            } else {

                $(this).addClass('is-selected').parent().find('.js-bb-checkbox').addClass('is-checked').find('input').prop('checked', 'checked');
            }

            return false;
        });
    },

    //Custom radioBtn

    // radioBtn: function() {

    //     let $radio = $('.js-bb-radio');


    //     //BB radio

    //     $document.on('click', '.js-bb-radio', function() {

    //         var $input = $(this).find('input');

    //         if ($input.is(':checked')) {

    //             $(this).addClass('is-checked');

    //         } else {

    //             $radio.removeClass('is-checked');

    //         }

    //     });

    // },

    //Custom accordeon

    accordeon: function accordeon() {

        var $accordeon = $('.js-bb-accordeon');

        if ($accordeon.length) {

            $accordeon.find('.bb-accordeon__content').slideUp();

            $accordeon.find('.bb-accordeon__item').each(function () {

                if ($(this).hasClass('is-open')) {

                    $(this).find('.bb-accordeon__content').slideDown();
                }
            });
        }

        //Accordeon collapse

        $document.on('click', '.js-bb-accordeon .bb-accordeon__title', function (e) {

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
    },

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

            var $parent = $(this).closest('.js-input-box');

            var $inputIcon = $parent.find('.bb-input__icon');

            var $btnReset = $parent.find('.js-input--clear');

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

            $(this).closest().find('.js-input').val('');

            $(this).fadeOut().closest().find('.bb-input__icon').not('.js-input--clear').fadeIn();

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

        var changeCity = $('.js-city-select');

        var changeCityTitle = changeCity.find('.city-select__title span');

        changeCity.find('.city-select__item').on('click', function () {

            var text = $(this).text();

            changeCityTitle.text(text);
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

                        prevArrow: $nextArrow,

                        nextArrow: $prevArrow,

                        autoplay: true,

                        autoplaySpeed: 4000,

                        speed: 1500,

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

    buttons: {

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

                var textSuccess = $(this).data('message-success');

                var textError = $(this).data('message-error');

                $(this).addClass('is-animate is-ready');

                if (click <= 1) {

                    setTimeout(function () {

                        $(_this2).removeClass('is-animate is-ready');

                        if ($(_this2).hasClass('is-error')) {

                            $(_this2).addClass('is-invalid');

                            pushUp({

                                text: textError,

                                status: 'error'

                            });
                        } else {

                            $(_this2).removeClass('is-invalid');

                            pushUp({

                                text: textSuccess

                            });
                        }
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

                        $overlay.addClass('is-visible');
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

                $document.on('click touchstart', '.overlay', function (e) {

                    $btn.removeClass('fa-enter-active').addClass('fa-leave-active');

                    setTimeout(function () {

                        $overlay.removeClass('is-visible');
                    }, 100);

                    setTimeout(function () {

                        $btn.removeClass('fa-leave-active');
                    }, 1500);
                });
            }

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

                var message = $(this).attr('data-push-message');

                var status = $(this).attr('data-push');

                pushUp({

                    text: message,

                    status: status

                });
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

    dropdown: {

        //Custom dropdown

        init: function init() {

            var $dropdown = $document.find('.js-bb-dropdown');

            if ($dropdown.length) {

                if ($window.width() <= 768) {

                    $dropdown.removeClass('bb-dropdown--hover');
                }
            }

            this.render();

            this.showHide();
        },

        render: function render() {

            if ($window.width() <= 768) {

                var $dropdown = $document.find('.js-bb-dropdown.bb-dropdown--transform');

                $dropdown.each(function () {

                    var $btnClose = $('<button class="bb-dropdown__close js-bb-dropdown--close">Закрыть</button>');

                    var $dropdownOverlay = $('<div class="bb-dropdown__overlay">');

                    var $dropdownList = $(this).find('.bb-dropdown__list');

                    $btnClose.appendTo($dropdownList);

                    $dropdownOverlay.insertAfter($dropdownList);

                    $dropdownList.find('.info-block__icon').remove();
                });
            }
        },

        showHide: function showHide() {

            var $dropdown = $document.find('.js-bb-dropdown');

            var $btnFloating = $document.find('.js-btn-floating');

            $document.on('click', '.js-bb-dropdown', function (e) {

                var target = $(e.target);

                if (target.is('.bb-dropdown__overlay')) {

                    $(this).removeClass('is-active');

                    $btnFloating.fadeIn();
                } else if (target.closest('.bb-dropdown__list').length) {

                    e.stopPropagation();
                } else {

                    if ($(this).hasClass('is-active')) {

                        $(this).removeClass('is-active');

                        $btnFloating.fadeIn();
                    } else {

                        $dropdown.removeClass('is-active');

                        $(this).toggleClass('is-active');

                        if ($(this).hasClass('bb-dropdown--transform')) {

                            $btnFloating.fadeOut();
                        }
                    }
                }

                e.stopPropagation();
            });

            $document.on('click', function (e) {

                if ($(e.target).closest('.js-bb-dropdown').length) return;

                $dropdown.removeClass('is-active');
            });

            $document.on('click', '.js-bb-dropdown .info-block__link', function () {

                $dropdown.removeClass('.is-active');

                $btnFloating.fadeIn();
            });

            $document.on('click', '.js-bb-dropdown--close', function (e) {

                e.stopPropagation();

                $(this).closest('.js-bb-dropdown').removeClass('is-active');

                $btnFloating.fadeIn();
            });
        }

    },

    inputs: {

        init: function init() {

            this.inputEvents();

            this.inputMask();

            this.mobileSelect();
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

            //Edit Text Field

            if ($('.js-field-edit').length) {

                var fieldEdit = $('.js-field-edit');

                var fieldEditInput = fieldEdit.find('.field-edit__input');

                var fieldEditBtn = fieldEdit.find('.field-edit__btn');

                fieldEditBtn.on('click', function () {

                    var fieldEditInput = $(this).closest('.js-field-edit').find('.field-edit__input');

                    var fieldEditText = $(this).closest('.js-field-edit').find('.field-edit__text');

                    $(this).hide();

                    fieldEditText.hide();

                    fieldEditInput.show().select();
                });

                fieldEditInput.blur(function () {

                    var fieldEditText = $(this).closest('.js-field-edit').find('.field-edit__text');

                    if ($.trim(this.value) == '') {

                        this.value = this.defaultValue ? this.defaultValue : '';
                    } else {

                        fieldEditText.html(this.value);
                    }

                    $(this).hide();

                    fieldEditBtn.removeAttr('style');

                    fieldEditText.show();
                }).keypress(function (event) {

                    var fieldEditText = $(this).closest('.js-field-edit').find('.field-edit__text');

                    if (event.keyCode == '13') {

                        if ($.trim(this.value) == '') {

                            this.value = this.defaultValue ? this.defaultValue : '';
                        } else {

                            fieldEditText.html(this.value);
                        }

                        $(this).hide();

                        fieldEditBtn.removeAttr('style');

                        fieldEditText.show();
                    }
                });
            }

            if ($('.js-bb-input').length) {

                $('.js-bb-input').on('focus', function () {

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
        },

        mobileSelect: function mobileSelect() {

            var $select = $('.js-mobile-select');

            $select.each(function () {

                var $inputSearch = $(this).find('.mobile-select__field');

                var $resultItem = $(this).find('.mobile-select__result');

                var $btnClose = $(this).find('.js-mobile-select--close');

                $inputSearch.on('focus', function () {

                    $(this).closest('.js-mobile-select').addClass('is-active');

                    $('html, body').animate({

                        scrollTop: 0

                    });
                });

                $btnClose.on('click mousedown touchstart', function (e) {

                    e.preventDefault();

                    $(this).closest('.js-mobile-select').removeClass('is-active');

                    $inputSearch.blur();
                });

                $(document).on('click mousedown touchstart', '.mobile-select__result', function () {

                    $resultItem.removeClass('is-selected');

                    $(this).addClass('is-selected');
                });
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

            $('.js-select--icon').select2({

                templateSelection: iformat,

                templateResult: iformat,

                minimumResultsForSearch: -1

            });

            $('.js-select--services').select2({

                templateSelection: timeAndPrice,

                templateResult: timeAndPrice

            });

            $('.js-select.no-search').select2({

                minimumResultsForSearch: -1

            });

            $('.js-select-born').select2({

                minimumResultsForSearch: -1,

                allowClear: true

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

            //Icon fontawesome inside select

            function iformat(icon) {

                var originalOption = icon.element;

                return $('<span><i class="select2__icon' + ' ' + $(originalOption).data('icon') + '"></i> ' + icon.text + '</span>');
            }

            //Select Add Price Time & Price

            function timeAndPrice(opt) {

                var originalTime = $(opt.element).data('time');

                var originalPrice = $(opt.element).data('price');

                return $('<div class=custom-select__results>' + '<span>' + opt.text + '</span>' + '<span>' + originalTime + '</span>' + '<span>' + originalPrice + '</span>' + '</div>');
            }

            $document.on('focus', '.select2-search__field', function (e) {

                e.stopPropagation();
            });

            var $selectNative = $('.js-select-native');

            if ($selectNative.length) {

                if ($selectNative) {

                    if ($(window).width() >= 768) {

                        $selectNative.select2({

                            minimumResultsForSearch: -1

                        });
                    } else {

                        $selectNative.each(function () {

                            var placeholder = $(this).data('placeholder');

                            var $firstOption = $(this).find('option:first-child');

                            if ($firstOption.text() == '') {

                                $firstOption.val(placeholder).text(placeholder).attr('selected', 'selected').attr('disabled', 'disabled').removeAttr('data-placeholder');
                            }

                            $(this).wrap('<label class="bb-select">');
                        });
                    }
                }
            }

            this.colorSelect();

            this.showYear();

            this.hideYear();

            this.addResetBtn();

            this.phoneCode();

            this.mobileSelect();
        },

        colorSelect: function colorSelect() {

            var $colorSelect = $('.js-select--color');

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
            });

            $yearSelect.on('select2:unselect', function () {
                var _this4 = this;

                setTimeout(function () {

                    $(_this4).off('select2:opening');
                }, 100);
            });

            $yearSelect.on('change', function () {

                if ($(this).val() == '' && $(this).attr('data-born') === 'year') {

                    $('.js-set-year').show();

                    $('.js-set-year').prev().hide();
                }
            });
        },

        addResetBtn: function addResetBtn() {

            var $dateSelect = $document.find('.js-select-born');

            $dateSelect.on('change', function () {

                $(this).next().find('.select2-selection__clear').text('').append('<i class="fas fa-times-circle"></i>');
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

            var $select = $('.js-mobile-select');

            $select.each(function () {

                var $inputSearch = $(this).find('.mobile-select__field');

                var $resultItem = $(this).find('.mobile-select__result');

                var $btnClose = $(this).find('.js-mobile-select--close');

                $inputSearch.on('focus', function () {

                    $(this).closest('.js-mobile-select').addClass('is-active');

                    $('html, body').animate({

                        scrollTop: 0

                    });
                });

                $btnClose.on('click mousedown touchstart', function (e) {

                    e.preventDefault();

                    $(this).closest('.js-mobile-select').removeClass('is-active');

                    $inputSearch.blur();
                });

                $(document).on('click mousedown touchstart', '.mobile-select__result', function () {

                    $resultItem.removeClass('is-selected');

                    $(this).addClass('is-selected');
                });
            });
        }

    },

    menu: {

        //Hamburger btn

        hamburgerBtn: function hamburgerBtn() {

            $hamburger.on('click mousedown touchstart', function (e) {

                if ($(this).hasClass('on')) {

                    Base.menu._removeStyle();
                } else {

                    Base.menu._addStyle();
                }

                e.stopPropagation();

                e.preventDefault();
            });

            $('.js-mobile-nav--close').on('click', function () {

                Base.menu._removeStyle();
            });
        },

        //When Click Outside Close Menu

        clickOuside: function clickOuside() {

            $document.on('click mousedown touchstart', function (e) {

                if ($(e.target).closest('.js-mobile-nav, .js-date, .datepicker, .card-info__request, .catalog-filter, .js-mobile-filter--open, .js-bb-accordeon').length) {

                    return;
                }

                Base.menu._removeStyle();

                e.stopPropagation();
            }).on('click mousedown touchstart', '.overlay', Base.menu._removeStyle);
        },

        //Mobile Search Btn open/close

        searchBtnOpenClose: function searchBtnOpenClose() {

            var searchBtn = $('.js-mobile-search-btn');

            searchBtn.on('click', function () {

                if ($wrapper.hasClass('mobile-search--open')) {

                    $wrapper.removeClass('mobile-search--open');

                    $html.removeAttr('style');

                    return false;
                } else {

                    $wrapper.addClass('mobile-search--open');

                    $html.css('overflow', 'hidden');

                    return false;
                }
            });
        },

        _addStyle: function _addStyle() {

            $(this).addClass('on');

            $wrapper.addClass('mobile-nav--open');

            $overlay.css('display', 'block');

            $html.css('overflow', 'hidden');
        },

        _removeStyle: function _removeStyle() {

            $(this).removeClass('on');

            $wrapper.removeClass('mobile-nav--open');

            $html.removeAttr('style');

            setTimeout(function () {

                $overlay.removeAttr('style');
            }, 100);
        }

    },

    popup: {

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

    }

};

/**
 * Crm.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Crm = {
    init: function init() {
        this.controlBox();

        this.menu.hamburgerCrm();
        this.menu.menuItemDropdown();
        this.menu.clickOutside();

        this.sliders.triumph();
        this.sliders.sliderPopupReinit();

        this.mobileBlock.bodyPosition();
        this.mobileBlock.requestItemClick();
        this.mobileBlock.callAplicationMobileBlock();

        this.graphic.init();

        Crm.aplication.init();
        Crm.request.init();
        Crm.steps.init();
        Crm.studio.init();
        Crm.services.init();

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
        });
    },
    boxResize: function boxResize() {
        if ($window.width() <= 480) {
            $header.addClass('bg--dark');
            $menu.addClass('bg--white');
            $('.js-control-box').slideUp();
        } else {
            $header.removeClass('bg--dark');
            $menu.removeClass('bg--white');
        }
    },
    menu: {
        //Hamburger btn
        hamburgerCrm: function hamburgerCrm() {
            $hamburgerCrm.on('click', function (e) {
                if ($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    $menu.removeClass('is-open');
                    $header.removeClass('is-moving');
                    Crm.menu.removeStyle();

                    if ($(window).width() > 480) {
                        $wrapper.removeClass('menu-open');
                    }
                } else {
                    $(this).addClass('on');
                    $menu.addClass('is-open');
                    $header.addClass('is-moving');
                    $html.css('overflow', 'hidden');

                    if ($(window).width() > 480) {
                        $wrapper.addClass('menu-open');
                        $menuItemDropdown.removeClass('dropdown-active');
                    }
                }
            });
        },
        mobileNavBtn: function mobileNavBtn() {
            $('.js-mobile-nav-btn').on('click mousedown touchstart', function (e) {
                if ($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    $wrapper.removeClass('mobile-nav--open');
                    $html.removeAttr('style');
                    Crm.menu.removeStyle();
                } else {
                    $(this).addClass('on');
                    $wrapper.addClass('mobile-nav--open');
                    $html.css('overflow', 'hidden');
                }
                return false;
            });
        },
        //When click outside Menu do this
        clickOutside: function clickOutside() {
            $document.on('click touchstart', function (e) {
                if ($(e.target).closest('.js-main-nav-btn, .js-mobile-nav, .menu-dropdown, .js-menu-item-dropdown, .js-hamburger').length) return;
                $hamburger.removeClass('on');
                $hamburgerCrm.removeClass('on');
                $wrapper.removeClass('mobile-nav--open');
                $menu.removeClass('is-open');
                Crm.menu.removeStyle();
                setTimeout(function () {
                    $menuOvelay.removeClass('is-active');
                }, 100);
                e.stopPropagation();
            });
        },
        //Menu dropdown
        menuItemDropdown: function menuItemDropdown() {
            $menuItemDropdown.on('click', function () {
                if ($(this).hasClass('dropdown-active')) {
                    $(this).removeClass('dropdown-active');
                    $btnFloat.fadeIn();
                    $hamburgerCrm.removeClass('on');

                    if ($window.width() > 480) {
                        $wrapper.removeClass('menu-open');
                        $header.removeClass('is-moving');
                    } else {
                        setTimeout(function () {
                            $menuOvelay.removeClass('is-active');
                        }, 100);
                    }
                } else {
                    $(this).addClass('dropdown-active');
                    $btnFloat.fadeOut();
                    $hamburgerCrm.removeClass('on');

                    $(this).addClass('dropdown-active');
                    $menu.removeClass('is-open');
                    $header.removeClass('is-moving');

                    if ($window.width() > 480) {
                        $wrapper.addClass('menu-open');
                    } else {
                        $menuOvelay.addClass('is-active');
                    }
                }
            });
        },
        removeStyle: function removeStyle() {
            $menuItemDropdown.removeClass('dropdown-active');
            $wrapper.removeClass('menu-open');
            $header.removeClass('is-moving');
            Crm.menu.htmlRemoveStyle();
            $btnFloat.fadeIn();
        },
        htmlRemoveStyle: function htmlRemoveStyle() {
            $document.on('click touchstart', function (e) {
                if ($(e.target).closest('.js-mobile-nav-btn, .js-mobile-nav, .js-mobile-block--show, .js-request-item').length) return;
                e.stopPropagation();
                $html.removeAttr('style');
            });
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
                        swipe: false,
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
                var $slider = $(this).find('.bb-slider__slides');
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
            $document.on('click', '.js-move-block--show', function (e) {
                if ($window.width() >= 1200 && $(this).hasClass('request-item')) {
                    return false;
                }
                e.preventDefault();

                var btnId = $(this).attr('data-move-block-target');
                $document.find('[data-move-block]').filter('[data-move-block=' + btnId + ']').addClass('is-open');

                setTimeout(function () {
                    $body.addClass('is-fixed').css('position', 'fixed');
                }, 300);

                Crm.mobileBlock.bodyPosition();
            });

            $document.on('click', '.js-move-block-box--close', function (e) {
                $(this).closest('.move-block__box').removeClass('is-open');

                Crm.mobileBlock.bodyPosition();
            });

            $document.on('click', '.js-move-block--close', function (e) {
                $(this).closest('.move-block').removeClass('is-open');
                bodyFixed();
                e.stopPropagation();
                e.preventDefault();
            });

            function bodyFixed() {
                if (!$document.find('.js-move-block').hasClass('is-open')) {
                    $body.removeClass('is-fixed').css('position', 'relative');
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
        }
    },
    graphic: {
        init: function init() {
            this.detectHeight();
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
        Crm.aplication.changeSrvice();

        if ($window.width() >= 768) {
            Crm.aplication.searchOverlay();
        }
    },
    //Init Aplication tabs
    aplicationTab: function aplicationTab() {
        var $aplicationTab = $('.js-aplication-tab');
        $aplicationTab.tabs();

        //If aplication tab chat then hide aplication btns
        $aplicationTab.find('.tab__link').on('click', function () {
            var btn = $('.aplication__btns');
            var blockFooter = $('.js-move-block').children('.move-block__box').find('.move-block__footer');
            var href = $(this).attr('href');

            if (href === '#aplication-chat') {
                btn.addClass('is-hidden');
                blockFooter.addClass('is-hidden');
            } else {
                btn.removeClass('is-hidden');
                blockFooter.removeClass('is-hidden');
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
    //When change service reset this options
    changeSrvice: function changeSrvice() {
        $document.on('select2:select', '.js-select--services', function () {
            var $parrent = $(this).closest('.js-aplication-item');
            $parrent.find('.js-aplication-item-service').find('.bb-input__wrap').addClass('is-hidden').end().find('.js-aplication-item--edit').removeClass('is-hidden');
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
    searchOverlay: function searchOverlay() {
        var $input = $document.find('.js-search-overlay-input');
        var $overlay = $document.find('.js-search-overlay');
        var $aplication = $document.find('.aplication');
        var $user = $document.find('.aplication__user');
        var $emptyBlock = $document.find('.aplication__empty');
        var $btnNewClient = $document.find('.js-move-block--show');

        $document.on('focus', '.js-search-overlay-input', function () {
            $overlay.addClass('is-visible');
            $aplication.addClass('is-focus');
            $user.addClass('animated fadeInLeft').css('display', 'block');
            $emptyBlock.hide();
            $btnNewClient.show();
        }).on('keyup', function (e) {
            if (e.keyCode == 27) {
                _removeFocus();
            }
        }).on('click', '.js-search-overlay', _removeFocus);

        function _removeFocus() {
            $overlay.removeClass('is-visible');
            $aplication.removeClass('is-focus');
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
    init: function init() {
        if ($window.width() >= 1200) {
            Crm.request.sortMultiple();
        } else {
            Crm.request.tabs();
        }
    },
    //Function sortable
    sortMultiple: function sortMultiple() {
        $('.js-sortable').sortable({
            connectWith: '.js-sortable',
            cursor: 'move',
            tolerance: 'pointer',
            start: function start(e, ui) {
                ui.item.addClass('drag-sort');
            },
            stop: function stop(e, ui) {
                ui.item.removeClass('drag-sort');
                ui.item.removeClass('request-item--new');
                Crm.request.wigetReplaceIcon(ui.item);
            }
        }).disableSelection();
    },
    //Replace icon when drag item
    wigetReplaceIcon: function wigetReplaceIcon(el) {
        var widget = el.closest('.request__widget');
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
    //Request tabs
    tabs: function tabs() {
        $('.js-request-tab').tabs();
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
            Crm.request.sortMultiple();
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
        Crm.studio.workerPageToggle();
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
        if ($(window).width() <= 480) {
            //Open add warker page
            var $addWorker = $('.js-worker-add');

            $('.js-worker-item').each(function () {
                $(this).removeAttr('href').removeAttr('data-toggle');
            });

            $document.on('click', '.js-worker-item', function (e) {
                if ($addWorker.hasClass('is-visible')) {
                    $addWorker.removeClass('is-visible');
                } else {
                    $addWorker.addClass('is-visible');
                }
                e.stopPropagation();
                e.preventDefault();
            });
            //Close add worker page
            $('.js-worker-add--close').on('click touchstart', function () {
                $addWorker.removeClass('is-visible');
            });
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
    $(Base.init());
    $(Crm.init());
});

/*
 *** functions.js
 */
//PushUp
function pushUp(options) {
    var text = options.text || 'Вам новая заявка';
    var status = options.status || 'success';

    var pushContainer = $('<div>').addClass('bb-pushUp');
    var pushUpClose = $('<i class="fal fa-times"></i>').addClass('bb-pushUp__close js-pushUp--close');

    pushContainer.appendTo($('body'));
    pushContainer.text(text);
    pushUpClose.appendTo(pushContainer);

    if (status === 'error') {
        pushContainer.addClass('is-error');
    } else {
        pushContainer.addClass('is-success');
    }

    poshPos();

    raf(function () {
        pushContainer.addClass('is-active');
    });

    setTimeout(function () {
        pushContainer.removeClass('is-active');
        poshPos();
    }, 4500);

    setTimeout(function () {
        pushContainer.remove();
        poshPos();
    }, 5000);

    $(document).on('click', '.js-pushUp--close', function () {
        var $parent = $(this).closest('.bb-pushUp');
        $parent.removeClass('is-active');
        setTimeout(function () {
            $parent.remove();
        }, 300);
        poshPos();
    });

    function poshPos() {
        $('.bb-pushUp').each(function (e) {
            var height = $('.bb-pushUp').outerHeight(true);
            $(this).css('top', height * e + 10 + e);
        });
    }
}

//RequestAnimationFrame
function raf(fn) {
    window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
            fn();
        });
    });
}

//Set Input Date Value
function setInputDate(selector) {
    var _dat = document.querySelectorAll(selector);
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth() + 1,
        y = hoy.getFullYear(),
        data = void 0;

    if (d < 10) {
        d = '0' + d;
    }
    if (m < 10) {
        m = '0' + m;
    }

    data = y + '-' + m + '-' + d;

    for (var i = 0, max = _dat.length; i < max; i++) {
        _dat[i].value = data;
    }
}

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

    $(document).on('click mousedown touchstart', function (e) {
        if ($(e.target).closest(block).length) return;
        $(block).removeClass(cl);
        e.stopPropagation();
    });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXQuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRib2R5IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRvdmVybGF5IiwiJGhlYWRlciIsIiRtYWluIiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIiRoYW1idXJnZXJDcm0iLCIkbWVudU92ZWxheSIsIiRtZW51SXRlbURyb3Bkb3duIiwiJGJ0bkZsb2F0IiwiZmluZCIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiZHJvcGRvd24iLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwidGFicyIsImlzIiwiYWRkQ2xhc3MiLCJoYXNDbGFzcyIsInBhcmVudCIsInJlbW92ZUF0dHIiLCJwcm9wIiwiJGFjY29yZGVvbiIsInNsaWRlVXAiLCJlYWNoIiwic2xpZGVEb3duIiwiJHBhcmVudCIsImNsb3Nlc3QiLCIkaXRlbSIsImRhdGEiLCJsaXN0Iiwid29ya0xpc3QiLCJjc3MiLCJjYiIsIkNsaXBib2FyZCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsImJ0biIsIiRidG5EYXRhIiwiJGlucHV0VmFsIiwidmFsIiwiYXR0ciIsInNob3ciLCJub3QiLCJoaWRlIiwiZmlsdGVyIiwiZmFkZU91dCIsImZhZGVJbiIsInRleHQiLCJ1c2VyUGhvbmUiLCJwaG9uZSIsImNoYW5nZUNpdHlUaXRsZSIsIiRzbGlkZXIiLCIkc2xpZHMiLCIkc2xpZGUiLCIkcHJldkFycm93IiwiJG5leHRBcnJvdyIsInNsaWNrIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwiYXJyb3dzIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCIkY2F0YWxvZ0l0ZW1TbGlkZXIiLCJfdGhpcyIsIiRzbGlkZXMiLCIkc2xpZGVyRG90cyIsImV2ZW50IiwicHJlcGVuZCIsImFwcGVuZCIsInNsaWRlQ291bnQiLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCJpIiwiaHRtbCIsImxhenlMb2FkIiwic3RvcFByb3BhZ2F0aW9uIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCJ0ZXh0U3VjY2VzcyIsInRleHRFcnJvciIsInB1c2hVcCIsInN0YXR1cyIsIiRidG4iLCJydW4iLCJoZW5kbGVyIiwib2ZmIiwiX3JlbW92ZUFuaW1hdGlvbiIsImVsIiwiYnRuSWQiLCJ0cmlnZ2VyIiwibWVzc2FnZSIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJlbGVtZW50Q2xpY2siLCJkZXN0aW5hdGlvbiIsIiRkcm9wZG93biIsInJlbmRlciIsInNob3dIaWRlIiwiJGJ0bkNsb3NlIiwiJGRyb3Bkb3duT3ZlcmxheSIsIiRkcm9wZG93bkxpc3QiLCJhcHBlbmRUbyIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwiJGJ0bkZsb2F0aW5nIiwidGFyZ2V0IiwidG9nZ2xlQ2xhc3MiLCJpbnB1dEV2ZW50cyIsImlucHV0TWFzayIsIm1vYmlsZVNlbGVjdCIsImlucHV0bWFzayIsIm1hc2siLCJncmVlZHkiLCJvbkJlZm9yZVBhc3RlIiwicGFzdGVkVmFsdWUiLCJvcHRzIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiZGVmaW5pdGlvbnMiLCJ2YWxpZGF0b3IiLCJjYXJkaW5hbGl0eSIsImNhc2luZyIsImlucHV0IiwiZXhlY0NvbW1hbmQiLCJuZXh0IiwicHJldiIsImZpZWxkRWRpdCIsImZpZWxkRWRpdElucHV0IiwiZmllbGRFZGl0QnRuIiwiZmllbGRFZGl0VGV4dCIsImJsdXIiLCJ0cmltIiwidmFsdWUiLCJkZWZhdWx0VmFsdWUiLCJrZXlwcmVzcyIsImtleUNvZGUiLCJlbmQiLCIkc2VsZWN0IiwiJGlucHV0U2VhcmNoIiwiJHJlc3VsdEl0ZW0iLCJzZWxlY3QyIiwidGFncyIsInRlbXBsYXRlUmVzdWx0IiwiYWRkVXNlclBpYyIsInRlbXBsYXRlU2VsZWN0aW9uIiwiaWZvcm1hdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwidGltZUFuZFByaWNlIiwiYWxsb3dDbGVhciIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsImljb24iLCJvcmlnaW5hbE9wdGlvbiIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCIkc2VsZWN0TmF0aXZlIiwicGxhY2Vob2xkZXIiLCIkZmlyc3RPcHRpb24iLCJ3cmFwIiwiY29sb3JTZWxlY3QiLCJzaG93WWVhciIsImhpZGVZZWFyIiwiYWRkUmVzZXRCdG4iLCJwaG9uZUNvZGUiLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImRyb3Bkb3duUGFyZW50IiwiY29sb3IiLCIkb3JpZ2luYWxPcHRpb24iLCJjb2xvckJhbGwiLCIkeWVhclNlbGVjdCIsIiRkYXRlU2VsZWN0Iiwic2VsZWN0Q29kZVNlbGVjdGlvbiIsIm9wdFZhbCIsInNlbGVjdENvZGVSZXN1bHQiLCJjb3VudHJ5IiwiJHBob25lQ29kZUJveCIsIiRpbnB1dCIsImZvY3VzIiwib3B0aW9uU2VsZWN0Iiwic2VsZWN0VmFsdWUiLCJlcSIsImNoYW5nZSIsImNvdW50ZXIiLCJzZWxlY3RlZEluZGV4IiwiYWRkRm9jdXMiLCJyZW1vdmVGb2N1cyIsIl9yZW1vdmVTdHlsZSIsIl9hZGRTdHlsZSIsInNlYXJjaEJ0biIsImZhbmN5Ym94IiwiYmFzZUNsYXNzIiwiY2xvc2VDbGlja091dHNpZGUiLCJhdXRvRm9jdXMiLCJpbWFnZSIsInByZWxvYWQiLCJoZWxwZXJzIiwib3ZlcmxheSIsImxvY2tlZCIsInRvb2xiYXIiLCJtb2JpbGUiLCJjbGlja0NvbnRlbnQiLCJjbGlja1NsaWRlIiwidG91Y2giLCJzbWFsbEJ0biIsIndob2lzIiwiZm9ybSIsIkNybSIsImNvbnRyb2xCb3giLCJoYW1idXJnZXJDcm0iLCJtZW51SXRlbURyb3Bkb3duIiwiY2xpY2tPdXRzaWRlIiwic2xpZGVycyIsInRyaXVtcGgiLCJzbGlkZXJQb3B1cFJlaW5pdCIsIm1vYmlsZUJsb2NrIiwiYm9keVBvc2l0aW9uIiwicmVxdWVzdEl0ZW1DbGljayIsImNhbGxBcGxpY2F0aW9uTW9iaWxlQmxvY2siLCJncmFwaGljIiwiYXBsaWNhdGlvbiIsInJlcXVlc3QiLCJzdGVwcyIsInN0dWRpbyIsInNlcnZpY2VzIiwiV09XIiwiYm94UmVzaXplIiwic2xpZGVUb2dnbGUiLCJzdGFydCIsImRpc3BsYXkiLCJyZW1vdmVTdHlsZSIsIm1vYmlsZU5hdkJ0biIsImh0bWxSZW1vdmVTdHlsZSIsIiRidG5OZXh0Iiwic3dpcGUiLCJ0b3VjaE1vdmUiLCJtb2RhbCIsInNldFBvc2l0aW9uIiwiJHBhcnJlbnQiLCIkZm9vdGVyIiwiY2hpbGRyZW4iLCJvdXRlckhlaWdodCIsImJvZHlGaXhlZCIsImRldGVjdEhlaWdodCIsIiR0YWJsZSIsIiR0YWJsZVdvcmtlciIsIiR0YWJsZVdvcmtlclRyIiwiJHRhYmxlSG91cnMiLCIkdGFibGVIb3Vyc1RyIiwiY3VycmVudEhvdXJzSXRlbSIsIm1heEhlaWdodCIsImN1cnJlbnRXb3JrZXJJdGVtIiwiZWxlbSIsImN1cnJlbnRIZWlnaHQiLCJhcGxpY2F0aW9uVGFiIiwic2hvd05ld0NsaWVuRm9ybSIsInNob3dBcGxpY2F0aW9uSXRlbU9wdGlvbnMiLCJhcGxpY2F0aW9uSXRlbUNvdW50ZXIiLCJzZWxlY3RTaG93U2VydmljZSIsImFwbGljYXRpb25JdGVtUmVzZXQiLCJjaGFuZ2VTcnZpY2UiLCJzZWFyY2hPdmVybGF5IiwiJGFwbGljYXRpb25UYWIiLCJibG9ja0Zvb3RlciIsImhyZWYiLCJhZGRSZW1vdmVDbGFzc0Jsb2NrIiwiJGFwbGljYXRpb24iLCIkdXNlciIsIiRlbXB0eUJsb2NrIiwiJGJ0bk5ld0NsaWVudCIsIl9yZW1vdmVGb2N1cyIsInNvcnRNdWx0aXBsZSIsInNvcnRhYmxlIiwiY29ubmVjdFdpdGgiLCJjdXJzb3IiLCJ0b2xlcmFuY2UiLCJ1aSIsIml0ZW0iLCJzdG9wIiwid2lnZXRSZXBsYWNlSWNvbiIsImRpc2FibGVTZWxlY3Rpb24iLCJ3aWRnZXQiLCJpY29uTmV3IiwiaWNvbldvcmsiLCJpY29uRG9uZSIsImljb25BYm9ydCIsInNlbGVjdFRpbWUiLCJzaG93QWRkU2VydmljZSIsInNob3dTZXJ2aWNlSXRlbSIsIml0ZW1Ib3ZlciIsIiRibG9ja3MiLCIkYnRuT3BlbiIsInNob3dTZWFyY2giLCJmYWRlVG9nZ2xlIiwiaXRlbXMiLCJjb250YWlubWVudCIsInJlcGxhY2VUaXRsZUFmdGVyU29ydGFibGUiLCJob21lIiwiYXZhdGFyVG9nZ2xlQnRuIiwid29ya2VyUGFnZVRvZ2dsZSIsImNhdGVnb3J5U2hvdyIsIiRhZGRXb3JrZXIiLCIkdGFyZ2V0IiwiJGl0ZW1IaWRkZW4iLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImhlaWdodCIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsInkiLCJnZXRGdWxsWWVhciIsIm1heCIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssUUFBUUwsRUFBRSxNQUFGLENBQWQ7QUFDQSxJQUFNTSxXQUFXTixFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUSxVQUFVUixFQUFFLFNBQUYsQ0FBaEI7QUFDQSxJQUFNUyxRQUFRVCxFQUFFLFVBQUYsQ0FBZDs7QUFFQTtBQUNBLElBQU1VLFFBQVFWLEVBQUUsVUFBRixDQUFkO0FBQ0EsSUFBTVcsYUFBYVgsRUFBRSxnQkFBRixDQUFuQjtBQUNBLElBQU1ZLGFBQWFaLEVBQUUsa0JBQUYsQ0FBbkI7QUFDQSxJQUFNYSxnQkFBZ0JiLEVBQUUsZUFBRixDQUF0QjtBQUNBLElBQU1jLGNBQWNkLEVBQUUsa0JBQUYsQ0FBcEI7QUFDQSxJQUFNZSxvQkFBb0JmLEVBQUUsd0JBQUYsQ0FBMUI7QUFDQSxJQUFNZ0IsWUFBWWQsVUFBVWUsSUFBVixDQUFlLGtCQUFmLENBQWxCOztBQUVBOzs7Ozs7Ozs7O0FBWUEsSUFBTUMsT0FBTzs7QUFFVEMsVUFBTSxnQkFBVzs7QUFFYixhQUFLQyxlQUFMOztBQUVBLGFBQUtDLFFBQUwsQ0FBY0YsSUFBZDs7QUFFQSxhQUFLRyxTQUFMOztBQUVBLGFBQUtDLFFBQUw7O0FBRUE7O0FBRUEsYUFBS0MsR0FBTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxhQUFLQyxVQUFMOztBQUVBLGFBQUtDLFFBQUw7O0FBRUEsYUFBS0MsVUFBTDs7QUFFQSxhQUFLQyxVQUFMOztBQUVBLGFBQUtDLE1BQUw7O0FBRUEsYUFBS0MsaUJBQUw7O0FBSUEsYUFBS0MsTUFBTCxDQUFZWixJQUFaOztBQUVBLGFBQUthLE1BQUwsQ0FBWWIsSUFBWjs7QUFJQSxhQUFLYyxPQUFMLENBQWFDLFdBQWI7O0FBRUEsYUFBS0QsT0FBTCxDQUFhRSxlQUFiOztBQUVBLGFBQUtGLE9BQUwsQ0FBYUcsZ0JBQWI7O0FBRUEsYUFBS0gsT0FBTCxDQUFhSSxRQUFiOztBQUVBLGFBQUtKLE9BQUwsQ0FBYUssT0FBYjs7QUFFQSxhQUFLTCxPQUFMLENBQWFNLFdBQWI7O0FBRUEsYUFBS04sT0FBTCxDQUFhTyxPQUFiOztBQUlBLGFBQUtDLEtBQUwsQ0FBV0MsYUFBWDs7QUFFQSxhQUFLRCxLQUFMLENBQVdFLEtBQVg7O0FBRUEsYUFBS0YsS0FBTCxDQUFXRyxlQUFYOztBQUVBLGFBQUtILEtBQUwsQ0FBV0ksTUFBWDs7QUFJQSxZQUFJN0MsRUFBRUMsTUFBRixFQUFVNkMsS0FBVixLQUFvQixHQUF4QixFQUE2Qjs7QUFFekIsaUJBQUtDLFNBQUw7QUFFSCxTQUpELE1BSU87O0FBRUgsaUJBQUtDLElBQUwsQ0FBVUMsWUFBVjs7QUFFQSxpQkFBS0QsSUFBTCxDQUFVRSxXQUFWOztBQUVBLGlCQUFLRixJQUFMLENBQVVHLGtCQUFWO0FBRUg7O0FBSUQ7O0FBRUFuRCxVQUFFLEtBQUYsRUFBU29ELEVBQVQsQ0FBWSxXQUFaLEVBQXlCLFVBQVNDLENBQVQsRUFBWTs7QUFFakNBLGNBQUVDLGNBQUY7QUFFSCxTQUpEO0FBTUgsS0E1RlE7O0FBOEZUUCxlQUFXLHFCQUFXOztBQUVsQixZQUFJQSxZQUFZL0MsRUFBRSxZQUFGLENBQWhCOztBQUVBLFlBQUkrQyxVQUFVUSxNQUFkLEVBQXNCOztBQUVsQlIsc0JBQVVTLFVBQVYsQ0FBcUI7O0FBRWpCQyw2QkFBYSxTQUZJOztBQUlqQjs7QUFFQTs7QUFFQUMseUJBQW9CLEtBUkg7O0FBVWpCQyx1QkFBb0IsR0FWSDs7QUFZakJDLDZCQUFvQixLQVpIOztBQWNqQkMsOEJBQW9CLE1BZEg7O0FBZ0JqQkMsb0NBQW9COztBQWhCSCxhQUFyQjs7QUFvQkFmLHNCQUFVSyxFQUFWLENBQWEscUJBQWIsRUFBb0MsWUFBVzs7QUFFM0NwRCxrQkFBRSxJQUFGLEVBRUsrRCxhQUZMLEdBSUtDLE1BSkw7QUFNSCxhQVJEO0FBVUg7QUFFSixLQXBJUTs7QUFzSVQ7O0FBRUE1QyxxQkFBaUIsMkJBQVc7O0FBRXhCNkMsbUJBQVcsWUFBTTs7QUFFYjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQWpFLGNBQUUsTUFBRixFQUFVa0UsV0FBVixDQUFzQiwyQkFBdEI7QUFFSCxTQVpELEVBWUcsSUFaSDtBQWNILEtBeEpROztBQTBKVDs7QUFFQTFDLFNBQUssZUFBVzs7QUFFWixZQUFJeEIsRUFBRSxZQUFGLEVBQWdCdUQsTUFBcEIsRUFBNEI7O0FBRXhCdkQsY0FBRSxZQUFGLEVBQWdCbUUsSUFBaEI7QUFFSDtBQUVKLEtBcEtROztBQXNLVDs7QUFFQTVDLGNBQVUsb0JBQVc7O0FBRWpCckIsa0JBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixpQkFBdEIsRUFBeUMsVUFBU0MsQ0FBVCxFQUFZOztBQUVqRCxnQkFFSXJELEVBQUUsSUFBRixFQUVLaUIsSUFGTCxDQUVVLE9BRlYsRUFJS21ELEVBSkwsQ0FJUSxVQUpSLENBRkosRUFRRTs7QUFFRXBFLGtCQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIsWUFBakI7QUFFSCxhQVpELE1BWU87O0FBRUhyRSxrQkFBRSxJQUFGLEVBQVFrRSxXQUFSLENBQW9CLFlBQXBCO0FBRUg7QUFFSixTQXBCRDs7QUF3QkE7O0FBRUFoRSxrQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHlCQUF0QixFQUFpRCxZQUFXOztBQUV4RCxnQkFBSXBELEVBQUUsSUFBRixFQUFRc0UsUUFBUixDQUFpQixZQUFqQixDQUFKLEVBQW9DOztBQUVoQ3RFLGtCQUFFLElBQUYsRUFBUWtFLFdBQVIsQ0FBb0IsWUFBcEI7QUFFSCxhQUpELE1BSU87O0FBRUhsRSxrQkFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLFlBQWpCO0FBRUg7QUFFSixTQVpEOztBQWdCQTs7QUFFQW5FLGtCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsNEJBQXRCLEVBQW9ELFlBQVc7O0FBRTNELGdCQUFJcEQsRUFBRSxJQUFGLEVBQVFzRSxRQUFSLENBQWlCLGFBQWpCLENBQUosRUFBcUM7O0FBRWpDdEUsa0JBQUUsSUFBRixFQUVLa0UsV0FGTCxDQUVpQixhQUZqQixFQUlLSyxNQUpMLEdBTUt0RCxJQU5MLENBTVUsaUJBTlYsRUFRS2lELFdBUkwsQ0FRaUIsWUFSakIsRUFVS2pELElBVkwsQ0FVVSxPQVZWLEVBWUt1RCxVQVpMLENBWWdCLFNBWmhCO0FBY0gsYUFoQkQsTUFnQk87O0FBRUh4RSxrQkFBRSxJQUFGLEVBRUtxRSxRQUZMLENBRWMsYUFGZCxFQUlLRSxNQUpMLEdBTUt0RCxJQU5MLENBTVUsaUJBTlYsRUFRS29ELFFBUkwsQ0FRYyxZQVJkLEVBVUtwRCxJQVZMLENBVVUsT0FWVixFQVlLd0QsSUFaTCxDQVlVLFNBWlYsRUFZcUIsU0FackI7QUFjSDs7QUFFRCxtQkFBTyxLQUFQO0FBRUgsU0F0Q0Q7QUF3Q0gsS0E5UFE7O0FBZ1FUOztBQUVBOztBQUVBOzs7QUFJQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQW5ELGVBQVcscUJBQVc7O0FBRWxCLFlBQUlvRCxhQUFhMUUsRUFBRSxrQkFBRixDQUFqQjs7QUFJQSxZQUFJMEUsV0FBV25CLE1BQWYsRUFBdUI7O0FBRW5CbUIsdUJBQVd6RCxJQUFYLENBQWdCLHdCQUFoQixFQUEwQzBELE9BQTFDOztBQUVBRCx1QkFBV3pELElBQVgsQ0FBZ0IscUJBQWhCLEVBQXVDMkQsSUFBdkMsQ0FBNEMsWUFBVzs7QUFFbkQsb0JBQUk1RSxFQUFFLElBQUYsRUFBUXNFLFFBQVIsQ0FBaUIsU0FBakIsQ0FBSixFQUFpQzs7QUFFN0J0RSxzQkFBRSxJQUFGLEVBRUtpQixJQUZMLENBRVUsd0JBRlYsRUFJSzRELFNBSkw7QUFNSDtBQUVKLGFBWkQ7QUFjSDs7QUFJRDs7QUFFQTNFLGtCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsdUNBQXRCLEVBQStELFVBRTNEQyxDQUYyRCxFQUk3RDs7QUFFRSxnQkFBSXlCLFVBQVU5RSxFQUFFLElBQUYsRUFBUStFLE9BQVIsQ0FBZ0Isa0JBQWhCLENBQWQ7O0FBRUEsZ0JBQUlDLFFBQVVoRixFQUFFLElBQUYsRUFBUXVFLE1BQVIsQ0FBZSxxQkFBZixDQUFkOztBQUlBLGdCQUFJTyxRQUFRRyxJQUFSLENBQWEsV0FBYixNQUE4QixVQUFsQyxFQUE4Qzs7QUFFMUMsb0JBQUlELE1BQU1WLFFBQU4sQ0FBZSxTQUFmLENBQUosRUFBK0I7O0FBRTNCVSwwQkFFS2QsV0FGTCxDQUVpQixTQUZqQixFQUlLakQsSUFKTCxDQUlVLHdCQUpWLEVBTUswRCxPQU5MO0FBUUgsaUJBVkQsTUFVTzs7QUFFSEcsNEJBRUs3RCxJQUZMLENBRVUscUJBRlYsRUFJS2lELFdBSkwsQ0FJaUIsU0FKakIsRUFNS2pELElBTkwsQ0FNVSx3QkFOVixFQVFLMEQsT0FSTDs7QUFVQUssMEJBRUtYLFFBRkwsQ0FFYyxTQUZkLEVBSUtwRCxJQUpMLENBSVUsd0JBSlYsRUFNSzRELFNBTkw7QUFRSDtBQUVKLGFBbENELE1Ba0NPOztBQUVILG9CQUFJRyxNQUFNVixRQUFOLENBQWUsU0FBZixDQUFKLEVBQStCOztBQUUzQlUsMEJBRUtkLFdBRkwsQ0FFaUIsU0FGakIsRUFJS2pELElBSkwsQ0FJVSx3QkFKVixFQU1LMEQsT0FOTDtBQVFILGlCQVZELE1BVU87O0FBRUhLLDBCQUVLWCxRQUZMLENBRWMsU0FGZCxFQUlLcEQsSUFKTCxDQUlVLHdCQUpWLEVBTUs0RCxTQU5MO0FBUUg7QUFFSjtBQUVKLFNBeEVEO0FBMEVILEtBdFlROztBQXdZVHBELGdCQUFZLHNCQUFXOztBQUVuQixZQUFJekIsRUFBRSxVQUFGLEVBQWN1RCxNQUFsQixFQUEwQjtBQUFBLGdCQUViOUIsVUFGYSxHQUV0QixTQUFTQSxVQUFULEdBQXNCOztBQUVsQixvQkFBSXlELE9BQVdsRixFQUFFLFVBQUYsQ0FBZjs7QUFFQSxvQkFBSXVCLFdBQVcyRCxLQUFLakUsSUFBTCxDQUFVLGlCQUFWLENBQWY7O0FBRUEsb0JBQUlrRSxXQUFXRCxLQUFLakUsSUFBTCxDQUFVLGlCQUFWLENBQWY7O0FBRUFNLHlCQUFTNkIsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBVzs7QUFFNUIsd0JBQUk3QixTQUFTK0MsUUFBVCxDQUFrQixZQUFsQixDQUFKLEVBQXFDOztBQUVqQ2EsaUNBQVNYLFVBQVQsQ0FBb0IsT0FBcEI7QUFFSCxxQkFKRCxNQUlPOztBQUVIVyxpQ0FBU0MsR0FBVCxDQUFhLFNBQWIsRUFBd0IsTUFBeEI7QUFFSDtBQUVKLGlCQVpEO0FBY0gsYUF4QnFCOztBQTBCdEIzRDtBQUVIO0FBRUosS0F4YVE7O0FBMGFUOztBQUVBQyxjQUFVLG9CQUFXOztBQUVqQixZQUFJMkQsS0FBSyxJQUFJQyxTQUFKLENBQWMsZUFBZCxDQUFUOztBQUlBOztBQUVBcEYsa0JBQVVlLElBQVYsQ0FBZSxXQUFmLEVBQTRCMkQsSUFBNUIsQ0FBaUMsWUFBVzs7QUFFeEMsZ0JBQUlFLFVBQWE5RSxFQUFFLElBQUYsRUFBUStFLE9BQVIsQ0FBZ0IsZUFBaEIsQ0FBakI7O0FBRUEsZ0JBQUlRLGFBQWFULFFBQVE3RCxJQUFSLENBQWEsaUJBQWIsQ0FBakI7O0FBRUEsZ0JBQUl1RSxZQUFhVixRQUFRN0QsSUFBUixDQUFhLGtCQUFiLENBQWpCOztBQUVBLGdCQUFJd0UsUUFBYXpGLEVBQUUsSUFBRixFQUVaK0UsT0FGWSxDQUVKLFlBRkksRUFJWjlELElBSlksQ0FJUCxlQUpPLENBQWpCOztBQVFBakIsY0FBRSxJQUFGLEVBRUtvRCxFQUZMLENBRVEsT0FGUixFQUVpQixZQUFXOztBQUVwQixvQkFBSTBCLFVBQVk5RSxFQUFFLElBQUYsRUFBUStFLE9BQVIsQ0FBZ0IsaUJBQWhCLENBQWhCOztBQUVBLG9CQUFJVyxNQUFZWixRQUFRN0QsSUFBUixDQUFhLGVBQWIsQ0FBaEI7O0FBRUEsb0JBQUkwRSxXQUFZM0YsRUFBRSxJQUFGLEVBQVFpRixJQUFSLENBQWEsZ0JBQWIsQ0FBaEI7O0FBRUEsb0JBQUlXLFlBQVk1RixFQUFFLElBQUYsRUFBUTZGLEdBQVIsRUFBaEI7O0FBSUFILG9CQUFJSSxJQUFKLENBQVMscUJBQVQsRUFBZ0NILFdBQVdDLFNBQTNDO0FBRUgsYUFoQkwsRUFrQkt4QyxFQWxCTCxDQWtCUSxPQWxCUixFQWtCaUIsWUFBVzs7QUFFcEIsb0JBQUlwRCxFQUFFLElBQUYsRUFBUTZGLEdBQVIsTUFBaUIsRUFBckIsRUFBeUI7O0FBRXJCTiwrQkFFS1EsSUFGTCxHQUlLQyxHQUpMLENBSVMsa0JBSlQsRUFNS0MsSUFOTDtBQVFIO0FBRUosYUFoQ0wsRUFrQ0s3QyxFQWxDTCxDQWtDUSxNQWxDUixFQWtDZ0IsWUFBVzs7QUFFbkIsb0JBQUlwRCxFQUFFLElBQUYsRUFBUTZGLEdBQVIsTUFBaUIsRUFBckIsRUFBeUI7O0FBRXJCTiwrQkFFS1EsSUFGTCxHQUlLRyxNQUpMLENBSVksa0JBSlosRUFNS0QsSUFOTDtBQVFIO0FBRUosYUFoREw7QUFrREgsU0FsRUQ7O0FBc0VBL0Ysa0JBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixrQkFBdEIsRUFBMEMsWUFBVzs7QUFFakRwRCxjQUFFLElBQUYsRUFFSytFLE9BRkwsR0FJSzlELElBSkwsQ0FJVSxXQUpWLEVBTUs0RSxHQU5MLENBTVMsRUFOVDs7QUFRQTdGLGNBQUUsSUFBRixFQUVLbUcsT0FGTCxHQUlLcEIsT0FKTCxHQU1LOUQsSUFOTCxDQU1VLGlCQU5WLEVBUUsrRSxHQVJMLENBUVMsa0JBUlQsRUFVS0ksTUFWTDs7QUFjQXBHLGNBQUUsSUFBRixFQUVLK0UsT0FGTCxDQUVhLFlBRmIsRUFJSzlELElBSkwsQ0FJVSxlQUpWLEVBTUttRSxHQU5MLENBTVMsU0FOVCxFQU1vQixNQU5wQjtBQVFILFNBaENEO0FBa0NILEtBNWhCUTs7QUE4aEJUOztBQUVBekQsZ0JBQVksc0JBQVc7O0FBRW5CM0IsVUFBRSxnQkFBRixFQUFvQjRFLElBQXBCLENBQXlCLFlBQVc7O0FBRWhDNUUsY0FBRSxJQUFGLEVBRUs4RixJQUZMLENBRVUsTUFGVixFQUVrQixxQkFGbEIsRUFJS08sSUFKTCxDQUlVckcsRUFBRSxJQUFGLEVBQVFpRixJQUFSLENBQWEsYUFBYixDQUpWO0FBTUgsU0FSRDs7QUFZQWpGLFVBQUVHLFFBQUYsRUFBWWlELEVBQVosQ0FBZSxPQUFmLEVBQXdCLHNCQUF4QixFQUFnRCxZQUFXOztBQUV2RCxnQkFBSWtELFlBQVl0RyxFQUFFLElBQUYsRUFFWHVFLE1BRlcsR0FJWHRELElBSlcsQ0FJTixnQkFKTSxDQUFoQjs7QUFNQSxnQkFBSXNGLFFBQVFELFVBQVVyQixJQUFWLENBQWUsT0FBZixDQUFaOztBQUVBcUIsc0JBRUs5QixVQUZMLENBRWdCLE9BRmhCLEVBSUtzQixJQUpMLENBSVUsTUFKVixFQUlrQixTQUFTUyxLQUozQixFQU1LRixJQU5MLENBTVVFLEtBTlY7O0FBUUF2RyxjQUFFLElBQUYsRUFBUW9GLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCO0FBRUgsU0FwQkQ7QUFzQkgsS0Fwa0JROztBQXNrQlQ7O0FBRUF4RCxnQkFBWSxzQkFBVzs7QUFFbkIsWUFBSUEsYUFBa0I1QixFQUFFLGlCQUFGLENBQXRCOztBQUVBLFlBQUl3RyxrQkFBa0I1RSxXQUFXWCxJQUFYLENBQWdCLDBCQUFoQixDQUF0Qjs7QUFJQVcsbUJBQVdYLElBQVgsQ0FBZ0Isb0JBQWhCLEVBQXNDbUMsRUFBdEMsQ0FBeUMsT0FBekMsRUFBa0QsWUFBVzs7QUFFekQsZ0JBQUlpRCxPQUFPckcsRUFBRSxJQUFGLEVBQVFxRyxJQUFSLEVBQVg7O0FBRUFHLDRCQUFnQkgsSUFBaEIsQ0FBcUJBLElBQXJCO0FBRUgsU0FORDtBQVFILEtBeGxCUTs7QUEwbEJUOztBQUVBeEUsWUFBUSxrQkFBVzs7QUFFZixZQUFJNEUsVUFBVXpHLEVBQUUsZUFBRixDQUFkOztBQUVBLFlBQUl5RyxRQUFRbEQsTUFBWixFQUFvQjs7QUFFaEJrRCxvQkFBUTdCLElBQVIsQ0FBYSxZQUFXOztBQUVwQixvQkFBSThCLFNBQWExRyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxvQkFBYixDQUFqQjs7QUFFQSxvQkFBSTBGLFNBQWEzRyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxtQkFBYixDQUFqQjs7QUFFQSxvQkFBSTJGLGFBQWE1RyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSx5QkFBYixDQUFqQjs7QUFFQSxvQkFBSTRGLGFBQWE3RyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSx5QkFBYixDQUFqQjs7QUFJQSxvQkFBSTBGLE9BQU9wRCxNQUFYLEVBQW1COztBQUVmbUQsMkJBQU9WLEdBQVAsQ0FBVyxvQkFBWCxFQUFpQ2MsS0FBakMsQ0FBdUM7O0FBRW5DQyxtQ0FBZ0JGLFVBRm1COztBQUluQ0csbUNBQWdCSixVQUptQjs7QUFNbkNLLGtDQUFnQixJQU5tQjs7QUFRbkNDLHVDQUFnQixJQVJtQjs7QUFVbkNDLCtCQUFnQixJQVZtQjs7QUFZbkNDLHNDQUFnQixDQVptQjs7QUFjbkNDLHdDQUFnQixDQWRtQjs7QUFnQm5DQyxrQ0FBZ0IsSUFoQm1COztBQWtCbkNDLGdDQUFnQixJQWxCbUI7O0FBb0JuQ0MsOEJBQWdCLEtBcEJtQjs7QUF3Qm5DQyxvQ0FBWSxDQUVSOztBQUVJQyx3Q0FBWSxHQUZoQjs7QUFJSUMsc0NBQVk7O0FBRVJQLDhDQUFjLENBRk47O0FBSVJJLHNDQUFjLElBSk47O0FBTVJELHdDQUFjOztBQU5OOztBQUpoQix5QkFGUTs7QUF4QnVCLHFCQUF2QztBQThDSDtBQUVKLGFBOUREO0FBZ0VIO0FBRUosS0FwcUJROztBQXNxQlQ7O0FBRUF6Rix1QkFBbUIsNkJBQVc7O0FBRTFCLFlBQUk5QixFQUFFLHlCQUFGLEVBQTZCdUQsTUFBakMsRUFBeUM7O0FBRXJDLGdCQUFJcUUscUJBQXFCNUgsRUFBRSx5QkFBRixDQUF6Qjs7QUFJQTRILCtCQUFtQmhELElBQW5CLENBQXdCLFlBQVc7O0FBRS9CLG9CQUFJaUQsUUFBYzdILEVBQUUsSUFBRixDQUFsQjs7QUFFQSxvQkFBSThILFVBQWM5SCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxvQkFBYixDQUFsQjs7QUFFQSxvQkFBSTBGLFNBQWMzRyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxtQkFBYixDQUFsQjs7QUFFQSxvQkFBSThHLGNBQWMvSCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxrQkFBYixDQUFsQjs7QUFFQThHLDRCQUFZOUIsSUFBWjs7QUFJQTRCLHNCQUVLekUsRUFGTCxDQUVRLE1BRlIsRUFFZ0IsVUFBUzRFLEtBQVQsRUFBZ0JsQixLQUFoQixFQUF1Qjs7QUFFL0JpQixnQ0FBWUUsT0FBWixDQUVJLGtFQUVJLEdBSlI7O0FBUUFGLGdDQUFZRyxNQUFaLENBRUksNERBRUlwQixNQUFNcUIsVUFGVixHQUlJLFNBTlI7QUFVSCxpQkF0QkwsRUF3QksvRSxFQXhCTCxDQXdCUSxhQXhCUixFQXdCdUIsVUFFZjRFLEtBRmUsRUFJZmxCLEtBSmUsRUFNZnNCLFlBTmUsRUFRZkMsU0FSZSxFQVVqQjs7QUFFRSx3QkFBSUMsSUFBSSxDQUFDRixlQUFlQSxZQUFmLEdBQThCLENBQS9CLElBQW9DLENBQTVDOztBQUVBUCwwQkFBTTVHLElBQU4sQ0FBVyx3QkFBWCxFQUFxQ3NILElBQXJDLENBQTBDRCxDQUExQztBQUVILGlCQXhDTDs7QUE0Q0Esb0JBQUkzQixPQUFPcEQsTUFBUCxHQUFnQixDQUFwQixFQUF1Qjs7QUFFbkJ3RSxnQ0FBWWhDLElBQVo7O0FBSUErQiw0QkFBUTlCLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ2MsS0FBbEMsQ0FBd0M7O0FBRXBDMEIsa0NBQWdCLFVBRm9COztBQUlwQ3JCLCtCQUFnQixHQUpvQjs7QUFNcENDLHNDQUFnQixDQU5vQjs7QUFRcENDLHdDQUFnQixDQVJvQjs7QUFVcENFLGdDQUFnQixJQVZvQjs7QUFZcENELGtDQUFnQixLQVpvQjs7QUFjcENFLDhCQUFnQixLQWRvQjs7QUFrQnBDQyxvQ0FBWSxDQUVSOztBQUVJQyx3Q0FBWSxHQUZoQjs7QUFJSUMsc0NBQVk7O0FBRVJKLHdDQUFROztBQUZBOztBQUpoQix5QkFGUTs7QUFsQndCLHFCQUF4QztBQW9DSDtBQUVKLGFBdEdEOztBQTBHQSxnQkFBSXZILEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7O0FBRXpCOUMsa0JBQUUsa0JBQUYsRUFFS2lCLElBRkwsQ0FFVSxvQkFGVixFQUlLbUMsRUFKTCxDQUlRLE9BSlIsRUFJaUIsVUFBU0MsQ0FBVCxFQUFZOztBQUVyQix3QkFBSXJELEVBQUUsSUFBRixFQUFRc0UsUUFBUixDQUFpQixtQkFBakIsQ0FBSixFQUEyQzs7QUFFdkNqQiwwQkFBRW9GLGVBQUY7O0FBRUFwRiwwQkFBRUMsY0FBRjtBQUVIO0FBRUosaUJBZEw7QUFnQkg7QUFFSjtBQUVKLEtBaHpCUTs7QUFrekJUckIsYUFBUzs7QUFFTDs7QUFFQUMscUJBQWEsdUJBQVc7O0FBRXBCd0csMkJBQWUsa0JBQWYsRUFBbUMsV0FBbkM7QUFFSCxTQVJJOztBQVVMOztBQUVBdkcseUJBQWlCLDJCQUFXOztBQUV4QmpDLHNCQUVLa0QsRUFGTCxDQUVRLFlBRlIsRUFFc0IsaUJBRnRCLEVBRXlDLFVBQVNDLENBQVQsRUFBWTs7QUFFN0Msb0JBQUlzRixlQUFlM0ksRUFBRSxJQUFGLEVBQVE0SSxNQUFSLEVBQW5CO0FBQUEsb0JBRUlDLE9BQWV4RixFQUFFeUYsS0FBRixHQUFVSCxhQUFhSSxJQUYxQztBQUFBLG9CQUlJQyxPQUFlM0YsRUFBRTRGLEtBQUYsR0FBVU4sYUFBYU8sR0FKMUM7O0FBTUFsSixrQkFBRSxJQUFGLEVBRUtpQixJQUZMLENBRVUsd0JBRlYsRUFJS21FLEdBSkwsQ0FJUzs7QUFFRDhELHlCQUFNRixJQUZMOztBQUlERCwwQkFBTUY7O0FBSkwsaUJBSlQ7QUFZSCxhQXRCTCxFQXdCS3pGLEVBeEJMLENBd0JRLFVBeEJSLEVBd0JvQixpQkF4QnBCLEVBd0J1QyxVQUFTQyxDQUFULEVBQVk7O0FBRTNDLG9CQUFJc0YsZUFBZTNJLEVBQUUsSUFBRixFQUFRNEksTUFBUixFQUFuQjtBQUFBLG9CQUVJQyxPQUFleEYsRUFBRXlGLEtBQUYsR0FBVUgsYUFBYUksSUFGMUM7QUFBQSxvQkFJSUMsT0FBZTNGLEVBQUU0RixLQUFGLEdBQVVOLGFBQWFPLEdBSjFDOztBQU1BbEosa0JBQUUsSUFBRixFQUVLaUIsSUFGTCxDQUVVLHdCQUZWLEVBSUttRSxHQUpMLENBSVM7O0FBRUQ4RCx5QkFBTUYsSUFGTDs7QUFJREQsMEJBQU1GOztBQUpMLGlCQUpUO0FBWUgsYUE1Q0w7QUE4Q0gsU0E1REk7O0FBOERMOztBQUVBekcsMEJBQWtCLDRCQUFXOztBQUV6QixnQkFBSStHLFFBQVEsQ0FBWjs7QUFFQWpKLHNCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsY0FBdEIsRUFBc0MsVUFBU0MsQ0FBVCxFQUFZO0FBQUE7O0FBRTlDOEY7O0FBRUEsb0JBQUlDLGNBQWNwSixFQUFFLElBQUYsRUFBUWlGLElBQVIsQ0FBYSxpQkFBYixDQUFsQjs7QUFFQSxvQkFBSW9FLFlBQWNySixFQUFFLElBQUYsRUFBUWlGLElBQVIsQ0FBYSxlQUFiLENBQWxCOztBQUVBakYsa0JBQUUsSUFBRixFQUFRcUUsUUFBUixDQUFpQixxQkFBakI7O0FBSUEsb0JBQUk4RSxTQUFTLENBQWIsRUFBZ0I7O0FBRVpsRiwrQkFBVyxZQUFNOztBQUViakUsa0NBQVFrRSxXQUFSLENBQW9CLHFCQUFwQjs7QUFFQSw0QkFBSWxFLFVBQVFzRSxRQUFSLENBQWlCLFVBQWpCLENBQUosRUFBa0M7O0FBRTlCdEUsc0NBQVFxRSxRQUFSLENBQWlCLFlBQWpCOztBQUVBaUYsbUNBQU87O0FBRUhqRCxzQ0FBUWdELFNBRkw7O0FBSUhFLHdDQUFROztBQUpMLDZCQUFQO0FBUUgseUJBWkQsTUFZTzs7QUFFSHZKLHNDQUFRa0UsV0FBUixDQUFvQixZQUFwQjs7QUFFQW9GLG1DQUFPOztBQUVIakQsc0NBQU0rQzs7QUFGSCw2QkFBUDtBQU1IO0FBRUoscUJBNUJELEVBNEJHLElBNUJIOztBQThCQW5GLCtCQUFXLFlBQU07O0FBRWJqRSxrQ0FBUXFFLFFBQVIsQ0FBaUIsVUFBakI7O0FBRUE4RSxnQ0FBUSxDQUFSO0FBRUgscUJBTkQsRUFNRyxJQU5IO0FBUUg7O0FBSUQ5RixrQkFBRUMsY0FBRjtBQUVILGFBMUREO0FBNERILFNBaElJOztBQWtJTDs7QUFFQWYscUJBQWEsdUJBQVc7O0FBRXBCLGdCQUFJaUgsT0FBT3RKLFVBQVVlLElBQVYsQ0FBZSxrQkFBZixDQUFYOztBQUVBLGdCQUFJd0ksTUFBTyxJQUFYOztBQUlBLGdCQUFJLENBQUNELEtBQUt2SSxJQUFMLENBQVUscUJBQVYsRUFBaUNzQyxNQUF0QyxFQUE4Qzs7QUFFMUNpRyxxQkFBS3ZJLElBQUwsQ0FBVSxxQkFBVixFQUFpQ21FLEdBQWpDLENBQXFDLGdCQUFyQyxFQUF1RCxNQUF2RDtBQUVIOztBQUlEOztBQUVBLGdCQUFJc0UsVUFBVSxTQUFWQSxPQUFVLEdBQVc7QUFBQTs7QUFFckIxSixrQkFBRSxJQUFGLEVBRUtrRSxXQUZMLENBRWlCLGlCQUZqQixFQUlLRyxRQUpMLENBSWMsaUJBSmQ7O0FBTUFtRixxQkFBS0csR0FBTCxDQUVJLGtEQUZKLEVBSUlELE9BSko7O0FBUUF6RiwyQkFBVyxZQUFNOztBQUViakUsOEJBQVFrRSxXQUFSLENBQW9CLGlCQUFwQjtBQUVILGlCQUpELEVBSUcsSUFKSDtBQU1ILGFBdEJEOztBQTBCQTs7QUFFQSxxQkFBUzBGLGdCQUFULENBQTBCQyxFQUExQixFQUE4Qjs7QUFFMUJBLG1CQUFHekcsRUFBSCxDQUVJLGtEQUZKLEVBSUlzRyxPQUpKOztBQVFBekYsMkJBQVcsWUFBTTs7QUFFYjRGLHVCQUFHM0YsV0FBSCxDQUFlLGlCQUFmO0FBRUgsaUJBSkQsRUFJRyxJQUpIO0FBTUg7O0FBSUQsZ0JBQUlsRSxFQUFFQyxNQUFGLEVBQVU2QyxLQUFWLEtBQW9CLEdBQXhCLEVBQTZCOztBQUV6QixvQkFBSSxDQUFDMkcsR0FBTCxFQUFVOztBQUVOO0FBRUg7O0FBSUR2SiwwQkFFS2tELEVBRkwsQ0FFUSxZQUZSLEVBRXNCLGtCQUZ0QixFQUUwQyxZQUFXOztBQUU3Q3FHLDBCQUFNLEtBQU47O0FBRUF6SixzQkFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLGlCQUFqQjtBQUVILGlCQVJMLEVBVUtqQixFQVZMLENBVVEsWUFWUixFQVVzQixrQkFWdEIsRUFVMENzRyxPQVYxQztBQVlILGFBdEJELE1Bc0JPOztBQUVIeEosMEJBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixrQkFBdEIsRUFBMEMsWUFBVzs7QUFFakQsd0JBQUlwRCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxxQkFBYixFQUFvQ3NDLE1BQXhDLEVBQWdEOztBQUU1Q3ZELDBCQUFFLElBQUYsRUFFS3FFLFFBRkwsQ0FFYyxpQkFGZCxFQUlLZSxHQUpMLENBSVMsU0FKVCxFQUlvQixJQUpwQjs7QUFNQTdFLGlDQUFTOEQsUUFBVCxDQUFrQixZQUFsQjtBQUVILHFCQVZELE1BVU87O0FBRUgsNEJBQUl5RixRQUFROUosRUFBRSxJQUFGLEVBRVBpQixJQUZPLENBRUYscUJBRkUsRUFJUCtFLEdBSk8sQ0FJSCxVQUpHLENBQVo7O0FBTUE4RCw4QkFBTUMsT0FBTixDQUFjLE9BQWQ7QUFFSDtBQUVKLGlCQXhCRDs7QUE0QkE3SiwwQkFBVWtELEVBQVYsQ0FFSSxPQUZKLEVBSUksc0NBSkosRUFNSSxVQUFTQyxDQUFULEVBQVk7O0FBRVJtRyx5QkFBS3RGLFdBQUwsQ0FBaUIsaUJBQWpCLEVBQW9DTSxVQUFwQyxDQUErQyxPQUEvQzs7QUFFQW9GLHFDQUFpQjVKLEVBQUUsSUFBRixDQUFqQjs7QUFFQU8sNkJBQVMyRCxXQUFULENBQXFCLFlBQXJCOztBQUVBYixzQkFBRW9GLGVBQUY7QUFFSCxpQkFoQkw7O0FBc0JBOztBQUVBdkksMEJBQVVrRCxFQUFWLENBQWEsa0JBQWIsRUFBaUMsVUFBakMsRUFBNkMsVUFBU0MsQ0FBVCxFQUFZOztBQUVyRG1HLHlCQUFLdEYsV0FBTCxDQUFpQixpQkFBakIsRUFBb0NHLFFBQXBDLENBRUksaUJBRko7O0FBTUFKLCtCQUFXLFlBQU07O0FBRWIxRCxpQ0FBUzJELFdBQVQsQ0FBcUIsWUFBckI7QUFFSCxxQkFKRCxFQUlHLEdBSkg7O0FBUUFELCtCQUFXLFlBQU07O0FBRWJ1Riw2QkFBS3RGLFdBQUwsQ0FBaUIsaUJBQWpCO0FBRUgscUJBSkQsRUFJRyxJQUpIO0FBTUgsaUJBdEJEO0FBd0JIOztBQUlEOztBQUVBbEUsY0FBRSxRQUFGLEVBQVlvRCxFQUFaLENBQWUsZUFBZixFQUFnQyxZQUFXOztBQUV2Q29HLHFCQUFLdEYsV0FBTCxDQUFpQixpQkFBakIsRUFBb0NHLFFBQXBDLENBQTZDLGlCQUE3Qzs7QUFFQTlELHlCQUFTaUUsVUFBVCxDQUFvQixPQUFwQjs7QUFFQVAsMkJBQVcsWUFBTTs7QUFFYnVGLHlCQUFLdEYsV0FBTCxDQUFpQixpQkFBakI7QUFFSCxpQkFKRCxFQUlHLElBSkg7QUFNSCxhQVpEO0FBY0gsU0E5VEk7O0FBZ1VMMUIsaUJBQVMsbUJBQVc7O0FBRWhCdEMsc0JBQVVlLElBQVYsQ0FBZSxhQUFmLEVBQThCbUMsRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVzs7QUFFakQsb0JBQUk0RyxVQUFVaEssRUFBRSxJQUFGLEVBQVE4RixJQUFSLENBQWEsbUJBQWIsQ0FBZDs7QUFFQSxvQkFBSXlELFNBQVV2SixFQUFFLElBQUYsRUFBUThGLElBQVIsQ0FBYSxXQUFiLENBQWQ7O0FBSUF3RCx1QkFBTzs7QUFFSGpELDBCQUFRMkQsT0FGTDs7QUFJSFQsNEJBQVFBOztBQUpMLGlCQUFQO0FBUUgsYUFoQkQ7QUFrQkgsU0FwVkk7O0FBc1ZMOztBQUVBbEgsa0JBQVUsb0JBQVc7O0FBRWpCckMsY0FBRSxZQUFGLEVBQWdCb0QsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsVUFBU0MsQ0FBVCxFQUFZOztBQUVwQ0Esa0JBQUVDLGNBQUY7O0FBRUF0RCxrQkFBRSxZQUFGLEVBQWdCaUssT0FBaEIsQ0FFSTs7QUFFSUMsK0JBQVc7O0FBRmYsaUJBRkosRUFRSSxHQVJKO0FBWUgsYUFoQkQ7QUFrQkgsU0E1V0k7O0FBOFdMOztBQUVBNUgsaUJBQVMsbUJBQVc7O0FBRWhCOztBQUVBdEMsY0FBRSxVQUFGLEVBQWNvRCxFQUFkLENBQWlCLE9BQWpCLEVBQTBCLFVBQVNDLENBQVQsRUFBWTs7QUFFbENBLGtCQUFFQyxjQUFGOztBQUVBRCxrQkFBRW9GLGVBQUY7O0FBSUEsb0JBQUkwQixlQUFlbkssRUFBRSxJQUFGLEVBQVE4RixJQUFSLENBQWEsTUFBYixDQUFuQjs7QUFFQSxvQkFBSXNFLGNBQWVwSyxFQUFFbUssWUFBRixFQUFnQnZCLE1BQWhCLEdBQXlCTSxHQUE1Qzs7QUFFQSxvQkFBSWxKLEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7O0FBRXpCOUMsc0JBQUUsWUFBRixFQUFnQmlLLE9BQWhCLENBRUk7O0FBRUlDLG1DQUFXRSxjQUFjLEVBQWQsR0FBbUI7O0FBRmxDLHFCQUZKLEVBUUksR0FSSjtBQVlILGlCQWRELE1BY087O0FBRUhwSyxzQkFBRSxZQUFGLEVBQWdCaUssT0FBaEIsQ0FFSTs7QUFFSUMsbUNBQVdFLGNBQWMsRUFBZCxHQUFtQjs7QUFGbEMscUJBRkosRUFRSSxHQVJKO0FBWUg7QUFFSixhQTFDRDtBQTRDSDs7QUFoYUksS0FsekJBOztBQXN0Q1QvSSxjQUFVOztBQUVOOztBQUVBRixjQUFNLGdCQUFXOztBQUViLGdCQUFJa0osWUFBWW5LLFVBQVVlLElBQVYsQ0FBZSxpQkFBZixDQUFoQjs7QUFJQSxnQkFBSW9KLFVBQVU5RyxNQUFkLEVBQXNCOztBQUVsQixvQkFBSXhELFFBQVErQyxLQUFSLE1BQW1CLEdBQXZCLEVBQTRCOztBQUV4QnVILDhCQUFVbkcsV0FBVixDQUFzQixvQkFBdEI7QUFFSDtBQUVKOztBQUlELGlCQUFLb0csTUFBTDs7QUFFQSxpQkFBS0MsUUFBTDtBQUVILFNBMUJLOztBQTRCTkQsZ0JBQVEsa0JBQVc7O0FBRWYsZ0JBQUl2SyxRQUFRK0MsS0FBUixNQUFtQixHQUF2QixFQUE0Qjs7QUFFeEIsb0JBQUl1SCxZQUFZbkssVUFBVWUsSUFBVixDQUVaLHdDQUZZLENBQWhCOztBQU1Bb0osMEJBQVV6RixJQUFWLENBQWUsWUFBVzs7QUFFdEIsd0JBQUk0RixZQUFZeEssRUFFWiwyRUFGWSxDQUFoQjs7QUFNQSx3QkFBSXlLLG1CQUFtQnpLLEVBRW5CLG9DQUZtQixDQUF2Qjs7QUFRQSx3QkFBSTBLLGdCQUFnQjFLLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLG9CQUFiLENBQXBCOztBQUlBdUosOEJBQVVHLFFBQVYsQ0FBbUJELGFBQW5COztBQUVBRCxxQ0FBaUJHLFdBQWpCLENBQTZCRixhQUE3Qjs7QUFFQUEsa0NBQWN6SixJQUFkLENBQW1CLG1CQUFuQixFQUF3QzRKLE1BQXhDO0FBRUgsaUJBMUJEO0FBNEJIO0FBRUosU0FwRUs7O0FBc0VOTixrQkFBVSxvQkFBVzs7QUFFakIsZ0JBQUlGLFlBQWVuSyxVQUFVZSxJQUFWLENBQWUsaUJBQWYsQ0FBbkI7O0FBRUEsZ0JBQUk2SixlQUFlNUssVUFBVWUsSUFBVixDQUFlLGtCQUFmLENBQW5COztBQUlBZixzQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGlCQUF0QixFQUF5QyxVQUFTQyxDQUFULEVBQVk7O0FBRWpELG9CQUFJMEgsU0FBUy9LLEVBQUVxRCxFQUFFMEgsTUFBSixDQUFiOztBQUVBLG9CQUFJQSxPQUFPM0csRUFBUCxDQUFVLHVCQUFWLENBQUosRUFBd0M7O0FBRXBDcEUsc0JBQUUsSUFBRixFQUFRa0UsV0FBUixDQUFvQixXQUFwQjs7QUFFQTRHLGlDQUFhMUUsTUFBYjtBQUVILGlCQU5ELE1BTU8sSUFBSTJFLE9BQU9oRyxPQUFQLENBQWUsb0JBQWYsRUFBcUN4QixNQUF6QyxFQUFpRDs7QUFFcERGLHNCQUFFb0YsZUFBRjtBQUVILGlCQUpNLE1BSUE7O0FBRUgsd0JBQUl6SSxFQUFFLElBQUYsRUFBUXNFLFFBQVIsQ0FBaUIsV0FBakIsQ0FBSixFQUFtQzs7QUFFL0J0RSwwQkFBRSxJQUFGLEVBQVFrRSxXQUFSLENBQW9CLFdBQXBCOztBQUVBNEcscUNBQWExRSxNQUFiO0FBRUgscUJBTkQsTUFNTzs7QUFFSGlFLGtDQUFVbkcsV0FBVixDQUFzQixXQUF0Qjs7QUFFQWxFLDBCQUFFLElBQUYsRUFBUWdMLFdBQVIsQ0FBb0IsV0FBcEI7O0FBSUEsNEJBQUloTCxFQUFFLElBQUYsRUFBUXNFLFFBQVIsQ0FBaUIsd0JBQWpCLENBQUosRUFBZ0Q7O0FBRTVDd0cseUNBQWEzRSxPQUFiO0FBRUg7QUFFSjtBQUVKOztBQUVEOUMsa0JBQUVvRixlQUFGO0FBRUgsYUExQ0Q7O0FBOENBdkksc0JBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixVQUFTQyxDQUFULEVBQVk7O0FBRTlCLG9CQUFJckQsRUFBRXFELEVBQUUwSCxNQUFKLEVBQVloRyxPQUFaLENBQW9CLGlCQUFwQixFQUF1Q3hCLE1BQTNDLEVBQW1EOztBQUVuRDhHLDBCQUFVbkcsV0FBVixDQUFzQixXQUF0QjtBQUVILGFBTkQ7O0FBVUFoRSxzQkFBVWtELEVBQVYsQ0FFSSxPQUZKLEVBSUksbUNBSkosRUFNSSxZQUFXOztBQUVQaUgsMEJBQVVuRyxXQUFWLENBQXNCLFlBQXRCOztBQUVBNEcsNkJBQWExRSxNQUFiO0FBRUgsYUFaTDs7QUFrQkFsRyxzQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHdCQUF0QixFQUFnRCxVQUFTQyxDQUFULEVBQVk7O0FBRXhEQSxrQkFBRW9GLGVBQUY7O0FBRUF6SSxrQkFBRSxJQUFGLEVBRUsrRSxPQUZMLENBRWEsaUJBRmIsRUFJS2IsV0FKTCxDQUlpQixXQUpqQjs7QUFNQTRHLDZCQUFhMUUsTUFBYjtBQUVILGFBWkQ7QUFjSDs7QUF0S0ssS0F0dENEOztBQWc0Q1RwRSxZQUFROztBQUVKYixjQUFNLGdCQUFXOztBQUViLGlCQUFLOEosV0FBTDs7QUFFQSxpQkFBS0MsU0FBTDs7QUFFQSxpQkFBS0MsWUFBTDtBQUVILFNBVkc7O0FBWUo7O0FBRUFELG1CQUFXLHFCQUFXOztBQUVsQixnQkFBSWxMLEVBQUUsZ0JBQUYsRUFBb0J1RCxNQUF4QixFQUFnQzs7QUFFNUJ2RCxrQkFBRSxnQkFBRixFQUFvQm9MLFNBQXBCLENBQThCOztBQUUxQkMsMEJBQU07O0FBRm9CLGlCQUE5QjtBQU1IOztBQUVELGdCQUFJckwsRUFBRSxlQUFGLEVBQW1CdUQsTUFBdkIsRUFBK0I7O0FBRTNCdkQsa0JBQUUsZUFBRixFQUFtQm9MLFNBQW5CLENBQTZCOztBQUV6QkMsMEJBQU07O0FBRm1CLGlCQUE3QjtBQU1IOztBQUVELGdCQUFJckwsRUFBRSxlQUFGLEVBQW1CdUQsTUFBdkIsRUFBK0I7O0FBRTNCdkQsa0JBQUUsZUFBRixFQUFtQm9MLFNBQW5CLENBQTZCOztBQUV6QkMsMEJBQU07O0FBRm1CLGlCQUE3QjtBQU1IOztBQUVELGdCQUFJckwsRUFBRSxlQUFGLEVBQW1CdUQsTUFBdkIsRUFBK0I7O0FBRTNCdkQsa0JBQUUsZUFBRixFQUFtQm9MLFNBQW5CLENBQTZCOztBQUV6QkMsMEJBQU07O0FBRm1CLGlCQUE3QjtBQU1IOztBQUVELGdCQUFJckwsRUFBRSxrQkFBRixFQUFzQnVELE1BQTFCLEVBQWtDOztBQUU5QnZELGtCQUFFLGtCQUFGLEVBQXNCb0wsU0FBdEIsQ0FBZ0M7O0FBRTVCQywwQkFBTTs7QUFGc0IsaUJBQWhDO0FBTUg7O0FBRUQsZ0JBQUlyTCxFQUFFLGdCQUFGLEVBQW9CdUQsTUFBeEIsRUFBZ0M7O0FBRTVCdkQsa0JBQUUsZ0JBQUYsRUFBb0JvTCxTQUFwQixDQUE4Qjs7QUFFMUJDLDBCQUVJLGlFQUpzQjs7QUFNMUJDLDRCQUFlLEtBTlc7O0FBUTFCQyxtQ0FBZSx1QkFBU0MsV0FBVCxFQUFzQkMsSUFBdEIsRUFBNEI7O0FBRXZDRCxzQ0FBY0EsWUFBWUUsV0FBWixFQUFkOztBQUVBLCtCQUFPRixZQUFZRyxPQUFaLENBQW9CLFNBQXBCLEVBQStCLEVBQS9CLENBQVA7QUFFSCxxQkFkeUI7O0FBZ0IxQkMsaUNBQWE7O0FBRVQsNkJBQUs7O0FBRURDLHVDQUFhLGdDQUZaOztBQUlEQyx5Q0FBYSxDQUpaOztBQU1EQyxvQ0FBYTs7QUFOWjs7QUFGSTs7QUFoQmEsaUJBQTlCO0FBZ0NIO0FBRUosU0F0R0c7O0FBd0dKZCxxQkFBYSx1QkFBVzs7QUFFcEJqTCxjQUFFLGlCQUFGLEVBQXFCb0QsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVzs7QUFFeEMsb0JBQUk0SSxRQUFRaE0sRUFBRSxJQUFGLEVBRVB1RSxNQUZPLEdBSVB0RCxJQUpPLENBSUYsT0FKRSxDQUFaOztBQU1BK0ssc0JBQU1qSyxNQUFOOztBQUVBNUIseUJBQVM4TCxXQUFULENBQXFCLE1BQXJCO0FBRUgsYUFaRDs7QUFnQkFqTSxjQUFFLGVBQUYsRUFBbUJvRCxFQUFuQixDQUFzQixPQUF0QixFQUErQixZQUFXOztBQUV0QyxvQkFBSTRJLFFBQVFoTSxFQUFFLElBQUYsRUFFUHVFLE1BRk8sR0FJUHRELElBSk8sQ0FJRixtQkFKRSxDQUFaOztBQU1BK0ssc0JBQU0zRixJQUFOOztBQUVBbEcseUJBQVM4TCxXQUFULENBQXFCLE1BQXJCO0FBRUgsYUFaRDs7QUFnQkE7O0FBRUFqTSxjQUFFLHVCQUFGLEVBQTJCb0QsRUFBM0IsQ0FBOEIsT0FBOUIsRUFBdUMsWUFBVzs7QUFFOUNwRCxrQkFBRSxJQUFGLEVBQVErQixNQUFSO0FBRUgsYUFKRDs7QUFRQTs7QUFFQS9CLGNBQUUsNkJBQUYsRUFBaUNvRCxFQUFqQyxDQUFvQyxPQUFwQyxFQUE2QyxZQUFXOztBQUVwRHBELGtCQUFFLElBQUYsRUFBUW9GLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCOztBQUVBcEYsa0JBQUUsSUFBRixFQUVLa00sSUFGTCxHQUlLOUcsR0FKTCxDQUlTLFNBSlQsRUFJb0IsT0FKcEI7O0FBTUFwRixrQkFBRSxJQUFGLEVBRUt1RSxNQUZMLEdBSUt0RCxJQUpMLENBSVUsd0JBSlYsRUFNSzZFLElBTkwsQ0FNVSxNQU5WLEVBTWtCLE1BTmxCO0FBUUgsYUFsQkQ7O0FBc0JBOztBQUVBOUYsY0FBRSw2QkFBRixFQUFpQ29ELEVBQWpDLENBQW9DLE9BQXBDLEVBQTZDLFlBQVc7O0FBRXBEcEQsa0JBQUUsSUFBRixFQUFRb0YsR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7O0FBRUFwRixrQkFBRSxJQUFGLEVBRUttTSxJQUZMLEdBSUsvRyxHQUpMLENBSVMsU0FKVCxFQUlvQixPQUpwQjs7QUFNQXBGLGtCQUFFLElBQUYsRUFFS3VFLE1BRkwsR0FJS3RELElBSkwsQ0FJVSxvQkFKVixFQU1LNkUsSUFOTCxDQU1VLE1BTlYsRUFNa0IsVUFObEI7QUFRSCxhQWxCRDs7QUFzQkE7O0FBRUEsZ0JBQUk5RixFQUFFLGdCQUFGLEVBQW9CdUQsTUFBeEIsRUFBZ0M7O0FBRTVCLG9CQUFJNkksWUFBaUJwTSxFQUFFLGdCQUFGLENBQXJCOztBQUVBLG9CQUFJcU0saUJBQWlCRCxVQUFVbkwsSUFBVixDQUFlLG9CQUFmLENBQXJCOztBQUVBLG9CQUFJcUwsZUFBaUJGLFVBQVVuTCxJQUFWLENBQWUsa0JBQWYsQ0FBckI7O0FBSUFxTCw2QkFBYWxKLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsWUFBVzs7QUFFaEMsd0JBQUlpSixpQkFBaUJyTSxFQUFFLElBQUYsRUFFaEIrRSxPQUZnQixDQUVSLGdCQUZRLEVBSWhCOUQsSUFKZ0IsQ0FJWCxvQkFKVyxDQUFyQjs7QUFNQSx3QkFBSXNMLGdCQUFnQnZNLEVBQUUsSUFBRixFQUVmK0UsT0FGZSxDQUVQLGdCQUZPLEVBSWY5RCxJQUplLENBSVYsbUJBSlUsQ0FBcEI7O0FBUUFqQixzQkFBRSxJQUFGLEVBQVFpRyxJQUFSOztBQUVBc0csa0NBQWN0RyxJQUFkOztBQUVBb0csbUNBQWV0RyxJQUFmLEdBQXNCaEUsTUFBdEI7QUFFSCxpQkF0QkQ7O0FBMEJBc0ssK0JBRUtHLElBRkwsQ0FFVSxZQUFXOztBQUViLHdCQUFJRCxnQkFBZ0J2TSxFQUFFLElBQUYsRUFFZitFLE9BRmUsQ0FFUCxnQkFGTyxFQUlmOUQsSUFKZSxDQUlWLG1CQUpVLENBQXBCOztBQVFBLHdCQUFJakIsRUFBRXlNLElBQUYsQ0FBTyxLQUFLQyxLQUFaLEtBQXNCLEVBQTFCLEVBQThCOztBQUUxQiw2QkFBS0EsS0FBTCxHQUFhLEtBQUtDLFlBQUwsR0FFUCxLQUFLQSxZQUZFLEdBSU4sRUFKUDtBQU1ILHFCQVJELE1BUU87O0FBRUhKLHNDQUFjaEUsSUFBZCxDQUFtQixLQUFLbUUsS0FBeEI7QUFFSDs7QUFJRDFNLHNCQUFFLElBQUYsRUFBUWlHLElBQVI7O0FBRUFxRyxpQ0FBYTlILFVBQWIsQ0FBd0IsT0FBeEI7O0FBRUErSCxrQ0FBY3hHLElBQWQ7QUFFSCxpQkFsQ0wsRUFvQ0s2RyxRQXBDTCxDQW9DYyxVQUFTNUUsS0FBVCxFQUFnQjs7QUFFdEIsd0JBQUl1RSxnQkFBZ0J2TSxFQUFFLElBQUYsRUFFZitFLE9BRmUsQ0FFUCxnQkFGTyxFQUlmOUQsSUFKZSxDQUlWLG1CQUpVLENBQXBCOztBQVFBLHdCQUFJK0csTUFBTTZFLE9BQU4sSUFBaUIsSUFBckIsRUFBMkI7O0FBRXZCLDRCQUFJN00sRUFBRXlNLElBQUYsQ0FBTyxLQUFLQyxLQUFaLEtBQXNCLEVBQTFCLEVBQThCOztBQUUxQixpQ0FBS0EsS0FBTCxHQUFhLEtBQUtDLFlBQUwsR0FFUCxLQUFLQSxZQUZFLEdBSU4sRUFKUDtBQU1ILHlCQVJELE1BUU87O0FBRUhKLDBDQUFjaEUsSUFBZCxDQUFtQixLQUFLbUUsS0FBeEI7QUFFSDs7QUFJRDFNLDBCQUFFLElBQUYsRUFBUWlHLElBQVI7O0FBRUFxRyxxQ0FBYTlILFVBQWIsQ0FBd0IsT0FBeEI7O0FBRUErSCxzQ0FBY3hHLElBQWQ7QUFFSDtBQUVKLGlCQXhFTDtBQTBFSDs7QUFJRCxnQkFBSS9GLEVBQUUsY0FBRixFQUFrQnVELE1BQXRCLEVBQThCOztBQUUxQnZELGtCQUFFLGNBQUYsRUFFS29ELEVBRkwsQ0FFUSxPQUZSLEVBRWlCLFlBQVc7O0FBRXBCLHdCQUFJMEIsVUFBVTlFLEVBQUUsSUFBRixFQUFRdUUsTUFBUixDQUFlLHFCQUFmLENBQWQ7O0FBSUFPLDRCQUFRVCxRQUFSLENBQWlCLFVBQWpCO0FBRUgsaUJBVkwsRUFZS2pCLEVBWkwsQ0FZUSxNQVpSLEVBWWdCLFlBQVc7O0FBRW5CLHdCQUFJMEIsVUFBVTlFLEVBQUUsSUFBRixFQUFRdUUsTUFBUixDQUFlLHFCQUFmLENBQWQ7O0FBSUEsd0JBQUl2RSxFQUFFLElBQUYsRUFBUTZGLEdBQVIsT0FBa0IsRUFBdEIsRUFBMEI7O0FBRXRCZixnQ0FBUVosV0FBUixDQUFvQixVQUFwQjtBQUVIO0FBRUosaUJBeEJMO0FBMEJIOztBQUlEaEUsc0JBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixrQkFBdEIsRUFBMEMsWUFBVzs7QUFFakQsb0JBQUlwRCxFQUFFLElBQUYsRUFBUXNFLFFBQVIsQ0FBaUIsVUFBakIsQ0FBSixFQUFrQzs7QUFFOUI7QUFFSDs7QUFFRHRFLGtCQUFFLElBQUYsRUFFS3VFLE1BRkwsR0FJS0wsV0FKTCxDQUlpQiw2QkFKakIsRUFNSzRJLEdBTkwsR0FRSzdHLElBUkw7QUFVSCxhQWxCRDtBQW9CSCxTQTVXRzs7QUFnWEprRixzQkFBYyx3QkFBVzs7QUFFckIsZ0JBQUk0QixVQUFVL00sRUFBRSxtQkFBRixDQUFkOztBQUlBK00sb0JBQVFuSSxJQUFSLENBQWEsWUFBVzs7QUFFcEIsb0JBQUlvSSxlQUFlaE4sRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsdUJBQWIsQ0FBbkI7O0FBRUEsb0JBQUlnTSxjQUFlak4sRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsd0JBQWIsQ0FBbkI7O0FBRUEsb0JBQUl1SixZQUFleEssRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsMEJBQWIsQ0FBbkI7O0FBSUErTCw2QkFBYTVKLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsWUFBVzs7QUFFaENwRCxzQkFBRSxJQUFGLEVBRUsrRSxPQUZMLENBRWEsbUJBRmIsRUFJS1YsUUFKTCxDQUljLFdBSmQ7O0FBTUFyRSxzQkFBRSxZQUFGLEVBQWdCaUssT0FBaEIsQ0FBd0I7O0FBRXBCQyxtQ0FBVzs7QUFGUyxxQkFBeEI7QUFNSCxpQkFkRDs7QUFrQkFNLDBCQUFVcEgsRUFBVixDQUFhLDRCQUFiLEVBQTJDLFVBQVNDLENBQVQsRUFBWTs7QUFFbkRBLHNCQUFFQyxjQUFGOztBQUVBdEQsc0JBQUUsSUFBRixFQUVLK0UsT0FGTCxDQUVhLG1CQUZiLEVBSUtiLFdBSkwsQ0FJaUIsV0FKakI7O0FBTUE4SSxpQ0FBYVIsSUFBYjtBQUVILGlCQVpEOztBQWdCQXhNLGtCQUFFRyxRQUFGLEVBQVlpRCxFQUFaLENBRUksNEJBRkosRUFJSSx3QkFKSixFQU1JLFlBQVc7O0FBRVA2SixnQ0FBWS9JLFdBQVosQ0FBd0IsYUFBeEI7O0FBRUFsRSxzQkFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLGFBQWpCO0FBRUgsaUJBWkw7QUFnQkgsYUE1REQ7QUE4REg7O0FBcGJHLEtBaDRDQzs7QUF3ekRUdEMsWUFBUTs7QUFFSjs7QUFFQVosY0FBTSxnQkFBVzs7QUFFYm5CLGNBQUUsWUFBRixFQUFnQmtOLE9BQWhCOztBQUlBbE4sY0FBRSxzQkFBRixFQUEwQmtOLE9BQTFCLENBQWtDOztBQUU5QkMsc0JBQU07O0FBRndCLGFBQWxDOztBQVFBbk4sY0FBRSw2QkFBRixFQUFpQ2tOLE9BQWpDLENBQXlDOztBQUVyQ0UsZ0NBQWdCQzs7QUFGcUIsYUFBekM7O0FBUUFyTixjQUFFLGtCQUFGLEVBQXNCa04sT0FBdEIsQ0FBOEI7O0FBRTFCSSxtQ0FBeUJDLE9BRkM7O0FBSTFCSCxnQ0FBeUJHLE9BSkM7O0FBTTFCQyx5Q0FBeUIsQ0FBQzs7QUFOQSxhQUE5Qjs7QUFZQXhOLGNBQUUsc0JBQUYsRUFBMEJrTixPQUExQixDQUFrQzs7QUFFOUJJLG1DQUFtQkcsWUFGVzs7QUFJOUJMLGdDQUFtQks7O0FBSlcsYUFBbEM7O0FBVUF6TixjQUFFLHNCQUFGLEVBQTBCa04sT0FBMUIsQ0FBa0M7O0FBRTlCTSx5Q0FBeUIsQ0FBQzs7QUFGSSxhQUFsQzs7QUFRQXhOLGNBQUUsaUJBQUYsRUFBcUJrTixPQUFyQixDQUE2Qjs7QUFFekJNLHlDQUF5QixDQUFDLENBRkQ7O0FBSXpCRSw0QkFBeUI7O0FBSkEsYUFBN0I7O0FBVUE7O0FBRUEscUJBQVNMLFVBQVQsQ0FBb0JNLEdBQXBCLEVBQXlCOztBQUVyQixvQkFBSSxDQUFDQSxJQUFJQyxFQUFULEVBQWE7O0FBRVQsMkJBQU9ELElBQUl0SCxJQUFYO0FBRUg7O0FBRUQsb0JBQUl3SCxXQUFXN04sRUFBRTJOLElBQUlHLE9BQU4sRUFBZTdJLElBQWYsQ0FBb0IsT0FBcEIsQ0FBZjs7QUFFQSxvQkFBSSxDQUFDNEksUUFBTCxFQUFlOztBQUVYLDJCQUFPRixJQUFJdEgsSUFBWDtBQUVILGlCQUpELE1BSU87O0FBRUgsd0JBQUkwSCxPQUFPL04sRUFFUCx5Q0FFSTZOLFFBRkosR0FJSSxJQUpKLEdBTUk3TixFQUFFMk4sSUFBSUcsT0FBTixFQUFlekgsSUFBZixFQU5KLEdBUUksU0FWRyxDQUFYOztBQWNBLDJCQUFPMEgsSUFBUDtBQUVIO0FBRUo7O0FBSUQ7O0FBRUEscUJBQVNSLE9BQVQsQ0FBaUJTLElBQWpCLEVBQXVCOztBQUVuQixvQkFBSUMsaUJBQWlCRCxLQUFLRixPQUExQjs7QUFFQSx1QkFBTzlOLEVBRUgsa0NBRUksR0FGSixHQUlJQSxFQUFFaU8sY0FBRixFQUFrQmhKLElBQWxCLENBQXVCLE1BQXZCLENBSkosR0FNSSxTQU5KLEdBUUkrSSxLQUFLM0gsSUFSVCxHQVVJLFNBWkQsQ0FBUDtBQWdCSDs7QUFJRDs7QUFFQSxxQkFBU29ILFlBQVQsQ0FBc0JFLEdBQXRCLEVBQTJCOztBQUV2QixvQkFBSU8sZUFBZ0JsTyxFQUFFMk4sSUFBSUcsT0FBTixFQUFlN0ksSUFBZixDQUFvQixNQUFwQixDQUFwQjs7QUFFQSxvQkFBSWtKLGdCQUFnQm5PLEVBQUUyTixJQUFJRyxPQUFOLEVBQWU3SSxJQUFmLENBQW9CLE9BQXBCLENBQXBCOztBQUlBLHVCQUFPakYsRUFFSCx1Q0FFSSxRQUZKLEdBSUkyTixJQUFJdEgsSUFKUixHQU1JLFNBTkosR0FRSSxRQVJKLEdBVUk2SCxZQVZKLEdBWUksU0FaSixHQWNJLFFBZEosR0FnQklDLGFBaEJKLEdBa0JJLFNBbEJKLEdBb0JJLFFBdEJELENBQVA7QUEwQkg7O0FBRURqTyxzQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHdCQUF0QixFQUFnRCxVQUFTQyxDQUFULEVBQVk7O0FBRXhEQSxrQkFBRW9GLGVBQUY7QUFFSCxhQUpEOztBQVFBLGdCQUFJMkYsZ0JBQWdCcE8sRUFBRSxtQkFBRixDQUFwQjs7QUFFQSxnQkFBSW9PLGNBQWM3SyxNQUFsQixFQUEwQjs7QUFFdEIsb0JBQUk2SyxhQUFKLEVBQW1COztBQUVmLHdCQUFJcE8sRUFBRUMsTUFBRixFQUFVNkMsS0FBVixNQUFxQixHQUF6QixFQUE4Qjs7QUFFMUJzTCxzQ0FBY2xCLE9BQWQsQ0FBc0I7O0FBRWxCTSxxREFBeUIsQ0FBQzs7QUFGUix5QkFBdEI7QUFNSCxxQkFSRCxNQVFPOztBQUVIWSxzQ0FBY3hKLElBQWQsQ0FBbUIsWUFBVzs7QUFFMUIsZ0NBQUl5SixjQUFlck8sRUFBRSxJQUFGLEVBQVFpRixJQUFSLENBQWEsYUFBYixDQUFuQjs7QUFFQSxnQ0FBSXFKLGVBQWV0TyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FFZixvQkFGZSxDQUFuQjs7QUFRQSxnQ0FBSXFOLGFBQWFqSSxJQUFiLE1BQXVCLEVBQTNCLEVBQStCOztBQUUzQmlJLDZDQUVLekksR0FGTCxDQUVTd0ksV0FGVCxFQUlLaEksSUFKTCxDQUlVZ0ksV0FKVixFQU1LdkksSUFOTCxDQU1VLFVBTlYsRUFNc0IsVUFOdEIsRUFRS0EsSUFSTCxDQVFVLFVBUlYsRUFRc0IsVUFSdEIsRUFVS3RCLFVBVkwsQ0FVZ0Isa0JBVmhCO0FBWUg7O0FBSUR4RSw4QkFBRSxJQUFGLEVBQVF1TyxJQUFSLENBQWEsMkJBQWI7QUFFSCx5QkFoQ0Q7QUFrQ0g7QUFFSjtBQUVKOztBQUlELGlCQUFLQyxXQUFMOztBQUVBLGlCQUFLQyxRQUFMOztBQUVBLGlCQUFLQyxRQUFMOztBQUVBLGlCQUFLQyxXQUFMOztBQUVBLGlCQUFLQyxTQUFMOztBQUVBLGlCQUFLekQsWUFBTDtBQUVILFNBeFBHOztBQTBQSnFELHFCQUFhLHVCQUFXOztBQUVwQixnQkFBSUssZUFBZTdPLEVBQUUsbUJBQUYsQ0FBbkI7O0FBSUE2Tyx5QkFBYWpLLElBQWIsQ0FBa0IsWUFBVzs7QUFFekIsb0JBQUlFLFVBQVU5RSxFQUFFLElBQUYsRUFBUStFLE9BQVIsQ0FBZ0IsZUFBaEIsQ0FBZDs7QUFJQSxvQkFBSS9FLEVBQUUsSUFBRixFQUFRc0UsUUFBUixDQUFpQixnQkFBakIsQ0FBSixFQUF3Qzs7QUFFcEN0RSxzQkFBRSxJQUFGLEVBQVFrTixPQUFSLENBQWdCOztBQUVaSSwyQ0FBbUJ3QixLQUZQOztBQUlaMUIsd0NBQW1CMEIsS0FKUDs7QUFNWkMsd0NBQW1Caks7O0FBTlAscUJBQWhCO0FBVUgsaUJBWkQsTUFZTzs7QUFFSDlFLHNCQUFFLElBQUYsRUFBUWtOLE9BQVIsQ0FBZ0I7O0FBRVpNLGlEQUF5QixDQUFDLENBRmQ7O0FBSVpGLDJDQUF5QndCLEtBSmI7O0FBTVoxQix3Q0FBeUIwQixLQU5iOztBQVFaQyx3Q0FBeUJqSzs7QUFSYixxQkFBaEI7QUFZSDs7QUFJRDs7QUFFQSx5QkFBU2dLLEtBQVQsQ0FBZUUsS0FBZixFQUFzQjs7QUFFbEIsd0JBQUlDLGtCQUFrQkQsTUFBTWxCLE9BQTVCOztBQUVBLHdCQUFJb0IsWUFBa0JsUCxFQUFFaVAsZUFBRixFQUFtQmhLLElBQW5CLENBQXdCLE9BQXhCLENBQXRCOztBQUlBLHdCQUFJK0osTUFBTTNJLElBQU4sQ0FBVzlDLE1BQWYsRUFBdUI7O0FBRW5CdUIsZ0NBQVFaLFdBQVIsQ0FBb0IsdUJBQXBCOztBQUlBLCtCQUFPbEUsZ0dBRXlGa1AsU0FGekYscUJBSUNGLE1BQU0zSSxJQUpQLGlCQUFQO0FBVUgscUJBaEJELE1BZ0JPOztBQUVIdkIsZ0NBQVFULFFBQVIsQ0FBaUIsdUJBQWpCOztBQUlBLCtCQUFPckUsZ0dBRXlGa1AsU0FGekYsd0JBQVA7QUFNSDtBQUVKO0FBRUosYUE5RUQ7QUFnRkgsU0FoVkc7O0FBa1ZKVCxrQkFBVSxvQkFBVzs7QUFFakJ2TyxzQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGNBQXRCLEVBQXNDLFlBQVc7O0FBRTdDcEQsa0JBQUUsSUFBRixFQUFRaUcsSUFBUjs7QUFFQWpHLGtCQUFFLElBQUYsRUFFS21NLElBRkwsR0FJS3BHLElBSkw7QUFNSCxhQVZEO0FBWUgsU0FoV0c7O0FBa1dKMkksa0JBQVUsb0JBQVc7O0FBRWpCLGdCQUFJUyxjQUFjblAsRUFBRSx3QkFBRixDQUFsQjs7QUFJQW1QLHdCQUFZL0wsRUFBWixDQUFlLHFCQUFmLEVBQXNDLFlBQVc7O0FBRTdDcEQsa0JBQUUsSUFBRixFQUFRb0QsRUFBUixDQUFXLGlCQUFYLEVBQThCLFVBQVNDLENBQVQsRUFBWTs7QUFFdENBLHNCQUFFQyxjQUFGO0FBRUgsaUJBSkQ7QUFNSCxhQVJEOztBQVlBNkwsd0JBQVkvTCxFQUFaLENBQWUsa0JBQWYsRUFBbUMsWUFBVztBQUFBOztBQUUxQ2EsMkJBQVcsWUFBTTs7QUFFYmpFLDhCQUFRMkosR0FBUixDQUFZLGlCQUFaO0FBRUgsaUJBSkQsRUFJRyxHQUpIO0FBTUgsYUFSRDs7QUFZQXdGLHdCQUFZL0wsRUFBWixDQUFlLFFBQWYsRUFBeUIsWUFBVzs7QUFFaEMsb0JBRUlwRCxFQUFFLElBQUYsRUFBUTZGLEdBQVIsTUFBaUIsRUFBakIsSUFFQTdGLEVBQUUsSUFBRixFQUFROEYsSUFBUixDQUFhLFdBQWIsTUFBOEIsTUFKbEMsRUFNRTs7QUFFRTlGLHNCQUFFLGNBQUYsRUFBa0IrRixJQUFsQjs7QUFFQS9GLHNCQUFFLGNBQUYsRUFFS21NLElBRkwsR0FJS2xHLElBSkw7QUFNSDtBQUVKLGFBcEJEO0FBc0JILFNBdFpHOztBQXdaSjBJLHFCQUFhLHVCQUFXOztBQUVwQixnQkFBSVMsY0FBY2xQLFVBQVVlLElBQVYsQ0FBZSxpQkFBZixDQUFsQjs7QUFJQW1PLHdCQUFZaE0sRUFBWixDQUFlLFFBQWYsRUFBeUIsWUFBVzs7QUFFaENwRCxrQkFBRSxJQUFGLEVBRUtrTSxJQUZMLEdBSUtqTCxJQUpMLENBSVUsMkJBSlYsRUFNS29GLElBTkwsQ0FNVSxFQU5WLEVBUUs2QixNQVJMLENBUVkscUNBUlo7QUFVSCxhQVpEO0FBY0gsU0E1YUc7O0FBOGFKMEcsbUJBQVcscUJBQVc7O0FBRWxCOztBQUVBLHFCQUFTUyxtQkFBVCxDQUE2QjFCLEdBQTdCLEVBQWtDOztBQUU5QixvQkFBSTJCLFNBQVN0UCxFQUFFMk4sSUFBSUcsT0FBTixFQUFlakksR0FBZixFQUFiOztBQUlBLHVCQUFPN0YsRUFFSCx3Q0FBd0NzUCxNQUF4QyxHQUFpRCxTQUY5QyxDQUFQO0FBTUg7O0FBSUQ7O0FBRUEscUJBQVNDLGdCQUFULENBQTBCNUIsR0FBMUIsRUFBK0I7O0FBRTNCLG9CQUFJNkIsVUFBVXhQLEVBQUUyTixJQUFJRyxPQUFOLEVBQWU3SSxJQUFmLENBQW9CLFNBQXBCLENBQWQ7QUFBQSxvQkFFSXFLLFNBQVV0UCxFQUFFMk4sSUFBSUcsT0FBTixFQUFlakksR0FBZixFQUZkOztBQU1BLHVCQUFPN0YsRUFFSCx1Q0FFSSxRQUZKLEdBSUl3UCxPQUpKLEdBTUksU0FOSixHQVFJLFFBUkosR0FVSUYsTUFWSixHQVlJLFNBWkosR0FjSSxRQWhCRCxDQUFQO0FBb0JIOztBQUlELGdCQUFJRyxnQkFBZ0J2UCxVQUFVZSxJQUFWLENBQWUsc0JBQWYsQ0FBcEI7O0FBSUEsZ0JBQUl3TyxjQUFjbE0sTUFBbEIsRUFBMEI7O0FBRXRCa00sOEJBQWM3SyxJQUFkLENBQW1CLFlBQVc7O0FBRTFCLHdCQUFJbUksVUFBVS9NLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLGVBQWIsQ0FBZDs7QUFFQSx3QkFBSTZELFVBQVU5RSxFQUFFLElBQUYsRUFBUXVFLE1BQVIsRUFBZDs7QUFFQSx3QkFBSW1MLFNBQVUxUCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxrQkFBYixDQUFkOztBQUlBLHdCQUFJbEIsUUFBUStDLEtBQVIsTUFBbUIsR0FBdkIsRUFBNEI7O0FBRXhCaUssZ0NBRUtHLE9BRkwsQ0FFYTs7QUFFTEUsNENBQW1CbUMsZ0JBRmQ7O0FBSUxqQywrQ0FBbUIrQixtQkFKZDs7QUFNTE4sNENBQW1CL08sRUFBRSxJQUFGOztBQU5kLHlCQUZiLEVBWUtvRCxFQVpMLENBWVEsZ0JBWlIsRUFZMEIsWUFBVzs7QUFFN0JwRCw4QkFBRSxJQUFGLEVBRUt1RSxNQUZMLEdBSUtBLE1BSkwsR0FNS3RELElBTkwsQ0FNVSxPQU5WLEVBUUswTyxLQVJMO0FBVUgseUJBeEJMO0FBMEJILHFCQTVCRCxNQTRCTzs7QUFFSDdLLGdDQUVLVCxRQUZMLENBRWMsV0FGZCxFQUlLNkQsTUFKTCxDQU1RLDRDQU5SOztBQVlBLDRCQUFJMEgsZUFBZTlLLFFBQVE3RCxJQUFSLENBQWEsUUFBYixDQUFuQjs7QUFFQSw0QkFBSTRPLGNBQWUvSyxRQUFRN0QsSUFBUixDQUVmLHlCQUZlLENBQW5COztBQVFBNE8sb0NBQVl4SixJQUFaLENBQWlCdUosYUFBYUUsRUFBYixDQUFnQixDQUFoQixFQUFtQmpLLEdBQW5CLEVBQWpCOztBQUlBa0gsZ0NBQVFnRCxNQUFSLENBQWUsWUFBVzs7QUFFdEIsZ0NBQUlDLFVBQVVoUSxFQUFFLElBQUYsRUFBUSxDQUFSLEVBQVdpUSxhQUF6Qjs7QUFFQUosd0NBQVl4SixJQUFaLENBQWlCdUosYUFBYUUsRUFBYixDQUFnQkUsT0FBaEIsRUFBeUJuSyxHQUF6QixFQUFqQjs7QUFJQTdGLDhCQUFFLElBQUYsRUFFS3VFLE1BRkwsR0FJS0EsTUFKTCxHQU1LdEQsSUFOTCxDQU1VLE9BTlYsRUFRSzBPLEtBUkw7QUFVSCx5QkFsQkQ7QUFvQkg7O0FBSURELDJCQUFPdEUsU0FBUCxDQUFpQjs7QUFFYkMsOEJBQU07O0FBRk8scUJBQWpCOztBQVFBcUUsMkJBQU90TSxFQUFQLENBQVUsT0FBVixFQUFtQjhNLFFBQW5CLEVBQTZCOU0sRUFBN0IsQ0FBZ0MsTUFBaEMsRUFBd0MrTSxXQUF4Qzs7QUFFQXBELDRCQUVLM0osRUFGTCxDQUVRLGNBRlIsRUFFd0I4TSxRQUZ4QixFQUlLOU0sRUFKTCxDQUlRLGVBSlIsRUFJeUIrTSxXQUp6Qjs7QUFRQSw2QkFBU0QsUUFBVCxHQUFvQjs7QUFFaEJsUSwwQkFBRSxJQUFGLEVBRUsrRSxPQUZMLENBRWEsc0JBRmIsRUFJS1YsUUFKTCxDQUljLFVBSmQ7QUFNSDs7QUFJRCw2QkFBUzhMLFdBQVQsR0FBdUI7O0FBRW5CLDRCQUFJblEsRUFBRSxJQUFGLEVBQVE2RixHQUFSLE1BQWlCLEVBQXJCLEVBQXlCOztBQUVyQjdGLDhCQUFFLElBQUYsRUFFSytFLE9BRkwsQ0FFYSxzQkFGYixFQUlLYixXQUpMLENBSWlCLFVBSmpCO0FBTUg7QUFFSjtBQUVKLGlCQXRJRDtBQXdJSDtBQUVKLFNBcG5CRzs7QUFzbkJKaUgsc0JBQWMsd0JBQVc7O0FBRXJCLGdCQUFJNEIsVUFBVS9NLEVBQUUsbUJBQUYsQ0FBZDs7QUFJQStNLG9CQUFRbkksSUFBUixDQUFhLFlBQVc7O0FBRXBCLG9CQUFJb0ksZUFBZWhOLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHVCQUFiLENBQW5COztBQUVBLG9CQUFJZ00sY0FBZWpOLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHdCQUFiLENBQW5COztBQUVBLG9CQUFJdUosWUFBZXhLLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLDBCQUFiLENBQW5COztBQUlBK0wsNkJBQWE1SixFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFlBQVc7O0FBRWhDcEQsc0JBQUUsSUFBRixFQUVLK0UsT0FGTCxDQUVhLG1CQUZiLEVBSUtWLFFBSkwsQ0FJYyxXQUpkOztBQU1BckUsc0JBQUUsWUFBRixFQUFnQmlLLE9BQWhCLENBQXdCOztBQUVwQkMsbUNBQVc7O0FBRlMscUJBQXhCO0FBTUgsaUJBZEQ7O0FBa0JBTSwwQkFBVXBILEVBQVYsQ0FBYSw0QkFBYixFQUEyQyxVQUFTQyxDQUFULEVBQVk7O0FBRW5EQSxzQkFBRUMsY0FBRjs7QUFFQXRELHNCQUFFLElBQUYsRUFFSytFLE9BRkwsQ0FFYSxtQkFGYixFQUlLYixXQUpMLENBSWlCLFdBSmpCOztBQU1BOEksaUNBQWFSLElBQWI7QUFFSCxpQkFaRDs7QUFnQkF4TSxrQkFBRUcsUUFBRixFQUFZaUQsRUFBWixDQUVJLDRCQUZKLEVBSUksd0JBSkosRUFNSSxZQUFXOztBQUVQNkosZ0NBQVkvSSxXQUFaLENBQXdCLGFBQXhCOztBQUVBbEUsc0JBQUUsSUFBRixFQUFRcUUsUUFBUixDQUFpQixhQUFqQjtBQUVILGlCQVpMO0FBZ0JILGFBNUREO0FBOERIOztBQTFyQkcsS0F4ekRDOztBQXMvRVRyQixVQUFNOztBQUVGOztBQUVBQyxzQkFBYyx3QkFBVzs7QUFFckJyQyx1QkFBV3dDLEVBQVgsQ0FBYyw0QkFBZCxFQUE0QyxVQUFTQyxDQUFULEVBQVk7O0FBRXBELG9CQUFJckQsRUFBRSxJQUFGLEVBQVFzRSxRQUFSLENBQWlCLElBQWpCLENBQUosRUFBNEI7O0FBRXhCcEQseUJBQUs4QixJQUFMLENBQVVvTixZQUFWO0FBRUgsaUJBSkQsTUFJTzs7QUFFSGxQLHlCQUFLOEIsSUFBTCxDQUFVcU4sU0FBVjtBQUVIOztBQUVEaE4sa0JBQUVvRixlQUFGOztBQUVBcEYsa0JBQUVDLGNBQUY7QUFFSCxhQWhCRDs7QUFvQkF0RCxjQUFFLHVCQUFGLEVBQTJCb0QsRUFBM0IsQ0FBOEIsT0FBOUIsRUFBdUMsWUFBVzs7QUFFOUNsQyxxQkFBSzhCLElBQUwsQ0FBVW9OLFlBQVY7QUFFSCxhQUpEO0FBTUgsU0FoQ0M7O0FBa0NGOztBQUVBbE4scUJBQWEsdUJBQVc7O0FBRXBCaEQsc0JBRUtrRCxFQUZMLENBRVEsNEJBRlIsRUFFc0MsVUFBU0MsQ0FBVCxFQUFZOztBQUUxQyxvQkFFSXJELEVBQUVxRCxFQUFFMEgsTUFBSixFQUFZaEcsT0FBWixDQUVJLHdIQUZKLEVBSUV4QixNQU5OLEVBUUU7O0FBRUU7QUFFSDs7QUFFRHJDLHFCQUFLOEIsSUFBTCxDQUFVb04sWUFBVjs7QUFFQS9NLGtCQUFFb0YsZUFBRjtBQUVILGFBdEJMLEVBd0JLckYsRUF4QkwsQ0EwQlEsNEJBMUJSLEVBNEJRLFVBNUJSLEVBOEJRbEMsS0FBSzhCLElBQUwsQ0FBVW9OLFlBOUJsQjtBQWtDSCxTQXhFQzs7QUEwRUY7O0FBRUFqTiw0QkFBb0IsOEJBQVc7O0FBRTNCLGdCQUFJbU4sWUFBWXRRLEVBQUUsdUJBQUYsQ0FBaEI7O0FBRUFzUSxzQkFBVWxOLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFlBQVc7O0FBRTdCLG9CQUFJOUMsU0FBU2dFLFFBQVQsQ0FBa0IscUJBQWxCLENBQUosRUFBOEM7O0FBRTFDaEUsNkJBQVM0RCxXQUFULENBQXFCLHFCQUFyQjs7QUFFQTdELDBCQUFNbUUsVUFBTixDQUFpQixPQUFqQjs7QUFFQSwyQkFBTyxLQUFQO0FBRUgsaUJBUkQsTUFRTzs7QUFFSGxFLDZCQUFTK0QsUUFBVCxDQUFrQixxQkFBbEI7O0FBRUFoRSwwQkFBTStFLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFFBQXRCOztBQUVBLDJCQUFPLEtBQVA7QUFFSDtBQUVKLGFBcEJEO0FBc0JILFNBdEdDOztBQXdHRmlMLG1CQUFXLHFCQUFXOztBQUVsQnJRLGNBQUUsSUFBRixFQUFRcUUsUUFBUixDQUFpQixJQUFqQjs7QUFFQS9ELHFCQUFTK0QsUUFBVCxDQUFrQixrQkFBbEI7O0FBRUE5RCxxQkFBUzZFLEdBQVQsQ0FBYSxTQUFiLEVBQXdCLE9BQXhCOztBQUVBL0Usa0JBQU0rRSxHQUFOLENBQVUsVUFBVixFQUFzQixRQUF0QjtBQUVILFNBbEhDOztBQW9IRmdMLHNCQUFjLHdCQUFXOztBQUVyQnBRLGNBQUUsSUFBRixFQUFRa0UsV0FBUixDQUFvQixJQUFwQjs7QUFFQTVELHFCQUFTNEQsV0FBVCxDQUFxQixrQkFBckI7O0FBRUE3RCxrQkFBTW1FLFVBQU4sQ0FBaUIsT0FBakI7O0FBSUFQLHVCQUFXLFlBQVc7O0FBRWxCMUQseUJBQVNpRSxVQUFULENBQW9CLE9BQXBCO0FBRUgsYUFKRCxFQUlHLEdBSkg7QUFNSDs7QUFwSUMsS0F0L0VHOztBQThuRlQvQixXQUFPOztBQUVIOztBQUVBQyx1QkFBZSx5QkFBVzs7QUFFdEIsZ0JBQUkxQyxFQUFFLGlCQUFGLEVBQXFCdUQsTUFBekIsRUFBaUM7O0FBRTdCdkQsa0JBQUUsaUJBQUYsRUFBcUJ1USxRQUFyQixDQUE4Qjs7QUFFMUJDLCtCQUFtQixpQkFGTzs7QUFJMUJDLHVDQUFtQixJQUpPOztBQU0xQkMsK0JBQW1CLEtBTk87O0FBUTFCQywyQkFBbUI7O0FBRWZDLGlDQUFTOztBQUZNLHFCQVJPOztBQWMxQkMsNkJBQVM7O0FBRUxDLGlDQUFTOztBQUVMQyxvQ0FBUTs7QUFGSDs7QUFGSjs7QUFkaUIsaUJBQTlCO0FBMEJIOztBQUlELGdCQUFJL1EsRUFBRSwwQkFBRixFQUE4QnVELE1BQWxDLEVBQTBDOztBQUV0Q3ZELGtCQUFFLHlCQUFGLEVBQTZCdVEsUUFBN0IsQ0FBc0M7O0FBRWxDQywrQkFBVywyQkFGdUI7O0FBSWxDUSw2QkFBVyxJQUp1Qjs7QUFNbENDLDRCQUFXOztBQUVQQyxzQ0FBYyxPQUZQOztBQUlQQyxvQ0FBYzs7QUFKUDs7QUFOdUIsaUJBQXRDO0FBZ0JIOztBQUlELGdCQUFJblIsRUFBRSwwQkFBRixFQUE4QnVELE1BQWxDLEVBQTBDOztBQUV0Q3ZELGtCQUFFLDBCQUFGLEVBQThCdVEsUUFBOUIsQ0FBdUM7O0FBRW5DQywrQkFBbUIsaUJBRmdCOztBQUluQ1ksMkJBQW1CLEtBSmdCOztBQU1uQ0osNkJBQW1CLEtBTmdCOztBQVFuQ0ssOEJBQW1CLElBUmdCOztBQVVuQ1osdUNBQW1CLElBVmdCOztBQVluQ0MsK0JBQW1CLEtBWmdCOztBQWNuQ0csNkJBQW1COztBQUVmQyxpQ0FBUzs7QUFFTEMsb0NBQVE7O0FBRkg7O0FBRk07O0FBZGdCLGlCQUF2QztBQTBCSDs7QUFJRCxnQkFBSS9RLEVBQUUsMEJBQUYsRUFBOEJ1RCxNQUFsQyxFQUEwQzs7QUFFdEN2RCxrQkFBRSwwQkFBRixFQUE4QnVRLFFBQTlCLENBQXVDOztBQUVuQ0MsK0JBQW1CLGlCQUZnQjs7QUFJbkNZLDJCQUFtQixLQUpnQjs7QUFNbkNYLHVDQUFtQixLQU5nQjs7QUFRbkM7O0FBRUFDLCtCQUFXLEtBVndCOztBQVluQzs7QUFFQUcsNkJBQVM7O0FBRUxDLGlDQUFTOztBQUVMQyxvQ0FBUTs7QUFGSDs7QUFGSjs7QUFkMEIsaUJBQXZDO0FBMEJIO0FBRUosU0ExSEU7O0FBNEhIOztBQUVBcE8sZUFBTyxpQkFBVzs7QUFFZDNDLGNBQUUsV0FBRixFQUFlb0QsRUFBZixDQUFrQixPQUFsQixFQUEyQixZQUFXOztBQUVsQyxvQkFBSWtPLFFBQVF0UixFQUFFLElBQUYsRUFBUWlGLElBQVIsQ0FBYSxPQUFiLENBQVo7O0FBRUEsb0JBQUlzTSxPQUFRdlIsRUFBRSxZQUFGLEVBQWdCaUIsSUFBaEIsQ0FBcUIsT0FBckIsQ0FBWjs7QUFFQSxvQkFBSXFRLFVBQVUsUUFBZCxFQUF3Qjs7QUFFcEJDLHlCQUFLbE4sUUFBTCxDQUFjLFdBQWQ7QUFFSCxpQkFKRCxNQUlPLElBQUlpTixVQUFVLFFBQWQsRUFBd0I7O0FBRTNCQyx5QkFBS2xOLFFBQUwsQ0FBYyxXQUFkO0FBRUgsaUJBSk0sTUFJQTs7QUFFSGtOLHlCQUFLbE4sUUFBTCxDQUFjLFdBQWQ7QUFFSDtBQUVKLGFBcEJEO0FBc0JILFNBdEpFOztBQXdKSDs7QUFFQXpCLHlCQUFpQiwyQkFBVzs7QUFFeEIxQyxzQkFBVWtELEVBQVYsQ0FFSSw0QkFGSixFQUlJLGdCQUpKLEVBTUksWUFBVzs7QUFFUCxvQkFBSWlELE9BQU9yRyxFQUFFLElBQUYsRUFBUWlGLElBQVIsQ0FBYSxPQUFiLENBQVg7O0FBSUFqRixrQkFBRSxnQkFBRixFQUFvQmtFLFdBQXBCLENBQWdDLFdBQWhDOztBQUVBbEUsa0JBQUUsSUFBRixFQUFRcUUsUUFBUixDQUFpQixXQUFqQjs7QUFFQXJFLGtCQUFFLElBQUYsRUFFSytFLE9BRkwsQ0FFYSxPQUZiLEVBSUs5RCxJQUpMLENBSVUsWUFKVixFQU1Lb0YsSUFOTCxDQU1VQSxJQU5WO0FBUUgsYUF4Qkw7QUE0QkgsU0F4TEU7O0FBMExIeEQsZ0JBQVEsa0JBQVc7O0FBRWYzQyxzQkFBVWtELEVBQVYsQ0FBYSxlQUFiLEVBQThCLFFBQTlCLEVBQXdDLFVBQVNDLENBQVQsRUFBWTs7QUFFaERuQyxxQkFBS2EsTUFBTCxDQUFZeU0sV0FBWjtBQUVILGFBSkQ7QUFNSDs7QUFsTUU7O0FBOW5GRSxDQUFiOztBQXcwRkE7Ozs7O0FBS0EsSUFBTWdELE1BQU07QUFDUnJRLFVBQU0sZ0JBQVk7QUFDZCxhQUFLc1EsVUFBTDs7QUFFQSxhQUFLek8sSUFBTCxDQUFVME8sWUFBVjtBQUNBLGFBQUsxTyxJQUFMLENBQVUyTyxnQkFBVjtBQUNBLGFBQUszTyxJQUFMLENBQVU0TyxZQUFWOztBQUVBLGFBQUtDLE9BQUwsQ0FBYUMsT0FBYjtBQUNBLGFBQUtELE9BQUwsQ0FBYUUsaUJBQWI7O0FBRUEsYUFBS0MsV0FBTCxDQUFpQkMsWUFBakI7QUFDQSxhQUFLRCxXQUFMLENBQWlCRSxnQkFBakI7QUFDQSxhQUFLRixXQUFMLENBQWlCRyx5QkFBakI7O0FBRUEsYUFBS0MsT0FBTCxDQUFhalIsSUFBYjs7QUFFQXFRLFlBQUlhLFVBQUosQ0FBZWxSLElBQWY7QUFDQXFRLFlBQUljLE9BQUosQ0FBWW5SLElBQVo7QUFDQXFRLFlBQUllLEtBQUosQ0FBVXBSLElBQVY7QUFDQXFRLFlBQUlnQixNQUFKLENBQVdyUixJQUFYO0FBQ0FxUSxZQUFJaUIsUUFBSixDQUFhdFIsSUFBYjs7QUFFQSxZQUFJcEIsUUFBUStDLEtBQVIsS0FBa0IsR0FBdEIsRUFBMkI7QUFDdkIsZ0JBQUk0UCxHQUFKLEdBQVV2UixJQUFWO0FBQ0g7O0FBRUQsYUFBS3dSLFNBQUw7QUFDQTVTLGdCQUFRaUUsTUFBUixDQUFlLFlBQVk7QUFDdkJ3TixnQkFBSW1CLFNBQUo7QUFDSCxTQUZEO0FBR0gsS0EvQk87QUFnQ1JsQixnQkFBWSxzQkFBWTtBQUNwQnZSLGtCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IscUJBQXRCLEVBQTZDLFVBQVVDLENBQVYsRUFBYTtBQUN0RHJELGNBQUUsSUFBRixFQUNLdUUsTUFETCxHQUVLdEQsSUFGTCxDQUVVLGlCQUZWLEVBR0syUixXQUhMLENBR2lCO0FBQ1RDLHVCQUFPLGlCQUFZO0FBQ2Y3UyxzQkFBRSxJQUFGLEVBQVFvRixHQUFSLENBQVk7QUFDUjBOLGlDQUFTO0FBREQscUJBQVo7QUFHSDtBQUxRLGFBSGpCO0FBVUgsU0FYRDtBQVlILEtBN0NPO0FBOENSSCxlQUFXLHFCQUFZO0FBQ25CLFlBQUk1UyxRQUFRK0MsS0FBUixNQUFtQixHQUF2QixFQUE0QjtBQUN4QnRDLG9CQUFRNkQsUUFBUixDQUFpQixVQUFqQjtBQUNBM0Qsa0JBQU0yRCxRQUFOLENBQWUsV0FBZjtBQUNBckUsY0FBRSxpQkFBRixFQUFxQjJFLE9BQXJCO0FBQ0gsU0FKRCxNQUlPO0FBQ0huRSxvQkFBUTBELFdBQVIsQ0FBb0IsVUFBcEI7QUFDQXhELGtCQUFNd0QsV0FBTixDQUFrQixXQUFsQjtBQUNIO0FBQ0osS0F2RE87QUF3RFJsQixVQUFNO0FBQ0Y7QUFDQTBPLHNCQUFjLHdCQUFZO0FBQ3RCN1EsMEJBQWN1QyxFQUFkLENBQWlCLE9BQWpCLEVBQTBCLFVBQVVDLENBQVYsRUFBYTtBQUNuQyxvQkFBSXJELEVBQUUsSUFBRixFQUFRc0UsUUFBUixDQUFpQixJQUFqQixDQUFKLEVBQTRCO0FBQ3hCdEUsc0JBQUUsSUFBRixFQUFRa0UsV0FBUixDQUFvQixJQUFwQjtBQUNBeEQsMEJBQU13RCxXQUFOLENBQWtCLFNBQWxCO0FBQ0ExRCw0QkFBUTBELFdBQVIsQ0FBb0IsV0FBcEI7QUFDQXNOLHdCQUFJeE8sSUFBSixDQUFTK1AsV0FBVDs7QUFFQSx3QkFBSS9TLEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFDekJ4QyxpQ0FBUzRELFdBQVQsQ0FBcUIsV0FBckI7QUFDSDtBQUNKLGlCQVRELE1BU087QUFDSGxFLHNCQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIsSUFBakI7QUFDQTNELDBCQUFNMkQsUUFBTixDQUFlLFNBQWY7QUFDQTdELDRCQUFRNkQsUUFBUixDQUFpQixXQUFqQjtBQUNBaEUsMEJBQU0rRSxHQUFOLENBQVUsVUFBVixFQUFzQixRQUF0Qjs7QUFFQSx3QkFBSXBGLEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFDekJ4QyxpQ0FBUytELFFBQVQsQ0FBa0IsV0FBbEI7QUFDQXRELDBDQUFrQm1ELFdBQWxCLENBQThCLGlCQUE5QjtBQUNIO0FBQ0o7QUFDSixhQXJCRDtBQXNCSCxTQXpCQztBQTBCRjhPLHNCQUFjLHdCQUFZO0FBQ3RCaFQsY0FBRSxvQkFBRixFQUF3Qm9ELEVBQXhCLENBQTJCLDRCQUEzQixFQUF5RCxVQUNyREMsQ0FEcUQsRUFFdkQ7QUFDRSxvQkFBSXJELEVBQUUsSUFBRixFQUFRc0UsUUFBUixDQUFpQixJQUFqQixDQUFKLEVBQTRCO0FBQ3hCdEUsc0JBQUUsSUFBRixFQUFRa0UsV0FBUixDQUFvQixJQUFwQjtBQUNBNUQsNkJBQVM0RCxXQUFULENBQXFCLGtCQUFyQjtBQUNBN0QsMEJBQU1tRSxVQUFOLENBQWlCLE9BQWpCO0FBQ0FnTix3QkFBSXhPLElBQUosQ0FBUytQLFdBQVQ7QUFDSCxpQkFMRCxNQUtPO0FBQ0gvUyxzQkFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLElBQWpCO0FBQ0EvRCw2QkFBUytELFFBQVQsQ0FBa0Isa0JBQWxCO0FBQ0FoRSwwQkFBTStFLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFFBQXRCO0FBQ0g7QUFDRCx1QkFBTyxLQUFQO0FBQ0gsYUFkRDtBQWVILFNBMUNDO0FBMkNGO0FBQ0F3TSxzQkFBYyx3QkFBWTtBQUN0QjFSLHNCQUFVa0QsRUFBVixDQUFhLGtCQUFiLEVBQWlDLFVBQVVDLENBQVYsRUFBYTtBQUMxQyxvQkFDSXJELEVBQUVxRCxFQUFFMEgsTUFBSixFQUFZaEcsT0FBWixDQUNJLHlGQURKLEVBRUV4QixNQUhOLEVBS0k7QUFDSjNDLDJCQUFXc0QsV0FBWCxDQUF1QixJQUF2QjtBQUNBckQsOEJBQWNxRCxXQUFkLENBQTBCLElBQTFCO0FBQ0E1RCx5QkFBUzRELFdBQVQsQ0FBcUIsa0JBQXJCO0FBQ0F4RCxzQkFBTXdELFdBQU4sQ0FBa0IsU0FBbEI7QUFDQXNOLG9CQUFJeE8sSUFBSixDQUFTK1AsV0FBVDtBQUNBOU8sMkJBQVcsWUFBTTtBQUNibkQsZ0NBQVlvRCxXQUFaLENBQXdCLFdBQXhCO0FBQ0gsaUJBRkQsRUFFRyxHQUZIO0FBR0FiLGtCQUFFb0YsZUFBRjtBQUNILGFBaEJEO0FBaUJILFNBOURDO0FBK0RGO0FBQ0FrSiwwQkFBa0IsNEJBQVk7QUFDMUI1USw4QkFBa0JxQyxFQUFsQixDQUFxQixPQUFyQixFQUE4QixZQUFZO0FBQ3RDLG9CQUFJcEQsRUFBRSxJQUFGLEVBQVFzRSxRQUFSLENBQWlCLGlCQUFqQixDQUFKLEVBQXlDO0FBQ3JDdEUsc0JBQUUsSUFBRixFQUFRa0UsV0FBUixDQUFvQixpQkFBcEI7QUFDQWxELDhCQUFVb0YsTUFBVjtBQUNBdkYsa0NBQWNxRCxXQUFkLENBQTBCLElBQTFCOztBQUVBLHdCQUFJbkUsUUFBUStDLEtBQVIsS0FBa0IsR0FBdEIsRUFBMkI7QUFDdkJ4QyxpQ0FBUzRELFdBQVQsQ0FBcUIsV0FBckI7QUFDQTFELGdDQUFRMEQsV0FBUixDQUFvQixXQUFwQjtBQUNILHFCQUhELE1BR087QUFDSEQsbUNBQVcsWUFBTTtBQUNibkQsd0NBQVlvRCxXQUFaLENBQXdCLFdBQXhCO0FBQ0gseUJBRkQsRUFFRyxHQUZIO0FBR0g7QUFDSixpQkFiRCxNQWFPO0FBQ0hsRSxzQkFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLGlCQUFqQjtBQUNBckQsOEJBQVVtRixPQUFWO0FBQ0F0RixrQ0FBY3FELFdBQWQsQ0FBMEIsSUFBMUI7O0FBRUFsRSxzQkFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLGlCQUFqQjtBQUNBM0QsMEJBQU13RCxXQUFOLENBQWtCLFNBQWxCO0FBQ0ExRCw0QkFBUTBELFdBQVIsQ0FBb0IsV0FBcEI7O0FBRUEsd0JBQUluRSxRQUFRK0MsS0FBUixLQUFrQixHQUF0QixFQUEyQjtBQUN2QnhDLGlDQUFTK0QsUUFBVCxDQUFrQixXQUFsQjtBQUNILHFCQUZELE1BRU87QUFDSHZELG9DQUFZdUQsUUFBWixDQUFxQixXQUFyQjtBQUNIO0FBQ0o7QUFDSixhQTdCRDtBQThCSCxTQS9GQztBQWdHRjBPLHFCQUFhLHVCQUFZO0FBQ3JCaFMsOEJBQWtCbUQsV0FBbEIsQ0FBOEIsaUJBQTlCO0FBQ0E1RCxxQkFBUzRELFdBQVQsQ0FBcUIsV0FBckI7QUFDQTFELG9CQUFRMEQsV0FBUixDQUFvQixXQUFwQjtBQUNBc04sZ0JBQUl4TyxJQUFKLENBQVNpUSxlQUFUO0FBQ0FqUyxzQkFBVW9GLE1BQVY7QUFDSCxTQXRHQztBQXVHRjZNLHlCQUFpQiwyQkFBWTtBQUN6Qi9TLHNCQUFVa0QsRUFBVixDQUFhLGtCQUFiLEVBQWlDLFVBQVVDLENBQVYsRUFBYTtBQUMxQyxvQkFDSXJELEVBQUVxRCxFQUFFMEgsTUFBSixFQUFZaEcsT0FBWixDQUNJLDhFQURKLEVBRUV4QixNQUhOLEVBS0k7QUFDSkYsa0JBQUVvRixlQUFGO0FBQ0FwSSxzQkFBTW1FLFVBQU4sQ0FBaUIsT0FBakI7QUFDSCxhQVREO0FBVUg7QUFsSEMsS0F4REU7QUE0S1JxTixhQUFTO0FBQ0w7QUFDQUMsaUJBQVMsbUJBQVk7QUFDakIsZ0JBQUlyTCxVQUFVekcsRUFBRSx3QkFBRixDQUFkO0FBQ0F5RyxvQkFBUTdCLElBQVIsQ0FBYSxZQUFZO0FBQ3JCLG9CQUFJa0QsVUFBVTlILEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLG9CQUFiLENBQWQ7QUFDQSxvQkFBSTBGLFNBQVMzRyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxtQkFBYixDQUFiO0FBQ0Esb0JBQUlpUyxXQUFXbFQsRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEseUJBQWIsQ0FBZjtBQUNBLG9CQUFJMEYsT0FBT3BELE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJ1RSw0QkFBUWhCLEtBQVIsQ0FBYztBQUNWTSxzQ0FBYyxDQURKO0FBRVZDLHdDQUFnQixDQUZOO0FBR1ZFLGdDQUFRLEtBSEU7QUFJVkMsOEJBQU0sSUFKSTtBQUtWMkwsK0JBQU8sS0FMRztBQU1WQyxtQ0FBVyxLQU5EO0FBT1Y5TCxrQ0FBVTtBQVBBLHFCQUFkO0FBU0g7O0FBRUR0SCxrQkFBRSxJQUFGLEVBQVFvRCxFQUFSLENBQVcsYUFBWCxFQUEwQixVQUN0QjRFLEtBRHNCLEVBRXRCbEIsS0FGc0IsRUFHdEJzQixZQUhzQixFQUl0QkMsU0FKc0IsRUFLeEI7QUFDRSx3QkFBSUQsZUFBZSxDQUFmLEtBQXFCdEIsTUFBTXFCLFVBQS9CLEVBQTJDO0FBQ3ZDK0ssaUNBQVM5UCxFQUFULENBQVksT0FBWixFQUFxQixZQUFZO0FBQzdCcEQsOEJBQUUsUUFBRixFQUFZcVQsS0FBWixDQUFrQixNQUFsQjtBQUNILHlCQUZEO0FBR0gscUJBSkQsTUFJTztBQUNISCxpQ0FBUzlQLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVk7QUFDN0IwRSxvQ0FBUWhCLEtBQVIsQ0FBYyxXQUFkO0FBQ0gseUJBRkQ7QUFHSDtBQUNKLGlCQWZEOztBQWlCQW9NLHlCQUFTOVAsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBWTtBQUM3QjBFLDRCQUFRaEIsS0FBUixDQUFjLFdBQWQ7QUFDSCxpQkFGRDs7QUFJQTtBQUNBTCx3QkFBUXhGLElBQVIsQ0FBYSx1QkFBYixFQUFzQ21DLEVBQXRDLENBQXlDLE9BQXpDLEVBQWtELFVBQVVDLENBQVYsRUFBYTtBQUMzREEsc0JBQUVvRixlQUFGO0FBQ0gsaUJBRkQ7QUFHSCxhQXpDRDtBQTBDSCxTQTlDSTtBQStDTDtBQUNBc0osMkJBQW1CLDZCQUFZO0FBQzNCL1IsY0FBRSxRQUFGLEVBQVlvRCxFQUFaLENBQWUsZ0JBQWYsRUFBaUMsWUFBWTtBQUN6QyxvQkFBSXFELFVBQVV6RyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxvQkFBYixDQUFkO0FBQ0Esb0JBQUl3RixRQUFRbEQsTUFBWixFQUFvQjtBQUNoQmtELDRCQUFRLENBQVIsRUFBV0ssS0FBWCxDQUFpQndNLFdBQWpCO0FBQ0g7QUFDSixhQUxEO0FBTUg7QUF2REksS0E1S0Q7QUFxT1J0QixpQkFBYTtBQUNUQyxzQkFBYyx3QkFBWTtBQUN0QixnQkFBSXNCLFdBQVd2VCxFQUFFLGtCQUFGLENBQWY7QUFDQSxnQkFBSXdULFVBQVVELFNBQVNFLFFBQVQsQ0FBa0IsdUJBQWxCLENBQWQ7QUFDQUYscUJBQ0tFLFFBREwsQ0FDYyxxQkFEZCxFQUVLck8sR0FGTCxDQUVTLFFBRlQsRUFFbUJvTyxRQUFRRSxXQUFSLENBQW9CLElBQXBCLENBRm5COztBQUlBSCxxQkFBU3RTLElBQVQsQ0FBYyxvQkFBZCxFQUFvQzJELElBQXBDLENBQXlDLFlBQVk7QUFDakQsb0JBQUk1RSxFQUFFLElBQUYsRUFBUXlULFFBQVIsQ0FBaUIsdUJBQWpCLEVBQTBDbFEsTUFBOUMsRUFBc0Q7QUFDbER2RCxzQkFBRSxJQUFGLEVBQ0t5VCxRQURMLENBQ2MscUJBRGQsRUFFS3JPLEdBRkwsQ0FHUSxRQUhSLEVBSVFwRixFQUFFLG9CQUFGLEVBQ0N5VCxRQURELENBQ1UsdUJBRFYsRUFFQ0MsV0FGRCxDQUVhLElBRmIsQ0FKUjtBQVFIO0FBQ0osYUFYRDtBQVlILFNBcEJRO0FBcUJUO0FBQ0F2QixtQ0FBMkIscUNBQVk7QUFDbkNqUyxzQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHNCQUF0QixFQUE4QyxVQUFVQyxDQUFWLEVBQWE7QUFDdkQsb0JBQ0l0RCxRQUFRK0MsS0FBUixNQUFtQixJQUFuQixJQUNBOUMsRUFBRSxJQUFGLEVBQVFzRSxRQUFSLENBQWlCLGNBQWpCLENBRkosRUFHRTtBQUNFLDJCQUFPLEtBQVA7QUFDSDtBQUNEakIsa0JBQUVDLGNBQUY7O0FBRUEsb0JBQUl3RyxRQUFROUosRUFBRSxJQUFGLEVBQVE4RixJQUFSLENBQWEsd0JBQWIsQ0FBWjtBQUNBNUYsMEJBQ0tlLElBREwsQ0FDVSxtQkFEVixFQUVLaUYsTUFGTCxDQUVZLHNCQUFzQjRELEtBQXRCLEdBQThCLEdBRjFDLEVBR0t6RixRQUhMLENBR2MsU0FIZDs7QUFLQUosMkJBQVcsWUFBTTtBQUNiN0QsMEJBQU1pRSxRQUFOLENBQWUsVUFBZixFQUEyQmUsR0FBM0IsQ0FBK0IsVUFBL0IsRUFBMkMsT0FBM0M7QUFDSCxpQkFGRCxFQUVHLEdBRkg7O0FBSUFvTSxvQkFBSVEsV0FBSixDQUFnQkMsWUFBaEI7QUFDSCxhQXBCRDs7QUFzQkEvUixzQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLDJCQUF0QixFQUFtRCxVQUFVQyxDQUFWLEVBQWE7QUFDNURyRCxrQkFBRSxJQUFGLEVBQ0srRSxPQURMLENBQ2Esa0JBRGIsRUFFS2IsV0FGTCxDQUVpQixTQUZqQjs7QUFJQXNOLG9CQUFJUSxXQUFKLENBQWdCQyxZQUFoQjtBQUNILGFBTkQ7O0FBUUEvUixzQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHVCQUF0QixFQUErQyxVQUFVQyxDQUFWLEVBQWE7QUFDeERyRCxrQkFBRSxJQUFGLEVBQ0srRSxPQURMLENBQ2EsYUFEYixFQUVLYixXQUZMLENBRWlCLFNBRmpCO0FBR0F5UDtBQUNBdFEsa0JBQUVvRixlQUFGO0FBQ0FwRixrQkFBRUMsY0FBRjtBQUNILGFBUEQ7O0FBU0EscUJBQVNxUSxTQUFULEdBQXFCO0FBQ2pCLG9CQUFJLENBQUN6VCxVQUFVZSxJQUFWLENBQWUsZ0JBQWYsRUFBaUNxRCxRQUFqQyxDQUEwQyxTQUExQyxDQUFMLEVBQTJEO0FBQ3ZEbEUsMEJBQU04RCxXQUFOLENBQWtCLFVBQWxCLEVBQThCa0IsR0FBOUIsQ0FBa0MsVUFBbEMsRUFBOEMsVUFBOUM7QUFDSDtBQUNKO0FBQ0osU0FuRVE7QUFvRVQ7QUFDQThNLDBCQUFrQiw0QkFBWTtBQUMxQixnQkFBSWxTLEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUI1QywwQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGtCQUF0QixFQUEwQyxVQUFVQyxDQUFWLEVBQWE7QUFDbkRyRCxzQkFBRSwyQkFBRixFQUErQnFFLFFBQS9CLENBQXdDLFNBQXhDO0FBQ0FoRSwwQkFBTWdFLFFBQU4sQ0FBZSxVQUFmOztBQUVBaEIsc0JBQUVDLGNBQUY7QUFDQUQsc0JBQUVvRixlQUFGO0FBQ0gsaUJBTkQ7QUFPQXZJLDBCQUFVa0QsRUFBVixDQUNJLE9BREosRUFFSSxrQ0FGSixFQUdJLFlBQVk7QUFDUnBELHNCQUFFLDJCQUFGLEVBQStCa0UsV0FBL0IsQ0FBMkMsU0FBM0M7O0FBRUE3RCwwQkFBTTZELFdBQU4sQ0FBa0IsVUFBbEI7QUFDSCxpQkFQTDtBQVNIO0FBQ0o7QUF4RlEsS0FyT0w7QUErVFJrTyxhQUFTO0FBQ0xqUixjQUFNLGdCQUFZO0FBQ2QsaUJBQUt5UyxZQUFMO0FBQ0E3VCxvQkFBUWlFLE1BQVIsQ0FBZSxZQUFZO0FBQ3ZCd04sb0JBQUlZLE9BQUosQ0FBWXdCLFlBQVo7QUFDSCxhQUZEO0FBR0gsU0FOSTtBQU9MQSxzQkFBYyx3QkFBWTtBQUN0QixnQkFBSUMsU0FBUzNULFVBQVVlLElBQVYsQ0FBZSxpQkFBZixDQUFiOztBQUVBNFMsbUJBQU9qUCxJQUFQLENBQVksWUFBWTtBQUNwQixvQkFBSWtQLGVBQWU5VCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxzQkFBYixDQUFuQjtBQUNBLG9CQUFJOFMsaUJBQWlCRCxhQUFhN1MsSUFBYixDQUFrQixJQUFsQixFQUF3QitFLEdBQXhCLENBQTRCLFFBQTVCLENBQXJCO0FBQ0Esb0JBQUlnTyxjQUFjaFUsRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEscUJBQWIsQ0FBbEI7QUFDQSxvQkFBSWdULGdCQUFnQkQsWUFBWS9TLElBQVosQ0FBaUIsSUFBakIsRUFBdUIrRSxHQUF2QixDQUEyQixRQUEzQixDQUFwQjs7QUFFQWlPLDhCQUFjclAsSUFBZCxDQUFtQixVQUFVMEQsQ0FBVixFQUFhO0FBQzVCLHdCQUFJNEwsbUJBQW1CbFUsRUFBRSxJQUFGLEVBQ2xCK0UsT0FEa0IsQ0FDVixpQkFEVSxFQUVsQjlELElBRmtCLENBRWIsc0JBRmEsRUFHbEJBLElBSGtCLENBR2IsSUFIYSxFQUlsQitFLEdBSmtCLENBSWQsUUFKYyxFQUtsQjhKLEVBTGtCLENBS2Z4SCxDQUxlLENBQXZCOztBQU9BNkwsOEJBQVVuVSxFQUFFLElBQUYsQ0FBVixFQUFtQmtVLGdCQUFuQjtBQUNILGlCQVREOztBQVdBSCwrQkFBZW5QLElBQWYsQ0FBb0IsVUFBVTBELENBQVYsRUFBYTtBQUM3Qix3QkFBSThMLG9CQUFvQnBVLEVBQUUsSUFBRixFQUNuQitFLE9BRG1CLENBQ1gsaUJBRFcsRUFFbkI5RCxJQUZtQixDQUVkLHFCQUZjLEVBR25CQSxJQUhtQixDQUdkLElBSGMsRUFJbkIrRSxHQUptQixDQUlmLFFBSmUsRUFLbkI4SixFQUxtQixDQUtoQnhILENBTGdCLENBQXhCOztBQU9BNkwsOEJBQVVuVSxFQUFFLElBQUYsQ0FBVixFQUFtQm9VLGlCQUFuQjtBQUNILGlCQVREOztBQVdBLHlCQUFTRCxTQUFULENBQW1CdE0sS0FBbkIsRUFBMEJ3TSxJQUExQixFQUFnQztBQUM1Qix3QkFBSUYsWUFBWSxDQUFoQjtBQUNBLHdCQUFJRyxnQkFBZ0J6TSxNQUFNNkwsV0FBTixFQUFwQjtBQUNBLHdCQUFJWSxnQkFBZ0JILFNBQXBCLEVBQStCO0FBQzNCQSxvQ0FBWUcsYUFBWjtBQUNIO0FBQ0Qsd0JBQUlBLGdCQUFnQkQsS0FBS1gsV0FBTCxFQUFwQixFQUF3QztBQUNwQ1csNkJBQUtqUCxHQUFMLENBQVMsUUFBVCxFQUFtQitPLFNBQW5CO0FBQ0g7QUFDSjtBQUNKLGFBdENEO0FBdUNIO0FBakRJO0FBL1RELENBQVo7O0FBb1hBOzs7OztBQUtBM0MsSUFBSWEsVUFBSixHQUFpQjtBQUNibFIsVUFBTSxnQkFBWTtBQUNkcVEsWUFBSWEsVUFBSixDQUFla0MsYUFBZjtBQUNBL0MsWUFBSWEsVUFBSixDQUFlbUMsZ0JBQWY7QUFDQWhELFlBQUlhLFVBQUosQ0FBZW9DLHlCQUFmO0FBQ0FqRCxZQUFJYSxVQUFKLENBQWVxQyxxQkFBZjtBQUNBbEQsWUFBSWEsVUFBSixDQUFlc0MsaUJBQWY7QUFDQW5ELFlBQUlhLFVBQUosQ0FBZXVDLG1CQUFmO0FBQ0FwRCxZQUFJYSxVQUFKLENBQWV3QyxZQUFmOztBQUVBLFlBQUk5VSxRQUFRK0MsS0FBUixNQUFtQixHQUF2QixFQUE0QjtBQUN4QjBPLGdCQUFJYSxVQUFKLENBQWV5QyxhQUFmO0FBQ0g7QUFDSixLQWJZO0FBY2I7QUFDQVAsbUJBQWUseUJBQVk7QUFDdkIsWUFBSVEsaUJBQWlCL1UsRUFBRSxvQkFBRixDQUFyQjtBQUNBK1UsdUJBQWU1USxJQUFmOztBQUVBO0FBQ0E0USx1QkFBZTlULElBQWYsQ0FBb0IsWUFBcEIsRUFBa0NtQyxFQUFsQyxDQUFxQyxPQUFyQyxFQUE4QyxZQUFZO0FBQ3RELGdCQUFJc0MsTUFBTTFGLEVBQUUsbUJBQUYsQ0FBVjtBQUNBLGdCQUFJZ1YsY0FBY2hWLEVBQUUsZ0JBQUYsRUFDYnlULFFBRGEsQ0FDSixrQkFESSxFQUVieFMsSUFGYSxDQUVSLHFCQUZRLENBQWxCO0FBR0EsZ0JBQUlnVSxPQUFPalYsRUFBRSxJQUFGLEVBQVE4RixJQUFSLENBQWEsTUFBYixDQUFYOztBQUVBLGdCQUFJbVAsU0FBUyxrQkFBYixFQUFpQztBQUM3QnZQLG9CQUFJckIsUUFBSixDQUFhLFdBQWI7QUFDQTJRLDRCQUFZM1EsUUFBWixDQUFxQixXQUFyQjtBQUNILGFBSEQsTUFHTztBQUNIcUIsb0JBQUl4QixXQUFKLENBQWdCLFdBQWhCO0FBQ0E4USw0QkFBWTlRLFdBQVosQ0FBd0IsV0FBeEI7QUFDSDs7QUFFRHNOLGdCQUFJUSxXQUFKLENBQWdCQyxZQUFoQjs7QUFFQWpTLGNBQUUsWUFBRixFQUNLK0QsYUFETCxHQUVLQyxNQUZMO0FBR0gsU0FwQkQ7QUFxQkgsS0F6Q1k7QUEwQ2I7QUFDQXdRLHNCQUFrQiw0QkFBWTtBQUMxQlUsNEJBQW9CLGdCQUFwQixFQUFzQyxTQUF0QztBQUNILEtBN0NZO0FBOENiO0FBQ0FULCtCQUEyQixxQ0FBWTtBQUNuQ3ZVLGtCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsMkJBQXRCLEVBQW1ELFVBQVVDLENBQVYsRUFBYTtBQUM1RHJELGNBQUUsSUFBRixFQUFRcUUsUUFBUixDQUFpQixXQUFqQjtBQUNBckUsY0FBRSxJQUFGLEVBQ0srRSxPQURMLENBQ2EsNkJBRGIsRUFFSzlELElBRkwsQ0FFVSxpQkFGVixFQUdLaUQsV0FITCxDQUdpQixXQUhqQjtBQUlBYixjQUFFQyxjQUFGO0FBQ0gsU0FQRDtBQVFILEtBeERZO0FBeURiO0FBQ0FvUiwyQkFBdUIsaUNBQVk7QUFDL0IxVSxVQUFFLHFCQUFGLEVBQXlCNEUsSUFBekIsQ0FBOEIsVUFBVXZCLENBQVYsRUFBYTtBQUN2QyxnQkFBSSxDQUFDckQsRUFBRSxJQUFGLEVBQVFzRSxRQUFSLENBQWlCLHdCQUFqQixDQUFMLEVBQWlEO0FBQzdDdEUsa0JBQUUsSUFBRixFQUNLaUIsSUFETCxDQUNVLDJCQURWLEVBRUtvRixJQUZMLENBRVVoRCxJQUFJLENBRmQ7QUFHSDtBQUNKLFNBTkQ7QUFPSCxLQWxFWTtBQW1FYjtBQUNBc1IsdUJBQW1CLDZCQUFZO0FBQzNCelUsa0JBQVVrRCxFQUFWLENBQWEsZ0JBQWIsRUFBK0IseUJBQS9CLEVBQTBELFlBQVk7QUFDbEUsZ0JBQUltUSxXQUFXdlQsRUFBRSxJQUFGLEVBQVErRSxPQUFSLENBQWdCLHFCQUFoQixDQUFmO0FBQ0EsZ0JBQUl3TyxTQUFTalAsUUFBVCxDQUFrQix3QkFBbEIsQ0FBSixFQUFpRDtBQUM3Q2lQLHlCQUNLdFMsSUFETCxDQUNVLDZCQURWLEVBRUs0RCxTQUZMLENBRWU7QUFDUGdPLDJCQUFPLGlCQUFZO0FBQ2Y3UywwQkFBRSxJQUFGLEVBQVFvRixHQUFSLENBQVk7QUFDUjBOLHFDQUFTO0FBREQseUJBQVo7QUFHSDtBQUxNLGlCQUZmLEVBU0toRyxHQVRMLEdBVUs3TCxJQVZMLENBVVUsZ0NBVlYsRUFXS2lELFdBWEwsQ0FXaUIsV0FYakI7QUFZQXFQLHlCQUFTclAsV0FBVCxDQUFxQix3QkFBckI7QUFDSCxhQWRELE1BY087QUFDSHFQLHlCQUFTdFMsSUFBVCxDQUFjLDZCQUFkLEVBQTZDNEQsU0FBN0MsQ0FBdUQ7QUFDbkRnTywyQkFBTyxpQkFBWTtBQUNmN1MsMEJBQUUsSUFBRixFQUFRb0YsR0FBUixDQUFZO0FBQ1IwTixxQ0FBUztBQURELHlCQUFaO0FBR0g7QUFMa0QsaUJBQXZEO0FBT0g7QUFDRHRCLGdCQUFJYSxVQUFKLENBQWVxQyxxQkFBZjtBQUNILFNBMUJEO0FBMkJILEtBaEdZO0FBaUdiO0FBQ0FHLGtCQUFjLHdCQUFZO0FBQ3RCM1Usa0JBQVVrRCxFQUFWLENBQWEsZ0JBQWIsRUFBK0Isc0JBQS9CLEVBQXVELFlBQVk7QUFDL0QsZ0JBQUltUSxXQUFXdlQsRUFBRSxJQUFGLEVBQVErRSxPQUFSLENBQWdCLHFCQUFoQixDQUFmO0FBQ0F3TyxxQkFDS3RTLElBREwsQ0FDVSw2QkFEVixFQUVLQSxJQUZMLENBRVUsaUJBRlYsRUFHS29ELFFBSEwsQ0FHYyxXQUhkLEVBSUt5SSxHQUpMLEdBS0s3TCxJQUxMLENBS1UsMkJBTFYsRUFNS2lELFdBTkwsQ0FNaUIsV0FOakI7QUFPSCxTQVREO0FBVUgsS0E3R1k7QUE4R2I7QUFDQTBRLHlCQUFxQiwrQkFBWTtBQUM3QjFVLGtCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsZ0NBQXRCLEVBQXdELFlBQVk7QUFDaEUsZ0JBQUltUSxXQUFXdlQsRUFBRSxJQUFGLEVBQVErRSxPQUFSLENBQWdCLHFCQUFoQixDQUFmO0FBQ0EsZ0JBQUksQ0FBQ3dPLFNBQVNqUCxRQUFULENBQWtCLHdCQUFsQixDQUFMLEVBQWtEO0FBQzlDaVAseUJBQ0tsUCxRQURMLENBQ2Msd0JBRGQsRUFFS3BELElBRkwsQ0FHUSxzREFIUixFQUtLNEUsR0FMTCxDQUtTLEVBTFQsRUFNS2tFLE9BTkwsQ0FNYSxRQU5iLEVBT0srQyxHQVBMLEdBUUs3TCxJQVJMLENBUVUsZ0NBUlYsRUFTS29ELFFBVEwsQ0FTYyxXQVRkLEVBVUt5SSxHQVZMLEdBV0s3TCxJQVhMLENBV1UsNkJBWFYsRUFZSzBELE9BWkwsR0FhS21JLEdBYkwsR0FjSzdMLElBZEwsQ0FjVSxpQkFkVixFQWVLb0QsUUFmTCxDQWVjLFdBZmQsRUFnQkt5SSxHQWhCTCxHQWlCSzdMLElBakJMLENBaUJVLDJCQWpCVixFQWtCS2lELFdBbEJMLENBa0JpQixXQWxCakIsRUFtQks0SSxHQW5CTCxHQW9CSzdMLElBcEJMLENBb0JVLE9BcEJWLEVBcUJLNEUsR0FyQkwsQ0FxQlMsRUFyQlQsRUFzQktpSCxHQXRCTCxHQXVCSzdMLElBdkJMLENBdUJVLDJCQXZCVixFQXdCS3NILElBeEJMLENBd0JVLEVBeEJWO0FBeUJIO0FBQ0osU0E3QkQ7QUE4QkgsS0E5SVk7QUErSWI7QUFDQXVNLG1CQUFlLHlCQUFZO0FBQ3ZCLFlBQUlwRixTQUFTeFAsVUFBVWUsSUFBVixDQUFlLDBCQUFmLENBQWI7QUFDQSxZQUFJVixXQUFXTCxVQUFVZSxJQUFWLENBQWUsb0JBQWYsQ0FBZjtBQUNBLFlBQUlrVSxjQUFjalYsVUFBVWUsSUFBVixDQUFlLGFBQWYsQ0FBbEI7QUFDQSxZQUFJbVUsUUFBUWxWLFVBQVVlLElBQVYsQ0FBZSxtQkFBZixDQUFaO0FBQ0EsWUFBSW9VLGNBQWNuVixVQUFVZSxJQUFWLENBQWUsb0JBQWYsQ0FBbEI7QUFDQSxZQUFJcVUsZ0JBQWdCcFYsVUFBVWUsSUFBVixDQUFlLHNCQUFmLENBQXBCOztBQUVBZixrQkFDS2tELEVBREwsQ0FDUSxPQURSLEVBQ2lCLDBCQURqQixFQUM2QyxZQUFZO0FBQ2pEN0MscUJBQVM4RCxRQUFULENBQWtCLFlBQWxCO0FBQ0E4USx3QkFBWTlRLFFBQVosQ0FBcUIsVUFBckI7QUFDQStRLGtCQUFNL1EsUUFBTixDQUFlLHFCQUFmLEVBQXNDZSxHQUF0QyxDQUEwQyxTQUExQyxFQUFxRCxPQUFyRDtBQUNBaVEsd0JBQVlwUCxJQUFaO0FBQ0FxUCwwQkFBY3ZQLElBQWQ7QUFDSCxTQVBMLEVBUUszQyxFQVJMLENBUVEsT0FSUixFQVFpQixVQUFVQyxDQUFWLEVBQWE7QUFDdEIsZ0JBQUlBLEVBQUV3SixPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDakIwSTtBQUNIO0FBQ0osU0FaTCxFQWFLblMsRUFiTCxDQWFRLE9BYlIsRUFhaUIsb0JBYmpCLEVBYXVDbVMsWUFidkM7O0FBZUEsaUJBQVNBLFlBQVQsR0FBd0I7QUFDcEJoVixxQkFBUzJELFdBQVQsQ0FBcUIsWUFBckI7QUFDQWlSLHdCQUFZalIsV0FBWixDQUF3QixVQUF4QjtBQUNBa1Isa0JBQU1sUixXQUFOLENBQWtCLHFCQUFsQixFQUF5Q00sVUFBekMsQ0FBb0QsT0FBcEQ7QUFDQWtMLG1CQUFPbEQsSUFBUDtBQUNBNkksd0JBQVl0UCxJQUFaO0FBQ0F1UCwwQkFBY3JQLElBQWQ7QUFDSDtBQUNKO0FBL0tZLENBQWpCOztBQWtMQTs7Ozs7QUFLQXVMLElBQUljLE9BQUosR0FBYztBQUNWblIsVUFBTSxnQkFBWTtBQUNkLFlBQUlwQixRQUFRK0MsS0FBUixNQUFtQixJQUF2QixFQUE2QjtBQUN6QjBPLGdCQUFJYyxPQUFKLENBQVlrRCxZQUFaO0FBQ0gsU0FGRCxNQUVPO0FBQ0hoRSxnQkFBSWMsT0FBSixDQUFZbk8sSUFBWjtBQUNIO0FBQ0osS0FQUztBQVFWO0FBQ0FxUixrQkFBYyx3QkFBWTtBQUN0QnhWLFVBQUUsY0FBRixFQUNLeVYsUUFETCxDQUNjO0FBQ05DLHlCQUFhLGNBRFA7QUFFTkMsb0JBQVEsTUFGRjtBQUdOQyx1QkFBVyxTQUhMO0FBSU4vQyxtQkFBTyxlQUFVeFAsQ0FBVixFQUFhd1MsRUFBYixFQUFpQjtBQUNwQkEsbUJBQUdDLElBQUgsQ0FBUXpSLFFBQVIsQ0FBaUIsV0FBakI7QUFDSCxhQU5LO0FBT04wUixrQkFBTSxjQUFVMVMsQ0FBVixFQUFhd1MsRUFBYixFQUFpQjtBQUNuQkEsbUJBQUdDLElBQUgsQ0FBUTVSLFdBQVIsQ0FBb0IsV0FBcEI7QUFDQTJSLG1CQUFHQyxJQUFILENBQVE1UixXQUFSLENBQW9CLG1CQUFwQjtBQUNBc04sb0JBQUljLE9BQUosQ0FBWTBELGdCQUFaLENBQTZCSCxHQUFHQyxJQUFoQztBQUNIO0FBWEssU0FEZCxFQWNLRyxnQkFkTDtBQWVILEtBekJTO0FBMEJWO0FBQ0FELHNCQUFrQiwwQkFBVW5NLEVBQVYsRUFBYztBQUM1QixZQUFJcU0sU0FBU3JNLEdBQUc5RSxPQUFILENBQVcsa0JBQVgsQ0FBYjtBQUNBLFlBQUlpSixPQUFPbkUsR0FBRzVJLElBQUgsQ0FBUSxxQkFBUixDQUFYOztBQUVBLFlBQUlrVixVQUFVLGlDQUFkO0FBQ0EsWUFBSUMsV0FBVyxpQ0FBZjtBQUNBLFlBQUlDLFdBQVcsd0NBQWY7QUFDQSxZQUFJQyxZQUFZLGlDQUFoQjs7QUFFQSxZQUFJSixPQUFPNVIsUUFBUCxDQUFnQixzQkFBaEIsQ0FBSixFQUE2QztBQUN6QzBKLGlCQUFLOUosV0FBTCxHQUFtQkcsUUFBbkIsQ0FBNEI4UixPQUE1QjtBQUNILFNBRkQsTUFFTyxJQUFJRCxPQUFPNVIsUUFBUCxDQUFnQix1QkFBaEIsQ0FBSixFQUE4QztBQUNqRDBKLGlCQUFLOUosV0FBTCxHQUFtQkcsUUFBbkIsQ0FBNEIrUixRQUE1QjtBQUNILFNBRk0sTUFFQSxJQUFJRixPQUFPNVIsUUFBUCxDQUFnQix1QkFBaEIsQ0FBSixFQUE4QztBQUNqRDBKLGlCQUFLOUosV0FBTCxHQUFtQkcsUUFBbkIsQ0FBNEJnUyxRQUE1QjtBQUNILFNBRk0sTUFFQSxJQUFJSCxPQUFPNVIsUUFBUCxDQUFnQix3QkFBaEIsQ0FBSixFQUErQztBQUNsRDBKLGlCQUFLOUosV0FBTCxHQUFtQkcsUUFBbkIsQ0FBNEJpUyxTQUE1QjtBQUNIO0FBQ0osS0E3Q1M7QUE4Q1Y7QUFDQW5TLFVBQU0sZ0JBQVk7QUFDZG5FLFVBQUUsaUJBQUYsRUFBcUJtRSxJQUFyQjtBQUNIO0FBakRTLENBQWQ7O0FBb0RBOzs7OztBQUtBcU4sSUFBSWlCLFFBQUosR0FBZTtBQUNYdFIsVUFBTSxnQkFBWTtBQUNkcVEsWUFBSWlCLFFBQUosQ0FBYThELFVBQWI7QUFDQS9FLFlBQUlpQixRQUFKLENBQWErRCxjQUFiO0FBQ0FoRixZQUFJaUIsUUFBSixDQUFhZ0UsZUFBYjs7QUFFQSxZQUFJelcsRUFBRUMsTUFBRixFQUFVNkMsS0FBVixNQUFxQixJQUF6QixFQUErQjtBQUMzQjtBQUNBME8sZ0JBQUljLE9BQUosQ0FBWWtELFlBQVo7QUFDSDtBQUNKLEtBVlU7QUFXWGtCLGVBQVcscUJBQVk7QUFDbkIsWUFBSTFSLFFBQVFoRixFQUFFLGtCQUFGLENBQVo7O0FBRUFnRixjQUNLNUIsRUFETCxDQUNRLFlBRFIsRUFDc0IsVUFBVUMsQ0FBVixFQUFhO0FBQzNCckQsY0FBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLFVBQWpCO0FBQ0gsU0FITCxFQUlLakIsRUFKTCxDQUlRLFlBSlIsRUFJc0IsWUFBWTtBQUMxQixnQkFBSXNNLFNBQVMxUCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxPQUFiLENBQWI7QUFDQSxnQkFBSThMLFVBQVUvTSxFQUFFLElBQUYsRUFDVGlCLElBRFMsQ0FDSixRQURJLEVBRVRpTCxJQUZTLEVBQWQ7QUFHQSxnQkFDSXdELE9BQU90TCxFQUFQLENBQVUsUUFBVixLQUNBMkksUUFBUXpJLFFBQVIsQ0FBaUIseUJBQWpCLENBRkosRUFHRSxDQUFFLENBSEosTUFHVTtBQUNOdEUsa0JBQUUsSUFBRixFQUFRa0UsV0FBUixDQUFvQixVQUFwQjtBQUNIO0FBQ0osU0FmTDtBQWdCSCxLQTlCVTtBQStCWHFTLGdCQUFZLHNCQUFZO0FBQ3BCLFlBQUl4SixVQUFVL00sRUFBRSxrQkFBRixFQUFzQmlCLElBQXRCLENBQTJCLFFBQTNCLENBQWQ7QUFDQThMLGdCQUFRM0osRUFBUixDQUFXLGdCQUFYLEVBQTZCLFlBQVk7QUFDckNwRCxjQUFFLElBQUYsRUFDSytFLE9BREwsQ0FDYSxrQkFEYixFQUVLYixXQUZMLENBRWlCLFVBRmpCO0FBR0gsU0FKRDtBQUtILEtBdENVO0FBdUNYc1Msb0JBQWdCLDBCQUFZO0FBQ3hCdFcsa0JBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixzQkFBdEIsRUFBOEMsWUFBWTtBQUN0RCxnQkFBSTBCLFVBQVU5RSxFQUFFLElBQUYsRUFBUStFLE9BQVIsQ0FBZ0IsaUJBQWhCLENBQWQ7QUFDQSxnQkFBSXlGLFlBQVkxRixRQUFRN0QsSUFBUixDQUFhLHdCQUFiLENBQWhCO0FBQ0EsZ0JBQUkwVixVQUFVN1IsUUFBUTdELElBQVIsQ0FBYSxxQkFBYixDQUFkOztBQUVBakIsY0FBRSxJQUFGLEVBQVFpRyxJQUFSO0FBQ0F1RSxzQkFBVXpFLElBQVY7QUFDQTRRLG9CQUFRblMsVUFBUixDQUFtQixPQUFuQjtBQUNILFNBUkQ7O0FBVUF0RSxrQkFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHdCQUF0QixFQUFnRCxZQUFZO0FBQ3hELGdCQUFJMEIsVUFBVTlFLEVBQUUsSUFBRixFQUFRK0UsT0FBUixDQUFnQixpQkFBaEIsQ0FBZDtBQUNBLGdCQUFJNlIsV0FBVzlSLFFBQVE3RCxJQUFSLENBQWEsc0JBQWIsQ0FBZjtBQUNBLGdCQUFJMFYsVUFBVTdSLFFBQVE3RCxJQUFSLENBQWEscUJBQWIsQ0FBZDs7QUFFQWpCLGNBQUUsSUFBRixFQUFRaUcsSUFBUjtBQUNBMlEscUJBQVM3USxJQUFUO0FBQ0E0USxvQkFBUXZSLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCO0FBQ0gsU0FSRDtBQVNILEtBM0RVO0FBNERYcVIscUJBQWlCLDJCQUFZO0FBQ3pCdlcsa0JBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixZQUF0QixFQUFvQyxVQUFVQyxDQUFWLEVBQWE7QUFDN0MsZ0JBQUl5QixVQUFVOUUsRUFBRSxJQUFGLEVBQVF1RSxNQUFSLEVBQWQ7QUFDQSxnQkFBSXFKLEtBQUs1TixFQUFFLElBQUYsRUFBUThGLElBQVIsQ0FBYSxtQkFBYixDQUFUOztBQUVBaEIsb0JBQVE3RCxJQUFSLENBQWEsWUFBYixFQUEyQmlELFdBQTNCLENBQXVDLFlBQXZDO0FBQ0FsRSxjQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIsWUFBakI7O0FBRUFyRSxjQUFFLElBQUYsRUFDSytFLE9BREwsQ0FDYSxpQkFEYixFQUVLOUQsSUFGTCxDQUVVLE9BRlYsRUFHS2lGLE1BSEwsQ0FHWSxPQUhaLEVBSUs4RSxXQUpMLENBSWlCLHlCQUpqQjs7QUFNQWhMLGNBQUUsSUFBRixFQUNLK0UsT0FETCxDQUNhLGlCQURiLEVBRUs5RCxJQUZMLENBRVUsY0FGVixFQUdLbUUsR0FITCxDQUdTLFNBSFQsRUFHb0IsTUFIcEIsRUFJS2MsTUFKTCxDQUlZLGlCQUFpQjBILEVBQWpCLEdBQXNCLEdBSmxDLEVBS0twSixVQUxMLENBS2dCLE9BTGhCOztBQU9BbkIsY0FBRUMsY0FBRjtBQUNILFNBckJEO0FBc0JIO0FBbkZVLENBQWY7O0FBc0ZBOzs7OztBQUtBa08sSUFBSWUsS0FBSixHQUFZO0FBQ1JwUixVQUFNLGdCQUFZO0FBQ2QsWUFBSW5CLEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFDekI7QUFDSDtBQUNEME8sWUFBSWUsS0FBSixDQUFVcE8sSUFBVjtBQUNBcU4sWUFBSWUsS0FBSixDQUFVc0UsVUFBVjtBQUNILEtBUE87QUFRUjtBQUNBMVMsVUFBTSxnQkFBWTtBQUNkbkUsVUFBRSxpQkFBRixFQUFxQm1FLElBQXJCO0FBQ0gsS0FYTztBQVlSO0FBQ0EwUyxnQkFBWSxzQkFBWTtBQUNwQjNXLGtCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsNEJBQXRCLEVBQW9ELFlBQVk7QUFDNURwRCxjQUFFLGdCQUFGLEVBQW9COFcsVUFBcEI7QUFDSCxTQUZEO0FBR0gsS0FqQk87QUFrQlI7QUFDQXJCLGNBQVUsb0JBQVk7QUFDbEIsWUFBSXpWLEVBQUUsa0JBQUYsRUFBc0J1RCxNQUExQixFQUFrQztBQUM5QnZELGNBQUUsa0JBQUYsRUFDS3lWLFFBREwsQ0FDYztBQUNOc0IsdUJBQU8sc0NBREQ7QUFFTkMsNkJBQWEsUUFGUDtBQUdOckIsd0JBQVEsTUFIRjtBQUlOQywyQkFBVyxTQUpMO0FBS04vQyx1QkFBTyxlQUFVeFAsQ0FBVixFQUFhd1MsRUFBYixFQUFpQjtBQUNwQkEsdUJBQUdDLElBQUgsQ0FBUXpSLFFBQVIsQ0FBaUIsV0FBakI7QUFDSCxpQkFQSztBQVFOMFIsc0JBQU0sY0FBVTFTLENBQVYsRUFBYXdTLEVBQWIsRUFBaUI7QUFDbkJ0RCwwQkFBTTBFLHlCQUFOO0FBQ0FwQix1QkFBR0MsSUFBSCxDQUFRNVIsV0FBUixDQUFvQixXQUFwQjtBQUNIO0FBWEssYUFEZCxFQWNLK1IsZ0JBZEw7QUFlSDtBQUNKLEtBckNPO0FBc0NSO0FBQ0FnQiwrQkFBMkIscUNBQVk7QUFDbkMsWUFBSUMsT0FBT2xYLEVBQUUsZ0NBQUYsQ0FBWDtBQUNBa1gsYUFBSzdRLElBQUwsQ0FBVSxTQUFWLEVBQXFCc0UsUUFBckIsQ0FBOEIzSyxFQUFFLHdCQUFGLENBQTlCO0FBQ0FBLFVBQUUsa0JBQUYsRUFDS2dHLEdBREwsQ0FDUyxRQURULEVBRUsvRSxJQUZMLENBRVUsa0JBRlYsRUFHSzRKLE1BSEw7QUFJSDtBQTlDTyxDQUFaOztBQWlEQTs7Ozs7QUFLQTJHLElBQUlnQixNQUFKLEdBQWE7QUFDVHJSLFVBQU0sZ0JBQVk7QUFDZHFRLFlBQUlnQixNQUFKLENBQVcyRSxlQUFYO0FBQ0EzRixZQUFJZ0IsTUFBSixDQUFXNEUsZ0JBQVg7QUFDQTVGLFlBQUlnQixNQUFKLENBQVc2RSxZQUFYO0FBQ0gsS0FMUTtBQU1UO0FBQ0FGLHFCQUFpQiwyQkFBWTtBQUN6QmpYLGtCQUFVa0QsRUFBVixDQUFhLGtCQUFiLEVBQWlDLHNCQUFqQyxFQUF5RCxZQUFZO0FBQ2pFcEQsY0FBRSxnQkFBRixFQUFvQm9HLE1BQXBCLENBQTJCO0FBQ3ZCeU0sdUJBQU8saUJBQVk7QUFDZjdTLHNCQUFFLElBQUYsRUFBUW9GLEdBQVIsQ0FBWTtBQUNSME4saUNBQVM7QUFERCxxQkFBWjtBQUdIO0FBTHNCLGFBQTNCO0FBT0gsU0FSRDtBQVNBNVMsa0JBQVVrRCxFQUFWLENBQWEsa0JBQWIsRUFBaUMsdUJBQWpDLEVBQTBELFlBQVk7QUFDbEVwRCxjQUFFLGdCQUFGLEVBQW9CbUcsT0FBcEI7QUFDSCxTQUZEO0FBR0gsS0FwQlE7QUFxQlQ7QUFDQWlSLHNCQUFrQiw0QkFBWTtBQUMxQixZQUFJcFgsRUFBRUMsTUFBRixFQUFVNkMsS0FBVixNQUFxQixHQUF6QixFQUE4QjtBQUMxQjtBQUNBLGdCQUFJd1UsYUFBYXRYLEVBQUUsZ0JBQUYsQ0FBakI7O0FBRUFBLGNBQUUsaUJBQUYsRUFBcUI0RSxJQUFyQixDQUEwQixZQUFZO0FBQ2xDNUUsa0JBQUUsSUFBRixFQUNLd0UsVUFETCxDQUNnQixNQURoQixFQUVLQSxVQUZMLENBRWdCLGFBRmhCO0FBR0gsYUFKRDs7QUFNQXRFLHNCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsaUJBQXRCLEVBQXlDLFVBQVVDLENBQVYsRUFBYTtBQUNsRCxvQkFBSWlVLFdBQVdoVCxRQUFYLENBQW9CLFlBQXBCLENBQUosRUFBdUM7QUFDbkNnVCwrQkFBV3BULFdBQVgsQ0FBdUIsWUFBdkI7QUFDSCxpQkFGRCxNQUVPO0FBQ0hvVCwrQkFBV2pULFFBQVgsQ0FBb0IsWUFBcEI7QUFDSDtBQUNEaEIsa0JBQUVvRixlQUFGO0FBQ0FwRixrQkFBRUMsY0FBRjtBQUNILGFBUkQ7QUFTQTtBQUNBdEQsY0FBRSx1QkFBRixFQUEyQm9ELEVBQTNCLENBQThCLGtCQUE5QixFQUFrRCxZQUFZO0FBQzFEa1UsMkJBQVdwVCxXQUFYLENBQXVCLFlBQXZCO0FBQ0gsYUFGRDtBQUdIO0FBQ0osS0EvQ1E7QUFnRFRtVCxrQkFBYyx3QkFBWTtBQUN0Qm5YLGtCQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsY0FBdEIsRUFBc0MsVUFBVUMsQ0FBVixFQUFhO0FBQy9DLGdCQUFJa1UsVUFBVXZYLEVBQUVxRCxFQUFFMEgsTUFBSixDQUFkO0FBQ0EsZ0JBQUlqRyxVQUFVOUUsRUFBRSxJQUFGLEVBQVErRSxPQUFSLENBQWdCLGNBQWhCLENBQWQ7QUFDQSxnQkFBSXlTLGNBQWMxUyxRQUNiN0QsSUFEYSxDQUNSLGlCQURRLEVBRWJpRixNQUZhLENBRU4sc0JBRk0sQ0FBbEI7O0FBSUEsZ0JBQUlxUixRQUFRblQsRUFBUixDQUFXLHVCQUFYLENBQUosRUFBeUM7QUFDckMsb0JBQUlVLFFBQVFSLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSixFQUFvQztBQUNoQ1EsNEJBQVFaLFdBQVIsQ0FBb0IsWUFBcEI7QUFDQXNULGdDQUFZblQsUUFBWixDQUFxQixXQUFyQjtBQUNBckUsc0JBQUUsSUFBRixFQUNLaUIsSUFETCxDQUNVLHVCQURWLEVBRUtvRixJQUZMLENBRVUsS0FGVjtBQUdILGlCQU5ELE1BTU87QUFDSHZCLDRCQUFRVCxRQUFSLENBQWlCLFlBQWpCO0FBQ0FtVCxnQ0FBWXRULFdBQVosQ0FBd0IsV0FBeEI7QUFDQWxFLHNCQUFFLElBQUYsRUFDS2lCLElBREwsQ0FDVSx1QkFEVixFQUVLb0YsSUFGTCxDQUVVLFFBRlY7QUFHSDtBQUNKO0FBQ0osU0F0QkQ7QUF1Qkg7QUF4RVEsQ0FBYjs7QUEyRUFyRyxFQUFFLFlBQVk7QUFDVkEsTUFBRWtCLEtBQUtDLElBQUwsRUFBRjtBQUNBbkIsTUFBRXdSLElBQUlyUSxJQUFKLEVBQUY7QUFDSCxDQUhEOztBQUtBOzs7QUFHQTtBQUNBLFNBQVNtSSxNQUFULENBQWdCbU8sT0FBaEIsRUFBeUI7QUFDckIsUUFBSXBSLE9BQU9vUixRQUFRcFIsSUFBUixJQUFnQixrQkFBM0I7QUFDQSxRQUFJa0QsU0FBU2tPLFFBQVFsTyxNQUFSLElBQWtCLFNBQS9COztBQUVBLFFBQUltTyxnQkFBZ0IxWCxFQUFFLE9BQUYsRUFBV3FFLFFBQVgsQ0FBb0IsV0FBcEIsQ0FBcEI7QUFDQSxRQUFJc1QsY0FBYzNYLEVBQUUsOEJBQUYsRUFBa0NxRSxRQUFsQyxDQUNkLG1DQURjLENBQWxCOztBQUlBcVQsa0JBQWMvTSxRQUFkLENBQXVCM0ssRUFBRSxNQUFGLENBQXZCO0FBQ0EwWCxrQkFBY3JSLElBQWQsQ0FBbUJBLElBQW5CO0FBQ0FzUixnQkFBWWhOLFFBQVosQ0FBcUIrTSxhQUFyQjs7QUFFQSxRQUFJbk8sV0FBVyxPQUFmLEVBQXdCO0FBQ3BCbU8sc0JBQWNyVCxRQUFkLENBQXVCLFVBQXZCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hxVCxzQkFBY3JULFFBQWQsQ0FBdUIsWUFBdkI7QUFDSDs7QUFFRHVUOztBQUVBQyxRQUFJLFlBQVc7QUFDWEgsc0JBQWNyVCxRQUFkLENBQXVCLFdBQXZCO0FBQ0gsS0FGRDs7QUFJQUosZUFBVyxZQUFXO0FBQ2xCeVQsc0JBQWN4VCxXQUFkLENBQTBCLFdBQTFCO0FBQ0EwVDtBQUNILEtBSEQsRUFHRyxJQUhIOztBQUtBM1QsZUFBVyxZQUFXO0FBQ2xCeVQsc0JBQWM3TSxNQUFkO0FBQ0ErTTtBQUNILEtBSEQsRUFHRyxJQUhIOztBQUtBNVgsTUFBRUcsUUFBRixFQUFZaUQsRUFBWixDQUFlLE9BQWYsRUFBd0IsbUJBQXhCLEVBQTZDLFlBQVc7QUFDcEQsWUFBSTBCLFVBQVU5RSxFQUFFLElBQUYsRUFBUStFLE9BQVIsQ0FBZ0IsWUFBaEIsQ0FBZDtBQUNBRCxnQkFBUVosV0FBUixDQUFvQixXQUFwQjtBQUNBRCxtQkFBVyxZQUFXO0FBQ2xCYSxvQkFBUStGLE1BQVI7QUFDSCxTQUZELEVBRUcsR0FGSDtBQUdBK007QUFDSCxLQVBEOztBQVNBLGFBQVNBLE9BQVQsR0FBbUI7QUFDZjVYLFVBQUUsWUFBRixFQUFnQjRFLElBQWhCLENBQXFCLFVBQVN2QixDQUFULEVBQVk7QUFDN0IsZ0JBQUl5VSxTQUFTOVgsRUFBRSxZQUFGLEVBQWdCMFQsV0FBaEIsQ0FBNEIsSUFBNUIsQ0FBYjtBQUNBMVQsY0FBRSxJQUFGLEVBQVFvRixHQUFSLENBQVksS0FBWixFQUFtQjBTLFNBQVN6VSxDQUFULEdBQWEsRUFBYixHQUFrQkEsQ0FBckM7QUFDSCxTQUhEO0FBSUg7QUFDSjs7QUFFRDtBQUNBLFNBQVN3VSxHQUFULENBQWFFLEVBQWIsRUFBaUI7QUFDYjlYLFdBQU8rWCxxQkFBUCxDQUE2QixZQUFXO0FBQ3BDL1gsZUFBTytYLHFCQUFQLENBQTZCLFlBQVc7QUFDcENEO0FBQ0gsU0FGRDtBQUdILEtBSkQ7QUFLSDs7QUFFRDtBQUNBLFNBQVNFLFlBQVQsQ0FBc0JDLFFBQXRCLEVBQWdDO0FBQzVCLFFBQUlDLE9BQU9oWSxTQUFTaVksZ0JBQVQsQ0FBMEJGLFFBQTFCLENBQVg7QUFDQSxRQUFJRyxNQUFNLElBQUlDLElBQUosRUFBVjtBQUFBLFFBQ0lDLElBQUlGLElBQUlHLE9BQUosRUFEUjtBQUFBLFFBRUlDLElBQUlKLElBQUlLLFFBQUosS0FBaUIsQ0FGekI7QUFBQSxRQUdJQyxJQUFJTixJQUFJTyxXQUFKLEVBSFI7QUFBQSxRQUlJM1QsYUFKSjs7QUFNQSxRQUFJc1QsSUFBSSxFQUFSLEVBQVk7QUFDUkEsWUFBSSxNQUFNQSxDQUFWO0FBQ0g7QUFDRCxRQUFJRSxJQUFJLEVBQVIsRUFBWTtBQUNSQSxZQUFJLE1BQU1BLENBQVY7QUFDSDs7QUFFRHhULFdBQU8wVCxJQUFJLEdBQUosR0FBVUYsQ0FBVixHQUFjLEdBQWQsR0FBb0JGLENBQTNCOztBQUVBLFNBQUssSUFBSWpRLElBQUksQ0FBUixFQUFXdVEsTUFBTVYsS0FBSzVVLE1BQTNCLEVBQW1DK0UsSUFBSXVRLEdBQXZDLEVBQTRDdlEsR0FBNUMsRUFBaUQ7QUFDN0M2UCxhQUFLN1AsQ0FBTCxFQUFRb0UsS0FBUixHQUFnQnpILElBQWhCO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLFNBQVNpUSxtQkFBVCxDQUE2QjRELEtBQTdCLEVBQW9DQyxFQUFwQyxFQUF3QztBQUNwQy9ZLE1BQUU4WSxRQUFRLFFBQVYsRUFBb0IxVixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDcEQsVUFBRThZLEtBQUYsRUFBU3pVLFFBQVQsQ0FBa0IwVSxFQUFsQjtBQUNILEtBRkQ7QUFHQS9ZLE1BQUU4WSxRQUFRLFNBQVYsRUFBcUIxVixFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFXO0FBQ3hDcEQsVUFBRThZLEtBQUYsRUFBUzVVLFdBQVQsQ0FBcUI2VSxFQUFyQjtBQUNILEtBRkQ7QUFHSDs7QUFFRCxTQUFTclEsY0FBVCxDQUF3Qm9RLEtBQXhCLEVBQStCQyxFQUEvQixFQUFtQztBQUMvQi9ZLE1BQUU4WSxLQUFGLEVBQVMxVixFQUFULENBQVksT0FBWixFQUFxQixZQUFXO0FBQzVCcEQsVUFBRSxJQUFGLEVBQVFnTCxXQUFSLENBQW9CK04sRUFBcEI7QUFDSCxLQUZEOztBQUlBL1ksTUFBRUcsUUFBRixFQUFZaUQsRUFBWixDQUFlLDRCQUFmLEVBQTZDLFVBQVNDLENBQVQsRUFBWTtBQUNyRCxZQUFJckQsRUFBRXFELEVBQUUwSCxNQUFKLEVBQVloRyxPQUFaLENBQW9CK1QsS0FBcEIsRUFBMkJ2VixNQUEvQixFQUF1QztBQUN2Q3ZELFVBQUU4WSxLQUFGLEVBQVM1VSxXQUFULENBQXFCNlUsRUFBckI7QUFDQTFWLFVBQUVvRixlQUFGO0FBQ0gsS0FKRDtBQUtIIiwiZmlsZSI6ImNhYmluZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXHJcbmNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbmNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xyXG5jb25zdCAkYm9keSA9ICQoJ2JvZHknKTtcclxuY29uc3QgJGh0bWwgPSAkKCdodG1sJyk7XHJcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcclxuY29uc3QgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xyXG5jb25zdCAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xyXG5jb25zdCAkbWFpbiA9ICQoJy5jYWJpbmV0Jyk7XHJcblxyXG4vL01lbnUgdmFyc1xyXG5jb25zdCAkbWVudSA9ICQoJy5qcy1tZW51Jyk7XHJcbmNvbnN0ICRuYXZNb2JpbGUgPSAkKCcuanMtbW9iaWxlLW5hdicpO1xyXG5jb25zdCAkaGFtYnVyZ2VyID0gJCgnLmpzLW1haW4tbmF2LWJ0bicpO1xyXG5jb25zdCAkaGFtYnVyZ2VyQ3JtID0gJCgnLmpzLWhhbWJ1cmdlcicpO1xyXG5jb25zdCAkbWVudU92ZWxheSA9ICQoJy5qcy1tZW51LW92ZXJsYXknKTtcclxuY29uc3QgJG1lbnVJdGVtRHJvcGRvd24gPSAkKCcuanMtbWVudS1pdGVtLWRyb3Bkb3duJyk7XHJcbmNvbnN0ICRidG5GbG9hdCA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4vKipcclxuXHJcbiAqIEJhc2UuanNcclxuXHJcbiAqXHJcblxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG5cclxuICovXHJcblxyXG5cclxuXHJcbmNvbnN0IEJhc2UgPSB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHRoaXMucmVtb3ZlUHJlbG9hZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd24uaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmFjY29yZGVvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmNoZWNrYm94KCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMucmFkaW9CdG4oKTtcclxuXHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dE1hc2soKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dEV2ZW50cygpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RUb2dnbGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb3B5VGV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLm93bmVyUGhvbmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDaXR5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2F0YWxvZ0l0ZW1TbGlkZXIoKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdC5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXRzLmluaXQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRXhwYW5kZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkhvdmVyQW5pbWF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuU3RhdHVzQW5pbWF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29Ub3AoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkdvVG8oKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkZsb2F0aW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5QdXNoKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC5wb3B1cEZhbmN5Qm94KCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAud2hvSXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC5jaGFuZ2VGb3JtVGl0bGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC5yZWluaXQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuY2xpY2tPdXNpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZWFyY2hCdG5PcGVuQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xyXG5cclxuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNjcm9sbEJhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjNTg1YTU5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIGJveHpvb20gICAgICAgICAgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgdmVyZ2UgICAgICAgICAgICAgOiA1MDAsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGggICAgICAgOiAnMnB4JyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXIgICAgICA6ICdub25lJyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcyJ1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vUmVtb3ZlIHByZWxvYWRlclxyXG5cclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gJCgnYm9keScpLmFkZENsYXNzKCdsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAvLyB9LCA1MDApO1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9Jbml0IGJhc2UgdGFicyBqUSBVaSBUYWJzXHJcblxyXG4gICAgdGFiOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1iYi10YWInKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi10YWInKS50YWJzKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIGNoZWNib3ggJiBjaGVja2JveFBzZXVkb1xyXG5cclxuICAgIGNoZWNrYm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL0JCIGNoZWNrYm94IHBzZXVkb1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vU2VsZWN0IEFsbCBDaGVja2JveFxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC1zZWxlY3QtYWxsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DdXN0b20gcmFkaW9CdG5cclxuXHJcbiAgICAvLyByYWRpb0J0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gICAgIGxldCAkcmFkaW8gPSAkKCcuanMtYmItcmFkaW8nKTtcclxuXHJcblxyXG5cclxuICAgIC8vICAgICAvL0JCIHJhZGlvXHJcblxyXG4gICAgLy8gICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLXJhZGlvJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYgKCRpbnB1dC5pcygnOmNoZWNrZWQnKSkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgJHJhZGlvLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy9DdXN0b20gYWNjb3JkZW9uXHJcblxyXG4gICAgYWNjb3JkZW9uOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRhY2NvcmRlb24gPSAkKCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCRhY2NvcmRlb24ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9BY2NvcmRlb24gY29sbGFwc2VcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItYWNjb3JkZW9uIC5iYi1hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICBlXHJcblxyXG4gICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaXRlbSAgID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwYXJlbnQuZGF0YSgnYWNjb3JkZW9uJykgPT09ICdjb2xsYXBzZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0VG9nZ2xlKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ICAgICA9ICQoJy5qcy1saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrYm94ID0gbGlzdC5maW5kKCcuanMtYmItY2hlY2tib3gnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya0xpc3QgPSBsaXN0LmZpbmQoJy5qcy1saXN0LXRvZ2dsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrYm94Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tib3guaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3RUb2dnbGUoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9Db3B5IHRleHQgY2xpY2sgbGlua1xyXG5cclxuICAgIGNvcHlUZXh0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGNiID0gbmV3IENsaXBib2FyZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vaWYgaGFzIGlucHV0IHRoZW4gY29weSBpbnB1dCB2YWx1ZSBpbiBkYXRhIGF0dHJcclxuXHJcbiAgICAgICAgJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCAgICA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJveCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpbnB1dEljb24gPSAkcGFyZW50LmZpbmQoJy5iYi1pbnB1dF9faWNvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRidG5SZXNldCAgPSAkcGFyZW50LmZpbmQoJy5qcy1pbnB1dC0tY2xlYXInKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaGludCAgICAgID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCAgID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biAgICAgICA9ICRwYXJlbnQuZmluZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkRhdGEgID0gJCh0aGlzKS5kYXRhKCdjbGlwYm9hcmQtdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0VmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uYXR0cignZGF0YS1jbGlwYm9hcmQtdGV4dCcsICRidG5EYXRhICsgJGlucHV0VmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtaW5wdXQtLWNsZWFyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC52YWwoJycpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5mYWRlT3V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9faWNvbicpXHJcblxyXG4gICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZhZGVJbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL1Nob3cgcGhvbmUgbnVtYmVyXHJcblxyXG4gICAgb3duZXJQaG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy11c2VyLXBob25lJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICdqYXZhc2NyaXB0OnZvaWQoMCk7JylcclxuXHJcbiAgICAgICAgICAgICAgICAudGV4dCgkKHRoaXMpLmRhdGEoJ3Bob25lLWhpZGVuJykpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXVzZXItcGhvbmUtLXNob3cnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB1c2VyUGhvbmUgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy11c2VyLXBob25lJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGhvbmUgPSB1c2VyUGhvbmUuZGF0YSgncGhvbmUnKTtcclxuXHJcbiAgICAgICAgICAgIHVzZXJQaG9uZVxyXG5cclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcblxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAndGVsOicgKyBwaG9uZSlcclxuXHJcbiAgICAgICAgICAgICAgICAudGV4dChwaG9uZSk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DaXR5IHNlbGVjdFxyXG5cclxuICAgIGNoYW5nZUNpdHk6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgY2hhbmdlQ2l0eSAgICAgID0gJCgnLmpzLWNpdHktc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5VGl0bGUgPSBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9fdGl0bGUgc3BhbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlQ2l0eVRpdGxlLnRleHQodGV4dCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9CYXNlIHNsaWRlclxyXG5cclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlcicpO1xyXG5cclxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRzICAgICA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSAgICAgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZHMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3cgICAgIDogJG5leHRBcnJvdyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdyAgICAgOiAkcHJldkFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXkgICAgICA6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkIDogNDAwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkICAgICAgICAgOiAxNTAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93ICA6IDMsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlICAgICAgOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzICAgICAgICA6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzICAgICAgICAgIDogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgIDoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90cyAgICAgICAgOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzICAgICAgOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DYXRhbG9nIEl0ZW0gU2xpZGVyXHJcblxyXG4gICAgY2F0YWxvZ0l0ZW1TbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkY2F0YWxvZ0l0ZW1TbGlkZXIgPSAkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkY2F0YWxvZ0l0ZW1TbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgICAgICAgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzICAgICA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSAgICAgID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmhpZGUoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuc2hvdygpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5TG9hZCAgICAgIDogJ29uZGVtYW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkICAgICAgICAgOiA0MDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3cgIDogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzICAgICAgICA6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZSAgICAgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzICAgICAgICAgIDogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgIDoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1dHRvbnM6IHtcclxuXHJcbiAgICAgICAgLy9idG4gZXhwYW5kZWRcclxuXHJcbiAgICAgICAgYnRuRXhwYW5kZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgYWRkUmVtb3ZlQ2xhc3MoJy5qcy1idG4tZXhwYW5kZWQnLCAnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIGFuaW1hdGUgb24gaG92ZXJcclxuXHJcbiAgICAgICAgYnRuSG92ZXJBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCAgICAgICAgID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSAgICAgICAgID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnV0dG9uLWFuaW1hdGVfX2hvdmVyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYICAgICAgICAgPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxZICAgICAgICAgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wIDogcmVsWSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWxYXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gc3RhdHVzIGFuaW1hdGVcclxuXHJcbiAgICAgICAgYnRuU3RhdHVzQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2xpY2sgPSAwO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xpY2srKztcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN1Y2Nlc3MgPSAkKHRoaXMpLmRhdGEoJ21lc3NhZ2Utc3VjY2VzcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0RXJyb3IgICA9ICQodGhpcykuZGF0YSgnbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjbGljayA8PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWVycm9yJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVwKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCAgOiB0ZXh0RXJyb3IsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2Vycm9yJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVwKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dFN1Y2Nlc3NcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtcmVhZHknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vZmxvYXRpbmcgYnRuIGFuaW1hdGluXHJcblxyXG4gICAgICAgIGJ0bkZsb2F0aW5nOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBydW4gID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0YHRgdGL0LvQutCwINC+0YLQutGA0YvQstCw0LXRgiDQvNC+0LTQsNC70LrRgywg0YLQviDQv9C+INC+0YLQutGA0YvRgtC40Y4g0LzQvtC00LDQu9C60Lgg0YHQutGA0YvQstCw0LXRgiDQutC90L7Qv9C60LhcclxuXHJcbiAgICAgICAgICAgICQoJy5tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJ0blB1c2g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50LmZpbmQoJ1tkYXRhLXB1c2hdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXR1cyAgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcHVzaFVwKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCAgOiBtZXNzYWdlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiAgPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDYwICsgJ3B4J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkcm9wZG93bjoge1xyXG5cclxuICAgICAgICAvL0N1c3RvbSBkcm9wZG93blxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkZHJvcGRvd24ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdiYi1kcm9wZG93bi0taG92ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dIaWRlKCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93bi5iYi1kcm9wZG93bi0tdHJhbnNmb3JtJ1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJiYi1kcm9wZG93bl9fY2xvc2UganMtYmItZHJvcGRvd24tLWNsb3NlXCI+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25PdmVybGF5ID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmItZHJvcGRvd25fX292ZXJsYXlcIj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSAkKHRoaXMpLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5DbG9zZS5hcHBlbmRUbygkZHJvcGRvd25MaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duT3ZlcmxheS5pbnNlcnRBZnRlcigkZHJvcGRvd25MaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5maW5kKCcuaW5mby1ibG9ja19faWNvbicpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93SGlkZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duICAgID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRidG5GbG9hdGluZyA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmlzKCcuYmItZHJvcGRvd25fX292ZXJsYXknKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duIC5pbmZvLWJsb2NrX19saW5rJyxcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCcuaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dHM6IHtcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcblxyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy10aW1lLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk6OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvZGUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOSA5IDkgOSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29uZmlybS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWVtYWlsLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyp7MSwyMH1bLip7MSwyMH1dWy4qezEsMjB9XVsuKnsxLDIwfV1AKnsxLDIwfVsuKnsyLDZ9XVsuKnsxLDJ9XScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeSAgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzdGVkVmFsdWUgPSBwYXN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhc3RlZFZhbHVlLnJlcGxhY2UoJ21haWx0bzonLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IgIDogXCJbMC05QS1aYS16ISMkJSYnKisvPT9eX2B7fH1+LV1cIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmcgICAgIDogJ2xvd2VyJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC0tY29weScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgaW5wdXQgc2VsZWN0IHZhbHVlXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vU2hvdyBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0hpZGUgUGFzc3dvcmRcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9FZGl0IFRleHQgRmllbGRcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZmllbGQtZWRpdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXQgICAgICA9ICQoJy5qcy1maWVsZC1lZGl0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRCdG4gICA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9fYnRuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0SW5wdXQuc2hvdygpLnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0SW5wdXRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmJsdXIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAgJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09ICcxMycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAgJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1pbnB1dCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnbm8tY2xvc2UnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW9iaWxlLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtICA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgICAgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb2JpbGUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZWxlY3Q6IHtcclxuXHJcbiAgICAgICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tbXVsdGlwbGUnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWdzOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5iYi1zZWxlY3QtLW1ldHJvJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGFkZFVzZXJQaWNcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1pY29uJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb24gICAgICA6IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQgICAgICAgICA6IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tc2VydmljZXMnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogdGltZUFuZFByaWNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0ICAgOiB0aW1lQW5kUHJpY2VcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtYm9ybicpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NsZWFyICAgICAgICAgICAgIDogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWV0cm8taWNvbiBtZXRyby1pY29uLS0nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIGZvbnRhd2Vzb21lIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlmb3JtYXQoaWNvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbE9wdGlvbiA9IGljb24uZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPjxpIGNsYXNzPVwic2VsZWN0Ml9faWNvbicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQob3JpZ2luYWxPcHRpb24pLmRhdGEoJ2ljb24nKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pPiAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24udGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1NlbGVjdCBBZGQgUHJpY2UgVGltZSAmIFByaWNlXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0aW1lQW5kUHJpY2Uob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsVGltZSAgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCd0aW1lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsUHJpY2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdwcmljZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQudGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxUaW1lICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFByaWNlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdE5hdGl2ZSA9ICQoJy5qcy1zZWxlY3QtbmF0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyICA9ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gJCh0aGlzKS5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3B0aW9uOmZpcnN0LWNoaWxkJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGZpcnN0T3B0aW9uLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtcGxhY2Vob2xkZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLndyYXAoJzxsYWJlbCBjbGFzcz1cImJiLXNlbGVjdFwiPicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sb3JTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1llYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVllYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVzZXRCdG4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVDb2RlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xvclNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC0tY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNvbG9yU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QtY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzZWFyY2gtZW5hYmxlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdCAgIDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudCAgIDogJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb24gICAgICA6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQgICAgICAgICA6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQgICAgICAgICA6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29sb3IgYmFsbCBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaUJhbGwoY29sb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRvcmlnaW5hbE9wdGlvbiA9IGNvbG9yLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvckJhbGwgICAgICAgPSAkKCRvcmlnaW5hbE9wdGlvbikuZGF0YSgnY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IudGV4dC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19saW5lXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH1cIj48L3NwYW4+PHA+ICR7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLnRleHRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDwvcD48L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2JhbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfSBcIj4gPC9zcGFuPiA8L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXNldC15ZWFyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZVllYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICR5ZWFyU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC1ib3JuLS1jbGVhcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub2ZmKCdzZWxlY3QyOm9wZW5pbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKCkgPT0gJycgJiZcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJvcm4nKSA9PT0gJ3llYXInXHJcblxyXG4gICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZGF0ZVNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRhdGVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGhvbmVDb2RlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHNlbGVjdCByZXN1bHRzIHRvIG9wdGlvbiB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVNlbGVjdGlvbihvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0VmFsID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArIG9wdFZhbCArICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGNpdHkgbmFtZSB0byBvcHRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVSZXN1bHQob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50cnkgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdjb3VudHJ5JyksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbCAgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0VmFsICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkcGhvbmVDb2RlQm94ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dC1waG9uZS1jb2RlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkcGhvbmVDb2RlQm94Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRwaG9uZUNvZGVCb3guZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0ICA9ICQodGhpcykuZmluZCgnLmJiLWlucHV0X19pbnB1dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPj0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdCAgIDogc2VsZWN0Q29kZVJlc3VsdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHNlbGVjdENvZGVTZWxlY3Rpb24sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50ICAgOiAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmItaW5wdXQtLXNlbGVjdC12YWx1ZVwiPjwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uU2VsZWN0ID0gJHBhcmVudC5maW5kKCdvcHRpb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RWYWx1ZSAgPSAkcGFyZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5iYi1pbnB1dC0tc2VsZWN0LXZhbHVlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoMCkudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9ICQodGhpcylbMF0uc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcShjb3VudGVyKS52YWwoKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogJyg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdmb2N1cycsIGFkZEZvY3VzKS5vbignYmx1cicsIHJlbW92ZUZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOm9wZW4nLCBhZGRGb2N1cylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpjbG9zZScsIHJlbW92ZUZvY3VzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUZvY3VzKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW9iaWxlLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtICA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgICAgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb2JpbGUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBtZW51OiB7XHJcblxyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG5cclxuICAgICAgICBoYW1idXJnZXJCdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fYWRkU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vV2hlbiBDbGljayBPdXRzaWRlIENsb3NlIE1lbnVcclxuXHJcbiAgICAgICAgY2xpY2tPdXNpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmpzLW1vYmlsZS1uYXYsIC5qcy1kYXRlLCAuZGF0ZXBpY2tlciwgLmNhcmQtaW5mb19fcmVxdWVzdCwgLmNhdGFsb2ctZmlsdGVyLCAuanMtbW9iaWxlLWZpbHRlci0tb3BlbiwgLmpzLWJiLWFjY29yZGVvbidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5vdmVybGF5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCBCdG4gb3Blbi9jbG9zZVxyXG5cclxuICAgICAgICBzZWFyY2hCdG5PcGVuQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlYXJjaEJ0biA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLWJ0bicpO1xyXG5cclxuICAgICAgICAgICAgc2VhcmNoQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hZGRTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcG9wdXA6IHtcclxuXHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG5cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzcyAgICAgICAgOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1cyAgICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UgICAgICAgICAgICA6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWQ6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlXCJdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdmYW5jeWJveC1jb250YWluZXItLWltYWdlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhciAgOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGUgICA6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrQ29udGVudDogJ2Nsb3NlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGUgIDogJ2Nsb3NlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzcyAgICAgICAgOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2ggICAgICAgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyICAgICAgICAgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNtYWxsQnRuICAgICAgICAgOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzICAgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzICAgICAgICAgIDoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tY2xvc2VdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tY2xvc2VdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3MgICAgICAgIDogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoICAgICAgICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzbWFsbEJ0bjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vZGFsOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRm9ybSBXaG8gSXM/XHJcblxyXG4gICAgICAgIHdob0lzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB3aG9pcyA9ICQodGhpcykuZGF0YSgnd2hvaXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSAgPSAkKCcjYXV0aC1mb3JtJykuZmluZCgnLmZvcm0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2hvaXMgPT09ICdtYXN0ZXInKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLW1hc3RlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2hvaXMgPT09ICdzdHVkaW8nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLXN0dWRpbycpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLWNsaWVudCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL0R1bmFtaWNseSBjaGFuZ2UgZm9ybSB0aXRsZVxyXG5cclxuICAgICAgICBjaGFuZ2VGb3JtVGl0bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgJy5qcy1mb3JtLXRpdGxlJyxcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQodGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmFzZS5zZWxlY3QuY29sb3JTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIENybS5qc1xyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3QgQ3JtID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY29udHJvbEJveCgpO1xyXG5cclxuICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQ3JtKCk7XHJcbiAgICAgICAgdGhpcy5tZW51Lm1lbnVJdGVtRHJvcGRvd24oKTtcclxuICAgICAgICB0aGlzLm1lbnUuY2xpY2tPdXRzaWRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVycy50cml1bXBoKCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJzLnNsaWRlclBvcHVwUmVpbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMubW9iaWxlQmxvY2suYm9keVBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVCbG9jay5yZXF1ZXN0SXRlbUNsaWNrKCk7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVCbG9jay5jYWxsQXBsaWNhdGlvbk1vYmlsZUJsb2NrKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JhcGhpYy5pbml0KCk7XHJcblxyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmluaXQoKTtcclxuICAgICAgICBDcm0ucmVxdWVzdC5pbml0KCk7XHJcbiAgICAgICAgQ3JtLnN0ZXBzLmluaXQoKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLmluaXQoKTtcclxuICAgICAgICBDcm0uc2VydmljZXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJveFJlc2l6ZSgpO1xyXG4gICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgQ3JtLmJveFJlc2l6ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGNvbnRyb2xCb3g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1jb250cm9sLWJveC1idG4nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtY29udHJvbC1ib3gnKVxyXG4gICAgICAgICAgICAgICAgLnNsaWRlVG9nZ2xlKHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYm94UmVzaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnYmctLWRhcmsnKTtcclxuICAgICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoJ2JnLS13aGl0ZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtY29udHJvbC1ib3gnKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnYmctLWRhcmsnKTtcclxuICAgICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2JnLS13aGl0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZW51OiB7XHJcbiAgICAgICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAgICAgaGFtYnVyZ2VyQ3JtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRoYW1idXJnZXJDcm0ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLW1vdmluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIENybS5tZW51LnJlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtZW51LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnaXMtbW92aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2JpbGVOYXZCdG46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtYnRuJykub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKFxyXG4gICAgICAgICAgICAgICAgZVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLm1lbnUucmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9XaGVuIGNsaWNrIG91dHNpZGUgTWVudSBkbyB0aGlzXHJcbiAgICAgICAgY2xpY2tPdXRzaWRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tYWluLW5hdi1idG4sIC5qcy1tb2JpbGUtbmF2LCAubWVudS1kcm9wZG93biwgLmpzLW1lbnUtaXRlbS1kcm9wZG93biwgLmpzLWhhbWJ1cmdlcidcclxuICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICRoYW1idXJnZXIucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICAgICAkaGFtYnVyZ2VyQ3JtLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBDcm0ubWVudS5yZW1vdmVTdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1lbnVPdmVsYXkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9NZW51IGRyb3Bkb3duXHJcbiAgICAgICAgbWVudUl0ZW1Ecm9wZG93bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnZHJvcGRvd24tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXQuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhhbWJ1cmdlckNybS5yZW1vdmVDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLW1vdmluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJG1lbnVPdmVsYXkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZHJvcGRvd24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0LmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkaGFtYnVyZ2VyQ3JtLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkcm9wZG93bi1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLW1vdmluZycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVN0eWxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRtZW51SXRlbURyb3Bkb3duLnJlbW92ZUNsYXNzKCdkcm9wZG93bi1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdpcy1tb3ZpbmcnKTtcclxuICAgICAgICAgICAgQ3JtLm1lbnUuaHRtbFJlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgICAgICRidG5GbG9hdC5mYWRlSW4oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGh0bWxSZW1vdmVTdHlsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuanMtbW9iaWxlLW5hdi1idG4sIC5qcy1tb2JpbGUtbmF2LCAuanMtbW9iaWxlLWJsb2NrLS1zaG93LCAuanMtcmVxdWVzdC1pdGVtJ1xyXG4gICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzbGlkZXJzOiB7XHJcbiAgICAgICAgLy9Ucml1bXBoIHNsaWRlclxyXG4gICAgICAgIHRyaXVtcGg6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtYmItc2xpZGVyLS10cml1bXBoJyk7XHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5OZXh0ID0gJCh0aGlzKS5maW5kKCcuanMtYmItc2xpZGVyLWJ0bi0tbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbiAoXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTbGlkZSArIDEgPT09IHNsaWNrLnNsaWRlQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bk5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bk5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKCdzbGlja05leHQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRGlzYWJsZSBjaGFuZ2Ugc2xpZGUgb24gY2xpY2sgZG90c1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlci5maW5kKCcuc2xpY2stZG90cyBsaSBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL1JlaW5pdCBzbGlkZXIgYWZ0ZXIgcG9wdXAgb3BlblxyXG4gICAgICAgIHNsaWRlclBvcHVwUmVpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5tb2RhbCcpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJbMF0uc2xpY2suc2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vYmlsZUJsb2NrOiB7XHJcbiAgICAgICAgYm9keVBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFycmVudCA9ICQoJy5qcy1tb2JpbGUtYmxvY2snKTtcclxuICAgICAgICAgICAgbGV0ICRmb290ZXIgPSAkcGFycmVudC5jaGlsZHJlbignLm1vYmlsZS1ibG9ja19fZm9vdGVyJyk7XHJcbiAgICAgICAgICAgICRwYXJyZW50XHJcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5tb2JpbGUtYmxvY2tfX2JvZHknKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnYm90dG9tJywgJGZvb3Rlci5vdXRlckhlaWdodCh0cnVlKSk7XHJcblxyXG4gICAgICAgICAgICAkcGFycmVudC5maW5kKCcubW9iaWxlLWJsb2NrX19ib3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19mb290ZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLm1vYmlsZS1ibG9ja19fYm9keScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYm90dG9tJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2JpbGUtYmxvY2tfX2JveCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5tb2JpbGUtYmxvY2tfX2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub3V0ZXJIZWlnaHQodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL1Nob3cgLyBIaWRlIG1vYmlsZSBhcGxpY2F0aW9uXHJcbiAgICAgICAgY2FsbEFwbGljYXRpb25Nb2JpbGVCbG9jazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1tb3ZlLWJsb2NrLS1zaG93JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkd2luZG93LndpZHRoKCkgPj0gMTIwMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ3JlcXVlc3QtaXRlbScpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bklkID0gJCh0aGlzKS5hdHRyKCdkYXRhLW1vdmUtYmxvY2stdGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnW2RhdGEtbW92ZS1ibG9ja10nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJ1tkYXRhLW1vdmUtYmxvY2s9JyArIGJ0bklkICsgJ10nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFkZENsYXNzKCdpcy1maXhlZCcpLmNzcygncG9zaXRpb24nLCAnZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgQ3JtLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLW1vdmUtYmxvY2stYm94LS1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb3ZlLWJsb2NrX19ib3gnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIENybS5tb2JpbGVCbG9jay5ib2R5UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1tb3ZlLWJsb2NrLS1jbG9zZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb3ZlLWJsb2NrJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIGJvZHlGaXhlZCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBib2R5Rml4ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRkb2N1bWVudC5maW5kKCcuanMtbW92ZS1ibG9jaycpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKS5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vQ2xpY2sgcmVxdWVzdCBpdGVtXHJcbiAgICAgICAgcmVxdWVzdEl0ZW1DbGljazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1yZXF1ZXN0LWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1tb3ZlLWJsb2NrLWFwbGljYXRpb24nKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1tb3ZlLWJsb2NrLWFwbGljYXRpb24tLWNsb3NlJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qcy1tb3ZlLWJsb2NrLWFwbGljYXRpb24nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBncmFwaGljOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRldGVjdEhlaWdodCgpO1xyXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBDcm0uZ3JhcGhpYy5kZXRlY3RIZWlnaHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXRlY3RIZWlnaHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0ICR0YWJsZSA9ICRkb2N1bWVudC5maW5kKCcuanMtZ3JhcGgtdGFibGUnKTtcclxuXHJcbiAgICAgICAgICAgICR0YWJsZS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkdGFibGVXb3JrZXIgPSAkKHRoaXMpLmZpbmQoJy5ncmFwaC10YWJsZV9fd29ya2VyJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRhYmxlV29ya2VyVHIgPSAkdGFibGVXb3JrZXIuZmluZCgndHInKS5ub3QoJzpmaXJzdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICR0YWJsZUhvdXJzID0gJCh0aGlzKS5maW5kKCcuZ3JhcGgtdGFibGVfX2hvdXJzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRhYmxlSG91cnNUciA9ICR0YWJsZUhvdXJzLmZpbmQoJ3RyJykubm90KCc6Zmlyc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGFibGVIb3Vyc1RyLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEhvdXJzSXRlbSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1ncmFwaC10YWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZ3JhcGgtdGFibGVfX3dvcmtlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCd0cicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0KCQodGhpcyksIGN1cnJlbnRIb3Vyc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRhYmxlV29ya2VyVHIuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50V29ya2VySXRlbSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1ncmFwaC10YWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZ3JhcGgtdGFibGVfX2hvdXJzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3RyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnOmZpcnN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQoJCh0aGlzKSwgY3VycmVudFdvcmtlckl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWF4SGVpZ2h0KF90aGlzLCBlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRIZWlnaHQgPSBfdGhpcy5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SGVpZ2h0ID4gZWxlbS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY3NzKCdoZWlnaHQnLCBtYXhIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENybSBBcGxpY2F0aW9uXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uYXBsaWNhdGlvbiA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5hcGxpY2F0aW9uVGFiKCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uc2hvd05ld0NsaWVuRm9ybSgpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLnNob3dBcGxpY2F0aW9uSXRlbU9wdGlvbnMoKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5hcGxpY2F0aW9uSXRlbUNvdW50ZXIoKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5zZWxlY3RTaG93U2VydmljZSgpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmFwbGljYXRpb25JdGVtUmVzZXQoKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5jaGFuZ2VTcnZpY2UoKTtcclxuXHJcbiAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuICAgICAgICAgICAgQ3JtLmFwbGljYXRpb24uc2VhcmNoT3ZlcmxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0luaXQgQXBsaWNhdGlvbiB0YWJzXHJcbiAgICBhcGxpY2F0aW9uVGFiOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0ICRhcGxpY2F0aW9uVGFiID0gJCgnLmpzLWFwbGljYXRpb24tdGFiJyk7XHJcbiAgICAgICAgJGFwbGljYXRpb25UYWIudGFicygpO1xyXG5cclxuICAgICAgICAvL0lmIGFwbGljYXRpb24gdGFiIGNoYXQgdGhlbiBoaWRlIGFwbGljYXRpb24gYnRuc1xyXG4gICAgICAgICRhcGxpY2F0aW9uVGFiLmZpbmQoJy50YWJfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSAkKCcuYXBsaWNhdGlvbl9fYnRucycpO1xyXG4gICAgICAgICAgICBsZXQgYmxvY2tGb290ZXIgPSAkKCcuanMtbW92ZS1ibG9jaycpXHJcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5tb3ZlLWJsb2NrX19ib3gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5tb3ZlLWJsb2NrX19mb290ZXInKTtcclxuICAgICAgICAgICAgbGV0IGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChocmVmID09PSAnI2FwbGljYXRpb24tY2hhdCcpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBibG9ja0Zvb3Rlci5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgYmxvY2tGb290ZXIucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBDcm0ubW9iaWxlQmxvY2suYm9keVBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2Nyb2xsJylcclxuICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1Nob3cgTmV3IENsaWVudCBGb3JtXHJcbiAgICBzaG93TmV3Q2xpZW5Gb3JtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWRkUmVtb3ZlQ2xhc3NCbG9jaygnLmpzLW5ldy1jbGllbnQnLCAnaXMtb3BlbicpO1xyXG4gICAgfSxcclxuICAgIC8vV2hlbiBjbGljayBidG4gZWRpdFxyXG4gICAgc2hvd0FwbGljYXRpb25JdGVtT3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFwbGljYXRpb24taXRlbS0tZWRpdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX3dyYXAnKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQ291bnRlciBpbml0IGZ1bmN0aW9uXHJcbiAgICBhcGxpY2F0aW9uSXRlbUNvdW50ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuanMtYXBsaWNhdGlvbi1pdGVtJykuZWFjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FwbGljYXRpb24taXRlbS0tc2hvcnQnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYXBsaWNhdGlvbi1pdGVtX19jb3VudGVyJylcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChlICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0FmdGVyIHNlbGVjdCBtYXN0ZXIgY2hhbmdlXHJcbiAgICBzZWxlY3RTaG93U2VydmljZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignc2VsZWN0MjpzZWxlY3QnLCAnLmpzLXNlbGVjdC1zaG93LXNlcnZpY2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFycmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWFwbGljYXRpb24taXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoJHBhcnJlbnQuaGFzQ2xhc3MoJ2FwbGljYXRpb24taXRlbS0tc2hvcnQnKSkge1xyXG4gICAgICAgICAgICAgICAgJHBhcnJlbnRcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1idG4tLXJlc2V0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJHBhcnJlbnQucmVtb3ZlQ2xhc3MoJ2FwbGljYXRpb24taXRlbS0tc2hvcnQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRwYXJyZW50LmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpLnNsaWRlRG93bih7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENybS5hcGxpY2F0aW9uLmFwbGljYXRpb25JdGVtQ291bnRlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vV2hlbiBjaGFuZ2Ugc2VydmljZSByZXNldCB0aGlzIG9wdGlvbnNcclxuICAgIGNoYW5nZVNydmljZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignc2VsZWN0MjpzZWxlY3QnLCAnLmpzLXNlbGVjdC0tc2VydmljZXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFycmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWFwbGljYXRpb24taXRlbScpO1xyXG4gICAgICAgICAgICAkcGFycmVudFxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X193cmFwJylcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tLWVkaXQnKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0FwbGljYXRpb24gaXRlbSByZXNldFxyXG4gICAgYXBsaWNhdGlvbkl0ZW1SZXNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFwbGljYXRpb24taXRlbS1idG4tLXJlc2V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcnJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hcGxpY2F0aW9uLWl0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKCEkcGFycmVudC5oYXNDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkcGFycmVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuanMtc2VsZWN0LS1tYXN0ZXIsIC5qcy1zZWxlY3QtLXRpbWUsIC5qcy1zZWxlY3QtZHVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAudmFsKCcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLWJ0bi0tcmVzZXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9fd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLS1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAudmFsKCcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYXBsaWNhdGlvbi1pdGVtX19jb3VudGVyJylcclxuICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1NlcmNoIGZvY3VzIHNob3cgY2xpZW50ICsgb3ZlcmxheVxyXG4gICAgc2VhcmNoT3ZlcmxheTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCAkaW5wdXQgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5LWlucHV0Jyk7XHJcbiAgICAgICAgbGV0ICRvdmVybGF5ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWFyY2gtb3ZlcmxheScpO1xyXG4gICAgICAgIGxldCAkYXBsaWNhdGlvbiA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbicpO1xyXG4gICAgICAgIGxldCAkdXNlciA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fdXNlcicpO1xyXG4gICAgICAgIGxldCAkZW1wdHlCbG9jayA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fZW1wdHknKTtcclxuICAgICAgICBsZXQgJGJ0bk5ld0NsaWVudCA9ICRkb2N1bWVudC5maW5kKCcuanMtbW92ZS1ibG9jay0tc2hvdycpO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgLm9uKCdmb2N1cycsICcuanMtc2VhcmNoLW92ZXJsYXktaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgJGFwbGljYXRpb24uYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAkdXNlci5hZGRDbGFzcygnYW5pbWF0ZWQgZmFkZUluTGVmdCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgJGVtcHR5QmxvY2suaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bk5ld0NsaWVudC5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZW1vdmVGb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgJy5qcy1zZWFyY2gtb3ZlcmxheScsIF9yZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVGb2N1cygpIHtcclxuICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgJGFwbGljYXRpb24ucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICR1c2VyLnJlbW92ZUNsYXNzKCdhbmltYXRlZCBmYWRlSW5MZWZ0JykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgJGlucHV0LmJsdXIoKTtcclxuICAgICAgICAgICAgJGVtcHR5QmxvY2suc2hvdygpO1xyXG4gICAgICAgICAgICAkYnRuTmV3Q2xpZW50LmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JtIFJlcXVlc3RcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5yZXF1ZXN0ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPj0gMTIwMCkge1xyXG4gICAgICAgICAgICBDcm0ucmVxdWVzdC5zb3J0TXVsdGlwbGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBDcm0ucmVxdWVzdC50YWJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vRnVuY3Rpb24gc29ydGFibGVcclxuICAgIHNvcnRNdWx0aXBsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5qcy1zb3J0YWJsZScpXHJcbiAgICAgICAgICAgIC5zb3J0YWJsZSh7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0V2l0aDogJy5qcy1zb3J0YWJsZScsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcclxuICAgICAgICAgICAgICAgIHRvbGVyYW5jZTogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChlLCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpLml0ZW0uYWRkQ2xhc3MoJ2RyYWctc29ydCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uIChlLCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ2RyYWctc29ydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ3JlcXVlc3QtaXRlbS0tbmV3Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLnJlcXVlc3Qud2lnZXRSZXBsYWNlSWNvbih1aS5pdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmRpc2FibGVTZWxlY3Rpb24oKTtcclxuICAgIH0sXHJcbiAgICAvL1JlcGxhY2UgaWNvbiB3aGVuIGRyYWcgaXRlbVxyXG4gICAgd2lnZXRSZXBsYWNlSWNvbjogZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgbGV0IHdpZGdldCA9IGVsLmNsb3Nlc3QoJy5yZXF1ZXN0X193aWRnZXQnKTtcclxuICAgICAgICBsZXQgaWNvbiA9IGVsLmZpbmQoJy5yZXF1ZXN0LWl0ZW1fX2ljb24nKTtcclxuXHJcbiAgICAgICAgbGV0IGljb25OZXcgPSAncmVxdWVzdC1pdGVtX19pY29uIGZhbCBmYS1zbWlsZSc7XHJcbiAgICAgICAgbGV0IGljb25Xb3JrID0gJ3JlcXVlc3QtaXRlbV9faWNvbiBmYWwgZmEtY2xvY2snO1xyXG4gICAgICAgIGxldCBpY29uRG9uZSA9ICdyZXF1ZXN0LWl0ZW1fX2ljb24gZmFsIGZhLWNoZWNrLWNpcmNsZSc7XHJcbiAgICAgICAgbGV0IGljb25BYm9ydCA9ICdyZXF1ZXN0LWl0ZW1fX2ljb24gZmFsIGZhLWZyb3duJztcclxuXHJcbiAgICAgICAgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS1uZXcnKSkge1xyXG4gICAgICAgICAgICBpY29uLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoaWNvbk5ldyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0td29yaycpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uV29yayk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0tZG9uZScpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uRG9uZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0tYWJvcnQnKSkge1xyXG4gICAgICAgICAgICBpY29uLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoaWNvbkFib3J0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9SZXF1ZXN0IHRhYnNcclxuICAgIHRhYnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuanMtcmVxdWVzdC10YWInKS50YWJzKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JtIFNlcnZpY2VzXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uc2VydmljZXMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ3JtLnNlcnZpY2VzLnNlbGVjdFRpbWUoKTtcclxuICAgICAgICBDcm0uc2VydmljZXMuc2hvd0FkZFNlcnZpY2UoKTtcclxuICAgICAgICBDcm0uc2VydmljZXMuc2hvd1NlcnZpY2VJdGVtKCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMDI0KSB7XHJcbiAgICAgICAgICAgIC8vIENybS5zZXJ2aWNlcy5pdGVtSG92ZXIoKTtcclxuICAgICAgICAgICAgQ3JtLnJlcXVlc3Quc29ydE11bHRpcGxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGl0ZW1Ib3ZlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCAkaXRlbSA9ICQoJy5qcy1zZXJ2aWNlLWl0ZW0nKTtcclxuXHJcbiAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5pcygnOmZvY3VzJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0Lmhhc0NsYXNzKCdzZWxlY3QyLWNvbnRhaW5lci0tb3BlbicpXHJcbiAgICAgICAgICAgICAgICApIHt9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNlbGVjdFRpbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1zZXJ2aWNlLWl0ZW0nKS5maW5kKCdzZWxlY3QnKTtcclxuICAgICAgICAkc2VsZWN0Lm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZXJ2aWNlLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1ob3ZlcicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNob3dBZGRTZXJ2aWNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYWRkLXNlcnZpY2UtLWFkZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJHBhcmVudC5maW5kKCcuanMtYWRkLXNlcnZpY2UtLWNsb3NlJyk7XHJcbiAgICAgICAgICAgIGxldCAkYmxvY2tzID0gJHBhcmVudC5maW5kKCcuYWRkLXNlcnZpY2VfX2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bkNsb3NlLnNob3coKTtcclxuICAgICAgICAgICAgJGJsb2Nrcy5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1hZGQtc2VydmljZS0tY2xvc2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYWRkLXNlcnZpY2UnKTtcclxuICAgICAgICAgICAgbGV0ICRidG5PcGVuID0gJHBhcmVudC5maW5kKCcuanMtYWRkLXNlcnZpY2UtLWFkZCcpO1xyXG4gICAgICAgICAgICBsZXQgJGJsb2NrcyA9ICRwYXJlbnQuZmluZCgnLmFkZC1zZXJ2aWNlX19pbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICRidG5PcGVuLnNob3coKTtcclxuICAgICAgICAgICAgJGJsb2Nrcy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNob3dTZXJ2aWNlSXRlbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWJsb2NrLXRhcmdldCcpO1xyXG5cclxuICAgICAgICAgICAgJHBhcmVudC5maW5kKCcuanMtdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcignOnRleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdqc0NybUNvbWJvVGl0bGVTZXJ2aWNlcycpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnW2RhdGEtYmxvY2tdJylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCdbZGF0YS1ibG9jaz0nICsgaWQgKyAnXScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gU3RlcHNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5zdGVwcyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgLy8gQ3JtLnN0ZXBzLnNvcnRhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENybS5zdGVwcy50YWJzKCk7XHJcbiAgICAgICAgQ3JtLnN0ZXBzLnNob3dTZWFyY2goKTtcclxuICAgIH0sXHJcbiAgICAvL1N0ZXBzIHRhYnNcclxuICAgIHRhYnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuanMtc3R1ZGlvLXN0ZXAnKS50YWJzKCk7XHJcbiAgICB9LFxyXG4gICAgLy9TdGVwcyBidG4gc2hvdyBzZWFyY2hcclxuICAgIHNob3dTZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1idG4tc3RlcHMtc2VhcmNoLS1zaG93JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuc3RlcHNfX3NlYXJjaCcpLmZhZGVUb2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1N0ZXBzIHNvcnRhYmxlIGl0ZW1cclxuICAgIHNvcnRhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJy5iYi11cGxvYWRfX2xpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCgnLmJiLXVwbG9hZF9fbGlzdCcpXHJcbiAgICAgICAgICAgICAgICAuc29ydGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAnLmJiLXVwbG9hZF9faXRlbTpub3QoLmlzLXVuc29ydGFibGUpJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250YWlubWVudDogJ3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9sZXJhbmNlOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChlLCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLmFkZENsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uIChlLCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwcy5yZXBsYWNlVGl0bGVBZnRlclNvcnRhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ2RyYWctc29ydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZGlzYWJsZVNlbGVjdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL1JlcGxhY2UgaXRlbSB0aXRsZSBhZnRlciBzb3J0dGFibGVcclxuICAgIHJlcGxhY2VUaXRsZUFmdGVyU29ydGFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaG9tZSA9ICQoJzxzcGFuIGNsYXNzPVwiYmItdXBsb2FkX19ob21lXCI+Jyk7XHJcbiAgICAgICAgaG9tZS50ZXh0KCfQk9C70LDQstC90LDRjycpLmFwcGVuZFRvKCQoJy5iYi11cGxvYWRfX2l0ZW06Zmlyc3QnKSk7XHJcbiAgICAgICAgJCgnLmJiLXVwbG9hZF9faXRlbScpXHJcbiAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXHJcbiAgICAgICAgICAgIC5maW5kKCcuYmItdXBsb2FkX19ob21lJylcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENybSBTdHVkaW9cclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5zdHVkaW8gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQ3JtLnN0dWRpby5hdmF0YXJUb2dnbGVCdG4oKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLndvcmtlclBhZ2VUb2dnbGUoKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLmNhdGVnb3J5U2hvdygpO1xyXG4gICAgfSxcclxuICAgIC8vQXZhdGFyIGJ0biBvcGVuIC8gY2xvc2VcclxuICAgIGF2YXRhclRvZ2dsZUJ0bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcuanMtYWRkLWF2YXRhci0tb3BlbicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWFkZC1hdmF0YXInKS5mYWRlSW4oe1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmpzLWFkZC1hdmF0YXItLWNsb3NlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtYWRkLWF2YXRhcicpLmZhZGVPdXQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL09wZW4gLyBDbG9zZSBBZGRXb3JrZXIgcGFnZVxyXG4gICAgd29ya2VyUGFnZVRvZ2dsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgLy9PcGVuIGFkZCB3YXJrZXIgcGFnZVxyXG4gICAgICAgICAgICBsZXQgJGFkZFdvcmtlciA9ICQoJy5qcy13b3JrZXItYWRkJyk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtd29ya2VyLWl0ZW0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignaHJlZicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtd29ya2VyLWl0ZW0nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRhZGRXb3JrZXIuaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRhZGRXb3JrZXIucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFkZFdvcmtlci5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vQ2xvc2UgYWRkIHdvcmtlciBwYWdlXHJcbiAgICAgICAgICAgICQoJy5qcy13b3JrZXItYWRkLS1jbG9zZScpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJGFkZFdvcmtlci5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2F0ZWdvcnlTaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtY2F0ZWdvcnknLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWNhdGVnb3J5Jyk7XHJcbiAgICAgICAgICAgIGxldCAkaXRlbUhpZGRlbiA9ICRwYXJlbnRcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcignW2RhdGEtaGlkZGVuPVwidHJ1ZVwiXScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCR0YXJnZXQuaXMoJy5jYXRlZ29yeV9faXRlbS0tbW9yZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHBhcmVudC5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtSGlkZGVuLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2l0ZW0tLW1vcmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0JXRidC1Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbUhpZGRlbi5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19pdGVtLS1tb3JlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9Ch0LrRgNGL0YLRjCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgICQoQmFzZS5pbml0KCkpO1xyXG4gICAgJChDcm0uaW5pdCgpKTtcclxufSk7XHJcblxyXG4vKlxyXG4gKioqIGZ1bmN0aW9ucy5qc1xyXG4gKi9cclxuLy9QdXNoVXBcclxuZnVuY3Rpb24gcHVzaFVwKG9wdGlvbnMpIHtcclxuICAgIHZhciB0ZXh0ID0gb3B0aW9ucy50ZXh0IHx8ICfQktCw0Lwg0L3QvtCy0LDRjyDQt9Cw0Y/QstC60LAnO1xyXG4gICAgdmFyIHN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2JiLXB1c2hVcCcpO1xyXG4gICAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXHJcbiAgICAgICAgJ2JiLXB1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcclxuICAgICk7XHJcblxyXG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xyXG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWVycm9yJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLXN1Y2Nlc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3NoUG9zKCk7XHJcblxyXG4gICAgcmFmKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA0NTAwKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNTAwMCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1wdXNoVXAnKTtcclxuICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zaFBvcygpIHtcclxuICAgICAgICAkKCcuYmItcHVzaFVwJykuZWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAkKCcuYmItcHVzaFVwJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCBoZWlnaHQgKiBlICsgMTAgKyBlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuZnVuY3Rpb24gcmFmKGZuKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9TZXQgSW5wdXQgRGF0ZSBWYWx1ZVxyXG5mdW5jdGlvbiBzZXRJbnB1dERhdGUoc2VsZWN0b3IpIHtcclxuICAgIGxldCBfZGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBsZXQgaG95ID0gbmV3IERhdGUoKSxcclxuICAgICAgICBkID0gaG95LmdldERhdGUoKSxcclxuICAgICAgICBtID0gaG95LmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgIHkgPSBob3kuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBkYXRhO1xyXG5cclxuICAgIGlmIChkIDwgMTApIHtcclxuICAgICAgICBkID0gJzAnICsgZDtcclxuICAgIH1cclxuICAgIGlmIChtIDwgMTApIHtcclxuICAgICAgICBtID0gJzAnICsgbTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0geSArICctJyArIG0gKyAnLScgKyBkO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBfZGF0Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgX2RhdFtpXS52YWx1ZSA9IGRhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vRnVuY3Rpb24gQWRkIFJlbW92ZSBDbGFzcyBmcm9tIEJsb2NrXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzQmxvY2soYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrICsgJy0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLmFkZENsYXNzKGNsKTtcclxuICAgIH0pO1xyXG4gICAgJChibG9jayArICctLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jaykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoYmxvY2spLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiJdfQ==
