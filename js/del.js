'use strict';

if ($('.catalog-filter__item_price').length) {
    var slider = document.getElementById('js-catalog-filter-slider');
    var allPriceStart = $('#js-catalog-filter-slider').data('start');
    var allPriceEnd = $('#js-catalog-filter-slider').data('end');
    var spans = [$('#jsPriceStart'), $('#jsPriceEnd')];
    var startPrice;
    var endPrice;
    var arrParams;
    var sUrl;

    if (spans[0].text() == '') {
        startPrice = allPriceStart;
    } else {
        startPrice = parseInt(spans[0].text());
    }

    if (spans[1].text() == '') {
        endPrice = allPriceEnd;
    } else {
        endPrice = parseInt(spans[1].text());
    }

    noUiSlider.create(slider, {
        start: [startPrice, endPrice],
        connect: true,
        range: {
            min: allPriceStart,
            max: allPriceEnd
        }
    });
    slider.noUiSlider.on('update', function (values, handle) {
        spans[handle].text(parseInt(values[handle]));
    });
}

$('.js-catalog-filter--close').on('click', function () {
    $('.catalog-filter').removeClass('is-open');
    $('html').removeAttr('style');

    return false;
});

$('.js-card-services-item').on('click', function (e) {
    if ($(e.target).closest('.card-services-item__middle, .card-services-item__info-block, .card-services-item__bottom').length) {
        return;
    } else {
        var _this = $(this);
        var add = _this.find('.card-services-item__action_add');
        var done = _this.find('.card-services-item__action_done');
        var del = _this.find('.card-services-item__action_del');

        if (_this.hasClass('is-booked')) {
            _this.removeClass('is-booked');
            add.removeAttr('style');
            done.removeAttr('style');
        } else {
            _this.addClass('is-booked');
            add.css('display', 'none');
            done.css('display', 'block');
        }
    }
});

//Favorite btn
$(document).on('click', '.js-btn-fav', function (e) {
    $(this).toggleClass('is-checked');
    return false;
});

//Confirm phone
$('.js-timer--repeat').on('click', function (e) {
    $(this).parent('.phone-confirm__repeat').css('display', 'none').closest('.js-confirm').find('.confirm__timer, .confirm__field').removeAttr('style');
    phoneConfirmTimer();
});

function phoneConfirmTimer() {
    var timer = $('.js-timer');
    console.log(timer.data('timer'));
    var tim = function tim() {
        setTimeout(function () {
            var t = timer.data('timer');
            timer.text(t);
            console.log(t);
            var int = setInterval(function () {
                t--;
                if (t == -1) {
                    clearInterval(int);
                    timer.parent().css('display', 'none');
                    $('.js-timer--repeat').parent('.phone-confirm__repeat').removeAttr('style');
                } else {
                    timer.text(t);
                }
            }, 1000);
            $('.js-timer--repeat').on('click', function (e) {
                clearInterval(int);
                tim();
            });
        });
    };
    tim();
}

//Textarea autoHeight
if ($('.js-textarea').length) {
    var textarea = $('.js-textarea');
    textarea.on('keydown', autosize);

    textarea.on('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
            textarea.value += '\r\n';
        } else if (e.keyCode === 13 || e.keyCode === 10) {
            this.parentNode.submit();
            e.preventDefault();
        }
    });
}

function autosize() {
    var el = this;
    var chatBody = $('.chat__body');
    var chatFooterHeight = $('.chat__footer').outerHeight();
    setTimeout(function () {
        el.style.cssText = 'height:37px';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
        chatBody.css({
            bottom: 39 + el.scrollHeight + 'px'
        });
        if (el.scrollHeight >= 123) {
            el.style.overflow = 'auto';
            chatBody.css({
                bottom: chatFooterHeight + 'px'
            });
        }
    }, 0);
}

$('.js-disable-category').on('click', function () {
    var title = $(this).data('title');
    if ($(this).hasClass('is-checked')) {
        $('#disable-category').modal('show');
        $('.disable-category__data-title').text(title);
    } else {
        $(this).addClass('is-checked');
    }
});

//Search Hint
if ($('.js-search-input').length) {
    var searchInput = $('.js-search-input');
    searchInput.on('keyup', function () {
        var hint = $(this).closest('.js-search').find('.search__hint');
        if ($(this).val() != '') {
            hint.removeAttr('style');
        } else {
            hint.css('display', 'none');
        }
    }).on('focus', function () {
        var hint = $(this).closest('.js-search').find('.search__hint');
        if ($(this).val() != '') {
            hint.removeAttr('style');
        }
    }).on('blur', function () {
        var hint = $(this).closest('.js-search').find('.search__hint');

        if ($(window).width() > 768) {
            if ($(this).val() != '') {
                hint.css('display', 'none');
            }
        }
    });
}

//Crm.aplication.changeSrvice
$(document).on('select2:select', '.js-select--services', function () {
    var $parrent = $(this).closest('.js-aplication-item');
    $parrent.find('.js-aplication-item-service').find('.bb-input__wrap').addClass('is-hidden').end().find('.js-aplication-item--edit').removeClass('is-hidden');
});

//Crm.request sortable
$('.js-sortable').sortable({
    connectWith: '.js-sortable',
    cursor: 'move',
    tolerance: 'pointer',
    start: function start(e, ui) {
        ui.item.addClass('drag-sort');
    },
    stop: function stop(e, ui) {
        ui.item.removeClass('drag-sort');
        ui.item.removeClass('request-item--new');
        Crm.request.wigetReplaceIcon(ui.item);
    }
}).disableSelection();

//Studio toggle control
function toggleControl() {
    $document.on('click', '.js-studio-system-btn', function () {
        var $parent = $(this).closest('.js-studio-system');
        var $widgetLeft = $parent.find('.widget__left');
        var $widgetRight = $parent.find('.widget__right');
        var $titleLeft = $parent.find('.bb-checkbox__title--left');
        var $titleRight = $parent.find('.bb-checkbox__title--right');

        if ($(this).hasClass('is-checked')) {
            remove($widgetRight);
            add($widgetLeft);
            $titleLeft.addClass('is-checked');
            $titleRight.removeClass('is-checked');
        } else {
            remove($widgetLeft);
            add($widgetRight);
            $titleLeft.removeClass('is-checked');
            $titleRight.addClass('is-checked');
        }
    });

    function add(el) {
        el.find('.list--icon').addClass('list-color--success').find('.list__icon').removeClass('fal').addClass('fas');
    }

    function remove(el) {
        el.find('.list--icon').removeClass('list-color--success').find('.list__icon').removeClass('fas').addClass('fal');
    }
}
toggleControl();

//Card Adress Map
if ($('#card-map').length) {
    var init = function init() {
        myMap = new ymaps.Map('card-map', {
            center: [55.73226853, 37.6209191],
            zoom: 16
        });

        myMap.behaviors.disable(['scrollZoom']);

        myMap.controls.remove('searchControl').remove('typeSelector').add('routeEditor');

        myPin = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/general/map-pin.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });

        myPlacemark = new ymaps.Placemark([55.73226853, 37.6209191], {
            balloonContentHeader: '<span class="map-pin__title">Nailz X Collab</span>',
            balloonContentBody: '<span class="map-pin__place">ул. Большая Полянка, 51А/9, Московский р-н</span> <div class="map-pin__properties"><ul class="properties__list"><li class="properties__item properties__item_sale bb-dropdown top bb-dropdown--hover js-bb-dropdown"> <svg class="icon icon-procent "><use xlink:href="img/sprite.svg#procent"></use></svg><div class="bb-dropdown__list">есть скидки</div></li><li class="properties__item properties__item_car bb-dropdown top bb-dropdown--hover js-bb-dropdown"> <svg class="icon icon-car "><use xlink:href="img/sprite.svg#car"></use></svg><div class="bb-dropdown__list">могу приехать</div></li></ul></div>',
            hintContent: '<div class="map-pin__hover">1-комнатная квартира <div class="rating"><div class="rating__inner" style="width: 90%"></div></div> <span>от 2 800 <i class="rub">a</i></span> </div>'
        });

        myPin.add(myPlacemark);
        myMap.geoObjects.add(myPin);
    };

    ymaps.ready(init);
    var myMap, myPlacemark, myPin;
}

//Cabinet Map
if ($('#cabinet-map').length) {
    var _init = function _init() {
        myMap = new ymaps.Map('cabinet-map', {
            center: [55.73226853, 37.6209191],
            zoom: 16
        });

        myMap.behaviors.disable(['scrollZoom']);

        myMap.controls.remove('searchControl').remove('typeSelector').add('routeEditor');

        myPin = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/general/map-pin.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });

        myPlacemark = new ymaps.Placemark([55.73226853, 37.6209191]);

        myPin.add(myPlacemark);
        myMap.geoObjects.add(myPin);
    };

    ymaps.ready(_init);
    var myMap, myPlacemark, myPin;
}

