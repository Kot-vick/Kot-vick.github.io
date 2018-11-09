'use strict';

//Global Vars
var $window = $(window);
var $document = $(document);
var $html = $('html');
var $wrapper = $('.wrapper');
var $header = $('.header');
var $main = $('.main');
var $overlay = $('.overlay');
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
                                if ($('.js-stiky-block').length > 0 && $(window).width() > 768) {
                                                new StickySidebar('.js-stiky-block', {
                                                                topSpacing: 110,
                                                                bottomSpacing: 10,
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
 * Main
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Main = {
                init: function init() {
                                this.moveBlocks();
                                this.pagePromo.init();
                },
                moveBlocks: function moveBlocks() {
                                if ($(window).width() <= 768) {
                                                $('.bb-blog').insertAfter('.bb-category');
                                }
                },
                pagePromo: {
                                init: function init() {
                                                if ($('.js-bb-slider--promo').length) {
                                                                Main.pagePromo.slider();
                                                }
                                                if ($(window).width() <= 480) {
                                                                Main.pagePromo.moveBlocks();
                                                }
                                },
                                slider: function slider() {
                                                $('.js-bb-slider--promo').not('.slick-initialized').slick({
                                                                nextArrow: '.bb-slider__arrow--next',
                                                                prevArrow: '.bb-slider__arrow--prev',
                                                                arrows: false,
                                                                infinite: true,
                                                                slidesToShow: 3,
                                                                slidesToScroll: 1,
                                                                speed: 1000,
                                                                autoplaySpeed: 3000,
                                                                autoplay: true,
                                                                dots: true,
                                                                responsive: [{
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
                                },
                                moveBlocks: function moveBlocks() {
                                                $('.js-promo-form').insertAfter('.promo__wrap');
                                }
                }
};

$(function () {
                $(Base.init());
                $(Main.init());
                $(catalog.init());
                $(card.init());
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkaGVhZGVyIiwiJG1haW4iLCIkb3ZlcmxheSIsIiRuYXZNb2JpbGUiLCIkaGFtYnVyZ2VyIiwiQmFzZSIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJkcm9wZG93biIsImFjY29yZGVvbiIsImNoZWNrYm94IiwidGFiIiwibGlzdFRvZ2dsZSIsImNvcHlUZXh0Iiwib3duZXJQaG9uZSIsImNoYW5nZUNpdHkiLCJzbGlkZXIiLCJjYXRhbG9nSXRlbVNsaWRlciIsInNlbGVjdCIsImlucHV0cyIsImJ1dHRvbnMiLCJidG5FeHBhbmRlZCIsImJ0bkhvdmVyQW5pbWF0ZSIsImJ0blN0YXR1c0FuaW1hdGUiLCJidG5Hb1RvcCIsImJ0bkdvVG8iLCJidG5GbG9hdGluZyIsImJ0blB1c2giLCJwb3B1cCIsInBvcHVwRmFuY3lCb3giLCJ3aG9JcyIsImNoYW5nZUZvcm1UaXRsZSIsInJlaW5pdCIsIndpZHRoIiwic2Nyb2xsQmFyIiwibWVudSIsImhhbWJ1cmdlckJ0biIsImNsaWNrT3VzaWRlIiwic2VhcmNoQnRuT3BlbkNsb3NlIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJib3h6b29tIiwidmVyZ2UiLCJjdXJzb3J3aWR0aCIsImN1cnNvcmJvcmRlciIsImN1cnNvcmJvcmRlcnJhZGl1cyIsImdldE5pY2VTY3JvbGwiLCJyZXNpemUiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2xhc3MiLCJ0YWJzIiwiZmluZCIsImlzIiwiYWRkQ2xhc3MiLCJoYXNDbGFzcyIsInBhcmVudCIsInJlbW92ZUF0dHIiLCJwcm9wIiwiJGFjY29yZGVvbiIsInNsaWRlVXAiLCJlYWNoIiwic2xpZGVEb3duIiwiJHBhcmVudCIsImNsb3Nlc3QiLCIkaXRlbSIsImRhdGEiLCJsaXN0Iiwid29ya0xpc3QiLCJjc3MiLCJjYiIsIkNsaXBib2FyZCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsImJ0biIsIiRidG5EYXRhIiwiJGlucHV0VmFsIiwidmFsIiwiYXR0ciIsInNob3ciLCJub3QiLCJoaWRlIiwiZmlsdGVyIiwiZmFkZU91dCIsImZhZGVJbiIsInRleHQiLCJ1c2VyUGhvbmUiLCJwaG9uZSIsImNoYW5nZUNpdHlUaXRsZSIsIiRzbGlkZXIiLCIkc2xpZHMiLCIkc2xpZGUiLCIkcHJldkFycm93IiwiJG5leHRBcnJvdyIsInNsaWNrIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwiYXJyb3dzIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCIkY2F0YWxvZ0l0ZW1TbGlkZXIiLCJfdGhpcyIsIiRzbGlkZXMiLCIkc2xpZGVyRG90cyIsImV2ZW50IiwicHJlcGVuZCIsImFwcGVuZCIsInNsaWRlQ291bnQiLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCJpIiwiaHRtbCIsImxhenlMb2FkIiwic3RvcFByb3BhZ2F0aW9uIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCJ0ZXh0U3VjY2VzcyIsInRleHRFcnJvciIsInB1c2hVcCIsInN0YXR1cyIsIiRidG4iLCJydW4iLCJoZW5kbGVyIiwib2ZmIiwiX3JlbW92ZUFuaW1hdGlvbiIsImVsIiwiYnRuSWQiLCJ0cmlnZ2VyIiwibWVzc2FnZSIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJlbGVtZW50Q2xpY2siLCJkZXN0aW5hdGlvbiIsIiRkcm9wZG93biIsInJlbmRlciIsInNob3dIaWRlIiwiJGJ0bkNsb3NlIiwiJGRyb3Bkb3duT3ZlcmxheSIsIiRkcm9wZG93bkxpc3QiLCJhcHBlbmRUbyIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwiJGJ0bkZsb2F0aW5nIiwidGFyZ2V0IiwidG9nZ2xlQ2xhc3MiLCJpbnB1dEV2ZW50cyIsImlucHV0TWFzayIsIm1vYmlsZVNlbGVjdCIsImlucHV0bWFzayIsIm1hc2siLCJncmVlZHkiLCJvbkJlZm9yZVBhc3RlIiwicGFzdGVkVmFsdWUiLCJvcHRzIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiZGVmaW5pdGlvbnMiLCJ2YWxpZGF0b3IiLCJjYXJkaW5hbGl0eSIsImNhc2luZyIsImlucHV0IiwiZXhlY0NvbW1hbmQiLCJuZXh0IiwicHJldiIsImZpZWxkRWRpdCIsImZpZWxkRWRpdElucHV0IiwiZmllbGRFZGl0QnRuIiwiZmllbGRFZGl0VGV4dCIsImJsdXIiLCJ0cmltIiwidmFsdWUiLCJkZWZhdWx0VmFsdWUiLCJrZXlwcmVzcyIsImtleUNvZGUiLCJlbmQiLCIkc2VsZWN0IiwiJGlucHV0U2VhcmNoIiwiJHJlc3VsdEl0ZW0iLCJzZWxlY3QyIiwidGFncyIsInRlbXBsYXRlUmVzdWx0IiwiYWRkVXNlclBpYyIsInRlbXBsYXRlU2VsZWN0aW9uIiwiaWZvcm1hdCIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwidGltZUFuZFByaWNlIiwiYWxsb3dDbGVhciIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsImljb24iLCJvcmlnaW5hbE9wdGlvbiIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCIkc2VsZWN0TmF0aXZlIiwicGxhY2Vob2xkZXIiLCIkZmlyc3RPcHRpb24iLCJ3cmFwIiwiY29sb3JTZWxlY3QiLCJzaG93WWVhciIsImhpZGVZZWFyIiwiYWRkUmVzZXRCdG4iLCJwaG9uZUNvZGUiLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImRyb3Bkb3duUGFyZW50IiwiY29sb3IiLCIkb3JpZ2luYWxPcHRpb24iLCJjb2xvckJhbGwiLCIkeWVhclNlbGVjdCIsIiRkYXRlU2VsZWN0Iiwic2VsZWN0Q29kZVNlbGVjdGlvbiIsIm9wdFZhbCIsInNlbGVjdENvZGVSZXN1bHQiLCJjb3VudHJ5IiwiJHBob25lQ29kZUJveCIsIiRpbnB1dCIsImZvY3VzIiwib3B0aW9uU2VsZWN0Iiwic2VsZWN0VmFsdWUiLCJlcSIsImNoYW5nZSIsImNvdW50ZXIiLCJzZWxlY3RlZEluZGV4IiwiYWRkRm9jdXMiLCJyZW1vdmVGb2N1cyIsIl9yZW1vdmVTdHlsZSIsIl9hZGRTdHlsZSIsInNlYXJjaEJ0biIsImZhbmN5Ym94IiwiYmFzZUNsYXNzIiwiY2xvc2VDbGlja091dHNpZGUiLCJhdXRvRm9jdXMiLCJpbWFnZSIsInByZWxvYWQiLCJoZWxwZXJzIiwib3ZlcmxheSIsImxvY2tlZCIsInRvb2xiYXIiLCJtb2JpbGUiLCJjbGlja0NvbnRlbnQiLCJjbGlja1NsaWRlIiwidG91Y2giLCJzbWFsbEJ0biIsIndob2lzIiwiZm9ybSIsImNhdGFsb2ciLCJtYXBUb2dnbGUiLCJidG5GaWx0ZXJPcGVuIiwiYnRuU2hvd0NhdGFsb2ciLCJidG5TaG93TWFwIiwic3RpY2t5RmlsdGVyIiwiZmlsdGVyQ2F0ZWdvcnkiLCJtb3ZlQmxvY2tzIiwiaWZQYWdlQ2F0YWxvZyIsImNhdGFsb2dGaWx0ZXIiLCJTdGlja3lTaWRlYmFyIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJjb250YWluZXJTZWxlY3RvciIsImlubmVyV3JhcHBlclNlbGVjdG9yIiwiaW5zZXJ0QmVmb3JlIiwib3V0ZXJIZWlnaHQiLCJjYXJkIiwiY2FyZFNjcm9sbHNweSIsImNhcmRTdGlja3kiLCJjYXJkUmVxdWVzdFRvZ2dsZSIsImNhcmRNb3ZlSXRlbXMiLCIkY2FyZFNsaWRlciIsImNhcmRJbmZvUmVxdWVzdCIsInByZXBlbmRUbyIsInNjcm9sbHNweSIsImZpeENhcmRVc2VySW5mbyIsInNjcm9sbCIsInN0aWNreUJsb2NrT2Zmc2V0IiwiZml4ZWRCbG9jayIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsInBvc2l0aW9uIiwiYm90dG9tIiwiY2FyZE1lbnVGaXhlZCIsImNhcmRNZW51T2Zmc2V0IiwiY2FyZE1lbnVDbG9uZSIsImNhcmRNZW51IiwicmlnaHQiLCJ6SW5kZXgiLCJjYXJkQ29udGVudCIsImhlaWdodCIsIk1haW4iLCJwYWdlUHJvbW8iLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsInkiLCJnZXRGdWxsWWVhciIsIm1heCIsImFkZFJlbW92ZUNsYXNzQmxvY2siLCJibG9jayIsImNsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBYUMsRUFBRUMsTUFBRixDQUFuQjtBQUNBLElBQU1DLFlBQWFGLEVBQUVHLFFBQUYsQ0FBbkI7QUFDQSxJQUFNQyxRQUFhSixFQUFFLE1BQUYsQ0FBbkI7QUFDQSxJQUFNSyxXQUFhTCxFQUFFLFVBQUYsQ0FBbkI7QUFDQSxJQUFNTSxVQUFhTixFQUFFLFNBQUYsQ0FBbkI7QUFDQSxJQUFNTyxRQUFhUCxFQUFFLE9BQUYsQ0FBbkI7QUFDQSxJQUFNUSxXQUFhUixFQUFFLFVBQUYsQ0FBbkI7QUFDQSxJQUFNUyxhQUFhVCxFQUFFLGdCQUFGLENBQW5CO0FBQ0EsSUFBTVUsYUFBYVYsRUFBRSxrQkFBRixDQUFuQjs7QUFFQTs7Ozs7Ozs7OztBQVlBLElBQU1XLE9BQU87O0FBRVRDLHNCQUFNLGdCQUFXOztBQUViLHFDQUFLQyxlQUFMOztBQUVBLHFDQUFLQyxRQUFMLENBQWNGLElBQWQ7O0FBRUEscUNBQUtHLFNBQUw7O0FBRUEscUNBQUtDLFFBQUw7O0FBRUE7O0FBRUEscUNBQUtDLEdBQUw7O0FBRUE7O0FBRUE7O0FBRUE7O0FB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RUFBcUJ0UyxFQUFyQixDQUF3QixPQUF4QixFQUFpQyxZQUFXO0FBQ3hDN0Msa0NBQUVtVixLQUFGLEVBQVN4UixXQUFULENBQXFCeVIsRUFBckI7QUFDSCxpQkFGRDtBQUdIOztBQUVELFNBQVNoTixjQUFULENBQXdCK00sS0FBeEIsRUFBK0JDLEVBQS9CLEVBQW1DO0FBQy9CcFYsa0JBQUVtVixLQUFGLEVBQVN0UyxFQUFULENBQVksT0FBWixFQUFxQixZQUFXO0FBQzVCN0Msa0NBQUUsSUFBRixFQUFRMEssV0FBUixDQUFvQjBLLEVBQXBCO0FBQ0gsaUJBRkQ7O0FBSUFwVixrQkFBRUcsUUFBRixFQUFZMEMsRUFBWixDQUFlLDRCQUFmLEVBQTZDLFVBQVNDLENBQVQsRUFBWTtBQUNyRCxvQ0FBSTlDLEVBQUU4QyxFQUFFMkgsTUFBSixFQUFZaEcsT0FBWixDQUFvQjBRLEtBQXBCLEVBQTJCblMsTUFBL0IsRUFBdUM7QUFDdkNoRCxrQ0FBRW1WLEtBQUYsRUFBU3hSLFdBQVQsQ0FBcUJ5UixFQUFyQjtBQUNBdFMsa0NBQUVxRixlQUFGO0FBQ0gsaUJBSkQ7QUFLSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyc1xyXG5jb25zdCAkd2luZG93ICAgID0gJCh3aW5kb3cpO1xyXG5jb25zdCAkZG9jdW1lbnQgID0gJChkb2N1bWVudCk7XHJcbmNvbnN0ICRodG1sICAgICAgPSAkKCdodG1sJyk7XHJcbmNvbnN0ICR3cmFwcGVyICAgPSAkKCcud3JhcHBlcicpO1xyXG5jb25zdCAkaGVhZGVyICAgID0gJCgnLmhlYWRlcicpO1xyXG5jb25zdCAkbWFpbiAgICAgID0gJCgnLm1haW4nKTtcclxuY29uc3QgJG92ZXJsYXkgICA9ICQoJy5vdmVybGF5Jyk7XHJcbmNvbnN0ICRuYXZNb2JpbGUgPSAkKCcuanMtbW9iaWxlLW5hdicpO1xyXG5jb25zdCAkaGFtYnVyZ2VyID0gJCgnLmpzLW1haW4tbmF2LWJ0bicpO1xyXG5cclxuLyoqXHJcblxyXG4gKiBCYXNlLmpzXHJcblxyXG4gKlxyXG5cclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuXHJcbiAqL1xyXG5cclxuXHJcblxyXG5jb25zdCBCYXNlID0ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZVByZWxvYWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmRyb3Bkb3duLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3QuaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0cy5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkV4cGFuZGVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Ib3ZlckFuaW1hdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blN0YXR1c0FuaW1hdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkdvVG9wKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5GbG9hdGluZygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuUHVzaCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAucG9wdXBGYW5jeUJveCgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLndob0lzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAuY2hhbmdlRm9ybVRpdGxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAucmVpbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhcigpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmhhbWJ1cmdlckJ0bigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmNsaWNrT3VzaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2VhcmNoQnRuT3BlbkNsb3NlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcclxuXHJcbiAgICAgICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzY3JvbGxCYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzU4NWE1OScsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBib3h6b29tICAgICAgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHZlcmdlICAgICAgICAgICAgIDogNTAwLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoICAgICAgIDogJzJweCcsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyICAgICAgOiAnbm9uZScsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMidcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm9uKCdtb3VzZW92ZXIgbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL1JlbW92ZSBwcmVsb2FkZXJcclxuXHJcbiAgICByZW1vdmVQcmVsb2FkZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vICQoJ2JvZHknKS5hZGRDbGFzcygnbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgLy8gfSwgNTAwKTtcclxuXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG5cclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vSW5pdCBiYXNlIHRhYnMgalEgVWkgVGFic1xyXG5cclxuICAgIHRhYjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtYmItdGFiJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuXHJcbiAgICBjaGVja2JveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9CQiBjaGVja2JveCBwc2V1ZG9cclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL1NlbGVjdCBBbGwgQ2hlY2tib3hcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIHJhZGlvQnRuXHJcblxyXG4gICAgLy8gcmFkaW9CdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vICAgICBsZXQgJHJhZGlvID0gJCgnLmpzLWJiLXJhZGlvJyk7XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAgLy9CQiByYWRpb1xyXG5cclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1yYWRpbycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIGlmICgkaW5wdXQuaXMoJzpjaGVja2VkJykpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICRyYWRpby5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIGFjY29yZGVvblxyXG5cclxuICAgIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkYWNjb3JkZW9uID0gJCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQWNjb3JkZW9uIGNvbGxhcHNlXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgZVxyXG5cclxuICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGl0ZW0gICA9ICQodGhpcykucGFyZW50KCcuYmItYWNjb3JkZW9uX19pdGVtJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkcGFyZW50LmRhdGEoJ2FjY29yZGVvbicpID09PSAnY29sbGFwc2UnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbGlzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbGlzdFRvZ2dsZSgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCAgICAgPSAkKCcuanMtbGlzdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtMaXN0ID0gbGlzdC5maW5kKCcuanMtbGlzdC10b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ29weSB0ZXh0IGNsaWNrIGxpbmtcclxuXHJcbiAgICBjb3B5VGV4dDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL2lmIGhhcyBpbnB1dCB0aGVuIGNvcHkgaW5wdXQgdmFsdWUgaW4gZGF0YSBhdHRyXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgICAgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ib3gnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaW5wdXRJY29uID0gJHBhcmVudC5maW5kKCcuYmItaW5wdXRfX2ljb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgID0gJHBhcmVudC5maW5kKCcuanMtaW5wdXQtLWNsZWFyJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGhpbnQgICAgICA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgICA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWlucHV0LWJsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidG4gICAgICAgPSAkcGFyZW50LmZpbmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5EYXRhICA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dFZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWlucHV0LS1jbGVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZU91dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX2ljb24nKVxyXG5cclxuICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9TaG93IHBob25lIG51bWJlclxyXG5cclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuanMtdXNlci1waG9uZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQoJCh0aGlzKS5kYXRhKCdwaG9uZS1oaWRlbicpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy11c2VyLXBob25lLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdXNlclBob25lID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtdXNlci1waG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBob25lID0gdXNlclBob25lLmRhdGEoJ3Bob25lJyk7XHJcblxyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ3RlbDonICsgcGhvbmUpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2l0eSBzZWxlY3RcclxuXHJcbiAgICBjaGFuZ2VDaXR5OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHkgICAgICA9ICQoJy5qcy1jaXR5LXNlbGVjdCcpO1xyXG5cclxuICAgICAgICBsZXQgY2hhbmdlQ2l0eVRpdGxlID0gY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX3RpdGxlIHNwYW4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9faXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRleHQgPSAkKHRoaXMpLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZUNpdHlUaXRsZS50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQmFzZSBzbGlkZXJcclxuXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1iYi1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkcyAgICAgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgICAgID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcHJldkFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tcHJldicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkbmV4dEFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93ICAgICA6ICRuZXh0QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3cgICAgIDogJHByZXZBcnJvdyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5ICAgICAgOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZCA6IDQwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZCAgICAgICAgIDogMTUwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdyAgOiAzLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZSAgICAgIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93cyAgICAgICAgOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90cyAgICAgICAgICA6IGZhbHNlLFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzICA6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHMgICAgICAgIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93cyAgICAgIDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2F0YWxvZyBJdGVtIFNsaWRlclxyXG5cclxuICAgIGNhdGFsb2dJdGVtU2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNhdGFsb2dJdGVtU2xpZGVyID0gJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzICAgICAgID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyAgICAgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgICAgICA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQgICAgICA6ICdvbmRlbWFuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZCAgICAgICAgIDogNDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93ICA6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93cyAgICAgICAgOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGUgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90cyAgICAgICAgICA6IGZhbHNlLFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzICA6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWl0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25zOiB7XHJcblxyXG4gICAgICAgIC8vYnRuIGV4cGFuZGVkXHJcblxyXG4gICAgICAgIGJ0bkV4cGFuZGVkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGFkZFJlbW92ZUNsYXNzKCcuanMtYnRuLWV4cGFuZGVkJywgJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBhbmltYXRlIG9uIGhvdmVyXHJcblxyXG4gICAgICAgIGJ0bkhvdmVyQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggICAgICAgICA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgICAgICAgICA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgOiByZWxZLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCAgICAgICAgID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSAgICAgICAgID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnV0dG9uLWFuaW1hdGVfX2hvdmVyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcblxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdWNjZXNzID0gJCh0aGlzKS5kYXRhKCdtZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dEVycm9yICAgPSAkKHRoaXMpLmRhdGEoJ21lc3NhZ2UtZXJyb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2sgPD0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1lcnJvcicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtaW52YWxpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgIDogdGV4dEVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdlcnJvcidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHRTdWNjZXNzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcnVuICA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICghJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v0J7QsdGA0LDQsdC+0YLRh9C40Log0LTQvtCx0LDQstC70Y/QtdGCINC60LvQsNGB0YHRiyDQt9Cw0YLQtdC8INC+0YLQv9C40YHRi9Cy0LDRgtC10YHRjyDQvtGCINGB0L7QsdGL0YLQuNGPXHJcblxyXG4gICAgICAgICAgICBsZXQgaGVuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG4ub2ZmKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPINC30LDQutGA0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVBbmltYXRpb24oZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcnVuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1biA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsICcuanMtYnRuLWZsb2F0aW5nJywgaGVuZGxlcik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnRuSWQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5tZC1oaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5JZC50cmlnZ2VyKCdjbGljaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYnRuLWZsb2F0aW5nIC5idG4tZmxvYXRpbmdfX2xpbmsnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlbW92ZUFuaW1hdGlvbigkKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8v0JrQu9C40Log0LIg0L3QtSDQutC90L7Qv9C60Lgg0YHQutGA0YvQstCw0LXRgiDQvtCy0LXRgNC70LXQuSDQuCDQutC90L7Qv9C60LhcclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLm92ZXJsYXknLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZhLWxlYXZlLWFjdGl2ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CV0YHQu9C4INGB0YHRi9C70LrQsCDQvtGC0LrRgNGL0LLQsNC10YIg0LzQvtC00LDQu9C60YMsINGC0L4g0L/QviDQvtGC0LrRgNGL0YLQuNGOINC80L7QtNCw0LvQutC4INGB0LrRgNGL0LLQsNC10YIg0LrQvdC+0L/QutC4XHJcblxyXG4gICAgICAgICAgICAkKCcubW9kYWwnKS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidG5QdXNoOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5maW5kKCdbZGF0YS1wdXNoXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXMgID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgIDogbWVzc2FnZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBzY3JvbGwgdG8gdG9wXHJcblxyXG4gICAgICAgIGJ0bkdvVG9wOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgODAwXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBzY3JvbGwgdG8gZWxlbWVudFxyXG5cclxuICAgICAgICBidG5Hb1RvOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgZXZlbnQgdG8gc2Nyb2xsIHRvIHNlY3Rpb24gd2hpdGggaWQgbGlrZSBocmVmXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtZ290bycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGVzdGluYXRpb24gID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA2MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZHJvcGRvd246IHtcclxuXHJcbiAgICAgICAgLy9DdXN0b20gZHJvcGRvd25cclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJGRyb3Bkb3duLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnYmItZHJvcGRvd24tLWhvdmVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93SGlkZSgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd0hpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biAgICA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5pcygnLmJiLWRyb3Bkb3duX19vdmVybGF5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbG9zZXN0KCcuYmItZHJvcGRvd25fX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYmItZHJvcGRvd24tLXRyYW5zZm9ybScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1iYi1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93biAuaW5mby1ibG9ja19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnLmlzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRzOiB7XHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnB1dEV2ZW50cygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnB1dE1hc2soKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG5cclxuICAgICAgICBpbnB1dE1hc2s6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy10aW1lLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtdGltZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ojk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb2RlLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29kZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzkgOSA5IDknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTkuOTkuOTk5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29uZmlybS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvbmZpcm0tbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1lbWFpbC1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWVtYWlsLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqezEsMjB9Wy4qezEsMjB9XVsuKnsxLDIwfV1bLip7MSwyMH1dQCp7MSwyMH1bLip7Miw2fV1bLip7MSwyfV0nLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmVlZHkgICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24ocGFzdGVkVmFsdWUsIG9wdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXN0ZWRWYWx1ZS5yZXBsYWNlKCdtYWlsdG86JywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yICA6IFwiWzAtOUEtWmEteiEjJCUmJyorLz0/Xl9ge3x9fi1dXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nICAgICA6ICdsb3dlcidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnB1dEV2ZW50czogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtLWNvcHknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1jb3B5LXRleHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItc2hhcmVfX2xpbmsnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGlucHV0IHNlbGVjdCB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LWZvY3VzLS1jb3B5Jykub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1Nob3cgUGFzc3dvcmRcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9IaWRlIFBhc3N3b3JkXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vRWRpdCBUZXh0IEZpZWxkXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWZpZWxkLWVkaXQnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0ICAgICAgPSAkKCcuanMtZmllbGQtZWRpdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0QnRuICAgPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2J0bicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0LnNob3coKS5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAnMTMnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItaW5wdXQnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItaW5wdXQtdGlwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ25vLWNsb3NlJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWluZm8gaXMtZXJyb3IgaXMtaW52YWxpZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLW1vYmlsZS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19maWVsZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSAgPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlICAgID0gJCh0aGlzKS5maW5kKCcuanMtbW9iaWxlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2VsZWN0OiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLW11bHRpcGxlJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFnczogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QuYmItc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0taWNvbicpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uICAgICAgOiBpZm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0ICAgICAgICAgOiBpZm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLXNlcnZpY2VzJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdCAgIDogdGltZUFuZFByaWNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LWJvcm4nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgYWxsb3dDbGVhciAgICAgICAgICAgICA6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0ljb24gbWVudHJvIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW1hZ2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdpbWFnZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1ldHJvLWljb24gbWV0cm8taWNvbi0tJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBmb250YXdlc29tZSBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpZm9ybWF0KGljb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxPcHRpb24gPSBpY29uLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3Bhbj48aSBjbGFzcz1cInNlbGVjdDJfX2ljb24nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdpY29uJykgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjwvaT4gJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uLnRleHQgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TZWxlY3QgQWRkIFByaWNlIFRpbWUgJiBQcmljZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZUFuZFByaWNlKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFRpbWUgID0gJChvcHQuZWxlbWVudCkuZGF0YSgndGltZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFByaWNlID0gJChvcHQuZWxlbWVudCkuZGF0YSgncHJpY2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0LnRleHQgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVGltZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQcmljZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdmb2N1cycsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3ROYXRpdmUgPSAkKCcuanMtc2VsZWN0LW5hdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciAgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9ICQodGhpcykuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbjpmaXJzdC1jaGlsZCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53cmFwKCc8bGFiZWwgY2xhc3M9XCJiYi1zZWxlY3RcIj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhpZGVZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFJlc2V0QnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29sb3JTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRjb2xvclNlbGVjdCA9ICQoJy5qcy1zZWxlY3QtLWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjb2xvclNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0LWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VhcmNoLWVuYWJsZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQgICA6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQgICA6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uICAgICAgOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0ICAgICAgICAgOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50ICAgICAgICAgOiAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbG9yIGJhbGwgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlCYWxsKGNvbG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkb3JpZ2luYWxPcHRpb24gPSBjb2xvci5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JCYWxsICAgICAgID0gJCgkb3JpZ2luYWxPcHRpb24pLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yLnRleHQubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fbGluZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9XCI+PC9zcGFuPjxwPiAke1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvci50ZXh0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA8L3A+PC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19iYWxsXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH0gXCI+IDwvc3Bhbj4gPC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93WWVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zZXQteWVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkeWVhclNlbGVjdCA9ICQoJy5qcy1zZWxlY3QtYm9ybi0tY2xlYXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdzZWxlY3QyOm9wZW5pbmcnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1ib3JuJykgPT09ICd5ZWFyJ1xyXG5cclxuICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRSZXNldEJ0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRhdGVTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1ib3JuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkYXRlU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAudGV4dCgnJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPicpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVTZWxlY3Rpb24ob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlUmVzdWx0KG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdFZhbCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgJHBob25lQ29kZUJveCA9ICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQtcGhvbmUtY29kZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHBob25lQ29kZUJveC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkcGhvbmVDb2RlQm94LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzKS5maW5kKCcuc2VsZWN0LXZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dCAgPSAkKHRoaXMpLmZpbmQoJy5iYi1pbnB1dF9faW5wdXQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQgICA6IHNlbGVjdENvZGVSZXN1bHQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBzZWxlY3RDb2RlU2VsZWN0aW9uLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudCAgIDogJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWlucHV0LS1zZWxlY3QtdmFsdWVcIj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvblNlbGVjdCA9ICRwYXJlbnQuZmluZCgnb3B0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0VmFsdWUgID0gJHBhcmVudC5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoY291bnRlcikudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLW1vYmlsZS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19maWVsZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSAgPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlICAgID0gJCh0aGlzKS5maW5kKCcuanMtbW9iaWxlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbWVudToge1xyXG5cclxuICAgICAgICAvL0hhbWJ1cmdlciBidG5cclxuXHJcbiAgICAgICAgaGFtYnVyZ2VyQnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX2FkZFN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL1doZW4gQ2xpY2sgT3V0c2lkZSBDbG9zZSBNZW51XHJcblxyXG4gICAgICAgIGNsaWNrT3VzaWRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LCAuanMtZGF0ZSwgLmRhdGVwaWNrZXIsIC5jYXJkLWluZm9fX3JlcXVlc3QsIC5jYXRhbG9nLWZpbHRlciwgLmpzLW1vYmlsZS1maWx0ZXItLW9wZW4sIC5qcy1iYi1hY2NvcmRlb24nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGVcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggQnRuIG9wZW4vY2xvc2VcclxuXHJcbiAgICAgICAgc2VhcmNoQnRuT3BlbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hCdG4gPSAkKCcuanMtbW9iaWxlLXNlYXJjaC1idG4nKTtcclxuXHJcbiAgICAgICAgICAgIHNlYXJjaEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZW1vdmVTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBvcHVwOiB7XHJcblxyXG4gICAgICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuXHJcbiAgICAgICAgcG9wdXBGYW5jeUJveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3MgICAgICAgIDogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXMgICAgICAgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlICAgICAgICAgICAgOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkOiB0cnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VzXCJdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZVwiXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnZmFuY3lib3gtY29udGFpbmVyLS1pbWFnZScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXIgIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlICAgOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja0NvbnRlbnQ6ICdjbG9zZScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja1NsaWRlICA6ICdjbG9zZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3MgICAgICAgIDogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoICAgICAgICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhciAgICAgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0biAgICAgICAgIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1cyAgICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVycyAgICAgICAgICA6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzICAgICAgICA6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b3VjaCAgICAgICAgICAgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc21hbGxCdG46IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBtb2RhbDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL0Zvcm0gV2hvIElzP1xyXG5cclxuICAgICAgICB3aG9JczogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtd2hvaXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgd2hvaXMgPSAkKHRoaXMpLmRhdGEoJ3dob2lzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gID0gJCgnI2F1dGgtZm9ybScpLmZpbmQoJy5mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdob2lzID09PSAnbWFzdGVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdob2lzID09PSAnc3R1ZGlvJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1zdHVkaW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1jbGllbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9EdW5hbWljbHkgY2hhbmdlIGZvcm0gdGl0bGVcclxuXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENhdGFsb2dcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IGNhdGFsb2cgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXRhbG9nLm1hcFRvZ2dsZSgpO1xyXG4gICAgICAgIGNhdGFsb2cuYnRuRmlsdGVyT3BlbigpO1xyXG4gICAgICAgIGNhdGFsb2cuYnRuU2hvd0NhdGFsb2coKTtcclxuICAgICAgICBjYXRhbG9nLmJ0blNob3dNYXAoKTtcclxuICAgICAgICBjYXRhbG9nLnN0aWNreUZpbHRlcigpO1xyXG4gICAgICAgIGNhdGFsb2cuZmlsdGVyQ2F0ZWdvcnkoKTtcclxuICAgICAgICBjYXRhbG9nLm1vdmVCbG9ja3MoKTtcclxuICAgICAgICBjYXRhbG9nLmlmUGFnZUNhdGFsb2coKTtcclxuICAgIH0sXHJcbiAgICAvL0NhdGFsb2cgbWFwIFRvZ2dsZVxyXG4gICAgbWFwVG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2F0YWxvZy0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwLS1zaG93JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctLXNob3cnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CdG4gZmlsdGVyIG9wZW5cclxuICAgIGJ0bkZpbHRlck9wZW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtZmlsdGVyLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXRhbG9nRmlsdGVyID0gJCgnLmNhdGFsb2ctZmlsdGVyJyk7XHJcbiAgICAgICAgICAgIGlmIChjYXRhbG9nRmlsdGVyLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIGNhdGFsb2dGaWx0ZXIucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXRhbG9nRmlsdGVyLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CdG4gc2hvdyBjYXRhbG9nXHJcbiAgICBidG5TaG93Q2F0YWxvZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXNob3ctLWxpc3QnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgJCgnLmNhdGFsb2ctY29udGVudF9faW5uZXInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1tYXAnKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CdG4gc2hvdyBtYXAgLSBoaWRlIGNhdGFsb2dcclxuICAgIGJ0blNob3dNYXA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1zaG93LS1tYXAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICQoJy5jYXRhbG9nLWNvbnRlbnRfX2lubmVyJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLXN0aWt5LWJsb2NrJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwJykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU3RpY2t5IEZpbHRlciBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcclxuICAgIHN0aWNreUZpbHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreS1ibG9jaycsIHtcclxuICAgICAgICAgICAgICAgIHRvcFNwYWNpbmc6IDExMCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuY2F0YWxvZy1jb250ZW50JyxcclxuICAgICAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLmNhdGFsb2ctZmlsdGVyX19pbm5lcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vZmlsdGVyIGNhdGVnb3J5XHJcbiAgICBmaWx0ZXJDYXRlZ29yeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19saW5rJylcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeS0tcmVzZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrIGluIG1lZGlhIHNjcmVlblxyXG4gICAgbW92ZUJsb2NrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAkKCcuanMtdmlldy10b2dnbGUnKS5pbnNlcnRCZWZvcmUoJy5jYXRhbG9nX19pbm5lcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0lmIHBhZ2UgY2F0YWxvZyBmaWx0ZXIgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWZQYWdlQ2F0YWxvZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLWNhdGFsb2cnKSkge1xyXG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICRtYWluLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2F0YWxvZy1maWx0ZXJfX2JvZHknKS5hZGRDbGFzcyhcclxuICAgICAgICAgICAgICAgICAgICAnYmItYWNjb3JkZW9uIGJiLWFjY29yZGVvbi0tb3RoZXIganMtYmItYWNjb3JkZW9uJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItYWNjb3JkZW9uX19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fdGl0bGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuY2F0YWxvZy1maWx0ZXJfX3RpdGxlX2NhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1hY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbTpsdCgyKScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhcmRcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IGNhcmQgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJkLnNsaWRlcigpO1xyXG4gICAgICAgIGNhcmQuY2FyZFNjcm9sbHNweSgpO1xyXG4gICAgICAgIGNhcmQuY2FyZFN0aWNreSgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZFJlcXVlc3RUb2dnbGUoKTtcclxuICAgICAgICAgICAgY2FyZC5jYXJkTW92ZUl0ZW1zKCk7XHJcblxyXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShjYXJkLmNhcmRNb3ZlSXRlbXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTbGlkZXJcclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXNsaWRlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgJGNhcmRTbGlkZXIgPSAkKCcuanMtY2FyZC1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgICAgICRjYXJkU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgcmVxdWVzdCBzaG93IC8gaGlkZVxyXG4gICAgY2FyZFJlcXVlc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYXJkSW5mb1JlcXVlc3QgPSAkKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrcyB3aGVuIHdpbmRvdyB3aWR0aCA8IDc2OFxyXG4gICAgY2FyZE1vdmVJdGVtczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtdGl0bGUnKS5pbnNlcnRBZnRlcignLmNhcmQtZ2FsbGFyeV9fd3JhcCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWFib3V0JykuaW5zZXJ0QmVmb3JlKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1pbmZvLWNhdGVnb3J5JykuYXBwZW5kVG8oJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93JykucHJlcGVuZFRvKCcuY2FyZC1pbmZvX190b3AnKTtcclxuICAgICAgICAkKCcuY2FyZC1pbmZvX19pbm5lcicpLmluc2VydEFmdGVyKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtbW92ZS1jYXJkLXBvbGljeScpLmFwcGVuZFRvKCcuY2FyZC1yZXF1ZXN0LWZvcm0nKTtcclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2Nyb2xsc3B5XHJcbiAgICBjYXJkU2Nyb2xsc3B5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLXNjcm9sbHNweScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC0xMDAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC02MCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhcmRTdGlja3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zdGlja3knKS5sZW5ndGggJiYgJCgnLmpzLWNhcmQtZml4ZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrID0gJCgnLmpzLWNhcmQtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9ja09mZnNldCA9IHN0aWNreUJsb2NrLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2sgPSAkKCcuanMtY2FyZC1maXhlZCcpO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9ja09mZnNldCA9IGZpeGVkQmxvY2sub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRDb250ZW50ID0gJCgnLmpzLWNhcmQtY29udGVudC1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51ID0gJCgnLmpzLWNhcmQtbWVudScpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJjYXJkLW1lbnVfX2Nsb25lXCI+JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICQoJy5qcy1jYXJkLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKSlcclxuICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihjYXJkTWVudSlcclxuICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudU9mZnNldCA9IGNhcmRNZW51Lm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suaGVpZ2h0KCkgPCBjYXJkQ29udGVudC5oZWlnaHQoKSAmJlxyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjhcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhDYXJkVXNlckluZm8oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZml4Q2FyZFVzZXJJbmZvKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtMSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMzBcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FyZE1lbnUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTWVudUZpeGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmRNZW51Rml4ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID49IGNhcmRNZW51T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51LnJlbW92ZUF0dHIoJ3N0eWxlJykucmVtb3ZlQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNYWluXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBNYWluID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlQmxvY2tzKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlUHJvbW8uaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIG1vdmVCbG9ja3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgJCgnLmJiLWJsb2cnKS5pbnNlcnRBZnRlcignLmJiLWNhdGVnb3J5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhZ2VQcm9tbzoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci0tcHJvbW8nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIE1haW4ucGFnZVByb21vLnNsaWRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgIE1haW4ucGFnZVByb21vLm1vdmVCbG9ja3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci0tcHJvbW8nKVxyXG4gICAgICAgICAgICAgICAgLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJylcclxuICAgICAgICAgICAgICAgIC5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93ICAgICA6ICcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93ICAgICA6ICcuYmItc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzICAgICAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlICAgICAgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdyAgOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkICAgICAgICAgOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQgOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5ICAgICAgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHMgICAgICAgICAgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmUgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzICA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3cgIDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93ICA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW92ZUJsb2NrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1wcm9tby1mb3JtJykuaW5zZXJ0QWZ0ZXIoJy5wcm9tb19fd3JhcCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKEJhc2UuaW5pdCgpKTtcclxuICAgICQoTWFpbi5pbml0KCkpO1xyXG4gICAgJChjYXRhbG9nLmluaXQoKSk7XHJcbiAgICAkKGNhcmQuaW5pdCgpKTtcclxufSk7XHJcblxyXG4vKlxyXG4qKiogZnVuY3Rpb25zLmpzXHJcbiovXHJcbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdiYi1wdXNoVXAnKTtcclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgICAgICdiYi1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXHJcbiAgICApO1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItcHVzaFVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLmJiLXB1c2hVcCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLmJiLXB1c2hVcCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vU2V0IElucHV0IERhdGUgVmFsdWVcclxuZnVuY3Rpb24gc2V0SW5wdXREYXRlKHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgbGV0IGhveSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZCA9IGhveS5nZXREYXRlKCksXHJcbiAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICB5ID0gaG95LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF0YTtcclxuXHJcbiAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgZCA9ICcwJyArIGQ7XHJcbiAgICB9XHJcbiAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgbSA9ICcwJyArIG07XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gX2RhdC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgIF9kYXRbaV0udmFsdWUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KGJsb2NrKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4iXX0=
