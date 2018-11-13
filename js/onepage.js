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
        this.setFirstscreen();

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
    setFirstscreen: function setFirstscreen() {
        setHeight();

        $window.resize(function () {
            setHeight();
        });

        function setHeight() {
            var $height = $window.height();
            var $firstscreen = $('.firstscreen');

            $firstscreen.css('height', $height + 'px');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiZHJvcGRvd24iLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwidGFicyIsImZpbmQiLCJpcyIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJyZW1vdmVBdHRyIiwicHJvcCIsIiRhY2NvcmRlb24iLCJzbGlkZVVwIiwiZWFjaCIsInNsaWRlRG93biIsIiRwYXJlbnQiLCJjbG9zZXN0IiwiJGl0ZW0iLCJkYXRhIiwibGlzdCIsIndvcmtMaXN0IiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCIkaW5wdXRJY29uIiwiJGJ0blJlc2V0IiwiJGhpbnQiLCJidG4iLCIkYnRuRGF0YSIsIiRpbnB1dFZhbCIsInZhbCIsImF0dHIiLCJzaG93Iiwibm90IiwiaGlkZSIsImZpbHRlciIsImZhZGVPdXQiLCJmYWRlSW4iLCJ0ZXh0IiwidXNlclBob25lIiwicGhvbmUiLCJjaGFuZ2VDaXR5VGl0bGUiLCIkc2xpZGVyIiwiJHNsaWRzIiwiJHNsaWRlIiwiJHByZXZBcnJvdyIsIiRuZXh0QXJyb3ciLCJzbGljayIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJpbmZpbml0ZSIsImFycm93cyIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiJGNhdGFsb2dJdGVtU2xpZGVyIiwiX3RoaXMiLCIkc2xpZGVzIiwiJHNsaWRlckRvdHMiLCJldmVudCIsInByZXBlbmQiLCJhcHBlbmQiLCJzbGlkZUNvdW50IiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwiaSIsImh0bWwiLCJsYXp5TG9hZCIsInN0b3BQcm9wYWdhdGlvbiIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwiJGJ0biIsInJ1biIsImhlbmRsZXIiLCJvZmYiLCJfcmVtb3ZlQW5pbWF0aW9uIiwiZWwiLCJidG5JZCIsInRyaWdnZXIiLCJtZXNzYWdlU3VjY2VzcyIsIm1lc3NhZ2VFcnJvciIsImRlbGF5Iiwic3RhdHVzIiwicHVzaFVwIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImVsZW1lbnRDbGljayIsImRlc3RpbmF0aW9uIiwiJGRyb3Bkb3duIiwicmVuZGVyIiwic2hvd0hpZGUiLCIkYnRuQ2xvc2UiLCIkZHJvcGRvd25PdmVybGF5IiwiJGRyb3Bkb3duTGlzdCIsImFwcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCIkYnRuRmxvYXRpbmciLCJ0YXJnZXQiLCJ0b2dnbGVDbGFzcyIsImlucHV0RXZlbnRzIiwiaW5wdXRNYXNrIiwibW9iaWxlU2VsZWN0IiwiaW5wdXRtYXNrIiwibWFzayIsImdyZWVkeSIsIm9uQmVmb3JlUGFzdGUiLCJwYXN0ZWRWYWx1ZSIsIm9wdHMiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJkZWZpbml0aW9ucyIsInZhbGlkYXRvciIsImNhcmRpbmFsaXR5IiwiY2FzaW5nIiwiaW5wdXQiLCJleGVjQ29tbWFuZCIsIm5leHQiLCJwcmV2IiwiZmllbGRFZGl0IiwiZmllbGRFZGl0SW5wdXQiLCJmaWVsZEVkaXRCdG4iLCJmaWVsZEVkaXRUZXh0IiwiYmx1ciIsInRyaW0iLCJ2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsImtleXByZXNzIiwia2V5Q29kZSIsImVuZCIsIiRzZWxlY3QiLCIkaW5wdXRTZWFyY2giLCIkcmVzdWx0SXRlbSIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0IiwiaWNvblNlbGVjdCIsInNob3dZZWFyIiwiaGlkZVllYXIiLCJhZGRSZXNldEJ0biIsInBob25lQ29kZSIsIiRpY29uU2VsZWN0IiwiaWZvcm1hdCIsImRyb3Bkb3duUGFyZW50IiwiaWNvbiIsIm9yaWdpbmFsT3B0aW9uIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJjb2xvciIsIiRvcmlnaW5hbE9wdGlvbiIsImNvbG9yQmFsbCIsIiR5ZWFyU2VsZWN0IiwiJGRhdGVTZWxlY3QiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiJGlucHV0IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiX3JlbW92ZVN0eWxlIiwiX2FkZFN0eWxlIiwic2VhcmNoQnRuIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2FyZCIsImNhcmRTY3JvbGxzcHkiLCJjYXJkU3RpY2t5IiwiY2FyZFJlcXVlc3RUb2dnbGUiLCJjYXJkTW92ZUl0ZW1zIiwiJGNhcmRTbGlkZXIiLCJjYXJkSW5mb1JlcXVlc3QiLCJpbnNlcnRCZWZvcmUiLCJwcmVwZW5kVG8iLCJzY3JvbGxzcHkiLCJmaXhDYXJkVXNlckluZm8iLCJzY3JvbGwiLCJzdGlja3lCbG9ja09mZnNldCIsImZpeGVkQmxvY2siLCJvdXRlckhlaWdodCIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsInBvc2l0aW9uIiwiYm90dG9tIiwiY2FyZE1lbnVGaXhlZCIsImNhcmRNZW51T2Zmc2V0IiwiY2FyZE1lbnVDbG9uZSIsImNhcmRNZW51IiwicmlnaHQiLCJ6SW5kZXgiLCJjYXJkQ29udGVudCIsImhlaWdodCIsIk9uZXBhZ2UiLCJoZXJvQW5pbWF0ZSIsIm1vYmlsZVNsaWRlciIsImNvdW50ZXJTcGluIiwic2V0Rmlyc3RzY3JlZW4iLCJwcm9tbyIsInJlZ2lzdHJhdGlvbiIsInRsIiwiVGltZWxpbmVNYXgiLCJmcm9tVG8iLCJ5Iiwib3BhY2l0eSIsInNjcm9sbGVkIiwiY291bnRlckNvbnRhaW5lciIsImNvdW50ZXJDb250YWluZXJPZmZzZXQiLCJzY3JlZW4iLCIkc3BpbiIsIkNvdW50ZXIiLCJkdXJhdGlvbiIsImVhc2luZyIsInN0ZXAiLCJub3ciLCJNYXRoIiwiY2VpbCIsInNldEhlaWdodCIsIiRoZWlnaHQiLCIkZmlyc3RzY3JlZW4iLCJhbmltYXRpb24iLCJzbGlkZXJzIiwieCIsImZhZGUiLCJjZW50ZXJNb2RlIiwiY2VudGVyUGFkZGluZyIsIm1vdmVCbG9jayIsIiRhdXRoRm9ybSIsIm1vdmVGb3JtIiwib3B0aW9ucyIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsInBvc2hQb3MiLCJyYWYiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldElucHV0RGF0ZSIsInNlbGVjdG9yIiwiX2RhdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3kiLCJEYXRlIiwiZCIsImdldERhdGUiLCJtIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsIm1heCIsImFkZFJlbW92ZUNsYXNzQmxvY2siLCJibG9jayIsImNsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFdBQVdMLEVBQUUsVUFBRixDQUFqQjtBQUNBLElBQU1NLFFBQVFOLEVBQUUsT0FBRixDQUFkO0FBQ0EsSUFBTU8sV0FBV1AsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTVEsUUFBUVIsRUFBRSxVQUFGLENBQWQ7QUFDQSxJQUFNUyxhQUFhVCxFQUFFLGdCQUFGLENBQW5CO0FBQ0EsSUFBTVUsYUFBYVYsRUFBRSxrQkFBRixDQUFuQjs7QUFFQTs7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MEMsRUFBWixDQUFlLDRCQUFmLEVBQTZDLFVBQVNDLENBQVQsRUFBWTtBQUNyRCxZQUFJOUMsRUFBRThDLEVBQUUySCxNQUFKLEVBQVloRyxPQUFaLENBQW9COFIsS0FBcEIsRUFBMkJ2VCxNQUEvQixFQUF1QztBQUN2Q2hELFVBQUV1VyxLQUFGLEVBQVM1UyxXQUFULENBQXFCNlMsRUFBckI7QUFDQTFULFVBQUVxRixlQUFGO0FBQ0gsS0FKRDtBQUtIIiwiZmlsZSI6Im9uZXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcbmNvbnN0ICRtYWluID0gJCgnLm1haW4nKTtcbmNvbnN0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcbmNvbnN0ICRtZW51ID0gJCgnLmpzLW1lbnUnKTtcbmNvbnN0ICRuYXZNb2JpbGUgPSAkKCcuanMtbW9iaWxlLW5hdicpO1xuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcblxuLyoqXHJcbiAqIEJhc2UuanNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcblxyXG5jb25zdCBCYXNlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuICAgICAgICB0aGlzLmRyb3Bkb3duLmluaXQoKTtcclxuICAgICAgICB0aGlzLmFjY29yZGVvbigpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tib3goKTtcclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuICAgICAgICAvLyB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMubGlzdFRvZ2dsZSgpO1xyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuICAgICAgICB0aGlzLm93bmVyUGhvbmUoKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNpdHkoKTtcclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMuY2F0YWxvZ0l0ZW1TbGlkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3QuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5wdXRzLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkV4cGFuZGVkKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkhvdmVyQW5pbWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkdvVG9wKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkdvVG8oKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuUHVzaCgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuICAgICAgICB0aGlzLnBvcHVwLndob0lzKCk7XHJcbiAgICAgICAgdGhpcy5wb3B1cC5jaGFuZ2VGb3JtVGl0bGUoKTtcclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS5jbGlja091c2lkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2VhcmNoQnRuT3BlbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcclxuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2Nyb2xsQmFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzU4NWE1OScsXHJcbiAgICAgICAgICAgICAgICAvLyBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzJweCcsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcbiAgICByZW1vdmVQcmVsb2FkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAkKCdib2R5JykuYWRkQ2xhc3MoJ2xvYWRpbmctYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgIC8vIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8vSW5pdCBiYXNlIHRhYnMgalEgVWkgVGFic1xyXG4gICAgdGFiOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWJiLXRhYicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuICAgIGNoZWNrYm94OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQ3VzdG9tIHJhZGlvQnRuXHJcbiAgICAvLyByYWRpb0J0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgbGV0ICRyYWRpbyA9ICQoJy5qcy1iYi1yYWRpbycpO1xyXG5cclxuICAgIC8vICAgICAvL0JCIHJhZGlvXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItcmFkaW8nLCBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgIC8vICAgICAgICAgaWYgKCRpbnB1dC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgJHJhZGlvLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0sXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuICAgIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRhY2NvcmRlb24gPSAkKCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkYWNjb3JkZW9uLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICBlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcbiAgICAgICAgICAgIGxldCAkaXRlbSA9ICQodGhpcykucGFyZW50KCcuYmItYWNjb3JkZW9uX19pdGVtJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBsaXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWxpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdFRvZ2dsZSgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gJCgnLmpzLWxpc3QnKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya0xpc3QgPSBsaXN0LmZpbmQoJy5qcy1saXN0LXRvZ2dsZScpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpc3RUb2dnbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Db3B5IHRleHQgY2xpY2sgbGlua1xyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJveCcpO1xyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgPSAkcGFyZW50LmZpbmQoJy5qcy1pbnB1dC0tY2xlYXInKTtcclxuICAgICAgICAgICAgbGV0ICRoaW50ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9ICRwYXJlbnQuZmluZCgnLmpzLXVzZXItbGluaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuRGF0YSA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0VmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9faWNvbicpXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy11c2VyLXBob25lJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcbiAgICAgICAgICAgICAgICAudGV4dCgkKHRoaXMpLmRhdGEoJ3Bob25lLWhpZGVuJykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXVzZXItcGhvbmUtLXNob3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy11c2VyLXBob25lJyk7XHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9DaXR5IHNlbGVjdFxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHkgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuICAgICAgICBsZXQgY2hhbmdlQ2l0eVRpdGxlID0gY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX3RpdGxlIHNwYW4nKTtcclxuXHJcbiAgICAgICAgY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpLnRleHQoKTtcclxuICAgICAgICAgICAgY2hhbmdlQ2l0eVRpdGxlLnRleHQodGV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CYXNlIHNsaWRlclxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1iYi1zbGlkZXInKTtcclxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJG5leHRBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAkcHJldkFycm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICRuZXh0QXJyb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXRhbG9nIEl0ZW0gU2xpZGVyXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2F0YWxvZ0l0ZW1TbGlkZXIgPSAkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidXR0b25zOiB7XHJcbiAgICAgICAgLy9idG4gZXhwYW5kZWRcclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFkZFJlbW92ZUNsYXNzKCcuanMtYnRuLWV4cGFuZGVkJywgJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG4gICAgICAgIGJ0bkhvdmVyQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcmVsWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnV0dG9uLWFuaW1hdGVfX2hvdmVyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWxYXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBzdGF0dXMgYW5pbWF0ZVxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY2xpY2sgPSAwO1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1yZWFkeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vZmxvYXRpbmcgYnRuIGFuaW1hdGluXHJcbiAgICAgICAgYnRuRmxvYXRpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcbiAgICAgICAgICAgIGxldCBydW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpLmNzcygncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL9Ce0LHRgNCw0LHQvtGC0YfQuNC6INC00L7QsdCw0LLQu9GP0LXRgiDQutC70LDRgdGB0Ysg0LfQsNGC0LXQvCDQvtGC0L/QuNGB0YvQstCw0YLQtdGB0Y8g0L7RgiDRgdC+0LHRi9GC0LjRj1xyXG4gICAgICAgICAgICBsZXQgaGVuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlQW5pbWF0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5vbihcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5tZC1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5vdmVybGF5JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0YHRgdGL0LvQutCwINC+0YLQutGA0YvQstCw0LXRgiDQvNC+0LTQsNC70LrRgywg0YLQviDQv9C+INC+0YLQutGA0YvRgtC40Y4g0LzQvtC00LDQu9C60Lgg0YHQutGA0YvQstCw0LXRgiDQutC90L7Qv9C60LhcclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0blB1c2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlU3VjY2VzcyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2Utc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VFcnJvciA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2UtZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXM7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtc3RhdHVzJykgfHwgJ3N1Y2Nlc3MnO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIHRvcFxyXG4gICAgICAgIGJ0bkdvVG9wOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIGVsZW1lbnRcclxuICAgICAgICBidG5Hb1RvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuICAgICAgICAgICAgJCgnLmpzLWdvdG8nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDYwICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHJvcGRvd246IHtcclxuICAgICAgICAvL0N1c3RvbSBkcm9wZG93blxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdiYi1kcm9wZG93bi0taG92ZXInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93SGlkZSgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmRTY3JvbGwoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93bi5iYi1kcm9wZG93bi0tdHJhbnNmb3JtJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJiLWRyb3Bkb3duX19jbG9zZSBqcy1iYi1kcm9wZG93bi0tY2xvc2VcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25PdmVybGF5ID0gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fb3ZlcmxheVwiPidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5DbG9zZS5hcHBlbmRUbygkZHJvcGRvd25MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25PdmVybGF5Lmluc2VydEFmdGVyKCRkcm9wZG93bkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBkU2Nyb2xsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICR3aW5kb3cuaW5uZXJIZWlnaHQoKSAvIDIpO1xyXG4gICAgICAgIC8vICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG4gICAgICAgIC8vICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYgKCQodGhpcykub2Zmc2V0KCkudG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGxpc3QgPSBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpLm9mZnNldCgpLnRvcCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgX3RoaXNcclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdtb3VzZWVudGVyJyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QuY3NzKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICBzaG93SGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmlzKCcuYmItZHJvcGRvd25fX292ZXJsYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS10cmFuc2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24gLmluZm8tYmxvY2tfX2xpbmsnLFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCcuaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5wdXRzOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dE1hc2soKTtcclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ojk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb2RlLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTk5J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1lbWFpbC1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazpcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyp7MSwyMH1bLip7MSwyMH1dWy4qezEsMjB9XVsuKnsxLDIwfV1AKnsxLDIwfVsuKnsyLDZ9XVsuKnsxLDJ9XScsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXN0ZWRWYWx1ZSA9IHBhc3RlZFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXN0ZWRWYWx1ZS5yZXBsYWNlKCdtYWlsdG86JywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEteiEjJCUmJyorLz0/Xl9ge3x9fi1dXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogJ2xvd2VyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGlucHV0IHNlbGVjdCB2YWx1ZVxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0VkaXQgVGV4dCBGaWVsZFxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWZpZWxkLWVkaXQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXQgPSAkKCcuanMtZmllbGQtZWRpdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdEJ0biA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9fYnRuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0SW5wdXQuc2hvdygpLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAuYmx1cihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5rZXlwcmVzcyhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09ICcxMycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItaW5wdXQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vYmlsZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcubW9iaWxlLXNlbGVjdF9fcmVzdWx0JyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdDoge1xyXG4gICAgICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tbXVsdGlwbGUnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tc2VydmljZXMnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiB0aW1lQW5kUHJpY2UsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogdGltZUFuZFByaWNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtYm9ybicpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW1hZ2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdpbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vU2VsZWN0IEFkZCBQcmljZSBUaW1lICYgUHJpY2VcclxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZUFuZFByaWNlKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsVGltZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3RpbWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFByaWNlID0gJChvcHQuZWxlbWVudCkuZGF0YSgncHJpY2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdC50ZXh0ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRpbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2UgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuICAgICAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gJCh0aGlzKS5maW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb246Zmlyc3QtY2hpbGQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24udGV4dCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmljb25TZWxlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93WWVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVZZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVzZXRCdG4oKTtcclxuICAgICAgICAgICAgdGhpcy5waG9uZUNvZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGljb25TZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGljb25TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0taWNvbicpO1xyXG5cclxuICAgICAgICAgICAgJGljb25TZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL0ljb24gZm9udGF3ZXNvbWUgaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpZm9ybWF0KGljb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbE9wdGlvbiA9IGljb24uZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c3Bhbj48aSBjbGFzcz1cInNlbGVjdDJfX2ljb24nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvcmlnaW5hbE9wdGlvbikuZGF0YSgnaWNvbicpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjwvaT4gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24udGV4dCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sb3JTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAkY29sb3JTZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NlYXJjaC1lbmFibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2xvciBiYWxsIGluc2lkZSBzZWxlY3RcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlCYWxsKGNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRvcmlnaW5hbE9wdGlvbiA9IGNvbG9yLmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yQmFsbCA9ICQoJG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdjb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IudGV4dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2xpbmVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfVwiPjwvc3Bhbj48cD4gJHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvci50ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDwvcD48L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2JhbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfSBcIj4gPC9zcGFuPiA8L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dZZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtc2V0LXllYXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVZZWFyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICR5ZWFyU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC1ib3JuLS1jbGVhcicpO1xyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vZmYoJ3NlbGVjdDI6b3BlbmluZycpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoKSA9PSAnJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1ib3JuJykgPT09ICd5ZWFyJ1xyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRSZXNldEJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkZGF0ZVNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcbiAgICAgICAgICAgICRkYXRlU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT4nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaG9uZUNvZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVNlbGVjdGlvbihvcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICsgb3B0VmFsICsgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVSZXN1bHQob3B0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRyeSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2NvdW50cnknKSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdFZhbCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBob25lQ29kZUJveCA9ICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQtcGhvbmUtY29kZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkcGhvbmVDb2RlQm94LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICQodGhpcykuZmluZCgnLmJiLWlucHV0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHNlbGVjdENvZGVSZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHNlbGVjdENvZGVTZWxlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWlucHV0LS1zZWxlY3QtdmFsdWVcIj48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvblNlbGVjdCA9ICRwYXJlbnQuZmluZCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RWYWx1ZSA9ICRwYXJlbnQuZmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3QuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcShjb3VudGVyKS52YWwoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6b3BlbicsIGFkZEZvY3VzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZEZvY3VzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRm9jdXMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW92ZS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19yZXN1bHQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb3ZlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICAnLm1vdmUtc2VsZWN0X19yZXN1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWVudToge1xyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgICAgIGhhbWJ1cmdlckJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fYWRkU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9XaGVuIENsaWNrIE91dHNpZGUgQ2xvc2UgTWVudVxyXG4gICAgICAgIGNsaWNrT3VzaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuanMtbW9iaWxlLW5hdiwgLmpzLWRhdGUsIC5kYXRlcGlja2VyLCAuY2FyZC1pbmZvX19yZXF1ZXN0LCAuY2F0YWxvZy1maWx0ZXIsIC5qcy1tb2JpbGUtZmlsdGVyLS1vcGVuLCAuanMtYmItYWNjb3JkZW9uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheScsXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCBCdG4gb3Blbi9jbG9zZVxyXG4gICAgICAgIHNlYXJjaEJ0bk9wZW5DbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hCdG4gPSAkKCcuanMtbW9iaWxlLXNlYXJjaC1idG4nKTtcclxuICAgICAgICAgICAgc2VhcmNoQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9hZGRTdHlsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcbiAgICAgICAgICAgICRvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3JlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwb3B1cDoge1xyXG4gICAgICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94XScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnZmFuY3lib3gtY29udGFpbmVyLS1pbWFnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tDb250ZW50OiAnY2xvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja1NsaWRlOiAnY2xvc2UnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc21hbGxCdG46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuICAgICAgICB3aG9JczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSAkKCcjYXV0aC1mb3JtJykuZmluZCgnLmZvcm0nKTtcclxuICAgICAgICAgICAgICAgIGlmICh3aG9pcyA9PT0gJ21hc3RlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2hvaXMgPT09ICdzdHVkaW8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtc3R1ZGlvJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLWNsaWVudCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vRHVuYW1pY2x5IGNoYW5nZSBmb3JtIHRpdGxlXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG4vKipcclxuICogQ2FyZFxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3QgY2FyZCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhcmQuc2xpZGVyKCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU2Nyb2xsc3B5KCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU3RpY2t5KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgY2FyZC5jYXJkUmVxdWVzdFRvZ2dsZSgpO1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRNb3ZlSXRlbXMoKTtcclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGNhcmQuY2FyZE1vdmVJdGVtcygpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNsaWRlclxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2FyZFNsaWRlciA9ICQoJy5qcy1jYXJkLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhcmRTbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9IF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCByZXF1ZXN0IHNob3cgLyBoaWRlXHJcbiAgICBjYXJkUmVxdWVzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNhcmRJbmZvUmVxdWVzdCA9ICQoJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL01vdmUgYmxvY2tzIHdoZW4gd2luZG93IHdpZHRoIDwgNzY4XHJcbiAgICBjYXJkTW92ZUl0ZW1zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2FyZC10aXRsZScpLmluc2VydEFmdGVyKCcuY2FyZC1nYWxsYXJ5X193cmFwJyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtYWJvdXQnKS5pbnNlcnRCZWZvcmUoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWluZm8tY2F0ZWdvcnknKS5hcHBlbmRUbygnLmNhcmQtaW5mb19fcmVxdWVzdCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5wcmVwZW5kVG8oJy5jYXJkLWluZm9fX3RvcCcpO1xyXG4gICAgICAgICQoJy5jYXJkLWluZm9fX2lubmVyJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5qcy1tb3ZlLWNhcmQtcG9saWN5JykuYXBwZW5kVG8oJy5jYXJkLXJlcXVlc3QtZm9ybScpO1xyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTY3JvbGxzcHlcclxuICAgIGNhcmRTY3JvbGxzcHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtc2Nyb2xsc3B5JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTEwMCB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTYwIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FyZFN0aWNreTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXN0aWNreScpLmxlbmd0aCAmJiAkKCcuanMtY2FyZC1maXhlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2sgPSAkKCcuanMtY2FyZC1zdGlja3knKTtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrT2Zmc2V0ID0gc3RpY2t5QmxvY2sub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9jayA9ICQoJy5qcy1jYXJkLWZpeGVkJyk7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrT2Zmc2V0ID0gZml4ZWRCbG9jay5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZENvbnRlbnQgPSAkKCcuanMtY2FyZC1jb250ZW50LWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnUgPSAkKCcuanMtY2FyZC1tZW51Jyk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudUNsb25lID0gJCgnPGRpdiBjbGFzcz1cImNhcmQtbWVudV9fY2xvbmVcIj4nKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJCgnLmpzLWNhcmQtbWVudScpLm91dGVySGVpZ2h0KHRydWUpKVxyXG4gICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKGNhcmRNZW51KVxyXG4gICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51T2Zmc2V0ID0gY2FyZE1lbnUub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5oZWlnaHQoKSA8IGNhcmRDb250ZW50LmhlaWdodCgpICYmXHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykud2lkdGgoKSA+IDc2OFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGZpeENhcmRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBmaXhDYXJkVXNlckluZm8oKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IC0xICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYXJkTWVudS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRNZW51Rml4ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2FyZE1lbnVGaXhlZCgpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gY2FyZE1lbnVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDk5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnUucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG4vKipcbiAqIE9uZXBhZ2VcbiAqXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxuICovXG5jb25zdCBPbmVwYWdlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBCYXNlLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XG4gICAgICAgIEJhc2UubWVudS5jbGlja091c2lkZSgpO1xuXG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1vbmVwYWdlLS1ob21lJykpIHtcbiAgICAgICAgICAgIE9uZXBhZ2UuaGVyb0FuaW1hdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XG4gICAgICAgIHRoaXMubW9iaWxlU2xpZGVyKCk7XG4gICAgICAgIHRoaXMuY291bnRlclNwaW4oKTtcbiAgICAgICAgdGhpcy5zZXRGaXJzdHNjcmVlbigpO1xuXG4gICAgICAgIHRoaXMucHJvbW8uaW5pdCgpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5pbml0KCk7XG4gICAgICAgIHRoaXMuaWNvbi5pbml0KCk7XG4gICAgfSxcbiAgICBoZXJvQW5pbWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHRsLmZyb21UbygnLmhlcm8nLCAxLCB7IHk6IC0zMDAsIG9wYWNpdHk6IDAgfSwgeyB5OiAwLCBvcGFjaXR5OiAxIH0pXG4gICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICcuaGVyb19fdGl0bGUnLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAnLT0uMydcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5oZXJvX19zdWJ0aXRsZScsXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPS43J1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3dpZGdldCcsXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICB7IHk6IDcwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgJy09LjUnXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICcuc29jaWFsJyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogNTAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAnLT0wLjYnXG4gICAgICAgICAgICApO1xuICAgIH0sXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtb25lcGFnZS1zbGlkZXInKTtcblxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogODE1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDI2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtb2JpbGVTbGlkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJChkb2N1bWVudCkud2lkdGgoKSA8IDgxNSkge1xuICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtb25lcGFnZS1zbGlkZXItLW1vYmlsZScpO1xuXG4gICAgICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvdW50ZXJTcGluOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHNjcm9sbGVkID0gZmFsc2U7XG5cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc2Nyb2xsZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lciA9ICQoJy5qcy1jb3VudGVyLS13cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ZXJDb250YWluZXJPZmZzZXQgPSBjb3VudGVyQ29udGFpbmVyLmRhdGEoJ29mZnNldCcpO1xuICAgICAgICAgICAgICAgIGxldCBzY3JlZW4gPSBjb3VudGVyQ29udGFpbmVyLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JlZW4gLSBjb3VudGVyQ29udGFpbmVyT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc3BpbiA9ICQoJy5qcy1jb3VudGVyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICRzcGluLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFuaW1hdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb3VudGVyOiAkKHRoaXMpLnRleHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiAnc3dpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbihub3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudGV4dChNYXRoLmNlaWwobm93KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2V0Rmlyc3RzY3JlZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRIZWlnaHQoKTtcblxuICAgICAgICAkd2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldEhlaWdodCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRIZWlnaHQoKSB7XG4gICAgICAgICAgICBsZXQgJGhlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCk7XG4gICAgICAgICAgICBsZXQgJGZpcnN0c2NyZWVuID0gJCgnLmZpcnN0c2NyZWVuJyk7XG5cbiAgICAgICAgICAgICRmaXJzdHNjcmVlbi5jc3MoJ2hlaWdodCcsICRoZWlnaHQgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHJvbW86IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFuaW1hdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCgnLmhlcm8tLWljb24nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICAgIHRsLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgJy5sb2dvJyxcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvLWluY29fX2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiA1MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX190ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IC01MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1wcm9tbycpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgICB0bC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICcubG9nbycsXG4gICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyb19fdGl0bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvX19zdWJ0aXRsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09LjYnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuc2xpY2stbmV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAxMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC41J1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLnNsaWNrLXByZXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0xJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmFkdi1pbWFnZV9faW1nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDMwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjcnXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNsaWRlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItYWR2JykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1hZHYnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItYWR2LWltYWdlJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1hZHYtaW1hZ2UnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItdXNlcnMnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLXVzZXJzJykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDQwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzIwcHgnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWljb25zJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1pY29ucycpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4JyxcblxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZWdpc3RyYXRpb246IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVCbG9jaygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1vdmVCbG9jazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgJGF1dGhGb3JtID0gJCgnLmpzLXByb21vLWZvcm0nKTtcblxuICAgICAgICAgICAgaWYgKCRkb2N1bWVudC53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgICAgICAgICAgbW92ZUZvcm0oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRkb2N1bWVudC53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVGb3JtKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNjcmVlbi0tcmVnJykuYXBwZW5kKCRhdXRoRm9ybSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdmVGb3JtKCkge1xuICAgICAgICAgICAgICAgICRhdXRoRm9ybS5pbnNlcnRBZnRlcignLmZpcnN0c2NyZWVuX193cmFwcGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGljb246IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlcigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1zbGlkZXInKTtcblxuICAgICAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuJChmdW5jdGlvbigpIHtcbiAgICAkKEJhc2UuaW5pdCgpKTtcbiAgICAkKGNhcmQuaW5pdCgpKTtcbiAgICAkKE9uZXBhZ2UuaW5pdCgpKTtcbn0pO1xuXG4vKlxuICoqKiBmdW5jdGlvbnMuanNcbiAqL1xuLy9QdXNoVXBcclxuZnVuY3Rpb24gcHVzaFVwKG9wdGlvbnMpIHtcclxuICAgIHZhciB0ZXh0ID0gb3B0aW9ucy50ZXh0IHx8ICfQktCw0Lwg0L3QvtCy0LDRjyDQt9Cw0Y/QstC60LAnO1xyXG4gICAgdmFyIHN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2JiLXB1c2hVcCcpO1xyXG4gICAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXHJcbiAgICAgICAgJ2JiLXB1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcclxuICAgICk7XHJcblxyXG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xyXG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWVycm9yJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLXN1Y2Nlc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3NoUG9zKCk7XHJcblxyXG4gICAgcmFmKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA0NTAwKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNTAwMCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1wdXNoVXAnKTtcclxuICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zaFBvcygpIHtcclxuICAgICAgICAkKCcuYmItcHVzaFVwJykuZWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAkKCcuYmItcHVzaFVwJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCBoZWlnaHQgKiBlICsgMTAgKyBlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuZnVuY3Rpb24gcmFmKGZuKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9TZXQgSW5wdXQgRGF0ZSBWYWx1ZVxyXG5mdW5jdGlvbiBzZXRJbnB1dERhdGUoc2VsZWN0b3IpIHtcclxuICAgIGxldCBfZGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBsZXQgaG95ID0gbmV3IERhdGUoKSxcclxuICAgICAgICBkID0gaG95LmdldERhdGUoKSxcclxuICAgICAgICBtID0gaG95LmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgIHkgPSBob3kuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBkYXRhO1xyXG5cclxuICAgIGlmIChkIDwgMTApIHtcclxuICAgICAgICBkID0gJzAnICsgZDtcclxuICAgIH1cclxuICAgIGlmIChtIDwgMTApIHtcclxuICAgICAgICBtID0gJzAnICsgbTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0geSArICctJyArIG0gKyAnLScgKyBkO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBfZGF0Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgX2RhdFtpXS52YWx1ZSA9IGRhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vRnVuY3Rpb24gQWRkIFJlbW92ZSBDbGFzcyBmcm9tIEJsb2NrXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzQmxvY2soYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrICsgJy0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLmFkZENsYXNzKGNsKTtcclxuICAgIH0pO1xyXG4gICAgJChibG9jayArICctLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jaykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoYmxvY2spLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbn1cclxuXG4iXX0=
