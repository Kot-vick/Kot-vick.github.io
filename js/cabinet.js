'use strict';

//Global Vars
var $window = $(window);
var $document = $(document);
var $body = $('body');
var $html = $('html');
var $wrapper = $('.wrapper');
var $overlay = $('.overlay');
var $header = $('.header');
var $main = $('.cabinet');

//Menu vars
var $menu = $('.js-menu');
var $navMobile = $('.js-mobile-nav');
var $hamburger = $('.js-main-nav-btn');
var $hamburgerCrm = $('.js-hamburger');
var $menuOvelay = $('.js-menu-overlay');
var $menuItemDropdown = $('.js-menu-item-dropdown');
var $btnFloat = $document.find('.js-btn-floating');

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
 * Crm.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Crm = {
                init: function init() {
                                this.controlBox();

                                this.menu.hamburgerCrm();
                                this.menu.menuItemDropdown();
                                this.menu.clickOutside();

                                this.sliders.triumph();
                                this.sliders.sliderPopupReinit();

                                this.mobileBlock.bodyPosition();
                                this.mobileBlock.requestItemClick();
                                this.mobileBlock.callAplicationMobileBlock();

                                this.graphic.init();

                                Crm.aplication.init();
                                Crm.request.init();
                                Crm.steps.init();
                                Crm.studio.init();
                                Crm.services.init();

                                if ($window.width() > 480) {
                                                new WOW().init();
                                }

                                this.boxResize();
                                $window.resize(function () {
                                                Crm.boxResize();
                                });
                },
                controlBox: function controlBox() {
                                $document.on('click', '.js-control-box-btn', function (e) {
                                                $(this).parent().find('.js-control-box').slideToggle({
                                                                start: function start() {
                                                                                $(this).css({
                                                                                                display: 'flex'
                                                                                });
                                                                }
                                                });
                                });
                },
                boxResize: function boxResize() {
                                if ($window.width() <= 480) {
                                                $header.addClass('bg--dark');
                                                $menu.addClass('bg--white');
                                                $('.js-control-box').slideUp();
                                } else {
                                                $header.removeClass('bg--dark');
                                                $menu.removeClass('bg--white');
                                }
                },
                menu: {
                                //Hamburger btn
                                hamburgerCrm: function hamburgerCrm() {
                                                $hamburgerCrm.on('click', function (e) {
                                                                if ($(this).hasClass('on')) {
                                                                                $(this).removeClass('on');
                                                                                $menu.removeClass('is-open');
                                                                                $header.removeClass('is-moving');
                                                                                Crm.menu.removeStyle();

                                                                                if ($(window).width() > 480) {
                                                                                                $wrapper.removeClass('menu-open');
                                                                                }
                                                                } else {
                                                                                $(this).addClass('on');
                                                                                $menu.addClass('is-open');
                                                                                $header.addClass('is-moving');
                                                                                $html.css('overflow', 'hidden');

                                                                                if ($(window).width() > 480) {
                                                                                                $wrapper.addClass('menu-open');
                                                                                                $menuItemDropdown.removeClass('dropdown-active');
                                                                                }
                                                                }
                                                });
                                },
                                mobileNavBtn: function mobileNavBtn() {
                                                $('.js-mobile-nav-btn').on('click mousedown touchstart', function (e) {
                                                                if ($(this).hasClass('on')) {
                                                                                $(this).removeClass('on');
                                                                                $wrapper.removeClass('mobile-nav--open');
                                                                                $html.removeAttr('style');
                                                                                Crm.menu.removeStyle();
                                                                } else {
                                                                                $(this).addClass('on');
                                                                                $wrapper.addClass('mobile-nav--open');
                                                                                $html.css('overflow', 'hidden');
                                                                }
                                                                return false;
                                                });
                                },
                                //When click outside Menu do this
                                clickOutside: function clickOutside() {
                                                $document.on('click touchstart', function (e) {
                                                                if ($(e.target).closest('.js-main-nav-btn, .js-mobile-nav, .menu-dropdown, .js-menu-item-dropdown, .js-hamburger').length) return;
                                                                $hamburger.removeClass('on');
                                                                $hamburgerCrm.removeClass('on');
                                                                $wrapper.removeClass('mobile-nav--open');
                                                                $menu.removeClass('is-open');
                                                                Crm.menu.removeStyle();
                                                                setTimeout(function () {
                                                                                $menuOvelay.removeClass('is-active');
                                                                }, 100);
                                                                e.stopPropagation();
                                                });
                                },
                                //Menu dropdown
                                menuItemDropdown: function menuItemDropdown() {
                                                $menuItemDropdown.on('click', function () {
                                                                if ($(this).hasClass('dropdown-active')) {
                                                                                $(this).removeClass('dropdown-active');
                                                                                $btnFloat.fadeIn();
                                                                                $hamburgerCrm.removeClass('on');

                                                                                if ($window.width() > 480) {
                                                                                                $wrapper.removeClass('menu-open');
                                                                                                $header.removeClass('is-moving');
                                                                                } else {
                                                                                                setTimeout(function () {
                                                                                                                $menuOvelay.removeClass('is-active');
                                                                                                }, 100);
                                                                                }
                                                                } else {
                                                                                $(this).addClass('dropdown-active');
                                                                                $btnFloat.fadeOut();
                                                                                $hamburgerCrm.removeClass('on');

                                                                                $(this).addClass('dropdown-active');
                                                                                $menu.removeClass('is-open');
                                                                                $header.removeClass('is-moving');

                                                                                if ($window.width() > 480) {
                                                                                                $wrapper.addClass('menu-open');
                                                                                } else {
                                                                                                $menuOvelay.addClass('is-active');
                                                                                }
                                                                }
                                                });
                                },
                                removeStyle: function removeStyle() {
                                                $menuItemDropdown.removeClass('dropdown-active');
                                                $wrapper.removeClass('menu-open');
                                                $header.removeClass('is-moving');
                                                Crm.menu.htmlRemoveStyle();
                                                $btnFloat.fadeIn();
                                },
                                htmlRemoveStyle: function htmlRemoveStyle() {
                                                $document.on('click touchstart', function (e) {
                                                                if ($(e.target).closest('.js-mobile-nav-btn, .js-mobile-nav, .js-mobile-block--show, .js-request-item').length) return;
                                                                e.stopPropagation();
                                                                $html.removeAttr('style');
                                                });
                                }
                },
                sliders: {
                                //Triumph slider
                                triumph: function triumph() {
                                                var $slider = $('.js-bb-slider--triumph');
                                                $slider.each(function () {
                                                                var $slides = $(this).find('.bb-slider__slides');
                                                                var $slide = $(this).find('.bb-slider__slide');
                                                                var $btnNext = $(this).find('.js-bb-slider-btn--next');
                                                                if ($slide.length > 1) {
                                                                                $slides.slick({
                                                                                                slidesToShow: 1,
                                                                                                slidesToScroll: 1,
                                                                                                arrows: false,
                                                                                                dots: true,
                                                                                                swipe: false,
                                                                                                touchMove: false,
                                                                                                infinite: false
                                                                                });
                                                                }

                                                                $(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
                                                                                if (currentSlide + 1 === slick.slideCount) {
                                                                                                $btnNext.on('click', function () {
                                                                                                                $('.modal').modal('hide');
                                                                                                });
                                                                                } else {
                                                                                                $btnNext.on('click', function () {
                                                                                                                $slides.slick('slickNext');
                                                                                                });
                                                                                }
                                                                });

                                                                $btnNext.on('click', function () {
                                                                                $slides.slick('slickNext');
                                                                });

                                                                //Disable change slide on click dots
                                                                $slider.find('.slick-dots li button').on('click', function (e) {
                                                                                e.stopPropagation();
                                                                });
                                                });
                                },
                                //Reinit slider after popup open
                                sliderPopupReinit: function sliderPopupReinit() {
                                                $('.modal').on('shown.bs.modal', function () {
                                                                var $slider = $(this).find('.bb-slider__slides');
                                                                if ($slider.length) {
                                                                                $slider[0].slick.setPosition();
                                                                }
                                                });
                                }
                },
                mobileBlock: {
                                bodyPosition: function bodyPosition() {
                                                var $parrent = $('.js-mobile-block');
                                                var $footer = $parrent.children('.mobile-block__footer');
                                                $parrent.children('.mobile-block__body').css('bottom', $footer.outerHeight(true));

                                                $parrent.find('.mobile-block__box').each(function () {
                                                                if ($(this).children('.mobile-block__footer').length) {
                                                                                $(this).children('.mobile-block__body').css('bottom', $('.mobile-block__box').children('.mobile-block__footer').outerHeight(true));
                                                                }
                                                });
                                },
                                //Show / Hide mobile aplication
                                callAplicationMobileBlock: function callAplicationMobileBlock() {
                                                var btn = '.js-move-block--show';
                                                var $btn = $document.find(btn);

                                                $btn.each(function () {
                                                                if ($window.width() <= 480 && $(this).hasClass('request-item')) {
                                                                                $(this).attr('data-move-block-target', 'request');
                                                                }
                                                });

                                                $document.on('click', btn, function () {
                                                                var top = $(window).scrollTop();
                                                                var btnId = $(this).attr('data-move-block-target');
                                                                $document.find('[data-move-block]').filter('[data-move-block=' + btnId + ']').addClass('is-open');

                                                                // setTimeout(() => {
                                                                //     $body.addClass('is-fixed').css({
                                                                //         overflow: 'hidden',
                                                                //         width: '100%',
                                                                //         height: '100%'
                                                                //     });
                                                                // }, 300);

                                                                Crm.mobileBlock.bodyPosition();
                                                });

                                                $document.on('click', '.js-move-block-box--close', function () {
                                                                $(this).closest('.move-block__box').removeClass('is-open');

                                                                Crm.mobileBlock.bodyPosition();
                                                });

                                                $document.on('click', '.js-move-block--close', function (e) {
                                                                $(this).closest('.move-block').removeClass('is-open');
                                                                bodyFixed();
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                });

                                                function bodyFixed() {
                                                                if (!$document.find('.js-move-block').hasClass('is-open')) {
                                                                                $body.removeClass('is-fixed').removeAttr('style');
                                                                }
                                                }
                                },
                                //Click request item
                                requestItemClick: function requestItemClick() {
                                                if ($(window).width() <= 768) {
                                                                $document.on('click', '.js-request-item', function (e) {
                                                                                $('.js-move-block-aplication').addClass('is-open');
                                                                                $html.addClass('is-fixed');

                                                                                e.preventDefault();
                                                                                e.stopPropagation();
                                                                });
                                                                $document.on('click', '.js-move-block-aplication--close', function () {
                                                                                $('.js-move-block-aplication').removeClass('is-open');

                                                                                $html.removeClass('is-fixed');
                                                                });
                                                }
                                }
                },
                graphic: {
                                init: function init() {
                                                var _this6 = this;

                                                setTimeout(function () {
                                                                _this6.detectHeight();
                                                }, 1500);

                                                $window.resize(function () {
                                                                Crm.graphic.detectHeight();
                                                });
                                },
                                detectHeight: function detectHeight() {
                                                var $table = $document.find('.js-graph-table');

                                                $table.each(function () {
                                                                var $tableWorker = $(this).find('.graph-table__worker');
                                                                var $tableWorkerTr = $tableWorker.find('tr').not(':first');
                                                                var $tableHours = $(this).find('.graph-table__hours');
                                                                var $tableHoursTr = $tableHours.find('tr').not(':first');

                                                                $tableHoursTr.each(function (i) {
                                                                                var currentHoursItem = $(this).closest('.js-graph-table').find('.graph-table__worker').find('tr').not(':first').eq(i);

                                                                                maxHeight($(this), currentHoursItem);
                                                                });

                                                                $tableWorkerTr.each(function (i) {
                                                                                var currentWorkerItem = $(this).closest('.js-graph-table').find('.graph-table__hours').find('tr').not(':first').eq(i);

                                                                                maxHeight($(this), currentWorkerItem);
                                                                });

                                                                function maxHeight(_this, elem) {
                                                                                var maxHeight = 0;
                                                                                var currentHeight = _this.outerHeight();
                                                                                if (currentHeight > maxHeight) {
                                                                                                maxHeight = currentHeight;
                                                                                }
                                                                                if (currentHeight > elem.outerHeight()) {
                                                                                                elem.css('height', maxHeight);
                                                                                }
                                                                }
                                                });
                                }
                }
};

