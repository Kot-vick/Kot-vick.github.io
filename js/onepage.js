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

// const Tab = (function() {

//     let $tab = $(document).find('.js-bb-tab');

//     let tab = {};


//     (tab.init = function() {

//         if ($tab.length) {

//             $tab.tabs();

//             if (!$tab.hasClass('tab--two')) {

//                 tab.lineAppend();

//             }

//         }

//     }),

//     (tab.lineAppend = function() {

//         $tab.each(function() {

//             let $tabNav = $(this).find('.tab__titles');

//             $('<li>')

//                 .addClass('tab__line')

//                 .appendTo($tabNav);


//             let $li = $tabNav.find('li');

//             let $line = $tabNav.find('.tab__line');


//             $li.each(function() {

//                 if (

//                     $(this).hasClass('is-active') ||

//                         $(this).hasClass('ui-tabs-active')

//                 ) {

//                     tab._setLineStyle($(this), $line);

//                 }

//             });


//             $li.on('click', function() {

//                 if ($(this).hasClass('tab__line')) {

//                     return;

//                 }


//                 tab._setLineStyle($(this), $line);

//             });

//         });

//     });


//     tab._setLineStyle = function(elGet, elSet) {

//         let width = elGet.width();

//         let howFar = elGet.position().left;

//         let color = elGet.data('color') || '#ff8272';

//         elSet.css({

//             left: howFar + 'px',

//             width: width,

//             background: color

//         });

//     };


//     return tab;

// })();


/**

 * Base.js

 *

 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>

 */

