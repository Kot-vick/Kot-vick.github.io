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

            calendar.tooltip();

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

    calendar.tooltip = function () {
        var tooltip = scheduler.dhtmlXTooltip;
        tooltip.config.className = 'dhtmlXTooltip tooltip c-calendar-tooltip';

        var format = scheduler.date.date_to_str('%H:%i');
        scheduler.templates.tooltip_text = function (start, end, event) {
            console.log('---', event);
            var title = void 0;
            var className = void 0;
            if (event.evType === '1') {
                title = 'Новая';
                className = 'event_new';
            } else if (event.evType === '2') {
                title = 'В работе';
                className = 'event_working';
            } else if (event.evType === '3') {
                title = 'Выполнена';
                className = 'event_done';
            } else if (event.evType === '4') {
                title = 'Отменена';
                className = 'event_canceled';
            }
            console.log('---', format(start));
            return '<span class="c-calendar-tooltip__header ' + className + '">' + title + '</span>\n                <div class="c-calendar-tooltip__body ' + className + '">\n                    <span class="c-calendar-tooltip__user">\u0415\u043B\u0435\u043D\u0430 \u0410\u0432\u0438\u043B\u043E\u0432\u0430\n                        <span class="c-calendar-tooltip__status">\u041D\u043E\u0432\u044B\u0439</span>\n                    </span>\n                    <span class="c-calendar-tooltip__phone">+7 (927) 107-11-39</span>\n                    <span class="c-calendar-tooltip__service">\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440</span>\n                    <span class="c-calendar-tooltip__time">\n                        ' + format(start) + ' - ' + format(end) + '\n                    </span>\n                    <span class="c-calendar-tooltip__price">800 <i class="far fa-ruble-sign"></i></span>\n                    <span class="c-calendar-tooltip__master">\u041C\u0430\u0441\u0442\u0435\u0440 \u041E\u043B\u044C\u0433\u0430 \u041A\u0430\u0440\u044F\u043A\u0438\u043D\u0430</span>\n                </div>';
        };
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
        var menuHeight = $('.js-menu').outerHeight(true);
        var resultHeight = void 0;

        if ($(window).width() > 480) {
            resultHeight = height - (headerHeight + topLineHeight);
        } else {
            resultHeight = height - (headerHeight + topLineHeight + menuHeight);
        }
        $('.c-calendar').css('min-height', resultHeight);
    };

    calendar.custonEvent = function () {};

    return calendar;
}(jQuery);

Calendar.init();

/*
 *** Order
 */
var Order = function () {
    var order = {};
    var $html = $('html');
    var $timePicker = $('.js-time-picker:not(.is-disabled)');
    var $payCheck = $('.js-pay-check');
    var $userCartBtn = $('.user-cart__btn');
    var $userBottom = $('.user-cart__bottom');
    var $orderTitle = $('.js-order-title');
    var $orderDetail = $('.js-order-detail');

    order.init = function () {
        var _this2 = this;

        this.confirmService();
        this.chooseMaster();

        setTimeout(function () {
            _this2.showContent();
        }, 1200);

        if ($(window).width() < 768) {
            this.prevClick();

            setTimeout(function () {
                _this2.fixedBlock($('.js-day-picker'));
            }, 500);
        }
    };

    order.confirmService = function () {
        $timePicker.on('click', function () {
            $timePicker.removeClass('is-active');
            $(this).addClass('is-active');
            $payCheck.addClass('is-hidden');
            $userCartBtn.removeClass('is-hidden');
            $userBottom.addClass('is-active');
            $html.addClass('is-fixed');
            $orderDetail.addClass('is-active');
            $userBottom.addClass('is-active');
            $orderTitle.text('Подтверждение заявки');
            $('.user-cart__top').addClass('is-active');
        });
    };

    order.fixedBlock = function (fixedBlock) {
        var height = fixedBlock.outerHeight(true);
        var $clone = $('<div class="clone">');
        $clone.insertAfter(fixedBlock);
        $clone.css('height', height).hide();

        var fixedBlockOffset = fixedBlock.offset().top - 50;

        $(window).scroll(function () {
            var scroll = $(this).scrollTop();

            if (scroll >= fixedBlockOffset) {
                fixedBlock.addClass('is-fixed');
                $clone.show();
            } else if (scroll < fixedBlockOffset) {
                fixedBlock.removeClass('is-fixed');
                $clone.hide();
            }
        });
    };

    order.prevClick = function () {
        var $prevBtn = $('.js-prev');
        var $orderEdit = $('.order-detail__edit');

        $prevBtn.on('click', function () {
            $orderDetail.removeClass('is-active');
            $userBottom.removeClass('is-active');
            $html.removeClass('is-fixed');
            $orderTitle.text('Создание заявки');
            $payCheck.addClass('is-hidden');
        });

        $orderEdit.on('click', function () {
            $orderDetail.removeClass('is-active');
            $userBottom.removeClass('is-active');
            $html.removeClass('is-fixed');
            $orderTitle.text('Редактирование заявки');
            $payCheck.addClass('is-hidden');
        });
    };

    order.chooseMaster = function () {
        var masterModal = $('#masterPicker');
        var master = masterModal.find('input');
        var masterCancel = masterModal.find('.btn');

        master.each(function () {
            $(this).on('click', function () {
                masterCancel.trigger('click');
            });
        });
    };

    order.showContent = function () {
        var orderLeftTop = $('.order__left_top');

        orderLeftTop.addClass('is-active');
        orderLeftTop.slideDown();
    };

    return order;
}();

Order.init();

/*
 *** DatePickerVanity
 */
