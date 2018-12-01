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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9uZXBhZ2UuanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiJG1lbnUiLCIkbmF2TW9iaWxlIiwiJGhhbWJ1cmdlciIsIkJhc2UiLCJpbml0IiwicmVtb3ZlUHJlbG9hZGVyIiwiYWNjb3JkZW9uIiwiY2hlY2tib3giLCJ0YWIiLCJsaXN0VG9nZ2xlIiwiY29weVRleHQiLCJvd25lclBob25lIiwiY2hhbmdlQ2l0eSIsInNsaWRlciIsImNhdGFsb2dJdGVtU2xpZGVyIiwiZHJvcGRvd24iLCJzZWxlY3QiLCJpbnB1dHMiLCJidXR0b25zIiwiYnRuRXhwYW5kZWQiLCJidG5Ib3ZlckFuaW1hdGUiLCJidG5TdGF0dXNBbmltYXRlIiwiYnRuR29Ub3AiLCJidG5Hb1RvIiwiYnRuRmxvYXRpbmciLCJidG5QdXNoIiwicG9wdXAiLCJwb3B1cEZhbmN5Qm94Iiwid2hvSXMiLCJjaGFuZ2VGb3JtVGl0bGUiLCJyZWluaXQiLCJ3aWR0aCIsInNjcm9sbEJhciIsIm1lbnUiLCJoYW1idXJnZXJCdG4iLCJjbGlja091c2lkZSIsInNlYXJjaEJ0bk9wZW5DbG9zZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwibmljZVNjcm9sbCIsImN1cnNvcmNvbG9yIiwiYm94em9vbSIsInZlcmdlIiwiY3Vyc29yd2lkdGgiLCJjdXJzb3Jib3JkZXIiLCJjdXJzb3Jib3JkZXJyYWRpdXMiLCJnZXROaWNlU2Nyb2xsIiwicmVzaXplIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiZmluZCIsImlzIiwiYWRkQ2xhc3MiLCJoYXNDbGFzcyIsInBhcmVudCIsInJlbW92ZUF0dHIiLCJwcm9wIiwiJGFjY29yZGVvbiIsInNsaWRlVXAiLCJlYWNoIiwic2xpZGVEb3duIiwiJHBhcmVudCIsImNsb3Nlc3QiLCIkaXRlbSIsImRhdGEiLCJsaXN0Iiwid29ya0xpc3QiLCJjc3MiLCJjYiIsIkNsaXBib2FyZCIsIiRpbnB1dEljb24iLCIkYnRuUmVzZXQiLCIkaGludCIsImJ0biIsIiRidG5EYXRhIiwiJGlucHV0VmFsIiwidmFsIiwiYXR0ciIsInNob3ciLCJub3QiLCJoaWRlIiwiZmlsdGVyIiwiZmFkZU91dCIsImZhZGVJbiIsInRleHQiLCJ1c2VyUGhvbmUiLCJwaG9uZSIsImNoYW5nZUNpdHlUaXRsZSIsIiRzbGlkZXIiLCIkc2xpZHMiLCIkc2xpZGUiLCIkcHJldkFycm93IiwiJG5leHRBcnJvdyIsInNsaWNrIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwic3BlZWQiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImluZmluaXRlIiwiYXJyb3dzIiwiZG90cyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCIkY2F0YWxvZ0l0ZW1TbGlkZXIiLCJfdGhpcyIsIiRzbGlkZXMiLCIkc2xpZGVyRG90cyIsImV2ZW50IiwicHJlcGVuZCIsImFwcGVuZCIsInNsaWRlQ291bnQiLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCJpIiwiaHRtbCIsImxhenlMb2FkIiwic3RvcFByb3BhZ2F0aW9uIiwidGFicyIsImJvZHlGaXgiLCJib2R5VW5GaXgiLCJhZGRSZW1vdmVDbGFzcyIsInBhcmVudE9mZnNldCIsIm9mZnNldCIsInJlbFgiLCJwYWdlWCIsImxlZnQiLCJyZWxZIiwicGFnZVkiLCJ0b3AiLCJjbGljayIsIiRidG4iLCJydW4iLCJoZW5kbGVyIiwib2ZmIiwiX3JlbW92ZUFuaW1hdGlvbiIsImVsIiwiYnRuSWQiLCJ0cmlnZ2VyIiwic2Nyb2xsSGVpZ2h0IiwiaGVpZ2h0Iiwic2Nyb2xsUG9zaXRpb24iLCJzY3JvbGxUb3AiLCJtZXNzYWdlU3VjY2VzcyIsIm1lc3NhZ2VFcnJvciIsImRlbGF5Iiwic3RhdHVzIiwicHVzaFVwIiwiYW5pbWF0ZSIsImVsZW1lbnRDbGljayIsImRlc3RpbmF0aW9uIiwiJGRyb3Bkb3duIiwicmVuZGVyIiwic2hvd0hpZGUiLCIkYnRuQ2xvc2UiLCIkZHJvcGRvd25PdmVybGF5IiwiJGRyb3Bkb3duTGlzdCIsImFwcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJyZW1vdmUiLCIkYnRuRmxvYXRpbmciLCJzdHlsZSIsInBvc2l0aW9uIiwiYm90dG9tIiwicmlnaHQiLCJ6SW5kZXgiLCIkbGlzdCIsInRhcmdldCIsIiRoZWFkZXIiLCJfdG9nZ2xlRGVzayIsIl9yZW1vdmVTdHlsZU1vYiIsInRvZ2dsZUNsYXNzIiwiaW5wdXRFdmVudHMiLCJpbnB1dE1hc2siLCJtb2JpbGVTZWxlY3QiLCJpbnB1dG1hc2siLCJtYXNrIiwiZ3JlZWR5Iiwib25CZWZvcmVQYXN0ZSIsInBhc3RlZFZhbHVlIiwib3B0cyIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImRlZmluaXRpb25zIiwidmFsaWRhdG9yIiwiY2FyZGluYWxpdHkiLCJjYXNpbmciLCJpbnB1dCIsImV4ZWNDb21tYW5kIiwibmV4dCIsInByZXYiLCJmaWVsZEVkaXQiLCJmaWVsZEVkaXRJbnB1dCIsImZpZWxkRWRpdEJ0biIsImZpZWxkRWRpdFRleHQiLCJibHVyIiwidHJpbSIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwia2V5cHJlc3MiLCJrZXlDb2RlIiwiZW5kIiwiJHNlbGVjdCIsIiRpbnB1dFNlYXJjaCIsIiRyZXN1bHRJdGVtIiwic2VsZWN0MiIsInRhZ3MiLCJ0ZW1wbGF0ZVJlc3VsdCIsImFkZFVzZXJQaWMiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsInRpbWVBbmRQcmljZSIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiYWxsb3dDbGVhciIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCIkc2VsZWN0TmF0aXZlIiwicGxhY2Vob2xkZXIiLCIkZmlyc3RPcHRpb24iLCJ3cmFwIiwiY29sb3JTZWxlY3QiLCJpY29uU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsImFkZFJlc2V0QnRuIiwicGhvbmVDb2RlIiwiJGljb25TZWxlY3QiLCJpZm9ybWF0IiwiZHJvcGRvd25QYXJlbnQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJHllYXJTZWxlY3QiLCIkZGF0ZVNlbGVjdCIsInNlbGVjdENvZGVTZWxlY3Rpb24iLCJvcHRWYWwiLCJzZWxlY3RDb2RlUmVzdWx0IiwiY291bnRyeSIsIiRwaG9uZUNvZGVCb3giLCIkaW5wdXQiLCJmb2N1cyIsIm9wdGlvblNlbGVjdCIsInNlbGVjdFZhbHVlIiwiZXEiLCJjaGFuZ2UiLCJjb3VudGVyIiwic2VsZWN0ZWRJbmRleCIsImFkZEZvY3VzIiwicmVtb3ZlRm9jdXMiLCJfcmVtb3ZlU3R5bGUiLCJfYWRkU3R5bGUiLCJzZWFyY2hCdG4iLCJmYW5jeWJveCIsImJhc2VDbGFzcyIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaW1hZ2UiLCJwcmVsb2FkIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJ0b29sYmFyIiwibW9iaWxlIiwiY2xpY2tDb250ZW50IiwiY2xpY2tTbGlkZSIsInRvdWNoIiwic21hbGxCdG4iLCJ3aG9pcyIsImZvcm0iLCJjYXJkIiwiY2FyZFNjcm9sbHNweSIsImNhcmRTdGlja3kiLCJjYXJkUmVxdWVzdFRvZ2dsZSIsImNhcmRNb3ZlSXRlbXMiLCIkY2FyZFNsaWRlciIsImNhcmRJbmZvUmVxdWVzdCIsImluc2VydEJlZm9yZSIsInByZXBlbmRUbyIsInNjcm9sbHNweSIsImZpeENhcmRVc2VySW5mbyIsInNjcm9sbCIsInN0aWNreUJsb2NrT2Zmc2V0IiwiZml4ZWRCbG9jayIsIm91dGVySGVpZ2h0IiwiZml4ZWRCbG9ja09mZnNldCIsInN0aWNreUJsb2NrIiwiY2FyZE1lbnVGaXhlZCIsImNhcmRNZW51T2Zmc2V0IiwiY2FyZE1lbnVDbG9uZSIsImNhcmRNZW51IiwiY2FyZENvbnRlbnQiLCJPbmVwYWdlIiwiaGVyb0FuaW1hdGUiLCJtb2JpbGVTbGlkZXIiLCJjb3VudGVyU3BpbiIsInBsYXlWaWRlbyIsInNldEhlaWdodCIsInByb21vIiwicmVnaXN0cmF0aW9uIiwidGwiLCJUaW1lbGluZU1heCIsImZyb21UbyIsInkiLCJvcGFjaXR5Iiwic2Nyb2xsZWQiLCJjb3VudGVyQ29udGFpbmVyIiwiY291bnRlckNvbnRhaW5lck9mZnNldCIsInNjcmVlbiIsIiRzcGluIiwiQ291bnRlciIsImR1cmF0aW9uIiwiZWFzaW5nIiwic3RlcCIsIm5vdyIsIk1hdGgiLCJjZWlsIiwic3JjIiwiZnJhbWUiLCJjaGFuZ2VIZWlnaHQiLCIkZmlyc3RzY3JlZW4iLCJhbmltYXRpb24iLCJzbGlkZXJzIiwieCIsImZhZGUiLCJjZW50ZXJNb2RlIiwiY2VudGVyUGFkZGluZyIsIm1vdmVCbG9jayIsIiRhdXRoRm9ybSIsIm1vdmVGb3JtIiwib3B0aW9ucyIsInB1c2hDb250YWluZXIiLCJwdXNoVXBDbG9zZSIsInBvc2hQb3MiLCJyYWYiLCJmbiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldElucHV0RGF0ZSIsInNlbGVjdG9yIiwiX2RhdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3kiLCJEYXRlIiwiZCIsImdldERhdGUiLCJtIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsIm1heCIsImFkZFJlbW92ZUNsYXNzQmxvY2siLCJibG9jayIsImNsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFdBQVdMLEVBQUUsVUFBRixDQUFqQjtBQUNBLElBQU1NLFFBQVFOLEVBQUUsT0FBRixDQUFkO0FBQ0EsSUFBTU8sV0FB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d08scUNBQUt4TyxDQUFMLEVBQVFtRixLQUFSLEdBQWdCeEksSUFBaEI7QUFDSDtBQUNKOztBQUVEO0FBQ0EsU0FBU3VTLG1CQUFULENBQTZCQyxLQUE3QixFQUFvQ0MsRUFBcEMsRUFBd0M7QUFDcENuWCxrQkFBRWtYLFFBQVEsUUFBVixFQUFvQnJVLEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDLFlBQVc7QUFDdkM3QyxrQ0FBRWtYLEtBQUYsRUFBU3BULFFBQVQsQ0FBa0JxVCxFQUFsQjtBQUNILGlCQUZEO0FBR0FuWCxrQkFBRWtYLFFBQVEsU0FBVixFQUFxQnJVLEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7QUFDeEM3QyxrQ0FBRWtYLEtBQUYsRUFBU3ZULFdBQVQsQ0FBcUJ3VCxFQUFyQjtBQUNILGlCQUZEO0FBR0g7O0FBRUQsU0FBUzdPLGNBQVQsQ0FBd0I0TyxLQUF4QixFQUErQkMsRUFBL0IsRUFBbUM7QUFDL0JuWCxrQkFBRWtYLEtBQUYsRUFBU3JVLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVc7QUFDNUI3QyxrQ0FBRSxJQUFGLEVBQVF3TCxXQUFSLENBQW9CMkwsRUFBcEI7QUFDSCxpQkFGRDs7QUFJQW5YLGtCQUFFRyxRQUFGLEVBQVkwQyxFQUFaLENBQWUsNEJBQWYsRUFBNkMsVUFBU0MsQ0FBVCxFQUFZO0FBQ3JELG9DQUFJOUMsRUFBRThDLEVBQUVzSSxNQUFKLEVBQVk1RyxPQUFaLENBQW9CMFMsS0FBcEIsRUFBMkJsVSxNQUEvQixFQUF1QztBQUN2Q2hELGtDQUFFa1gsS0FBRixFQUFTdlQsV0FBVCxDQUFxQndULEVBQXJCO0FBQ0FyVSxrQ0FBRW9GLGVBQUY7QUFDSCxpQkFKRDtBQUtIIiwiZmlsZSI6Im9uZXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXHJcbmNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbmNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xyXG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcclxuY29uc3QgJHdyYXBwZXIgPSAkKCcud3JhcHBlcicpO1xyXG5jb25zdCAkbWFpbiA9ICQoJy5tYWluJyk7XHJcbmNvbnN0ICRvdmVybGF5ID0gJCgnLm92ZXJsYXknKTtcclxuY29uc3QgJG1lbnUgPSAkKCcuanMtbWVudScpO1xyXG5jb25zdCAkbmF2TW9iaWxlID0gJCgnLmpzLW1vYmlsZS1uYXYnKTtcclxuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuXHJcbi8qKlxyXG5cclxuICogQmFzZS5qc1xyXG5cclxuICpcclxuXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcblxyXG4gKi9cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blB1c2goKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC53aG9JcygpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vSW5pdCBtb2R1bGVzXHJcblxyXG4gICAgICAgIC8vIFRhYi5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gU2VsZWN0LmluaXQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuY2xpY2tPdXNpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZWFyY2hCdG5PcGVuQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xyXG5cclxuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNjcm9sbEJhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjNTg1YTU5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICcycHgnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5vbignbW91c2VvdmVyIG1vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcblxyXG4gICAgcmVtb3ZlUHJlbG9hZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuXHJcbiAgICBjaGVja2JveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9CQiBjaGVja2JveCBwc2V1ZG9cclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL1NlbGVjdCBBbGwgQ2hlY2tib3hcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIGFjY29yZGVvblxyXG5cclxuICAgIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkYWNjb3JkZW9uID0gJCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQWNjb3JkZW9uIGNvbGxhcHNlXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgZVxyXG5cclxuICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWxpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RUb2dnbGUoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSAkKCcuanMtbGlzdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtMaXN0ID0gbGlzdC5maW5kKCcuanMtbGlzdC10b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ29weSB0ZXh0IGNsaWNrIGxpbmtcclxuXHJcbiAgICBjb3B5VGV4dDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL2lmIGhhcyBpbnB1dCB0aGVuIGNvcHkgaW5wdXQgdmFsdWUgaW4gZGF0YSBhdHRyXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ib3gnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaW5wdXRJY29uID0gJHBhcmVudC5maW5kKCcuYmItaW5wdXRfX2ljb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgPSAkcGFyZW50LmZpbmQoJy5qcy1pbnB1dC0tY2xlYXInKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaGludCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuID0gJHBhcmVudC5maW5kKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuRGF0YSA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dFZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWlucHV0LS1jbGVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZU91dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX2ljb24nKVxyXG5cclxuICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9TaG93IHBob25lIG51bWJlclxyXG5cclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuanMtdXNlci1waG9uZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQoJCh0aGlzKS5kYXRhKCdwaG9uZS1oaWRlbicpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy11c2VyLXBob25lLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdXNlclBob25lID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtdXNlci1waG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBob25lID0gdXNlclBob25lLmRhdGEoJ3Bob25lJyk7XHJcblxyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ3RlbDonICsgcGhvbmUpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2l0eSBzZWxlY3RcclxuXHJcbiAgICBjaGFuZ2VDaXR5OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHkgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHlUaXRsZSA9IGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X190aXRsZSBzcGFuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VDaXR5VGl0bGUudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcblxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtYmItc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZHMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICRwcmV2QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICRuZXh0QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2F0YWxvZyBJdGVtIFNsaWRlclxyXG5cclxuICAgIGNhdGFsb2dJdGVtU2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNhdGFsb2dJdGVtU2xpZGVyID0gJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHRhYjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iYi10YWInKS50YWJzKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBib2R5Rml4OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYm9keVVuRml4OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uczoge1xyXG5cclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG5cclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG5cclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcblxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcnVuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gJHdpbmRvdy5oZWlnaHQoKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChzY3JvbGxIZWlnaHQgLSBzY3JvbGxQb3NpdGlvbikgLyBzY3JvbGxIZWlnaHQgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcygnaXMtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyb3Bkb3duOiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZFNjcm9sbCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd0hpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJGRvY3VtZW50LmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCBfdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0bkZsb2F0aW5nID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHN0eWxlID0ge1xyXG5cclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG5cclxuICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxyXG5cclxuICAgICAgICAgICAgICAgIGJvdHRvbTogMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgbGVmdDogMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDEwLFxyXG5cclxuICAgICAgICAgICAgICAgIHpJbmRleDogOTk5OVxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IF90aGlzLCAkbGlzdDtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5pcygnLmJiLWRyb3Bkb3duX19vdmVybGF5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90b2dnbGVEZXNrKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaXN0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLndyYXBwZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHN0eWxlKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ190cmFuc2Zvcm0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpc3QuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3JlbW92ZVN0eWxlTW9iKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgJy5iYi1kcm9wZG93bl9fbGlzdCAuaW5mby1ibG9ja19faXRlbScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3JlbW92ZVN0eWxlTW9iKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9yZW1vdmVTdHlsZU1vYigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF90b2dnbGVEZXNrKGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVTdHlsZU1vYigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkbGlzdC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbGlzdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnX3RyYW5zZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oX3RoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRTY3JvbGw6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICR3aW5kb3cuaW5uZXJIZWlnaHQoKSAvIDIpO1xyXG5cclxuICAgICAgICAvLyAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGlzdCA9IF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCB0b3AgPSBfdGhpcy5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAodG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIHRvcCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgMSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJCh0aGlzKS5vZmZzZXQoKS50b3ApO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsaXN0LmNzcyh7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0czoge1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuXHJcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtdGltZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTo5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29kZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvZGUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ljk5Ljk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvbmZpcm0tbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZW1haWwtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1lbWFpbC1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqezEsMjB9Wy4qezEsMjB9XVsuKnsxLDIwfV1bLip7MSwyMH1dQCp7MSwyMH1bLip7Miw2fV1bLip7MSwyfV0nLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzdGVkVmFsdWUgPSBwYXN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhc3RlZFZhbHVlLnJlcGxhY2UoJ21haWx0bzonLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEteiEjJCUmJyorLz0/Xl9ge3x9fi1dXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiAnbG93ZXInXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtY29weS10ZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLXNoYXJlX19saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9DbGljayBpbnB1dCBzZWxlY3QgdmFsdWVcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC1mb2N1cy0tY29weScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0VkaXQgVGV4dCBGaWVsZFxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1maWVsZC1lZGl0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdCA9ICQoJy5qcy1maWVsZC1lZGl0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRCdG4gPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2J0bicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0LnNob3coKS5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09ICcxMycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLWlucHV0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWlucHV0LXRpcCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1pbmZvIGlzLWVycm9yIGlzLWludmFsaWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJCh0aGlzKS5maW5kKCcuanMtbW9iaWxlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2VsZWN0OiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLW11bHRpcGxlJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFnczogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QuYmItc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tc2VydmljZXMnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogdGltZUFuZFByaWNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiB0aW1lQW5kUHJpY2VcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtYm9ybicpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIG1lbnRybyBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1NlbGVjdCBBZGQgUHJpY2UgVGltZSAmIFByaWNlXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0aW1lQW5kUHJpY2Uob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsVGltZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxQcmljZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3ByaWNlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdC50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRpbWUgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2UgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9ICQodGhpcykuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbjpmaXJzdC1jaGlsZCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53cmFwKCc8bGFiZWwgY2xhc3M9XCJiYi1zZWxlY3RcIj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmljb25TZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1llYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVllYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVzZXRCdG4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVDb2RlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpY29uU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaWNvblNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1pY29uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRpY29uU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC0tc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaWZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0ljb24gZm9udGF3ZXNvbWUgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaWZvcm1hdChpY29uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsT3B0aW9uID0gaWNvbi5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4+PGkgY2xhc3M9XCJzZWxlY3QyX19pY29uJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvcmlnaW5hbE9wdGlvbikuZGF0YSgnaWNvbicpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj48L2k+ICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbG9yU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkY29sb3JTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0tY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNvbG9yU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QtY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzZWFyY2gtZW5hYmxlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29sb3IgYmFsbCBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaUJhbGwoY29sb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRvcmlnaW5hbE9wdGlvbiA9IGNvbG9yLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvckJhbGwgPSAkKCRvcmlnaW5hbE9wdGlvbikuZGF0YSgnY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IudGV4dC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19saW5lXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH1cIj48L3NwYW4+PHA+ICR7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLnRleHRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDwvcD48L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2JhbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfSBcIj4gPC9zcGFuPiA8L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXNldC15ZWFyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZVllYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICR5ZWFyU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC1ib3JuLS1jbGVhcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub2ZmKCdzZWxlY3QyOm9wZW5pbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKCkgPT0gJycgJiZcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJvcm4nKSA9PT0gJ3llYXInXHJcblxyXG4gICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZGF0ZVNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRhdGVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGhvbmVDb2RlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHNlbGVjdCByZXN1bHRzIHRvIG9wdGlvbiB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVNlbGVjdGlvbihvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0VmFsID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArIG9wdFZhbCArICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGNpdHkgbmFtZSB0byBvcHRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVSZXN1bHQob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50cnkgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdjb3VudHJ5JyksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRWYWwgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0ICRwaG9uZUNvZGVCb3ggPSAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0LXBob25lLWNvZGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHBob25lQ29kZUJveC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnNlbGVjdC12YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJy5iYi1pbnB1dF9faW5wdXQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHNlbGVjdENvZGVSZXN1bHQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBzZWxlY3RDb2RlU2VsZWN0aW9uLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWlucHV0LS1zZWxlY3QtdmFsdWVcIj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvblNlbGVjdCA9ICRwYXJlbnQuZmluZCgnb3B0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0VmFsdWUgPSAkcGFyZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5iYi1pbnB1dC0tc2VsZWN0LXZhbHVlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoMCkudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9ICQodGhpcylbMF0uc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcShjb3VudGVyKS52YWwoKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogJyg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdmb2N1cycsIGFkZEZvY3VzKS5vbignYmx1cicsIHJlbW92ZUZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOm9wZW4nLCBhZGRGb2N1cylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpjbG9zZScsIHJlbW92ZUZvY3VzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUZvY3VzKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW92ZS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vdmUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW92ZS1zZWxlY3RfX3Jlc3VsdCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBtZW51OiB7XHJcblxyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG5cclxuICAgICAgICBoYW1idXJnZXJCdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fYWRkU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vV2hlbiBDbGljayBPdXRzaWRlIENsb3NlIE1lbnVcclxuXHJcbiAgICAgICAgY2xpY2tPdXNpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmpzLW1vYmlsZS1uYXYsIC5qcy1kYXRlLCAuZGF0ZXBpY2tlciwgLmNhcmQtaW5mb19fcmVxdWVzdCwgLmNhdGFsb2ctZmlsdGVyLCAuanMtbW9iaWxlLWZpbHRlci0tb3BlbiwgLmpzLWJiLWFjY29yZGVvbidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5vdmVybGF5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCBCdG4gb3Blbi9jbG9zZVxyXG5cclxuICAgICAgICBzZWFyY2hCdG5PcGVuQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlYXJjaEJ0biA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLWJ0bicpO1xyXG5cclxuICAgICAgICAgICAgc2VhcmNoQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hZGRTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcG9wdXA6IHtcclxuXHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG5cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZDogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlc1wiXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2ZhbmN5Ym94LWNvbnRhaW5lci0taW1hZ2UnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrQ29udGVudDogJ2Nsb3NlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGU6ICdjbG9zZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0bjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNtYWxsQnRuOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuXHJcbiAgICAgICAgd2hvSXM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXdob2lzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gJCgnI2F1dGgtZm9ybScpLmZpbmQoJy5mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdob2lzID09PSAnbWFzdGVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdob2lzID09PSAnc3R1ZGlvJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1zdHVkaW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1jbGllbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9EdW5hbWljbHkgY2hhbmdlIGZvcm0gdGl0bGVcclxuXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENhcmRcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IGNhcmQgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJkLnNsaWRlcigpO1xyXG4gICAgICAgIGNhcmQuY2FyZFNjcm9sbHNweSgpO1xyXG4gICAgICAgIGNhcmQuY2FyZFN0aWNreSgpO1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNzY4KSB7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZFJlcXVlc3RUb2dnbGUoKTtcclxuICAgICAgICAgICAgY2FyZC5jYXJkTW92ZUl0ZW1zKCk7XHJcblxyXG4gICAgICAgICAgICAkd2luZG93LnJlc2l6ZShjYXJkLmNhcmRNb3ZlSXRlbXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTbGlkZXJcclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXNsaWRlcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgJGNhcmRTbGlkZXIgPSAkKCcuanMtY2FyZC1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgICAgICRjYXJkU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVyRG90cyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fZG90cycpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0ODApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMucHJlcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLW5vdyc+MTwvc3Bhbj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPSdiYi1zbGlkZXJfX3BhZ2VyIGJiLXNsaWRlcl9fcGFnZXItLXRvdGFsJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLnNsaWRlQ291bnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignYWZ0ZXJDaGFuZ2UnLCBmdW5jdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IChjdXJyZW50U2xpZGUgPyBjdXJyZW50U2xpZGUgOiAwKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5kKCcuYmItc2xpZGVyX19wYWdlci0tbm93JykuaHRtbChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLW5leHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL0NhcmQgcmVxdWVzdCBzaG93IC8gaGlkZVxyXG4gICAgY2FyZFJlcXVlc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjYXJkSW5mb1JlcXVlc3QgPSAkKCcuY2FyZC1pbmZvX19yZXF1ZXN0Jyk7XHJcblxyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChjYXJkSW5mb1JlcXVlc3QuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY2FyZEluZm9SZXF1ZXN0LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9Nb3ZlIGJsb2NrcyB3aGVuIHdpbmRvdyB3aWR0aCA8IDc2OFxyXG4gICAgY2FyZE1vdmVJdGVtczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtdGl0bGUnKS5pbnNlcnRBZnRlcignLmNhcmQtZ2FsbGFyeV9fd3JhcCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWFib3V0JykuaW5zZXJ0QmVmb3JlKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1pbmZvLWNhdGVnb3J5JykuYXBwZW5kVG8oJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuICAgICAgICAkKCcuanMtY2FyZC1yZXF1ZXN0LS1zaG93JykucHJlcGVuZFRvKCcuY2FyZC1pbmZvX190b3AnKTtcclxuICAgICAgICAkKCcuY2FyZC1pbmZvX19pbm5lcicpLmluc2VydEFmdGVyKCcuY2FyZC1hZHJlc3MnKTtcclxuICAgICAgICAkKCcuanMtbW92ZS1jYXJkLXBvbGljeScpLmFwcGVuZFRvKCcuY2FyZC1yZXF1ZXN0LWZvcm0nKTtcclxuICAgIH0sXHJcbiAgICAvL0NhcmQgU2Nyb2xsc3B5XHJcbiAgICBjYXJkU2Nyb2xsc3B5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLXNjcm9sbHNweScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC0xMDAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zY3JvbGxzcHknKS5zY3JvbGxzcHkoeyBvZmZzZXQ6IC02MCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhcmRTdGlja3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtY2FyZC1zdGlja3knKS5sZW5ndGggJiYgJCgnLmpzLWNhcmQtZml4ZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrID0gJCgnLmpzLWNhcmQtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIHZhciBzdGlja3lCbG9ja09mZnNldCA9IHN0aWNreUJsb2NrLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgdmFyIGZpeGVkQmxvY2sgPSAkKCcuanMtY2FyZC1maXhlZCcpO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9ja09mZnNldCA9IGZpeGVkQmxvY2sub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRDb250ZW50ID0gJCgnLmpzLWNhcmQtY29udGVudC1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51ID0gJCgnLmpzLWNhcmQtbWVudScpO1xyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnVDbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJjYXJkLW1lbnVfX2Nsb25lXCI+JylcclxuICAgICAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICQoJy5qcy1jYXJkLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKSlcclxuICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcihjYXJkTWVudSlcclxuICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudU9mZnNldCA9IGNhcmRNZW51Lm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suaGVpZ2h0KCkgPCBjYXJkQ29udGVudC5oZWlnaHQoKSAmJlxyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLndpZHRoKCkgPiA3NjhcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhDYXJkVXNlckluZm8oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZml4Q2FyZFVzZXJJbmZvKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPj0gc3RpY2t5QmxvY2tPZmZzZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmxvY2tPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLm91dGVySGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAtMSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMzBcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2suY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzc1ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FyZE1lbnUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkTWVudUZpeGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmRNZW51Rml4ZWQoKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID49IGNhcmRNZW51T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51Q2xvbmUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5OVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51LnJlbW92ZUF0dHIoJ3N0eWxlJykucmVtb3ZlQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBPbmVwYWdlXHJcbiAqXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcbiAqL1xyXG5jb25zdCBPbmVwYWdlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgQmFzZS5tZW51LmhhbWJ1cmdlckJ0bigpO1xyXG4gICAgICAgIEJhc2UubWVudS5jbGlja091c2lkZSgpO1xyXG5cclxuICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2Utb25lcGFnZScpKSB7XHJcbiAgICAgICAgICAgIE9uZXBhZ2UuaGVyb0FuaW1hdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5tb2JpbGVTbGlkZXIoKTtcclxuICAgICAgICB0aGlzLmNvdW50ZXJTcGluKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5VmlkZW8oKTtcclxuICAgICAgICB0aGlzLnNldEhlaWdodCgpO1xyXG5cclxuICAgICAgICB0aGlzLnByb21vLmluaXQoKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5pY29uLmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBoZXJvQW5pbWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgICAgICB0bC5mcm9tVG8oJy5oZXJvJywgMSwgeyB5OiAtMzAwLCBvcGFjaXR5OiAwIH0sIHsgeTogMCwgb3BhY2l0eTogMSB9KVxyXG4gICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgJy5oZXJvX190aXRsZScsXHJcbiAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgJy09LjMnXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICcuaGVyb19fc3VidGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICB7IHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICAgICAgICAgICctPS43J1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAnLmhlcm9fX3dpZGdldCcsXHJcbiAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgeyB5OiA3MCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAnLT0uNSdcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgJy5zb2NpYWwnLFxyXG4gICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgIHsgeTogNTAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgJy09MC42J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIHNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtb25lcGFnZS1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICRzbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDgxNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQyNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1vYmlsZVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoZG9jdW1lbnQpLndpZHRoKCkgPCA4MTUpIHtcclxuICAgICAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtb25lcGFnZS1zbGlkZXItLW1vYmlsZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRzbGlkZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRzbGlkZXMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2xpZGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb3VudGVyU3BpbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHNjcm9sbGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghc2Nyb2xsZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudGVyQ29udGFpbmVyID0gJCgnLmpzLWNvdW50ZXItLXdyYXBwZXInKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudGVyQ29udGFpbmVyT2Zmc2V0ID0gY291bnRlckNvbnRhaW5lci5kYXRhKCdvZmZzZXQnKTtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JlZW4gPSBjb3VudGVyQ29udGFpbmVyLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2NyZWVuIC0gY291bnRlckNvbnRhaW5lck9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc3BpbiA9ICQoJy5qcy1jb3VudGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNwaW4uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvdW50ZXI6ICQodGhpcykudGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2luZzogJ3N3aW5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbihub3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KE1hdGguY2VpbChub3cpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBwbGF5VmlkZW86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy12aWRlbycpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBzcmMgPSAkKHRoaXMpLmRhdGEoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIGxldCBmcmFtZSA9ICQoJzxpZnJhbWU+Jyk7XHJcbiAgICAgICAgICAgIGxldCAkYnRuID0gJCh0aGlzKS5maW5kKCcudmlkZW9fX2J0bicpO1xyXG5cclxuICAgICAgICAgICAgJGJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgIGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ3NyYycsIHNyYyArICc/YXV0b3BsYXk9MSZhdXRvaGlkZT0xJylcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJCh0aGlzKS5wYXJlbnQoJy5qcy12aWRlbycpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2V0SGVpZ2h0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgd2lkdGggPSAkd2luZG93LndpZHRoKCk7XHJcbiAgICAgICAgY2hhbmdlSGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAod2lkdGggPj0gJHdpbmRvdy53aWR0aCgpIHx8IHdpZHRoIDw9ICR3aW5kb3cud2lkdGgoKSkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlSGVpZ2h0KCkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJHdpbmRvdy5oZWlnaHQoKTtcclxuICAgICAgICAgICAgbGV0ICRmaXJzdHNjcmVlbiA9ICQoJy5maXJzdHNjcmVlbicpO1xyXG5cclxuICAgICAgICAgICAgJGZpcnN0c2NyZWVuLmNzcygnaGVpZ2h0JywgaGVpZ2h0ICsgJ3B4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByb21vOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVycygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYW5pbWF0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJy5oZXJvLS1pY29uJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0bCA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG4gICAgICAgICAgICAgICAgdGwuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICcubG9nbycsXHJcbiAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICB7IHg6IC0xMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHg6IDAsIG9wYWNpdHk6IDEgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX19pbWcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHg6IDUwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0wLjUnXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuaGVyby1pbmNvX190ZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAtNTAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2UtcHJvbW8nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgICAgICAgICAgICAgIHRsLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAnLmxvZ28nLFxyXG4gICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmhlcm9fX3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAxMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5oZXJvX19zdWJ0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0uNidcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5zbGljay1uZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAxMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNSdcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZyb21UbyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJy5zbGljay1wcmV2JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB4OiAtMTAwLCBvcGFjaXR5OiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgeDogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLT0xJ1xyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbVRvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLmFkdi1pbWFnZV9faW1nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAzMDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICctPTAuNydcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZXJzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItYWR2JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLWFkdicpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLWFkdi1pbWFnZScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci1hZHYtaW1hZ2UnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLXNsaWRlci11c2VycycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLXNsaWRlci11c2VycycpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA0MDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogJzIwcHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1iYi1zbGlkZXItaWNvbnMnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNDAwMCxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICcyMHB4JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA0ODEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVnaXN0cmF0aW9uOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUJsb2NrKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW92ZUJsb2NrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRhdXRoRm9ybSA9ICQoJy5qcy1wcm9tby1mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJGRvY3VtZW50LndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIG1vdmVGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRkb2N1bWVudC53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZUZvcm0oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNjcmVlbi0tcmVnJykuYXBwZW5kKCRhdXRoRm9ybSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbW92ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgICAgICAkYXV0aEZvcm0uaW5zZXJ0QWZ0ZXIoJy5maXJzdHNjcmVlbl9fd3JhcHBlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGljb246IHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJHNsaWRlciA9ICQoJy5qcy1zbGlkZXInKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkc2xpZGVzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNsaWRlID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19zbGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogNTAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgJChCYXNlLmluaXQoKSk7XHJcbiAgICAkKGNhcmQuaW5pdCgpKTtcclxuICAgICQoT25lcGFnZS5pbml0KCkpO1xyXG59KTtcclxuXHJcbi8qXHJcbiAqKiogZnVuY3Rpb25zLmpzXHJcbiAqL1xyXG4vL1B1c2hVcFxyXG5mdW5jdGlvbiBwdXNoVXAob3B0aW9ucykge1xyXG4gICAgdmFyIHRleHQgPSBvcHRpb25zLnRleHQgfHwgJ9CS0LDQvCDQvdC+0LLQsNGPINC30LDRj9Cy0LrQsCc7XHJcbiAgICB2YXIgc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgfHwgJ3N1Y2Nlc3MnO1xyXG5cclxuICAgIHZhciBwdXNoQ29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnYmItcHVzaFVwJyk7XHJcbiAgICB2YXIgcHVzaFVwQ2xvc2UgPSAkKCc8aSBjbGFzcz1cImZhbCBmYS10aW1lc1wiPjwvaT4nKS5hZGRDbGFzcyhcclxuICAgICAgICAnYmItcHVzaFVwX19jbG9zZSBqcy1wdXNoVXAtLWNsb3NlJ1xyXG4gICAgKTtcclxuXHJcbiAgICBwdXNoQ29udGFpbmVyLmFwcGVuZFRvKCQoJ2JvZHknKSk7XHJcbiAgICBwdXNoQ29udGFpbmVyLnRleHQodGV4dCk7XHJcbiAgICBwdXNoVXBDbG9zZS5hcHBlbmRUbyhwdXNoQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAoc3RhdHVzID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtZXJyb3InKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtc3VjY2VzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvc2hQb3MoKTtcclxuXHJcbiAgICByYWYoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHB1c2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDQ1MDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXB1c2hVcC0tY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLXB1c2hVcCcpO1xyXG4gICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICBwb3NoUG9zKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBwb3NoUG9zKCkge1xyXG4gICAgICAgICQoJy5iYi1wdXNoVXAnKS5lYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGhlaWdodCA9ICQoJy5iYi1wdXNoVXAnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIGhlaWdodCAqIGUgKyAxMCArIGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1JlcXVlc3RBbmltYXRpb25GcmFtZVxyXG5mdW5jdGlvbiByYWYoZm4pIHtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vL1NldCBJbnB1dCBEYXRlIFZhbHVlXHJcbmZ1bmN0aW9uIHNldElucHV0RGF0ZShzZWxlY3Rvcikge1xyXG4gICAgbGV0IF9kYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIGxldCBob3kgPSBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIGQgPSBob3kuZ2V0RGF0ZSgpLFxyXG4gICAgICAgIG0gPSBob3kuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgICAgeSA9IGhveS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgIGRhdGE7XHJcblxyXG4gICAgaWYgKGQgPCAxMCkge1xyXG4gICAgICAgIGQgPSAnMCcgKyBkO1xyXG4gICAgfVxyXG4gICAgaWYgKG0gPCAxMCkge1xyXG4gICAgICAgIG0gPSAnMCcgKyBtO1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB5ICsgJy0nICsgbSArICctJyArIGQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IF9kYXQubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICBfZGF0W2ldLnZhbHVlID0gZGF0YTtcclxuICAgIH1cclxufVxyXG5cclxuLy9GdW5jdGlvbiBBZGQgUmVtb3ZlIENsYXNzIGZyb20gQmxvY2tcclxuZnVuY3Rpb24gYWRkUmVtb3ZlQ2xhc3NCbG9jayhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2sgKyAnLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChibG9jaykuYWRkQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcbiAgICAkKGJsb2NrICsgJy0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUmVtb3ZlQ2xhc3MoYmxvY2ssIGNsKSB7XHJcbiAgICAkKGJsb2NrKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdChibG9jaykubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgJChibG9jaykucmVtb3ZlQ2xhc3MoY2wpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuIl19