//Catalog Map
if ($('#catalog-map, #map').length) {
    var _init2 = function _init2() {
        myMap = new ymaps.Map('catalog-map', {
            center: [55.73226853, 37.6209191],
            zoom: 16
        });

        myMap.behaviors.disable(['scrollZoom']);

        myMap.controls.remove('searchControl').remove('typeSelector').add('routeEditor');

        myPin = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/general/map-pin.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });

        myPlacemark = new ymaps.Placemark([55.73226853, 37.6209191], {
            balloonContentHeader: '<span class="map-pin__title">Студия "Слеза дракона"</span><div class="map-pin__address">Москва, ул. Гагарина, 28/2, м. Лубянка</div>',
            balloonContentBody: '<div class="map-pin__image js-ss-map-slider image-wrapper"                data-ss-images="../img/examples/user/catalog/catalog-0.jpg;../img/examples/user/catalog/catalog-1.jpg;../img/examples/user/catalog/catalog-2.jpg;../img/examples/user/catalog/catalog-3.jpg;../img/examples/user/catalog/catalog-4.jpg"><img src="../img/examples/user/catalog/catalog-0.jpg"></div><div class="map-pin__info"><div class="rating map-pin__rating"><div class="rating__inner" style="width: 70%"></div><span class="rating__rev-count">(77)</span></div><button class="button-icon button-icon--fav map-pin__fav js-btn-fav"></button></div>'
            // hintContent:
            // '<div class="map-pin__hover">1-комнатная квартира <div class="rating"><div class="rating__inner" style="width: 90%"></div></div> <span>от 2 800 <i class="rub">a</i></span> </div>'
        });

        myMap.events.add('click', function () {});

        myPlacemark.events.add('click', function () {
            $('.js-ss-map-slider').simpleslider();
            console.log('---', 'baloon click');
        });

        myPin.add(myPlacemark);
        myMap.geoObjects.add(myPin);
    };

    ymaps.ready(_init2);
    var myMap, myPlacemark, myPin;
}

/*
*** DatePicker
*/
(function () {
    var $datepicker = $('.js-date');
    var dateToday = new Date();

    $datepicker.each(function () {
        var $parent = $(this).closest('.bb-date');
        var $btnToday = $parent.find('.bb-date__btn--today');
        var $btnPrev = $parent.find('.bb-date__btn--prev');
        var $btnNext = $parent.find('.bb-date__btn--next');
        var type = $(this).attr('data-type');

        if (type === 'expanded') {
            var _self = $(this);
            var val = $(this).val();

            changeVal($(this), val);

            $(this).datepicker({
                autoClose: true,
                minDate: false,

                onSelect: function onSelect(formattedDate) {
                    changeVal(_self, formattedDate);
                }
            }).data('datepicker').selectDate(dateToday);

            //Picker with controls
        } else if (type === 'controls') {
            var _self2 = $(this);
            var _val = $(this).val();

            changeVal($(this), _val);

            $(this).datepicker({
                autoClose: true,
                showWeek: true,
                minDate: false,

                onSelect: function onSelect(formattedDate, date, inst) {
                    var startDate = void 0,
                        endDate = void 0;

                    var currentDate = date.getDate();
                    var currentMonth = date.getMonth();

                    startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

                    // endDate = new Date(
                    //     date.getFullYear(),
                    //     date.getMonth(),
                    //     date.getDate() - date.getDay() + 7
                    // );

                    endDate = date.getDate() - date.getDay() + 7 + ' ' + date.getMonth();

                    changeVal(_self2, formattedDate);
                }
            }).data('datepicker').selectDate(dateToday);
        } else {
            if ($(window).width() > 480) {
                $(this).datepicker({
                    dateFormat: 'dd.mm.yy',
                    autoClose: true,
                    minDate: dateToday
                }).data('datepicker').selectDate(dateToday);
            } else {
                $datepicker.each(function () {
                    $(this).attr('type', 'date');
                });
                setInputDate('.js-date');
            }
        }

        $btnToday.on('click', function (e) {
            e.preventDefault();
            $parent.find('.js-date').data('datepicker').selectDate(dateToday);
        });

        $btnPrev.on('click', function (e) {
            e.preventDefault();
            $parent.find('.js-date').data('datepicker').prev();

            console.log('---', 'click prev');
        });

        //Show Datepicker when click parrent container
        $parent.find('.js-date-field').on('click', function () {
            var $datepicker = $(this).closest('.bb-date').find('.js-date').datepicker().data('datepicker');

            $datepicker.show();
        });

        //Change date field (not input) value
        function changeVal(el, val) {
            el.closest('.bb-date').find('.js-date-field').text(val);
        }
    });

    //Click icon - show picker
    $('.js-input-icon').on('click', function (e) {
        e.preventDefault();
        $('.js-date').focus();
    });
})();

function updateDataSchedule() {
    var date = new Date();
    var crmScheduleInputCalendarTop = $('.jsCrmScheduleInputCalendarTop');
    var ruDates = getWeekSchedule(date);

    updateValSchedule(ruDates);

    if (crmScheduleInputCalendarTop.length) {
        crmScheduleInputCalendarTop.datepicker({
            autoClose: true,
            toggleSelected: false,
            minDate: false,
            onSelect: function onSelect(formattedDate, date) {
                var ruDates = getWeekSchedule(date);

                updateValSchedule(ruDates);
            }
        }).data('datepicker').selectDate();
    }
}
updateDataSchedule();

(function datePickerInline() {
    var eventDates = [1, 10, 12, 22];

    $('.js-date-inline').datepicker({
        inline: true,
        multipleDates: true,
        onRenderCell: function onRenderCell(date, cellType) {
            var currentDate = date.getDate();

            if (cellType == 'day' && eventDates.indexOf(currentDate) != -1) {
                return {
                    classes: 'is-checked'
                };
            }
        }
    });
})();

function updateValSchedule(value) {
    var crmScheduleDateFieldTop = $('.jsCrmScheduleDateFieldTop');

    crmScheduleDateFieldTop.text(value.get('text'));

    crmScheduleDateFieldTop.on('click', function () {
        $('.jsCrmScheduleInputCalendarTop').datepicker().data('datepicker').show();
    });
}

function getWeekSchedule(date) {
    var curr = new Date(date);
    var currDay = curr.getDay();
    var currMonth = curr.getMonth();
    var monday = void 0;
    var sunday = void 0;

    if (currDay === 0) {
        monday = curr.getDate() - 6;
        sunday = curr.getDate();
    } else {
        monday = curr.getDate() - curr.getDay() + 1;
        sunday = monday + 6;
    }

    return getRightWeekText(curr, monday, sunday, currMonth);
}

function getRightWeekText(currDate, monday, sunday, month) {
    var firstDay = void 0;
    var lastDay = void 0;
    var params = {
        month: 'short'
    };
    var oDayF = void 0;
    var oDayL = void 0;
    var oMonthF = void 0;
    var oMonthL = void 0;
    var oYearF = void 0;
    var oYearL = void 0;
    var arrData = new FormData();
    var temp = void 0;

    if (sunday > monday && (monday === 0 || monday < 0)) {
        var newMonth = new Date(currDate.getFullYear(), month, 1);

        firstDay = new Date(currDate.setDate(monday));
        oDayF = firstDay.getDate();
        oYearF = firstDay.getFullYear();

        firstDay = firstDay.toLocaleString('ru', params);
        oMonthF = firstDay.replace('.', '');

        lastDay = new Date(newMonth.setDate(sunday));
        oDayL = lastDay.getDate();
        oYearL = lastDay.getFullYear();

        lastDay = lastDay.toLocaleString('ru', params);
        oMonthL = lastDay.replace('.', '');

        if (oYearF === oYearL) {
            temp = oDayF + ' ' + oMonthF + ' - ' + oDayL + ' ' + oMonthL + ', ' + oYearF;
        } else {
            temp = oDayF + ' ' + oMonthF + ', ' + oYearF + ' - ' + oDayL + ' ' + oMonthL + ', ' + oYearL;
        }
        arrData.append('text', temp);
    } else {
        firstDay = new Date(currDate.setDate(monday));
        oDayF = firstDay.getDate();
        oYearF = firstDay.getFullYear();

        firstDay = firstDay.toLocaleString('ru', params);
        oMonthF = firstDay.replace('.', '');

        lastDay = new Date(currDate.setDate(sunday));
        oDayL = lastDay.getDate();
        oYearL = lastDay.getFullYear();

        lastDay = lastDay.toLocaleString('ru', params);
        oMonthL = lastDay.replace('.', '');

        if (oMonthL === oMonthF) {
            temp = oDayF + ' - ' + oDayL + ' ' + oMonthF + ', ' + oYearF;
            arrData.append('text', temp);
        } else {
            if (oYearF === oYearL) {
                temp = oDayF + ' ' + oMonthF + ' - ' + oDayL + ' ' + oMonthL + ', ' + oYearF;
            } else {
                temp = oDayF + ' ' + oMonthF + ', ' + oYearF + ' - ' + oDayL + ' ' + oMonthL + ', ' + oYearL;
            }
            arrData.append('text', temp);
        }
    }

    return arrData;
}