(function () {
    var $calendar = $('.js-day-picker');
    var activeClass = 'is-active';
    var disableClass = 'is-disabled';
    var newDate = new Date();
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    $calendar.each(function () {
        var _this = $(this);
        var counter = 0;
        render(_this);

        var $item = _this.find('.day-picker__item');
        var $arrowR = _this.find('.day-picker__arrow--right');
        var $arrowL = _this.find('.day-picker__arrow--left');

        $item.on('click', function (e) {
            if (!$(this).hasClass(disableClass)) {
                $item.removeClass(activeClass);
                $(this).addClass(activeClass);
            }

            e.stopPropagation();
            e.preventDefault();
        });

        todayWeek(_this);

        $arrowR.on('click', function () {
            counter++;

            $arrowL.removeClass(disableClass);
            monthNameNext(_this);
            nextWeek(_this);
            weekCheck(_this, counter);
        });

        $arrowL.on('click', function () {
            if (!$arrowL.hasClass(disableClass)) {
                counter--;

                monthNamePrev(_this);
                prevWeek(_this);

                blockArrow(_this);
                weekCheck(_this, counter);
            }
        });
    });

    function render(el) {
        el.addClass('day-picker');

        var html = '<div class="day-picker__top">\n\n\t\t\t\t\t<span class="day-picker__month"></span>\n\t\t\t\t\t<span class="day-picker__year"></span>,\n                    <span class="day-picker__week"></span>\n\n                </div>\n                <div class="day-picker__bottom">\n                    <div class="day-picker__carousel">\n                        <button class="day-picker__arrow day-picker__arrow--left">\n                            <i class="fal fa-angle-left"></i>\n                        </button>\n\n                        <ul class="day-picker__list">\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u041F\u043D</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0412\u0442</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0421\u0440</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0427\u0442</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u041F\u0442</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0421\u0431</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0412\u0441</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                        </ul>\n\n                        <button class="day-picker__arrow day-picker__arrow--right">\n                            <i class="fal fa-angle-right"></i>\n                        </button>\n                    </div>\n                </div>';

        el.html(html);
    }

    function todayWeek(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var $month = el.find('.day-picker__month');
        var $year = el.find('.day-picker__year');
        var $weekDesc = el.find('.day-picker__week');
        var $arrowL = el.find('.day-picker__arrow--left');
        var nowWeekDayNum = newDate.getDay() - 1;
        var nowMonthDay = newDate.getDate();
        var nowMonth = newDate.getMonth();
        var nowYear = newDate.getFullYear();
        var weekDay = weekDayArr.eq(nowWeekDayNum);

        $arrowL.addClass(disableClass);
        $weekDesc.text('эта неделя');
        $month.text(months[nowMonth]);
        $year.text(nowYear);
        weekDay.text(nowMonthDay);
        weekDay.closest('.day-picker__item').addClass(activeClass);

        insertLeftSide(el);
        insertRightSide(el);
    }

    function nextWeek(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var weekDayLast = parseInt(weekDayArr.eq(6).text()) + 1;

        for (var i = 0; i < 7; i++) {
            weekDayArr.eq(i).text(weekDayLast++);

            weekDayArr.eq(i).closest('.day-picker__item').removeClass(disableClass);
            weekDayArr.eq(i).closest('.day-picker__item').removeClass(activeClass);

            if (weekDayArr.eq(i).text() > monthDays[monthNum(el)]) {
                weekDayLast = 1;
                weekDayArr.eq(i).text(weekDayLast++);
            }
        }
    }

    function prevWeek(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var weekDayFirst = parseInt(weekDayArr.eq(0).text()) - 1;
        var monthPrev = monthNum(el) - 1;

        for (var i = 6; i >= 0; i--) {
            weekDayArr.eq(i).text(weekDayFirst--);
            weekDayArr.eq(i).closest('.day-picker__item').removeClass(disableClass);
            weekDayArr.eq(i).closest('.day-picker__item').removeClass(activeClass);

            if (weekDayArr.eq(i).text() < 1) {
                if (monthPrev < 0) {
                    monthPrev = 11;
                }

                weekDayFirst = monthDays[monthPrev];
                weekDayArr.eq(i).text(weekDayFirst--);
            }
        }
    }

    function insertLeftSide(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var prevMonthDay = newDate.getDate() - 1;
        var prevWeekDay = newDate.getDay() - 2;
        var nowMonth = newDate.getMonth();

        for (var i = prevWeekDay; i >= 0; i--) {
            weekDayArr.eq(i).text(prevMonthDay--);

            if (weekDayArr.eq(i).text() < 1) {

                if (nowMonth < 0) {
                    nowMonth = 11;
                };

                prevMonthDay = monthDays[nowMonth - 1];
                weekDayArr.eq(i).text(prevMonthDay--);
            }

            weekDayArr.eq(i).closest('.day-picker__item').addClass(disableClass);
        }
    }

    function insertRightSide(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var nowWeekDayNum = newDate.getDay() - 1;
        var nowMonthDay = newDate.getDate();
        var nowMonth = newDate.getMonth();

        for (var i = nowWeekDayNum; i < 7; i++) {
            weekDayArr.eq(i).text(nowMonthDay++);

            if (weekDayArr.eq(i).text() > monthDays[nowMonth]) {
                nowMonthDay = 1;
                weekDayArr.eq(i).text(nowMonthDay++);
            }
        }
    }

    function monthNum(el) {
        var thisMonth = el.find('.day-picker__month');
        var thisMonthNum = '';

        for (var i = 0; i < months.length; i++) {
            if (months[i] == thisMonth.text()) {
                thisMonthNum = i;
            }
        }

        return parseInt(thisMonthNum);
    }

    function monthNameNext(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var thisMonth = el.find('.day-picker__month');
        var $year = el.find('.day-picker__year');
        var yearNum = parseInt($year.text());
        var thisMonthNum = '';

        for (var i = 0; i < weekDayArr.length; i++) {
            if (weekDayArr.eq(i).text() == monthDays[monthNum(el)]) {
                thisMonthNum = monthNum(el) + 1;

                if (thisMonthNum > 11) {
                    thisMonthNum = 0;
                }

                thisMonth.text(months[thisMonthNum]);
            }

            if (thisMonth.text() == 'Январь' && weekDayArr.eq(i).text() == monthDays[monthNum(el)]) {
                $year.text(yearNum + 1);
            }
        }
    }

    function monthNamePrev(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var thisMonth = el.find('.day-picker__month');
        var $year = el.find('.day-picker__year');
        var yearNum = parseInt($year.text());
        var thisMonthNum = '';

        for (var i = 0; i < weekDayArr.length; i++) {
            if (weekDayArr.eq(i).text() == 1) {
                thisMonthNum = monthNum(el) - 1;

                if (thisMonthNum < 0) {
                    thisMonthNum = 11;
                }

                thisMonth.text(months[thisMonthNum]);
            }

            if (thisMonth.text() == 'Декабрь' && weekDayArr.eq(i).text() == 1) {
                $year.text(yearNum - 1);
            }
        }
    }

    function blockArrow(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var thisMonth = el.find('.day-picker__month');

        for (var i = 0; i < weekDayArr.length; i++) {
            if (weekDayArr.eq(i).text() == newDate.getDate() && thisMonth.text() == months[newDate.getMonth()]) {
                todayWeek(el);
            }
        }
    }

    function weekCheck(el, counter) {
        var $weekDesc = el.find('.day-picker__week');

        if (counter == 1) {
            $weekDesc.text('следующая неделя');
        } else if (counter > 1 && counter <= 4) {
            $weekDesc.text('через ' + counter + ' недели');
        } else if (counter > 4) {
            $weekDesc.text('через ' + counter + ' недель');
        }
    }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbC5qcyJdLCJuYW1lcyI6WyIkIiwibGVuZ3RoIiwic2xpZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJkYXRhIiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJ0ZXh0IiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJvbiIsInZhbHVlcyIsImhhbmRsZSIsInJlbW92ZUNsYXNzIiwicmVtb3ZlQXR0ciIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiX3RoaXMiLCJhZGQiLCJmaW5kIiwiZG9uZSIsImRlbCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJjc3MiLCJ0b2dnbGVDbGFzcyIsInBhcmVudCIsInBob25lQ29uZmlybVRpbWVyIiwidGltZXIiLCJjb25zb2xlIiwibG9nIiwidGltIiwic2V0VGltZW91dCIsInQiLCJpbnQiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0YXJlYSIsImF1dG9zaXplIiwiY3RybEtleSIsIm1ldGFLZXkiLCJrZXlDb2RlIiwidmFsdWUiLCJwYXJlbnROb2RlIiwic3VibWl0IiwicHJldmVudERlZmF1bHQiLCJlbCIsImNoYXRCb2R5IiwiY2hhdEZvb3RlckhlaWdodCIsIm91dGVySGVpZ2h0Iiwic3R5bGUiLCJjc3NUZXh0Iiwic2Nyb2xsSGVpZ2h0IiwiYm90dG9tIiwib3ZlcmZsb3ciLCJ0aXRsZSIsIm1vZGFsIiwic2VhcmNoSW5wdXQiLCJoaW50IiwidmFsIiwid2luZG93Iiwid2lkdGgiLCIkcGFycmVudCIsImVuZCIsInNvcnRhYmxlIiwiY29ubmVjdFdpdGgiLCJjdXJzb3IiLCJ0b2xlcmFuY2UiLCJ1aSIsIml0ZW0iLCJzdG9wIiwiQ3JtIiwicmVxdWVzdCIsIndpZ2V0UmVwbGFjZUljb24iLCJkaXNhYmxlU2VsZWN0aW9uIiwidG9nZ2xlQ29udHJvbCIsIiRkb2N1bWVudCIsIiRwYXJlbnQiLCIkd2lkZ2V0TGVmdCIsIiR3aWRnZXRSaWdodCIsIiR0aXRsZUxlZnQiLCIkdGl0bGVSaWdodCIsInJlbW92ZSIsImluaXQiLCJteU1hcCIsInltYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsImJlaGF2aW9ycyIsImRpc2FibGUiLCJjb250cm9scyIsIm15UGluIiwiR2VvT2JqZWN0Q29sbGVjdGlvbiIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkltYWdlU2l6ZSIsImljb25JbWFnZU9mZnNldCIsIm15UGxhY2VtYXJrIiwiUGxhY2VtYXJrIiwiYmFsbG9vbkNvbnRlbnRIZWFkZXIiLCJiYWxsb29uQ29udGVudEJvZHkiLCJoaW50Q29udGVudCIsImdlb09iamVjdHMiLCJyZWFkeSIsImV2ZW50cyIsInNpbXBsZXNsaWRlciIsIiRkYXRlcGlja2VyIiwiZGF0ZVRvZGF5IiwiRGF0ZSIsImVhY2giLCIkYnRuVG9kYXkiLCIkYnRuUHJldiIsIiRidG5OZXh0IiwidHlwZSIsImF0dHIiLCJfc2VsZiIsImNoYW5nZVZhbCIsImRhdGVwaWNrZXIiLCJhdXRvQ2xvc2UiLCJtaW5EYXRlIiwib25TZWxlY3QiLCJmb3JtYXR0ZWREYXRlIiwic2VsZWN0RGF0ZSIsInNob3dXZWVrIiwiZGF0ZSIsImluc3QiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiY3VycmVudERhdGUiLCJnZXREYXRlIiwiY3VycmVudE1vbnRoIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImdldERheSIsImRhdGVGb3JtYXQiLCJzZXRJbnB1dERhdGUiLCJwcmV2Iiwic2hvdyIsImZvY3VzIiwidXBkYXRlRGF0YVNjaGVkdWxlIiwiY3JtU2NoZWR1bGVJbnB1dENhbGVuZGFyVG9wIiwicnVEYXRlcyIsImdldFdlZWtTY2hlZHVsZSIsInVwZGF0ZVZhbFNjaGVkdWxlIiwidG9nZ2xlU2VsZWN0ZWQiLCJkYXRlUGlja2VySW5saW5lIiwiZXZlbnREYXRlcyIsImlubGluZSIsIm11bHRpcGxlRGF0ZXMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsImluZGV4T2YiLCJjbGFzc2VzIiwiY3JtU2NoZWR1bGVEYXRlRmllbGRUb3AiLCJnZXQiLCJjdXJyIiwiY3VyckRheSIsImN1cnJNb250aCIsIm1vbmRheSIsInN1bmRheSIsImdldFJpZ2h0V2Vla1RleHQiLCJjdXJyRGF0ZSIsIm1vbnRoIiwiZmlyc3REYXkiLCJsYXN0RGF5IiwicGFyYW1zIiwib0RheUYiLCJvRGF5TCIsIm9Nb250aEYiLCJvTW9udGhMIiwib1llYXJGIiwib1llYXJMIiwiYXJyRGF0YSIsIkZvcm1EYXRhIiwidGVtcCIsIm5ld01vbnRoIiwic2V0RGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwicmVwbGFjZSIsImFwcGVuZCIsIkNhbGVuZGFyIiwiJGNhbGVuZGFyIiwiY2FsZW5kYXIiLCJoZWlnaHRzIiwidGltZVN0ZXAiLCJhcnJFbXBsb3llZXMiLCJhdmF0YXIiLCJuYW1lIiwibWFwIiwiaSIsInB1c2giLCJrZXkiLCJsYWJlbCIsInNjaGVkdWxlciIsInh5Iiwic2NhbGVfaGVpZ2h0IiwibmF2X2hlaWdodCIsImNvbmZpZyIsIm11bHRpX2RheSIsInhtbF9kYXRlIiwidG9vbHRpcCIsIm1hcmtfbm93IiwibG9jYWxlIiwibGFiZWxzIiwidW5pdF90YWIiLCJzZWN0aW9uX2N1c3RvbSIsImZpcnN0X2hvdXIiLCJsaW1pdF90aW1lX3NlbGVjdCIsImRldGFpbHNfb25fY3JlYXRlIiwiY3JlYXRlVW5pdHNWaWV3IiwicHJvcGVydHkiLCJsaXN0IiwiYWRkTWFya2VkVGltZXNwYW4iLCJzdGFydF9kYXRlIiwiZW5kX2RhdGUiLCJzZWN0aW9ucyIsInRpbWVsaW5lIiwidW5pdCIsInN0YXR1c0luaXQiLCJ0ZW1wbGF0ZXMiLCJldmVudF9jbGFzcyIsImV2ZW50IiwiZXZUeXBlIiwiZ2V0TGFiZWwiLCJ0b0xvd2VyQ2FzZSIsImFycmF5Iiwic2VjdGlvbl9ldlR5cGUiLCJsaWdodGJveCIsImhlaWdodCIsIm9wdGlvbnMiLCJtYXBfdG8iLCJkaHRtbFhUb29sdGlwIiwiY2xhc3NOYW1lIiwiZm9ybWF0IiwiZGF0ZV90b19zdHIiLCJ0b29sdGlwX3RleHQiLCJzaG93TWluaWNhbCIsImlzQ2FsZW5kYXJWaXNpYmxlIiwiZGVzdHJveUNhbGVuZGFyIiwicmVuZGVyQ2FsZW5kYXIiLCJwb3NpdGlvbiIsIl9kYXRlIiwibmF2aWdhdGlvbiIsImhhbmRsZXIiLCJzZXRDdXJyZW50VmlldyIsInN0ZXAiLCJob3VyX3NpemVfcHgiLCJob3VyX3NjYWxlIiwiaHRtbCIsImhlYWRlckhlaWdodCIsInRvcExpbmVIZWlnaHQiLCJtZW51SGVpZ2h0IiwicmVzdWx0SGVpZ2h0IiwiY3VzdG9uRXZlbnQiLCJqUXVlcnkiLCJPcmRlciIsIm9yZGVyIiwiJGh0bWwiLCIkdGltZVBpY2tlciIsIiRwYXlDaGVjayIsIiR1c2VyQ2FydEJ0biIsIiR1c2VyQm90dG9tIiwiJG9yZGVyVGl0bGUiLCIkb3JkZXJEZXRhaWwiLCJjb25maXJtU2VydmljZSIsImNob29zZU1hc3RlciIsInNob3dDb250ZW50IiwicHJldkNsaWNrIiwiZml4ZWRCbG9jayIsIiRjbG9uZSIsImluc2VydEFmdGVyIiwiaGlkZSIsImZpeGVkQmxvY2tPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJzY3JvbGxUb3AiLCIkcHJldkJ0biIsIiRvcmRlckVkaXQiLCJtYXN0ZXJNb2RhbCIsIm1hc3RlciIsIm1hc3RlckNhbmNlbCIsInRyaWdnZXIiLCJvcmRlckxlZnRUb3AiLCJzbGlkZURvd24iLCJhY3RpdmVDbGFzcyIsImRpc2FibGVDbGFzcyIsIm5ld0RhdGUiLCJtb250aERheXMiLCJtb250aHMiLCJjb3VudGVyIiwicmVuZGVyIiwiJGl0ZW0iLCIkYXJyb3dSIiwiJGFycm93TCIsInN0b3BQcm9wYWdhdGlvbiIsInRvZGF5V2VlayIsIm1vbnRoTmFtZU5leHQiLCJuZXh0V2VlayIsIndlZWtDaGVjayIsIm1vbnRoTmFtZVByZXYiLCJwcmV2V2VlayIsImJsb2NrQXJyb3ciLCJ3ZWVrRGF5QXJyIiwiJG1vbnRoIiwiJHllYXIiLCIkd2Vla0Rlc2MiLCJub3dXZWVrRGF5TnVtIiwibm93TW9udGhEYXkiLCJub3dNb250aCIsIm5vd1llYXIiLCJ3ZWVrRGF5IiwiZXEiLCJpbnNlcnRMZWZ0U2lkZSIsImluc2VydFJpZ2h0U2lkZSIsIndlZWtEYXlMYXN0IiwibW9udGhOdW0iLCJ3ZWVrRGF5Rmlyc3QiLCJtb250aFByZXYiLCJwcmV2TW9udGhEYXkiLCJwcmV2V2Vla0RheSIsInRoaXNNb250aCIsInRoaXNNb250aE51bSIsInllYXJOdW0iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsRUFBRSw2QkFBRixFQUFpQ0MsTUFBckMsRUFBNkM7QUFDekMsUUFBSUMsU0FBU0MsU0FBU0MsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBYjtBQUNBLFFBQUlDLGdCQUFnQkwsRUFBRSwyQkFBRixFQUErQk0sSUFBL0IsQ0FBb0MsT0FBcEMsQ0FBcEI7QUFDQSxRQUFJQyxjQUFjUCxFQUFFLDJCQUFGLEVBQStCTSxJQUEvQixDQUFvQyxLQUFwQyxDQUFsQjtBQUNBLFFBQUlFLFFBQVEsQ0FBQ1IsRUFBRSxlQUFGLENBQUQsRUFBcUJBLEVBQUUsYUFBRixDQUFyQixDQUFaO0FBQ0EsUUFBSVMsVUFBSjtBQUNBLFFBQUlDLFFBQUo7QUFDQSxRQUFJQyxTQUFKO0FBQ0EsUUFBSUMsSUFBSjs7QUFFQSxRQUFJSixNQUFNLENBQU4sRUFBU0ssSUFBVCxNQUFtQixFQUF2QixFQUEyQjtBQUN2QkoscUJBQWFKLGFBQWI7QUFDSCxLQUZELE1BRU87QUFDSEkscUJBQWFLLFNBQVNOLE1BQU0sQ0FBTixFQUFTSyxJQUFULEVBQVQsQ0FBYjtBQUNIOztBQUVELFFBQUlMLE1BQU0sQ0FBTixFQUFTSyxJQUFULE1BQW1CLEVBQXZCLEVBQTJCO0FBQ3ZCSCxtQkFBV0gsV0FBWDtBQUNILEtBRkQsTUFFTztBQUNIRyxtQkFBV0ksU0FBU04s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V0FBVyxDQUE5QixFQUFpQztBQUNwQ2dCLHNCQUFVblQsSUFBVixDQUFlLFdBQVdtUyxPQUFYLEdBQXFCLFNBQXBDO0FBQ0gsU0FGTSxNQUVBLElBQUlBLFVBQVUsQ0FBZCxFQUFpQjtBQUNwQmdCLHNCQUFVblQsSUFBVixDQUFlLFdBQVdtUyxPQUFYLEdBQXFCLFNBQXBDO0FBQ0g7QUFDSjtBQUNKLENBdlVEIiwiZmlsZSI6ImRlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICgkKCcuY2F0YWxvZy1maWx0ZXJfX2l0ZW1fcHJpY2UnKS5sZW5ndGgpIHtcclxuICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJyk7XHJcbiAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xyXG4gICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xyXG4gICAgdmFyIHNwYW5zID0gWyQoJyNqc1ByaWNlU3RhcnQnKSwgJCgnI2pzUHJpY2VFbmQnKV07XHJcbiAgICB2YXIgc3RhcnRQcmljZTtcclxuICAgIHZhciBlbmRQcmljZTtcclxuICAgIHZhciBhcnJQYXJhbXM7XHJcbiAgICB2YXIgc1VybDtcclxuXHJcbiAgICBpZiAoc3BhbnNbMF0udGV4dCgpID09ICcnKSB7XHJcbiAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS50ZXh0KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcbiAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXHJcbiAgICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICBtaW46IGFsbFByaWNlU3RhcnQsXHJcbiAgICAgICAgICAgIG1heDogYWxsUHJpY2VFbmRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHNsaWRlci5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xyXG4gICAgICAgIHNwYW5zW2hhbmRsZV0udGV4dChwYXJzZUludCh2YWx1ZXNbaGFuZGxlXSkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiQoJy5qcy1jYXRhbG9nLWZpbHRlci0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuJCgnLmpzLWNhcmQtc2VydmljZXMtaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGlmIChcclxuICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG4gICAgICAgICAgICAnLmNhcmQtc2VydmljZXMtaXRlbV9fbWlkZGxlLCAuY2FyZC1zZXJ2aWNlcy1pdGVtX19pbmZvLWJsb2NrLCAuY2FyZC1zZXJ2aWNlcy1pdGVtX19ib3R0b20nXHJcbiAgICAgICAgKS5sZW5ndGhcclxuICAgICkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgYWRkID0gX3RoaXMuZmluZCgnLmNhcmQtc2VydmljZXMtaXRlbV9fYWN0aW9uX2FkZCcpO1xyXG4gICAgICAgIHZhciBkb25lID0gX3RoaXMuZmluZCgnLmNhcmQtc2VydmljZXMtaXRlbV9fYWN0aW9uX2RvbmUnKTtcclxuICAgICAgICB2YXIgZGVsID0gX3RoaXMuZmluZCgnLmNhcmQtc2VydmljZXMtaXRlbV9fYWN0aW9uX2RlbCcpO1xyXG5cclxuICAgICAgICBpZiAoX3RoaXMuaGFzQ2xhc3MoJ2lzLWJvb2tlZCcpKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1ib29rZWQnKTtcclxuICAgICAgICAgICAgYWRkLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIGRvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfdGhpcy5hZGRDbGFzcygnaXMtYm9va2VkJyk7XHJcbiAgICAgICAgICAgIGFkZC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICBkb25lLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vL0Zhdm9yaXRlIGJ0blxyXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJ0bi1mYXYnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy9Db25maXJtIHBob25lXHJcbiQoJy5qcy10aW1lci0tcmVwZWF0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgJCh0aGlzKVxyXG4gICAgICAgIC5wYXJlbnQoJy5waG9uZS1jb25maXJtX19yZXBlYXQnKVxyXG4gICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbiAgICAgICAgLmNsb3Nlc3QoJy5qcy1jb25maXJtJylcclxuICAgICAgICAuZmluZCgnLmNvbmZpcm1fX3RpbWVyLCAuY29uZmlybV9fZmllbGQnKVxyXG4gICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgcGhvbmVDb25maXJtVGltZXIoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBwaG9uZUNvbmZpcm1UaW1lcigpIHtcclxuICAgIHZhciB0aW1lciA9ICQoJy5qcy10aW1lcicpO1xyXG4gICAgY29uc29sZS5sb2codGltZXIuZGF0YSgndGltZXInKSk7XHJcbiAgICB2YXIgdGltID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHQgPSB0aW1lci5kYXRhKCd0aW1lcicpO1xyXG4gICAgICAgICAgICB0aW1lci50ZXh0KHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0KTtcclxuICAgICAgICAgICAgdmFyIGludCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdC0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXIucGFyZW50KCkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtdGltZXItLXJlcGVhdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoJy5waG9uZS1jb25maXJtX19yZXBlYXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXIudGV4dCh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICQoJy5qcy10aW1lci0tcmVwZWF0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnQpO1xyXG4gICAgICAgICAgICAgICAgdGltKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRpbSgpO1xyXG59XHJcblxyXG4vL1RleHRhcmVhIGF1dG9IZWlnaHRcclxuaWYgKCQoJy5qcy10ZXh0YXJlYScpLmxlbmd0aCkge1xyXG4gICAgdmFyIHRleHRhcmVhID0gJCgnLmpzLXRleHRhcmVhJyk7XHJcbiAgICB0ZXh0YXJlYS5vbigna2V5ZG93bicsIGF1dG9zaXplKTtcclxuXHJcbiAgICB0ZXh0YXJlYS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSAmJlxyXG4gICAgICAgICAgICAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDEwKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSArPSAnXFxyXFxuJztcclxuICAgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXV0b3NpemUoKSB7XHJcbiAgICBsZXQgZWwgPSB0aGlzO1xyXG4gICAgbGV0IGNoYXRCb2R5ID0gJCgnLmNoYXRfX2JvZHknKTtcclxuICAgIGxldCBjaGF0Rm9vdGVySGVpZ2h0ID0gJCgnLmNoYXRfX2Zvb3RlcicpLm91dGVySGVpZ2h0KCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGVsLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OjM3cHgnO1xyXG4gICAgICAgIGVsLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIGNoYXRCb2R5LmNzcyh7XHJcbiAgICAgICAgICAgIGJvdHRvbTogMzkgKyBlbC5zY3JvbGxIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+PSAxMjMpIHtcclxuICAgICAgICAgICAgZWwuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XHJcbiAgICAgICAgICAgIGNoYXRCb2R5LmNzcyh7XHJcbiAgICAgICAgICAgICAgICBib3R0b206IGNoYXRGb290ZXJIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDApO1xyXG59XHJcblxyXG4kKCcuanMtZGlzYWJsZS1jYXRlZ29yeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRpdGxlID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICQoJyNkaXNhYmxlLWNhdGVnb3J5JykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAkKCcuZGlzYWJsZS1jYXRlZ29yeV9fZGF0YS10aXRsZScpLnRleHQodGl0bGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy9TZWFyY2ggSGludFxyXG5pZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCkge1xyXG4gICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xyXG4gICAgc2VhcmNoSW5wdXRcclxuICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8vQ3JtLmFwbGljYXRpb24uY2hhbmdlU3J2aWNlXHJcbiQoZG9jdW1lbnQpLm9uKCdzZWxlY3QyOnNlbGVjdCcsICcuanMtc2VsZWN0LS1zZXJ2aWNlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0ICRwYXJyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYXBsaWNhdGlvbi1pdGVtJyk7XHJcbiAgICAkcGFycmVudFxyXG4gICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLXNlcnZpY2UnKVxyXG4gICAgICAgIC5maW5kKCcuYmItaW5wdXRfX3dyYXAnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAuZW5kKClcclxuICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS0tZWRpdCcpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxufSk7XHJcblxyXG4vL0NybS5yZXF1ZXN0IHNvcnRhYmxlXHJcbiQoJy5qcy1zb3J0YWJsZScpXHJcbiAgICAuc29ydGFibGUoe1xyXG4gICAgICAgIGNvbm5lY3RXaXRoOiAnLmpzLXNvcnRhYmxlJyxcclxuICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcclxuICAgICAgICB0b2xlcmFuY2U6ICdwb2ludGVyJyxcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24oZSwgdWkpIHtcclxuICAgICAgICAgICAgdWkuaXRlbS5hZGRDbGFzcygnZHJhZy1zb3J0Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wOiBmdW5jdGlvbihlLCB1aSkge1xyXG4gICAgICAgICAgICB1aS5pdGVtLnJlbW92ZUNsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICAgICAgdWkuaXRlbS5yZW1vdmVDbGFzcygncmVxdWVzdC1pdGVtLS1uZXcnKTtcclxuICAgICAgICAgICAgQ3JtLnJlcXVlc3Qud2lnZXRSZXBsYWNlSWNvbih1aS5pdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLmRpc2FibGVTZWxlY3Rpb24oKTtcclxuXHJcbi8vU3R1ZGlvIHRvZ2dsZSBjb250cm9sXHJcbmZ1bmN0aW9uIHRvZ2dsZUNvbnRyb2woKSB7XHJcbiAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zdHVkaW8tc3lzdGVtLWJ0bicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc3R1ZGlvLXN5c3RlbScpO1xyXG4gICAgICAgIGxldCAkd2lkZ2V0TGVmdCA9ICRwYXJlbnQuZmluZCgnLndpZGdldF9fbGVmdCcpO1xyXG4gICAgICAgIGxldCAkd2lkZ2V0UmlnaHQgPSAkcGFyZW50LmZpbmQoJy53aWRnZXRfX3JpZ2h0Jyk7XHJcbiAgICAgICAgbGV0ICR0aXRsZUxlZnQgPSAkcGFyZW50LmZpbmQoJy5iYi1jaGVja2JveF9fdGl0bGUtLWxlZnQnKTtcclxuICAgICAgICBsZXQgJHRpdGxlUmlnaHQgPSAkcGFyZW50LmZpbmQoJy5iYi1jaGVja2JveF9fdGl0bGUtLXJpZ2h0Jyk7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgcmVtb3ZlKCR3aWRnZXRSaWdodCk7XHJcbiAgICAgICAgICAgIGFkZCgkd2lkZ2V0TGVmdCk7XHJcbiAgICAgICAgICAgICR0aXRsZUxlZnQuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJHRpdGxlUmlnaHQucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW1vdmUoJHdpZGdldExlZnQpO1xyXG4gICAgICAgICAgICBhZGQoJHdpZGdldFJpZ2h0KTtcclxuICAgICAgICAgICAgJHRpdGxlTGVmdC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkdGl0bGVSaWdodC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZChlbCkge1xyXG4gICAgICAgIGVsLmZpbmQoJy5saXN0LS1pY29uJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdsaXN0LWNvbG9yLS1zdWNjZXNzJylcclxuICAgICAgICAgICAgLmZpbmQoJy5saXN0X19pY29uJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWwnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhcycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZShlbCkge1xyXG4gICAgICAgIGVsLmZpbmQoJy5saXN0LS1pY29uJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsaXN0LWNvbG9yLS1zdWNjZXNzJylcclxuICAgICAgICAgICAgLmZpbmQoJy5saXN0X19pY29uJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYXMnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhbCcpO1xyXG4gICAgfVxyXG59XHJcbnRvZ2dsZUNvbnRyb2woKTtcclxuXHJcbi8vQ2FyZCBBZHJlc3MgTWFwXHJcbmlmICgkKCcjY2FyZC1tYXAnKS5sZW5ndGgpIHtcclxuICAgIHltYXBzLnJlYWR5KGluaXQpO1xyXG4gICAgdmFyIG15TWFwLCBteVBsYWNlbWFyaywgbXlQaW47XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ2NhcmQtbWFwJywge1xyXG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sXHJcbiAgICAgICAgICAgIHpvb206IDE2XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKFsnc2Nyb2xsWm9vbSddKTtcclxuXHJcbiAgICAgICAgbXlNYXAuY29udHJvbHNcclxuICAgICAgICAgICAgLnJlbW92ZSgnc2VhcmNoQ29udHJvbCcpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoJ3R5cGVTZWxlY3RvcicpXHJcbiAgICAgICAgICAgIC5hZGQoJ3JvdXRlRWRpdG9yJyk7XHJcblxyXG4gICAgICAgIG15UGluID0gbmV3IHltYXBzLkdlb09iamVjdENvbGxlY3Rpb24oXHJcbiAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2dlbmVyYWwvbWFwLXBpbi5zdmcnLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzMwLCA0Ml0sXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstMywgLTQyXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sIHtcclxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRIZWFkZXI6XHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtcGluX190aXRsZVwiPk5haWx6IFggQ29sbGFiPC9zcGFuPicsXHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50Qm9keTpcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1waW5fX3BsYWNlXCI+0YPQuy4g0JHQvtC70YzRiNCw0Y8g0J/QvtC70Y/QvdC60LAsIDUx0JAvOSwg0JzQvtGB0LrQvtCy0YHQutC40Lkg0YAt0L08L3NwYW4+IDxkaXYgY2xhc3M9XCJtYXAtcGluX19wcm9wZXJ0aWVzXCI+PHVsIGNsYXNzPVwicHJvcGVydGllc19fbGlzdFwiPjxsaSBjbGFzcz1cInByb3BlcnRpZXNfX2l0ZW0gcHJvcGVydGllc19faXRlbV9zYWxlIGJiLWRyb3Bkb3duIHRvcCBiYi1kcm9wZG93bi0taG92ZXIganMtYmItZHJvcGRvd25cIj4gPHN2ZyBjbGFzcz1cImljb24gaWNvbi1wcm9jZW50IFwiPjx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI3Byb2NlbnRcIj48L3VzZT48L3N2Zz48ZGl2IGNsYXNzPVwiYmItZHJvcGRvd25fX2xpc3RcIj7QtdGB0YLRjCDRgdC60LjQtNC60Lg8L2Rpdj48L2xpPjxsaSBjbGFzcz1cInByb3BlcnRpZXNfX2l0ZW0gcHJvcGVydGllc19faXRlbV9jYXIgYmItZHJvcGRvd24gdG9wIGJiLWRyb3Bkb3duLS1ob3ZlciBqcy1iYi1kcm9wZG93blwiPiA8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWNhciBcIj48dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNjYXJcIj48L3VzZT48L3N2Zz48ZGl2IGNsYXNzPVwiYmItZHJvcGRvd25fX2xpc3RcIj7QvNC+0LPRgyDQv9GA0LjQtdGF0LDRgtGMPC9kaXY+PC9saT48L3VsPjwvZGl2PicsXHJcbiAgICAgICAgICAgIGhpbnRDb250ZW50OlxyXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtYXAtcGluX19ob3ZlclwiPjEt0LrQvtC80L3QsNGC0L3QsNGPINC60LLQsNGA0YLQuNGA0LAgPGRpdiBjbGFzcz1cInJhdGluZ1wiPjxkaXYgY2xhc3M9XCJyYXRpbmdfX2lubmVyXCIgc3R5bGU9XCJ3aWR0aDogOTAlXCI+PC9kaXY+PC9kaXY+IDxzcGFuPtC+0YIgMiA4MDAgPGkgY2xhc3M9XCJydWJcIj5hPC9pPjwvc3Bhbj4gPC9kaXY+J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBteVBpbi5hZGQobXlQbGFjZW1hcmspO1xyXG4gICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGluKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9DYWJpbmV0IE1hcFxyXG5pZiAoJCgnI2NhYmluZXQtbWFwJykubGVuZ3RoKSB7XHJcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcclxuICAgIHZhciBteU1hcCwgbXlQbGFjZW1hcmssIG15UGluO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdjYWJpbmV0LW1hcCcsIHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLFxyXG4gICAgICAgICAgICB6b29tOiAxNlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XHJcblxyXG4gICAgICAgIG15TWFwLmNvbnRyb2xzXHJcbiAgICAgICAgICAgIC5yZW1vdmUoJ3NlYXJjaENvbnRyb2wnKVxyXG4gICAgICAgICAgICAucmVtb3ZlKCd0eXBlU2VsZWN0b3InKVxyXG4gICAgICAgICAgICAuYWRkKCdyb3V0ZUVkaXRvcicpO1xyXG5cclxuICAgICAgICBteVBpbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKFxyXG4gICAgICAgICAgICB7fSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlSHJlZjogJ2ltZy9nZW5lcmFsL21hcC1waW4uc3ZnJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdKTtcclxuXHJcbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBpbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vQ2F0YWxvZyBNYXBcclxuaWYgKCQoJyNjYXRhbG9nLW1hcCwgI21hcCcpLmxlbmd0aCkge1xyXG4gICAgeW1hcHMucmVhZHkoaW5pdCk7XHJcbiAgICB2YXIgbXlNYXAsIG15UGxhY2VtYXJrLCBteVBpbjtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY2F0YWxvZy1tYXAnLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSxcclxuICAgICAgICAgICAgem9vbTogMTZcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoWydzY3JvbGxab29tJ10pO1xyXG5cclxuICAgICAgICBteU1hcC5jb250cm9sc1xyXG4gICAgICAgICAgICAucmVtb3ZlKCdzZWFyY2hDb250cm9sJylcclxuICAgICAgICAgICAgLnJlbW92ZSgndHlwZVNlbGVjdG9yJylcclxuICAgICAgICAgICAgLmFkZCgncm91dGVFZGl0b3InKTtcclxuXHJcbiAgICAgICAgbXlQaW4gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbihcclxuICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvZ2VuZXJhbC9tYXAtcGluLnN2ZycsXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMzAsIDQyXSxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogWy0zLCAtNDJdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBteVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSwge1xyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudEhlYWRlcjpcclxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1waW5fX3RpdGxlXCI+0KHRgtGD0LTQuNGPIFwi0KHQu9C10LfQsCDQtNGA0LDQutC+0L3QsFwiPC9zcGFuPjxkaXYgY2xhc3M9XCJtYXAtcGluX19hZGRyZXNzXCI+0JzQvtGB0LrQstCwLCDRg9C7LiDQk9Cw0LPQsNGA0LjQvdCwLCAyOC8yLCDQvC4g0JvRg9Cx0Y/QvdC60LA8L2Rpdj4nLFxyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudEJvZHk6XHJcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1hcC1waW5fX2ltYWdlIGpzLXNzLW1hcC1zbGlkZXIgaW1hZ2Utd3JhcHBlclwiICAgICAgICAgICAgICAgIGRhdGEtc3MtaW1hZ2VzPVwiLi4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTAuanBnOy4uL2ltZy9leGFtcGxlcy91c2VyL2NhdGFsb2cvY2F0YWxvZy0xLmpwZzsuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMi5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTMuanBnOy4uL2ltZy9leGFtcGxlcy91c2VyL2NhdGFsb2cvY2F0YWxvZy00LmpwZ1wiPjxpbWcgc3JjPVwiLi4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTAuanBnXCI+PC9kaXY+PGRpdiBjbGFzcz1cIm1hcC1waW5fX2luZm9cIj48ZGl2IGNsYXNzPVwicmF0aW5nIG1hcC1waW5fX3JhdGluZ1wiPjxkaXYgY2xhc3M9XCJyYXRpbmdfX2lubmVyXCIgc3R5bGU9XCJ3aWR0aDogNzAlXCI+PC9kaXY+PHNwYW4gY2xhc3M9XCJyYXRpbmdfX3Jldi1jb3VudFwiPig3Nyk8L3NwYW4+PC9kaXY+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1pY29uIGJ1dHRvbi1pY29uLS1mYXYgbWFwLXBpbl9fZmF2IGpzLWJ0bi1mYXZcIj48L2J1dHRvbj48L2Rpdj4nXHJcbiAgICAgICAgICAgIC8vIGhpbnRDb250ZW50OlxyXG4gICAgICAgICAgICAvLyAnPGRpdiBjbGFzcz1cIm1hcC1waW5fX2hvdmVyXCI+MS3QutC+0LzQvdCw0YLQvdCw0Y8g0LrQstCw0YDRgtC40YDQsCA8ZGl2IGNsYXNzPVwicmF0aW5nXCI+PGRpdiBjbGFzcz1cInJhdGluZ19faW5uZXJcIiBzdHlsZT1cIndpZHRoOiA5MCVcIj48L2Rpdj48L2Rpdj4gPHNwYW4+0L7RgiAyIDgwMCA8aSBjbGFzcz1cInJ1YlwiPmE8L2k+PC9zcGFuPiA8L2Rpdj4nXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG15TWFwLmV2ZW50cy5hZGQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IH0pO1xyXG5cclxuICAgICAgICBteVBsYWNlbWFyay5ldmVudHMuYWRkKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuanMtc3MtbWFwLXNsaWRlcicpLnNpbXBsZXNsaWRlcigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ2JhbG9vbiBjbGljaycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBteVBpbi5hZGQobXlQbGFjZW1hcmspO1xyXG4gICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGluKTtcclxuICAgIH1cclxufVxyXG5cclxuLypcclxuICoqKiBEYXRlUGlja2VyXHJcbiAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJGRhdGVwaWNrZXIgPSAkKCcuanMtZGF0ZScpO1xyXG4gICAgbGV0IGRhdGVUb2RheSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgJGRhdGVwaWNrZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWRhdGUnKTtcclxuICAgICAgICBsZXQgJGJ0blRvZGF5ID0gJHBhcmVudC5maW5kKCcuYmItZGF0ZV9fYnRuLS10b2RheScpO1xyXG4gICAgICAgIGxldCAkYnRuUHJldiA9ICRwYXJlbnQuZmluZCgnLmJiLWRhdGVfX2J0bi0tcHJldicpO1xyXG4gICAgICAgIGxldCAkYnRuTmV4dCA9ICRwYXJlbnQuZmluZCgnLmJiLWRhdGVfX2J0bi0tbmV4dCcpO1xyXG4gICAgICAgIGxldCB0eXBlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXR5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdleHBhbmRlZCcpIHtcclxuICAgICAgICAgICAgbGV0IF9zZWxmID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VWYWwoJCh0aGlzKSwgdmFsKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihmb3JtYXR0ZWREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVZhbChfc2VsZiwgZm9ybWF0dGVkRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgIC5zZWxlY3REYXRlKGRhdGVUb2RheSk7XHJcblxyXG4gICAgICAgICAgICAvL1BpY2tlciB3aXRoIGNvbnRyb2xzXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29udHJvbHMnKSB7XHJcbiAgICAgICAgICAgIGxldCBfc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlVmFsKCQodGhpcyksIHZhbCk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dXZWVrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbkRhdGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZm9ybWF0dGVkRGF0ZSwgZGF0ZSwgaW5zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmREYXRlID0gbmV3IERhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldERhdGUoKSAtIGRhdGUuZ2V0RGF5KCkgKyA3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF5KCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgNyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXRNb250aCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlVmFsKF9zZWxmLCBmb3JtYXR0ZWREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdERhdGUoZGF0ZVRvZGF5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogZGF0ZVRvZGF5XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdERhdGUoZGF0ZVRvZGF5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRkYXRlcGlja2VyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCd0eXBlJywgJ2RhdGUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2V0SW5wdXREYXRlKCcuanMtZGF0ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkYnRuVG9kYXkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0RGF0ZShkYXRlVG9kYXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkYnRuUHJldi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgIC5wcmV2KCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ2NsaWNrIHByZXYnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9TaG93IERhdGVwaWNrZXIgd2hlbiBjbGljayBwYXJyZW50IGNvbnRhaW5lclxyXG4gICAgICAgICRwYXJlbnQuZmluZCgnLmpzLWRhdGUtZmllbGQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRkYXRlcGlja2VyID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5iYi1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcigpXHJcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG5cclxuICAgICAgICAgICAgJGRhdGVwaWNrZXIuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0NoYW5nZSBkYXRlIGZpZWxkIChub3QgaW5wdXQpIHZhbHVlXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlVmFsKGVsLCB2YWwpIHtcclxuICAgICAgICAgICAgZWwuY2xvc2VzdCgnLmJiLWRhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlLWZpZWxkJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DbGljayBpY29uIC0gc2hvdyBwaWNrZXJcclxuICAgICQoJy5qcy1pbnB1dC1pY29uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcuanMtZGF0ZScpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZURhdGFTY2hlZHVsZSgpIHtcclxuICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBjcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3AgPSAkKCcuanNDcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3AnKTtcclxuICAgIGxldCBydURhdGVzID0gZ2V0V2Vla1NjaGVkdWxlKGRhdGUpO1xyXG5cclxuICAgIHVwZGF0ZVZhbFNjaGVkdWxlKHJ1RGF0ZXMpO1xyXG5cclxuICAgIGlmIChjcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3AubGVuZ3RoKSB7XHJcbiAgICAgICAgY3JtU2NoZWR1bGVJbnB1dENhbGVuZGFyVG9wXHJcbiAgICAgICAgICAgIC5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRvZ2dsZVNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1pbkRhdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uKGZvcm1hdHRlZERhdGUsIGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcnVEYXRlcyA9IGdldFdlZWtTY2hlZHVsZShkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmFsU2NoZWR1bGUocnVEYXRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgLnNlbGVjdERhdGUoKTtcclxuICAgIH1cclxufVxyXG51cGRhdGVEYXRhU2NoZWR1bGUoKTtcclxuXHJcbihmdW5jdGlvbiBkYXRlUGlja2VySW5saW5lKCkge1xyXG4gICAgdmFyIGV2ZW50RGF0ZXMgPSBbMSwgMTAsIDEyLCAyMl07XHJcblxyXG4gICAgJCgnLmpzLWRhdGUtaW5saW5lJykuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgaW5saW5lOiB0cnVlLFxyXG4gICAgICAgIG11bHRpcGxlRGF0ZXM6IHRydWUsXHJcbiAgICAgICAgb25SZW5kZXJDZWxsOiBmdW5jdGlvbihkYXRlLCBjZWxsVHlwZSkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudERhdGUgPSBkYXRlLmdldERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjZWxsVHlwZSA9PSAnZGF5JyAmJiBldmVudERhdGVzLmluZGV4T2YoY3VycmVudERhdGUpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdpcy1jaGVja2VkJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlVmFsU2NoZWR1bGUodmFsdWUpIHtcclxuICAgIGxldCBjcm1TY2hlZHVsZURhdGVGaWVsZFRvcCA9ICQoJy5qc0NybVNjaGVkdWxlRGF0ZUZpZWxkVG9wJyk7XHJcblxyXG4gICAgY3JtU2NoZWR1bGVEYXRlRmllbGRUb3AudGV4dCh2YWx1ZS5nZXQoJ3RleHQnKSk7XHJcblxyXG4gICAgY3JtU2NoZWR1bGVEYXRlRmllbGRUb3Aub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmpzQ3JtU2NoZWR1bGVJbnB1dENhbGVuZGFyVG9wJylcclxuICAgICAgICAgICAgLmRhdGVwaWNrZXIoKVxyXG4gICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgIC5zaG93KCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0V2Vla1NjaGVkdWxlKGRhdGUpIHtcclxuICAgIGxldCBjdXJyID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICBsZXQgY3VyckRheSA9IGN1cnIuZ2V0RGF5KCk7XHJcbiAgICBsZXQgY3Vyck1vbnRoID0gY3Vyci5nZXRNb250aCgpO1xyXG4gICAgbGV0IG1vbmRheTtcclxuICAgIGxldCBzdW5kYXk7XHJcblxyXG4gICAgaWYgKGN1cnJEYXkgPT09IDApIHtcclxuICAgICAgICBtb25kYXkgPSBjdXJyLmdldERhdGUoKSAtIDY7XHJcbiAgICAgICAgc3VuZGF5ID0gY3Vyci5nZXREYXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1vbmRheSA9IGN1cnIuZ2V0RGF0ZSgpIC0gY3Vyci5nZXREYXkoKSArIDE7XHJcbiAgICAgICAgc3VuZGF5ID0gbW9uZGF5ICsgNjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ2V0UmlnaHRXZWVrVGV4dChjdXJyLCBtb25kYXksIHN1bmRheSwgY3Vyck1vbnRoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmlnaHRXZWVrVGV4dChjdXJyRGF0ZSwgbW9uZGF5LCBzdW5kYXksIG1vbnRoKSB7XHJcbiAgICBsZXQgZmlyc3REYXk7XHJcbiAgICBsZXQgbGFzdERheTtcclxuICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgbW9udGg6ICdzaG9ydCdcclxuICAgIH07XHJcbiAgICBsZXQgb0RheUY7XHJcbiAgICBsZXQgb0RheUw7XHJcbiAgICBsZXQgb01vbnRoRjtcclxuICAgIGxldCBvTW9udGhMO1xyXG4gICAgbGV0IG9ZZWFyRjtcclxuICAgIGxldCBvWWVhckw7XHJcbiAgICBsZXQgYXJyRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgbGV0IHRlbXA7XHJcblxyXG4gICAgaWYgKHN1bmRheSA+IG1vbmRheSAmJiAobW9uZGF5ID09PSAwIHx8IG1vbmRheSA8IDApKSB7XHJcbiAgICAgICAgbGV0IG5ld01vbnRoID0gbmV3IERhdGUoY3VyckRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGgsIDEpO1xyXG5cclxuICAgICAgICBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJEYXRlLnNldERhdGUobW9uZGF5KSk7XHJcbiAgICAgICAgb0RheUYgPSBmaXJzdERheS5nZXREYXRlKCk7XHJcbiAgICAgICAgb1llYXJGID0gZmlyc3REYXkuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgZmlyc3REYXkgPSBmaXJzdERheS50b0xvY2FsZVN0cmluZygncnUnLCBwYXJhbXMpO1xyXG4gICAgICAgIG9Nb250aEYgPSBmaXJzdERheS5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgICBsYXN0RGF5ID0gbmV3IERhdGUobmV3TW9udGguc2V0RGF0ZShzdW5kYXkpKTtcclxuICAgICAgICBvRGF5TCA9IGxhc3REYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIG9ZZWFyTCA9IGxhc3REYXkuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgbGFzdERheSA9IGxhc3REYXkudG9Mb2NhbGVTdHJpbmcoJ3J1JywgcGFyYW1zKTtcclxuICAgICAgICBvTW9udGhMID0gbGFzdERheS5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgICBpZiAob1llYXJGID09PSBvWWVhckwpIHtcclxuICAgICAgICAgICAgdGVtcCA9XHJcbiAgICAgICAgICAgICAgICBvRGF5RiArXHJcbiAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgb01vbnRoRiArXHJcbiAgICAgICAgICAgICAgICAnIC0gJyArXHJcbiAgICAgICAgICAgICAgICBvRGF5TCArXHJcbiAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgb01vbnRoTCArXHJcbiAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgIG9ZZWFyRjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZW1wID1cclxuICAgICAgICAgICAgICAgIG9EYXlGICtcclxuICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICBvTW9udGhGICtcclxuICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgb1llYXJGICtcclxuICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgIG9EYXlMICtcclxuICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgb1llYXJMO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnJEYXRhLmFwcGVuZCgndGV4dCcsIHRlbXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJEYXRlLnNldERhdGUobW9uZGF5KSk7XHJcbiAgICAgICAgb0RheUYgPSBmaXJzdERheS5nZXREYXRlKCk7XHJcbiAgICAgICAgb1llYXJGID0gZmlyc3REYXkuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgZmlyc3REYXkgPSBmaXJzdERheS50b0xvY2FsZVN0cmluZygncnUnLCBwYXJhbXMpO1xyXG4gICAgICAgIG9Nb250aEYgPSBmaXJzdERheS5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgICBsYXN0RGF5ID0gbmV3IERhdGUoY3VyckRhdGUuc2V0RGF0ZShzdW5kYXkpKTtcclxuICAgICAgICBvRGF5TCA9IGxhc3REYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIG9ZZWFyTCA9IGxhc3REYXkuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgbGFzdERheSA9IGxhc3REYXkudG9Mb2NhbGVTdHJpbmcoJ3J1JywgcGFyYW1zKTtcclxuICAgICAgICBvTW9udGhMID0gbGFzdERheS5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgICBpZiAob01vbnRoTCA9PT0gb01vbnRoRikge1xyXG4gICAgICAgICAgICB0ZW1wID0gb0RheUYgKyAnIC0gJyArIG9EYXlMICsgJyAnICsgb01vbnRoRiArICcsICcgKyBvWWVhckY7XHJcbiAgICAgICAgICAgIGFyckRhdGEuYXBwZW5kKCd0ZXh0JywgdGVtcCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG9ZZWFyRiA9PT0gb1llYXJMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID1cclxuICAgICAgICAgICAgICAgICAgICBvRGF5RiArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhGICtcclxuICAgICAgICAgICAgICAgICAgICAnIC0gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb0RheUwgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb01vbnRoTCArXHJcbiAgICAgICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb1llYXJGO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9XHJcbiAgICAgICAgICAgICAgICAgICAgb0RheUYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb01vbnRoRiArXHJcbiAgICAgICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb1llYXJGICtcclxuICAgICAgICAgICAgICAgICAgICAnIC0gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb0RheUwgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb01vbnRoTCArXHJcbiAgICAgICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb1llYXJMO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyckRhdGEuYXBwZW5kKCd0ZXh0JywgdGVtcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJEYXRhO1xyXG59XHJcblxyXG5cclxuLypcclxuICoqKiBDYWxlbmRhclxyXG4gKi9cclxuY29uc3QgQ2FsZW5kYXIgPSAoZnVuY3Rpb24oJCkge1xyXG4gICAgbGV0ICRjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpO1xyXG4gICAgbGV0IGNhbGVuZGFyID0ge307XHJcblxyXG4gICAgY2FsZW5kYXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkY2FsZW5kYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0cygpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGVwKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJyRW1wbG95ZWVzID0gW107XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJyRGF0YSA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9jYXJhLWF2YXRhci5qcGcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQkNC70LXQvdCwINCe0YfQtdC90YzQtNC70LjQvdC90LDRj9GE0LDQvNC40LvQuNGPJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9jYXJhLWF2YXRhci0xLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9CQ0LvQtdC90LAg0J7Rh9C10L3RjNC00LvQuNC90L3QsNGP0YTQsNC80LjQu9C40Y8nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL2RhbmllbGEtYXZhdGFyLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9CQ0LvQtdC90LAg0J7Rh9C10L3RjNC00LvQuNC90L3QsNGP0YTQsNC80LjQu9C40Y8nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL2xpbWEtYXZhdGFyLTEuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JDQu9C10L3QsCDQntGH0LXQvdGM0LTQu9C40L3QvdCw0Y/RhNCw0LzQuNC70LjRjydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvbGltYS1hdmF0YXIuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JDQu9C10L3QsCDQntGH0LXQvdGM0LTQu9C40L3QvdCw0Y/RhNCw0LzQuNC70LjRjydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvbm9hdmF0YXIuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JzQuNGB0YLQtdGAINCT0LjQv9GBJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9hdmF0YXIuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JTRj9C00Y8g0JLQsNGB0Y8nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBhcnJEYXRhLm1hcChmdW5jdGlvbihkYXRhLCBpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJFbXBsb3llZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInVzZXIgdXNlci0tc21hbGxcIj48ZGl2IGNsYXNzPVwidXNlcl9faW1nXCI+PGltZyBzcmM9XCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hdmF0YXIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwidXNlcl9fbmFtZVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm5hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLnh5LnNjYWxlX2hlaWdodCA9IDg1O1xyXG4gICAgICAgICAgICBzY2hlZHVsZXIueHkubmF2X2hlaWdodCA9IDA7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuY29uZmlnLm11bHRpX2RheSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5jb25maWcueG1sX2RhdGUgPSAnJVktJW0tJWQgJUg6JWknO1xyXG5cclxuICAgICAgICAgICAgY2FsZW5kYXIudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5tYXJrX25vdyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5sb2NhbGUubGFiZWxzLnVuaXRfdGFiID0gJ1VuaXQnO1xyXG4gICAgICAgICAgICBzY2hlZHVsZXIubG9jYWxlLmxhYmVscy5zZWN0aW9uX2N1c3RvbSA9ICdTZWN0aW9uJztcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5maXJzdF9ob3VyID0gNDtcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5saW1pdF90aW1lX3NlbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5jb25maWcuZGV0YWlsc19vbl9jcmVhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNyZWF0ZVVuaXRzVmlldyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndW5pdCcsXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ3NlY3Rpb25faWQnLFxyXG4gICAgICAgICAgICAgICAgbGlzdDogYXJyRW1wbG95ZWVzXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmFkZE1hcmtlZFRpbWVzcGFuKHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0X2RhdGU6IG5ldyBEYXRlKDIwMTgsIDExLCAxNiwgNiwgMzApLFxyXG4gICAgICAgICAgICAgICAgZW5kX2RhdGU6IG5ldyBEYXRlKDIwMTgsIDExLCAxNiwgMTEpLFxyXG4gICAgICAgICAgICAgICAgY3NzOiAnZGh4X3RpbWVfcmVzZXJ2ZWQnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2RoeF90aW1lX2Jsb2NrJywgLy8gd2lsbCBhY3QgYXMgYmxvY2tlZCBzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaXQ6IDRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjYWxlbmRhci5zdGF0dXNJbml0KCk7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuaW5pdCgnY2FsZW5kYXInLCBuZXcgRGF0ZSgyMDE4LCAxMSwgMTYpLCAndW5pdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuc3RhdHVzSW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNjaGVkdWxlci50ZW1wbGF0ZXMuZXZlbnRfY2xhc3MgPSBmdW5jdGlvbihzdGFydCwgZW5kLCBldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgY3NzID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZXZUeXBlKVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZXZlbnQgaGFzIHR5cGUgcHJvcGVydHkgdGhlbiBzcGVjaWFsIGNsYXNzIHNob3VsZCBiZSBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgY3NzICs9ICdldmVudF8nICsgZ2V0TGFiZWwoZXZUeXBlLCBldmVudC5ldlR5cGUpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY3NzOyAvLyBkZWZhdWx0IHJldHVyblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExhYmVsKGFycmF5LCBrZXkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBhcnJheVtpXS5rZXkpIHJldHVybiBhcnJheVtpXS5sYWJlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBldlR5cGUgPSBbXHJcbiAgICAgICAgICAgIHsga2V5OiAnJywgbGFiZWw6ICdTZWxlY3QgZXZlbnQgdHlwZScgfSxcclxuICAgICAgICAgICAgeyBrZXk6IDEsIGxhYmVsOiAnbmV3JyB9LFxyXG4gICAgICAgICAgICB7IGtleTogMiwgbGFiZWw6ICd3b3JraW5nJyB9LFxyXG4gICAgICAgICAgICB7IGtleTogMywgbGFiZWw6ICdkb25lJyB9LFxyXG4gICAgICAgICAgICB7IGtleTogNCwgbGFiZWw6ICdjYW5jZWxlZCcgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHNjaGVkdWxlci5sb2NhbGUubGFiZWxzLnNlY3Rpb25fZXZUeXBlID0gJ0V2ZW50IHR5cGUnO1xyXG5cclxuICAgICAgICBzY2hlZHVsZXIuY29uZmlnLmxpZ2h0Ym94LnNlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnZXZUeXBlJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV2VHlwZSxcclxuICAgICAgICAgICAgICAgIG1hcF90bzogJ2V2VHlwZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGVuZGFyLnRvb2x0aXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgdG9vbHRpcCA9IHNjaGVkdWxlci5kaHRtbFhUb29sdGlwO1xyXG4gICAgICAgIHRvb2x0aXAuY29uZmlnLmNsYXNzTmFtZSA9ICdkaHRtbFhUb29sdGlwIHRvb2x0aXAgYy1jYWxlbmRhci10b29sdGlwJztcclxuXHJcbiAgICAgICAgbGV0IGZvcm1hdCA9IHNjaGVkdWxlci5kYXRlLmRhdGVfdG9fc3RyKCclSDolaScpO1xyXG4gICAgICAgIHNjaGVkdWxlci50ZW1wbGF0ZXMudG9vbHRpcF90ZXh0ID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIGV2ZW50KTtcclxuICAgICAgICAgICAgbGV0IHRpdGxlO1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZXZUeXBlID09PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gJ9Cd0L7QstCw0Y8nO1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2V2ZW50X25ldyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZXZUeXBlID09PSAnMicpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gJ9CSINGA0LDQsdC+0YLQtSc7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbnRfd29ya2luZyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZXZUeXBlID09PSAnMycpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gJ9CS0YvQv9C+0LvQvdC10L3QsCc7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbnRfZG9uZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZXZUeXBlID09PSAnNCcpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gJ9Ce0YLQvNC10L3QtdC90LAnO1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2V2ZW50X2NhbmNlbGVkJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgZm9ybWF0KHN0YXJ0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX2hlYWRlciAke2NsYXNzTmFtZX1cIj4ke3RpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX2JvZHkgJHtjbGFzc05hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX3VzZXJcIj7QldC70LXQvdCwINCQ0LLQuNC70L7QstCwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX19zdGF0dXNcIj7QndC+0LLRi9C5PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImMtY2FsZW5kYXItdG9vbHRpcF9fcGhvbmVcIj4rNyAoOTI3KSAxMDctMTEtMzk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX3NlcnZpY2VcIj7QkNC/0L/QsNGA0LDRgtC90YvQuSDQvNCw0L3QuNC60Y7RgDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImMtY2FsZW5kYXItdG9vbHRpcF9fdGltZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2Zvcm1hdChzdGFydCl9IC0gJHtmb3JtYXQoZW5kKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX3ByaWNlXCI+ODAwIDxpIGNsYXNzPVwiZmFyIGZhLXJ1YmxlLXNpZ25cIj48L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX19tYXN0ZXJcIj7QnNCw0YHRgtC10YAg0J7Qu9GM0LPQsCDQmtCw0YDRj9C60LjQvdCwPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxlbmRhci5zaG93TWluaWNhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChzY2hlZHVsZXIuaXNDYWxlbmRhclZpc2libGUoKSkgc2NoZWR1bGVyLmRlc3Ryb3lDYWxlbmRhcigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NoZWR1bGVyLnJlbmRlckNhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZGh4X21pbmljYWxfaWNvbicsXHJcbiAgICAgICAgICAgICAgICBkYXRlOiBzY2hlZHVsZXIuX2RhdGUsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZGF0ZSwgY2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXIuc2V0Q3VycmVudFZpZXcoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyLmRlc3Ryb3lDYWxlbmRhcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIudGltZVN0ZXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgc3RlcCA9IDE1O1xyXG4gICAgICAgIGxldCBmb3JtYXQgPSBzY2hlZHVsZXIuZGF0ZS5kYXRlX3RvX3N0cignJUg6JWknKTtcclxuXHJcbiAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5ob3VyX3NpemVfcHggPSAoNjAgLyBzdGVwKSAqIDIyO1xyXG4gICAgICAgIHNjaGVkdWxlci50ZW1wbGF0ZXMuaG91cl9zY2FsZSA9IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2MCAvIHN0ZXA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdiBzdHlsZT0naGVpZ2h0OjIycHg7bGluZS1oZWlnaHQ6MjJweDsnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQoZGF0ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgZGF0ZSA9IHNjaGVkdWxlci5kYXRlLmFkZChkYXRlLCBzdGVwLCAnbWludXRlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuaGVpZ2h0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuICAgICAgICBsZXQgaGVhZGVySGVpZ2h0ID0gJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGxldCB0b3BMaW5lSGVpZ2h0ID0gJCgnLmNhbGVuZGFyX190b3AtbGluZScpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGxldCBtZW51SGVpZ2h0ID0gJCgnLmpzLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBsZXQgcmVzdWx0SGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgcmVzdWx0SGVpZ2h0ID0gaGVpZ2h0IC0gKGhlYWRlckhlaWdodCArIHRvcExpbmVIZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdEhlaWdodCA9IGhlaWdodCAtIChoZWFkZXJIZWlnaHQgKyB0b3BMaW5lSGVpZ2h0ICsgbWVudUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5jLWNhbGVuZGFyJykuY3NzKCdtaW4taGVpZ2h0JywgcmVzdWx0SGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuY3VzdG9uRXZlbnQgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuICAgIHJldHVybiBjYWxlbmRhcjtcclxufSkoalF1ZXJ5KTtcclxuXHJcbkNhbGVuZGFyLmluaXQoKTtcclxuXHJcbi8qXHJcbiAqKiogT3JkZXJcclxuICovXHJcbmNvbnN0IE9yZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IG9yZGVyID0ge307XHJcbiAgICBsZXQgJGh0bWwgPSAkKCdodG1sJyk7XHJcbiAgICBsZXQgJHRpbWVQaWNrZXIgPSAkKCcuanMtdGltZS1waWNrZXI6bm90KC5pcy1kaXNhYmxlZCknKTtcclxuICAgIGxldCAkcGF5Q2hlY2sgPSAkKCcuanMtcGF5LWNoZWNrJyk7XHJcbiAgICBsZXQgJHVzZXJDYXJ0QnRuID0gJCgnLnVzZXItY2FydF9fYnRuJyk7XHJcbiAgICBsZXQgJHVzZXJCb3R0b20gPSAkKCcudXNlci1jYXJ0X19ib3R0b20nKTtcclxuICAgIGxldCAkb3JkZXJUaXRsZSA9ICQoJy5qcy1vcmRlci10aXRsZScpO1xyXG4gICAgbGV0ICRvcmRlckRldGFpbCA9ICQoJy5qcy1vcmRlci1kZXRhaWwnKTtcclxuXHJcbiAgICBvcmRlci5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtU2VydmljZSgpO1xyXG4gICAgICAgIHRoaXMuY2hvb3NlTWFzdGVyKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDb250ZW50KCk7XHJcbiAgICAgICAgfSwgMTIwMCk7XHJcblxyXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZDbGljaygpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpeGVkQmxvY2soJCgnLmpzLWRheS1waWNrZXInKSk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBvcmRlci5jb25maXJtU2VydmljZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICR0aW1lUGlja2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkdGltZVBpY2tlci5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkcGF5Q2hlY2suYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAkdXNlckNhcnRCdG4ucmVtb3ZlQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAkdXNlckJvdHRvbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRodG1sLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAkb3JkZXJEZXRhaWwuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAkdXNlckJvdHRvbS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRvcmRlclRpdGxlLnRleHQoJ9Cf0L7QtNGC0LLQtdGA0LbQtNC10L3QuNC1INC30LDRj9Cy0LrQuCcpO1xyXG4gICAgICAgICAgICAkKCcudXNlci1jYXJ0X190b3AnKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9yZGVyLmZpeGVkQmxvY2sgPSBmdW5jdGlvbihmaXhlZEJsb2NrKSB7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGZpeGVkQmxvY2sub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgbGV0ICRjbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJjbG9uZVwiPicpO1xyXG4gICAgICAgICRjbG9uZS5pbnNlcnRBZnRlcihmaXhlZEJsb2NrKTtcclxuICAgICAgICAkY2xvbmUuY3NzKCdoZWlnaHQnLCBoZWlnaHQpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGZpeGVkQmxvY2tPZmZzZXQgPSBmaXhlZEJsb2NrLm9mZnNldCgpLnRvcCAtIDUwO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gZml4ZWRCbG9ja09mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5hZGRDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgICRjbG9uZS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsIDwgZml4ZWRCbG9ja09mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgZml4ZWRCbG9jay5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgICRjbG9uZS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3JkZXIucHJldkNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwcmV2QnRuID0gJCgnLmpzLXByZXYnKTtcclxuICAgICAgICBsZXQgJG9yZGVyRWRpdCA9ICQoJy5vcmRlci1kZXRhaWxfX2VkaXQnKTtcclxuXHJcbiAgICAgICAgJHByZXZCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRvcmRlckRldGFpbC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICR1c2VyQm90dG9tLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICRvcmRlclRpdGxlLnRleHQoJ9Ch0L7Qt9C00LDQvdC40LUg0LfQsNGP0LLQutC4Jyk7XHJcbiAgICAgICAgICAgICRwYXlDaGVjay5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRvcmRlckVkaXQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRvcmRlckRldGFpbC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICR1c2VyQm90dG9tLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XHJcbiAgICAgICAgICAgICRvcmRlclRpdGxlLnRleHQoJ9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LfQsNGP0LLQutC4Jyk7XHJcbiAgICAgICAgICAgICRwYXlDaGVjay5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIG9yZGVyLmNob29zZU1hc3RlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBtYXN0ZXJNb2RhbCA9ICQoJyNtYXN0ZXJQaWNrZXInKTtcclxuICAgICAgICBsZXQgbWFzdGVyID0gbWFzdGVyTW9kYWwuZmluZCgnaW5wdXQnKTtcclxuICAgICAgICBsZXQgbWFzdGVyQ2FuY2VsID0gbWFzdGVyTW9kYWwuZmluZCgnLmJ0bicpO1xyXG5cclxuICAgICAgICBtYXN0ZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG1hc3RlckNhbmNlbC50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3JkZXIuc2hvd0NvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgb3JkZXJMZWZ0VG9wID0gJCgnLm9yZGVyX19sZWZ0X3RvcCcpO1xyXG5cclxuICAgICAgICBvcmRlckxlZnRUb3AuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIG9yZGVyTGVmdFRvcC5zbGlkZURvd24oKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG9yZGVyO1xyXG59KSgpO1xyXG5cclxuT3JkZXIuaW5pdCgpO1xyXG5cclxuLypcclxuICoqKiBEYXRlUGlja2VyVmFuaXR5XHJcbiAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJGNhbGVuZGFyID0gJCgnLmpzLWRheS1waWNrZXInKTtcclxuICAgIGxldCBhY3RpdmVDbGFzcyA9ICdpcy1hY3RpdmUnO1xyXG4gICAgbGV0IGRpc2FibGVDbGFzcyA9ICdpcy1kaXNhYmxlZCc7XHJcbiAgICBsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgbW9udGhEYXlzID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xyXG5cclxuICAgIGxldCBtb250aHMgPSBbXHJcbiAgICAgICAgJ9Cv0L3QstCw0YDRjCcsXHJcbiAgICAgICAgJ9Ck0LXQstGA0LDQu9GMJyxcclxuICAgICAgICAn0JzQsNGA0YInLFxyXG4gICAgICAgICfQkNC/0YDQtdC70YwnLFxyXG4gICAgICAgICfQnNCw0LknLFxyXG4gICAgICAgICfQmNGO0L3RjCcsXHJcbiAgICAgICAgJ9CY0Y7Qu9GMJyxcclxuICAgICAgICAn0JDQstCz0YPRgdGCJyxcclxuICAgICAgICAn0KHQtdC90YLRj9Cx0YDRjCcsXHJcbiAgICAgICAgJ9Ce0LrRgtGP0LHRgNGMJyxcclxuICAgICAgICAn0J3QvtGP0LHRgNGMJyxcclxuICAgICAgICAn0JTQtdC60LDQsdGA0YwnXHJcbiAgICBdO1xyXG5cclxuICAgICRjYWxlbmRhci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHJlbmRlcihfdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCAkaXRlbSA9IF90aGlzLmZpbmQoJy5kYXktcGlja2VyX19pdGVtJyk7XHJcbiAgICAgICAgbGV0ICRhcnJvd1IgPSBfdGhpcy5maW5kKCcuZGF5LXBpY2tlcl9fYXJyb3ctLXJpZ2h0Jyk7XHJcbiAgICAgICAgbGV0ICRhcnJvd0wgPSBfdGhpcy5maW5kKCcuZGF5LXBpY2tlcl9fYXJyb3ctLWxlZnQnKTtcclxuXHJcbiAgICAgICAgJGl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoZGlzYWJsZUNsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgJGl0ZW0ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdG9kYXlXZWVrKF90aGlzKTtcclxuXHJcbiAgICAgICAgJGFycm93Ui5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgJGFycm93TC5yZW1vdmVDbGFzcyhkaXNhYmxlQ2xhc3MpO1xyXG4gICAgICAgICAgICBtb250aE5hbWVOZXh0KF90aGlzKTtcclxuICAgICAgICAgICAgbmV4dFdlZWsoX3RoaXMpO1xyXG4gICAgICAgICAgICB3ZWVrQ2hlY2soX3RoaXMsIGNvdW50ZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkYXJyb3dMLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoISRhcnJvd0wuaGFzQ2xhc3MoZGlzYWJsZUNsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlci0tO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vbnRoTmFtZVByZXYoX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgcHJldldlZWsoX3RoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJsb2NrQXJyb3coX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgd2Vla0NoZWNrKF90aGlzLCBjb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyKGVsKSB7XHJcbiAgICAgICAgZWwuYWRkQ2xhc3MoJ2RheS1waWNrZXInKTtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cImRheS1waWNrZXJfX3RvcFwiPlxyXG5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fbW9udGhcIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX3llYXJcIj48L3NwYW4+LFxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fd2Vla1wiPjwvc3Bhbj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXktcGlja2VyX19ib3R0b21cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5LXBpY2tlcl9fY2Fyb3VzZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRheS1waWNrZXJfX2Fycm93IGRheS1waWNrZXJfX2Fycm93LS1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhbCBmYS1hbmdsZS1sZWZ0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRheS1waWNrZXJfX2xpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCf0L08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCS0YI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCh0YA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCn0YI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCf0YI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCh0LE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCS0YE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXktcGlja2VyX19hcnJvdyBkYXktcGlja2VyX19hcnJvdy0tcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFsIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgIGVsLmh0bWwoaHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9kYXlXZWVrKGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCAkbW9udGggPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fbW9udGgnKTtcclxuICAgICAgICBsZXQgJHllYXIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9feWVhcicpO1xyXG4gICAgICAgIGxldCAkd2Vla0Rlc2MgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fd2VlaycpO1xyXG4gICAgICAgIGxldCAkYXJyb3dMID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2Fycm93LS1sZWZ0Jyk7XHJcbiAgICAgICAgbGV0IG5vd1dlZWtEYXlOdW0gPSBuZXdEYXRlLmdldERheSgpIC0gMTtcclxuICAgICAgICBsZXQgbm93TW9udGhEYXkgPSBuZXdEYXRlLmdldERhdGUoKTtcclxuICAgICAgICBsZXQgbm93TW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgbGV0IG5vd1llYXIgPSBuZXdEYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgbGV0IHdlZWtEYXkgPSB3ZWVrRGF5QXJyLmVxKG5vd1dlZWtEYXlOdW0pO1xyXG5cclxuICAgICAgICAkYXJyb3dMLmFkZENsYXNzKGRpc2FibGVDbGFzcyk7XHJcbiAgICAgICAgJHdlZWtEZXNjLnRleHQoJ9GN0YLQsCDQvdC10LTQtdC70Y8nKTtcclxuICAgICAgICAkbW9udGgudGV4dChtb250aHNbbm93TW9udGhdKTtcclxuICAgICAgICAkeWVhci50ZXh0KG5vd1llYXIpO1xyXG4gICAgICAgIHdlZWtEYXkudGV4dChub3dNb250aERheSk7XHJcbiAgICAgICAgd2Vla0RheS5jbG9zZXN0KCcuZGF5LXBpY2tlcl9faXRlbScpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgaW5zZXJ0TGVmdFNpZGUoZWwpO1xyXG4gICAgICAgIGluc2VydFJpZ2h0U2lkZShlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbmV4dFdlZWsoZWwpIHtcclxuICAgICAgICBsZXQgd2Vla0RheUFyciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19kYXlfbnVtJyk7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlMYXN0ID0gcGFyc2VJbnQod2Vla0RheUFyci5lcSg2KS50ZXh0KCkpICsgMTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KHdlZWtEYXlMYXN0KyspO1xyXG5cclxuICAgICAgICAgICAgd2Vla0RheUFyclxyXG4gICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmRheS1waWNrZXJfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGRpc2FibGVDbGFzcyk7XHJcbiAgICAgICAgICAgIHdlZWtEYXlBcnJcclxuICAgICAgICAgICAgICAgIC5lcShpKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5kYXktcGlja2VyX19pdGVtJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAod2Vla0RheUFyci5lcShpKS50ZXh0KCkgPiBtb250aERheXNbbW9udGhOdW0oZWwpXSkge1xyXG4gICAgICAgICAgICAgICAgd2Vla0RheUxhc3QgPSAxO1xyXG4gICAgICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KHdlZWtEYXlMYXN0KyspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZXZXZWVrKGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCB3ZWVrRGF5Rmlyc3QgPSBwYXJzZUludCh3ZWVrRGF5QXJyLmVxKDApLnRleHQoKSkgLSAxO1xyXG4gICAgICAgIGxldCBtb250aFByZXYgPSBtb250aE51bShlbCkgLSAxO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gNjsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KHdlZWtEYXlGaXJzdC0tKTtcclxuICAgICAgICAgICAgd2Vla0RheUFyclxyXG4gICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmRheS1waWNrZXJfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGRpc2FibGVDbGFzcyk7XHJcbiAgICAgICAgICAgIHdlZWtEYXlBcnJcclxuICAgICAgICAgICAgICAgIC5lcShpKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5kYXktcGlja2VyX19pdGVtJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAod2Vla0RheUFyci5lcShpKS50ZXh0KCkgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9udGhQcmV2IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoUHJldiA9IDExO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdlZWtEYXlGaXJzdCA9IG1vbnRoRGF5c1ttb250aFByZXZdO1xyXG4gICAgICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KHdlZWtEYXlGaXJzdC0tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnNlcnRMZWZ0U2lkZShlbCkge1xyXG4gICAgICAgIGxldCB3ZWVrRGF5QXJyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2RheV9udW0nKTtcclxuICAgICAgICBsZXQgcHJldk1vbnRoRGF5ID0gbmV3RGF0ZS5nZXREYXRlKCkgLSAxO1xyXG4gICAgICAgIGxldCBwcmV2V2Vla0RheSA9IG5ld0RhdGUuZ2V0RGF5KCkgLSAyO1xyXG4gICAgICAgIGxldCBub3dNb250aCA9IG5ld0RhdGUuZ2V0TW9udGgoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IHByZXZXZWVrRGF5OyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQocHJldk1vbnRoRGF5LS0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdlZWtEYXlBcnIuZXEoaSkudGV4dCgpIDwgMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub3dNb250aCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBub3dNb250aCA9IDExO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2TW9udGhEYXkgPSBtb250aERheXNbbm93TW9udGggLSAxXTtcclxuICAgICAgICAgICAgICAgIHdlZWtEYXlBcnIuZXEoaSkudGV4dChwcmV2TW9udGhEYXktLSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2Vla0RheUFyclxyXG4gICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmRheS1waWNrZXJfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGRpc2FibGVDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluc2VydFJpZ2h0U2lkZShlbCkge1xyXG4gICAgICAgIGxldCB3ZWVrRGF5QXJyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2RheV9udW0nKTtcclxuICAgICAgICBsZXQgbm93V2Vla0RheU51bSA9IG5ld0RhdGUuZ2V0RGF5KCkgLSAxO1xyXG4gICAgICAgIGxldCBub3dNb250aERheSA9IG5ld0RhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGxldCBub3dNb250aCA9IG5ld0RhdGUuZ2V0TW9udGgoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IG5vd1dlZWtEYXlOdW07IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KG5vd01vbnRoRGF5KyspO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdlZWtEYXlBcnIuZXEoaSkudGV4dCgpID4gbW9udGhEYXlzW25vd01vbnRoXSkge1xyXG4gICAgICAgICAgICAgICAgbm93TW9udGhEYXkgPSAxO1xyXG4gICAgICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KG5vd01vbnRoRGF5KyspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vbnRoTnVtKGVsKSB7XHJcbiAgICAgICAgbGV0IHRoaXNNb250aCA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19tb250aCcpO1xyXG4gICAgICAgIGxldCB0aGlzTW9udGhOdW0gPSAnJztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb250aHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1vbnRoc1tpXSA9PSB0aGlzTW9udGgudGV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzTW9udGhOdW0gPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpc01vbnRoTnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb250aE5hbWVOZXh0KGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCB0aGlzTW9udGggPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fbW9udGgnKTtcclxuICAgICAgICBsZXQgJHllYXIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9feWVhcicpO1xyXG4gICAgICAgIGxldCB5ZWFyTnVtID0gcGFyc2VJbnQoJHllYXIudGV4dCgpKTtcclxuICAgICAgICBsZXQgdGhpc01vbnRoTnVtID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2Vla0RheUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAod2Vla0RheUFyci5lcShpKS50ZXh0KCkgPT0gbW9udGhEYXlzW21vbnRoTnVtKGVsKV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXNNb250aE51bSA9IG1vbnRoTnVtKGVsKSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNNb250aE51bSA+IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc01vbnRoTnVtID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzTW9udGgudGV4dChtb250aHNbdGhpc01vbnRoTnVtXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHRoaXNNb250aC50ZXh0KCkgPT0gJ9Cv0L3QstCw0YDRjCcgJiZcclxuICAgICAgICAgICAgICAgIHdlZWtEYXlBcnIuZXEoaSkudGV4dCgpID09IG1vbnRoRGF5c1ttb250aE51bShlbCldXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgJHllYXIudGV4dCh5ZWFyTnVtICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9udGhOYW1lUHJldihlbCkge1xyXG4gICAgICAgIGxldCB3ZWVrRGF5QXJyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2RheV9udW0nKTtcclxuICAgICAgICBsZXQgdGhpc01vbnRoID0gZWwuZmluZCgnLmRheS1waWNrZXJfX21vbnRoJyk7XHJcbiAgICAgICAgbGV0ICR5ZWFyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX3llYXInKTtcclxuICAgICAgICBsZXQgeWVhck51bSA9IHBhcnNlSW50KCR5ZWFyLnRleHQoKSk7XHJcbiAgICAgICAgbGV0IHRoaXNNb250aE51bSA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdlZWtEYXlBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHdlZWtEYXlBcnIuZXEoaSkudGV4dCgpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNNb250aE51bSA9IG1vbnRoTnVtKGVsKSAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNNb250aE51bSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGhOdW0gPSAxMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzTW9udGgudGV4dChtb250aHNbdGhpc01vbnRoTnVtXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzTW9udGgudGV4dCgpID09ICfQlNC10LrQsNCx0YDRjCcgJiYgd2Vla0RheUFyci5lcShpKS50ZXh0KCkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgJHllYXIudGV4dCh5ZWFyTnVtIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYmxvY2tBcnJvdyhlbCkge1xyXG4gICAgICAgIGxldCB3ZWVrRGF5QXJyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2RheV9udW0nKTtcclxuICAgICAgICBsZXQgdGhpc01vbnRoID0gZWwuZmluZCgnLmRheS1waWNrZXJfX21vbnRoJyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2Vla0RheUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQoKSA9PSBuZXdEYXRlLmdldERhdGUoKSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpc01vbnRoLnRleHQoKSA9PSBtb250aHNbbmV3RGF0ZS5nZXRNb250aCgpXVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRvZGF5V2VlayhlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2Vla0NoZWNrKGVsLCBjb3VudGVyKSB7XHJcbiAgICAgICAgbGV0ICR3ZWVrRGVzYyA9IGVsLmZpbmQoJy5kYXktcGlja2VyX193ZWVrJyk7XHJcblxyXG4gICAgICAgIGlmIChjb3VudGVyID09IDEpIHtcclxuICAgICAgICAgICAgJHdlZWtEZXNjLnRleHQoJ9GB0LvQtdC00YPRjtGJ0LDRjyDQvdC10LTQtdC70Y8nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPiAxICYmIGNvdW50ZXIgPD0gNCkge1xyXG4gICAgICAgICAgICAkd2Vla0Rlc2MudGV4dCgn0YfQtdGA0LXQtyAnICsgY291bnRlciArICcg0L3QtdC00LXQu9C4Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb3VudGVyID4gNCkge1xyXG4gICAgICAgICAgICAkd2Vla0Rlc2MudGV4dCgn0YfQtdGA0LXQtyAnICsgY291bnRlciArICcg0L3QtdC00LXQu9GMJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuIl19
