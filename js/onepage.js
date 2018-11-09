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
                                                                                                                breakpoint: 481,
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiZHJvcGRvd24iLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwidGFicyIsImZpbmQiLCJpcyIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJyZW1vdmVBdHRyIiwicHJvcCIsIiRhY2NvcmRlb24iLCJzbGlkZVVwIiwiZWFjaCIsInNsaWRlRG93biIsIiRwYXJlbnQiLCJjbG9zZXN0IiwiJGl0ZW0iLCJkYXRhIiwibGlzdCIsIndvcmtMaXN0IiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCIkaW5wdXRJY29uIiwiJGJ0blJlc2V0IiwiJGhpbnQiLCJidG4iLCIkYnRuRGF0YSIsIiRpbnB1dFZhbCIsInZhbCIsImF0dHIiLCJzaG93Iiwibm90IiwiaGlkZSIsImZpbHRlciIsImZhZGVPdXQiLCJmYWRlSW4iLCJ0ZXh0IiwidXNlclBob25lIiwicGhvbmUiLCJjaGFuZ2VDaXR5VGl0bGUiLCIkc2xpZGVyIiwiJHNsaWRzIiwiJHNsaWRlIiwiJHByZXZBcnJvdyIsIiRuZXh0QXJyb3ciLCJzbGljayIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJpbmZpbml0ZSIsImFycm93cyIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiJGNhdGFsb2dJdGVtU2xpZGVyIiwiX3RoaXMiLCIkc2xpZGVzIiwiJHNsaWRlckRvdHMiLCJldmVudCIsInByZXBlbmQiLCJhcHBlbmQiLCJzbGlkZUNvdW50IiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwiaSIsImh0bWwiLCJsYXp5TG9hZCIsInN0b3BQcm9wYWdhdGlvbiIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwidGV4dFN1Y2Nlc3MiLCJ0ZXh0RXJyb3IiLCJwdXNoVXAiLCJzdGF0dXMiLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsIm1lc3NhZ2UiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCIkZHJvcGRvd24iLCJyZW5kZXIiLCJzaG93SGlkZSIsIiRidG5DbG9zZSIsIiRkcm9wZG93bk92ZXJsYXkiLCIkZHJvcGRvd25MaXN0IiwiYXBwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsIiRidG5GbG9hdGluZyIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwiaW5wdXRFdmVudHMiLCJpbnB1dE1hc2siLCJtb2JpbGVTZWxlY3QiLCJpbnB1dG1hc2siLCJtYXNrIiwiZ3JlZWR5Iiwib25CZWZvcmVQYXN0ZSIsInBhc3RlZFZhbHVlIiwib3B0cyIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImRlZmluaXRpb25zIiwidmFsaWRhdG9yIiwiY2FyZGluYWxpdHkiLCJjYXNpbmciLCJpbnB1dCIsImV4ZWNDb21tYW5kIiwibmV4dCIsInByZXYiLCJmaWVsZEVkaXQiLCJmaWVsZEVkaXRJbnB1dCIsImZpZWxkRWRpdEJ0biIsImZpZWxkRWRpdFRleHQiLCJibHVyIiwidHJpbSIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwia2V5cHJlc3MiLCJrZXlDb2RlIiwiZW5kIiwiJHNlbGVjdCIsIiRpbnB1dFNlYXJjaCIsIiRyZXN1bHRJdGVtIiwic2VsZWN0MiIsInRhZ3MiLCJ0ZW1wbGF0ZVJlc3VsdCIsImFkZFVzZXJQaWMiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsImlmb3JtYXQiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsInRpbWVBbmRQcmljZSIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsImFkZFJlc2V0QnRuIiwicGhvbmVDb2RlIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJkcm9wZG93blBhcmVudCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJHllYXJTZWxlY3QiLCIkZGF0ZVNlbGVjdCIsInNlbGVjdENvZGVTZWxlY3Rpb24iLCJvcHRWYWwiLCJzZWxlY3RDb2RlUmVzdWx0IiwiY291bnRyeSIsIiRwaG9uZUNvZGVCb3giLCIkaW5wdXQiLCJmb2N1cyIsIm9wdGlvblNlbGVjdCIsInNlbGVjdFZhbHVlIiwiZXEiLCJjaGFuZ2UiLCJjb3VudGVyIiwic2VsZWN0ZWRJbmRleCIsImFkZEZvY3VzIiwicmVtb3ZlRm9jdXMiLCJfcmVtb3ZlU3R5bGUiLCJfYWRkU3R5bGUiLCJzZWFyY2hCdG4iLCJmYW5jeWJveCIsImJhc2VDbGFzcyIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaW1hZ2UiLCJwcmVsb2FkIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJ0b29sYmFyIiwibW9iaWxlIiwiY2xpY2tDb250ZW50IiwiY2xpY2tTbGlkZSIsInRvdWNoIiwic21hbGxCdG4iLCJ3aG9pcyIsImZvcm0iLCJjYXJkIiwiY2FyZFNjcm9sbHNweSIsImNhcmRTdGlja3kiLCJjYXJkUmVxdWVzdFRvZ2dsZSIsImNhcmRNb3ZlSXRlbXMiLCIkY2FyZFNsaWRlciIsImNhcmRJbmZvUmVxdWVzdCIsImluc2VydEJlZm9yZSIsInByZXBlbmRUbyIsInNjcm9sbHNweSIsImZpeENhcmRVc2VySW5mbyIsInNjcm9sbCIsInN0aWNreUJsb2NrT2Zmc2V0IiwiZml4ZWRCbG9jayIsIm91dGVySGVpZ2h0IiwiZml4ZWRCbG9ja09mZnNldCIsInN0aWNreUJsb2NrIiwicG9zaXRpb24iLCJib3R0b20iLCJjYXJkTWVudUZpeGVkIiwiY2FyZE1lbnVPZmZzZXQiLCJjYXJkTWVudUNsb25lIiwiY2FyZE1lbnUiLCJyaWdodCIsInpJbmRleCIsImNhcmRDb250ZW50IiwiaGVpZ2h0Iiwib25lcGFnZSIsInByb21vIiwicmVnaXN0cmF0aW9uIiwiaGVyb0FuaW1hdGUiLCJtb2JpbGVTbGlkZXIiLCJjb3VudGVyU3BpbiIsInRsIiwiVGltZWxpbmVNYXgiLCJmcm9tVG8iLCJ5Iiwib3BhY2l0eSIsInNjcm9sbGVkIiwic2NyZWVuIiwiJHNwaW4iLCJDb3VudGVyIiwiZHVyYXRpb24iLCJlYXNpbmciLCJzdGVwIiwibm93IiwiTWF0aCIsImNlaWwiLCJhbmltYXRpb24iLCJzbGlkZXJzIiwieCIsImZhZGUiLCJjZW50ZXJNb2RlIiwiY2VudGVyUGFkZGluZyIsImJsb2NrUmVwbGFjZSIsImF1dGhGb3JtIiwibW92ZUZvcm0iLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwibWF4IiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssV0FBV0wsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU0sUUFBUU4sRUFBRSxPQUFGLENBQWQ7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUSxRQUFRUixFQUFFLFVBQUYsQ0FBZDtBQUNBLElBQU1TLGFBQWFULEVBQUUsZ0JBQUYsQ0FBbkI7QUFDQSxJQUFNVSxhQUFhVixFQUFFLGtCQUFGLENBQW5COztBQUVBOzs7Ozs7Ozs7O0FBWUEsSUFBTVcsT0FBTzs7QUFFVEMsc0JBQU0sZ0JBQVc7O0FBRWIscUNBQUtDLGVBQUw7O0FBRUEscUNBQUtDLFFBQUwsQ0FBY0YsSUFBZDs7QUFFQSxxQ0FBS0csU0FBTDs7QUFFQSxxQ0FBS0MsUUFBTDs7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RXFGLGVBQUY7QUFDSCxpQkFKRDtBQUtIIiwiZmlsZSI6Im9uZXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXHJcbmNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbmNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xyXG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcclxuY29uc3QgJHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xyXG5jb25zdCAkbWFpbiA9ICQoJy5tYWluJyk7XHJcbmNvbnN0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcclxuY29uc3QgJG1lbnUgPSAkKCcuanMtbWVudScpO1xyXG5jb25zdCAkbmF2TW9iaWxlID0gJCgnLmpzLW1vYmlsZS1uYXYnKTtcclxuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuXHJcbi8qKlxyXG5cclxuICogQmFzZS5qc1xyXG5cclxuICpcclxuXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcblxyXG4gKi9cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWNjb3JkZW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tib3goKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5yYWRpb0J0bigpO1xyXG5cclxuICAgICAgICB0aGlzLnRhYigpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmlucHV0TWFzaygpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmlucHV0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdFRvZ2dsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNvcHlUZXh0KCk7XHJcblxyXG4gICAgICAgIHRoaXMub3duZXJQaG9uZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUNpdHkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXRhbG9nSXRlbVNsaWRlcigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blB1c2goKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC53aG9JcygpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXIoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5oYW1idXJnZXJCdG4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5jbGlja091c2lkZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LnNlYXJjaEJ0bk9wZW5DbG9zZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TdG9wIGRyYWcgSW1nXHJcblxyXG4gICAgICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2Nyb2xsQmFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyM1ODVhNTknLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgYm94em9vbSAgICAgICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB2ZXJnZSAgICAgICAgICAgICA6IDUwMCxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aCAgICAgICA6ICcycHgnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlciAgICAgIDogJ25vbmUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5vbignbW91c2VvdmVyIG1vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcblxyXG4gICAgcmVtb3ZlUHJlbG9hZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyAkKCdib2R5JykuYWRkQ2xhc3MoJ2xvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIH0sIDUwMCk7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0luaXQgYmFzZSB0YWJzIGpRIFVpIFRhYnNcclxuXHJcbiAgICB0YWI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWJiLXRhYicpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLXRhYicpLnRhYnMoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DdXN0b20gY2hlY2JveCAmIGNoZWNrYm94UHNldWRvXHJcblxyXG4gICAgY2hlY2tib3g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LXNlbGVjdC1hbGwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSByYWRpb0J0blxyXG5cclxuICAgIC8vIHJhZGlvQnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyAgICAgbGV0ICRyYWRpbyA9ICQoJy5qcy1iYi1yYWRpbycpO1xyXG5cclxuXHJcblxyXG4gICAgLy8gICAgIC8vQkIgcmFkaW9cclxuXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItcmFkaW8nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJ2lucHV0Jyk7XHJcblxyXG4gICAgLy8gICAgICAgICBpZiAoJGlucHV0LmlzKCc6Y2hlY2tlZCcpKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAkcmFkaW8ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuXHJcbiAgICBhY2NvcmRlb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJGFjY29yZGVvbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1hY2NvcmRlb24gLmJiLWFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbihcclxuXHJcbiAgICAgICAgICAgIGVcclxuXHJcbiAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpdGVtICAgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWxpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RUb2dnbGUoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgICAgID0gJCgnLmpzLWxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tib3ggPSBsaXN0LmZpbmQoJy5qcy1iYi1jaGVja2JveCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrTGlzdCA9IGxpc3QuZmluZCgnLmpzLWxpc3QtdG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja2JveC5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdFRvZ2dsZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NvcHkgdGV4dCBjbGljayBsaW5rXHJcblxyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgY2IgPSBuZXcgQ2xpcGJvYXJkKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG5cclxuICAgICAgICAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ICAgID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYm94Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0blJlc2V0ICA9ICRwYXJlbnQuZmluZCgnLmpzLWlucHV0LS1jbGVhcicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRoaW50ICAgICAgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ICAgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuICAgICAgID0gJHBhcmVudC5maW5kKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuRGF0YSAgPSAkKHRoaXMpLmRhdGEoJ2NsaXBib2FyZC10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXRWYWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hdHRyKCdkYXRhLWNsaXBib2FyZC10ZXh0JywgJGJ0bkRhdGEgKyAkaW5wdXRWYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLnZhbCgnJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X19pY29uJylcclxuXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZUluKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuXHJcbiAgICBvd25lclBob25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLXVzZXItcGhvbmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKTsnKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KCQodGhpcykuZGF0YSgncGhvbmUtaGlkZW4nKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdXNlci1waG9uZS0tc2hvdycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXVzZXItcGhvbmUnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdXNlclBob25lXHJcblxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KHBob25lKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NpdHkgc2VsZWN0XHJcblxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5ICAgICAgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHlUaXRsZSA9IGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X190aXRsZSBzcGFuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VDaXR5VGl0bGUudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcblxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtYmItc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZHMgICAgID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlICAgICA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHByZXZBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJG5leHRBcnJvdyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdyAgICAgOiAkbmV4dEFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93ICAgICA6ICRwcmV2QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheSAgICAgIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQgOiA0MDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQgICAgICAgICA6IDE1MDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3cgIDogMyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGUgICAgICA6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3MgICAgICAgIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHMgICAgICAgICAgOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyAgOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzICAgICAgICA6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3MgICAgICA6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NhdGFsb2cgSXRlbSBTbGlkZXJcclxuXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRjYXRhbG9nSXRlbVNsaWRlciA9ICQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjYXRhbG9nSXRlbVNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyAgICAgICA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgICAgID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlICAgICAgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlMb2FkICAgICAgOiAnb25kZW1hbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQgICAgICAgICA6IDQwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdyAgOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3MgICAgICAgIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHMgICAgICAgICAgOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyAgOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1pdGVtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uczoge1xyXG5cclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG5cclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG5cclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYICAgICAgICAgPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxZICAgICAgICAgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wIDogcmVsWSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWxYXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAnLmpzLWJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggICAgICAgICA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgICAgICAgICA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgOiByZWxZLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBzdGF0dXMgYW5pbWF0ZVxyXG5cclxuICAgICAgICBidG5TdGF0dXNBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGljaysrO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3VjY2VzcyA9ICQodGhpcykuZGF0YSgnbWVzc2FnZS1zdWNjZXNzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRFcnJvciAgID0gJCh0aGlzKS5kYXRhKCdtZXNzYWdlLWVycm9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtZXJyb3InKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICA6IHRleHRFcnJvcixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnZXJyb3InXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0U3VjY2Vzc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAyNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1yZWFkeScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2sgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9mbG9hdGluZyBidG4gYW5pbWF0aW5cclxuXHJcbiAgICAgICAgYnRuRmxvYXRpbmc6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRidG4gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJ1biAgPSB0cnVlO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoISRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpLmNzcygncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9Ce0LHRgNCw0LHQvtGC0YfQuNC6INC00L7QsdCw0LLQu9GP0LXRgiDQutC70LDRgdGB0Ysg0LfQsNGC0LXQvCDQvtGC0L/QuNGB0YvQstCw0YLQtdGB0Y8g0L7RgiDRgdC+0LHRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgbGV0IGhlbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLm9mZihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v0JDQvdC40LzQsNGG0LjRjyDQt9Cw0LrRgNGL0YLQuNGPXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlQW5pbWF0aW9uKGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZWwub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXJ1bikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCAnLmpzLWJ0bi1mbG9hdGluZycsIGhlbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCd6LWluZGV4JywgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bklkID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcubWQtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuSWQudHJpZ2dlcignY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLmpzLWJ0bi1mbG9hdGluZyAuYnRuLWZsb2F0aW5nX19saW5rJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZW1vdmVBbmltYXRpb24oJCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL9Ca0LvQuNC6INCyINC90LUg0LrQvdC+0L/QutC4INGB0LrRgNGL0LLQsNC10YIg0L7QstC10YDQu9C10Lkg0Lgg0LrQvdC+0L/QutC4XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5vdmVybGF5JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcyhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdmYS1sZWF2ZS1hY3RpdmUnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzICA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBwdXNoVXAoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICA6IG1lc3NhZ2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIHRvcFxyXG5cclxuICAgICAgICBidG5Hb1RvcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDgwMFxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIGVsZW1lbnRcclxuXHJcbiAgICAgICAgYnRuR29UbzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvdG8nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uICA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyb3Bkb3duOiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duLmJiLWRyb3Bkb3duLS10cmFuc2Zvcm0nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJiLWRyb3Bkb3duX19jbG9zZSBqcy1iYi1kcm9wZG93bi0tY2xvc2VcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93bk92ZXJsYXkgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fb3ZlcmxheVwiPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duTGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkNsb3NlLmFwcGVuZFRvKCRkcm9wZG93bkxpc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25PdmVybGF5Lmluc2VydEFmdGVyKCRkcm9wZG93bkxpc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd25MaXN0LmZpbmQoJy5pbmZvLWJsb2NrX19pY29uJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dIaWRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd24gICAgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0bkZsb2F0aW5nID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuaXMoJy5iYi1kcm9wZG93bl9fb3ZlcmxheScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY2xvc2VzdCgnLmJiLWRyb3Bkb3duX19saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2JiLWRyb3Bkb3duLS10cmFuc2Zvcm0nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24gLmluZm8tYmxvY2tfX2xpbmsnLFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJy5pcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWRyb3Bkb3duLS1jbG9zZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1iYi1kcm9wZG93bicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0czoge1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuXHJcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtdGltZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTo5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29kZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvZGUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ljk5Ljk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvbmZpcm0tbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZW1haWwtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1lbWFpbC1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKnsxLDIwfVsuKnsxLDIwfV1bLip7MSwyMH1dWy4qezEsMjB9XUAqezEsMjB9Wy4qezIsNn1dWy4qezEsMn1dJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5ICAgICAgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uKHBhc3RlZFZhbHVlLCBvcHRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXN0ZWRWYWx1ZSA9IHBhc3RlZFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFzdGVkVmFsdWUucmVwbGFjZSgnbWFpbHRvOicsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqJzoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvciAgOiBcIlswLTlBLVphLXohIyQlJicqKy89P15fYHt8fX4tXVwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZyAgICAgOiAnbG93ZXInXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtY29weS10ZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLXNoYXJlX19saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9DbGljayBpbnB1dCBzZWxlY3QgdmFsdWVcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC1mb2N1cy0tY29weScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0VkaXQgVGV4dCBGaWVsZFxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1maWVsZC1lZGl0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdCAgICAgID0gJCgnLmpzLWZpZWxkLWVkaXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdEJ0biAgID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19idG4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dC5zaG93KCkuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYmx1cihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5rZXlwcmVzcyhmdW5jdGlvbihldmVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gJzEzJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLWlucHV0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWlucHV0LXRpcCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1pbmZvIGlzLWVycm9yIGlzLWludmFsaWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSAgICA9ICQodGhpcykuZmluZCgnLmpzLW1vYmlsZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW9iaWxlLXNlbGVjdF9fcmVzdWx0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjdDoge1xyXG5cclxuICAgICAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLWljb24nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbiAgICAgIDogaWZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdCAgICAgICAgIDogaWZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1zZXJ2aWNlcycpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiB0aW1lQW5kUHJpY2UsXHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQgICA6IHRpbWVBbmRQcmljZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC1ib3JuJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG5cclxuICAgICAgICAgICAgICAgIGFsbG93Q2xlYXIgICAgICAgICAgICAgOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIG1lbnRybyBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0ljb24gZm9udGF3ZXNvbWUgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaWZvcm1hdChpY29uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsT3B0aW9uID0gaWNvbi5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4+PGkgY2xhc3M9XCJzZWxlY3QyX19pY29uJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvcmlnaW5hbE9wdGlvbikuZGF0YSgnaWNvbicpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj48L2k+ICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vU2VsZWN0IEFkZCBQcmljZSBUaW1lICYgUHJpY2VcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRpbWVBbmRQcmljZShvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxUaW1lICA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxQcmljZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3ByaWNlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdC50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRpbWUgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2UgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgID0gJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSAkKHRoaXMpLmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb246Zmlyc3QtY2hpbGQnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93WWVhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oaWRlWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRSZXNldEJ0bigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5waG9uZUNvZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbG9yU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkY29sb3JTZWxlY3QgPSAkKCcuanMtc2VsZWN0LS1jb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkY29sb3JTZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLnNlbGVjdC1jb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NlYXJjaC1lbmFibGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0ICAgOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50ICAgOiAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbiAgICAgIDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdCAgICAgICAgIDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudCAgICAgICAgIDogJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2xvciBiYWxsIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpQmFsbChjb2xvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJG9yaWdpbmFsT3B0aW9uID0gY29sb3IuZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yQmFsbCAgICAgICA9ICQoJG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdjb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvci50ZXh0Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2xpbmVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfVwiPjwvc3Bhbj48cD4gJHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IudGV4dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPC9wPjwvZGl2PmBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fYmFsbFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9IFwiPiA8L3NwYW4+IDwvZGl2PmBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd1llYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtc2V0LXllYXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoaWRlWWVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHllYXJTZWxlY3QgPSAkKCcuanMtc2VsZWN0LWJvcm4tLWNsZWFyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignc2VsZWN0MjpvcGVuaW5nJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vZmYoJ3NlbGVjdDI6b3BlbmluZycpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoKSA9PSAnJyAmJlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtYm9ybicpID09PSAneWVhcidcclxuXHJcbiAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJykuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkUmVzZXRCdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkYXRlU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtYm9ybicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZGF0ZVNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT4nKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaG9uZUNvZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DaGFuZ2Ugc2VsZWN0IHJlc3VsdHMgdG8gb3B0aW9uIHZhbHVlXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlU2VsZWN0aW9uKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICsgb3B0VmFsICsgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9BZGQgY2l0eSBuYW1lIHRvIG9wdGlvblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVJlc3VsdChvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRyeSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2NvdW50cnknKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0VmFsICA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRWYWwgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0ICRwaG9uZUNvZGVCb3ggPSAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0LXBob25lLWNvZGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHBob25lQ29kZUJveC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnNlbGVjdC12YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXQgID0gJCh0aGlzKS5maW5kKCcuYmItaW5wdXRfX2lucHV0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0ICAgOiBzZWxlY3RDb2RlUmVzdWx0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogc2VsZWN0Q29kZVNlbGVjdGlvbixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQgICA6ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1pbnB1dC0tc2VsZWN0LXZhbHVlXCI+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25TZWxlY3QgPSAkcGFyZW50LmZpbmQoJ29wdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdFZhbHVlICA9ICRwYXJlbnQuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmJiLWlucHV0LS1zZWxlY3QtdmFsdWUnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcSgwKS52YWwoKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3QuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gJCh0aGlzKVswXS5zZWxlY3RlZEluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKGNvdW50ZXIpLnZhbCgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKDk5OSkgOTk5LTk5LTk5J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQub24oJ2ZvY3VzJywgYWRkRm9jdXMpLm9uKCdibHVyJywgcmVtb3ZlRm9jdXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6b3BlbicsIGFkZEZvY3VzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOmNsb3NlJywgcmVtb3ZlRm9jdXMpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZEZvY3VzKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRm9jdXMoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSAgICA9ICQodGhpcykuZmluZCgnLmpzLW1vYmlsZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW9iaWxlLXNlbGVjdF9fcmVzdWx0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG1lbnU6IHtcclxuXHJcbiAgICAgICAgLy9IYW1idXJnZXIgYnRuXHJcblxyXG4gICAgICAgIGhhbWJ1cmdlckJ0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkaGFtYnVyZ2VyLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb24nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9hZGRTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtbW9iaWxlLW5hdi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9XaGVuIENsaWNrIE91dHNpZGUgQ2xvc2UgTWVudVxyXG5cclxuICAgICAgICBjbGlja091c2lkZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuanMtbW9iaWxlLW5hdiwgLmpzLWRhdGUsIC5kYXRlcGlja2VyLCAuY2FyZC1pbmZvX19yZXF1ZXN0LCAuY2F0YWxvZy1maWx0ZXIsIC5qcy1tb2JpbGUtZmlsdGVyLS1vcGVuLCAuanMtYmItYWNjb3JkZW9uJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKS5sZW5ndGhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm92ZXJsYXknLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIEJ0biBvcGVuL2Nsb3NlXHJcblxyXG4gICAgICAgIHNlYXJjaEJ0bk9wZW5DbG9zZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VhcmNoQnRuID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtYnRuJyk7XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2FkZFN0eWxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcmVtb3ZlU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBwb3B1cDoge1xyXG5cclxuICAgICAgICAvL01vZGFsIEZhbmN5Qm94IDMgaHR0cHM6Ly9mYW5jeWFwcHMuY29tL2ZhbmN5Ym94LzMvXHJcblxyXG4gICAgICAgIHBvcHVwRmFuY3lCb3g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94XScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94XScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzICAgICAgICA6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzICAgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZSAgICAgICAgICAgIDoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZDogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlc1wiXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2ZhbmN5Ym94LWNvbnRhaW5lci0taW1hZ2UnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyICA6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1vYmlsZSAgIDoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tDb250ZW50OiAnY2xvc2UnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tTbGlkZSAgOiAnY2xvc2UnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzICAgICAgICA6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b3VjaCAgICAgICAgICAgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXIgICAgICAgICAgOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc21hbGxCdG4gICAgICAgICA6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXMgICAgICAgIDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnMgICAgICAgICAgOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzcyAgICAgICAgOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2ggICAgICAgICAgICA6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNtYWxsQnRuOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuXHJcbiAgICAgICAgd2hvSXM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXdob2lzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmb3JtICA9ICQoJyNhdXRoLWZvcm0nKS5maW5kKCcuZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aG9pcyA9PT0gJ21hc3RlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtbWFzdGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aG9pcyA9PT0gJ3N0dWRpbycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtc3R1ZGlvJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtY2xpZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRHVuYW1pY2x5IGNoYW5nZSBmb3JtIHRpdGxlXHJcblxyXG4gICAgICAgIGNoYW5nZUZvcm1UaXRsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWZvcm0tdGl0bGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDYXJkXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBjYXJkID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2FyZC5zbGlkZXIoKTtcclxuICAgICAgICBjYXJkLmNhcmRTY3JvbGxzcHkoKTtcclxuICAgICAgICBjYXJkLmNhcmRTdGlja3koKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRSZXF1ZXN0VG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZE1vdmVJdGVtcygpO1xyXG5cclxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoY2FyZC5jYXJkTW92ZUl0ZW1zKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2xpZGVyXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zbGlkZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0ICRjYXJkU2xpZGVyID0gJCgnLmpzLWNhcmQtc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAkY2FyZFNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMjAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIHJlcXVlc3Qgc2hvdyAvIGhpZGVcclxuICAgIGNhcmRSZXF1ZXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2FyZEluZm9SZXF1ZXN0ID0gJCgnLmNhcmQtaW5mb19fcmVxdWVzdCcpO1xyXG5cclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbmZvUmVxdWVzdC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbmZvUmVxdWVzdC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vTW92ZSBibG9ja3Mgd2hlbiB3aW5kb3cgd2lkdGggPCA3NjhcclxuICAgIGNhcmRNb3ZlSXRlbXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXRpdGxlJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWdhbGxhcnlfX3dyYXAnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1hYm91dCcpLmluc2VydEJlZm9yZSgnLmNhcmQtYWRyZXNzJyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtaW5mby1jYXRlZ29yeScpLmFwcGVuZFRvKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0tc2hvdycpLnByZXBlbmRUbygnLmNhcmQtaW5mb19fdG9wJyk7XHJcbiAgICAgICAgJCgnLmNhcmQtaW5mb19faW5uZXInKS5pbnNlcnRBZnRlcignLmNhcmQtYWRyZXNzJyk7XHJcbiAgICAgICAgJCgnLmpzLW1vdmUtY2FyZC1wb2xpY3knKS5hcHBlbmRUbygnLmNhcmQtcmVxdWVzdC1mb3JtJyk7XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNjcm9sbHNweVxyXG4gICAgY2FyZFNjcm9sbHNweTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1zY3JvbGxzcHknKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2Nyb2xsc3B5Jykuc2Nyb2xsc3B5KHsgb2Zmc2V0OiAtMTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2Nyb2xsc3B5Jykuc2Nyb2xsc3B5KHsgb2Zmc2V0OiAtNjAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYXJkU3RpY2t5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc3RpY2t5JykubGVuZ3RoICYmICQoJy5qcy1jYXJkLWZpeGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9jayA9ICQoJy5qcy1jYXJkLXN0aWNreScpO1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2tPZmZzZXQgPSBzdGlja3lCbG9jay5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrID0gJCgnLmpzLWNhcmQtZml4ZWQnKTtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2tPZmZzZXQgPSBmaXhlZEJsb2NrLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkQ29udGVudCA9ICQoJy5qcy1jYXJkLWNvbnRlbnQtZml4ZWQnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudSA9ICQoJy5qcy1jYXJkLW1lbnUnKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51Q2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiY2FyZC1tZW51X19jbG9uZVwiPicpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAkKCcuanMtY2FyZC1tZW51Jykub3V0ZXJIZWlnaHQodHJ1ZSkpXHJcbiAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoY2FyZE1lbnUpXHJcbiAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVPZmZzZXQgPSBjYXJkTWVudS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmhlaWdodCgpIDwgY2FyZENvbnRlbnQuaGVpZ2h0KCkgJiZcclxuICAgICAgICAgICAgICAgICQod2luZG93KS53aWR0aCgpID4gNzY4XHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZml4Q2FyZFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpeENhcmRVc2VySW5mbygpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogLTEgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3NSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KCkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3NSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNhcmRNZW51Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2FyZE1lbnVGaXhlZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjYXJkTWVudUZpeGVkKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+PSBjYXJkTWVudU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogOTlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudS5yZW1vdmVBdHRyKCdzdHlsZScpLnJlbW92ZUNsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQ3JtIHBhZ2UgQXBsaWNhdGlvblxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3Qgb25lcGFnZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG9uZXBhZ2UucHJvbW8uaW5pdCgpO1xyXG4gICAgICAgIG9uZXBhZ2UucmVnaXN0cmF0aW9uLmluaXQoKTtcclxuICAgICAgICAkbmF2TW9iaWxlLnJlbW92ZUNsYXNzKCdzbS1vbmx5LS1mbGV4Jyk7XHJcbiAgICAgICAgQmFzZS5tZW51LmhhbWJ1cmdlckJ0bigpO1xyXG4gICAgICAgIEJhc2UubWVudS5jbGlja091c2lkZSgpO1xyXG5cclxuICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2Utb25lcGFnZS0taG9tZScpKSB7XHJcbiAgICAgICAgICAgIG9uZXBhZ2UuaGVyb0FuaW1hdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVTbGlkZXIoKTtcclxuICAgICAgICB0aGlzLmNvdW50ZXJTcGluKCk7XHJcbiAgICB9LFxyXG4gICAgaGVyb0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICAgICAgdGwuZnJvbVRvKCcuaGVybycsIDEsIHsgeTogLTMwMCwgb3BhY2l0eTogMCB9LCB7IHk6IDAsIG9wYWNpdHk6IDEgfSlcclxuICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICcuaGVyb19fdGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICctPS4zJ1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3N1YnRpdGxlJyxcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAnLT0uNydcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgJy5oZXJvX193aWRnZXQnLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIHsgeTogNzAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgJy09LjUnXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICcuc29jaWFsJyxcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICB7IHk6IDUwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICctPTAuNidcclxuICAgICAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb2JpbGVTbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKGRvY3VtZW50KS53aWR0aCgpIDwgNzY4KSB7XHJcbiAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyLS1tb2JpbGUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY291bnRlclNwaW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXNjcm9sbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyZWVuID0gJCgnLmpzLWNvdW50ZXItLXdyYXBwZXInKS5vZmZzZXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2NyZWVuLnRvcCAtIDYwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc3BpbiA9ICQoJy5qcy1jb3VudGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNwaW4uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2pzLWNvdW50ZXInLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb3VudGVyOiAkKHRoaXMpLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiAnc3dpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbihub3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudGV4dChNYXRoLmNlaWwobm93KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5vbmVwYWdlLnByb21vID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgb25lcGFnZS5wcm9tby5hbmltYXRpb24oKTtcclxuICAgICAgICBvbmVwYWdlLnByb21vLnNsaWRlcnMoKTtcclxuICAgIH0sXHJcbiAgICBhbmltYXRpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuaGVyby0taWNvbicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG4gICAgICAgICAgICB0bC5mcm9tVG8oJy5sb2dvJywgMSwgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sIHsgeDogMCwgb3BhY2l0eTogMSB9KVxyXG4gICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAnLmhlcm8taW5jb19faW1nJyxcclxuICAgICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDogNTAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX190ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDogLTUwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJy09MC41J1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1wcm9tbycpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICAgICAgICAgIHRsLmZyb21UbygnLmxvZ28nLCAxLCB7IHg6IC0xMDAsIG9wYWNpdHk6IDAgfSwgeyB4OiAwLCBvcGFjaXR5OiAxIH0pXHJcbiAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICcuaGVyb19fdGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICcuaGVyb19fc3VidGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAnLT0uNidcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgJy5zbGljay1uZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJy09MC41J1xyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAnLnNsaWNrLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJy09MSdcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgJy5hZHYtaW1hZ2VfX2ltZycsXHJcbiAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICB7IHk6IDMwMCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICctPTAuNydcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNsaWRlcnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWFkdicpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZmFkZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdi1pbWFnZScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWFkdi1pbWFnZScpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZmFkZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLXVzZXJzJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItdXNlcnMnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcclxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzIwcHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1pY29ucycpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMjBweCcsXHJcblxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbm9uZXBhZ2UucmVnaXN0cmF0aW9uID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ibG9ja1JlcGxhY2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYmxvY2tSZXBsYWNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYXV0aEZvcm0gPSAkKCcuanMtcHJvbW8tZm9ybScpO1xyXG5cclxuICAgICAgICBpZiAoJGRvY3VtZW50LndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgbW92ZUZvcm0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJGRvY3VtZW50LndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVGb3JtKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2NyZWVuLS1yZWcnKS5hcHBlbmQoYXV0aEZvcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVGb3JtKCkge1xyXG4gICAgICAgICAgICBhdXRoRm9ybS5pbnNlcnRBZnRlcignLmZpcnN0c2NyZWVuX193cmFwcGVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgICQoQmFzZS5pbml0KCkpO1xyXG4gICAgJChjYXJkLmluaXQoKSk7XHJcbiAgICAkKG9uZXBhZ2UuaW5pdCgpKTtcclxufSk7XHJcblxyXG4vKlxyXG4qKiogZnVuY3Rpb25zLmpzXHJcbiovXHJcbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdiYi1wdXNoVXAnKTtcclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgICAgICdiYi1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXHJcbiAgICApO1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItcHVzaFVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLmJiLXB1c2hVcCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLmJiLXB1c2hVcCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vU2V0IElucHV0IERhdGUgVmFsdWVcclxuZnVuY3Rpb24gc2V0SW5wdXREYXRlKHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgbGV0IGhveSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZCA9IGhveS5nZXREYXRlKCksXHJcbiAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICB5ID0gaG95LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF0YTtcclxuXHJcbiAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgZCA9ICcwJyArIGQ7XHJcbiAgICB9XHJcbiAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgbSA9ICcwJyArIG07XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gX2RhdC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgIF9kYXRbaV0udmFsdWUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KGJsb2NrKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4iXX0=
