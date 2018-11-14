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
                                this.playVideo();

                                this.promo.init();
                                this.registration.init();
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
                                                                                                }, {
                                                                                                                breakpoint: 815,
                                                                                                                settings: {
                                                                                                                                slidesToShow: 2,
                                                                                                                                arrows: false
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiZHJvcGRvd24iLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwidGFicyIsImZpbmQiLCJpcyIsImFkZENsYXNzIiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJyZW1vdmVBdHRyIiwicHJvcCIsIiRhY2NvcmRlb24iLCJzbGlkZVVwIiwiZWFjaCIsInNsaWRlRG93biIsIiRwYXJlbnQiLCJjbG9zZXN0IiwiJGl0ZW0iLCJkYXRhIiwibGlzdCIsIndvcmtMaXN0IiwiY3NzIiwiY2IiLCJDbGlwYm9hcmQiLCIkaW5wdXRJY29uIiwiJGJ0blJlc2V0IiwiJGhpbnQiLCJidG4iLCIkYnRuRGF0YSIsIiRpbnB1dFZhbCIsInZhbCIsImF0dHIiLCJzaG93Iiwibm90IiwiaGlkZSIsImZpbHRlciIsImZhZGVPdXQiLCJmYWRlSW4iLCJ0ZXh0IiwidXNlclBob25lIiwicGhvbmUiLCJjaGFuZ2VDaXR5VGl0bGUiLCIkc2xpZGVyIiwiJHNsaWRzIiwiJHNsaWRlIiwiJHByZXZBcnJvdyIsIiRuZXh0QXJyb3ciLCJzbGljayIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJpbmZpbml0ZSIsImFycm93cyIsImRvdHMiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwiJGNhdGFsb2dJdGVtU2xpZGVyIiwiX3RoaXMiLCIkc2xpZGVzIiwiJHNsaWRlckRvdHMiLCJldmVudCIsInByZXBlbmQiLCJhcHBlbmQiLCJzbGlkZUNvdW50IiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwiaSIsImh0bWwiLCJsYXp5TG9hZCIsInN0b3BQcm9wYWdhdGlvbiIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwiJGJ0biIsInJ1biIsImhlbmRsZXIiLCJvZmYiLCJfcmVtb3ZlQW5pbWF0aW9uIiwiZWwiLCJidG5JZCIsInRyaWdnZXIiLCJtZXNzYWdlU3VjY2VzcyIsIm1lc3NhZ2VFcnJvciIsImRlbGF5Iiwic3RhdHVzIiwicHVzaFVwIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImVsZW1lbnRDbGljayIsImRlc3RpbmF0aW9uIiwiJGRyb3Bkb3duIiwicmVuZGVyIiwic2hvd0hpZGUiLCIkYnRuQ2xvc2UiLCIkZHJvcGRvd25PdmVybGF5IiwiJGRyb3Bkb3duTGlzdCIsImFwcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCIkYnRuRmxvYXRpbmciLCJ0YXJnZXQiLCJ0b2dnbGVDbGFzcyIsImlucHV0RXZlbnRzIiwiaW5wdXRNYXNrIiwibW9iaWxlU2VsZWN0IiwiaW5wdXRtYXNrIiwibWFzayIsImdyZWVkeSIsIm9uQmVmb3JlUGFzdGUiLCJwYXN0ZWRWYWx1ZSIsIm9wdHMiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJkZWZpbml0aW9ucyIsInZhbGlkYXRvciIsImNhcmRpbmFsaXR5IiwiY2FzaW5nIiwiaW5wdXQiLCJleGVjQ29tbWFuZCIsIm5leHQiLCJwcmV2IiwiZmllbGRFZGl0IiwiZmllbGRFZGl0SW5wdXQiLCJmaWVsZEVkaXRCdG4iLCJmaWVsZEVkaXRUZXh0IiwiYmx1ciIsInRyaW0iLCJ2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsImtleXByZXNzIiwia2V5Q29kZSIsImVuZCIsIiRzZWxlY3QiLCIkaW5wdXRTZWFyY2giLCIkcmVzdWx0SXRlbSIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0IiwiaWNvblNlbGVjdCIsInNob3dZZWFyIiwiaGlkZVllYXIiLCJhZGRSZXNldEJ0biIsInBob25lQ29kZSIsIiRpY29uU2VsZWN0IiwiaWZvcm1hdCIsImRyb3Bkb3duUGFyZW50IiwiaWNvbiIsIm9yaWdpbmFsT3B0aW9uIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJjb2xvciIsIiRvcmlnaW5hbE9wdGlvbiIsImNvbG9yQmFsbCIsIiR5ZWFyU2VsZWN0IiwiJGRhdGVTZWxlY3QiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiJGlucHV0IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiX3JlbW92ZVN0eWxlIiwiX2FkZFN0eWxlIiwic2VhcmNoQnRuIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2FyZCIsImNhcmRTY3JvbGxzcHkiLCJjYXJkU3RpY2t5IiwiY2FyZFJlcXVlc3RUb2dnbGUiLCJjYXJkTW92ZUl0ZW1zIiwiJGNhcmRTbGlkZXIiLCJjYXJkSW5mb1JlcXVlc3QiLCJpbnNlcnRCZWZvcmUiLCJwcmVwZW5kVG8iLCJzY3JvbGxzcHkiLCJmaXhDYXJkVXNlckluZm8iLCJzY3JvbGwiLCJzdGlja3lCbG9ja09mZnNldCIsImZpeGVkQmxvY2siLCJvdXRlckhlaWdodCIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsInBvc2l0aW9uIiwiYm90dG9tIiwiY2FyZE1lbnVGaXhlZCIsImNhcmRNZW51T2Zmc2V0IiwiY2FyZE1lbnVDbG9uZSIsImNhcmRNZW51IiwicmlnaHQiLCJ6SW5kZXgiLCJjYXJkQ29udGVudCIsImhlaWdodCIsIk9uZXBhZ2UiLCJoZXJvQW5pbWF0ZSIsIm1vYmlsZVNsaWRlciIsImNvdW50ZXJTcGluIiwicGxheVZpZGVvIiwicHJvbW8iLCJyZWdpc3RyYXRpb24iLCJ0bCIsIlRpbWVsaW5lTWF4IiwiZnJvbVRvIiwieSIsIm9wYWNpdHkiLCJzY3JvbGxlZCIsImNvdW50ZXJDb250YWluZXIiLCJjb3VudGVyQ29udGFpbmVyT2Zmc2V0Iiwic2NyZWVuIiwiJHNwaW4iLCJDb3VudGVyIiwiZHVyYXRpb24iLCJlYXNpbmciLCJzdGVwIiwibm93IiwiTWF0aCIsImNlaWwiLCJzcmMiLCJmcmFtZSIsImFuaW1hdGlvbiIsInNsaWRlcnMiLCJ4IiwiZmFkZSIsImNlbnRlck1vZGUiLCJjZW50ZXJQYWRkaW5nIiwibW92ZUJsb2NrIiwiJGF1dGhGb3JtIiwibW92ZUZvcm0iLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwibWF4IiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssV0FBV0wsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU0sUUFBUU4sRUFBRSxPQUFGLENBQWQ7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUSxRQUFRUixFQUFFLFVBQUYsQ0FBZDtBQUNBLElBQU1TLGFBQWFULEVBQUUsZ0JBQUYsQ0FBbkI7QUFDQSxJQUFNVSxhQUFhVixFQUFFLGtCQUFGLENBQW5COztBQUVBOzs7Ozs7Ozs7O0FBWUEsSUFBTVcsT0FBTzs7QUFF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LEVBQTJCdFQsTUFBL0IsRUFBdUM7QUFDdkNoRCxrQ0FBRXNXLEtBQUYsRUFBUzNTLFdBQVQsQ0FBcUI0UyxFQUFyQjtBQUNBelQsa0NBQUVxRixlQUFGO0FBQ0gsaUJBSkQ7QUFLSCIsImZpbGUiOiJvbmVwYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyc1xyXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xyXG5jb25zdCAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcclxuY29uc3QgJGh0bWwgPSAkKCdodG1sJyk7XHJcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcclxuY29uc3QgJG1haW4gPSAkKCcubWFpbicpO1xyXG5jb25zdCAkb3ZlcmxheSA9ICQoJy5vdmVybGF5Jyk7XHJcbmNvbnN0ICRtZW51ID0gJCgnLmpzLW1lbnUnKTtcclxuY29uc3QgJG5hdk1vYmlsZSA9ICQoJy5qcy1tb2JpbGUtbmF2Jyk7XHJcbmNvbnN0ICRoYW1idXJnZXIgPSAkKCcuanMtbWFpbi1uYXYtYnRuJyk7XHJcblxyXG4vKipcclxuXHJcbiAqIEJhc2UuanNcclxuXHJcbiAqXHJcblxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG5cclxuICovXHJcblxyXG5cclxuXHJcbmNvbnN0IEJhc2UgPSB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHRoaXMucmVtb3ZlUHJlbG9hZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJvcGRvd24uaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmFjY29yZGVvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmNoZWNrYm94KCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMucmFkaW9CdG4oKTtcclxuXHJcbiAgICAgICAgdGhpcy50YWIoKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dE1hc2soKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5pbnB1dEV2ZW50cygpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RUb2dnbGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb3B5VGV4dCgpO1xyXG5cclxuICAgICAgICB0aGlzLm93bmVyUGhvbmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDaXR5KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2F0YWxvZ0l0ZW1TbGlkZXIoKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdC5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXRzLmluaXQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRXhwYW5kZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkhvdmVyQW5pbWF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuU3RhdHVzQW5pbWF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29Ub3AoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkdvVG8oKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0bkZsb2F0aW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5QdXNoKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC5wb3B1cEZhbmN5Qm94KCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXAud2hvSXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC5jaGFuZ2VGb3JtVGl0bGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC5yZWluaXQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuY2xpY2tPdXNpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZWFyY2hCdG5PcGVuQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xyXG5cclxuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNjcm9sbEJhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjNTg1YTU5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICcycHgnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5vbignbW91c2VvdmVyIG1vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcblxyXG4gICAgcmVtb3ZlUHJlbG9hZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyAkKCdib2R5JykuYWRkQ2xhc3MoJ2xvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIH0sIDUwMCk7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0luaXQgYmFzZSB0YWJzIGpRIFVpIFRhYnNcclxuXHJcbiAgICB0YWI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWJiLXRhYicpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLXRhYicpLnRhYnMoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DdXN0b20gY2hlY2JveCAmIGNoZWNrYm94UHNldWRvXHJcblxyXG4gICAgY2hlY2tib3g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LXNlbGVjdC1hbGwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSByYWRpb0J0blxyXG5cclxuICAgIC8vIHJhZGlvQnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyAgICAgbGV0ICRyYWRpbyA9ICQoJy5qcy1iYi1yYWRpbycpO1xyXG5cclxuXHJcblxyXG4gICAgLy8gICAgIC8vQkIgcmFkaW9cclxuXHJcbiAgICAvLyAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItcmFkaW8nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJ2lucHV0Jyk7XHJcblxyXG4gICAgLy8gICAgICAgICBpZiAoJGlucHV0LmlzKCc6Y2hlY2tlZCcpKSB7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAkcmFkaW8ucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuXHJcbiAgICBhY2NvcmRlb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJGFjY29yZGVvbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1hY2NvcmRlb24gLmJiLWFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbihcclxuXHJcbiAgICAgICAgICAgIGVcclxuXHJcbiAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwYXJlbnQuZGF0YSgnYWNjb3JkZW9uJykgPT09ICdjb2xsYXBzZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0VG9nZ2xlKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gJCgnLmpzLWxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tib3ggPSBsaXN0LmZpbmQoJy5qcy1iYi1jaGVja2JveCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrTGlzdCA9IGxpc3QuZmluZCgnLmpzLWxpc3QtdG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja2JveC5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdFRvZ2dsZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NvcHkgdGV4dCBjbGljayBsaW5rXHJcblxyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgY2IgPSBuZXcgQ2xpcGJvYXJkKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG5cclxuICAgICAgICAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYm94Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0blJlc2V0ID0gJHBhcmVudC5maW5kKCcuanMtaW5wdXQtLWNsZWFyJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGhpbnQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9ICRwYXJlbnQuZmluZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkRhdGEgPSAkKHRoaXMpLmRhdGEoJ2NsaXBib2FyZC10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXRWYWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hdHRyKCdkYXRhLWNsaXBib2FyZC10ZXh0JywgJGJ0bkRhdGEgKyAkaW5wdXRWYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLnZhbCgnJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X19pY29uJylcclxuXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZUluKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuXHJcbiAgICBvd25lclBob25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLXVzZXItcGhvbmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKTsnKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KCQodGhpcykuZGF0YSgncGhvbmUtaGlkZW4nKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdXNlci1waG9uZS0tc2hvdycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXVzZXItcGhvbmUnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdXNlclBob25lXHJcblxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KHBob25lKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NpdHkgc2VsZWN0XHJcblxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5ID0gJCgnLmpzLWNpdHktc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5VGl0bGUgPSBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9fdGl0bGUgc3BhbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlQ2l0eVRpdGxlLnRleHQodGV4dCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9CYXNlIHNsaWRlclxyXG5cclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlcicpO1xyXG5cclxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcHJldkFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tcHJldicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkbmV4dEFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAkcHJldkFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAkbmV4dEFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NhdGFsb2cgSXRlbSBTbGlkZXJcclxuXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRjYXRhbG9nSXRlbVNsaWRlciA9ICQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjYXRhbG9nSXRlbVNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWl0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25zOiB7XHJcblxyXG4gICAgICAgIC8vYnRuIGV4cGFuZGVkXHJcblxyXG4gICAgICAgIGJ0bkV4cGFuZGVkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGFkZFJlbW92ZUNsYXNzKCcuanMtYnRuLWV4cGFuZGVkJywgJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2J0biBhbmltYXRlIG9uIGhvdmVyXHJcblxyXG4gICAgICAgIGJ0bkhvdmVyQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnV0dG9uLWFuaW1hdGVfX2hvdmVyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcmVsWSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWxYXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCAnLmpzLWJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50T2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbFggPSBlLnBhZ2VYIC0gcGFyZW50T2Zmc2V0LmxlZnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxZID0gZS5wYWdlWSAtIHBhcmVudE9mZnNldC50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnV0dG9uLWFuaW1hdGVfX2hvdmVyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcmVsWSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiByZWxYXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gc3RhdHVzIGFuaW1hdGVcclxuXHJcbiAgICAgICAgYnRuU3RhdHVzQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2xpY2sgPSAwO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuYnRuLWFuaW1hdGUnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xpY2srKztcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpY2sgPD0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFuaW1hdGUgaXMtcmVhZHknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMjUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtcmVhZHknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vZmxvYXRpbmcgYnRuIGFuaW1hdGluXHJcblxyXG4gICAgICAgIGJ0bkZsb2F0aW5nOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBydW4gPSB0cnVlO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoISRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRidG4uZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpLmNzcygncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9Ce0LHRgNCw0LHQvtGC0YfQuNC6INC00L7QsdCw0LLQu9GP0LXRgiDQutC70LDRgdGB0Ysg0LfQsNGC0LXQvCDQvtGC0L/QuNGB0YvQstCw0YLQtdGB0Y8g0L7RgiDRgdC+0LHRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgbGV0IGhlbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLm9mZihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbmRsZXJcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v0JDQvdC40LzQsNGG0LjRjyDQt9Cw0LrRgNGL0YLQuNGPXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBfcmVtb3ZlQW5pbWF0aW9uKGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZWwub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXJ1bikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCAnLmpzLWJ0bi1mbG9hdGluZycsIGhlbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1idG4tZmxvYXRpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtZW50ZXItYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCd6LWluZGV4JywgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bklkID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYnRuLWZsb2F0aW5nX19saW5rJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcubWQtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuSWQudHJpZ2dlcignY2xpY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2snLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLmpzLWJ0bi1mbG9hdGluZyAuYnRuLWZsb2F0aW5nX19saW5rJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZW1vdmVBbmltYXRpb24oJCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL9Ca0LvQuNC6INCyINC90LUg0LrQvdC+0L/QutC4INGB0LrRgNGL0LLQsNC10YIg0L7QstC10YDQu9C10Lkg0Lgg0LrQvdC+0L/QutC4XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5vdmVybGF5JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcyhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdmYS1sZWF2ZS1hY3RpdmUnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWxlYXZlLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyb3Bkb3duOiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZFNjcm9sbCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gZFNjcm9sbDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMik7XHJcblxyXG4gICAgICAgIC8vICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAvLyAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgaWYgKCQodGhpcykub2Zmc2V0KCkudG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0JykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICQodGhpcykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpLm9mZnNldCgpLnRvcCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnbW91c2VlbnRlcicpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QuY3NzKHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gfSxcclxuXHJcbiAgICAgICAgc2hvd0hpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5pcygnLmJiLWRyb3Bkb3duX19vdmVybGF5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5jbG9zZXN0KCcuYmItZHJvcGRvd25fX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYmItZHJvcGRvd24tLXRyYW5zZm9ybScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1iYi1kcm9wZG93bicpLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgJy5qcy1iYi1kcm9wZG93biAuaW5mby1ibG9ja19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnLmlzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRzOiB7XHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnB1dEV2ZW50cygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnB1dE1hc2soKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xyXG5cclxuICAgICAgICBpbnB1dE1hc2s6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy10aW1lLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtdGltZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ojk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb2RlLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29kZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzkgOSA5IDknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJvcm4tbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1ib3JuLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTkuOTkuOTk5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29uZmlybS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvbmZpcm0tbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1lbWFpbC1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWVtYWlsLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyp7MSwyMH1bLip7MSwyMH1dWy4qezEsMjB9XVsuKnsxLDIwfV1AKnsxLDIwfVsuKnsyLDZ9XVsuKnsxLDJ9XScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlUGFzdGU6IGZ1bmN0aW9uKHBhc3RlZFZhbHVlLCBvcHRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXN0ZWRWYWx1ZSA9IHBhc3RlZFZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFzdGVkVmFsdWUucmVwbGFjZSgnbWFpbHRvOicsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqJzoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05QS1aYS16ISMkJSYnKisvPT9eX2B7fH1+LV1cIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNpbmc6ICdsb3dlcidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnB1dEV2ZW50czogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtLWNvcHknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1jb3B5LXRleHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnVzZXItc2hhcmVfX2xpbmsnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dC50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIGlucHV0IHNlbGVjdCB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LWZvY3VzLS1jb3B5Jykub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1Nob3cgUGFzc3dvcmRcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICd0ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9IaWRlIFBhc3N3b3JkXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vRWRpdCBUZXh0IEZpZWxkXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWZpZWxkLWVkaXQnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0ID0gJCgnLmpzLWZpZWxkLWVkaXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdEJ0biA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9fYnRuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0SW5wdXQuc2hvdygpLnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0SW5wdXRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmJsdXIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5rZXlwcmVzcyhmdW5jdGlvbihldmVudCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gJzEzJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItaW5wdXQnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItaW5wdXQtdGlwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ25vLWNsb3NlJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWluZm8gaXMtZXJyb3IgaXMtaW52YWxpZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLW1vYmlsZS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19maWVsZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb2JpbGUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vYmlsZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm1vYmlsZS1zZWxlY3RfX3Jlc3VsdCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzZWxlY3Q6IHtcclxuXHJcbiAgICAgICAgLy9DdXN0b20gU2VsZWN0IGh0dHBzOi8vc2VsZWN0Mi5vcmcvXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdCcpLnNlbGVjdDIoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tbXVsdGlwbGUnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWdzOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5iYi1zZWxlY3QtLW1ldHJvJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGFkZFVzZXJQaWNcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1zZXJ2aWNlcycpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiB0aW1lQW5kUHJpY2UsXHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHRpbWVBbmRQcmljZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3Qubm8tc2VhcmNoJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC1ib3JuJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG5cclxuICAgICAgICAgICAgICAgIGFsbG93Q2xlYXI6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0ljb24gbWVudHJvIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFVzZXJQaWMob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW1hZ2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdpbWFnZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW1hZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkb3B0ID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1ldHJvLWljb24gbWV0cm8taWNvbi0tJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW1hZ2UgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG9wdC5lbGVtZW50KS50ZXh0KCkgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9wdDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vU2VsZWN0IEFkZCBQcmljZSBUaW1lICYgUHJpY2VcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRpbWVBbmRQcmljZShvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxUaW1lID0gJChvcHQuZWxlbWVudCkuZGF0YSgndGltZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFByaWNlID0gJChvcHQuZWxlbWVudCkuZGF0YSgncHJpY2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0LnRleHQgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVGltZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxQcmljZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdmb2N1cycsICcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3ROYXRpdmUgPSAkKCcuanMtc2VsZWN0LW5hdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzZWxlY3ROYXRpdmUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdE5hdGl2ZS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZWhvbGRlciA9ICQodGhpcykuZGF0YSgncGxhY2Vob2xkZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJGZpcnN0T3B0aW9uID0gJCh0aGlzKS5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3B0aW9uOmZpcnN0LWNoaWxkJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGZpcnN0T3B0aW9uLnRleHQoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmlyc3RPcHRpb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC52YWwocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtcGxhY2Vob2xkZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLndyYXAoJzxsYWJlbCBjbGFzcz1cImJiLXNlbGVjdFwiPicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sb3JTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaWNvblNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93WWVhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oaWRlWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRSZXNldEJ0bigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5waG9uZUNvZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9iaWxlU2VsZWN0KCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGljb25TZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpY29uU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWljb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGljb25TZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWlucHV0LS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpZm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaWZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBmb250YXdlc29tZSBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpZm9ybWF0KGljb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxPcHRpb24gPSBpY29uLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3Bhbj48aSBjbGFzcz1cInNlbGVjdDJfX2ljb24nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdpY29uJykgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjwvaT4gJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uLnRleHQgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29sb3JTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRjb2xvclNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1jb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkY29sb3JTZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLnNlbGVjdC1jb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NlYXJjaC1lbmFibGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb2xvciBiYWxsIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpQmFsbChjb2xvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJG9yaWdpbmFsT3B0aW9uID0gY29sb3IuZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yQmFsbCA9ICQoJG9yaWdpbmFsT3B0aW9uKS5kYXRhKCdjb2xvcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvci50ZXh0Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2xpbmVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfVwiPjwvc3Bhbj48cD4gJHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IudGV4dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPC9wPjwvZGl2PmBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fYmFsbFwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9IFwiPiA8L3NwYW4+IDwvZGl2PmBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd1llYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtc2V0LXllYXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoaWRlWWVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHllYXJTZWxlY3QgPSAkKCcuanMtc2VsZWN0LWJvcm4tLWNsZWFyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignc2VsZWN0MjpvcGVuaW5nJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5vZmYoJ3NlbGVjdDI6b3BlbmluZycpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoKSA9PSAnJyAmJlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtYm9ybicpID09PSAneWVhcidcclxuXHJcbiAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJykuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkUmVzZXRCdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkYXRlU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtYm9ybicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZGF0ZVNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoJycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT4nKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaG9uZUNvZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DaGFuZ2Ugc2VsZWN0IHJlc3VsdHMgdG8gb3B0aW9uIHZhbHVlXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlU2VsZWN0aW9uKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICsgb3B0VmFsICsgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9BZGQgY2l0eSBuYW1lIHRvIG9wdGlvblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVJlc3VsdChvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRyeSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2NvdW50cnknKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0VmFsID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cnkgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdFZhbCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgJHBob25lQ29kZUJveCA9ICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQtcGhvbmUtY29kZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHBob25lQ29kZUJveC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkcGhvbmVDb2RlQm94LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzKS5maW5kKCcuc2VsZWN0LXZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICQodGhpcykuZmluZCgnLmJiLWlucHV0X19pbnB1dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPj0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogc2VsZWN0Q29kZVJlc3VsdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHNlbGVjdENvZGVTZWxlY3Rpb24sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmItaW5wdXQtLXNlbGVjdC12YWx1ZVwiPjwvZGl2PidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uU2VsZWN0ID0gJHBhcmVudC5maW5kKCdvcHRpb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RWYWx1ZSA9ICRwYXJlbnQuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmJiLWlucHV0LS1zZWxlY3QtdmFsdWUnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcSgwKS52YWwoKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3QuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gJCh0aGlzKVswXS5zZWxlY3RlZEluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKGNvdW50ZXIpLnZhbCgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKDk5OSkgOTk5LTk5LTk5J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQub24oJ2ZvY3VzJywgYWRkRm9jdXMpLm9uKCdibHVyJywgcmVtb3ZlRm9jdXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6b3BlbicsIGFkZEZvY3VzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOmNsb3NlJywgcmVtb3ZlRm9jdXMpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZEZvY3VzKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRm9jdXMoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb3ZlLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19maWVsZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcmVzdWx0SXRlbSA9ICQodGhpcykuZmluZCgnLm1vdmUtc2VsZWN0X19yZXN1bHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJCh0aGlzKS5maW5kKCcuanMtbW92ZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkNsb3NlLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb3ZlLXNlbGVjdF9fcmVzdWx0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG1lbnU6IHtcclxuXHJcbiAgICAgICAgLy9IYW1idXJnZXIgYnRuXHJcblxyXG4gICAgICAgIGhhbWJ1cmdlckJ0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkaGFtYnVyZ2VyLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb24nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9hZGRTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtbW9iaWxlLW5hdi0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9XaGVuIENsaWNrIE91dHNpZGUgQ2xvc2UgTWVudVxyXG5cclxuICAgICAgICBjbGlja091c2lkZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnRcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuanMtbW9iaWxlLW5hdiwgLmpzLWRhdGUsIC5kYXRlcGlja2VyLCAuY2FyZC1pbmZvX19yZXF1ZXN0LCAuY2F0YWxvZy1maWx0ZXIsIC5qcy1tb2JpbGUtZmlsdGVyLS1vcGVuLCAuanMtYmItYWNjb3JkZW9uJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKS5sZW5ndGhcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm92ZXJsYXknLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Nb2JpbGUgU2VhcmNoIEJ0biBvcGVuL2Nsb3NlXHJcblxyXG4gICAgICAgIHNlYXJjaEJ0bk9wZW5DbG9zZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VhcmNoQnRuID0gJCgnLmpzLW1vYmlsZS1zZWFyY2gtYnRuJyk7XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2FkZFN0eWxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcmVtb3ZlU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBwb3B1cDoge1xyXG5cclxuICAgICAgICAvL01vZGFsIEZhbmN5Qm94IDMgaHR0cHM6Ly9mYW5jeWFwcHMuY29tL2ZhbmN5Ym94LzMvXHJcblxyXG4gICAgICAgIHBvcHVwRmFuY3lCb3g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94XScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94XScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkOiB0cnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VzXCJdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZVwiXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnZmFuY3lib3gtY29udGFpbmVyLS1pbWFnZScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1vYmlsZToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tDb250ZW50OiAnY2xvc2UnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2tTbGlkZTogJ2Nsb3NlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby10b3VjaF0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNtYWxsQnRuOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tY2xvc2VdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tY2xvc2VdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc21hbGxCdG46IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBtb2RhbDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL0Zvcm0gV2hvIElzP1xyXG5cclxuICAgICAgICB3aG9JczogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtd2hvaXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgd2hvaXMgPSAkKHRoaXMpLmRhdGEoJ3dob2lzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSAkKCcjYXV0aC1mb3JtJykuZmluZCgnLmZvcm0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2hvaXMgPT09ICdtYXN0ZXInKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLW1hc3RlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2hvaXMgPT09ICdzdHVkaW8nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLXN0dWRpbycpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uYWRkQ2xhc3MoJ2lzLWNsaWVudCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL0R1bmFtaWNseSBjaGFuZ2UgZm9ybSB0aXRsZVxyXG5cclxuICAgICAgICBjaGFuZ2VGb3JtVGl0bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgJy5qcy1mb3JtLXRpdGxlJyxcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWZvcm0tdGl0bGUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmZvcm0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5mb3JtX19idG4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQodGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignc2hvdy5icy5tb2RhbCcsICcubW9kYWwnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmFzZS5zZWxlY3QuY29sb3JTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQ2FyZFxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3QgY2FyZCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhcmQuc2xpZGVyKCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU2Nyb2xsc3B5KCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU3RpY2t5KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgY2FyZC5jYXJkUmVxdWVzdFRvZ2dsZSgpO1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRNb3ZlSXRlbXMoKTtcclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGNhcmQuY2FyZE1vdmVJdGVtcygpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNsaWRlclxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2FyZFNsaWRlciA9ICQoJy5qcy1jYXJkLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhcmRTbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9IF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCByZXF1ZXN0IHNob3cgLyBoaWRlXHJcbiAgICBjYXJkUmVxdWVzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNhcmRJbmZvUmVxdWVzdCA9ICQoJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL01vdmUgYmxvY2tzIHdoZW4gd2luZG93IHdpZHRoIDwgNzY4XHJcbiAgICBjYXJkTW92ZUl0ZW1zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2FyZC10aXRsZScpLmluc2VydEFmdGVyKCcuY2FyZC1nYWxsYXJ5X193cmFwJyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtYWJvdXQnKS5pbnNlcnRCZWZvcmUoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWluZm8tY2F0ZWdvcnknKS5hcHBlbmRUbygnLmNhcmQtaW5mb19fcmVxdWVzdCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5wcmVwZW5kVG8oJy5jYXJkLWluZm9fX3RvcCcpO1xyXG4gICAgICAgICQoJy5jYXJkLWluZm9fX2lubmVyJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5qcy1tb3ZlLWNhcmQtcG9saWN5JykuYXBwZW5kVG8oJy5jYXJkLXJlcXVlc3QtZm9ybScpO1xyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTY3JvbGxzcHlcclxuICAgIGNhcmRTY3JvbGxzcHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtc2Nyb2xsc3B5JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTEwMCB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTYwIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FyZFN0aWNreTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXN0aWNreScpLmxlbmd0aCAmJiAkKCcuanMtY2FyZC1maXhlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2sgPSAkKCcuanMtY2FyZC1zdGlja3knKTtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrT2Zmc2V0ID0gc3RpY2t5QmxvY2sub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9jayA9ICQoJy5qcy1jYXJkLWZpeGVkJyk7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrT2Zmc2V0ID0gZml4ZWRCbG9jay5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZENvbnRlbnQgPSAkKCcuanMtY2FyZC1jb250ZW50LWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnUgPSAkKCcuanMtY2FyZC1tZW51Jyk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudUNsb25lID0gJCgnPGRpdiBjbGFzcz1cImNhcmQtbWVudV9fY2xvbmVcIj4nKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJCgnLmpzLWNhcmQtbWVudScpLm91dGVySGVpZ2h0KHRydWUpKVxyXG4gICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKGNhcmRNZW51KVxyXG4gICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51T2Zmc2V0ID0gY2FyZE1lbnUub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5oZWlnaHQoKSA8IGNhcmRDb250ZW50LmhlaWdodCgpICYmXHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykud2lkdGgoKSA+IDc2OFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGZpeENhcmRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBmaXhDYXJkVXNlckluZm8oKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IC0xICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYXJkTWVudS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRNZW51Rml4ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2FyZE1lbnVGaXhlZCgpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gY2FyZE1lbnVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDk5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnUucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIE9uZXBhZ2VcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IE9uZXBhZ2UgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBCYXNlLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcbiAgICAgICAgQmFzZS5tZW51LmNsaWNrT3VzaWRlKCk7XHJcblxyXG4gICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygncGFnZS1vbmVwYWdlLS1ob21lJykpIHtcclxuICAgICAgICAgICAgT25lcGFnZS5oZXJvQW5pbWF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIoKTtcclxuICAgICAgICB0aGlzLm1vYmlsZVNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMuY291bnRlclNwaW4oKTtcclxuICAgICAgICB0aGlzLnBsYXlWaWRlbygpO1xyXG5cclxuICAgICAgICB0aGlzLnByb21vLmluaXQoKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgaGVyb0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICAgICAgdGwuZnJvbVRvKCcuaGVybycsIDEsIHsgeTogLTMwMCwgb3BhY2l0eTogMCB9LCB7IHk6IDAsIG9wYWNpdHk6IDEgfSlcclxuICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICcuaGVyb19fdGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICctPS4zJ1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3N1YnRpdGxlJyxcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAnLT0uNydcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgJy5oZXJvX193aWRnZXQnLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIHsgeTogNzAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgJy09LjUnXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICcuc29jaWFsJyxcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICB7IHk6IDUwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICctPTAuNidcclxuICAgICAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA4MTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb2JpbGVTbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKGRvY3VtZW50KS53aWR0aCgpIDwgODE1KSB7XHJcbiAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyLS1tb2JpbGUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY291bnRlclNwaW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXNjcm9sbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lciA9ICQoJy5qcy1jb3VudGVyLS13cmFwcGVyJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lck9mZnNldCA9IGNvdW50ZXJDb250YWluZXIuZGF0YSgnb2Zmc2V0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyZWVuID0gY291bnRlckNvbnRhaW5lci5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcmVlbiAtIGNvdW50ZXJDb250YWluZXJPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNwaW4gPSAkKCcuanMtY291bnRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzcGluLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb3VudGVyOiAkKHRoaXMpLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6ICdzd2luZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24obm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudGV4dChNYXRoLmNlaWwobm93KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcGxheVZpZGVvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtdmlkZW8nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgc3JjID0gJCh0aGlzKS5kYXRhKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBsZXQgZnJhbWUgPSAkKCc8aWZyYW1lPicpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICQodGhpcykuZmluZCgnLnZpZGVvX19idG4nKTtcclxuXHJcbiAgICAgICAgICAgICRidG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdzcmMnLCBzcmMgKyAnP2F1dG9wbGF5PTEmYXV0b2hpZGU9MScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQodGhpcykucGFyZW50KCcuanMtdmlkZW8nKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHByb21vOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVycygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYW5pbWF0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJy5oZXJvLS1pY29uJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG4gICAgICAgICAgICAgICAgdGwuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICcubG9nbycsXHJcbiAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICB7IHg6IC0xMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX19pbWcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDUwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX190ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAtNTAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2UtcHJvbW8nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgICAgICAgICAgICAgIHRsLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAnLmxvZ28nLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm9fX3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvX19zdWJ0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0uNidcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5zbGljay1uZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAxMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5zbGljay1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0xJ1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmFkdi1pbWFnZV9faW1nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAzMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNydcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZXJzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItYWR2JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWFkdicpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdi1pbWFnZScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1hZHYtaW1hZ2UnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci11c2VycycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci11c2VycycpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzIwcHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0cmF0aW9uOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUJsb2NrKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW92ZUJsb2NrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRhdXRoRm9ybSA9ICQoJy5qcy1wcm9tby1mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGRvY3VtZW50LndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRkb2N1bWVudC53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZUZvcm0oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNjcmVlbi0tcmVnJykuYXBwZW5kKCRhdXRoRm9ybSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbW92ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgICAgICAkYXV0aEZvcm0uaW5zZXJ0QWZ0ZXIoJy5maXJzdHNjcmVlbl9fd3JhcHBlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgICQoQmFzZS5pbml0KCkpO1xyXG4gICAgJChjYXJkLmluaXQoKSk7XHJcbiAgICAkKE9uZXBhZ2UuaW5pdCgpKTtcclxufSk7XHJcblxyXG4vKlxyXG4gKioqIGZ1bmN0aW9ucy5qc1xyXG4gKi9cclxuLy9QdXNoVXBcclxuZnVuY3Rpb24gcHVzaFVwKG9wdGlvbnMpIHtcclxuICAgIHZhciB0ZXh0ID0gb3B0aW9ucy50ZXh0IHx8ICfQktCw0Lwg0L3QvtCy0LDRjyDQt9Cw0Y/QstC60LAnO1xyXG4gICAgdmFyIHN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2JiLXB1c2hVcCcpO1xyXG4gICAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXHJcbiAgICAgICAgJ2JiLXB1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcclxuICAgICk7XHJcblxyXG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xyXG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWVycm9yJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLXN1Y2Nlc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3NoUG9zKCk7XHJcblxyXG4gICAgcmFmKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA0NTAwKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNTAwMCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1wdXNoVXAnKTtcclxuICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zaFBvcygpIHtcclxuICAgICAgICAkKCcuYmItcHVzaFVwJykuZWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAkKCcuYmItcHVzaFVwJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCBoZWlnaHQgKiBlICsgMTAgKyBlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuZnVuY3Rpb24gcmFmKGZuKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9TZXQgSW5wdXQgRGF0ZSBWYWx1ZVxyXG5mdW5jdGlvbiBzZXRJbnB1dERhdGUoc2VsZWN0b3IpIHtcclxuICAgIGxldCBfZGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBsZXQgaG95ID0gbmV3IERhdGUoKSxcclxuICAgICAgICBkID0gaG95LmdldERhdGUoKSxcclxuICAgICAgICBtID0gaG95LmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgIHkgPSBob3kuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBkYXRhO1xyXG5cclxuICAgIGlmIChkIDwgMTApIHtcclxuICAgICAgICBkID0gJzAnICsgZDtcclxuICAgIH1cclxuICAgIGlmIChtIDwgMTApIHtcclxuICAgICAgICBtID0gJzAnICsgbTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0geSArICctJyArIG0gKyAnLScgKyBkO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBfZGF0Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgX2RhdFtpXS52YWx1ZSA9IGRhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vRnVuY3Rpb24gQWRkIFJlbW92ZSBDbGFzcyBmcm9tIEJsb2NrXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzQmxvY2soYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrICsgJy0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLmFkZENsYXNzKGNsKTtcclxuICAgIH0pO1xyXG4gICAgJChibG9jayArICctLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jaykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoYmxvY2spLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiJdfQ==
