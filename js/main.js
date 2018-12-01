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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiJHdpbmRvdyIsIiQiLCJ3aW5kb3ciLCIkZG9jdW1lbnQiLCJkb2N1bWVudCIsIiRodG1sIiwiJHdyYXBwZXIiLCIkaGVhZGVyIiwiJG1haW4iLCIkb3ZlcmxheSIsIiRuYXZNb2JpbGUiLCIkaGFtYnVyZ2VyIiwiQmFzZSIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJhY2NvcmRlb24iLCJjaGVja2JveCIsInRhYiIsImxpc3RUb2dnbGUiLCJjb3B5VGV4dCIsIm93bmVyUGhvbmUiLCJjaGFuZ2VDaXR5Iiwic2xpZGVyIiwiY2F0YWxvZ0l0ZW1TbGlkZXIiLCJkcm9wZG93biIsInNlbGVjdCIsImlucHV0cyIsImJ1dHRvbnMiLCJidG5FeHBhbmRlZCIsImJ0bkhvdmVyQW5pbWF0ZSIsImJ0blN0YXR1c0FuaW1hdGUiLCJidG5Hb1RvcCIsImJ0bkdvVG8iLCJidG5GbG9hdGluZyIsImJ0blB1c2giLCJwb3B1cCIsInBvcHVwRmFuY3lCb3giLCJ3aG9JcyIsImNoYW5nZUZvcm1UaXRsZSIsInJlaW5pdCIsIndpZHRoIiwic2Nyb2xsQmFyIiwibWVudSIsImhhbWJ1cmdlckJ0biIsImNsaWNrT3VzaWRlIiwic2VhcmNoQnRuT3BlbkNsb3NlIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJuaWNlU2Nyb2xsIiwiY3Vyc29yY29sb3IiLCJib3h6b29tIiwidmVyZ2UiLCJjdXJzb3J3aWR0aCIsImN1cnNvcmJvcmRlciIsImN1cnNvcmJvcmRlcnJhZGl1cyIsImdldE5pY2VTY3JvbGwiLCJyZXNpemUiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2xhc3MiLCJmaW5kIiwiaXMiLCJhZGRDbGFzcyIsImhhc0NsYXNzIiwicGFyZW50IiwicmVtb3ZlQXR0ciIsInByb3AiLCIkYWNjb3JkZW9uIiwic2xpZGVVcCIsImVhY2giLCJzbGlkZURvd24iLCIkcGFyZW50IiwiY2xvc2VzdCIsIiRpdGVtIiwiZGF0YSIsImxpc3QiLCJ3b3JrTGlzdCIsImNzcyIsImNiIiwiQ2xpcGJvYXJkIiwiJGlucHV0SWNvbiIsIiRidG5SZXNldCIsIiRoaW50IiwiYnRuIiwiJGJ0bkRhdGEiLCIkaW5wdXRWYWwiLCJ2YWwiLCJhdHRyIiwic2hvdyIsIm5vdCIsImhpZGUiLCJmaWx0ZXIiLCJmYWRlT3V0IiwiZmFkZUluIiwidGV4dCIsInVzZXJQaG9uZSIsInBob25lIiwiY2hhbmdlQ2l0eVRpdGxlIiwiJHNsaWRlciIsIiRzbGlkcyIsIiRzbGlkZSIsIiRwcmV2QXJyb3ciLCIkbmV4dEFycm93Iiwic2xpY2siLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJzcGVlZCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiaW5maW5pdGUiLCJhcnJvd3MiLCJkb3RzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIiRjYXRhbG9nSXRlbVNsaWRlciIsIl90aGlzIiwiJHNsaWRlcyIsIiRzbGlkZXJEb3RzIiwiZXZlbnQiLCJwcmVwZW5kIiwiYXBwZW5kIiwic2xpZGVDb3VudCIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsImkiLCJodG1sIiwibGF6eUxvYWQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YWJzIiwiYm9keUZpeCIsImJvZHlVbkZpeCIsImFkZFJlbW92ZUNsYXNzIiwicGFyZW50T2Zmc2V0Iiwib2Zmc2V0IiwicmVsWCIsInBhZ2VYIiwibGVmdCIsInJlbFkiLCJwYWdlWSIsInRvcCIsImNsaWNrIiwiJGJ0biIsInJ1biIsImhlbmRsZXIiLCJvZmYiLCJfcmVtb3ZlQW5pbWF0aW9uIiwiZWwiLCJidG5JZCIsInRyaWdnZXIiLCJzY3JvbGxIZWlnaHQiLCJoZWlnaHQiLCJzY3JvbGxQb3NpdGlvbiIsInNjcm9sbFRvcCIsIm1lc3NhZ2VTdWNjZXNzIiwibWVzc2FnZUVycm9yIiwiZGVsYXkiLCJzdGF0dXMiLCJwdXNoVXAiLCJhbmltYXRlIiwiZWxlbWVudENsaWNrIiwiZGVzdGluYXRpb24iLCIkZHJvcGRvd24iLCJyZW5kZXIiLCJzaG93SGlkZSIsIiRidG5DbG9zZSIsIiRkcm9wZG93bk92ZXJsYXkiLCIkZHJvcGRvd25MaXN0IiwiYXBwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlbW92ZSIsIiRidG5GbG9hdGluZyIsInN0eWxlIiwicG9zaXRpb24iLCJib3R0b20iLCJyaWdodCIsInpJbmRleCIsIiRsaXN0IiwidGFyZ2V0IiwiJG1lbnUiLCJfdG9nZ2xlRGVzayIsIl9yZW1vdmVTdHlsZU1vYiIsInRvZ2dsZUNsYXNzIiwiaW5wdXRFdmVudHMiLCJpbnB1dE1hc2siLCJtb2JpbGVTZWxlY3QiLCJpbnB1dG1hc2siLCJtYXNrIiwiZ3JlZWR5Iiwib25CZWZvcmVQYXN0ZSIsInBhc3RlZFZhbHVlIiwib3B0cyIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsImRlZmluaXRpb25zIiwidmFsaWRhdG9yIiwiY2FyZGluYWxpdHkiLCJjYXNpbmciLCJpbnB1dCIsImV4ZWNDb21tYW5kIiwibmV4dCIsInByZXYiLCJmaWVsZEVkaXQiLCJmaWVsZEVkaXRJbnB1dCIsImZpZWxkRWRpdEJ0biIsImZpZWxkRWRpdFRleHQiLCJibHVyIiwidHJpbSIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwia2V5cHJlc3MiLCJrZXlDb2RlIiwiZW5kIiwiJHNlbGVjdCIsIiRpbnB1dFNlYXJjaCIsIiRyZXN1bHRJdGVtIiwic2VsZWN0MiIsInRhZ3MiLCJ0ZW1wbGF0ZVJlc3VsdCIsImFkZFVzZXJQaWMiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsInRpbWVBbmRQcmljZSIsIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoIiwiYWxsb3dDbGVhciIsIm9wdCIsImlkIiwib3B0aW1hZ2UiLCJlbGVtZW50IiwiJG9wdCIsIm9yaWdpbmFsVGltZSIsIm9yaWdpbmFsUHJpY2UiLCIkc2VsZWN0TmF0aXZlIiwicGxhY2Vob2xkZXIiLCIkZmlyc3RPcHRpb24iLCJ3cmFwIiwiY29sb3JTZWxlY3QiLCJpY29uU2VsZWN0Iiwic2hvd1llYXIiLCJoaWRlWWVhciIsImFkZFJlc2V0QnRuIiwicGhvbmVDb2RlIiwiJGljb25TZWxlY3QiLCJpZm9ybWF0IiwiZHJvcGRvd25QYXJlbnQiLCJpY29uIiwib3JpZ2luYWxPcHRpb24iLCIkY29sb3JTZWxlY3QiLCJpQmFsbCIsImNvbG9yIiwiJG9yaWdpbmFsT3B0aW9uIiwiY29sb3JCYWxsIiwiJHllYXJTZWxlY3QiLCIkZGF0ZVNlbGVjdCIsInNlbGVjdENvZGVTZWxlY3Rpb24iLCJvcHRWYWwiLCJzZWxlY3RDb2RlUmVzdWx0IiwiY291bnRyeSIsIiRwaG9uZUNvZGVCb3giLCIkaW5wdXQiLCJmb2N1cyIsIm9wdGlvblNlbGVjdCIsInNlbGVjdFZhbHVlIiwiZXEiLCJjaGFuZ2UiLCJjb3VudGVyIiwic2VsZWN0ZWRJbmRleCIsImFkZEZvY3VzIiwicmVtb3ZlRm9jdXMiLCJfcmVtb3ZlU3R5bGUiLCJfYWRkU3R5bGUiLCJzZWFyY2hCdG4iLCJmYW5jeWJveCIsImJhc2VDbGFzcyIsImNsb3NlQ2xpY2tPdXRzaWRlIiwiYXV0b0ZvY3VzIiwiaW1hZ2UiLCJwcmVsb2FkIiwiaGVscGVycyIsIm92ZXJsYXkiLCJsb2NrZWQiLCJ0b29sYmFyIiwibW9iaWxlIiwiY2xpY2tDb250ZW50IiwiY2xpY2tTbGlkZSIsInRvdWNoIiwic21hbGxCdG4iLCJ3aG9pcyIsImZvcm0iLCJjYXRhbG9nIiwibWFwVG9nZ2xlIiwiYnRuRmlsdGVyT3BlbiIsImJ0blNob3dDYXRhbG9nIiwiYnRuU2hvd01hcCIsInN0aWNreUZpbHRlciIsImZpbHRlckNhdGVnb3J5IiwibW92ZUJsb2NrcyIsImlmUGFnZUNhdGFsb2ciLCJjYXRhbG9nRmlsdGVyIiwiU3RpY2t5U2lkZWJhciIsInRvcFNwYWNpbmciLCJib3R0b21TcGFjaW5nIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpbm5lcldyYXBwZXJTZWxlY3RvciIsImluc2VydEJlZm9yZSIsIm91dGVySGVpZ2h0IiwiY2FyZCIsImNhcmRTY3JvbGxzcHkiLCJjYXJkU3RpY2t5IiwiY2FyZFJlcXVlc3RUb2dnbGUiLCJjYXJkTW92ZUl0ZW1zIiwiJGNhcmRTbGlkZXIiLCJjYXJkSW5mb1JlcXVlc3QiLCJwcmVwZW5kVG8iLCJzY3JvbGxzcHkiLCJmaXhDYXJkVXNlckluZm8iLCJzY3JvbGwiLCJzdGlja3lCbG9ja09mZnNldCIsImZpeGVkQmxvY2siLCJmaXhlZEJsb2NrT2Zmc2V0Iiwic3RpY2t5QmxvY2siLCJjYXJkTWVudUZpeGVkIiwiY2FyZE1lbnVPZmZzZXQiLCJjYXJkTWVudUNsb25lIiwiY2FyZE1lbnUiLCJjYXJkQ29udGVudCIsIk1haW4iLCJwYWdlUHJvbW8iLCJvcHRpb25zIiwicHVzaENvbnRhaW5lciIsInB1c2hVcENsb3NlIiwicG9zaFBvcyIsInJhZiIsImZuIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW5wdXREYXRlIiwic2VsZWN0b3IiLCJfZGF0IiwicXVlcnlTZWxlY3RvckFsbCIsImhveSIsIkRhdGUiLCJkIiwiZ2V0RGF0ZSIsIm0iLCJnZXRNb250aCIsInkiLCJnZXRGdWxsWWVhciIsIm1heCIsImFkZFJlbW92ZUNsYXNzQmxvY2siLCJibG9jayIsImNsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFdBQVdMLEVBQUUsVUFBRixDQUFqQjtBQUNBLElBQU1NLFVBQVVOLEVBQUUsU0FBRixDQUFoQjtBQUNBLElBQU1PLFFBQVFQLEVBQUUsT0FBRixDQUFkO0FBQ0EsSUFBTVEsV0FBV1IsRUFBRSxVQUFGLENBQWpCO0FBQ0EsSUFBTVMsYUFBYVQsRUFBRSxnQkFBRixDQUFuQjtBQUNBLElBQU1VLGFBQWFWLEVBQUUsa0JBQUYsQ0FBbkI7O0FBRUE7Ozs7Ozs7Ozs7QUFZQSxJQUFNVyxPQUFPOztBQUVUQyxz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LGtCQUFFOFYsUUFBUSxTQUFWLEVBQXFCalQsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUN4QzdDLGtDQUFFOFYsS0FBRixFQUFTblMsV0FBVCxDQUFxQm9TLEVBQXJCO0FBQ0gsaUJBRkQ7QUFHSDs7QUFFRCxTQUFTek4sY0FBVCxDQUF3QndOLEtBQXhCLEVBQStCQyxFQUEvQixFQUFtQztBQUMvQi9WLGtCQUFFOFYsS0FBRixFQUFTalQsRUFBVCxDQUFZLE9BQVosRUFBcUIsWUFBVztBQUM1QjdDLGtDQUFFLElBQUYsRUFBUXdMLFdBQVIsQ0FBb0J1SyxFQUFwQjtBQUNILGlCQUZEOztBQUlBL1Ysa0JBQUVHLFFBQUYsRUFBWTBDLEVBQVosQ0FBZSw0QkFBZixFQUE2QyxVQUFTQyxDQUFULEVBQVk7QUFDckQsb0NBQUk5QyxFQUFFOEMsRUFBRXNJLE1BQUosRUFBWTVHLE9BQVosQ0FBb0JzUixLQUFwQixFQUEyQjlTLE1BQS9CLEVBQXVDO0FBQ3ZDaEQsa0NBQUU4VixLQUFGLEVBQVNuUyxXQUFULENBQXFCb1MsRUFBckI7QUFDQWpULGtDQUFFb0YsZUFBRjtBQUNILGlCQUpEO0FBS0giLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vR2xvYmFsIFZhcnNcclxuY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcclxuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XHJcbmNvbnN0ICRodG1sID0gJCgnaHRtbCcpO1xyXG5jb25zdCAkd3JhcHBlciA9ICQoJy53cmFwcGVyJyk7XHJcbmNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XHJcbmNvbnN0ICRtYWluID0gJCgnLm1haW4nKTtcclxuY29uc3QgJG92ZXJsYXkgPSAkKCcub3ZlcmxheScpO1xyXG5jb25zdCAkbmF2TW9iaWxlID0gJCgnLmpzLW1vYmlsZS1uYXYnKTtcclxuY29uc3QgJGhhbWJ1cmdlciA9ICQoJy5qcy1tYWluLW5hdi1idG4nKTtcclxuXHJcbi8qKlxyXG5cclxuICogQmFzZS5qc1xyXG5cclxuICpcclxuXHJcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XHJcblxyXG4gKi9cclxuXHJcblxyXG5cclxuY29uc3QgQmFzZSA9IHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVQcmVsb2FkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NvcmRlb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja2JveCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnJhZGlvQnRuKCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFiKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29weVRleHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5vd25lclBob25lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2l0eSgpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGFsb2dJdGVtU2xpZGVyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0LmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dHMuaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5FeHBhbmRlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuSG92ZXJBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5TdGF0dXNBbmltYXRlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5idG5Hb1RvcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuR29UbygpO1xyXG5cclxuICAgICAgICB0aGlzLmJ1dHRvbnMuYnRuRmxvYXRpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXR0b25zLmJ0blB1c2goKTtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnBvcHVwRmFuY3lCb3goKTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cC53aG9JcygpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLmNoYW5nZUZvcm1UaXRsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnBvcHVwLnJlaW5pdCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vSW5pdCBtb2R1bGVzXHJcblxyXG4gICAgICAgIC8vIFRhYi5pbml0KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gU2VsZWN0LmluaXQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuaGFtYnVyZ2VyQnRuKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnUuY2xpY2tPdXNpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudS5zZWFyY2hCdG5PcGVuQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xyXG5cclxuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNjcm9sbEJhcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBzY3JvbGxCYXIgPSAkKCcuanMtc2Nyb2xsJyk7XHJcblxyXG4gICAgICAgIGlmIChzY3JvbGxCYXIubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxCYXIubmljZVNjcm9sbCh7XHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yY29sb3I6ICcjNTg1YTU5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBob3JpenJhaWxlbmFibGVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvaGlkZW1vZGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIGJveHpvb206IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHZlcmdlOiA1MDAsXHJcblxyXG4gICAgICAgICAgICAgICAgY3Vyc29yd2lkdGg6ICcycHgnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogJ25vbmUnLFxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogJzInXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbEJhci5vbignbW91c2VvdmVyIG1vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldE5pY2VTY3JvbGwoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXHJcblxyXG4gICAgcmVtb3ZlUHJlbG9hZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcgbG9hZGluZy1hbmltYXRpb24nKTtcclxuXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0N1c3RvbSBjaGVjYm94ICYgY2hlY2tib3hQc2V1ZG9cclxuXHJcbiAgICBjaGVja2JveDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWNoZWNrYm94JywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmlzKCc6Y2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9CQiBjaGVja2JveCBwc2V1ZG9cclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtLXBzZXVkbycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL1NlbGVjdCBBbGwgQ2hlY2tib3hcclxuXHJcbiAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItY2hlY2tib3gtc2VsZWN0LWFsbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLXNlbGVjdGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1iYi1jaGVja2JveCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpbnB1dCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWJiLWNoZWNrYm94JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1jaGVja2VkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ3VzdG9tIGFjY29yZGVvblxyXG5cclxuICAgIGFjY29yZGVvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCAkYWNjb3JkZW9uID0gJCgnLmpzLWJiLWFjY29yZGVvbicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICgkYWNjb3JkZW9uLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50Jykuc2xpZGVVcCgpO1xyXG5cclxuICAgICAgICAgICAgJGFjY29yZGVvbi5maW5kKCcuYmItYWNjb3JkZW9uX19pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZURvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vQWNjb3JkZW9uIGNvbGxhcHNlXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWFjY29yZGVvbiAuYmItYWNjb3JkZW9uX190aXRsZScsIGZ1bmN0aW9uKFxyXG5cclxuICAgICAgICAgICAgZVxyXG5cclxuICAgICAgICApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYmItYWNjb3JkZW9uJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGl0ZW0gPSAkKHRoaXMpLnBhcmVudCgnLmJiLWFjY29yZGVvbl9faXRlbScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJHBhcmVudC5kYXRhKCdhY2NvcmRlb24nKSA9PT0gJ2NvbGxhcHNlJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkcGFyZW50XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9faXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5iYi1hY2NvcmRlb25fX2NvbnRlbnQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWRlVXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJiLWFjY29yZGVvbl9fY29udGVudCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZiAoJCgnLmpzLWxpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpc3RUb2dnbGUoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSAkKCcuanMtbGlzdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGxpc3QuZmluZCgnLmpzLWJiLWNoZWNrYm94Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtMaXN0ID0gbGlzdC5maW5kKCcuanMtbGlzdC10b2dnbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94Lmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtMaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrTGlzdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ29weSB0ZXh0IGNsaWNrIGxpbmtcclxuXHJcbiAgICBjb3B5VGV4dDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBjYiA9IG5ldyBDbGlwYm9hcmQoJy5qcy11c2VyLWxpbmsnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL2lmIGhhcyBpbnB1dCB0aGVuIGNvcHkgaW5wdXQgdmFsdWUgaW4gZGF0YSBhdHRyXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5maW5kKCcuanMtaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ib3gnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaW5wdXRJY29uID0gJHBhcmVudC5maW5kKCcuYmItaW5wdXRfX2ljb24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkYnRuUmVzZXQgPSAkcGFyZW50LmZpbmQoJy5qcy1pbnB1dC0tY2xlYXInKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaGludCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1pbnB1dC1ibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuID0gJHBhcmVudC5maW5kKCcuanMtdXNlci1saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkYnRuRGF0YSA9ICQodGhpcykuZGF0YSgnY2xpcGJvYXJkLXRleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpbnB1dFZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmF0dHIoJ2RhdGEtY2xpcGJvYXJkLXRleHQnLCAkYnRuRGF0YSArICRpbnB1dFZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXRJY29uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0SWNvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCcuanMtaW5wdXQtLWNsZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWlucHV0LS1jbGVhcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAudmFsKCcnKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmFkZU91dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuYmItaW5wdXRfX2ljb24nKVxyXG5cclxuICAgICAgICAgICAgICAgIC5ub3QoJy5qcy1pbnB1dC0tY2xlYXInKVxyXG5cclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpXHJcblxyXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy9TaG93IHBob25lIG51bWJlclxyXG5cclxuICAgIG93bmVyUGhvbmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuanMtdXNlci1waG9uZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApOycpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQoJCh0aGlzKS5kYXRhKCdwaG9uZS1oaWRlbicpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy11c2VyLXBob25lLS1zaG93JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdXNlclBob25lID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtdXNlci1waG9uZScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBob25lID0gdXNlclBob25lLmRhdGEoJ3Bob25lJyk7XHJcblxyXG4gICAgICAgICAgICB1c2VyUGhvbmVcclxuXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgJ3RlbDonICsgcGhvbmUpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQocGhvbmUpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2l0eSBzZWxlY3RcclxuXHJcbiAgICBjaGFuZ2VDaXR5OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHkgPSAkKCcuanMtY2l0eS1zZWxlY3QnKTtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdHlUaXRsZSA9IGNoYW5nZUNpdHkuZmluZCgnLmNpdHktc2VsZWN0X190aXRsZSBzcGFuJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgY2hhbmdlQ2l0eS5maW5kKCcuY2l0eS1zZWxlY3RfX2l0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJCh0aGlzKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VDaXR5VGl0bGUudGV4dCh0ZXh0KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvL0Jhc2Ugc2xpZGVyXHJcblxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbGV0ICRzbGlkZXIgPSAkKCcuanMtYmItc2xpZGVyJyk7XHJcblxyXG4gICAgICAgIGlmICgkc2xpZGVyLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgJHNsaWRlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkc2xpZGUgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1wcmV2Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRuZXh0QXJyb3cgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2Fycm93LS1uZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHNsaWRlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZHMubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKS5zbGljayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICRwcmV2QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICRuZXh0QXJyb3csXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDIwMDAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogMTAwMCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vQ2F0YWxvZyBJdGVtIFNsaWRlclxyXG5cclxuICAgIGNhdGFsb2dJdGVtU2xpZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXRhbG9nLWl0ZW0tc2xpZGVyJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGNhdGFsb2dJdGVtU2xpZGVyID0gJCgnLmpzLWNhdGFsb2ctaXRlbS1zbGlkZXInKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNhdGFsb2dJdGVtU2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZSA9ICQodGhpcykuZmluZCgnLmJiLXNsaWRlcl9fc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlckRvdHMgPSAkKHRoaXMpLmZpbmQoJy5iYi1zbGlkZXJfX2RvdHMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2luaXQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnByZXBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS1ub3cnPjE8L3NwYW4+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLydcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5hcHBlbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz0nYmItc2xpZGVyX19wYWdlciBiYi1zbGlkZXJfX3BhZ2VyLS10b3RhbCc+XCIgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljay5zbGlkZUNvdW50ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluZCgnLmJiLXNsaWRlcl9fcGFnZXItLW5vdycpLmh0bWwoaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVzLm5vdCgnLnNsaWNrLWluaXRpYWxpemVkJykuc2xpY2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogNDAwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDgxLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctaXRlbScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItc2xpZGVyX19zbGlkZXMnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHRhYjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy5qcy1iYi10YWInKS50YWJzKCk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBib2R5Rml4OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYm9keVVuRml4OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uczoge1xyXG5cclxuICAgICAgICAvL2J0biBleHBhbmRlZFxyXG5cclxuICAgICAgICBidG5FeHBhbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRSZW1vdmVDbGFzcygnLmpzLWJ0bi1leHBhbmRlZCcsICdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9idG4gYW5pbWF0ZSBvbiBob3ZlclxyXG5cclxuICAgICAgICBidG5Ib3ZlckFuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0JywgJy5qcy1idG4tYW5pbWF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudE9mZnNldCA9ICQodGhpcykub2Zmc2V0KCksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxYID0gZS5wYWdlWCAtIHBhcmVudE9mZnNldC5sZWZ0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsWSA9IGUucGFnZVkgLSBwYXJlbnRPZmZzZXQudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ1dHRvbi1hbmltYXRlX19ob3ZlcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHJlbFksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcmVsWFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHN0YXR1cyBhbmltYXRlXHJcblxyXG4gICAgICAgIGJ0blN0YXR1c0FuaW1hdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gMDtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmJ0bi1hbmltYXRlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsaWNrKys7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtYW5pbWF0ZSBpcy1yZWFkeScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWNrIDw9IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpcy1hbmltYXRlIGlzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDI1MDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLXJlYWR5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljayA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL2Zsb2F0aW5nIGJ0biBhbmltYXRpblxyXG5cclxuICAgICAgICBidG5GbG9hdGluZzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0biA9ICRkb2N1bWVudC5maW5kKCcuanMtYnRuLWZsb2F0aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcnVuID0gdHJ1ZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCEkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpbmsnKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QntCx0YDQsNCx0L7RgtGH0LjQuiDQtNC+0LHQsNCy0LvRj9C10YIg0LrQu9Cw0YHRgdGLINC30LDRgtC10Lwg0L7RgtC/0LjRgdGL0LLQsNGC0LXRgdGPINC+0YIg0YHQvtCx0YvRgtC40Y9cclxuXHJcbiAgICAgICAgICAgIGxldCBoZW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bi5vZmYoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZW5kbGVyXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0LfQsNC60YDRi9GC0LjRj1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUFuaW1hdGlvbihlbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVuZGxlclxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFydW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCAnLmpzLWJ0bi1mbG9hdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmYS1lbnRlci1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgJy5qcy1idG4tZmxvYXRpbmcnLCBoZW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYnRuLWZsb2F0aW5nJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJy5idG4tZmxvYXRpbmdfX2xpc3QnKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidG5JZCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmJ0bi1mbG9hdGluZ19fbGluaycpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCgnLm1kLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bklkLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5qcy1idG4tZmxvYXRpbmcgLmJ0bi1mbG9hdGluZ19fbGluaycsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2ZhLWVudGVyLWFjdGl2ZScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQW5pbWF0aW9uKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy/QmtC70LjQuiDQsiDQvdC1INC60L3QvtC/0LrQuCDRgdC60YDRi9Cy0LDQtdGCINC+0LLQtdGA0LvQtdC5INC4INC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtZW50ZXItYWN0aXZlJykuYWRkQ2xhc3MoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmEtbGVhdmUtYWN0aXZlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1sZWF2ZS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSAkZG9jdW1lbnQuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gJHdpbmRvdy5oZWlnaHQoKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChzY3JvbGxIZWlnaHQgLSBzY3JvbGxQb3NpdGlvbikgLyBzY3JvbGxIZWlnaHQgPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5hZGRDbGFzcygnaXMtaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgdGB0YvQu9C60LAg0L7RgtC60YDRi9Cy0LDQtdGCINC80L7QtNCw0LvQutGDLCDRgtC+INC/0L4g0L7RgtC60YDRi9GC0LjRjiDQvNC+0LTQsNC70LrQuCDRgdC60YDRi9Cy0LDQtdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgICAgICAgICAgJCgnLm1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkYnRuLnJlbW92ZUNsYXNzKCdmYS1lbnRlci1hY3RpdmUnKS5hZGRDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJG92ZXJsYXkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnZmEtbGVhdmUtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnRuUHVzaDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQuZmluZCgnW2RhdGEtcHVzaF0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZVN1Y2Nlc3MgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHVzaC1tZXNzYWdlLXN1Y2Nlc3MnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUVycm9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLXB1c2gtbWVzc2FnZS1lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWxheSA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLWRlbGF5JykgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICQodGhpcykuYXR0cignZGF0YS1wdXNoLXN0YXR1cycpIHx8ICdzdWNjZXNzJztcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZUVycm9yLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2hVcCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogbWVzc2FnZVN1Y2Nlc3MsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byB0b3BcclxuXHJcbiAgICAgICAgYnRuR29Ub3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWdvLXRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICA4MDBcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vYnRuIHNjcm9sbCB0byBlbGVtZW50XHJcblxyXG4gICAgICAgIGJ0bkdvVG86IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9DbGljayBldmVudCB0byBzY3JvbGwgdG8gc2VjdGlvbiB3aGl0aCBpZCBsaWtlIGhyZWZcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1nb3RvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZXN0aW5hdGlvbiA9ICQoZWxlbWVudENsaWNrKS5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSA5MCArICdweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gNjAgKyAncHgnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgNDAwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyb3Bkb3duOiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIGRyb3Bkb3duXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRkcm9wZG93bi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpIDw9IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2JiLWRyb3Bkb3duLS1ob3ZlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZFNjcm9sbCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duID0gJGRvY3VtZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcuanMtYmItZHJvcGRvd24uYmItZHJvcGRvd24tLXRyYW5zZm9ybSdcclxuXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYmItZHJvcGRvd25fX2Nsb3NlIGpzLWJiLWRyb3Bkb3duLS1jbG9zZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGRyb3Bkb3duT3ZlcmxheSA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19vdmVybGF5XCI+J1xyXG5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJCh0aGlzKS5maW5kKCcuYmItZHJvcGRvd25fX2xpc3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkYnRuQ2xvc2UuYXBwZW5kVG8oJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bk92ZXJsYXkuaW5zZXJ0QWZ0ZXIoJGRyb3Bkb3duTGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bkxpc3QuZmluZCgnLmluZm8tYmxvY2tfX2ljb24nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2hvd0hpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZHJvcGRvd25MaXN0ID0gJGRvY3VtZW50LmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCBfdHJhbnNmb3JtJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgJGJ0bkZsb2F0aW5nID0gJGRvY3VtZW50LmZpbmQoJy5qcy1idG4tZmxvYXRpbmcnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHN0eWxlID0ge1xyXG5cclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG5cclxuICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxyXG5cclxuICAgICAgICAgICAgICAgIGJvdHRvbTogMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgbGVmdDogMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDEwLFxyXG5cclxuICAgICAgICAgICAgICAgIHpJbmRleDogOTk5OVxyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IF90aGlzLCAkbGlzdDtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24nLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbGlzdCA9ICQodGhpcykuZmluZCgnLmJiLWRyb3Bkb3duX19saXN0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5pcygnLmJiLWRyb3Bkb3duX19vdmVybGF5JykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbWVudS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LmNsb3Nlc3QoJy5iYi1kcm9wZG93bl9fbGlzdCcpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPiA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90b2dnbGVEZXNrKCQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaXN0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnNlcnRBZnRlcignLndyYXBwZXInKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHN0eWxlKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ190cmFuc2Zvcm0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxpc3QuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRvdmVybGF5LmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtYmItZHJvcGRvd24nKS5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2sgdG91Y2hzdGFydCcsICcub3ZlcmxheScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3JlbW92ZVN0eWxlTW9iKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKFxyXG5cclxuICAgICAgICAgICAgICAgICdjbGljaycsXHJcblxyXG4gICAgICAgICAgICAgICAgJy5iYi1kcm9wZG93bl9fbGlzdCAuaW5mby1ibG9ja19faXRlbScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRkcm9wZG93bi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3JlbW92ZVN0eWxlTW9iKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsICcuanMtYmItZHJvcGRvd24tLWNsb3NlJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGJ0bkZsb2F0aW5nLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9yZW1vdmVTdHlsZU1vYigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF90b2dnbGVEZXNrKGVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbC50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmhhc0NsYXNzKCdiYi1kcm9wZG93bi0tdHJhbnNmb3JtJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG5GbG9hdGluZy5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVTdHlsZU1vYigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkbGlzdC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbGlzdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnX3RyYW5zZm9ybScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oX3RoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRTY3JvbGw6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJy0tLScsICR3aW5kb3cuaW5uZXJIZWlnaHQoKSAvIDIpO1xyXG5cclxuICAgICAgICAvLyAgICAgbGV0ICRkcm9wZG93biA9ICRkb2N1bWVudC5maW5kKCcuanMtYmItZHJvcGRvd24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgJGRyb3Bkb3duLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGlzdCA9IF90aGlzLmZpbmQoJy5iYi1kcm9wZG93bl9fbGlzdCcpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBfdGhpcyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCB0b3AgPSBfdGhpcy5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAodG9wID4gJHdpbmRvdy5pbm5lckhlaWdodCgpIC8gMikge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIHRvcCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgMSk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCctLS0nLCAkKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tJywgJCh0aGlzKS5vZmZzZXQoKS50b3ApO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgX3RoaXNcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsaXN0LmNzcyh7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0czoge1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcclxuXHJcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtdGltZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLXRpbWUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5OTo5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtY29kZS1tYXNrJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNvZGUtbWFzaycpLmlucHV0bWFzayh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICc5IDkgOSA5J1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1ib3JuLW1hc2snKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuanMtYm9ybi1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJzk5Ljk5Ljk5OTknXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWNvbmZpcm0tbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1jb25maXJtLW1hc2snKS5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnOTk5OSdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtZW1haWwtbWFzaycpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5qcy1lbWFpbC1tYXNrJykuaW5wdXRtYXNrKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcqezEsMjB9Wy4qezEsMjB9XVsuKnsxLDIwfV1bLip7MSwyMH1dQCp7MSwyMH1bLip7Miw2fV1bLip7MSwyfV0nLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvbkJlZm9yZVBhc3RlOiBmdW5jdGlvbihwYXN0ZWRWYWx1ZSwgb3B0cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzdGVkVmFsdWUgPSBwYXN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhc3RlZFZhbHVlLnJlcGxhY2UoJ21haWx0bzonLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IFwiWzAtOUEtWmEteiEjJCUmJyorLz0/Xl9ge3x9fi1dXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDEsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzaW5nOiAnbG93ZXInXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5wdXRFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWlucHV0LS1jb3B5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ0NvcHknKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtY29weS10ZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy51c2VyLXNoYXJlX19saW5rJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXQudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9DbGljayBpbnB1dCBzZWxlY3QgdmFsdWVcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1pbnB1dC1mb2N1cy0tY29weScpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9TaG93IFBhc3N3b3JkXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtYmItaW5wdXQtcGFzc3dvcmQtLXNob3cnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAubmV4dCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vSGlkZSBQYXNzd29yZFxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0LXBhc3N3b3JkLS1oaWRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0VkaXQgVGV4dCBGaWVsZFxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5qcy1maWVsZC1lZGl0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdCA9ICQoJy5qcy1maWVsZC1lZGl0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdElucHV0ID0gZmllbGRFZGl0LmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRCdG4gPSBmaWVsZEVkaXQuZmluZCgnLmZpZWxkLWVkaXRfX2J0bicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0SW5wdXQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWZpZWxkLWVkaXQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X19pbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0LnNob3coKS5zZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZpZWxkRWRpdElucHV0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5ibHVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1maWVsZC1lZGl0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGVmYXVsdFZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuaHRtbCh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRCdG4ucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAua2V5cHJlc3MoZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtZmllbGQtZWRpdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09ICcxMycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50cmltKHRoaXMudmFsdWUpID09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRlZmF1bHRWYWx1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmpzLWJiLWlucHV0JykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWJiLWlucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmJiLWlucHV0LCAuYmItdGV4dCcpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdpcy1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAub24oJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5iYi1pbnB1dCwgLmJiLXRleHQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLWJiLWlucHV0LXRpcCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCduby1jbG9zZScpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1pbmZvIGlzLWVycm9yIGlzLWludmFsaWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZW5kKClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgICAgIG1vYmlsZVNlbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQoJy5qcy1tb2JpbGUtc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzZWxlY3QuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGlucHV0U2VhcmNoID0gJCh0aGlzKS5maW5kKCcubW9iaWxlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJGJ0bkNsb3NlID0gJCh0aGlzKS5maW5kKCcuanMtbW9iaWxlLXNlbGVjdC0tY2xvc2UnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb2JpbGUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dFNlYXJjaC5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5tb2JpbGUtc2VsZWN0X19yZXN1bHQnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXN1bHRJdGVtLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2VsZWN0OiB7XHJcblxyXG4gICAgICAgIC8vQ3VzdG9tIFNlbGVjdCBodHRwczovL3NlbGVjdDIub3JnL1xyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QnKS5zZWxlY3QyKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtLW11bHRpcGxlJykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFnczogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QuYmItc2VsZWN0LS1tZXRybycpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBhZGRVc2VyUGljXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXNlbGVjdC0tc2VydmljZXMnKS5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogdGltZUFuZFByaWNlLFxyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiB0aW1lQW5kUHJpY2VcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkKCcuanMtc2VsZWN0Lm5vLXNlYXJjaCcpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtYm9ybicpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAtMSxcclxuXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NsZWFyOiB0cnVlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9JY29uIG1lbnRybyBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRVc2VyUGljKG9wdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0LmlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGltYWdlID0gJChvcHQuZWxlbWVudCkuZGF0YSgnaW1hZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGltYWdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHQudGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgJG9wdCA9ICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtZXRyby1pY29uIG1ldHJvLWljb24tLScgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltYWdlICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChvcHQuZWxlbWVudCkudGV4dCgpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvcHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1NlbGVjdCBBZGQgUHJpY2UgVGltZSAmIFByaWNlXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0aW1lQW5kUHJpY2Uob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsVGltZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3RpbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxQcmljZSA9ICQob3B0LmVsZW1lbnQpLmRhdGEoJ3ByaWNlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9Y3VzdG9tLXNlbGVjdF9fcmVzdWx0cz4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdC50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRpbWUgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUHJpY2UgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignZm9jdXMnLCAnLnNlbGVjdDItc2VhcmNoX19maWVsZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCAkc2VsZWN0TmF0aXZlID0gJCgnLmpzLXNlbGVjdC1uYXRpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0TmF0aXZlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA3NjgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxlY3ROYXRpdmUuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSAkKHRoaXMpLmRhdGEoJ3BsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmaXJzdE9wdGlvbiA9ICQodGhpcykuZmluZChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wdGlvbjpmaXJzdC1jaGlsZCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRmaXJzdE9wdGlvbi50ZXh0KCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpcnN0T3B0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudmFsKHBsYWNlaG9sZGVyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQocGxhY2Vob2xkZXIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXBsYWNlaG9sZGVyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS53cmFwKCc8bGFiZWwgY2xhc3M9XCJiYi1zZWxlY3RcIj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmljb25TZWxlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1llYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVllYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVzZXRCdG4oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVDb2RlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vYmlsZVNlbGVjdCgpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpY29uU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkaWNvblNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LS1pY29uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRpY29uU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5iYi1pbnB1dC0tc2VsZWN0Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaWZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlmb3JtYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkcGFyZW50LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogLTFcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0ljb24gZm9udGF3ZXNvbWUgaW5zaWRlIHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaWZvcm1hdChpY29uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsT3B0aW9uID0gaWNvbi5lbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4+PGkgY2xhc3M9XCJzZWxlY3QyX19pY29uJyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChvcmlnaW5hbE9wdGlvbikuZGF0YSgnaWNvbicpICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj48L2k+ICcgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbi50ZXh0ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbG9yU2VsZWN0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkY29sb3JTZWxlY3QgPSAkZG9jdW1lbnQuZmluZCgnLmpzLXNlbGVjdC0tY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGNvbG9yU2VsZWN0LmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QtY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzZWFyY2gtZW5hYmxlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogaUJhbGwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IC0xLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGlCYWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRwYXJlbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ29sb3IgYmFsbCBpbnNpZGUgc2VsZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaUJhbGwoY29sb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRvcmlnaW5hbE9wdGlvbiA9IGNvbG9yLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvckJhbGwgPSAkKCRvcmlnaW5hbE9wdGlvbikuZGF0YSgnY29sb3InKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IudGV4dC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ3NlbGVjdC1jb2xvci0tcGFsZXR0ZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1zZWxlY3QtY29sb3JfX2l0ZW0+IDxzcGFuIGNsYXNzPVwic2VsZWN0LWNvbG9yX19saW5lXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yQmFsbH1cIj48L3NwYW4+PHA+ICR7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLnRleHRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDwvcD48L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcygnc2VsZWN0LWNvbG9yLS1wYWxldHRlJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPXNlbGVjdC1jb2xvcl9faXRlbT4gPHNwYW4gY2xhc3M9XCJzZWxlY3QtY29sb3JfX2JhbGxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JCYWxsfSBcIj4gPC9zcGFuPiA8L2Rpdj5gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dZZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXNldC15ZWFyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZVllYXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICR5ZWFyU2VsZWN0ID0gJCgnLmpzLXNlbGVjdC1ib3JuLS1jbGVhcicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAkeWVhclNlbGVjdC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ3NlbGVjdDI6b3BlbmluZycsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykub2ZmKCdzZWxlY3QyOm9wZW5pbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICR5ZWFyU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKCkgPT0gJycgJiZcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWJvcm4nKSA9PT0gJ3llYXInXHJcblxyXG4gICAgICAgICAgICAgICAgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZXQteWVhcicpLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNldC15ZWFyJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmV2KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFkZFJlc2V0QnRuOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZGF0ZVNlbGVjdCA9ICRkb2N1bWVudC5maW5kKCcuanMtc2VsZWN0LWJvcm4nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJGRhdGVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhcicpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KCcnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGhvbmVDb2RlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vQ2hhbmdlIHNlbGVjdCByZXN1bHRzIHRvIG9wdGlvbiB2YWx1ZVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29kZVNlbGVjdGlvbihvcHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0VmFsID0gJChvcHQuZWxlbWVudCkudmFsKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArIG9wdFZhbCArICc8L3NwYW4+J1xyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIGNpdHkgbmFtZSB0byBvcHRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvZGVSZXN1bHQob3B0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50cnkgPSAkKG9wdC5lbGVtZW50KS5kYXRhKCdjb3VudHJ5JyksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9wdFZhbCA9ICQob3B0LmVsZW1lbnQpLnZhbCgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPWN1c3RvbS1zZWxlY3RfX3Jlc3VsdHM+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4+JyArXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRWYWwgK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvc3Bhbj4nICtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0ICRwaG9uZUNvZGVCb3ggPSAkZG9jdW1lbnQuZmluZCgnLmpzLWlucHV0LXBob25lLWNvZGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCRwaG9uZUNvZGVCb3gubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHBob25lQ29kZUJveC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnNlbGVjdC12YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaW5wdXQgPSAkKHRoaXMpLmZpbmQoJy5iYi1pbnB1dF9faW5wdXQnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHdpbmRvdy53aWR0aCgpID49IDc2OCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QyKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IHNlbGVjdENvZGVSZXN1bHQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBzZWxlY3RDb2RlU2VsZWN0aW9uLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blBhcmVudDogJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHBhcmVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYmItc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJiLWlucHV0LS1zZWxlY3QtdmFsdWVcIj48L2Rpdj4nXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvblNlbGVjdCA9ICRwYXJlbnQuZmluZCgnb3B0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0VmFsdWUgPSAkcGFyZW50LmZpbmQoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy5iYi1pbnB1dC0tc2VsZWN0LXZhbHVlJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUudGV4dChvcHRpb25TZWxlY3QuZXEoMCkudmFsKCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2VsZWN0LmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9ICQodGhpcylbMF0uc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RWYWx1ZS50ZXh0KG9wdGlvblNlbGVjdC5lcShjb3VudGVyKS52YWwoKSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2lucHV0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5pbnB1dG1hc2soe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogJyg5OTkpIDk5OS05OS05OSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0Lm9uKCdmb2N1cycsIGFkZEZvY3VzKS5vbignYmx1cicsIHJlbW92ZUZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdzZWxlY3QyOm9wZW4nLCBhZGRGb2N1cylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignc2VsZWN0MjpjbG9zZScsIHJlbW92ZUZvY3VzKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRGb2N1cygpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLWlucHV0LXBob25lLWNvZGUnKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlbW92ZUZvY3VzKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gJycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtaW5wdXQtcGhvbmUtY29kZScpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtb2JpbGVTZWxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0ICRzZWxlY3QgPSAkKCcuanMtbW92ZS1zZWxlY3QnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJHNlbGVjdC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCAkaW5wdXRTZWFyY2ggPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fZmllbGQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgJHJlc3VsdEl0ZW0gPSAkKHRoaXMpLmZpbmQoJy5tb3ZlLXNlbGVjdF9fcmVzdWx0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0ICRidG5DbG9zZSA9ICQodGhpcykuZmluZCgnLmpzLW1vdmUtc2VsZWN0LS1jbG9zZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJGlucHV0U2VhcmNoLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLW1vdmUtc2VsZWN0JylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICRidG5DbG9zZS5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1tb3ZlLXNlbGVjdCcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXRTZWFyY2guYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICcubW92ZS1zZWxlY3RfX3Jlc3VsdCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3VsdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBtZW51OiB7XHJcblxyXG4gICAgICAgIC8vSGFtYnVyZ2VyIGJ0blxyXG5cclxuICAgICAgICBoYW1idXJnZXJCdG46IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGhhbWJ1cmdlci5vbignY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ29uJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fYWRkU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLmpzLW1vYmlsZS1uYXYtLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vV2hlbiBDbGljayBPdXRzaWRlIENsb3NlIE1lbnVcclxuXHJcbiAgICAgICAgY2xpY2tPdXNpZGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJGRvY3VtZW50XHJcblxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljayBtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmpzLW1vYmlsZS1uYXYsIC5qcy1kYXRlLCAuZGF0ZXBpY2tlciwgLmNhcmQtaW5mb19fcmVxdWVzdCwgLmNhdGFsb2ctZmlsdGVyLCAuanMtbW9iaWxlLWZpbHRlci0tb3BlbiwgLmpzLWJiLWFjY29yZGVvbidcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEJhc2UubWVudS5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJy5vdmVybGF5JyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgQmFzZS5tZW51Ll9yZW1vdmVTdHlsZVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vTW9iaWxlIFNlYXJjaCBCdG4gb3Blbi9jbG9zZVxyXG5cclxuICAgICAgICBzZWFyY2hCdG5PcGVuQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlYXJjaEJ0biA9ICQoJy5qcy1tb2JpbGUtc2VhcmNoLWJ0bicpO1xyXG5cclxuICAgICAgICAgICAgc2VhcmNoQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkd3JhcHBlci5oYXNDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdtb2JpbGUtc2VhcmNoLS1vcGVuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnbW9iaWxlLXNlYXJjaC0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hZGRTdHlsZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvbicpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXIuYWRkQ2xhc3MoJ21vYmlsZS1uYXYtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICRvdmVybGF5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3JlbW92ZVN0eWxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ29uJyk7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi0tb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkb3ZlcmxheS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcG9wdXA6IHtcclxuXHJcbiAgICAgICAgLy9Nb2RhbCBGYW5jeUJveCAzIGh0dHBzOi8vZmFuY3lhcHBzLmNvbS9mYW5jeWJveC8zL1xyXG5cclxuICAgICAgICBwb3B1cEZhbmN5Qm94OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveF0nKS5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1mYW5jeWJveF0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2JiLXdpbmRvd19fd3JhcCcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZDogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICgkKCdbZGF0YS1mYW5jeWJveD1cImltYWdlc1wiXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94PVwiaW1hZ2VcIl0nKS5mYW5jeWJveCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDbGFzczogJ2ZhbmN5Ym94LWNvbnRhaW5lci0taW1hZ2UnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b29sYmFyOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrQ29udGVudDogJ2Nsb3NlJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrU2xpZGU6ICdjbG9zZSdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtZmFuY3lib3gtbm8tdG91Y2hdJykuZmFuY3lib3goe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBiYXNlQ2xhc3M6ICdiYi13aW5kb3dfX3dyYXAnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXI6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbWFsbEJ0bjogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGlja091dHNpZGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLWZhbmN5Ym94LW5vLWNsb3NlXScpLmZhbmN5Ym94KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNsYXNzOiAnYmItd2luZG93X193cmFwJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUNsaWNrT3V0c2lkZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNtYWxsQnRuOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbW9kYWw6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9Gb3JtIFdobyBJcz9cclxuXHJcbiAgICAgICAgd2hvSXM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLmpzLXdob2lzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHdob2lzID0gJCh0aGlzKS5kYXRhKCd3aG9pcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmb3JtID0gJCgnI2F1dGgtZm9ybScpLmZpbmQoJy5mb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdob2lzID09PSAnbWFzdGVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1tYXN0ZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdob2lzID09PSAnc3R1ZGlvJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1zdHVkaW8nKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZENsYXNzKCdpcy1jbGllbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy9EdW5hbWljbHkgY2hhbmdlIGZvcm0gdGl0bGVcclxuXHJcbiAgICAgICAgY2hhbmdlRm9ybVRpdGxlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICRkb2N1bWVudC5vbihcclxuXHJcbiAgICAgICAgICAgICAgICAnY2xpY2sgbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG5cclxuICAgICAgICAgICAgICAgICcuanMtZm9ybS10aXRsZScsXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1mb3JtLXRpdGxlJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5mb3JtJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZm9ybV9fYnRuJylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KHRleHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlaW5pdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIEJhc2Uuc2VsZWN0LmNvbG9yU2VsZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENhdGFsb2dcclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IGNhdGFsb2cgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXRhbG9nLm1hcFRvZ2dsZSgpO1xyXG4gICAgICAgIGNhdGFsb2cuYnRuRmlsdGVyT3BlbigpO1xyXG4gICAgICAgIGNhdGFsb2cuYnRuU2hvd0NhdGFsb2coKTtcclxuICAgICAgICBjYXRhbG9nLmJ0blNob3dNYXAoKTtcclxuICAgICAgICBjYXRhbG9nLnN0aWNreUZpbHRlcigpO1xyXG4gICAgICAgIGNhdGFsb2cuZmlsdGVyQ2F0ZWdvcnkoKTtcclxuICAgICAgICBjYXRhbG9nLm1vdmVCbG9ja3MoKTtcclxuICAgICAgICBjYXRhbG9nLmlmUGFnZUNhdGFsb2coKTtcclxuICAgIH0sXHJcbiAgICAvL0NhdGFsb2cgbWFwIFRvZ2dsZVxyXG4gICAgbWFwVG9nZ2xlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2F0YWxvZy0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwLS1zaG93JykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1jYXRhbG9nLW1hcC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctLXNob3cnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CdG4gZmlsdGVyIG9wZW5cclxuICAgIGJ0bkZpbHRlck9wZW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1tb2JpbGUtZmlsdGVyLS1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXRhbG9nRmlsdGVyID0gJCgnLmNhdGFsb2ctZmlsdGVyJyk7XHJcbiAgICAgICAgICAgIGlmIChjYXRhbG9nRmlsdGVyLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIGNhdGFsb2dGaWx0ZXIucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXRhbG9nRmlsdGVyLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CdG4gc2hvdyBjYXRhbG9nXHJcbiAgICBidG5TaG93Q2F0YWxvZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzLXNob3ctLWxpc3QnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgJCgnLmNhdGFsb2ctY29udGVudF9faW5uZXInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0YWxvZy1tYXAnKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy9CdG4gc2hvdyBtYXAgLSBoaWRlIGNhdGFsb2dcclxuICAgIGJ0blNob3dNYXA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qcy1zaG93LS1tYXAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICQoJy5jYXRhbG9nLWNvbnRlbnRfX2lubmVyJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLXN0aWt5LWJsb2NrJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctbWFwJykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8vU3RpY2t5IEZpbHRlciBodHRwczovL2dpdGh1Yi5jb20vYWJvdW9saWEvc3RpY2t5LXNpZGViYXJcclxuICAgIHN0aWNreUZpbHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1zdGlreS1ibG9jaycpLmxlbmd0aCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICBuZXcgU3RpY2t5U2lkZWJhcignLmpzLXN0aWt5LWJsb2NrJywge1xyXG4gICAgICAgICAgICAgICAgdG9wU3BhY2luZzogMTEwLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tU3BhY2luZzogMTAsXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJTZWxlY3RvcjogJy5jYXRhbG9nLWNvbnRlbnQnLFxyXG4gICAgICAgICAgICAgICAgaW5uZXJXcmFwcGVyU2VsZWN0b3I6ICcuY2F0YWxvZy1maWx0ZXJfX2lubmVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9maWx0ZXIgY2F0ZWdvcnlcclxuICAgIGZpbHRlckNhdGVnb3J5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2xpbmsnKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19saW5rJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vdCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5LS1yZXNldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0ZWdvcnlfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuanMtY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oYXNDbGFzcygnaXMtc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWNhdGVnb3J5JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGVnb3J5X19saW5rJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5qcy1jYXRlZ29yeScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5jYXRlZ29yeV9fbGluaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm90KHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL01vdmUgYmxvY2sgaW4gbWVkaWEgc2NyZWVuXHJcbiAgICBtb3ZlQmxvY2tzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XHJcbiAgICAgICAgICAgICQoJy5qcy12aWV3LXRvZ2dsZScpLmluc2VydEJlZm9yZSgnLmNhdGFsb2dfX2lubmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vSWYgcGFnZSBjYXRhbG9nIGZpbHRlciB0cmFuc2Zvcm0gYWNjb3JkZW9uXHJcbiAgICBpZlBhZ2VDYXRhbG9nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJHdyYXBwZXIuaGFzQ2xhc3MoJ3BhZ2UtY2F0YWxvZycpKSB7XHJcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ2hlYWRlci0tZml4ZWQnKTtcclxuICAgICAgICAgICAgJG1haW4uY3NzKCdwYWRkaW5nLXRvcCcsICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCgpKTtcclxuICAgICAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jYXRhbG9nLWZpbHRlcl9fYm9keScpLmFkZENsYXNzKFxyXG4gICAgICAgICAgICAgICAgICAgICdiYi1hY2NvcmRlb24gYmItYWNjb3JkZW9uLS1vdGhlciBqcy1iYi1hY2NvcmRlb24nXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgJCgnLmpzLWNhdGFsb2ctZmlsdGVyLWl0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdiYi1hY2NvcmRlb25fX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmNhdGFsb2ctZmlsdGVyX190aXRsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub3QoJy5jYXRhbG9nLWZpbHRlcl9fdGl0bGVfY2F0ZWdvcnknKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLWFjY29yZGVvbl9fdGl0bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuY2F0YWxvZy1maWx0ZXJfX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2JiLWFjY29yZGVvbl9fY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQoJy5qcy1jYXRhbG9nLWZpbHRlci1pdGVtOmx0KDIpJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuYmItYWNjb3JkZW9uX19jb250ZW50JylcclxuICAgICAgICAgICAgICAgICAgICAuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FyZFxyXG4gKlxyXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxyXG4gKi9cclxuY29uc3QgY2FyZCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhcmQuc2xpZGVyKCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU2Nyb2xsc3B5KCk7XHJcbiAgICAgICAgY2FyZC5jYXJkU3RpY2t5KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA3NjgpIHtcclxuICAgICAgICAgICAgY2FyZC5jYXJkUmVxdWVzdFRvZ2dsZSgpO1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRNb3ZlSXRlbXMoKTtcclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cucmVzaXplKGNhcmQuY2FyZE1vdmVJdGVtcygpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy9DYXJkIFNsaWRlclxyXG4gICAgc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnLmpzLWNhcmQtc2xpZGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCAkY2FyZFNsaWRlciA9ICQoJy5qcy1jYXJkLXNsaWRlcicpO1xyXG5cclxuICAgICAgICAgICAgJGNhcmRTbGlkZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHNsaWRlcyA9IF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3NsaWRlcycpO1xyXG4gICAgICAgICAgICAgICAgbGV0ICRzbGlkZXJEb3RzID0gJCh0aGlzKS5maW5kKCcuYmItc2xpZGVyX19kb3RzJyk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXJEb3RzLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdpbml0JywgZnVuY3Rpb24oZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVyRG90cy5wcmVwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tbm93Jz4xPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlckRvdHMuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3M9J2JiLXNsaWRlcl9fcGFnZXIgYmItc2xpZGVyX19wYWdlci0tdG90YWwnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2suc2xpZGVDb3VudCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmQoJy5iYi1zbGlkZXJfX3BhZ2VyLS1ub3cnKS5odG1sKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQ2FyZCByZXF1ZXN0IHNob3cgLyBoaWRlXHJcbiAgICBjYXJkUmVxdWVzdFRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNhcmRJbmZvUmVxdWVzdCA9ICQoJy5jYXJkLWluZm9fX3JlcXVlc3QnKTtcclxuXHJcbiAgICAgICAgJCgnLmpzLWNhcmQtcmVxdWVzdC0tc2hvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY2FyZEluZm9SZXF1ZXN0Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLWhpZGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNhcmRJbmZvUmVxdWVzdC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXJkSW5mb1JlcXVlc3QucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICRodG1sLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL01vdmUgYmxvY2tzIHdoZW4gd2luZG93IHdpZHRoIDwgNzY4XHJcbiAgICBjYXJkTW92ZUl0ZW1zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanMtY2FyZC10aXRsZScpLmluc2VydEFmdGVyKCcuY2FyZC1nYWxsYXJ5X193cmFwJyk7XHJcbiAgICAgICAgJCgnLmpzLWNhcmQtYWJvdXQnKS5pbnNlcnRCZWZvcmUoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLWluZm8tY2F0ZWdvcnknKS5hcHBlbmRUbygnLmNhcmQtaW5mb19fcmVxdWVzdCcpO1xyXG4gICAgICAgICQoJy5qcy1jYXJkLXJlcXVlc3QtLXNob3cnKS5wcmVwZW5kVG8oJy5jYXJkLWluZm9fX3RvcCcpO1xyXG4gICAgICAgICQoJy5jYXJkLWluZm9fX2lubmVyJykuaW5zZXJ0QWZ0ZXIoJy5jYXJkLWFkcmVzcycpO1xyXG4gICAgICAgICQoJy5qcy1tb3ZlLWNhcmQtcG9saWN5JykuYXBwZW5kVG8oJy5jYXJkLXJlcXVlc3QtZm9ybScpO1xyXG4gICAgfSxcclxuICAgIC8vQ2FyZCBTY3JvbGxzcHlcclxuICAgIGNhcmRTY3JvbGxzcHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuanMtc2Nyb2xsc3B5JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTEwMCB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXNjcm9sbHNweScpLnNjcm9sbHNweSh7IG9mZnNldDogLTYwIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FyZFN0aWNreTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5qcy1jYXJkLXN0aWNreScpLmxlbmd0aCAmJiAkKCcuanMtY2FyZC1maXhlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgc3RpY2t5QmxvY2sgPSAkKCcuanMtY2FyZC1zdGlja3knKTtcclxuICAgICAgICAgICAgdmFyIHN0aWNreUJsb2NrT2Zmc2V0ID0gc3RpY2t5QmxvY2sub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRCbG9jayA9ICQoJy5qcy1jYXJkLWZpeGVkJyk7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZEJsb2NrT2Zmc2V0ID0gZml4ZWRCbG9jay5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZENvbnRlbnQgPSAkKCcuanMtY2FyZC1jb250ZW50LWZpeGVkJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FyZE1lbnUgPSAkKCcuanMtY2FyZC1tZW51Jyk7XHJcbiAgICAgICAgICAgIHZhciBjYXJkTWVudUNsb25lID0gJCgnPGRpdiBjbGFzcz1cImNhcmQtbWVudV9fY2xvbmVcIj4nKVxyXG4gICAgICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJCgnLmpzLWNhcmQtbWVudScpLm91dGVySGVpZ2h0KHRydWUpKVxyXG4gICAgICAgICAgICAgICAgLmluc2VydEFmdGVyKGNhcmRNZW51KVxyXG4gICAgICAgICAgICAgICAgLmhpZGUoKTtcclxuICAgICAgICAgICAgdmFyIGNhcmRNZW51T2Zmc2V0ID0gY2FyZE1lbnUub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc3RpY2t5QmxvY2subGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5oZWlnaHQoKSA8IGNhcmRDb250ZW50LmhlaWdodCgpICYmXHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykud2lkdGgoKSA+IDc2OFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGZpeENhcmRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBmaXhDYXJkVXNlckluZm8oKSB7XHJcbiAgICAgICAgICAgICAgICAkd2luZG93LnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+PSBzdGlja3lCbG9ja09mZnNldCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRCbG9ja09mZnNldCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QmxvY2sub3V0ZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IC0xICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID49IHN0aWNreUJsb2NrT2Zmc2V0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLm91dGVySGVpZ2h0KHRydWUpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5vdXRlckhlaWdodCgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lCbG9jay5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNzUgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUJsb2NrLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYXJkTWVudS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRNZW51Rml4ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2FyZE1lbnVGaXhlZCgpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gY2FyZE1lbnVPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnVDbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRNZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDk5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTWVudUNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE1lbnUucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIE1haW5cclxuICpcclxuICogQGF1dGhvciBBbnRvbiBVc3Rpbm9mZiA8YS5hLnVzdGlub2ZmQGdtYWlsLmNvbT5cclxuICovXHJcbmNvbnN0IE1haW4gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLm1vdmVCbG9ja3MoKTtcclxuICAgICAgICB0aGlzLnBhZ2VQcm9tby5pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgbW92ZUJsb2NrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICAkKCcuYmItYmxvZycpLmluc2VydEFmdGVyKCcuYmItY2F0ZWdvcnknKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFnZVByb21vOiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuanMtYmItc2xpZGVyLS1wcm9tbycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgTWFpbi5wYWdlUHJvbW8uc2xpZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgTWFpbi5wYWdlUHJvbW8ubW92ZUJsb2NrcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtYmItc2xpZGVyLS1wcm9tbycpXHJcbiAgICAgICAgICAgICAgICAubm90KCcuc2xpY2staW5pdGlhbGl6ZWQnKVxyXG4gICAgICAgICAgICAgICAgLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICcuYmItc2xpZGVyX19hcnJvdy0tbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnLmJiLXNsaWRlcl9fYXJyb3ctLXByZXYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdmVCbG9ja3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtcHJvbW8tZm9ybScpLmluc2VydEFmdGVyKCcucHJvbW9fX3dyYXAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgJChCYXNlLmluaXQoKSk7XHJcbiAgICAkKE1haW4uaW5pdCgpKTtcclxuICAgICQoY2F0YWxvZy5pbml0KCkpO1xyXG4gICAgJChjYXJkLmluaXQoKSk7XHJcbn0pO1xyXG5cclxuLypcclxuICoqKiBmdW5jdGlvbnMuanNcclxuICovXHJcbi8vUHVzaFVwXHJcbmZ1bmN0aW9uIHB1c2hVcChvcHRpb25zKSB7XHJcbiAgICB2YXIgdGV4dCA9IG9wdGlvbnMudGV4dCB8fCAn0JLQsNC8INC90L7QstCw0Y8g0LfQsNGP0LLQutCwJztcclxuICAgIHZhciBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAnc3VjY2Vzcyc7XHJcblxyXG4gICAgdmFyIHB1c2hDb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdiYi1wdXNoVXAnKTtcclxuICAgIHZhciBwdXNoVXBDbG9zZSA9ICQoJzxpIGNsYXNzPVwiZmFsIGZhLXRpbWVzXCI+PC9pPicpLmFkZENsYXNzKFxyXG4gICAgICAgICdiYi1wdXNoVXBfX2Nsb3NlIGpzLXB1c2hVcC0tY2xvc2UnXHJcbiAgICApO1xyXG5cclxuICAgIHB1c2hDb250YWluZXIuYXBwZW5kVG8oJCgnYm9keScpKTtcclxuICAgIHB1c2hDb250YWluZXIudGV4dCh0ZXh0KTtcclxuICAgIHB1c2hVcENsb3NlLmFwcGVuZFRvKHB1c2hDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChzdGF0dXMgPT09ICdlcnJvcicpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1zdWNjZXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zaFBvcygpO1xyXG5cclxuICAgIHJhZihmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcHVzaENvbnRhaW5lci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgcG9zaFBvcygpO1xyXG4gICAgfSwgNDUwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwdXNoQ29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0sIDUwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtcHVzaFVwLS1jbG9zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItcHVzaFVwJyk7XHJcbiAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIHBvc2hQb3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvc2hQb3MoKSB7XHJcbiAgICAgICAgJCgnLmJiLXB1c2hVcCcpLmVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gJCgnLmJiLXB1c2hVcCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgaGVpZ2h0ICogZSArIDEwICsgZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbmZ1bmN0aW9uIHJhZihmbikge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vU2V0IElucHV0IERhdGUgVmFsdWVcclxuZnVuY3Rpb24gc2V0SW5wdXREYXRlKHNlbGVjdG9yKSB7XHJcbiAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgbGV0IGhveSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZCA9IGhveS5nZXREYXRlKCksXHJcbiAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICB5ID0gaG95LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF0YTtcclxuXHJcbiAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgZCA9ICcwJyArIGQ7XHJcbiAgICB9XHJcbiAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgbSA9ICcwJyArIG07XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gX2RhdC5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICAgIF9kYXRbaV0udmFsdWUgPSBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIEFkZCBSZW1vdmUgQ2xhc3MgZnJvbSBCbG9ja1xyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzc0Jsb2NrKGJsb2NrLCBjbCkge1xyXG4gICAgJChibG9jayArICctLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGJsb2NrKS5hZGRDbGFzcyhjbCk7XHJcbiAgICB9KTtcclxuICAgICQoYmxvY2sgKyAnLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoYmxvY2spLnJlbW92ZUNsYXNzKGNsKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRSZW1vdmVDbGFzcyhibG9jaywgY2wpIHtcclxuICAgICQoYmxvY2spLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoY2wpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrIG1vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KGJsb2NrKS5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAkKGJsb2NrKS5yZW1vdmVDbGFzcyhjbCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4iXX0=