/*
*** Calendar
*/
var Calendar = function ($) {
    var $calendar = $('#calendar');
    var calendar = {};

    calendar.init = function () {
        if ($calendar.length) {
            this.heights();
            this.timeStep();

            // scheduler.templates.week_scale_date = function(data) {
            //     return '<div class="user user--small"><div class="user__img"><img src="img/examples/user/cara-avatar.jpg" /></div><div class="user__name">Ангелина</div><div class="user__surname">Оченьдлиннаяфамилия</div></div>';
            // };

            var arrEmployees = [];

            var arrData = [{
                avatar: 'img/examples/user/cara-avatar.jpg',
                name: 'Алена Оченьдлиннаяфамилия'
            }, {
                avatar: 'img/examples/user/cara-avatar-1.jpg',
                name: 'Алена Оченьдлиннаяфамилия'
            }, {
                avatar: 'img/examples/user/daniela-avatar.jpg',
                name: 'Алена Оченьдлиннаяфамилия'
            }, {
                avatar: 'img/examples/user/lima-avatar-1.jpg',
                name: 'Алена Оченьдлиннаяфамилия'
            }, {
                avatar: 'img/examples/user/lima-avatar.jpg',
                name: 'Алена Оченьдлиннаяфамилия'
            }, {
                avatar: 'img/examples/user/noavatar.jpg',
                name: 'Мистер Гипс'
            }, {
                avatar: 'img/examples/user/avatar.jpg',
                name: 'Дядя Вася'
            }];

            arrData.map(function (data, i) {
                arrEmployees.push({
                    key: i,
                    label: '<div class="user user--small"><div class="user__img"><img src="' + data.avatar + '" /></div><div class="user__name">' + data.name + '</div></div>'
                });
            });

            scheduler.xy.scale_height = 85;
            scheduler.xy.nav_height = 0;

            scheduler.config.multi_day = true;
            scheduler.config.xml_date = '%Y-%m-%d %H:%i';
            scheduler.config.mark_now = true;
            scheduler.locale.labels.unit_tab = 'Unit';
            scheduler.locale.labels.section_custom = 'Section';
            scheduler.config.first_hour = 4;
            scheduler.config.limit_time_select = true;
            scheduler.config.details_on_create = true;

            scheduler.createUnitsView({
                name: 'unit',
                property: 'section_id',
                list: arrEmployees
            });

            scheduler.addMarkedTimespan({
                start_date: new Date(2018, 11, 16, 6, 30),
                end_date: new Date(2018, 11, 16, 11),
                css: 'dhx_time_reserved',
                type: 'dhx_time_block', // will act as blocked section
                sections: {
                    timeline: 4,
                    unit: 4
                }
            });

            calendar.statusInit();

            scheduler.init('calendar', new Date(2018, 11, 16), 'unit');
        }
    };

    calendar.statusInit = function () {
        scheduler.templates.event_class = function (start, end, event) {
            var css = '';

            if (event.evType)
                // if event has type property then special class should be assigned
                css += 'event_' + getLabel(evType, event.evType).toLowerCase();

            return css; // default return
        };

        function getLabel(array, key) {
            for (var i = 0; i < array.length; i++) {
                if (key == array[i].key) return array[i].label;
            }
            return null;
        }

        var evType = [{ key: '', label: 'Select event type' }, { key: 1, label: 'new' }, { key: 2, label: 'working' }, { key: 3, label: 'done' }, { key: 4, label: 'canceled' }];

        scheduler.locale.labels.section_evType = 'Event type';

        scheduler.config.lightbox.sections = [{
            name: 'evType',
            height: 50,
            type: 'select',
            options: evType,
            map_to: 'evType'
        }];
    };

    calendar.showMinical = function () {
        if (scheduler.isCalendarVisible()) scheduler.destroyCalendar();else scheduler.renderCalendar({
            position: 'dhx_minical_icon',
            date: scheduler._date,
            navigation: true,
            handler: function handler(date, calendar) {
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar();
            }
        });
    };

    calendar.timeStep = function () {
        var step = 15;
        var format = scheduler.date.date_to_str('%H:%i');

        scheduler.config.hour_size_px = 60 / step * 22;
        scheduler.templates.hour_scale = function (date) {
            var html = '';
            for (var i = 0; i < 60 / step; i++) {
                html += "<div style='height:22px;line-height:22px;'>" + format(date) + '</div>';
                date = scheduler.date.add(date, step, 'minute');
            }
            return html;
        };
    };

    calendar.heights = function () {
        var height = $(document).height();
        var headerHeight = $('.header').outerHeight(true);
        var topLineHeight = $('.calendar__top-line').outerHeight(true);

        $('.c-calendar').css('min-height', height - (headerHeight + topLineHeight));
    };

    calendar.custonEvent = function () {};

    return calendar;
}(jQuery);

