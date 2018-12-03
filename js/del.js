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
    var $appNote = $('.js-app-note');
    var $userCartBtn = $('.user-cart__btn');
    var $userBottom = $('.user-cart__bottom');
    var $orderTitle = $('.js-order-title');
    var $orderDetail = $('.js-service-list');
    var activeClass = 'is-active';
    var hiddenClass = 'is-hidden';

    order.init = function () {
        var _this2 = this;

        this.confirmApp();
        this.chooseMaster();

        setTimeout(function () {
            _this2.showContent();
        }, 800);

        if ($(window).width() < 768) {
            this.prevClick();
            this.confirmAppMobile();

            setTimeout(function () {
                _this2.fixedBlock($('.js-day-picker'));
            }, 500);
        }
    };

    order.confirmApp = function () {
        $timePicker.on('click', function () {
            //time choosing
            $timePicker.removeClass(activeClass);
            $(this).addClass(activeClass);

            // shows date and time of order (desktop)
            $('.user-cart__top').addClass(activeClass);

            // shows confirm button
            $appNote.addClass(hiddenClass);
            $userCartBtn.addClass(activeClass);
        });
    };

    order.confirmAppMobile = function () {
        $timePicker.on('click', function () {
            // order details opening
            $orderDetail.addClass(activeClass);
            // rewritting order title
            $orderTitle.text('Подтверждение заявки');
            $html.addClass('is-fixed');

            // shows confirm button
            $userBottom.addClass(activeClass);
        });
    };

    // set fixed block at the top of a page
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
        var $orderEdit = $('.service-list__edit');

        // click on the prev btn
        $prevBtn.on('click', function () {
            $orderDetail.removeClass(activeClass);
            $userBottom.removeClass(activeClass);
            $html.removeClass('is-fixed');
            $orderTitle.text('Создание заявки');
        });

        // click on the edit btn
        $orderEdit.on('click', function () {
            $orderDetail.removeClass(activeClass);
            $userBottom.removeClass(activeClass);
            $html.removeClass('is-fixed');
            $orderTitle.text('Редактирование заявки');
        });
    };

    // master choosing
    order.chooseMaster = function () {
        var masterModal = $('#masterPicker');
        var masterCheck = masterModal.find('input');
        var masterCancel = masterModal.find('.btn');

        masterCheck.each(function () {
            $(this).on('click', function () {
                masterCancel.trigger('click');
            });
        });
    };

    // content appearing
    order.showContent = function () {
        var orderLeftTop = $('.order__left_top');

        orderLeftTop.addClass(activeClass);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbC5qcyJdLCJuYW1lcyI6WyIkIiwibGVuZ3RoIiwic2xpZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJkYXRhIiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJ0ZXh0IiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJvbiIsInZhbHVlcyIsImhhbmRsZSIsInJlbW92ZUNsYXNzIiwicmVtb3ZlQXR0ciIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiX3RoaXMiLCJhZGQiLCJmaW5kIiwiZG9uZSIsImRlbCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJjc3MiLCJ0b2dnbGVDbGFzcyIsInBhcmVudCIsInBob25lQ29uZmlybVRpbWVyIiwidGltZXIiLCJjb25zb2xlIiwibG9nIiwidGltIiwic2V0VGltZW91dCIsInQiLCJpbnQiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0YXJlYSIsImF1dG9zaXplIiwiY3RybEtleSIsIm1ldGFLZXkiLCJrZXlDb2RlIiwidmFsdWUiLCJwYXJlbnROb2RlIiwic3VibWl0IiwicHJldmVudERlZmF1bHQiLCJlbCIsImNoYXRCb2R5IiwiY2hhdEZvb3RlckhlaWdodCIsIm91dGVySGVpZ2h0Iiwic3R5bGUiLCJjc3NUZXh0Iiwic2Nyb2xsSGVpZ2h0IiwiYm90dG9tIiwib3ZlcmZsb3ciLCJ0aXRsZSIsIm1vZGFsIiwic2VhcmNoSW5wdXQiLCJoaW50IiwidmFsIiwid2luZG93Iiwid2lkdGgiLCIkcGFycmVudCIsImVuZCIsInNvcnRhYmxlIiwiY29ubmVjdFdpdGgiLCJjdXJzb3IiLCJ0b2xlcmFuY2UiLCJ1aSIsIml0ZW0iLCJzdG9wIiwiQ3JtIiwicmVxdWVzdCIsIndpZ2V0UmVwbGFjZUljb24iLCJkaXNhYmxlU2VsZWN0aW9uIiwidG9nZ2xlQ29udHJvbCIsIiRkb2N1bWVudCIsIiRwYXJlbnQiLCIkd2lkZ2V0TGVmdCIsIiR3aWRnZXRSaWdodCIsIiR0aXRsZUxlZnQiLCIkdGl0bGVSaWdodCIsInJlbW92ZSIsImluaXQiLCJteU1hcCIsInltYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsImJlaGF2aW9ycyIsImRpc2FibGUiLCJjb250cm9scyIsIm15UGluIiwiR2VvT2JqZWN0Q29sbGVjdGlvbiIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkltYWdlU2l6ZSIsImljb25JbWFnZU9mZnNldCIsIm15UGxhY2VtYXJrIiwiUGxhY2VtYXJrIiwiYmFsbG9vbkNvbnRlbnRIZWFkZXIiLCJiYWxsb29uQ29udGVudEJvZHkiLCJoaW50Q29udGVudCIsImdlb09iamVjdHMiLCJyZWFkeSIsImV2ZW50cyIsInNpbXBsZXNsaWRlciIsIiRkYXRlcGlja2VyIiwiZGF0ZVRvZGF5IiwiRGF0ZSIsImVhY2giLCIkYnRuVG9kYXkiLCIkYnRuUHJldiIsIiRidG5OZXh0IiwidHlwZSIsImF0dHIiLCJfc2VsZiIsImNoYW5nZVZhbCIsImRhdGVwaWNrZXIiLCJhdXRvQ2xvc2UiLCJtaW5EYXRlIiwib25TZWxlY3QiLCJmb3JtYXR0ZWREYXRlIiwic2VsZWN0RGF0ZSIsInNob3dXZWVrIiwiZGF0ZSIsImluc3QiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiY3VycmVudERhdGUiLCJnZXREYXRlIiwiY3VycmVudE1vbnRoIiwiZ2V0TW9udGgiLCJnZXRGdWxsWWVhciIsImdldERheSIsImRhdGVGb3JtYXQiLCJzZXRJbnB1dERhdGUiLCJwcmV2Iiwic2hvdyIsImZvY3VzIiwidXBkYXRlRGF0YVNjaGVkdWxlIiwiY3JtU2NoZWR1bGVJbnB1dENhbGVuZGFyVG9wIiwicnVEYXRlcyIsImdldFdlZWtTY2hlZHVsZSIsInVwZGF0ZVZhbFNjaGVkdWxlIiwidG9nZ2xlU2VsZWN0ZWQiLCJkYXRlUGlja2VySW5saW5lIiwiZXZlbnREYXRlcyIsImlubGluZSIsIm11bHRpcGxlRGF0ZXMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsImluZGV4T2YiLCJjbGFzc2VzIiwiY3JtU2NoZWR1bGVEYXRlRmllbGRUb3AiLCJnZXQiLCJjdXJyIiwiY3VyckRheSIsImN1cnJNb250aCIsIm1vbmRheSIsInN1bmRheSIsImdldFJpZ2h0V2Vla1RleHQiLCJjdXJyRGF0ZSIsIm1vbnRoIiwiZmlyc3REYXkiLCJsYXN0RGF5IiwicGFyYW1zIiwib0RheUYiLCJvRGF5TCIsIm9Nb250aEYiLCJvTW9udGhMIiwib1llYXJGIiwib1llYXJMIiwiYXJyRGF0YSIsIkZvcm1EYXRhIiwidGVtcCIsIm5ld01vbnRoIiwic2V0RGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwicmVwbGFjZSIsImFwcGVuZCIsIkNhbGVuZGFyIiwiJGNhbGVuZGFyIiwiY2FsZW5kYXIiLCJoZWlnaHRzIiwidGltZVN0ZXAiLCJhcnJFbXBsb3llZXMiLCJhdmF0YXIiLCJuYW1lIiwibWFwIiwiaSIsInB1c2giLCJrZXkiLCJsYWJlbCIsInNjaGVkdWxlciIsInh5Iiwic2NhbGVfaGVpZ2h0IiwibmF2X2hlaWdodCIsImNvbmZpZyIsIm11bHRpX2RheSIsInhtbF9kYXRlIiwidG9vbHRpcCIsIm1hcmtfbm93IiwibG9jYWxlIiwibGFiZWxzIiwidW5pdF90YWIiLCJzZWN0aW9uX2N1c3RvbSIsImZpcnN0X2hvdXIiLCJsaW1pdF90aW1lX3NlbGVjdCIsImRldGFpbHNfb25fY3JlYXRlIiwiY3JlYXRlVW5pdHNWaWV3IiwicHJvcGVydHkiLCJsaXN0IiwiYWRkTWFya2VkVGltZXNwYW4iLCJzdGFydF9kYXRlIiwiZW5kX2RhdGUiLCJzZWN0aW9ucyIsInRpbWVsaW5lIiwidW5pdCIsInN0YXR1c0luaXQiLCJ0ZW1wbGF0ZXMiLCJldmVudF9jbGFzcyIsImV2ZW50IiwiZXZUeXBlIiwiZ2V0TGFiZWwiLCJ0b0xvd2VyQ2FzZSIsImFycmF5Iiwic2VjdGlvbl9ldlR5cGUiLCJsaWdodGJveCIsImhlaWdodCIsIm9wdGlvbnMiLCJtYXBfdG8iLCJkaHRtbFhUb29sdGlwIiwiY2xhc3NOYW1lIiwiZm9ybWF0IiwiZGF0ZV90b19zdHIiLCJ0b29sdGlwX3RleHQiLCJzaG93TWluaWNhbCIsImlzQ2FsZW5kYXJWaXNpYmxlIiwiZGVzdHJveUNhbGVuZGFyIiwicmVuZGVyQ2FsZW5kYXIiLCJwb3NpdGlvbiIsIl9kYXRlIiwibmF2aWdhdGlvbiIsImhhbmRsZXIiLCJzZXRDdXJyZW50VmlldyIsInN0ZXAiLCJob3VyX3NpemVfcHgiLCJob3VyX3NjYWxlIiwiaHRtbCIsImhlYWRlckhlaWdodCIsInRvcExpbmVIZWlnaHQiLCJtZW51SGVpZ2h0IiwicmVzdWx0SGVpZ2h0IiwiY3VzdG9uRXZlbnQiLCJqUXVlcnkiLCJPcmRlciIsIm9yZGVyIiwiJGh0bWwiLCIkdGltZVBpY2tlciIsIiRhcHBOb3RlIiwiJHVzZXJDYXJ0QnRuIiwiJHVzZXJCb3R0b20iLCIkb3JkZXJUaXRsZSIsIiRvcmRlckRldGFpbCIsImFjdGl2ZUNsYXNzIiwiaGlkZGVuQ2xhc3MiLCJjb25maXJtQXBwIiwiY2hvb3NlTWFzdGVyIiwic2hvd0NvbnRlbnQiLCJwcmV2Q2xpY2siLCJjb25maXJtQXBwTW9iaWxlIiwiZml4ZWRCbG9jayIsIiRjbG9uZSIsImluc2VydEFmdGVyIiwiaGlkZSIsImZpeGVkQmxvY2tPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJzY3JvbGwiLCJzY3JvbGxUb3AiLCIkcHJldkJ0biIsIiRvcmRlckVkaXQiLCJtYXN0ZXJNb2RhbCIsIm1hc3RlckNoZWNrIiwibWFzdGVyQ2FuY2VsIiwidHJpZ2dlciIsIm9yZGVyTGVmdFRvcCIsImRpc2FibGVDbGFzcyIsIm5ld0RhdGUiLCJtb250aERheXMiLCJtb250aHMiLCJjb3VudGVyIiwicmVuZGVyIiwiJGl0ZW0iLCIkYXJyb3dSIiwiJGFycm93TCIsInN0b3BQcm9wYWdhdGlvbiIsInRvZGF5V2VlayIsIm1vbnRoTmFtZU5leHQiLCJuZXh0V2VlayIsIndlZWtDaGVjayIsIm1vbnRoTmFtZVByZXYiLCJwcmV2V2VlayIsImJsb2NrQXJyb3ciLCJ3ZWVrRGF5QXJyIiwiJG1vbnRoIiwiJHllYXIiLCIkd2Vla0Rlc2MiLCJub3dXZWVrRGF5TnVtIiwibm93TW9udGhEYXkiLCJub3dNb250aCIsIm5vd1llYXIiLCJ3ZWVrRGF5IiwiZXEiLCJpbnNlcnRMZWZ0U2lkZSIsImluc2VydFJpZ2h0U2lkZSIsIndlZWtEYXlMYXN0IiwibW9udGhOdW0iLCJ3ZWVrRGF5Rmlyc3QiLCJtb250aFByZXYiLCJwcmV2TW9udGhEYXkiLCJwcmV2V2Vla0RheSIsInRoaXNNb250aCIsInRoaXNNb250aE51bSIsInllYXJOdW0iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsRUFBRSw2QkFBRixFQUFpQ0MsTUFBckMsRUFBNkM7QUFDekMsUUFBSUMsU0FBU0MsU0FBU0MsY0FBVCxDQUF3QiwwQkFBeEIsQ0FBYjtBQUNBLFFBQUlDLGdCQUFnQkwsRUFBRSwyQkFBRixFQUErQk0sSUFBL0IsQ0FBb0MsT0FBcEMsQ0FBcEI7QUFDQSxRQUFJQyxjQUFjUCxFQUFFLDJCQUFGLEVBQStCTSxJQUEvQixDQUFvQyxLQUFwQyxDQUFsQjtBQUNBLFFBQUlFLFFBQVEsQ0FBQ1IsRUFBRSxlQUFGLENBQUQsRUFBcUJBLEVBQUUsYUFBRixDQUFyQixDQUFaO0FBQ0EsUUFBSVMsVUFBSjtBQUNBLFFBQUlDLFFBQUo7QUFDQSxRQUFJQyxTQUFKO0FBQ0EsUUFBSUMsSUFBSjs7QUFFQSxRQUFJSixNQUFNLENBQU4sRUFBU0ssSUFBVCxNQUFtQixFQUF2QixFQUEyQjtBQUN2QkoscUJBQWFKLGFBQWI7QUFDSCxLQUZELE1BRU87QUFDSEkscUJBQWFLLFNBQVNOLE1BQU0sQ0FBTixFQUFTSyxJQUFULEVBQVQsQ0FBYjtBQUNIOztBQUVELFFBQUlMLE1BQU0sQ0FBTixFQUFTSyxJQUFULE1BQW1CLEVBQXZCLEVBQTJCO0FBQ3ZCSCxtQkFBV0gsV0FBWDtBQUNILEtBRkQsTUFF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QUlnQixZQUFZdFEsR0FBRzNCLElBQUgsQ0FBUSxtQkFBUixDQUFoQjs7QUFFQSxZQUFJaVIsV0FBVyxDQUFmLEVBQWtCO0FBQ2RnQixzQkFBVXBULElBQVYsQ0FBZSxrQkFBZjtBQUNILFNBRkQsTUFFTyxJQUFJb1MsVUFBVSxDQUFWLElBQWVBLFdBQVcsQ0FBOUIsRUFBaUM7QUFDcENnQixzQkFBVXBULElBQVYsQ0FBZSxXQUFXb1MsT0FBWCxHQUFxQixTQUFwQztBQUNILFNBRk0sTUFFQSxJQUFJQSxVQUFVLENBQWQsRUFBaUI7QUFDcEJnQixzQkFBVXBULElBQVYsQ0FBZSxXQUFXb1MsT0FBWCxHQUFxQixTQUFwQztBQUNIO0FBQ0o7QUFDSixDQXZVRCIsImZpbGUiOiJkZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoJCgnLmNhdGFsb2ctZmlsdGVyX19pdGVtX3ByaWNlJykubGVuZ3RoKSB7XG4gICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKTtcbiAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xuICAgIHZhciBhbGxQcmljZUVuZCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdlbmQnKTtcbiAgICB2YXIgc3BhbnMgPSBbJCgnI2pzUHJpY2VTdGFydCcpLCAkKCcjanNQcmljZUVuZCcpXTtcbiAgICB2YXIgc3RhcnRQcmljZTtcbiAgICB2YXIgZW5kUHJpY2U7XG4gICAgdmFyIGFyclBhcmFtcztcbiAgICB2YXIgc1VybDtcblxuICAgIGlmIChzcGFuc1swXS50ZXh0KCkgPT0gJycpIHtcbiAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzBdLnRleHQoKSk7XG4gICAgfVxuXG4gICAgaWYgKHNwYW5zWzFdLnRleHQoKSA9PSAnJykge1xuICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVuZFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMV0udGV4dCgpKTtcbiAgICB9XG5cbiAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcbiAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXG4gICAgICAgIGNvbm5lY3Q6IHRydWUsXG4gICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICBtaW46IGFsbFByaWNlU3RhcnQsXG4gICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcbiAgICAgICAgc3BhbnNbaGFuZGxlXS50ZXh0KHBhcnNlSW50KHZhbHVlc1toYW5kbGVdKSk7XG4gICAgfSk7XG59XG5cbiQoJy5qcy1jYXRhbG9nLWZpbHRlci0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAkKCcuY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICQoJ2h0bWwnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbiQoJy5qcy1jYXJkLXNlcnZpY2VzLWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKFxuICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxuICAgICAgICAgICAgJy5jYXJkLXNlcnZpY2VzLWl0ZW1fX21pZGRsZSwgLmNhcmQtc2VydmljZXMtaXRlbV9faW5mby1ibG9jaywgLmNhcmQtc2VydmljZXMtaXRlbV9fYm90dG9tJ1xuICAgICAgICApLmxlbmd0aFxuICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGFkZCA9IF90aGlzLmZpbmQoJy5jYXJkLXNlcnZpY2VzLWl0ZW1fX2FjdGlvbl9hZGQnKTtcbiAgICAgICAgdmFyIGRvbmUgPSBfdGhpcy5maW5kKCcuY2FyZC1zZXJ2aWNlcy1pdGVtX19hY3Rpb25fZG9uZScpO1xuICAgICAgICB2YXIgZGVsID0gX3RoaXMuZmluZCgnLmNhcmQtc2VydmljZXMtaXRlbV9fYWN0aW9uX2RlbCcpO1xuXG4gICAgICAgIGlmIChfdGhpcy5oYXNDbGFzcygnaXMtYm9va2VkJykpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1ib29rZWQnKTtcbiAgICAgICAgICAgIGFkZC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgZG9uZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuYWRkQ2xhc3MoJ2lzLWJvb2tlZCcpO1xuICAgICAgICAgICAgYWRkLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICBkb25lLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8vRmF2b3JpdGUgYnRuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJ0bi1mYXYnLCBmdW5jdGlvbihlKSB7XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG4vL0NvbmZpcm0gcGhvbmVcbiQoJy5qcy10aW1lci0tcmVwZWF0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICQodGhpcylcbiAgICAgICAgLnBhcmVudCgnLnBob25lLWNvbmZpcm1fX3JlcGVhdCcpXG4gICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXG4gICAgICAgIC5jbG9zZXN0KCcuanMtY29uZmlybScpXG4gICAgICAgIC5maW5kKCcuY29uZmlybV9fdGltZXIsIC5jb25maXJtX19maWVsZCcpXG4gICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIHBob25lQ29uZmlybVRpbWVyKCk7XG59KTtcblxuZnVuY3Rpb24gcGhvbmVDb25maXJtVGltZXIoKSB7XG4gICAgdmFyIHRpbWVyID0gJCgnLmpzLXRpbWVyJyk7XG4gICAgY29uc29sZS5sb2codGltZXIuZGF0YSgndGltZXInKSk7XG4gICAgdmFyIHRpbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHQgPSB0aW1lci5kYXRhKCd0aW1lcicpO1xuICAgICAgICAgICAgdGltZXIudGV4dCh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHQpO1xuICAgICAgICAgICAgdmFyIGludCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHQtLTtcbiAgICAgICAgICAgICAgICBpZiAodCA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVyLnBhcmVudCgpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy10aW1lci0tcmVwZWF0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoJy5waG9uZS1jb25maXJtX19yZXBlYXQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZXIudGV4dCh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICQoJy5qcy10aW1lci0tcmVwZWF0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50KTtcbiAgICAgICAgICAgICAgICB0aW0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRpbSgpO1xufVxuXG4vL1RleHRhcmVhIGF1dG9IZWlnaHRcbmlmICgkKCcuanMtdGV4dGFyZWEnKS5sZW5ndGgpIHtcbiAgICB2YXIgdGV4dGFyZWEgPSAkKCcuanMtdGV4dGFyZWEnKTtcbiAgICB0ZXh0YXJlYS5vbigna2V5ZG93bicsIGF1dG9zaXplKTtcblxuICAgIHRleHRhcmVhLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkgJiZcbiAgICAgICAgICAgIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMTApXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGV4dGFyZWEudmFsdWUgKz0gJ1xcclxcbic7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDEwKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuc3VibWl0KCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYXV0b3NpemUoKSB7XG4gICAgbGV0IGVsID0gdGhpcztcbiAgICBsZXQgY2hhdEJvZHkgPSAkKCcuY2hhdF9fYm9keScpO1xuICAgIGxldCBjaGF0Rm9vdGVySGVpZ2h0ID0gJCgnLmNoYXRfX2Zvb3RlcicpLm91dGVySGVpZ2h0KCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6MzdweCc7XG4gICAgICAgIGVsLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xuICAgICAgICBjaGF0Qm9keS5jc3Moe1xuICAgICAgICAgICAgYm90dG9tOiAzOSArIGVsLnNjcm9sbEhlaWdodCArICdweCdcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPj0gMTIzKSB7XG4gICAgICAgICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICAgICAgICAgIGNoYXRCb2R5LmNzcyh7XG4gICAgICAgICAgICAgICAgYm90dG9tOiBjaGF0Rm9vdGVySGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCAwKTtcbn1cblxuJCgnLmpzLWRpc2FibGUtY2F0ZWdvcnknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGl0bGUgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xuICAgICAgICAkKCcjZGlzYWJsZS1jYXRlZ29yeScpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICQoJy5kaXNhYmxlLWNhdGVnb3J5X19kYXRhLXRpdGxlJykudGV4dCh0aXRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgIH1cbn0pO1xuXG4vL1NlYXJjaCBIaW50XG5pZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCkge1xuICAgIHZhciBzZWFyY2hJbnB1dCA9ICQoJy5qcy1zZWFyY2gtaW5wdXQnKTtcbiAgICBzZWFyY2hJbnB1dFxuICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmpzLXNlYXJjaCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgaGludC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaW50LmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcbiAgICAgICAgICAgICAgICAuZmluZCgnLnNlYXJjaF9faGludCcpO1xuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhpbnQgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XG5cbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufVxuXG4vL0NybS5hcGxpY2F0aW9uLmNoYW5nZVNydmljZVxuJChkb2N1bWVudCkub24oJ3NlbGVjdDI6c2VsZWN0JywgJy5qcy1zZWxlY3QtLXNlcnZpY2VzJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0ICRwYXJyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYXBsaWNhdGlvbi1pdGVtJyk7XG4gICAgJHBhcnJlbnRcbiAgICAgICAgLmZpbmQoJy5qcy1hcGxpY2F0aW9uLWl0ZW0tc2VydmljZScpXG4gICAgICAgIC5maW5kKCcuYmItaW5wdXRfX3dyYXAnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS0tZWRpdCcpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnaXMtaGlkZGVuJyk7XG59KTtcblxuLy9Dcm0ucmVxdWVzdCBzb3J0YWJsZVxuJCgnLmpzLXNvcnRhYmxlJylcbiAgICAuc29ydGFibGUoe1xuICAgICAgICBjb25uZWN0V2l0aDogJy5qcy1zb3J0YWJsZScsXG4gICAgICAgIGN1cnNvcjogJ21vdmUnLFxuICAgICAgICB0b2xlcmFuY2U6ICdwb2ludGVyJyxcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKGUsIHVpKSB7XG4gICAgICAgICAgICB1aS5pdGVtLmFkZENsYXNzKCdkcmFnLXNvcnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcDogZnVuY3Rpb24oZSwgdWkpIHtcbiAgICAgICAgICAgIHVpLml0ZW0ucmVtb3ZlQ2xhc3MoJ2RyYWctc29ydCcpO1xuICAgICAgICAgICAgdWkuaXRlbS5yZW1vdmVDbGFzcygncmVxdWVzdC1pdGVtLS1uZXcnKTtcbiAgICAgICAgICAgIENybS5yZXF1ZXN0LndpZ2V0UmVwbGFjZUljb24odWkuaXRlbSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC5kaXNhYmxlU2VsZWN0aW9uKCk7XG5cbi8vU3R1ZGlvIHRvZ2dsZSBjb250cm9sXG5mdW5jdGlvbiB0b2dnbGVDb250cm9sKCkge1xuICAgICRkb2N1bWVudC5vbignY2xpY2snLCAnLmpzLXN0dWRpby1zeXN0ZW0tYnRuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc3R1ZGlvLXN5c3RlbScpO1xuICAgICAgICBsZXQgJHdpZGdldExlZnQgPSAkcGFyZW50LmZpbmQoJy53aWRnZXRfX2xlZnQnKTtcbiAgICAgICAgbGV0ICR3aWRnZXRSaWdodCA9ICRwYXJlbnQuZmluZCgnLndpZGdldF9fcmlnaHQnKTtcbiAgICAgICAgbGV0ICR0aXRsZUxlZnQgPSAkcGFyZW50LmZpbmQoJy5iYi1jaGVja2JveF9fdGl0bGUtLWxlZnQnKTtcbiAgICAgICAgbGV0ICR0aXRsZVJpZ2h0ID0gJHBhcmVudC5maW5kKCcuYmItY2hlY2tib3hfX3RpdGxlLS1yaWdodCcpO1xuXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcbiAgICAgICAgICAgIHJlbW92ZSgkd2lkZ2V0UmlnaHQpO1xuICAgICAgICAgICAgYWRkKCR3aWRnZXRMZWZ0KTtcbiAgICAgICAgICAgICR0aXRsZUxlZnQuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgICAgICAgICAgICR0aXRsZVJpZ2h0LnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmUoJHdpZGdldExlZnQpO1xuICAgICAgICAgICAgYWRkKCR3aWRnZXRSaWdodCk7XG4gICAgICAgICAgICAkdGl0bGVMZWZ0LnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gICAgICAgICAgICAkdGl0bGVSaWdodC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGQoZWwpIHtcbiAgICAgICAgZWwuZmluZCgnLmxpc3QtLWljb24nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdsaXN0LWNvbG9yLS1zdWNjZXNzJylcbiAgICAgICAgICAgIC5maW5kKCcubGlzdF9faWNvbicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhbCcpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhcycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZShlbCkge1xuICAgICAgICBlbC5maW5kKCcubGlzdC0taWNvbicpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpc3QtY29sb3ItLXN1Y2Nlc3MnKVxuICAgICAgICAgICAgLmZpbmQoJy5saXN0X19pY29uJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZmFzJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFsJyk7XG4gICAgfVxufVxudG9nZ2xlQ29udHJvbCgpO1xuXG4vL0NhcmQgQWRyZXNzIE1hcFxuaWYgKCQoJyNjYXJkLW1hcCcpLmxlbmd0aCkge1xuICAgIHltYXBzLnJlYWR5KGluaXQpO1xuICAgIHZhciBteU1hcCwgbXlQbGFjZW1hcmssIG15UGluO1xuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdjYXJkLW1hcCcsIHtcbiAgICAgICAgICAgIGNlbnRlcjogWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSxcbiAgICAgICAgICAgIHpvb206IDE2XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKFsnc2Nyb2xsWm9vbSddKTtcblxuICAgICAgICBteU1hcC5jb250cm9sc1xuICAgICAgICAgICAgLnJlbW92ZSgnc2VhcmNoQ29udHJvbCcpXG4gICAgICAgICAgICAucmVtb3ZlKCd0eXBlU2VsZWN0b3InKVxuICAgICAgICAgICAgLmFkZCgncm91dGVFZGl0b3InKTtcblxuICAgICAgICBteVBpbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxuICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvZ2VuZXJhbC9tYXAtcGluLnN2ZycsXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzMwLCA0Ml0sXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBteVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSwge1xuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRIZWFkZXI6XG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fdGl0bGVcIj5OYWlseiBYIENvbGxhYjwvc3Bhbj4nLFxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRCb2R5OlxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1waW5fX3BsYWNlXCI+0YPQuy4g0JHQvtC70YzRiNCw0Y8g0J/QvtC70Y/QvdC60LAsIDUx0JAvOSwg0JzQvtGB0LrQvtCy0YHQutC40Lkg0YAt0L08L3NwYW4+IDxkaXYgY2xhc3M9XCJtYXAtcGluX19wcm9wZXJ0aWVzXCI+PHVsIGNsYXNzPVwicHJvcGVydGllc19fbGlzdFwiPjxsaSBjbGFzcz1cInByb3BlcnRpZXNfX2l0ZW0gcHJvcGVydGllc19faXRlbV9zYWxlIGJiLWRyb3Bkb3duIHRvcCBiYi1kcm9wZG93bi0taG92ZXIganMtYmItZHJvcGRvd25cIj4gPHN2ZyBjbGFzcz1cImljb24gaWNvbi1wcm9jZW50IFwiPjx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI3Byb2NlbnRcIj48L3VzZT48L3N2Zz48ZGl2IGNsYXNzPVwiYmItZHJvcGRvd25fX2xpc3RcIj7QtdGB0YLRjCDRgdC60LjQtNC60Lg8L2Rpdj48L2xpPjxsaSBjbGFzcz1cInByb3BlcnRpZXNfX2l0ZW0gcHJvcGVydGllc19faXRlbV9jYXIgYmItZHJvcGRvd24gdG9wIGJiLWRyb3Bkb3duLS1ob3ZlciBqcy1iYi1kcm9wZG93blwiPiA8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWNhciBcIj48dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNjYXJcIj48L3VzZT48L3N2Zz48ZGl2IGNsYXNzPVwiYmItZHJvcGRvd25fX2xpc3RcIj7QvNC+0LPRgyDQv9GA0LjQtdGF0LDRgtGMPC9kaXY+PC9saT48L3VsPjwvZGl2PicsXG4gICAgICAgICAgICBoaW50Q29udGVudDpcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1hcC1waW5fX2hvdmVyXCI+MS3QutC+0LzQvdCw0YLQvdCw0Y8g0LrQstCw0YDRgtC40YDQsCA8ZGl2IGNsYXNzPVwicmF0aW5nXCI+PGRpdiBjbGFzcz1cInJhdGluZ19faW5uZXJcIiBzdHlsZT1cIndpZHRoOiA5MCVcIj48L2Rpdj48L2Rpdj4gPHNwYW4+0L7RgiAyIDgwMCA8aSBjbGFzcz1cInJ1YlwiPmE8L2k+PC9zcGFuPiA8L2Rpdj4nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG15UGluLmFkZChteVBsYWNlbWFyayk7XG4gICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGluKTtcbiAgICB9XG59XG5cbi8vQ2FiaW5ldCBNYXBcbmlmICgkKCcjY2FiaW5ldC1tYXAnKS5sZW5ndGgpIHtcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcbiAgICB2YXIgbXlNYXAsIG15UGxhY2VtYXJrLCBteVBpbjtcblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY2FiaW5ldC1tYXAnLCB7XG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sXG4gICAgICAgICAgICB6b29tOiAxNlxuICAgICAgICB9KTtcblxuICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XG5cbiAgICAgICAgbXlNYXAuY29udHJvbHNcbiAgICAgICAgICAgIC5yZW1vdmUoJ3NlYXJjaENvbnRyb2wnKVxuICAgICAgICAgICAgLnJlbW92ZSgndHlwZVNlbGVjdG9yJylcbiAgICAgICAgICAgIC5hZGQoJ3JvdXRlRWRpdG9yJyk7XG5cbiAgICAgICAgbXlQaW4gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbihcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2dlbmVyYWwvbWFwLXBpbi5zdmcnLFxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxuICAgICAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogWy0zLCAtNDJdXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0pO1xuXG4gICAgICAgIG15UGluLmFkZChteVBsYWNlbWFyayk7XG4gICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGluKTtcbiAgICB9XG59XG5cbi8vQ2F0YWxvZyBNYXBcbmlmICgkKCcjY2F0YWxvZy1tYXAsICNtYXAnKS5sZW5ndGgpIHtcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcbiAgICB2YXIgbXlNYXAsIG15UGxhY2VtYXJrLCBteVBpbjtcblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY2F0YWxvZy1tYXAnLCB7XG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sXG4gICAgICAgICAgICB6b29tOiAxNlxuICAgICAgICB9KTtcblxuICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XG5cbiAgICAgICAgbXlNYXAuY29udHJvbHNcbiAgICAgICAgICAgIC5yZW1vdmUoJ3NlYXJjaENvbnRyb2wnKVxuICAgICAgICAgICAgLnJlbW92ZSgndHlwZVNlbGVjdG9yJylcbiAgICAgICAgICAgIC5hZGQoJ3JvdXRlRWRpdG9yJyk7XG5cbiAgICAgICAgbXlQaW4gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbihcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2dlbmVyYWwvbWFwLXBpbi5zdmcnLFxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxuICAgICAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogWy0zLCAtNDJdXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sIHtcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOlxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1hcC1waW5fX3RpdGxlXCI+0KHRgtGD0LTQuNGPIFwi0KHQu9C10LfQsCDQtNGA0LDQutC+0L3QsFwiPC9zcGFuPjxkaXYgY2xhc3M9XCJtYXAtcGluX19hZGRyZXNzXCI+0JzQvtGB0LrQstCwLCDRg9C7LiDQk9Cw0LPQsNGA0LjQvdCwLCAyOC8yLCDQvC4g0JvRg9Cx0Y/QvdC60LA8L2Rpdj4nLFxuICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnRCb2R5OlxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faW1hZ2UganMtc3MtbWFwLXNsaWRlciBpbWFnZS13cmFwcGVyXCIgICAgICAgICAgICAgICAgZGF0YS1zcy1pbWFnZXM9XCIuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMC5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTEuanBnOy4uL2ltZy9leGFtcGxlcy91c2VyL2NhdGFsb2cvY2F0YWxvZy0yLmpwZzsuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMy5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTQuanBnXCI+PGltZyBzcmM9XCIuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMC5qcGdcIj48L2Rpdj48ZGl2IGNsYXNzPVwibWFwLXBpbl9faW5mb1wiPjxkaXYgY2xhc3M9XCJyYXRpbmcgbWFwLXBpbl9fcmF0aW5nXCI+PGRpdiBjbGFzcz1cInJhdGluZ19faW5uZXJcIiBzdHlsZT1cIndpZHRoOiA3MCVcIj48L2Rpdj48c3BhbiBjbGFzcz1cInJhdGluZ19fcmV2LWNvdW50XCI+KDc3KTwvc3Bhbj48L2Rpdj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uLWljb24gYnV0dG9uLWljb24tLWZhdiBtYXAtcGluX19mYXYganMtYnRuLWZhdlwiPjwvYnV0dG9uPjwvZGl2PidcbiAgICAgICAgICAgIC8vIGhpbnRDb250ZW50OlxuICAgICAgICAgICAgLy8gJzxkaXYgY2xhc3M9XCJtYXAtcGluX19ob3ZlclwiPjEt0LrQvtC80L3QsNGC0L3QsNGPINC60LLQsNGA0YLQuNGA0LAgPGRpdiBjbGFzcz1cInJhdGluZ1wiPjxkaXYgY2xhc3M9XCJyYXRpbmdfX2lubmVyXCIgc3R5bGU9XCJ3aWR0aDogOTAlXCI+PC9kaXY+PC9kaXY+IDxzcGFuPtC+0YIgMiA4MDAgPGkgY2xhc3M9XCJydWJcIj5hPC9pPjwvc3Bhbj4gPC9kaXY+J1xuICAgICAgICB9KTtcblxuICAgICAgICBteU1hcC5ldmVudHMuYWRkKCdjbGljaycsIGZ1bmN0aW9uKCkge30pO1xuXG4gICAgICAgIG15UGxhY2VtYXJrLmV2ZW50cy5hZGQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcuanMtc3MtbWFwLXNsaWRlcicpLnNpbXBsZXNsaWRlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdiYWxvb24gY2xpY2snKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcbiAgICAgICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQaW4pO1xuICAgIH1cbn1cblxuLypcbiAqKiogRGF0ZVBpY2tlclxuICovXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJGRhdGVwaWNrZXIgPSAkKCcuanMtZGF0ZScpO1xyXG4gICAgbGV0IGRhdGVUb2RheSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgJGRhdGVwaWNrZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWRhdGUnKTtcclxuICAgICAgICBsZXQgJGJ0blRvZGF5ID0gJHBhcmVudC5maW5kKCcuYmItZGF0ZV9fYnRuLS10b2RheScpO1xyXG4gICAgICAgIGxldCAkYnRuUHJldiA9ICRwYXJlbnQuZmluZCgnLmJiLWRhdGVfX2J0bi0tcHJldicpO1xyXG4gICAgICAgIGxldCAkYnRuTmV4dCA9ICRwYXJlbnQuZmluZCgnLmJiLWRhdGVfX2J0bi0tbmV4dCcpO1xyXG4gICAgICAgIGxldCB0eXBlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXR5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdleHBhbmRlZCcpIHtcclxuICAgICAgICAgICAgbGV0IF9zZWxmID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VWYWwoJCh0aGlzKSwgdmFsKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihmb3JtYXR0ZWREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVZhbChfc2VsZiwgZm9ybWF0dGVkRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgIC5zZWxlY3REYXRlKGRhdGVUb2RheSk7XHJcblxyXG4gICAgICAgICAgICAvL1BpY2tlciB3aXRoIGNvbnRyb2xzXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29udHJvbHMnKSB7XHJcbiAgICAgICAgICAgIGxldCBfc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlVmFsKCQodGhpcyksIHZhbCk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dXZWVrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbkRhdGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZm9ybWF0dGVkRGF0ZSwgZGF0ZSwgaW5zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmREYXRlID0gbmV3IERhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldERhdGUoKSAtIGRhdGUuZ2V0RGF5KCkgKyA3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF5KCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgNyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXRNb250aCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlVmFsKF9zZWxmLCBmb3JtYXR0ZWREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdERhdGUoZGF0ZVRvZGF5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogZGF0ZVRvZGF5XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdERhdGUoZGF0ZVRvZGF5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRkYXRlcGlja2VyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCd0eXBlJywgJ2RhdGUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2V0SW5wdXREYXRlKCcuanMtZGF0ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkYnRuVG9kYXkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0RGF0ZShkYXRlVG9kYXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkYnRuUHJldi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgIC5wcmV2KCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ2NsaWNrIHByZXYnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9TaG93IERhdGVwaWNrZXIgd2hlbiBjbGljayBwYXJyZW50IGNvbnRhaW5lclxyXG4gICAgICAgICRwYXJlbnQuZmluZCgnLmpzLWRhdGUtZmllbGQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRkYXRlcGlja2VyID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5iYi1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcigpXHJcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG5cclxuICAgICAgICAgICAgJGRhdGVwaWNrZXIuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0NoYW5nZSBkYXRlIGZpZWxkIChub3QgaW5wdXQpIHZhbHVlXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlVmFsKGVsLCB2YWwpIHtcclxuICAgICAgICAgICAgZWwuY2xvc2VzdCgnLmJiLWRhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlLWZpZWxkJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DbGljayBpY29uIC0gc2hvdyBwaWNrZXJcclxuICAgICQoJy5qcy1pbnB1dC1pY29uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcuanMtZGF0ZScpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxufSkoKTtcclxuXG5mdW5jdGlvbiB1cGRhdGVEYXRhU2NoZWR1bGUoKSB7XHJcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgY3JtU2NoZWR1bGVJbnB1dENhbGVuZGFyVG9wID0gJCgnLmpzQ3JtU2NoZWR1bGVJbnB1dENhbGVuZGFyVG9wJyk7XHJcbiAgICBsZXQgcnVEYXRlcyA9IGdldFdlZWtTY2hlZHVsZShkYXRlKTtcclxuXHJcbiAgICB1cGRhdGVWYWxTY2hlZHVsZShydURhdGVzKTtcclxuXHJcbiAgICBpZiAoY3JtU2NoZWR1bGVJbnB1dENhbGVuZGFyVG9wLmxlbmd0aCkge1xyXG4gICAgICAgIGNybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcFxyXG4gICAgICAgICAgICAuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0b2dnbGVTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtaW5EYXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihmb3JtYXR0ZWREYXRlLCBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJ1RGF0ZXMgPSBnZXRXZWVrU2NoZWR1bGUoZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbFNjaGVkdWxlKHJ1RGF0ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgIC5zZWxlY3REYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudXBkYXRlRGF0YVNjaGVkdWxlKCk7XHJcblxyXG4oZnVuY3Rpb24gZGF0ZVBpY2tlcklubGluZSgpIHtcclxuICAgIHZhciBldmVudERhdGVzID0gWzEsIDEwLCAxMiwgMjJdO1xyXG5cclxuICAgICQoJy5qcy1kYXRlLWlubGluZScpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgIGlubGluZTogdHJ1ZSxcclxuICAgICAgICBtdWx0aXBsZURhdGVzOiB0cnVlLFxyXG4gICAgICAgIG9uUmVuZGVyQ2VsbDogZnVuY3Rpb24oZGF0ZSwgY2VsbFR5cGUpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2VsbFR5cGUgPT0gJ2RheScgJiYgZXZlbnREYXRlcy5pbmRleE9mKGN1cnJlbnREYXRlKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnaXMtY2hlY2tlZCdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVZhbFNjaGVkdWxlKHZhbHVlKSB7XHJcbiAgICBsZXQgY3JtU2NoZWR1bGVEYXRlRmllbGRUb3AgPSAkKCcuanNDcm1TY2hlZHVsZURhdGVGaWVsZFRvcCcpO1xyXG5cclxuICAgIGNybVNjaGVkdWxlRGF0ZUZpZWxkVG9wLnRleHQodmFsdWUuZ2V0KCd0ZXh0JykpO1xyXG5cclxuICAgIGNybVNjaGVkdWxlRGF0ZUZpZWxkVG9wLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJy5qc0NybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcCcpXHJcbiAgICAgICAgICAgIC5kYXRlcGlja2VyKClcclxuICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAuc2hvdygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFdlZWtTY2hlZHVsZShkYXRlKSB7XHJcbiAgICBsZXQgY3VyciA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgbGV0IGN1cnJEYXkgPSBjdXJyLmdldERheSgpO1xyXG4gICAgbGV0IGN1cnJNb250aCA9IGN1cnIuZ2V0TW9udGgoKTtcclxuICAgIGxldCBtb25kYXk7XHJcbiAgICBsZXQgc3VuZGF5O1xyXG5cclxuICAgIGlmIChjdXJyRGF5ID09PSAwKSB7XHJcbiAgICAgICAgbW9uZGF5ID0gY3Vyci5nZXREYXRlKCkgLSA2O1xyXG4gICAgICAgIHN1bmRheSA9IGN1cnIuZ2V0RGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtb25kYXkgPSBjdXJyLmdldERhdGUoKSAtIGN1cnIuZ2V0RGF5KCkgKyAxO1xyXG4gICAgICAgIHN1bmRheSA9IG1vbmRheSArIDY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdldFJpZ2h0V2Vla1RleHQoY3VyciwgbW9uZGF5LCBzdW5kYXksIGN1cnJNb250aCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJpZ2h0V2Vla1RleHQoY3VyckRhdGUsIG1vbmRheSwgc3VuZGF5LCBtb250aCkge1xyXG4gICAgbGV0IGZpcnN0RGF5O1xyXG4gICAgbGV0IGxhc3REYXk7XHJcbiAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgIG1vbnRoOiAnc2hvcnQnXHJcbiAgICB9O1xyXG4gICAgbGV0IG9EYXlGO1xyXG4gICAgbGV0IG9EYXlMO1xyXG4gICAgbGV0IG9Nb250aEY7XHJcbiAgICBsZXQgb01vbnRoTDtcclxuICAgIGxldCBvWWVhckY7XHJcbiAgICBsZXQgb1llYXJMO1xyXG4gICAgbGV0IGFyckRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGxldCB0ZW1wO1xyXG5cclxuICAgIGlmIChzdW5kYXkgPiBtb25kYXkgJiYgKG1vbmRheSA9PT0gMCB8fCBtb25kYXkgPCAwKSkge1xyXG4gICAgICAgIGxldCBuZXdNb250aCA9IG5ldyBEYXRlKGN1cnJEYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoLCAxKTtcclxuXHJcbiAgICAgICAgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyRGF0ZS5zZXREYXRlKG1vbmRheSkpO1xyXG4gICAgICAgIG9EYXlGID0gZmlyc3REYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIG9ZZWFyRiA9IGZpcnN0RGF5LmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgIGZpcnN0RGF5ID0gZmlyc3REYXkudG9Mb2NhbGVTdHJpbmcoJ3J1JywgcGFyYW1zKTtcclxuICAgICAgICBvTW9udGhGID0gZmlyc3REYXkucmVwbGFjZSgnLicsICcnKTtcclxuXHJcbiAgICAgICAgbGFzdERheSA9IG5ldyBEYXRlKG5ld01vbnRoLnNldERhdGUoc3VuZGF5KSk7XHJcbiAgICAgICAgb0RheUwgPSBsYXN0RGF5LmdldERhdGUoKTtcclxuICAgICAgICBvWWVhckwgPSBsYXN0RGF5LmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgIGxhc3REYXkgPSBsYXN0RGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIHBhcmFtcyk7XHJcbiAgICAgICAgb01vbnRoTCA9IGxhc3REYXkucmVwbGFjZSgnLicsICcnKTtcclxuXHJcbiAgICAgICAgaWYgKG9ZZWFyRiA9PT0gb1llYXJMKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPVxyXG4gICAgICAgICAgICAgICAgb0RheUYgK1xyXG4gICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgIG9Nb250aEYgK1xyXG4gICAgICAgICAgICAgICAgJyAtICcgK1xyXG4gICAgICAgICAgICAgICAgb0RheUwgK1xyXG4gICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgIG9Nb250aEwgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBvWWVhckY7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcCA9XHJcbiAgICAgICAgICAgICAgICBvRGF5RiArXHJcbiAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgb01vbnRoRiArXHJcbiAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgIG9ZZWFyRiArXHJcbiAgICAgICAgICAgICAgICAnIC0gJyArXHJcbiAgICAgICAgICAgICAgICBvRGF5TCArXHJcbiAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgb01vbnRoTCArXHJcbiAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgIG9ZZWFyTDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyRGF0YS5hcHBlbmQoJ3RleHQnLCB0ZW1wKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyRGF0ZS5zZXREYXRlKG1vbmRheSkpO1xyXG4gICAgICAgIG9EYXlGID0gZmlyc3REYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIG9ZZWFyRiA9IGZpcnN0RGF5LmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgIGZpcnN0RGF5ID0gZmlyc3REYXkudG9Mb2NhbGVTdHJpbmcoJ3J1JywgcGFyYW1zKTtcclxuICAgICAgICBvTW9udGhGID0gZmlyc3REYXkucmVwbGFjZSgnLicsICcnKTtcclxuXHJcbiAgICAgICAgbGFzdERheSA9IG5ldyBEYXRlKGN1cnJEYXRlLnNldERhdGUoc3VuZGF5KSk7XHJcbiAgICAgICAgb0RheUwgPSBsYXN0RGF5LmdldERhdGUoKTtcclxuICAgICAgICBvWWVhckwgPSBsYXN0RGF5LmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgIGxhc3REYXkgPSBsYXN0RGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIHBhcmFtcyk7XHJcbiAgICAgICAgb01vbnRoTCA9IGxhc3REYXkucmVwbGFjZSgnLicsICcnKTtcclxuXHJcbiAgICAgICAgaWYgKG9Nb250aEwgPT09IG9Nb250aEYpIHtcclxuICAgICAgICAgICAgdGVtcCA9IG9EYXlGICsgJyAtICcgKyBvRGF5TCArICcgJyArIG9Nb250aEYgKyAnLCAnICsgb1llYXJGO1xyXG4gICAgICAgICAgICBhcnJEYXRhLmFwcGVuZCgndGV4dCcsIHRlbXApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChvWWVhckYgPT09IG9ZZWFyTCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9XHJcbiAgICAgICAgICAgICAgICAgICAgb0RheUYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgb01vbnRoRiArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAtICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9EYXlMICtcclxuICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9Nb250aEwgK1xyXG4gICAgICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9ZZWFyRjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPVxyXG4gICAgICAgICAgICAgICAgICAgIG9EYXlGICtcclxuICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9Nb250aEYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9ZZWFyRiArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAtICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9EYXlMICtcclxuICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9Nb250aEwgK1xyXG4gICAgICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9ZZWFyTDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcnJEYXRhLmFwcGVuZCgndGV4dCcsIHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJyRGF0YTtcclxufVxyXG5cblxuLypcbiAqKiogQ2FsZW5kYXJcbiAqL1xuY29uc3QgQ2FsZW5kYXIgPSAoZnVuY3Rpb24oJCkge1xyXG4gICAgbGV0ICRjYWxlbmRhciA9ICQoJyNjYWxlbmRhcicpO1xyXG4gICAgbGV0IGNhbGVuZGFyID0ge307XHJcblxyXG4gICAgY2FsZW5kYXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkY2FsZW5kYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0cygpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVTdGVwKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJyRW1wbG95ZWVzID0gW107XHJcblxyXG4gICAgICAgICAgICBsZXQgYXJyRGF0YSA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9jYXJhLWF2YXRhci5qcGcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQkNC70LXQvdCwINCe0YfQtdC90YzQtNC70LjQvdC90LDRj9GE0LDQvNC40LvQuNGPJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9jYXJhLWF2YXRhci0xLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9CQ0LvQtdC90LAg0J7Rh9C10L3RjNC00LvQuNC90L3QsNGP0YTQsNC80LjQu9C40Y8nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL2RhbmllbGEtYXZhdGFyLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9CQ0LvQtdC90LAg0J7Rh9C10L3RjNC00LvQuNC90L3QsNGP0YTQsNC80LjQu9C40Y8nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL2xpbWEtYXZhdGFyLTEuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JDQu9C10L3QsCDQntGH0LXQvdGM0LTQu9C40L3QvdCw0Y/RhNCw0LzQuNC70LjRjydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvbGltYS1hdmF0YXIuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JDQu9C10L3QsCDQntGH0LXQvdGM0LTQu9C40L3QvdCw0Y/RhNCw0LzQuNC70LjRjydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvbm9hdmF0YXIuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JzQuNGB0YLQtdGAINCT0LjQv9GBJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9hdmF0YXIuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JTRj9C00Y8g0JLQsNGB0Y8nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBhcnJEYXRhLm1hcChmdW5jdGlvbihkYXRhLCBpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJFbXBsb3llZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInVzZXIgdXNlci0tc21hbGxcIj48ZGl2IGNsYXNzPVwidXNlcl9faW1nXCI+PGltZyBzcmM9XCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hdmF0YXIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwidXNlcl9fbmFtZVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm5hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLnh5LnNjYWxlX2hlaWdodCA9IDg1O1xyXG4gICAgICAgICAgICBzY2hlZHVsZXIueHkubmF2X2hlaWdodCA9IDA7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuY29uZmlnLm11bHRpX2RheSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5jb25maWcueG1sX2RhdGUgPSAnJVktJW0tJWQgJUg6JWknO1xyXG5cclxuICAgICAgICAgICAgY2FsZW5kYXIudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5tYXJrX25vdyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5sb2NhbGUubGFiZWxzLnVuaXRfdGFiID0gJ1VuaXQnO1xyXG4gICAgICAgICAgICBzY2hlZHVsZXIubG9jYWxlLmxhYmVscy5zZWN0aW9uX2N1c3RvbSA9ICdTZWN0aW9uJztcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5maXJzdF9ob3VyID0gNDtcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5saW1pdF90aW1lX3NlbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5jb25maWcuZGV0YWlsc19vbl9jcmVhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNyZWF0ZVVuaXRzVmlldyh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndW5pdCcsXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ3NlY3Rpb25faWQnLFxyXG4gICAgICAgICAgICAgICAgbGlzdDogYXJyRW1wbG95ZWVzXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2NoZWR1bGVyLmFkZE1hcmtlZFRpbWVzcGFuKHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0X2RhdGU6IG5ldyBEYXRlKDIwMTgsIDExLCAxNiwgNiwgMzApLFxyXG4gICAgICAgICAgICAgICAgZW5kX2RhdGU6IG5ldyBEYXRlKDIwMTgsIDExLCAxNiwgMTEpLFxyXG4gICAgICAgICAgICAgICAgY3NzOiAnZGh4X3RpbWVfcmVzZXJ2ZWQnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2RoeF90aW1lX2Jsb2NrJywgLy8gd2lsbCBhY3QgYXMgYmxvY2tlZCBzZWN0aW9uXHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaXQ6IDRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjYWxlbmRhci5zdGF0dXNJbml0KCk7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuaW5pdCgnY2FsZW5kYXInLCBuZXcgRGF0ZSgyMDE4LCAxMSwgMTYpLCAndW5pdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuc3RhdHVzSW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNjaGVkdWxlci50ZW1wbGF0ZXMuZXZlbnRfY2xhc3MgPSBmdW5jdGlvbihzdGFydCwgZW5kLCBldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgY3NzID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZXZUeXBlKVxyXG4gICAgICAgICAgICAgICAgLy8gaWYgZXZlbnQgaGFzIHR5cGUgcHJvcGVydHkgdGhlbiBzcGVjaWFsIGNsYXNzIHNob3VsZCBiZSBhc3NpZ25lZFxyXG4gICAgICAgICAgICAgICAgY3NzICs9ICdldmVudF8nICsgZ2V0TGFiZWwoZXZUeXBlLCBldmVudC5ldlR5cGUpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY3NzOyAvLyBkZWZhdWx0IHJldHVyblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldExhYmVsKGFycmF5LCBrZXkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBhcnJheVtpXS5rZXkpIHJldHVybiBhcnJheVtpXS5sYWJlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBldlR5cGUgPSBbXHJcbiAgICAgICAgICAgIHsga2V5OiAnJywgbGFiZWw6ICdTZWxlY3QgZXZlbnQgdHlwZScgfSxcclxuICAgICAgICAgICAgeyBrZXk6IDEsIGxhYmVsOiAnbmV3JyB9LFxyXG4gICAgICAgICAgICB7IGtleTogMiwgbGFiZWw6ICd3b3JraW5nJyB9LFxyXG4gICAgICAgICAgICB7IGtleTogMywgbGFiZWw6ICdkb25lJyB9LFxyXG4gICAgICAgICAgICB7IGtleTogNCwgbGFiZWw6ICdjYW5jZWxlZCcgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHNjaGVkdWxlci5sb2NhbGUubGFiZWxzLnNlY3Rpb25fZXZUeXBlID0gJ0V2ZW50IHR5cGUnO1xyXG5cclxuICAgICAgICBzY2hlZHVsZXIuY29uZmlnLmxpZ2h0Ym94LnNlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnZXZUeXBlJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNTAsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IGV2VHlwZSxcclxuICAgICAgICAgICAgICAgIG1hcF90bzogJ2V2VHlwZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGVuZGFyLnRvb2x0aXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgdG9vbHRpcCA9IHNjaGVkdWxlci5kaHRtbFhUb29sdGlwO1xyXG4gICAgICAgIHRvb2x0aXAuY29uZmlnLmNsYXNzTmFtZSA9ICdkaHRtbFhUb29sdGlwIHRvb2x0aXAgYy1jYWxlbmRhci10b29sdGlwJztcclxuXHJcbiAgICAgICAgbGV0IGZvcm1hdCA9IHNjaGVkdWxlci5kYXRlLmRhdGVfdG9fc3RyKCclSDolaScpO1xyXG4gICAgICAgIHNjaGVkdWxlci50ZW1wbGF0ZXMudG9vbHRpcF90ZXh0ID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIGV2ZW50KTtcclxuICAgICAgICAgICAgbGV0IHRpdGxlO1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZXZUeXBlID09PSAnMScpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gJ9Cd0L7QstCw0Y8nO1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2V2ZW50X25ldyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZXZUeXBlID09PSAnMicpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gJ9CSINGA0LDQsdC+0YLQtSc7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbnRfd29ya2luZyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZXZUeXBlID09PSAnMycpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gJ9CS0YvQv9C+0LvQvdC10L3QsCc7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSAnZXZlbnRfZG9uZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZXZUeXBlID09PSAnNCcpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gJ9Ce0YLQvNC10L3QtdC90LAnO1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2V2ZW50X2NhbmNlbGVkJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgZm9ybWF0KHN0YXJ0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX2hlYWRlciAke2NsYXNzTmFtZX1cIj4ke3RpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX2JvZHkgJHtjbGFzc05hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX3VzZXJcIj7QldC70LXQvdCwINCQ0LLQuNC70L7QstCwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX19zdGF0dXNcIj7QndC+0LLRi9C5PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImMtY2FsZW5kYXItdG9vbHRpcF9fcGhvbmVcIj4rNyAoOTI3KSAxMDctMTEtMzk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX3NlcnZpY2VcIj7QkNC/0L/QsNGA0LDRgtC90YvQuSDQvNCw0L3QuNC60Y7RgDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImMtY2FsZW5kYXItdG9vbHRpcF9fdGltZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2Zvcm1hdChzdGFydCl9IC0gJHtmb3JtYXQoZW5kKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX3ByaWNlXCI+ODAwIDxpIGNsYXNzPVwiZmFyIGZhLXJ1YmxlLXNpZ25cIj48L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX19tYXN0ZXJcIj7QnNCw0YHRgtC10YAg0J7Qu9GM0LPQsCDQmtCw0YDRj9C60LjQvdCwPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxlbmRhci5zaG93TWluaWNhbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChzY2hlZHVsZXIuaXNDYWxlbmRhclZpc2libGUoKSkgc2NoZWR1bGVyLmRlc3Ryb3lDYWxlbmRhcigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2NoZWR1bGVyLnJlbmRlckNhbGVuZGFyKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZGh4X21pbmljYWxfaWNvbicsXHJcbiAgICAgICAgICAgICAgICBkYXRlOiBzY2hlZHVsZXIuX2RhdGUsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZGF0ZSwgY2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXIuc2V0Q3VycmVudFZpZXcoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyLmRlc3Ryb3lDYWxlbmRhcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIudGltZVN0ZXAgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgc3RlcCA9IDE1O1xyXG4gICAgICAgIGxldCBmb3JtYXQgPSBzY2hlZHVsZXIuZGF0ZS5kYXRlX3RvX3N0cignJUg6JWknKTtcclxuXHJcbiAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5ob3VyX3NpemVfcHggPSAoNjAgLyBzdGVwKSAqIDIyO1xyXG4gICAgICAgIHNjaGVkdWxlci50ZW1wbGF0ZXMuaG91cl9zY2FsZSA9IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2MCAvIHN0ZXA7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdiBzdHlsZT0naGVpZ2h0OjIycHg7bGluZS1oZWlnaHQ6MjJweDsnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQoZGF0ZSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgZGF0ZSA9IHNjaGVkdWxlci5kYXRlLmFkZChkYXRlLCBzdGVwLCAnbWludXRlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuaGVpZ2h0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuICAgICAgICBsZXQgaGVhZGVySGVpZ2h0ID0gJCgnLmhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGxldCB0b3BMaW5lSGVpZ2h0ID0gJCgnLmNhbGVuZGFyX190b3AtbGluZScpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgIGxldCBtZW51SGVpZ2h0ID0gJCgnLmpzLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBsZXQgcmVzdWx0SGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgcmVzdWx0SGVpZ2h0ID0gaGVpZ2h0IC0gKGhlYWRlckhlaWdodCArIHRvcExpbmVIZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdEhlaWdodCA9IGhlaWdodCAtIChoZWFkZXJIZWlnaHQgKyB0b3BMaW5lSGVpZ2h0ICsgbWVudUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5jLWNhbGVuZGFyJykuY3NzKCdtaW4taGVpZ2h0JywgcmVzdWx0SGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuY3VzdG9uRXZlbnQgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuICAgIHJldHVybiBjYWxlbmRhcjtcclxufSkoalF1ZXJ5KTtcclxuXG5DYWxlbmRhci5pbml0KCk7XG5cbi8qXG4gKioqIE9yZGVyXG4gKi9cbmNvbnN0IE9yZGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGxldCBvcmRlciA9IHt9O1xuICAgIGxldCAkaHRtbCA9ICQoJ2h0bWwnKTtcbiAgICBsZXQgJHRpbWVQaWNrZXIgPSAkKCcuanMtdGltZS1waWNrZXI6bm90KC5pcy1kaXNhYmxlZCknKTtcbiAgICBsZXQgJGFwcE5vdGUgPSAkKCcuanMtYXBwLW5vdGUnKTtcbiAgICBsZXQgJHVzZXJDYXJ0QnRuID0gJCgnLnVzZXItY2FydF9fYnRuJyk7XG4gICAgbGV0ICR1c2VyQm90dG9tID0gJCgnLnVzZXItY2FydF9fYm90dG9tJyk7XG4gICAgbGV0ICRvcmRlclRpdGxlID0gJCgnLmpzLW9yZGVyLXRpdGxlJyk7XG4gICAgbGV0ICRvcmRlckRldGFpbCA9ICQoJy5qcy1zZXJ2aWNlLWxpc3QnKTtcbiAgICBsZXQgYWN0aXZlQ2xhc3MgPSAnaXMtYWN0aXZlJztcbiAgICBsZXQgaGlkZGVuQ2xhc3MgPSAnaXMtaGlkZGVuJztcblxuICAgIG9yZGVyLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jb25maXJtQXBwKCk7XG4gICAgICAgIHRoaXMuY2hvb3NlTWFzdGVyKCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dDb250ZW50KCk7XG4gICAgICAgIH0sIDgwMCk7XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XG4gICAgICAgICAgICB0aGlzLnByZXZDbGljaygpO1xuICAgICAgICAgICAgdGhpcy5jb25maXJtQXBwTW9iaWxlKCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZml4ZWRCbG9jaygkKCcuanMtZGF5LXBpY2tlcicpKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgb3JkZXIuY29uZmlybUFwcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkdGltZVBpY2tlci5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vdGltZSBjaG9vc2luZ1xuICAgICAgICAgICAgJHRpbWVQaWNrZXIucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgICAgIC8vIHNob3dzIGRhdGUgYW5kIHRpbWUgb2Ygb3JkZXIgKGRlc2t0b3ApXG4gICAgICAgICAgICAkKCcudXNlci1jYXJ0X190b3AnKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgICAgIC8vIHNob3dzIGNvbmZpcm0gYnV0dG9uXG4gICAgICAgICAgICAkYXBwTm90ZS5hZGRDbGFzcyhoaWRkZW5DbGFzcyk7XG4gICAgICAgICAgICAkdXNlckNhcnRCdG4uYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgb3JkZXIuY29uZmlybUFwcE1vYmlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkdGltZVBpY2tlci5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIG9yZGVyIGRldGFpbHMgb3BlbmluZ1xuICAgICAgICAgICAgJG9yZGVyRGV0YWlsLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIC8vIHJld3JpdHRpbmcgb3JkZXIgdGl0bGVcbiAgICAgICAgICAgICRvcmRlclRpdGxlLnRleHQoJ9Cf0L7QtNGC0LLQtdGA0LbQtNC10L3QuNC1INC30LDRj9Cy0LrQuCcpO1xuICAgICAgICAgICAgJGh0bWwuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG5cbiAgICAgICAgICAgIC8vIHNob3dzIGNvbmZpcm0gYnV0dG9uXG4gICAgICAgICAgICAkdXNlckJvdHRvbS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBzZXQgZml4ZWQgYmxvY2sgYXQgdGhlIHRvcCBvZiBhIHBhZ2VcbiAgICBvcmRlci5maXhlZEJsb2NrID0gZnVuY3Rpb24oZml4ZWRCbG9jaykge1xuICAgICAgICBsZXQgaGVpZ2h0ID0gZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgbGV0ICRjbG9uZSA9ICQoJzxkaXYgY2xhc3M9XCJjbG9uZVwiPicpO1xuICAgICAgICAkY2xvbmUuaW5zZXJ0QWZ0ZXIoZml4ZWRCbG9jayk7XG4gICAgICAgICRjbG9uZS5jc3MoJ2hlaWdodCcsIGhlaWdodCkuaGlkZSgpO1xuXG4gICAgICAgIGxldCBmaXhlZEJsb2NrT2Zmc2V0ID0gZml4ZWRCbG9jay5vZmZzZXQoKS50b3AgLSA1MDtcblxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGwgPj0gZml4ZWRCbG9ja09mZnNldCkge1xuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2suYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgJGNsb25lLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsIDwgZml4ZWRCbG9ja09mZnNldCkge1xuICAgICAgICAgICAgICAgIGZpeGVkQmxvY2sucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgJGNsb25lLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG9yZGVyLnByZXZDbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHByZXZCdG4gPSAkKCcuanMtcHJldicpO1xuICAgICAgICBsZXQgJG9yZGVyRWRpdCA9ICQoJy5zZXJ2aWNlLWxpc3RfX2VkaXQnKTtcblxuICAgICAgICAvLyBjbGljayBvbiB0aGUgcHJldiBidG5cbiAgICAgICAgJHByZXZCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkb3JkZXJEZXRhaWwucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgJHVzZXJCb3R0b20ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgJGh0bWwucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAkb3JkZXJUaXRsZS50ZXh0KCfQodC+0LfQtNCw0L3QuNC1INC30LDRj9Cy0LrQuCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjbGljayBvbiB0aGUgZWRpdCBidG5cbiAgICAgICAgJG9yZGVyRWRpdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRvcmRlckRldGFpbC5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAkdXNlckJvdHRvbS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAkaHRtbC5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgICAgICRvcmRlclRpdGxlLnRleHQoJ9Cg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LfQsNGP0LLQutC4Jyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBtYXN0ZXIgY2hvb3NpbmdcbiAgICBvcmRlci5jaG9vc2VNYXN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IG1hc3Rlck1vZGFsID0gJCgnI21hc3RlclBpY2tlcicpO1xuICAgICAgICBsZXQgbWFzdGVyQ2hlY2sgPSBtYXN0ZXJNb2RhbC5maW5kKCdpbnB1dCcpO1xuICAgICAgICBsZXQgbWFzdGVyQ2FuY2VsID0gbWFzdGVyTW9kYWwuZmluZCgnLmJ0bicpO1xuXG4gICAgICAgIG1hc3RlckNoZWNrLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1hc3RlckNhbmNlbC50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBjb250ZW50IGFwcGVhcmluZ1xuICAgIG9yZGVyLnNob3dDb250ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBvcmRlckxlZnRUb3AgPSAkKCcub3JkZXJfX2xlZnRfdG9wJyk7XG5cbiAgICAgICAgb3JkZXJMZWZ0VG9wLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG9yZGVyO1xufSkoKTtcblxuT3JkZXIuaW5pdCgpO1xuXG4vKlxuICoqKiBEYXRlUGlja2VyVmFuaXR5XG4gKi9cbihmdW5jdGlvbigpIHtcclxuICAgIGxldCAkY2FsZW5kYXIgPSAkKCcuanMtZGF5LXBpY2tlcicpO1xyXG4gICAgbGV0IGFjdGl2ZUNsYXNzID0gJ2lzLWFjdGl2ZSc7XHJcbiAgICBsZXQgZGlzYWJsZUNsYXNzID0gJ2lzLWRpc2FibGVkJztcclxuICAgIGxldCBuZXdEYXRlID0gbmV3IERhdGUoKTtcclxuICAgIGxldCBtb250aERheXMgPSBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XHJcblxyXG4gICAgbGV0IG1vbnRocyA9IFtcclxuICAgICAgICAn0K/QvdCy0LDRgNGMJyxcclxuICAgICAgICAn0KTQtdCy0YDQsNC70YwnLFxyXG4gICAgICAgICfQnNCw0YDRgicsXHJcbiAgICAgICAgJ9CQ0L/RgNC10LvRjCcsXHJcbiAgICAgICAgJ9Cc0LDQuScsXHJcbiAgICAgICAgJ9CY0Y7QvdGMJyxcclxuICAgICAgICAn0JjRjtC70YwnLFxyXG4gICAgICAgICfQkNCy0LPRg9GB0YInLFxyXG4gICAgICAgICfQodC10L3RgtGP0LHRgNGMJyxcclxuICAgICAgICAn0J7QutGC0Y/QsdGA0YwnLFxyXG4gICAgICAgICfQndC+0Y/QsdGA0YwnLFxyXG4gICAgICAgICfQlNC10LrQsNCx0YDRjCdcclxuICAgIF07XHJcblxyXG4gICAgJGNhbGVuZGFyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICAgICAgcmVuZGVyKF90aGlzKTtcclxuXHJcbiAgICAgICAgbGV0ICRpdGVtID0gX3RoaXMuZmluZCgnLmRheS1waWNrZXJfX2l0ZW0nKTtcclxuICAgICAgICBsZXQgJGFycm93UiA9IF90aGlzLmZpbmQoJy5kYXktcGlja2VyX19hcnJvdy0tcmlnaHQnKTtcclxuICAgICAgICBsZXQgJGFycm93TCA9IF90aGlzLmZpbmQoJy5kYXktcGlja2VyX19hcnJvdy0tbGVmdCcpO1xyXG5cclxuICAgICAgICAkaXRlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcyhkaXNhYmxlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAkaXRlbS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0b2RheVdlZWsoX3RoaXMpO1xyXG5cclxuICAgICAgICAkYXJyb3dSLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAkYXJyb3dMLnJlbW92ZUNsYXNzKGRpc2FibGVDbGFzcyk7XHJcbiAgICAgICAgICAgIG1vbnRoTmFtZU5leHQoX3RoaXMpO1xyXG4gICAgICAgICAgICBuZXh0V2VlayhfdGhpcyk7XHJcbiAgICAgICAgICAgIHdlZWtDaGVjayhfdGhpcywgY291bnRlcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRhcnJvd0wub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghJGFycm93TC5oYXNDbGFzcyhkaXNhYmxlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyLS07XHJcblxyXG4gICAgICAgICAgICAgICAgbW9udGhOYW1lUHJldihfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2V2VlayhfdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgYmxvY2tBcnJvdyhfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB3ZWVrQ2hlY2soX3RoaXMsIGNvdW50ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXIoZWwpIHtcclxuICAgICAgICBlbC5hZGRDbGFzcygnZGF5LXBpY2tlcicpO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGA8ZGl2IGNsYXNzPVwiZGF5LXBpY2tlcl9fdG9wXCI+XHJcblxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19tb250aFwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9feWVhclwiPjwvc3Bhbj4sXHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX193ZWVrXCI+PC9zcGFuPlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRheS1waWNrZXJfX2JvdHRvbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXktcGlja2VyX19jYXJvdXNlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGF5LXBpY2tlcl9fYXJyb3cgZGF5LXBpY2tlcl9fYXJyb3ctLWxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFsIGZhLWFuZ2xlLWxlZnRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiZGF5LXBpY2tlcl9fbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZGF5LXBpY2tlcl9faXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fZGF5X3RpdGxlXCI+0J/QvTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV9udW1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZGF5LXBpY2tlcl9faXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fZGF5X3RpdGxlXCI+0JLRgjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV9udW1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZGF5LXBpY2tlcl9faXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fZGF5X3RpdGxlXCI+0KHRgDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV9udW1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZGF5LXBpY2tlcl9faXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fZGF5X3RpdGxlXCI+0KfRgjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV9udW1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZGF5LXBpY2tlcl9faXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fZGF5X3RpdGxlXCI+0J/Rgjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV9udW1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZGF5LXBpY2tlcl9faXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fZGF5X3RpdGxlXCI+0KHQsTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV9udW1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiZGF5LXBpY2tlcl9faXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fZGF5X3RpdGxlXCI+0JLRgTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV9udW1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRheS1waWNrZXJfX2Fycm93IGRheS1waWNrZXJfX2Fycm93LS1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYWwgZmEtYW5nbGUtcmlnaHRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuXHJcbiAgICAgICAgZWwuaHRtbChodG1sKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b2RheVdlZWsoZWwpIHtcclxuICAgICAgICBsZXQgd2Vla0RheUFyciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19kYXlfbnVtJyk7XHJcbiAgICAgICAgbGV0ICRtb250aCA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19tb250aCcpO1xyXG4gICAgICAgIGxldCAkeWVhciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX195ZWFyJyk7XHJcbiAgICAgICAgbGV0ICR3ZWVrRGVzYyA9IGVsLmZpbmQoJy5kYXktcGlja2VyX193ZWVrJyk7XHJcbiAgICAgICAgbGV0ICRhcnJvd0wgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fYXJyb3ctLWxlZnQnKTtcclxuICAgICAgICBsZXQgbm93V2Vla0RheU51bSA9IG5ld0RhdGUuZ2V0RGF5KCkgLSAxO1xyXG4gICAgICAgIGxldCBub3dNb250aERheSA9IG5ld0RhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGxldCBub3dNb250aCA9IG5ld0RhdGUuZ2V0TW9udGgoKTtcclxuICAgICAgICBsZXQgbm93WWVhciA9IG5ld0RhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBsZXQgd2Vla0RheSA9IHdlZWtEYXlBcnIuZXEobm93V2Vla0RheU51bSk7XHJcblxyXG4gICAgICAgICRhcnJvd0wuYWRkQ2xhc3MoZGlzYWJsZUNsYXNzKTtcclxuICAgICAgICAkd2Vla0Rlc2MudGV4dCgn0Y3RgtCwINC90LXQtNC10LvRjycpO1xyXG4gICAgICAgICRtb250aC50ZXh0KG1vbnRoc1tub3dNb250aF0pO1xyXG4gICAgICAgICR5ZWFyLnRleHQobm93WWVhcik7XHJcbiAgICAgICAgd2Vla0RheS50ZXh0KG5vd01vbnRoRGF5KTtcclxuICAgICAgICB3ZWVrRGF5LmNsb3Nlc3QoJy5kYXktcGlja2VyX19pdGVtJykuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICBpbnNlcnRMZWZ0U2lkZShlbCk7XHJcbiAgICAgICAgaW5zZXJ0UmlnaHRTaWRlKGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0V2VlayhlbCkge1xyXG4gICAgICAgIGxldCB3ZWVrRGF5QXJyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2RheV9udW0nKTtcclxuICAgICAgICBsZXQgd2Vla0RheUxhc3QgPSBwYXJzZUludCh3ZWVrRGF5QXJyLmVxKDYpLnRleHQoKSkgKyAxO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQod2Vla0RheUxhc3QrKyk7XHJcblxyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyXHJcbiAgICAgICAgICAgICAgICAuZXEoaSlcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZGF5LXBpY2tlcl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoZGlzYWJsZUNsYXNzKTtcclxuICAgICAgICAgICAgd2Vla0RheUFyclxyXG4gICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmRheS1waWNrZXJfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3ZWVrRGF5QXJyLmVxKGkpLnRleHQoKSA+IG1vbnRoRGF5c1ttb250aE51bShlbCldKSB7XHJcbiAgICAgICAgICAgICAgICB3ZWVrRGF5TGFzdCA9IDE7XHJcbiAgICAgICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQod2Vla0RheUxhc3QrKyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJldldlZWsoZWwpIHtcclxuICAgICAgICBsZXQgd2Vla0RheUFyciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19kYXlfbnVtJyk7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlGaXJzdCA9IHBhcnNlSW50KHdlZWtEYXlBcnIuZXEoMCkudGV4dCgpKSAtIDE7XHJcbiAgICAgICAgbGV0IG1vbnRoUHJldiA9IG1vbnRoTnVtKGVsKSAtIDE7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSA2OyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQod2Vla0RheUZpcnN0LS0pO1xyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyXHJcbiAgICAgICAgICAgICAgICAuZXEoaSlcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZGF5LXBpY2tlcl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoZGlzYWJsZUNsYXNzKTtcclxuICAgICAgICAgICAgd2Vla0RheUFyclxyXG4gICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmRheS1waWNrZXJfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3ZWVrRGF5QXJyLmVxKGkpLnRleHQoKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtb250aFByZXYgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGhQcmV2ID0gMTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd2Vla0RheUZpcnN0ID0gbW9udGhEYXlzW21vbnRoUHJldl07XHJcbiAgICAgICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQod2Vla0RheUZpcnN0LS0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluc2VydExlZnRTaWRlKGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCBwcmV2TW9udGhEYXkgPSBuZXdEYXRlLmdldERhdGUoKSAtIDE7XHJcbiAgICAgICAgbGV0IHByZXZXZWVrRGF5ID0gbmV3RGF0ZS5nZXREYXkoKSAtIDI7XHJcbiAgICAgICAgbGV0IG5vd01vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gcHJldldlZWtEYXk7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHdlZWtEYXlBcnIuZXEoaSkudGV4dChwcmV2TW9udGhEYXktLSk7XHJcblxyXG4gICAgICAgICAgICBpZiAod2Vla0RheUFyci5lcShpKS50ZXh0KCkgPCAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vd01vbnRoIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vd01vbnRoID0gMTE7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHByZXZNb250aERheSA9IG1vbnRoRGF5c1tub3dNb250aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KHByZXZNb250aERheS0tKTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyXHJcbiAgICAgICAgICAgICAgICAuZXEoaSlcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZGF5LXBpY2tlcl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoZGlzYWJsZUNsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5zZXJ0UmlnaHRTaWRlKGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCBub3dXZWVrRGF5TnVtID0gbmV3RGF0ZS5nZXREYXkoKSAtIDE7XHJcbiAgICAgICAgbGV0IG5vd01vbnRoRGF5ID0gbmV3RGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgbGV0IG5vd01vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gbm93V2Vla0RheU51bTsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQobm93TW9udGhEYXkrKyk7XHJcblxyXG4gICAgICAgICAgICBpZiAod2Vla0RheUFyci5lcShpKS50ZXh0KCkgPiBtb250aERheXNbbm93TW9udGhdKSB7XHJcbiAgICAgICAgICAgICAgICBub3dNb250aERheSA9IDE7XHJcbiAgICAgICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQobm93TW9udGhEYXkrKyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9udGhOdW0oZWwpIHtcclxuICAgICAgICBsZXQgdGhpc01vbnRoID0gZWwuZmluZCgnLmRheS1waWNrZXJfX21vbnRoJyk7XHJcbiAgICAgICAgbGV0IHRoaXNNb250aE51bSA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vbnRocy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobW9udGhzW2ldID09IHRoaXNNb250aC50ZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNNb250aE51bSA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzTW9udGhOdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vbnRoTmFtZU5leHQoZWwpIHtcclxuICAgICAgICBsZXQgd2Vla0RheUFyciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19kYXlfbnVtJyk7XHJcbiAgICAgICAgbGV0IHRoaXNNb250aCA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19tb250aCcpO1xyXG4gICAgICAgIGxldCAkeWVhciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX195ZWFyJyk7XHJcbiAgICAgICAgbGV0IHllYXJOdW0gPSBwYXJzZUludCgkeWVhci50ZXh0KCkpO1xyXG4gICAgICAgIGxldCB0aGlzTW9udGhOdW0gPSAnJztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3ZWVrRGF5QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh3ZWVrRGF5QXJyLmVxKGkpLnRleHQoKSA9PSBtb250aERheXNbbW9udGhOdW0oZWwpXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc01vbnRoTnVtID0gbW9udGhOdW0oZWwpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc01vbnRoTnVtID4gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGhOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNNb250aC50ZXh0KG1vbnRoc1t0aGlzTW9udGhOdW1dKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgdGhpc01vbnRoLnRleHQoKSA9PSAn0K/QvdCy0LDRgNGMJyAmJlxyXG4gICAgICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KCkgPT0gbW9udGhEYXlzW21vbnRoTnVtKGVsKV1cclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAkeWVhci50ZXh0KHllYXJOdW0gKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb250aE5hbWVQcmV2KGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCB0aGlzTW9udGggPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fbW9udGgnKTtcclxuICAgICAgICBsZXQgJHllYXIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9feWVhcicpO1xyXG4gICAgICAgIGxldCB5ZWFyTnVtID0gcGFyc2VJbnQoJHllYXIudGV4dCgpKTtcclxuICAgICAgICBsZXQgdGhpc01vbnRoTnVtID0gJyc7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2Vla0RheUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAod2Vla0RheUFyci5lcShpKS50ZXh0KCkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc01vbnRoTnVtID0gbW9udGhOdW0oZWwpIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc01vbnRoTnVtIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNNb250aE51bSA9IDExO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNNb250aC50ZXh0KG1vbnRoc1t0aGlzTW9udGhOdW1dKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXNNb250aC50ZXh0KCkgPT0gJ9CU0LXQutCw0LHRgNGMJyAmJiB3ZWVrRGF5QXJyLmVxKGkpLnRleHQoKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAkeWVhci50ZXh0KHllYXJOdW0gLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBibG9ja0Fycm93KGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCB0aGlzTW9udGggPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fbW9udGgnKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3ZWVrRGF5QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHdlZWtEYXlBcnIuZXEoaSkudGV4dCgpID09IG5ld0RhdGUuZ2V0RGF0ZSgpICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzTW9udGgudGV4dCgpID09IG1vbnRoc1tuZXdEYXRlLmdldE1vbnRoKCldXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdG9kYXlXZWVrKGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3ZWVrQ2hlY2soZWwsIGNvdW50ZXIpIHtcclxuICAgICAgICBsZXQgJHdlZWtEZXNjID0gZWwuZmluZCgnLmRheS1waWNrZXJfX3dlZWsnKTtcclxuXHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPT0gMSkge1xyXG4gICAgICAgICAgICAkd2Vla0Rlc2MudGV4dCgn0YHQu9C10LTRg9GO0YnQsNGPINC90LXQtNC10LvRjycpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY291bnRlciA+IDEgJiYgY291bnRlciA8PSA0KSB7XHJcbiAgICAgICAgICAgICR3ZWVrRGVzYy50ZXh0KCfRh9C10YDQtdC3ICcgKyBjb3VudGVyICsgJyDQvdC10LTQtdC70LgnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPiA0KSB7XHJcbiAgICAgICAgICAgICR3ZWVrRGVzYy50ZXh0KCfRh9C10YDQtdC3ICcgKyBjb3VudGVyICsgJyDQvdC10LTQtdC70YwnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcblxuIl19