var Base = {

                init: function init() {

                                this.removePreloader();

                                this.accordeon();

                                this.checkbox();

                                // this.radioBtn();

                                this.tab();

                                // this.inputMask();

                                // this.inputEvents();

                                this.listToggle();

                                this.copyText();

                                this.ownerPhone();

                                this.changeCity();

                                this.slider();

                                this.catalogItemSlider();

                                this.dropdown.init();

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

                                //Init modules

                                // Tab.init();


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

                                                $('body').removeClass('loading loading-animation');
                                }, 1000);
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

                tab: function tab() {

                                $('.js-bb-tab').tabs();
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

                                                $window.on('scroll', function () {

                                                                var scrollHeight = $document.height();

                                                                var scrollPosition = $window.height() + $window.scrollTop();

                                                                if ((scrollHeight - scrollPosition) / scrollHeight === 0) {

                                                                                $btn.addClass('is-hide');
                                                                } else {

                                                                                $btn.removeClass('is-hide');
                                                                }
                                                });

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

                                                                                $header.removeAttr('style');

                                                                                $menu.removeAttr('style');
                                                                } else if (target.closest('.bb-dropdown__list').length) {

                                                                                e.stopPropagation();
                                                                } else {

                                                                                if ($(this).hasClass('is-active')) {

                                                                                                $(this).removeClass('is-active');

                                                                                                $btnFloating.fadeIn();

                                                                                                $header.removeAttr('style');

                                                                                                $menu.removeAttr('style');
                                                                                } else {

                                                                                                $dropdown.removeClass('is-active');

                                                                                                $(this).toggleClass('is-active');

                                                                                                if ($(this).hasClass('bb-dropdown--transform')) {

                                                                                                                $btnFloating.fadeOut();

                                                                                                                $header.css('z-index', 0);

                                                                                                                $menu.css('z-index', 0);
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

                                if ($wrapper.hasClass('page-onepage')) {
                                                Onepage.heroAnimate();
                                }

                                this.slider();
                                this.mobileSlider();
                                this.counterSpin();
                                this.playVideo();
                                this.setHeight();

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
                setHeight: function setHeight() {
                                var width = $window.width();
                                changeHeight();

                                $window.resize(function () {
                                                if (width >= $window.width() || width <= $window.width()) {
                                                                changeHeight();
                                                }
                                });

                                function changeHeight() {
                                                var height = $window.height();
                                                var $firstscreen = $('.firstscreen');

                                                $firstscreen.css('height', height + 'px');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiYWNjb3JkZW9uIiwiY2hlY2tib3giLCJ0YWIiLCJsaXN0VG9nZ2xlIiwiY29weVRleHQiLCJvd25lclBob25lIiwiY2hhbmdlQ2l0eSIsInNsaWRlciIsImNhdGFsb2dJdGVtU2xpZGVyIiwiZHJvcGRvd24iLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiZmluZCIsImlzIiwiYWRkQ2xhc3MiLCJoYXNDbGFzcyIsInBhcmVudCIsInJlbW92ZUF0dHIiLCJwcm9wIiwiJGFjY29yZGVvbiIsInNsaWRlVXAiLCJlYWNoIiwic2xpZGVEb3duIiwiJHBhcmVudCIsImNsb3Nlc3QiLCIkaXRlbSIsImRhdGEiLCJsaXN0Iiwid29ya0xpc3QiLCJjc3MiLCJjYiIsIkNsaXBib2FyZCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsImJ0biIsIiRidG5EYXRhIiwiJGlucHV0VmFsIiwidmFsIiwiYXR0ciIsInNob3ciLCJub3QiLCJoaWRlIiwiZmlsdGVyIiwiZmFkZU91dCIsImZhZGVJbiIsInRleHQiLCJ1c2VyUGhvbmUiLCJwaG9uZSIsImNoYW5nZUNpdHlUaXRsZSIsIiRzbGlkZXIiLCIkc2xpZHMiLCIkc2xpZGUiLCIkcHJldkFycm93IiwiJG5leHRBcnJvdyIsInNsaWNrIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwiYXJyb3dzIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCIkY2F0YWxvZ0l0ZW1TbGlkZXIiLCJfdGhpcyIsIiRzbGlkZXMiLCIkc2xpZGVyRG90cyIsImV2ZW50IiwicHJlcGVuZCIsImFwcGVuZCIsInNsaWRlQ291bnQiLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCJpIiwiaHRtbCIsImxhenlMb2FkIiwic3RvcFByb3BhZ2F0aW9uIiwidGFicyIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwiJGJ0biIsInJ1biIsImhlbmRsZXIiLCJvZmYiLCJfcmVtb3ZlQW5pbWF0aW9uIiwiZWwiLCJidG5JZCIsInRyaWdnZXIiLCJzY3JvbGxIZWlnaHQiLCJoZWlnaHQiLCJzY3JvbGxQb3NpdGlvbiIsInNjcm9sbFRvcCIsIm1lc3NhZ2VTdWNjZXNzIiwibWVzc2FnZUVycm9yIiwiZGVsYXkiLCJzdGF0dXMiLCJwdXNoVXAiLCJhbmltYXRlIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCIkZHJvcGRvd24iLCJyZW5kZXIiLCJzaG93SGlkZSIsIiRidG5DbG9zZSIsIiRkcm9wZG93bk92ZXJsYXkiLCIkZHJvcGRvd25MaXN0IiwiYXBwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsIiRidG5GbG9hdGluZyIsInRhcmdldCIsIiRoZWFkZXIiLCJ0b2dnbGVDbGFzcyIsImlucHV0RXZlbnRzIiwiaW5wdXRNYXNrIiwibW9iaWxlU2VsZWN0IiwiaW5wdXRtYXNrIiwibWFzayIsImdyZWVkeSIsIm9uQmVmb3JlUGFzdGUiLCJwYXN0ZWRWYWx1ZSIsIm9wdHMiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJkZWZpbml0aW9ucyIsInZhbGlkYXRvciIsImNhcmRpbmFsaXR5IiwiY2FzaW5nIiwiaW5wdXQiLCJleGVjQ29tbWFuZCIsIm5leHQiLCJwcmV2IiwiZmllbGRFZGl0IiwiZmllbGRFZGl0SW5wdXQiLCJmaWVsZEVkaXRCdG4iLCJmaWVsZEVkaXRUZXh0IiwiYmx1ciIsInRyaW0iLCJ2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsImtleXByZXNzIiwia2V5Q29kZSIsImVuZCIsIiRzZWxlY3QiLCIkaW5wdXRTZWFyY2giLCIkcmVzdWx0SXRlbSIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0IiwiaWNvblNlbGVjdCIsInNob3dZZWFyIiwiaGlkZVllYXIiLCJhZGRSZXNldEJ0biIsInBob25lQ29kZSIsIiRpY29uU2VsZWN0IiwiaWZvcm1hdCIsImRyb3Bkb3duUGFyZW50IiwiaWNvbiIsIm9yaWdpbmFsT3B0aW9uIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJjb2xvciIsIiRvcmlnaW5hbE9wdGlvbiIsImNvbG9yQmFsbCIsIiR5ZWFyU2VsZWN0IiwiJGRhdGVTZWxlY3QiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiJGlucHV0IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiX3JlbW92ZVN0eWxlIiwiX2FkZFN0eWxlIiwic2VhcmNoQnRuIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2FyZCIsImNhcmRTY3JvbGxzcHkiLCJjYXJkU3RpY2t5IiwiY2FyZFJlcXVlc3RUb2dnbGUiLCJjYXJkTW92ZUl0ZW1zIiwiJGNhcmRTbGlkZXIiLCJjYXJkSW5mb1JlcXVlc3QiLCJpbnNlcnRCZWZvcmUiLCJwcmVwZW5kVG8iLCJzY3JvbGxzcHkiLCJmaXhDYXJkVXNlckluZm8iLCJzY3JvbGwiLCJzdGlja3lCbG9ja09mZnNldCIsImZpeGVkQmxvY2siLCJvdXRlckhlaWdodCIsImZpeGVkQmxvY2tPZmZzZXQiLCJzdGlja3lCbG9jayIsInBvc2l0aW9uIiwiYm90dG9tIiwiY2FyZE1lbnVGaXhlZCIsImNhcmRNZW51T2Zmc2V0IiwiY2FyZE1lbnVDbG9uZSIsImNhcmRNZW51IiwicmlnaHQiLCJ6SW5kZXgiLCJjYXJkQ29udGVudCIsIk9uZXBhZ2UiLCJoZXJvQW5pbWF0ZSIsIm1vYmlsZVNsaWRlciIsImNvdW50ZXJTcGluIiwicGxheVZpZGVvIiwic2V0SGVpZ2h0IiwicHJvbW8iLCJyZWdpc3RyYXRpb24iLCJ0bCIsIlRpbWVsaW5lTWF4IiwiZnJvbVRvIiwieSIsIm9wYWNpdHkiLCJzY3JvbGxlZCIsImNvdW50ZXJDb250YWluZXIiLCJjb3VudGVyQ29udGFpbmVyT2Zmc2V0Iiwic2NyZWVuIiwiJHNwaW4iLCJDb3VudGVyIiwiZHVyYXRpb24iLCJlYXNpbmciLCJzdGVwIiwibm93IiwiTWF0aCIsImNlaWwiLCJzcmMiLCJmcmFtZSIsImNoYW5nZUhlaWdodCIsIiRmaXJzdHNjcmVlbiIsImFuaW1hdGlvbiIsInNsaWRlcnMiLCJ4IiwiZmFkZSIsImNlbnRlck1vZGUiLCJjZW50ZXJQYWRkaW5nIiwibW92ZUJsb2NrIiwiJGF1dGhGb3JtIiwibW92ZUZvcm0iLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwibWF4IiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssV0FBV0wsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU0sUUFBUU4sRUFBRSxPQUFGLENBQWQ7QUFDQSxJQUFNTyxXQUFXUCxFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUSxRQUFRUixFQUFFLFVBQUYsQ0FBZDtBQUNBLElBQU1TLGFBQWFULEVB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dGVudCI6WyIvL0dsb2JhbCBWYXJzXHJcbmNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbmNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xyXG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcclxuY29uc3QgJHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xyXG5jb25zdCAkbWFpbiA9ICQoJy5tYWluJyk7XHJcbmNvbnN0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcclxuY29uc3QgJG1lbnUgPSAkKCcuanMtbWVudScpO1xyXG5jb25zdCAkbmF2TW9iaWxlID0gJCgnLmpzLW1vYmlsZS1uYXYnKTtcclxuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuXHJcbi8vIGNvbnN0IFRhYiA9IChmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICBsZXQgJHRhYiA9ICQoZG9jdW1lbnQpLmZpbmQoJy5qcy1iYi10YWInKTtcclxuXHJcbi8vICAgICBsZXQgdGFiID0ge307XHJcblxyXG5cclxuXHJcbi8vICAgICAodGFiLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgaWYgKCR0YWIubGVuZ3RoKSB7XHJcblxyXG4vLyAgICAgICAgICAgICAkdGFiLnRhYnMoKTtcclxuXHJcbi8vICAgICAgICAgICAgIGlmICghJHRhYi5oYXNDbGFzcygndGFiLS10d28nKSkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIHRhYi5saW5lQXBwZW5kKCk7XHJcblxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICB9KSxcclxuXHJcbi8vICAgICAodGFiLmxpbmVBcHBlbmQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgJHRhYi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgICAgICAgICAgbGV0ICR0YWJOYXYgPSAkKHRoaXMpLmZpbmQoJy50YWJfX3RpdGxlcycpO1xyXG5cclxuLy8gICAgICAgICAgICAgJCgnPGxpPicpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd0YWJfX2xpbmUnKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiTmF2KTtcclxuXHJcblxyXG5cclxuLy8gICAgICAgICAgICAgbGV0ICRsaSA9ICR0YWJOYXYuZmluZCgnbGknKTtcclxuXHJcbi8vICAgICAgICAgICAgIGxldCAkbGluZSA9ICR0YWJOYXYuZmluZCgnLnRhYl9fbGluZScpO1xyXG5cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAkbGkuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpIHx8XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCd1aS10YWJzLWFjdGl2ZScpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgKSB7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRhYi5fc2V0TGluZVN0eWxlKCQodGhpcyksICRsaW5lKTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuLy8gICAgICAgICAgICAgJGxpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0YWJfX2xpbmUnKSkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgdGFiLl9zZXRMaW5lU3R5bGUoJCh0aGlzKSwgJGxpbmUpO1xyXG5cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAgICAgdGFiLl9zZXRMaW5lU3R5bGUgPSBmdW5jdGlvbihlbEdldCwgZWxTZXQpIHtcclxuXHJcbi8vICAgICAgICAgbGV0IHdpZHRoID0gZWxHZXQud2lkdGgoKTtcclxuXHJcbi8vICAgICAgICAgbGV0IGhvd0ZhciA9IGVsR2V0LnBvc2l0aW9uKCkubGVmdDtcclxuXHJcbi8vICAgICAgICAgbGV0IGNvbG9yID0gZWxHZXQuZGF0YSgnY29sb3InKSB8fCAnI2ZmODI3Mic7XHJcblxyXG4vLyAgICAgICAgIGVsU2V0LmNzcyh7XHJcblxyXG4vLyAgICAgICAgICAgICBsZWZ0OiBob3dGYXIgKyAncHgnLFxyXG5cclxuLy8gICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG5cclxuLy8gICAgICAgICAgICAgYmFja2dyb3VuZDogY29sb3JcclxuXHJcbi8vICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgfTtcclxuXHJcblxyXG5cclxuLy8gICAgIHJldHVybiB0YWI7XHJcblxyXG4vLyB9KSgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG5cclxuICogQmFzZS5qc1xyXG5cclxuICpcclxuXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcblxyXG4gKi9cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blB1c2goKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC53aG9JcygpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vSW5pdCBtb2R1bGVzXHJcblxyXG4gICAgICAgIC8vIFRhYi5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhcigpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmhhbWJ1cmdlckJ0bigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmNsaWNrT3VzaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2VhcmNoQnRuT3BlbkNsb3NlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcclxuXHJcbiAgICAgICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzY3JvbGxCYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzU4NWE1OScsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnMnB4JyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcyJ1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vUmVtb3ZlIHByZWxvYWRlclxyXG5cclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DdXN0b20gY2hlY2JveCAmIGNoZWNrYm94UHNldWRvXHJcblxyXG4gICAgY2hlY2tib3g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LXNlbGVjdC1hbGwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuXHJcbiAgICBhY2NvcmRlb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJGFjY29yZGVvbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1hY2NvcmRlb24gLmJiLWFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbihcclxuXHJcbiAgICAgICAgICAgIGVcclxuXHJcbiAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwYXJlbnQuZGF0YSgnYWNjb3JkZW9uJykgPT09ICdjb2xsYXBzZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0VG9nZ2xlKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gJCgnLmpzLWxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tib3ggPSBsaXN0LmZpbmQoJy5qcy1iYi1jaGVja2JveCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrTGlzdCA9IGxpc3QuZmluZCgnLmpzLWxpc3QtdG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja2JveC5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdFRvZ2dsZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NvcHkgdGV4dCBjbGljayBsaW5rXHJcblxyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgY2IgPSBuZXcgQ2xpcGJvYXJkKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG5cclxuICAgICAgICAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYm94Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0blJlc2V0ID0gJHBhcmVudC5maW5kKCcuanMtaW5wdXQtLWNsZWFyJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGhpbnQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9ICRwYXJlbnQuZmluZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkRhdGEgPSAkKHRoaXMpLmRhdGEoJ2NsaXBib2FyZC10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXRWYWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hdHRyKCdkYXRhLWNsaXBib2FyZC10ZXh0JywgJGJ0bkRhdGEgKyAkaW5wdXRWYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLnZhbCgnJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X19pY29uJylcclxuXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZUluKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuXHJcbiAgICBvd25lclBob25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLXVzZXItcGhvbmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKTsnKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KCQodGhpcykuZGF0YSgncGhvbmUtaGlkZW4nKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdXNlci1waG9uZS0tc2hvdycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXVzZXItcGhvbmUnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdXNlclBob25lXHJcblxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KHBob25lKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NpdHkgc2VsZWN0XHJcblxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5ID0gJCgnLmpzLWNpdHktc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5VGl0bGUgPSBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9fdGl0bGUgc3BhbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlQ2l0eVRpdGxlLnRleHQodGV4dCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9CYXNlIHNsaWRlclxyXG5cclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlcicpO1xyXG5cclxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcHJldkFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tcHJldicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkbmV4dEFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAkcHJldkFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAkbmV4dEFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NhdGFsb2cgSXRlbSBTbGlkZXJcclxuXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRjYXRhbG9nSXRlbVNsaWRlciA9ICQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjYXRhbG9nSXRlbVNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWl0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB0YWI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uczoge1xyXG5cclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG5cclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG5cclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcblxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcnVuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gJHdpbmRvdy5oZWlnaHQoKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChzY3JvbGxIZWlnaHQgLSBzY3JvbGxQb3NpdGlvbikgLyBzY3JvbGxIZWlnaHQgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcygnaXMtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyb3Bkb3duOiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZFNjcm9sbCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gZFNjcm9sbDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMik7XHJcblxyXG4gICAgICAgIC8vICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAvLyAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgaWYgKCQodGhpcykub2Zmc2V0KCkudG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0JykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICQodGhpcykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpLm9mZnNldCgpLnRvcCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnbW91c2VlbnRlcicpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QuY3NzKHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gfSxcclxuXHJcbiAgICAgICAgc2hvd0hpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5pcygnLmJiLWRyb3Bkb3duX19vdmVybGF5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYmItZHJvcGRvd24tLXRyYW5zZm9ybScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLmNzcygnei1pbmRleCcsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRtZW51LmNzcygnei1pbmRleCcsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duIC5pbmZvLWJsb2NrX19saW5rJyxcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCcuaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dHM6IHtcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcblxyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy10aW1lLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk6OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvZGUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOSA5IDkgOSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29uZmlybS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWVtYWlsLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKnsxLDIwfVsuKnsxLDIwfV1bLip7MSwyMH1dWy4qezEsMjB9XUAqezEsMjB9Wy4qezIsNn1dWy4qezEsMn1dJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24ocGFzdGVkVmFsdWUsIG9wdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXN0ZWRWYWx1ZS5yZXBsYWNlKCdtYWlsdG86JywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLVphLXohIyQlJicqKy89P15fYHt8fX4tXVwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogJ2xvd2VyJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC0tY29weScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgaW5wdXQgc2VsZWN0IHZhbHVlXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vU2hvdyBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0hpZGUgUGFzc3dvcmRcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9FZGl0IFRleHQgRmllbGRcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZmllbGQtZWRpdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXQgPSAkKCcuanMtZmllbGQtZWRpdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0QnRuID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19idG4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dC5zaG93KCkuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYmx1cihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAnMTMnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1pbnB1dCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnbm8tY2xvc2UnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW9iaWxlLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vYmlsZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW9iaWxlLXNlbGVjdF9fcmVzdWx0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjdDoge1xyXG5cclxuICAgICAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLXNlcnZpY2VzJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogdGltZUFuZFByaWNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LWJvcm4nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWV0cm8taWNvbiBtZXRyby1pY29uLS0nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TZWxlY3QgQWRkIFByaWNlIFRpbWUgJiBQcmljZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZUFuZFByaWNlKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFRpbWUgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCd0aW1lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsUHJpY2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdwcmljZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQudGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxUaW1lICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFByaWNlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdE5hdGl2ZSA9ICQoJy5qcy1zZWxlY3QtbmF0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSAkKHRoaXMpLmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb246Zmlyc3QtY2hpbGQnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pY29uU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhpZGVZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFJlc2V0QnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaWNvblNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGljb25TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0taWNvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkaWNvblNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpZm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIGZvbnRhd2Vzb21lIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlmb3JtYXQoaWNvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbE9wdGlvbiA9IGljb24uZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPjxpIGNsYXNzPVwic2VsZWN0Ml9faWNvbicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQob3JpZ2luYWxPcHRpb24pLmRhdGEoJ2ljb24nKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pPiAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24udGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xvclNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjb2xvclNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0LWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VhcmNoLWVuYWJsZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbG9yIGJhbGwgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlCYWxsKGNvbG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkb3JpZ2luYWxPcHRpb24gPSBjb2xvci5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JCYWxsID0gJCgkb3JpZ2luYWxPcHRpb24pLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yLnRleHQubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fbGluZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9XCI+PC9zcGFuPjxwPiAke1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvci50ZXh0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA8L3A+PC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19iYWxsXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH0gXCI+IDwvc3Bhbj4gPC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93WWVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zZXQteWVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkeWVhclNlbGVjdCA9ICQoJy5qcy1zZWxlY3QtYm9ybi0tY2xlYXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdzZWxlY3QyOm9wZW5pbmcnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1ib3JuJykgPT09ICd5ZWFyJ1xyXG5cclxuICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRSZXNldEJ0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRhdGVTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1ib3JuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkYXRlU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAudGV4dCgnJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPicpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVTZWxlY3Rpb24ob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlUmVzdWx0KG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0VmFsICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkcGhvbmVDb2RlQm94ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dC1waG9uZS1jb2RlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkcGhvbmVDb2RlQm94Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRwaG9uZUNvZGVCb3guZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzKS5maW5kKCcuYmItaW5wdXRfX2lucHV0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBzZWxlY3RDb2RlUmVzdWx0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogc2VsZWN0Q29kZVNlbGVjdGlvbixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1pbnB1dC0tc2VsZWN0LXZhbHVlXCI+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25TZWxlY3QgPSAkcGFyZW50LmZpbmQoJ29wdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdFZhbHVlID0gJHBhcmVudC5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoY291bnRlcikudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLW1vdmUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb3ZlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm1vdmUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbWVudToge1xyXG5cclxuICAgICAgICAvL0hhbWJ1cmdlciBidG5cclxuXHJcbiAgICAgICAgaGFtYnVyZ2VyQnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX2FkZFN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL1doZW4gQ2xpY2sgT3V0c2lkZSBDbG9zZSBNZW51XHJcblxyXG4gICAgICAgIGNsaWNrT3VzaWRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LCAuanMtZGF0ZSwgLmRhdGVwaWNrZXIsIC5jYXJkLWluZm9fX3JlcXVlc3QsIC5jYXRhbG9nLWZpbHRlciwgLmpzLW1vYmlsZS1maWx0ZXItLW9wZW4sIC5qcy1iYi1hY2NvcmRlb24nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGVcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggQnRuIG9wZW4vY2xvc2VcclxuXHJcbiAgICAgICAgc2VhcmNoQnRuT3BlbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hCdG4gPSAkKCcuanMtbW9iaWxlLXNlYXJjaC1idG4nKTtcclxuXHJcbiAgICAgICAgICAgIHNlYXJjaEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZW1vdmVTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBvcHVwOiB7XHJcblxyXG4gICAgICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuXHJcbiAgICAgICAgcG9wdXBGYW5jeUJveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWQ6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlXCJdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdmYW5jeWJveC1jb250YWluZXItLWltYWdlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja0NvbnRlbnQ6ICdjbG9zZScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja1NsaWRlOiAnY2xvc2UnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc21hbGxCdG46IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzbWFsbEJ0bjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vZGFsOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRm9ybSBXaG8gSXM/XHJcblxyXG4gICAgICAgIHdob0lzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB3aG9pcyA9ICQodGhpcykuZGF0YSgnd2hvaXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9ICQoJyNhdXRoLWZvcm0nKS5maW5kKCcuZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aG9pcyA9PT0gJ21hc3RlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtbWFzdGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aG9pcyA9PT0gJ3N0dWRpbycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtc3R1ZGlvJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtY2xpZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRHVuYW1pY2x5IGNoYW5nZSBmb3JtIHRpdGxlXHJcblxyXG4gICAgICAgIGNoYW5nZUZvcm1UaXRsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWZvcm0tdGl0bGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDYXJkXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBjYXJkID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2FyZC5zbGlkZXIoKTtcclxuICAgICAgICBjYXJkLmNhcmRTY3JvbGxzcHkoKTtcclxuICAgICAgICBjYXJkLmNhcmRTdGlja3koKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRSZXF1ZXN0VG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZE1vdmVJdGVtcygpO1xyXG5cclxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoY2FyZC5jYXJkTW92ZUl0ZW1zKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2xpZGVyXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zbGlkZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0ICRjYXJkU2xpZGVyID0gJCgnLmpzLWNhcmQtc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAkY2FyZFNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tcHJldicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMjAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIHJlcXVlc3Qgc2hvdyAvIGhpZGVcclxuICAgIGNhcmRSZXF1ZXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgY2FyZEluZm9SZXF1ZXN0ID0gJCgnLmNhcmQtaW5mb19fcmVxdWVzdCcpO1xyXG5cclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbmZvUmVxdWVzdC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRJbmZvUmVxdWVzdC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vTW92ZSBibG9ja3Mgd2hlbiB3aW5kb3cgd2lkdGggPCA3NjhcclxuICAgIGNhcmRNb3ZlSXRlbXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXRpdGxlJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWdhbGxhcnlfX3dyYXAnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1hYm91dCcpLmluc2VydEJlZm9yZSgnLmNhcmQtYWRyZXNzJyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtaW5mby1jYXRlZ29yeScpLmFwcGVuZFRvKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0tc2hvdycpLnByZXBlbmRUbygnLmNhcmQtaW5mb19fdG9wJyk7XHJcbiAgICAgICAgJCgnLmNhcmQtaW5mb19faW5uZXInKS5pbnNlcnRBZnRlcignLmNhcmQtYWRyZXNzJyk7XHJcbiAgICAgICAgJCgnLmpzLW1vdmUtY2FyZC1wb2xpY3knKS5hcHBlbmRUbygnLmNhcmQtcmVxdWVzdC1mb3JtJyk7XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNjcm9sbHNweVxyXG4gICAgY2FyZFNjcm9sbHNweTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1zY3JvbGxzcHknKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2Nyb2xsc3B5Jykuc2Nyb2xsc3B5KHsgb2Zmc2V0OiAtMTAwIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2Nyb2xsc3B5Jykuc2Nyb2xsc3B5KHsgb2Zmc2V0OiAtNjAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjYXJkU3RpY2t5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc3RpY2t5JykubGVuZ3RoICYmICQoJy5qcy1jYXJkLWZpeGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9jayA9ICQoJy5qcy1jYXJkLXN0aWNreScpO1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2tPZmZzZXQgPSBzdGlja3lCbG9jay5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrID0gJCgnLmpzLWNhcmQtZml4ZWQnKTtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2tPZmZzZXQgPSBmaXhlZEJsb2NrLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkQ29udGVudCA9ICQoJy5qcy1jYXJkLWNvbnRlbnQtZml4ZWQnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudSA9ICQoJy5qcy1jYXJkLW1lbnUnKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51Q2xvbmUgPSAkKCc8ZGl2IGNsYXNzPVwiY2FyZC1tZW51X19jbG9uZVwiPicpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAkKCcuanMtY2FyZC1tZW51Jykub3V0ZXJIZWlnaHQodHJ1ZSkpXHJcbiAgICAgICAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoY2FyZE1lbnUpXHJcbiAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVPZmZzZXQgPSBjYXJkTWVudS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmhlaWdodCgpIDwgY2FyZENvbnRlbnQuaGVpZ2h0KCkgJiZcclxuICAgICAgICAgICAgICAgICQod2luZG93KS53aWR0aCgpID4gNzY4XHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZml4Q2FyZFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpeENhcmRVc2VySW5mbygpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogLTEgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3NSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KCkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMwXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM3NSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNhcmRNZW51Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2FyZE1lbnVGaXhlZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjYXJkTWVudUZpeGVkKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+PSBjYXJkTWVudU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogOTlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudS5yZW1vdmVBdHRyKCdzdHlsZScpLnJlbW92ZUNsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogT25lcGFnZVxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3QgT25lcGFnZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIEJhc2UubWVudS5oYW1idXJnZXJCdG4oKTtcclxuICAgICAgICBCYXNlLm1lbnUuY2xpY2tPdXNpZGUoKTtcclxuXHJcbiAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLW9uZXBhZ2UnKSkge1xyXG4gICAgICAgICAgICBPbmVwYWdlLmhlcm9BbmltYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG4gICAgICAgIHRoaXMubW9iaWxlU2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5jb3VudGVyU3BpbigpO1xyXG4gICAgICAgIHRoaXMucGxheVZpZGVvKCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9tby5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24uaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaWNvbi5pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgaGVyb0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICAgICAgdGwuZnJvbVRvKCcuaGVybycsIDEsIHsgeTogLTMwMCwgb3BhY2l0eTogMCB9LCB7IHk6IDAsIG9wYWNpdHk6IDEgfSlcclxuICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICcuaGVyb19fdGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICctPS4zJ1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3N1YnRpdGxlJyxcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAnLT0uNydcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgJy5oZXJvX193aWRnZXQnLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIHsgeTogNzAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgJy09LjUnXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICcuc29jaWFsJyxcclxuICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICB7IHk6IDUwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICctPTAuNidcclxuICAgICAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA4MTUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0MjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb2JpbGVTbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKGRvY3VtZW50KS53aWR0aCgpIDwgODE1KSB7XHJcbiAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLW9uZXBhZ2Utc2xpZGVyLS1tb2JpbGUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY291bnRlclNwaW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzY3JvbGxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXNjcm9sbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lciA9ICQoJy5qcy1jb3VudGVyLS13cmFwcGVyJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lck9mZnNldCA9IGNvdW50ZXJDb250YWluZXIuZGF0YSgnb2Zmc2V0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyZWVuID0gY291bnRlckNvbnRhaW5lci5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcmVlbiAtIGNvdW50ZXJDb250YWluZXJPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNwaW4gPSAkKCcuanMtY291bnRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzcGluLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYW5pbWF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb3VudGVyOiAkKHRoaXMpLnRleHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNpbmc6ICdzd2luZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogZnVuY3Rpb24obm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudGV4dChNYXRoLmNlaWwobm93KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcGxheVZpZGVvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtdmlkZW8nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgc3JjID0gJCh0aGlzKS5kYXRhKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBsZXQgZnJhbWUgPSAkKCc8aWZyYW1lPicpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICQodGhpcykuZmluZCgnLnZpZGVvX19idG4nKTtcclxuXHJcbiAgICAgICAgICAgICRidG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdzcmMnLCBzcmMgKyAnP2F1dG9wbGF5PTEmYXV0b2hpZGU9MScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCQodGhpcykucGFyZW50KCcuanMtdmlkZW8nKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNldEhlaWdodDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gJHdpbmRvdy53aWR0aCgpO1xyXG4gICAgICAgIGNoYW5nZUhlaWdodCgpO1xyXG5cclxuICAgICAgICAkd2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHdpZHRoID49ICR3aW5kb3cud2lkdGgoKSB8fCB3aWR0aCA8PSAkd2luZG93LndpZHRoKCkpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUhlaWdodCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZUhlaWdodCgpIHtcclxuICAgICAgICAgICAgbGV0IGhlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIGxldCAkZmlyc3RzY3JlZW4gPSAkKCcuZmlyc3RzY3JlZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRmaXJzdHNjcmVlbi5jc3MoJ2hlaWdodCcsIGhlaWdodCArICdweCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwcm9tbzoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlcnMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuaGVyby0taWNvbicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgICAgICAgICAgICAgIHRsLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAnLmxvZ28nLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm8taW5jb19faW1nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiA1MCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MC41J1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm8taW5jb19fdGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogLTUwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLXByb21vJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICAgICAgICAgICAgICB0bC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgJy5sb2dvJyxcclxuICAgICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvX190aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyb19fc3VidGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDEwMCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy09LjYnXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuc2xpY2stbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuc2xpY2stcHJldicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogLTEwMCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy09MSdcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5hZHYtaW1hZ2VfX2ltZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMzAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjcnXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1hZHYnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci1hZHYtaW1hZ2UnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItYWR2LWltYWdlJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmYWRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItdXNlcnMnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItdXNlcnMnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWljb25zJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWljb25zJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDQwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnMjBweCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdHJhdGlvbjoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVCbG9jaygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1vdmVCbG9jazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkYXV0aEZvcm0gPSAkKCcuanMtcHJvbW8tZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRkb2N1bWVudC53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICBtb3ZlRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkZG9jdW1lbnQud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVGb3JtKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5zY3JlZW4tLXJlZycpLmFwcGVuZCgkYXV0aEZvcm0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vdmVGb3JtKCkge1xyXG4gICAgICAgICAgICAgICAgJGF1dGhGb3JtLmluc2VydEFmdGVyKCcuZmlyc3RzY3JlZW5fX3dyYXBwZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpY29uOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtc2xpZGVyJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgICQoQmFzZS5pbml0KCkpO1xyXG4gICAgJChjYXJkLmluaXQoKSk7XHJcbiAgICAkKE9uZXBhZ2UuaW5pdCgpKTtcclxufSk7XHJcblxyXG4vKlxyXG4gKioqIGZ1bmN0aW9ucy5qc1xyXG4gKi9cclxuLy9QdXNoVXBcclxuZnVuY3Rpb24gcHVzaFVwKG9wdGlvbnMpIHtcclxuICAgIHZhciB0ZXh0ID0gb3B0aW9ucy50ZXh0IHx8ICfQktCw0Lwg0L3QvtCy0LDRjyDQt9Cw0Y/QstC60LAnO1xyXG4gICAgdmFyIHN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2JiLXB1c2hVcCcpO1xyXG4gICAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXHJcbiAgICAgICAgJ2JiLXB1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcclxuICAgICk7XHJcblxyXG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xyXG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWVycm9yJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLXN1Y2Nlc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3NoUG9zKCk7XHJcblxyXG4gICAgcmFmKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA0NTAwKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNTAwMCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1wdXNoVXAnKTtcclxuICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zaFBvcygpIHtcclxuICAgICAgICAkKCcuYmItcHVzaFVwJykuZWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAkKCcuYmItcHVzaFVwJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCBoZWlnaHQgKiBlICsgMTAgKyBlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuZnVuY3Rpb24gcmFmKGZuKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9TZXQgSW5wdXQgRGF0ZSBWYWx1ZVxyXG5mdW5jdGlvbiBzZXRJbnB1dERhdGUoc2VsZWN0b3IpIHtcclxuICAgIGxldCBfZGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBsZXQgaG95ID0gbmV3IERhdGUoKSxcclxuICAgICAgICBkID0gaG95LmdldERhdGUoKSxcclxuICAgICAgICBtID0gaG95LmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgIHkgPSBob3kuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBkYXRhO1xyXG5cclxuICAgIGlmIChkIDwgMTApIHtcclxuICAgICAgICBkID0gJzAnICsgZDtcclxuICAgIH1cclxuICAgIGlmIChtIDwgMTApIHtcclxuICAgICAgICBtID0gJzAnICsgbTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0geSArICctJyArIG0gKyAnLScgKyBkO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBfZGF0Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgX2RhdFtpXS52YWx1ZSA9IGRhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vRnVuY3Rpb24gQWRkIFJlbW92ZSBDbGFzcyBmcm9tIEJsb2NrXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzQmxvY2soYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrICsgJy0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLmFkZENsYXNzKGNsKTtcclxuICAgIH0pO1xyXG4gICAgJChibG9jayArICctLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jaykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoYmxvY2spLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiJdfQ==