Calendar.init();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbC5qcyJdLCJuYW1lcyI6WyIkIiwibGVuZ3RoIiwic2xpZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJkYXRhIiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJ0ZXh0IiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJvbiIsInZhbHVlcyIsImhhbmRsZSIsInJlbW92ZUNsYXNzIiwicmVtb3ZlQXR0ciIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiX3RoaXMiLCJhZGQiLCJmaW5kIiwiZG9uZSIsImRlbCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJjc3MiLCJ0b2dnbGVDbGFzcyIsInBhcmVudCIsInBob25lQ29uZmlybVRpbWVyIiwidGltZXIiLCJjb25zb2xlIiwibG9nIiwidGltIiwic2V0VGltZW91dCIsInQiLCJpbnQiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0YXJlYSIsImF1dG9zaXplIiwiY3RybEtleSIsIm1ldGFLZXkiLCJrZXlDb2RlIiwidmFsdWUiLCJwYXJlbnROb2RlIiwic3VibWl0IiwicHJldmVudERlZmF1bHQiLCJlbCIsImNoYXRCb2R5IiwiY2hhdEZvb3RlckhlaWdodCIsIm91dGVySGVpZ2h0Iiwic3R5bGUiLCJjc3NUZXh0Iiwic2Nyb2xsSGVpZ2h0IiwiYm90dG9tIiwib3ZlcmZsb3ciLCJ0aXRsZSIsIm1vZGFsIiwic2VhcmNoSW5wdXQiLCJoaW50IiwidmFsIiwid2luZG93Iiwid2lkdGgiLCIkcGFycmVudCIsImVuZCIsInNvcnRhYmxlIiwiY29ubmVjdFdpdGgiLCJjdXJzb3IiLCJ0b2xlcmFuY2UiLCJ1aSIsIml0ZW0iLCJzdG9wIiwiQ3JtIiwicmVxdWVzdCIsIndpZ2V0UmVwbGFjZUljb24iLCJkaXNhYmxlU2VsZWN0aW9uIiwidG9nZ2xlQ29udHJvbCIsIiRkb2N1bWVudCIsIiRwYXJlbnQiLCIkd2lkZ2V0TGVmdCIsIiR3aWRnZXRSaWdodCIsIiR0aXRsZUxlZnQiLCIkdGl0bGVSaWdodCIsInJlbW92ZSIsImluaXQiLCJteU1hcCIsInltYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsImJlaGF2aW9ycyIsImRpc2FibGUiLCJjb250cm9scyIsIm15UGluIiwiR2VvT2JqZWN0Q29sbGVjdGlvbiIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkltYWdlU2l6ZSIsImljb25JbWFnZU9mZnNldCIsIm15UGxhY2VtYXJrIiwiUGxhY2VtYXJrIiwiYmFsbG9vbkNvbnRlbnRIZWFkZXIiLCJiYWxsb29uQ29udGVudEJvZHkiLCJoaW50Q29udGVudCIsImdlb09iamVjdHMiLCJyZWFkeSIsImV2ZW50cyIsInNpbXBsZXNsaWRlciIsIiRkYXRlcGlja2VyIiwiZGF0ZVRvZGF5IiwiRGF0ZSIsImVhY2giLCIkYnRuVG9kYXkiLCIkYnRuUHJldiIsIiRidG5OZXh0IiwidHlwZSIsImF0dHIiLCJfc2VsZiIsImNoYW5nZVZhbCIsImRhdGVwaWNrZXIiLCJhdXRvQ2xvc2UiLCJtaW5EYXRlIiwib25TZWxlY3QiLCJmb3JtYXR0ZWREYXRlIiwic2VsZWN0RGF0ZSIsInNob3dXZWVrIiwiZGF0ZSIsImluc3QiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiY3VycmVudERhdGUiLCJnZXREYXRlIiwiY3VycmVudE1vbnRoIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImdldERheSIsImRhdGVGb3JtYXQiLCJzZXRJbnB1dERhdGUiLCJwcmV2Iiwic2hvdyIsImZvY3VzIiwidXBkYXRlRGF0YVNjaGVkdWxlIiwiY3JtU2NoZWR1bGVJbnB1dENhbGVuZGFyVG9wIiwicnVEYXRlcyIsImdldFdlZWtTY2hlZHVsZSIsInVwZGF0ZVZhbFNjaGVkdWxlIiwidG9nZ2xlU2VsZWN0ZWQiLCJkYXRlUGlja2VySW5saW5lIiwiZXZlbnREYXRlcyIsImlubGluZSIsIm11bHRpcGxlRGF0ZXMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsImluZGV4T2YiLCJjbGFzc2VzIiwiY3JtU2NoZWR1bGVEYXRlRmllbGRUb3AiLCJnZXQiLCJjdXJyIiwiY3VyckRheSIsImN1cnJNb250aCIsIm1vbmRheSIsInN1bmRheSIsImdldFJpZ2h0V2Vla1RleHQiLCJjdXJyRGF0ZSIsIm1vbnRoIiwiZmlyc3REYXkiLCJsYXN0RGF5IiwicGFyYW1zIiwib0RheUYiLCJvRGF5TCIsIm9Nb250aEYiLCJvTW9udGhMIiwib1llYXJGIiwib1llYXJMIiwiYXJyRGF0YSIsIkZvcm1EYXRhIiwidGVtcCIsIm5ld01vbnRoIiwic2V0RGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwicmVwbGFjZSIsImFwcGVuZCIsIkNhbGVuZGFyIiwiJGNhbGVuZGFyIiwiY2FsZW5kYXIiLCJoZWlnaHRzIiwidGltZVN0ZXAiLCJhcnJFbXBsb3llZXMiLCJhdmF0YXIiLCJuYW1lIiwibWFwIiwiaSIsInB1c2giLCJrZXkiLCJsYWJlbCIsInNjaGVkdWxlciIsInh5Iiwic2NhbGVfaGVpZ2h0IiwibmF2X2hlaWdodCIsImNvbmZpZyIsIm11bHRpX2RheSIsInhtbF9kYXRlIiwibWFya19ub3ciLCJsb2NhbGUiLCJsYWJlbHMiLCJ1bml0X3RhYiIsInNlY3Rpb25fY3VzdG9tIiwiZmlyc3RfaG91ciIsImxpbWl0X3RpbWVfc2VsZWN0IiwiZGV0YWlsc19vbl9jcmVhdGUiLCJjcmVhdGVVbml0c1ZpZXciLCJwcm9wZXJ0eSIsImxpc3QiLCJhZGRNYXJrZWRUaW1lc3BhbiIsInN0YXJ0X2RhdGUiLCJlbmRfZGF0ZSIsInNlY3Rpb25zIiwidGltZWxpbmUiLCJ1bml0Iiwic3RhdHVzSW5pdCIsInRlbXBsYXRlcyIsImV2ZW50X2NsYXNzIiwiZXZlbnQiLCJldlR5cGUiLCJnZXRMYWJlbCIsInRvTG93ZXJDYXNlIiwiYXJyYXkiLCJzZWN0aW9uX2V2VHlwZSIsImxpZ2h0Ym94IiwiaGVpZ2h0Iiwib3B0aW9ucyIsIm1hcF90byIsInNob3dNaW5pY2FsIiwiaXNDYWxlbmRhclZpc2libGUiLCJkZXN0cm95Q2FsZW5kYXIiLCJyZW5kZXJDYWxlbmRhciIsInBvc2l0aW9uIiwiX2RhdGUiLCJuYXZpZ2F0aW9uIiwiaGFuZGxlciIsInNldEN1cnJlbnRWaWV3Iiwic3RlcCIsImZvcm1hdCIsImRhdGVfdG9fc3RyIiwiaG91cl9zaXplX3B4IiwiaG91cl9zY2FsZSIsImh0bWwiLCJoZWFkZXJIZWlnaHQiLCJ0b3BMaW5lSGVpZ2h0IiwiY3VzdG9uRXZlbnQiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsRUFBRSw2QkFBRixFQUFpQ0MsTUFBckMsRUFBNkM7QUFDekMsUUFBSUMsU0FBU0MsU0FBU0MsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBYjtBQUNBLFFBQUlDLGdCQUFnQkwsRUFBRSwyQkFBRixFQUErQk0sSUFBL0IsQ0FBb0MsT0FBcEMsQ0FBcEI7QUFDQSxRQUFJQyxjQUFjUCxFQUFFLDJCQUFGLEVBQStCTSxJQUEvQixDQUFvQyxLQUFwQyxDQUFsQjtBQUNBLFFBQUlFLFFBQVEsQ0FBQ1IsRUFBRSxlQUFGLENBQUQsRUFBcUJBLEVBQUUsYUFBRixDQUFyQixDQUFaO0FBQ0EsUUFBSVMsVUFBSjtBQUNBLFFBQUlDLFFBQUo7QUFDQSxRQUFJQyxTQUFKO0FBQ0EsUUFBSUMsSUFBSjs7QUFFQSxRQUFJSixNQUFNLENBQU4sRUFBU0ssSUFBVCxNQUFtQixFQUF2QixFQUEyQjtBQUN2QkoscUJBQWFKLGFBQWI7QUFDSCxLQUZELE1BRU87QUFDSEkscUJBQWFLLFNBQVNOLE1BQU0sQ0FBTixFQUFTSyxJQUFULEVBQVQsQ0FBYjtBQUNIOztBQUVELFFBQUlMLE1BQU0sQ0FBTixFQUFTSyxJQUFULE1BQW1CLEVBQXZCLEVBQTJCO0FBQ3ZCSCxtQkFBV0gsV0FBWDtBQUNILEtBRkQsTUFFTztBQUNIRyxtQkFBV0ksU0FBU04sTUFBTSxDQUFOLEVBQVNLLElBQVQs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TUFsTGMsQ0FBakI7O0FBb0xBcEUsU0FBU2xHLElBQVQiLCJmaWxlIjoiZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCQoJy5jYXRhbG9nLWZpbHRlcl9faXRlbV9wcmljZScpLmxlbmd0aCkge1xyXG4gICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKTtcclxuICAgIHZhciBhbGxQcmljZVN0YXJ0ID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ3N0YXJ0Jyk7XHJcbiAgICB2YXIgYWxsUHJpY2VFbmQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnZW5kJyk7XHJcbiAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcclxuICAgIHZhciBzdGFydFByaWNlO1xyXG4gICAgdmFyIGVuZFByaWNlO1xyXG4gICAgdmFyIGFyclBhcmFtcztcclxuICAgIHZhciBzVXJsO1xyXG5cclxuICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICBzdGFydFByaWNlID0gYWxsUHJpY2VTdGFydDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xyXG4gICAgICAgIGVuZFByaWNlID0gYWxsUHJpY2VFbmQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcclxuICAgICAgICBzdGFydDogW3N0YXJ0UHJpY2UsIGVuZFByaWNlXSxcclxuICAgICAgICBjb25uZWN0OiB0cnVlLFxyXG4gICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgIG1pbjogYWxsUHJpY2VTdGFydCxcclxuICAgICAgICAgICAgbWF4OiBhbGxQcmljZUVuZFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XHJcbiAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KHBhcnNlSW50KHZhbHVlc1toYW5kbGVdKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuJCgnLmpzLWNhdGFsb2ctZmlsdGVyLS1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2ctZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4kKCcuanMtY2FyZC1zZXJ2aWNlcy1pdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgaWYgKFxyXG4gICAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoXHJcbiAgICAgICAgICAgICcuY2FyZC1zZXJ2aWNlcy1pdGVtX19taWRkbGUsIC5jYXJkLXNlcnZpY2VzLWl0ZW1fX2luZm8tYmxvY2ssIC5jYXJkLXNlcnZpY2VzLWl0ZW1fX2JvdHRvbSdcclxuICAgICAgICApLmxlbmd0aFxyXG4gICAgKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciBhZGQgPSBfdGhpcy5maW5kKCcuY2FyZC1zZXJ2aWNlcy1pdGVtX19hY3Rpb25fYWRkJyk7XHJcbiAgICAgICAgdmFyIGRvbmUgPSBfdGhpcy5maW5kKCcuY2FyZC1zZXJ2aWNlcy1pdGVtX19hY3Rpb25fZG9uZScpO1xyXG4gICAgICAgIHZhciBkZWwgPSBfdGhpcy5maW5kKCcuY2FyZC1zZXJ2aWNlcy1pdGVtX19hY3Rpb25fZGVsJyk7XHJcblxyXG4gICAgICAgIGlmIChfdGhpcy5oYXNDbGFzcygnaXMtYm9va2VkJykpIHtcclxuICAgICAgICAgICAgX3RoaXMucmVtb3ZlQ2xhc3MoJ2lzLWJvb2tlZCcpO1xyXG4gICAgICAgICAgICBhZGQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgZG9uZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF90aGlzLmFkZENsYXNzKCdpcy1ib29rZWQnKTtcclxuICAgICAgICAgICAgYWRkLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgIGRvbmUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vRmF2b3JpdGUgYnRuXHJcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuanMtYnRuLWZhdicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vL0NvbmZpcm0gcGhvbmVcclxuJCgnLmpzLXRpbWVyLS1yZXBlYXQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAkKHRoaXMpXHJcbiAgICAgICAgLnBhcmVudCgnLnBob25lLWNvbmZpcm1fX3JlcGVhdCcpXHJcbiAgICAgICAgLmNzcygnZGlzcGxheScsICdub25lJylcclxuICAgICAgICAuY2xvc2VzdCgnLmpzLWNvbmZpcm0nKVxyXG4gICAgICAgIC5maW5kKCcuY29uZmlybV9fdGltZXIsIC5jb25maXJtX19maWVsZCcpXHJcbiAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICBwaG9uZUNvbmZpcm1UaW1lcigpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHBob25lQ29uZmlybVRpbWVyKCkge1xyXG4gICAgdmFyIHRpbWVyID0gJCgnLmpzLXRpbWVyJyk7XHJcbiAgICBjb25zb2xlLmxvZyh0aW1lci5kYXRhKCd0aW1lcicpKTtcclxuICAgIHZhciB0aW0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdCA9IHRpbWVyLmRhdGEoJ3RpbWVyJyk7XHJcbiAgICAgICAgICAgIHRpbWVyLnRleHQodCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHQpO1xyXG4gICAgICAgICAgICB2YXIgaW50ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0LS07XHJcbiAgICAgICAgICAgICAgICBpZiAodCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lci5wYXJlbnQoKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy10aW1lci0tcmVwZWF0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBhcmVudCgnLnBob25lLWNvbmZpcm1fX3JlcGVhdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lci50ZXh0KHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgJCgnLmpzLXRpbWVyLS1yZXBlYXQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludCk7XHJcbiAgICAgICAgICAgICAgICB0aW0oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgdGltKCk7XHJcbn1cclxuXHJcbi8vVGV4dGFyZWEgYXV0b0hlaWdodFxyXG5pZiAoJCgnLmpzLXRleHRhcmVhJykubGVuZ3RoKSB7XHJcbiAgICB2YXIgdGV4dGFyZWEgPSAkKCcuanMtdGV4dGFyZWEnKTtcclxuICAgIHRleHRhcmVhLm9uKCdrZXlkb3duJywgYXV0b3NpemUpO1xyXG5cclxuICAgIHRleHRhcmVhLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpICYmXHJcbiAgICAgICAgICAgIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMTApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRleHRhcmVhLnZhbHVlICs9ICdcXHJcXG4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhdXRvc2l6ZSgpIHtcclxuICAgIGxldCBlbCA9IHRoaXM7XHJcbiAgICBsZXQgY2hhdEJvZHkgPSAkKCcuY2hhdF9fYm9keScpO1xyXG4gICAgbGV0IGNoYXRGb290ZXJIZWlnaHQgPSAkKCcuY2hhdF9fZm9vdGVyJykub3V0ZXJIZWlnaHQoKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6MzdweCc7XHJcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6JyArIGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICAgICAgY2hhdEJvZHkuY3NzKHtcclxuICAgICAgICAgICAgYm90dG9tOiAzOSArIGVsLnNjcm9sbEhlaWdodCArICdweCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZWwuc2Nyb2xsSGVpZ2h0ID49IDEyMykge1xyXG4gICAgICAgICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcclxuICAgICAgICAgICAgY2hhdEJvZHkuY3NzKHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogY2hhdEZvb3RlckhlaWdodCArICdweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMCk7XHJcbn1cclxuXHJcbiQoJy5qcy1kaXNhYmxlLWNhdGVnb3J5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGl0bGUgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XHJcbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgJCgnI2Rpc2FibGUtY2F0ZWdvcnknKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgICQoJy5kaXNhYmxlLWNhdGVnb3J5X19kYXRhLXRpdGxlJykudGV4dCh0aXRsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL1NlYXJjaCBIaW50XHJcbmlmICgkKCcuanMtc2VhcmNoLWlucHV0JykubGVuZ3RoKSB7XHJcbiAgICB2YXIgc2VhcmNoSW5wdXQgPSAkKCcuanMtc2VhcmNoLWlucHV0Jyk7XHJcbiAgICBzZWFyY2hJbnB1dFxyXG4gICAgICAgIC5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLy9Dcm0uYXBsaWNhdGlvbi5jaGFuZ2VTcnZpY2VcclxuJChkb2N1bWVudCkub24oJ3NlbGVjdDI6c2VsZWN0JywgJy5qcy1zZWxlY3QtLXNlcnZpY2VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJHBhcnJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1hcGxpY2F0aW9uLWl0ZW0nKTtcclxuICAgICRwYXJyZW50XHJcbiAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpXHJcbiAgICAgICAgLmZpbmQoJy5iYi1pbnB1dF9fd3JhcCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdpcy1oaWRkZW4nKVxyXG4gICAgICAgIC5lbmQoKVxyXG4gICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLS1lZGl0JylcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG59KTtcclxuXHJcbi8vQ3JtLnJlcXVlc3Qgc29ydGFibGVcclxuJCgnLmpzLXNvcnRhYmxlJylcclxuICAgIC5zb3J0YWJsZSh7XHJcbiAgICAgICAgY29ubmVjdFdpdGg6ICcuanMtc29ydGFibGUnLFxyXG4gICAgICAgIGN1cnNvcjogJ21vdmUnLFxyXG4gICAgICAgIHRvbGVyYW5jZTogJ3BvaW50ZXInLFxyXG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbihlLCB1aSkge1xyXG4gICAgICAgICAgICB1aS5pdGVtLmFkZENsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3A6IGZ1bmN0aW9uKGUsIHVpKSB7XHJcbiAgICAgICAgICAgIHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ2RyYWctc29ydCcpO1xyXG4gICAgICAgICAgICB1aS5pdGVtLnJlbW92ZUNsYXNzKCdyZXF1ZXN0LWl0ZW0tLW5ldycpO1xyXG4gICAgICAgICAgICBDcm0ucmVxdWVzdC53aWdldFJlcGxhY2VJY29uKHVpLml0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuZGlzYWJsZVNlbGVjdGlvbigpO1xyXG5cclxuLy9TdHVkaW8gdG9nZ2xlIGNvbnRyb2xcclxuZnVuY3Rpb24gdG9nZ2xlQ29udHJvbCgpIHtcclxuICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXN0dWRpby1zeXN0ZW0tYnRuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1zdHVkaW8tc3lzdGVtJyk7XHJcbiAgICAgICAgbGV0ICR3aWRnZXRMZWZ0ID0gJHBhcmVudC5maW5kKCcud2lkZ2V0X19sZWZ0Jyk7XHJcbiAgICAgICAgbGV0ICR3aWRnZXRSaWdodCA9ICRwYXJlbnQuZmluZCgnLndpZGdldF9fcmlnaHQnKTtcclxuICAgICAgICBsZXQgJHRpdGxlTGVmdCA9ICRwYXJlbnQuZmluZCgnLmJiLWNoZWNrYm94X190aXRsZS0tbGVmdCcpO1xyXG4gICAgICAgIGxldCAkdGl0bGVSaWdodCA9ICRwYXJlbnQuZmluZCgnLmJiLWNoZWNrYm94X190aXRsZS0tcmlnaHQnKTtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICByZW1vdmUoJHdpZGdldFJpZ2h0KTtcclxuICAgICAgICAgICAgYWRkKCR3aWRnZXRMZWZ0KTtcclxuICAgICAgICAgICAgJHRpdGxlTGVmdC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkdGl0bGVSaWdodC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbW92ZSgkd2lkZ2V0TGVmdCk7XHJcbiAgICAgICAgICAgIGFkZCgkd2lkZ2V0UmlnaHQpO1xyXG4gICAgICAgICAgICAkdGl0bGVMZWZ0LnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICR0aXRsZVJpZ2h0LmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkKGVsKSB7XHJcbiAgICAgICAgZWwuZmluZCgnLmxpc3QtLWljb24nKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpc3QtY29sb3ItLXN1Y2Nlc3MnKVxyXG4gICAgICAgICAgICAuZmluZCgnLmxpc3RfX2ljb24nKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhbCcpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGVsKSB7XHJcbiAgICAgICAgZWwuZmluZCgnLmxpc3QtLWljb24nKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpc3QtY29sb3ItLXN1Y2Nlc3MnKVxyXG4gICAgICAgICAgICAuZmluZCgnLmxpc3RfX2ljb24nKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhcycpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFsJyk7XHJcbiAgICB9XHJcbn1cclxudG9nZ2xlQ29udHJvbCgpO1xyXG5cclxuLy9DYXJkIEFkcmVzcyBNYXBcclxuaWYgKCQoJyNjYXJkLW1hcCcpLmxlbmd0aCkge1xyXG4gICAgeW1hcHMucmVhZHkoaW5pdCk7XHJcbiAgICB2YXIgbXlNYXAsIG15UGxhY2VtYXJrLCBteVBpbjtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY2FyZC1tYXAnLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSxcclxuICAgICAgICAgICAgem9vbTogMTZcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoWydzY3JvbGxab29tJ10pO1xyXG5cclxuICAgICAgICBteU1hcC5jb250cm9sc1xyXG4gICAgICAgICAgICAucmVtb3ZlKCdzZWFyY2hDb250cm9sJylcclxuICAgICAgICAgICAgLnJlbW92ZSgndHlwZVNlbGVjdG9yJylcclxuICAgICAgICAgICAgLmFkZCgncm91dGVFZGl0b3InKTtcclxuXHJcbiAgICAgICAgbXlQaW4gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbihcclxuICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvZ2VuZXJhbC9tYXAtcGluLnN2ZycsXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMzAsIDQyXSxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogWy0zLCAtNDJdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBteVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSwge1xyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudEhlYWRlcjpcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1waW5fX3RpdGxlXCI+TmFpbHogWCBDb2xsYWI8L3NwYW4+JyxcclxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRCb2R5OlxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fcGxhY2VcIj7Rg9C7LiDQkdC+0LvRjNGI0LDRjyDQn9C+0LvRj9C90LrQsCwgNTHQkC85LCDQnNC+0YHQutC+0LLRgdC60LjQuSDRgC3QvTwvc3Bhbj4gPGRpdiBjbGFzcz1cIm1hcC1waW5fX3Byb3BlcnRpZXNcIj48dWwgY2xhc3M9XCJwcm9wZXJ0aWVzX19saXN0XCI+PGxpIGNsYXNzPVwicHJvcGVydGllc19faXRlbSBwcm9wZXJ0aWVzX19pdGVtX3NhbGUgYmItZHJvcGRvd24gdG9wIGJiLWRyb3Bkb3duLS1ob3ZlciBqcy1iYi1kcm9wZG93blwiPiA8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXByb2NlbnQgXCI+PHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjcHJvY2VudFwiPjwvdXNlPjwvc3ZnPjxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fbGlzdFwiPtC10YHRgtGMINGB0LrQuNC00LrQuDwvZGl2PjwvbGk+PGxpIGNsYXNzPVwicHJvcGVydGllc19faXRlbSBwcm9wZXJ0aWVzX19pdGVtX2NhciBiYi1kcm9wZG93biB0b3AgYmItZHJvcGRvd24tLWhvdmVyIGpzLWJiLWRyb3Bkb3duXCI+IDxzdmcgY2xhc3M9XCJpY29uIGljb24tY2FyIFwiPjx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2NhclwiPjwvdXNlPjwvc3ZnPjxkaXYgY2xhc3M9XCJiYi1kcm9wZG93bl9fbGlzdFwiPtC80L7Qs9GDINC/0YDQuNC10YXQsNGC0Yw8L2Rpdj48L2xpPjwvdWw+PC9kaXY+JyxcclxuICAgICAgICAgICAgaGludENvbnRlbnQ6XHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1hcC1waW5fX2hvdmVyXCI+MS3QutC+0LzQvdCw0YLQvdCw0Y8g0LrQstCw0YDRgtC40YDQsCA8ZGl2IGNsYXNzPVwicmF0aW5nXCI+PGRpdiBjbGFzcz1cInJhdGluZ19faW5uZXJcIiBzdHlsZT1cIndpZHRoOiA5MCVcIj48L2Rpdj48L2Rpdj4gPHNwYW4+0L7RgiAyIDgwMCA8aSBjbGFzcz1cInJ1YlwiPmE8L2k+PC9zcGFuPiA8L2Rpdj4nXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG15UGluLmFkZChteVBsYWNlbWFyayk7XHJcbiAgICAgICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQaW4pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL0NhYmluZXQgTWFwXHJcbmlmICgkKCcjY2FiaW5ldC1tYXAnKS5sZW5ndGgpIHtcclxuICAgIHltYXBzLnJlYWR5KGluaXQpO1xyXG4gICAgdmFyIG15TWFwLCBteVBsYWNlbWFyaywgbXlQaW47XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ2NhYmluZXQtbWFwJywge1xyXG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sXHJcbiAgICAgICAgICAgIHpvb206IDE2XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKFsnc2Nyb2xsWm9vbSddKTtcclxuXHJcbiAgICAgICAgbXlNYXAuY29udHJvbHNcclxuICAgICAgICAgICAgLnJlbW92ZSgnc2VhcmNoQ29udHJvbCcpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoJ3R5cGVTZWxlY3RvcicpXHJcbiAgICAgICAgICAgIC5hZGQoJ3JvdXRlRWRpdG9yJyk7XHJcblxyXG4gICAgICAgIG15UGluID0gbmV3IHltYXBzLkdlb09iamVjdENvbGxlY3Rpb24oXHJcbiAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2dlbmVyYWwvbWFwLXBpbi5zdmcnLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzMwLCA0Ml0sXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstMywgLTQyXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0pO1xyXG5cclxuICAgICAgICBteVBpbi5hZGQobXlQbGFjZW1hcmspO1xyXG4gICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGluKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9DYXRhbG9nIE1hcFxyXG5pZiAoJCgnI2NhdGFsb2ctbWFwLCAjbWFwJykubGVuZ3RoKSB7XHJcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcclxuICAgIHZhciBteU1hcCwgbXlQbGFjZW1hcmssIG15UGluO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdjYXRhbG9nLW1hcCcsIHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLFxyXG4gICAgICAgICAgICB6b29tOiAxNlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XHJcblxyXG4gICAgICAgIG15TWFwLmNvbnRyb2xzXHJcbiAgICAgICAgICAgIC5yZW1vdmUoJ3NlYXJjaENvbnRyb2wnKVxyXG4gICAgICAgICAgICAucmVtb3ZlKCd0eXBlU2VsZWN0b3InKVxyXG4gICAgICAgICAgICAuYWRkKCdyb3V0ZUVkaXRvcicpO1xyXG5cclxuICAgICAgICBteVBpbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKFxyXG4gICAgICAgICAgICB7fSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlSHJlZjogJ2ltZy9nZW5lcmFsL21hcC1waW4uc3ZnJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLCB7XHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOlxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fdGl0bGVcIj7QodGC0YPQtNC40Y8gXCLQodC70LXQt9CwINC00YDQsNC60L7QvdCwXCI8L3NwYW4+PGRpdiBjbGFzcz1cIm1hcC1waW5fX2FkZHJlc3NcIj7QnNC+0YHQutCy0LAsINGD0LsuINCT0LDQs9Cw0YDQuNC90LAsIDI4LzIsINC8LiDQm9GD0LHRj9C90LrQsDwvZGl2PicsXHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50Qm9keTpcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faW1hZ2UganMtc3MtbWFwLXNsaWRlciBpbWFnZS13cmFwcGVyXCIgICAgICAgICAgICAgICAgZGF0YS1zcy1pbWFnZXM9XCIuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMC5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTEuanBnOy4uL2ltZy9leGFtcGxlcy91c2VyL2NhdGFsb2cvY2F0YWxvZy0yLmpwZzsuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMy5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTQuanBnXCI+PGltZyBzcmM9XCIuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMC5qcGdcIj48L2Rpdj48ZGl2IGNsYXNzPVwibWFwLXBpbl9faW5mb1wiPjxkaXYgY2xhc3M9XCJyYXRpbmcgbWFwLXBpbl9fcmF0aW5nXCI+PGRpdiBjbGFzcz1cInJhdGluZ19faW5uZXJcIiBzdHlsZT1cIndpZHRoOiA3MCVcIj48L2Rpdj48c3BhbiBjbGFzcz1cInJhdGluZ19fcmV2LWNvdW50XCI+KDc3KTwvc3Bhbj48L2Rpdj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uLWljb24gYnV0dG9uLWljb24tLWZhdiBtYXAtcGluX19mYXYganMtYnRuLWZhdlwiPjwvYnV0dG9uPjwvZGl2PidcclxuICAgICAgICAgICAgLy8gaGludENvbnRlbnQ6XHJcbiAgICAgICAgICAgIC8vICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faG92ZXJcIj4xLdC60L7QvNC90LDRgtC90LDRjyDQutCy0LDRgNGC0LjRgNCwIDxkaXYgY2xhc3M9XCJyYXRpbmdcIj48ZGl2IGNsYXNzPVwicmF0aW5nX19pbm5lclwiIHN0eWxlPVwid2lkdGg6IDkwJVwiPjwvZGl2PjwvZGl2PiA8c3Bhbj7QvtGCIDIgODAwIDxpIGNsYXNzPVwicnViXCI+YTwvaT48L3NwYW4+IDwvZGl2PidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlNYXAuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jdGlvbigpIHt9KTtcclxuXHJcbiAgICAgICAgbXlQbGFjZW1hcmsuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLXNzLW1hcC1zbGlkZXInKS5zaW1wbGVzbGlkZXIoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdiYWxvb24gY2xpY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBpbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qXHJcbioqKiBEYXRlUGlja2VyXHJcbiovXHJcbihmdW5jdGlvbigpIHtcclxuICAgIGxldCAkZGF0ZXBpY2tlciA9ICQoJy5qcy1kYXRlJyk7XHJcbiAgICBsZXQgZGF0ZVRvZGF5ID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAkZGF0ZXBpY2tlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItZGF0ZScpO1xyXG4gICAgICAgIGxldCAkYnRuVG9kYXkgPSAkcGFyZW50LmZpbmQoJy5iYi1kYXRlX19idG4tLXRvZGF5Jyk7XHJcbiAgICAgICAgbGV0ICRidG5QcmV2ID0gJHBhcmVudC5maW5kKCcuYmItZGF0ZV9fYnRuLS1wcmV2Jyk7XHJcbiAgICAgICAgbGV0ICRidG5OZXh0ID0gJHBhcmVudC5maW5kKCcuYmItZGF0ZV9fYnRuLS1uZXh0Jyk7XHJcbiAgICAgICAgbGV0IHR5cGUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2V4cGFuZGVkJykge1xyXG4gICAgICAgICAgICBsZXQgX3NlbGYgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBsZXQgdmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZVZhbCgkKHRoaXMpLCB2YWwpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uKGZvcm1hdHRlZERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlVmFsKF9zZWxmLCBmb3JtYXR0ZWREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdERhdGUoZGF0ZVRvZGF5KTtcclxuXHJcbiAgICAgICAgICAgIC8vUGlja2VyIHdpdGggY29udHJvbHNcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb250cm9scycpIHtcclxuICAgICAgICAgICAgbGV0IF9zZWxmID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VWYWwoJCh0aGlzKSwgdmFsKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1dlZWs6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihmb3JtYXR0ZWREYXRlLCBkYXRlLCBpbnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGUsIGVuZERhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERhdGUgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRNb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXREYXRlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZERhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhdGUuZ2V0RGF0ZSgpIC0gZGF0ZS5nZXREYXkoKSArIDdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXREYXRlKCkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXREYXkoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA3ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlLmdldE1vbnRoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VWYWwoX3NlbGYsIGZvcm1hdHRlZERhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0RGF0ZShkYXRlVG9kYXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBkYXRlVG9kYXlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0RGF0ZShkYXRlVG9kYXkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGRhdGVwaWNrZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3R5cGUnLCAnZGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXRJbnB1dERhdGUoJy5qcy1kYXRlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRidG5Ub2RheS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgIC5zZWxlY3REYXRlKGRhdGVUb2RheSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRidG5QcmV2Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWRhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAgICAgLnByZXYoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnY2xpY2sgcHJldicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1Nob3cgRGF0ZXBpY2tlciB3aGVuIGNsaWNrIHBhcnJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgJHBhcmVudC5maW5kKCcuanMtZGF0ZS1maWVsZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGRhdGVwaWNrZXIgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmJiLWRhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKClcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJyk7XHJcblxyXG4gICAgICAgICAgICAkZGF0ZXBpY2tlci5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQ2hhbmdlIGRhdGUgZmllbGQgKG5vdCBpbnB1dCkgdmFsdWVcclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VWYWwoZWwsIHZhbCkge1xyXG4gICAgICAgICAgICBlbC5jbG9zZXN0KCcuYmItZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWRhdGUtZmllbGQnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQodmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGljb24gLSBzaG93IHBpY2tlclxyXG4gICAgJCgnLmpzLWlucHV0LWljb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5qcy1kYXRlJykuZm9jdXMoKTtcclxuICAgIH0pO1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlRGF0YVNjaGVkdWxlKCkge1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGNybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcCA9ICQoJy5qc0NybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcCcpO1xyXG4gICAgbGV0IHJ1RGF0ZXMgPSBnZXRXZWVrU2NoZWR1bGUoZGF0ZSk7XHJcblxyXG4gICAgdXBkYXRlVmFsU2NoZWR1bGUocnVEYXRlcyk7XHJcblxyXG4gICAgaWYgKGNybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcC5sZW5ndGgpIHtcclxuICAgICAgICBjcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3BcclxuICAgICAgICAgICAgLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlU2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWluRGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZm9ybWF0dGVkRGF0ZSwgZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBydURhdGVzID0gZ2V0V2Vla1NjaGVkdWxlKGRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxTY2hlZHVsZShydURhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAuc2VsZWN0RGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbnVwZGF0ZURhdGFTY2hlZHVsZSgpO1xyXG5cclxuKGZ1bmN0aW9uIGRhdGVQaWNrZXJJbmxpbmUoKSB7XHJcbiAgICB2YXIgZXZlbnREYXRlcyA9IFsxLCAxMCwgMTIsIDIyXTtcclxuXHJcbiAgICAkKCcuanMtZGF0ZS1pbmxpbmUnKS5kYXRlcGlja2VyKHtcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgbXVsdGlwbGVEYXRlczogdHJ1ZSxcclxuICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGxUeXBlID09ICdkYXknICYmIGV2ZW50RGF0ZXMuaW5kZXhPZihjdXJyZW50RGF0ZSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2lzLWNoZWNrZWQnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVWYWxTY2hlZHVsZSh2YWx1ZSkge1xyXG4gICAgbGV0IGNybVNjaGVkdWxlRGF0ZUZpZWxkVG9wID0gJCgnLmpzQ3JtU2NoZWR1bGVEYXRlRmllbGRUb3AnKTtcclxuXHJcbiAgICBjcm1TY2hlZHVsZURhdGVGaWVsZFRvcC50ZXh0KHZhbHVlLmdldCgndGV4dCcpKTtcclxuXHJcbiAgICBjcm1TY2hlZHVsZURhdGVGaWVsZFRvcC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanNDcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3AnKVxyXG4gICAgICAgICAgICAuZGF0ZXBpY2tlcigpXHJcbiAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgLnNob3coKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXZWVrU2NoZWR1bGUoZGF0ZSkge1xyXG4gICAgbGV0IGN1cnIgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgIGxldCBjdXJyRGF5ID0gY3Vyci5nZXREYXkoKTtcclxuICAgIGxldCBjdXJyTW9udGggPSBjdXJyLmdldE1vbnRoKCk7XHJcbiAgICBsZXQgbW9uZGF5O1xyXG4gICAgbGV0IHN1bmRheTtcclxuXHJcbiAgICBpZiAoY3VyckRheSA9PT0gMCkge1xyXG4gICAgICAgIG1vbmRheSA9IGN1cnIuZ2V0RGF0ZSgpIC0gNjtcclxuICAgICAgICBzdW5kYXkgPSBjdXJyLmdldERhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbW9uZGF5ID0gY3Vyci5nZXREYXRlKCkgLSBjdXJyLmdldERheSgpICsgMTtcclxuICAgICAgICBzdW5kYXkgPSBtb25kYXkgKyA2O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZXRSaWdodFdlZWtUZXh0KGN1cnIsIG1vbmRheSwgc3VuZGF5LCBjdXJyTW9udGgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSaWdodFdlZWtUZXh0KGN1cnJEYXRlLCBtb25kYXksIHN1bmRheSwgbW9udGgpIHtcclxuICAgIGxldCBmaXJzdERheTtcclxuICAgIGxldCBsYXN0RGF5O1xyXG4gICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICBtb250aDogJ3Nob3J0J1xyXG4gICAgfTtcclxuICAgIGxldCBvRGF5RjtcclxuICAgIGxldCBvRGF5TDtcclxuICAgIGxldCBvTW9udGhGO1xyXG4gICAgbGV0IG9Nb250aEw7XHJcbiAgICBsZXQgb1llYXJGO1xyXG4gICAgbGV0IG9ZZWFyTDtcclxuICAgIGxldCBhcnJEYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBsZXQgdGVtcDtcclxuXHJcbiAgICBpZiAoc3VuZGF5ID4gbW9uZGF5ICYmIChtb25kYXkgPT09IDAgfHwgbW9uZGF5IDwgMCkpIHtcclxuICAgICAgICBsZXQgbmV3TW9udGggPSBuZXcgRGF0ZShjdXJyRGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aCwgMSk7XHJcblxyXG4gICAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUoY3VyckRhdGUuc2V0RGF0ZShtb25kYXkpKTtcclxuICAgICAgICBvRGF5RiA9IGZpcnN0RGF5LmdldERhdGUoKTtcclxuICAgICAgICBvWWVhckYgPSBmaXJzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBmaXJzdERheSA9IGZpcnN0RGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIHBhcmFtcyk7XHJcbiAgICAgICAgb01vbnRoRiA9IGZpcnN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGxhc3REYXkgPSBuZXcgRGF0ZShuZXdNb250aC5zZXREYXRlKHN1bmRheSkpO1xyXG4gICAgICAgIG9EYXlMID0gbGFzdERheS5nZXREYXRlKCk7XHJcbiAgICAgICAgb1llYXJMID0gbGFzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBsYXN0RGF5ID0gbGFzdERheS50b0xvY2FsZVN0cmluZygncnUnLCBwYXJhbXMpO1xyXG4gICAgICAgIG9Nb250aEwgPSBsYXN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChvWWVhckYgPT09IG9ZZWFyTCkge1xyXG4gICAgICAgICAgICB0ZW1wID1cclxuICAgICAgICAgICAgICAgIG9EYXlGICtcclxuICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICBvTW9udGhGICtcclxuICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgIG9EYXlMICtcclxuICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgb1llYXJGO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXAgPVxyXG4gICAgICAgICAgICAgICAgb0RheUYgK1xyXG4gICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgIG9Nb250aEYgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBvWWVhckYgK1xyXG4gICAgICAgICAgICAgICAgJyAtICcgK1xyXG4gICAgICAgICAgICAgICAgb0RheUwgK1xyXG4gICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgIG9Nb250aEwgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBvWWVhckw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyckRhdGEuYXBwZW5kKCd0ZXh0JywgdGVtcCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUoY3VyckRhdGUuc2V0RGF0ZShtb25kYXkpKTtcclxuICAgICAgICBvRGF5RiA9IGZpcnN0RGF5LmdldERhdGUoKTtcclxuICAgICAgICBvWWVhckYgPSBmaXJzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBmaXJzdERheSA9IGZpcnN0RGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIHBhcmFtcyk7XHJcbiAgICAgICAgb01vbnRoRiA9IGZpcnN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGxhc3REYXkgPSBuZXcgRGF0ZShjdXJyRGF0ZS5zZXREYXRlKHN1bmRheSkpO1xyXG4gICAgICAgIG9EYXlMID0gbGFzdERheS5nZXREYXRlKCk7XHJcbiAgICAgICAgb1llYXJMID0gbGFzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBsYXN0RGF5ID0gbGFzdERheS50b0xvY2FsZVN0cmluZygncnUnLCBwYXJhbXMpO1xyXG4gICAgICAgIG9Nb250aEwgPSBsYXN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChvTW9udGhMID09PSBvTW9udGhGKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBvRGF5RiArICcgLSAnICsgb0RheUwgKyAnICcgKyBvTW9udGhGICsgJywgJyArIG9ZZWFyRjtcclxuICAgICAgICAgICAgYXJyRGF0YS5hcHBlbmQoJ3RleHQnLCB0ZW1wKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAob1llYXJGID09PSBvWWVhckwpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPVxyXG4gICAgICAgICAgICAgICAgICAgIG9EYXlGICtcclxuICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9Nb250aEYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgICAgICBvRGF5TCArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckY7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID1cclxuICAgICAgICAgICAgICAgICAgICBvRGF5RiArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhGICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgICAgICBvRGF5TCArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJyRGF0YS5hcHBlbmQoJ3RleHQnLCB0ZW1wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFyckRhdGE7XHJcbn1cclxuXHJcblxyXG4vKlxyXG4qKiogQ2FsZW5kYXJcclxuKi9cclxuY29uc3QgQ2FsZW5kYXIgPSAoZnVuY3Rpb24oJCkge1xyXG4gICAgbGV0ICRjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpO1xyXG4gICAgbGV0IGNhbGVuZGFyID0ge307XHJcblxyXG4gICAgY2FsZW5kYXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkY2FsZW5kYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0cygpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGVwKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzY2hlZHVsZXIudGVtcGxhdGVzLndlZWtfc2NhbGVfZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiAnPGRpdiBjbGFzcz1cInVzZXIgdXNlci0tc21hbGxcIj48ZGl2IGNsYXNzPVwidXNlcl9faW1nXCI+PGltZyBzcmM9XCJpbWcvZXhhbXBsZXMvdXNlci9jYXJhLWF2YXRhci5qcGdcIiAvPjwvZGl2PjxkaXYgY2xhc3M9XCJ1c2VyX19uYW1lXCI+0JDQvdCz0LXQu9C40L3QsDwvZGl2PjxkaXYgY2xhc3M9XCJ1c2VyX19zdXJuYW1lXCI+0J7Rh9C10L3RjNC00LvQuNC90L3QsNGP0YTQsNC80LjQu9C40Y88L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGFyckVtcGxveWVlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFyckRhdGEgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvY2FyYS1hdmF0YXIuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JDQu9C10L3QsCDQntGH0LXQvdGM0LTQu9C40L3QvdCw0Y/RhNCw0LzQuNC70LjRjydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvY2FyYS1hdmF0YXItMS5qcGcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQkNC70LXQvdCwINCe0YfQtdC90YzQtNC70LjQvdC90LDRj9GE0LDQvNC40LvQuNGPJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9kYW5pZWxhLWF2YXRhci5qcGcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQkNC70LXQvdCwINCe0YfQtdC90YzQtNC70LjQvdC90LDRj9GE0LDQvNC40LvQuNGPJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9saW1hLWF2YXRhci0xLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9CQ0LvQtdC90LAg0J7Rh9C10L3RjNC00LvQuNC90L3QsNGP0YTQsNC80LjQu9C40Y8nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL2xpbWEtYXZhdGFyLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9CQ0LvQtdC90LAg0J7Rh9C10L3RjNC00LvQuNC90L3QsNGP0YTQsNC80LjQu9C40Y8nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL25vYXZhdGFyLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9Cc0LjRgdGC0LXRgCDQk9C40L/RgSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvYXZhdGFyLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9CU0Y/QtNGPINCS0LDRgdGPJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgYXJyRGF0YS5tYXAoZnVuY3Rpb24oZGF0YSwgaSkge1xyXG4gICAgICAgICAgICAgICAgYXJyRW1wbG95ZWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogaSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ1c2VyIHVzZXItLXNtYWxsXCI+PGRpdiBjbGFzcz1cInVzZXJfX2ltZ1wiPjxpbWcgc3JjPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYXZhdGFyICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIC8+PC9kaXY+PGRpdiBjbGFzcz1cInVzZXJfX25hbWVcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5uYW1lICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PjwvZGl2PidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjaGVkdWxlci54eS5zY2FsZV9oZWlnaHQgPSA4NTtcclxuICAgICAgICAgICAgc2NoZWR1bGVyLnh5Lm5hdl9oZWlnaHQgPSAwO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5tdWx0aV9kYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICBzY2hlZHVsZXIuY29uZmlnLnhtbF9kYXRlID0gJyVZLSVtLSVkICVIOiVpJztcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5tYXJrX25vdyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5sb2NhbGUubGFiZWxzLnVuaXRfdGFiID0gJ1VuaXQnO1xyXG4gICAgICAgICAgICBzY2hlZHVsZXIubG9jYWxlLmxhYmVscy5zZWN0aW9uX2N1c3RvbSA9ICdTZWN0aW9uJztcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5maXJzdF9ob3VyID0gNDtcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5saW1pdF90aW1lX3NlbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5jb25maWcuZGV0YWlsc19vbl9jcmVhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNyZWF0ZVVuaXRzVmlldyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndW5pdCcsXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ3NlY3Rpb25faWQnLFxyXG4gICAgICAgICAgICAgICAgbGlzdDogYXJyRW1wbG95ZWVzXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmFkZE1hcmtlZFRpbWVzcGFuKHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0X2RhdGU6IG5ldyBEYXRlKDIwMTgsIDExLCAxNiwgNiwgMzApLFxyXG4gICAgICAgICAgICAgICAgZW5kX2RhdGU6IG5ldyBEYXRlKDIwMTgsIDExLCAxNiwgMTEpLFxyXG4gICAgICAgICAgICAgICAgY3NzOiAnZGh4X3RpbWVfcmVzZXJ2ZWQnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2RoeF90aW1lX2Jsb2NrJywgLy8gd2lsbCBhY3QgYXMgYmxvY2tlZCBzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaXQ6IDRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjYWxlbmRhci5zdGF0dXNJbml0KCk7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuaW5pdCgnY2FsZW5kYXInLCBuZXcgRGF0ZSgyMDE4LCAxMSwgMTYpLCAndW5pdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuc3RhdHVzSW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNjaGVkdWxlci50ZW1wbGF0ZXMuZXZlbnRfY2xhc3MgPSBmdW5jdGlvbihzdGFydCwgZW5kLCBldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgY3NzID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZXZUeXBlKVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZXZlbnQgaGFzIHR5cGUgcHJvcGVydHkgdGhlbiBzcGVjaWFsIGNsYXNzIHNob3VsZCBiZSBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgY3NzICs9ICdldmVudF8nICsgZ2V0TGFiZWwoZXZUeXBlLCBldmVudC5ldlR5cGUpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY3NzOyAvLyBkZWZhdWx0IHJldHVyblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExhYmVsKGFycmF5LCBrZXkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBhcnJheVtpXS5rZXkpIHJldHVybiBhcnJheVtpXS5sYWJlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBldlR5cGUgPSBbXHJcbiAgICAgICAgICAgIHsga2V5OiAnJywgbGFiZWw6ICdTZWxlY3QgZXZlbnQgdHlwZScgfSxcclxuICAgICAgICAgICAgeyBrZXk6IDEsIGxhYmVsOiAnbmV3JyB9LFxyXG4gICAgICAgICAgICB7IGtleTogMiwgbGFiZWw6ICd3b3JraW5nJyB9LFxyXG4gICAgICAgICAgICB7IGtleTogMywgbGFiZWw6ICdkb25lJyB9LFxyXG4gICAgICAgICAgICB7IGtleTogNCwgbGFiZWw6ICdjYW5jZWxlZCcgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHNjaGVkdWxlci5sb2NhbGUubGFiZWxzLnNlY3Rpb25fZXZUeXBlID0gJ0V2ZW50IHR5cGUnO1xyXG5cclxuICAgICAgICBzY2hlZHVsZXIuY29uZmlnLmxpZ2h0Ym94LnNlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnZXZUeXBlJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV2VHlwZSxcclxuICAgICAgICAgICAgICAgIG1hcF90bzogJ2V2VHlwZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGVuZGFyLnNob3dNaW5pY2FsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHNjaGVkdWxlci5pc0NhbGVuZGFyVmlzaWJsZSgpKSBzY2hlZHVsZXIuZGVzdHJveUNhbGVuZGFyKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzY2hlZHVsZXIucmVuZGVyQ2FsZW5kYXIoe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdkaHhfbWluaWNhbF9pY29uJyxcclxuICAgICAgICAgICAgICAgIGRhdGU6IHNjaGVkdWxlci5fZGF0ZSxcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbihkYXRlLCBjYWxlbmRhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlci5zZXRDdXJyZW50VmlldyhkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXIuZGVzdHJveUNhbGVuZGFyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxlbmRhci50aW1lU3RlcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBzdGVwID0gMTU7XHJcbiAgICAgICAgbGV0IGZvcm1hdCA9IHNjaGVkdWxlci5kYXRlLmRhdGVfdG9fc3RyKCclSDolaScpO1xyXG5cclxuICAgICAgICBzY2hlZHVsZXIuY29uZmlnLmhvdXJfc2l6ZV9weCA9ICg2MCAvIHN0ZXApICogMjI7XHJcbiAgICAgICAgc2NoZWR1bGVyLnRlbXBsYXRlcy5ob3VyX3NjYWxlID0gZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDYwIC8gc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9XHJcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdoZWlnaHQ6MjJweDtsaW5lLWhlaWdodDoyMnB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdChkYXRlKSArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICBkYXRlID0gc2NoZWR1bGVyLmRhdGUuYWRkKGRhdGUsIHN0ZXAsICdtaW51dGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxlbmRhci5oZWlnaHRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xyXG4gICAgICAgIGxldCBoZWFkZXJIZWlnaHQgPSAkKCcuaGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgbGV0IHRvcExpbmVIZWlnaHQgPSAkKCcuY2FsZW5kYXJfX3RvcC1saW5lJykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG4gICAgICAgICQoJy5jLWNhbGVuZGFyJykuY3NzKFxyXG4gICAgICAgICAgICAnbWluLWhlaWdodCcsXHJcbiAgICAgICAgICAgIGhlaWdodCAtIChoZWFkZXJIZWlnaHQgKyB0b3BMaW5lSGVpZ2h0KVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGVuZGFyLmN1c3RvbkV2ZW50ID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICByZXR1cm4gY2FsZW5kYXI7XHJcbn0pKGpRdWVyeSk7XHJcblxyXG5DYWxlbmRhci5pbml0KCk7XHJcbiJdfQ==
