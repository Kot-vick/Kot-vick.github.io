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
                                if ($('.js-stiky-block').length && $(window).width() > 768) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkaGVhZGVyIiwiJG1haW4iLCIkb3ZlcmxheSIsIiRuYXZNb2JpbGUiLCIkaGFtYnVyZ2VyIiwiQmFzZSIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJkcm9wZG93biIsImFjY29yZGVvbiIsImNoZWNrYm94IiwidGFiIiwibGlzdFRvZ2dsZSIsImNvcHlUZXh0Iiwib3duZXJQaG9uZSIsImNoYW5nZUNpdHkiLCJzbGlkZXIiLCJjYXRhbG9nSXRlbVNsaWRlciIsInNlbGVjdCIsImlucHV0cyIsImJ1dHRvbnMiLCJidG5FeHBhbmRlZCIsImJ0bkhvdmVyQW5pbWF0ZSIsImJ0blN0YXR1c0FuaW1hdGUiLCJidG5Hb1RvcCIsImJ0bkdvVG8iLCJidG5GbG9hdGluZyIsImJ0blB1c2giLCJwb3B1cCIsInBvcHVwRmFuY3lCb3giLCJ3aG9JcyIsImNoYW5nZUZvcm1UaXRsZSIsInJlaW5pdCIsIndpZHRoIiwic2Nyb2xsQmFyIiwibWVudSIsImhhbWJ1cmdlckJ0biIsImNsaWNrT3VzaWRlIiwic2VhcmNoQnRuT3BlbkNsb3NlIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJib3h6b29tIiwidmVyZ2UiLCJjdXJzb3J3aWR0aCIsImN1cnNvcmJvcmRlciIsImN1cnNvcmJvcmRlcnJhZGl1cyIsImdldE5pY2VTY3JvbGwiLCJyZXNpemUiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2xhc3MiLCJ0YWJzIiwiZmluZCIsImlzIiwiYWRkQ2xhc3MiLCJoYXNDbGFzcyIsInBhcmVudCIsInJlbW92ZUF0dHIiLCJwcm9wIiwiJGFjY29yZGVvbiIsInNsaWRlVXAiLCJlYWNoIiwic2xpZGVEb3duIiwiJHBhcmVudCIsImNsb3Nlc3QiLCIkaXRlbSIsImRhdGEiLCJsaXN0Iiwid29ya0xpc3QiLCJjc3MiLCJjYiIsIkNsaXBib2FyZCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsImJ0biIsIiRidG5EYXRhIiwiJGlucHV0VmFsIiwidmFsIiwiYXR0ciIsInNob3ciLCJub3QiLCJoaWRlIiwiZmlsdGVyIiwiZmFkZU91dCIsImZhZGVJbiIsInRleHQiLCJ1c2VyUGhvbmUiLCJwaG9uZSIsImNoYW5nZUNpdHlUaXRsZSIsIiRzbGlkZXIiLCIkc2xpZHMiLCIkc2xpZGUiLCIkcHJldkFycm93IiwiJG5leHRBcnJvdyIsInNsaWNrIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwiYXJyb3dzIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCIkY2F0YWxvZ0l0ZW1TbGlkZXIiLCJfdGhpcyIsIiRzbGlkZXMiLCIkc2xpZGVyRG90cyIsImV2ZW50IiwicHJlcGVuZCIsImFwcGVuZCIsInNsaWRlQ291bnQiLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCJpIiwiaHRtbCIsImxhenlMb2FkIiwic3RvcFByb3BhZ2F0aW9uIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsIm1lc3NhZ2VTdWNjZXNzIiwibWVzc2FnZUVycm9yIiwiZGVsYXkiLCJzdGF0dXMiLCJwdXNoVXAiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCIkZHJvcGRvd24iLCJyZW5kZXIiLCJzaG93SGlkZSIsIiRidG5DbG9zZSIsIiRkcm9wZG93bk92ZXJsYXkiLCIkZHJvcGRvd25MaXN0IiwiYXBwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsIiRidG5GbG9hdGluZyIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwiaW5wdXRFdmVudHMiLCJpbnB1dE1hc2siLCJtb2JpbGVTZWxlY3QiLCJpbnB1dG1hc2siLCJtYXNrIiwiZ3JlZWR5Iiwib25CZWZvcmVQYXN0ZSIsInBhc3RlZFZhbHVlIiwib3B0cyIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImRlZmluaXRpb25zIiwidmFsaWRhdG9yIiwiY2FyZGluYWxpdHkiLCJjYXNpbmciLCJpbnB1dCIsImV4ZWNDb21tYW5kIiwibmV4dCIsInByZXYiLCJmaWVsZEVkaXQiLCJmaWVsZEVkaXRJbnB1dCIsImZpZWxkRWRpdEJ0biIsImZpZWxkRWRpdFRleHQiLCJibHVyIiwidHJpbSIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwia2V5cHJlc3MiLCJrZXlDb2RlIiwiZW5kIiwiJHNlbGVjdCIsIiRpbnB1dFNlYXJjaCIsIiRyZXN1bHRJdGVtIiwic2VsZWN0MiIsInRhZ3MiLCJ0ZW1wbGF0ZVJlc3VsdCIsImFkZFVzZXJQaWMiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsInRpbWVBbmRQcmljZSIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiYWxsb3dDbGVhciIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCIkc2VsZWN0TmF0aXZlIiwicGxhY2Vob2xkZXIiLCIkZmlyc3RPcHRpb24iLCJ3cmFwIiwiY29sb3JTZWxlY3QiLCJpY29uU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsImFkZFJlc2V0QnRuIiwicGhvbmVDb2RlIiwiJGljb25TZWxlY3QiLCJpZm9ybWF0IiwiZHJvcGRvd25QYXJlbnQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJHllYXJTZWxlY3QiLCIkZGF0ZVNlbGVjdCIsInNlbGVjdENvZGVTZWxlY3Rpb24iLCJvcHRWYWwiLCJzZWxlY3RDb2RlUmVzdWx0IiwiY291bnRyeSIsIiRwaG9uZUNvZGVCb3giLCIkaW5wdXQiLCJmb2N1cyIsIm9wdGlvblNlbGVjdCIsInNlbGVjdFZhbHVlIiwiZXEiLCJjaGFuZ2UiLCJjb3VudGVyIiwic2VsZWN0ZWRJbmRleCIsImFkZEZvY3VzIiwicmVtb3ZlRm9jdXMiLCJfcmVtb3ZlU3R5bGUiLCJfYWRkU3R5bGUiLCJzZWFyY2hCdG4iLCJmYW5jeWJveCIsImJhc2VDbGFzcyIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaW1hZ2UiLCJwcmVsb2FkIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJ0b29sYmFyIiwibW9iaWxlIiwiY2xpY2tDb250ZW50IiwiY2xpY2tTbGlkZSIsInRvdWNoIiwic21hbGxCdG4iLCJ3aG9pcyIsImZvcm0iLCJjYXRhbG9nIiwibWFwVG9nZ2xlIiwiYnRuRmlsdGVyT3BlbiIsImJ0blNob3dDYXRhbG9nIiwiYnRuU2hvd01hcCIsInN0aWNreUZpbHRlciIsImZpbHRlckNhdGVnb3J5IiwibW92ZUJsb2NrcyIsImlmUGFnZUNhdGFsb2ciLCJjYXRhbG9nRmlsdGVyIiwiU3RpY2t5U2lkZWJhciIsInRvcFNwYWNpbmciLCJib3R0b21TcGFjaW5nIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpbm5lcldyYXBwZXJTZWxlY3RvciIsImluc2VydEJlZm9yZSIsIm91dGVySGVpZ2h0IiwiY2FyZCIsImNhcmRTY3JvbGxzcHkiLCJjYXJkU3RpY2t5IiwiY2FyZFJlcXVlc3RUb2dnbGUiLCJjYXJkTW92ZUl0ZW1zIiwiJGNhcmRTbGlkZXIiLCJjYXJkSW5mb1JlcXVlc3QiLCJwcmVwZW5kVG8iLCJzY3JvbGxzcHkiLCJmaXhDYXJkVXNlckluZm8iLCJzY3JvbGwiLCJzdGlja3lCbG9ja09mZnNldCIsImZpeGVkQmxvY2siLCJmaXhlZEJsb2NrT2Zmc2V0Iiwic3RpY2t5QmxvY2siLCJwb3NpdGlvbiIsImJvdHRvbSIsImNhcmRNZW51Rml4ZWQiLCJjYXJkTWVudU9mZnNldCIsImNhcmRNZW51Q2xvbmUiLCJjYXJkTWVudSIsInJpZ2h0IiwiekluZGV4IiwiY2FyZENvbnRlbnQiLCJoZWlnaHQiLCJNYWluIiwicGFnZVByb21vIiwib3B0aW9ucyIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsInBvc2hQb3MiLCJyYWYiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldElucHV0RGF0ZSIsInNlbGVjdG9yIiwiX2RhdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3kiLCJEYXRlIiwiZCIsImdldERhdGUiLCJtIiwiZ2V0TW9udGgiLCJ5IiwiZ2V0RnVsbFllYXIiLCJtYXgiLCJhZGRSZW1vdmVDbGFzc0Jsb2NrIiwiYmxvY2siLCJjbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQU1BLFVBQWFDLEVBQUVDLE1BQUYsQ0FBbkI7QUFDQSxJQUFNQyxZQUFhRixFQUFFRyxRQUFGLENBQW5CO0FBQ0EsSUFBTUMsUUFBYUosRUFBRSxNQUFGLENBQW5CO0FBQ0EsSUFBTUssV0FBYUwsRUFBRSxVQUFGLENBQW5CO0FBQ0EsSUFBTU0sVUFBYU4sRUFBRSxTQUFGLENBQW5CO0FBQ0EsSUFBTU8sUUFBYVAsRUFBRSxPQUFGLENBQW5CO0FBQ0EsSUFBTVEsV0FBYVIsRUFBRSxVQUFGLENBQW5CO0FBQ0EsSUFBTVMsYUFBYVQsRUFBRSxnQkFBRixDQUFuQjtBQUNBLElBQU1VLGFBQWFWLEVBQUUsa0JBQUYsQ0FBbkI7O0FBRUE7Ozs7Ozs7Ozs7QUFZQSxJQUFNVyxPQUFPOztBQUVUQyxzQkFBTSxnQkFBVzs7QUFFYixxQ0FBS0MsZUFBTDs7QUFFQSxxQ0FBS0MsUUFBTCxDQUFjRixJQUFkOztBQUVBLHFDQUFLRyxTQUFMOztBQUVBLHFDQUFLQyxRQUFMOztBQUVBOztBQUVBLHFD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IFZhcnNcclxuY29uc3QgJHdpbmRvdyAgICA9ICQod2luZG93KTtcclxuY29uc3QgJGRvY3VtZW50ICA9ICQoZG9jdW1lbnQpO1xyXG5jb25zdCAkaHRtbCAgICAgID0gJCgnaHRtbCcpO1xyXG5jb25zdCAkd3JhcHBlciAgID0gJCgnLndyYXBwZXInKTtcclxuY29uc3QgJGhlYWRlciAgICA9ICQoJy5oZWFkZXInKTtcclxuY29uc3QgJG1haW4gICAgICA9ICQoJy5tYWluJyk7XHJcbmNvbnN0ICRvdmVybGF5ICAgPSAkKCcub3ZlcmxheScpO1xyXG5jb25zdCAkbmF2TW9iaWxlID0gJCgnLmpzLW1vYmlsZS1uYXYnKTtcclxuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuXHJcbi8qKlxyXG5cclxuICogQmFzZS5qc1xyXG5cclxuICpcclxuXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcblxyXG4gKi9cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWNjb3JkZW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tib3goKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5yYWRpb0J0bigpO1xyXG5cclxuICAgICAgICB0aGlzLnRhYigpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmlucHV0TWFzaygpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmlucHV0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdFRvZ2dsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNvcHlUZXh0KCk7XHJcblxyXG4gICAgICAgIHRoaXMub3duZXJQaG9uZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUNpdHkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXRhbG9nSXRlbVNsaWRlcigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blB1c2goKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC53aG9JcygpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXIoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5oYW1idXJnZXJCdG4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5jbGlja091c2lkZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LnNlYXJjaEJ0bk9wZW5DbG9zZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TdG9wIGRyYWcgSW1nXHJcblxyXG4gICAgICAgICQoJ2ltZycpLm9uKCdkcmFnc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2Nyb2xsQmFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbEJhciA9ICQoJy5qcy1zY3JvbGwnKTtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbEJhci5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5uaWNlU2Nyb2xsKHtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jjb2xvcjogJyM1ODVhNTknLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhvcml6cmFpbGVuYWJsZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGF1dG9oaWRlbW9kZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgYm94em9vbTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgdmVyZ2U6IDUwMCxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3J3aWR0aDogJzJweCcsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAnbm9uZScsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMidcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm9uKCdtb3VzZW92ZXIgbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZ2V0TmljZVNjcm9sbCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL1JlbW92ZSBwcmVsb2FkZXJcclxuXHJcbiAgICByZW1vdmVQcmVsb2FkZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vICQoJ2JvZHknKS5hZGRDbGFzcygnbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgLy8gfSwgNTAwKTtcclxuXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbG9hZGluZyBsb2FkaW5nLWFuaW1hdGlvbicpO1xyXG5cclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vSW5pdCBiYXNlIHRhYnMgalEgVWkgVGFic1xyXG5cclxuICAgIHRhYjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtYmItdGFiJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuXHJcbiAgICBjaGVja2JveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9CQiBjaGVja2JveCBwc2V1ZG9cclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL1NlbGVjdCBBbGwgQ2hlY2tib3hcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIHJhZGlvQnRuXHJcblxyXG4gICAgLy8gcmFkaW9CdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vICAgICBsZXQgJHJhZGlvID0gJCgnLmpzLWJiLXJhZGlvJyk7XHJcblxyXG5cclxuXHJcbiAgICAvLyAgICAgLy9CQiByYWRpb1xyXG5cclxuICAgIC8vICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1yYWRpbycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIGlmICgkaW5wdXQuaXMoJzpjaGVja2VkJykpIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICRyYWRpby5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIGFjY29yZGVvblxyXG5cclxuICAgIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkYWNjb3JkZW9uID0gJCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQWNjb3JkZW9uIGNvbGxhcHNlXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgZVxyXG5cclxuICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWxpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RUb2dnbGUoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSAkKCcuanMtbGlzdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtMaXN0ID0gbGlzdC5maW5kKCcuanMtbGlzdC10b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ29weSB0ZXh0IGNsaWNrIGxpbmtcclxuXHJcbiAgICBjb3B5VGV4dDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL2lmIGhhcyBpbnB1dCB0aGVuIGNvcHkgaW5wdXQgdmFsdWUgaW4gZGF0YSBhdHRyXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ib3gnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaW5wdXRJY29uID0gJHBhcmVudC5maW5kKCcuYmItaW5wdXRfX2ljb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgPSAkcGFyZW50LmZpbmQoJy5qcy1pbnB1dC0tY2xlYXInKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaGludCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuID0gJHBhcmVudC5maW5kKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuRGF0YSA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dFZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWlucHV0LS1jbGVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZU91dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX2ljb24nKVxyXG5cclxuICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9TaG93IHBob25lIG51bWJlclxyXG5cclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuanMtdXNlci1waG9uZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQoJCh0aGlzKS5kYXRhKCdwaG9uZS1oaWRlbicpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy11c2VyLXBob25lLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdXNlclBob25lID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtdXNlci1waG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBob25lID0gdXNlclBob25lLmRhdGEoJ3Bob25lJyk7XHJcblxyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ3RlbDonICsgcGhvbmUpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2l0eSBzZWxlY3RcclxuXHJcbiAgICBjaGFuZ2VDaXR5OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHkgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHlUaXRsZSA9IGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X190aXRsZSBzcGFuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VDaXR5VGl0bGUudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcblxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtYmItc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZHMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICRwcmV2QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICRuZXh0QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2F0YWxvZyBJdGVtIFNsaWRlclxyXG5cclxuICAgIGNhdGFsb2dJdGVtU2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNhdGFsb2dJdGVtU2xpZGVyID0gJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJ1dHRvbnM6IHtcclxuXHJcbiAgICAgICAgLy9idG4gZXhwYW5kZWRcclxuXHJcbiAgICAgICAgYnRuRXhwYW5kZWQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgYWRkUmVtb3ZlQ2xhc3MoJy5qcy1idG4tZXhwYW5kZWQnLCAnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIGFuaW1hdGUgb24gaG92ZXJcclxuXHJcbiAgICAgICAgYnRuSG92ZXJBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiByZWxZLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZW91dCcsICcuanMtYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWCA9IGUucGFnZVggLSBwYXJlbnRPZmZzZXQubGVmdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFkgPSBlLnBhZ2VZIC0gcGFyZW50T2Zmc2V0LnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idXR0b24tYW5pbWF0ZV9faG92ZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiByZWxZLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJlbFhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBzdGF0dXMgYW5pbWF0ZVxyXG5cclxuICAgICAgICBidG5TdGF0dXNBbmltYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGljaysrO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjbGljayA8PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAyNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1yZWFkeScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2sgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9mbG9hdGluZyBidG4gYW5pbWF0aW5cclxuXHJcbiAgICAgICAgYnRuRmxvYXRpbmc6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRidG4gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJ1biA9IHRydWU7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICghJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v0J7QsdGA0LDQsdC+0YLRh9C40Log0LTQvtCx0LDQstC70Y/QtdGCINC60LvQsNGB0YHRiyDQt9Cw0YLQtdC8INC+0YLQv9C40YHRi9Cy0LDRgtC10YHRjyDQvtGCINGB0L7QsdGL0YLQuNGPXHJcblxyXG4gICAgICAgICAgICBsZXQgaGVuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG4ub2ZmKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPINC30LDQutGA0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVBbmltYXRpb24oZWwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcnVuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1biA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsICcuanMtYnRuLWZsb2F0aW5nJywgaGVuZGxlcik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcuYnRuLWZsb2F0aW5nX19saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnRuSWQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5tZC1oaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5JZC50cmlnZ2VyKCdjbGljaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYnRuLWZsb2F0aW5nIC5idG4tZmxvYXRpbmdfX2xpbmsnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlbW92ZUFuaW1hdGlvbigkKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8v0JrQu9C40Log0LIg0L3QtSDQutC90L7Qv9C60Lgg0YHQutGA0YvQstCw0LXRgiDQvtCy0LXRgNC70LXQuSDQuCDQutC90L7Qv9C60LhcclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLm92ZXJsYXknLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZhLWxlYXZlLWFjdGl2ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CV0YHQu9C4INGB0YHRi9C70LrQsCDQvtGC0LrRgNGL0LLQsNC10YIg0LzQvtC00LDQu9C60YMsINGC0L4g0L/QviDQvtGC0LrRgNGL0YLQuNGOINC80L7QtNCw0LvQutC4INGB0LrRgNGL0LLQsNC10YIg0LrQvdC+0L/QutC4XHJcblxyXG4gICAgICAgICAgICAkKCcubW9kYWwnKS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidG5QdXNoOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5maW5kKCdbZGF0YS1wdXNoXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlU3VjY2VzcyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLW1lc3NhZ2Utc3VjY2VzcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlRXJyb3IgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLWVycm9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtZGVsYXknKSB8fCAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtc3RhdHVzJykgfHwgJ3N1Y2Nlc3MnO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVwKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlRXJyb3IsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVwKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlU3VjY2VzcyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LCBkZWxheSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIHRvcFxyXG5cclxuICAgICAgICBidG5Hb1RvcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDgwMFxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gc2Nyb2xsIHRvIGVsZW1lbnRcclxuXHJcbiAgICAgICAgYnRuR29UbzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGV2ZW50IHRvIHNjcm9sbCB0byBzZWN0aW9uIHdoaXRoIGlkIGxpa2UgaHJlZlxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvdG8nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gJChlbGVtZW50Q2xpY2spLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIDkwICsgJ3B4J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA2MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZHJvcGRvd246IHtcclxuXHJcbiAgICAgICAgLy9DdXN0b20gZHJvcGRvd25cclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJGRyb3Bkb3duLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnYmItZHJvcGRvd24tLWhvdmVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93SGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5kU2Nyb2xsKCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93bi5iYi1kcm9wZG93bi0tdHJhbnNmb3JtJ1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJiYi1kcm9wZG93bl9fY2xvc2UganMtYmItZHJvcGRvd24tLWNsb3NlXCI+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25PdmVybGF5ID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmItZHJvcGRvd25fX292ZXJsYXlcIj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRkcm9wZG93bkxpc3QgPSAkKHRoaXMpLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5DbG9zZS5hcHBlbmRUbygkZHJvcGRvd25MaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duT3ZlcmxheS5pbnNlcnRBZnRlcigkZHJvcGRvd25MaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duTGlzdC5maW5kKCcuaW5mby1ibG9ja19faWNvbicpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBkU2Nyb2xsOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkd2luZG93LmlubmVySGVpZ2h0KCkgLyAyKTtcclxuXHJcbiAgICAgICAgLy8gICAgIGxldCAkZHJvcGRvd24gPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJiLWRyb3Bkb3duJyk7XHJcblxyXG4gICAgICAgIC8vICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBpZiAoJCh0aGlzKS5vZmZzZXQoKS50b3AgPiAkd2luZG93LmlubmVySGVpZ2h0KCkgLyAyKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGxpc3QgPSBfdGhpcy5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICQodGhpcykub2Zmc2V0KCkudG9wKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgIF90aGlzXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdtb3VzZWVudGVyJyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0JykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGlzdC5jc3Moe1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByaWdodDogMFxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB9LFxyXG5cclxuICAgICAgICBzaG93SGlkZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRidG5GbG9hdGluZyA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWRyb3Bkb3duJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmlzKCcuYmItZHJvcGRvd25fX292ZXJsYXknKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duIC5pbmZvLWJsb2NrX19saW5rJyxcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCcuaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dHM6IHtcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcblxyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy10aW1lLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk6OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvZGUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOSA5IDkgOSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29uZmlybS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWVtYWlsLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKnsxLDIwfVsuKnsxLDIwfV1bLip7MSwyMH1dWy4qezEsMjB9XUAqezEsMjB9Wy4qezIsNn1dWy4qezEsMn1dJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24ocGFzdGVkVmFsdWUsIG9wdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXN0ZWRWYWx1ZS5yZXBsYWNlKCdtYWlsdG86JywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLVphLXohIyQlJicqKy89P15fYHt8fX4tXVwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogJ2xvd2VyJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC0tY29weScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgaW5wdXQgc2VsZWN0IHZhbHVlXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vU2hvdyBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0hpZGUgUGFzc3dvcmRcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9FZGl0IFRleHQgRmllbGRcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZmllbGQtZWRpdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXQgPSAkKCcuanMtZmllbGQtZWRpdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0QnRuID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19idG4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dC5zaG93KCkuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYmx1cihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAnMTMnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1pbnB1dCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnbm8tY2xvc2UnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW9iaWxlLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vYmlsZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW9iaWxlLXNlbGVjdF9fcmVzdWx0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjdDoge1xyXG5cclxuICAgICAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLXNlcnZpY2VzJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogdGltZUFuZFByaWNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LWJvcm4nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWV0cm8taWNvbiBtZXRyby1pY29uLS0nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TZWxlY3QgQWRkIFByaWNlIFRpbWUgJiBQcmljZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZUFuZFByaWNlKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFRpbWUgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCd0aW1lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsUHJpY2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdwcmljZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQudGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxUaW1lICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFByaWNlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdE5hdGl2ZSA9ICQoJy5qcy1zZWxlY3QtbmF0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSAkKHRoaXMpLmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb246Zmlyc3QtY2hpbGQnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pY29uU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhpZGVZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFJlc2V0QnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaWNvblNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGljb25TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0taWNvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkaWNvblNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpZm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIGZvbnRhd2Vzb21lIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlmb3JtYXQoaWNvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbE9wdGlvbiA9IGljb24uZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPjxpIGNsYXNzPVwic2VsZWN0Ml9faWNvbicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQob3JpZ2luYWxPcHRpb24pLmRhdGEoJ2ljb24nKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pPiAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24udGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xvclNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjb2xvclNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0LWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VhcmNoLWVuYWJsZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbG9yIGJhbGwgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlCYWxsKGNvbG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkb3JpZ2luYWxPcHRpb24gPSBjb2xvci5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JCYWxsID0gJCgkb3JpZ2luYWxPcHRpb24pLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yLnRleHQubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fbGluZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9XCI+PC9zcGFuPjxwPiAke1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvci50ZXh0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA8L3A+PC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19iYWxsXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH0gXCI+IDwvc3Bhbj4gPC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93WWVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zZXQteWVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkeWVhclNlbGVjdCA9ICQoJy5qcy1zZWxlY3QtYm9ybi0tY2xlYXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdzZWxlY3QyOm9wZW5pbmcnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1ib3JuJykgPT09ICd5ZWFyJ1xyXG5cclxuICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRSZXNldEJ0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRhdGVTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1ib3JuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkYXRlU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAudGV4dCgnJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPicpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVTZWxlY3Rpb24ob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlUmVzdWx0KG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0VmFsICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkcGhvbmVDb2RlQm94ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dC1waG9uZS1jb2RlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkcGhvbmVDb2RlQm94Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRwaG9uZUNvZGVCb3guZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzKS5maW5kKCcuYmItaW5wdXRfX2lucHV0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBzZWxlY3RDb2RlUmVzdWx0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogc2VsZWN0Q29kZVNlbGVjdGlvbixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1pbnB1dC0tc2VsZWN0LXZhbHVlXCI+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25TZWxlY3QgPSAkcGFyZW50LmZpbmQoJ29wdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdFZhbHVlID0gJHBhcmVudC5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoY291bnRlcikudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLW1vdmUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb3ZlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm1vdmUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbWVudToge1xyXG5cclxuICAgICAgICAvL0hhbWJ1cmdlciBidG5cclxuXHJcbiAgICAgICAgaGFtYnVyZ2VyQnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX2FkZFN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL1doZW4gQ2xpY2sgT3V0c2lkZSBDbG9zZSBNZW51XHJcblxyXG4gICAgICAgIGNsaWNrT3VzaWRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LCAuanMtZGF0ZSwgLmRhdGVwaWNrZXIsIC5jYXJkLWluZm9fX3JlcXVlc3QsIC5jYXRhbG9nLWZpbHRlciwgLmpzLW1vYmlsZS1maWx0ZXItLW9wZW4sIC5qcy1iYi1hY2NvcmRlb24nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGVcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggQnRuIG9wZW4vY2xvc2VcclxuXHJcbiAgICAgICAgc2VhcmNoQnRuT3BlbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hCdG4gPSAkKCcuanMtbW9iaWxlLXNlYXJjaC1idG4nKTtcclxuXHJcbiAgICAgICAgICAgIHNlYXJjaEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZW1vdmVTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBvcHVwOiB7XHJcblxyXG4gICAgICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuXHJcbiAgICAgICAgcG9wdXBGYW5jeUJveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWQ6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlXCJdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdmYW5jeWJveC1jb250YWluZXItLWltYWdlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja0NvbnRlbnQ6ICdjbG9zZScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja1NsaWRlOiAnY2xvc2UnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc21hbGxCdG46IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzbWFsbEJ0bjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vZGFsOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRm9ybSBXaG8gSXM/XHJcblxyXG4gICAgICAgIHdob0lzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB3aG9pcyA9ICQodGhpcykuZGF0YSgnd2hvaXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9ICQoJyNhdXRoLWZvcm0nKS5maW5kKCcuZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aG9pcyA9PT0gJ21hc3RlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtbWFzdGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aG9pcyA9PT0gJ3N0dWRpbycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtc3R1ZGlvJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtY2xpZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRHVuYW1pY2x5IGNoYW5nZSBmb3JtIHRpdGxlXHJcblxyXG4gICAgICAgIGNoYW5nZUZvcm1UaXRsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWZvcm0tdGl0bGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDYXRhbG9nXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBjYXRhbG9nID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2F0YWxvZy5tYXBUb2dnbGUoKTtcclxuICAgICAgICBjYXRhbG9nLmJ0bkZpbHRlck9wZW4oKTtcclxuICAgICAgICBjYXRhbG9nLmJ0blNob3dDYXRhbG9nKCk7XHJcbiAgICAgICAgY2F0YWxvZy5idG5TaG93TWFwKCk7XHJcbiAgICAgICAgY2F0YWxvZy5zdGlja3lGaWx0ZXIoKTtcclxuICAgICAgICBjYXRhbG9nLmZpbHRlckNhdGVnb3J5KCk7XHJcbiAgICAgICAgY2F0YWxvZy5tb3ZlQmxvY2tzKCk7XHJcbiAgICAgICAgY2F0YWxvZy5pZlBhZ2VDYXRhbG9nKCk7XHJcbiAgICB9LFxyXG4gICAgLy9DYXRhbG9nIG1hcCBUb2dnbGVcclxuICAgIG1hcFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcC0tc2hvdycpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1tYXAtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLS1zaG93JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQnRuIGZpbHRlciBvcGVuXHJcbiAgICBidG5GaWx0ZXJPcGVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtbW9iaWxlLWZpbHRlci0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgY2F0YWxvZ0ZpbHRlciA9ICQoJy5jYXRhbG9nLWZpbHRlcicpO1xyXG4gICAgICAgICAgICBpZiAoY2F0YWxvZ0ZpbHRlci5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXRhbG9nRmlsdGVyLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2F0YWxvZ0ZpbHRlci5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQnRuIHNob3cgY2F0YWxvZ1xyXG4gICAgYnRuU2hvd0NhdGFsb2c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1zaG93LS1saXN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICQoJy5jYXRhbG9nLWNvbnRlbnRfX2lubmVyJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQnRuIHNob3cgbWFwIC0gaGlkZSBjYXRhbG9nXHJcbiAgICBidG5TaG93TWFwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtc2hvdy0tbWFwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAkKCcuY2F0YWxvZy1jb250ZW50X19pbm5lcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1zdGlreS1ibG9jaycpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcCcpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1N0aWNreSBGaWx0ZXIgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXHJcbiAgICBzdGlja3lGaWx0ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtc3Rpa3ktYmxvY2snKS5sZW5ndGggJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreS1ibG9jaycsIHtcclxuICAgICAgICAgICAgICAgIHRvcFNwYWNpbmc6IDExMCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuY2F0YWxvZy1jb250ZW50JyxcclxuICAgICAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLmNhdGFsb2ctZmlsdGVyX19pbm5lcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vZmlsdGVyIGNhdGVnb3J5XHJcbiAgICBmaWx0ZXJDYXRlZ29yeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19saW5rJylcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeS0tcmVzZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrIGluIG1lZGlhIHNjcmVlblxyXG4gICAgbW92ZUJsb2NrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAkKCcuanMtdmlldy10b2dnbGUnKS5pbnNlcnRCZWZvcmUoJy5jYXRhbG9nX19pbm5lcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0lmIHBhZ2UgY2F0YWxvZyBmaWx0ZXIgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWZQYWdlQ2F0YWxvZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLWNhdGFsb2cnKSkge1xyXG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICRtYWluLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2F0YWxvZy1maWx0ZXJfX2JvZHknKS5hZGRDbGFzcyhcclxuICAgICAgICAgICAgICAgICAgICAnYmItYWNjb3JkZW9uIGJiLWFjY29yZGVvbi0tb3RoZXIganMtYmItYWNjb3JkZW9uJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItYWNjb3JkZW9uX19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fdGl0bGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuY2F0YWxvZy1maWx0ZXJfX3RpdGxlX2NhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1hY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbTpsdCgyKScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhcmRcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IGNhcmQgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJkLnNsaWRlcigpO1xyXG4gICAgICAgIGNhcmQuY2FyZFNjcm9sbHNweSgpO1xyXG4gICAgICAgIGNhcmQuY2FyZFN0aWNreSgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZFJlcXVlc3RUb2dnbGUoKTtcclxuICAgICAgICAgICAgY2FyZC5jYXJkTW92ZUl0ZW1zKCk7XHJcblxyXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShjYXJkLmNhcmRNb3ZlSXRlbXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTbGlkZXJcclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXNsaWRlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgJGNhcmRTbGlkZXIgPSAkKCcuanMtY2FyZC1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgICAgICRjYXJkU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgcmVxdWVzdCBzaG93IC8gaGlkZVxyXG4gICAgY2FyZFJlcXVlc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYXJkSW5mb1JlcXVlc3QgPSAkKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrcyB3aGVuIHdpbmRvdyB3aWR0aCA8IDc2OFxyXG4gICAgY2FyZE1vdmVJdGVtczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtdGl0bGUnKS5pbnNlcnRBZnRlcignLmNhcmQtZ2FsbGFyeV9fd3JhcCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWFib3V0JykuaW5zZXJ0QmVmb3JlKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1pbmZvLWNhdGVnb3J5JykuYXBwZW5kVG8oJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93JykucHJlcGVuZFRvKCcuY2FyZC1pbmZvX190b3AnKTtcclxuICAgICAgICAkKCcuY2FyZC1pbmZvX19pbm5lcicpLmluc2VydEFmdGVyKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtbW92ZS1jYXJkLXBvbGljeScpLmFwcGVuZFRvKCcuY2FyZC1yZXF1ZXN0LWZvcm0nKTtcclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2Nyb2xsc3B5XHJcbiAgICBjYXJkU2Nyb2xsc3B5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLXNjcm9sbHNweScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC0xMDAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC02MCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhcmRTdGlja3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zdGlja3knKS5sZW5ndGggJiYgJCgnLmpzLWNhcmQtZml4ZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrID0gJCgnLmpzLWNhcmQtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9ja09mZnNldCA9IHN0aWNreUJsb2NrLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2sgPSAkKCcuanMtY2FyZC1maXhlZCcpO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9ja09mZnNldCA9IGZpeGVkQmxvY2sub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRDb250ZW50ID0gJCgnLmpzLWNhcmQtY29udGVudC1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51ID0gJCgnLmpzLWNhcmQtbWVudScpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJjYXJkLW1lbnVfX2Nsb25lXCI+JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICQoJy5qcy1jYXJkLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKSlcclxuICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihjYXJkTWVudSlcclxuICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudU9mZnNldCA9IGNhcmRNZW51Lm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suaGVpZ2h0KCkgPCBjYXJkQ29udGVudC5oZWlnaHQoKSAmJlxyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjhcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhDYXJkVXNlckluZm8oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZml4Q2FyZFVzZXJJbmZvKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtMSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMzBcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FyZE1lbnUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTWVudUZpeGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmRNZW51Rml4ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID49IGNhcmRNZW51T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51LnJlbW92ZUF0dHIoJ3N0eWxlJykucmVtb3ZlQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNYWluXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBNYWluID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlQmxvY2tzKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlUHJvbW8uaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIG1vdmVCbG9ja3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgJCgnLmJiLWJsb2cnKS5pbnNlcnRBZnRlcignLmJiLWNhdGVnb3J5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhZ2VQcm9tbzoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci0tcHJvbW8nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIE1haW4ucGFnZVByb21vLnNsaWRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgIE1haW4ucGFnZVByb21vLm1vdmVCbG9ja3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci0tcHJvbW8nKVxyXG4gICAgICAgICAgICAgICAgLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJylcclxuICAgICAgICAgICAgICAgIC5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93ICAgICA6ICcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93ICAgICA6ICcuYmItc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzICAgICAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlICAgICAgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdyAgOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkICAgICAgICAgOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQgOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5ICAgICAgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHMgICAgICAgICAgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmUgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzICA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3cgIDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93ICA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW92ZUJsb2NrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1wcm9tby1mb3JtJykuaW5zZXJ0QWZ0ZXIoJy5wcm9tb19fd3JhcCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKEJhc2UuaW5pdCgpKTtcclxuICAgICQoTWFpbi5pbml0KCkpO1xyXG4gICAgJChjYXRhbG9nLmluaXQoKSk7XHJcbiAgICAkKGNhcmQuaW5pdCgpKTtcclxufSk7XHJcblxyXG4vKlxyXG4qKiogZnVuY3Rpb25zLmpzXHJcbiovXHJcbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdiYi1wdXNoVXAnKTtcclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgICAgICdiYi1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXHJcbiAgICApO1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItcHVzaFVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLmJiLXB1c2hVcCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLmJiLXB1c2hVcCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vU2V0IElucHV0IERhdGUgVmFsdWVcclxuZnVuY3Rpb24gc2V0SW5wdXREYXRlKHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgbGV0IGhveSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZCA9IGhveS5nZXREYXRlKCksXHJcbiAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICB5ID0gaG95LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF0YTtcclxuXHJcbiAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgZCA9ICcwJyArIGQ7XHJcbiAgICB9XHJcbiAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgbSA9ICcwJyArIG07XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gX2RhdC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgIF9kYXRbaV0udmFsdWUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KGJsb2NrKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4iXX0=
