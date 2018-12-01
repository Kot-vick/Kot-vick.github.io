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


                                // Select.init();


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

                bodyFix: function bodyFix() {

                                $('html').addClass('is-fixed');
                },

                bodyUnFix: function bodyUnFix() {

                                $('html').removeClass('is-fixed');
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

                                showHide: function showHide() {

                                                var $dropdown = $document.find('.js-bb-dropdown');

                                                var $dropdownList = $document.find('.bb-dropdown__list _transform');

                                                var $btnFloating = $document.find('.js-btn-floating');

                                                var style = {

                                                                position: 'fixed',

                                                                top: 'auto',

                                                                bottom: 10,

                                                                left: 10,

                                                                right: 10,

                                                                zIndex: 9999

                                                };

                                                var _this = void 0,
                                                    $list = void 0;

                                                $document.on('click', '.js-bb-dropdown', function (e) {

                                                                var target = $(e.target);

                                                                _this = $(this);

                                                                $list = $(this).find('.bb-dropdown__list');

                                                                if (target.is('.bb-dropdown__overlay')) {

                                                                                $(this).removeClass('is-active');

                                                                                $btnFloating.fadeIn();

                                                                                $header.removeAttr('style');

                                                                                $menu.removeAttr('style');
                                                                } else if (target.closest('.bb-dropdown__list').length) {

                                                                                e.stopPropagation();
                                                                } else {

                                                                                if ($window.width() > 768) {

                                                                                                _toggleDesk($(this));
                                                                                } else {

                                                                                                if ($(this).hasClass('is-active')) {} else {

                                                                                                                $list.insertAfter('.wrapper').css(style).addClass('_transform');

                                                                                                                setTimeout(function () {

                                                                                                                                $list.addClass('is-visible');
                                                                                                                }, 200);

                                                                                                                $overlay.addClass('is-visible');
                                                                                                }
                                                                                }
                                                                }

                                                                e.stopPropagation();
                                                });

                                                $document.on('click', function (e) {

                                                                if ($(e.target).closest('.js-bb-dropdown').length) return;

                                                                $dropdown.removeClass('is-active');
                                                });

                                                $document.on('click touchstart', '.overlay', function () {

                                                                $dropdown.removeClass('is-active');

                                                                _removeStyleMob();
                                                });

                                                $document.on('click', '.bb-dropdown__list .info-block__item', function () {

                                                                $dropdown.removeClass('is-active');

                                                                $btnFloating.fadeIn();

                                                                _removeStyleMob();
                                                });

                                                $document.on('click', '.js-bb-dropdown--close', function (e) {

                                                                e.stopPropagation();

                                                                $btnFloating.fadeIn();

                                                                _removeStyleMob();
                                                });

                                                function _toggleDesk(el) {

                                                                if (el.hasClass('is-active')) {

                                                                                el.removeClass('is-active');

                                                                                $btnFloating.fadeIn();
                                                                } else {

                                                                                $dropdown.removeClass('is-active');

                                                                                el.toggleClass('is-active');

                                                                                if (el.hasClass('bb-dropdown--transform')) {

                                                                                                $btnFloating.fadeOut();
                                                                                }
                                                                }
                                                }

                                                function _removeStyleMob() {

                                                                $list.removeClass('is-visible');

                                                                setTimeout(function () {

                                                                                $list.removeAttr('style').removeClass('_transform').appendTo(_this);

                                                                                $overlay.removeClass('is-visible');
                                                                }, 200);

                                                                _this.removeClass('is-active');
                                                }
                                }

                                // dScroll: function() {

                                //     // console.log('---', $window.innerHeight() / 2);

                                //     let $dropdown = $document.find('.js-bb-dropdown');


                                //     $dropdown.each(function() {

                                //         let _this = $(this);

                                //         let list = _this.find('.bb-dropdown__list');

                                //         console.log('---', _this);


                                //         $window.scroll(function(e) {

                                //             let top = _this.offset().top;

                                //             let scroll = $(this).scrollTop();

                                //             if (top > $window.innerHeight() / 2) {

                                //                 console.log('---', top);

                                //                 console.log('---', 1);

                                //             }

                                //         });


                                //         // console.log('---', $(this));

                                //         // console.log('---', $(this).offset().top);


                                //         _this

                                //             .on('mouseenter', function() {

                                //                 list.css({

                                //                     top: 0,

                                //                     right: 0

                                //                 });

                                //             })

                                //             .on('mouseleave', function() {

                                //                 list.removeAttr('style');

                                //             });

                                //     });

                                // }

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
                                this.calendar.init();

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
                                                                                                $menuItemDropdown.removeClass('is-active');
                                                                                }
                                                                }
                                                });
                                },
                                mobileNavBtn: function mobileNavBtn() {
                                                $('.js-mobile-nav-btn').on('click touchstart', function (e) {
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
                                                                if ($menu.hasClass('is-open')) {
                                                                                $hamburger.removeClass('on');
                                                                                $hamburgerCrm.removeClass('on');
                                                                                $wrapper.removeClass('mobile-nav--open');
                                                                                $menu.removeClass('is-open');
                                                                                Crm.menu.removeStyle();
                                                                }
                                                                if ($(window).width() <= 480) {
                                                                                Crm.menu.removeStyle();
                                                                }
                                                                setTimeout(function () {
                                                                                $menuOvelay.removeClass('is-active');
                                                                }, 100);
                                                                e.stopPropagation();
                                                });
                                },
                                //Menu dropdown
                                menuItemDropdown: function menuItemDropdown() {
                                                $menuItemDropdown.on('click', function () {
                                                                if ($(this).hasClass('is-active')) {
                                                                                $(this).removeClass('is-active');
                                                                                $hamburgerCrm.removeClass('on');

                                                                                if ($window.width() > 480) {
                                                                                                $wrapper.removeClass('menu-open');
                                                                                                $header.removeClass('is-moving');
                                                                                } else {
                                                                                                $btnFloat.fadeIn();
                                                                                                setTimeout(function () {
                                                                                                                $menuOvelay.removeClass('is-active');
                                                                                                }, 100);
                                                                                }
                                                                } else {
                                                                                $(this).addClass('is-active');
                                                                                $hamburgerCrm.removeClass('on');

                                                                                $(this).addClass('is-active');
                                                                                $menu.removeClass('is-open');
                                                                                $header.removeClass('is-moving');

                                                                                if ($window.width() > 480) {
                                                                                                $wrapper.addClass('menu-open');
                                                                                } else {
                                                                                                $btnFloat.fadeOut();
                                                                                                $menuOvelay.addClass('is-active');
                                                                                }
                                                                }
                                                });
                                },
                                removeStyle: function removeStyle() {
                                                $menuItemDropdown.removeClass('is-active');
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

                                                                setTimeout(function () {
                                                                                $body.addClass('is-fixed').css('position', 'fixed');
                                                                }, 300);

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
                },
                calendar: {
                                init: function init() {
                                                this.moveBlock();
                                },
                                moveBlock: function moveBlock() {
                                                if ($(window).width() > 480) {
                                                                $('.calendar__view').appendTo('.calendar__sorting');
                                                } else {
                                                                $('.calendar__view').appendTo('.js-control-box');
                                                                $('.js-control-box').appendTo('.calendar__sorting');
                                                }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhYmluZXQuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRib2R5IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRvdmVybGF5IiwiJGhlYWRlciIsIiRtYWluIiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIiRoYW1idXJnZXJDcm0iLCIkbWVudU92ZWxheSIsIiRtZW51SXRlbURyb3Bkb3duIiwiJGJ0bkZsb2F0IiwiZmluZCIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiYWNjb3JkZW9uIiwiY2hlY2tib3giLCJ0YWIiLCJsaXN0VG9nZ2xlIiwiY29weVRleHQiLCJvd25lclBob25lIiwiY2hhbmdlQ2l0eSIsInNsaWRlciIsImNhdGFsb2dJdGVtU2xpZGVyIiwiZHJvcGRvd24iLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiaXMiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwicGFyZW50IiwicmVtb3ZlQXR0ciIsInByb3AiLCIkYWNjb3JkZW9uIiwic2xpZGVVcCIsImVhY2giLCJzbGlkZURvd24iLCIkcGFyZW50IiwiY2xvc2VzdCIsIiRpdGVtIiwiZGF0YSIsImxpc3QiLCJ3b3JrTGlzdCIsImNzcyIsImNiIiwiQ2xpcGJvYXJkIiwiJGlucHV0SWNvbiIsIiRidG5SZXNldCIsIiRoaW50IiwiYnRuIiwiJGJ0bkRhdGEiLCIkaW5wdXRWYWwiLCJ2YWwiLCJhdHRyIiwic2hvdyIsIm5vdCIsImhpZGUiLCJmaWx0ZXIiLCJmYWRlT3V0IiwiZmFkZUluIiwidGV4dCIsInVzZXJQaG9uZSIsInBob25lIiwiY2hhbmdlQ2l0eVRpdGxlIiwiJHNsaWRlciIsIiRzbGlkcyIsIiRzbGlkZSIsIiRwcmV2QXJyb3ciLCIkbmV4dEFycm93Iiwic2xpY2siLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiaW5maW5pdGUiLCJhcnJvd3MiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIiRjYXRhbG9nSXRlbVNsaWRlciIsIl90aGlzIiwiJHNsaWRlcyIsIiRzbGlkZXJEb3RzIiwiZXZlbnQiLCJwcmVwZW5kIiwiYXBwZW5kIiwic2xpZGVDb3VudCIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsImkiLCJodG1sIiwibGF6eUxvYWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YWJzIiwiYm9keUZpeCIsImJvZHlVbkZpeCIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwiJGJ0biIsInJ1biIsImhlbmRsZXIiLCJvZmYiLCJfcmVtb3ZlQW5pbWF0aW9uIiwiZWwiLCJidG5JZCIsInRyaWdnZXIiLCJzY3JvbGxIZWlnaHQiLCJoZWlnaHQiLCJzY3JvbGxQb3NpdGlvbiIsInNjcm9sbFRvcCIsIm1lc3NhZ2VTdWNjZXNzIiwibWVzc2FnZUVycm9yIiwiZGVsYXkiLCJzdGF0dXMiLCJwdXNoVXAiLCJhbmltYXRlIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCIkZHJvcGRvd24iLCJyZW5kZXIiLCJzaG93SGlkZSIsIiRidG5DbG9zZSIsIiRkcm9wZG93bk92ZXJsYXkiLCIkZHJvcGRvd25MaXN0IiwiYXBwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsIiRidG5GbG9hdGluZyIsInN0eWxlIiwicG9zaXRpb24iLCJib3R0b20iLCJyaWdodCIsInpJbmRleCIsIiRsaXN0IiwidGFyZ2V0IiwiX3RvZ2dsZURlc2siLCJfcmVtb3ZlU3R5bGVNb2IiLCJ0b2dnbGVDbGFzcyIsImlucHV0RXZlbnRzIiwiaW5wdXRNYXNrIiwibW9iaWxlU2VsZWN0IiwiaW5wdXRtYXNrIiwibWFzayIsImdyZWVkeSIsIm9uQmVmb3JlUGFzdGUiLCJwYXN0ZWRWYWx1ZSIsIm9wdHMiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJkZWZpbml0aW9ucyIsInZhbGlkYXRvciIsImNhcmRpbmFsaXR5IiwiY2FzaW5nIiwiaW5wdXQiLCJleGVjQ29tbWFuZCIsIm5leHQiLCJwcmV2IiwiZmllbGRFZGl0IiwiZmllbGRFZGl0SW5wdXQiLCJmaWVsZEVkaXRCdG4iLCJmaWVsZEVkaXRUZXh0IiwiYmx1ciIsInRyaW0iLCJ2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsImtleXByZXNzIiwia2V5Q29kZSIsImVuZCIsIiRzZWxlY3QiLCIkaW5wdXRTZWFyY2giLCIkcmVzdWx0SXRlbSIsInNlbGVjdDIiLCJ0YWdzIiwidGVtcGxhdGVSZXN1bHQiLCJhZGRVc2VyUGljIiwidGVtcGxhdGVTZWxlY3Rpb24iLCJ0aW1lQW5kUHJpY2UiLCJtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCIsImFsbG93Q2xlYXIiLCJvcHQiLCJpZCIsIm9wdGltYWdlIiwiZWxlbWVudCIsIiRvcHQiLCJvcmlnaW5hbFRpbWUiLCJvcmlnaW5hbFByaWNlIiwiJHNlbGVjdE5hdGl2ZSIsInBsYWNlaG9sZGVyIiwiJGZpcnN0T3B0aW9uIiwid3JhcCIsImNvbG9yU2VsZWN0IiwiaWNvblNlbGVjdCIsInNob3dZZWFyIiwiaGlkZVllYXIiLCJhZGRSZXNldEJ0biIsInBob25lQ29kZSIsIiRpY29uU2VsZWN0IiwiaWZvcm1hdCIsImRyb3Bkb3duUGFyZW50IiwiaWNvbiIsIm9yaWdpbmFsT3B0aW9uIiwiJGNvbG9yU2VsZWN0IiwiaUJhbGwiLCJjb2xvciIsIiRvcmlnaW5hbE9wdGlvbiIsImNvbG9yQmFsbCIsIiR5ZWFyU2VsZWN0IiwiJGRhdGVTZWxlY3QiLCJzZWxlY3RDb2RlU2VsZWN0aW9uIiwib3B0VmFsIiwic2VsZWN0Q29kZVJlc3VsdCIsImNvdW50cnkiLCIkcGhvbmVDb2RlQm94IiwiJGlucHV0IiwiZm9jdXMiLCJvcHRpb25TZWxlY3QiLCJzZWxlY3RWYWx1ZSIsImVxIiwiY2hhbmdlIiwiY291bnRlciIsInNlbGVjdGVkSW5kZXgiLCJhZGRGb2N1cyIsInJlbW92ZUZvY3VzIiwiX3JlbW92ZVN0eWxlIiwiX2FkZFN0eWxlIiwic2VhcmNoQnRuIiwiZmFuY3lib3giLCJiYXNlQ2xhc3MiLCJjbG9zZUNsaWNrT3V0c2lkZSIsImF1dG9Gb2N1cyIsImltYWdlIiwicHJlbG9hZCIsImhlbHBlcnMiLCJvdmVybGF5IiwibG9ja2VkIiwidG9vbGJhciIsIm1vYmlsZSIsImNsaWNrQ29udGVudCIsImNsaWNrU2xpZGUiLCJ0b3VjaCIsInNtYWxsQnRuIiwid2hvaXMiLCJmb3JtIiwiQ3JtIiwiY29udHJvbEJveCIsImhhbWJ1cmdlckNybSIsIm1lbnVJdGVtRHJvcGRvd24iLCJjbGlja091dHNpZGUiLCJzbGlkZXJzIiwidHJpdW1waCIsInNsaWRlclBvcHVwUmVpbml0IiwibW9iaWxlQmxvY2siLCJib2R5UG9zaXRpb24iLCJyZXF1ZXN0SXRlbUNsaWNrIiwiY2FsbEFwbGljYXRpb25Nb2JpbGVCbG9jayIsImdyYXBoaWMiLCJjYWxlbmRhciIsImFwbGljYXRpb24iLCJyZXF1ZXN0Iiwic3RlcHMiLCJzdHVkaW8iLCJzZXJ2aWNlcyIsIldPVyIsImJveFJlc2l6ZSIsInNsaWRlVG9nZ2xlIiwic3RhcnQiLCJkaXNwbGF5IiwicmVtb3ZlU3R5bGUiLCJtb2JpbGVOYXZCdG4iLCJodG1sUmVtb3ZlU3R5bGUiLCIkYnRuTmV4dCIsInN3aXBlIiwidG91Y2hNb3ZlIiwibW9kYWwiLCJzZXRQb3NpdGlvbiIsIiRwYXJyZW50IiwiJGZvb3RlciIsImNoaWxkcmVuIiwib3V0ZXJIZWlnaHQiLCJib2R5Rml4ZWQiLCJkZXRlY3RIZWlnaHQiLCIkdGFibGUiLCIkdGFibGVXb3JrZXIiLCIkdGFibGVXb3JrZXJUciIsIiR0YWJsZUhvdXJzIiwiJHRhYmxlSG91cnNUciIsImN1cnJlbnRIb3Vyc0l0ZW0iLCJtYXhIZWlnaHQiLCJjdXJyZW50V29ya2VySXRlbSIsImVsZW0iLCJjdXJyZW50SGVpZ2h0IiwibW92ZUJsb2NrIiwiYXBsaWNhdGlvblRhYiIsInNob3dOZXdDbGllbkZvcm0iLCJzaG93QXBsaWNhdGlvbkl0ZW1PcHRpb25zIiwiYXBsaWNhdGlvbkl0ZW1Db3VudGVyIiwic2VsZWN0U2hvd1NlcnZpY2UiLCJhcGxpY2F0aW9uSXRlbVJlc2V0Iiwic2VhcmNoT3ZlcmxheSIsIiRhcGxpY2F0aW9uVGFiIiwiYmxvY2tGb290ZXIiLCJocmVmIiwiYWRkUmVtb3ZlQ2xhc3NCbG9jayIsIiRhcGxpY2F0aW9uIiwiJHVzZXIiLCIkZW1wdHlCbG9jayIsIiRidG5OZXdDbGllbnQiLCJpdGVtSW5mbyIsIndpZ2V0UmVwbGFjZUljb24iLCJ3aWRnZXQiLCJpdGVtIiwiaWNvbk5ldyIsImljb25Xb3JrIiwiaWNvbkRvbmUiLCJpY29uQWJvcnQiLCJzZWxlY3RUaW1lIiwic2hvd0FkZFNlcnZpY2UiLCJzaG93U2VydmljZUl0ZW0iLCJpdGVtSG92ZXIiLCIkYmxvY2tzIiwiJGJ0bk9wZW4iLCJzaG93U2VhcmNoIiwiZmFkZVRvZ2dsZSIsInNvcnRhYmxlIiwiaXRlbXMiLCJjb250YWlubWVudCIsImN1cnNvciIsInRvbGVyYW5jZSIsInVpIiwic3RvcCIsInJlcGxhY2VUaXRsZUFmdGVyU29ydGFibGUiLCJkaXNhYmxlU2VsZWN0aW9uIiwiaG9tZSIsImF2YXRhclRvZ2dsZUJ0biIsIndvcmtlclBhZ2VUb2dnbGUiLCJjYXRlZ29yeVNob3ciLCIkYWRkV29ya2VyIiwiJHRhcmdldCIsIiRpdGVtSGlkZGVuIiwib3B0aW9ucyIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsInBvc2hQb3MiLCJyYWYiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldElucHV0RGF0ZSIsInNlbGVjdG9yIiwiX2RhdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3kiLCJEYXRlIiwiZCIsImdldERhdGUiLCJtIiwiZ2V0TW9udGgiLCJ5IiwiZ2V0RnVsbFllYXIiLCJtYXgiLCJibG9jayIsImNsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFFBQVFMLEVBQUUsTUFBRixDQUFkO0FBQ0EsSUFBTU0sV0FBV04sRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTU8sV0FBV1AsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTVEsVUFBVVIsRUFBRSxTQUFGLENBQWhCO0FBQ0EsSUFBTVMsUUFBUVQsRUFBRSxVQUFGLENBQWQ7O0FBRUE7QUFDQSxJQUFNVSxRQUFRVixFQUFFLFVBQUYsQ0FBZDtBQUNBLElBQU1XLGFBQWFYLEVBQUUsZ0JBQUYsQ0FBbkI7QUFDQSxJQUFNWSxhQUFhWixFQUFFLGtCQUFGLENBQW5CO0FBQ0EsSUFBTWEsZ0JBQWdCYixFQUFFLGVBQUYsQ0FBdEI7QUFDQSxJQUFNYyxjQUFjZCxFQUFFLGtCQUFGLENBQXBCO0FBQ0EsSUFBTWUsb0JBQW9CZixFQUFFLHdCQUFGLENBQTFCO0FBQ0EsSUFBTWdCLFlBQVlkLFVBQVVlLElBQVYsQ0FBZSxrQkFBZixDQUFsQjs7QUFFQTs7Ozs7Ozs7OztBQVlBLElBQU1DLE9BQU87O0FBRVRDLHNCQUFNLGdCQUFXOztBQUViLHFDQUFLQyxlQUFMOztBQUVBLHFDQUFLQyxTQUFMOztBQUVBLHFDQUFLQyxRQUFMOztBQUVBOztBQUVBLHFDQUFLQyxHQUFMOztBQUVBOztBQUVBOztBQUVBLHFDQUFLQyxVQUFMOztBQUVBLHFDQUFLQyxRQUFMOztBQUVBLHFDQUFLQyxVQUFMOztBQUVBLHFDQUFLQyxVQUFMOztBQUVBLHFDQUFLQyxNQUFMOztBQUVBLHFDQUFLQyxpQkFBTDs7QUFJQSxxQ0FBS0MsUUFBTCxDQUFjWCxJQUFkOztBQUVBLHFDQUFLWSxNQUFMLENBQVlaLElBQVo7O0FBRUEscUNBQUthLE1BQUwsQ0FBWWIsSUFBWjs7QUFJQSxxQ0FBS2MsT0FBTCxDQUFhQyxXQUFiOztBQUVBLHFDQUFLRCxPQUFMLENBQWFFLGVBQWI7O0FBRUEscUNBQUtGLE9BQUwsQ0FBYUcsZ0JBQWI7O0FBRUEscUNBQUtILE9BQUwsQ0FBYUksUUFBYjs7QUFFQSxxQ0FBS0osT0FBTCxDQUFhSyxPQUFiOztBQUVBLHFDQUFLTCxPQUFMLENBQWFNLFdBQWI7O0FBRUEscUNBQUtOLE9BQUwsQ0FBYU8sT0FBYjs7QUFJQSxxQ0FBS0MsS0FBTCxDQUFXQyxhQUFYOztBQUVBLHFDQUFLRCxLQUFMLENBQVdFLEtBQVg7O0FBRUEscUNBQUtGLEtBQUwsQ0FBV0csZUFBWDs7QUFFQSxxQ0FBS0gsS0FBTCxDQUFXSSxNQUFYOztBQUlBOztBQUVBOzs7QUFJQTs7O0FBSUEsb0NBQUk3QyxFQUFFQyxNQUFGLEVBQVU2QyxLQUFWLEtBQW9CLEdBQXhCLEVBQTZCOztBQUV6QixxREFBS0MsU0FBTDtBQUVILGlDQUpELE1BSU87O0FBRUgscURBQUtDLElBQUwsQ0FBVUMsWUFBVjs7QUFFQSxxREFBS0QsSUFBTCxDQUFVRSxXQUFWOztBQUVBLHFEQUFLRixJQUFMLENBQVVHLGtCQUFWO0FBRUg7O0FBSUQ7O0FBRUFuRCxrQ0FBRSxLQUFGLEVBQVNvRCxFQUFULENBQVksV0FBWixFQUF5QixVQUFTQyxDQUFULEVBQVk7O0FBRWpDQSxrREFBRUMsY0FBRjtBQUVILGlDQUpEO0FBTUgsaUJBcEdROztBQXNHVFAsMkJBQVcscUJBQVc7O0FBRWxCLG9DQUFJQSxZQUFZL0MsRUFBRSxZQUFGLENBQWhCOztBQUVBLG9DQUFJK0MsVUFBVVEsTUFBZCxFQUFzQjs7QUFFbEJSLDBEQUFVUyxVQUFWLENBQXFCOztBQUVqQkMsNkVBQWEsU0FGSTs7QUFJakI7O0FBRUE7O0FBRUFDLHlFQUFTLEtBUlE7O0FBVWpCQyx1RUFBTyxHQVZVOztBQVlqQkMsNkVBQWEsS0FaSTs7QUFjakJDLDhFQUFjLE1BZEc7O0FBZ0JqQkMsb0ZBQW9COztBQWhCSCxpREFBckI7O0FBb0JBZiwwREFBVUssRUFBVixDQUFhLHFCQUFiLEVBQW9DLFlBQVc7O0FBRTNDcEQsa0VBQUUsSUFBRixFQUVLK0QsYUFGTCxHQUlLQyxNQUpMO0FBTUgsaURBUkQ7QUFVSDtBQUVKLGlCQTVJUTs7QUE4SVQ7O0FBRUE1QyxpQ0FBaUIsMkJBQVc7O0FBRXhCNkMsMkNBQVcsWUFBTTs7QUFFYmpFLGtEQUFFLE1BQUYsRUFBVWtFLFdBQVYsQ0FBc0IsMkJBQXRCO0FBRUgsaUNBSkQsRUFJRyxJQUpIO0FBTUgsaUJBeEpROztBQTBKVDs7QUFFQTVDLDBCQUFVLG9CQUFXOztBQUVqQnBCLDBDQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsaUJBQXRCLEVBQXlDLFVBQVNDLENBQVQsRUFBWTs7QUFFakQsb0RBRUlyRCxFQUFFLElBQUYsRUFFS2lCLElBRkwsQ0FFVSxPQUZWLEVBSUtrRCxFQUpMLENBSVEsVUFKUixDQUZKLEVBUUU7O0FBRUVuRSxrRUFBRSxJQUFGLEVBQVFvRSxRQUFSLENBQWlCLFlBQWpCO0FBRUgsaURBWkQsTUFZTzs7QUFFSHBFLGtFQUFFLElBQUYsRUFBUWtFLFdBQVIsQ0FBb0IsWUFBcEI7QUFFSDtBQUVKLGlDQXBCRDs7QUF3QkE7O0FBRUFoRSwwQ0FBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHlCQUF0QixFQUFpRCxZQUFXOztBQUV4RCxvREFBSXBELEVBQUUsSUFBRixFQUFRcUUsUUFBUixDQUFpQixZQUFqQixDQUFKLEVBQW9DOztBQUVoQ3JFLGtFQUFFLElBQUYsRUFBUWtFLFdBQVIsQ0FBb0IsWUFBcEI7QUFFSCxpREFKRCxNQUlPOztBQUVIbEUsa0VBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixZQUFqQjtBQUVIO0FBRUosaUNBWkQ7O0FBZ0JBOztBQUVBbEUsMENBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQiw0QkFBdEIsRUFBb0QsWUFBVzs7QUFFM0Qsb0RBQUlwRCxFQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIsYUFBakIsQ0FBSixFQUFxQzs7QUFFakNyRSxrRUFBRSxJQUFGLEVBRUtrRSxXQUZMLENBRWlCLGFBRmpCLEVBSUtJLE1BSkwsR0FNS3JELElBTkwsQ0FNVSxpQkFOVixFQVFLaUQsV0FSTCxDQVFpQixZQVJqQixFQVVLakQsSUFWTCxDQVVVLE9BVlYsRUFZS3NELFVBWkwsQ0FZZ0IsU0FaaEI7QUFjSCxpREFoQkQsTUFnQk87O0FBRUh2RSxrRUFBRSxJQUFGLEVBRUtvRSxRQUZMLENBRWMsYUFGZCxFQUlLRSxNQUpMLEdBTUtyRCxJQU5MLENBTVUsaUJBTlYsRUFRS21ELFFBUkwsQ0FRYyxZQVJkLEVBVUtuRCxJQVZMLENBVVUsT0FWVixFQVlLdUQsSUFaTCxDQVlVLFNBWlYsRUFZcUIsU0FackI7QUFjSDs7QUFFRCx1REFBTyxLQUFQO0FBRUgsaUNBdENEO0FBd0NILGlCQWxQUTs7QUFvUFQ7O0FBRUFuRCwyQkFBVyxxQkFBVzs7QUFFbEIsb0NBQUlvRCxhQUFhekUsRUFBRSxrQkFBRixDQUFqQjs7QUFJQSxvQ0FBSXlFLFdBQVdsQixNQUFmLEVBQXVCOztBQUVuQmtCLDJEQUFXeEQsSUFBWCxDQUFnQix3QkFBaEIsRUFBMEN5RCxPQUExQzs7QUFFQUQsMkRBQVd4RCxJQUFYLENBQWdCLHFCQUFoQixFQUF1QzBELElBQXZDLENBQTRDLFlBQVc7O0FBRW5ELG9FQUFJM0UsRUFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLFNBQWpCLENBQUosRUFBaUM7O0FBRTdCckUsa0ZBQUUsSUFBRixFQUVLaUIsSUFGTCxDQUVVLHdCQUZWLEVBSUsyRCxTQUpMO0FBTUg7QUFFSixpREFaRDtBQWNIOztBQUlEOztBQUVBMUUsMENBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQix1Q0FBdEIsRUFBK0QsVUFFM0RDLENBRjJELEVBSTdEOztBQUVFLG9EQUFJd0IsVUFBVTdFLEVBQUUsSUFBRixFQUFROEUsT0FBUixDQUFnQixrQkFBaEIsQ0FBZDs7QUFFQSxvREFBSUMsUUFBUS9FLEVBQUUsSUFBRixFQUFRc0UsTUFBUixDQUFlLHFCQUFmLENBQVo7O0FBSUEsb0RBQUlPLFFBQVFHLElBQVIsQ0FBYSxXQUFiLE1BQThCLFVBQWxDLEVBQThDOztBQUUxQyxvRUFBSUQsTUFBTVYsUUFBTixDQUFlLFNBQWYsQ0FBSixFQUErQjs7QUFFM0JVLHNGQUVLYixXQUZMLENBRWlCLFNBRmpCLEVBSUtqRCxJQUpMLENBSVUsd0JBSlYsRUFNS3lELE9BTkw7QUFRSCxpRUFWRCxNQVVPOztBQUVIRyx3RkFFSzVELElBRkwsQ0FFVSxxQkFGVixFQUlLaUQsV0FKTCxDQUlpQixTQUpqQixFQU1LakQsSUFOTCxDQU1VLHdCQU5WLEVBUUt5RCxPQVJMOztBQVVBSyxzRkFFS1gsUUFGTCxDQUVjLFNBRmQsRUFJS25ELElBSkwsQ0FJVSx3QkFKVixFQU1LMkQsU0FOTDtBQVFIO0FBRUosaURBbENELE1Ba0NPOztBQUVILG9FQUFJRyxNQUFNVixRQUFOLENBQWUsU0FBZixDQUFKLEVBQStCOztBQUUzQlUsc0ZBRUtiLFdBRkwsQ0FFaUIsU0FGakIsRUFJS2pELElBSkwsQ0FJVSx3QkFKVixFQU1LeUQsT0FOTDtBQVFILGlFQVZELE1BVU87O0FBRUhLLHNGQUVLWCxRQUZMLENBRWMsU0FGZCxFQUlLbkQsSUFKTCxDQUlVLHdCQUpWLEVBTUsyRCxTQU5MO0FBUUg7QUFFSjtBQUVKLGlDQXhFRDtBQTBFSCxpQkE5VlE7O0FBZ1dUcEQsNEJBQVksc0JBQVc7O0FBRW5CLG9DQUFJeEIsRUFBRSxVQUFGLEVBQWN1RCxNQUFsQixFQUEwQjtBQUFBLG9EQUViL0IsVUFGYSxHQUV0QixTQUFTQSxVQUFULEdBQXNCOztBQUVsQixvRUFBSXlELE9BQU9qRixFQUFFLFVBQUYsQ0FBWDs7QUFFQSxvRUFBSXNCLFdBQVcyRCxLQUFLaEUsSUFBTCxDQUFVLGlCQUFWLENBQWY7O0FBRUEsb0VBQUlpRSxXQUFXRCxLQUFLaEUsSUFBTCxDQUFVLGlCQUFWLENBQWY7O0FBRUFLLHlFQUFTOEIsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBVzs7QUFFNUIsb0ZBQUk5QixTQUFTK0MsUUFBVCxDQUFrQixZQUFsQixDQUFKLEVBQXFDOztBQUVqQ2EseUdBQVNYLFVBQVQsQ0FBb0IsT0FBcEI7QUFFSCxpRkFKRCxNQUlPOztBQUVIVyx5R0FBU0MsR0FBVCxDQUFhLFNBQWIsRUFBd0IsTUFBeEI7QUFFSDtBQUVKLGlFQVpEO0FBY0gsaURBeEJxQjs7QUEwQnRCM0Q7QUFFSDtBQUVKLGlCQWhZUTs7QUFrWVQ7O0FBRUFDLDBCQUFVLG9CQUFXOztBQUVqQixvQ0FBSTJELEtBQUssSUFBSUMsU0FBSixDQUFjLGVBQWQsQ0FBVDs7QUFJQTs7QUFFQW5GLDBDQUFVZSxJQUFWLENBQWUsV0FBZixFQUE0QjBELElBQTVCLENBQWlDLFlBQVc7O0FBRXhDLG9EQUFJRSxVQUFVN0UsRUFBRSxJQUFGLEVBQVE4RSxPQUFSLENBQWdCLGVBQWhCLENBQWQ7O0FBRUEsb0RBQUlRLGFBQWFULFFBQVE1RCxJQUFSLENBQWEsaUJBQWIsQ0FBakI7O0FBRUEsb0RBQUlzRSxZQUFZVixRQUFRNUQsSUFBUixDQUFhLGtCQUFiLENBQWhCOztBQUVBLG9EQUFJdUUsUUFBUXhGLEVBQUUsSUFBRixFQUVQOEUsT0FGTyxDQUVDLFlBRkQsRUFJUDdELElBSk8sQ0FJRixlQUpFLENBQVo7O0FBUUFqQixrREFBRSxJQUFGLEVBRUtvRCxFQUZMLENBRVEsT0FGUixFQUVpQixZQUFXOztBQUVwQixvRUFBSXlCLFVBQVU3RSxFQUFFLElBQUYsRUFBUThFLE9BQVIsQ0FBZ0IsaUJBQWhCLENBQWQ7O0FBRUEsb0VBQUlXLE1BQU1aLFFBQVE1RCxJQUFSLENBQWEsZUFBYixDQUFWOztBQUVBLG9FQUFJeUUsV0FBVzFGLEVBQUUsSUFBRixFQUFRZ0YsSUFBUixDQUFhLGdCQUFiLENBQWY7O0FBRUEsb0VBQUlXLFlBQVkzRixFQUFFLElBQUYsRUFBUTRGLEdBQVIsRUFBaEI7O0FBSUFILG9FQUFJSSxJQUFKLENBQVMscUJBQVQsRUFBZ0NILFdBQVdDLFNBQTNDO0FBRUgsaURBaEJMLEVBa0JLdkMsRUFsQkwsQ0FrQlEsT0FsQlIsRUFrQmlCLFlBQVc7O0FBRXBCLG9FQUFJcEQsRUFBRSxJQUFGLEVBQVE0RixHQUFSLE1BQWlCLEVBQXJCLEVBQXlCOztBQUVyQk4sMkZBRUtRLElBRkwsR0FJS0MsR0FKTCxDQUlTLGtCQUpULEVBTUtDLElBTkw7QUFRSDtBQUVKLGlEQWhDTCxFQWtDSzVDLEVBbENMLENBa0NRLE1BbENSLEVBa0NnQixZQUFXOztBQUVuQixvRUFBSXBELEVBQUUsSUFBRixFQUFRNEYsR0FBUixNQUFpQixFQUFyQixFQUF5Qjs7QUFFckJOLDJGQUVLUSxJQUZMLEdBSUtHLE1BSkwsQ0FJWSxrQkFKWixFQU1LRCxJQU5MO0FBUUg7QUFFSixpREFoREw7QUFrREgsaUNBbEVEOztBQXNFQTlGLDBDQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0Isa0JBQXRCLEVBQTBDLFlBQVc7O0FBRWpEcEQsa0RBQUUsSUFBRixFQUVLOEUsT0FGTCxHQUlLN0QsSUFKTCxDQUlVLFdBSlYsRUFNSzJFLEdBTkwsQ0FNUyxFQU5UOztBQVFBNUYsa0RBQUUsSUFBRixFQUVLa0csT0FGTCxHQUlLcEIsT0FKTCxHQU1LN0QsSUFOTCxDQU1VLGlCQU5WLEVBUUs4RSxHQVJMLENBUVMsa0JBUlQsRUFVS0ksTUFWTDs7QUFjQW5HLGtEQUFFLElBQUYsRUFFSzhFLE9BRkwsQ0FFYSxZQUZiLEVBSUs3RCxJQUpMLENBSVUsZUFKVixFQU1La0UsR0FOTCxDQU1TLFNBTlQsRUFNb0IsTUFOcEI7QUFRSCxpQ0FoQ0Q7QUFrQ0gsaUJBcGZROztBQXNmVDs7QUFFQXpELDRCQUFZLHNCQUFXOztBQUVuQjFCLGtDQUFFLGdCQUFGLEVBQW9CMkUsSUFBcEIsQ0FBeUIsWUFBVzs7QUFFaEMzRSxrREFBRSxJQUFGLEVBRUs2RixJQUZMLENBRVUsTUFGVixFQUVrQixxQkFGbEIsRUFJS08sSUFKTCxDQUlVcEcsRUFBRSxJQUFGLEVBQVFnRixJQUFSLENBQWEsYUFBYixDQUpWO0FBTUgsaUNBUkQ7O0FBWUFoRixrQ0FBRUcsUUFBRixFQUFZaUQsRUFBWixDQUFlLE9BQWYsRUFBd0Isc0JBQXhCLEVBQWdELFlBQVc7O0FBRXZELG9EQUFJaUQsWUFBWXJHLEVBQUUsSUFBRixFQUVYc0UsTUFGVyxHQUlYckQsSUFKVyxDQUlOLGdCQUpNLENBQWhCOztBQU1BLG9EQUFJcUYsUUFBUUQsVUFBVXJCLElBQVYsQ0FBZSxPQUFmLENBQVo7O0FBRUFxQiwwREFFSzlCLFVBRkwsQ0FFZ0IsT0FGaEIsRUFJS3NCLElBSkwsQ0FJVSxNQUpWLEVBSWtCLFNBQVNTLEtBSjNCLEVBTUtGLElBTkwsQ0FNVUUsS0FOVjs7QUFRQXRHLGtEQUFFLElBQUYsRUFBUW1GLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCO0FBRUgsaUNBcEJEO0FBc0JILGlCQTVoQlE7O0FBOGhCVDs7QUFFQXhELDRCQUFZLHNCQUFXOztBQUVuQixvQ0FBSUEsYUFBYTNCLEVBQUUsaUJBQUYsQ0FBakI7O0FBRUEsb0NBQUl1RyxrQkFBa0I1RSxXQUFXVixJQUFYLENBQWdCLDBCQUFoQixDQUF0Qjs7QUFJQVUsMkNBQVdWLElBQVgsQ0FBZ0Isb0JBQWhCLEVBQXNDbUMsRUFBdEMsQ0FBeUMsT0FBekMsRUFBa0QsWUFBVzs7QUFFekQsb0RBQUlnRCxPQUFPcEcsRUFBRSxJQUFGLEVBQVFvRyxJQUFSLEVBQVg7O0FBRUFHLGdFQUFnQkgsSUFBaEIsQ0FBcUJBLElBQXJCO0FBRUgsaUNBTkQ7QUFRSCxpQkFoakJROztBQWtqQlQ7O0FBRUF4RSx3QkFBUSxrQkFBVzs7QUFFZixvQ0FBSTRFLFVBQVV4RyxFQUFFLGVBQUYsQ0FBZDs7QUFFQSxvQ0FBSXdHLFFBQVFqRCxNQUFaLEVBQW9COztBQUVoQmlELHdEQUFRN0IsSUFBUixDQUFhLFlBQVc7O0FBRXBCLG9FQUFJOEIsU0FBU3pHLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLG9CQUFiLENBQWI7O0FBRUEsb0VBQUl5RixTQUFTMUcsRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsbUJBQWIsQ0FBYjs7QUFFQSxvRUFBSTBGLGFBQWEzRyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSx5QkFBYixDQUFqQjs7QUFFQSxvRUFBSTJGLGFBQWE1RyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSx5QkFBYixDQUFqQjs7QUFJQSxvRUFBSXlGLE9BQU9uRCxNQUFYLEVBQW1COztBQUVma0QsdUZBQU9WLEdBQVAsQ0FBVyxvQkFBWCxFQUFpQ2MsS0FBakMsQ0FBdUM7O0FBRW5DQywyR0FBV0gsVUFGd0I7O0FBSW5DSSwyR0FBV0gsVUFKd0I7O0FBTW5DSSwwR0FBVSxJQU55Qjs7QUFRbkNDLCtHQUFlLElBUm9COztBQVVuQ0MsdUdBQU8sSUFWNEI7O0FBWW5DQyw4R0FBYyxDQVpxQjs7QUFjbkNDLGdIQUFnQixDQWRtQjs7QUFnQm5DQywwR0FBVSxJQWhCeUI7O0FBa0JuQ0Msd0dBQVEsSUFsQjJCOztBQW9CbkNDLHNHQUFNLEtBcEI2Qjs7QUF3Qm5DQyw0R0FBWSxDQUVSOztBQUVJQyw0SEFBWSxHQUZoQjs7QUFJSUMsMEhBQVU7O0FBRU5QLDhJQUFjLENBRlI7O0FBSU5JLHNJQUFNLElBSkE7O0FBTU5ELHdJQUFROztBQU5GOztBQUpkLGlHQUZROztBQXhCdUIsaUZBQXZDO0FBOENIO0FBRUosaURBOUREO0FBZ0VIO0FBRUosaUJBNW5CUTs7QUE4bkJUOztBQUVBekYsbUNBQW1CLDZCQUFXOztBQUUxQixvQ0FBSTdCLEVBQUUseUJBQUYsRUFBNkJ1RCxNQUFqQyxFQUF5Qzs7QUFFckMsb0RBQUlvRSxxQkFBcUIzSCxFQUFFLHlCQUFGLENBQXpCOztBQUlBMkgsbUVBQW1CaEQsSUFBbkIsQ0FBd0IsWUFBVzs7QUFFL0Isb0VBQUlpRCxRQUFRNUgsRUFBRSxJQUFGLENBQVo7O0FBRUEsb0VBQUk2SCxVQUFVN0gsRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsb0JBQWIsQ0FBZDs7QUFFQSxvRUFBSXlGLFNBQVMxRyxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxtQkFBYixDQUFiOztBQUVBLG9FQUFJNkcsY0FBYzlILEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLGtCQUFiLENBQWxCOztBQUVBNkcsNEVBQVk5QixJQUFaOztBQUlBNEIsc0VBRUt4RSxFQUZMLENBRVEsTUFGUixFQUVnQixVQUFTMkUsS0FBVCxFQUFnQmxCLEtBQWhCLEVBQXVCOztBQUUvQmlCLDRGQUFZRSxPQUFaLENBRUksa0VBRUksR0FKUjs7QUFRQUYsNEZBQVlHLE1BQVosQ0FFSSw0REFFSXBCLE1BQU1xQixVQUZWLEdBSUksU0FOUjtBQVVILGlFQXRCTCxFQXdCSzlFLEVBeEJMLENBd0JRLGFBeEJSLEVBd0J1QixVQUVmMkUsS0FGZSxFQUlmbEIsS0FKZSxFQU1mc0IsWUFOZSxFQVFmQyxTQVJlLEVBVWpCOztBQUVFLG9GQUFJQyxJQUFJLENBQUNGLGVBQWVBLFlBQWYsR0FBOEIsQ0FBL0IsSUFBb0MsQ0FBNUM7O0FBRUFQLHNGQUFNM0csSUFBTixDQUFXLHdCQUFYLEVBQXFDcUgsSUFBckMsQ0FBMENELENBQTFDO0FBRUgsaUVBeENMOztBQTRDQSxvRUFBSTNCLE9BQU9uRCxNQUFQLEdBQWdCLENBQXBCLEVBQXVCOztBQUVuQnVFLDRGQUFZaEMsSUFBWjs7QUFJQStCLHdGQUFROUIsR0FBUixDQUFZLG9CQUFaLEVBQWtDYyxLQUFsQyxDQUF3Qzs7QUFFcEMwQiwwR0FBVSxVQUYwQjs7QUFJcENyQix1R0FBTyxHQUo2Qjs7QUFNcENDLDhHQUFjLENBTnNCOztBQVFwQ0MsZ0hBQWdCLENBUm9COztBQVVwQ0Usd0dBQVEsSUFWNEI7O0FBWXBDRCwwR0FBVSxLQVowQjs7QUFjcENFLHNHQUFNLEtBZDhCOztBQWtCcENDLDRHQUFZLENBRVI7O0FBRUlDLDRIQUFZLEdBRmhCOztBQUlJQywwSEFBVTs7QUFFTkosd0lBQVE7O0FBRkY7O0FBSmQsaUdBRlE7O0FBbEJ3QixpRkFBeEM7QUFvQ0g7QUFFSixpREF0R0Q7O0FBMEdBLG9EQUFJdEgsRUFBRUMsTUFBRixFQUFVNkMsS0FBVixLQUFvQixHQUF4QixFQUE2Qjs7QUFFekI5QyxrRUFBRSxrQkFBRixFQUVLaUIsSUFGTCxDQUVVLG9CQUZWLEVBSUttQyxFQUpMLENBSVEsT0FKUixFQUlpQixVQUFTQyxDQUFULEVBQVk7O0FBRXJCLG9GQUFJckQsRUFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLG1CQUFqQixDQUFKLEVBQTJDOztBQUV2Q2hCLGtHQUFFbUYsZUFBRjs7QUFFQW5GLGtHQUFFQyxjQUFGO0FBRUg7QUFFSixpRUFkTDtBQWdCSDtBQUVKO0FBRUosaUJBeHdCUTs7QUEwd0JUL0IscUJBQUssZUFBVzs7QUFFWnZCLGtDQUFFLFlBQUYsRUFBZ0J5SSxJQUFoQjtBQUVILGlCQTl3QlE7O0FBZ3hCVEMseUJBQVMsbUJBQVc7O0FBRWhCMUksa0NBQUUsTUFBRixFQUFVb0UsUUFBVixDQUFtQixVQUFuQjtBQUVILGlCQXB4QlE7O0FBc3hCVHVFLDJCQUFXLHFCQUFXOztBQUVsQjNJLGtDQUFFLE1BQUYsRUFBVWtFLFdBQVYsQ0FBc0IsVUFBdEI7QUFFSCxpQkExeEJROztBQTR4QlRqQyx5QkFBUzs7QUFFTDs7QUFFQUMsNkNBQWEsdUJBQVc7O0FBRXBCMEcsK0RBQWUsa0JBQWYsRUFBbUMsV0FBbkM7QUFFSCxpQ0FSSTs7QUFVTDs7QUFFQXpHLGlEQUFpQiwyQkFBVzs7QUFFeEJqQywwREFFS2tELEVBRkwsQ0FFUSxZQUZSLEVBRXNCLGlCQUZ0QixFQUV5QyxVQUFTQyxDQUFULEVBQVk7O0FBRTdDLG9FQUFJd0YsZUFBZTdJLEVBQUUsSUFBRixFQUFROEksTUFBUixFQUFuQjtBQUFBLG9FQUVJQyxPQUFPMUYsRUFBRTJGLEtBQUYsR0FBVUgsYUFBYUksSUFGbEM7QUFBQSxvRUFJSUMsT0FBTzdGLEVBQUU4RixLQUFGLEdBQVVOLGFBQWFPLEdBSmxDOztBQU1BcEosa0VBQUUsSUFBRixFQUVLaUIsSUFGTCxDQUVVLHdCQUZWLEVBSUtrRSxHQUpMLENBSVM7O0FBRURpRSxxRkFBS0YsSUFGSjs7QUFJREQsc0ZBQU1GOztBQUpMLGlFQUpUO0FBWUgsaURBdEJMLEVBd0JLM0YsRUF4QkwsQ0F3QlEsVUF4QlIsRUF3Qm9CLGlCQXhCcEIsRUF3QnVDLFVBQVNDLENBQVQsRUFBWTs7QUFFM0Msb0VBQUl3RixlQUFlN0ksRUFBRSxJQUFGLEVBQVE4SSxNQUFSLEVBQW5CO0FBQUEsb0VBRUlDLE9BQU8xRixFQUFFMkYsS0FBRixHQUFVSCxhQUFhSSxJQUZsQztBQUFBLG9FQUlJQyxPQUFPN0YsRUFBRThGLEtBQUYsR0FBVU4sYUFBYU8sR0FKbEM7O0FBTUFwSixrRUFBRSxJQUFGLEVBRUtpQixJQUZMLENBRVUsd0JBRlYsRUFJS2tFLEdBSkwsQ0FJUzs7QUFFRGlFLHFGQUFLRixJQUZKOztBQUlERCxzRkFBTUY7O0FBSkwsaUVBSlQ7QUFZSCxpREE1Q0w7QUE4Q0gsaUNBNURJOztBQThETDs7QUFFQTNHLGtEQUFrQiw0QkFBVzs7QUFFekIsb0RBQUlpSCxRQUFRLENBQVo7O0FBRUFuSiwwREFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGNBQXRCLEVBQXNDLFVBQVNDLENBQVQsRUFBWTtBQUFBOztBQUU5Q2dHOztBQUVBckosa0VBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixxQkFBakI7O0FBSUEsb0VBQUlpRixTQUFTLENBQWIsRUFBZ0I7O0FBRVpwRiwyRkFBVyxZQUFNOztBQUViakUsMEdBQVFrRSxXQUFSLENBQW9CLHFCQUFwQjtBQUVILGlGQUpELEVBSUcsSUFKSDs7QUFNQUQsMkZBQVcsWUFBTTs7QUFFYmpFLDBHQUFRb0UsUUFBUixDQUFpQixVQUFqQjs7QUFFQWlGLHdHQUFRLENBQVI7QUFFSCxpRkFORCxFQU1HLElBTkg7QUFRSDs7QUFJRGhHLGtFQUFFQyxjQUFGO0FBRUgsaURBOUJEO0FBZ0NILGlDQXBHSTs7QUFzR0w7O0FBRUFmLDZDQUFhLHVCQUFXOztBQUVwQixvREFBSStHLE9BQU9wSixVQUFVZSxJQUFWLENBQWUsa0JBQWYsQ0FBWDs7QUFFQSxvREFBSXNJLE1BQU0sSUFBVjs7QUFJQSxvREFBSSxDQUFDRCxLQUFLckksSUFBTCxDQUFVLHFCQUFWLEVBQWlDc0MsTUFBdEMsRUFBOEM7O0FBRTFDK0YscUVBQUtySSxJQUFMLENBQVUscUJBQVYsRUFBaUNrRSxHQUFqQyxDQUFxQyxnQkFBckMsRUFBdUQsTUFBdkQ7QUFFSDs7QUFJRDs7QUFFQSxvREFBSXFFLFVBQVUsU0FBVkEsT0FBVSxHQUFXO0FBQUE7O0FBRXJCeEosa0VBQUUsSUFBRixFQUVLa0UsV0FGTCxDQUVpQixpQkFGakIsRUFJS0UsUUFKTCxDQUljLGlCQUpkOztBQU1Ba0YscUVBQUtHLEdBQUwsQ0FFSSxrREFGSixFQUlJRCxPQUpKOztBQVFBdkYsMkVBQVcsWUFBTTs7QUFFYmpFLDBGQUFRa0UsV0FBUixDQUFvQixpQkFBcEI7QUFFSCxpRUFKRCxFQUlHLElBSkg7QUFNSCxpREF0QkQ7O0FBMEJBOztBQUVBLHlEQUFTd0YsZ0JBQVQsQ0FBMEJDLEVBQTFCLEVBQThCOztBQUUxQkEsbUVBQUd2RyxFQUFILENBRUksa0RBRkosRUFJSW9HLE9BSko7O0FBUUF2RiwyRUFBVyxZQUFNOztBQUViMEYsbUZBQUd6RixXQUFILENBQWUsaUJBQWY7QUFFSCxpRUFKRCxFQUlHLElBSkg7QUFNSDs7QUFJRCxvREFBSWxFLEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7O0FBRXpCLG9FQUFJLENBQUN5RyxHQUFMLEVBQVU7O0FBRU47QUFFSDs7QUFJRHJKLDBFQUVLa0QsRUFGTCxDQUVRLFlBRlIsRUFFc0Isa0JBRnRCLEVBRTBDLFlBQVc7O0FBRTdDbUcsc0ZBQU0sS0FBTjs7QUFFQXZKLGtGQUFFLElBQUYsRUFBUW9FLFFBQVIsQ0FBaUIsaUJBQWpCO0FBRUgsaUVBUkwsRUFVS2hCLEVBVkwsQ0FVUSxZQVZSLEVBVXNCLGtCQVZ0QixFQVUwQ29HLE9BVjFDO0FBWUgsaURBdEJELE1Bc0JPOztBQUVIdEosMEVBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixrQkFBdEIsRUFBMEMsWUFBVzs7QUFFakQsb0ZBQUlwRCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxxQkFBYixFQUFvQ3NDLE1BQXhDLEVBQWdEOztBQUU1Q3ZELGtHQUFFLElBQUYsRUFFS29FLFFBRkwsQ0FFYyxpQkFGZCxFQUlLZSxHQUpMLENBSVMsU0FKVCxFQUlvQixJQUpwQjs7QUFNQTVFLHlHQUFTNkQsUUFBVCxDQUFrQixZQUFsQjtBQUVILGlGQVZELE1BVU87O0FBRUgsb0dBQUl3RixRQUFRNUosRUFBRSxJQUFGLEVBRVBpQixJQUZPLENBRUYscUJBRkUsRUFJUDhFLEdBSk8sQ0FJSCxVQUpHLENBQVo7O0FBTUE2RCxzR0FBTUMsT0FBTixDQUFjLE9BQWQ7QUFFSDtBQUVKLGlFQXhCRDs7QUE0QkEzSiwwRUFBVWtELEVBQVYsQ0FFSSxPQUZKLEVBSUksc0NBSkosRUFNSSxVQUFTQyxDQUFULEVBQVk7O0FBRVJpRyxxRkFBS3BGLFdBQUwsQ0FBaUIsaUJBQWpCLEVBQW9DSyxVQUFwQyxDQUErQyxPQUEvQzs7QUFFQW1GLGlHQUFpQjFKLEVBQUUsSUFBRixDQUFqQjs7QUFFQU8seUZBQVMyRCxXQUFULENBQXFCLFlBQXJCOztBQUVBYixrRkFBRW1GLGVBQUY7QUFFSCxpRUFoQkw7O0FBc0JBOztBQUVBdEksMEVBQVVrRCxFQUFWLENBQWEsa0JBQWIsRUFBaUMsVUFBakMsRUFBNkMsVUFBU0MsQ0FBVCxFQUFZOztBQUVyRGlHLHFGQUFLcEYsV0FBTCxDQUFpQixpQkFBakIsRUFBb0NFLFFBQXBDLENBRUksaUJBRko7O0FBTUFILDJGQUFXLFlBQU07O0FBRWIxRCx5R0FBUzJELFdBQVQsQ0FBcUIsWUFBckI7QUFFSCxpRkFKRCxFQUlHLEdBSkg7O0FBUUFELDJGQUFXLFlBQU07O0FBRWJxRixxR0FBS3BGLFdBQUwsQ0FBaUIsaUJBQWpCO0FBRUgsaUZBSkQsRUFJRyxJQUpIO0FBTUgsaUVBdEJEO0FBd0JIOztBQUlEbkUsd0RBQVFxRCxFQUFSLENBQVcsUUFBWCxFQUFxQixZQUFXOztBQUU1QixvRUFBSTBHLGVBQWU1SixVQUFVNkosTUFBVixFQUFuQjs7QUFFQSxvRUFBSUMsaUJBQWlCakssUUFBUWdLLE1BQVIsS0FBbUJoSyxRQUFRa0ssU0FBUixFQUF4Qzs7QUFFQSxvRUFBSSxDQUFDSCxlQUFlRSxjQUFoQixJQUFrQ0YsWUFBbEMsS0FBbUQsQ0FBdkQsRUFBMEQ7O0FBRXREUixxRkFBS2xGLFFBQUwsQ0FBYyxTQUFkO0FBRUgsaUVBSkQsTUFJTzs7QUFFSGtGLHFGQUFLcEYsV0FBTCxDQUFpQixTQUFqQjtBQUVIO0FBRUosaURBaEJEOztBQW9CQTs7QUFFQWxFLGtEQUFFLFFBQUYsRUFBWW9ELEVBQVosQ0FBZSxlQUFmLEVBQWdDLFlBQVc7O0FBRXZDa0cscUVBQUtwRixXQUFMLENBQWlCLGlCQUFqQixFQUFvQ0UsUUFBcEMsQ0FBNkMsaUJBQTdDOztBQUVBN0QseUVBQVNnRSxVQUFULENBQW9CLE9BQXBCOztBQUVBTiwyRUFBVyxZQUFNOztBQUVicUYscUZBQUtwRixXQUFMLENBQWlCLGlCQUFqQjtBQUVILGlFQUpELEVBSUcsSUFKSDtBQU1ILGlEQVpEO0FBY0gsaUNBdFRJOztBQXdUTDFCLHlDQUFTLG1CQUFXOztBQUVoQnRDLDBEQUFVZSxJQUFWLENBQWUsYUFBZixFQUE4Qm1DLEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVc7QUFBQTs7QUFFakQsb0VBQUk4RyxpQkFBaUJsSyxFQUFFLElBQUYsRUFBUTZGLElBQVIsQ0FBYSwyQkFBYixDQUFyQjs7QUFFQSxvRUFBSXNFLGVBQWVuSyxFQUFFLElBQUYsRUFBUTZGLElBQVIsQ0FBYSx5QkFBYixDQUFuQjs7QUFFQSxvRUFBSXVFLFFBQVFwSyxFQUFFLElBQUYsRUFBUTZGLElBQVIsQ0FBYSxpQkFBYixLQUFtQyxDQUEvQzs7QUFFQSxvRUFBSXdFLGVBQUo7O0FBSUFwRywyRUFBVyxZQUFNOztBQUVib0cseUZBQVNySyxVQUFRNkYsSUFBUixDQUFhLGtCQUFiLEtBQW9DLFNBQTdDO0FBRUgsaUVBSkQsRUFJRyxHQUpIOztBQVFBNUIsMkVBQVcsWUFBTTs7QUFFYixvRkFBSW9HLFdBQVcsT0FBZixFQUF3Qjs7QUFFcEJDLHVHQUFPOztBQUVIbEUsc0hBQU0rRCxZQUZIOztBQUlIRSx3SEFBUUE7O0FBSkwsaUdBQVA7QUFRSCxpRkFWRCxNQVVPOztBQUVIQyx1R0FBTzs7QUFFSGxFLHNIQUFNOEQsY0FGSDs7QUFJSEcsd0hBQVFBOztBQUpMLGlHQUFQO0FBUUg7QUFFSixpRUF4QkQsRUF3QkdELEtBeEJIO0FBMEJILGlEQTlDRDtBQWdESCxpQ0ExV0k7O0FBNFdMOztBQUVBL0gsMENBQVUsb0JBQVc7O0FBRWpCckMsa0RBQUUsWUFBRixFQUFnQm9ELEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFVBQVNDLENBQVQsRUFBWTs7QUFFcENBLGtFQUFFQyxjQUFGOztBQUVBdEQsa0VBQUUsWUFBRixFQUFnQnVLLE9BQWhCLENBRUk7O0FBRUlOLDJGQUFXOztBQUZmLGlFQUZKLEVBUUksR0FSSjtBQVlILGlEQWhCRDtBQWtCSCxpQ0FsWUk7O0FBb1lMOztBQUVBM0gseUNBQVMsbUJBQVc7O0FBRWhCOztBQUVBdEMsa0RBQUUsVUFBRixFQUFjb0QsRUFBZCxDQUFpQixPQUFqQixFQUEwQixVQUFTQyxDQUFULEVBQVk7O0FBRWxDQSxrRUFBRUMsY0FBRjs7QUFFQUQsa0VBQUVtRixlQUFGOztBQUlBLG9FQUFJZ0MsZUFBZXhLLEVBQUUsSUFBRixFQUFRNkYsSUFBUixDQUFhLE1BQWIsQ0FBbkI7O0FBRUEsb0VBQUk0RSxjQUFjekssRUFBRXdLLFlBQUYsRUFBZ0IxQixNQUFoQixHQUF5Qk0sR0FBM0M7O0FBRUEsb0VBQUlwSixFQUFFQyxNQUFGLEVBQVU2QyxLQUFWLEtBQW9CLEdBQXhCLEVBQTZCOztBQUV6QjlDLGtGQUFFLFlBQUYsRUFBZ0J1SyxPQUFoQixDQUVJOztBQUVJTiwyR0FBV1EsY0FBYyxFQUFkLEdBQW1COztBQUZsQyxpRkFGSixFQVFJLEdBUko7QUFZSCxpRUFkRCxNQWNPOztBQUVIekssa0ZBQUUsWUFBRixFQUFnQnVLLE9BQWhCLENBRUk7O0FBRUlOLDJHQUFXUSxjQUFjLEVBQWQsR0FBbUI7O0FBRmxDLGlGQUZKLEVBUUksR0FSSjtBQVlIO0FBRUosaURBMUNEO0FBNENIOztBQXRiSSxpQkE1eEJBOztBQXN0Q1QzSSwwQkFBVTs7QUFFTjs7QUFFQVgsc0NBQU0sZ0JBQVc7O0FBRWIsb0RBQUl1SixZQUFZeEssVUFBVWUsSUFBVixDQUFlLGlCQUFmLENBQWhCOztBQUlBLG9EQUFJeUosVUFBVW5ILE1BQWQsRUFBc0I7O0FBRWxCLG9FQUFJeEQsUUFBUStDLEtBQVIsTUFBbUIsR0FBdkIsRUFBNEI7O0FBRXhCNEgsMEZBQVV4RyxXQUFWLENBQXNCLG9CQUF0QjtBQUVIO0FBRUo7O0FBSUQscURBQUt5RyxNQUFMOztBQUVBLHFEQUFLQyxRQUFMOztBQUVBO0FBRUgsaUNBNUJLOztBQThCTkQsd0NBQVEsa0JBQVc7O0FBRWYsb0RBQUk1SyxRQUFRK0MsS0FBUixNQUFtQixHQUF2QixFQUE0Qjs7QUFFeEIsb0VBQUk0SCxZQUFZeEssVUFBVWUsSUFBVixDQUVaLHdDQUZZLENBQWhCOztBQU1BeUosMEVBQVUvRixJQUFWLENBQWUsWUFBVzs7QUFFdEIsb0ZBQUlrRyxZQUFZN0ssRUFFWiwyRUFGWSxDQUFoQjs7QUFNQSxvRkFBSThLLG1CQUFtQjlLLEVBRW5CLG9DQUZtQixDQUF2Qjs7QUFRQSxvRkFBSStLLGdCQUFnQi9LLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLG9CQUFiLENBQXBCOztBQUlBNEosMEZBQVVHLFFBQVYsQ0FBbUJELGFBQW5COztBQUVBRCxpR0FBaUJHLFdBQWpCLENBQTZCRixhQUE3Qjs7QUFFQUEsOEZBQWM5SixJQUFkLENBQW1CLG1CQUFuQixFQUF3Q2lLLE1BQXhDO0FBRUgsaUVBMUJEO0FBNEJIO0FBRUosaUNBdEVLOztBQXdFTk4sMENBQVUsb0JBQVc7O0FBRWpCLG9EQUFJRixZQUFZeEssVUFBVWUsSUFBVixDQUFlLGlCQUFmLENBQWhCOztBQUVBLG9EQUFJOEosZ0JBQWdCN0ssVUFBVWUsSUFBVixDQUFlLCtCQUFmLENBQXBCOztBQUVBLG9EQUFJa0ssZUFBZWpMLFVBQVVlLElBQVYsQ0FBZSxrQkFBZixDQUFuQjs7QUFJQSxvREFBSW1LLFFBQVE7O0FBRVJDLDBFQUFVLE9BRkY7O0FBSVJqQyxxRUFBSyxNQUpHOztBQU1Sa0Msd0VBQVEsRUFOQTs7QUFRUnJDLHNFQUFNLEVBUkU7O0FBVVJzQyx1RUFBTyxFQVZDOztBQVlSQyx3RUFBUTs7QUFaQSxpREFBWjs7QUFrQkEsb0RBQUk1RCxjQUFKO0FBQUEsb0RBQVc2RCxjQUFYOztBQUlBdkwsMERBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixpQkFBdEIsRUFBeUMsVUFBU0MsQ0FBVCxFQUFZOztBQUVqRCxvRUFBSXFJLFNBQVMxTCxFQUFFcUQsRUFBRXFJLE1BQUosQ0FBYjs7QUFFQTlELHdFQUFRNUgsRUFBRSxJQUFGLENBQVI7O0FBRUF5TCx3RUFBUXpMLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLG9CQUFiLENBQVI7O0FBRUEsb0VBQUl5SyxPQUFPdkgsRUFBUCxDQUFVLHVCQUFWLENBQUosRUFBd0M7O0FBRXBDbkUsa0ZBQUUsSUFBRixFQUFRa0UsV0FBUixDQUFvQixXQUFwQjs7QUFFQWlILDZGQUFhaEYsTUFBYjs7QUFFQTNGLHdGQUFRK0QsVUFBUixDQUFtQixPQUFuQjs7QUFFQTdELHNGQUFNNkQsVUFBTixDQUFpQixPQUFqQjtBQUVILGlFQVZELE1BVU8sSUFBSW1ILE9BQU81RyxPQUFQLENBQWUsb0JBQWYsRUFBcUN2QixNQUF6QyxFQUFpRDs7QUFFcERGLGtGQUFFbUYsZUFBRjtBQUVILGlFQUpNLE1BSUE7O0FBRUgsb0ZBQUl6SSxRQUFRK0MsS0FBUixLQUFrQixHQUF0QixFQUEyQjs7QUFFdkI2SSw0R0FBWTNMLEVBQUUsSUFBRixDQUFaO0FBRUgsaUZBSkQsTUFJTzs7QUFFSCxvR0FBSUEsRUFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLFdBQWpCLENBQUosRUFBbUMsQ0FFbEMsQ0FGRCxNQUVPOztBQUVIb0gsc0hBRUtSLFdBRkwsQ0FFaUIsVUFGakIsRUFJSzlGLEdBSkwsQ0FJU2lHLEtBSlQsRUFNS2hILFFBTkwsQ0FNYyxZQU5kOztBQVFBSCwySEFBVyxZQUFNOztBQUVid0gsc0lBQU1ySCxRQUFOLENBQWUsWUFBZjtBQUVILGlIQUpELEVBSUcsR0FKSDs7QUFNQTdELHlIQUFTNkQsUUFBVCxDQUFrQixZQUFsQjtBQUVIO0FBRUo7QUFFSjs7QUFFRGYsa0VBQUVtRixlQUFGO0FBRUgsaURBMUREOztBQThEQXRJLDBEQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsVUFBU0MsQ0FBVCxFQUFZOztBQUU5QixvRUFBSXJELEVBQUVxRCxFQUFFcUksTUFBSixFQUFZNUcsT0FBWixDQUFvQixpQkFBcEIsRUFBdUN2QixNQUEzQyxFQUFtRDs7QUFFbkRtSCwwRUFBVXhHLFdBQVYsQ0FBc0IsV0FBdEI7QUFFSCxpREFORDs7QUFVQWhFLDBEQUFVa0QsRUFBVixDQUFhLGtCQUFiLEVBQWlDLFVBQWpDLEVBQTZDLFlBQVc7O0FBRXBEc0gsMEVBQVV4RyxXQUFWLENBQXNCLFdBQXRCOztBQUVBMEg7QUFFSCxpREFORDs7QUFVQTFMLDBEQUFVa0QsRUFBVixDQUVJLE9BRkosRUFJSSxzQ0FKSixFQU1JLFlBQVc7O0FBRVBzSCwwRUFBVXhHLFdBQVYsQ0FBc0IsV0FBdEI7O0FBRUFpSCw2RUFBYWhGLE1BQWI7O0FBRUF5RjtBQUVILGlEQWRMOztBQW9CQTFMLDBEQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0Isd0JBQXRCLEVBQWdELFVBQVNDLENBQVQsRUFBWTs7QUFFeERBLGtFQUFFbUYsZUFBRjs7QUFFQTJDLDZFQUFhaEYsTUFBYjs7QUFFQXlGO0FBRUgsaURBUkQ7O0FBWUEseURBQVNELFdBQVQsQ0FBcUJoQyxFQUFyQixFQUF5Qjs7QUFFckIsb0VBQUlBLEdBQUd0RixRQUFILENBQVksV0FBWixDQUFKLEVBQThCOztBQUUxQnNGLG1GQUFHekYsV0FBSCxDQUFlLFdBQWY7O0FBRUFpSCw2RkFBYWhGLE1BQWI7QUFFSCxpRUFORCxNQU1POztBQUVIdUUsMEZBQVV4RyxXQUFWLENBQXNCLFdBQXRCOztBQUVBeUYsbUZBQUdrQyxXQUFILENBQWUsV0FBZjs7QUFJQSxvRkFBSWxDLEdBQUd0RixRQUFILENBQVksd0JBQVosQ0FBSixFQUEyQzs7QUFFdkM4Ryw2R0FBYWpGLE9BQWI7QUFFSDtBQUVKO0FBRUo7O0FBSUQseURBQVMwRixlQUFULEdBQTJCOztBQUV2Qkgsc0VBQU12SCxXQUFOLENBQWtCLFlBQWxCOztBQUVBRCwyRUFBVyxZQUFNOztBQUVid0gsc0ZBRUtsSCxVQUZMLENBRWdCLE9BRmhCLEVBSUtMLFdBSkwsQ0FJaUIsWUFKakIsRUFNSzhHLFFBTkwsQ0FNY3BELEtBTmQ7O0FBUUFySCx5RkFBUzJELFdBQVQsQ0FBcUIsWUFBckI7QUFFSCxpRUFaRCxFQVlHLEdBWkg7O0FBY0EwRCxzRUFBTTFELFdBQU4sQ0FBa0IsV0FBbEI7QUFFSDtBQUVKOztBQUVEOztBQUVBOztBQUVBOzs7QUFJQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBSUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUlBOztBQUVBOzs7QUFJQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUE5VU0saUJBdHRDRDs7QUF3aURUbEMsd0JBQVE7O0FBRUpiLHNDQUFNLGdCQUFXOztBQUViLHFEQUFLMkssV0FBTDs7QUFFQSxxREFBS0MsU0FBTDs7QUFFQSxxREFBS0MsWUFBTDtBQUVILGlDQVZHOztBQVlKOztBQUVBRCwyQ0FBVyxxQkFBVzs7QUFFbEIsb0RBQUkvTCxFQUFFLGdCQUFGLEVBQW9CdUQsTUFBeEIsRUFBZ0M7O0FBRTVCdkQsa0VBQUUsZ0JBQUYsRUFBb0JpTSxTQUFwQixDQUE4Qjs7QUFFMUJDLHNGQUFNOztBQUZvQixpRUFBOUI7QUFNSDs7QUFFRCxvREFBSWxNLEVBQUUsZUFBRixFQUFtQnVELE1BQXZCLEVBQStCOztBQUUzQnZELGtFQUFFLGVBQUYsRUFBbUJpTSxTQUFuQixDQUE2Qjs7QUFFekJDLHNGQUFNOztBQUZtQixpRUFBN0I7QUFNSDs7QUFFRCxvREFBSWxNLEVBQUUsZUFBRixFQUFtQnVELE1BQXZCLEVBQStCOztBQUUzQnZELGtFQUFFLGVBQUYsRUFBbUJpTSxTQUFuQixDQUE2Qjs7QUFFekJDLHNGQUFNOztBQUZtQixpRUFBN0I7QUFNSDs7QUFFRCxvREFBSWxNLEVBQUUsZUFBRixFQUFtQnVELE1BQXZCLEVBQStCOztBQUUzQnZELGtFQUFFLGVBQUYsRUFBbUJpTSxTQUFuQixDQUE2Qjs7QUFFekJDLHNGQUFNOztBQUZtQixpRUFBN0I7QUFNSDs7QUFFRCxvREFBSWxNLEVBQUUsa0JBQUYsRUFBc0J1RCxNQUExQixFQUFrQzs7QUFFOUJ2RCxrRUFBRSxrQkFBRixFQUFzQmlNLFNBQXRCLENBQWdDOztBQUU1QkMsc0ZBQU07O0FBRnNCLGlFQUFoQztBQU1IOztBQUVELG9EQUFJbE0sRUFBRSxnQkFBRixFQUFvQnVELE1BQXhCLEVBQWdDOztBQUU1QnZELGtFQUFFLGdCQUFGLEVBQW9CaU0sU0FBcEIsQ0FBOEI7O0FBRTFCQyxzRkFFSSxpRUFKc0I7O0FBTTFCQyx3RkFBUSxLQU5rQjs7QUFRMUJDLCtGQUFlLHVCQUFTQyxXQUFULEVBQXNCQyxJQUF0QixFQUE0Qjs7QUFFdkNELDhHQUFjQSxZQUFZRSxXQUFaLEVBQWQ7O0FBRUEsdUdBQU9GLFlBQVlHLE9BQVosQ0FBb0IsU0FBcEIsRUFBK0IsRUFBL0IsQ0FBUDtBQUVILGlGQWR5Qjs7QUFnQjFCQyw2RkFBYTs7QUFFVCxxR0FBSzs7QUFFREMsMkhBQVcsZ0NBRlY7O0FBSURDLDZIQUFhLENBSlo7O0FBTURDLHdIQUFROztBQU5QOztBQUZJOztBQWhCYSxpRUFBOUI7QUFnQ0g7QUFFSixpQ0F0R0c7O0FBd0dKZCw2Q0FBYSx1QkFBVzs7QUFFcEI5TCxrREFBRSxpQkFBRixFQUFxQm9ELEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7O0FBRXhDLG9FQUFJeUosUUFBUTdNLEVBQUUsSUFBRixFQUVQc0UsTUFGTyxHQUlQckQsSUFKTyxDQUlGLE9BSkUsQ0FBWjs7QUFNQTRMLHNFQUFNOUssTUFBTjs7QUFFQTVCLHlFQUFTMk0sV0FBVCxDQUFxQixNQUFyQjtBQUVILGlEQVpEOztBQWdCQTlNLGtEQUFFLGVBQUYsRUFBbUJvRCxFQUFuQixDQUFzQixPQUF0QixFQUErQixZQUFXOztBQUV0QyxvRUFBSXlKLFFBQVE3TSxFQUFFLElBQUYsRUFFUHNFLE1BRk8sR0FJUHJELElBSk8sQ0FJRixtQkFKRSxDQUFaOztBQU1BNEwsc0VBQU16RyxJQUFOOztBQUVBakcseUVBQVMyTSxXQUFULENBQXFCLE1BQXJCO0FBRUgsaURBWkQ7O0FBZ0JBOztBQUVBOU0sa0RBQUUsdUJBQUYsRUFBMkJvRCxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxZQUFXOztBQUU5Q3BELGtFQUFFLElBQUYsRUFBUStCLE1BQVI7QUFFSCxpREFKRDs7QUFRQTs7QUFFQS9CLGtEQUFFLDZCQUFGLEVBQWlDb0QsRUFBakMsQ0FBb0MsT0FBcEMsRUFBNkMsWUFBVzs7QUFFcERwRCxrRUFBRSxJQUFGLEVBQVFtRixHQUFSLENBQVksU0FBWixFQUF1QixNQUF2Qjs7QUFFQW5GLGtFQUFFLElBQUYsRUFFSytNLElBRkwsR0FJSzVILEdBSkwsQ0FJUyxTQUpULEVBSW9CLE9BSnBCOztBQU1BbkYsa0VBQUUsSUFBRixFQUVLc0UsTUFGTCxHQUlLckQsSUFKTCxDQUlVLHdCQUpWLEVBTUs0RSxJQU5MLENBTVUsTUFOVixFQU1rQixNQU5sQjtBQVFILGlEQWxCRDs7QUFzQkE7O0FBRUE3RixrREFBRSw2QkFBRixFQUFpQ29ELEVBQWpDLENBQW9DLE9BQXBDLEVBQTZDLFlBQVc7O0FBRXBEcEQsa0VBQUUsSUFBRixFQUFRbUYsR0FBUixDQUFZLFNBQVosRUFBdUIsTUFBdkI7O0FBRUFuRixrRUFBRSxJQUFGLEVBRUtnTixJQUZMLEdBSUs3SCxHQUpMLENBSVMsU0FKVCxFQUlvQixPQUpwQjs7QUFNQW5GLGtFQUFFLElBQUYsRUFFS3NFLE1BRkwsR0FJS3JELElBSkwsQ0FJVSxvQkFKVixFQU1LNEUsSUFOTCxDQU1VLE1BTlYsRUFNa0IsVUFObEI7QUFRSCxpREFsQkQ7O0FBc0JBOztBQUVBLG9EQUFJN0YsRUFBRSxnQkFBRixFQUFvQnVELE1BQXhCLEVBQWdDOztBQUU1QixvRUFBSTBKLFlBQVlqTixFQUFFLGdCQUFGLENBQWhCOztBQUVBLG9FQUFJa04saUJBQWlCRCxVQUFVaE0sSUFBVixDQUFlLG9CQUFmLENBQXJCOztBQUVBLG9FQUFJa00sZUFBZUYsVUFBVWhNLElBQVYsQ0FBZSxrQkFBZixDQUFuQjs7QUFJQWtNLDZFQUFhL0osRUFBYixDQUFnQixPQUFoQixFQUF5QixZQUFXOztBQUVoQyxvRkFBSThKLGlCQUFpQmxOLEVBQUUsSUFBRixFQUVoQjhFLE9BRmdCLENBRVIsZ0JBRlEsRUFJaEI3RCxJQUpnQixDQUlYLG9CQUpXLENBQXJCOztBQU1BLG9GQUFJbU0sZ0JBQWdCcE4sRUFBRSxJQUFGLEVBRWY4RSxPQUZlLENBRVAsZ0JBRk8sRUFJZjdELElBSmUsQ0FJVixtQkFKVSxDQUFwQjs7QUFRQWpCLGtGQUFFLElBQUYsRUFBUWdHLElBQVI7O0FBRUFvSCw4RkFBY3BILElBQWQ7O0FBRUFrSCwrRkFBZXBILElBQWYsR0FBc0IvRCxNQUF0QjtBQUVILGlFQXRCRDs7QUEwQkFtTCwrRUFFS0csSUFGTCxDQUVVLFlBQVc7O0FBRWIsb0ZBQUlELGdCQUFnQnBOLEVBQUUsSUFBRixFQUVmOEUsT0FGZSxDQUVQLGdCQUZPLEVBSWY3RCxJQUplLENBSVYsbUJBSlUsQ0FBcEI7O0FBUUEsb0ZBQUlqQixFQUFFc04sSUFBRixDQUFPLEtBQUtDLEtBQVosS0FBc0IsRUFBMUIsRUFBOEI7O0FBRTFCLHFHQUFLQSxLQUFMLEdBQWEsS0FBS0MsWUFBTCxHQUVQLEtBQUtBLFlBRkUsR0FJUCxFQUpOO0FBTUgsaUZBUkQsTUFRTzs7QUFFSEosOEdBQWM5RSxJQUFkLENBQW1CLEtBQUtpRixLQUF4QjtBQUVIOztBQUlEdk4sa0ZBQUUsSUFBRixFQUFRZ0csSUFBUjs7QUFFQW1ILDZGQUFhNUksVUFBYixDQUF3QixPQUF4Qjs7QUFFQTZJLDhGQUFjdEgsSUFBZDtBQUVILGlFQWxDTCxFQW9DSzJILFFBcENMLENBb0NjLFVBQVMxRixLQUFULEVBQWdCOztBQUV0QixvRkFBSXFGLGdCQUFnQnBOLEVBQUUsSUFBRixFQUVmOEUsT0FGZSxDQUVQLGdCQUZPLEVBSWY3RCxJQUplLENBSVYsbUJBSlUsQ0FBcEI7O0FBUUEsb0ZBQUk4RyxNQUFNMkYsT0FBTixJQUFpQixJQUFyQixFQUEyQjs7QUFFdkIsb0dBQUkxTixFQUFFc04sSUFBRixDQUFPLEtBQUtDLEtBQVosS0FBc0IsRUFBMUIsRUFBOEI7O0FBRTFCLHFIQUFLQSxLQUFMLEdBQWEsS0FBS0MsWUFBTCxHQUVQLEtBQUtBLFlBRkUsR0FJUCxFQUpOO0FBTUgsaUdBUkQsTUFRTzs7QUFFSEosOEhBQWM5RSxJQUFkLENBQW1CLEtBQUtpRixLQUF4QjtBQUVIOztBQUlEdk4sa0dBQUUsSUFBRixFQUFRZ0csSUFBUjs7QUFFQW1ILDZHQUFhNUksVUFBYixDQUF3QixPQUF4Qjs7QUFFQTZJLDhHQUFjdEgsSUFBZDtBQUVIO0FBRUosaUVBeEVMO0FBMEVIOztBQUlELG9EQUFJOUYsRUFBRSxjQUFGLEVBQWtCdUQsTUFBdEIsRUFBOEI7O0FBRTFCdkQsa0VBQUUsY0FBRixFQUVLb0QsRUFGTCxDQUVRLE9BRlIsRUFFaUIsWUFBVzs7QUFFcEIsb0ZBQUl5QixVQUFVN0UsRUFBRSxJQUFGLEVBQVFzRSxNQUFSLENBQWUscUJBQWYsQ0FBZDs7QUFJQU8sd0ZBQVFULFFBQVIsQ0FBaUIsVUFBakI7QUFFSCxpRUFWTCxFQVlLaEIsRUFaTCxDQVlRLE1BWlIsRUFZZ0IsWUFBVzs7QUFFbkIsb0ZBQUl5QixVQUFVN0UsRUFBRSxJQUFGLEVBQVFzRSxNQUFSLENBQWUscUJBQWYsQ0FBZDs7QUFJQSxvRkFBSXRFLEVBQUUsSUFBRixFQUFRNEYsR0FBUixPQUFrQixFQUF0QixFQUEwQjs7QUFFdEJmLHdHQUFRWCxXQUFSLENBQW9CLFVBQXBCO0FBRUg7QUFFSixpRUF4Qkw7QUEwQkg7O0FBSURoRSwwREFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGtCQUF0QixFQUEwQyxZQUFXOztBQUVqRCxvRUFBSXBELEVBQUUsSUFBRixFQUFRcUUsUUFBUixDQUFpQixVQUFqQixDQUFKLEVBQWtDOztBQUU5QjtBQUVIOztBQUVEckUsa0VBQUUsSUFBRixFQUVLc0UsTUFGTCxHQUlLSixXQUpMLENBSWlCLDZCQUpqQixFQU1LeUosR0FOTCxHQVFLM0gsSUFSTDtBQVVILGlEQWxCRDtBQW9CSCxpQ0E1V0c7O0FBZ1hKZ0csOENBQWMsd0JBQVc7O0FBRXJCLG9EQUFJNEIsVUFBVTVOLEVBQUUsbUJBQUYsQ0FBZDs7QUFJQTROLHdEQUFRakosSUFBUixDQUFhLFlBQVc7O0FBRXBCLG9FQUFJa0osZUFBZTdOLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHVCQUFiLENBQW5COztBQUVBLG9FQUFJNk0sY0FBYzlOLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHdCQUFiLENBQWxCOztBQUVBLG9FQUFJNEosWUFBWTdLLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLDBCQUFiLENBQWhCOztBQUlBNE0sNkVBQWF6SyxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFlBQVc7O0FBRWhDcEQsa0ZBQUUsSUFBRixFQUVLOEUsT0FGTCxDQUVhLG1CQUZiLEVBSUtWLFFBSkwsQ0FJYyxXQUpkOztBQU1BcEUsa0ZBQUUsWUFBRixFQUFnQnVLLE9BQWhCLENBQXdCOztBQUVwQk4sMkdBQVc7O0FBRlMsaUZBQXhCO0FBTUgsaUVBZEQ7O0FBa0JBWSwwRUFBVXpILEVBQVYsQ0FBYSw0QkFBYixFQUEyQyxVQUFTQyxDQUFULEVBQVk7O0FBRW5EQSxrRkFBRUMsY0FBRjs7QUFFQXRELGtGQUFFLElBQUYsRUFFSzhFLE9BRkwsQ0FFYSxtQkFGYixFQUlLWixXQUpMLENBSWlCLFdBSmpCOztBQU1BMkosNkZBQWFSLElBQWI7QUFFSCxpRUFaRDs7QUFnQkFyTixrRUFBRUcsUUFBRixFQUFZaUQsRUFBWixDQUVJLDRCQUZKLEVBSUksd0JBSkosRUFNSSxZQUFXOztBQUVQMEssNEZBQVk1SixXQUFaLENBQXdCLGFBQXhCOztBQUVBbEUsa0ZBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixhQUFqQjtBQUVILGlFQVpMO0FBZ0JILGlEQTVERDtBQThESDs7QUFwYkcsaUJBeGlEQzs7QUFnK0RUckMsd0JBQVE7O0FBRUo7O0FBRUFaLHNDQUFNLGdCQUFXOztBQUVibkIsa0RBQUUsWUFBRixFQUFnQitOLE9BQWhCOztBQUlBL04sa0RBQUUsc0JBQUYsRUFBMEIrTixPQUExQixDQUFrQzs7QUFFOUJDLHNFQUFNOztBQUZ3QixpREFBbEM7O0FBUUFoTyxrREFBRSw2QkFBRixFQUFpQytOLE9BQWpDLENBQXlDOztBQUVyQ0UsZ0ZBQWdCQzs7QUFGcUIsaURBQXpDOztBQVFBbE8sa0RBQUUsc0JBQUYsRUFBMEIrTixPQUExQixDQUFrQzs7QUFFOUJJLG1GQUFtQkMsWUFGVzs7QUFJOUJILGdGQUFnQkc7O0FBSmMsaURBQWxDOztBQVVBcE8sa0RBQUUsc0JBQUYsRUFBMEIrTixPQUExQixDQUFrQzs7QUFFOUJNLHlGQUF5QixDQUFDOztBQUZJLGlEQUFsQzs7QUFRQXJPLGtEQUFFLGlCQUFGLEVBQXFCK04sT0FBckIsQ0FBNkI7O0FBRXpCTSx5RkFBeUIsQ0FBQyxDQUZEOztBQUl6QkMsNEVBQVk7O0FBSmEsaURBQTdCOztBQVVBOztBQUVBLHlEQUFTSixVQUFULENBQW9CSyxHQUFwQixFQUF5Qjs7QUFFckIsb0VBQUksQ0FBQ0EsSUFBSUMsRUFBVCxFQUFhOztBQUVULHVGQUFPRCxJQUFJbkksSUFBWDtBQUVIOztBQUVELG9FQUFJcUksV0FBV3pPLEVBQUV1TyxJQUFJRyxPQUFOLEVBQWUxSixJQUFmLENBQW9CLE9BQXBCLENBQWY7O0FBRUEsb0VBQUksQ0FBQ3lKLFFBQUwsRUFBZTs7QUFFWCx1RkFBT0YsSUFBSW5JLElBQVg7QUFFSCxpRUFKRCxNQUlPOztBQUVILG9GQUFJdUksT0FBTzNPLEVBRVAseUNBRUl5TyxRQUZKLEdBSUksSUFKSixHQU1Jek8sRUFBRXVPLElBQUlHLE9BQU4sRUFBZXRJLElBQWYsRUFOSixHQVFJLFNBVkcsQ0FBWDs7QUFjQSx1RkFBT3VJLElBQVA7QUFFSDtBQUVKOztBQUlEOztBQUVBLHlEQUFTUCxZQUFULENBQXNCRyxHQUF0QixFQUEyQjs7QUFFdkIsb0VBQUlLLGVBQWU1TyxFQUFFdU8sSUFBSUcsT0FBTixFQUFlMUosSUFBZixDQUFvQixNQUFwQixDQUFuQjs7QUFFQSxvRUFBSTZKLGdCQUFnQjdPLEVBQUV1TyxJQUFJRyxPQUFOLEVBQWUxSixJQUFmLENBQW9CLE9BQXBCLENBQXBCOztBQUlBLHVFQUFPaEYsRUFFSCx1Q0FFSSxRQUZKLEdBSUl1TyxJQUFJbkksSUFKUixHQU1JLFNBTkosR0FRSSxRQVJKLEdBVUl3SSxZQVZKLEdBWUksU0FaSixHQWNJLFFBZEosR0FnQklDLGFBaEJKLEdBa0JJLFNBbEJKLEdBb0JJLFFBdEJELENBQVA7QUEwQkg7O0FBRUQzTywwREFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHdCQUF0QixFQUFnRCxVQUFTQyxDQUFULEVBQVk7O0FBRXhEQSxrRUFBRW1GLGVBQUY7QUFFSCxpREFKRDs7QUFRQSxvREFBSXNHLGdCQUFnQjlPLEVBQUUsbUJBQUYsQ0FBcEI7O0FBRUEsb0RBQUk4TyxjQUFjdkwsTUFBbEIsRUFBMEI7O0FBRXRCLG9FQUFJdUwsYUFBSixFQUFtQjs7QUFFZixvRkFBSTlPLEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7O0FBRTFCZ00sOEdBQWNmLE9BQWQsQ0FBc0I7O0FBRWxCTSx5SUFBeUIsQ0FBQzs7QUFGUixpR0FBdEI7QUFNSCxpRkFSRCxNQVFPOztBQUVIUyw4R0FBY25LLElBQWQsQ0FBbUIsWUFBVzs7QUFFMUIsb0hBQUlvSyxjQUFjL08sRUFBRSxJQUFGLEVBQVFnRixJQUFSLENBQWEsYUFBYixDQUFsQjs7QUFFQSxvSEFBSWdLLGVBQWVoUCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FFZixvQkFGZSxDQUFuQjs7QUFRQSxvSEFBSStOLGFBQWE1SSxJQUFiLE1BQXVCLEVBQTNCLEVBQStCOztBQUUzQjRJLDZJQUVLcEosR0FGTCxDQUVTbUosV0FGVCxFQUlLM0ksSUFKTCxDQUlVMkksV0FKVixFQU1LbEosSUFOTCxDQU1VLFVBTlYsRUFNc0IsVUFOdEIsRUFRS0EsSUFSTCxDQVFVLFVBUlYsRUFRc0IsVUFSdEIsRUFVS3RCLFVBVkwsQ0FVZ0Isa0JBVmhCO0FBWUg7O0FBSUR2RSxrSEFBRSxJQUFGLEVBQVFpUCxJQUFSLENBQWEsMkJBQWI7QUFFSCxpR0FoQ0Q7QUFrQ0g7QUFFSjtBQUVKOztBQUlELHFEQUFLQyxXQUFMOztBQUVBLHFEQUFLQyxVQUFMOztBQUVBLHFEQUFLQyxRQUFMOztBQUVBLHFEQUFLQyxRQUFMOztBQUVBLHFEQUFLQyxXQUFMOztBQUVBLHFEQUFLQyxTQUFMOztBQUVBLHFEQUFLdkQsWUFBTDtBQUVILGlDQXBORzs7QUFzTkptRCw0Q0FBWSxzQkFBVzs7QUFFbkIsb0RBQUlLLGNBQWN0UCxVQUFVZSxJQUFWLENBQWUsa0JBQWYsQ0FBbEI7O0FBSUF1Tyw0REFBWTdLLElBQVosQ0FBaUIsWUFBVzs7QUFFeEIsb0VBQUlFLFVBQVU3RSxFQUFFLElBQUYsRUFBUThFLE9BQVIsQ0FBZ0IsbUJBQWhCLENBQWQ7O0FBSUE5RSxrRUFBRSxJQUFGLEVBQVErTixPQUFSLENBQWdCOztBQUVaSSxtR0FBbUJzQixPQUZQOztBQUlaeEIsZ0dBQWdCd0IsT0FKSjs7QUFNWkMsZ0dBQWdCN0ssT0FOSjs7QUFRWndKLHlHQUF5QixDQUFDOztBQVJkLGlFQUFoQjtBQVlILGlEQWxCRDs7QUFzQkE7O0FBRUEseURBQVNvQixPQUFULENBQWlCRSxJQUFqQixFQUF1Qjs7QUFFbkIsb0VBQUlDLGlCQUFpQkQsS0FBS2pCLE9BQTFCOztBQUVBLHVFQUFPMU8sRUFFSCxrQ0FFSSxHQUZKLEdBSUlBLEVBQUU0UCxjQUFGLEVBQWtCNUssSUFBbEIsQ0FBdUIsTUFBdkIsQ0FKSixHQU1JLFNBTkosR0FRSTJLLEtBQUt2SixJQVJULEdBVUksU0FaRCxDQUFQO0FBZ0JIO0FBRUosaUNBMVFHOztBQTRRSjhJLDZDQUFhLHVCQUFXOztBQUVwQixvREFBSVcsZUFBZTNQLFVBQVVlLElBQVYsQ0FBZSxtQkFBZixDQUFuQjs7QUFJQTRPLDZEQUFhbEwsSUFBYixDQUFrQixZQUFXOztBQUV6QixvRUFBSUUsVUFBVTdFLEVBQUUsSUFBRixFQUFROEUsT0FBUixDQUFnQixlQUFoQixDQUFkOztBQUlBLG9FQUFJOUUsRUFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLGdCQUFqQixDQUFKLEVBQXdDOztBQUVwQ3JFLGtGQUFFLElBQUYsRUFBUStOLE9BQVIsQ0FBZ0I7O0FBRVpJLG1IQUFtQjJCLEtBRlA7O0FBSVo3QixnSEFBZ0I2QixLQUpKOztBQU1aSixnSEFBZ0I3Szs7QUFOSixpRkFBaEI7QUFVSCxpRUFaRCxNQVlPOztBQUVIN0Usa0ZBQUUsSUFBRixFQUFRK04sT0FBUixDQUFnQjs7QUFFWk0seUhBQXlCLENBQUMsQ0FGZDs7QUFJWkYsbUhBQW1CMkIsS0FKUDs7QUFNWjdCLGdIQUFnQjZCLEtBTko7O0FBUVpKLGdIQUFnQjdLOztBQVJKLGlGQUFoQjtBQVlIOztBQUlEOztBQUVBLHlFQUFTaUwsS0FBVCxDQUFlQyxLQUFmLEVBQXNCOztBQUVsQixvRkFBSUMsa0JBQWtCRCxNQUFNckIsT0FBNUI7O0FBRUEsb0ZBQUl1QixZQUFZalEsRUFBRWdRLGVBQUYsRUFBbUJoTCxJQUFuQixDQUF3QixPQUF4QixDQUFoQjs7QUFJQSxvRkFBSStLLE1BQU0zSixJQUFOLENBQVc3QyxNQUFmLEVBQXVCOztBQUVuQnNCLHdHQUFRWCxXQUFSLENBQW9CLHVCQUFwQjs7QUFJQSx1R0FBT2xFLGdHQUV5RmlRLFNBRnpGLHFCQUlDRixNQUFNM0osSUFKUCxpQkFBUDtBQVVILGlGQWhCRCxNQWdCTzs7QUFFSHZCLHdHQUFRVCxRQUFSLENBQWlCLHVCQUFqQjs7QUFJQSx1R0FBT3BFLGdHQUV5RmlRLFNBRnpGLHdCQUFQO0FBTUg7QUFFSjtBQUVKLGlEQTlFRDtBQWdGSCxpQ0FsV0c7O0FBb1dKYiwwQ0FBVSxvQkFBVzs7QUFFakJsUCwwREFBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGNBQXRCLEVBQXNDLFlBQVc7O0FBRTdDcEQsa0VBQUUsSUFBRixFQUFRZ0csSUFBUjs7QUFFQWhHLGtFQUFFLElBQUYsRUFFS2dOLElBRkwsR0FJS2xILElBSkw7QUFNSCxpREFWRDtBQVlILGlDQWxYRzs7QUFvWEp1SiwwQ0FBVSxvQkFBVzs7QUFFakIsb0RBQUlhLGNBQWNsUSxFQUFFLHdCQUFGLENBQWxCOztBQUlBa1EsNERBQVk5TSxFQUFaLENBQWUscUJBQWYsRUFBc0MsWUFBVzs7QUFFN0NwRCxrRUFBRSxJQUFGLEVBQVFvRCxFQUFSLENBQVcsaUJBQVgsRUFBOEIsVUFBU0MsQ0FBVCxFQUFZOztBQUV0Q0Esa0ZBQUVDLGNBQUY7QUFFSCxpRUFKRDtBQU1ILGlEQVJEOztBQVlBNE0sNERBQVk5TSxFQUFaLENBQWUsa0JBQWYsRUFBbUMsWUFBVztBQUFBOztBQUUxQ2EsMkVBQVcsWUFBTTs7QUFFYmpFLDBGQUFReUosR0FBUixDQUFZLGlCQUFaO0FBRUgsaUVBSkQsRUFJRyxHQUpIO0FBTUgsaURBUkQ7O0FBWUF5Ryw0REFBWTlNLEVBQVosQ0FBZSxRQUFmLEVBQXlCLFlBQVc7O0FBRWhDLG9FQUVJcEQsRUFBRSxJQUFGLEVBQVE0RixHQUFSLE1BQWlCLEVBQWpCLElBRUE1RixFQUFFLElBQUYsRUFBUTZGLElBQVIsQ0FBYSxXQUFiLE1BQThCLE1BSmxDLEVBTUU7O0FBRUU3RixrRkFBRSxjQUFGLEVBQWtCOEYsSUFBbEI7O0FBRUE5RixrRkFBRSxjQUFGLEVBRUtnTixJQUZMLEdBSUtoSCxJQUpMO0FBTUg7QUFFSixpREFwQkQ7QUFzQkgsaUNBeGFHOztBQTBhSnNKLDZDQUFhLHVCQUFXOztBQUVwQixvREFBSWEsY0FBY2pRLFVBQVVlLElBQVYsQ0FBZSxpQkFBZixDQUFsQjs7QUFJQWtQLDREQUFZL00sRUFBWixDQUFlLFFBQWYsRUFBeUIsWUFBVzs7QUFFaENwRCxrRUFBRSxJQUFGLEVBRUsrTSxJQUZMLEdBSUs5TCxJQUpMLENBSVUsMkJBSlYsRUFNS21GLElBTkwsQ0FNVSxFQU5WLEVBUUs2QixNQVJMLENBUVkscUNBUlo7QUFVSCxpREFaRDtBQWNILGlDQTliRzs7QUFnY0pzSCwyQ0FBVyxxQkFBVzs7QUFFbEI7O0FBRUEseURBQVNhLG1CQUFULENBQTZCN0IsR0FBN0IsRUFBa0M7O0FBRTlCLG9FQUFJOEIsU0FBU3JRLEVBQUV1TyxJQUFJRyxPQUFOLEVBQWU5SSxHQUFmLEVBQWI7O0FBSUEsdUVBQU81RixFQUVILHdDQUF3Q3FRLE1BQXhDLEdBQWlELFNBRjlDLENBQVA7QUFNSDs7QUFJRDs7QUFFQSx5REFBU0MsZ0JBQVQsQ0FBMEIvQixHQUExQixFQUErQjs7QUFFM0Isb0VBQUlnQyxVQUFVdlEsRUFBRXVPLElBQUlHLE9BQU4sRUFBZTFKLElBQWYsQ0FBb0IsU0FBcEIsQ0FBZDtBQUFBLG9FQUVJcUwsU0FBU3JRLEVBQUV1TyxJQUFJRyxPQUFOLEVBQWU5SSxHQUFmLEVBRmI7O0FBTUEsdUVBQU81RixFQUVILHVDQUVJLFFBRkosR0FJSXVRLE9BSkosR0FNSSxTQU5KLEdBUUksUUFSSixHQVVJRixNQVZKLEdBWUksU0FaSixHQWNJLFFBaEJELENBQVA7QUFvQkg7O0FBSUQsb0RBQUlHLGdCQUFnQnRRLFVBQVVlLElBQVYsQ0FBZSxzQkFBZixDQUFwQjs7QUFJQSxvREFBSXVQLGNBQWNqTixNQUFsQixFQUEwQjs7QUFFdEJpTiw4RUFBYzdMLElBQWQsQ0FBbUIsWUFBVzs7QUFFMUIsb0ZBQUlpSixVQUFVNU4sRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsZUFBYixDQUFkOztBQUVBLG9GQUFJNEQsVUFBVTdFLEVBQUUsSUFBRixFQUFRc0UsTUFBUixFQUFkOztBQUVBLG9GQUFJbU0sU0FBU3pRLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLGtCQUFiLENBQWI7O0FBSUEsb0ZBQUlsQixRQUFRK0MsS0FBUixNQUFtQixHQUF2QixFQUE0Qjs7QUFFeEI4Syx3R0FFS0csT0FGTCxDQUVhOztBQUVMRSxnSUFBZ0JxQyxnQkFGWDs7QUFJTG5DLG1JQUFtQmlDLG1CQUpkOztBQU1MVixnSUFBZ0IxUCxFQUFFLElBQUY7O0FBTlgsaUdBRmIsRUFZS29ELEVBWkwsQ0FZUSxnQkFaUixFQVkwQixZQUFXOztBQUU3QnBELGtIQUFFLElBQUYsRUFFS3NFLE1BRkwsR0FJS0EsTUFKTCxHQU1LckQsSUFOTCxDQU1VLE9BTlYsRUFRS3lQLEtBUkw7QUFVSCxpR0F4Qkw7QUEwQkgsaUZBNUJELE1BNEJPOztBQUVIN0wsd0dBRUtULFFBRkwsQ0FFYyxXQUZkLEVBSUs2RCxNQUpMLENBTVEsNENBTlI7O0FBWUEsb0dBQUkwSSxlQUFlOUwsUUFBUTVELElBQVIsQ0FBYSxRQUFiLENBQW5COztBQUVBLG9HQUFJMlAsY0FBYy9MLFFBQVE1RCxJQUFSLENBRWQseUJBRmMsQ0FBbEI7O0FBUUEyUCw0R0FBWXhLLElBQVosQ0FBaUJ1SyxhQUFhRSxFQUFiLENBQWdCLENBQWhCLEVBQW1CakwsR0FBbkIsRUFBakI7O0FBSUFnSSx3R0FBUWtELE1BQVIsQ0FBZSxZQUFXOztBQUV0QixvSEFBSUMsVUFBVS9RLEVBQUUsSUFBRixFQUFRLENBQVIsRUFBV2dSLGFBQXpCOztBQUVBSiw0SEFBWXhLLElBQVosQ0FBaUJ1SyxhQUFhRSxFQUFiLENBQWdCRSxPQUFoQixFQUF5Qm5MLEdBQXpCLEVBQWpCOztBQUlBNUYsa0hBQUUsSUFBRixFQUVLc0UsTUFGTCxHQUlLQSxNQUpMLEdBTUtyRCxJQU5MLENBTVUsT0FOVixFQVFLeVAsS0FSTDtBQVVILGlHQWxCRDtBQW9CSDs7QUFJREQsdUZBQU94RSxTQUFQLENBQWlCOztBQUViQyxzR0FBTTs7QUFGTyxpRkFBakI7O0FBUUF1RSx1RkFBT3JOLEVBQVAsQ0FBVSxPQUFWLEVBQW1CNk4sUUFBbkIsRUFBNkI3TixFQUE3QixDQUFnQyxNQUFoQyxFQUF3QzhOLFdBQXhDOztBQUVBdEQsd0ZBRUt4SyxFQUZMLENBRVEsY0FGUixFQUV3QjZOLFFBRnhCLEVBSUs3TixFQUpMLENBSVEsZUFKUixFQUl5QjhOLFdBSnpCOztBQVFBLHlGQUFTRCxRQUFULEdBQW9COztBQUVoQmpSLGtHQUFFLElBQUYsRUFFSzhFLE9BRkwsQ0FFYSxzQkFGYixFQUlLVixRQUpMLENBSWMsVUFKZDtBQU1IOztBQUlELHlGQUFTOE0sV0FBVCxHQUF1Qjs7QUFFbkIsb0dBQUlsUixFQUFFLElBQUYsRUFBUTRGLEdBQVIsTUFBaUIsRUFBckIsRUFBeUI7O0FBRXJCNUYsa0hBQUUsSUFBRixFQUVLOEUsT0FGTCxDQUVhLHNCQUZiLEVBSUtaLFdBSkwsQ0FJaUIsVUFKakI7QUFNSDtBQUVKO0FBRUosaUVBdElEO0FBd0lIO0FBRUosaUNBdG9CRzs7QUF3b0JKOEgsOENBQWMsd0JBQVc7O0FBRXJCLG9EQUFJNEIsVUFBVTVOLEVBQUUsaUJBQUYsQ0FBZDs7QUFJQTROLHdEQUFRakosSUFBUixDQUFhLFlBQVc7O0FBRXBCLG9FQUFJa0osZUFBZTdOLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHFCQUFiLENBQW5COztBQUVBLG9FQUFJNk0sY0FBYzlOLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHNCQUFiLENBQWxCOztBQUVBLG9FQUFJNEosWUFBWTdLLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHdCQUFiLENBQWhCOztBQUlBNE0sNkVBQWF6SyxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFlBQVc7O0FBRWhDcEQsa0ZBQUUsSUFBRixFQUVLOEUsT0FGTCxDQUVhLGlCQUZiLEVBSUtWLFFBSkwsQ0FJYyxXQUpkOztBQU1BcEUsa0ZBQUUsWUFBRixFQUFnQnVLLE9BQWhCLENBQXdCOztBQUVwQk4sMkdBQVc7O0FBRlMsaUZBQXhCO0FBTUgsaUVBZEQ7O0FBa0JBWSwwRUFBVXpILEVBQVYsQ0FBYSw0QkFBYixFQUEyQyxVQUFTQyxDQUFULEVBQVk7O0FBRW5EQSxrRkFBRUMsY0FBRjs7QUFFQXRELGtGQUFFLElBQUYsRUFFSzhFLE9BRkwsQ0FFYSxpQkFGYixFQUlLWixXQUpMLENBSWlCLFdBSmpCOztBQU1BMkosNkZBQWFSLElBQWI7QUFFSCxpRUFaRDs7QUFnQkFyTixrRUFBRUcsUUFBRixFQUFZaUQsRUFBWixDQUVJLDRCQUZKLEVBSUksc0JBSkosRUFNSSxZQUFXOztBQUVQMEssNEZBQVk1SixXQUFaLENBQXdCLGFBQXhCOztBQUVBbEUsa0ZBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixhQUFqQjtBQUVILGlFQVpMO0FBZ0JILGlEQTVERDtBQThESDs7QUE1c0JHLGlCQWgrREM7O0FBZ3JGVHBCLHNCQUFNOztBQUVGOztBQUVBQyw4Q0FBYyx3QkFBVzs7QUFFckJyQywyREFBV3dDLEVBQVgsQ0FBYyw0QkFBZCxFQUE0QyxVQUFTQyxDQUFULEVBQVk7O0FBRXBELG9FQUFJckQsRUFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLElBQWpCLENBQUosRUFBNEI7O0FBRXhCbkQscUZBQUs4QixJQUFMLENBQVVtTyxZQUFWO0FBRUgsaUVBSkQsTUFJTzs7QUFFSGpRLHFGQUFLOEIsSUFBTCxDQUFVb08sU0FBVjtBQUVIOztBQUVEL04sa0VBQUVtRixlQUFGOztBQUVBbkYsa0VBQUVDLGNBQUY7QUFFSCxpREFoQkQ7O0FBb0JBdEQsa0RBQUUsdUJBQUYsRUFBMkJvRCxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxZQUFXOztBQUU5Q2xDLHFFQUFLOEIsSUFBTCxDQUFVbU8sWUFBVjtBQUVILGlEQUpEO0FBTUgsaUNBaENDOztBQWtDRjs7QUFFQWpPLDZDQUFhLHVCQUFXOztBQUVwQmhELDBEQUVLa0QsRUFGTCxDQUVRLDRCQUZSLEVBRXNDLFVBQVNDLENBQVQsRUFBWTs7QUFFMUMsb0VBRUlyRCxFQUFFcUQsRUFBRXFJLE1BQUosRUFBWTVHLE9BQVosQ0FFSSx3SEFGSixFQUlFdkIsTUFOTixFQVFFOztBQUVFO0FBRUg7O0FBRURyQyxxRUFBSzhCLElBQUwsQ0FBVW1PLFlBQVY7O0FBRUE5TixrRUFBRW1GLGVBQUY7QUFFSCxpREF0QkwsRUF3QktwRixFQXhCTCxDQTBCUSw0QkExQlIsRUE0QlEsVUE1QlIsRUE4QlFsQyxLQUFLOEIsSUFBTCxDQUFVbU8sWUE5QmxCO0FBa0NILGlDQXhFQzs7QUEwRUY7O0FBRUFoTyxvREFBb0IsOEJBQVc7O0FBRTNCLG9EQUFJa08sWUFBWXJSLEVBQUUsdUJBQUYsQ0FBaEI7O0FBRUFxUiwwREFBVWpPLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFlBQVc7O0FBRTdCLG9FQUFJOUMsU0FBUytELFFBQVQsQ0FBa0IscUJBQWxCLENBQUosRUFBOEM7O0FBRTFDL0QseUZBQVM0RCxXQUFULENBQXFCLHFCQUFyQjs7QUFFQTdELHNGQUFNa0UsVUFBTixDQUFpQixPQUFqQjs7QUFFQSx1RkFBTyxLQUFQO0FBRUgsaUVBUkQsTUFRTzs7QUFFSGpFLHlGQUFTOEQsUUFBVCxDQUFrQixxQkFBbEI7O0FBRUEvRCxzRkFBTThFLEdBQU4sQ0FBVSxVQUFWLEVBQXNCLFFBQXRCOztBQUVBLHVGQUFPLEtBQVA7QUFFSDtBQUVKLGlEQXBCRDtBQXNCSCxpQ0F0R0M7O0FBd0dGaU0sMkNBQVcscUJBQVc7O0FBRWxCcFIsa0RBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixJQUFqQjs7QUFFQTlELHlEQUFTOEQsUUFBVCxDQUFrQixrQkFBbEI7O0FBRUE3RCx5REFBUzRFLEdBQVQsQ0FBYSxTQUFiLEVBQXdCLE9BQXhCOztBQUVBOUUsc0RBQU04RSxHQUFOLENBQVUsVUFBVixFQUFzQixRQUF0QjtBQUVILGlDQWxIQzs7QUFvSEZnTSw4Q0FBYyx3QkFBVzs7QUFFckJuUixrREFBRSxJQUFGLEVBQVFrRSxXQUFSLENBQW9CLElBQXBCOztBQUVBNUQseURBQVM0RCxXQUFULENBQXFCLGtCQUFyQjs7QUFFQTdELHNEQUFNa0UsVUFBTixDQUFpQixPQUFqQjs7QUFJQU4sMkRBQVcsWUFBVzs7QUFFbEIxRCx5RUFBU2dFLFVBQVQsQ0FBb0IsT0FBcEI7QUFFSCxpREFKRCxFQUlHLEdBSkg7QUFNSDs7QUFwSUMsaUJBaHJGRzs7QUF3ekZUOUIsdUJBQU87O0FBRUg7O0FBRUFDLCtDQUFlLHlCQUFXOztBQUV0QixvREFBSTFDLEVBQUUsaUJBQUYsRUFBcUJ1RCxNQUF6QixFQUFpQzs7QUFFN0J2RCxrRUFBRSxpQkFBRixFQUFxQnNSLFFBQXJCLENBQThCOztBQUUxQkMsMkZBQVcsaUJBRmU7O0FBSTFCQyxtR0FBbUIsSUFKTzs7QUFNMUJDLDJGQUFXLEtBTmU7O0FBUTFCQyx1RkFBTzs7QUFFSEMseUdBQVM7O0FBRk4saUZBUm1COztBQWMxQkMseUZBQVM7O0FBRUxDLHlHQUFTOztBQUVMQyx3SEFBUTs7QUFGSDs7QUFGSjs7QUFkaUIsaUVBQTlCO0FBMEJIOztBQUlELG9EQUFJOVIsRUFBRSwwQkFBRixFQUE4QnVELE1BQWxDLEVBQTBDOztBQUV0Q3ZELGtFQUFFLHlCQUFGLEVBQTZCc1IsUUFBN0IsQ0FBc0M7O0FBRWxDQywyRkFBVywyQkFGdUI7O0FBSWxDUSx5RkFBUyxJQUp5Qjs7QUFNbENDLHdGQUFROztBQUVKQyw4R0FBYyxPQUZWOztBQUlKQyw0R0FBWTs7QUFKUjs7QUFOMEIsaUVBQXRDO0FBZ0JIOztBQUlELG9EQUFJbFMsRUFBRSwwQkFBRixFQUE4QnVELE1BQWxDLEVBQTBDOztBQUV0Q3ZELGtFQUFFLDBCQUFGLEVBQThCc1IsUUFBOUIsQ0FBdUM7O0FBRW5DQywyRkFBVyxpQkFGd0I7O0FBSW5DWSx1RkFBTyxLQUo0Qjs7QUFNbkNKLHlGQUFTLEtBTjBCOztBQVFuQ0ssMEZBQVUsSUFSeUI7O0FBVW5DWixtR0FBbUIsSUFWZ0I7O0FBWW5DQywyRkFBVyxLQVp3Qjs7QUFjbkNHLHlGQUFTOztBQUVMQyx5R0FBUzs7QUFFTEMsd0hBQVE7O0FBRkg7O0FBRko7O0FBZDBCLGlFQUF2QztBQTBCSDs7QUFJRCxvREFBSTlSLEVBQUUsMEJBQUYsRUFBOEJ1RCxNQUFsQyxFQUEwQzs7QUFFdEN2RCxrRUFBRSwwQkFBRixFQUE4QnNSLFFBQTlCLENBQXVDOztBQUVuQ0MsMkZBQVcsaUJBRndCOztBQUluQ1ksdUZBQU8sS0FKNEI7O0FBTW5DWCxtR0FBbUIsS0FOZ0I7O0FBUW5DOztBQUVBQywyRkFBVyxLQVZ3Qjs7QUFZbkM7O0FBRUFHLHlGQUFTOztBQUVMQyx5R0FBUzs7QUFFTEMsd0hBQVE7O0FBRkg7O0FBRko7O0FBZDBCLGlFQUF2QztBQTBCSDtBQUVKLGlDQTFIRTs7QUE0SEg7O0FBRUFuUCx1Q0FBTyxpQkFBVzs7QUFFZDNDLGtEQUFFLFdBQUYsRUFBZW9ELEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsWUFBVzs7QUFFbEMsb0VBQUlpUCxRQUFRclMsRUFBRSxJQUFGLEVBQVFnRixJQUFSLENBQWEsT0FBYixDQUFaOztBQUVBLG9FQUFJc04sT0FBT3RTLEVBQUUsWUFBRixFQUFnQmlCLElBQWhCLENBQXFCLE9BQXJCLENBQVg7O0FBRUEsb0VBQUlvUixVQUFVLFFBQWQsRUFBd0I7O0FBRXBCQyxxRkFBS2xPLFFBQUwsQ0FBYyxXQUFkO0FBRUgsaUVBSkQsTUFJTyxJQUFJaU8sVUFBVSxRQUFkLEVBQXdCOztBQUUzQkMscUZBQUtsTyxRQUFMLENBQWMsV0FBZDtBQUVILGlFQUpNLE1BSUE7O0FBRUhrTyxxRkFBS2xPLFFBQUwsQ0FBYyxXQUFkO0FBRUg7QUFFSixpREFwQkQ7QUFzQkgsaUNBdEpFOztBQXdKSDs7QUFFQXhCLGlEQUFpQiwyQkFBVzs7QUFFeEIxQywwREFBVWtELEVBQVYsQ0FFSSw0QkFGSixFQUlJLGdCQUpKLEVBTUksWUFBVzs7QUFFUCxvRUFBSWdELE9BQU9wRyxFQUFFLElBQUYsRUFBUWdGLElBQVIsQ0FBYSxPQUFiLENBQVg7O0FBSUFoRixrRUFBRSxnQkFBRixFQUFvQmtFLFdBQXBCLENBQWdDLFdBQWhDOztBQUVBbEUsa0VBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixXQUFqQjs7QUFFQXBFLGtFQUFFLElBQUYsRUFFSzhFLE9BRkwsQ0FFYSxPQUZiLEVBSUs3RCxJQUpMLENBSVUsWUFKVixFQU1LbUYsSUFOTCxDQU1VQSxJQU5WO0FBUUgsaURBeEJMO0FBNEJILGlDQXhMRTs7QUEwTEh2RCx3Q0FBUSxrQkFBVzs7QUFFZjNDLDBEQUFVa0QsRUFBVixDQUFhLGVBQWIsRUFBOEIsUUFBOUIsRUFBd0MsVUFBU0MsQ0FBVCxFQUFZOztBQUVoRG5DLHFFQUFLYSxNQUFMLENBQVltTixXQUFaO0FBRUgsaURBSkQ7QUFNSDs7QUFsTUU7O0FBeHpGRSxDQUFiOztBQWtnR0E7Ozs7O0FBS0EsSUFBTXFELE1BQU07QUFDUnBSLHNCQUFNLGdCQUFXO0FBQ2IscUNBQUtxUixVQUFMOztBQUVBLHFDQUFLeFAsSUFBTCxDQUFVeVAsWUFBVjtBQUNBLHFDQUFLelAsSUFBTCxDQUFVMFAsZ0JBQVY7QUFDQSxxQ0FBSzFQLElBQUwsQ0FBVTJQLFlBQVY7O0FBRUEscUNBQUtDLE9BQUwsQ0FBYUMsT0FBYjtBQUNBLHFDQUFLRCxPQUFMLENBQWFFLGlCQUFiOztBQUVBLHFDQUFLQyxXQUFMLENBQWlCQyxZQUFqQjtBQUNBLHFDQUFLRCxXQUFMLENBQWlCRSxnQkFBakI7QUFDQSxxQ0FBS0YsV0FBTCxDQUFpQkcseUJBQWpCOztBQUVBLHFDQUFLQyxPQUFMLENBQWFoUyxJQUFiO0FBQ0EscUNBQUtpUyxRQUFMLENBQWNqUyxJQUFkOztBQUVBb1Isb0NBQUljLFVBQUosQ0FBZWxTLElBQWY7QUFDQW9SLG9DQUFJZSxPQUFKLENBQVluUyxJQUFaO0FBQ0FvUixvQ0FBSWdCLEtBQUosQ0FBVXBTLElBQVY7QUFDQW9SLG9DQUFJaUIsTUFBSixDQUFXclMsSUFBWDtBQUNBb1Isb0NBQUlrQixRQUFKLENBQWF0UyxJQUFiOztBQUVBLG9DQUFJcEIsUUFBUStDLEtBQVIsS0FBa0IsR0FBdEIsRUFBMkI7QUFDdkIsb0RBQUk0USxHQUFKLEdBQVV2UyxJQUFWO0FBQ0g7O0FBRUQscUNBQUt3UyxTQUFMO0FBQ0E1VCx3Q0FBUWlFLE1BQVIsQ0FBZSxZQUFXO0FBQ3RCdU8sb0RBQUlvQixTQUFKO0FBQ0gsaUNBRkQ7QUFHSCxpQkFoQ087QUFpQ1JuQiw0QkFBWSxzQkFBVztBQUNuQnRTLDBDQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IscUJBQXRCLEVBQTZDLFVBQVNDLENBQVQsRUFBWTtBQUNyRHJELGtEQUFFLElBQUYsRUFDS3NFLE1BREwsR0FFS3JELElBRkwsQ0FFVSxpQkFGVixFQUdLMlMsV0FITCxDQUdpQjtBQUNUQyx1RUFBTyxpQkFBVztBQUNkN1Qsa0ZBQUUsSUFBRixFQUFRbUYsR0FBUixDQUFZO0FBQ1IyTyx5R0FBUztBQURELGlGQUFaO0FBR0g7QUFMUSxpREFIakI7QUFVSCxpQ0FYRDtBQVlILGlCQTlDTztBQStDUkgsMkJBQVcscUJBQVc7QUFDbEIsb0NBQUk1VCxRQUFRK0MsS0FBUixNQUFtQixHQUF2QixFQUE0QjtBQUN4QnRDLHdEQUFRNEQsUUFBUixDQUFpQixVQUFqQjtBQUNBMUQsc0RBQU0wRCxRQUFOLENBQWUsV0FBZjtBQUNBcEUsa0RBQUUsaUJBQUYsRUFBcUIwRSxPQUFyQjtBQUNILGlDQUpELE1BSU87QUFDSGxFLHdEQUFRMEQsV0FBUixDQUFvQixVQUFwQjtBQUNBeEQsc0RBQU13RCxXQUFOLENBQWtCLFdBQWxCO0FBQ0g7QUFDSixpQkF4RE87QUF5RFJsQixzQkFBTTtBQUNGO0FBQ0F5UCw4Q0FBYyx3QkFBVztBQUNyQjVSLDhEQUFjdUMsRUFBZCxDQUFpQixPQUFqQixFQUEwQixVQUFTQyxDQUFULEVBQVk7QUFDbEMsb0VBQUlyRCxFQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIsSUFBakIsQ0FBSixFQUE0QjtBQUN4QnJFLGtGQUFFLElBQUYsRUFBUWtFLFdBQVIsQ0FBb0IsSUFBcEI7QUFDQXhELHNGQUFNd0QsV0FBTixDQUFrQixTQUFsQjtBQUNBMUQsd0ZBQVEwRCxXQUFSLENBQW9CLFdBQXBCO0FBQ0FxTyxvRkFBSXZQLElBQUosQ0FBUytRLFdBQVQ7O0FBRUEsb0ZBQUkvVCxFQUFFQyxNQUFGLEVBQVU2QyxLQUFWLEtBQW9CLEdBQXhCLEVBQTZCO0FBQ3pCeEMseUdBQVM0RCxXQUFULENBQXFCLFdBQXJCO0FBQ0g7QUFDSixpRUFURCxNQVNPO0FBQ0hsRSxrRkFBRSxJQUFGLEVBQVFvRSxRQUFSLENBQWlCLElBQWpCO0FBQ0ExRCxzRkFBTTBELFFBQU4sQ0FBZSxTQUFmO0FBQ0E1RCx3RkFBUTRELFFBQVIsQ0FBaUIsV0FBakI7QUFDQS9ELHNGQUFNOEUsR0FBTixDQUFVLFVBQVYsRUFBc0IsUUFBdEI7O0FBRUEsb0ZBQUluRixFQUFFQyxNQUFGLEVBQVU2QyxLQUFWLEtBQW9CLEdBQXhCLEVBQTZCO0FBQ3pCeEMseUdBQVM4RCxRQUFULENBQWtCLFdBQWxCO0FBQ0FyRCxrSEFBa0JtRCxXQUFsQixDQUE4QixXQUE5QjtBQUNIO0FBQ0o7QUFDSixpREFyQkQ7QUFzQkgsaUNBekJDO0FBMEJGOFAsOENBQWMsd0JBQVc7QUFDckJoVSxrREFBRSxvQkFBRixFQUF3Qm9ELEVBQXhCLENBQTJCLGtCQUEzQixFQUErQyxVQUFTQyxDQUFULEVBQVk7QUFDdkQsb0VBQUlyRCxFQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIsSUFBakIsQ0FBSixFQUE0QjtBQUN4QnJFLGtGQUFFLElBQUYsRUFBUWtFLFdBQVIsQ0FBb0IsSUFBcEI7QUFDQTVELHlGQUFTNEQsV0FBVCxDQUFxQixrQkFBckI7QUFDQTdELHNGQUFNa0UsVUFBTixDQUFpQixPQUFqQjtBQUNBZ08sb0ZBQUl2UCxJQUFKLENBQVMrUSxXQUFUO0FBQ0gsaUVBTEQsTUFLTztBQUNIL1Qsa0ZBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixJQUFqQjtBQUNBOUQseUZBQVM4RCxRQUFULENBQWtCLGtCQUFsQjtBQUNBL0Qsc0ZBQU04RSxHQUFOLENBQVUsVUFBVixFQUFzQixRQUF0QjtBQUNIO0FBQ0QsdUVBQU8sS0FBUDtBQUNILGlEQVpEO0FBYUgsaUNBeENDO0FBeUNGO0FBQ0F3Tiw4Q0FBYyx3QkFBVztBQUNyQnpTLDBEQUFVa0QsRUFBVixDQUFhLGtCQUFiLEVBQWlDLFVBQVNDLENBQVQsRUFBWTtBQUN6QyxvRUFDSXJELEVBQUVxRCxFQUFFcUksTUFBSixFQUFZNUcsT0FBWixDQUNJLHlGQURKLEVBRUV2QixNQUhOLEVBS0k7QUFDSixvRUFBSTdDLE1BQU0yRCxRQUFOLENBQWUsU0FBZixDQUFKLEVBQStCO0FBQzNCekQsMkZBQVdzRCxXQUFYLENBQXVCLElBQXZCO0FBQ0FyRCw4RkFBY3FELFdBQWQsQ0FBMEIsSUFBMUI7QUFDQTVELHlGQUFTNEQsV0FBVCxDQUFxQixrQkFBckI7QUFDQXhELHNGQUFNd0QsV0FBTixDQUFrQixTQUFsQjtBQUNBcU8sb0ZBQUl2UCxJQUFKLENBQVMrUSxXQUFUO0FBQ0g7QUFDRCxvRUFBSS9ULEVBQUVDLE1BQUYsRUFBVTZDLEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUJ5UCxvRkFBSXZQLElBQUosQ0FBUytRLFdBQVQ7QUFDSDtBQUNEOVAsMkVBQVcsWUFBTTtBQUNibkQsNEZBQVlvRCxXQUFaLENBQXdCLFdBQXhCO0FBQ0gsaUVBRkQsRUFFRyxHQUZIO0FBR0FiLGtFQUFFbUYsZUFBRjtBQUNILGlEQXJCRDtBQXNCSCxpQ0FqRUM7QUFrRUY7QUFDQWtLLGtEQUFrQiw0QkFBVztBQUN6QjNSLGtFQUFrQnFDLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFlBQVc7QUFDckMsb0VBQUlwRCxFQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIsV0FBakIsQ0FBSixFQUFtQztBQUMvQnJFLGtGQUFFLElBQUYsRUFBUWtFLFdBQVIsQ0FBb0IsV0FBcEI7QUFDQXJELDhGQUFjcUQsV0FBZCxDQUEwQixJQUExQjs7QUFFQSxvRkFBSW5FLFFBQVErQyxLQUFSLEtBQWtCLEdBQXRCLEVBQTJCO0FBQ3ZCeEMseUdBQVM0RCxXQUFULENBQXFCLFdBQXJCO0FBQ0ExRCx3R0FBUTBELFdBQVIsQ0FBb0IsV0FBcEI7QUFDSCxpRkFIRCxNQUdPO0FBQ0hsRCwwR0FBVW1GLE1BQVY7QUFDQWxDLDJHQUFXLFlBQU07QUFDYm5ELDRIQUFZb0QsV0FBWixDQUF3QixXQUF4QjtBQUNILGlHQUZELEVBRUcsR0FGSDtBQUdIO0FBQ0osaUVBYkQsTUFhTztBQUNIbEUsa0ZBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixXQUFqQjtBQUNBdkQsOEZBQWNxRCxXQUFkLENBQTBCLElBQTFCOztBQUVBbEUsa0ZBQUUsSUFBRixFQUFRb0UsUUFBUixDQUFpQixXQUFqQjtBQUNBMUQsc0ZBQU13RCxXQUFOLENBQWtCLFNBQWxCO0FBQ0ExRCx3RkFBUTBELFdBQVIsQ0FBb0IsV0FBcEI7O0FBRUEsb0ZBQUluRSxRQUFRK0MsS0FBUixLQUFrQixHQUF0QixFQUEyQjtBQUN2QnhDLHlHQUFTOEQsUUFBVCxDQUFrQixXQUFsQjtBQUNILGlGQUZELE1BRU87QUFDSHBELDBHQUFVa0YsT0FBVjtBQUNBcEYsNEdBQVlzRCxRQUFaLENBQXFCLFdBQXJCO0FBQ0g7QUFDSjtBQUNKLGlEQTdCRDtBQThCSCxpQ0FsR0M7QUFtR0YyUCw2Q0FBYSx1QkFBVztBQUNwQmhULGtFQUFrQm1ELFdBQWxCLENBQThCLFdBQTlCO0FBQ0E1RCx5REFBUzRELFdBQVQsQ0FBcUIsV0FBckI7QUFDQTFELHdEQUFRMEQsV0FBUixDQUFvQixXQUFwQjtBQUNBcU8sb0RBQUl2UCxJQUFKLENBQVNpUixlQUFUO0FBQ0FqVCwwREFBVW1GLE1BQVY7QUFDSCxpQ0F6R0M7QUEwR0Y4TixpREFBaUIsMkJBQVc7QUFDeEIvVCwwREFBVWtELEVBQVYsQ0FBYSxrQkFBYixFQUFpQyxVQUFTQyxDQUFULEVBQVk7QUFDekMsb0VBQ0lyRCxFQUFFcUQsRUFBRXFJLE1BQUosRUFBWTVHLE9BQVosQ0FDSSw4RUFESixFQUVFdkIsTUFITixFQUtJO0FBQ0pGLGtFQUFFbUYsZUFBRjtBQUNBbkksc0VBQU1rRSxVQUFOLENBQWlCLE9BQWpCO0FBQ0gsaURBVEQ7QUFVSDtBQXJIQyxpQkF6REU7QUFnTFJxTyx5QkFBUztBQUNMO0FBQ0FDLHlDQUFTLG1CQUFXO0FBQ2hCLG9EQUFJck0sVUFBVXhHLEVBQUUsd0JBQUYsQ0FBZDtBQUNBd0csd0RBQVE3QixJQUFSLENBQWEsWUFBVztBQUNwQixvRUFBSWtELFVBQVU3SCxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxvQkFBYixDQUFkO0FBQ0Esb0VBQUl5RixTQUFTMUcsRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsbUJBQWIsQ0FBYjtBQUNBLG9FQUFJaVQsV0FBV2xVLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHlCQUFiLENBQWY7QUFDQSxvRUFBSXlGLE9BQU9uRCxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ25Cc0Usd0ZBQVFoQixLQUFSLENBQWM7QUFDVk0sOEdBQWMsQ0FESjtBQUVWQyxnSEFBZ0IsQ0FGTjtBQUdWRSx3R0FBUSxLQUhFO0FBSVZDLHNHQUFNLElBSkk7QUFLVjRNLHVHQUFPLEtBTEc7QUFNVkMsMkdBQVcsS0FORDtBQU9WL00sMEdBQVU7QUFQQSxpRkFBZDtBQVNIOztBQUVEckgsa0VBQUUsSUFBRixFQUFRb0QsRUFBUixDQUFXLGFBQVgsRUFBMEIsVUFDdEIyRSxLQURzQixFQUV0QmxCLEtBRnNCLEVBR3RCc0IsWUFIc0IsRUFJdEJDLFNBSnNCLEVBS3hCO0FBQ0Usb0ZBQUlELGVBQWUsQ0FBZixLQUFxQnRCLE1BQU1xQixVQUEvQixFQUEyQztBQUN2Q2dNLHlHQUFTOVEsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBVztBQUM1QnBELGtIQUFFLFFBQUYsRUFBWXFVLEtBQVosQ0FBa0IsTUFBbEI7QUFDSCxpR0FGRDtBQUdILGlGQUpELE1BSU87QUFDSEgseUdBQVM5USxFQUFULENBQVksT0FBWixFQUFxQixZQUFXO0FBQzVCeUUsd0hBQVFoQixLQUFSLENBQWMsV0FBZDtBQUNILGlHQUZEO0FBR0g7QUFDSixpRUFmRDs7QUFpQkFxTix5RUFBUzlRLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVc7QUFDNUJ5RSx3RkFBUWhCLEtBQVIsQ0FBYyxXQUFkO0FBQ0gsaUVBRkQ7O0FBSUE7QUFDQUwsd0VBQVF2RixJQUFSLENBQWEsdUJBQWIsRUFBc0NtQyxFQUF0QyxDQUF5QyxPQUF6QyxFQUFrRCxVQUFTQyxDQUFULEVBQVk7QUFDMURBLGtGQUFFbUYsZUFBRjtBQUNILGlFQUZEO0FBR0gsaURBekNEO0FBMENILGlDQTlDSTtBQStDTDtBQUNBc0ssbURBQW1CLDZCQUFXO0FBQzFCOVMsa0RBQUUsUUFBRixFQUFZb0QsRUFBWixDQUFlLGdCQUFmLEVBQWlDLFlBQVc7QUFDeEMsb0VBQUlvRCxVQUFVeEcsRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsb0JBQWIsQ0FBZDtBQUNBLG9FQUFJdUYsUUFBUWpELE1BQVosRUFBb0I7QUFDaEJpRCx3RkFBUSxDQUFSLEVBQVdLLEtBQVgsQ0FBaUJ5TixXQUFqQjtBQUNIO0FBQ0osaURBTEQ7QUFNSDtBQXZESSxpQkFoTEQ7QUF5T1J2Qiw2QkFBYTtBQUNUQyw4Q0FBYyx3QkFBVztBQUNyQixvREFBSXVCLFdBQVd2VSxFQUFFLGtCQUFGLENBQWY7QUFDQSxvREFBSXdVLFVBQVVELFNBQVNFLFFBQVQsQ0FBa0IsdUJBQWxCLENBQWQ7QUFDQUYseURBQ0tFLFFBREwsQ0FDYyxxQkFEZCxFQUVLdFAsR0FGTCxDQUVTLFFBRlQsRUFFbUJxUCxRQUFRRSxXQUFSLENBQW9CLElBQXBCLENBRm5COztBQUlBSCx5REFBU3RULElBQVQsQ0FBYyxvQkFBZCxFQUFvQzBELElBQXBDLENBQXlDLFlBQVc7QUFDaEQsb0VBQUkzRSxFQUFFLElBQUYsRUFBUXlVLFFBQVIsQ0FBaUIsdUJBQWpCLEVBQTBDbFIsTUFBOUMsRUFBc0Q7QUFDbER2RCxrRkFBRSxJQUFGLEVBQ0t5VSxRQURMLENBQ2MscUJBRGQsRUFFS3RQLEdBRkwsQ0FHUSxRQUhSLEVBSVFuRixFQUFFLG9CQUFGLEVBQ0t5VSxRQURMLENBQ2MsdUJBRGQsRUFFS0MsV0FGTCxDQUVpQixJQUZqQixDQUpSO0FBUUg7QUFDSixpREFYRDtBQVlILGlDQXBCUTtBQXFCVDtBQUNBeEIsMkRBQTJCLHFDQUFXO0FBQ2xDLG9EQUFJek4sTUFBTSxzQkFBVjtBQUNBLG9EQUFJNkQsT0FBT3BKLFVBQVVlLElBQVYsQ0FBZXdFLEdBQWYsQ0FBWDs7QUFFQTZELHFEQUFLM0UsSUFBTCxDQUFVLFlBQVc7QUFDakIsb0VBQ0k1RSxRQUFRK0MsS0FBUixNQUFtQixHQUFuQixJQUNBOUMsRUFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLGNBQWpCLENBRkosRUFHRTtBQUNFckUsa0ZBQUUsSUFBRixFQUFRNkYsSUFBUixDQUFhLHdCQUFiLEVBQXVDLFNBQXZDO0FBQ0g7QUFDSixpREFQRDs7QUFTQTNGLDBEQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0JxQyxHQUF0QixFQUEyQixZQUFXO0FBQ2xDLG9FQUFJMkQsTUFBTXBKLEVBQUVDLE1BQUYsRUFBVWdLLFNBQVYsRUFBVjtBQUNBLG9FQUFJTCxRQUFRNUosRUFBRSxJQUFGLEVBQVE2RixJQUFSLENBQWEsd0JBQWIsQ0FBWjtBQUNBM0YsMEVBQ0tlLElBREwsQ0FDVSxtQkFEVixFQUVLZ0YsTUFGTCxDQUVZLHNCQUFzQjJELEtBQXRCLEdBQThCLEdBRjFDLEVBR0t4RixRQUhMLENBR2MsU0FIZDs7QUFLQUgsMkVBQVcsWUFBTTtBQUNiN0Qsc0ZBQU1nRSxRQUFOLENBQWUsVUFBZixFQUEyQmUsR0FBM0IsQ0FBK0IsVUFBL0IsRUFBMkMsT0FBM0M7QUFDSCxpRUFGRCxFQUVHLEdBRkg7O0FBSUFvTixvRUFBSVEsV0FBSixDQUFnQkMsWUFBaEI7QUFDSCxpREFiRDs7QUFlQTlTLDBEQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsMkJBQXRCLEVBQW1ELFlBQVc7QUFDMURwRCxrRUFBRSxJQUFGLEVBQ0s4RSxPQURMLENBQ2Esa0JBRGIsRUFFS1osV0FGTCxDQUVpQixTQUZqQjs7QUFJQXFPLG9FQUFJUSxXQUFKLENBQWdCQyxZQUFoQjtBQUNILGlEQU5EOztBQVFBOVMsMERBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQix1QkFBdEIsRUFBK0MsVUFBU0MsQ0FBVCxFQUFZO0FBQ3ZEckQsa0VBQUUsSUFBRixFQUNLOEUsT0FETCxDQUNhLGFBRGIsRUFFS1osV0FGTCxDQUVpQixTQUZqQjtBQUdBeVE7QUFDQXRSLGtFQUFFbUYsZUFBRjtBQUNBbkYsa0VBQUVDLGNBQUY7QUFDSCxpREFQRDs7QUFTQSx5REFBU3FSLFNBQVQsR0FBcUI7QUFDakIsb0VBQUksQ0FBQ3pVLFVBQVVlLElBQVYsQ0FBZSxnQkFBZixFQUFpQ29ELFFBQWpDLENBQTBDLFNBQTFDLENBQUwsRUFBMkQ7QUFDdkRqRSxzRkFBTThELFdBQU4sQ0FBa0IsVUFBbEIsRUFBOEJLLFVBQTlCLENBQXlDLE9BQXpDO0FBQ0g7QUFDSjtBQUNKLGlDQXhFUTtBQXlFVDtBQUNBME8sa0RBQWtCLDRCQUFXO0FBQ3pCLG9EQUFJalQsRUFBRUMsTUFBRixFQUFVNkMsS0FBVixNQUFxQixHQUF6QixFQUE4QjtBQUMxQjVDLDBFQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0Isa0JBQXRCLEVBQTBDLFVBQVNDLENBQVQsRUFBWTtBQUNsRHJELGtGQUFFLDJCQUFGLEVBQStCb0UsUUFBL0IsQ0FBd0MsU0FBeEM7QUFDQS9ELHNGQUFNK0QsUUFBTixDQUFlLFVBQWY7O0FBRUFmLGtGQUFFQyxjQUFGO0FBQ0FELGtGQUFFbUYsZUFBRjtBQUNILGlFQU5EO0FBT0F0SSwwRUFBVWtELEVBQVYsQ0FDSSxPQURKLEVBRUksa0NBRkosRUFHSSxZQUFXO0FBQ1BwRCxrRkFBRSwyQkFBRixFQUErQmtFLFdBQS9CLENBQTJDLFNBQTNDOztBQUVBN0Qsc0ZBQU02RCxXQUFOLENBQWtCLFVBQWxCO0FBQ0gsaUVBUEw7QUFTSDtBQUNKO0FBN0ZRLGlCQXpPTDtBQXdVUmlQLHlCQUFTO0FBQ0xoUyxzQ0FBTSxnQkFBVztBQUFBOztBQUNiOEMsMkRBQVcsWUFBTTtBQUNiLHVFQUFLMlEsWUFBTDtBQUNILGlEQUZELEVBRUcsSUFGSDs7QUFJQTdVLHdEQUFRaUUsTUFBUixDQUFlLFlBQVc7QUFDdEJ1TyxvRUFBSVksT0FBSixDQUFZeUIsWUFBWjtBQUNILGlEQUZEO0FBR0gsaUNBVEk7QUFVTEEsOENBQWMsd0JBQVc7QUFDckIsb0RBQUlDLFNBQVMzVSxVQUFVZSxJQUFWLENBQWUsaUJBQWYsQ0FBYjs7QUFFQTRULHVEQUFPbFEsSUFBUCxDQUFZLFlBQVc7QUFDbkIsb0VBQUltUSxlQUFlOVUsRUFBRSxJQUFGLEVBQVFpQixJQUFSLENBQWEsc0JBQWIsQ0FBbkI7QUFDQSxvRUFBSThULGlCQUFpQkQsYUFBYTdULElBQWIsQ0FBa0IsSUFBbEIsRUFBd0I4RSxHQUF4QixDQUE0QixRQUE1QixDQUFyQjtBQUNBLG9FQUFJaVAsY0FBY2hWLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHFCQUFiLENBQWxCO0FBQ0Esb0VBQUlnVSxnQkFBZ0JELFlBQVkvVCxJQUFaLENBQWlCLElBQWpCLEVBQXVCOEUsR0FBdkIsQ0FBMkIsUUFBM0IsQ0FBcEI7O0FBRUFrUCw4RUFBY3RRLElBQWQsQ0FBbUIsVUFBUzBELENBQVQsRUFBWTtBQUMzQixvRkFBSTZNLG1CQUFtQmxWLEVBQUUsSUFBRixFQUNsQjhFLE9BRGtCLENBQ1YsaUJBRFUsRUFFbEI3RCxJQUZrQixDQUViLHNCQUZhLEVBR2xCQSxJQUhrQixDQUdiLElBSGEsRUFJbEI4RSxHQUprQixDQUlkLFFBSmMsRUFLbEI4SyxFQUxrQixDQUtmeEksQ0FMZSxDQUF2Qjs7QUFPQThNLDBGQUFVblYsRUFBRSxJQUFGLENBQVYsRUFBbUJrVixnQkFBbkI7QUFDSCxpRUFURDs7QUFXQUgsK0VBQWVwUSxJQUFmLENBQW9CLFVBQVMwRCxDQUFULEVBQVk7QUFDNUIsb0ZBQUkrTSxvQkFBb0JwVixFQUFFLElBQUYsRUFDbkI4RSxPQURtQixDQUNYLGlCQURXLEVBRW5CN0QsSUFGbUIsQ0FFZCxxQkFGYyxFQUduQkEsSUFIbUIsQ0FHZCxJQUhjLEVBSW5COEUsR0FKbUIsQ0FJZixRQUplLEVBS25COEssRUFMbUIsQ0FLaEJ4SSxDQUxnQixDQUF4Qjs7QUFPQThNLDBGQUFVblYsRUFBRSxJQUFGLENBQVYsRUFBbUJvVixpQkFBbkI7QUFDSCxpRUFURDs7QUFXQSx5RUFBU0QsU0FBVCxDQUFtQnZOLEtBQW5CLEVBQTBCeU4sSUFBMUIsRUFBZ0M7QUFDNUIsb0ZBQUlGLFlBQVksQ0FBaEI7QUFDQSxvRkFBSUcsZ0JBQWdCMU4sTUFBTThNLFdBQU4sRUFBcEI7QUFDQSxvRkFBSVksZ0JBQWdCSCxTQUFwQixFQUErQjtBQUMzQkEsNEdBQVlHLGFBQVo7QUFDSDtBQUNELG9GQUFJQSxnQkFBZ0JELEtBQUtYLFdBQUwsRUFBcEIsRUFBd0M7QUFDcENXLHFHQUFLbFEsR0FBTCxDQUFTLFFBQVQsRUFBbUJnUSxTQUFuQjtBQUNIO0FBQ0o7QUFDSixpREF0Q0Q7QUF1Q0g7QUFwREksaUJBeFVEO0FBOFhSL0IsMEJBQVU7QUFDTmpTLHNDQUFNLGdCQUFXO0FBQ2IscURBQUtvVSxTQUFMO0FBQ0gsaUNBSEs7QUFJTkEsMkNBQVcscUJBQVc7QUFDbEIsb0RBQUl2VixFQUFFQyxNQUFGLEVBQVU2QyxLQUFWLEtBQW9CLEdBQXhCLEVBQTZCO0FBQ3pCOUMsa0VBQUUsaUJBQUYsRUFBcUJnTCxRQUFyQixDQUE4QixvQkFBOUI7QUFDSCxpREFGRCxNQUVPO0FBQ0hoTCxrRUFBRSxpQkFBRixFQUFxQmdMLFFBQXJCLENBQThCLGlCQUE5QjtBQUNBaEwsa0VBQUUsaUJBQUYsRUFBcUJnTCxRQUFyQixDQUE4QixvQkFBOUI7QUFDSDtBQUNKO0FBWEs7QUE5WEYsQ0FBWjs7QUE2WUE7Ozs7O0FBS0F1SCxJQUFJYyxVQUFKLEdBQWlCO0FBQ2JsUyxzQkFBTSxnQkFBVztBQUNib1Isb0NBQUljLFVBQUosQ0FBZW1DLGFBQWY7QUFDQWpELG9DQUFJYyxVQUFKLENBQWVvQyxnQkFBZjtBQUNBbEQsb0NBQUljLFVBQUosQ0FBZXFDLHlCQUFmO0FBQ0FuRCxvQ0FBSWMsVUFBSixDQUFlc0MscUJBQWY7QUFDQXBELG9DQUFJYyxVQUFKLENBQWV1QyxpQkFBZjtBQUNBckQsb0NBQUljLFVBQUosQ0FBZXdDLG1CQUFmOztBQUVBLG9DQUFJOVYsUUFBUStDLEtBQVIsTUFBbUIsR0FBdkIsRUFBNEI7QUFDeEJ5UCxvREFBSWMsVUFBSixDQUFleUMsYUFBZixDQUE2QjNVLElBQTdCO0FBQ0g7QUFDSixpQkFaWTtBQWFiO0FBQ0FxVSwrQkFBZSx5QkFBVztBQUN0QixvQ0FBSU8saUJBQWlCL1YsRUFBRSxvQ0FBRixDQUFyQjs7QUFFQTtBQUNBK1YsK0NBQWU5VSxJQUFmLENBQW9CLFlBQXBCLEVBQWtDbUMsRUFBbEMsQ0FBcUMsT0FBckMsRUFBOEMsWUFBVztBQUNyRCxvREFBSXFDLE1BQU16RixFQUFFLG1CQUFGLENBQVY7QUFDQSxvREFBSWdXLGNBQWNoVyxFQUFFLGdCQUFGLEVBQ2J5VSxRQURhLENBQ0osa0JBREksRUFFYnhULElBRmEsQ0FFUixxQkFGUSxDQUFsQjtBQUdBLG9EQUFJZ1YsT0FBT2pXLEVBQUUsSUFBRixFQUFRNkYsSUFBUixDQUFhLE1BQWIsQ0FBWDs7QUFFQSxvREFBSW9RLFNBQVMsa0JBQWIsRUFBaUM7QUFDN0J4USxvRUFBSXJCLFFBQUosQ0FBYSxXQUFiO0FBQ0E0Uiw0RUFBWTVSLFFBQVosQ0FBcUIsV0FBckI7QUFDSCxpREFIRCxNQUdPO0FBQ0hxQixvRUFBSXZCLFdBQUosQ0FBZ0IsV0FBaEI7QUFDQThSLDRFQUFZOVIsV0FBWixDQUF3QixXQUF4QjtBQUNIOztBQUVEcU8sb0RBQUlRLFdBQUosQ0FBZ0JDLFlBQWhCOztBQUVBaFQsa0RBQUUsWUFBRixFQUNLK0QsYUFETCxHQUVLQyxNQUZMO0FBR0gsaUNBcEJEO0FBcUJILGlCQXZDWTtBQXdDYjtBQUNBeVIsa0NBQWtCLDRCQUFXO0FBQ3pCUyxvREFBb0IsZ0JBQXBCLEVBQXNDLFNBQXRDO0FBQ0gsaUJBM0NZO0FBNENiO0FBQ0FSLDJDQUEyQixxQ0FBVztBQUNsQ3hWLDBDQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0IsMkJBQXRCLEVBQW1ELFVBQVNDLENBQVQsRUFBWTtBQUMzRHJELGtEQUFFLElBQUYsRUFBUW9FLFFBQVIsQ0FBaUIsV0FBakI7QUFDQXBFLGtEQUFFLElBQUYsRUFDSzhFLE9BREwsQ0FDYSw2QkFEYixFQUVLN0QsSUFGTCxDQUVVLGlCQUZWLEVBR0tpRCxXQUhMLENBR2lCLFdBSGpCO0FBSUFiLGtEQUFFQyxjQUFGO0FBQ0gsaUNBUEQ7QUFRSCxpQkF0RFk7QUF1RGI7QUFDQXFTLHVDQUF1QixpQ0FBVztBQUM5QjNWLGtDQUFFLHFCQUFGLEVBQXlCMkUsSUFBekIsQ0FBOEIsVUFBU3RCLENBQVQsRUFBWTtBQUN0QyxvREFBSSxDQUFDckQsRUFBRSxJQUFGLEVBQVFxRSxRQUFSLENBQWlCLHdCQUFqQixDQUFMLEVBQWlEO0FBQzdDckUsa0VBQUUsSUFBRixFQUNLaUIsSUFETCxDQUNVLDJCQURWLEVBRUttRixJQUZMLENBRVUvQyxJQUFJLENBRmQ7QUFHSDtBQUNKLGlDQU5EO0FBT0gsaUJBaEVZO0FBaUViO0FBQ0F1UyxtQ0FBbUIsNkJBQVc7QUFDMUIxViwwQ0FBVWtELEVBQVYsQ0FBYSxnQkFBYixFQUErQix5QkFBL0IsRUFBMEQsWUFBVztBQUNqRSxvREFBSW1SLFdBQVd2VSxFQUFFLElBQUYsRUFBUThFLE9BQVIsQ0FBZ0IscUJBQWhCLENBQWY7QUFDQSxvREFBSXlQLFNBQVNsUSxRQUFULENBQWtCLHdCQUFsQixDQUFKLEVBQWlEO0FBQzdDa1EseUVBQ0t0VCxJQURMLENBQ1UsNkJBRFYsRUFFSzJELFNBRkwsQ0FFZTtBQUNQaVAsdUZBQU8saUJBQVc7QUFDZDdULGtHQUFFLElBQUYsRUFBUW1GLEdBQVIsQ0FBWTtBQUNSMk8seUhBQVM7QUFERCxpR0FBWjtBQUdIO0FBTE0saUVBRmYsRUFTS25HLEdBVEwsR0FVSzFNLElBVkwsQ0FVVSxnQ0FWVixFQVdLaUQsV0FYTCxDQVdpQixXQVhqQjtBQVlBcVEseUVBQVNyUSxXQUFULENBQXFCLHdCQUFyQjtBQUNILGlEQWRELE1BY087QUFDSHFRLHlFQUFTdFQsSUFBVCxDQUFjLDZCQUFkLEVBQTZDMkQsU0FBN0MsQ0FBdUQ7QUFDbkRpUCx1RkFBTyxpQkFBVztBQUNkN1Qsa0dBQUUsSUFBRixFQUFRbUYsR0FBUixDQUFZO0FBQ1IyTyx5SEFBUztBQURELGlHQUFaO0FBR0g7QUFMa0QsaUVBQXZEO0FBT0g7QUFDRHZCLG9EQUFJYyxVQUFKLENBQWVzQyxxQkFBZjtBQUNILGlDQTFCRDtBQTJCSCxpQkE5Rlk7QUErRmI7QUFDQUUscUNBQXFCLCtCQUFXO0FBQzVCM1YsMENBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixnQ0FBdEIsRUFBd0QsWUFBVztBQUMvRCxvREFBSW1SLFdBQVd2VSxFQUFFLElBQUYsRUFBUThFLE9BQVIsQ0FBZ0IscUJBQWhCLENBQWY7QUFDQSxvREFBSSxDQUFDeVAsU0FBU2xRLFFBQVQsQ0FBa0Isd0JBQWxCLENBQUwsRUFBa0Q7QUFDOUNrUSx5RUFDS25RLFFBREwsQ0FDYyx3QkFEZCxFQUVLbkQsSUFGTCxDQUdRLHNEQUhSLEVBS0syRSxHQUxMLENBS1MsRUFMVCxFQU1LaUUsT0FOTCxDQU1hLFFBTmIsRUFPSzhELEdBUEwsR0FRSzFNLElBUkwsQ0FRVSxnQ0FSVixFQVNLbUQsUUFUTCxDQVNjLFdBVGQsRUFVS3VKLEdBVkwsR0FXSzFNLElBWEwsQ0FXVSw2QkFYVixFQVlLeUQsT0FaTCxHQWFLaUosR0FiTCxHQWNLMU0sSUFkTCxDQWNVLGlCQWRWLEVBZUttRCxRQWZMLENBZWMsV0FmZCxFQWdCS3VKLEdBaEJMLEdBaUJLMU0sSUFqQkwsQ0FpQlUsMkJBakJWLEVBa0JLaUQsV0FsQkwsQ0FrQmlCLFdBbEJqQixFQW1CS3lKLEdBbkJMLEdBb0JLMU0sSUFwQkwsQ0FvQlUsT0FwQlYsRUFxQksyRSxHQXJCTCxDQXFCUyxFQXJCVCxFQXNCSytILEdBdEJMLEdBdUJLMU0sSUF2QkwsQ0F1QlUsMkJBdkJWLEVBd0JLcUgsSUF4QkwsQ0F3QlUsRUF4QlY7QUF5Qkg7QUFDSixpQ0E3QkQ7QUE4QkgsaUJBL0hZO0FBZ0liO0FBQ0F3TiwrQkFBZTtBQUNYbk0sb0NBQUk7QUFDQThHLHdEQUFRdlEsVUFBVWUsSUFBVixDQUFlLDBCQUFmLENBRFI7QUFFQVYsMERBQVVMLFVBQVVlLElBQVYsQ0FBZSxvQkFBZixDQUZWO0FBR0FrViw2REFBYWpXLFVBQVVlLElBQVYsQ0FBZSxhQUFmLENBSGI7QUFJQW1WLHVEQUFPbFcsVUFBVWUsSUFBVixDQUFlLG1CQUFmLENBSlA7QUFLQW9WLDZEQUFhblcsVUFBVWUsSUFBVixDQUFlLG9CQUFmLENBTGI7QUFNQXFWLCtEQUFlcFcsVUFBVWUsSUFBVixDQUNYLDZDQURXO0FBTmYsaUNBRE87O0FBWVhFLHNDQUFNLGdCQUFXO0FBQ2JqQiwwREFDS2tELEVBREwsQ0FDUSxPQURSLEVBQ2lCLDBCQURqQixFQUM2QyxZQUFXO0FBQ2hEbVAsb0VBQUljLFVBQUosQ0FBZXlDLGFBQWYsQ0FBNkJoUSxJQUE3QjtBQUNILGlEQUhMLEVBSUsxQyxFQUpMLENBSVEsT0FKUixFQUlpQixVQUFTQyxDQUFULEVBQVk7QUFDckIsb0VBQUlBLEVBQUVxSyxPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDakI2RSxvRkFBSWMsVUFBSixDQUFleUMsYUFBZixDQUE2QjlQLElBQTdCO0FBQ0g7QUFDSixpREFSTCxFQVNLNUMsRUFUTCxDQVVRLE9BVlIsRUFXUSxvQkFYUixFQVlRbVAsSUFBSWMsVUFBSixDQUFleUMsYUFBZixDQUE2QjlQLElBWnJDO0FBY0gsaUNBM0JVOztBQTZCWEYsc0NBQU0sZ0JBQVc7QUFDYixvREFBSXZGLFdBQVdMLFVBQVVlLElBQVYsQ0FBZSxvQkFBZixDQUFmO0FBQ0Esb0RBQUlrVixjQUFjalcsVUFBVWUsSUFBVixDQUFlLGFBQWYsQ0FBbEI7QUFDQSxvREFBSW1WLFFBQVFsVyxVQUFVZSxJQUFWLENBQWUsbUJBQWYsQ0FBWjtBQUNBLG9EQUFJb1YsY0FBY25XLFVBQVVlLElBQVYsQ0FBZSxvQkFBZixDQUFsQjtBQUNBLG9EQUFJcVYsZ0JBQWdCcFcsVUFBVWUsSUFBVixDQUFlLHNCQUFmLENBQXBCOztBQUVBVix5REFBUzZELFFBQVQsQ0FBa0IsWUFBbEI7QUFDQStSLDREQUFZL1IsUUFBWixDQUFxQixVQUFyQjtBQUNBZ1Msc0RBQU1oUyxRQUFOLENBQWUscUJBQWYsRUFBc0NlLEdBQXRDLENBQTBDLFNBQTFDLEVBQXFELE9BQXJEO0FBQ0FrUiw0REFBWXJRLElBQVo7QUFDQXNRLDhEQUFjeFEsSUFBZDtBQUNILGlDQXpDVTs7QUEyQ1hFLHNDQUFNLGdCQUFXO0FBQ2Isb0RBQUl5SyxTQUFTdlEsVUFBVWUsSUFBVixDQUFlLDBCQUFmLENBQWI7QUFDQSxvREFBSVYsV0FBV0wsVUFBVWUsSUFBVixDQUFlLG9CQUFmLENBQWY7QUFDQSxvREFBSWtWLGNBQWNqVyxVQUFVZSxJQUFWLENBQWUsYUFBZixDQUFsQjtBQUNBLG9EQUFJbVYsUUFBUWxXLFVBQVVlLElBQVYsQ0FBZSxtQkFBZixDQUFaO0FBQ0Esb0RBQUlvVixjQUFjblcsVUFBVWUsSUFBVixDQUFlLG9CQUFmLENBQWxCO0FBQ0Esb0RBQUlxVixnQkFBZ0JwVyxVQUFVZSxJQUFWLENBQWUsc0JBQWYsQ0FBcEI7O0FBRUFWLHlEQUFTMkQsV0FBVCxDQUFxQixZQUFyQjtBQUNBaVMsNERBQVlqUyxXQUFaLENBQXdCLFVBQXhCO0FBQ0FrUyxzREFBTWxTLFdBQU4sQ0FBa0IscUJBQWxCLEVBQXlDSyxVQUF6QyxDQUFvRCxPQUFwRDtBQUNBa00sdURBQU9wRCxJQUFQO0FBQ0FnSiw0REFBWXZRLElBQVo7QUFDQXdRLDhEQUFjdFEsSUFBZDtBQUNIO0FBekRVO0FBaklGLENBQWpCOztBQThMQTs7Ozs7QUFLQXVNLElBQUllLE9BQUosR0FBYztBQUNWblMsc0JBQU0sZ0JBQVc7QUFDYixvQ0FBSXBCLFFBQVErQyxLQUFSLEtBQWtCLElBQXRCLEVBQTRCO0FBQ3hCeVAsb0RBQUllLE9BQUosQ0FBWTdLLElBQVo7QUFDSDtBQUNELHFDQUFLOE4sUUFBTDtBQUNILGlCQU5TO0FBT1Y7QUFDQUMsa0NBQWtCLDBCQUFTN00sRUFBVCxFQUFhO0FBQzNCLG9DQUFJOE0sU0FBUzlNLEdBQUc3RSxPQUFILENBQVcsa0JBQVgsQ0FBYjtBQUNBLG9DQUFJNFIsT0FBTy9NLEdBQUc3RSxPQUFILENBQVcsZUFBWCxDQUFYO0FBQ0Esb0NBQUk2SyxPQUFPaEcsR0FBRzFJLElBQUgsQ0FBUSxxQkFBUixDQUFYOztBQUVBLG9DQUFJMFYsVUFBVSxpQ0FBZDtBQUNBLG9DQUFJQyxXQUFXLGlDQUFmO0FBQ0Esb0NBQUlDLFdBQVcsd0NBQWY7QUFDQSxvQ0FBSUMsWUFBWSxpQ0FBaEI7O0FBRUEsb0NBQUlMLE9BQU9wUyxRQUFQLENBQWdCLHNCQUFoQixDQUFKLEVBQTZDO0FBQ3pDc0wscURBQUt6TCxXQUFMLEdBQW1CRSxRQUFuQixDQUE0QnVTLE9BQTVCO0FBQ0gsaUNBRkQsTUFFTyxJQUFJRixPQUFPcFMsUUFBUCxDQUFnQix1QkFBaEIsQ0FBSixFQUE4QztBQUNqRHNMLHFEQUFLekwsV0FBTCxHQUFtQkUsUUFBbkIsQ0FBNEJ3UyxRQUE1QjtBQUNILGlDQUZNLE1BRUEsSUFBSUgsT0FBT3BTLFFBQVAsQ0FBZ0IsdUJBQWhCLENBQUosRUFBOEM7QUFDakRzTCxxREFBS3pMLFdBQUwsR0FBbUJFLFFBQW5CLENBQTRCeVMsUUFBNUI7QUFDSCxpQ0FGTSxNQUVBLElBQUlKLE9BQU9wUyxRQUFQLENBQWdCLHdCQUFoQixDQUFKLEVBQStDO0FBQ2xEc0wscURBQUt6TCxXQUFMLEdBQW1CRSxRQUFuQixDQUE0QjBTLFNBQTVCO0FBQ0g7QUFDSixpQkEzQlM7QUE0QlZQLDBCQUFVLG9CQUFXO0FBQ2pCdlcsa0NBQUUsa0JBQUYsRUFDS2lCLElBREwsQ0FDVSxlQURWLEVBRUswRCxJQUZMLENBRVUsWUFBVztBQUNiLG9EQUFJZ0wsT0FBTzNQLEVBQUUsSUFBRixFQUFRaUIsSUFBUixDQUFhLHFCQUFiLENBQVg7O0FBRUEsb0RBQUlqQixFQUFFLElBQUYsRUFBUXFFLFFBQVIsQ0FBaUIseUJBQWpCLENBQUosRUFBaUQ7QUFDN0NzTCxxRUFBS3pMLFdBQUwsR0FDS0UsUUFETCxDQUNjLG9CQURkLEVBRUs2SyxJQUZMLENBR1EsaUVBSFI7QUFLSDtBQUNKLGlDQVpMO0FBYUgsaUJBMUNTO0FBMkNWO0FBQ0F4RyxzQkFBTSxnQkFBVztBQUNiekksa0NBQUUsaUJBQUYsRUFBcUJ5SSxJQUFyQjtBQUNIO0FBOUNTLENBQWQ7O0FBaURBOzs7OztBQUtBOEosSUFBSWtCLFFBQUosR0FBZTtBQUNYdFMsc0JBQU0sZ0JBQVc7QUFDYm9SLG9DQUFJa0IsUUFBSixDQUFhc0QsVUFBYjtBQUNBeEUsb0NBQUlrQixRQUFKLENBQWF1RCxjQUFiO0FBQ0F6RSxvQ0FBSWtCLFFBQUosQ0FBYXdELGVBQWI7O0FBRUEsb0NBQUlqWCxFQUFFQyxNQUFGLEVBQVU2QyxLQUFWLE1BQXFCLElBQXpCLEVBQStCO0FBQzNCO0FBQ0E7QUFDSDtBQUNKLGlCQVZVO0FBV1hvVSwyQkFBVyxxQkFBVztBQUNsQixvQ0FBSW5TLFFBQVEvRSxFQUFFLGtCQUFGLENBQVo7O0FBRUErRSxzQ0FDSzNCLEVBREwsQ0FDUSxZQURSLEVBQ3NCLFVBQVNDLENBQVQsRUFBWTtBQUMxQnJELGtEQUFFLElBQUYsRUFBUW9FLFFBQVIsQ0FBaUIsVUFBakI7QUFDSCxpQ0FITCxFQUlLaEIsRUFKTCxDQUlRLFlBSlIsRUFJc0IsWUFBVztBQUN6QixvREFBSXFOLFNBQVN6USxFQUFFLElBQUYsRUFBUWlCLElBQVIsQ0FBYSxPQUFiLENBQWI7QUFDQSxvREFBSTJNLFVBQVU1TixFQUFFLElBQUYsRUFDVGlCLElBRFMsQ0FDSixRQURJLEVBRVQ4TCxJQUZTLEVBQWQ7QUFHQSxvREFDSTBELE9BQU90TSxFQUFQLENBQVUsUUFBVixLQUNBeUosUUFBUXZKLFFBQVIsQ0FBaUIseUJBQWpCLENBRkosRUFHRSxDQUNELENBSkQsTUFJTztBQUNIckUsa0VBQUUsSUFBRixFQUFRa0UsV0FBUixDQUFvQixVQUFwQjtBQUNIO0FBQ0osaUNBaEJMO0FBaUJILGlCQS9CVTtBQWdDWDZTLDRCQUFZLHNCQUFXO0FBQ25CLG9DQUFJbkosVUFBVTVOLEVBQUUsa0JBQUYsRUFBc0JpQixJQUF0QixDQUEyQixRQUEzQixDQUFkO0FBQ0EyTSx3Q0FBUXhLLEVBQVIsQ0FBVyxnQkFBWCxFQUE2QixZQUFXO0FBQ3BDcEQsa0RBQUUsSUFBRixFQUNLOEUsT0FETCxDQUNhLGtCQURiLEVBRUtaLFdBRkwsQ0FFaUIsVUFGakI7QUFHSCxpQ0FKRDtBQUtILGlCQXZDVTtBQXdDWDhTLGdDQUFnQiwwQkFBVztBQUN2QjlXLDBDQUFVa0QsRUFBVixDQUFhLE9BQWIsRUFBc0Isc0JBQXRCLEVBQThDLFlBQVc7QUFDckQsb0RBQUl5QixVQUFVN0UsRUFBRSxJQUFGLEVBQVE4RSxPQUFSLENBQWdCLGlCQUFoQixDQUFkO0FBQ0Esb0RBQUkrRixZQUFZaEcsUUFBUTVELElBQVIsQ0FBYSx3QkFBYixDQUFoQjtBQUNBLG9EQUFJa1csVUFBVXRTLFFBQVE1RCxJQUFSLENBQWEscUJBQWIsQ0FBZDs7QUFFQWpCLGtEQUFFLElBQUYsRUFBUWdHLElBQVI7QUFDQTZFLDBEQUFVL0UsSUFBVjtBQUNBcVIsd0RBQVE1UyxVQUFSLENBQW1CLE9BQW5CO0FBQ0gsaUNBUkQ7O0FBVUFyRSwwQ0FBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLHdCQUF0QixFQUFnRCxZQUFXO0FBQ3ZELG9EQUFJeUIsVUFBVTdFLEVBQUUsSUFBRixFQUFROEUsT0FBUixDQUFnQixpQkFBaEIsQ0FBZDtBQUNBLG9EQUFJc1MsV0FBV3ZTLFFBQVE1RCxJQUFSLENBQWEsc0JBQWIsQ0FBZjtBQUNBLG9EQUFJa1csVUFBVXRTLFFBQVE1RCxJQUFSLENBQWEscUJBQWIsQ0FBZDs7QUFFQWpCLGtEQUFFLElBQUYsRUFBUWdHLElBQVI7QUFDQW9SLHlEQUFTdFIsSUFBVDtBQUNBcVIsd0RBQVFoUyxHQUFSLENBQVksU0FBWixFQUF1QixNQUF2QjtBQUNILGlDQVJEO0FBU0gsaUJBNURVO0FBNkRYOFIsaUNBQWlCLDJCQUFXO0FBQ3hCL1csMENBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixZQUF0QixFQUFvQyxVQUFTQyxDQUFULEVBQVk7QUFDNUMsb0RBQUl3QixVQUFVN0UsRUFBRSxJQUFGLEVBQVFzRSxNQUFSLEVBQWQ7QUFDQSxvREFBSWtLLEtBQUt4TyxFQUFFLElBQUYsRUFBUTZGLElBQVIsQ0FBYSxtQkFBYixDQUFUOztBQUVBaEIsd0RBQVE1RCxJQUFSLENBQWEsWUFBYixFQUEyQmlELFdBQTNCLENBQXVDLFlBQXZDO0FBQ0FsRSxrREFBRSxJQUFGLEVBQVFvRSxRQUFSLENBQWlCLFlBQWpCOztBQUVBcEUsa0RBQUUsSUFBRixFQUNLOEUsT0FETCxDQUNhLGlCQURiLEVBRUs3RCxJQUZMLENBRVUsT0FGVixFQUdLZ0YsTUFITCxDQUdZLE9BSFosRUFJSzRGLFdBSkwsQ0FJaUIseUJBSmpCOztBQU1BN0wsa0RBQUUsSUFBRixFQUNLOEUsT0FETCxDQUNhLGlCQURiLEVBRUs3RCxJQUZMLENBRVUsY0FGVixFQUdLa0UsR0FITCxDQUdTLFNBSFQsRUFHb0IsTUFIcEIsRUFJS2MsTUFKTCxDQUlZLGlCQUFpQnVJLEVBQWpCLEdBQXNCLEdBSmxDLEVBS0tqSyxVQUxMLENBS2dCLE9BTGhCOztBQU9BbEIsa0RBQUVDLGNBQUY7QUFDSCxpQ0FyQkQ7QUFzQkg7QUFwRlUsQ0FBZjs7QUF1RkE7Ozs7O0FBS0FpUCxJQUFJZ0IsS0FBSixHQUFZO0FBQ1JwUyxzQkFBTSxnQkFBVztBQUNiLG9DQUFJbkIsRUFBRUMsTUFBRixFQUFVNkMsS0FBVixLQUFvQixHQUF4QixFQUE2QjtBQUN6QjtBQUNIO0FBQ0R5UCxvQ0FBSWdCLEtBQUosQ0FBVTlLLElBQVY7QUFDQThKLG9DQUFJZ0IsS0FBSixDQUFVOEQsVUFBVjtBQUNILGlCQVBPO0FBUVI7QUFDQTVPLHNCQUFNLGdCQUFXO0FBQ2J6SSxrQ0FBRSxpQkFBRixFQUFxQnlJLElBQXJCO0FBQ0gsaUJBWE87QUFZUjtBQUNBNE8sNEJBQVksc0JBQVc7QUFDbkJuWCwwQ0FBVWtELEVBQVYsQ0FBYSxPQUFiLEVBQXNCLDRCQUF0QixFQUFvRCxZQUFXO0FBQzNEcEQsa0RBQUUsZ0JBQUYsRUFBb0JzWCxVQUFwQjtBQUNILGlDQUZEO0FBR0gsaUJBakJPO0FBa0JSO0FBQ0FDLDBCQUFVLG9CQUFXO0FBQ2pCLG9DQUFJdlgsRUFBRSxrQkFBRixFQUFzQnVELE1BQTFCLEVBQWtDO0FBQzlCdkQsa0RBQUUsa0JBQUYsRUFDS3VYLFFBREwsQ0FDYztBQUNOQyx1RUFBTyxzQ0FERDtBQUVOQyw2RUFBYSxRQUZQO0FBR05DLHdFQUFRLE1BSEY7QUFJTkMsMkVBQVcsU0FKTDtBQUtOOUQsdUVBQU8sZUFBU3hRLENBQVQsRUFBWXVVLEVBQVosRUFBZ0I7QUFDbkJBLG1GQUFHbEIsSUFBSCxDQUFRdFMsUUFBUixDQUFpQixXQUFqQjtBQUNILGlFQVBLO0FBUU55VCxzRUFBTSxjQUFTeFUsQ0FBVCxFQUFZdVUsRUFBWixFQUFnQjtBQUNsQnJFLHNGQUFNdUUseUJBQU47QUFDQUYsbUZBQUdsQixJQUFILENBQVF4UyxXQUFSLENBQW9CLFdBQXBCO0FBQ0g7QUFYSyxpREFEZCxFQWNLNlQsZ0JBZEw7QUFlSDtBQUNKLGlCQXJDTztBQXNDUjtBQUNBRCwyQ0FBMkIscUNBQVc7QUFDbEMsb0NBQUlFLE9BQU9oWSxFQUFFLGdDQUFGLENBQVg7QUFDQWdZLHFDQUFLNVIsSUFBTCxDQUFVLFNBQVYsRUFBcUI0RSxRQUFyQixDQUE4QmhMLEVBQUUsd0JBQUYsQ0FBOUI7QUFDQUEsa0NBQUUsa0JBQUYsRUFDSytGLEdBREwsQ0FDUyxRQURULEVBRUs5RSxJQUZMLENBRVUsa0JBRlYsRUFHS2lLLE1BSEw7QUFJSDtBQTlDTyxDQUFaOztBQWlEQTs7Ozs7QUFLQXFILElBQUlpQixNQUFKLEdBQWE7QUFDVHJTLHNCQUFNLGdCQUFXO0FBQ2JvUixvQ0FBSWlCLE1BQUosQ0FBV3lFLGVBQVg7QUFDQTFGLG9DQUFJaUIsTUFBSixDQUFXMEUsZ0JBQVg7QUFDQTNGLG9DQUFJaUIsTUFBSixDQUFXMkUsWUFBWDtBQUNILGlCQUxRO0FBTVQ7QUFDQUYsaUNBQWlCLDJCQUFXO0FBQ3hCL1gsMENBQVVrRCxFQUFWLENBQWEsa0JBQWIsRUFBaUMsc0JBQWpDLEVBQXlELFlBQVc7QUFDaEVwRCxrREFBRSxnQkFBRixFQUFvQm1HLE1BQXBCLENBQTJCO0FBQ3ZCME4sdUVBQU8saUJBQVc7QUFDZDdULGtGQUFFLElBQUYsRUFBUW1GLEdBQVIsQ0FBWTtBQUNSMk8seUdBQVM7QUFERCxpRkFBWjtBQUdIO0FBTHNCLGlEQUEzQjtBQU9ILGlDQVJEO0FBU0E1VCwwQ0FBVWtELEVBQVYsQ0FBYSxrQkFBYixFQUFpQyx1QkFBakMsRUFBMEQsWUFBVztBQUNqRXBELGtEQUFFLGdCQUFGLEVBQW9Ca0csT0FBcEI7QUFDSCxpQ0FGRDtBQUdILGlCQXBCUTtBQXFCVDtBQUNBZ1Msa0NBQWtCLDRCQUFXO0FBQ3pCLG9DQUFJbFksRUFBRUMsTUFBRixFQUFVNkMsS0FBVixNQUFxQixHQUF6QixFQUE4QjtBQUMxQjtBQUNBLG9EQUFJc1YsYUFBYXBZLEVBQUUsZ0JBQUYsQ0FBakI7O0FBRUFBLGtEQUFFLGlCQUFGLEVBQXFCMkUsSUFBckIsQ0FBMEIsWUFBVztBQUNqQzNFLGtFQUFFLElBQUYsRUFDS3VFLFVBREwsQ0FDZ0IsTUFEaEIsRUFFS0EsVUFGTCxDQUVnQixhQUZoQjtBQUdILGlEQUpEOztBQU1BckUsMERBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixpQkFBdEIsRUFBeUMsVUFBU0MsQ0FBVCxFQUFZO0FBQ2pELG9FQUFJK1UsV0FBVy9ULFFBQVgsQ0FBb0IsWUFBcEIsQ0FBSixFQUF1QztBQUNuQytULDJGQUFXbFUsV0FBWCxDQUF1QixZQUF2QjtBQUNILGlFQUZELE1BRU87QUFDSGtVLDJGQUFXaFUsUUFBWCxDQUFvQixZQUFwQjtBQUNIO0FBQ0RmLGtFQUFFbUYsZUFBRjtBQUNBbkYsa0VBQUVDLGNBQUY7QUFDSCxpREFSRDtBQVNBO0FBQ0F0RCxrREFBRSx1QkFBRixFQUEyQm9ELEVBQTNCLENBQThCLGtCQUE5QixFQUFrRCxZQUFXO0FBQ3pEZ1YsMkVBQVdsVSxXQUFYLENBQXVCLFlBQXZCO0FBQ0gsaURBRkQ7QUFHSDtBQUNKLGlCQS9DUTtBQWdEVGlVLDhCQUFjLHdCQUFXO0FBQ3JCalksMENBQVVrRCxFQUFWLENBQWEsT0FBYixFQUFzQixjQUF0QixFQUFzQyxVQUFTQyxDQUFULEVBQVk7QUFDOUMsb0RBQUlnVixVQUFVclksRUFBRXFELEVBQUVxSSxNQUFKLENBQWQ7QUFDQSxvREFBSTdHLFVBQVU3RSxFQUFFLElBQUYsRUFBUThFLE9BQVIsQ0FBZ0IsY0FBaEIsQ0FBZDtBQUNBLG9EQUFJd1QsY0FBY3pULFFBQ2I1RCxJQURhLENBQ1IsaUJBRFEsRUFFYmdGLE1BRmEsQ0FFTixzQkFGTSxDQUFsQjs7QUFJQSxvREFBSW9TLFFBQVFsVSxFQUFSLENBQVcsdUJBQVgsQ0FBSixFQUF5QztBQUNyQyxvRUFBSVUsUUFBUVIsUUFBUixDQUFpQixZQUFqQixDQUFKLEVBQW9DO0FBQ2hDUSx3RkFBUVgsV0FBUixDQUFvQixZQUFwQjtBQUNBb1UsNEZBQVlsVSxRQUFaLENBQXFCLFdBQXJCO0FBQ0FwRSxrRkFBRSxJQUFGLEVBQ0tpQixJQURMLENBQ1UsdUJBRFYsRUFFS21GLElBRkwsQ0FFVSxLQUZWO0FBR0gsaUVBTkQsTUFNTztBQUNIdkIsd0ZBQVFULFFBQVIsQ0FBaUIsWUFBakI7QUFDQWtVLDRGQUFZcFUsV0FBWixDQUF3QixXQUF4QjtBQUNBbEUsa0ZBQUUsSUFBRixFQUNLaUIsSUFETCxDQUNVLHVCQURWLEVBRUttRixJQUZMLENBRVUsUUFGVjtBQUdIO0FBQ0o7QUFDSixpQ0F0QkQ7QUF1Qkg7QUF4RVEsQ0FBYjs7QUEyRUFwRyxFQUFFLFlBQVc7QUFDVEEsa0JBQUVrQixLQUFLQyxJQUFMLEVBQUY7QUFDQW5CLGtCQUFFdVMsSUFBSXBSLElBQUosRUFBRjtBQUNILENBSEQ7O0FBS0E7OztBQUdBO0FBQ0EsU0FBU21KLE1BQVQsQ0FBZ0JpTyxPQUFoQixFQUF5QjtBQUNyQixvQkFBSW5TLE9BQU9tUyxRQUFRblMsSUFBUixJQUFnQixrQkFBM0I7QUFDQSxvQkFBSWlFLFNBQVNrTyxRQUFRbE8sTUFBUixJQUFrQixTQUEvQjs7QUFFQSxvQkFBSW1PLGdCQUFnQnhZLEVBQUUsT0FBRixFQUFXb0UsUUFBWCxDQUFvQixXQUFwQixDQUFwQjtBQUNBLG9CQUFJcVUsY0FBY3pZLEVBQUUsOEJBQUYsRUFBa0NvRSxRQUFsQyxDQUNkLG1DQURjLENBQWxCOztBQUlBb1UsOEJBQWN4TixRQUFkLENBQXVCaEwsRUFBRSxNQUFGLENBQXZCO0FBQ0F3WSw4QkFBY3BTLElBQWQsQ0FBbUJBLElBQW5CO0FBQ0FxUyw0QkFBWXpOLFFBQVosQ0FBcUJ3TixhQUFyQjs7QUFFQSxvQkFBSW5PLFdBQVcsT0FBZixFQUF3QjtBQUNwQm1PLDhDQUFjcFUsUUFBZCxDQUF1QixVQUF2QjtBQUNILGlCQUZELE1BRU87QUFDSG9VLDhDQUFjcFUsUUFBZCxDQUF1QixZQUF2QjtBQUNIOztBQUVEc1U7O0FBRUFDLG9CQUFJLFlBQVc7QUFDWEgsOENBQWNwVSxRQUFkLENBQXVCLFdBQXZCO0FBQ0gsaUJBRkQ7O0FBSUFILDJCQUFXLFlBQVc7QUFDbEJ1VSw4Q0FBY3RVLFdBQWQsQ0FBMEIsV0FBMUI7QUFDQXdVO0FBQ0gsaUJBSEQsRUFHRyxJQUhIOztBQUtBelUsMkJBQVcsWUFBVztBQUNsQnVVLDhDQUFjdE4sTUFBZDtBQUNBd047QUFDSCxpQkFIRCxFQUdHLElBSEg7O0FBS0ExWSxrQkFBRUcsUUFBRixFQUFZaUQsRUFBWixDQUFlLE9BQWYsRUFBd0IsbUJBQXhCLEVBQTZDLFlBQVc7QUFDcEQsb0NBQUl5QixVQUFVN0UsRUFBRSxJQUFGLEVBQVE4RSxPQUFSLENBQWdCLFlBQWhCLENBQWQ7QUFDQUQsd0NBQVFYLFdBQVIsQ0FBb0IsV0FBcEI7QUFDQUQsMkNBQVcsWUFBVztBQUNsQlksd0RBQVFxRyxNQUFSO0FBQ0gsaUNBRkQsRUFFRyxHQUZIO0FBR0F3TjtBQUNILGlCQVBEOztBQVNBLHlCQUFTQSxPQUFULEdBQW1CO0FBQ2YxWSxrQ0FBRSxZQUFGLEVBQWdCMkUsSUFBaEIsQ0FBcUIsVUFBU3RCLENBQVQsRUFBWTtBQUM3QixvREFBSTBHLFNBQVMvSixFQUFFLFlBQUYsRUFBZ0IwVSxXQUFoQixDQUE0QixJQUE1QixDQUFiO0FBQ0ExVSxrREFBRSxJQUFGLEVBQVFtRixHQUFSLENBQVksS0FBWixFQUFtQjRFLFNBQVMxRyxDQUFULEdBQWEsRUFBYixHQUFrQkEsQ0FBckM7QUFDSCxpQ0FIRDtBQUlIO0FBQ0o7O0FBRUQ7QUFDQSxTQUFTc1YsR0FBVCxDQUFhQyxFQUFiLEVBQWlCO0FBQ2IzWSx1QkFBTzRZLHFCQUFQLENBQTZCLFlBQVc7QUFDcEM1WSx1Q0FBTzRZLHFCQUFQLENBQTZCLFlBQVc7QUFDcENEO0FBQ0gsaUNBRkQ7QUFHSCxpQkFKRDtBQUtIOztBQUVEO0FBQ0EsU0FBU0UsWUFBVCxDQUFzQkMsUUFBdEIsRUFBZ0M7QUFDNUIsb0JBQUlDLE9BQU83WSxTQUFTOFksZ0JBQVQsQ0FBMEJGLFFBQTFCLENBQVg7QUFDQSxvQkFBSUcsTUFBTSxJQUFJQyxJQUFKLEVBQVY7QUFBQSxvQkFDSUMsSUFBSUYsSUFBSUcsT0FBSixFQURSO0FBQUEsb0JBRUlDLElBQUlKLElBQUlLLFFBQUosS0FBaUIsQ0FGekI7QUFBQSxvQkFHSUMsSUFBSU4sSUFBSU8sV0FBSixFQUhSO0FBQUEsb0JBSUl6VSxhQUpKOztBQU1BLG9CQUFJb1UsSUFBSSxFQUFSLEVBQVk7QUFDUkEsb0NBQUksTUFBTUEsQ0FBVjtBQUNIO0FBQ0Qsb0JBQUlFLElBQUksRUFBUixFQUFZO0FBQ1JBLG9DQUFJLE1BQU1BLENBQVY7QUFDSDs7QUFFRHRVLHVCQUFPd1UsSUFBSSxHQUFKLEdBQVVGLENBQVYsR0FBYyxHQUFkLEdBQW9CRixDQUEzQjs7QUFFQSxxQkFBSyxJQUFJL1EsSUFBSSxDQUFSLEVBQVdxUixNQUFNVixLQUFLelYsTUFBM0IsRUFBbUM4RSxJQUFJcVIsR0FBdkMsRUFBNENyUixHQUE1QyxFQUFpRDtBQUM3QzJRLHFDQUFLM1EsQ0FBTCxFQUFRa0YsS0FBUixHQUFnQnZJLElBQWhCO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLFNBQVNrUixtQkFBVCxDQUE2QnlELEtBQTdCLEVBQW9DQyxFQUFwQyxFQUF3QztBQUNwQzVaLGtCQUFFMlosUUFBUSxRQUFWLEVBQW9CdlcsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBVztBQUN2Q3BELGtDQUFFMlosS0FBRixFQUFTdlYsUUFBVCxDQUFrQndWLEVBQWxCO0FBQ0gsaUJBRkQ7QUFHQTVaLGtCQUFFMlosUUFBUSxTQUFWLEVBQXFCdlcsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4Q3BELGtDQUFFMlosS0FBRixFQUFTelYsV0FBVCxDQUFxQjBWLEVBQXJCO0FBQ0gsaUJBRkQ7QUFHSDs7QUFFRCxTQUFTaFIsY0FBVCxDQUF3QitRLEtBQXhCLEVBQStCQyxFQUEvQixFQUFtQztBQUMvQjVaLGtCQUFFMlosS0FBRixFQUFTdlcsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBVztBQUM1QnBELGtDQUFFLElBQUYsRUFBUTZMLFdBQVIsQ0FBb0IrTixFQUFwQjtBQUNILGlCQUZEOztBQUlBNVosa0JBQUVHLFFBQUYsRUFBWWlELEVBQVosQ0FBZSw0QkFBZixFQUE2QyxVQUFTQyxDQUFULEVBQVk7QUFDckQsb0NBQUlyRCxFQUFFcUQsRUFBRXFJLE1BQUosRUFBWTVHLE9BQVosQ0FBb0I2VSxLQUFwQixFQUEyQnBXLE1BQS9CLEVBQXVDO0FBQ3ZDdkQsa0NBQUUyWixLQUFGLEVBQVN6VixXQUFULENBQXFCMFYsRUFBckI7QUFDQXZXLGtDQUFFbUYsZUFBRjtBQUNILGlCQUpEO0FBS0giLCJmaWxlIjoiY2FiaW5ldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcnNcclxuY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcclxuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XHJcbmNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xyXG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcclxuY29uc3QgJHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xyXG5jb25zdCAkb3ZlcmxheSA9ICQoJy5vdmVybGF5Jyk7XHJcbmNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbmNvbnN0ICRtYWluID0gJCgnLmNhYmluZXQnKTtcclxuXHJcbi8vTWVudSB2YXJzXHJcbmNvbnN0ICRtZW51ID0gJCgnLmpzLW1lbnUnKTtcclxuY29uc3QgJG5hdk1vYmlsZSA9ICQoJy5qcy1tb2JpbGUtbmF2Jyk7XHJcbmNvbnN0ICRoYW1idXJnZXIgPSAkKCcuanMtbWFpbi1uYXYtYnRuJyk7XHJcbmNvbnN0ICRoYW1idXJnZXJDcm0gPSAkKCcuanMtaGFtYnVyZ2VyJyk7XHJcbmNvbnN0ICRtZW51T3ZlbGF5ID0gJCgnLmpzLW1lbnUtb3ZlcmxheScpO1xyXG5jb25zdCAkbWVudUl0ZW1Ecm9wZG93biA9ICQoJy5qcy1tZW51LWl0ZW0tZHJvcGRvd24nKTtcclxuY29uc3QgJGJ0bkZsb2F0ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcbi8qKlxyXG5cclxuICogQmFzZS5qc1xyXG5cclxuICpcclxuXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcblxyXG4gKi9cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blB1c2goKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC53aG9JcygpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vSW5pdCBtb2R1bGVzXHJcblxyXG4gICAgICAgIC8vIFRhYi5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gU2VsZWN0LmluaXQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuY2xpY2tPdXNpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZWFyY2hCdG5PcGVuQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xyXG5cclxuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNjcm9sbEJhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjNTg1YTU5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICcycHgnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5vbignbW91c2VvdmVyIG1vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcblxyXG4gICAgcmVtb3ZlUHJlbG9hZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuXHJcbiAgICBjaGVja2JveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9CQiBjaGVja2JveCBwc2V1ZG9cclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL1NlbGVjdCBBbGwgQ2hlY2tib3hcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIGFjY29yZGVvblxyXG5cclxuICAgIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkYWNjb3JkZW9uID0gJCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQWNjb3JkZW9uIGNvbGxhcHNlXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgZVxyXG5cclxuICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWxpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RUb2dnbGUoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSAkKCcuanMtbGlzdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtMaXN0ID0gbGlzdC5maW5kKCcuanMtbGlzdC10b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ29weSB0ZXh0IGNsaWNrIGxpbmtcclxuXHJcbiAgICBjb3B5VGV4dDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL2lmIGhhcyBpbnB1dCB0aGVuIGNvcHkgaW5wdXQgdmFsdWUgaW4gZGF0YSBhdHRyXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ib3gnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaW5wdXRJY29uID0gJHBhcmVudC5maW5kKCcuYmItaW5wdXRfX2ljb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgPSAkcGFyZW50LmZpbmQoJy5qcy1pbnB1dC0tY2xlYXInKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaGludCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuID0gJHBhcmVudC5maW5kKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuRGF0YSA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dFZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWlucHV0LS1jbGVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZU91dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX2ljb24nKVxyXG5cclxuICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9TaG93IHBob25lIG51bWJlclxyXG5cclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuanMtdXNlci1waG9uZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQoJCh0aGlzKS5kYXRhKCdwaG9uZS1oaWRlbicpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy11c2VyLXBob25lLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdXNlclBob25lID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtdXNlci1waG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBob25lID0gdXNlclBob25lLmRhdGEoJ3Bob25lJyk7XHJcblxyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ3RlbDonICsgcGhvbmUpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2l0eSBzZWxlY3RcclxuXHJcbiAgICBjaGFuZ2VDaXR5OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHkgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHlUaXRsZSA9IGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X190aXRsZSBzcGFuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VDaXR5VGl0bGUudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcblxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtYmItc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZHMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICRwcmV2QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICRuZXh0QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2F0YWxvZyBJdGVtIFNsaWRlclxyXG5cclxuICAgIGNhdGFsb2dJdGVtU2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNhdGFsb2dJdGVtU2xpZGVyID0gJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHRhYjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iYi10YWInKS50YWJzKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBib2R5Rml4OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYm9keVVuRml4OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uczoge1xyXG5cclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG5cclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG5cclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcblxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcnVuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gJHdpbmRvdy5oZWlnaHQoKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChzY3JvbGxIZWlnaHQgLSBzY3JvbGxQb3NpdGlvbikgLyBzY3JvbGxIZWlnaHQgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcygnaXMtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyb3Bkb3duOiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZFNjcm9sbCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd0hpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJGRvY3VtZW50LmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCBfdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0bkZsb2F0aW5nID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHN0eWxlID0ge1xyXG5cclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG5cclxuICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxyXG5cclxuICAgICAgICAgICAgICAgIGJvdHRvbTogMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgbGVmdDogMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDEwLFxyXG5cclxuICAgICAgICAgICAgICAgIHpJbmRleDogOTk5OVxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IF90aGlzLCAkbGlzdDtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5pcygnLmJiLWRyb3Bkb3duX19vdmVybGF5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90b2dnbGVEZXNrKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaXN0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLndyYXBwZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHN0eWxlKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ190cmFuc2Zvcm0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpc3QuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3JlbW92ZVN0eWxlTW9iKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgJy5iYi1kcm9wZG93bl9fbGlzdCAuaW5mby1ibG9ja19faXRlbScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3JlbW92ZVN0eWxlTW9iKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9yZW1vdmVTdHlsZU1vYigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF90b2dnbGVEZXNrKGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVTdHlsZU1vYigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkbGlzdC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbGlzdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnX3RyYW5zZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oX3RoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRTY3JvbGw6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICR3aW5kb3cuaW5uZXJIZWlnaHQoKSAvIDIpO1xyXG5cclxuICAgICAgICAvLyAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGlzdCA9IF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCB0b3AgPSBfdGhpcy5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAodG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIHRvcCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgMSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJCh0aGlzKS5vZmZzZXQoKS50b3ApO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsaXN0LmNzcyh7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0czoge1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuXHJcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtdGltZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTo5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29kZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvZGUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ljk5Ljk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvbmZpcm0tbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZW1haWwtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1lbWFpbC1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqezEsMjB9Wy4qezEsMjB9XVsuKnsxLDIwfV1bLip7MSwyMH1dQCp7MSwyMH1bLip7Miw2fV1bLip7MSwyfV0nLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzdGVkVmFsdWUgPSBwYXN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhc3RlZFZhbHVlLnJlcGxhY2UoJ21haWx0bzonLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEteiEjJCUmJyorLz0/Xl9ge3x9fi1dXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiAnbG93ZXInXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtY29weS10ZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLXNoYXJlX19saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9DbGljayBpbnB1dCBzZWxlY3QgdmFsdWVcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC1mb2N1cy0tY29weScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0VkaXQgVGV4dCBGaWVsZFxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1maWVsZC1lZGl0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdCA9ICQoJy5qcy1maWVsZC1lZGl0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRCdG4gPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2J0bicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0LnNob3coKS5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09ICcxMycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLWlucHV0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWlucHV0LXRpcCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1pbmZvIGlzLWVycm9yIGlzLWludmFsaWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJCh0aGlzKS5maW5kKCcuanMtbW9iaWxlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2VsZWN0OiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLW11bHRpcGxlJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFnczogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QuYmItc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tc2VydmljZXMnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogdGltZUFuZFByaWNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiB0aW1lQW5kUHJpY2VcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtYm9ybicpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIG1lbnRybyBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1NlbGVjdCBBZGQgUHJpY2UgVGltZSAmIFByaWNlXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0aW1lQW5kUHJpY2Uob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsVGltZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxQcmljZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3ByaWNlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdC50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRpbWUgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2UgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9ICQodGhpcykuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbjpmaXJzdC1jaGlsZCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53cmFwKCc8bGFiZWwgY2xhc3M9XCJiYi1zZWxlY3RcIj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmljb25TZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1llYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVllYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVzZXRCdG4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVDb2RlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpY29uU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaWNvblNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1pY29uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRpY29uU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC0tc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaWZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0ljb24gZm9udGF3ZXNvbWUgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaWZvcm1hdChpY29uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsT3B0aW9uID0gaWNvbi5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4+PGkgY2xhc3M9XCJzZWxlY3QyX19pY29uJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvcmlnaW5hbE9wdGlvbikuZGF0YSgnaWNvbicpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj48L2k+ICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbG9yU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkY29sb3JTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0tY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNvbG9yU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QtY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzZWFyY2gtZW5hYmxlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29sb3IgYmFsbCBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaUJhbGwoY29sb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRvcmlnaW5hbE9wdGlvbiA9IGNvbG9yLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvckJhbGwgPSAkKCRvcmlnaW5hbE9wdGlvbikuZGF0YSgnY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IudGV4dC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19saW5lXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH1cIj48L3NwYW4+PHA+ICR7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLnRleHRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDwvcD48L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2JhbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfSBcIj4gPC9zcGFuPiA8L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXNldC15ZWFyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZVllYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICR5ZWFyU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC1ib3JuLS1jbGVhcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub2ZmKCdzZWxlY3QyOm9wZW5pbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKCkgPT0gJycgJiZcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJvcm4nKSA9PT0gJ3llYXInXHJcblxyXG4gICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZGF0ZVNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRhdGVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGhvbmVDb2RlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHNlbGVjdCByZXN1bHRzIHRvIG9wdGlvbiB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVNlbGVjdGlvbihvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0VmFsID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArIG9wdFZhbCArICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGNpdHkgbmFtZSB0byBvcHRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVSZXN1bHQob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50cnkgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdjb3VudHJ5JyksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRWYWwgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0ICRwaG9uZUNvZGVCb3ggPSAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0LXBob25lLWNvZGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHBob25lQ29kZUJveC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnNlbGVjdC12YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJy5iYi1pbnB1dF9faW5wdXQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHNlbGVjdENvZGVSZXN1bHQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBzZWxlY3RDb2RlU2VsZWN0aW9uLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWlucHV0LS1zZWxlY3QtdmFsdWVcIj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvblNlbGVjdCA9ICRwYXJlbnQuZmluZCgnb3B0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0VmFsdWUgPSAkcGFyZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5iYi1pbnB1dC0tc2VsZWN0LXZhbHVlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoMCkudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9ICQodGhpcylbMF0uc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcShjb3VudGVyKS52YWwoKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogJyg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdmb2N1cycsIGFkZEZvY3VzKS5vbignYmx1cicsIHJlbW92ZUZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOm9wZW4nLCBhZGRGb2N1cylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpjbG9zZScsIHJlbW92ZUZvY3VzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUZvY3VzKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW92ZS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vdmUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW92ZS1zZWxlY3RfX3Jlc3VsdCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBtZW51OiB7XHJcblxyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG5cclxuICAgICAgICBoYW1idXJnZXJCdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fYWRkU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vV2hlbiBDbGljayBPdXRzaWRlIENsb3NlIE1lbnVcclxuXHJcbiAgICAgICAgY2xpY2tPdXNpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmpzLW1vYmlsZS1uYXYsIC5qcy1kYXRlLCAuZGF0ZXBpY2tlciwgLmNhcmQtaW5mb19fcmVxdWVzdCwgLmNhdGFsb2ctZmlsdGVyLCAuanMtbW9iaWxlLWZpbHRlci0tb3BlbiwgLmpzLWJiLWFjY29yZGVvbidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5vdmVybGF5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCBCdG4gb3Blbi9jbG9zZVxyXG5cclxuICAgICAgICBzZWFyY2hCdG5PcGVuQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlYXJjaEJ0biA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLWJ0bicpO1xyXG5cclxuICAgICAgICAgICAgc2VhcmNoQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hZGRTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcG9wdXA6IHtcclxuXHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG5cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZDogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlc1wiXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2ZhbmN5Ym94LWNvbnRhaW5lci0taW1hZ2UnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrQ29udGVudDogJ2Nsb3NlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGU6ICdjbG9zZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0bjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNtYWxsQnRuOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuXHJcbiAgICAgICAgd2hvSXM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXdob2lzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gJCgnI2F1dGgtZm9ybScpLmZpbmQoJy5mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdob2lzID09PSAnbWFzdGVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdob2lzID09PSAnc3R1ZGlvJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1zdHVkaW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1jbGllbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9EdW5hbWljbHkgY2hhbmdlIGZvcm0gdGl0bGVcclxuXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBDcm0uanNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IENybSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY29udHJvbEJveCgpO1xyXG5cclxuICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQ3JtKCk7XHJcbiAgICAgICAgdGhpcy5tZW51Lm1lbnVJdGVtRHJvcGRvd24oKTtcclxuICAgICAgICB0aGlzLm1lbnUuY2xpY2tPdXRzaWRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVycy50cml1bXBoKCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJzLnNsaWRlclBvcHVwUmVpbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMubW9iaWxlQmxvY2suYm9keVBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVCbG9jay5yZXF1ZXN0SXRlbUNsaWNrKCk7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVCbG9jay5jYWxsQXBsaWNhdGlvbk1vYmlsZUJsb2NrKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JhcGhpYy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhci5pbml0KCk7XHJcblxyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmluaXQoKTtcclxuICAgICAgICBDcm0ucmVxdWVzdC5pbml0KCk7XHJcbiAgICAgICAgQ3JtLnN0ZXBzLmluaXQoKTtcclxuICAgICAgICBDcm0uc3R1ZGlvLmluaXQoKTtcclxuICAgICAgICBDcm0uc2VydmljZXMuaW5pdCgpO1xyXG5cclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgIG5ldyBXT1coKS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJveFJlc2l6ZSgpO1xyXG4gICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBDcm0uYm94UmVzaXplKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgY29udHJvbEJveDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtY29udHJvbC1ib3gtYnRuJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtY29udHJvbC1ib3gnKVxyXG4gICAgICAgICAgICAgICAgLnNsaWRlVG9nZ2xlKHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBib3hSZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ2JnLS1kYXJrJyk7XHJcbiAgICAgICAgICAgICRtZW51LmFkZENsYXNzKCdiZy0td2hpdGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNvbnRyb2wtYm94Jykuc2xpZGVVcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2JnLS1kYXJrJyk7XHJcbiAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdiZy0td2hpdGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWVudToge1xyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG4gICAgICAgIGhhbWJ1cmdlckNybTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRoYW1idXJnZXJDcm0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLm1lbnUucmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1lbnUuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdpcy1tb3ZpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vYmlsZU5hdkJ0bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy1tb2JpbGUtbmF2LWJ0bicpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBDcm0ubWVudS5yZW1vdmVTdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL1doZW4gY2xpY2sgb3V0c2lkZSBNZW51IGRvIHRoaXNcclxuICAgICAgICBjbGlja091dHNpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tYWluLW5hdi1idG4sIC5qcy1tb2JpbGUtbmF2LCAubWVudS1kcm9wZG93biwgLmpzLW1lbnUtaXRlbS1kcm9wZG93biwgLmpzLWhhbWJ1cmdlcidcclxuICAgICAgICAgICAgICAgICAgICApLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmICgkbWVudS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhhbWJ1cmdlci5yZW1vdmVDbGFzcygnb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAkaGFtYnVyZ2VyQ3JtLnJlbW92ZUNsYXNzKCdvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtbmF2LS1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBDcm0ubWVudS5yZW1vdmVTdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIENybS5tZW51LnJlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkbWVudU92ZWxheS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL01lbnUgZHJvcGRvd25cclxuICAgICAgICBtZW51SXRlbURyb3Bkb3duOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJG1lbnVJdGVtRHJvcGRvd24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaGFtYnVyZ2VyQ3JtLnJlbW92ZUNsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGJ0bkZsb2F0LmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRtZW51T3ZlbGF5LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRoYW1idXJnZXJDcm0ucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtZW51LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdC5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRtZW51T3ZlbGF5LmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbWVudUl0ZW1Ecm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtbW92aW5nJyk7XHJcbiAgICAgICAgICAgIENybS5tZW51Lmh0bWxSZW1vdmVTdHlsZSgpO1xyXG4gICAgICAgICAgICAkYnRuRmxvYXQuZmFkZUluKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBodG1sUmVtb3ZlU3R5bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1tb2JpbGUtbmF2LWJ0biwgLmpzLW1vYmlsZS1uYXYsIC5qcy1tb2JpbGUtYmxvY2stLXNob3csIC5qcy1yZXF1ZXN0LWl0ZW0nXHJcbiAgICAgICAgICAgICAgICAgICAgKS5sZW5ndGhcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNsaWRlcnM6IHtcclxuICAgICAgICAvL1RyaXVtcGggc2xpZGVyXHJcbiAgICAgICAgdHJpdW1waDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkc2xpZGVyID0gJCgnLmpzLWJiLXNsaWRlci0tdHJpdW1waCcpO1xyXG4gICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5OZXh0ID0gJCh0aGlzKS5maW5kKCcuanMtYmItc2xpZGVyLWJ0bi0tbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNsaWRlICsgMSA9PT0gc2xpY2suc2xpZGVDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuTmV4dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljaygnc2xpY2tOZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRidG5OZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMuc2xpY2soJ3NsaWNrTmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9EaXNhYmxlIGNoYW5nZSBzbGlkZSBvbiBjbGljayBkb3RzXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyLmZpbmQoJy5zbGljay1kb3RzIGxpIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy9SZWluaXQgc2xpZGVyIGFmdGVyIHBvcHVwIG9wZW5cclxuICAgICAgICBzbGlkZXJQb3B1cFJlaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5tb2RhbCcpLm9uKCdzaG93bi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlclswXS5zbGljay5zZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbW9iaWxlQmxvY2s6IHtcclxuICAgICAgICBib2R5UG9zaXRpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcnJlbnQgPSAkKCcuanMtbW9iaWxlLWJsb2NrJyk7XHJcbiAgICAgICAgICAgIGxldCAkZm9vdGVyID0gJHBhcnJlbnQuY2hpbGRyZW4oJy5tb2JpbGUtYmxvY2tfX2Zvb3RlcicpO1xyXG4gICAgICAgICAgICAkcGFycmVudFxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19ib2R5JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2JvdHRvbScsICRmb290ZXIub3V0ZXJIZWlnaHQodHJ1ZSkpO1xyXG5cclxuICAgICAgICAgICAgJHBhcnJlbnQuZmluZCgnLm1vYmlsZS1ibG9ja19fYm94JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19mb290ZXInKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLm1vYmlsZS1ibG9ja19fYm9keScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYm90dG9tJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5tb2JpbGUtYmxvY2tfX2JveCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcubW9iaWxlLWJsb2NrX19mb290ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vdXRlckhlaWdodCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vU2hvdyAvIEhpZGUgbW9iaWxlIGFwbGljYXRpb25cclxuICAgICAgICBjYWxsQXBsaWNhdGlvbk1vYmlsZUJsb2NrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGJ0biA9ICcuanMtbW92ZS1ibG9jay0tc2hvdyc7XHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJGRvY3VtZW50LmZpbmQoYnRuKTtcclxuXHJcbiAgICAgICAgICAgICRidG4uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkd2luZG93LndpZHRoKCkgPD0gNDgwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oYXNDbGFzcygncmVxdWVzdC1pdGVtJylcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1tb3ZlLWJsb2NrLXRhcmdldCcsICdyZXF1ZXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGJ0biwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bklkID0gJCh0aGlzKS5hdHRyKCdkYXRhLW1vdmUtYmxvY2stdGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnW2RhdGEtbW92ZS1ibG9ja10nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoJ1tkYXRhLW1vdmUtYmxvY2s9JyArIGJ0bklkICsgJ10nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFkZENsYXNzKCdpcy1maXhlZCcpLmNzcygncG9zaXRpb24nLCAnZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgQ3JtLm1vYmlsZUJsb2NrLmJvZHlQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLW1vdmUtYmxvY2stYm94LS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcubW92ZS1ibG9ja19fYm94JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBDcm0ubW9iaWxlQmxvY2suYm9keVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtbW92ZS1ibG9jay0tY2xvc2UnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5tb3ZlLWJsb2NrJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIGJvZHlGaXhlZCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBib2R5Rml4ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRkb2N1bWVudC5maW5kKCcuanMtbW92ZS1ibG9jaycpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL0NsaWNrIHJlcXVlc3QgaXRlbVxyXG4gICAgICAgIHJlcXVlc3RJdGVtQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1yZXF1ZXN0LWl0ZW0nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLW1vdmUtYmxvY2stYXBsaWNhdGlvbicpLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkZG9jdW1lbnQub24oXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgICAgICAgICAgICAnLmpzLW1vdmUtYmxvY2stYXBsaWNhdGlvbi0tY2xvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtbW92ZS1ibG9jay1hcGxpY2F0aW9uJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ3JhcGhpYzoge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV0ZWN0SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH0sIDE1MDApO1xyXG5cclxuICAgICAgICAgICAgJHdpbmRvdy5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBDcm0uZ3JhcGhpYy5kZXRlY3RIZWlnaHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXRlY3RIZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHRhYmxlID0gJGRvY3VtZW50LmZpbmQoJy5qcy1ncmFwaC10YWJsZScpO1xyXG5cclxuICAgICAgICAgICAgJHRhYmxlLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRhYmxlV29ya2VyID0gJCh0aGlzKS5maW5kKCcuZ3JhcGgtdGFibGVfX3dvcmtlcicpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICR0YWJsZVdvcmtlclRyID0gJHRhYmxlV29ya2VyLmZpbmQoJ3RyJykubm90KCc6Zmlyc3QnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkdGFibGVIb3VycyA9ICQodGhpcykuZmluZCgnLmdyYXBoLXRhYmxlX19ob3VycycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICR0YWJsZUhvdXJzVHIgPSAkdGFibGVIb3Vycy5maW5kKCd0cicpLm5vdCgnOmZpcnN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRhYmxlSG91cnNUci5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEhvdXJzSXRlbSA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1ncmFwaC10YWJsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZ3JhcGgtdGFibGVfX3dvcmtlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCd0cicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0KCQodGhpcyksIGN1cnJlbnRIb3Vyc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRhYmxlV29ya2VyVHIuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRXb3JrZXJJdGVtID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWdyYXBoLXRhYmxlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5ncmFwaC10YWJsZV9faG91cnMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgndHInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubm90KCc6Zmlyc3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCgkKHRoaXMpLCBjdXJyZW50V29ya2VySXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXhIZWlnaHQoX3RoaXMsIGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEhlaWdodCA9IF90aGlzLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRIZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0ID0gY3VycmVudEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRIZWlnaHQgPiBlbGVtLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jc3MoJ2hlaWdodCcsIG1heEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FsZW5kYXI6IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQmxvY2soKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdmVCbG9jazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNhbGVuZGFyX192aWV3JykuYXBwZW5kVG8oJy5jYWxlbmRhcl9fc29ydGluZycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNhbGVuZGFyX192aWV3JykuYXBwZW5kVG8oJy5qcy1jb250cm9sLWJveCcpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvbnRyb2wtYm94JykuYXBwZW5kVG8oJy5jYWxlbmRhcl9fc29ydGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENybSBBcGxpY2F0aW9uXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5Dcm0uYXBsaWNhdGlvbiA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmFwbGljYXRpb25UYWIoKTtcclxuICAgICAgICBDcm0uYXBsaWNhdGlvbi5zaG93TmV3Q2xpZW5Gb3JtKCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uc2hvd0FwbGljYXRpb25JdGVtT3B0aW9ucygpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLmFwbGljYXRpb25JdGVtQ291bnRlcigpO1xyXG4gICAgICAgIENybS5hcGxpY2F0aW9uLnNlbGVjdFNob3dTZXJ2aWNlKCk7XHJcbiAgICAgICAgQ3JtLmFwbGljYXRpb24uYXBsaWNhdGlvbkl0ZW1SZXNldCgpO1xyXG5cclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG4gICAgICAgICAgICBDcm0uYXBsaWNhdGlvbi5zZWFyY2hPdmVybGF5LmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9Jbml0IEFwbGljYXRpb24gdGFic1xyXG4gICAgYXBsaWNhdGlvblRhYjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRhcGxpY2F0aW9uVGFiID0gJCgnLmpzLWJiLXRhYi5hcGxpY2F0aW9uLXN1Y2Nlc3NfX3RhYicpO1xyXG5cclxuICAgICAgICAvL0lmIGFwbGljYXRpb24gdGFiIGNoYXQgdGhlbiBoaWRlIGFwbGljYXRpb24gYnRuc1xyXG4gICAgICAgICRhcGxpY2F0aW9uVGFiLmZpbmQoJy50YWJfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGJ0biA9ICQoJy5hcGxpY2F0aW9uX19idG5zJyk7XHJcbiAgICAgICAgICAgIGxldCBibG9ja0Zvb3RlciA9ICQoJy5qcy1tb3ZlLWJsb2NrJylcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLm1vdmUtYmxvY2tfX2JveCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLm1vdmUtYmxvY2tfX2Zvb3RlcicpO1xyXG4gICAgICAgICAgICBsZXQgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGhyZWYgPT09ICcjYXBsaWNhdGlvbi1jaGF0Jykge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrRm9vdGVyLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBibG9ja0Zvb3Rlci5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIENybS5tb2JpbGVCbG9jay5ib2R5UG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zY3JvbGwnKVxyXG4gICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxyXG4gICAgICAgICAgICAgICAgLnJlc2l6ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU2hvdyBOZXcgQ2xpZW50IEZvcm1cclxuICAgIHNob3dOZXdDbGllbkZvcm06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFkZFJlbW92ZUNsYXNzQmxvY2soJy5qcy1uZXctY2xpZW50JywgJ2lzLW9wZW4nKTtcclxuICAgIH0sXHJcbiAgICAvL1doZW4gY2xpY2sgYnRuIGVkaXRcclxuICAgIHNob3dBcGxpY2F0aW9uSXRlbU9wdGlvbnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFwbGljYXRpb24taXRlbS0tZWRpdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtYXBsaWNhdGlvbi1pdGVtLXNlcnZpY2UnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9fd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9Db3VudGVyIGluaXQgZnVuY3Rpb25cclxuICAgIGFwbGljYXRpb25JdGVtQ291bnRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWFwbGljYXRpb24taXRlbScpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FwbGljYXRpb24taXRlbS0tc2hvcnQnKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYXBsaWNhdGlvbi1pdGVtX19jb3VudGVyJylcclxuICAgICAgICAgICAgICAgICAgICAudGV4dChlICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL0FmdGVyIHNlbGVjdCBtYXN0ZXIgY2hhbmdlXHJcbiAgICBzZWxlY3RTaG93U2VydmljZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdzZWxlY3QyOnNlbGVjdCcsICcuanMtc2VsZWN0LXNob3ctc2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcnJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hcGxpY2F0aW9uLWl0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKCRwYXJyZW50Lmhhc0NsYXNzKCdhcGxpY2F0aW9uLWl0ZW0tLXNob3J0JykpIHtcclxuICAgICAgICAgICAgICAgICRwYXJyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWRlRG93bih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS1idG4tLXJlc2V0JylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJHBhcnJlbnQucmVtb3ZlQ2xhc3MoJ2FwbGljYXRpb24taXRlbS0tc2hvcnQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRwYXJyZW50LmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpLnNsaWRlRG93bih7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ3JtLmFwbGljYXRpb24uYXBsaWNhdGlvbkl0ZW1Db3VudGVyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9BcGxpY2F0aW9uIGl0ZW0gcmVzZXRcclxuICAgIGFwbGljYXRpb25JdGVtUmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFwbGljYXRpb24taXRlbS1idG4tLXJlc2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkcGFycmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWFwbGljYXRpb24taXRlbScpO1xyXG4gICAgICAgICAgICBpZiAoISRwYXJyZW50Lmhhc0NsYXNzKCdhcGxpY2F0aW9uLWl0ZW0tLXNob3J0JykpIHtcclxuICAgICAgICAgICAgICAgICRwYXJyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhcGxpY2F0aW9uLWl0ZW0tLXNob3J0JylcclxuICAgICAgICAgICAgICAgICAgICAuZmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1zZWxlY3QtLW1hc3RlciwgLmpzLXNlbGVjdC0tdGltZSwgLmpzLXNlbGVjdC1kdXInXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC52YWwoJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tYnRuLS1yZXNldCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLXNlcnZpY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKClcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWlucHV0X193cmFwJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tLWVkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC52YWwoJycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5hcGxpY2F0aW9uLWl0ZW1fX2NvdW50ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKCcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU2VyY2ggZm9jdXMgc2hvdyBjbGllbnQgKyBvdmVybGF5XHJcbiAgICBzZWFyY2hPdmVybGF5OiB7XHJcbiAgICAgICAgZWw6IHtcclxuICAgICAgICAgICAgJGlucHV0OiAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5LWlucHV0JyksXHJcbiAgICAgICAgICAgICRvdmVybGF5OiAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5JyksXHJcbiAgICAgICAgICAgICRhcGxpY2F0aW9uOiAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb24nKSxcclxuICAgICAgICAgICAgJHVzZXI6ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fdXNlcicpLFxyXG4gICAgICAgICAgICAkZW1wdHlCbG9jazogJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uX19lbXB0eScpLFxyXG4gICAgICAgICAgICAkYnRuTmV3Q2xpZW50OiAkZG9jdW1lbnQuZmluZChcclxuICAgICAgICAgICAgICAgICdidXR0b25bZGF0YS1tb3ZlLWJsb2NrLXRhcmdldD1cIm5ldy1jbGllbnRcIl0nXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgJy5qcy1zZWFyY2gtb3ZlcmxheS1pbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIENybS5hcGxpY2F0aW9uLnNlYXJjaE92ZXJsYXkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDcm0uYXBsaWNhdGlvbi5zZWFyY2hPdmVybGF5LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1zZWFyY2gtb3ZlcmxheScsXHJcbiAgICAgICAgICAgICAgICAgICAgQ3JtLmFwbGljYXRpb24uc2VhcmNoT3ZlcmxheS5oaWRlXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJG92ZXJsYXkgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5Jyk7XHJcbiAgICAgICAgICAgIGxldCAkYXBsaWNhdGlvbiA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbicpO1xyXG4gICAgICAgICAgICBsZXQgJHVzZXIgPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb25fX3VzZXInKTtcclxuICAgICAgICAgICAgbGV0ICRlbXB0eUJsb2NrID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uX19lbXB0eScpO1xyXG4gICAgICAgICAgICBsZXQgJGJ0bk5ld0NsaWVudCA9ICRkb2N1bWVudC5maW5kKCcuanMtbW92ZS1ibG9jay0tc2hvdycpO1xyXG5cclxuICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgJGFwbGljYXRpb24uYWRkQ2xhc3MoJ2lzLWZvY3VzJyk7XHJcbiAgICAgICAgICAgICR1c2VyLmFkZENsYXNzKCdhbmltYXRlZCBmYWRlSW5MZWZ0JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICRlbXB0eUJsb2NrLmhpZGUoKTtcclxuICAgICAgICAgICAgJGJ0bk5ld0NsaWVudC5zaG93KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlYXJjaC1vdmVybGF5LWlucHV0Jyk7XHJcbiAgICAgICAgICAgIGxldCAkb3ZlcmxheSA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VhcmNoLW92ZXJsYXknKTtcclxuICAgICAgICAgICAgbGV0ICRhcGxpY2F0aW9uID0gJGRvY3VtZW50LmZpbmQoJy5hcGxpY2F0aW9uJyk7XHJcbiAgICAgICAgICAgIGxldCAkdXNlciA9ICRkb2N1bWVudC5maW5kKCcuYXBsaWNhdGlvbl9fdXNlcicpO1xyXG4gICAgICAgICAgICBsZXQgJGVtcHR5QmxvY2sgPSAkZG9jdW1lbnQuZmluZCgnLmFwbGljYXRpb25fX2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuTmV3Q2xpZW50ID0gJGRvY3VtZW50LmZpbmQoJy5qcy1tb3ZlLWJsb2NrLS1zaG93Jyk7XHJcblxyXG4gICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkYXBsaWNhdGlvbi5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuICAgICAgICAgICAgJHVzZXIucmVtb3ZlQ2xhc3MoJ2FuaW1hdGVkIGZhZGVJbkxlZnQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAkaW5wdXQuYmx1cigpO1xyXG4gICAgICAgICAgICAkZW1wdHlCbG9jay5zaG93KCk7XHJcbiAgICAgICAgICAgICRidG5OZXdDbGllbnQuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gUmVxdWVzdFxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuQ3JtLnJlcXVlc3QgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDwgMTIwMCkge1xyXG4gICAgICAgICAgICBDcm0ucmVxdWVzdC50YWJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbUluZm8oKTtcclxuICAgIH0sXHJcbiAgICAvL1JlcGxhY2UgaWNvbiB3aGVuIGRyYWcgaXRlbVxyXG4gICAgd2lnZXRSZXBsYWNlSWNvbjogZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICBsZXQgd2lkZ2V0ID0gZWwuY2xvc2VzdCgnLnJlcXVlc3RfX3dpZGdldCcpO1xyXG4gICAgICAgIGxldCBpdGVtID0gZWwuY2xvc2VzdCgnLnJlcXVlc3QtaXRlbScpO1xyXG4gICAgICAgIGxldCBpY29uID0gZWwuZmluZCgnLnJlcXVlc3QtaXRlbV9faWNvbicpO1xyXG5cclxuICAgICAgICBsZXQgaWNvbk5ldyA9ICdyZXF1ZXN0LWl0ZW1fX2ljb24gZmFsIGZhLXNtaWxlJztcclxuICAgICAgICBsZXQgaWNvbldvcmsgPSAncmVxdWVzdC1pdGVtX19pY29uIGZhbCBmYS1jbG9jayc7XHJcbiAgICAgICAgbGV0IGljb25Eb25lID0gJ3JlcXVlc3QtaXRlbV9faWNvbiBmYWwgZmEtY2hlY2stY2lyY2xlJztcclxuICAgICAgICBsZXQgaWNvbkFib3J0ID0gJ3JlcXVlc3QtaXRlbV9faWNvbiBmYWwgZmEtZnJvd24nO1xyXG5cclxuICAgICAgICBpZiAod2lkZ2V0Lmhhc0NsYXNzKCdyZXF1ZXN0X193aWRnZXQtLW5ldycpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uTmV3KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS13b3JrJykpIHtcclxuICAgICAgICAgICAgaWNvbi5yZW1vdmVDbGFzcygpLmFkZENsYXNzKGljb25Xb3JrKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS1kb25lJykpIHtcclxuICAgICAgICAgICAgaWNvbi5yZW1vdmVDbGFzcygpLmFkZENsYXNzKGljb25Eb25lKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5oYXNDbGFzcygncmVxdWVzdF9fd2lkZ2V0LS1hYm9ydCcpKSB7XHJcbiAgICAgICAgICAgIGljb24ucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhpY29uQWJvcnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpdGVtSW5mbzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLnJlcXVlc3RfX3dpZGdldCcpXHJcbiAgICAgICAgICAgIC5maW5kKCcucmVxdWVzdC1pdGVtJylcclxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNvbiA9ICQodGhpcykuZmluZCgnLnJlcXVlc3QtaXRlbV9faWNvbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdyZXF1ZXN0LWl0ZW0tLW5vdGZpbGxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5yZW1vdmVDbGFzcygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmFsIGZhLWluZm8tY2lyY2xlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLndyYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJlcXVlc3QtaXRlbV9faWNvblwiIHRvb2x0aXA9XCLQl9Cw0Y/QstC60LAg0L3QtSDQt9Cw0L/QvtC70L3QtdC90L3QsFwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9SZXF1ZXN0IHRhYnNcclxuICAgIHRhYnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy10YWItcmVxdWVzdCcpLnRhYnMoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcm0gU2VydmljZXNcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5zZXJ2aWNlcyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIENybS5zZXJ2aWNlcy5zZWxlY3RUaW1lKCk7XHJcbiAgICAgICAgQ3JtLnNlcnZpY2VzLnNob3dBZGRTZXJ2aWNlKCk7XHJcbiAgICAgICAgQ3JtLnNlcnZpY2VzLnNob3dTZXJ2aWNlSXRlbSgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gMTAyNCkge1xyXG4gICAgICAgICAgICAvLyBDcm0uc2VydmljZXMuaXRlbUhvdmVyKCk7XHJcbiAgICAgICAgICAgIC8vIENybS5yZXF1ZXN0LnNvcnRNdWx0aXBsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpdGVtSG92ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkaXRlbSA9ICQoJy5qcy1zZXJ2aWNlLWl0ZW0nKTtcclxuXHJcbiAgICAgICAgJGl0ZW1cclxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtaG92ZXInKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ3NlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuaXMoJzpmb2N1cycpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdC5oYXNDbGFzcygnc2VsZWN0Mi1jb250YWluZXItLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWhvdmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNlbGVjdFRpbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkc2VsZWN0ID0gJCgnLmpzLXNlcnZpY2UtaXRlbScpLmZpbmQoJ3NlbGVjdCcpO1xyXG4gICAgICAgICRzZWxlY3Qub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VydmljZS1pdGVtJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaG92ZXInKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzaG93QWRkU2VydmljZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYWRkLXNlcnZpY2UtLWFkZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWFkZC1zZXJ2aWNlJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuQ2xvc2UgPSAkcGFyZW50LmZpbmQoJy5qcy1hZGQtc2VydmljZS0tY2xvc2UnKTtcclxuICAgICAgICAgICAgbGV0ICRibG9ja3MgPSAkcGFyZW50LmZpbmQoJy5hZGQtc2VydmljZV9faW5uZXInKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkYnRuQ2xvc2Uuc2hvdygpO1xyXG4gICAgICAgICAgICAkYmxvY2tzLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWFkZC1zZXJ2aWNlLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmpzLWFkZC1zZXJ2aWNlJyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuT3BlbiA9ICRwYXJlbnQuZmluZCgnLmpzLWFkZC1zZXJ2aWNlLS1hZGQnKTtcclxuICAgICAgICAgICAgbGV0ICRibG9ja3MgPSAkcGFyZW50LmZpbmQoJy5hZGQtc2VydmljZV9faW5uZXInKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgICAgICAkYnRuT3Blbi5zaG93KCk7XHJcbiAgICAgICAgICAgICRibG9ja3MuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzaG93U2VydmljZUl0ZW06IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXRvZ2dsZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtYmxvY2stdGFyZ2V0Jyk7XHJcblxyXG4gICAgICAgICAgICAkcGFyZW50LmZpbmQoJy5qcy10b2dnbGUnKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWFkZC1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCc6dGV4dCcpXHJcbiAgICAgICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2pzQ3JtQ29tYm9UaXRsZVNlcnZpY2VzJyk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWFkZC1zZXJ2aWNlJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCdbZGF0YS1ibG9ja10nKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoJ1tkYXRhLWJsb2NrPScgKyBpZCArICddJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENybSBTdGVwc1xyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuQ3JtLnN0ZXBzID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgIC8vIENybS5zdGVwcy5zb3J0YWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDcm0uc3RlcHMudGFicygpO1xyXG4gICAgICAgIENybS5zdGVwcy5zaG93U2VhcmNoKCk7XHJcbiAgICB9LFxyXG4gICAgLy9TdGVwcyB0YWJzXHJcbiAgICB0YWJzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtc3R1ZGlvLXN0ZXAnKS50YWJzKCk7XHJcbiAgICB9LFxyXG4gICAgLy9TdGVwcyBidG4gc2hvdyBzZWFyY2hcclxuICAgIHNob3dTZWFyY2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJ0bi1zdGVwcy1zZWFyY2gtLXNob3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLnN0ZXBzX19zZWFyY2gnKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9TdGVwcyBzb3J0YWJsZSBpdGVtXHJcbiAgICBzb3J0YWJsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5iYi11cGxvYWRfX2xpc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJCgnLmJiLXVwbG9hZF9fbGlzdCcpXHJcbiAgICAgICAgICAgICAgICAuc29ydGFibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiAnLmJiLXVwbG9hZF9faXRlbTpub3QoLmlzLXVuc29ydGFibGUpJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250YWlubWVudDogJ3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9sZXJhbmNlOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKGUsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpLml0ZW0uYWRkQ2xhc3MoJ2RyYWctc29ydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24oZSwgdWkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMucmVwbGFjZVRpdGxlQWZ0ZXJTb3J0YWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aS5pdGVtLnJlbW92ZUNsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRpc2FibGVTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9SZXBsYWNlIGl0ZW0gdGl0bGUgYWZ0ZXIgc29ydHRhYmxlXHJcbiAgICByZXBsYWNlVGl0bGVBZnRlclNvcnRhYmxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaG9tZSA9ICQoJzxzcGFuIGNsYXNzPVwiYmItdXBsb2FkX19ob21lXCI+Jyk7XHJcbiAgICAgICAgaG9tZS50ZXh0KCfQk9C70LDQstC90LDRjycpLmFwcGVuZFRvKCQoJy5iYi11cGxvYWRfX2l0ZW06Zmlyc3QnKSk7XHJcbiAgICAgICAgJCgnLmJiLXVwbG9hZF9faXRlbScpXHJcbiAgICAgICAgICAgIC5ub3QoJzpmaXJzdCcpXHJcbiAgICAgICAgICAgIC5maW5kKCcuYmItdXBsb2FkX19ob21lJylcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENybSBTdHVkaW9cclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbkNybS5zdHVkaW8gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBDcm0uc3R1ZGlvLmF2YXRhclRvZ2dsZUJ0bigpO1xyXG4gICAgICAgIENybS5zdHVkaW8ud29ya2VyUGFnZVRvZ2dsZSgpO1xyXG4gICAgICAgIENybS5zdHVkaW8uY2F0ZWdvcnlTaG93KCk7XHJcbiAgICB9LFxyXG4gICAgLy9BdmF0YXIgYnRuIG9wZW4gLyBjbG9zZVxyXG4gICAgYXZhdGFyVG9nZ2xlQnRuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCAnLmpzLWFkZC1hdmF0YXItLW9wZW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWFkZC1hdmF0YXInKS5mYWRlSW4oe1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcuanMtYWRkLWF2YXRhci0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWFkZC1hdmF0YXInKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9PcGVuIC8gQ2xvc2UgQWRkV29ya2VyIHBhZ2VcclxuICAgIHdvcmtlclBhZ2VUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgLy9PcGVuIGFkZCB3YXJrZXIgcGFnZVxyXG4gICAgICAgICAgICBsZXQgJGFkZFdvcmtlciA9ICQoJy5qcy13b3JrZXItYWRkJyk7XHJcblxyXG4gICAgICAgICAgICAkKCcuanMtd29ya2VyLWl0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdocmVmJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS10b2dnbGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy13b3JrZXItaXRlbScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkYWRkV29ya2VyLmhhc0NsYXNzKCdpcy12aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkYWRkV29ya2VyLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRhZGRXb3JrZXIuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL0Nsb3NlIGFkZCB3b3JrZXIgcGFnZVxyXG4gICAgICAgICAgICAkKCcuanMtd29ya2VyLWFkZC0tY2xvc2UnKS5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJGFkZFdvcmtlci5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2F0ZWdvcnlTaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1jYXRlZ29yeScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0ICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1jYXRlZ29yeScpO1xyXG4gICAgICAgICAgICBsZXQgJGl0ZW1IaWRkZW4gPSAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19pdGVtJylcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoJ1tkYXRhLWhpZGRlbj1cInRydWVcIl0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKCcuY2F0ZWdvcnlfX2l0ZW0tLW1vcmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRwYXJlbnQuaGFzQ2xhc3MoJ2lzLXZpc2libGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbUhpZGRlbi5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19pdGVtLS1tb3JlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoJ9CV0YnQtScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1IaWRkZW4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9faXRlbS0tbW9yZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KCfQodC60YDRi9GC0YwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgICQoQmFzZS5pbml0KCkpO1xyXG4gICAgJChDcm0uaW5pdCgpKTtcclxufSk7XHJcblxyXG4vKlxyXG4gKioqIGZ1bmN0aW9ucy5qc1xyXG4gKi9cclxuLy9QdXNoVXBcclxuZnVuY3Rpb24gcHVzaFVwKG9wdGlvbnMpIHtcclxuICAgIHZhciB0ZXh0ID0gb3B0aW9ucy50ZXh0IHx8ICfQktCw0Lwg0L3QvtCy0LDRjyDQt9Cw0Y/QstC60LAnO1xyXG4gICAgdmFyIHN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICB2YXIgcHVzaENvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2JiLXB1c2hVcCcpO1xyXG4gICAgdmFyIHB1c2hVcENsb3NlID0gJCgnPGkgY2xhc3M9XCJmYWwgZmEtdGltZXNcIj48L2k+JykuYWRkQ2xhc3MoXHJcbiAgICAgICAgJ2JiLXB1c2hVcF9fY2xvc2UganMtcHVzaFVwLS1jbG9zZSdcclxuICAgICk7XHJcblxyXG4gICAgcHVzaENvbnRhaW5lci5hcHBlbmRUbygkKCdib2R5JykpO1xyXG4gICAgcHVzaENvbnRhaW5lci50ZXh0KHRleHQpO1xyXG4gICAgcHVzaFVwQ2xvc2UuYXBwZW5kVG8ocHVzaENvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWVycm9yJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLXN1Y2Nlc3MnKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3NoUG9zKCk7XHJcblxyXG4gICAgcmFmKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA0NTAwKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNTAwMCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1wdXNoVXAtLWNsb3NlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1wdXNoVXAnKTtcclxuICAgICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkcGFyZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcG9zaFBvcygpIHtcclxuICAgICAgICAkKCcuYmItcHVzaFVwJykuZWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAkKCcuYmItcHVzaFVwJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCBoZWlnaHQgKiBlICsgMTAgKyBlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLy9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuZnVuY3Rpb24gcmFmKGZuKSB7XHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9TZXQgSW5wdXQgRGF0ZSBWYWx1ZVxyXG5mdW5jdGlvbiBzZXRJbnB1dERhdGUoc2VsZWN0b3IpIHtcclxuICAgIGxldCBfZGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICBsZXQgaG95ID0gbmV3IERhdGUoKSxcclxuICAgICAgICBkID0gaG95LmdldERhdGUoKSxcclxuICAgICAgICBtID0gaG95LmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgIHkgPSBob3kuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBkYXRhO1xyXG5cclxuICAgIGlmIChkIDwgMTApIHtcclxuICAgICAgICBkID0gJzAnICsgZDtcclxuICAgIH1cclxuICAgIGlmIChtIDwgMTApIHtcclxuICAgICAgICBtID0gJzAnICsgbTtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0geSArICctJyArIG0gKyAnLScgKyBkO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBfZGF0Lmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgX2RhdFtpXS52YWx1ZSA9IGRhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vRnVuY3Rpb24gQWRkIFJlbW92ZSBDbGFzcyBmcm9tIEJsb2NrXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzQmxvY2soYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrICsgJy0tb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLmFkZENsYXNzKGNsKTtcclxuICAgIH0pO1xyXG4gICAgJChibG9jayArICctLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFJlbW92ZUNsYXNzKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jaykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoYmxvY2spLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiJdfQ==