/**
 * Crm Aplication
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.aplication = {
                init: function init() {
                                Crm.aplication.aplicationTab();
                                Crm.aplication.showNewClienForm();
                                Crm.aplication.showAplicationItemOptions();
                                Crm.aplication.aplicationItemCounter();
                                Crm.aplication.selectShowService();
                                Crm.aplication.aplicationItemReset();

                                if ($window.width() >= 768) {
                                                Crm.aplication.searchOverlay.init();
                                }
                },
                //Init Aplication tabs
                aplicationTab: function aplicationTab() {
                                var $aplicationTab = $('.js-bb-tab.aplication-success__tab');

                                //If aplication tab chat then hide aplication btns
                                $aplicationTab.find('.tab__link').on('click', function () {
                                                var btn = $('.aplication__btns');
                                                var blockFooter = $('.js-move-block').children('.move-block__box').find('.move-block__footer');
                                                var href = $(this).attr('href');

                                                if (href === '#aplication-chat') {
                                                                btn.addClass('is-hidden');
                                                                blockFooter.addClass('is-hidden');
                                                } else {
                                                                btn.removeClass('is-hidden');
                                                                blockFooter.removeClass('is-hidden');
                                                }

                                                Crm.mobileBlock.bodyPosition();

                                                $('.js-scroll').getNiceScroll().resize();
                                });
                },
                //Show New Client Form
                showNewClienForm: function showNewClienForm() {
                                addRemoveClassBlock('.js-new-client', 'is-open');
                },
                //When click btn edit
                showAplicationItemOptions: function showAplicationItemOptions() {
                                $document.on('click', '.js-aplication-item--edit', function (e) {
                                                $(this).addClass('is-hidden');
                                                $(this).closest('.js-aplication-item-service').find('.bb-input__wrap').removeClass('is-hidden');
                                                e.preventDefault();
                                });
                },
                //Counter init function
                aplicationItemCounter: function aplicationItemCounter() {
                                $('.js-aplication-item').each(function (e) {
                                                if (!$(this).hasClass('aplication-item--short')) {
                                                                $(this).find('.aplication-item__counter').text(e + 1);
                                                }
                                });
                },
                //After select master change
                selectShowService: function selectShowService() {
                                $document.on('select2:select', '.js-select-show-service', function () {
                                                var $parrent = $(this).closest('.js-aplication-item');
                                                if ($parrent.hasClass('aplication-item--short')) {
                                                                $parrent.find('.js-aplication-item-service').slideDown({
                                                                                start: function start() {
                                                                                                $(this).css({
                                                                                                                display: 'flex'
                                                                                                });
                                                                                }
                                                                }).end().find('.js-aplication-item-btn--reset').removeClass('is-hidden');
                                                                $parrent.removeClass('aplication-item--short');
                                                } else {
                                                                $parrent.find('.js-aplication-item-service').slideDown({
                                                                                start: function start() {
                                                                                                $(this).css({
                                                                                                                display: 'flex'
                                                                                                });
                                                                                }
                                                                });
                                                }
                                                Crm.aplication.aplicationItemCounter();
                                });
                },
                //Aplication item reset
                aplicationItemReset: function aplicationItemReset() {
                                $document.on('click', '.js-aplication-item-btn--reset', function () {
                                                var $parrent = $(this).closest('.js-aplication-item');
                                                if (!$parrent.hasClass('aplication-item--short')) {
                                                                $parrent.addClass('aplication-item--short').find('.js-select--master, .js-select--time, .js-select-dur').val('').trigger('change').end().find('.js-aplication-item-btn--reset').addClass('is-hidden').end().find('.js-aplication-item-service').slideUp().end().find('.bb-input__wrap').addClass('is-hidden').end().find('.js-aplication-item--edit').removeClass('is-hidden').end().find('input').val('').end().find('.aplication-item__counter').html('');
                                                }
                                });
                },
                //Serch focus show client + overlay
                searchOverlay: {
                                el: {
                                                $input: $document.find('.js-search-overlay-input'),
                                                $overlay: $document.find('.js-search-overlay'),
                                                $aplication: $document.find('.aplication'),
                                                $user: $document.find('.aplication__user'),
                                                $emptyBlock: $document.find('.aplication__empty'),
                                                $btnNewClient: $document.find('button[data-move-block-target="new-client"]')
                                },

                                init: function init() {
                                                $document.on('focus', '.js-search-overlay-input', function () {
                                                                Crm.aplication.searchOverlay.show();
                                                }).on('keyup', function (e) {
                                                                if (e.keyCode == 27) {
                                                                                Crm.aplication.searchOverlay.hide();
                                                                }
                                                }).on('click', '.js-search-overlay', Crm.aplication.searchOverlay.hide);
                                },

                                show: function show() {
                                                var $overlay = $document.find('.js-search-overlay');
                                                var $aplication = $document.find('.aplication');
                                                var $user = $document.find('.aplication__user');
                                                var $emptyBlock = $document.find('.aplication__empty');
                                                var $btnNewClient = $document.find('.js-move-block--show');

                                                $overlay.addClass('is-visible');
                                                $aplication.addClass('is-focus');
                                                $user.addClass('animated fadeInLeft').css('display', 'block');
                                                $emptyBlock.hide();
                                                $btnNewClient.show();
                                },

                                hide: function hide() {
                                                var $input = $document.find('.js-search-overlay-input');
                                                var $overlay = $document.find('.js-search-overlay');
                                                var $aplication = $document.find('.aplication');
                                                var $user = $document.find('.aplication__user');
                                                var $emptyBlock = $document.find('.aplication__empty');
                                                var $btnNewClient = $document.find('.js-move-block--show');

                                                $overlay.removeClass('is-visible');
                                                $aplication.removeClass('is-focus');
                                                $user.removeClass('animated fadeInLeft').removeAttr('style');
                                                $input.blur();
                                                $emptyBlock.show();
                                                $btnNewClient.hide();
                                }
                }
};

/**
 * Crm Request
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.request = {
                init: function init() {
                                if ($window.width() < 1200) {
                                                Crm.request.tabs();
                                }
                                this.itemInfo();
                },
                //Replace icon when drag item
                wigetReplaceIcon: function wigetReplaceIcon(el) {
                                var widget = el.closest('.request__widget');
                                var item = el.closest('.request-item');
                                var icon = el.find('.request-item__icon');

                                var iconNew = 'request-item__icon fal fa-smile';
                                var iconWork = 'request-item__icon fal fa-clock';
                                var iconDone = 'request-item__icon fal fa-check-circle';
                                var iconAbort = 'request-item__icon fal fa-frown';

                                if (widget.hasClass('request__widget--new')) {
                                                icon.removeClass().addClass(iconNew);
                                } else if (widget.hasClass('request__widget--work')) {
                                                icon.removeClass().addClass(iconWork);
                                } else if (widget.hasClass('request__widget--done')) {
                                                icon.removeClass().addClass(iconDone);
                                } else if (widget.hasClass('request__widget--abort')) {
                                                icon.removeClass().addClass(iconAbort);
                                }
                },
                itemInfo: function itemInfo() {
                                $('.request__widget').find('.request-item').each(function () {
                                                var icon = $(this).find('.request-item__icon');

                                                if ($(this).hasClass('request-item--notfilled')) {
                                                                icon.removeClass().addClass('fal fa-info-circle').wrap('<div class="request-item__icon" tooltip="Заявка не заполненна">');
                                                }
                                });
                },
                //Request tabs
                tabs: function tabs() {
                                $('.js-tab-request').tabs();
                                console.log('---', 1);
                }
};

/**
 * Crm Services
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.services = {
                init: function init() {
                                Crm.services.selectTime();
                                Crm.services.showAddService();
                                Crm.services.showServiceItem();

                                if ($(window).width() >= 1024) {
                                                // Crm.services.itemHover();
                                                // Crm.request.sortMultiple();
                                }
                },
                itemHover: function itemHover() {
                                var $item = $('.js-service-item');

                                $item.on('mouseenter', function (e) {
                                                $(this).addClass('is-hover');
                                }).on('mouseleave', function () {
                                                var $input = $(this).find('input');
                                                var $select = $(this).find('select').next();
                                                if ($input.is(':focus') || $select.hasClass('select2-container--open')) {} else {
                                                                $(this).removeClass('is-hover');
                                                }
                                });
                },
                selectTime: function selectTime() {
                                var $select = $('.js-service-item').find('select');
                                $select.on('select2:select', function () {
                                                $(this).closest('.js-service-item').removeClass('is-hover');
                                });
                },
                showAddService: function showAddService() {
                                $document.on('click', '.js-add-service--add', function () {
                                                var $parent = $(this).closest('.js-add-service');
                                                var $btnClose = $parent.find('.js-add-service--close');
                                                var $blocks = $parent.find('.add-service__inner');

                                                $(this).hide();
                                                $btnClose.show();
                                                $blocks.removeAttr('style');
                                });

                                $document.on('click', '.js-add-service--close', function () {
                                                var $parent = $(this).closest('.js-add-service');
                                                var $btnOpen = $parent.find('.js-add-service--add');
                                                var $blocks = $parent.find('.add-service__inner');

                                                $(this).hide();
                                                $btnOpen.show();
                                                $blocks.css('display', 'none');
                                });
                },
                showServiceItem: function showServiceItem() {
                                $document.on('click', '.js-toggle', function (e) {
                                                var $parent = $(this).parent();
                                                var id = $(this).attr('data-block-target');

                                                $parent.find('.js-toggle').removeClass('is-checked');
                                                $(this).addClass('is-checked');

                                                $(this).closest('.js-add-service').find('input').filter(':text').toggleClass('jsCrmComboTitleServices');

                                                $(this).closest('.js-add-service').find('[data-block]').css('display', 'none').filter('[data-block=' + id + ']').removeAttr('style');

                                                e.preventDefault();
                                });
                }
};

/**
 * Crm Steps
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.steps = {
                init: function init() {
                                if ($(window).width() > 480) {
                                                // Crm.steps.sortable();
                                }
                                Crm.steps.tabs();
                                Crm.steps.showSearch();
                },
                //Steps tabs
                tabs: function tabs() {
                                $('.js-studio-step').tabs();
                },
                //Steps btn show search
                showSearch: function showSearch() {
                                $document.on('click', '.js-btn-steps-search--show', function () {
                                                $('.steps__search').fadeToggle();
                                });
                },
                //Steps sortable item
                sortable: function sortable() {
                                if ($('.bb-upload__list').length) {
                                                $('.bb-upload__list').sortable({
                                                                items: '.bb-upload__item:not(.is-unsortable)',
                                                                containment: 'parent',
                                                                cursor: 'move',
                                                                tolerance: 'pointer',
                                                                start: function start(e, ui) {
                                                                                ui.item.addClass('drag-sort');
                                                                },
                                                                stop: function stop(e, ui) {
                                                                                steps.replaceTitleAfterSortable();
                                                                                ui.item.removeClass('drag-sort');
                                                                }
                                                }).disableSelection();
                                }
                },
                //Replace item title after sorttable
                replaceTitleAfterSortable: function replaceTitleAfterSortable() {
                                var home = $('<span class="bb-upload__home">');
                                home.text('Главная').appendTo($('.bb-upload__item:first'));
                                $('.bb-upload__item').not(':first').find('.bb-upload__home').remove();
                }
};

/**
 * Crm Studio
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
Crm.studio = {
                init: function init() {
                                Crm.studio.avatarToggleBtn();
                                Crm.studio.workerPageToggle();
                                Crm.studio.categoryShow();
                },
                //Avatar btn open / close
                avatarToggleBtn: function avatarToggleBtn() {
                                $document.on('click touchstart', '.js-add-avatar--open', function () {
                                                $('.js-add-avatar').fadeIn({
                                                                start: function start() {
                                                                                $(this).css({
                                                                                                display: 'flex'
                                                                                });
                                                                }
                                                });
                                });
                                $document.on('click touchstart', '.js-add-avatar--close', function () {
                                                $('.js-add-avatar').fadeOut();
                                });
                },
                //Open / Close AddWorker page
                workerPageToggle: function workerPageToggle() {
                                if ($(window).width() <= 480) {
                                                //Open add warker page
                                                var $addWorker = $('.js-worker-add');

                                                $('.js-worker-item').each(function () {
                                                                $(this).removeAttr('href').removeAttr('data-toggle');
                                                });

                                                $document.on('click', '.js-worker-item', function (e) {
                                                                if ($addWorker.hasClass('is-visible')) {
                                                                                $addWorker.removeClass('is-visible');
                                                                } else {
                                                                                $addWorker.addClass('is-visible');
                                                                }
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                });
                                                //Close add worker page
                                                $('.js-worker-add--close').on('click touchstart', function () {
                                                                $addWorker.removeClass('is-visible');
                                                });
                                }
                },
                categoryShow: function categoryShow() {
                                $document.on('click', '.js-category', function (e) {
                                                var $target = $(e.target);
                                                var $parent = $(this).closest('.js-category');
                                                var $itemHidden = $parent.find('.category__item').filter('[data-hidden="true"]');

                                                if ($target.is('.category__item--more')) {
                                                                if ($parent.hasClass('is-visible')) {
                                                                                $parent.removeClass('is-visible');
                                                                                $itemHidden.addClass('is-hidden');
                                                                                $(this).find('.category__item--more').text('Еще');
                                                                } else {
                                                                                $parent.addClass('is-visible');
                                                                                $itemHidden.removeClass('is-hidden');
                                                                                $(this).find('.category__item--more').text('Скрыть');
                                                                }
                                                }
                                });
                }
};

$(function () {
                $(Base.init());
                $(Crm.init());
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXQuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRib2R5IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRvdmVybGF5IiwiJGhlYWRlciIsIiRtYWluIiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIiRoYW1idXJnZXJDcm0iLCIkbWVudU92ZWxheSIsIiRtZW51SXRlbURyb3Bkb3duIiwiJGJ0bkZsb2F0IiwiZmluZCIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiYWNjb3JkZW9uIiwiY2hlY2tib3giLCJ0YWIiLCJsaXN0VG9nZ2xlIiwiY29weVRleHQiLCJvd25lclBob25lIiwiY2hhbmdlQ2l0eSIsInNsaWRlciIsImNhdGFsb2dJdGVtU2xpZGVyIiwiZHJvcGRvd24iLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiaXMiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwicGFyZW50IiwicmVtb3ZlQXR0ciIsInByb3AiLCIkYWNjb3JkZW9uIiwic2xpZGVVcCIsImVhY2giLCJzbGlkZURvd24iLCIkcGFyZW50IiwiY2xvc2VzdCIsIiRpdGVtIiwiZGF0YSIsImxpc3QiLCJ3b3JrTGlzdCIsImNzcyIsImNiIiwiQ2xpcGJvYXJkIiwiJGlucHV0SWNvbiIsIiRidG5SZXNldCIsIiRoaW50IiwiYnRuIiwiJGJ0bkRhdGEiLCIkaW5wdXRWYWwiLCJ2YWwiLCJhdHRyIiwic2hvdyIsIm5vdCIsImhpZGUiLCJmaWx0ZXIiLCJmYWRlT3V0IiwiZmFkZUluIiwidGV4dCIsInVzZXJQaG9uZSIsInBob25lIiwiY2hhbmdlQ2l0eVRpdGxlIiwiJHNsaWRlciIsIiRzbGlkcyIsIiRzbGlkZSIsIiRwcmV2QXJyb3ciLCIkbmV4dEFycm93Iiwic2xpY2siLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiaW5maW5pdGUiLCJhcnJvd3MiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIiRjYXRhbG9nSXRlbVNsaWRlciIsIl90aGlzIiwiJHNsaWRlcyIsIiRzbGlkZXJEb3RzIiwiZXZlbnQiLCJwcmVwZW5kIiwiYXBwZW5kIiwic2xpZGVDb3VudCIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsImkiLCJodG1sIiwibGF6eUxvYWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YWJzIiwiYWRkUmVtb3ZlQ2xhc3MiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXQiLCJyZWxYIiwicGFnZVgiLCJsZWZ0IiwicmVsWSIsInBhZ2VZIiwidG9wIiwiY2xpY2siLCIkYnRuIiwicnVuIiwiaGVuZGxlciIsIm9mZiIsIl9yZW1vdmVBbmltYXRpb24iLCJlbCIsImJ0bklkIiwidHJpZ2dlciIsInNjcm9sbEhlaWdodCIsImhlaWdodCIsInNjcm9sbFBvc2l0aW9uIiwic2Nyb2xsVG9wIiwibWVzc2FnZVN1Y2Nlc3MiLCJtZXNzYWdlRXJyb3IiLCJkZWxheSIsInN0YXR1cyIsInB1c2hVcCIsImFuaW1hdGUiLCJlbGVtZW50Q2xpY2siLCJkZXN0aW5hdGlvbiIsIiRkcm9wZG93biIsInJlbmRlciIsInNob3dIaWRlIiwiJGJ0bkNsb3NlIiwiJGRyb3Bkb3duT3ZlcmxheSIsIiRkcm9wZG93bkxpc3QiLCJhcHBlbmRUbyIsImluc2VydEFmdGVyIiwicmVtb3ZlIiwiJGJ0bkZsb2F0aW5nIiwidGFyZ2V0IiwidG9nZ2xlQ2xhc3MiLCJpbnB1dEV2ZW50cyIsImlucHV0TWFzayIsIm1vYmlsZVNlbGVjdCIsImlucHV0bWFzayIsIm1hc2siLCJncmVlZHkiLCJvbkJlZm9yZVBhc3RlIiwicGFzdGVkVmFsdWUiLCJvcHRzIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiZGVmaW5pdGlvbnMiLCJ2YWxpZGF0b3IiLCJjYXJkaW5hbGl0eSIsImNhc2luZyIsImlucHV0IiwiZXhlY0NvbW1hbmQiLCJuZXh0IiwicHJldiIsImZpZWxkRWRpdCIsImZpZWxkRWRpdElucHV0IiwiZmllbGRFZGl0QnRuIiwiZmllbGRFZGl0VGV4dCIsImJsdXIiLCJ0cmltIiwidmFsdWUiLCJkZWZhdWx0VmFsdWUiLCJrZXlwcmVzcyIsImtleUNvZGUiLCJlbmQiLCIkc2VsZWN0IiwiJGlucHV0U2VhcmNoIiwiJHJlc3VsdEl0ZW0iLCJzZWxlY3QyIiwidGFncyIsInRlbXBsYXRlUmVzdWx0IiwiYWRkVXNlclBpYyIsInRlbXBsYXRlU2VsZWN0aW9uIiwidGltZUFuZFByaWNlIiwibWluaW11bVJlc3VsdHNGb3JTZWFyY2giLCJhbGxvd0NsZWFyIiwib3B0IiwiaWQiLCJvcHRpbWFnZSIsImVsZW1lbnQiLCIkb3B0Iiwib3JpZ2luYWxUaW1lIiwib3JpZ2luYWxQcmljZSIsIiRzZWxlY3ROYXRpdmUiLCJwbGFjZWhvbGRlciIsIiRmaXJzdE9wdGlvbiIsIndyYXAiLCJjb2xvclNlbGVjdCIsImljb25TZWxlY3QiLCJzaG93WWVhciIsImhpZGVZZWFyIiwiYWRkUmVzZXRCdG4iLCJwaG9uZUNvZGUiLCIkaWNvblNlbGVjdCIsImlmb3JtYXQiLCJkcm9wZG93blBhcmVudCIsImljb24iLCJvcmlnaW5hbE9wdGlvbiIsIiRjb2xvclNlbGVjdCIsImlCYWxsIiwiY29sb3IiLCIkb3JpZ2luYWxPcHRpb24iLCJjb2xvckJhbGwiLCIkeWVhclNlbGVjdCIsIiRkYXRlU2VsZWN0Iiwic2VsZWN0Q29kZVNlbGVjdGlvbiIsIm9wdFZhbCIsInNlbGVjdENvZGVSZXN1bHQiLCJjb3VudHJ5IiwiJHBob25lQ29kZUJveCIsIiRpbnB1dCIsImZvY3VzIiwib3B0aW9uU2VsZWN0Iiwic2VsZWN0VmFsdWUiLCJlcSIsImNoYW5nZSIsImNvdW50ZXIiLCJzZWxlY3RlZEluZGV4IiwiYWRkRm9jdXMiLCJyZW1vdmVGb2N1cyIsIl9yZW1vdmVTdHlsZSIsIl9hZGRTdHlsZSIsInNlYXJjaEJ0biIsImZhbmN5Ym94IiwiYmFzZUNsYXNzIiwiY2xvc2VDbGlja091dHNpZGUiLCJhdXRvRm9jdXMiLCJpbWFnZSIsInByZWxvYWQiLCJoZWxwZXJzIiwib3ZlcmxheSIsImxvY2tlZCIsInRvb2xiYXIiLCJtb2JpbGUiLCJjbGlja0NvbnRlbnQiLCJjbGlja1NsaWRlIiwidG91Y2giLCJzbWFsbEJ0biIsIndob2lzIiwiZm9ybSIsIkNybSIsImNvbnRyb2xCb3giLCJoYW1idXJnZXJDcm0iLCJtZW51SXRlbURyb3Bkb3duIiwiY2xpY2tPdXRzaWRlIiwic2xpZGVycyIsInRyaXVtcGgiLCJzbGlkZXJQb3B1cFJlaW5pdCIsIm1vYmlsZUJsb2NrIiwiYm9keVBvc2l0aW9uIiwicmVxdWVzdEl0ZW1DbGljayIsImNhbGxBcGxpY2F0aW9uTW9iaWxlQmxvY2siLCJncmFwaGljIiwiYXBsaWNhdGlvbiIsInJlcXVlc3QiLCJzdGVwcyIsInN0dWRpbyIsInNlcnZpY2VzIiwiV09XIiwiYm94UmVzaXplIiwic2xpZGVUb2dnbGUiLCJzdGFydCIsImRpc3BsYXkiLCJyZW1vdmVTdHlsZSIsIm1vYmlsZU5hdkJ0biIsImh0bWxSZW1vdmVTdHlsZSIsIiRidG5OZXh0Iiwic3dpcGUiLCJ0b3VjaE1vdmUiLCJtb2RhbCIsInNldFBvc2l0aW9uIiwiJHBhcnJlbnQiLCIkZm9vdGVyIiwiY2hpbGRyZW4iLCJvdXRlckhlaWdodCIsImJvZHlGaXhlZCIsImRldGVjdEhlaWdodCIsIiR0YWJsZSIsIiR0YWJsZVdvcmtlciIsIiR0YWJsZVdvcmtlclRyIiwiJHRhYmxlSG91cnMiLCIkdGFibGVIb3Vyc1RyIiwiY3VycmVudEhvdXJzSXRlbSIsIm1heEhlaWdodCIsImN1cnJlbnRXb3JrZXJJdGVtIiwiZWxlbSIsImN1cnJlbnRIZWlnaHQiLCJhcGxpY2F0aW9uVGFiIiwic2hvd05ld0NsaWVuRm9ybSIsInNob3dBcGxpY2F0aW9uSXRlbU9wdGlvbnMiLCJhcGxpY2F0aW9uSXRlbUNvdW50ZXIiLCJzZWxlY3RTaG93U2VydmljZSIsImFwbGljYXRpb25JdGVtUmVzZXQiLCJzZWFyY2hPdmVybGF5IiwiJGFwbGljYXRpb25UYWIiLCJibG9ja0Zvb3RlciIsImhyZWYiLCJhZGRSZW1vdmVDbGFzc0Jsb2NrIiwiJGFwbGljYXRpb24iLCIkdXNlciIsIiRlbXB0eUJsb2NrIiwiJGJ0bk5ld0NsaWVudCIsIml0ZW1JbmZvIiwid2lnZXRSZXBsYWNlSWNvbiIsIndpZGdldCIsIml0ZW0iLCJpY29uTmV3IiwiaWNvbldvcmsiLCJpY29uRG9uZSIsImljb25BYm9ydCIsImNvbnNvbGUiLCJsb2ciLCJzZWxlY3RUaW1lIiwic2hvd0FkZFNlcnZpY2UiLCJzaG93U2VydmljZUl0ZW0iLCJpdGVtSG92ZXIiLCIkYmxvY2tzIiwiJGJ0bk9wZW4iLCJzaG93U2VhcmNoIiwiZmFkZVRvZ2dsZSIsInNvcnRhYmxlIiwiaXRlbXMiLCJjb250YWlubWVudCIsImN1cnNvciIsInRvbGVyYW5jZSIsInVpIiwic3RvcCIsInJlcGxhY2VUaXRsZUFmdGVyU29ydGFibGUiLCJkaXNhYmxlU2VsZWN0aW9uIiwiaG9tZSIsImF2YXRhclRvZ2dsZUJ0biIsIndvcmtlclBhZ2VUb2dnbGUiLCJjYXRlZ29yeVNob3ciLCIkYWRkV29ya2VyIiwiJHRhcmdldCIsIiRpdGVtSGlkZGVuIiwib3B0aW9ucyIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsInBvc2hQb3MiLCJyYWYiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldElucHV0RGF0ZSIsInNlbGVjdG9yIiwiX2RhdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3kiLCJEYXRlIiwiZCIsImdldERhdGUiLCJtIiwiZ2V0TW9udGgiLCJ5IiwiZ2V0RnVsbFllYXIiLCJtYXgiLCJibG9jayIsImNsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFFBQVFMLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTU0sV0FBV04sRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU8sV0FBV1AsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTVEsVUFBVVIsRUFBRSxTQUFGLENBQWhCO0FBQ0EsSUFBTVMsUUFBUVQsRUFBRSxVQUFGLENBQWQ7O0FBRUE7QUFDQSxJQUFNVSxRQUFRVixFQUFFLFVBQUYsQ0FBZDtBQUNBLElBQU1XLGFBQWFYLEVBQUUsZ0JBQUYsQ0FBbkI7QUFDQSxJQUFNWSxhQUFhWixFQUFFLGtCQUFGLENBQW5CO0FBQ0EsSUFBTWEsZ0JBQWdCYixFQUFFLGVBQUYsQ0FBdEI7QUFDQSxJQUFNYyxjQUFjZCxFQUFFLGtCQUFGLENBQXBCO0FBQ0EsSUFBTWUsb0JBQW9CZixFQUFFLHdCQUFGLENBQTFCO0FBQ0EsSUFBTWdCLFlBQVlkLFVBQVVlLElBQVYsQ0FBZSxrQkFBZixDQUFsQjs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBSUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FB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LGtDQUFFLElBQUYsRUFBUW1MLFdBQVIsQ0FBb0IrTixFQUFwQjtBQUNILGlCQUZEOztBQUlBbFosa0JBQUVHLFFBQUYsRUFBWWlELEVBQVosQ0FBZSw0QkFBZixFQUE2QyxVQUFTQyxDQUFULEVBQVk7QUFDckQsb0NBQUlyRCxFQUFFcUQsRUFBRTZILE1BQUosRUFBWXBHLE9BQVosQ0FBb0JtVSxLQUFwQixFQUEyQjFWLE1BQS9CLEVBQXVDO0FBQ3ZDdkQsa0NBQUVpWixLQUFGLEVBQVMvVSxXQUFULENBQXFCZ1YsRUFBckI7QUFDQTdWLGtDQUFFbUYsZUFBRjtBQUNILGlCQUpEO0FBS0giLCJmaWxlIjoiY2FiaW5ldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcnNcclxuY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcclxuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XHJcbmNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xyXG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcclxuY29uc3QgJHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xyXG5jb25zdCAkb3ZlcmxheSA9ICQoJy5vdmVybGF5Jyk7XHJcbmNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbmNvbnN0ICRtYWluID0gJCgnLmNhYmluZXQnKTtcclxuXHJcbi8vTWVudSB2YXJzXHJcbmNvbnN0ICRtZW51ID0gJCgnLmpzLW1lbnUnKTtcclxuY29uc3QgJG5hdk1vYmlsZSA9ICQoJy5qcy1tb2JpbGUtbmF2Jyk7XHJcbmNvbnN0ICRoYW1idXJnZXIgPSAkKCcuanMtbWFpbi1uYXYtYnRuJyk7XHJcbmNvbnN0ICRoYW1idXJnZXJDcm0gPSAkKCcuanMtaGFtYnVyZ2VyJyk7XHJcbmNvbnN0ICRtZW51T3ZlbGF5ID0gJCgnLmpzLW1lbnUtb3ZlcmxheScpO1xyXG5jb25zdCAkbWVudUl0ZW1Ecm9wZG93biA9ICQoJy5qcy1tZW51LWl0ZW0tZHJvcGRvd24nKTtcclxuY29uc3QgJGJ0bkZsb2F0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcbi8vIGNvbnN0IFRhYiA9IChmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICBsZXQgJHRhYiA9ICQoZG9jdW1lbnQpLmZpbmQoJy5qcy1iYi10YWInKTtcclxuXHJcbi8vICAgICBsZXQgdGFiID0ge307XHJcblxyXG5cclxuXHJcbi8vICAgICAodGFiLmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgaWYgKCR0YWIubGVuZ3RoKSB7XHJcblxyXG4vLyAgICAgICAgICAgICAkdGFiLnRhYnMoKTtcclxuXHJcbi8vICAgICAgICAgICAgIGlmICghJHRhYi5oYXNDbGFzcygndGFiLS10d28nKSkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIHRhYi5saW5lQXBwZW5kKCk7XHJcblxyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICB9KSxcclxuXHJcbi8vICAgICAodGFiLmxpbmVBcHBlbmQgPSBmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgJHRhYi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgICAgICAgICAgbGV0ICR0YWJOYXYgPSAkKHRoaXMpLmZpbmQoJy50YWJfX3RpdGxlcycpO1xyXG5cclxuLy8gICAgICAgICAgICAgJCgnPGxpPicpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCd0YWJfX2xpbmUnKVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiTmF2KTtcclxuXHJcblxyXG5cclxuLy8gICAgICAgICAgICAgbGV0ICRsaSA9ICR0YWJOYXYuZmluZCgnbGknKTtcclxuXHJcbi8vICAgICAgICAgICAgIGxldCAkbGluZSA9ICR0YWJOYXYuZmluZCgnLnRhYl9fbGluZScpO1xyXG5cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAkbGkuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpIHx8XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhhc0NsYXNzKCd1aS10YWJzLWFjdGl2ZScpXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgKSB7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRhYi5fc2V0TGluZVN0eWxlKCQodGhpcyksICRsaW5lKTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuLy8gICAgICAgICAgICAgJGxpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0YWJfX2xpbmUnKSkge1xyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4vLyAgICAgICAgICAgICAgICAgdGFiLl9zZXRMaW5lU3R5bGUoJCh0aGlzKSwgJGxpbmUpO1xyXG5cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAgICAgdGFiLl9zZXRMaW5lU3R5bGUgPSBmdW5jdGlvbihlbEdldCwgZWxTZXQpIHtcclxuXHJcbi8vICAgICAgICAgbGV0IHdpZHRoID0gZWxHZXQud2lkdGgoKTtcclxuXHJcbi8vICAgICAgICAgbGV0IGhvd0ZhciA9IGVsR2V0LnBvc2l0aW9uKCkubGVmdDtcclxuXHJcbi8vICAgICAgICAgbGV0IGNvbG9yID0gZWxHZXQuZGF0YSgnY29sb3InKSB8fCAnI2ZmODI3Mic7XHJcblxyXG4vLyAgICAgICAgIGVsU2V0LmNzcyh7XHJcblxyXG4vLyAgICAgICAgICAgICBsZWZ0OiBob3dGYXIgKyAncHgnLFxyXG5cclxuLy8gICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG5cclxuLy8gICAgICAgICAgICAgYmFja2dyb3VuZDogY29sb3JcclxuXHJcbi8vICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgfTtcclxuXHJcblxyXG5cclxuLy8gICAgIHJldHVybiB0YWI7XHJcblxyXG4vLyB9KSgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG5cclxuICogQmFzZS5qc1xyXG5cclxuICpcclxuXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcblxyXG4gKi9cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blB1c2goKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC53aG9JcygpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vSW5pdCBtb2R1bGVzXHJcblxyXG4gICAgICAgIC8vIFRhYi5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhcigpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmhhbWJ1cmdlckJ0bigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51LmNsaWNrT3VzaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuc2VhcmNoQnRuT3BlbkNsb3NlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcclxuXHJcbiAgICAgICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzY3JvbGxCYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsQmFyID0gJCgnLmpzLXNjcm9sbCcpO1xyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsQmFyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgc2Nyb2xsQmFyLm5pY2VTY3JvbGwoe1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmNvbG9yOiAnIzU4NWE1OScsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXV0b2hpZGVtb2RlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBib3h6b29tOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICB2ZXJnZTogNTAwLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcndpZHRoOiAnMnB4JyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXI6ICdub25lJyxcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3Jib3JkZXJyYWRpdXM6ICcyJ1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIub24oJ21vdXNlb3ZlciBtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXROaWNlU2Nyb2xsKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vUmVtb3ZlIHByZWxvYWRlclxyXG5cclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nIGxvYWRpbmctYW5pbWF0aW9uJyk7XHJcblxyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9DdXN0b20gY2hlY2JveCAmIGNoZWNrYm94UHNldWRvXHJcblxyXG4gICAgY2hlY2tib3g6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1jaGVja2JveCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5pcygnOmNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQkIgY2hlY2tib3ggcHNldWRvXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LS1wc2V1ZG8nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9TZWxlY3QgQWxsIENoZWNrYm94XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94LXNlbGVjdC1hbGwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1zZWxlY3RlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYmItY2hlY2tib3gnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSBhY2NvcmRlb25cclxuXHJcbiAgICBhY2NvcmRlb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgJGFjY29yZGVvbiA9ICQoJy5qcy1iYi1hY2NvcmRlb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJGFjY29yZGVvbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICRhY2NvcmRlb24uZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvL0FjY29yZGVvbiBjb2xsYXBzZVxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1hY2NvcmRlb24gLmJiLWFjY29yZGVvbl9fdGl0bGUnLCBmdW5jdGlvbihcclxuXHJcbiAgICAgICAgICAgIGVcclxuXHJcbiAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0ICRpdGVtID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwYXJlbnQuZGF0YSgnYWNjb3JkZW9uJykgPT09ICdjb2xsYXBzZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0VG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1saXN0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaXN0VG9nZ2xlKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gJCgnLmpzLWxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tib3ggPSBsaXN0LmZpbmQoJy5qcy1iYi1jaGVja2JveCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrTGlzdCA9IGxpc3QuZmluZCgnLmpzLWxpc3QtdG9nZ2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja2JveC5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya0xpc3QuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdFRvZ2dsZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NvcHkgdGV4dCBjbGljayBsaW5rXHJcblxyXG4gICAgY29weVRleHQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgY2IgPSBuZXcgQ2xpcGJvYXJkKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pZiBoYXMgaW5wdXQgdGhlbiBjb3B5IGlucHV0IHZhbHVlIGluIGRhdGEgYXR0clxyXG5cclxuICAgICAgICAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYm94Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGlucHV0SWNvbiA9ICRwYXJlbnQuZmluZCgnLmJiLWlucHV0X19pY29uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0blJlc2V0ID0gJHBhcmVudC5maW5kKCcuanMtaW5wdXQtLWNsZWFyJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGhpbnQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtaW5wdXQtYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9ICRwYXJlbnQuZmluZCgnLmpzLXVzZXItbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkRhdGEgPSAkKHRoaXMpLmRhdGEoJ2NsaXBib2FyZC10ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXRWYWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5hdHRyKCdkYXRhLWNsaXBib2FyZC10ZXh0JywgJGJ0bkRhdGEgKyAkaW5wdXRWYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dEljb25cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcignLmpzLWlucHV0LS1jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1pbnB1dC0tY2xlYXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLnZhbCgnJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZhZGVPdXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X19pY29uJylcclxuXHJcbiAgICAgICAgICAgICAgICAubm90KCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZUluKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vU2hvdyBwaG9uZSBudW1iZXJcclxuXHJcbiAgICBvd25lclBob25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmpzLXVzZXItcGhvbmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKTsnKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KCQodGhpcykuZGF0YSgncGhvbmUtaGlkZW4nKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtdXNlci1waG9uZS0tc2hvdycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHVzZXJQaG9uZSA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLXVzZXItcGhvbmUnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwaG9uZSA9IHVzZXJQaG9uZS5kYXRhKCdwaG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdXNlclBob25lXHJcblxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaHJlZicsICd0ZWw6JyArIHBob25lKVxyXG5cclxuICAgICAgICAgICAgICAgIC50ZXh0KHBob25lKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NpdHkgc2VsZWN0XHJcblxyXG4gICAgY2hhbmdlQ2l0eTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5ID0gJCgnLmpzLWNpdHktc2VsZWN0Jyk7XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXR5VGl0bGUgPSBjaGFuZ2VDaXR5LmZpbmQoJy5jaXR5LXNlbGVjdF9fdGl0bGUgc3BhbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X19pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9ICQodGhpcykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlQ2l0eVRpdGxlLnRleHQodGV4dCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9CYXNlIHNsaWRlclxyXG5cclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlcicpO1xyXG5cclxuICAgICAgICBpZiAoJHNsaWRlci5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcHJldkFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tcHJldicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkbmV4dEFycm93ID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAkcHJldkFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAkbmV4dEFycm93LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAyMDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0NhdGFsb2cgSXRlbSBTbGlkZXJcclxuXHJcbiAgICBjYXRhbG9nSXRlbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGlmICgkKCcuanMtY2F0YWxvZy1pdGVtLXNsaWRlcicpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRjYXRhbG9nSXRlbVNsaWRlciA9ICQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjYXRhbG9nSXRlbVNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5ub3QoJy5zbGljay1pbml0aWFsaXplZCcpLnNsaWNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDQwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWl0ZW0nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB0YWI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuanMtYmItdGFiJykudGFicygpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uczoge1xyXG5cclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG5cclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG5cclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcblxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcnVuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gJHdpbmRvdy5oZWlnaHQoKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChzY3JvbGxIZWlnaHQgLSBzY3JvbGxQb3NpdGlvbikgLyBzY3JvbGxIZWlnaHQgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcygnaXMtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyb3Bkb3duOiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZFNjcm9sbCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gZFNjcm9sbDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMik7XHJcblxyXG4gICAgICAgIC8vICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoJy5qcy1iYi1kcm9wZG93bicpO1xyXG5cclxuICAgICAgICAvLyAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgaWYgKCQodGhpcykub2Zmc2V0KCkudG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0JykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgICAkZHJvcGRvd24uZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICQodGhpcykpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpLm9mZnNldCgpLnRvcCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnbW91c2VlbnRlcicpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QuY3NzKHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxpc3QucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gfSxcclxuXHJcbiAgICAgICAgc2hvd0hpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuRmxvYXRpbmcgPSAkZG9jdW1lbnQuZmluZCgnLmpzLWJ0bi1mbG9hdGluZycpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5pcygnLmJiLWRyb3Bkb3duX19vdmVybGF5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXRpbmcuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYmItZHJvcGRvd24tLXRyYW5zZm9ybScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLmNzcygnei1pbmRleCcsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRtZW51LmNzcygnei1pbmRleCcsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLWJiLWRyb3Bkb3duJykubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWJiLWRyb3Bkb3duIC5pbmZvLWJsb2NrX19saW5rJyxcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKCcuaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1kcm9wZG93bi0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dHM6IHtcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0RXZlbnRzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9NYXNrZWQgaW5wdXRtYXNrIGh0dHBzOi8vZ2l0aHViLmNvbS9Sb2JpbkhlcmJvdHMvSW5wdXRtYXNrXHJcblxyXG4gICAgICAgIGlucHV0TWFzazogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXBob25lLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtcGhvbmUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrNyAoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLXRpbWUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy10aW1lLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk6OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvZGUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb2RlLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOSA5IDkgOSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYm9ybi1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJvcm4tbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OS45OS45OTk5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1jb25maXJtLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtY29uZmlybS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWVtYWlsLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtZW1haWwtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKnsxLDIwfVsuKnsxLDIwfV1bLip7MSwyMH1dWy4qezEsMjB9XUAqezEsMjB9Wy4qezIsNn1dWy4qezEsMn1dJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogZnVuY3Rpb24ocGFzdGVkVmFsdWUsIG9wdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3RlZFZhbHVlID0gcGFzdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXN0ZWRWYWx1ZS5yZXBsYWNlKCdtYWlsdG86JywgJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyonOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIlswLTlBLVphLXohIyQlJicqKy89P15fYHt8fX4tXVwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2luZzogJ2xvd2VyJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0RXZlbnRzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC0tY29weScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWNvcHktdGV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcudXNlci1zaGFyZV9fbGluaycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnQ29weScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgaW5wdXQgc2VsZWN0IHZhbHVlXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtaW5wdXQtZm9jdXMtLWNvcHknKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vU2hvdyBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1zaG93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0hpZGUgUGFzc3dvcmRcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dC1wYXNzd29yZC0taGlkZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9FZGl0IFRleHQgRmllbGRcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZmllbGQtZWRpdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXQgPSAkKCcuanMtZmllbGQtZWRpdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRJbnB1dCA9IGZpZWxkRWRpdC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0QnRuID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19idG4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dC5zaG93KCkuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBmaWVsZEVkaXRJbnB1dFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYmx1cihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnRyaW0odGhpcy52YWx1ZSkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0LnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmtleXByZXNzKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAnMTMnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kZWZhdWx0VmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5odG1sKHRoaXMudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdEJ0bi5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1pbnB1dCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1pbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCcuYmItaW5wdXQsIC5iYi10ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1iYi1pbnB1dC10aXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnbm8tY2xvc2UnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaW5mbyBpcy1lcnJvciBpcy1pbnZhbGlkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW9iaWxlLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkc2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dFNlYXJjaCA9ICQodGhpcykuZmluZCgnLm1vYmlsZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vYmlsZS1zZWxlY3QtLWNsb3NlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2gub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW9iaWxlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW9iaWxlLXNlbGVjdF9fcmVzdWx0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzdWx0SXRlbS5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjdDoge1xyXG5cclxuICAgICAgICAvL0N1c3RvbSBTZWxlY3QgaHR0cHM6Ly9zZWxlY3QyLm9yZy9cclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Jykuc2VsZWN0MigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LS1tdWx0aXBsZScpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRhZ3M6IHRydWVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LmJiLXNlbGVjdC0tbWV0cm8nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogYWRkVXNlclBpY1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLXNlcnZpY2VzJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IHRpbWVBbmRQcmljZSxcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogdGltZUFuZFByaWNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC5uby1zZWFyY2gnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0LWJvcm4nKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTEsXHJcblxyXG4gICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSWNvbiBtZW50cm8gaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkVXNlclBpYyhvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdC5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcHRpbWFnZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ2ltYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpbWFnZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0LnRleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRvcHQgPSAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWV0cm8taWNvbiBtZXRyby1pY29uLS0nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWFnZSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQob3B0LmVsZW1lbnQpLnRleHQoKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkb3B0O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TZWxlY3QgQWRkIFByaWNlIFRpbWUgJiBQcmljZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZUFuZFByaWNlKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFRpbWUgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCd0aW1lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsUHJpY2UgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdwcmljZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQudGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxUaW1lICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFByaWNlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2ZvY3VzJywgJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdE5hdGl2ZSA9ICQoJy5qcy1zZWxlY3QtbmF0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdE5hdGl2ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0TmF0aXZlLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlaG9sZGVyID0gJCh0aGlzKS5kYXRhKCdwbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkZmlyc3RPcHRpb24gPSAkKHRoaXMpLmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRpb246Zmlyc3QtY2hpbGQnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZmlyc3RPcHRpb24udGV4dCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdE9wdGlvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnZhbChwbGFjZWhvbGRlcilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1wbGFjZWhvbGRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykud3JhcCgnPGxhYmVsIGNsYXNzPVwiYmItc2VsZWN0XCI+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pY29uU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNob3dZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhpZGVZZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZFJlc2V0QnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBob25lQ29kZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb2JpbGVTZWxlY3QoKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaWNvblNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGljb25TZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0taWNvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkaWNvblNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItaW5wdXQtLXNlbGVjdCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpZm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIGZvbnRhd2Vzb21lIGluc2lkZSBzZWxlY3RcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlmb3JtYXQoaWNvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbE9wdGlvbiA9IGljb24uZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuPjxpIGNsYXNzPVwic2VsZWN0Ml9faWNvbicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQob3JpZ2luYWxPcHRpb24pLmRhdGEoJ2ljb24nKSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pPiAnICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24udGV4dCArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xvclNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNvbG9yU2VsZWN0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1zZWxlY3QtLWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRjb2xvclNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0LWNvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc2VhcmNoLWVuYWJsZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBpQmFsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENvbG9yIGJhbGwgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlCYWxsKGNvbG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkb3JpZ2luYWxPcHRpb24gPSBjb2xvci5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JCYWxsID0gJCgkb3JpZ2luYWxPcHRpb24pLmRhdGEoJ2NvbG9yJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yLnRleHQubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdzZWxlY3QtY29sb3ItLXBhbGV0dGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9c2VsZWN0LWNvbG9yX19pdGVtPiA8c3BhbiBjbGFzcz1cInNlbGVjdC1jb2xvcl9fbGluZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvckJhbGx9XCI+PC9zcGFuPjxwPiAke1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvci50ZXh0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA8L3A+PC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19iYWxsXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH0gXCI+IDwvc3Bhbj4gPC9kaXY+YFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93WWVhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zZXQteWVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkeWVhclNlbGVjdCA9ICQoJy5qcy1zZWxlY3QtYm9ybi0tY2xlYXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHllYXJTZWxlY3Qub24oJ3NlbGVjdDI6dW5zZWxlY3RpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdzZWxlY3QyOm9wZW5pbmcnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm9mZignc2VsZWN0MjpvcGVuaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgpID09ICcnICYmXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1ib3JuJykgPT09ICd5ZWFyJ1xyXG5cclxuICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtc2V0LXllYXInKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRSZXNldEJ0bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGRhdGVTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC1ib3JuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkYXRlU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zZWxlY3QyLXNlbGVjdGlvbl9fY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAudGV4dCgnJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXMtY2lyY2xlXCI+PC9pPicpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBob25lQ29kZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvL0NoYW5nZSBzZWxlY3QgcmVzdWx0cyB0byBvcHRpb24gdmFsdWVcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVTZWxlY3Rpb24ob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgKyBvcHRWYWwgKyAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0FkZCBjaXR5IG5hbWUgdG8gb3B0aW9uXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RDb2RlUmVzdWx0KG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb3VudHJ5ID0gJChvcHQuZWxlbWVudCkuZGF0YSgnY291bnRyeScpLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcHRWYWwgPSAkKG9wdC5lbGVtZW50KS52YWwoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1jdXN0b20tc2VsZWN0X19yZXN1bHRzPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyeSArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPicgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0VmFsICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkcGhvbmVDb2RlQm94ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1pbnB1dC1waG9uZS1jb2RlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkcGhvbmVDb2RlQm94Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRwaG9uZUNvZGVCb3guZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy5zZWxlY3QtdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzKS5maW5kKCcuYmItaW5wdXRfX2lucHV0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBzZWxlY3RDb2RlUmVzdWx0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogc2VsZWN0Q29kZVNlbGVjdGlvbixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYi1pbnB1dC0tc2VsZWN0LXZhbHVlXCI+PC9kaXY+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb25TZWxlY3QgPSAkcGFyZW50LmZpbmQoJ29wdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdFZhbHVlID0gJHBhcmVudC5maW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuYmItaW5wdXQtLXNlbGVjdC12YWx1ZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFZhbHVlLnRleHQob3B0aW9uU2VsZWN0LmVxKDApLnZhbCgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAkKHRoaXMpWzBdLnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoY291bnRlcikudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6ICcoOTk5KSA5OTktOTktOTknXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5vbignZm9jdXMnLCBhZGRGb2N1cykub24oJ2JsdXInLCByZW1vdmVGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpvcGVuJywgYWRkRm9jdXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ3NlbGVjdDI6Y2xvc2UnLCByZW1vdmVGb2N1cyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1pbnB1dC1waG9uZS1jb2RlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW1vdmVGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9iaWxlU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLW1vdmUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX2ZpZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRyZXN1bHRJdGVtID0gJCh0aGlzKS5maW5kKCcubW92ZS1zZWxlY3RfX3Jlc3VsdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkKHRoaXMpLmZpbmQoJy5qcy1tb3ZlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuQ2xvc2Uub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtbW92ZS1zZWxlY3QnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnLm1vdmUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgbWVudToge1xyXG5cclxuICAgICAgICAvL0hhbWJ1cmdlciBidG5cclxuXHJcbiAgICAgICAgaGFtYnVyZ2VyQnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRoYW1idXJnZXIub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX2FkZFN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL1doZW4gQ2xpY2sgT3V0c2lkZSBDbG9zZSBNZW51XHJcblxyXG4gICAgICAgIGNsaWNrT3VzaWRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LCAuanMtZGF0ZSwgLmRhdGVwaWNrZXIsIC5jYXJkLWluZm9fX3JlcXVlc3QsIC5jYXRhbG9nLWZpbHRlciwgLmpzLW1vYmlsZS1maWx0ZXItLW9wZW4sIC5qcy1iYi1hY2NvcmRlb24nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG5cclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBCYXNlLm1lbnUuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcub3ZlcmxheScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGVcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01vYmlsZSBTZWFyY2ggQnRuIG9wZW4vY2xvc2VcclxuXHJcbiAgICAgICAgc2VhcmNoQnRuT3BlbkNsb3NlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWFyY2hCdG4gPSAkKCcuanMtbW9iaWxlLXNlYXJjaC1idG4nKTtcclxuXHJcbiAgICAgICAgICAgIHNlYXJjaEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1zZWFyY2gtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYWRkU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZW1vdmVTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBvcHVwOiB7XHJcblxyXG4gICAgICAgIC8vTW9kYWwgRmFuY3lCb3ggMyBodHRwczovL2ZhbmN5YXBwcy5jb20vZmFuY3lib3gvMy9cclxuXHJcbiAgICAgICAgcG9wdXBGYW5jeUJveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWQ6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3g9XCJpbWFnZXNcIl0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlXCJdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdmYW5jeWJveC1jb250YWluZXItLWltYWdlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbGJhcjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja0NvbnRlbnQ6ICdjbG9zZScsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja1NsaWRlOiAnY2xvc2UnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLXRvdWNoXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc21hbGxCdG46IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveC1uby1jbG9zZV0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzbWFsbEJ0bjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vZGFsOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRm9ybSBXaG8gSXM/XHJcblxyXG4gICAgICAgIHdob0lzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy13aG9pcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB3aG9pcyA9ICQodGhpcykuZGF0YSgnd2hvaXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybSA9ICQoJyNhdXRoLWZvcm0nKS5maW5kKCcuZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aG9pcyA9PT0gJ21hc3RlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtbWFzdGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aG9pcyA9PT0gJ3N0dWRpbycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtc3R1ZGlvJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRDbGFzcygnaXMtY2xpZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vRHVuYW1pY2x5IGNoYW5nZSBmb3JtIHRpdGxlXHJcblxyXG4gICAgICAgIGNoYW5nZUZvcm1UaXRsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcblxyXG4gICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAnLmpzLWZvcm0tdGl0bGUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGl0bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtZm9ybS10aXRsZScpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZvcm1fX2J0bicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZWluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdzaG93LmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBCYXNlLnNlbGVjdC5jb2xvclNlbGVjdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG4vKipcclxuICogQ3JtLmpzXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBDcm0gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5tZW51LmhhbWJ1cmdlckNybSgpO1xyXG4gICAgICAgIHRoaXMubWVudS5tZW51SXRlbURyb3Bkb3duKCk7XHJcbiAgICAgICAgdGhpcy5tZW51LmNsaWNrT3V0c2lkZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcnMudHJpdW1waCgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVycy5zbGlkZXJQb3B1cFJlaW5pdCgpO1xyXG5cclxuICAgICAgICB0aGlzLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMubW9iaWxlQmxvY2sucmVxdWVzdEl0ZW1DbGljaygpO1xyXG4gICAgICAgIHRoaXMubW9iaWxlQmxvY2suY2FsbEFwbGljYXRpb25Nb2JpbGVCbG9jaygpO1xyXG5cclxuICAgICAgICB0aGlzLmdyYXBoaWMuaW5pdCgpO1xyXG5cclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5pbml0KCk7XHJcbiAgICAgICAgQ3JtLnJlcXVlc3QuaW5pdCgpO1xyXG4gICAgICAgIENybS5zdGVwcy5pbml0KCk7XHJcbiAgICAgICAgQ3JtLnN0dWRpby5pbml0KCk7XHJcbiAgICAgICAgQ3JtLnNlcnZpY2VzLmluaXQoKTtcclxuXHJcbiAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICBuZXcgV09XKCkuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ib3hSZXNpemUoKTtcclxuICAgICAgICAkd2luZG93LnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgQ3JtLmJveFJlc2l6ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGNvbnRyb2xCb3g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWNvbnRyb2wtYm94LWJ0bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWNvbnRyb2wtYm94JylcclxuICAgICAgICAgICAgICAgIC5zbGlkZVRvZ2dsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgYm94UmVzaXplOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdiZy0tZGFyaycpO1xyXG4gICAgICAgICAgICAkbWVudS5hZGRDbGFzcygnYmctLXdoaXRlJyk7XHJcbiAgICAgICAgICAgICQoJy5qcy1jb250cm9sLWJveCcpLnNsaWRlVXAoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdiZy0tZGFyaycpO1xyXG4gICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnYmctLXdoaXRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1lbnU6IHtcclxuICAgICAgICAvL0hhbWJ1cmdlciBidG5cclxuICAgICAgICBoYW1idXJnZXJDcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkaGFtYnVyZ2VyQ3JtLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLW1vdmluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIENybS5tZW51LnJlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtZW51LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnaXMtbW92aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2JpbGVOYXZCdG46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtbW9iaWxlLW5hdi1idG4nKS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgIGVcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnb24nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIENybS5tZW51LnJlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vV2hlbiBjbGljayBvdXRzaWRlIE1lbnUgZG8gdGhpc1xyXG4gICAgICAgIGNsaWNrT3V0c2lkZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmpzLW1haW4tbmF2LWJ0biwgLmpzLW1vYmlsZS1uYXYsIC5tZW51LWRyb3Bkb3duLCAuanMtbWVudS1pdGVtLWRyb3Bkb3duLCAuanMtaGFtYnVyZ2VyJ1xyXG4gICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgJGhhbWJ1cmdlci5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICRoYW1idXJnZXJDcm0ucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIENybS5tZW51LnJlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL01lbnUgZHJvcGRvd25cclxuICAgICAgICBtZW51SXRlbURyb3Bkb3duOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnZHJvcGRvd24tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkcm9wZG93bi1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkYnRuRmxvYXQuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhhbWJ1cmdlckNybS5yZW1vdmVDbGFzcygnb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLW1vdmluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJG1lbnVPdmVsYXkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZHJvcGRvd24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0LmZhZGVPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAkaGFtYnVyZ2VyQ3JtLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkcm9wZG93bi1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLW1vdmluZycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLW1vdmluZycpO1xyXG4gICAgICAgICAgICBDcm0ubWVudS5odG1sUmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgICAgJGJ0bkZsb2F0LmZhZGVJbigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaHRtbFJlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuanMtbW9iaWxlLW5hdi1idG4sIC5qcy1tb2JpbGUtbmF2LCAuanMtbW9iaWxlLWJsb2NrLS1zaG93LCAuanMtcmVxdWVzdC1pdGVtJ1xyXG4gICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzbGlkZXJzOiB7XHJcbiAgICAgICAgLy9Ucml1bXBoIHNsaWRlclxyXG4gICAgICAgIHRyaXVtcGg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1iYi1zbGlkZXItLXRyaXVtcGgnKTtcclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkYnRuTmV4dCA9ICQodGhpcykuZmluZCgnLmpzLWJiLXNsaWRlci1idG4tLW5leHQnKTtcclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTW92ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTbGlkZSArIDEgPT09IHNsaWNrLnNsaWRlQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bk5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuTmV4dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soJ3NsaWNrTmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuTmV4dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKCdzbGlja05leHQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRGlzYWJsZSBjaGFuZ2Ugc2xpZGUgb24gY2xpY2sgZG90c1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlci5maW5kKCcuc2xpY2stZG90cyBsaSBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vUmVpbml0IHNsaWRlciBhZnRlciBwb3B1cCBvcGVuXHJcbiAgICAgICAgc2xpZGVyUG9wdXBSZWluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcubW9kYWwnKS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJbMF0uc2xpY2suc2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vYmlsZUJsb2NrOiB7XHJcbiAgICAgICAgYm9keVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJyZW50ID0gJCgnLmpzLW1vYmlsZS1ibG9jaycpO1xyXG4gICAgICAgICAgICBsZXQgJGZvb3RlciA9ICRwYXJyZW50LmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19mb290ZXInKTtcclxuICAgICAgICAgICAgJHBhcnJlbnRcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLm1vYmlsZS1ibG9ja19fYm9keScpXHJcbiAgICAgICAgICAgICAgICAuY3NzKCdib3R0b20nLCAkZm9vdGVyLm91dGVySGVpZ2h0KHRydWUpKTtcclxuXHJcbiAgICAgICAgICAgICRwYXJyZW50LmZpbmQoJy5tb2JpbGUtYmxvY2tfX2JveCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5jaGlsZHJlbignLm1vYmlsZS1ibG9ja19fZm9vdGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5tb2JpbGUtYmxvY2tfX2JvZHknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcubW9iaWxlLWJsb2NrX19ib3gnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLm1vYmlsZS1ibG9ja19fZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub3V0ZXJIZWlnaHQodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL1Nob3cgLyBIaWRlIG1vYmlsZSBhcGxpY2F0aW9uXHJcbiAgICAgICAgY2FsbEFwbGljYXRpb25Nb2JpbGVCbG9jazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSAnLmpzLW1vdmUtYmxvY2stLXNob3cnO1xyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKGJ0bik7XHJcblxyXG4gICAgICAgICAgICAkYnRuLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJHdpbmRvdy53aWR0aCgpIDw9IDQ4MCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuaGFzQ2xhc3MoJ3JlcXVlc3QtaXRlbScpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtbW92ZS1ibG9jay10YXJnZXQnLCAncmVxdWVzdCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCBidG4sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcykuYXR0cignZGF0YS1tb3ZlLWJsb2NrLXRhcmdldCcpO1xyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ1tkYXRhLW1vdmUtYmxvY2tdJylcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCdbZGF0YS1tb3ZlLWJsb2NrPScgKyBidG5JZCArICddJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAkYm9keS5hZGRDbGFzcygnaXMtZml4ZWQnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGhlaWdodDogJzEwMCUnXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCAzMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIENybS5tb2JpbGVCbG9jay5ib2R5UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1tb3ZlLWJsb2NrLWJveC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLm1vdmUtYmxvY2tfX2JveCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgQ3JtLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLW1vdmUtYmxvY2stLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcubW92ZS1ibG9jaycpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICBib2R5Rml4ZWQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYm9keUZpeGVkKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkZG9jdW1lbnQuZmluZCgnLmpzLW1vdmUtYmxvY2snKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGJvZHkucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9DbGljayByZXF1ZXN0IGl0ZW1cclxuICAgICAgICByZXF1ZXN0SXRlbUNsaWNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtcmVxdWVzdC1pdGVtJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1tb3ZlLWJsb2NrLWFwbGljYXRpb24nKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1tb3ZlLWJsb2NrLWFwbGljYXRpb24tLWNsb3NlJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLW1vdmUtYmxvY2stYXBsaWNhdGlvbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdyYXBoaWM6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdEhlaWdodCgpO1xyXG4gICAgICAgICAgICB9LCAxNTAwKTtcclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgQ3JtLmdyYXBoaWMuZGV0ZWN0SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGV0ZWN0SGVpZ2h0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICR0YWJsZSA9ICRkb2N1bWVudC5maW5kKCcuanMtZ3JhcGgtdGFibGUnKTtcclxuXHJcbiAgICAgICAgICAgICR0YWJsZS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICR0YWJsZVdvcmtlciA9ICQodGhpcykuZmluZCgnLmdyYXBoLXRhYmxlX193b3JrZXInKTtcclxuICAgICAgICAgICAgICAgIGxldCAkdGFibGVXb3JrZXJUciA9ICR0YWJsZVdvcmtlci5maW5kKCd0cicpLm5vdCgnOmZpcnN0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRhYmxlSG91cnMgPSAkKHRoaXMpLmZpbmQoJy5ncmFwaC10YWJsZV9faG91cnMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkdGFibGVIb3Vyc1RyID0gJHRhYmxlSG91cnMuZmluZCgndHInKS5ub3QoJzpmaXJzdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICR0YWJsZUhvdXJzVHIuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRIb3Vyc0l0ZW0gPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZ3JhcGgtdGFibGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmdyYXBoLXRhYmxlX193b3JrZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgndHInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCgkKHRoaXMpLCBjdXJyZW50SG91cnNJdGVtKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICR0YWJsZVdvcmtlclRyLmVhY2goZnVuY3Rpb24oaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50V29ya2VySXRlbSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1ncmFwaC10YWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZ3JhcGgtdGFibGVfX2hvdXJzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3RyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnOmZpcnN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQoJCh0aGlzKSwgY3VycmVudFdvcmtlckl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWF4SGVpZ2h0KF90aGlzLCBlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRIZWlnaHQgPSBfdGhpcy5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IGN1cnJlbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SGVpZ2h0ID4gZWxlbS5vdXRlckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY3NzKCdoZWlnaHQnLCBtYXhIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENybSBBcGxpY2F0aW9uXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uYXBsaWNhdGlvbiA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmFwbGljYXRpb25UYWIoKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5zaG93TmV3Q2xpZW5Gb3JtKCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uc2hvd0FwbGljYXRpb25JdGVtT3B0aW9ucygpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmFwbGljYXRpb25JdGVtQ291bnRlcigpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLnNlbGVjdFNob3dTZXJ2aWNlKCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uYXBsaWNhdGlvbkl0ZW1SZXNldCgpO1xyXG5cclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAgICAgICBDcm0uYXBsaWNhdGlvbi5zZWFyY2hPdmVybGF5LmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Jbml0IEFwbGljYXRpb24gdGFic1xyXG4gICAgYXBsaWNhdGlvblRhYjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRhcGxpY2F0aW9uVGFiID0gJCgnLmpzLWJiLXRhYi5hcGxpY2F0aW9uLXN1Y2Nlc3NfX3RhYicpO1xyXG5cclxuICAgICAgICAvL0lmIGFwbGljYXRpb24gdGFiIGNoYXQgdGhlbiBoaWRlIGFwbGljYXRpb24gYnRuc1xyXG4gICAgICAgICRhcGxpY2F0aW9uVGFiLmZpbmQoJy50YWJfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGJ0biA9ICQoJy5hcGxpY2F0aW9uX19idG5zJyk7XHJcbiAgICAgICAgICAgIGxldCBibG9ja0Zvb3RlciA9ICQoJy5qcy1tb3ZlLWJsb2NrJylcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLm1vdmUtYmxvY2tfX2JveCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLm1vdmUtYmxvY2tfX2Zvb3RlcicpO1xyXG4gICAgICAgICAgICBsZXQgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGhyZWYgPT09ICcjYXBsaWNhdGlvbi1jaGF0Jykge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrRm9vdGVyLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBibG9ja0Zvb3Rlci5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIENybS5tb2JpbGVCbG9jay5ib2R5UG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zY3JvbGwnKVxyXG4gICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxyXG4gICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU2hvdyBOZXcgQ2xpZW50IEZvcm1cclxuICAgIHNob3dOZXdDbGllbkZvcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFkZFJlbW92ZUNsYXNzQmxvY2soJy5qcy1uZXctY2xpZW50JywgJ2lzLW9wZW4nKTtcclxuICAgIH0sXHJcbiAgICAvL1doZW4gY2xpY2sgYnRuIGVkaXRcclxuICAgIHNob3dBcGxpY2F0aW9uSXRlbU9wdGlvbnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFwbGljYXRpb24taXRlbS0tZWRpdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtYXBsaWNhdGlvbi1pdGVtLXNlcnZpY2UnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9fd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9Db3VudGVyIGluaXQgZnVuY3Rpb25cclxuICAgIGFwbGljYXRpb25JdGVtQ291bnRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWFwbGljYXRpb24taXRlbScpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FwbGljYXRpb24taXRlbS0tc2hvcnQnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYXBsaWNhdGlvbi1pdGVtX19jb3VudGVyJylcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChlICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0FmdGVyIHNlbGVjdCBtYXN0ZXIgY2hhbmdlXHJcbiAgICBzZWxlY3RTaG93U2VydmljZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdzZWxlY3QyOnNlbGVjdCcsICcuanMtc2VsZWN0LXNob3ctc2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcnJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hcGxpY2F0aW9uLWl0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKCRwYXJyZW50Lmhhc0NsYXNzKCdhcGxpY2F0aW9uLWl0ZW0tLXNob3J0JykpIHtcclxuICAgICAgICAgICAgICAgICRwYXJyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1idG4tLXJlc2V0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJHBhcnJlbnQucmVtb3ZlQ2xhc3MoJ2FwbGljYXRpb24taXRlbS0tc2hvcnQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRwYXJyZW50LmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpLnNsaWRlRG93bih7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ3JtLmFwbGljYXRpb24uYXBsaWNhdGlvbkl0ZW1Db3VudGVyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9BcGxpY2F0aW9uIGl0ZW0gcmVzZXRcclxuICAgIGFwbGljYXRpb25JdGVtUmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFwbGljYXRpb24taXRlbS1idG4tLXJlc2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFycmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWFwbGljYXRpb24taXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoISRwYXJyZW50Lmhhc0NsYXNzKCdhcGxpY2F0aW9uLWl0ZW0tLXNob3J0JykpIHtcclxuICAgICAgICAgICAgICAgICRwYXJyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhcGxpY2F0aW9uLWl0ZW0tLXNob3J0JylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1zZWxlY3QtLW1hc3RlciwgLmpzLXNlbGVjdC0tdGltZSwgLmpzLXNlbGVjdC1kdXInXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC52YWwoJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tYnRuLS1yZXNldCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLXNlcnZpY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKClcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X193cmFwJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tLWVkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC52YWwoJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hcGxpY2F0aW9uLWl0ZW1fX2NvdW50ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKCcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU2VyY2ggZm9jdXMgc2hvdyBjbGllbnQgKyBvdmVybGF5XHJcbiAgICBzZWFyY2hPdmVybGF5OiB7XHJcbiAgICAgICAgZWw6IHtcclxuICAgICAgICAgICAgJGlucHV0OiAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5LWlucHV0JyksXHJcbiAgICAgICAgICAgICRvdmVybGF5OiAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5JyksXHJcbiAgICAgICAgICAgICRhcGxpY2F0aW9uOiAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb24nKSxcclxuICAgICAgICAgICAgJHVzZXI6ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fdXNlcicpLFxyXG4gICAgICAgICAgICAkZW1wdHlCbG9jazogJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uX19lbXB0eScpLFxyXG4gICAgICAgICAgICAkYnRuTmV3Q2xpZW50OiAkZG9jdW1lbnQuZmluZChcclxuICAgICAgICAgICAgICAgICdidXR0b25bZGF0YS1tb3ZlLWJsb2NrLXRhcmdldD1cIm5ldy1jbGllbnRcIl0nXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgJy5qcy1zZWFyY2gtb3ZlcmxheS1pbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIENybS5hcGxpY2F0aW9uLnNlYXJjaE92ZXJsYXkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDcm0uYXBsaWNhdGlvbi5zZWFyY2hPdmVybGF5LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1zZWFyY2gtb3ZlcmxheScsXHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLmFwbGljYXRpb24uc2VhcmNoT3ZlcmxheS5oaWRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJG92ZXJsYXkgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5Jyk7XHJcbiAgICAgICAgICAgIGxldCAkYXBsaWNhdGlvbiA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbicpO1xyXG4gICAgICAgICAgICBsZXQgJHVzZXIgPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb25fX3VzZXInKTtcclxuICAgICAgICAgICAgbGV0ICRlbXB0eUJsb2NrID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uX19lbXB0eScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bk5ld0NsaWVudCA9ICRkb2N1bWVudC5maW5kKCcuanMtbW92ZS1ibG9jay0tc2hvdycpO1xyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgJGFwbGljYXRpb24uYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICR1c2VyLmFkZENsYXNzKCdhbmltYXRlZCBmYWRlSW5MZWZ0JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICRlbXB0eUJsb2NrLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bk5ld0NsaWVudC5zaG93KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5LWlucHV0Jyk7XHJcbiAgICAgICAgICAgIGxldCAkb3ZlcmxheSA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VhcmNoLW92ZXJsYXknKTtcclxuICAgICAgICAgICAgbGV0ICRhcGxpY2F0aW9uID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uJyk7XHJcbiAgICAgICAgICAgIGxldCAkdXNlciA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fdXNlcicpO1xyXG4gICAgICAgICAgICBsZXQgJGVtcHR5QmxvY2sgPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb25fX2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuTmV3Q2xpZW50ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1tb3ZlLWJsb2NrLS1zaG93Jyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkYXBsaWNhdGlvbi5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgJHVzZXIucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJbkxlZnQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAkaW5wdXQuYmx1cigpO1xyXG4gICAgICAgICAgICAkZW1wdHlCbG9jay5zaG93KCk7XHJcbiAgICAgICAgICAgICRidG5OZXdDbGllbnQuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gUmVxdWVzdFxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuQ3JtLnJlcXVlc3QgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDwgMTIwMCkge1xyXG4gICAgICAgICAgICBDcm0ucmVxdWVzdC50YWJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbUluZm8oKTtcclxuICAgIH0sXHJcbiAgICAvL1JlcGxhY2UgaWNvbiB3aGVuIGRyYWcgaXRlbVxyXG4gICAgd2lnZXRSZXBsYWNlSWNvbjogZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICBsZXQgd2lkZ2V0ID0gZWwuY2xvc2VzdCgnLnJlcXVlc3RfX3dpZGdldCcpO1xyXG4gICAgICAgIGxldCBpdGVtID0gZWwuY2xvc2VzdCgnLnJlcXVlc3QtaXRlbScpO1xyXG4gICAgICAgIGxldCBpY29uID0gZWwuZmluZCgnLnJlcXVlc3QtaXRlbV9faWNvbicpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbk5ldyA9ICdyZXF1ZXN0LWl0ZW1fX2ljb24gZmFsIGZhLXNtaWxlJztcclxuICAgICAgICBsZXQgaWNvbldvcmsgPSAncmVxdWVzdC1pdGVtX19pY29uIGZhbCBmYS1jbG9jayc7XHJcbiAgICAgICAgbGV0IGljb25Eb25lID0gJ3JlcXVlc3QtaXRlbV9faWNvbiBmYWwgZmEtY2hlY2stY2lyY2xlJztcclxuICAgICAgICBsZXQgaWNvbkFib3J0ID0gJ3JlcXVlc3QtaXRlbV9faWNvbiBmYWwgZmEtZnJvd24nO1xyXG5cclxuICAgICAgICBpZiAod2lkZ2V0Lmhhc0NsYXNzKCdyZXF1ZXN0X193aWRnZXQtLW5ldycpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uTmV3KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS13b3JrJykpIHtcclxuICAgICAgICAgICAgaWNvbi5yZW1vdmVDbGFzcygpLmFkZENsYXNzKGljb25Xb3JrKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS1kb25lJykpIHtcclxuICAgICAgICAgICAgaWNvbi5yZW1vdmVDbGFzcygpLmFkZENsYXNzKGljb25Eb25lKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS1hYm9ydCcpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uQWJvcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpdGVtSW5mbzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLnJlcXVlc3RfX3dpZGdldCcpXHJcbiAgICAgICAgICAgIC5maW5kKCcucmVxdWVzdC1pdGVtJylcclxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNvbiA9ICQodGhpcykuZmluZCgnLnJlcXVlc3QtaXRlbV9faWNvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdyZXF1ZXN0LWl0ZW0tLW5vdGZpbGxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5yZW1vdmVDbGFzcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmFsIGZhLWluZm8tY2lyY2xlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLndyYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJlcXVlc3QtaXRlbV9faWNvblwiIHRvb2x0aXA9XCLQl9Cw0Y/QstC60LAg0L3QtSDQt9Cw0L/QvtC70L3QtdC90L3QsFwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9SZXF1ZXN0IHRhYnNcclxuICAgIHRhYnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy10YWItcmVxdWVzdCcpLnRhYnMoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgMSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JtIFNlcnZpY2VzXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uc2VydmljZXMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBDcm0uc2VydmljZXMuc2VsZWN0VGltZSgpO1xyXG4gICAgICAgIENybS5zZXJ2aWNlcy5zaG93QWRkU2VydmljZSgpO1xyXG4gICAgICAgIENybS5zZXJ2aWNlcy5zaG93U2VydmljZUl0ZW0oKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDEwMjQpIHtcclxuICAgICAgICAgICAgLy8gQ3JtLnNlcnZpY2VzLml0ZW1Ib3ZlcigpO1xyXG4gICAgICAgICAgICAvLyBDcm0ucmVxdWVzdC5zb3J0TXVsdGlwbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaXRlbUhvdmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJGl0ZW0gPSAkKCcuanMtc2VydmljZS1pdGVtJyk7XHJcblxyXG4gICAgICAgICRpdGVtXHJcbiAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRpbnB1dCA9ICQodGhpcykuZmluZCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2VsZWN0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdzZWxlY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmlzKCc6Zm9jdXMnKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3QuaGFzQ2xhc3MoJ3NlbGVjdDItY29udGFpbmVyLS1vcGVuJylcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1ob3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzZWxlY3RUaW1lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1zZXJ2aWNlLWl0ZW0nKS5maW5kKCdzZWxlY3QnKTtcclxuICAgICAgICAkc2VsZWN0Lm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlcnZpY2UtaXRlbScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0FkZFNlcnZpY2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFkZC1zZXJ2aWNlLS1hZGQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJHBhcmVudC5maW5kKCcuanMtYWRkLXNlcnZpY2UtLWNsb3NlJyk7XHJcbiAgICAgICAgICAgIGxldCAkYmxvY2tzID0gJHBhcmVudC5maW5kKCcuYWRkLXNlcnZpY2VfX2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bkNsb3NlLnNob3coKTtcclxuICAgICAgICAgICAgJGJsb2Nrcy5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1hZGQtc2VydmljZS0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bk9wZW4gPSAkcGFyZW50LmZpbmQoJy5qcy1hZGQtc2VydmljZS0tYWRkJyk7XHJcbiAgICAgICAgICAgIGxldCAkYmxvY2tzID0gJHBhcmVudC5maW5kKCcuYWRkLXNlcnZpY2VfX2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bk9wZW4uc2hvdygpO1xyXG4gICAgICAgICAgICAkYmxvY2tzLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2hvd1NlcnZpY2VJdGVtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy10b2dnbGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKCdkYXRhLWJsb2NrLXRhcmdldCcpO1xyXG5cclxuICAgICAgICAgICAgJHBhcmVudC5maW5kKCcuanMtdG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcignOnRleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRvZ2dsZUNsYXNzKCdqc0NybUNvbWJvVGl0bGVTZXJ2aWNlcycpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1hZGQtc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnW2RhdGEtYmxvY2tdJylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCdbZGF0YS1ibG9jaz0nICsgaWQgKyAnXScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gU3RlcHNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5zdGVwcyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAvLyBDcm0uc3RlcHMuc29ydGFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ3JtLnN0ZXBzLnRhYnMoKTtcclxuICAgICAgICBDcm0uc3RlcHMuc2hvd1NlYXJjaCgpO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgdGFic1xyXG4gICAgdGFiczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXN0dWRpby1zdGVwJykudGFicygpO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgYnRuIHNob3cgc2VhcmNoXHJcbiAgICBzaG93U2VhcmNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1idG4tc3RlcHMtc2VhcmNoLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5zdGVwc19fc2VhcmNoJykuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU3RlcHMgc29ydGFibGUgaXRlbVxyXG4gICAgc29ydGFibGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuYmItdXBsb2FkX19saXN0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoJy5iYi11cGxvYWRfX2xpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnNvcnRhYmxlKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogJy5iYi11cGxvYWRfX2l0ZW06bm90KC5pcy11bnNvcnRhYmxlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ21vdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvbGVyYW5jZTogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbihlLCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLmFkZENsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uKGUsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzLnJlcGxhY2VUaXRsZUFmdGVyU29ydGFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWkuaXRlbS5yZW1vdmVDbGFzcygnZHJhZy1zb3J0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kaXNhYmxlU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vUmVwbGFjZSBpdGVtIHRpdGxlIGFmdGVyIHNvcnR0YWJsZVxyXG4gICAgcmVwbGFjZVRpdGxlQWZ0ZXJTb3J0YWJsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGhvbWUgPSAkKCc8c3BhbiBjbGFzcz1cImJiLXVwbG9hZF9faG9tZVwiPicpO1xyXG4gICAgICAgIGhvbWUudGV4dCgn0JPQu9Cw0LLQvdCw0Y8nKS5hcHBlbmRUbygkKCcuYmItdXBsb2FkX19pdGVtOmZpcnN0JykpO1xyXG4gICAgICAgICQoJy5iYi11cGxvYWRfX2l0ZW0nKVxyXG4gICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxyXG4gICAgICAgICAgICAuZmluZCgnLmJiLXVwbG9hZF9faG9tZScpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gU3R1ZGlvXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uc3R1ZGlvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgQ3JtLnN0dWRpby5hdmF0YXJUb2dnbGVCdG4oKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLndvcmtlclBhZ2VUb2dnbGUoKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLmNhdGVnb3J5U2hvdygpO1xyXG4gICAgfSxcclxuICAgIC8vQXZhdGFyIGJ0biBvcGVuIC8gY2xvc2VcclxuICAgIGF2YXRhclRvZ2dsZUJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljayB0b3VjaHN0YXJ0JywgJy5qcy1hZGQtYXZhdGFyLS1vcGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1hZGQtYXZhdGFyJykuZmFkZUluKHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmpzLWFkZC1hdmF0YXItLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1hZGQtYXZhdGFyJykuZmFkZU91dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vT3BlbiAvIENsb3NlIEFkZFdvcmtlciBwYWdlXHJcbiAgICB3b3JrZXJQYWdlVG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgIC8vT3BlbiBhZGQgd2Fya2VyIHBhZ2VcclxuICAgICAgICAgICAgbGV0ICRhZGRXb3JrZXIgPSAkKCcuanMtd29ya2VyLWFkZCcpO1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXdvcmtlci1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignaHJlZicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtd29ya2VyLWl0ZW0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGFkZFdvcmtlci5oYXNDbGFzcygnaXMtdmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFkZFdvcmtlci5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkYWRkV29ya2VyLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9DbG9zZSBhZGQgd29ya2VyIHBhZ2VcclxuICAgICAgICAgICAgJCgnLmpzLXdvcmtlci1hZGQtLWNsb3NlJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRhZGRXb3JrZXIucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhdGVnb3J5U2hvdzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtY2F0ZWdvcnknLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCAkdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtY2F0ZWdvcnknKTtcclxuICAgICAgICAgICAgbGV0ICRpdGVtSGlkZGVuID0gJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCdbZGF0YS1oaWRkZW49XCJ0cnVlXCJdJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHRhcmdldC5pcygnLmNhdGVnb3J5X19pdGVtLS1tb3JlJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Lmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1IaWRkZW4uYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9faXRlbS0tbW9yZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQldGJ0LUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtSGlkZGVuLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2l0ZW0tLW1vcmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dCgn0KHQutGA0YvRgtGMJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICAkKEJhc2UuaW5pdCgpKTtcclxuICAgICQoQ3JtLmluaXQoKSk7XHJcbn0pO1xyXG5cclxuLypcclxuICoqKiBmdW5jdGlvbnMuanNcclxuICovXHJcbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdiYi1wdXNoVXAnKTtcclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgICAgICdiYi1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXHJcbiAgICApO1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItcHVzaFVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLmJiLXB1c2hVcCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLmJiLXB1c2hVcCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vU2V0IElucHV0IERhdGUgVmFsdWVcclxuZnVuY3Rpb24gc2V0SW5wdXREYXRlKHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgbGV0IGhveSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZCA9IGhveS5nZXREYXRlKCksXHJcbiAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICB5ID0gaG95LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF0YTtcclxuXHJcbiAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgZCA9ICcwJyArIGQ7XHJcbiAgICB9XHJcbiAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgbSA9ICcwJyArIG07XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gX2RhdC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgIF9kYXRbaV0udmFsdWUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KGJsb2NrKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4iXX0=
