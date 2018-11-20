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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkaGVhZGVyIiwiJG1haW4iLCIkb3ZlcmxheSIsIiRuYXZNb2JpbGUiLCIkaGFtYnVyZ2VyIiwiQmFzZSIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJkcm9wZG93biIsInNlbGVjdCIsImlucHV0cyIsImJ1dHRvbnMiLCJidG5FeHBhbmRlZCIsImJ0bkhvdmVyQW5pbWF0ZSIsImJ0blN0YXR1c0FuaW1hdGUiLCJidG5Hb1RvcCIsImJ0bkdvVG8iLCJidG5GbG9hdGluZyIsImJ0blB1c2giLCJwb3B1cCIsInBvcHVwRmFuY3lCb3giLCJ3aG9JcyIsImNoYW5nZUZvcm1UaXRsZSIsInJlaW5pdCIsIndpZHRoIiwic2Nyb2xsQmFyIiwibWVudSIsImhhbWJ1cmdlckJ0biIsImNsaWNrT3VzaWRlIiwic2VhcmNoQnRuT3BlbkNsb3NlIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJib3h6b29tIiwidmVyZ2UiLCJjdXJzb3J3aWR0aCIsImN1cnNvcmJvcmRlciIsImN1cnNvcmJvcmRlcnJhZGl1cyIsImdldE5pY2VTY3JvbGwiLCJyZXNpemUiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2xhc3MiLCJmaW5kIiwiaXMiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwicGFyZW50IiwicmVtb3ZlQXR0ciIsInByb3AiLCIkYWNjb3JkZW9uIiwic2xpZGVVcCIsImVhY2giLCJzbGlkZURvd24iLCIkcGFyZW50IiwiY2xvc2VzdCIsIiRpdGVtIiwiZGF0YSIsImxpc3QiLCJ3b3JrTGlzdCIsImNzcyIsImNiIiwiQ2xpcGJvYXJkIiwiJGlucHV0SWNvbiIsIiRidG5SZXNldCIsIiRoaW50IiwiYnRuIiwiJGJ0bkRhdGEiLCIkaW5wdXRWYWwiLCJ2YWwiLCJhdHRyIiwic2hvdyIsIm5vdCIsImhpZGUiLCJmaWx0ZXIiLCJmYWRlT3V0IiwiZmFkZUluIiwidGV4dCIsInVzZXJQaG9uZSIsInBob25lIiwiY2hhbmdlQ2l0eVRpdGxlIiwiJHNsaWRlciIsIiRzbGlkcyIsIiRzbGlkZSIsIiRwcmV2QXJyb3ciLCIkbmV4dEFycm93Iiwic2xpY2siLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiaW5maW5pdGUiLCJhcnJvd3MiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIiRjYXRhbG9nSXRlbVNsaWRlciIsIl90aGlzIiwiJHNsaWRlcyIsIiRzbGlkZXJEb3RzIiwiZXZlbnQiLCJwcmVwZW5kIiwiYXBwZW5kIiwic2xpZGVDb3VudCIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsImkiLCJodG1sIiwibGF6eUxvYWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YWJzIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsInNjcm9sbEhlaWdodCIsImhlaWdodCIsInNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsVG9wIiwibWVzc2FnZVN1Y2Nlc3MiLCJtZXNzYWdlRXJyb3IiLCJkZWxheSIsInN0YXR1cyIsInB1c2hVcCIsImFuaW1hdGUiLCJlbGVtZW50Q2xpY2siLCJkZXN0aW5hdGlvbiIsIiRkcm9wZG93biIsInJlbmRlciIsInNob3dIaWRlIiwiJGJ0bkNsb3NlIiwiJGRyb3Bkb3duT3ZlcmxheSIsIiRkcm9wZG93bkxpc3QiLCJhcHBlbmRUbyIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwiJGJ0bkZsb2F0aW5nIiwidGFyZ2V0IiwiJG1lbnUiLCJ0b2dnbGVDbGFzcyIsImlucHV0RXZlbnRzIiwiaW5wdXRNYXNrIiwibW9iaWxlU2VsZWN0IiwiaW5wdXRtYXNrIiwibWFzayIsImdyZWVkeSIsIm9uQmVmb3JlUGFzdGUiLCJwYXN0ZWRWYWx1ZSIsIm9wdHMiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJkZWZpbml0aW9ucyIsInZhbGlkYXRvciIsImNhcmRpbmFsaXR5IiwiY2FzaW5nIiwiaW5wdXQiLCJleGVjQ29tbWFuZCIsIm5leHQiLCJwcmV2IiwiZmllbGRFZGl0IiwiZmllbGRFZGl0SW5wdXQiLCJmaWVsZEVkaXRCdG4iLCJmaWVsZEVkaXRUZXh0IiwiYmx1ciIsInRyaW0iLCJ2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsImtleXByZXNzIiwia2V5Q29kZSIsImVuZCIsIiRzZWxlY3QiLCIkaW5wdXRTZWFyY2giLCIkcmVzdWx0SXRlbSIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0IiwiaWNvblNlbGVjdCIsInNob3dZZWFyIiwiaGlkZVllYXIiLCJhZGRSZXNldEJ0biIsInBob25lQ29kZSIsIiRpY29uU2VsZWN0IiwiaWZvcm1hdCIsImRyb3Bkb3duUGFyZW50IiwiaWNvbiIsIm9yaWdpbmFsT3B0aW9uIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJjb2xvciIsIiRvcmlnaW5hbE9wdGlvbiIsImNvbG9yQmFsbCIsIiR5ZWFyU2VsZWN0IiwiJGRhdGVTZWxlY3QiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiJGlucHV0IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiX3JlbW92ZVN0eWxlIiwiX2FkZFN0eWxlIiwic2VhcmNoQnRuIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiY2F0YWxvZyIsIm1hcFRvZ2dsZSIsImJ0bkZpbHRlck9wZW4iLCJidG5TaG93Q2F0YWxvZyIsImJ0blNob3dNYXAiLCJzdGlja3lGaWx0ZXIiLCJmaWx0ZXJDYXRlZ29yeSIsIm1vdmVCbG9ja3MiLCJpZlBhZ2VDYXRhbG9nIiwiY2F0YWxvZ0ZpbHRlciIsIlN0aWNreVNpZGViYXIiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsImNvbnRhaW5lclNlbGVjdG9yIiwiaW5uZXJXcmFwcGVyU2VsZWN0b3IiLCJpbnNlcnRCZWZvcmUiLCJvdXRlckhlaWdodCIsImNhcmQiLCJjYXJkU2Nyb2xsc3B5IiwiY2FyZFN0aWNreSIsImNhcmRSZXF1ZXN0VG9nZ2xlIiwiY2FyZE1vdmVJdGVtcyIsIiRjYXJkU2xpZGVyIiwiY2FyZEluZm9SZXF1ZXN0IiwicHJlcGVuZFRvIiwic2Nyb2xsc3B5IiwiZml4Q2FyZFVzZXJJbmZvIiwic2Nyb2xsIiwic3RpY2t5QmxvY2tPZmZzZXQiLCJmaXhlZEJsb2NrIiwiZml4ZWRCbG9ja09mZnNldCIsInN0aWNreUJsb2NrIiwicG9zaXRpb24iLCJib3R0b20iLCJjYXJkTWVudUZpeGVkIiwiY2FyZE1lbnVPZmZzZXQiLCJjYXJkTWVudUNsb25lIiwiY2FyZE1lbnUiLCJyaWdodCIsInpJbmRleCIsImNhcmRDb250ZW50IiwiTWFpbiIsInBhZ2VQcm9tbyIsIm9wdGlvbnMiLCJwdXNoQ29udGFpbmVyIiwicHVzaFVwQ2xvc2UiLCJwb3NoUG9zIiwicmFmIiwiZm4iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzZXRJbnB1dERhdGUiLCJzZWxlY3RvciIsIl9kYXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaG95IiwiRGF0ZSIsImQiLCJnZXREYXRlIiwibSIsImdldE1vbnRoIiwieSIsImdldEZ1bGxZZWFyIiwibWF4IiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsImJsb2NrIiwiY2wiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFNQSxVQUFVQyxFQUFFQyxNQUFGLENBQWhCO0FBQ0EsSUFBTUMsWUFBWUYsRUFBRUcsUUFBRixDQUFsQjtBQUNBLElBQU1DLFFBQVFKLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTUssV0FBV0wsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU0sVUFBVU4sRUFBRSxTQUFGLENBQWhCO0FBQ0EsSUFBTU8sUUFBUVAsRUFBRSxPQUFGLENBQWQ7QUFDQSxJQUFNUSxXQUFXUixFQUFFLFVBQUYsQ0FBakI7QUFDQSxJQUFNUyxhQUFhVCxFQUFFLGdCQUFGLENBQW5CO0FBQ0EsSUFBTVUsYUFBYVYsRUFBRSxrQkFBRixDQUFuQjs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBSUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUlB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QUNwQ3pWLGtCQUFFd1YsUUFBUSxRQUFWLEVBQW9CM1MsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBVztBQUN2QzdDLGtDQUFFd1YsS0FBRixFQUFTMVIsUUFBVCxDQUFrQjJSLEVBQWxCO0FBQ0gsaUJBRkQ7QUFHQXpWLGtCQUFFd1YsUUFBUSxTQUFWLEVBQXFCM1MsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4QzdDLGtDQUFFd1YsS0FBRixFQUFTN1IsV0FBVCxDQUFxQjhSLEVBQXJCO0FBQ0gsaUJBRkQ7QUFHSDs7QUFFRCxTQUFTck4sY0FBVCxDQUF3Qm9OLEtBQXhCLEVBQStCQyxFQUEvQixFQUFtQztBQUMvQnpWLGtCQUFFd1YsS0FBRixFQUFTM1MsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBVztBQUM1QjdDLGtDQUFFLElBQUYsRUFBUThLLFdBQVIsQ0FBb0IySyxFQUFwQjtBQUNILGlCQUZEOztBQUlBelYsa0JBQUVHLFFBQUYsRUFBWTBDLEVBQVosQ0FBZSw0QkFBZixFQUE2QyxVQUFTQyxDQUFULEVBQVk7QUFDckQsb0NBQUk5QyxFQUFFOEMsRUFBRThILE1BQUosRUFBWXBHLE9BQVosQ0FBb0JnUixLQUFwQixFQUEyQnhTLE1BQS9CLEVBQXVDO0FBQ3ZDaEQsa0NBQUV3VixLQUFGLEVBQVM3UixXQUFULENBQXFCOFIsRUFBckI7QUFDQTNTLGtDQUFFb0YsZUFBRjtBQUNILGlCQUpEO0FBS0giLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcnNcclxuY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcclxuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XHJcbmNvbnN0ICRodG1sID0gJCgnaHRtbCcpO1xyXG5jb25zdCAkd3JhcHBlciA9ICQoJy53cmFwcGVyJyk7XHJcbmNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbmNvbnN0ICRtYWluID0gJCgnLm1haW4nKTtcclxuY29uc3QgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xyXG5jb25zdCAkbmF2TW9iaWxlID0gJCgnLmpzLW1vYmlsZS1uYXYnKTtcclxuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuXHJcbi8vIGNvbnN0IFRhYiA9IChmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICBsZXQgJHRhYiA9ICQoZG9jdW1lbnQpLmZpbmQoJy5qcy1iYi10YWInKTtcclxuXHJcbi8vICAgICBsZXQgdGFiID0ge307XHJcblxyXG5cclxuXHJcbi8vICAgICAodGFiLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgaWYgKCR0YWIubGVuZ3RoKSB7XHJcblxyXG4vLyAgICAgICAgICAgICAkdGFiLnRhYnMoKTtcclxuXHJcbi8vICAgICAgICAgICAgIGlmICghJHRhYi5oYXNDbGFzcygndGFiLS10d28nKSkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIHRhYi5saW5lQXBwZW5kKCk7XHJcblxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICB9KSxcclxuXHJcbi8vICAgICAodGFiLmxpbmVBcHBlbmQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgJHRhYi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgICAgICAgICAgbGV0ICR0YWJOYXYgPSAkKHRoaXMpLmZpbmQoJy50YWJfX3RpdGxlcycpO1xyXG5cclxuLy8gICAgICAgICAgICAgJCgnPGxpPicpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd0YWJfX2xpbmUnKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiTmF2KTtcclxuXHJcblxyXG5cclxuLy8gICAgICAgICAgICAgbGV0ICRsaSA9ICR0YWJOYXYuZmluZCgnbGknKTtcclxuXHJcbi8vICAgICAgICAgICAgIGxldCAkbGluZSA9ICR0YWJOYXYuZmluZCgnLnRhYl9fbGluZScpO1xyXG5cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAkbGkuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpIHx8XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCd1aS10YWJzLWFjdGl2ZScpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgKSB7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRhYi5fc2V0TGluZVN0eWxlKCQodGhpcyksICRsaW5lKTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuLy8gICAgICAgICAgICAgJGxpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0YWJfX2xpbmUnKSkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgdGFiLl9zZXRMaW5lU3R5bGUoJCh0aGlzKSwgJGxpbmUpO1xyXG5cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAgICAgdGFiLl9zZXRMaW5lU3R5bGUgPSBmdW5jdGlvbihlbEdldCwgZWxTZXQpIHtcclxuXHJcbi8vICAgICAgICAgbGV0IHdpZHRoID0gZWxHZXQud2lkdGgoKTtcclxuXHJcbi8vICAgICAgICAgbGV0IGhvd0ZhciA9IGVsR2V0LnBvc2l0aW9uKCkubGVmdDtcclxuXHJcbi8vICAgICAgICAgbGV0IGNvbG9yID0gZWxHZXQuZGF0YSgnY29sb3InKSB8fCAnI2ZmODI3Mic7XHJcblxyXG4vLyAgICAgICAgIGVsU2V0LmNzcyh7XHJcblxyXG4vLyAgICAgICAgICAgICBsZWZ0OiBob3dGYXIgKyAncHgnLFxyXG5cclxuLy8gICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG5cclxuLy8gICAgICAgICAgICAgYmFja2dyb3VuZDogY29sb3JcclxuXHJcbi8vICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgfTtcclxuXHJcblxyXG5cclxuLy8gICAgIHJldHVybiB0YWI7XHJcblxyXG4vLyB9KSgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG5cclxuICogQmFzZS5qc1xyXG5cclxuICpcclxuXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcblxyXG4gKi9cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blB1c2goKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC53aG9JcygpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vSW5pdCBtb2R1bGVzXHJcblxyXG4gICAgICAgIC8vIFRhYi5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhcigpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmhhbWJ1cmdlckJ0bigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmNsaWNrT3VzaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2VhcmNoQnRuT3BlbkNsb3NlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcclxuXHJcbiAgICAgICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzY3JvbGxCYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzU4NWE1OScsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnMnB4JyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcyJ1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vUmVtb3ZlIHByZWxvYWRlclxyXG5cclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DdXN0b20gY2hlY2JveCAmIGNoZWNrYm94UHNldWRvXHJcblxyXG4gICAgY2hlY2tib3g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LXNlbGVjdC1hbGwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuXHJcbiAgICBhY2NvcmRlb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJGFjY29yZGVvbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1hY2NvcmRlb24gLmJiLWFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbihcclxuXHJcbiAgICAgICAgICAgIGVcclxuXHJcbiAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwYXJlbnQuZGF0YSgnYWNjb3JkZW9uJykgPT09ICdjb2xsYXBzZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0VG9nZ2xlKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gJCgnLmpzLWxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tib3ggPSBsaXN0LmZpbmQoJy5qcy1iYi1jaGVja2JveCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrTGlzdCA9IGxpc3QuZmluZCgnLmpzLWxpc3QtdG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja2JveC5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdFRvZ2dsZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NvcHkgdGV4dCBjbGljayBsaW5rXHJcblxyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgY2IgPSBuZXcgQ2xpcGJvYXJkKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG5cclxuICAgICAgICAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYm94Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0blJlc2V0ID0gJHBhcmVudC5maW5kKCcuanMtaW5wdXQtLWNsZWFyJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGhpbnQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9ICRwYXJlbnQuZmluZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkRhdGEgPSAkKHRoaXMpLmRhdGEoJ2NsaXBib2FyZC10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXRWYWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hdHRyKCdkYXRhLWNsaXBib2FyZC10ZXh0JywgJGJ0bkRhdGEgKyAkaW5wdXRWYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLnZhbCgnJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X19pY29uJylcclxuXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZUluKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuXHJcbiAgICBvd25lclBob25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLXVzZXItcGhvbmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKTsnKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KCQodGhpcykuZGF0YSgncGhvbmUtaGlkZW4nKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdXNlci1waG9uZS0tc2hvdycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXVzZXItcGhvbmUnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdXNlclBob25lXHJcblxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KHBob25lKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NpdHkgc2VsZWN0XHJcblxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5ID0gJCgnLmpzLWNpdHktc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5VGl0bGUgPSBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9fdGl0bGUgc3BhbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlQ2l0eVRpdGxlLnRleHQodGV4dCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9CYXNlIHNsaWRlclxyXG5cclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlcicpO1xyXG5cclxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcHJldkFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tcHJldicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkbmV4dEFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAkcHJldkFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAkbmV4dEFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NhdGFsb2cgSXRlbSBTbGlkZXJcclxuXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRjYXRhbG9nSXRlbVNsaWRlciA9ICQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjYXRhbG9nSXRlbVNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWl0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB0YWI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uczoge1xyXG5cclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG5cclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG5cclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcblxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcnVuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gJHdpbmRvdy5oZWlnaHQoKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChzY3JvbGxIZWlnaHQgLSBzY3JvbGxQb3NpdGlvbikgLyBzY3JvbGxIZWlnaHQgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcygnaXMtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyb3Bkb3duOiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZFNjcm9sbCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gZFNjcm9sbDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMik7XHJcblxyXG4gICAgICAgIC8vICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAvLyAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgaWYgKCQodGhpcykub2Zmc2V0KCkudG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0JykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICQodGhpcykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpLm9mZnNldCgpLnRvcCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnbW91c2VlbnRlcicpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QuY3NzKHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gfSxcclxuXHJcbiAgICAgICAgc2hvd0hpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5pcygnLmJiLWRyb3Bkb3duX19vdmVybGF5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYmItZHJvcGRvd24tLXRyYW5zZm9ybScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLmNzcygnei1pbmRleCcsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRtZW51LmNzcygnei1pbmRleCcsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duIC5pbmZvLWJsb2NrX19saW5rJyxcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCcuaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dHM6IHtcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcblxyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy10aW1lLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk6OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvZGUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOSA5IDkgOSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29uZmlybS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWVtYWlsLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKnsxLDIwfVsuKnsxLDIwfV1bLip7MSwyMH1dWy4qezEsMjB9XUAqezEsMjB9Wy4qezIsNn1dWy4qezEsMn1dJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24ocGFzdGVkVmFsdWUsIG9wdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXN0ZWRWYWx1ZS5yZXBsYWNlKCdtYWlsdG86JywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLVphLXohIyQlJicqKy89P15fYHt8fX4tXVwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogJ2xvd2VyJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC0tY29weScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgaW5wdXQgc2VsZWN0IHZhbHVlXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vU2hvdyBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0hpZGUgUGFzc3dvcmRcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9FZGl0IFRleHQgRmllbGRcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZmllbGQtZWRpdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXQgPSAkKCcuanMtZmllbGQtZWRpdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0QnRuID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19idG4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dC5zaG93KCkuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYmx1cihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAnMTMnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1pbnB1dCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnbm8tY2xvc2UnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW9iaWxlLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vYmlsZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW9iaWxlLXNlbGVjdF9fcmVzdWx0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjdDoge1xyXG5cclxuICAgICAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLXNlcnZpY2VzJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogdGltZUFuZFByaWNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LWJvcm4nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWV0cm8taWNvbiBtZXRyby1pY29uLS0nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TZWxlY3QgQWRkIFByaWNlIFRpbWUgJiBQcmljZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZUFuZFByaWNlKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFRpbWUgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCd0aW1lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsUHJpY2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdwcmljZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQudGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxUaW1lICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFByaWNlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdE5hdGl2ZSA9ICQoJy5qcy1zZWxlY3QtbmF0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSAkKHRoaXMpLmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb246Zmlyc3QtY2hpbGQnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pY29uU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhpZGVZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFJlc2V0QnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaWNvblNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGljb25TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0taWNvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkaWNvblNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpZm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIGZvbnRhd2Vzb21lIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlmb3JtYXQoaWNvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbE9wdGlvbiA9IGljb24uZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPjxpIGNsYXNzPVwic2VsZWN0Ml9faWNvbicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQob3JpZ2luYWxPcHRpb24pLmRhdGEoJ2ljb24nKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pPiAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24udGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xvclNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjb2xvclNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0LWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VhcmNoLWVuYWJsZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbG9yIGJhbGwgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlCYWxsKGNvbG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkb3JpZ2luYWxPcHRpb24gPSBjb2xvci5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JCYWxsID0gJCgkb3JpZ2luYWxPcHRpb24pLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yLnRleHQubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fbGluZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9XCI+PC9zcGFuPjxwPiAke1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvci50ZXh0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA8L3A+PC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19iYWxsXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH0gXCI+IDwvc3Bhbj4gPC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93WWVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zZXQteWVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkeWVhclNlbGVjdCA9ICQoJy5qcy1zZWxlY3QtYm9ybi0tY2xlYXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdzZWxlY3QyOm9wZW5pbmcnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1ib3JuJykgPT09ICd5ZWFyJ1xyXG5cclxuICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRSZXNldEJ0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRhdGVTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1ib3JuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkYXRlU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAudGV4dCgnJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPicpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVTZWxlY3Rpb24ob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlUmVzdWx0KG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0VmFsICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkcGhvbmVDb2RlQm94ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dC1waG9uZS1jb2RlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkcGhvbmVDb2RlQm94Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRwaG9uZUNvZGVCb3guZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzKS5maW5kKCcuYmItaW5wdXRfX2lucHV0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBzZWxlY3RDb2RlUmVzdWx0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogc2VsZWN0Q29kZVNlbGVjdGlvbixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1pbnB1dC0tc2VsZWN0LXZhbHVlXCI+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25TZWxlY3QgPSAkcGFyZW50LmZpbmQoJ29wdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdFZhbHVlID0gJHBhcmVudC5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoY291bnRlcikudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLW1vdmUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb3ZlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm1vdmUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbWVudToge1xyXG5cclxuICAgICAgICAvL0hhbWJ1cmdlciBidG5cclxuXHJcbiAgICAgICAgaGFtYnVyZ2VyQnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX2FkZFN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL1doZW4gQ2xpY2sgT3V0c2lkZSBDbG9zZSBNZW51XHJcblxyXG4gICAgICAgIGNsaWNrT3VzaWRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LCAuanMtZGF0ZSwgLmRhdGVwaWNrZXIsIC5jYXJkLWluZm9fX3JlcXVlc3QsIC5jYXRhbG9nLWZpbHRlciwgLmpzLW1vYmlsZS1maWx0ZXItLW9wZW4sIC5qcy1iYi1hY2NvcmRlb24nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGVcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggQnRuIG9wZW4vY2xvc2VcclxuXHJcbiAgICAgICAgc2VhcmNoQnRuT3BlbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hCdG4gPSAkKCcuanMtbW9iaWxlLXNlYXJjaC1idG4nKTtcclxuXHJcbiAgICAgICAgICAgIHNlYXJjaEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZW1vdmVTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBvcHVwOiB7XHJcblxyXG4gICAgICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuXHJcbiAgICAgICAgcG9wdXBGYW5jeUJveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWQ6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlXCJdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdmYW5jeWJveC1jb250YWluZXItLWltYWdlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja0NvbnRlbnQ6ICdjbG9zZScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja1NsaWRlOiAnY2xvc2UnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc21hbGxCdG46IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzbWFsbEJ0bjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vZGFsOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRm9ybSBXaG8gSXM/XHJcblxyXG4gICAgICAgIHdob0lzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB3aG9pcyA9ICQodGhpcykuZGF0YSgnd2hvaXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9ICQoJyNhdXRoLWZvcm0nKS5maW5kKCcuZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aG9pcyA9PT0gJ21hc3RlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtbWFzdGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aG9pcyA9PT0gJ3N0dWRpbycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtc3R1ZGlvJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtY2xpZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRHVuYW1pY2x5IGNoYW5nZSBmb3JtIHRpdGxlXHJcblxyXG4gICAgICAgIGNoYW5nZUZvcm1UaXRsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWZvcm0tdGl0bGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDYXRhbG9nXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBjYXRhbG9nID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2F0YWxvZy5tYXBUb2dnbGUoKTtcclxuICAgICAgICBjYXRhbG9nLmJ0bkZpbHRlck9wZW4oKTtcclxuICAgICAgICBjYXRhbG9nLmJ0blNob3dDYXRhbG9nKCk7XHJcbiAgICAgICAgY2F0YWxvZy5idG5TaG93TWFwKCk7XHJcbiAgICAgICAgY2F0YWxvZy5zdGlja3lGaWx0ZXIoKTtcclxuICAgICAgICBjYXRhbG9nLmZpbHRlckNhdGVnb3J5KCk7XHJcbiAgICAgICAgY2F0YWxvZy5tb3ZlQmxvY2tzKCk7XHJcbiAgICAgICAgY2F0YWxvZy5pZlBhZ2VDYXRhbG9nKCk7XHJcbiAgICB9LFxyXG4gICAgLy9DYXRhbG9nIG1hcCBUb2dnbGVcclxuICAgIG1hcFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWNhdGFsb2ctLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcC0tc2hvdycpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtY2F0YWxvZy1tYXAtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLS1zaG93JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQnRuIGZpbHRlciBvcGVuXHJcbiAgICBidG5GaWx0ZXJPcGVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtbW9iaWxlLWZpbHRlci0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgY2F0YWxvZ0ZpbHRlciA9ICQoJy5jYXRhbG9nLWZpbHRlcicpO1xyXG4gICAgICAgICAgICBpZiAoY2F0YWxvZ0ZpbHRlci5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXRhbG9nRmlsdGVyLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2F0YWxvZ0ZpbHRlci5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQnRuIHNob3cgY2F0YWxvZ1xyXG4gICAgYnRuU2hvd0NhdGFsb2c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1zaG93LS1saXN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICQoJy5jYXRhbG9nLWNvbnRlbnRfX2lubmVyJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vQnRuIHNob3cgbWFwIC0gaGlkZSBjYXRhbG9nXHJcbiAgICBidG5TaG93TWFwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtc2hvdy0tbWFwJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICAkKCcuY2F0YWxvZy1jb250ZW50X19pbm5lcicpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1zdGlreS1ibG9jaycpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcCcpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL1N0aWNreSBGaWx0ZXIgaHR0cHM6Ly9naXRodWIuY29tL2Fib3VvbGlhL3N0aWNreS1zaWRlYmFyXHJcbiAgICBzdGlja3lGaWx0ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtc3Rpa3ktYmxvY2snKS5sZW5ndGggJiYgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgbmV3IFN0aWNreVNpZGViYXIoJy5qcy1zdGlreS1ibG9jaycsIHtcclxuICAgICAgICAgICAgICAgIHRvcFNwYWNpbmc6IDExMCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6IDEwLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU2VsZWN0b3I6ICcuY2F0YWxvZy1jb250ZW50JyxcclxuICAgICAgICAgICAgICAgIGlubmVyV3JhcHBlclNlbGVjdG9yOiAnLmNhdGFsb2ctZmlsdGVyX19pbm5lcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vZmlsdGVyIGNhdGVnb3J5XHJcbiAgICBmaWx0ZXJDYXRlZ29yeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19saW5rJylcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeS0tcmVzZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrIGluIG1lZGlhIHNjcmVlblxyXG4gICAgbW92ZUJsb2NrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAkKCcuanMtdmlldy10b2dnbGUnKS5pbnNlcnRCZWZvcmUoJy5jYXRhbG9nX19pbm5lcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0lmIHBhZ2UgY2F0YWxvZyBmaWx0ZXIgdHJhbnNmb3JtIGFjY29yZGVvblxyXG4gICAgaWZQYWdlQ2F0YWxvZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKCdwYWdlLWNhdGFsb2cnKSkge1xyXG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdoZWFkZXItLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICRtYWluLmNzcygncGFkZGluZy10b3AnLCAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2F0YWxvZy1maWx0ZXJfX2JvZHknKS5hZGRDbGFzcyhcclxuICAgICAgICAgICAgICAgICAgICAnYmItYWNjb3JkZW9uIGJiLWFjY29yZGVvbi0tb3RoZXIganMtYmItYWNjb3JkZW9uJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItYWNjb3JkZW9uX19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRhbG9nLWZpbHRlcl9fdGl0bGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuY2F0YWxvZy1maWx0ZXJfX3RpdGxlX2NhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1hY2NvcmRlb25fX3RpdGxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1maWx0ZXItaXRlbTpsdCgyKScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhcmRcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IGNhcmQgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJkLnNsaWRlcigpO1xyXG4gICAgICAgIGNhcmQuY2FyZFNjcm9sbHNweSgpO1xyXG4gICAgICAgIGNhcmQuY2FyZFN0aWNreSgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZFJlcXVlc3RUb2dnbGUoKTtcclxuICAgICAgICAgICAgY2FyZC5jYXJkTW92ZUl0ZW1zKCk7XHJcblxyXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShjYXJkLmNhcmRNb3ZlSXRlbXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTbGlkZXJcclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXNsaWRlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgJGNhcmRTbGlkZXIgPSAkKCcuanMtY2FyZC1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgICAgICRjYXJkU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgcmVxdWVzdCBzaG93IC8gaGlkZVxyXG4gICAgY2FyZFJlcXVlc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYXJkSW5mb1JlcXVlc3QgPSAkKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrcyB3aGVuIHdpbmRvdyB3aWR0aCA8IDc2OFxyXG4gICAgY2FyZE1vdmVJdGVtczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtdGl0bGUnKS5pbnNlcnRBZnRlcignLmNhcmQtZ2FsbGFyeV9fd3JhcCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWFib3V0JykuaW5zZXJ0QmVmb3JlKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1pbmZvLWNhdGVnb3J5JykuYXBwZW5kVG8oJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93JykucHJlcGVuZFRvKCcuY2FyZC1pbmZvX190b3AnKTtcclxuICAgICAgICAkKCcuY2FyZC1pbmZvX19pbm5lcicpLmluc2VydEFmdGVyKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtbW92ZS1jYXJkLXBvbGljeScpLmFwcGVuZFRvKCcuY2FyZC1yZXF1ZXN0LWZvcm0nKTtcclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2Nyb2xsc3B5XHJcbiAgICBjYXJkU2Nyb2xsc3B5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLXNjcm9sbHNweScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC0xMDAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC02MCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhcmRTdGlja3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zdGlja3knKS5sZW5ndGggJiYgJCgnLmpzLWNhcmQtZml4ZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrID0gJCgnLmpzLWNhcmQtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9ja09mZnNldCA9IHN0aWNreUJsb2NrLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2sgPSAkKCcuanMtY2FyZC1maXhlZCcpO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9ja09mZnNldCA9IGZpeGVkQmxvY2sub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRDb250ZW50ID0gJCgnLmpzLWNhcmQtY29udGVudC1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51ID0gJCgnLmpzLWNhcmQtbWVudScpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJjYXJkLW1lbnVfX2Nsb25lXCI+JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICQoJy5qcy1jYXJkLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKSlcclxuICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihjYXJkTWVudSlcclxuICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudU9mZnNldCA9IGNhcmRNZW51Lm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suaGVpZ2h0KCkgPCBjYXJkQ29udGVudC5oZWlnaHQoKSAmJlxyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjhcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhDYXJkVXNlckluZm8oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZml4Q2FyZFVzZXJJbmZvKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtMSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMzBcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FyZE1lbnUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTWVudUZpeGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmRNZW51Rml4ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID49IGNhcmRNZW51T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51LnJlbW92ZUF0dHIoJ3N0eWxlJykucmVtb3ZlQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNYWluXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBNYWluID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlQmxvY2tzKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlUHJvbW8uaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIG1vdmVCbG9ja3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgJCgnLmJiLWJsb2cnKS5pbnNlcnRBZnRlcignLmJiLWNhdGVnb3J5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhZ2VQcm9tbzoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci0tcHJvbW8nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIE1haW4ucGFnZVByb21vLnNsaWRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgIE1haW4ucGFnZVByb21vLm1vdmVCbG9ja3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci0tcHJvbW8nKVxyXG4gICAgICAgICAgICAgICAgLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJylcclxuICAgICAgICAgICAgICAgIC5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3ZlQmxvY2tzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLXByb21vLWZvcm0nKS5pbnNlcnRBZnRlcignLnByb21vX193cmFwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgICQoQmFzZS5pbml0KCkpO1xyXG4gICAgJChNYWluLmluaXQoKSk7XHJcbiAgICAkKGNhdGFsb2cuaW5pdCgpKTtcclxuICAgICQoY2FyZC5pbml0KCkpO1xyXG59KTtcclxuXHJcbi8qXHJcbiAqKiogZnVuY3Rpb25zLmpzXHJcbiAqL1xyXG4vL1B1c2hVcFxyXG5mdW5jdGlvbiBwdXNoVXAob3B0aW9ucykge1xyXG4gICAgdmFyIHRleHQgPSBvcHRpb25zLnRleHQgfHwgJ9CS0LDQvCDQvdC+0LLQsNGPINC30LDRj9Cy0LrQsCc7XHJcbiAgICB2YXIgc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgfHwgJ3N1Y2Nlc3MnO1xyXG5cclxuICAgIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnYmItcHVzaFVwJyk7XHJcbiAgICB2YXIgcHVzaFVwQ2xvc2UgPSAkKCc8aSBjbGFzcz1cImZhbCBmYS10aW1lc1wiPjwvaT4nKS5hZGRDbGFzcyhcclxuICAgICAgICAnYmItcHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xyXG4gICAgKTtcclxuXHJcbiAgICBwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcbiAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XHJcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtZXJyb3InKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtc3VjY2VzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc2hQb3MoKTtcclxuXHJcbiAgICByYWYoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDQ1MDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLXB1c2hVcCcpO1xyXG4gICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBwb3NoUG9zKCkge1xyXG4gICAgICAgICQoJy5iYi1wdXNoVXAnKS5lYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGhlaWdodCA9ICQoJy5iYi1wdXNoVXAnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIGhlaWdodCAqIGUgKyAxMCArIGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxyXG5mdW5jdGlvbiByYWYoZm4pIHtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vL1NldCBJbnB1dCBEYXRlIFZhbHVlXHJcbmZ1bmN0aW9uIHNldElucHV0RGF0ZShzZWxlY3Rvcikge1xyXG4gICAgbGV0IF9kYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIGxldCBob3kgPSBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIGQgPSBob3kuZ2V0RGF0ZSgpLFxyXG4gICAgICAgIG0gPSBob3kuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgICAgeSA9IGhveS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgIGRhdGE7XHJcblxyXG4gICAgaWYgKGQgPCAxMCkge1xyXG4gICAgICAgIGQgPSAnMCcgKyBkO1xyXG4gICAgfVxyXG4gICAgaWYgKG0gPCAxMCkge1xyXG4gICAgICAgIG0gPSAnMCcgKyBtO1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB5ICsgJy0nICsgbSArICctJyArIGQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IF9kYXQubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICBfZGF0W2ldLnZhbHVlID0gZGF0YTtcclxuICAgIH1cclxufVxyXG5cclxuLy9GdW5jdGlvbiBBZGQgUmVtb3ZlIENsYXNzIGZyb20gQmxvY2tcclxuZnVuY3Rpb24gYWRkUmVtb3ZlQ2xhc3NCbG9jayhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2sgKyAnLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykuYWRkQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbiAgICAkKGJsb2NrICsgJy0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUmVtb3ZlQ2xhc3MoYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdChibG9jaykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuIl19
