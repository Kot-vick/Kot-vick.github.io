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
        var $width = $window.width();
        setHeight();

        $window.resize(function () {
            if ($window.width() != $width) {
                setHeight();
            }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiZHJvcGRvd24iLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwidGFicyIsImZpbmQiLCJpcyIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJyZW1vdmVBdHRyIiwicHJvcCIsIiRhY2NvcmRlb24iLCJzbGlkZVVwIiwiZWFjaCIsInNsaWRlRG93biIsIiRwYXJlbnQiLCJjbG9zZXN0IiwiJGl0ZW0iLCJkYXRhIiwibGlzdCIsIndvcmtMaXN0IiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCIkaW5wdXRJY29uIiwiJGJ0blJlc2V0IiwiJGhpbnQiLCJidG4iLCIkYnRuRGF0YSIsIiRpbnB1dFZhbCIsInZhbCIsImF0dHIiLCJzaG93Iiwibm90IiwiaGlkZSIsImZpbHRlciIsImZhZGVPdXQiLCJmYWRlSW4iLCJ0ZXh0IiwidXNlclBob25lIiwicGhvbmUiLCJjaGFuZ2VDaXR5VGl0bGUiLCIkc2xpZGVyIiwiJHNsaWRzIiwiJHNsaWRlIiwiJHByZXZBcnJvdyIsIiRuZXh0QXJyb3ciLCJzbGljayIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJpbmZpbml0ZSIsImFycm93cyIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiJGNhdGFsb2dJdGVtU2xpZGVyIiwiX3RoaXMiLCIkc2xpZGVzIiwiJHNsaWRlckRvdHMiLCJldmVudCIsInByZXBlbmQiLCJhcHBlbmQiLCJzbGlkZUNvdW50IiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwiaSIsImh0bWwiLCJsYXp5TG9hZCIsInN0b3BQcm9wYWdhdGlvbiIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwiJGJ0biIsInJ1biIsImhlbmRsZXIiLCJvZmYiLCJfcmVtb3ZlQW5pbWF0aW9uIiwiZWwiLCJidG5JZCIsInRyaWdnZXIiLCJtZXNzYWdlU3VjY2VzcyIsIm1lc3NhZ2VFcnJvciIsImRlbGF5Iiwic3RhdHVzIiwicHVzaFVwIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImVsZW1lbnRDbGljayIsImRlc3RpbmF0aW9uIiwiJGRyb3Bkb3duIiwicmVuZGVyIiwic2hvd0hpZGUiLCIkYnRuQ2xvc2UiLCIkZHJvcGRvd25PdmVybGF5IiwiJGRyb3Bkb3duTGlzdCIsImFwcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCIkYnRuRmxvYXRpbmciLCJ0YXJnZXQiLCJ0b2dnbGVDbGFzcyIsImlucHV0RXZlbnRzIiwiaW5wdXRNYXNrIiwibW9iaWxlU2VsZWN0IiwiaW5wdXRtYXNrIiwibWFzayIsImdyZWVkeSIsIm9uQmVmb3JlUGFzdGUiLCJwYXN0ZWRWYWx1ZSIsIm9wdHMiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJkZWZpbml0aW9ucyIsInZhbGlkYXRvciIsImNhcmRpbmFsaXR5IiwiY2FzaW5nIiwiaW5wdXQiLCJleGVjQ29tbWFuZCIsIm5leHQiLCJwcmV2IiwiZmllbGRFZGl0IiwiZmllbGRFZGl0SW5wdXQiLCJmaWVsZEVkaXRCdG4iLCJmaWVsZEVkaXRUZXh0IiwiYmx1ciIsInRyaW0iLCJ2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsImtleXByZXNzIiwia2V5Q29kZSIsImVuZCIsIiRzZWxlY3QiLCIkaW5wdXRTZWFyY2giLCIkcmVzdWx0SXRlbSIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0IiwiaWNvblNlbGVjdCIsInNob3dZZWFyIiwiaGlkZVllYXIiLCJhZGRSZXNldEJ0biIsInBob25lQ29kZSIsIiRpY29uU2VsZWN0IiwiaWZvcm1hdCIsImRyb3Bkb3duUGFyZW50IiwiaWNvbiIsIm9yaWdpbmFsT3B0aW9uIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJjb2xvciIsIiRvcmlnaW5hbE9wdGlvbiIsImNvbG9yQmFsbCIsIiR5ZWFyU2VsZWN0IiwiJGRhdGVTZWxlY3QiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiJGlucHV0IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiX3JlbW92ZVN0eWxlIiwiX2FkZFN0eWxlIiwic2VhcmNoQnRuIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2FyZCIsImNhcmRTY3JvbGxzcHkiLCJjYXJkU3RpY2t5IiwiY2FyZFJlcXVlc3RUb2dnbGUiLCJjYXJkTW92ZUl0ZW1zIiwiJGNhcmRTbGlkZXIiLCJjYXJkSW5mb1JlcXVlc3QiLCJpbnNlcnRCZWZvcmUiLCJwcmVwZW5kVG8iLCJzY3JvbGxzcHkiLCJmaXhDYXJkVXNlckluZm8iLCJzY3JvbGwiLCJzdGlja3lCbG9ja09mZnNldCIsImZpeGVkQmxvY2siLCJvdXRlckhlaWdodCIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsInBvc2l0aW9uIiwiYm90dG9tIiwiY2FyZE1lbnVGaXhlZCIsImNhcmRNZW51T2Zmc2V0IiwiY2FyZE1lbnVDbG9uZSIsImNhcmRNZW51IiwicmlnaHQiLCJ6SW5kZXgiLCJjYXJkQ29udGVudCIsImhlaWdodCIsIk9uZXBhZ2UiLCJoZXJvQW5pbWF0ZSIsIm1vYmlsZVNsaWRlciIsImNvdW50ZXJTcGluIiwic2V0Rmlyc3RzY3JlZW4iLCJwcm9tbyIsInJlZ2lzdHJhdGlvbiIsInRsIiwiVGltZWxpbmVNYXgiLCJmcm9tVG8iLCJ5Iiwib3BhY2l0eSIsInNjcm9sbGVkIiwiY291bnRlckNvbnRhaW5lciIsImNvdW50ZXJDb250YWluZXJPZmZzZXQiLCJzY3JlZW4iLCIkc3BpbiIsIkNvdW50ZXIiLCJkdXJhdGlvbiIsImVhc2luZyIsInN0ZXAiLCJub3ciLCJNYXRoIiwiY2VpbCIsIiR3aWR0aCIsInNldEhlaWdodCIsIiRoZWlnaHQiLCIkZmlyc3RzY3JlZW4iLCJhbmltYXRpb24iLCJzbGlkZXJzIiwieCIsImZhZGUiLCJjZW50ZXJNb2RlIiwiY2VudGVyUGFkZGluZyIsIm1vdmVCbG9jayIsIiRhdXRoRm9ybSIsIm1vdmVGb3JtIiwib3B0aW9ucyIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsInBvc2hQb3MiLCJyYWYiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldElucHV0RGF0ZSIsInNlbGVjdG9yIiwiX2RhdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3kiLCJEYXRlIiwiZCIsImdldERhdGUiLCJtIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsIm1heCIsImFkZFJlbW92ZUNsYXNzQmxvY2siLCJibG9jayIsImNsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFdBQVdMLEVBQUUsVUFBRixDQUFqQjtBQUNBLElBQU1NLFFBQVFOLEVBQUUsT0FBRixDQUFkO0FBQ0EsSUFBTU8sV0FBV1AsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTVEsUUFBUVIsRUFBRSxVQUFGLENBQWQ7QUFDQSxJQUFNUyxhQUFhVCxFQUFFLGdCQUFGLENBQW5CO0FBQ0EsSUFBTVUsYUFBYVYsRUFBRSxrQkFBRixDQUFu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WSxPQUFaLEVBQXFCLFlBQVc7QUFDNUI3QyxVQUFFLElBQUYsRUFBUTBLLFdBQVIsQ0FBb0IrTCxFQUFwQjtBQUNILEtBRkQ7O0FBSUF6VyxNQUFFRyxRQUFGLEVBQVkwQyxFQUFaLENBQWUsNEJBQWYsRUFBNkMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3JELFlBQUk5QyxFQUFFOEMsRUFBRTJILE1BQUosRUFBWWhHLE9BQVosQ0FBb0IrUixLQUFwQixFQUEyQnhULE1BQS9CLEVBQXVDO0FBQ3ZDaEQsVUFBRXdXLEtBQUYsRUFBUzdTLFdBQVQsQ0FBcUI4UyxFQUFyQjtBQUNBM1QsVUFBRXFGLGVBQUY7QUFDSCxLQUpEO0FBS0giLCJmaWxlIjoib25lcGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcnNcbmNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XG5jb25zdCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcbmNvbnN0ICRodG1sID0gJCgnaHRtbCcpO1xuY29uc3QgJHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xuY29uc3QgJG1haW4gPSAkKCcubWFpbicpO1xuY29uc3QgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xuY29uc3QgJG1lbnUgPSAkKCcuanMtbWVudScpO1xuY29uc3QgJG5hdk1vYmlsZSA9ICQoJy5qcy1tb2JpbGUtbmF2Jyk7XG5jb25zdCAkaGFtYnVyZ2VyID0gJCgnLmpzLW1haW4tbmF2LWJ0bicpO1xuXG4vKipcclxuICogQmFzZS5qc1xyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuXHJcbmNvbnN0IEJhc2UgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVByZWxvYWRlcigpO1xyXG4gICAgICAgIHRoaXMuZHJvcGRvd24uaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuYWNjb3JkZW9uKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG4gICAgICAgIC8vIHRoaXMucmFkaW9CdG4oKTtcclxuICAgICAgICB0aGlzLnRhYigpO1xyXG4gICAgICAgIC8vIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dE1hc2soKTtcclxuICAgICAgICAvLyB0aGlzLmlucHV0RXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcbiAgICAgICAgdGhpcy5jb3B5VGV4dCgpO1xyXG4gICAgICAgIHRoaXMub3duZXJQaG9uZSgpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5jYXRhbG9nSXRlbVNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdC5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRXhwYW5kZWQoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blN0YXR1c0FuaW1hdGUoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29Ub3AoKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5GbG9hdGluZygpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5QdXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAucG9wdXBGYW5jeUJveCgpO1xyXG4gICAgICAgIHRoaXMucG9wdXAud2hvSXMoKTtcclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG4gICAgICAgIHRoaXMucG9wdXAucmVpbml0KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS5oYW1idXJnZXJCdG4oKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51LmNsaWNrT3VzaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZWFyY2hCdG5PcGVuQ2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xyXG4gICAgICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzY3JvbGxCYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjNTg1YTU5JyxcclxuICAgICAgICAgICAgICAgIC8vIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5vbignbW91c2VvdmVyIG1vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL1JlbW92ZSBwcmVsb2FkZXJcclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICQoJ2JvZHknKS5hZGRDbGFzcygnbG9hZGluZy1hbmltYXRpb24nKTtcclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuICAgICAgICAgICAgLy8gfSwgNTAwKTtcclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9LFxyXG4gICAgLy9Jbml0IGJhc2UgdGFicyBqUSBVaSBUYWJzXHJcbiAgICB0YWI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtYmItdGFiJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1iYi10YWInKS50YWJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ3VzdG9tIGNoZWNib3ggJiBjaGVja2JveFBzZXVkb1xyXG4gICAgY2hlY2tib3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAuaXMoJzpjaGVja2VkJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9CQiBjaGVja2JveCBwc2V1ZG9cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC0tcHNldWRvJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1NlbGVjdCBBbGwgQ2hlY2tib3hcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveC1zZWxlY3QtYWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9DdXN0b20gcmFkaW9CdG5cclxuICAgIC8vIHJhZGlvQnRuOiBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICBsZXQgJHJhZGlvID0gJCgnLmpzLWJiLXJhZGlvJyk7XHJcblxyXG4gICAgLy8gICAgIC8vQkIgcmFkaW9cclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1yYWRpbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpO1xyXG4gICAgLy8gICAgICAgICBpZiAoJGlucHV0LmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAkcmFkaW8ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfSxcclxuICAgIC8vQ3VzdG9tIGFjY29yZGVvblxyXG4gICAgYWNjb3JkZW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcbiAgICAgICAgaWYgKCRhY2NvcmRlb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vQWNjb3JkZW9uIGNvbGxhcHNlXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItYWNjb3JkZW9uIC5iYi1hY2NvcmRlb25fX3RpdGxlJywgZnVuY3Rpb24oXHJcbiAgICAgICAgICAgIGVcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuICAgICAgICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkcGFyZW50LmRhdGEoJ2FjY29yZGVvbicpID09PSAnY29sbGFwc2UnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGxpc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0VG9nZ2xlKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSAkKCcuanMtbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrYm94ID0gbGlzdC5maW5kKCcuanMtYmItY2hlY2tib3gnKTtcclxuICAgICAgICAgICAgICAgIHZhciB3b3JrTGlzdCA9IGxpc3QuZmluZCgnLmpzLWxpc3QtdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tib3guaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGlzdFRvZ2dsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NvcHkgdGV4dCBjbGljayBsaW5rXHJcbiAgICBjb3B5VGV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNiID0gbmV3IENsaXBib2FyZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuICAgICAgICAvL2lmIGhhcyBpbnB1dCB0aGVuIGNvcHkgaW5wdXQgdmFsdWUgaW4gZGF0YSBhdHRyXHJcbiAgICAgICAgJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYm94Jyk7XHJcbiAgICAgICAgICAgIGxldCAkaW5wdXRJY29uID0gJHBhcmVudC5maW5kKCcuYmItaW5wdXRfX2ljb24nKTtcclxuICAgICAgICAgICAgbGV0ICRidG5SZXNldCA9ICRwYXJlbnQuZmluZCgnLmpzLWlucHV0LS1jbGVhcicpO1xyXG4gICAgICAgICAgICBsZXQgJGhpbnQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuID0gJHBhcmVudC5maW5kKCcuanMtdXNlci1saW5rJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5EYXRhID0gJCh0aGlzKS5kYXRhKCdjbGlwYm9hcmQtdGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXRWYWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidG4uYXR0cignZGF0YS1jbGlwYm9hcmQtdGV4dCcsICRidG5EYXRhICsgJGlucHV0VmFsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLmpzLWlucHV0LS1jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCcuanMtaW5wdXQtLWNsZWFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWlucHV0LS1jbGVhcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWlucHV0JylcclxuICAgICAgICAgICAgICAgIC52YWwoJycpO1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuZmFkZU91dCgpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X19pY29uJylcclxuICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG4gICAgICAgICAgICAgICAgLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9TaG93IHBob25lIG51bWJlclxyXG4gICAgb3duZXJQaG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXVzZXItcGhvbmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICdqYXZhc2NyaXB0OnZvaWQoMCk7JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KCQodGhpcykuZGF0YSgncGhvbmUtaGlkZW4nKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdXNlci1waG9uZS0tc2hvdycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgdXNlclBob25lID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXVzZXItcGhvbmUnKTtcclxuICAgICAgICAgICAgdmFyIHBob25lID0gdXNlclBob25lLmRhdGEoJ3Bob25lJyk7XHJcbiAgICAgICAgICAgIHVzZXJQaG9uZVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ3RlbDonICsgcGhvbmUpXHJcbiAgICAgICAgICAgICAgICAudGV4dChwaG9uZSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0NpdHkgc2VsZWN0XHJcbiAgICBjaGFuZ2VDaXR5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2hhbmdlQ2l0eSA9ICQoJy5qcy1jaXR5LXNlbGVjdCcpO1xyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5VGl0bGUgPSBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9fdGl0bGUgc3BhbicpO1xyXG5cclxuICAgICAgICBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykudGV4dCgpO1xyXG4gICAgICAgICAgICBjaGFuZ2VDaXR5VGl0bGUudGV4dCh0ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlcicpO1xyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHByZXZBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkbmV4dEFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICRwcmV2QXJyb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJG5leHRBcnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhdGFsb2cgSXRlbSBTbGlkZXJcclxuICAgIGNhdGFsb2dJdGVtU2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0ICRjYXRhbG9nSXRlbVNsaWRlciA9ICQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAkY2F0YWxvZ0l0ZW1TbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJylcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG4gICAgICAgIGJ0bkV4cGFuZGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWRkUmVtb3ZlQ2xhc3MoJy5qcy1idG4tZXhwYW5kZWQnLCAnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBhbmltYXRlIG9uIGhvdmVyXHJcbiAgICAgICAgYnRuSG92ZXJBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiByZWxZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcmVsWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcbiAgICAgICAgYnRuU3RhdHVzQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGljayA9IDA7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgY2xpY2srKztcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2sgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9mbG9hdGluZyBidG4gYW5pbWF0aW5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuICAgICAgICAgICAgbGV0IHJ1biA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoISRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v0J7QsdGA0LDQsdC+0YLRh9C40Log0LTQvtCx0LDQstC70Y/QtdGCINC60LvQsNGB0YHRiyDQt9Cw0YLQtdC8INC+0YLQv9C40YHRi9Cy0LDRgtC10YHRjyDQvtGCINGB0L7QsdGL0YLQuNGPXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuLm9mZihcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8v0JDQvdC40LzQsNGG0LjRjyDQt9Cw0LrRgNGL0YLQuNGPXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVBbmltYXRpb24oZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJ1bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCAnLmpzLWJ0bi1mbG9hdGluZycsIGhlbmRsZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGlzdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCd6LWluZGV4JywgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bklkID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuSWQudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAnLmpzLWJ0bi1mbG9hdGluZyAuYnRuLWZsb2F0aW5nX19saW5rJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZW1vdmVBbmltYXRpb24oJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL9Ca0LvQuNC6INCyINC90LUg0LrQvdC+0L/QutC4INGB0LrRgNGL0LLQsNC10YIg0L7QstC10YDQu9C10Lkg0Lgg0LrQvdC+0L/QutC4XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLm92ZXJsYXknLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdmYS1sZWF2ZS1hY3RpdmUnXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG4gICAgICAgICAgICAkKCcubW9kYWwnKS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5maW5kKCdbZGF0YS1wdXNoXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2VTdWNjZXNzID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtZGVsYXknKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXR1cztcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1zdGF0dXMnKSB8fCAnc3VjY2Vzcyc7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVwKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2VFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlU3VjY2VzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBzY3JvbGwgdG8gdG9wXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDgwMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL2J0biBzY3JvbGwgdG8gZWxlbWVudFxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG4gICAgICAgICAgICAkKCcuanMtZ290bycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gOTAgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkcm9wZG93bjoge1xyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGRyb3Bkb3duLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dIaWRlKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuZFNjcm9sbCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZChcclxuICAgICAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duLmJiLWRyb3Bkb3duLS10cmFuc2Zvcm0nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93bk92ZXJsYXkgPSAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkNsb3NlLmFwcGVuZFRvKCRkcm9wZG93bkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5maW5kKCcuaW5mby1ibG9ja19faWNvbicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGRTY3JvbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMik7XHJcbiAgICAgICAgLy8gICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcbiAgICAgICAgLy8gICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoJCh0aGlzKS5vZmZzZXQoKS50b3AgPiAkd2luZG93LmlubmVySGVpZ2h0KCkgLyAyKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpKTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGlzdCA9IF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICQodGhpcykpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICQodGhpcykub2Zmc2V0KCkudG9wKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBfdGhpc1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ21vdXNlZW50ZXInKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGlzdC5jc3Moe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIHNob3dIaWRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuICAgICAgICAgICAgbGV0ICRidG5GbG9hdGluZyA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuaXMoJy5iYi1kcm9wZG93bl9fb3ZlcmxheScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xvc2VzdCgnLmJiLWRyb3Bkb3duX19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYmItZHJvcGRvd24tLXRyYW5zZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZU91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1iYi1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAnY2xpY2snLFxyXG4gICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93biAuaW5mby1ibG9ja19fbGluaycsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJy5pcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbnB1dHM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEV2ZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtdGltZS1tYXNrJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtdGltZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk6OTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvZGUtbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvZGUtbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzkgOSA5IDknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ljk5Ljk5OTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvbmZpcm0tbWFzaycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvbmZpcm0tbWFzaycpLmlucHV0bWFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5OTknXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWVtYWlsLW1hc2snKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1lbWFpbC1tYXNrJykuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKnsxLDIwfVsuKnsxLDIwfV1bLip7MSwyMH1dWy4qezEsMjB9XUAqezEsMjB9Wy4qezIsNn1dWy4qezEsMn1dJyxcclxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uKHBhc3RlZFZhbHVlLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhc3RlZFZhbHVlLnJlcGxhY2UoJ21haWx0bzonLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS16ISMkJSYnKisvPT9eX2B7fH1+LV1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiAnbG93ZXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXRFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtLWNvcHknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtY29weS10ZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLXNoYXJlX19saW5rJyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgaW5wdXQgc2VsZWN0IHZhbHVlXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC1mb2N1cy0tY29weScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL1Nob3cgUGFzc3dvcmRcclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9IaWRlIFBhc3N3b3JkXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vRWRpdCBUZXh0IEZpZWxkXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZmllbGQtZWRpdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdCA9ICQoJy5qcy1maWVsZC1lZGl0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0QnRuID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19idG4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dC5zaG93KCkuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIC5ibHVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kZWZhdWx0VmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gJzEzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1pbnB1dCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWlucHV0LXRpcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ25vLWNsb3NlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1pbmZvIGlzLWVycm9yIGlzLWludmFsaWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLW1vYmlsZS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19maWVsZCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJCh0aGlzKS5maW5kKCcuanMtbW9iaWxlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VsZWN0OiB7XHJcbiAgICAgICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgdGFnczogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QuYmItc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGFkZFVzZXJQaWNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1zZXJ2aWNlcycpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiB0aW1lQW5kUHJpY2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC1ib3JuJykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9JY29uIG1lbnRybyBpbnNpZGUgc2VsZWN0XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1ldHJvLWljb24gbWV0cm8taWNvbi0tJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9TZWxlY3QgQWRkIFByaWNlIFRpbWUgJiBQcmljZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0aW1lQW5kUHJpY2Uob3B0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxUaW1lID0gJChvcHQuZWxlbWVudCkuZGF0YSgndGltZScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsUHJpY2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdwcmljZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0LnRleHQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVGltZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQcmljZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3ROYXRpdmUgPSAkKCcuanMtc2VsZWN0LW5hdGl2ZScpO1xyXG4gICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciA9ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSAkKHRoaXMpLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbjpmaXJzdC1jaGlsZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53cmFwKCc8bGFiZWwgY2xhc3M9XCJiYi1zZWxlY3RcIj4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dZZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVllYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRSZXNldEJ0bigpO1xyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWNvblNlbGVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkaWNvblNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1pY29uJyk7XHJcblxyXG4gICAgICAgICAgICAkaWNvblNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC0tc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaWZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaWZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBmb250YXdlc29tZSBpbnNpZGUgc2VsZWN0XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlmb3JtYXQoaWNvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsT3B0aW9uID0gaWNvbi5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPjxpIGNsYXNzPVwic2VsZWN0Ml9faWNvbicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdpY29uJykgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pPiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi50ZXh0ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xvclNlbGVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkY29sb3JTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0tY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICRjb2xvclNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QtY29sb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VhcmNoLWVuYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbG9yIGJhbGwgaW5zaWRlIHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaUJhbGwoY29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJG9yaWdpbmFsT3B0aW9uID0gY29sb3IuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JCYWxsID0gJCgkb3JpZ2luYWxPcHRpb24pLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvci50ZXh0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fbGluZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9XCI+PC9zcGFuPjxwPiAke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLnRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPC9wPjwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fYmFsbFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9IFwiPiA8L3NwYW4+IDwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd1llYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zZXQteWVhcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZVllYXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHllYXJTZWxlY3QgPSAkKCcuanMtc2VsZWN0LWJvcm4tLWNsZWFyJyk7XHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignc2VsZWN0MjpvcGVuaW5nJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJvcm4nKSA9PT0gJ3llYXInXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRkYXRlU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtYm9ybicpO1xyXG5cclxuICAgICAgICAgICAgJGRhdGVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHNlbGVjdCByZXN1bHRzIHRvIG9wdGlvbiB2YWx1ZVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlU2VsZWN0aW9uKG9wdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGNpdHkgbmFtZSB0byBvcHRpb25cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVJlc3VsdChvcHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0VmFsICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCAkcGhvbmVDb2RlQm94ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dC1waG9uZS1jb2RlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHBob25lQ29kZUJveC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICRwaG9uZUNvZGVCb3guZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnNlbGVjdC12YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzKS5maW5kKCcuYmItaW5wdXRfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPj0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogc2VsZWN0Q29kZVJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogc2VsZWN0Q29kZVNlbGVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmItaW5wdXQtLXNlbGVjdC12YWx1ZVwiPjwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uU2VsZWN0ID0gJHBhcmVudC5maW5kKCdvcHRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdFZhbHVlID0gJHBhcmVudC5maW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5iYi1pbnB1dC0tc2VsZWN0LXZhbHVlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoMCkudmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9ICQodGhpcylbMF0uc2VsZWN0ZWRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKGNvdW50ZXIpLnZhbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogJyg5OTkpIDk5OS05OS05OSdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdmb2N1cycsIGFkZEZvY3VzKS5vbignYmx1cicsIHJlbW92ZUZvY3VzKTtcclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpjbG9zZScsIHJlbW92ZUZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb3ZlLXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19maWVsZCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vdmUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcubW92ZS1zZWxlY3RfX3Jlc3VsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZW51OiB7XHJcbiAgICAgICAgLy9IYW1idXJnZXIgYnRuXHJcbiAgICAgICAgaGFtYnVyZ2VyQnRuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb24nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9hZGRTdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtbW9iaWxlLW5hdi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL1doZW4gQ2xpY2sgT3V0c2lkZSBDbG9zZSBNZW51XHJcbiAgICAgICAgY2xpY2tPdXNpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LCAuanMtZGF0ZSwgLmRhdGVwaWNrZXIsIC5jYXJkLWluZm9fX3JlcXVlc3QsIC5jYXRhbG9nLWZpbHRlciwgLmpzLW1vYmlsZS1maWx0ZXItLW9wZW4sIC5qcy1iYi1hY2NvcmRlb24nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5vdmVybGF5JyxcclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIEJ0biBvcGVuL2Nsb3NlXHJcbiAgICAgICAgc2VhcmNoQnRuT3BlbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlYXJjaEJ0biA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLWJ0bicpO1xyXG4gICAgICAgICAgICBzZWFyY2hCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2FkZFN0eWxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuICAgICAgICAgICAgJG92ZXJsYXkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfcmVtb3ZlU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG4gICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBvcHVwOiB7XHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG4gICAgICAgIHBvcHVwRmFuY3lCb3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlc1wiXScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZVwiXScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdmYW5jeWJveC1jb250YWluZXItLWltYWdlJyxcclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vYmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja0NvbnRlbnQ6ICdjbG9zZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGU6ICdjbG9zZSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtYWxsQnRuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tY2xvc2VdJykuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBzbWFsbEJ0bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL0Zvcm0gV2hvIElzP1xyXG4gICAgICAgIHdob0lzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLXdob2lzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2hvaXMgPSAkKHRoaXMpLmRhdGEoJ3dob2lzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9ICQoJyNhdXRoLWZvcm0nKS5maW5kKCcuZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdob2lzID09PSAnbWFzdGVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLW1hc3RlcicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aG9pcyA9PT0gJ3N0dWRpbycpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1zdHVkaW8nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtY2xpZW50Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9EdW5hbWljbHkgY2hhbmdlIGZvcm0gdGl0bGVcclxuICAgICAgICBjaGFuZ2VGb3JtVGl0bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgJy5qcy1mb3JtLXRpdGxlJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQodGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgQmFzZS5zZWxlY3QuY29sb3JTZWxlY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cbi8qKlxyXG4gKiBDYXJkXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBjYXJkID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2FyZC5zbGlkZXIoKTtcclxuICAgICAgICBjYXJkLmNhcmRTY3JvbGxzcHkoKTtcclxuICAgICAgICBjYXJkLmNhcmRTdGlja3koKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRSZXF1ZXN0VG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZE1vdmVJdGVtcygpO1xyXG5cclxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoY2FyZC5jYXJkTW92ZUl0ZW1zKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2xpZGVyXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zbGlkZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0ICRjYXJkU2xpZGVyID0gJCgnLmpzLWNhcmQtc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAkY2FyZFNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMjAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIHJlcXVlc3Qgc2hvdyAvIGhpZGVcclxuICAgIGNhcmRSZXF1ZXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2FyZEluZm9SZXF1ZXN0ID0gJCgnLmNhcmQtaW5mb19fcmVxdWVzdCcpO1xyXG5cclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbmZvUmVxdWVzdC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbmZvUmVxdWVzdC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vTW92ZSBibG9ja3Mgd2hlbiB3aW5kb3cgd2lkdGggPCA3NjhcclxuICAgIGNhcmRNb3ZlSXRlbXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXRpdGxlJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWdhbGxhcnlfX3dyYXAnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1hYm91dCcpLmluc2VydEJlZm9yZSgnLmNhcmQtYWRyZXNzJyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtaW5mby1jYXRlZ29yeScpLmFwcGVuZFRvKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0tc2hvdycpLnByZXBlbmRUbygnLmNhcmQtaW5mb19fdG9wJyk7XHJcbiAgICAgICAgJCgnLmNhcmQtaW5mb19faW5uZXInKS5pbnNlcnRBZnRlcignLmNhcmQtYWRyZXNzJyk7XHJcbiAgICAgICAgJCgnLmpzLW1vdmUtY2FyZC1wb2xpY3knKS5hcHBlbmRUbygnLmNhcmQtcmVxdWVzdC1mb3JtJyk7XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNjcm9sbHNweVxyXG4gICAgY2FyZFNjcm9sbHNweTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1zY3JvbGxzcHknKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2Nyb2xsc3B5Jykuc2Nyb2xsc3B5KHsgb2Zmc2V0OiAtMTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2Nyb2xsc3B5Jykuc2Nyb2xsc3B5KHsgb2Zmc2V0OiAtNjAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYXJkU3RpY2t5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc3RpY2t5JykubGVuZ3RoICYmICQoJy5qcy1jYXJkLWZpeGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9jayA9ICQoJy5qcy1jYXJkLXN0aWNreScpO1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2tPZmZzZXQgPSBzdGlja3lCbG9jay5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrID0gJCgnLmpzLWNhcmQtZml4ZWQnKTtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2tPZmZzZXQgPSBmaXhlZEJsb2NrLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkQ29udGVudCA9ICQoJy5qcy1jYXJkLWNvbnRlbnQtZml4ZWQnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudSA9ICQoJy5qcy1jYXJkLW1lbnUnKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51Q2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiY2FyZC1tZW51X19jbG9uZVwiPicpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAkKCcuanMtY2FyZC1tZW51Jykub3V0ZXJIZWlnaHQodHJ1ZSkpXHJcbiAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoY2FyZE1lbnUpXHJcbiAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVPZmZzZXQgPSBjYXJkTWVudS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmhlaWdodCgpIDwgY2FyZENvbnRlbnQuaGVpZ2h0KCkgJiZcclxuICAgICAgICAgICAgICAgICQod2luZG93KS53aWR0aCgpID4gNzY4XHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZml4Q2FyZFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpeENhcmRVc2VySW5mbygpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogLTEgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3NSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KCkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3NSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNhcmRNZW51Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2FyZE1lbnVGaXhlZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjYXJkTWVudUZpeGVkKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+PSBjYXJkTWVudU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogOTlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudS5yZW1vdmVBdHRyKCdzdHlsZScpLnJlbW92ZUNsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cbi8qKlxuICogT25lcGFnZVxuICpcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XG4gKi9cbmNvbnN0IE9uZXBhZ2UgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIEJhc2UubWVudS5oYW1idXJnZXJCdG4oKTtcbiAgICAgICAgQmFzZS5tZW51LmNsaWNrT3VzaWRlKCk7XG5cbiAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLW9uZXBhZ2UtLWhvbWUnKSkge1xuICAgICAgICAgICAgT25lcGFnZS5oZXJvQW5pbWF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlkZXIoKTtcbiAgICAgICAgdGhpcy5tb2JpbGVTbGlkZXIoKTtcbiAgICAgICAgdGhpcy5jb3VudGVyU3BpbigpO1xuICAgICAgICB0aGlzLnNldEZpcnN0c2NyZWVuKCk7XG5cbiAgICAgICAgdGhpcy5wcm9tby5pbml0KCk7XG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLmluaXQoKTtcbiAgICAgICAgdGhpcy5pY29uLmluaXQoKTtcbiAgICB9LFxuICAgIGhlcm9BbmltYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgdGwuZnJvbVRvKCcuaGVybycsIDEsIHsgeTogLTMwMCwgb3BhY2l0eTogMCB9LCB7IHk6IDAsIG9wYWNpdHk6IDEgfSlcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5oZXJvX190aXRsZScsXG4gICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPS4zJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3N1YnRpdGxlJyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgJy09LjcnXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICcuaGVyb19fd2lkZ2V0JyxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIHsgeTogNzAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAnLT0uNSdcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgJy5zb2NpYWwnLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgeyB5OiA1MCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICctPTAuNidcbiAgICAgICAgICAgICk7XG4gICAgfSxcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1vbmVwYWdlLXNsaWRlcicpO1xuXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA4MTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1vYmlsZVNsaWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKGRvY3VtZW50KS53aWR0aCgpIDwgODE1KSB7XG4gICAgICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1vbmVwYWdlLXNsaWRlci0tbW9iaWxlJyk7XG5cbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgY291bnRlclNwaW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc2Nyb2xsZWQgPSBmYWxzZTtcblxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFzY3JvbGxlZCkge1xuICAgICAgICAgICAgICAgIGxldCBjb3VudGVyQ29udGFpbmVyID0gJCgnLmpzLWNvdW50ZXItLXdyYXBwZXInKTtcbiAgICAgICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lck9mZnNldCA9IGNvdW50ZXJDb250YWluZXIuZGF0YSgnb2Zmc2V0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IHNjcmVlbiA9IGNvdW50ZXJDb250YWluZXIub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcmVlbiAtIGNvdW50ZXJDb250YWluZXJPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzcGluID0gJCgnLmpzLWNvdW50ZXInKTtcblxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNwaW4uZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYW5pbWF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvdW50ZXI6ICQodGhpcykudGV4dCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6ICdzd2luZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IGZ1bmN0aW9uKG5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KE1hdGguY2VpbChub3cpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzZXRGaXJzdHNjcmVlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkd2lkdGggPSAkd2luZG93LndpZHRoKCk7XG4gICAgICAgIHNldEhlaWdodCgpO1xuXG4gICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSAhPSAkd2lkdGgpIHtcbiAgICAgICAgICAgICAgICBzZXRIZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0SGVpZ2h0KCkge1xuICAgICAgICAgICAgbGV0ICRoZWlnaHQgPSAkd2luZG93LmhlaWdodCgpO1xuICAgICAgICAgICAgbGV0ICRmaXJzdHNjcmVlbiA9ICQoJy5maXJzdHNjcmVlbicpO1xuXG4gICAgICAgICAgICAkZmlyc3RzY3JlZW4uY3NzKCdoZWlnaHQnLCAkaGVpZ2h0ICsgJ3B4Jyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHByb21vOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVycygpO1xuICAgICAgICB9LFxuICAgICAgICBhbmltYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQoJy5oZXJvLS1pY29uJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgICB0bC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICcubG9nbycsXG4gICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX19pbWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogNTAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC41J1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm8taW5jb19fdGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAtNTAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC41J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2UtcHJvbW8nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgICAgdGwuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAnLmxvZ28nLFxuICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICB7IHg6IC0xMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm9fX3RpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyb19fc3VidGl0bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPS42J1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgICAgICAgICAgICAgICAnLnNsaWNrLW5leHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMTAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5zbGljay1wcmV2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IC0xMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5hZHYtaW1hZ2VfX2ltZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAzMDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC43J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzbGlkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItYWR2Jykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdi1pbWFnZScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItYWR2LWltYWdlJykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLXVzZXJzJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci11c2VycycpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci1pY29ucycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMjBweCcsXG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVnaXN0cmF0aW9uOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlQmxvY2soKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtb3ZlQmxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0ICRhdXRoRm9ybSA9ICQoJy5qcy1wcm9tby1mb3JtJyk7XG5cbiAgICAgICAgICAgIGlmICgkZG9jdW1lbnQud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICAgICAgICAgIG1vdmVGb3JtKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICgkZG9jdW1lbnQud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICAgICAgICAgICAgICBtb3ZlRm9ybSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5zY3JlZW4tLXJlZycpLmFwcGVuZCgkYXV0aEZvcm0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3ZlRm9ybSgpIHtcbiAgICAgICAgICAgICAgICAkYXV0aEZvcm0uaW5zZXJ0QWZ0ZXIoJy5maXJzdHNjcmVlbl9fd3JhcHBlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBpY29uOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtc2xpZGVyJyk7XG5cbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiQoZnVuY3Rpb24oKSB7XG4gICAgJChCYXNlLmluaXQoKSk7XG4gICAgJChjYXJkLmluaXQoKSk7XG4gICAgJChPbmVwYWdlLmluaXQoKSk7XG59KTtcblxuLypcbiAqKiogZnVuY3Rpb25zLmpzXG4gKi9cbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdiYi1wdXNoVXAnKTtcclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgICAgICdiYi1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXHJcbiAgICApO1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItcHVzaFVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLmJiLXB1c2hVcCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLmJiLXB1c2hVcCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vU2V0IElucHV0IERhdGUgVmFsdWVcclxuZnVuY3Rpb24gc2V0SW5wdXREYXRlKHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgbGV0IGhveSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZCA9IGhveS5nZXREYXRlKCksXHJcbiAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICB5ID0gaG95LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF0YTtcclxuXHJcbiAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgZCA9ICcwJyArIGQ7XHJcbiAgICB9XHJcbiAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgbSA9ICcwJyArIG07XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gX2RhdC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgIF9kYXRbaV0udmFsdWUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KGJsb2NrKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59XHJcblxuIl19
