'use strict';

//Global Vars
var $window = $(window);
var $document = $(document);
var $html = $('html');
var $wrapper = $('.wrapper');
var $main = $('.main');
var $overlay = $('.overlay');
var $menu = $('.js-menu');
var $navMobile = $('.js-mobile-nav');
var $hamburger = $('.js-main-nav-btn');

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
            card.cardMoveItems();

            $window.resize(card.cardMoveItems());
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
    cardMoveItems: function cardMoveItems() {
        $('.js-card-title').insertAfter('.card-gallary__wrap');
        $('.js-card-about').insertBefore('.card-adress');
        $('.js-card-info-category').appendTo('.card-info__request');
        $('.js-card-request--show').prependTo('.card-info__top');
        $('.card-info__inner').insertAfter('.card-adress');
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
 * Crm page Aplication
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var onepage = {
    init: function init() {
        onepage.promo.init();
        onepage.registration.init();
        $navMobile.removeClass('sm-only--flex');
        Base.menu.hamburgerBtn();
        Base.menu.clickOuside();

        if ($wrapper.hasClass('page-onepage--home')) {
            onepage.heroAnimate();
        }

        this.slider();
        this.mobileSlider();
        this.counterSpin();
    },
    heroAnimate: function heroAnimate() {
        var tl = new TimelineMax();
        tl.fromTo('.hero', 1, { y: -300, opacity: 0 }, { y: 0, opacity: 1 }).fromTo('.hero__title', 1, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=.3').fromTo('.hero__subtitle', 1, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=.7').fromTo('.hero__widget', 1, { y: 70, opacity: 0 }, { y: 0, opacity: 1 }, '-=.5').fromTo('.social', 1, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6');
    },
    slider: function slider() {
        var $slider = $('.js-onepage-slider');

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
                            breakpoint: 700,
                            settings: {
                                slidesToShow: 1,
                                arrows: false
                            }
                        }]
                    });
                }
            });
        }
    },
    mobileSlider: function mobileSlider() {
        if ($(document).width() < 768) {
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
                            autoplay: true,
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
                var screen = $('.js-counter--wrapper').offset();

                if ($(window).scrollTop() > screen.top - 600) {
                    var $spin = $('.js-counter');

                    scrolled = true;

                    $spin.each(function () {
                        $(this).prop('js-counter', 0).animate({
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
    }
};

onepage.promo = {
    init: function init() {
        onepage.promo.animation();
        onepage.promo.sliders();
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
};

onepage.registration = {
    init: function init() {
        this.blockReplace();
    },

    blockReplace: function blockReplace() {
        var authForm = $('.js-promo-form');

        if ($document.width() > 768) {
            moveForm();
        }

        $window.resize(function () {
            if ($document.width() > 768) {
                moveForm();
            } else {
                $('.screen--reg').append(authForm);
            }
        });

        function moveForm() {
            authForm.insertAfter('.firstscreen__wrapper');
        }
    }
};

$(function () {
    $(Base.init());
    $(card.init());
    $(onepage.init());
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiZHJvcGRvd24iLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwidGFicyIsImZpbmQiLCJpcyIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJyZW1vdmVBdHRyIiwicHJvcCIsIiRhY2NvcmRlb24iLCJzbGlkZVVwIiwiZWFjaCIsInNsaWRlRG93biIsIiRwYXJlbnQiLCJjbG9zZXN0IiwiJGl0ZW0iLCJkYXRhIiwibGlzdCIsIndvcmtMaXN0IiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCIkaW5wdXRJY29uIiwiJGJ0blJlc2V0IiwiJGhpbnQiLCJidG4iLCIkYnRuRGF0YSIsIiRpbnB1dFZhbCIsInZhbCIsImF0dHIiLCJzaG93Iiwibm90IiwiaGlkZSIsImZpbHRlciIsImZhZGVPdXQiLCJmYWRlSW4iLCJ0ZXh0IiwidXNlclBob25lIiwicGhvbmUiLCJjaGFuZ2VDaXR5VGl0bGUiLCIkc2xpZGVyIiwiJHNsaWRzIiwiJHNsaWRlIiwiJHByZXZBcnJvdyIsIiRuZXh0QXJyb3ciLCJzbGljayIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJpbmZpbml0ZSIsImFycm93cyIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiJGNhdGFsb2dJdGVtU2xpZGVyIiwiX3RoaXMiLCIkc2xpZGVzIiwiJHNsaWRlckRvdHMiLCJldmVudCIsInByZXBlbmQiLCJhcHBlbmQiLCJzbGlkZUNvdW50IiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwiaSIsImh0bWwiLCJsYXp5TG9hZCIsInN0b3BQcm9wYWdhdGlvbiIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwidGV4dFN1Y2Nlc3MiLCJ0ZXh0RXJyb3IiLCJwdXNoVXAiLCJzdGF0dXMiLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsIm1lc3NhZ2UiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCIkZHJvcGRvd24iLCJyZW5kZXIiLCJzaG93SGlkZSIsIiRidG5DbG9zZSIsIiRkcm9wZG93bk92ZXJsYXkiLCIkZHJvcGRvd25MaXN0IiwiYXBwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsIiRidG5GbG9hdGluZyIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwiaW5wdXRFdmVudHMiLCJpbnB1dE1hc2siLCJtb2JpbGVTZWxlY3QiLCJpbnB1dG1hc2siLCJtYXNrIiwiZ3JlZWR5Iiwib25CZWZvcmVQYXN0ZSIsInBhc3RlZFZhbHVlIiwib3B0cyIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImRlZmluaXRpb25zIiwidmFsaWRhdG9yIiwiY2FyZGluYWxpdHkiLCJjYXNpbmciLCJpbnB1dCIsImV4ZWNDb21tYW5kIiwibmV4dCIsInByZXYiLCJmaWVsZEVkaXQiLCJmaWVsZEVkaXRJbnB1dCIsImZpZWxkRWRpdEJ0biIsImZpZWxkRWRpdFRleHQiLCJibHVyIiwidHJpbSIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwia2V5cHJlc3MiLCJrZXlDb2RlIiwiZW5kIiwiJHNlbGVjdCIsIiRpbnB1dFNlYXJjaCIsIiRyZXN1bHRJdGVtIiwic2VsZWN0MiIsInRhZ3MiLCJ0ZW1wbGF0ZVJlc3VsdCIsImFkZFVzZXJQaWMiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsImlmb3JtYXQiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsInRpbWVBbmRQcmljZSIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsImFkZFJlc2V0QnRuIiwicGhvbmVDb2RlIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJkcm9wZG93blBhcmVudCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJHllYXJTZWxlY3QiLCIkZGF0ZVNlbGVjdCIsInNlbGVjdENvZGVTZWxlY3Rpb24iLCJvcHRWYWwiLCJzZWxlY3RDb2RlUmVzdWx0IiwiY291bnRyeSIsIiRwaG9uZUNvZGVCb3giLCIkaW5wdXQiLCJmb2N1cyIsIm9wdGlvblNlbGVjdCIsInNlbGVjdFZhbHVlIiwiZXEiLCJjaGFuZ2UiLCJjb3VudGVyIiwic2VsZWN0ZWRJbmRleCIsImFkZEZvY3VzIiwicmVtb3ZlRm9jdXMiLCJfcmVtb3ZlU3R5bGUiLCJfYWRkU3R5bGUiLCJzZWFyY2hCdG4iLCJmYW5jeWJveCIsImJhc2VDbGFzcyIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaW1hZ2UiLCJwcmVsb2FkIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJ0b29sYmFyIiwibW9iaWxlIiwiY2xpY2tDb250ZW50IiwiY2xpY2tTbGlkZSIsInRvdWNoIiwic21hbGxCdG4iLCJ3aG9pcyIsImZvcm0iLCJjYXJkIiwiY2FyZFNjcm9sbHNweSIsImNhcmRTdGlja3kiLCJjYXJkUmVxdWVzdFRvZ2dsZSIsImNhcmRNb3ZlSXRlbXMiLCIkY2FyZFNsaWRlciIsImNhcmRJbmZvUmVxdWVzdCIsImluc2VydEJlZm9yZSIsInByZXBlbmRUbyIsInNjcm9sbHNweSIsImZpeENhcmRVc2VySW5mbyIsInNjcm9sbCIsInN0aWNreUJsb2NrT2Zmc2V0IiwiZml4ZWRCbG9jayIsIm91dGVySGVpZ2h0IiwiZml4ZWRCbG9ja09mZnNldCIsInN0aWNreUJsb2NrIiwicG9zaXRpb24iLCJib3R0b20iLCJjYXJkTWVudUZpeGVkIiwiY2FyZE1lbnVPZmZzZXQiLCJjYXJkTWVudUNsb25lIiwiY2FyZE1lbnUiLCJyaWdodCIsInpJbmRleCIsImNhcmRDb250ZW50IiwiaGVpZ2h0Iiwib25lcGFnZSIsInByb21vIiwicmVnaXN0cmF0aW9uIiwiaGVyb0FuaW1hdGUiLCJtb2JpbGVTbGlkZXIiLCJjb3VudGVyU3BpbiIsInRsIiwiVGltZWxpbmVNYXgiLCJmcm9tVG8iLCJ5Iiwib3BhY2l0eSIsInNjcm9sbGVkIiwic2NyZWVuIiwiJHNwaW4iLCJDb3VudGVyIiwiZHVyYXRpb24iLCJlYXNpbmciLCJzdGVwIiwibm93IiwiTWF0aCIsImNlaWwiLCJhbmltYXRpb24iLCJzbGlkZXJzIiwieCIsImZhZGUiLCJjZW50ZXJNb2RlIiwiY2VudGVyUGFkZGluZyIsImJsb2NrUmVwbGFjZSIsImF1dGhGb3JtIiwibW92ZUZvcm0iLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwibWF4IiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssV0FBV0wsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU0sUUFBUU4sRUFBRSxPQUFGLENBQWQ7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUSxRQUFRUixFQUFFLFVBQUYsQ0FBZDtBQUNBLElBQU1TLGFBQWFULEVBQUUsZ0JBQUYsQ0FBbkI7QUFDQSxJQUFNVSxhQUFhVixFQUFFLGtCQUFGLENBQW5COztBQUVBOzs7Ozs7QUFNQSxJQUFNVyxPQUFPO0FBQ1RDLFVBQU0sZ0JBQVc7QUFDYixhQUFLQyxlQUFMO0FBQ0EsYUFBS0MsUUFBTCxDQUFjRixJQUFkO0FBQ0EsYUFBS0csU0FBTDtBQUNBLGFBQUtDLFFBQUw7QUFDQTtBQUNBLGFBQUtD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RDtBQUNBLFNBQVNtUixtQkFBVCxDQUE2QkMsS0FBN0IsRUFBb0NDLEVBQXBDLEVBQXdDO0FBQ3BDaFcsTUFBRStWLFFBQVEsUUFBVixFQUFvQmxULEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDLFlBQVc7QUFDdkM3QyxVQUFFK1YsS0FBRixFQUFTaFMsUUFBVCxDQUFrQmlTLEVBQWxCO0FBQ0gsS0FGRDtBQUdBaFcsTUFBRStWLFFBQVEsU0FBVixFQUFxQmxULEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7QUFDeEM3QyxVQUFFK1YsS0FBRixFQUFTcFMsV0FBVCxDQUFxQnFTLEVBQXJCO0FBQ0gsS0FGRDtBQUdIOztBQUVELFNBQVM1TixjQUFULENBQXdCMk4sS0FBeEIsRUFBK0JDLEVBQS9CLEVBQW1DO0FBQy9CaFcsTUFBRStWLEtBQUYsRUFBU2xULEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVc7QUFDNUI3QyxVQUFFLElBQUYsRUFBUTBLLFdBQVIsQ0FBb0JzTCxFQUFwQjtBQUNILEtBRkQ7O0FBSUFoVyxNQUFFRyxRQUFGLEVBQVkwQyxFQUFaLENBQWUsNEJBQWYsRUFBNkMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3JELFlBQUk5QyxFQUFFOEMsRUFBRTJILE1BQUosRUFBWWhHLE9BQVosQ0FBb0JzUixLQUFwQixFQUEyQi9TLE1BQS9CLEVBQXVDO0FBQ3ZDaEQsVUFBRStWLEtBQUYsRUFBU3BTLFdBQVQsQ0FBcUJxUyxFQUFyQjtBQUNBbFQsVUFBRXFGLGVBQUY7QUFDSCxLQUpEO0FBS0giLCJmaWxlIjoib25lcGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcnNcbmNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XG5jb25zdCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbmNvbnN0ICRodG1sID0gJCgnaHRtbCcpO1xuY29uc3QgJHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xuY29uc3QgJG1haW4gPSAkKCcubWFpbicpO1xuY29uc3QgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xuY29uc3QgJG1lbnUgPSAkKCcuanMtbWVudScpO1xuY29uc3QgJG5hdk1vYmlsZSA9ICQoJy5qcy1tb2JpbGUtbmF2Jyk7XG5jb25zdCAkaGFtYnVyZ2VyID0gJCgnLmpzLW1haW4tbmF2LWJ0bicpO1xuXG4vKipcclxuICogQmFzZS5qc1xyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuXHJcbmNvbnN0IEJhc2UgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVByZWxvYWRlcigpO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24uaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuYWNjb3JkZW9uKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG4gICAgICAgIC8vIHRoaXMucmFkaW9CdG4oKTtcclxuICAgICAgICB0aGlzLnRhYigpO1xyXG4gICAgICAgIC8vIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dE1hc2soKTtcclxuICAgICAgICAvLyB0aGlzLmlucHV0RXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcbiAgICAgICAgdGhpcy5jb3B5VGV4dCgpO1xyXG4gICAgICAgIHRoaXMub3duZXJQaG9uZSgpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5jYXRhbG9nSXRlbVNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdC5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRXhwYW5kZWQoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blN0YXR1c0FuaW1hdGUoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29Ub3AoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5GbG9hdGluZygpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5QdXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAucG9wdXBGYW5jeUJveCgpO1xyXG4gICAgICAgIHRoaXMucG9wdXAud2hvSXMoKTtcclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG4gICAgICAgIHRoaXMucG9wdXAucmVpbml0KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS5oYW1idXJnZXJCdG4oKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51LmNsaWNrT3VzaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZWFyY2hCdG5PcGVuQ2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xyXG4gICAgICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzY3JvbGxCYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjNTg1YTU5JyxcclxuICAgICAgICAgICAgICAgIC8vIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJveHpvb20gICAgICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2ZXJnZSAgICAgICAgICAgICA6IDUwMCxcclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoICAgICAgIDogJzJweCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXIgICAgICA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcbiAgICByZW1vdmVQcmVsb2FkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAkKCdib2R5JykuYWRkQ2xhc3MoJ2xvYWRpbmctYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgIC8vIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8vSW5pdCBiYXNlIHRhYnMgalEgVWkgVGFic1xyXG4gICAgdGFiOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWJiLXRhYicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuICAgIGNoZWNrYm94OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQ3VzdG9tIHJhZGlvQnRuXHJcbiAgICAvLyByYWRpb0J0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgbGV0ICRyYWRpbyA9ICQoJy5qcy1iYi1yYWRpbycpO1xyXG5cclxuICAgIC8vICAgICAvL0JCIHJhZGlvXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItcmFkaW8nLCBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgIC8vICAgICAgICAgaWYgKCRpbnB1dC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgJHJhZGlvLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0sXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuICAgIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRhY2NvcmRlb24gPSAkKCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICBlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcbiAgICAgICAgICAgIGxldCAkaXRlbSAgID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkcGFyZW50LmRhdGEoJ2FjY29yZGVvbicpID09PSAnY29sbGFwc2UnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGxpc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0VG9nZ2xlKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgICAgID0gJCgnLmpzLWxpc3QnKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya0xpc3QgPSBsaXN0LmZpbmQoJy5qcy1saXN0LXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpc3RUb2dnbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Db3B5IHRleHQgY2xpY2sgbGlua1xyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCAgICA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJveCcpO1xyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgID0gJHBhcmVudC5maW5kKCcuanMtaW5wdXQtLWNsZWFyJyk7XHJcbiAgICAgICAgICAgIGxldCAkaGludCAgICAgID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCAgID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuICAgICAgID0gJHBhcmVudC5maW5kKCcuanMtdXNlci1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5EYXRhICA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0VmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9faWNvbicpXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy11c2VyLXBob25lJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgkKHRoaXMpLmRhdGEoJ3Bob25lLWhpZGVuJykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXVzZXItcGhvbmUtLXNob3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy11c2VyLXBob25lJyk7XHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9DaXR5IHNlbGVjdFxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHkgICAgICA9ICQoJy5qcy1jaXR5LXNlbGVjdCcpO1xyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5VGl0bGUgPSBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9fdGl0bGUgc3BhbicpO1xyXG5cclxuICAgICAgICBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgICBjaGFuZ2VDaXR5VGl0bGUudGV4dCh0ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlcicpO1xyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRzICAgICA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlICAgICA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcHJldkFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tcHJldicpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZHMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdyAgICAgOiAkbmV4dEFycm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3cgICAgIDogJHByZXZBcnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXkgICAgICA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQgOiA0MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZCAgICAgICAgIDogMTUwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93ICA6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZSAgICAgIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzICAgICAgICA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHMgICAgICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHMgICAgICAgIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzICAgICAgOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXRhbG9nIEl0ZW0gU2xpZGVyXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2F0YWxvZ0l0ZW1TbGlkZXIgPSAkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgICAgICAgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgICAgID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgICAgICA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQgICAgICA6ICdvbmRlbWFuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkICAgICAgICAgOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdyAgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzICAgICAgICA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90cyAgICAgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnV0dG9uczoge1xyXG4gICAgICAgIC8vYnRuIGV4cGFuZGVkXHJcbiAgICAgICAgYnRuRXhwYW5kZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vYnRuIGFuaW1hdGUgb24gaG92ZXJcclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggICAgICAgICA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSAgICAgICAgID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wIDogcmVsWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggICAgICAgICA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSAgICAgICAgID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wIDogcmVsWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcbiAgICAgICAgYnRuU3RhdHVzQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGljayA9IDA7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgY2xpY2srKztcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3VjY2VzcyA9ICQodGhpcykuZGF0YSgnbWVzc2FnZS1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dEVycm9yICAgPSAkKHRoaXMpLmRhdGEoJ21lc3NhZ2UtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2sgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1lcnJvcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgIDogdGV4dEVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHRTdWNjZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1yZWFkeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vZmxvYXRpbmcgYnRuIGFuaW1hdGluXHJcbiAgICAgICAgYnRuRmxvYXRpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcbiAgICAgICAgICAgIGxldCBydW4gID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuICAgICAgICAgICAgbGV0IGhlbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICRidG4ub2ZmKFxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPINC30LDQutGA0YvRgtC40Y9cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcnVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsICcuanMtYnRuLWZsb2F0aW5nJywgaGVuZGxlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnRuSWQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcubWQtaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5JZC50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYnRuLWZsb2F0aW5nIC5idG4tZmxvYXRpbmdfX2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlbW92ZUFuaW1hdGlvbigkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v0JrQu9C40Log0LIg0L3QtSDQutC90L7Qv9C60Lgg0YHQutGA0YvQstCw0LXRgiDQvtCy0LXRgNC70LXQuSDQuCDQutC90L7Qv9C60LhcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZhLWxlYXZlLWFjdGl2ZSdcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL9CV0YHQu9C4INGB0YHRi9C70LrQsCDQvtGC0LrRgNGL0LLQsNC10YIg0LzQvtC00LDQu9C60YMsINGC0L4g0L/QviDQvtGC0LrRgNGL0YLQuNGOINC80L7QtNCw0LvQutC4INGB0LrRgNGL0LLQsNC10YIg0LrQvdC+0L/QutC4XHJcbiAgICAgICAgICAgICQoJy5tb2RhbCcpLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBidG5QdXNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50LmZpbmQoJ1tkYXRhLXB1c2hdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2UnKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXMgID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgIDogbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIHRvcFxyXG4gICAgICAgIGJ0bkdvVG9wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIGVsZW1lbnRcclxuICAgICAgICBidG5Hb1RvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuICAgICAgICAgICAgJCgnLmpzLWdvdG8nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiAgPSAkKGVsZW1lbnRDbGljaykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA2MCArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRyb3Bkb3duOiB7XHJcbiAgICAgICAgLy9DdXN0b20gZHJvcGRvd25cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkZHJvcGRvd24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnYmItZHJvcGRvd24tLWhvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93bi5iYi1kcm9wZG93bi0tdHJhbnNmb3JtJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJiLWRyb3Bkb3duX19jbG9zZSBqcy1iYi1kcm9wZG93bi0tY2xvc2VcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25PdmVybGF5ID0gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fb3ZlcmxheVwiPidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5DbG9zZS5hcHBlbmRUbygkZHJvcGRvd25MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25PdmVybGF5Lmluc2VydEFmdGVyKCRkcm9wZG93bkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93SGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gICAgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmlzKCcuYmItZHJvcGRvd25fX292ZXJsYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS10cmFuc2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24gLmluZm8tYmxvY2tfX2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCcuaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5wdXRzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dE1hc2soKTtcclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ojk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb2RlLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1lbWFpbC1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqezEsMjB9Wy4qezEsMjB9XVsuKnsxLDIwfV1bLip7MSwyMH1dQCp7MSwyMH1bLip7Miw2fV1bLip7MSwyfV0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeSAgICAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uKHBhc3RlZFZhbHVlLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhc3RlZFZhbHVlLnJlcGxhY2UoJ21haWx0bzonLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvciAgOiBcIlswLTlBLVphLXohIyQlJicqKy89P15fYHt8fX4tXVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmcgICAgIDogJ2xvd2VyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGlucHV0IHNlbGVjdCB2YWx1ZVxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0VkaXQgVGV4dCBGaWVsZFxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWZpZWxkLWVkaXQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXQgICAgICA9ICQoJy5qcy1maWVsZC1lZGl0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0QnRuICAgPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2J0bicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0LnNob3coKS5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgLmJsdXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gJzEzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItaW5wdXQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSAgPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgICAgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb2JpbGUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICAnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZWxlY3Q6IHtcclxuICAgICAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLW11bHRpcGxlJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICB0YWdzOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5iYi1zZWxlY3QtLW1ldHJvJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLWljb24nKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uICAgICAgOiBpZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQgICAgICAgICA6IGlmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1zZXJ2aWNlcycpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0ICAgOiB0aW1lQW5kUHJpY2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC1ib3JuJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NsZWFyICAgICAgICAgICAgIDogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW1hZ2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdpbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBmb250YXdlc29tZSBpbnNpZGUgc2VsZWN0XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlmb3JtYXQoaWNvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsT3B0aW9uID0gaWNvbi5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPjxpIGNsYXNzPVwic2VsZWN0Ml9faWNvbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdpY29uJykgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi50ZXh0ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1NlbGVjdCBBZGQgUHJpY2UgVGltZSAmIFByaWNlXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRpbWVBbmRQcmljZShvcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFRpbWUgID0gJChvcHQuZWxlbWVudCkuZGF0YSgndGltZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsUHJpY2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdwcmljZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0LnRleHQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVGltZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQcmljZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3ROYXRpdmUgPSAkKCcuanMtc2VsZWN0LW5hdGl2ZScpO1xyXG4gICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciAgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gJCh0aGlzKS5maW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb246Zmlyc3QtY2hpbGQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24udGV4dCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dZZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVllYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRSZXNldEJ0bigpO1xyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sb3JTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC0tY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICRjb2xvclNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VhcmNoLWVuYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQgICA6IGlCYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudCAgIDogJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uICAgICAgOiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQgICAgICAgICA6IGlCYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudCAgICAgICAgIDogJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbG9yIGJhbGwgaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaUJhbGwoY29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJG9yaWdpbmFsT3B0aW9uID0gY29sb3IuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JCYWxsICAgICAgID0gJCgkb3JpZ2luYWxPcHRpb24pLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvci50ZXh0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fbGluZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9XCI+PC9zcGFuPjxwPiAke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPC9wPjwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fYmFsbFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9IFwiPiA8L3NwYW4+IDwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd1llYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zZXQteWVhcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZVllYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHllYXJTZWxlY3QgPSAkKCcuanMtc2VsZWN0LWJvcm4tLWNsZWFyJyk7XHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignc2VsZWN0MjpvcGVuaW5nJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJvcm4nKSA9PT0gJ3llYXInXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRkYXRlU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtYm9ybicpO1xyXG5cclxuICAgICAgICAgICAgJGRhdGVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHNlbGVjdCByZXN1bHRzIHRvIG9wdGlvbiB2YWx1ZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlU2VsZWN0aW9uKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGNpdHkgbmFtZSB0byBvcHRpb25cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVJlc3VsdChvcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbCAgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdFZhbCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBob25lQ29kZUJveCA9ICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQtcGhvbmUtY29kZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkcGhvbmVDb2RlQm94LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dCAgPSAkKHRoaXMpLmZpbmQoJy5iYi1pbnB1dF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0ICAgOiBzZWxlY3RDb2RlUmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBzZWxlY3RDb2RlU2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50ICAgOiAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1pbnB1dC0tc2VsZWN0LXZhbHVlXCI+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25TZWxlY3QgPSAkcGFyZW50LmZpbmQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0VmFsdWUgID0gJHBhcmVudC5maW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5iYi1pbnB1dC0tc2VsZWN0LXZhbHVlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoMCkudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9ICQodGhpcylbMF0uc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKGNvdW50ZXIpLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogJyg5OTkpIDk5OS05OS05OSdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdmb2N1cycsIGFkZEZvY3VzKS5vbignYmx1cicsIHJlbW92ZUZvY3VzKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpjbG9zZScsIHJlbW92ZUZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSAgPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgICAgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb2JpbGUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICAnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZW51OiB7XHJcbiAgICAgICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAgICAgaGFtYnVyZ2VyQnRuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb24nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9hZGRTdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtbW9iaWxlLW5hdi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL1doZW4gQ2xpY2sgT3V0c2lkZSBDbG9zZSBNZW51XHJcbiAgICAgICAgY2xpY2tPdXNpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LCAuanMtZGF0ZSwgLmRhdGVwaWNrZXIsIC5jYXJkLWluZm9fX3JlcXVlc3QsIC5jYXRhbG9nLWZpbHRlciwgLmpzLW1vYmlsZS1maWx0ZXItLW9wZW4sIC5qcy1iYi1hY2NvcmRlb24nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5vdmVybGF5JyxcclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIEJ0biBvcGVuL2Nsb3NlXHJcbiAgICAgICAgc2VhcmNoQnRuT3BlbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlYXJjaEJ0biA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLWJ0bicpO1xyXG4gICAgICAgICAgICBzZWFyY2hCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2FkZFN0eWxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuICAgICAgICAgICAgJG92ZXJsYXkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfcmVtb3ZlU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG4gICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBvcHVwOiB7XHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG4gICAgICAgIHBvcHVwRmFuY3lCb3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzICAgICAgICA6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1cyAgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZSAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnZmFuY3lib3gtY29udGFpbmVyLS1pbWFnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhciAgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vYmlsZSAgIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja0NvbnRlbnQ6ICdjbG9zZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGUgIDogJ2Nsb3NlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzICAgICAgICA6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoICAgICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyICAgICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc21hbGxCdG4gICAgICAgICA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzICAgICAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnMgICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tY2xvc2VdJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzICAgICAgICA6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoICAgICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc21hbGxCdG46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuICAgICAgICB3aG9JczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gID0gJCgnI2F1dGgtZm9ybScpLmZpbmQoJy5mb3JtJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2hvaXMgPT09ICdtYXN0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtbWFzdGVyJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdob2lzID09PSAnc3R1ZGlvJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLXN0dWRpbycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1jbGllbnQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL0R1bmFtaWNseSBjaGFuZ2UgZm9ybSB0aXRsZVxyXG4gICAgICAgIGNoYW5nZUZvcm1UaXRsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAnLmpzLWZvcm0tdGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5jb2xvclNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuLyoqXHJcbiAqIENhcmRcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IGNhcmQgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJkLnNsaWRlcigpO1xyXG4gICAgICAgIGNhcmQuY2FyZFNjcm9sbHNweSgpO1xyXG4gICAgICAgIGNhcmQuY2FyZFN0aWNreSgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZFJlcXVlc3RUb2dnbGUoKTtcclxuICAgICAgICAgICAgY2FyZC5jYXJkTW92ZUl0ZW1zKCk7XHJcblxyXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShjYXJkLmNhcmRNb3ZlSXRlbXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTbGlkZXJcclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXNsaWRlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgJGNhcmRTbGlkZXIgPSAkKCcuanMtY2FyZC1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgICAgICRjYXJkU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgcmVxdWVzdCBzaG93IC8gaGlkZVxyXG4gICAgY2FyZFJlcXVlc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYXJkSW5mb1JlcXVlc3QgPSAkKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrcyB3aGVuIHdpbmRvdyB3aWR0aCA8IDc2OFxyXG4gICAgY2FyZE1vdmVJdGVtczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtdGl0bGUnKS5pbnNlcnRBZnRlcignLmNhcmQtZ2FsbGFyeV9fd3JhcCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWFib3V0JykuaW5zZXJ0QmVmb3JlKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1pbmZvLWNhdGVnb3J5JykuYXBwZW5kVG8oJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93JykucHJlcGVuZFRvKCcuY2FyZC1pbmZvX190b3AnKTtcclxuICAgICAgICAkKCcuY2FyZC1pbmZvX19pbm5lcicpLmluc2VydEFmdGVyKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtbW92ZS1jYXJkLXBvbGljeScpLmFwcGVuZFRvKCcuY2FyZC1yZXF1ZXN0LWZvcm0nKTtcclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2Nyb2xsc3B5XHJcbiAgICBjYXJkU2Nyb2xsc3B5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLXNjcm9sbHNweScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC0xMDAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC02MCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhcmRTdGlja3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zdGlja3knKS5sZW5ndGggJiYgJCgnLmpzLWNhcmQtZml4ZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrID0gJCgnLmpzLWNhcmQtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9ja09mZnNldCA9IHN0aWNreUJsb2NrLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2sgPSAkKCcuanMtY2FyZC1maXhlZCcpO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9ja09mZnNldCA9IGZpeGVkQmxvY2sub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRDb250ZW50ID0gJCgnLmpzLWNhcmQtY29udGVudC1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51ID0gJCgnLmpzLWNhcmQtbWVudScpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJjYXJkLW1lbnVfX2Nsb25lXCI+JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICQoJy5qcy1jYXJkLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKSlcclxuICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihjYXJkTWVudSlcclxuICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudU9mZnNldCA9IGNhcmRNZW51Lm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suaGVpZ2h0KCkgPCBjYXJkQ29udGVudC5oZWlnaHQoKSAmJlxyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjhcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhDYXJkVXNlckluZm8oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZml4Q2FyZFVzZXJJbmZvKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtMSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMzBcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FyZE1lbnUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTWVudUZpeGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmRNZW51Rml4ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID49IGNhcmRNZW51T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51LnJlbW92ZUF0dHIoJ3N0eWxlJykucmVtb3ZlQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cblxuLyoqXG4gKiBDcm0gcGFnZSBBcGxpY2F0aW9uXG4gKlxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cbiAqL1xuY29uc3Qgb25lcGFnZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgb25lcGFnZS5wcm9tby5pbml0KCk7XG4gICAgICAgIG9uZXBhZ2UucmVnaXN0cmF0aW9uLmluaXQoKTtcbiAgICAgICAgJG5hdk1vYmlsZS5yZW1vdmVDbGFzcygnc20tb25seS0tZmxleCcpO1xuICAgICAgICBCYXNlLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XG4gICAgICAgIEJhc2UubWVudS5jbGlja091c2lkZSgpO1xuXG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1vbmVwYWdlLS1ob21lJykpIHtcbiAgICAgICAgICAgIG9uZXBhZ2UuaGVyb0FuaW1hdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XG4gICAgICAgIHRoaXMubW9iaWxlU2xpZGVyKCk7XG4gICAgICAgIHRoaXMuY291bnRlclNwaW4oKTtcbiAgICB9LFxuICAgIGhlcm9BbmltYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgdGwuZnJvbVRvKCcuaGVybycsIDEsIHsgeTogLTMwMCwgb3BhY2l0eTogMCB9LCB7IHk6IDAsIG9wYWNpdHk6IDEgfSlcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5oZXJvX190aXRsZScsXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPS4zJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3N1YnRpdGxlJyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgJy09LjcnXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICcuaGVyb19fd2lkZ2V0JyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogNzAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAnLT0uNSdcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5zb2NpYWwnLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgeyB5OiA1MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPTAuNidcbiAgICAgICAgICAgICk7XG4gICAgfSxcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1vbmVwYWdlLXNsaWRlcicpO1xuXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtb2JpbGVTbGlkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJChkb2N1bWVudCkud2lkdGgoKSA8IDc2OCkge1xuICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtb25lcGFnZS1zbGlkZXItLW1vYmlsZScpO1xuXG4gICAgICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvdW50ZXJTcGluOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHNjcm9sbGVkID0gZmFsc2U7XG5cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc2Nyb2xsZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NyZWVuID0gJCgnLmpzLWNvdW50ZXItLXdyYXBwZXInKS5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JlZW4udG9wIC0gNjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc3BpbiA9ICQoJy5qcy1jb3VudGVyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICRzcGluLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2pzLWNvdW50ZXInLCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb3VudGVyOiAkKHRoaXMpLnRleHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZzogJ3N3aW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IGZ1bmN0aW9uKG5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudGV4dChNYXRoLmNlaWwobm93KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbm9uZXBhZ2UucHJvbW8gPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uZXBhZ2UucHJvbW8uYW5pbWF0aW9uKCk7XG4gICAgICAgIG9uZXBhZ2UucHJvbW8uc2xpZGVycygpO1xuICAgIH0sXG4gICAgYW5pbWF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoJy5oZXJvLS1pY29uJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgdGwuZnJvbVRvKCcubG9nbycsIDEsIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LCB7IHg6IDAsIG9wYWNpdHk6IDEgfSlcbiAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAnLmhlcm8taW5jb19faW1nJyxcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiA1MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgJy09MC41J1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAnLmhlcm8taW5jb19fdGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgIHsgeDogLTUwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1wcm9tbycpKSB7XG4gICAgICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgdGwuZnJvbVRvKCcubG9nbycsIDEsIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LCB7IHg6IDAsIG9wYWNpdHk6IDEgfSlcbiAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAnLmhlcm9fX3RpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICctPTAuNSdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgJy5oZXJvX19zdWJ0aXRsZScsXG4gICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAnLT0uNidcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgJy5zbGljay1uZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICctPTAuNSdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgJy5zbGljay1wcmV2JyxcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAnLT0xJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAnLmFkdi1pbWFnZV9faW1nJyxcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgeyB5OiAzMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICctPTAuNydcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzbGlkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItYWR2JykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWFkdicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgZmFkZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci1hZHYtaW1hZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItYWR2LWltYWdlJykuc2xpY2soe1xuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmYWRlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLXVzZXJzJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLXVzZXJzJykuc2xpY2soe1xuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDQwMDAsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMjBweCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcbiAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4JyxcblxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxub25lcGFnZS5yZWdpc3RyYXRpb24gPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuYmxvY2tSZXBsYWNlKCk7XG4gICAgfSxcblxuICAgIGJsb2NrUmVwbGFjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBhdXRoRm9ybSA9ICQoJy5qcy1wcm9tby1mb3JtJyk7XG5cbiAgICAgICAgaWYgKCRkb2N1bWVudC53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgICAgICBtb3ZlRm9ybSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHdpbmRvdy5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJGRvY3VtZW50LndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgICAgICAgICBtb3ZlRm9ybSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuc2NyZWVuLS1yZWcnKS5hcHBlbmQoYXV0aEZvcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBtb3ZlRm9ybSgpIHtcbiAgICAgICAgICAgIGF1dGhGb3JtLmluc2VydEFmdGVyKCcuZmlyc3RzY3JlZW5fX3dyYXBwZXInKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiQoZnVuY3Rpb24oKSB7XG4gICAgJChCYXNlLmluaXQoKSk7XG4gICAgJChjYXJkLmluaXQoKSk7XG4gICAgJChvbmVwYWdlLmluaXQoKSk7XG59KTtcblxuLypcbiAqKiogZnVuY3Rpb25zLmpzXG4gKi9cbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdiYi1wdXNoVXAnKTtcclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgICAgICdiYi1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXHJcbiAgICApO1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItcHVzaFVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLmJiLXB1c2hVcCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLmJiLXB1c2hVcCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vU2V0IElucHV0IERhdGUgVmFsdWVcclxuZnVuY3Rpb24gc2V0SW5wdXREYXRlKHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgbGV0IGhveSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZCA9IGhveS5nZXREYXRlKCksXHJcbiAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICB5ID0gaG95LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF0YTtcclxuXHJcbiAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgZCA9ICcwJyArIGQ7XHJcbiAgICB9XHJcbiAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgbSA9ICcwJyArIG07XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gX2RhdC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgIF9kYXRbaV0udmFsdWUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KGJsb2NrKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59XHJcblxuIl19
