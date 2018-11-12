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
 * Onepage
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Onepage = {
    init: function init() {
        Base.menu.hamburgerBtn();
        Base.menu.clickOuside();

        if ($wrapper.hasClass('page-onepage--home')) {
            Onepage.heroAnimate();
        }

        this.slider();
        this.mobileSlider();
        this.counterSpin();

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
            this.sliderOneSlide();
        },

        sliderOneSlide: function sliderOneSlide() {
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
    $(Base.init());
    $(card.init());
    $(Onepage.init());
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiZHJvcGRvd24iLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwidGFicyIsImZpbmQiLCJpcyIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJyZW1vdmVBdHRyIiwicHJvcCIsIiRhY2NvcmRlb24iLCJzbGlkZVVwIiwiZWFjaCIsInNsaWRlRG93biIsIiRwYXJlbnQiLCJjbG9zZXN0IiwiJGl0ZW0iLCJkYXRhIiwibGlzdCIsIndvcmtMaXN0IiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCIkaW5wdXRJY29uIiwiJGJ0blJlc2V0IiwiJGhpbnQiLCJidG4iLCIkYnRuRGF0YSIsIiRpbnB1dFZhbCIsInZhbCIsImF0dHIiLCJzaG93Iiwibm90IiwiaGlkZSIsImZpbHRlciIsImZhZGVPdXQiLCJmYWRlSW4iLCJ0ZXh0IiwidXNlclBob25lIiwicGhvbmUiLCJjaGFuZ2VDaXR5VGl0bGUiLCIkc2xpZGVyIiwiJHNsaWRzIiwiJHNsaWRlIiwiJHByZXZBcnJvdyIsIiRuZXh0QXJyb3ciLCJzbGljayIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJpbmZpbml0ZSIsImFycm93cyIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiJGNhdGFsb2dJdGVtU2xpZGVyIiwiX3RoaXMiLCIkc2xpZGVzIiwiJHNsaWRlckRvdHMiLCJldmVudCIsInByZXBlbmQiLCJhcHBlbmQiLCJzbGlkZUNvdW50IiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwiaSIsImh0bWwiLCJsYXp5TG9hZCIsInN0b3BQcm9wYWdhdGlvbiIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwiJGJ0biIsInJ1biIsImhlbmRsZXIiLCJvZmYiLCJfcmVtb3ZlQW5pbWF0aW9uIiwiZWwiLCJidG5JZCIsInRyaWdnZXIiLCJtZXNzYWdlU3VjY2VzcyIsIm1lc3NhZ2VFcnJvciIsImRlbGF5Iiwic3RhdHVzIiwicHVzaFVwIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImVsZW1lbnRDbGljayIsImRlc3RpbmF0aW9uIiwiJGRyb3Bkb3duIiwicmVuZGVyIiwic2hvd0hpZGUiLCIkYnRuQ2xvc2UiLCIkZHJvcGRvd25PdmVybGF5IiwiJGRyb3Bkb3duTGlzdCIsImFwcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCIkYnRuRmxvYXRpbmciLCJ0YXJnZXQiLCJ0b2dnbGVDbGFzcyIsImlucHV0RXZlbnRzIiwiaW5wdXRNYXNrIiwibW9iaWxlU2VsZWN0IiwiaW5wdXRtYXNrIiwibWFzayIsImdyZWVkeSIsIm9uQmVmb3JlUGFzdGUiLCJwYXN0ZWRWYWx1ZSIsIm9wdHMiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJkZWZpbml0aW9ucyIsInZhbGlkYXRvciIsImNhcmRpbmFsaXR5IiwiY2FzaW5nIiwiaW5wdXQiLCJleGVjQ29tbWFuZCIsIm5leHQiLCJwcmV2IiwiZmllbGRFZGl0IiwiZmllbGRFZGl0SW5wdXQiLCJmaWVsZEVkaXRCdG4iLCJmaWVsZEVkaXRUZXh0IiwiYmx1ciIsInRyaW0iLCJ2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsImtleXByZXNzIiwia2V5Q29kZSIsImVuZCIsIiRzZWxlY3QiLCIkaW5wdXRTZWFyY2giLCIkcmVzdWx0SXRlbSIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0IiwiaWNvblNlbGVjdCIsInNob3dZZWFyIiwiaGlkZVllYXIiLCJhZGRSZXNldEJ0biIsInBob25lQ29kZSIsIiRpY29uU2VsZWN0IiwiaWZvcm1hdCIsImRyb3Bkb3duUGFyZW50IiwiaWNvbiIsIm9yaWdpbmFsT3B0aW9uIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJjb2xvciIsIiRvcmlnaW5hbE9wdGlvbiIsImNvbG9yQmFsbCIsIiR5ZWFyU2VsZWN0IiwiJGRhdGVTZWxlY3QiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiJGlucHV0IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiX3JlbW92ZVN0eWxlIiwiX2FkZFN0eWxlIiwic2VhcmNoQnRuIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2FyZCIsImNhcmRTY3JvbGxzcHkiLCJjYXJkU3RpY2t5IiwiY2FyZFJlcXVlc3RUb2dnbGUiLCJjYXJkTW92ZUl0ZW1zIiwiJGNhcmRTbGlkZXIiLCJjYXJkSW5mb1JlcXVlc3QiLCJpbnNlcnRCZWZvcmUiLCJwcmVwZW5kVG8iLCJzY3JvbGxzcHkiLCJmaXhDYXJkVXNlckluZm8iLCJzY3JvbGwiLCJzdGlja3lCbG9ja09mZnNldCIsImZpeGVkQmxvY2siLCJvdXRlckhlaWdodCIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsInBvc2l0aW9uIiwiYm90dG9tIiwiY2FyZE1lbnVGaXhlZCIsImNhcmRNZW51T2Zmc2V0IiwiY2FyZE1lbnVDbG9uZSIsImNhcmRNZW51IiwicmlnaHQiLCJ6SW5kZXgiLCJjYXJkQ29udGVudCIsImhlaWdodCIsIk9uZXBhZ2UiLCJoZXJvQW5pbWF0ZSIsIm1vYmlsZVNsaWRlciIsImNvdW50ZXJTcGluIiwicHJvbW8iLCJyZWdpc3RyYXRpb24iLCJ0bCIsIlRpbWVsaW5lTWF4IiwiZnJvbVRvIiwieSIsIm9wYWNpdHkiLCJzY3JvbGxlZCIsImNvdW50ZXJDb250YWluZXIiLCJjb3VudGVyQ29udGFpbmVyT2Zmc2V0Iiwic2NyZWVuIiwiJHNwaW4iLCJDb3VudGVyIiwiZHVyYXRpb24iLCJlYXNpbmciLCJzdGVwIiwibm93IiwiTWF0aCIsImNlaWwiLCJhbmltYXRpb24iLCJzbGlkZXJzIiwieCIsImZhZGUiLCJjZW50ZXJNb2RlIiwiY2VudGVyUGFkZGluZyIsIm1vdmVCbG9jayIsIiRhdXRoRm9ybSIsIm1vdmVGb3JtIiwic2xpZGVyT25lU2xpZGUiLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwibWF4IiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssV0FBV0wsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU0sUUFBUU4sRUFBRSxPQUFGLENBQWQ7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUSxRQUFRUixFQUFFLFVBQUYsQ0FBZDtBQUNBLElBQU1TLGFBQWFULEVBQUUsZ0JBQUYsQ0FBbkI7QUFDQSxJQUFNVSxhQUFhVixFQUFFLGtCQUFGLENBQW5COztBQUVBOzs7Ozs7QUFNQSxJQUFNVyxPQUFPO0FBQ1RDLFVBQU0sZ0JBQVc7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LEtBQUt6UyxNQUEzQixFQUFtQ2dGLElBQUlrTyxHQUF2QyxFQUE0Q2xPLEdBQTVDLEVBQWlEO0FBQzdDeU4sYUFBS3pOLENBQUwsRUFBUW9FLEtBQVIsR0FBZ0J6SCxJQUFoQjtBQUNIO0FBQ0o7O0FBRUQ7QUFDQSxTQUFTd1IsbUJBQVQsQ0FBNkJDLEtBQTdCLEVBQW9DQyxFQUFwQyxFQUF3QztBQUNwQ3JXLE1BQUVvVyxRQUFRLFFBQVYsRUFBb0J2VCxFQUFwQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDN0MsVUFBRW9XLEtBQUYsRUFBU3JTLFFBQVQsQ0FBa0JzUyxFQUFsQjtBQUNILEtBRkQ7QUFHQXJXLE1BQUVvVyxRQUFRLFNBQVYsRUFBcUJ2VCxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFXO0FBQ3hDN0MsVUFBRW9XLEtBQUYsRUFBU3pTLFdBQVQsQ0FBcUIwUyxFQUFyQjtBQUNILEtBRkQ7QUFHSDs7QUFFRCxTQUFTak8sY0FBVCxDQUF3QmdPLEtBQXhCLEVBQStCQyxFQUEvQixFQUFtQztBQUMvQnJXLE1BQUVvVyxLQUFGLEVBQVN2VCxFQUFULENBQVksT0FBWixFQUFxQixZQUFXO0FBQzVCN0MsVUFBRSxJQUFGLEVBQVEwSyxXQUFSLENBQW9CMkwsRUFBcEI7QUFDSCxLQUZEOztBQUlBclcsTUFBRUcsUUFBRixFQUFZMEMsRUFBWixDQUFlLDRCQUFmLEVBQTZDLFVBQVNDLENBQVQsRUFBWTtBQUNyRCxZQUFJOUMsRUFBRThDLEVBQUUySCxNQUFKLEVBQVloRyxPQUFaLENBQW9CMlIsS0FBcEIsRUFBMkJwVCxNQUEvQixFQUF1QztBQUN2Q2hELFVBQUVvVyxLQUFGLEVBQVN6UyxXQUFULENBQXFCMFMsRUFBckI7QUFDQXZULFVBQUVxRixlQUFGO0FBQ0gsS0FKRDtBQUtIIiwiZmlsZSI6Im9uZXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcbmNvbnN0ICRtYWluID0gJCgnLm1haW4nKTtcbmNvbnN0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcbmNvbnN0ICRtZW51ID0gJCgnLmpzLW1lbnUnKTtcbmNvbnN0ICRuYXZNb2JpbGUgPSAkKCcuanMtbW9iaWxlLW5hdicpO1xuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcblxuLyoqXHJcbiAqIEJhc2UuanNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcblxyXG5jb25zdCBCYXNlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duLmluaXQoKTtcclxuICAgICAgICB0aGlzLmFjY29yZGVvbigpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tib3goKTtcclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuICAgICAgICAvLyB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMubGlzdFRvZ2dsZSgpO1xyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuICAgICAgICB0aGlzLm93bmVyUGhvbmUoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNpdHkoKTtcclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMuY2F0YWxvZ0l0ZW1TbGlkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3QuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkV4cGFuZGVkKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkhvdmVyQW5pbWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkdvVG9wKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkdvVG8oKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuUHVzaCgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuICAgICAgICB0aGlzLnBvcHVwLndob0lzKCk7XHJcbiAgICAgICAgdGhpcy5wb3B1cC5jaGFuZ2VGb3JtVGl0bGUoKTtcclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS5jbGlja091c2lkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2VhcmNoQnRuT3BlbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcclxuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2Nyb2xsQmFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzU4NWE1OScsXHJcbiAgICAgICAgICAgICAgICAvLyBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzJweCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcbiAgICByZW1vdmVQcmVsb2FkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAkKCdib2R5JykuYWRkQ2xhc3MoJ2xvYWRpbmctYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgIC8vIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8vSW5pdCBiYXNlIHRhYnMgalEgVWkgVGFic1xyXG4gICAgdGFiOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWJiLXRhYicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuICAgIGNoZWNrYm94OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQ3VzdG9tIHJhZGlvQnRuXHJcbiAgICAvLyByYWRpb0J0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgbGV0ICRyYWRpbyA9ICQoJy5qcy1iYi1yYWRpbycpO1xyXG5cclxuICAgIC8vICAgICAvL0JCIHJhZGlvXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItcmFkaW8nLCBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgIC8vICAgICAgICAgaWYgKCRpbnB1dC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgJHJhZGlvLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0sXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuICAgIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRhY2NvcmRlb24gPSAkKCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICBlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcbiAgICAgICAgICAgIGxldCAkaXRlbSA9ICQodGhpcykucGFyZW50KCcuYmItYWNjb3JkZW9uX19pdGVtJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBsaXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWxpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdFRvZ2dsZSgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gJCgnLmpzLWxpc3QnKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya0xpc3QgPSBsaXN0LmZpbmQoJy5qcy1saXN0LXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpc3RUb2dnbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Db3B5IHRleHQgY2xpY2sgbGlua1xyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJveCcpO1xyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgPSAkcGFyZW50LmZpbmQoJy5qcy1pbnB1dC0tY2xlYXInKTtcclxuICAgICAgICAgICAgbGV0ICRoaW50ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9ICRwYXJlbnQuZmluZCgnLmpzLXVzZXItbGluaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuRGF0YSA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0VmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9faWNvbicpXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy11c2VyLXBob25lJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgkKHRoaXMpLmRhdGEoJ3Bob25lLWhpZGVuJykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXVzZXItcGhvbmUtLXNob3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy11c2VyLXBob25lJyk7XHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9DaXR5IHNlbGVjdFxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHkgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuICAgICAgICBsZXQgY2hhbmdlQ2l0eVRpdGxlID0gY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX3RpdGxlIHNwYW4nKTtcclxuXHJcbiAgICAgICAgY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpLnRleHQoKTtcclxuICAgICAgICAgICAgY2hhbmdlQ2l0eVRpdGxlLnRleHQodGV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CYXNlIHNsaWRlclxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1iYi1zbGlkZXInKTtcclxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJG5leHRBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAkcHJldkFycm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICRuZXh0QXJyb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXRhbG9nIEl0ZW0gU2xpZGVyXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2F0YWxvZ0l0ZW1TbGlkZXIgPSAkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidXR0b25zOiB7XHJcbiAgICAgICAgLy9idG4gZXhwYW5kZWRcclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFkZFJlbW92ZUNsYXNzKCcuanMtYnRuLWV4cGFuZGVkJywgJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG4gICAgICAgIGJ0bkhvdmVyQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcmVsWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnV0dG9uLWFuaW1hdGVfX2hvdmVyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWxYXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBzdGF0dXMgYW5pbWF0ZVxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY2xpY2sgPSAwO1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1yZWFkeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vZmxvYXRpbmcgYnRuIGFuaW1hdGluXHJcbiAgICAgICAgYnRuRmxvYXRpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcbiAgICAgICAgICAgIGxldCBydW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpLmNzcygncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL9Ce0LHRgNCw0LHQvtGC0YfQuNC6INC00L7QsdCw0LLQu9GP0LXRgiDQutC70LDRgdGB0Ysg0LfQsNGC0LXQvCDQvtGC0L/QuNGB0YvQstCw0YLQtdGB0Y8g0L7RgiDRgdC+0LHRi9GC0LjRj1xyXG4gICAgICAgICAgICBsZXQgaGVuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlQW5pbWF0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5vbihcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5tZC1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5vdmVybGF5JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0YHRgdGL0LvQutCwINC+0YLQutGA0YvQstCw0LXRgiDQvNC+0LTQsNC70LrRgywg0YLQviDQv9C+INC+0YLQutGA0YvRgtC40Y4g0LzQvtC00LDQu9C60Lgg0YHQutGA0YvQstCw0LXRgiDQutC90L7Qv9C60LhcclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0blB1c2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlU3VjY2VzcyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2Utc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VFcnJvciA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2UtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXM7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtc3RhdHVzJykgfHwgJ3N1Y2Nlc3MnO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIHRvcFxyXG4gICAgICAgIGJ0bkdvVG9wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIGVsZW1lbnRcclxuICAgICAgICBidG5Hb1RvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuICAgICAgICAgICAgJCgnLmpzLWdvdG8nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDYwICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHJvcGRvd246IHtcclxuICAgICAgICAvL0N1c3RvbSBkcm9wZG93blxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdiYi1kcm9wZG93bi0taG92ZXInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93SGlkZSgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmRTY3JvbGwoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93bi5iYi1kcm9wZG93bi0tdHJhbnNmb3JtJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJiLWRyb3Bkb3duX19jbG9zZSBqcy1iYi1kcm9wZG93bi0tY2xvc2VcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25PdmVybGF5ID0gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fb3ZlcmxheVwiPidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5DbG9zZS5hcHBlbmRUbygkZHJvcGRvd25MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25PdmVybGF5Lmluc2VydEFmdGVyKCRkcm9wZG93bkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBkU2Nyb2xsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICR3aW5kb3cuaW5uZXJIZWlnaHQoKSAvIDIpO1xyXG4gICAgICAgIC8vICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG4gICAgICAgIC8vICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYgKCQodGhpcykub2Zmc2V0KCkudG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGxpc3QgPSBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpLm9mZnNldCgpLnRvcCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgX3RoaXNcclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdtb3VzZWVudGVyJyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QuY3NzKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICBzaG93SGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmlzKCcuYmItZHJvcGRvd25fX292ZXJsYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS10cmFuc2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24gLmluZm8tYmxvY2tfX2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCcuaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5wdXRzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dE1hc2soKTtcclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ojk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb2RlLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1lbWFpbC1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazpcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyp7MSwyMH1bLip7MSwyMH1dWy4qezEsMjB9XVsuKnsxLDIwfV1AKnsxLDIwfVsuKnsyLDZ9XVsuKnsxLDJ9XScsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXN0ZWRWYWx1ZSA9IHBhc3RlZFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXN0ZWRWYWx1ZS5yZXBsYWNlKCdtYWlsdG86JywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEteiEjJCUmJyorLz0/Xl9ge3x9fi1dXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogJ2xvd2VyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGlucHV0IHNlbGVjdCB2YWx1ZVxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0VkaXQgVGV4dCBGaWVsZFxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWZpZWxkLWVkaXQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXQgPSAkKCcuanMtZmllbGQtZWRpdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdEJ0biA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9fYnRuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0SW5wdXQuc2hvdygpLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAuYmx1cihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5rZXlwcmVzcyhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09ICcxMycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItaW5wdXQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vYmlsZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcubW9iaWxlLXNlbGVjdF9fcmVzdWx0JyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdDoge1xyXG4gICAgICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tbXVsdGlwbGUnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tc2VydmljZXMnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiB0aW1lQW5kUHJpY2UsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogdGltZUFuZFByaWNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtYm9ybicpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW1hZ2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdpbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vU2VsZWN0IEFkZCBQcmljZSBUaW1lICYgUHJpY2VcclxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZUFuZFByaWNlKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsVGltZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3RpbWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFByaWNlID0gJChvcHQuZWxlbWVudCkuZGF0YSgncHJpY2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdC50ZXh0ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRpbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2UgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuICAgICAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gJCh0aGlzKS5maW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb246Zmlyc3QtY2hpbGQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24udGV4dCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmljb25TZWxlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93WWVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVZZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVzZXRCdG4oKTtcclxuICAgICAgICAgICAgdGhpcy5waG9uZUNvZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGljb25TZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGljb25TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0taWNvbicpO1xyXG5cclxuICAgICAgICAgICAgJGljb25TZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0ljb24gZm9udGF3ZXNvbWUgaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpZm9ybWF0KGljb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbE9wdGlvbiA9IGljb24uZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c3Bhbj48aSBjbGFzcz1cInNlbGVjdDJfX2ljb24nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvcmlnaW5hbE9wdGlvbikuZGF0YSgnaWNvbicpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjwvaT4gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24udGV4dCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sb3JTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAkY29sb3JTZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NlYXJjaC1lbmFibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2xvciBiYWxsIGluc2lkZSBzZWxlY3RcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlCYWxsKGNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRvcmlnaW5hbE9wdGlvbiA9IGNvbG9yLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yQmFsbCA9ICQoJG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdjb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IudGV4dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2xpbmVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfVwiPjwvc3Bhbj48cD4gJHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvci50ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDwvcD48L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2JhbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfSBcIj4gPC9zcGFuPiA8L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dZZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtc2V0LXllYXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVZZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICR5ZWFyU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC1ib3JuLS1jbGVhcicpO1xyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vZmYoJ3NlbGVjdDI6b3BlbmluZycpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoKSA9PSAnJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1ib3JuJykgPT09ICd5ZWFyJ1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRSZXNldEJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkZGF0ZVNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcbiAgICAgICAgICAgICRkYXRlU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT4nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaG9uZUNvZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVNlbGVjdGlvbihvcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICsgb3B0VmFsICsgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVSZXN1bHQob3B0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRyeSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2NvdW50cnknKSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdFZhbCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBob25lQ29kZUJveCA9ICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQtcGhvbmUtY29kZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkcGhvbmVDb2RlQm94LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICQodGhpcykuZmluZCgnLmJiLWlucHV0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHNlbGVjdENvZGVSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHNlbGVjdENvZGVTZWxlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWlucHV0LS1zZWxlY3QtdmFsdWVcIj48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvblNlbGVjdCA9ICRwYXJlbnQuZmluZCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RWYWx1ZSA9ICRwYXJlbnQuZmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3QuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcShjb3VudGVyKS52YWwoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6b3BlbicsIGFkZEZvY3VzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZEZvY3VzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRm9jdXMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW92ZS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19yZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb3ZlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICAnLm1vdmUtc2VsZWN0X19yZXN1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWVudToge1xyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgICAgIGhhbWJ1cmdlckJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fYWRkU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9XaGVuIENsaWNrIE91dHNpZGUgQ2xvc2UgTWVudVxyXG4gICAgICAgIGNsaWNrT3VzaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuanMtbW9iaWxlLW5hdiwgLmpzLWRhdGUsIC5kYXRlcGlja2VyLCAuY2FyZC1pbmZvX19yZXF1ZXN0LCAuY2F0YWxvZy1maWx0ZXIsIC5qcy1tb2JpbGUtZmlsdGVyLS1vcGVuLCAuanMtYmItYWNjb3JkZW9uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheScsXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCBCdG4gb3Blbi9jbG9zZVxyXG4gICAgICAgIHNlYXJjaEJ0bk9wZW5DbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hCdG4gPSAkKCcuanMtbW9iaWxlLXNlYXJjaC1idG4nKTtcclxuICAgICAgICAgICAgc2VhcmNoQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9hZGRTdHlsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcbiAgICAgICAgICAgICRvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3JlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwb3B1cDoge1xyXG4gICAgICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94XScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnZmFuY3lib3gtY29udGFpbmVyLS1pbWFnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tDb250ZW50OiAnY2xvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja1NsaWRlOiAnY2xvc2UnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc21hbGxCdG46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuICAgICAgICB3aG9JczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSAkKCcjYXV0aC1mb3JtJykuZmluZCgnLmZvcm0nKTtcclxuICAgICAgICAgICAgICAgIGlmICh3aG9pcyA9PT0gJ21hc3RlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2hvaXMgPT09ICdzdHVkaW8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtc3R1ZGlvJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLWNsaWVudCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vRHVuYW1pY2x5IGNoYW5nZSBmb3JtIHRpdGxlXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG4vKipcclxuICogQ2FyZFxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3QgY2FyZCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhcmQuc2xpZGVyKCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU2Nyb2xsc3B5KCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU3RpY2t5KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgY2FyZC5jYXJkUmVxdWVzdFRvZ2dsZSgpO1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRNb3ZlSXRlbXMoKTtcclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGNhcmQuY2FyZE1vdmVJdGVtcygpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNsaWRlclxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2FyZFNsaWRlciA9ICQoJy5qcy1jYXJkLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhcmRTbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9IF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCByZXF1ZXN0IHNob3cgLyBoaWRlXHJcbiAgICBjYXJkUmVxdWVzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNhcmRJbmZvUmVxdWVzdCA9ICQoJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL01vdmUgYmxvY2tzIHdoZW4gd2luZG93IHdpZHRoIDwgNzY4XHJcbiAgICBjYXJkTW92ZUl0ZW1zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2FyZC10aXRsZScpLmluc2VydEFmdGVyKCcuY2FyZC1nYWxsYXJ5X193cmFwJyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtYWJvdXQnKS5pbnNlcnRCZWZvcmUoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWluZm8tY2F0ZWdvcnknKS5hcHBlbmRUbygnLmNhcmQtaW5mb19fcmVxdWVzdCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5wcmVwZW5kVG8oJy5jYXJkLWluZm9fX3RvcCcpO1xyXG4gICAgICAgICQoJy5jYXJkLWluZm9fX2lubmVyJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5qcy1tb3ZlLWNhcmQtcG9saWN5JykuYXBwZW5kVG8oJy5jYXJkLXJlcXVlc3QtZm9ybScpO1xyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTY3JvbGxzcHlcclxuICAgIGNhcmRTY3JvbGxzcHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtc2Nyb2xsc3B5JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTEwMCB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTYwIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FyZFN0aWNreTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXN0aWNreScpLmxlbmd0aCAmJiAkKCcuanMtY2FyZC1maXhlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2sgPSAkKCcuanMtY2FyZC1zdGlja3knKTtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrT2Zmc2V0ID0gc3RpY2t5QmxvY2sub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9jayA9ICQoJy5qcy1jYXJkLWZpeGVkJyk7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrT2Zmc2V0ID0gZml4ZWRCbG9jay5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZENvbnRlbnQgPSAkKCcuanMtY2FyZC1jb250ZW50LWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnUgPSAkKCcuanMtY2FyZC1tZW51Jyk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudUNsb25lID0gJCgnPGRpdiBjbGFzcz1cImNhcmQtbWVudV9fY2xvbmVcIj4nKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJCgnLmpzLWNhcmQtbWVudScpLm91dGVySGVpZ2h0KHRydWUpKVxyXG4gICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKGNhcmRNZW51KVxyXG4gICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51T2Zmc2V0ID0gY2FyZE1lbnUub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5oZWlnaHQoKSA8IGNhcmRDb250ZW50LmhlaWdodCgpICYmXHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykud2lkdGgoKSA+IDc2OFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGZpeENhcmRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBmaXhDYXJkVXNlckluZm8oKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IC0xICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYXJkTWVudS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRNZW51Rml4ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2FyZE1lbnVGaXhlZCgpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gY2FyZE1lbnVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDk5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnUucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG4vKipcbiAqIE9uZXBhZ2VcbiAqXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxuICovXG5jb25zdCBPbmVwYWdlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBCYXNlLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XG4gICAgICAgIEJhc2UubWVudS5jbGlja091c2lkZSgpO1xuXG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1vbmVwYWdlLS1ob21lJykpIHtcbiAgICAgICAgICAgIE9uZXBhZ2UuaGVyb0FuaW1hdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XG4gICAgICAgIHRoaXMubW9iaWxlU2xpZGVyKCk7XG4gICAgICAgIHRoaXMuY291bnRlclNwaW4oKTtcblxuICAgICAgICB0aGlzLnByb21vLmluaXQoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24uaW5pdCgpO1xuICAgICAgICB0aGlzLmljb24uaW5pdCgpO1xuICAgIH0sXG4gICAgaGVyb0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICB0bC5mcm9tVG8oJy5oZXJvJywgMSwgeyB5OiAtMzAwLCBvcGFjaXR5OiAwIH0sIHsgeTogMCwgb3BhY2l0eTogMSB9KVxuICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3RpdGxlJyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgJy09LjMnXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICcuaGVyb19fc3VidGl0bGUnLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAnLT0uNydcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5oZXJvX193aWRnZXQnLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgeyB5OiA3MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPS41J1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAnLnNvY2lhbCcsXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICB7IHk6IDUwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgJy09MC42J1xuICAgICAgICAgICAgKTtcbiAgICB9LFxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyJyk7XG5cbiAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDgxNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbW9iaWxlU2xpZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQoZG9jdW1lbnQpLndpZHRoKCkgPCA4MTUpIHtcbiAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyLS1tb2JpbGUnKTtcblxuICAgICAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb3VudGVyU3BpbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBzY3JvbGxlZCA9IGZhbHNlO1xuXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXNjcm9sbGVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ZXJDb250YWluZXIgPSAkKCcuanMtY291bnRlci0td3JhcHBlcicpO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudGVyQ29udGFpbmVyT2Zmc2V0ID0gY291bnRlckNvbnRhaW5lci5kYXRhKCdvZmZzZXQnKTtcbiAgICAgICAgICAgICAgICBsZXQgc2NyZWVuID0gY291bnRlckNvbnRhaW5lci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2NyZWVuIC0gY291bnRlckNvbnRhaW5lck9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNwaW4gPSAkKCcuanMtY291bnRlcicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAkc3Bpbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hbmltYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ291bnRlcjogJCh0aGlzKS50ZXh0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZzogJ3N3aW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24obm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRleHQoTWF0aC5jZWlsKG5vdykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHByb21vOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVycygpO1xuICAgICAgICB9LFxuICAgICAgICBhbmltYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQoJy5oZXJvLS1pY29uJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgICB0bC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICcubG9nbycsXG4gICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX19pbWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogNTAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC41J1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm8taW5jb19fdGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAtNTAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC41J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2UtcHJvbW8nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgICAgdGwuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAnLmxvZ28nLFxuICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICB7IHg6IC0xMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm9fX3RpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyb19fc3VidGl0bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPS42J1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLnNsaWNrLW5leHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5zbGljay1wcmV2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IC0xMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5hZHYtaW1hZ2VfX2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAzMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC43J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzbGlkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItYWR2Jykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdi1pbWFnZScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItYWR2LWltYWdlJykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLXVzZXJzJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci11c2VycycpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci1pY29ucycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMjBweCcsXG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVnaXN0cmF0aW9uOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlQmxvY2soKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtb3ZlQmxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0ICRhdXRoRm9ybSA9ICQoJy5qcy1wcm9tby1mb3JtJyk7XG5cbiAgICAgICAgICAgIGlmICgkZG9jdW1lbnQud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICAgICAgICAgIG1vdmVGb3JtKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICgkZG9jdW1lbnQud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICAgICAgICAgICAgICBtb3ZlRm9ybSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zY3JlZW4tLXJlZycpLmFwcGVuZCgkYXV0aEZvcm0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3ZlRm9ybSgpIHtcbiAgICAgICAgICAgICAgICAkYXV0aEZvcm0uaW5zZXJ0QWZ0ZXIoJy5maXJzdHNjcmVlbl9fd3JhcHBlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBpY29uOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJPbmVTbGlkZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNsaWRlck9uZVNsaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLXNsaWRlcicpO1xuXG4gICAgICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4kKGZ1bmN0aW9uKCkge1xuICAgICQoQmFzZS5pbml0KCkpO1xuICAgICQoY2FyZC5pbml0KCkpO1xuICAgICQoT25lcGFnZS5pbml0KCkpO1xufSk7XG5cbi8qXG4gKioqIGZ1bmN0aW9ucy5qc1xuICovXG4vL1B1c2hVcFxyXG5mdW5jdGlvbiBwdXNoVXAob3B0aW9ucykge1xyXG4gICAgdmFyIHRleHQgPSBvcHRpb25zLnRleHQgfHwgJ9CS0LDQvCDQvdC+0LLQsNGPINC30LDRj9Cy0LrQsCc7XHJcbiAgICB2YXIgc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgfHwgJ3N1Y2Nlc3MnO1xyXG5cclxuICAgIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnYmItcHVzaFVwJyk7XHJcbiAgICB2YXIgcHVzaFVwQ2xvc2UgPSAkKCc8aSBjbGFzcz1cImZhbCBmYS10aW1lc1wiPjwvaT4nKS5hZGRDbGFzcyhcclxuICAgICAgICAnYmItcHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xyXG4gICAgKTtcclxuXHJcbiAgICBwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcbiAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XHJcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtZXJyb3InKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtc3VjY2VzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc2hQb3MoKTtcclxuXHJcbiAgICByYWYoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDQ1MDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLXB1c2hVcCcpO1xyXG4gICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBwb3NoUG9zKCkge1xyXG4gICAgICAgICQoJy5iYi1wdXNoVXAnKS5lYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGhlaWdodCA9ICQoJy5iYi1wdXNoVXAnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIGhlaWdodCAqIGUgKyAxMCArIGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxyXG5mdW5jdGlvbiByYWYoZm4pIHtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vL1NldCBJbnB1dCBEYXRlIFZhbHVlXHJcbmZ1bmN0aW9uIHNldElucHV0RGF0ZShzZWxlY3Rvcikge1xyXG4gICAgbGV0IF9kYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIGxldCBob3kgPSBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIGQgPSBob3kuZ2V0RGF0ZSgpLFxyXG4gICAgICAgIG0gPSBob3kuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgICAgeSA9IGhveS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgIGRhdGE7XHJcblxyXG4gICAgaWYgKGQgPCAxMCkge1xyXG4gICAgICAgIGQgPSAnMCcgKyBkO1xyXG4gICAgfVxyXG4gICAgaWYgKG0gPCAxMCkge1xyXG4gICAgICAgIG0gPSAnMCcgKyBtO1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB5ICsgJy0nICsgbSArICctJyArIGQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IF9kYXQubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICBfZGF0W2ldLnZhbHVlID0gZGF0YTtcclxuICAgIH1cclxufVxyXG5cclxuLy9GdW5jdGlvbiBBZGQgUmVtb3ZlIENsYXNzIGZyb20gQmxvY2tcclxuZnVuY3Rpb24gYWRkUmVtb3ZlQ2xhc3NCbG9jayhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2sgKyAnLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykuYWRkQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbiAgICAkKGJsb2NrICsgJy0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUmVtb3ZlQ2xhc3MoYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdChibG9jaykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxufVxyXG5cbiJdfQ==
