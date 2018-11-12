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

            // this.dScroll();
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

        // dScroll: function() {

        //     // console.log('---', $window.innerHeight() / 2);

        //     let $dropdown = $document.find('.js-bb-dropdown');

        //     $window.scroll(function() {

        //         let scroll = $(this).scrollTop();

        //         if ($(this).offset().top > $window.innerHeight() / 2) {

        //             console.log('---', _this.find('.bb-dropdown__list'));

        //         }

        //     });


        //     $dropdown.each(function() {

        //         let _this = $(this);

        //         let list = _this.find('.bb-dropdown__list');

        //         // console.log('---', $(this));

        //         // console.log('---', $(this).offset().top);


        //         _this

        //             .on('mouseenter', function() {

        //                 console.log('---', 'mouseenter');

        //                 console.log('---', _this.find('.bb-dropdown__list'));

        //                 list.css({

        //                     top: 0,

        //                     right: 0

        //                 });

        //             })

        //             .on('mouseleave', function() {

        //                 list.removeAttr('style');

        //             });

        //     });

        // },

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

            this.iconSelect();

            this.showYear();

            this.hideYear();

            this.addResetBtn();

            this.phoneCode();

            this.mobileSelect();
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
                var _this5 = this;

                setTimeout(function () {

                    $(_this5).off('select2:opening');
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

            var $select = $('.js-move-select');

            $select.each(function () {

                var $inputSearch = $(this).find('.move-select__field');

                var $resultItem = $(this).find('.move-select__result');

                var $btnClose = $(this).find('.js-move-select--close');

                $inputSearch.on('focus', function () {

                    $(this).closest('.js-move-select').addClass('is-active');

                    $('html, body').animate({

                        scrollTop: 0

                    });
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
                // if (
                //     $window.width() >= 1200 &&
                //     $(this).hasClass('request-item')
                // ) {
                //     return false;
                // }
                // e.preventDefault();

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
            var _this6 = this;

            setTimeout(function () {
                _this6.detectHeight();
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
            Crm.aplication.searchOverlay.init();
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
            var $input = $document.find('.js-search-overlay-input');
            var $overlay = $document.find('.js-search-overlay');
            var $aplication = $document.find('.aplication');
            var $user = $document.find('.aplication__user');
            var $emptyBlock = $document.find('.aplication__empty');
            var $btnNewClient = $document.find('.js-move-block--show');

            $overlay.addClass('is-visible');
            $aplication.addClass('is-focus');
            $user.addClass('animated fadeInLeft').css('display', 'block');
            $emptyBlock.hide();
            $btnNewClient.show();
        },

        hide: function hide() {
            var $input = $document.find('.js-search-overlay-input');
            var $overlay = $document.find('.js-search-overlay');
            var $aplication = $document.find('.aplication');
            var $user = $document.find('.aplication__user');
            var $emptyBlock = $document.find('.aplication__empty');
            var $btnNewClient = $document.find('.js-move-block--show');

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
        this.itemInfo();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXQuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRib2R5IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRvdmVybGF5IiwiJGhlYWRlciIsIiRtYWluIiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIiRoYW1idXJnZXJDcm0iLCIkbWVudU92ZWxheSIsIiRtZW51SXRlbURyb3Bkb3duIiwiJGJ0bkZsb2F0IiwiZmluZCIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiZHJvcGRvd24iLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwidGFicyIsImlzIiwiYWRkQ2xhc3MiLCJoYXNDbGFzcyIsInBhcmVudCIsInJlbW92ZUF0dHIiLCJwcm9wIiwiJGFjY29yZGVvbiIsInNsaWRlVXAiLCJlYWNoIiwic2xpZGVEb3duIiwiJHBhcmVudCIsImNsb3Nlc3QiLCIkaXRlbSIsImRhdGEiLCJsaXN0Iiwid29ya0xpc3QiLCJjc3MiLCJjYiIsIkNsaXBib2FyZCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsImJ0biIsIiRidG5EYXRhIiwiJGlucHV0VmFsIiwidmFsIiwiYXR0ciIsInNob3ciLCJub3QiLCJoaWRlIiwiZmlsdGVyIiwiZmFkZU91dCIsImZhZGVJbiIsInRleHQiLCJ1c2VyUGhvbmUiLCJwaG9uZSIsImNoYW5nZUNpdHlUaXRsZSIsIiRzbGlkZXIiLCIkc2xpZHMiLCIkc2xpZGUiLCIkcHJldkFycm93IiwiJG5leHRBcnJvdyIsInNsaWNrIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwiYXJyb3dzIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCIkY2F0YWxvZ0l0ZW1TbGlkZXIiLCJfdGhpcyIsIiRzbGlkZXMiLCIkc2xpZGVyRG90cyIsImV2ZW50IiwicHJlcGVuZCIsImFwcGVuZCIsInNsaWRlQ291bnQiLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCJpIiwiaHRtbCIsImxhenlMb2FkIiwic3RvcFByb3BhZ2F0aW9uIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsIm1lc3NhZ2VTdWNjZXNzIiwibWVzc2FnZUVycm9yIiwiZGVsYXkiLCJzdGF0dXMiLCJwdXNoVXAiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCIkZHJvcGRvd24iLCJyZW5kZXIiLCJzaG93SGlkZSIsIiRidG5DbG9zZSIsIiRkcm9wZG93bk92ZXJsYXkiLCIkZHJvcGRvd25MaXN0IiwiYXBwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsIiRidG5GbG9hdGluZyIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwiaW5wdXRFdmVudHMiLCJpbnB1dE1hc2siLCJtb2JpbGVTZWxlY3QiLCJpbnB1dG1hc2siLCJtYXNrIiwiZ3JlZWR5Iiwib25CZWZvcmVQYXN0ZSIsInBhc3RlZFZhbHVlIiwib3B0cyIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImRlZmluaXRpb25zIiwidmFsaWRhdG9yIiwiY2FyZGluYWxpdHkiLCJjYXNpbmciLCJpbnB1dCIsImV4ZWNDb21tYW5kIiwibmV4dCIsInByZXYiLCJmaWVsZEVkaXQiLCJmaWVsZEVkaXRJbnB1dCIsImZpZWxkRWRpdEJ0biIsImZpZWxkRWRpdFRleHQiLCJibHVyIiwidHJpbSIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwia2V5cHJlc3MiLCJrZXlDb2RlIiwiZW5kIiwiJHNlbGVjdCIsIiRpbnB1dFNlYXJjaCIsIiRyZXN1bHRJdGVtIiwic2VsZWN0MiIsInRhZ3MiLCJ0ZW1wbGF0ZVJlc3VsdCIsImFkZFVzZXJQaWMiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsInRpbWVBbmRQcmljZSIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiYWxsb3dDbGVhciIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCIkc2VsZWN0TmF0aXZlIiwicGxhY2Vob2xkZXIiLCIkZmlyc3RPcHRpb24iLCJ3cmFwIiwiY29sb3JTZWxlY3QiLCJpY29uU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsImFkZFJlc2V0QnRuIiwicGhvbmVDb2RlIiwiJGljb25TZWxlY3QiLCJpZm9ybWF0IiwiZHJvcGRvd25QYXJlbnQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJHllYXJTZWxlY3QiLCIkZGF0ZVNlbGVjdCIsInNlbGVjdENvZGVTZWxlY3Rpb24iLCJvcHRWYWwiLCJzZWxlY3RDb2RlUmVzdWx0IiwiY291bnRyeSIsIiRwaG9uZUNvZGVCb3giLCIkaW5wdXQiLCJmb2N1cyIsIm9wdGlvblNlbGVjdCIsInNlbGVjdFZhbHVlIiwiZXEiLCJjaGFuZ2UiLCJjb3VudGVyIiwic2VsZWN0ZWRJbmRleCIsImFkZEZvY3VzIiwicmVtb3ZlRm9jdXMiLCJfcmVtb3ZlU3R5bGUiLCJfYWRkU3R5bGUiLCJzZWFyY2hCdG4iLCJmYW5jeWJveCIsImJhc2VDbGFzcyIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaW1hZ2UiLCJwcmVsb2FkIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJ0b29sYmFyIiwibW9iaWxlIiwiY2xpY2tDb250ZW50IiwiY2xpY2tTbGlkZSIsInRvdWNoIiwic21hbGxCdG4iLCJ3aG9pcyIsImZvcm0iLCJDcm0iLCJjb250cm9sQm94IiwiaGFtYnVyZ2VyQ3JtIiwibWVudUl0ZW1Ecm9wZG93biIsImNsaWNrT3V0c2lkZSIsInNsaWRlcnMiLCJ0cml1bXBoIiwic2xpZGVyUG9wdXBSZWluaXQiLCJtb2JpbGVCbG9jayIsImJvZHlQb3NpdGlvbiIsInJlcXVlc3RJdGVtQ2xpY2siLCJjYWxsQXBsaWNhdGlvbk1vYmlsZUJsb2NrIiwiZ3JhcGhpYyIsImFwbGljYXRpb24iLCJyZXF1ZXN0Iiwic3RlcHMiLCJzdHVkaW8iLCJzZXJ2aWNlcyIsIldPVyIsImJveFJlc2l6ZSIsInNsaWRlVG9nZ2xlIiwic3RhcnQiLCJkaXNwbGF5IiwicmVtb3ZlU3R5bGUiLCJtb2JpbGVOYXZCdG4iLCJodG1sUmVtb3ZlU3R5bGUiLCIkYnRuTmV4dCIsInN3aXBlIiwidG91Y2hNb3ZlIiwibW9kYWwiLCJzZXRQb3NpdGlvbiIsIiRwYXJyZW50IiwiJGZvb3RlciIsImNoaWxkcmVuIiwib3V0ZXJIZWlnaHQiLCJib2R5Rml4ZWQiLCJkZXRlY3RIZWlnaHQiLCIkdGFibGUiLCIkdGFibGVXb3JrZXIiLCIkdGFibGVXb3JrZXJUciIsIiR0YWJsZUhvdXJzIiwiJHRhYmxlSG91cnNUciIsImN1cnJlbnRIb3Vyc0l0ZW0iLCJtYXhIZWlnaHQiLCJjdXJyZW50V29ya2VySXRlbSIsImVsZW0iLCJjdXJyZW50SGVpZ2h0IiwiYXBsaWNhdGlvblRhYiIsInNob3dOZXdDbGllbkZvcm0iLCJzaG93QXBsaWNhdGlvbkl0ZW1PcHRpb25zIiwiYXBsaWNhdGlvbkl0ZW1Db3VudGVyIiwic2VsZWN0U2hvd1NlcnZpY2UiLCJhcGxpY2F0aW9uSXRlbVJlc2V0IiwiY2hhbmdlU3J2aWNlIiwic2VhcmNoT3ZlcmxheSIsIiRhcGxpY2F0aW9uVGFiIiwiYmxvY2tGb290ZXIiLCJocmVmIiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsIiRhcGxpY2F0aW9uIiwiJHVzZXIiLCIkZW1wdHlCbG9jayIsIiRidG5OZXdDbGllbnQiLCJzb3J0TXVsdGlwbGUiLCJpdGVtSW5mbyIsInNvcnRhYmxlIiwiY29ubmVjdFdpdGgiLCJjdXJzb3IiLCJ0b2xlcmFuY2UiLCJ1aSIsIml0ZW0iLCJzdG9wIiwid2lnZXRSZXBsYWNlSWNvbiIsImRpc2FibGVTZWxlY3Rpb24iLCJ3aWRnZXQiLCJpY29uTmV3IiwiaWNvbldvcmsiLCJpY29uRG9uZSIsImljb25BYm9ydCIsInNlbGVjdFRpbWUiLCJzaG93QWRkU2VydmljZSIsInNob3dTZXJ2aWNlSXRlbSIsIml0ZW1Ib3ZlciIsIiRibG9ja3MiLCIkYnRuT3BlbiIsInNob3dTZWFyY2giLCJmYWRlVG9nZ2xlIiwiaXRlbXMiLCJjb250YWlubWVudCIsInJlcGxhY2VUaXRsZUFmdGVyU29ydGFibGUiLCJob21lIiwiYXZhdGFyVG9nZ2xlQnRuIiwid29ya2VyUGFnZVRvZ2dsZSIsImNhdGVnb3J5U2hvdyIsIiRhZGRXb3JrZXIiLCIkdGFyZ2V0IiwiJGl0ZW1IaWRkZW4iLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImhlaWdodCIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsInkiLCJnZXRGdWxsWWVhciIsIm1heCIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssUUFBUUwsRUFBRSxNQUFGLENBQWQ7QUFDQSxJQUFNTSxXQUFXTixFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUSxVQUFVUixFQUFFLFNBQUYsQ0FBaEI7QUFDQSxJQUFNUyxRQUFRVCxFQUFFLFVBQUYsQ0FBZDs7QUFFQTtBQUNBLElBQU1VLFFBQVFWLEVBQUUsVUFBRixDQUFkO0FBQ0EsSUFBTVcsYUFBYVgsRUFBRSxnQkFBRixDQUFuQjtBQUNBLElBQU1ZLGFBQWFaLEVBQUUsa0JBQUYsQ0FBbkI7QUFDQSxJQUFNYSxnQkFBZ0JiLEVBQUUsZUFBRixDQUF0QjtBQUNBLElBQU1jLGNBQWNkLEVBQUUsa0JBQUYsQ0FBcEI7QUFDQSxJQUFNZSxvQkFBb0JmLEVBQUUsd0JBQUYsQ0FBMUI7QUFDQSxJQUFNZ0IsWUFBWWQsVUFBVWUsSUFBVixDQUFlLGtCQUFmLENBQWxCOztBQUVBOzs7Ozs7Ozs7O0FBWUEsSUFBTUMsT0FBTzs7QUFFVEMsVUFBTSxnQkFBVzs7QUFFYixhQUFLQyxl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O0FBR0FqWixNQUFFZ1osUUFBUSxTQUFWLEVBQXFCNVYsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4Q3BELFVBQUVnWixLQUFGLEVBQVM5VSxXQUFULENBQXFCK1UsRUFBckI7QUFDSCxLQUZEO0FBR0g7O0FBRUQsU0FBU3ZRLGNBQVQsQ0FBd0JzUSxLQUF4QixFQUErQkMsRUFBL0IsRUFBbUM7QUFDL0JqWixNQUFFZ1osS0FBRixFQUFTNVYsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBVztBQUM1QnBELFVBQUUsSUFBRixFQUFRZ0wsV0FBUixDQUFvQmlPLEVBQXBCO0FBQ0gsS0FGRDs7QUFJQWpaLE1BQUVHLFFBQUYsRUFBWWlELEVBQVosQ0FBZSw0QkFBZixFQUE2QyxVQUFTQyxDQUFULEVBQVk7QUFDckQsWUFBSXJELEVBQUVxRCxFQUFFMEgsTUFBSixFQUFZaEcsT0FBWixDQUFvQmlVLEtBQXBCLEVBQTJCelYsTUFBL0IsRUFBdUM7QUFDdkN2RCxVQUFFZ1osS0FBRixFQUFTOVUsV0FBVCxDQUFxQitVLEVBQXJCO0FBQ0E1VixVQUFFb0YsZUFBRjtBQUNILEtBSkQ7QUFLSCIsImZpbGUiOiJjYWJpbmV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyc1xyXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xyXG5jb25zdCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcclxuY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XHJcbmNvbnN0ICRodG1sID0gJCgnaHRtbCcpO1xyXG5jb25zdCAkd3JhcHBlciA9ICQoJy53cmFwcGVyJyk7XHJcbmNvbnN0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcclxuY29uc3QgJGhlYWRlciA9ICQoJy5oZWFkZXInKTtcclxuY29uc3QgJG1haW4gPSAkKCcuY2FiaW5ldCcpO1xyXG5cclxuLy9NZW51IHZhcnNcclxuY29uc3QgJG1lbnUgPSAkKCcuanMtbWVudScpO1xyXG5jb25zdCAkbmF2TW9iaWxlID0gJCgnLmpzLW1vYmlsZS1uYXYnKTtcclxuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuY29uc3QgJGhhbWJ1cmdlckNybSA9ICQoJy5qcy1oYW1idXJnZXInKTtcclxuY29uc3QgJG1lbnVPdmVsYXkgPSAkKCcuanMtbWVudS1vdmVybGF5Jyk7XHJcbmNvbnN0ICRtZW51SXRlbURyb3Bkb3duID0gJCgnLmpzLW1lbnUtaXRlbS1kcm9wZG93bicpO1xyXG5jb25zdCAkYnRuRmxvYXQgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuLyoqXHJcblxyXG4gKiBCYXNlLmpzXHJcblxyXG4gKlxyXG5cclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuXHJcbiAqL1xyXG5cclxuXHJcblxyXG5jb25zdCBCYXNlID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZVByZWxvYWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3QuaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0cy5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkV4cGFuZGVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Ib3ZlckFuaW1hdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blN0YXR1c0FuaW1hdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkdvVG9wKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5GbG9hdGluZygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuUHVzaCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAucG9wdXBGYW5jeUJveCgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLndob0lzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAuY2hhbmdlRm9ybVRpdGxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAucmVpbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhcigpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmhhbWJ1cmdlckJ0bigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmNsaWNrT3VzaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2VhcmNoQnRuT3BlbkNsb3NlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcclxuXHJcbiAgICAgICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzY3JvbGxCYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzU4NWE1OScsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnMnB4JyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcyJ1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vUmVtb3ZlIHByZWxvYWRlclxyXG5cclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gJCgnYm9keScpLmFkZENsYXNzKCdsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAvLyB9LCA1MDApO1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9Jbml0IGJhc2UgdGFicyBqUSBVaSBUYWJzXHJcblxyXG4gICAgdGFiOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1iYi10YWInKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi10YWInKS50YWJzKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIGNoZWNib3ggJiBjaGVja2JveFBzZXVkb1xyXG5cclxuICAgIGNoZWNrYm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL0JCIGNoZWNrYm94IHBzZXVkb1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vU2VsZWN0IEFsbCBDaGVja2JveFxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC1zZWxlY3QtYWxsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DdXN0b20gcmFkaW9CdG5cclxuXHJcbiAgICAvLyByYWRpb0J0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gICAgIGxldCAkcmFkaW8gPSAkKCcuanMtYmItcmFkaW8nKTtcclxuXHJcblxyXG5cclxuICAgIC8vICAgICAvL0JCIHJhZGlvXHJcblxyXG4gICAgLy8gICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLXJhZGlvJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYgKCRpbnB1dC5pcygnOmNoZWNrZWQnKSkge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgJHJhZGlvLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy9DdXN0b20gYWNjb3JkZW9uXHJcblxyXG4gICAgYWNjb3JkZW9uOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRhY2NvcmRlb24gPSAkKCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCRhY2NvcmRlb24ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9BY2NvcmRlb24gY29sbGFwc2VcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItYWNjb3JkZW9uIC5iYi1hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICBlXHJcblxyXG4gICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaXRlbSA9ICQodGhpcykucGFyZW50KCcuYmItYWNjb3JkZW9uX19pdGVtJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkcGFyZW50LmRhdGEoJ2FjY29yZGVvbicpID09PSAnY29sbGFwc2UnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbGlzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdFRvZ2dsZSgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9ICQoJy5qcy1saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrYm94ID0gbGlzdC5maW5kKCcuanMtYmItY2hlY2tib3gnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya0xpc3QgPSBsaXN0LmZpbmQoJy5qcy1saXN0LXRvZ2dsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrYm94Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tib3guaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3RUb2dnbGUoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9Db3B5IHRleHQgY2xpY2sgbGlua1xyXG5cclxuICAgIGNvcHlUZXh0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGNiID0gbmV3IENsaXBib2FyZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vaWYgaGFzIGlucHV0IHRoZW4gY29weSBpbnB1dCB2YWx1ZSBpbiBkYXRhIGF0dHJcclxuXHJcbiAgICAgICAgJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJveCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpbnB1dEljb24gPSAkcGFyZW50LmZpbmQoJy5iYi1pbnB1dF9faWNvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRidG5SZXNldCA9ICRwYXJlbnQuZmluZCgnLmpzLWlucHV0LS1jbGVhcicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRoaW50ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG4gPSAkcGFyZW50LmZpbmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5EYXRhID0gJCh0aGlzKS5kYXRhKCdjbGlwYm9hcmQtdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0VmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uYXR0cignZGF0YS1jbGlwYm9hcmQtdGV4dCcsICRidG5EYXRhICsgJGlucHV0VmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtaW5wdXQtLWNsZWFyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC52YWwoJycpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5mYWRlT3V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9faWNvbicpXHJcblxyXG4gICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZhZGVJbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL1Nob3cgcGhvbmUgbnVtYmVyXHJcblxyXG4gICAgb3duZXJQaG9uZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy11c2VyLXBob25lJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICdqYXZhc2NyaXB0OnZvaWQoMCk7JylcclxuXHJcbiAgICAgICAgICAgICAgICAudGV4dCgkKHRoaXMpLmRhdGEoJ3Bob25lLWhpZGVuJykpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXVzZXItcGhvbmUtLXNob3cnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB1c2VyUGhvbmUgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy11c2VyLXBob25lJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGhvbmUgPSB1c2VyUGhvbmUuZGF0YSgncGhvbmUnKTtcclxuXHJcbiAgICAgICAgICAgIHVzZXJQaG9uZVxyXG5cclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcblxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAndGVsOicgKyBwaG9uZSlcclxuXHJcbiAgICAgICAgICAgICAgICAudGV4dChwaG9uZSk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DaXR5IHNlbGVjdFxyXG5cclxuICAgIGNoYW5nZUNpdHk6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgY2hhbmdlQ2l0eSA9ICQoJy5qcy1jaXR5LXNlbGVjdCcpO1xyXG5cclxuICAgICAgICBsZXQgY2hhbmdlQ2l0eVRpdGxlID0gY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX3RpdGxlIHNwYW4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZUNpdHlUaXRsZS50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQmFzZSBzbGlkZXJcclxuXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1iYi1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHByZXZBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJG5leHRBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJHByZXZBcnJvdyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJG5leHRBcnJvdyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMjAwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DYXRhbG9nIEl0ZW0gU2xpZGVyXHJcblxyXG4gICAgY2F0YWxvZ0l0ZW1TbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkY2F0YWxvZ0l0ZW1TbGlkZXIgPSAkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkY2F0YWxvZ0l0ZW1TbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmhpZGUoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuc2hvdygpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1pdGVtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uczoge1xyXG5cclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG5cclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG5cclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcblxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcnVuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0YHRgdGL0LvQutCwINC+0YLQutGA0YvQstCw0LXRgiDQvNC+0LTQsNC70LrRgywg0YLQviDQv9C+INC+0YLQutGA0YvRgtC40Y4g0LzQvtC00LDQu9C60Lgg0YHQutGA0YvQstCw0LXRgiDQutC90L7Qv9C60LhcclxuXHJcbiAgICAgICAgICAgICQoJy5tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJ0blB1c2g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50LmZpbmQoJ1tkYXRhLXB1c2hdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VTdWNjZXNzID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1zdWNjZXNzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VFcnJvciA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2UtZXJyb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVsYXkgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1kZWxheScpIHx8IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXR1cztcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1zdGF0dXMnKSB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2VFcnJvcixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2VTdWNjZXNzLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBzY3JvbGwgdG8gdG9wXHJcblxyXG4gICAgICAgIGJ0bkdvVG9wOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgODAwXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBzY3JvbGwgdG8gZWxlbWVudFxyXG5cclxuICAgICAgICBidG5Hb1RvOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtZ290bycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGVzdGluYXRpb24gPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDYwICsgJ3B4J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkcm9wZG93bjoge1xyXG5cclxuICAgICAgICAvL0N1c3RvbSBkcm9wZG93blxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkZHJvcGRvd24ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdiYi1kcm9wZG93bi0taG92ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dIaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLmRTY3JvbGwoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duLmJiLWRyb3Bkb3duLS10cmFuc2Zvcm0nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJiLWRyb3Bkb3duX19jbG9zZSBqcy1iYi1kcm9wZG93bi0tY2xvc2VcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93bk92ZXJsYXkgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fb3ZlcmxheVwiPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkNsb3NlLmFwcGVuZFRvKCRkcm9wZG93bkxpc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25PdmVybGF5Lmluc2VydEFmdGVyKCRkcm9wZG93bkxpc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LmZpbmQoJy5pbmZvLWJsb2NrX19pY29uJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIGRTY3JvbGw6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICR3aW5kb3cuaW5uZXJIZWlnaHQoKSAvIDIpO1xyXG5cclxuICAgICAgICAvLyAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgLy8gICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGlmICgkKHRoaXMpLm9mZnNldCgpLnRvcCA+ICR3aW5kb3cuaW5uZXJIZWlnaHQoKSAvIDIpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGlzdCA9IF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJCh0aGlzKS5vZmZzZXQoKS50b3ApO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ21vdXNlZW50ZXInKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsaXN0LmNzcyh7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIH0sXHJcblxyXG4gICAgICAgIHNob3dIaWRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0bkZsb2F0aW5nID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuaXMoJy5iYi1kcm9wZG93bl9fb3ZlcmxheScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xvc2VzdCgnLmJiLWRyb3Bkb3duX19saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS10cmFuc2Zvcm0nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24gLmluZm8tYmxvY2tfX2xpbmsnLFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJy5pcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWRyb3Bkb3duLS1jbG9zZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1iYi1kcm9wZG93bicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0czoge1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuXHJcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtdGltZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTo5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29kZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvZGUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ljk5Ljk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvbmZpcm0tbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZW1haWwtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1lbWFpbC1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqezEsMjB9Wy4qezEsMjB9XVsuKnsxLDIwfV1bLip7MSwyMH1dQCp7MSwyMH1bLip7Miw2fV1bLip7MSwyfV0nLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzdGVkVmFsdWUgPSBwYXN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhc3RlZFZhbHVlLnJlcGxhY2UoJ21haWx0bzonLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEteiEjJCUmJyorLz0/Xl9ge3x9fi1dXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiAnbG93ZXInXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtY29weS10ZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLXNoYXJlX19saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9DbGljayBpbnB1dCBzZWxlY3QgdmFsdWVcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC1mb2N1cy0tY29weScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0VkaXQgVGV4dCBGaWVsZFxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1maWVsZC1lZGl0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdCA9ICQoJy5qcy1maWVsZC1lZGl0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRCdG4gPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2J0bicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0LnNob3coKS5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09ICcxMycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLWlucHV0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWlucHV0LXRpcCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1pbmZvIGlzLWVycm9yIGlzLWludmFsaWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJCh0aGlzKS5maW5kKCcuanMtbW9iaWxlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2VsZWN0OiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLW11bHRpcGxlJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFnczogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QuYmItc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tc2VydmljZXMnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogdGltZUFuZFByaWNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiB0aW1lQW5kUHJpY2VcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtYm9ybicpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIG1lbnRybyBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1NlbGVjdCBBZGQgUHJpY2UgVGltZSAmIFByaWNlXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0aW1lQW5kUHJpY2Uob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsVGltZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxQcmljZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3ByaWNlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdC50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRpbWUgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2UgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9ICQodGhpcykuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbjpmaXJzdC1jaGlsZCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53cmFwKCc8bGFiZWwgY2xhc3M9XCJiYi1zZWxlY3RcIj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmljb25TZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1llYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVllYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVzZXRCdG4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVDb2RlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpY29uU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaWNvblNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1pY29uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRpY29uU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC0tc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaWZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0ljb24gZm9udGF3ZXNvbWUgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaWZvcm1hdChpY29uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsT3B0aW9uID0gaWNvbi5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4+PGkgY2xhc3M9XCJzZWxlY3QyX19pY29uJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvcmlnaW5hbE9wdGlvbikuZGF0YSgnaWNvbicpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj48L2k+ICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbG9yU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkY29sb3JTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0tY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNvbG9yU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QtY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzZWFyY2gtZW5hYmxlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29sb3IgYmFsbCBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaUJhbGwoY29sb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRvcmlnaW5hbE9wdGlvbiA9IGNvbG9yLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvckJhbGwgPSAkKCRvcmlnaW5hbE9wdGlvbikuZGF0YSgnY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IudGV4dC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19saW5lXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH1cIj48L3NwYW4+PHA+ICR7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLnRleHRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDwvcD48L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2JhbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfSBcIj4gPC9zcGFuPiA8L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXNldC15ZWFyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZVllYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICR5ZWFyU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC1ib3JuLS1jbGVhcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub2ZmKCdzZWxlY3QyOm9wZW5pbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKCkgPT0gJycgJiZcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJvcm4nKSA9PT0gJ3llYXInXHJcblxyXG4gICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZGF0ZVNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRhdGVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGhvbmVDb2RlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHNlbGVjdCByZXN1bHRzIHRvIG9wdGlvbiB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVNlbGVjdGlvbihvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0VmFsID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArIG9wdFZhbCArICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGNpdHkgbmFtZSB0byBvcHRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVSZXN1bHQob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50cnkgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdjb3VudHJ5JyksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRWYWwgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0ICRwaG9uZUNvZGVCb3ggPSAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0LXBob25lLWNvZGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHBob25lQ29kZUJveC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnNlbGVjdC12YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJy5iYi1pbnB1dF9faW5wdXQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHNlbGVjdENvZGVSZXN1bHQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBzZWxlY3RDb2RlU2VsZWN0aW9uLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWlucHV0LS1zZWxlY3QtdmFsdWVcIj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvblNlbGVjdCA9ICRwYXJlbnQuZmluZCgnb3B0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0VmFsdWUgPSAkcGFyZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5iYi1pbnB1dC0tc2VsZWN0LXZhbHVlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoMCkudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9ICQodGhpcylbMF0uc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcShjb3VudGVyKS52YWwoKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogJyg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdmb2N1cycsIGFkZEZvY3VzKS5vbignYmx1cicsIHJlbW92ZUZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOm9wZW4nLCBhZGRGb2N1cylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpjbG9zZScsIHJlbW92ZUZvY3VzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUZvY3VzKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW92ZS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vdmUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW92ZS1zZWxlY3RfX3Jlc3VsdCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBtZW51OiB7XHJcblxyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG5cclxuICAgICAgICBoYW1idXJnZXJCdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fYWRkU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vV2hlbiBDbGljayBPdXRzaWRlIENsb3NlIE1lbnVcclxuXHJcbiAgICAgICAgY2xpY2tPdXNpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmpzLW1vYmlsZS1uYXYsIC5qcy1kYXRlLCAuZGF0ZXBpY2tlciwgLmNhcmQtaW5mb19fcmVxdWVzdCwgLmNhdGFsb2ctZmlsdGVyLCAuanMtbW9iaWxlLWZpbHRlci0tb3BlbiwgLmpzLWJiLWFjY29yZGVvbidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5vdmVybGF5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCBCdG4gb3Blbi9jbG9zZVxyXG5cclxuICAgICAgICBzZWFyY2hCdG5PcGVuQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlYXJjaEJ0biA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLWJ0bicpO1xyXG5cclxuICAgICAgICAgICAgc2VhcmNoQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hZGRTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcG9wdXA6IHtcclxuXHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG5cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZDogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlc1wiXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2ZhbmN5Ym94LWNvbnRhaW5lci0taW1hZ2UnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrQ29udGVudDogJ2Nsb3NlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGU6ICdjbG9zZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0bjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNtYWxsQnRuOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuXHJcbiAgICAgICAgd2hvSXM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXdob2lzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gJCgnI2F1dGgtZm9ybScpLmZpbmQoJy5mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdob2lzID09PSAnbWFzdGVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdob2lzID09PSAnc3R1ZGlvJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1zdHVkaW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1jbGllbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9EdW5hbWljbHkgY2hhbmdlIGZvcm0gdGl0bGVcclxuXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBDcm0uanNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IENybSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY29udHJvbEJveCgpO1xyXG5cclxuICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQ3JtKCk7XHJcbiAgICAgICAgdGhpcy5tZW51Lm1lbnVJdGVtRHJvcGRvd24oKTtcclxuICAgICAgICB0aGlzLm1lbnUuY2xpY2tPdXRzaWRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVycy50cml1bXBoKCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJzLnNsaWRlclBvcHVwUmVpbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMubW9iaWxlQmxvY2suYm9keVBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVCbG9jay5yZXF1ZXN0SXRlbUNsaWNrKCk7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVCbG9jay5jYWxsQXBsaWNhdGlvbk1vYmlsZUJsb2NrKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JhcGhpYy5pbml0KCk7XHJcblxyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmluaXQoKTtcclxuICAgICAgICBDcm0ucmVxdWVzdC5pbml0KCk7XHJcbiAgICAgICAgQ3JtLnN0ZXBzLmluaXQoKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLmluaXQoKTtcclxuICAgICAgICBDcm0uc2VydmljZXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJveFJlc2l6ZSgpO1xyXG4gICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBDcm0uYm94UmVzaXplKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgY29udHJvbEJveDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtY29udHJvbC1ib3gtYnRuJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtY29udHJvbC1ib3gnKVxyXG4gICAgICAgICAgICAgICAgLnNsaWRlVG9nZ2xlKHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBib3hSZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ2JnLS1kYXJrJyk7XHJcbiAgICAgICAgICAgICRtZW51LmFkZENsYXNzKCdiZy0td2hpdGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNvbnRyb2wtYm94Jykuc2xpZGVVcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2JnLS1kYXJrJyk7XHJcbiAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdiZy0td2hpdGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWVudToge1xyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgICAgIGhhbWJ1cmdlckNybTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRoYW1idXJnZXJDcm0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLm1lbnUucmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdpcy1tb3ZpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcygnZHJvcGRvd24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vYmlsZU5hdkJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LWJ0bicpLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgZVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLm1lbnUucmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9XaGVuIGNsaWNrIG91dHNpZGUgTWVudSBkbyB0aGlzXHJcbiAgICAgICAgY2xpY2tPdXRzaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuanMtbWFpbi1uYXYtYnRuLCAuanMtbW9iaWxlLW5hdiwgLm1lbnUtZHJvcGRvd24sIC5qcy1tZW51LWl0ZW0tZHJvcGRvd24sIC5qcy1oYW1idXJnZXInXHJcbiAgICAgICAgICAgICAgICAgICAgKS5sZW5ndGhcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAkaGFtYnVyZ2VyLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgJGhhbWJ1cmdlckNybS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgQ3JtLm1lbnUucmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRtZW51T3ZlbGF5LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vTWVudSBkcm9wZG93blxyXG4gICAgICAgIG1lbnVJdGVtRHJvcGRvd246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdkcm9wZG93bi1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdC5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAkaGFtYnVyZ2VyQ3JtLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkcm9wZG93bi1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXQuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRoYW1idXJnZXJDcm0ucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Ryb3Bkb3duLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRtZW51T3ZlbGF5LmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcygnZHJvcGRvd24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJyk7XHJcbiAgICAgICAgICAgIENybS5tZW51Lmh0bWxSZW1vdmVTdHlsZSgpO1xyXG4gICAgICAgICAgICAkYnRuRmxvYXQuZmFkZUluKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBodG1sUmVtb3ZlU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LWJ0biwgLmpzLW1vYmlsZS1uYXYsIC5qcy1tb2JpbGUtYmxvY2stLXNob3csIC5qcy1yZXF1ZXN0LWl0ZW0nXHJcbiAgICAgICAgICAgICAgICAgICAgKS5sZW5ndGhcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNsaWRlcnM6IHtcclxuICAgICAgICAvL1RyaXVtcGggc2xpZGVyXHJcbiAgICAgICAgdHJpdW1waDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlci0tdHJpdW1waCcpO1xyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5OZXh0ID0gJCh0aGlzKS5maW5kKCcuanMtYmItc2xpZGVyLWJ0bi0tbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNsaWRlICsgMSA9PT0gc2xpY2suc2xpZGVDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuTmV4dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soJ3NsaWNrTmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9EaXNhYmxlIGNoYW5nZSBzbGlkZSBvbiBjbGljayBkb3RzXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyLmZpbmQoJy5zbGljay1kb3RzIGxpIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9SZWluaXQgc2xpZGVyIGFmdGVyIHBvcHVwIG9wZW5cclxuICAgICAgICBzbGlkZXJQb3B1cFJlaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5tb2RhbCcpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlclswXS5zbGljay5zZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9iaWxlQmxvY2s6IHtcclxuICAgICAgICBib2R5UG9zaXRpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcnJlbnQgPSAkKCcuanMtbW9iaWxlLWJsb2NrJyk7XHJcbiAgICAgICAgICAgIGxldCAkZm9vdGVyID0gJHBhcnJlbnQuY2hpbGRyZW4oJy5tb2JpbGUtYmxvY2tfX2Zvb3RlcicpO1xyXG4gICAgICAgICAgICAkcGFycmVudFxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19ib2R5JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2JvdHRvbScsICRmb290ZXIub3V0ZXJIZWlnaHQodHJ1ZSkpO1xyXG5cclxuICAgICAgICAgICAgJHBhcnJlbnQuZmluZCgnLm1vYmlsZS1ibG9ja19fYm94JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19mb290ZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLm1vYmlsZS1ibG9ja19fYm9keScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYm90dG9tJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2JpbGUtYmxvY2tfX2JveCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19mb290ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vdXRlckhlaWdodCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vU2hvdyAvIEhpZGUgbW9iaWxlIGFwbGljYXRpb25cclxuICAgICAgICBjYWxsQXBsaWNhdGlvbk1vYmlsZUJsb2NrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtbW92ZS1ibG9jay0tc2hvdycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChcclxuICAgICAgICAgICAgICAgIC8vICAgICAkd2luZG93LndpZHRoKCkgPj0gMTIwMCAmJlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICQodGhpcykuaGFzQ2xhc3MoJ3JlcXVlc3QtaXRlbScpXHJcbiAgICAgICAgICAgICAgICAvLyApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bklkID0gJCh0aGlzKS5hdHRyKCdkYXRhLW1vdmUtYmxvY2stdGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnW2RhdGEtbW92ZS1ibG9ja10nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJ1tkYXRhLW1vdmUtYmxvY2s9JyArIGJ0bklkICsgJ10nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFkZENsYXNzKCdpcy1maXhlZCcpLmNzcygncG9zaXRpb24nLCAnZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgQ3JtLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLW1vdmUtYmxvY2stYm94LS1jbG9zZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLm1vdmUtYmxvY2tfX2JveCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgQ3JtLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLW1vdmUtYmxvY2stLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcubW92ZS1ibG9jaycpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBib2R5Rml4ZWQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYm9keUZpeGVkKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkZG9jdW1lbnQuZmluZCgnLmpzLW1vdmUtYmxvY2snKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJykuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL0NsaWNrIHJlcXVlc3QgaXRlbVxyXG4gICAgICAgIHJlcXVlc3RJdGVtQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1yZXF1ZXN0LWl0ZW0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLW1vdmUtYmxvY2stYXBsaWNhdGlvbicpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAnLmpzLW1vdmUtYmxvY2stYXBsaWNhdGlvbi0tY2xvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtbW92ZS1ibG9jay1hcGxpY2F0aW9uJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JhcGhpYzoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBDcm0uZ3JhcGhpYy5kZXRlY3RIZWlnaHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXRlY3RIZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHRhYmxlID0gJGRvY3VtZW50LmZpbmQoJy5qcy1ncmFwaC10YWJsZScpO1xyXG5cclxuICAgICAgICAgICAgJHRhYmxlLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRhYmxlV29ya2VyID0gJCh0aGlzKS5maW5kKCcuZ3JhcGgtdGFibGVfX3dvcmtlcicpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICR0YWJsZVdvcmtlclRyID0gJHRhYmxlV29ya2VyLmZpbmQoJ3RyJykubm90KCc6Zmlyc3QnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkdGFibGVIb3VycyA9ICQodGhpcykuZmluZCgnLmdyYXBoLXRhYmxlX19ob3VycycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICR0YWJsZUhvdXJzVHIgPSAkdGFibGVIb3Vycy5maW5kKCd0cicpLm5vdCgnOmZpcnN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRhYmxlSG91cnNUci5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEhvdXJzSXRlbSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1ncmFwaC10YWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZ3JhcGgtdGFibGVfX3dvcmtlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCd0cicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0KCQodGhpcyksIGN1cnJlbnRIb3Vyc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRhYmxlV29ya2VyVHIuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRXb3JrZXJJdGVtID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWdyYXBoLXRhYmxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5ncmFwaC10YWJsZV9faG91cnMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgndHInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCgkKHRoaXMpLCBjdXJyZW50V29ya2VySXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXhIZWlnaHQoX3RoaXMsIGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEhlaWdodCA9IF90aGlzLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRIZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0ID0gY3VycmVudEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRIZWlnaHQgPiBlbGVtLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jc3MoJ2hlaWdodCcsIG1heEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JtIEFwbGljYXRpb25cclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5hcGxpY2F0aW9uID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uYXBsaWNhdGlvblRhYigpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLnNob3dOZXdDbGllbkZvcm0oKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5zaG93QXBsaWNhdGlvbkl0ZW1PcHRpb25zKCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uYXBsaWNhdGlvbkl0ZW1Db3VudGVyKCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uc2VsZWN0U2hvd1NlcnZpY2UoKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5hcGxpY2F0aW9uSXRlbVJlc2V0KCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uY2hhbmdlU3J2aWNlKCk7XHJcblxyXG4gICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPj0gNzY4KSB7XHJcbiAgICAgICAgICAgIENybS5hcGxpY2F0aW9uLnNlYXJjaE92ZXJsYXkuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0luaXQgQXBsaWNhdGlvbiB0YWJzXHJcbiAgICBhcGxpY2F0aW9uVGFiOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJGFwbGljYXRpb25UYWIgPSAkKCcuanMtYXBsaWNhdGlvbi10YWInKTtcclxuICAgICAgICAkYXBsaWNhdGlvblRhYi50YWJzKCk7XHJcblxyXG4gICAgICAgIC8vSWYgYXBsaWNhdGlvbiB0YWIgY2hhdCB0aGVuIGhpZGUgYXBsaWNhdGlvbiBidG5zXHJcbiAgICAgICAgJGFwbGljYXRpb25UYWIuZmluZCgnLnRhYl9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gJCgnLmFwbGljYXRpb25fX2J0bnMnKTtcclxuICAgICAgICAgICAgbGV0IGJsb2NrRm9vdGVyID0gJCgnLmpzLW1vdmUtYmxvY2snKVxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcubW92ZS1ibG9ja19fYm94JylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubW92ZS1ibG9ja19fZm9vdGVyJyk7XHJcbiAgICAgICAgICAgIGxldCBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaHJlZiA9PT0gJyNhcGxpY2F0aW9uLWNoYXQnKSB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgYmxvY2tGb290ZXIuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrRm9vdGVyLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgQ3JtLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNjcm9sbCcpXHJcbiAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcbiAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9TaG93IE5ldyBDbGllbnQgRm9ybVxyXG4gICAgc2hvd05ld0NsaWVuRm9ybTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYWRkUmVtb3ZlQ2xhc3NCbG9jaygnLmpzLW5ldy1jbGllbnQnLCAnaXMtb3BlbicpO1xyXG4gICAgfSxcclxuICAgIC8vV2hlbiBjbGljayBidG4gZWRpdFxyXG4gICAgc2hvd0FwbGljYXRpb25JdGVtT3B0aW9uczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYXBsaWNhdGlvbi1pdGVtLS1lZGl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X193cmFwJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0NvdW50ZXIgaW5pdCBmdW5jdGlvblxyXG4gICAgYXBsaWNhdGlvbkl0ZW1Db3VudGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtYXBsaWNhdGlvbi1pdGVtJykuZWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hcGxpY2F0aW9uLWl0ZW1fX2NvdW50ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KGUgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQWZ0ZXIgc2VsZWN0IG1hc3RlciBjaGFuZ2VcclxuICAgIHNlbGVjdFNob3dTZXJ2aWNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ3NlbGVjdDI6c2VsZWN0JywgJy5qcy1zZWxlY3Qtc2hvdy1zZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFycmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWFwbGljYXRpb24taXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoJHBhcnJlbnQuaGFzQ2xhc3MoJ2FwbGljYXRpb24taXRlbS0tc2hvcnQnKSkge1xyXG4gICAgICAgICAgICAgICAgJHBhcnJlbnRcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLWJ0bi0tcmVzZXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkcGFycmVudC5yZW1vdmVDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHBhcnJlbnQuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJykuc2xpZGVEb3duKHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDcm0uYXBsaWNhdGlvbi5hcGxpY2F0aW9uSXRlbUNvdW50ZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1doZW4gY2hhbmdlIHNlcnZpY2UgcmVzZXQgdGhpcyBvcHRpb25zXHJcbiAgICBjaGFuZ2VTcnZpY2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignc2VsZWN0MjpzZWxlY3QnLCAnLmpzLXNlbGVjdC0tc2VydmljZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYXBsaWNhdGlvbi1pdGVtJyk7XHJcbiAgICAgICAgICAgICRwYXJyZW50XHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX3dyYXAnKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS0tZWRpdCcpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQXBsaWNhdGlvbiBpdGVtIHJlc2V0XHJcbiAgICBhcGxpY2F0aW9uSXRlbVJlc2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1hcGxpY2F0aW9uLWl0ZW0tYnRuLS1yZXNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcnJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hcGxpY2F0aW9uLWl0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKCEkcGFycmVudC5oYXNDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkcGFycmVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYXBsaWNhdGlvbi1pdGVtLS1zaG9ydCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuanMtc2VsZWN0LS1tYXN0ZXIsIC5qcy1zZWxlY3QtLXRpbWUsIC5qcy1zZWxlY3QtZHVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAudmFsKCcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLWJ0bi0tcmVzZXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9fd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLS1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAudmFsKCcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYXBsaWNhdGlvbi1pdGVtX19jb3VudGVyJylcclxuICAgICAgICAgICAgICAgICAgICAuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1NlcmNoIGZvY3VzIHNob3cgY2xpZW50ICsgb3ZlcmxheVxyXG4gICAgc2VhcmNoT3ZlcmxheToge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCAnLmpzLXNlYXJjaC1vdmVybGF5LWlucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLmFwbGljYXRpb24uc2VhcmNoT3ZlcmxheS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENybS5hcGxpY2F0aW9uLnNlYXJjaE92ZXJsYXkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAnLmpzLXNlYXJjaC1vdmVybGF5JyxcclxuICAgICAgICAgICAgICAgICAgICBDcm0uYXBsaWNhdGlvbi5zZWFyY2hPdmVybGF5LmhpZGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvdzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5LWlucHV0Jyk7XHJcbiAgICAgICAgICAgIGxldCAkb3ZlcmxheSA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VhcmNoLW92ZXJsYXknKTtcclxuICAgICAgICAgICAgbGV0ICRhcGxpY2F0aW9uID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uJyk7XHJcbiAgICAgICAgICAgIGxldCAkdXNlciA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fdXNlcicpO1xyXG4gICAgICAgICAgICBsZXQgJGVtcHR5QmxvY2sgPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb25fX2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuTmV3Q2xpZW50ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1tb3ZlLWJsb2NrLS1zaG93Jyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkYXBsaWNhdGlvbi5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgJHVzZXIuYWRkQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJbkxlZnQnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgJGVtcHR5QmxvY2suaGlkZSgpO1xyXG4gICAgICAgICAgICAkYnRuTmV3Q2xpZW50LnNob3coKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VhcmNoLW92ZXJsYXktaW5wdXQnKTtcclxuICAgICAgICAgICAgbGV0ICRvdmVybGF5ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWFyY2gtb3ZlcmxheScpO1xyXG4gICAgICAgICAgICBsZXQgJGFwbGljYXRpb24gPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb24nKTtcclxuICAgICAgICAgICAgbGV0ICR1c2VyID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uX191c2VyJyk7XHJcbiAgICAgICAgICAgIGxldCAkZW1wdHlCbG9jayA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fZW1wdHknKTtcclxuICAgICAgICAgICAgbGV0ICRidG5OZXdDbGllbnQgPSAkZG9jdW1lbnQuZmluZCgnLmpzLW1vdmUtYmxvY2stLXNob3cnKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICRhcGxpY2F0aW9uLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAkdXNlci5yZW1vdmVDbGFzcygnYW5pbWF0ZWQgZmFkZUluTGVmdCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICRpbnB1dC5ibHVyKCk7XHJcbiAgICAgICAgICAgICRlbXB0eUJsb2NrLnNob3coKTtcclxuICAgICAgICAgICAgJGJ0bk5ld0NsaWVudC5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENybSBSZXF1ZXN0XHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0ucmVxdWVzdCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPj0gMTIwMCkge1xyXG4gICAgICAgICAgICBDcm0ucmVxdWVzdC5zb3J0TXVsdGlwbGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBDcm0ucmVxdWVzdC50YWJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbUluZm8oKTtcclxuICAgIH0sXHJcbiAgICAvL0Z1bmN0aW9uIHNvcnRhYmxlXHJcbiAgICBzb3J0TXVsdGlwbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1zb3J0YWJsZScpXHJcbiAgICAgICAgICAgIC5zb3J0YWJsZSh7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0V2l0aDogJy5qcy1zb3J0YWJsZScsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcclxuICAgICAgICAgICAgICAgIHRvbGVyYW5jZTogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKGUsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5hZGRDbGFzcygnZHJhZy1zb3J0Jyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oZSwgdWkpIHtcclxuICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnJlbW92ZUNsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnJlbW92ZUNsYXNzKCdyZXF1ZXN0LWl0ZW0tLW5ldycpO1xyXG4gICAgICAgICAgICAgICAgICAgIENybS5yZXF1ZXN0LndpZ2V0UmVwbGFjZUljb24odWkuaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kaXNhYmxlU2VsZWN0aW9uKCk7XHJcbiAgICB9LFxyXG4gICAgLy9SZXBsYWNlIGljb24gd2hlbiBkcmFnIGl0ZW1cclxuICAgIHdpZ2V0UmVwbGFjZUljb246IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgbGV0IHdpZGdldCA9IGVsLmNsb3Nlc3QoJy5yZXF1ZXN0X193aWRnZXQnKTtcclxuICAgICAgICBsZXQgaXRlbSA9IGVsLmNsb3Nlc3QoJy5yZXF1ZXN0LWl0ZW0nKTtcclxuICAgICAgICBsZXQgaWNvbiA9IGVsLmZpbmQoJy5yZXF1ZXN0LWl0ZW1fX2ljb24nKTtcclxuXHJcbiAgICAgICAgbGV0IGljb25OZXcgPSAncmVxdWVzdC1pdGVtX19pY29uIGZhbCBmYS1zbWlsZSc7XHJcbiAgICAgICAgbGV0IGljb25Xb3JrID0gJ3JlcXVlc3QtaXRlbV9faWNvbiBmYWwgZmEtY2xvY2snO1xyXG4gICAgICAgIGxldCBpY29uRG9uZSA9ICdyZXF1ZXN0LWl0ZW1fX2ljb24gZmFsIGZhLWNoZWNrLWNpcmNsZSc7XHJcbiAgICAgICAgbGV0IGljb25BYm9ydCA9ICdyZXF1ZXN0LWl0ZW1fX2ljb24gZmFsIGZhLWZyb3duJztcclxuXHJcbiAgICAgICAgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS1uZXcnKSkge1xyXG4gICAgICAgICAgICBpY29uLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoaWNvbk5ldyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0td29yaycpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uV29yayk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0tZG9uZScpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uRG9uZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaGFzQ2xhc3MoJ3JlcXVlc3RfX3dpZGdldC0tYWJvcnQnKSkge1xyXG4gICAgICAgICAgICBpY29uLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoaWNvbkFib3J0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaXRlbUluZm86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5yZXF1ZXN0X193aWRnZXQnKVxyXG4gICAgICAgICAgICAuZmluZCgnLnJlcXVlc3QtaXRlbScpXHJcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljb24gPSAkKHRoaXMpLmZpbmQoJy5yZXF1ZXN0LWl0ZW1fX2ljb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygncmVxdWVzdC1pdGVtLS1ub3RmaWxsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhbCBmYS1pbmZvLWNpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC53cmFwKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJyZXF1ZXN0LWl0ZW1fX2ljb25cIiB0b29sdGlwPVwi0JfQsNGP0LLQutCwINC90LUg0LfQsNC/0L7Qu9C90LXQvdC90LBcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vUmVxdWVzdCB0YWJzXHJcbiAgICB0YWJzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtcmVxdWVzdC10YWInKS50YWJzKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JtIFNlcnZpY2VzXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uc2VydmljZXMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBDcm0uc2VydmljZXMuc2VsZWN0VGltZSgpO1xyXG4gICAgICAgIENybS5zZXJ2aWNlcy5zaG93QWRkU2VydmljZSgpO1xyXG4gICAgICAgIENybS5zZXJ2aWNlcy5zaG93U2VydmljZUl0ZW0oKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDEwMjQpIHtcclxuICAgICAgICAgICAgLy8gQ3JtLnNlcnZpY2VzLml0ZW1Ib3ZlcigpO1xyXG4gICAgICAgICAgICBDcm0ucmVxdWVzdC5zb3J0TXVsdGlwbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaXRlbUhvdmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJGl0ZW0gPSAkKCcuanMtc2VydmljZS1pdGVtJyk7XHJcblxyXG4gICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdzZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmlzKCc6Zm9jdXMnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3QuaGFzQ2xhc3MoJ3NlbGVjdDItY29udGFpbmVyLS1vcGVuJylcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1ob3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzZWxlY3RUaW1lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1zZXJ2aWNlLWl0ZW0nKS5maW5kKCdzZWxlY3QnKTtcclxuICAgICAgICAkc2VsZWN0Lm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlcnZpY2UtaXRlbScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0FkZFNlcnZpY2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFkZC1zZXJ2aWNlLS1hZGQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJHBhcmVudC5maW5kKCcuanMtYWRkLXNlcnZpY2UtLWNsb3NlJyk7XHJcbiAgICAgICAgICAgIGxldCAkYmxvY2tzID0gJHBhcmVudC5maW5kKCcuYWRkLXNlcnZpY2VfX2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bkNsb3NlLnNob3coKTtcclxuICAgICAgICAgICAgJGJsb2Nrcy5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1hZGQtc2VydmljZS0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bk9wZW4gPSAkcGFyZW50LmZpbmQoJy5qcy1hZGQtc2VydmljZS0tYWRkJyk7XHJcbiAgICAgICAgICAgIGxldCAkYmxvY2tzID0gJHBhcmVudC5maW5kKCcuYWRkLXNlcnZpY2VfX2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bk9wZW4uc2hvdygpO1xyXG4gICAgICAgICAgICAkYmxvY2tzLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2hvd1NlcnZpY2VJdGVtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy10b2dnbGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWJsb2NrLXRhcmdldCcpO1xyXG5cclxuICAgICAgICAgICAgJHBhcmVudC5maW5kKCcuanMtdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcignOnRleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdqc0NybUNvbWJvVGl0bGVTZXJ2aWNlcycpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnW2RhdGEtYmxvY2tdJylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCdbZGF0YS1ibG9jaz0nICsgaWQgKyAnXScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gU3RlcHNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5zdGVwcyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAvLyBDcm0uc3RlcHMuc29ydGFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ3JtLnN0ZXBzLnRhYnMoKTtcclxuICAgICAgICBDcm0uc3RlcHMuc2hvd1NlYXJjaCgpO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgdGFic1xyXG4gICAgdGFiczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXN0dWRpby1zdGVwJykudGFicygpO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgYnRuIHNob3cgc2VhcmNoXHJcbiAgICBzaG93U2VhcmNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1idG4tc3RlcHMtc2VhcmNoLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5zdGVwc19fc2VhcmNoJykuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgc29ydGFibGUgaXRlbVxyXG4gICAgc29ydGFibGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuYmItdXBsb2FkX19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJy5iYi11cGxvYWRfX2xpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnNvcnRhYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogJy5iYi11cGxvYWRfX2l0ZW06bm90KC5pcy11bnNvcnRhYmxlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ21vdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvbGVyYW5jZTogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbihlLCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLmFkZENsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGUsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzLnJlcGxhY2VUaXRsZUFmdGVyU29ydGFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5yZW1vdmVDbGFzcygnZHJhZy1zb3J0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kaXNhYmxlU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vUmVwbGFjZSBpdGVtIHRpdGxlIGFmdGVyIHNvcnR0YWJsZVxyXG4gICAgcmVwbGFjZVRpdGxlQWZ0ZXJTb3J0YWJsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGhvbWUgPSAkKCc8c3BhbiBjbGFzcz1cImJiLXVwbG9hZF9faG9tZVwiPicpO1xyXG4gICAgICAgIGhvbWUudGV4dCgn0JPQu9Cw0LLQvdCw0Y8nKS5hcHBlbmRUbygkKCcuYmItdXBsb2FkX19pdGVtOmZpcnN0JykpO1xyXG4gICAgICAgICQoJy5iYi11cGxvYWRfX2l0ZW0nKVxyXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxyXG4gICAgICAgICAgICAuZmluZCgnLmJiLXVwbG9hZF9faG9tZScpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gU3R1ZGlvXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uc3R1ZGlvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgQ3JtLnN0dWRpby5hdmF0YXJUb2dnbGVCdG4oKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLndvcmtlclBhZ2VUb2dnbGUoKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLmNhdGVnb3J5U2hvdygpO1xyXG4gICAgfSxcclxuICAgIC8vQXZhdGFyIGJ0biBvcGVuIC8gY2xvc2VcclxuICAgIGF2YXRhclRvZ2dsZUJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5qcy1hZGQtYXZhdGFyLS1vcGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1hZGQtYXZhdGFyJykuZmFkZUluKHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmpzLWFkZC1hdmF0YXItLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1hZGQtYXZhdGFyJykuZmFkZU91dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vT3BlbiAvIENsb3NlIEFkZFdvcmtlciBwYWdlXHJcbiAgICB3b3JrZXJQYWdlVG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgIC8vT3BlbiBhZGQgd2Fya2VyIHBhZ2VcclxuICAgICAgICAgICAgbGV0ICRhZGRXb3JrZXIgPSAkKCcuanMtd29ya2VyLWFkZCcpO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXdvcmtlci1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignaHJlZicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtd29ya2VyLWl0ZW0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGFkZFdvcmtlci5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFkZFdvcmtlci5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkYWRkV29ya2VyLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9DbG9zZSBhZGQgd29ya2VyIHBhZ2VcclxuICAgICAgICAgICAgJCgnLmpzLXdvcmtlci1hZGQtLWNsb3NlJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRhZGRXb3JrZXIucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhdGVnb3J5U2hvdzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtY2F0ZWdvcnknLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtY2F0ZWdvcnknKTtcclxuICAgICAgICAgICAgbGV0ICRpdGVtSGlkZGVuID0gJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCdbZGF0YS1oaWRkZW49XCJ0cnVlXCJdJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHRhcmdldC5pcygnLmNhdGVnb3J5X19pdGVtLS1tb3JlJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1IaWRkZW4uYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9faXRlbS0tbW9yZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQldGJ0LUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtSGlkZGVuLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2l0ZW0tLW1vcmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0KHQutGA0YvRgtGMJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKEJhc2UuaW5pdCgpKTtcclxuICAgICQoQ3JtLmluaXQoKSk7XHJcbn0pO1xyXG5cclxuLypcclxuICoqKiBmdW5jdGlvbnMuanNcclxuICovXHJcbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdiYi1wdXNoVXAnKTtcclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgICAgICdiYi1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXHJcbiAgICApO1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItcHVzaFVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLmJiLXB1c2hVcCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLmJiLXB1c2hVcCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vU2V0IElucHV0IERhdGUgVmFsdWVcclxuZnVuY3Rpb24gc2V0SW5wdXREYXRlKHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgbGV0IGhveSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZCA9IGhveS5nZXREYXRlKCksXHJcbiAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICB5ID0gaG95LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF0YTtcclxuXHJcbiAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgZCA9ICcwJyArIGQ7XHJcbiAgICB9XHJcbiAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgbSA9ICcwJyArIG07XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gX2RhdC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgIF9kYXRbaV0udmFsdWUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KGJsb2NrKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4iXX0=
