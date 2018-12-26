'use strict';

//Function which have been moved in DEV

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
    e.preventDefault();
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
    $(document).on('click', '.js-studio-system-btn', function () {
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
            iconImageHref: 'img/icons/svg/map-pin.svg',
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
            iconImageHref: 'img/icons/svg/map-pin.svg',
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
            iconImageHref: 'img/icons/svg/map-pin.svg',
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

//Field Edit
(function () {
    var fieldEdit = '.js-field-edit';
    var $fieldEdit = $(document).find('.js-field-edit');

    $fieldEdit.each(function () {
        var $fieldEditInput = $(this).find('.field-edit__input');
        var $fieldEditBtn = $(this).find('.field-edit__btn');

        $fieldEditBtn.on('click', function () {
            var $fieldEditInput = $(this).closest(fieldEdit).find('.field-edit__input');

            var $fieldEditText = $(this).closest(fieldEdit).find('.field-edit__text');

            var fieldEditText = $fieldEditText.text();

            $(this).hide();
            $fieldEditText.hide();

            $fieldEditInput.val(fieldEditText).show().select();
        });

        $fieldEditInput.blur(function () {
            var $fieldEditText = $(this).closest(fieldEdit).find('.field-edit__text');

            if ($.trim(this.value) == '') {
                this.value = this.defaultValue ? this.defaultValue : '';
            } else {
                $fieldEditText.html(this.value);
            }

            $(this).hide();
            $fieldEditBtn.removeAttr('style');
            $fieldEditText.show();
        }).keypress(function (event) {
            var $fieldEditText = $(this).closest(fieldEdit).find('.field-edit__text');

            if (event.keyCode == '13') {
                if ($.trim(this.value) == '') {
                    this.value = this.defaultValue ? this.defaultValue : '';
                } else {
                    $fieldEditText.html(this.value);
                }

                $(this).hide();
                $fieldEditBtn.removeAttr('style');
                $fieldEditText.show();
            }
        });
    });
})();

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

    //Set Input Date Value
    function setInputDate(el) {
        var _dat = document.querySelectorAll(el);
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

            scheduler.init('calendar', new Date(2018, 11, 16), 'week');
            calendar.timeSpan();
        }
    };

    calendar.timeSpan = function () {
        var fix_date = function fix_date(date) {
            // 17:48:56 -> 17:30:00
            date = new Date(date);
            // if (date.getMinutes() > 30)
            //     date.setMinutes(15);
            // else
            //     date.setMinutes(0);
            // date.setSeconds(0);
            return date;
        };

        // console.log(fix_date);

        var marked_date = null;
        var marked = null;
        var event_step = 15;

        scheduler.attachEvent('onMouseMove', function (event_id, native_event) {
            var date = scheduler.getActionData(native_event).date;
            var fixed_date = fix_date(date);
            console.log(fixed_date);

            if (+fixed_date != +marked_date) {
                scheduler.unmarkTimespan(marked);

                marked_date = fixed_date;
                marked = scheduler.markTimespan({
                    start_date: fixed_date,
                    end_date: scheduler.date.add(fixed_date, event_step, 'minute'),
                    css: 'c-calendar__timespan',
                    html: '<span>' + fixed_date.getHours() + ':' + fixed_date.getMinutes() + '</span>'
                });
            }
        });
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
        $('.c-calendar').css('height', resultHeight);

        console.log('--- height', height);
        console.log('--- headerHeight', headerHeight);
        console.log('--- topLineHeight', topLineHeight);
    };

    calendar.custonEvent = function () {};

    return calendar;
}(jQuery);

setTimeout(function () {
    Calendar.init();
}, 200);

/*
 *** DayPicker
 */
(function () {
    var $dayPicker = $('.js-day-picker');
    var activeClass = 'is-active';
    var disableClass = 'is-disabled';
    var newDate = new Date();
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    $dayPicker.each(function () {
        var _this = $(this);
        var counter = 0;
        render(_this);
        todayWeek(_this);

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

        $arrowR.on('click', function () {
            counter++;

            $arrowL.removeClass(disableClass);
            monthNameNext(_this);
            nextWeek(_this);
            weekCheck(_this, counter);

            dataSet(_this, $item);
        });

        $arrowL.on('click', function () {
            if (!$arrowL.hasClass(disableClass)) {
                counter--;

                monthNamePrev(_this);
                prevWeek(_this);

                blockArrow(_this);
                weekCheck(_this, counter);
            }

            dataSet(_this, $item);
        });
    });

    function render(el) {
        el.addClass('day-picker');

        var html = '<div class="day-picker__top">\n\n\t\t\t\t\t<span class="day-picker__month"></span>\n\t\t\t\t\t<span class="day-picker__year"></span>,\n                    <span class="day-picker__week"></span>\n\n                </div>\n                <div class="day-picker__bottom">\n                    <div class="day-picker__carousel">\n                        <button class="day-picker__arrow day-picker__arrow--left">\n                            <i class="fal fa-angle-left"></i>\n                        </button>\n\n                        <ul class="day-picker__list">\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u041F\u043D</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0412\u0442</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0421\u0440</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0427\u0442</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u041F\u0442</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0421\u0431</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                            <li class="day-picker__item">\n                                <span class="day-picker__day_title">\u0412\u0441</span>\n                                <span class="day-picker__day_num"></span>\n                            </li>\n                        </ul>\n\n                        <button class="day-picker__arrow day-picker__arrow--right">\n                            <i class="fal fa-angle-right"></i>\n                        </button>\n                    </div>\n                </div>';

        el.html(html);
    }

    // формирование текущей недели
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
        var $item = el.find('.day-picker__item');

        $arrowL.addClass(disableClass);
        $weekDesc.text('эта неделя');
        $month.text(months[nowMonth]);
        $year.text(nowYear);
        weekDay.text(nowMonthDay);
        weekDay.closest('.day-picker__item').addClass(activeClass);

        insertLeftSide(el);
        insertRightSide(el);
        dataSet(el, $item);
    }

    // формирование следующей недели
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

    // формирование предыдущей недели
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

    // для функции todayWeek, формирует левую сторону от текущей даты
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
                }

                prevMonthDay = monthDays[nowMonth - 1];
                weekDayArr.eq(i).text(prevMonthDay--);
            }

            weekDayArr.eq(i).closest('.day-picker__item').addClass(disableClass);
        }
    }

    // для функции todayWeek, формирует правую сторону от текущей даты
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

    // выявляет номер месяца, указанного в данный момент
    // номер месяца начинается с 0 до 11
    // через массив months
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

    // формирует название месяца для следующей недели
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

    // формирует название месяца для предыдущей недели
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

    // блокировка стрелки
    function blockArrow(el) {
        var weekDayArr = el.find('.day-picker__day_num');
        var thisMonth = el.find('.day-picker__month');

        for (var i = 0; i < weekDayArr.length; i++) {
            if (weekDayArr.eq(i).text() == newDate.getDate() && thisMonth.text() == months[newDate.getMonth()]) {
                todayWeek(el);
            }
        }
    }

    // надпись для указания количества недель от текущей даты
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

    // запись полной даты в data-date=ГГГГ-ММ-ДД
    function dataSet(el, item) {
        var year = $('.day-picker__year').text();
        // месяц календарный
        var month = monthNum(el) + 1;
        var num = $('.day-picker__day_num');

        item.each(function (i) {
            item.eq(i).attr('data-date', year + '-' + month + '-' + num.eq(i).text());
        });
    }
})();

/*
 *** Order
 */
var Order = function () {
    var order = {};
    var $html = $('html');
    var $timePickerItem = $('.js-time-picker-item').not('.is-disabled');
    var $orderTime = $('.js-order-time');
    var $orderTitle = $('.js-order-title');
    var $orderDetail = $('.js-service-list');
    var $orderBtnBack = $('.js-order-prev');
    var $orderBtnEdit = $('.js-order-edit');
    var $userInfoNote = $('.js-user-info-note');
    var $userCartBtn = $('.user-info__btn');
    var $userInfoBottom = $('.user-info__bottom');
    var $userInfoTop = $('.user-info__top');
    var activeClass = 'is-active';
    var hiddenClass = 'is-hidden';
    var flag = false;

    order.init = function () {
        var _this2 = this;

        this.selectTime();
        this.selectMaster();

        this.fixedBlock($('.js-user-info'));

        if ($(window).width() <= 768) {
            this.selectTimeMobile();
            this.clickOnBtnBack();

            setTimeout(function () {
                _this2.fixedBlock($('.js-day-picker'));
            }, 500);
        }
    };

    order.selectTime = function () {
        $timePickerItem.on('click', function () {
            //time choosing
            $timePickerItem.not($(this)).removeClass(activeClass);
            $(this).toggleClass(activeClass);

            // shows date and time of order (desktop)
            $userInfoTop.addClass(activeClass);

            // shows confirm button
            $userInfoNote.addClass(hiddenClass);
            $userCartBtn.addClass(activeClass);

            //set time
            $orderTime.text($(this).text());
        });
    };

    order.selectTimeMobile = function () {
        $timePickerItem.on('click', function () {
            // order details opening
            $orderDetail.addClass(activeClass);

            // rewritting order title
            $orderTitle.text('Подтверждение заявки');
            $html.addClass('is-fixed');

            // shows confirm button
            $userInfoBottom.addClass(activeClass);
            flag = true;
        });
    };

    // set fixed block at the top of a page
    order.fixedBlock = function (fixedBlock) {
        var height = fixedBlock.outerHeight(true);
        var $clone = $('<div class="clone">');
        $clone.insertAfter(fixedBlock);
        $clone.css('height', height).hide();

        var fixedBlockOffset = fixedBlock.offset().top;

        //for fixed top block with width 50px
        if ($(window).width() <= 768) {
            fixedBlockOffset = fixedBlock.offset().top - 50;
        }

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

    order.clickOnBtnBack = function () {
        // click on the prev btn
        $orderBtnBack.on('click', function (e) {
            $orderTitle.text('Создание заявки');

            if (flag) {
                _removeClass();
                $timePickerItem.removeClass(activeClass);
                e.preventDefault();
            }
        });

        // click on the edit btn
        $orderBtnEdit.on('click', function () {
            $orderTitle.text('Редактирование заявки');
            _removeClass();
        });

        function _removeClass() {
            $orderDetail.removeClass(activeClass);
            $userInfoBottom.removeClass(activeClass);
            $html.removeClass('is-fixed');
            flag = false;
        }
    };

    //Close modal aftre select master
    order.selectMaster = function () {
        var $masterItem = $('#masterPicker').find('.master-picker__item');

        $masterItem.on('click', function () {
            var _this3 = this;

            setTimeout(function () {
                $(_this3).closest('#masterPicker').modal('hide');
            }, 200);
        });
    };

    return order;
}();

Order.init();

/*
 *** Chart
 */
var DoubleAreaChart = function ($) {
    var $chart = $('.js-chart--stat');
    if ($chart.length) {
        var chart = {};

        // отступы
        var margin = {
            top: 70,
            bottom: 50,
            left: 50,
            right: 35
        };

        // названия осей
        var legendArray = ['Выручка', 'Количество заявок'];

        // определяющие цвета графика
        var colorArray = ['rgba(8, 225, 253)', 'rgba(167,167,255)'];

        // размеры контейнера
        var parentWidth = $chart.parent().width();

        var width = parentWidth - margin.left - margin.right;
        var height = 0.7 * width;

        // ширина графика
        var x = d3.scaleTime().range([0, width]);
        // высота графика
        var y = d3.scaleLinear().range([height, 0]);

        // главный контейнер
        var svg = d3.select('.js-chart--stat').append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // заливка градиентом
        var colorScaleGradient = d3.scaleOrdinal().domain(['value_1', 'value_2']).range(["url('#svgGradient1')", "url('#svgGradient2')"]);

        // заливка непрозрачным цветом под цвет градиента
        var colorScaleOpaque = d3.scaleOrdinal().domain(['value_1', 'value_2']).range([colorArray[0], colorArray[1]]);

        chart.init = function () {
            d3.json('js/data/data-statistics.json').then(function (data) {
                data.forEach(function (d) {
                    d.date = new Date(d.date);
                    d.value_1 = +d.value_1;
                    d.value_2 = +d.value_2;
                });

                // разбивка данных на два потока с одним id
                var keys = d3.keys(data[0]);
                var i = keys.indexOf('date');

                if (i != -1) {
                    keys.splice(i, 1);
                }
                var array = keys.map(function (d) {
                    return {
                        id: d,
                        values: data.map(function (e) {
                            return {
                                date: e.date,
                                source: e[d]
                            };
                        })
                    };
                });

                // градация шкалы x
                x.domain(d3.extent(data, function (d) {
                    return d.date;
                }));

                // градация шкалы y
                y.domain([d3.min(array, function (c) {
                    return d3.min(c.values, function (d) {
                        return d.source;
                    });
                }), d3.max(array, function (c) {
                    return d3.max(c.values, function (d) {
                        return d.source;
                    });
                })]);

                chart.createLeftAxis();
                chart.createBottomAxis();
                chart.createArea(array);
                chart.createValueLine(array);
                chart.createCircle(data);
                chart.gradients('svgGradient1', colorArray[0]);
                chart.gradients('svgGradient2', colorArray[1]);
                chart.legends(array);

                chart.anchor();
                chart.info(data);
            });
        };

        chart.createLeftAxis = function () {
            var yAxis = d3.axisLeft(y).tickFormat(d3.format('.0s'));

            svg.append('g').attr('class', 'axis axis--y').style('font-size', '12').call(yAxis);
        };

        chart.createBottomAxis = function () {
            var xAxis = d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat('%d.%m'));

            svg.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').style('font-size', '12').call(xAxis);
        };

        chart.createArea = function (data) {
            var area = d3.area().curve(d3.curveCatmullRom).x(function (d) {
                return x(d.date);
            }).y0(y(0)).y1(function (d) {
                return y(d.source);
            });

            var areaSource = svg.selectAll('.area').data(data).enter().append('g').attr('class', function (d) {
                return 'area ' + d.id;
            }).style('fill', function (d) {
                return colorScaleGradient(d.id);
            });

            areaSource.append('path').attr('d', function (d) {
                return area(d.values);
            });

            return area;
        };

        chart.createValueLine = function (data) {
            var valueline = d3.line().curve(d3.curveCatmullRom).x(function (d) {
                return x(d.date);
            }).y(function (d) {
                return y(d.source);
            });

            var valueSource = svg.selectAll('.line').data(data).enter().append('g').attr('class', function (d) {
                return 'line ' + d.id;
            }).style('stroke', function (d) {
                return colorScaleOpaque(d.id);
            }).style('fill', 'transparent');

            valueSource.append('path').attr('d', function (d) {
                return valueline(d.values);
            });
        };

        chart.createCircle = function (data) {
            var circle1 = svg.selectAll('.circleValue1').data(data).enter().append('svg:circle').attr('class', 'circleValue1');

            var circle2 = svg.selectAll('.circleValue2').data(data).enter().append('svg:circle').attr('class', 'circleValue2');

            var circleR = 3;

            circle1.attr('cx', function (d) {
                console.log();
                return x(d.date);
            }).attr('cy', function (d) {
                return y(d.value_1);
            }).attr('r', circleR).attr('value', function (d) {
                return d.value_1;
            }).style('stroke', colorArray[0]).style('fill', '#fff');

            circle2.attr('cx', function (d) {
                return x(d.date);
            }).attr('cy', function (d) {
                return y(d.value_2);
            }).attr('r', circleR).attr('value', function (d) {
                return d.value_2;
            }).style('stroke', colorArray[1]).style('fill', '#fff');
        };

        chart.gradients = function (id, color) {
            var gradient = svg.append('linearGradient').attr('id', id).attr('gradientTransform', 'rotate(45)').attr('x1', '0%').attr('x2', '100%').attr('y1', '0%').attr('y2', '100%');

            // верхний цвет
            gradient.append('stop').attr('class', 'start').attr('offset', '0').attr('stop-color', color).attr('stop-opacity', 1);

            // нижний цвет
            gradient.append('stop').attr('class', 'end').attr('offset', '65%').attr('stop-color', 'rgba(255,255,255,0.3').attr('stop-opacity', 1);
        };

        chart.legends = function () {
            var legend = svg.append('g').attr('class', 'legend').attr('height', 100).attr('width', 100).attr('x', 0).attr('y', 0).attr('transform', 'translate(-17, -30)');

            // маркеры
            legend.selectAll('.circleLegend').data(colorArray).enter().append('svg:circle').attr('cx', function (d, i) {
                return i * 130;
            }).attr('cy', 0).attr('transform', 'translate(0,-4)').attr('r', 10).attr('class', 'circleLegend').style('fill', function (d) {
                return d;
            });

            // название
            legend.selectAll('.textLegend').data(legendArray).enter().append('text').text(function (d) {
                return d;
            }).attr('x', function (d, i) {
                return i * 130 + 20;
            }).attr('y', 0).attr('class', 'textLegend');
        };

        chart.info = function (data) {
            var popup = $('.js-widget-popup');
            var result = popup.find('.widget__result');
            var tickX = $('.axis--x').find('.tick');

            tickX.each(function (i) {
                tickX.eq(i).on('mouseover', function () {
                    var val1 = result.eq(0).find('.widget__number');
                    var val2 = result.eq(1).find('.widget__number');

                    val1.text(data[i]['value_1']);
                    val2.text(data[i]['value_2']);
                });
            });
        };

        chart.anchor = function () {
            var popup = $('.js-widget-popup');

            svg.selectAll('.axis--x .tick').on('mouseover', function () {
                // расстояние от верхнего края окна с учетом прокрутки
                var mouseY = event.pageY - $(window).scrollTop();
                // расстояние от левого края окна
                var mouseX = event.pageX;
                // размеры всплывающего окна
                var height = popup.height();
                var width = popup.width();

                // новые свойства
                var top = mouseY - height - 30;
                var right = mouseX - width / 2;

                // ограничение слева
                if (right < 60) {
                    right = mouseX - 20;
                    // ограничение справа
                } else if (right > $(window).width()) {
                    right = mouseX - width;
                    // ограничение сверху
                } else if (top < 60) {
                    top = mouseY + height + 10;
                }

                // изменение расположения
                popup.css({
                    top: top,
                    left: right
                });

                // всплытие
                popup.fadeIn();
            });

            svg.selectAll('.axis--x .tick').on('mouseout', function () {
                // скрытие
                popup.hide();
            });
        };

        return chart;
    }
}(jQuery);

var PieChart = function ($) {
    var $chart = $('.js-chart--donut');
    if ($chart.length) {
        var chart = {};

        var margin = {
            top: 20,
            bottom: 20,
            left: 30,
            right: 25
        };

        // размеры контейнера
        var parentWidth = $chart.parent().width();

        var width = parentWidth - margin.left - margin.right;
        var height = 0.6 * width;

        var innerRadius = '';
        var outerRadius = '';

        if ($(window).width() == 768) {
            // внешний радиус
            innerRadius = height / 6;
            // внутренний радиус
            outerRadius = width / 4.5;
        } else {
            // внешний радиус
            innerRadius = height / 4.3;
            // внутренний радиус
            outerRadius = width / 3.8;
        }

        // главный контейнер
        var svg = d3.select('.js-chart--donut').append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // опредение цветов
        var colorScale = d3.scaleOrdinal().range(['rgb(119, 182, 231)', 'rgb(255, 217, 99)', 'rgb(151, 204, 100)', 'rgb(253, 90, 62)']);

        chart.init = function () {
            d3.json('js/data/data-status.json').then(function (data) {
                data.forEach(function (d) {
                    d.value = +d.value;
                });

                // определение значений
                var pieValue = function pieValue(d) {
                    return d.value;
                };
                // расстановка значений
                var pie = d3.pie().value(pieValue);
                // загрузка значений
                var pieData = pie(data);

                chart.createPie(pieData);
                // chart.createPieLegend();
                chart.createLegend(pieData);
            });
        };

        chart.createPie = function (data) {
            var pieSizing = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

            var pieContainer = svg.append('g').attr('transform', 'translate(' + (width - width / 3.8) + ',' + height / 2 + ')');

            pieContainer.selectAll('path').data(data).enter().append('path').attr('d', pieSizing).attr('fill', function (d) {
                return colorScale(d.value);
            });

            chart.createPieLegend(pieContainer);

            // значения внутри графика
            if ($(window).width() <= 1200) {
                pieContainer.selectAll('text').data(data).enter().append('text').each(function (d) {
                    var centroid = pieSizing.centroid(d);
                    d3.select(this).attr('x', centroid[0]).attr('y', centroid[1]).attr('dy', '5').attr('dx', '-7').attr('class', 'pieText').text(d.data.value);
                });
            }
        };

        chart.createPieLegend = function (pie) {
            if ($(window).width() > 1200) {
                var colorLabel = 'Сегодня';

                var colorLegendContainer = pie.append('g').attr('transform', 'translate(' + -innerRadius / 1.5 + ',4)');

                colorLegendContainer.append('text').attr('class', 'legend-label').attr('x', 0).attr('y', 0).text(colorLabel);
            }
        };

        chart.createLegend = function (data) {
            if ($(window).width() == 768) {
                var legend = svg.append('g').attr('class', 'legend').attr('height', 100).attr('width', 100).attr('transform', 'translate(0,' + height / 3.5 + ')');

                // маркеры
                legend.selectAll('.circleLegend').data(data).enter().append('svg:circle').attr('cx', 50).attr('cy', function (d, i) {
                    return i * height / 6;
                }).attr('transform', 'translate(0,-4)').attr('r', width / 80).attr('class', 'circleLegend').style('fill', function (d) {
                    return colorScale(d.data.value);
                });

                // название
                legend.selectAll('.textLegend').data(data).enter().append('text').text(function (d) {
                    return d.data.date;
                }).attr('x', 70).attr('y', function (d, i) {
                    return i * height / 6;
                }).attr('class', 'textLegend');
            } else {
                var _legend = svg.append('g').attr('class', 'legend').attr('height', 100).attr('width', 100).attr('transform', 'translate(0,' + height / 3.5 + ')');

                // маркеры
                _legend.selectAll('.circleLegend').data(data).enter().append('svg:circle').attr('cx', 0).attr('cy', function (d, i) {
                    return i * height / 6;
                }).attr('transform', 'translate(0,-4)').attr('r', width / 80).attr('class', 'circleLegend').style('fill', function (d) {
                    return colorScale(d.data.value);
                });

                // название
                _legend.selectAll('.textLegend').data(data).enter().append('text').text(function (d) {
                    return d.data.date;
                }).attr('x', 20).attr('y', function (d, i) {
                    return i * height / 6;
                }).attr('class', 'textLegend');

                if ($(window).width() > 1200) {
                    _legend.selectAll('.pieValue').data(data).enter().append('text').text(function (d) {
                        return d.data.value;
                    }).attr('x', 110).attr('y', function (d, i) {
                        return i * height / 6;
                    }).attr('class', 'pieValue');
                }
            }
        };

        return chart;
    }
}(jQuery);

if ($('.js-chart--stat').length) {
    DoubleAreaChart.init();
}
if ($('.js-chart--donut').length) {
    PieChart.init();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbC5qcyJdLCJuYW1lcyI6WyIkIiwibGVuZ3RoIiwic2xpZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJkYXRhIiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJ0ZXh0IiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJvbiIsInZhbHVlcyIsImhhbmRsZSIsInJlbW92ZUNsYXNzIiwicmVtb3ZlQXR0ciIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiX3RoaXMiLCJhZGQiLCJmaW5kIiwiZG9uZSIsImRlbCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJjc3MiLCJ0b2dnbGVDbGFzcyIsInByZXZlbnREZWZhdWx0IiwicGFyZW50IiwicGhvbmVDb25maXJtVGltZXIiLCJ0aW1lciIsImNvbnNvbGUiLCJsb2ciLCJ0aW0iLCJzZXRUaW1lb3V0IiwidCIsImludCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInRleHRhcmVhIiwiYXV0b3NpemUiLCJjdHJsS2V5IiwibWV0YUtleSIsImtleUNvZGUiLCJ2YWx1ZSIsInBhcmVudE5vZGUiLCJzdWJtaXQiLCJlbCIsImNoYXRCb2R5IiwiY2hhdEZvb3RlckhlaWdodCIsIm91dGVySGVpZ2h0Iiwic3R5bGUiLCJjc3NUZXh0Iiwic2Nyb2xsSGVpZ2h0IiwiYm90dG9tIiwib3ZlcmZsb3ciLCJ0aXRsZSIsIm1vZGFsIiwic2VhcmNoSW5wdXQiLCJoaW50IiwidmFsIiwid2luZG93Iiwid2lkdGgiLCIkcGFycmVudCIsImVuZCIsInNvcnRhYmxlIiwiY29ubmVjdFdpdGgiLCJjdXJzb3IiLCJ0b2xlcmFuY2UiLCJ1aSIsIml0ZW0iLCJzdG9wIiwiQ3JtIiwicmVxdWVzdCIsIndpZ2V0UmVwbGFjZUljb24iLCJkaXNhYmxlU2VsZWN0aW9uIiwidG9nZ2xlQ29udHJvbCIsIiRwYXJlbnQiLCIkd2lkZ2V0TGVmdCIsIiR3aWRnZXRSaWdodCIsIiR0aXRsZUxlZnQiLCIkdGl0bGVSaWdodCIsInJlbW92ZSIsImluaXQiLCJteU1hcCIsInltYXBzIiwiTWFwIiwiY2VudGVyIiwiem9vbSIsImJlaGF2aW9ycyIsImRpc2FibGUiLCJjb250cm9scyIsIm15UGluIiwiR2VvT2JqZWN0Q29sbGVjdGlvbiIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkltYWdlU2l6ZSIsImljb25JbWFnZU9mZnNldCIsIm15UGxhY2VtYXJrIiwiUGxhY2VtYXJrIiwiYmFsbG9vbkNvbnRlbnRIZWFkZXIiLCJiYWxsb29uQ29udGVudEJvZHkiLCJoaW50Q29udGVudCIsImdlb09iamVjdHMiLCJyZWFkeSIsImV2ZW50cyIsInNpbXBsZXNsaWRlciIsImZpZWxkRWRpdCIsIiRmaWVsZEVkaXQiLCJlYWNoIiwiJGZpZWxkRWRpdElucHV0IiwiJGZpZWxkRWRpdEJ0biIsIiRmaWVsZEVkaXRUZXh0IiwiZmllbGRFZGl0VGV4dCIsImhpZGUiLCJzaG93Iiwic2VsZWN0IiwiYmx1ciIsInRyaW0iLCJkZWZhdWx0VmFsdWUiLCJodG1sIiwia2V5cHJlc3MiLCJldmVudCIsIiRkYXRlcGlja2VyIiwiZGF0ZVRvZGF5IiwiRGF0ZSIsIiRidG5Ub2RheSIsIiRidG5QcmV2IiwiJGJ0bk5leHQiLCJ0eXBlIiwiYXR0ciIsIl9zZWxmIiwiY2hhbmdlVmFsIiwiZGF0ZXBpY2tlciIsImF1dG9DbG9zZSIsIm1pbkRhdGUiLCJvblNlbGVjdCIsImZvcm1hdHRlZERhdGUiLCJzZWxlY3REYXRlIiwic2hvd1dlZWsiLCJkYXRlIiwiaW5zdCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJjdXJyZW50RGF0ZSIsImdldERhdGUiLCJjdXJyZW50TW9udGgiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZ2V0RGF5IiwiZGF0ZUZvcm1hdCIsInNldElucHV0RGF0ZSIsInByZXYiLCJmb2N1cyIsIl9kYXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaG95IiwiZCIsIm0iLCJ5IiwiaSIsInVwZGF0ZURhdGFTY2hlZHVsZSIsImNybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcCIsInJ1RGF0ZXMiLCJnZXRXZWVrU2NoZWR1bGUiLCJ1cGRhdGVWYWxTY2hlZHVsZSIsInRvZ2dsZVNlbGVjdGVkIiwiZGF0ZVBpY2tlcklubGluZSIsImV2ZW50RGF0ZXMiLCJpbmxpbmUiLCJtdWx0aXBsZURhdGVzIiwib25SZW5kZXJDZWxsIiwiY2VsbFR5cGUiLCJpbmRleE9mIiwiY2xhc3NlcyIsImNybVNjaGVkdWxlRGF0ZUZpZWxkVG9wIiwiZ2V0IiwiY3VyciIsImN1cnJEYXkiLCJjdXJyTW9udGgiLCJtb25kYXkiLCJzdW5kYXkiLCJnZXRSaWdodFdlZWtUZXh0IiwiY3VyckRhdGUiLCJtb250aCIsImZpcnN0RGF5IiwibGFzdERheSIsInBhcmFtcyIsIm9EYXlGIiwib0RheUwiLCJvTW9udGhGIiwib01vbnRoTCIsIm9ZZWFyRiIsIm9ZZWFyTCIsImFyckRhdGEiLCJGb3JtRGF0YSIsInRlbXAiLCJuZXdNb250aCIsInNldERhdGUiLCJ0b0xvY2FsZVN0cmluZyIsInJlcGxhY2UiLCJhcHBlbmQiLCJDYWxlbmRhciIsIiRjYWxlbmRhciIsImNhbGVuZGFyIiwiaGVpZ2h0cyIsInRpbWVTdGVwIiwiYXJyRW1wbG95ZWVzIiwiYXZhdGFyIiwibmFtZSIsIm1hcCIsInB1c2giLCJrZXkiLCJsYWJlbCIsInNjaGVkdWxlciIsInh5Iiwic2NhbGVfaGVpZ2h0IiwibmF2X2hlaWdodCIsImNvbmZpZyIsIm11bHRpX2RheSIsInhtbF9kYXRlIiwidG9vbHRpcCIsIm1hcmtfbm93IiwibG9jYWxlIiwibGFiZWxzIiwidW5pdF90YWIiLCJzZWN0aW9uX2N1c3RvbSIsImZpcnN0X2hvdXIiLCJsaW1pdF90aW1lX3NlbGVjdCIsImRldGFpbHNfb25fY3JlYXRlIiwiY3JlYXRlVW5pdHNWaWV3IiwicHJvcGVydHkiLCJsaXN0IiwiYWRkTWFya2VkVGltZXNwYW4iLCJzdGFydF9kYXRlIiwiZW5kX2RhdGUiLCJzZWN0aW9ucyIsInRpbWVsaW5lIiwidW5pdCIsInN0YXR1c0luaXQiLCJ0aW1lU3BhbiIsImZpeF9kYXRlIiwibWFya2VkX2RhdGUiLCJtYXJrZWQiLCJldmVudF9zdGVwIiwiYXR0YWNoRXZlbnQiLCJldmVudF9pZCIsIm5hdGl2ZV9ldmVudCIsImdldEFjdGlvbkRhdGEiLCJmaXhlZF9kYXRlIiwidW5tYXJrVGltZXNwYW4iLCJtYXJrVGltZXNwYW4iLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJ0ZW1wbGF0ZXMiLCJldmVudF9jbGFzcyIsImV2VHlwZSIsImdldExhYmVsIiwidG9Mb3dlckNhc2UiLCJhcnJheSIsInNlY3Rpb25fZXZUeXBlIiwibGlnaHRib3giLCJoZWlnaHQiLCJvcHRpb25zIiwibWFwX3RvIiwiZGh0bWxYVG9vbHRpcCIsImNsYXNzTmFtZSIsImZvcm1hdCIsImRhdGVfdG9fc3RyIiwidG9vbHRpcF90ZXh0Iiwic2hvd01pbmljYWwiLCJpc0NhbGVuZGFyVmlzaWJsZSIsImRlc3Ryb3lDYWxlbmRhciIsInJlbmRlckNhbGVuZGFyIiwicG9zaXRpb24iLCJfZGF0ZSIsIm5hdmlnYXRpb24iLCJoYW5kbGVyIiwic2V0Q3VycmVudFZpZXciLCJzdGVwIiwiaG91cl9zaXplX3B4IiwiaG91cl9zY2FsZSIsImhlYWRlckhlaWdodCIsInRvcExpbmVIZWlnaHQiLCJtZW51SGVpZ2h0IiwicmVzdWx0SGVpZ2h0IiwiY3VzdG9uRXZlbnQiLCJqUXVlcnkiLCIkZGF5UGlja2VyIiwiYWN0aXZlQ2xhc3MiLCJkaXNhYmxlQ2xhc3MiLCJuZXdEYXRlIiwibW9udGhEYXlzIiwibW9udGhzIiwiY291bnRlciIsInJlbmRlciIsInRvZGF5V2VlayIsIiRpdGVtIiwiJGFycm93UiIsIiRhcnJvd0wiLCJzdG9wUHJvcGFnYXRpb24iLCJtb250aE5hbWVOZXh0IiwibmV4dFdlZWsiLCJ3ZWVrQ2hlY2siLCJkYXRhU2V0IiwibW9udGhOYW1lUHJldiIsInByZXZXZWVrIiwiYmxvY2tBcnJvdyIsIndlZWtEYXlBcnIiLCIkbW9udGgiLCIkeWVhciIsIiR3ZWVrRGVzYyIsIm5vd1dlZWtEYXlOdW0iLCJub3dNb250aERheSIsIm5vd01vbnRoIiwibm93WWVhciIsIndlZWtEYXkiLCJlcSIsImluc2VydExlZnRTaWRlIiwiaW5zZXJ0UmlnaHRTaWRlIiwid2Vla0RheUxhc3QiLCJtb250aE51bSIsIndlZWtEYXlGaXJzdCIsIm1vbnRoUHJldiIsInByZXZNb250aERheSIsInByZXZXZWVrRGF5IiwidGhpc01vbnRoIiwidGhpc01vbnRoTnVtIiwieWVhck51bSIsInllYXIiLCJudW0iLCJPcmRlciIsIm9yZGVyIiwiJGh0bWwiLCIkdGltZVBpY2tlckl0ZW0iLCJub3QiLCIkb3JkZXJUaW1lIiwiJG9yZGVyVGl0bGUiLCIkb3JkZXJEZXRhaWwiLCIkb3JkZXJCdG5CYWNrIiwiJG9yZGVyQnRuRWRpdCIsIiR1c2VySW5mb05vdGUiLCIkdXNlckNhcnRCdG4iLCIkdXNlckluZm9Cb3R0b20iLCIkdXNlckluZm9Ub3AiLCJoaWRkZW5DbGFzcyIsImZsYWciLCJzZWxlY3RUaW1lIiwic2VsZWN0TWFzdGVyIiwiZml4ZWRCbG9jayIsInNlbGVjdFRpbWVNb2JpbGUiLCJjbGlja09uQnRuQmFjayIsIiRjbG9uZSIsImluc2VydEFmdGVyIiwiZml4ZWRCbG9ja09mZnNldCIsIm9mZnNldCIsInRvcCIsInNjcm9sbCIsInNjcm9sbFRvcCIsIl9yZW1vdmVDbGFzcyIsIiRtYXN0ZXJJdGVtIiwiRG91YmxlQXJlYUNoYXJ0IiwiJGNoYXJ0IiwiY2hhcnQiLCJtYXJnaW4iLCJsZWZ0IiwicmlnaHQiLCJsZWdlbmRBcnJheSIsImNvbG9yQXJyYXkiLCJwYXJlbnRXaWR0aCIsIngiLCJkMyIsInNjYWxlVGltZSIsInNjYWxlTGluZWFyIiwic3ZnIiwiY29sb3JTY2FsZUdyYWRpZW50Iiwic2NhbGVPcmRpbmFsIiwiZG9tYWluIiwiY29sb3JTY2FsZU9wYXF1ZSIsImpzb24iLCJ0aGVuIiwiZm9yRWFjaCIsInZhbHVlXzEiLCJ2YWx1ZV8yIiwia2V5cyIsInNwbGljZSIsImlkIiwic291cmNlIiwiZXh0ZW50IiwiYyIsImNyZWF0ZUxlZnRBeGlzIiwiY3JlYXRlQm90dG9tQXhpcyIsImNyZWF0ZUFyZWEiLCJjcmVhdGVWYWx1ZUxpbmUiLCJjcmVhdGVDaXJjbGUiLCJncmFkaWVudHMiLCJsZWdlbmRzIiwiYW5jaG9yIiwiaW5mbyIsInlBeGlzIiwiYXhpc0xlZnQiLCJ0aWNrRm9ybWF0IiwiY2FsbCIsInhBeGlzIiwiYXhpc0JvdHRvbSIsInRpY2tzIiwidGltZUZvcm1hdCIsImFyZWEiLCJjdXJ2ZSIsImN1cnZlQ2F0bXVsbFJvbSIsInkwIiwieTEiLCJhcmVhU291cmNlIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJ2YWx1ZWxpbmUiLCJsaW5lIiwidmFsdWVTb3VyY2UiLCJjaXJjbGUxIiwiY2lyY2xlMiIsImNpcmNsZVIiLCJjb2xvciIsImdyYWRpZW50IiwibGVnZW5kIiwicG9wdXAiLCJyZXN1bHQiLCJ0aWNrWCIsInZhbDEiLCJ2YWwyIiwibW91c2VZIiwicGFnZVkiLCJtb3VzZVgiLCJwYWdlWCIsImZhZGVJbiIsIlBpZUNoYXJ0IiwiaW5uZXJSYWRpdXMiLCJvdXRlclJhZGl1cyIsImNvbG9yU2NhbGUiLCJwaWVWYWx1ZSIsInBpZSIsInBpZURhdGEiLCJjcmVhdGVQaWUiLCJjcmVhdGVMZWdlbmQiLCJwaWVTaXppbmciLCJhcmMiLCJwaWVDb250YWluZXIiLCJjcmVhdGVQaWVMZWdlbmQiLCJjZW50cm9pZCIsImNvbG9yTGFiZWwiLCJjb2xvckxlZ2VuZENvbnRhaW5lciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFJQSxFQUFFLDZCQUFGLEVBQWlDQyxNQUFyQyxFQUE2QztBQUN6QyxRQUFJQyxTQUFTQyxTQUFTQyxjQUFULENBQXdCLDBCQUF4QixDQUFiO0FBQ0EsUUFBSUMsZ0JBQWdCTCxFQUFFLDJCQUFGLEVBQStCTSxJQUEvQixDQUFvQyxPQUFwQyxDQUFwQjtBQUNBLFFBQUlDLGNBQWNQLEVBQUUsMkJBQUYsRUFBK0JNLElBQS9CLENBQW9DLEtBQXBDLENBQWxCO0FBQ0EsUUFBSUUsUUFBUSxDQUFDUixFQUFFLGVBQUYsQ0FBRCxFQUFxQkEsRUFBRSxhQUFGLENBQXJCLENBQVo7QUFDQSxRQUFJUyxVQUFKO0FBQ0EsUUFBSUMsUUFBSjtBQUNBLFFBQUlDLFNBQUo7QUFDQSxRQUFJQyxJQUFKOztBQUVBLFFBQUlKLE1BQU0sQ0FBTixFQUFTSyxJQUFULE1BQW1CLEVBQXZCLEVBQTJCO0FBQ3ZCSixxQkFBYUosYUFBYjtBQUNILEtBRkQsTUFFTztBQUNISSxxQkFBYUssU0FBU04sTUFBTSxDQUFOLEVBQVNLLElBQVQsRUFBVCxDQUFiO0FBQ0g7O0FBRUQsUUFBSUwsTUFBTSxDQUFOLEVBQVNLLElBQVQsTUFBbUIsRUFBdkIsRUFBMkI7QUFDdkJILG1CQUFXSCxXQUFYO0FBQ0gsS0FGRCxNQUVPO0FBQ0hHLG1CQUFXSSxTQUFTTixNQUFNLENBQU4sRUFBU0ssSUFBVCxFQUFULENBQVg7QUFDSDs7QUFFREUsZUFBV0MsTUFBWCxDQUFrQmQsTUFBbEIsRUFBMEI7QUFDdEJlLGVBQU8sQ0FBQ1IsVUFBRCxFQUFhQyxRQUFiLENBRGU7QUFFdEJRLGlCQUFTLElBRmE7QUFHdEJDLGVBQU87QUFDSEMsaUJBQUtmLGFBREY7QUFFSGdCLGlCQUFLZDtBQUZGO0FBSGUsS0FBMUI7QUFRQUwsV0FBT2EsVUFBUCxDQUFrQk8sRUFBbEIsQ0FBcUIsUUFBckIsRUFBK0IsVUFBU0MsTUFBVCxFQUFpQkMsTUFBakIsRUFBeUI7QUFDcERoQixjQUFNZ0IsTUFBTixFQUFjWCxJQUFkLENBQW1CQyxTQUFTUyxPQUFPQyxNQUFQLENBQVQsQ0FBbkI7QUFDSCxLQUZEO0FBR0g7O0FBRUR4QixFQUFFLDJCQUFGLEVBQStCc0IsRUFBL0IsQ0FBa0MsT0FBbEMsRUFBMkMsWUFBVztBQUNsRHRCLE1BQUUsaUJBQUYsRUFBcUJ5QixXQUFyQixDQUFpQyxTQUFqQztBQUNBekIsTUFBRSxNQUFGLEVBQVUwQixVQUFWLENBQXFCLE9BQXJCOztBQUVBLFdBQU8sS0FBUDtBQUNILENBTEQ7O0FBT0ExQixFQUFFLHdCQUFGLEVBQTRCc0IsRUFBNUIsQ0FBK0IsT0FBL0IsRUFBd0MsVUFBU0ssQ0FBVCxFQUFZO0FBQ2hELFFBQ0kzQixFQUFFMkIsRUFBRUMsTUFBSixFQUFZQyxPQUFaLENBQ0ksMkZBREosRUFFRTVCLE1BSE4sRUFJRTtBQUNFO0FBQ0gsS0FORCxNQU1PO0FBQ0gsWUFBSTZCLFFBQVE5QixFQUFFLElBQUYsQ0FBWjtBQUNBLFlBQUkrQixNQUFNRCxNQUFNRSxJQUFOLENBQVcsaUNBQVgsQ0FBVjtBQUNBLFlBQUlDLE9BQU9ILE1BQU1FLElBQU4sQ0FBVyxrQ0FBWCxDQUFYO0FBQ0EsWUFBSUUsTUFBTUosTUFBTUUsSUFBTixDQUFXLGlDQUFYLENBQVY7O0FBRUEsWUFBSUYsTUFBTUssUUFBTixDQUFlLFdBQWYsQ0FBSixFQUFpQztBQUM3Qkwsa0JBQU1MLFdBQU4sQ0FBa0IsV0FBbEI7QUFDQU0sZ0JBQUlMLFVBQUosQ0FBZSxPQUFmO0FBQ0FPLGlCQUFLUCxVQUFMLENBQWdCLE9BQWhCO0FBQ0gsU0FKRCxNQUlPO0FBQ0hJLGtCQUFNTSxRQUFOLENBQWUsV0FBZjtBQUNBTCxnQkFBSU0sR0FBSixDQUFRLFNBQVIsRUFBbUIsTUFBbkI7QUFDQUosaUJBQUtJLEdBQUwsQ0FBUyxTQUFULEVBQW9CLE9BQXBCO0FBQ0g7QUFDSjtBQUNKLENBdkJEOztBQXlCQTtBQUNBckMsRUFBRUcsUUFBRixFQUFZbUIsRUFBWixDQUFlLE9BQWYsRUFBd0IsYUFBeEIsRUFBdUMsVUFBU0ssQ0FBVCxFQUFZO0FBQy9DM0IsTUFBRSxJQUFGLEVBQVFzQyxXQUFSLENBQW9CLFlBQXBCO0FBQ0FYLE1BQUVZLGNBQUY7QUFDSCxDQUhEOztBQUtBO0FBQ0F2QyxFQUFFLG1CQUFGLEVBQXVCc0IsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBU0ssQ0FBVCxFQUFZO0FBQzNDM0IsTUFBRSxJQUFGLEVBQ0t3QyxNQURMLENBQ1ksd0JBRFosRUFFS0gsR0FGTCxDQUVTLFNBRlQsRUFFb0IsTUFGcEIsRUFHS1IsT0FITCxDQUdhLGFBSGIsRUFJS0csSUFKTCxDQUlVLGtDQUpWLEVBS0tOLFVBTEwsQ0FLZ0IsT0FMaEI7QUFNQWU7QUFDSCxDQVJEOztBQVVBLFNBQVNBLGlCQUFULEdBQTZCO0FBQ3pCLFFBQUlDLFFBQVExQyxFQUFFLFdBQUYsQ0FBWjtBQUNBMkMsWUFBUUMsR0FBUixDQUFZRixNQUFNcEMsSUFBTixDQUFXLE9BQVgsQ0FBWjtBQUNBLFFBQUl1QyxNQUFNLFNBQU5BLEdBQU0sR0FBVztBQUNqQkMsbUJBQVcsWUFBVztBQUNsQixnQkFBSUMsSUFBSUwsTUFBTXBDLElBQU4sQ0FBVyxPQUFYLENBQVI7QUFDQW9DLGtCQUFNN0IsSUFBTixDQUFXa0MsQ0FBWDtBQUNBSixvQkFBUUMsR0FBUixDQUFZRyxDQUFaO0FBQ0EsZ0JBQUlDLE1BQU1DLFlBQVksWUFBVztBQUM3QkY7QUFDQSxvQkFBSUEsS0FBSyxDQUFDLENBQVYsRUFBYTtBQUNURyxrQ0FBY0YsR0FBZDtBQUNBTiwwQkFBTUYsTUFBTixHQUFlSCxHQUFmLENBQW1CLFNBQW5CLEVBQThCLE1BQTlCO0FBQ0FyQyxzQkFBRSxtQkFBRixFQUNLd0MsTUFETCxDQUNZLHdCQURaLEVBRUtkLFVBRkwsQ0FFZ0IsT0FGaEI7QUFHSCxpQkFORCxNQU1PO0FBQ0hnQiwwQkFBTTdCLElBQU4sQ0FBV2tDLENBQVg7QUFDSDtBQUNKLGFBWFMsRUFXUCxJQVhPLENBQVY7QUFZQS9DLGNBQUUsbUJBQUYsRUFBdUJzQixFQUF2QixDQUEwQixPQUExQixFQUFtQyxVQUFTSyxDQUFULEVBQVk7QUFDM0N1Qiw4QkFBY0YsR0FBZDtBQUNBSDtBQUNILGFBSEQ7QUFJSCxTQXBCRDtBQXFCSCxLQXRCRDtBQXVCQUE7QUFDSDs7QUFFRDtBQUNBLElBQUk3QyxFQUFFLGNBQUYsRUFBa0JDLE1BQXRCLEVBQThCO0FBQzFCLFFBQUlrRCxXQUFXbkQsRUFBRSxjQUFGLENBQWY7QUFDQW1ELGFBQVM3QixFQUFULENBQVksU0FBWixFQUF1QjhCLFFBQXZCOztBQUVBRCxhQUFTN0IsRUFBVCxDQUFZLFNBQVosRUFBdUIsVUFBU0ssQ0FBVCxFQUFZO0FBQy9CLFlBQ0ksQ0FBQ0EsRUFBRTBCLE9BQUYsSUFBYTFCLEVBQUUyQixPQUFoQixNQUNDM0IsRUFBRTRCLE9BQUYsS0FBYyxFQUFkLElBQW9CNUIsRUFBRTRCLE9BQUYsS0FBYyxFQURuQyxDQURKLEVBR0U7QUFDRUoscUJBQVNLLEtBQVQsSUFBa0IsTUFBbEI7QUFDSCxTQUxELE1BS08sSUFBSTdCLEVBQUU0QixPQUFGLEtBQWMsRUFBZCxJQUFvQjVCLEVBQUU0QixPQUFGLEtBQWMsRUFBdEMsRUFBMEM7QUFDN0MsaUJBQUtFLFVBQUwsQ0FBZ0JDLE1BQWhCO0FBQ0EvQixjQUFFWSxjQUFGO0FBQ0g7QUFDSixLQVZEO0FBV0g7O0FBRUQsU0FBU2EsUUFBVCxHQUFvQjtBQUNoQixRQUFJTyxLQUFLLElBQVQ7QUFDQSxRQUFJQyxXQUFXNUQsRUFBRSxhQUFGLENBQWY7QUFDQSxRQUFJNkQsbUJBQW1CN0QsRUFBRSxlQUFGLEVBQW1COEQsV0FBbkIsRUFBdkI7QUFDQWhCLGVBQVcsWUFBVztBQUNsQmEsV0FBR0ksS0FBSCxDQUFTQyxPQUFULEdBQW1CLGFBQW5CO0FBQ0FMLFdBQUdJLEtBQUgsQ0FBU0MsT0FBVCxHQUFtQixZQUFZTCxHQUFHTSxZQUFmLEdBQThCLElBQWpEO0FBQ0FMLGlCQUFTdkIsR0FBVCxDQUFhO0FBQ1Q2QixvQkFBUSxLQUFLUCxHQUFHTSxZQUFSLEdBQXVCO0FBRHRCLFNBQWI7QUFHQSxZQUFJTixHQUFHTSxZQUFILElBQW1CLEdBQXZCLEVBQTRCO0FBQ3hCTixlQUFHSSxLQUFILENBQVNJLFFBQVQsR0FBb0IsTUFBcEI7QUFDQVAscUJBQVN2QixHQUFULENBQWE7QUFDVDZCLHdCQUFRTCxtQkFBbUI7QUFEbEIsYUFBYjtBQUdIO0FBQ0osS0FaRCxFQVlHLENBWkg7QUFhSDs7QUFFRDdELEVBQUUsc0JBQUYsRUFBMEJzQixFQUExQixDQUE2QixPQUE3QixFQUFzQyxZQUFXO0FBQzdDLFFBQUk4QyxRQUFRcEUsRUFBRSxJQUFGLEVBQVFNLElBQVIsQ0FBYSxPQUFiLENBQVo7QUFDQSxRQUFJTixFQUFFLElBQUYsRUFBUW1DLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSixFQUFvQztBQUNoQ25DLFVBQUUsbUJBQUYsRUFBdUJxRSxLQUF2QixDQUE2QixNQUE3QjtBQUNBckUsVUFBRSwrQkFBRixFQUFtQ2EsSUFBbkMsQ0FBd0N1RCxLQUF4QztBQUNILEtBSEQsTUFHTztBQUNIcEUsVUFBRSxJQUFGLEVBQVFvQyxRQUFSLENBQWlCLFlBQWpCO0FBQ0g7QUFDSixDQVJEOztBQVVBO0FBQ0EsSUFBSXBDLEVBQUUsa0JBQUYsRUFBc0JDLE1BQTFCLEVBQWtDO0FBQzlCLFFBQUlxRSxjQUFjdEUsRUFBRSxrQkFBRixDQUFsQjtBQUNBc0UsZ0JBQ0toRCxFQURMLENBQ1EsT0FEUixFQUNpQixZQUFXO0FBQ3BCLFlBQUlpRCxPQUFPdkUsRUFBRSxJQUFGLEVBQ042QixPQURNLENBQ0UsWUFERixFQUVORyxJQUZNLENBRUQsZUFGQyxDQUFYO0FBR0EsWUFBSWhDLEVBQUUsSUFBRixFQUFRd0UsR0FBUixNQUFpQixFQUFyQixFQUF5QjtBQUNyQkQsaUJBQUs3QyxVQUFMLENBQWdCLE9BQWhCO0FBQ0gsU0FGRCxNQUVPO0FBQ0g2QyxpQkFBS2xDLEdBQUwsQ0FBUyxTQUFULEVBQW9CLE1BQXBCO0FBQ0g7QUFDSixLQVZMLEVBV0tmLEVBWEwsQ0FXUSxPQVhSLEVBV2lCLFlBQVc7QUFDcEIsWUFBSWlELE9BQU92RSxFQUFFLElBQUYsRUFDTjZCLE9BRE0sQ0FDRSxZQURGLEVBRU5HLElBRk0sQ0FFRCxlQUZDLENBQVg7QUFHQSxZQUFJaEMsRUFBRSxJQUFGLEVBQVF3RSxHQUFSLE1BQWlCLEVBQXJCLEVBQXlCO0FBQ3JCRCxpQkFBSzdDLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDSDtBQUNKLEtBbEJMLEVBbUJLSixFQW5CTCxDQW1CUSxNQW5CUixFQW1CZ0IsWUFBVztBQUNuQixZQUFJaUQsT0FBT3ZFLEVBQUUsSUFBRixFQUNONkIsT0FETSxDQUNFLFlBREYsRUFFTkcsSUFGTSxDQUVELGVBRkMsQ0FBWDs7QUFJQSxZQUFJaEMsRUFBRXlFLE1BQUYsRUFBVUMsS0FBVixLQUFvQixHQUF4QixFQUE2QjtBQUN6QixnQkFBSTFFLEVBQUUsSUFBRixFQUFRd0UsR0FBUixNQUFpQixFQUFyQixFQUF5QjtBQUNyQkQscUJBQUtsQyxHQUFMLENBQVMsU0FBVCxFQUFvQixNQUFwQjtBQUNIO0FBQ0o7QUFDSixLQTdCTDtBQThCSDs7QUFFRDtBQUNBckMsRUFBRUcsUUFBRixFQUFZbUIsRUFBWixDQUFlLGdCQUFmLEVBQWlDLHNCQUFqQyxFQUF5RCxZQUFXO0FBQ2hFLFFBQUlxRCxXQUFXM0UsRUFBRSxJQUFGLEVBQVE2QixPQUFSLENBQWdCLHFCQUFoQixDQUFmO0FBQ0E4QyxhQUNLM0MsSUFETCxDQUNVLDZCQURWLEVBRUtBLElBRkwsQ0FFVSxpQkFGVixFQUdLSSxRQUhMLENBR2MsV0FIZCxFQUlLd0MsR0FKTCxHQUtLNUMsSUFMTCxDQUtVLDJCQUxWLEVBTUtQLFdBTkwsQ0FNaUIsV0FOakI7QUFPSCxDQVREOztBQVdBO0FBQ0F6QixFQUFFLGNBQUYsRUFDSzZFLFFBREwsQ0FDYztBQUNOQyxpQkFBYSxjQURQO0FBRU5DLFlBQVEsTUFGRjtBQUdOQyxlQUFXLFNBSEw7QUFJTi9ELFdBQU8sZUFBU1UsQ0FBVCxFQUFZc0QsRUFBWixFQUFnQjtBQUNuQkEsV0FBR0MsSUFBSCxDQUFROUMsUUFBUixDQUFpQixXQUFqQjtBQUNILEtBTks7QUFPTitDLFVBQU0sY0FBU3hELENBQVQsRUFBWXNELEVBQVosRUFBZ0I7QUFDbEJBLFdBQUdDLElBQUgsQ0FBUXpELFdBQVIsQ0FBb0IsV0FBcEI7QUFDQXdELFdBQUdDLElBQUgsQ0FBUXpELFdBQVIsQ0FBb0IsbUJBQXBCO0FBQ0EyRCxZQUFJQyxPQUFKLENBQVlDLGdCQUFaLENBQTZCTCxHQUFHQyxJQUFoQztBQUNIO0FBWEssQ0FEZCxFQWNLSyxnQkFkTDs7QUFnQkE7QUFDQSxTQUFTQyxhQUFULEdBQXlCO0FBQ3JCeEYsTUFBRUcsUUFBRixFQUFZbUIsRUFBWixDQUFlLE9BQWYsRUFBd0IsdUJBQXhCLEVBQWlELFlBQVc7QUFDeEQsWUFBSW1FLFVBQVV6RixFQUFFLElBQUYsRUFBUTZCLE9BQVIsQ0FBZ0IsbUJBQWhCLENBQWQ7QUFDQSxZQUFJNkQsY0FBY0QsUUFBUXpELElBQVIsQ0FBYSxlQUFiLENBQWxCO0FBQ0EsWUFBSTJELGVBQWVGLFFBQVF6RCxJQUFSLENBQWEsZ0JBQWIsQ0FBbkI7QUFDQSxZQUFJNEQsYUFBYUgsUUFBUXpELElBQVIsQ0FBYSwyQkFBYixDQUFqQjtBQUNBLFlBQUk2RCxjQUFjSixRQUFRekQsSUFBUixDQUFhLDRCQUFiLENBQWxCOztBQUVBLFlBQUloQyxFQUFFLElBQUYsRUFBUW1DLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSixFQUFvQztBQUNoQzJELG1CQUFPSCxZQUFQO0FBQ0E1RCxnQkFBSTJELFdBQUo7QUFDQUUsdUJBQVd4RCxRQUFYLENBQW9CLFlBQXBCO0FBQ0F5RCx3QkFBWXBFLFdBQVosQ0FBd0IsWUFBeEI7QUFDSCxTQUxELE1BS087QUFDSHFFLG1CQUFPSixXQUFQO0FBQ0EzRCxnQkFBSTRELFlBQUo7QUFDQUMsdUJBQVduRSxXQUFYLENBQXVCLFlBQXZCO0FBQ0FvRSx3QkFBWXpELFFBQVosQ0FBcUIsWUFBckI7QUFDSDtBQUNKLEtBbEJEOztBQW9CQSxhQUFTTCxHQUFULENBQWE0QixFQUFiLEVBQWlCO0FBQ2JBLFdBQUczQixJQUFILENBQVEsYUFBUixFQUNLSSxRQURMLENBQ2MscUJBRGQsRUFFS0osSUFGTCxDQUVVLGFBRlYsRUFHS1AsV0FITCxDQUdpQixLQUhqQixFQUlLVyxRQUpMLENBSWMsS0FKZDtBQUtIOztBQUVELGFBQVMwRCxNQUFULENBQWdCbkMsRUFBaEIsRUFBb0I7QUFDaEJBLFdBQUczQixJQUFILENBQVEsYUFBUixFQUNLUCxXQURMLENBQ2lCLHFCQURqQixFQUVLTyxJQUZMLENBRVUsYUFGVixFQUdLUCxXQUhMLENBR2lCLEtBSGpCLEVBSUtXLFFBSkwsQ0FJYyxLQUpkO0FBS0g7QUFDSjtBQUNEb0Q7O0FBRUE7QUFDQSxJQUFJeEYsRUFBRSxXQUFGLEVBQWVDLE1BQW5CLEVBQTJCO0FBQUEsUUFJZDhGLElBSmMsR0FJdkIsU0FBU0EsSUFBVCxHQUFnQjtBQUNaQyxnQkFBUSxJQUFJQyxNQUFNQyxHQUFWLENBQWMsVUFBZCxFQUEwQjtBQUM5QkMsb0JBQVEsQ0FBQyxXQUFELEVBQWMsVUFBZCxDQURzQjtBQUU5QkMsa0JBQU07QUFGd0IsU0FBMUIsQ0FBUjs7QUFLQUosY0FBTUssU0FBTixDQUFnQkMsT0FBaEIsQ0FBd0IsQ0FBQyxZQUFELENBQXhCOztBQUVBTixjQUFNTyxRQUFOLENBQ0tULE1BREwsQ0FDWSxlQURaLEVBRUtBLE1BRkwsQ0FFWSxjQUZaLEVBR0svRCxHQUhMLENBR1MsYUFIVDs7QUFLQXlFLGdCQUFRLElBQUlQLE1BQU1RLG1CQUFWLENBQ0osRUFESSxFQUVKO0FBQ0lDLHdCQUFZLGVBRGhCO0FBRUlDLDJCQUFlLDJCQUZuQjtBQUdJQywyQkFBZSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBSG5CO0FBSUlDLDZCQUFpQixDQUFDLENBQUMsQ0FBRixFQUFLLENBQUMsRUFBTjtBQUpyQixTQUZJLENBQVI7O0FBVUFDLHNCQUFjLElBQUliLE1BQU1jLFNBQVYsQ0FBb0IsQ0FBQyxXQUFELEVBQWMsVUFBZCxDQUFwQixFQUErQztBQUN6REMsa0NBQ0ksb0RBRnFEO0FBR3pEQyxnQ0FDSSxtbkJBSnFEO0FBS3pEQyx5QkFDSTtBQU5xRCxTQUEvQyxDQUFkOztBQVNBVixjQUFNekUsR0FBTixDQUFVK0UsV0FBVjtBQUNBZCxjQUFNbUIsVUFBTixDQUFpQnBGLEdBQWpCLENBQXFCeUUsS0FBckI7QUFDSCxLQXRDc0I7O0FBQ3ZCUCxVQUFNbUIsS0FBTixDQUFZckIsSUFBWjtBQUNBLFFBQUlDLEtBQUosRUFBV2MsV0FBWCxFQUF3Qk4sS0FBeEI7QUFxQ0g7O0FBRUQ7QUFDQSxJQUFJeEcsRUFBRSxjQUFGLEVBQWtCQyxNQUF0QixFQUE4QjtBQUFBLFFBSWpCOEYsS0FKaUIsR0FJMUIsU0FBU0EsS0FBVCxHQUFnQjtBQUNaQyxnQkFBUSxJQUFJQyxNQUFNQyxHQUFWLENBQWMsYUFBZCxFQUE2QjtBQUNqQ0Msb0JBQVEsQ0FBQyxXQUFELEVBQWMsVUFBZCxDQUR5QjtBQUVqQ0Msa0JBQU07QUFGMkIsU0FBN0IsQ0FBUjs7QUFLQUosY0FBTUssU0FBTixDQUFnQkMsT0FBaEIsQ0FBd0IsQ0FBQyxZQUFELENBQXhCOztBQUVBTixjQUFNTyxRQUFOLENBQ0tULE1BREwsQ0FDWSxlQURaLEVBRUtBLE1BRkwsQ0FFWSxjQUZaLEVBR0svRCxHQUhMLENBR1MsYUFIVDs7QUFLQXlFLGdCQUFRLElBQUlQLE1BQU1RLG1CQUFWLENBQ0osRUFESSxFQUVKO0FBQ0lDLHdCQUFZLGVBRGhCO0FBRUlDLDJCQUFlLDJCQUZuQjtBQUdJQywyQkFBZSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBSG5CO0FBSUlDLDZCQUFpQixDQUFDLENBQUMsQ0FBRixFQUFLLENBQUMsRUFBTjtBQUpyQixTQUZJLENBQVI7O0FBVUFDLHNCQUFjLElBQUliLE1BQU1jLFNBQVYsQ0FBb0IsQ0FBQyxXQUFELEVBQWMsVUFBZCxDQUFwQixDQUFkOztBQUVBUCxjQUFNekUsR0FBTixDQUFVK0UsV0FBVjtBQUNBZCxjQUFNbUIsVUFBTixDQUFpQnBGLEdBQWpCLENBQXFCeUUsS0FBckI7QUFDSCxLQS9CeUI7O0FBQzFCUCxVQUFNbUIsS0FBTixDQUFZckIsS0FBWjtBQUNBLFFBQUlDLEtBQUosRUFBV2MsV0FBWCxFQUF3Qk4sS0FBeEI7QUE4Qkg7O0FBRUQ7QUFDQSxJQUFJeEcsRUFBRSxvQkFBRixFQUF3QkMsTUFBNUIsRUFBb0M7QUFBQSxRQUl2QjhGLE1BSnVCLEdBSWhDLFNBQVNBLE1BQVQsR0FBZ0I7QUFDWkMsZ0JBQVEsSUFBSUMsTUFBTUMsR0FBVixDQUFjLGFBQWQsRUFBNkI7QUFDakNDLG9CQUFRLENBQUMsV0FBRCxFQUFjLFVBQWQsQ0FEeUI7QUFFakNDLGtCQUFNO0FBRjJCLFNBQTdCLENBQVI7O0FBS0FKLGNBQU1LLFNBQU4sQ0FBZ0JDLE9BQWhCLENBQXdCLENBQUMsWUFBRCxDQUF4Qjs7QUFFQU4sY0FBTU8sUUFBTixDQUNLVCxNQURMLENBQ1ksZUFEWixFQUVLQSxNQUZMLENBRVksY0FGWixFQUdLL0QsR0FITCxDQUdTLGFBSFQ7O0FBS0F5RSxnQkFBUSxJQUFJUCxNQUFNUSxtQkFBVixDQUNKLEVBREksRUFFSjtBQUNJQyx3QkFBWSxlQURoQjtBQUVJQywyQkFBZSwyQkFGbkI7QUFHSUMsMkJBQWUsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUhuQjtBQUlJQyw2QkFBaUIsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFDLEVBQU47QUFKckIsU0FGSSxDQUFSOztBQVVBQyxzQkFBYyxJQUFJYixNQUFNYyxTQUFWLENBQW9CLENBQUMsV0FBRCxFQUFjLFVBQWQsQ0FBcEIsRUFBK0M7QUFDekRDLGtDQUNJLHNJQUZxRDtBQUd6REMsZ0NBQ0k7QUFDSjtBQUNBO0FBTnlELFNBQS9DLENBQWQ7O0FBU0FqQixjQUFNcUIsTUFBTixDQUFhdEYsR0FBYixDQUFpQixPQUFqQixFQUEwQixZQUFXLENBQUUsQ0FBdkM7O0FBRUErRSxvQkFBWU8sTUFBWixDQUFtQnRGLEdBQW5CLENBQXVCLE9BQXZCLEVBQWdDLFlBQVc7QUFDdkMvQixjQUFFLG1CQUFGLEVBQXVCc0gsWUFBdkI7QUFDQTNFLG9CQUFRQyxHQUFSLENBQVksS0FBWixFQUFtQixjQUFuQjtBQUNILFNBSEQ7O0FBS0E0RCxjQUFNekUsR0FBTixDQUFVK0UsV0FBVjtBQUNBZCxjQUFNbUIsVUFBTixDQUFpQnBGLEdBQWpCLENBQXFCeUUsS0FBckI7QUFDSCxLQTdDK0I7O0FBQ2hDUCxVQUFNbUIsS0FBTixDQUFZckIsTUFBWjtBQUNBLFFBQUlDLEtBQUosRUFBV2MsV0FBWCxFQUF3Qk4sS0FBeEI7QUE0Q0g7O0FBRUQ7QUFDQSxDQUFDLFlBQVc7QUFDUixRQUFJZSxZQUFZLGdCQUFoQjtBQUNBLFFBQUlDLGFBQWF4SCxFQUFFRyxRQUFGLEVBQVk2QixJQUFaLENBQWlCLGdCQUFqQixDQUFqQjs7QUFFQXdGLGVBQVdDLElBQVgsQ0FBZ0IsWUFBVztBQUN2QixZQUFJQyxrQkFBa0IxSCxFQUFFLElBQUYsRUFBUWdDLElBQVIsQ0FBYSxvQkFBYixDQUF0QjtBQUNBLFlBQUkyRixnQkFBZ0IzSCxFQUFFLElBQUYsRUFBUWdDLElBQVIsQ0FBYSxrQkFBYixDQUFwQjs7QUFFQTJGLHNCQUFjckcsRUFBZCxDQUFpQixPQUFqQixFQUEwQixZQUFXO0FBQ2pDLGdCQUFJb0csa0JBQWtCMUgsRUFBRSxJQUFGLEVBQ2pCNkIsT0FEaUIsQ0FDVDBGLFNBRFMsRUFFakJ2RixJQUZpQixDQUVaLG9CQUZZLENBQXRCOztBQUlBLGdCQUFJNEYsaUJBQWlCNUgsRUFBRSxJQUFGLEVBQ2hCNkIsT0FEZ0IsQ0FDUjBGLFNBRFEsRUFFaEJ2RixJQUZnQixDQUVYLG1CQUZXLENBQXJCOztBQUlBLGdCQUFJNkYsZ0JBQWdCRCxlQUFlL0csSUFBZixFQUFwQjs7QUFFQWIsY0FBRSxJQUFGLEVBQVE4SCxJQUFSO0FBQ0FGLDJCQUFlRSxJQUFmOztBQUVBSiw0QkFDS2xELEdBREwsQ0FDU3FELGFBRFQsRUFFS0UsSUFGTCxHQUdLQyxNQUhMO0FBSUgsU0FsQkQ7O0FBb0JBTix3QkFDS08sSUFETCxDQUNVLFlBQVc7QUFDYixnQkFBSUwsaUJBQWlCNUgsRUFBRSxJQUFGLEVBQ2hCNkIsT0FEZ0IsQ0FDUjBGLFNBRFEsRUFFaEJ2RixJQUZnQixDQUVYLG1CQUZXLENBQXJCOztBQUlBLGdCQUFJaEMsRUFBRWtJLElBQUYsQ0FBTyxLQUFLMUUsS0FBWixLQUFzQixFQUExQixFQUE4QjtBQUMxQixxQkFBS0EsS0FBTCxHQUFhLEtBQUsyRSxZQUFMLEdBQW9CLEtBQUtBLFlBQXpCLEdBQXdDLEVBQXJEO0FBQ0gsYUFGRCxNQUVPO0FBQ0hQLCtCQUFlUSxJQUFmLENBQW9CLEtBQUs1RSxLQUF6QjtBQUNIOztBQUVEeEQsY0FBRSxJQUFGLEVBQVE4SCxJQUFSO0FBQ0FILDBCQUFjakcsVUFBZCxDQUF5QixPQUF6QjtBQUNBa0csMkJBQWVHLElBQWY7QUFDSCxTQWZMLEVBZ0JLTSxRQWhCTCxDQWdCYyxVQUFTQyxLQUFULEVBQWdCO0FBQ3RCLGdCQUFJVixpQkFBaUI1SCxFQUFFLElBQUYsRUFDaEI2QixPQURnQixDQUNSMEYsU0FEUSxFQUVoQnZGLElBRmdCLENBRVgsbUJBRlcsQ0FBckI7O0FBSUEsZ0JBQUlzRyxNQUFNL0UsT0FBTixJQUFpQixJQUFyQixFQUEyQjtBQUN2QixvQkFBSXZELEVBQUVrSSxJQUFGLENBQU8sS0FBSzFFLEtBQVosS0FBc0IsRUFBMUIsRUFBOEI7QUFDMUIseUJBQUtBLEtBQUwsR0FBYSxLQUFLMkUsWUFBTCxHQUFvQixLQUFLQSxZQUF6QixHQUF3QyxFQUFyRDtBQUNILGlCQUZELE1BRU87QUFDSFAsbUNBQWVRLElBQWYsQ0FBb0IsS0FBSzVFLEtBQXpCO0FBQ0g7O0FBRUR4RCxrQkFBRSxJQUFGLEVBQVE4SCxJQUFSO0FBQ0FILDhCQUFjakcsVUFBZCxDQUF5QixPQUF6QjtBQUNBa0csK0JBQWVHLElBQWY7QUFDSDtBQUNKLFNBaENMO0FBaUNILEtBekREO0FBMERILENBOUREOztBQWdFQTs7O0FBR0EsQ0FBQyxZQUFXO0FBQ1IsUUFBSVEsY0FBY3ZJLEVBQUUsVUFBRixDQUFsQjtBQUNBLFFBQUl3SSxZQUFZLElBQUlDLElBQUosRUFBaEI7O0FBRUFGLGdCQUFZZCxJQUFaLENBQWlCLFlBQVc7QUFDeEIsWUFBSWhDLFVBQVV6RixFQUFFLElBQUYsRUFBUTZCLE9BQVIsQ0FBZ0IsVUFBaEIsQ0FBZDtBQUNBLFlBQUk2RyxZQUFZakQsUUFBUXpELElBQVIsQ0FBYSxzQkFBYixDQUFoQjtBQUNBLFlBQUkyRyxXQUFXbEQsUUFBUXpELElBQVIsQ0FBYSxxQkFBYixDQUFmO0FBQ0EsWUFBSTRHLFdBQVduRCxRQUFRekQsSUFBUixDQUFhLHFCQUFiLENBQWY7QUFDQSxZQUFJNkcsT0FBTzdJLEVBQUUsSUFBRixFQUFROEksSUFBUixDQUFhLFdBQWIsQ0FBWDs7QUFFQSxZQUFJRCxTQUFTLFVBQWIsRUFBeUI7QUFDckIsZ0JBQUlFLFFBQVEvSSxFQUFFLElBQUYsQ0FBWjtBQUNBLGdCQUFJd0UsTUFBTXhFLEVBQUUsSUFBRixFQUFRd0UsR0FBUixFQUFWOztBQUVBd0Usc0JBQVVoSixFQUFFLElBQUYsQ0FBVixFQUFtQndFLEdBQW5COztBQUVBeEUsY0FBRSxJQUFGLEVBQ0tpSixVQURMLENBQ2dCO0FBQ1JDLDJCQUFXLElBREg7QUFFUkMseUJBQVMsS0FGRDs7QUFJUkMsMEJBQVUsa0JBQVNDLGFBQVQsRUFBd0I7QUFDOUJMLDhCQUFVRCxLQUFWLEVBQWlCTSxhQUFqQjtBQUNIO0FBTk8sYUFEaEIsRUFTSy9JLElBVEwsQ0FTVSxZQVRWLEVBVUtnSixVQVZMLENBVWdCZCxTQVZoQjs7QUFZQTtBQUNILFNBbkJELE1BbUJPLElBQUlLLFNBQVMsVUFBYixFQUF5QjtBQUM1QixnQkFBSUUsU0FBUS9JLEVBQUUsSUFBRixDQUFaO0FBQ0EsZ0JBQUl3RSxPQUFNeEUsRUFBRSxJQUFGLEVBQVF3RSxHQUFSLEVBQVY7O0FBRUF3RSxzQkFBVWhKLEVBQUUsSUFBRixDQUFWLEVBQW1Cd0UsSUFBbkI7O0FBRUF4RSxjQUFFLElBQUYsRUFDS2lKLFVBREwsQ0FDZ0I7QUFDUkMsMkJBQVcsSUFESDtBQUVSSywwQkFBVSxJQUZGO0FBR1JKLHlCQUFTLEtBSEQ7O0FBS1JDLDBCQUFVLGtCQUFTQyxhQUFULEVBQXdCRyxJQUF4QixFQUE4QkMsSUFBOUIsRUFBb0M7QUFDMUMsd0JBQUlDLGtCQUFKO0FBQUEsd0JBQWVDLGdCQUFmOztBQUVBLHdCQUFJQyxjQUFjSixLQUFLSyxPQUFMLEVBQWxCO0FBQ0Esd0JBQUlDLGVBQWVOLEtBQUtPLFFBQUwsRUFBbkI7O0FBRUFMLGdDQUFZLElBQUlqQixJQUFKLENBQ1JlLEtBQUtRLFdBQUwsRUFEUSxFQUVSUixLQUFLTyxRQUFMLEVBRlEsRUFHUlAsS0FBS0ssT0FBTCxFQUhRLENBQVo7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUYsOEJBQ0lILEtBQUtLLE9BQUwsS0FDQUwsS0FBS1MsTUFBTCxFQURBLEdBRUEsQ0FGQSxHQUdBLEdBSEEsR0FJQVQsS0FBS08sUUFBTCxFQUxKOztBQU9BZiw4QkFBVUQsTUFBVixFQUFpQk0sYUFBakI7QUFDSDtBQS9CTyxhQURoQixFQWtDSy9JLElBbENMLENBa0NVLFlBbENWLEVBbUNLZ0osVUFuQ0wsQ0FtQ2dCZCxTQW5DaEI7QUFvQ0gsU0ExQ00sTUEwQ0E7QUFDSCxnQkFBSXhJLEVBQUV5RSxNQUFGLEVBQVVDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFDekIxRSxrQkFBRSxJQUFGLEVBQ0tpSixVQURMLENBQ2dCO0FBQ1JpQixnQ0FBWSxVQURKO0FBRVJoQiwrQkFBVyxJQUZIO0FBR1JDLDZCQUFTWDtBQUhELGlCQURoQixFQU1LbEksSUFOTCxDQU1VLFlBTlYsRUFPS2dKLFVBUEwsQ0FPZ0JkLFNBUGhCO0FBUUgsYUFURCxNQVNPO0FBQ0hELDRCQUFZZCxJQUFaLENBQWlCLFlBQVc7QUFDeEJ6SCxzQkFBRSxJQUFGLEVBQVE4SSxJQUFSLENBQWEsTUFBYixFQUFxQixNQUFyQjtBQUNILGlCQUZEO0FBR0FxQiw2QkFBYSxVQUFiO0FBQ0g7QUFDSjs7QUFFRHpCLGtCQUFVcEgsRUFBVixDQUFhLE9BQWIsRUFBc0IsVUFBU0ssQ0FBVCxFQUFZO0FBQzlCQSxjQUFFWSxjQUFGO0FBQ0FrRCxvQkFDS3pELElBREwsQ0FDVSxVQURWLEVBRUsxQixJQUZMLENBRVUsWUFGVixFQUdLZ0osVUFITCxDQUdnQmQsU0FIaEI7QUFJSCxTQU5EOztBQVFBRyxpQkFBU3JILEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFVBQVNLLENBQVQsRUFBWTtBQUM3QkEsY0FBRVksY0FBRjtBQUNBa0Qsb0JBQ0t6RCxJQURMLENBQ1UsVUFEVixFQUVLMUIsSUFGTCxDQUVVLFlBRlYsRUFHSzhKLElBSEw7O0FBS0F6SCxvQkFBUUMsR0FBUixDQUFZLEtBQVosRUFBbUIsWUFBbkI7QUFDSCxTQVJEOztBQVVBO0FBQ0E2QyxnQkFBUXpELElBQVIsQ0FBYSxnQkFBYixFQUErQlYsRUFBL0IsQ0FBa0MsT0FBbEMsRUFBMkMsWUFBVztBQUNsRCxnQkFBSWlILGNBQWN2SSxFQUFFLElBQUYsRUFDYjZCLE9BRGEsQ0FDTCxVQURLLEVBRWJHLElBRmEsQ0FFUixVQUZRLEVBR2JpSCxVQUhhLEdBSWIzSSxJQUphLENBSVIsWUFKUSxDQUFsQjs7QUFNQWlJLHdCQUFZUixJQUFaO0FBQ0gsU0FSRDs7QUFVQTtBQUNBLGlCQUFTaUIsU0FBVCxDQUFtQnJGLEVBQW5CLEVBQXVCYSxHQUF2QixFQUE0QjtBQUN4QmIsZUFBRzlCLE9BQUgsQ0FBVyxVQUFYLEVBQ0tHLElBREwsQ0FDVSxnQkFEVixFQUVLbkIsSUFGTCxDQUVVMkQsR0FGVjtBQUdIO0FBQ0osS0F6SEQ7O0FBMkhBO0FBQ0F4RSxNQUFFLGdCQUFGLEVBQW9Cc0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBU0ssQ0FBVCxFQUFZO0FBQ3hDQSxVQUFFWSxjQUFGO0FBQ0F2QyxVQUFFLFVBQUYsRUFBY3FLLEtBQWQ7QUFDSCxLQUhEOztBQUtBO0FBQ0EsYUFBU0YsWUFBVCxDQUFzQnhHLEVBQXRCLEVBQTBCO0FBQ3RCLFlBQUkyRyxPQUFPbkssU0FBU29LLGdCQUFULENBQTBCNUcsRUFBMUIsQ0FBWDtBQUNBLFlBQUk2RyxNQUFNLElBQUkvQixJQUFKLEVBQVY7QUFBQSxZQUNJZ0MsSUFBSUQsSUFBSVgsT0FBSixFQURSO0FBQUEsWUFFSWEsSUFBSUYsSUFBSVQsUUFBSixLQUFpQixDQUZ6QjtBQUFBLFlBR0lZLElBQUlILElBQUlSLFdBQUosRUFIUjtBQUFBLFlBSUkxSixhQUpKOztBQU1BLFlBQUltSyxJQUFJLEVBQVIsRUFBWTtBQUNSQSxnQkFBSSxNQUFNQSxDQUFWO0FBQ0g7QUFDRCxZQUFJQyxJQUFJLEVBQVIsRUFBWTtBQUNSQSxnQkFBSSxNQUFNQSxDQUFWO0FBQ0g7O0FBRURwSyxlQUFPcUssSUFBSSxHQUFKLEdBQVVELENBQVYsR0FBYyxHQUFkLEdBQW9CRCxDQUEzQjs7QUFFQSxhQUFLLElBQUlHLElBQUksQ0FBUixFQUFXdkosTUFBTWlKLEtBQUtySyxNQUEzQixFQUFtQzJLLElBQUl2SixHQUF2QyxFQUE0Q3VKLEdBQTVDLEVBQWlEO0FBQzdDTixpQkFBS00sQ0FBTCxFQUFRcEgsS0FBUixHQUFnQmxELElBQWhCO0FBQ0g7QUFDSjtBQUNKLENBM0pEOztBQTZKQSxTQUFTdUssa0JBQVQsR0FBOEI7QUFDMUIsUUFBSXJCLE9BQU8sSUFBSWYsSUFBSixFQUFYO0FBQ0EsUUFBSXFDLDhCQUE4QjlLLEVBQUUsZ0NBQUYsQ0FBbEM7QUFDQSxRQUFJK0ssVUFBVUMsZ0JBQWdCeEIsSUFBaEIsQ0FBZDs7QUFFQXlCLHNCQUFrQkYsT0FBbEI7O0FBRUEsUUFBSUQsNEJBQTRCN0ssTUFBaEMsRUFBd0M7QUFDcEM2SyxvQ0FDSzdCLFVBREwsQ0FDZ0I7QUFDUkMsdUJBQVcsSUFESDtBQUVSZ0MsNEJBQWdCLEtBRlI7QUFHUi9CLHFCQUFTLEtBSEQ7QUFJUkMsc0JBQVUsa0JBQVNDLGFBQVQsRUFBd0JHLElBQXhCLEVBQThCO0FBQ3BDLG9CQUFJdUIsVUFBVUMsZ0JBQWdCeEIsSUFBaEIsQ0FBZDs7QUFFQXlCLGtDQUFrQkYsT0FBbEI7QUFDSDtBQVJPLFNBRGhCLEVBV0t6SyxJQVhMLENBV1UsWUFYVixFQVlLZ0osVUFaTDtBQWFIO0FBQ0o7QUFDRHVCOztBQUVBLENBQUMsU0FBU00sZ0JBQVQsR0FBNEI7QUFDekIsUUFBSUMsYUFBYSxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosQ0FBakI7O0FBRUFwTCxNQUFFLGlCQUFGLEVBQXFCaUosVUFBckIsQ0FBZ0M7QUFDNUJvQyxnQkFBUSxJQURvQjtBQUU1QkMsdUJBQWUsSUFGYTtBQUc1QkMsc0JBQWMsc0JBQVMvQixJQUFULEVBQWVnQyxRQUFmLEVBQXlCO0FBQ25DLGdCQUFJNUIsY0FBY0osS0FBS0ssT0FBTCxFQUFsQjs7QUFFQSxnQkFBSTJCLFlBQVksS0FBWixJQUFxQkosV0FBV0ssT0FBWCxDQUFtQjdCLFdBQW5CLEtBQW1DLENBQUMsQ0FBN0QsRUFBZ0U7QUFDNUQsdUJBQU87QUFDSDhCLDZCQUFTO0FBRE4saUJBQVA7QUFHSDtBQUNKO0FBWDJCLEtBQWhDO0FBYUgsQ0FoQkQ7O0FBa0JBLFNBQVNULGlCQUFULENBQTJCekgsS0FBM0IsRUFBa0M7QUFDOUIsUUFBSW1JLDBCQUEwQjNMLEVBQUUsNEJBQUYsQ0FBOUI7O0FBRUEyTCw0QkFBd0I5SyxJQUF4QixDQUE2QjJDLE1BQU1vSSxHQUFOLENBQVUsTUFBVixDQUE3Qjs7QUFFQUQsNEJBQXdCckssRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsWUFBVztBQUMzQ3RCLFVBQUUsZ0NBQUYsRUFDS2lKLFVBREwsR0FFSzNJLElBRkwsQ0FFVSxZQUZWLEVBR0t5SCxJQUhMO0FBSUgsS0FMRDtBQU1IOztBQUVELFNBQVNpRCxlQUFULENBQXlCeEIsSUFBekIsRUFBK0I7QUFDM0IsUUFBSXFDLE9BQU8sSUFBSXBELElBQUosQ0FBU2UsSUFBVCxDQUFYO0FBQ0EsUUFBSXNDLFVBQVVELEtBQUs1QixNQUFMLEVBQWQ7QUFDQSxRQUFJOEIsWUFBWUYsS0FBSzlCLFFBQUwsRUFBaEI7QUFDQSxRQUFJaUMsZUFBSjtBQUNBLFFBQUlDLGVBQUo7O0FBRUEsUUFBSUgsWUFBWSxDQUFoQixFQUFtQjtBQUNmRSxpQkFBU0gsS0FBS2hDLE9BQUwsS0FBaUIsQ0FBMUI7QUFDQW9DLGlCQUFTSixLQUFLaEMsT0FBTCxFQUFUO0FBQ0gsS0FIRCxNQUdPO0FBQ0htQyxpQkFBU0gsS0FBS2hDLE9BQUwsS0FBaUJnQyxLQUFLNUIsTUFBTCxFQUFqQixHQUFpQyxDQUExQztBQUNBZ0MsaUJBQVNELFNBQVMsQ0FBbEI7QUFDSDs7QUFFRCxXQUFPRSxpQkFBaUJMLElBQWpCLEVBQXVCRyxNQUF2QixFQUErQkMsTUFBL0IsRUFBdUNGLFNBQXZDLENBQVA7QUFDSDs7QUFFRCxTQUFTRyxnQkFBVCxDQUEwQkMsUUFBMUIsRUFBb0NILE1BQXBDLEVBQTRDQyxNQUE1QyxFQUFvREcsS0FBcEQsRUFBMkQ7QUFDdkQsUUFBSUMsaUJBQUo7QUFDQSxRQUFJQyxnQkFBSjtBQUNBLFFBQUlDLFNBQVM7QUFDVEgsZUFBTztBQURFLEtBQWI7QUFHQSxRQUFJSSxjQUFKO0FBQ0EsUUFBSUMsY0FBSjtBQUNBLFFBQUlDLGdCQUFKO0FBQ0EsUUFBSUMsZ0JBQUo7QUFDQSxRQUFJQyxlQUFKO0FBQ0EsUUFBSUMsZUFBSjtBQUNBLFFBQUlDLFVBQVUsSUFBSUMsUUFBSixFQUFkO0FBQ0EsUUFBSUMsYUFBSjs7QUFFQSxRQUFJZixTQUFTRCxNQUFULEtBQW9CQSxXQUFXLENBQVgsSUFBZ0JBLFNBQVMsQ0FBN0MsQ0FBSixFQUFxRDtBQUNqRCxZQUFJaUIsV0FBVyxJQUFJeEUsSUFBSixDQUFTMEQsU0FBU25DLFdBQVQsRUFBVCxFQUFpQ29DLEtBQWpDLEVBQXdDLENBQXhDLENBQWY7O0FBRUFDLG1CQUFXLElBQUk1RCxJQUFKLENBQVMwRCxTQUFTZSxPQUFULENBQWlCbEIsTUFBakIsQ0FBVCxDQUFYO0FBQ0FRLGdCQUFRSCxTQUFTeEMsT0FBVCxFQUFSO0FBQ0ErQyxpQkFBU1AsU0FBU3JDLFdBQVQsRUFBVDs7QUFFQXFDLG1CQUFXQSxTQUFTYyxjQUFULENBQXdCLElBQXhCLEVBQThCWixNQUE5QixDQUFYO0FBQ0FHLGtCQUFVTCxTQUFTZSxPQUFULENBQWlCLEdBQWpCLEVBQXNCLEVBQXRCLENBQVY7O0FBRUFkLGtCQUFVLElBQUk3RCxJQUFKLENBQVN3RSxTQUFTQyxPQUFULENBQWlCakIsTUFBakIsQ0FBVCxDQUFWO0FBQ0FRLGdCQUFRSCxRQUFRekMsT0FBUixFQUFSO0FBQ0FnRCxpQkFBU1AsUUFBUXRDLFdBQVIsRUFBVDs7QUFFQXNDLGtCQUFVQSxRQUFRYSxjQUFSLENBQXVCLElBQXZCLEVBQTZCWixNQUE3QixDQUFWO0FBQ0FJLGtCQUFVTCxRQUFRYyxPQUFSLENBQWdCLEdBQWhCLEVBQXFCLEVBQXJCLENBQVY7O0FBRUEsWUFBSVIsV0FBV0MsTUFBZixFQUF1QjtBQUNuQkcsbUJBQ0lSLFFBQ0EsR0FEQSxHQUVBRSxPQUZBLEdBR0EsS0FIQSxHQUlBRCxLQUpBLEdBS0EsR0FMQSxHQU1BRSxPQU5BLEdBT0EsSUFQQSxHQVFBQyxNQVRKO0FBVUgsU0FYRCxNQVdPO0FBQ0hJLG1CQUNJUixRQUNBLEdBREEsR0FFQUUsT0FGQSxHQUdBLElBSEEsR0FJQUUsTUFKQSxHQUtBLEtBTEEsR0FNQUgsS0FOQSxHQU9BLEdBUEEsR0FRQUUsT0FSQSxHQVNBLElBVEEsR0FVQUUsTUFYSjtBQVlIO0FBQ0RDLGdCQUFRTyxNQUFSLENBQWUsTUFBZixFQUF1QkwsSUFBdkI7QUFDSCxLQTNDRCxNQTJDTztBQUNIWCxtQkFBVyxJQUFJNUQsSUFBSixDQUFTMEQsU0FBU2UsT0FBVCxDQUFpQmxCLE1BQWpCLENBQVQsQ0FBWDtBQUNBUSxnQkFBUUgsU0FBU3hDLE9BQVQsRUFBUjtBQUNBK0MsaUJBQVNQLFNBQVNyQyxXQUFULEVBQVQ7O0FBRUFxQyxtQkFBV0EsU0FBU2MsY0FBVCxDQUF3QixJQUF4QixFQUE4QlosTUFBOUIsQ0FBWDtBQUNBRyxrQkFBVUwsU0FBU2UsT0FBVCxDQUFpQixHQUFqQixFQUFzQixFQUF0QixDQUFWOztBQUVBZCxrQkFBVSxJQUFJN0QsSUFBSixDQUFTMEQsU0FBU2UsT0FBVCxDQUFpQmpCLE1BQWpCLENBQVQsQ0FBVjtBQUNBUSxnQkFBUUgsUUFBUXpDLE9BQVIsRUFBUjtBQUNBZ0QsaUJBQVNQLFFBQVF0QyxXQUFSLEVBQVQ7O0FBRUFzQyxrQkFBVUEsUUFBUWEsY0FBUixDQUF1QixJQUF2QixFQUE2QlosTUFBN0IsQ0FBVjtBQUNBSSxrQkFBVUwsUUFBUWMsT0FBUixDQUFnQixHQUFoQixFQUFxQixFQUFyQixDQUFWOztBQUVBLFlBQUlULFlBQVlELE9BQWhCLEVBQXlCO0FBQ3JCTSxtQkFBT1IsUUFBUSxLQUFSLEdBQWdCQyxLQUFoQixHQUF3QixHQUF4QixHQUE4QkMsT0FBOUIsR0FBd0MsSUFBeEMsR0FBK0NFLE1BQXREO0FBQ0FFLG9CQUFRTyxNQUFSLENBQWUsTUFBZixFQUF1QkwsSUFBdkI7QUFDSCxTQUhELE1BR087QUFDSCxnQkFBSUosV0FBV0MsTUFBZixFQUF1QjtBQUNuQkcsdUJBQ0lSLFFBQ0EsR0FEQSxHQUVBRSxPQUZBLEdBR0EsS0FIQSxHQUlBRCxLQUpBLEdBS0EsR0FMQSxHQU1BRSxPQU5BLEdBT0EsSUFQQSxHQVFBQyxNQVRKO0FBVUgsYUFYRCxNQVdPO0FBQ0hJLHVCQUNJUixRQUNBLEdBREEsR0FFQUUsT0FGQSxHQUdBLElBSEEsR0FJQUUsTUFKQSxHQUtBLEtBTEEsR0FNQUgsS0FOQSxHQU9BLEdBUEEsR0FRQUUsT0FSQSxHQVNBLElBVEEsR0FVQUUsTUFYSjtBQVlIO0FBQ0RDLG9CQUFRTyxNQUFSLENBQWUsTUFBZixFQUF1QkwsSUFBdkI7QUFDSDtBQUNKOztBQUVELFdBQU9GLE9BQVA7QUFDSDs7QUFHRDs7O0FBR0EsSUFBTVEsV0FBWSxVQUFTdE4sQ0FBVCxFQUFZO0FBQzFCLFFBQUl1TixZQUFZdk4sRUFBRSxXQUFGLENBQWhCO0FBQ0EsUUFBSXdOLFdBQVcsRUFBZjs7QUFFQUEsYUFBU3pILElBQVQsR0FBZ0IsWUFBVztBQUN2QixZQUFJd0gsVUFBVXROLE1BQWQsRUFBc0I7QUFDbEIsaUJBQUt3TixPQUFMO0FBQ0EsaUJBQUtDLFFBQUw7O0FBRUEsZ0JBQUlDLGVBQWUsRUFBbkI7O0FBRUEsZ0JBQUliLFVBQVUsQ0FDVjtBQUNJYyx3QkFBUSxtQ0FEWjtBQUVJQyxzQkFBTTtBQUZWLGFBRFUsRUFLVjtBQUNJRCx3QkFBUSxxQ0FEWjtBQUVJQyxzQkFBTTtBQUZWLGFBTFUsRUFTVjtBQUNJRCx3QkFBUSxzQ0FEWjtBQUVJQyxzQkFBTTtBQUZWLGFBVFUsRUFhVjtBQUNJRCx3QkFBUSxxQ0FEWjtBQUVJQyxzQkFBTTtBQUZWLGFBYlUsRUFpQlY7QUFDSUQsd0JBQVEsbUNBRFo7QUFFSUMsc0JBQU07QUFGVixhQWpCVSxFQXFCVjtBQUNJRCx3QkFBUSxnQ0FEWjtBQUVJQyxzQkFBTTtBQUZWLGFBckJVLEVBeUJWO0FBQ0lELHdCQUFRLDhCQURaO0FBRUlDLHNCQUFNO0FBRlYsYUF6QlUsQ0FBZDs7QUErQkFmLG9CQUFRZ0IsR0FBUixDQUFZLFVBQVN4TixJQUFULEVBQWVzSyxDQUFmLEVBQWtCO0FBQzFCK0MsNkJBQWFJLElBQWIsQ0FBa0I7QUFDZEMseUJBQUtwRCxDQURTO0FBRWRxRCwyQkFDSSxvRUFDQTNOLEtBQUtzTixNQURMLEdBRUEsb0NBRkEsR0FHQXROLEtBQUt1TixJQUhMLEdBSUE7QUFQVSxpQkFBbEI7QUFTSCxhQVZEOztBQVlBSyxzQkFBVUMsRUFBVixDQUFhQyxZQUFiLEdBQTRCLEVBQTVCO0FBQ0FGLHNCQUFVQyxFQUFWLENBQWFFLFVBQWIsR0FBMEIsQ0FBMUI7O0FBRUFILHNCQUFVSSxNQUFWLENBQWlCQyxTQUFqQixHQUE2QixJQUE3QjtBQUNBTCxzQkFBVUksTUFBVixDQUFpQkUsUUFBakIsR0FBNEIsZ0JBQTVCOztBQUVBaEIscUJBQVNpQixPQUFUOztBQUVBUCxzQkFBVUksTUFBVixDQUFpQkksUUFBakIsR0FBNEIsSUFBNUI7QUFDQVIsc0JBQVVTLE1BQVYsQ0FBaUJDLE1BQWpCLENBQXdCQyxRQUF4QixHQUFtQyxNQUFuQztBQUNBWCxzQkFBVVMsTUFBVixDQUFpQkMsTUFBakIsQ0FBd0JFLGNBQXhCLEdBQXlDLFNBQXpDO0FBQ0FaLHNCQUFVSSxNQUFWLENBQWlCUyxVQUFqQixHQUE4QixDQUE5QjtBQUNBYixzQkFBVUksTUFBVixDQUFpQlUsaUJBQWpCLEdBQXFDLElBQXJDO0FBQ0FkLHNCQUFVSSxNQUFWLENBQWlCVyxpQkFBakIsR0FBcUMsSUFBckM7O0FBRUFmLHNCQUFVZ0IsZUFBVixDQUEwQjtBQUN0QnJCLHNCQUFNLE1BRGdCO0FBRXRCc0IsMEJBQVUsWUFGWTtBQUd0QkMsc0JBQU16QjtBQUhnQixhQUExQjs7QUFNQU8sc0JBQVVtQixpQkFBVixDQUE0QjtBQUN4QkMsNEJBQVksSUFBSTdHLElBQUosQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQixFQUFuQixFQUF1QixDQUF2QixFQUEwQixFQUExQixDQURZO0FBRXhCOEcsMEJBQVUsSUFBSTlHLElBQUosQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQixFQUFuQixFQUF1QixFQUF2QixDQUZjO0FBR3hCcEcscUJBQUssbUJBSG1CO0FBSXhCd0csc0JBQU0sZ0JBSmtCLEVBSUE7QUFDeEIyRywwQkFBVTtBQUNOQyw4QkFBVSxDQURKO0FBRU5DLDBCQUFNO0FBRkE7QUFMYyxhQUE1Qjs7QUFXQWxDLHFCQUFTbUMsVUFBVDs7QUFFQXpCLHNCQUFVbkksSUFBVixDQUFlLFVBQWYsRUFBMkIsSUFBSTBDLElBQUosQ0FBUyxJQUFULEVBQWUsRUFBZixFQUFtQixFQUFuQixDQUEzQixFQUFtRCxNQUFuRDtBQUNBK0UscUJBQVNvQyxRQUFUO0FBQ0g7QUFDSixLQXZGRDs7QUF5RkFwQyxhQUFTb0MsUUFBVCxHQUFvQixZQUFXO0FBQzNCLFlBQUlDLFdBQVcsU0FBWEEsUUFBVyxDQUFTckcsSUFBVCxFQUFlO0FBQzFCO0FBQ0FBLG1CQUFPLElBQUlmLElBQUosQ0FBU2UsSUFBVCxDQUFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFPQSxJQUFQO0FBQ0gsU0FURDs7QUFXQTs7QUFFQSxZQUFJc0csY0FBYyxJQUFsQjtBQUNBLFlBQUlDLFNBQVMsSUFBYjtBQUNBLFlBQUlDLGFBQWEsRUFBakI7O0FBRUE5QixrQkFBVStCLFdBQVYsQ0FBc0IsYUFBdEIsRUFBcUMsVUFBU0MsUUFBVCxFQUFtQkMsWUFBbkIsRUFBaUM7QUFDbEUsZ0JBQUkzRyxPQUFPMEUsVUFBVWtDLGFBQVYsQ0FBd0JELFlBQXhCLEVBQXNDM0csSUFBakQ7QUFDQSxnQkFBSTZHLGFBQWFSLFNBQVNyRyxJQUFULENBQWpCO0FBQ0E3RyxvQkFBUUMsR0FBUixDQUFZeU4sVUFBWjs7QUFFQSxnQkFBSSxDQUFDQSxVQUFELElBQWUsQ0FBQ1AsV0FBcEIsRUFBaUM7QUFDN0I1QiwwQkFBVW9DLGNBQVYsQ0FBeUJQLE1BQXpCOztBQUVBRCw4QkFBY08sVUFBZDtBQUNBTix5QkFBUzdCLFVBQVVxQyxZQUFWLENBQXVCO0FBQzVCakIsZ0NBQVllLFVBRGdCO0FBRTVCZCw4QkFBVXJCLFVBQVUxRSxJQUFWLENBQWV6SCxHQUFmLENBQ05zTyxVQURNLEVBRU5MLFVBRk0sRUFHTixRQUhNLENBRmtCO0FBTzVCM04seUJBQUssc0JBUHVCO0FBUTVCK0YsMEJBQ0ksV0FDQWlJLFdBQVdHLFFBQVgsRUFEQSxHQUVBLEdBRkEsR0FHQUgsV0FBV0ksVUFBWCxFQUhBLEdBSUE7QUFid0IsaUJBQXZCLENBQVQ7QUFlSDtBQUNKLFNBekJEO0FBMEJILEtBNUNEOztBQThDQWpELGFBQVNtQyxVQUFULEdBQXNCLFlBQVc7QUFDN0J6QixrQkFBVXdDLFNBQVYsQ0FBb0JDLFdBQXBCLEdBQWtDLFVBQVMxUCxLQUFULEVBQWdCMkQsR0FBaEIsRUFBcUIwRCxLQUFyQixFQUE0QjtBQUMxRCxnQkFBSWpHLE1BQU0sRUFBVjs7QUFFQSxnQkFBSWlHLE1BQU1zSSxNQUFWO0FBQ0k7QUFDQXZPLHVCQUFPLFdBQVd3TyxTQUFTRCxNQUFULEVBQWlCdEksTUFBTXNJLE1BQXZCLEVBQStCRSxXQUEvQixFQUFsQjs7QUFFSixtQkFBT3pPLEdBQVAsQ0FQMEQsQ0FPOUM7QUFDZixTQVJEOztBQVVBLGlCQUFTd08sUUFBVCxDQUFrQkUsS0FBbEIsRUFBeUIvQyxHQUF6QixFQUE4QjtBQUMxQixpQkFBSyxJQUFJcEQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJbUcsTUFBTTlRLE1BQTFCLEVBQWtDMkssR0FBbEMsRUFBdUM7QUFDbkMsb0JBQUlvRCxPQUFPK0MsTUFBTW5HLENBQU4sRUFBU29ELEdBQXBCLEVBQXlCLE9BQU8rQyxNQUFNbkcsQ0FBTixFQUFTcUQsS0FBaEI7QUFDNUI7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQsWUFBSTJDLFNBQVMsQ0FDVCxFQUFFNUMsS0FBSyxFQUFQLEVBQVdDLE9BQU8sbUJBQWxCLEVBRFMsRUFFVCxFQUFFRCxLQUFLLENBQVAsRUFBVUMsT0FBTyxLQUFqQixFQUZTLEVBR1QsRUFBRUQsS0FBSyxDQUFQLEVBQVVDLE9BQU8sU0FBakIsRUFIUyxFQUlULEVBQUVELEtBQUssQ0FBUCxFQUFVQyxPQUFPLE1BQWpCLEVBSlMsRUFLVCxFQUFFRCxLQUFLLENBQVAsRUFBVUMsT0FBTyxVQUFqQixFQUxTLENBQWI7O0FBUUFDLGtCQUFVUyxNQUFWLENBQWlCQyxNQUFqQixDQUF3Qm9DLGNBQXhCLEdBQXlDLFlBQXpDOztBQUVBOUMsa0JBQVVJLE1BQVYsQ0FBaUIyQyxRQUFqQixDQUEwQnpCLFFBQTFCLEdBQXFDLENBQ2pDO0FBQ0kzQixrQkFBTSxRQURWO0FBRUlxRCxvQkFBUSxFQUZaO0FBR0lySSxrQkFBTSxRQUhWO0FBSUlzSSxxQkFBU1AsTUFKYjtBQUtJUSxvQkFBUTtBQUxaLFNBRGlDLENBQXJDO0FBU0gsS0FyQ0Q7O0FBdUNBNUQsYUFBU2lCLE9BQVQsR0FBbUIsWUFBVztBQUMxQixZQUFJQSxVQUFVUCxVQUFVbUQsYUFBeEI7QUFDQTVDLGdCQUFRSCxNQUFSLENBQWVnRCxTQUFmLEdBQTJCLDBDQUEzQjs7QUFFQSxZQUFJQyxTQUFTckQsVUFBVTFFLElBQVYsQ0FBZWdJLFdBQWYsQ0FBMkIsT0FBM0IsQ0FBYjtBQUNBdEQsa0JBQVV3QyxTQUFWLENBQW9CZSxZQUFwQixHQUFtQyxVQUFTeFEsS0FBVCxFQUFnQjJELEdBQWhCLEVBQXFCMEQsS0FBckIsRUFBNEI7QUFDM0QzRixvQkFBUUMsR0FBUixDQUFZLEtBQVosRUFBbUIwRixLQUFuQjtBQUNBLGdCQUFJbEUsY0FBSjtBQUNBLGdCQUFJa04sa0JBQUo7QUFDQSxnQkFBSWhKLE1BQU1zSSxNQUFOLEtBQWlCLEdBQXJCLEVBQTBCO0FBQ3RCeE0sd0JBQVEsT0FBUjtBQUNBa04sNEJBQVksV0FBWjtBQUNILGFBSEQsTUFHTyxJQUFJaEosTUFBTXNJLE1BQU4sS0FBaUIsR0FBckIsRUFBMEI7QUFDN0J4TSx3QkFBUSxVQUFSO0FBQ0FrTiw0QkFBWSxlQUFaO0FBQ0gsYUFITSxNQUdBLElBQUloSixNQUFNc0ksTUFBTixLQUFpQixHQUFyQixFQUEwQjtBQUM3QnhNLHdCQUFRLFdBQVI7QUFDQWtOLDRCQUFZLFlBQVo7QUFDSCxhQUhNLE1BR0EsSUFBSWhKLE1BQU1zSSxNQUFOLEtBQWlCLEdBQXJCLEVBQTBCO0FBQzdCeE0sd0JBQVEsVUFBUjtBQUNBa04sNEJBQVksZ0JBQVo7QUFDSDtBQUNEM08sb0JBQVFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CMk8sT0FBT3RRLEtBQVAsQ0FBbkI7QUFDQSxnRUFBa0RxUSxTQUFsRCxVQUFnRWxOLEtBQWhFLHNFQUMyQ2tOLFNBRDNDLGluQkFRY0MsT0FBT3RRLEtBQVAsQ0FSZCxXQVFpQ3NRLE9BQU8zTSxHQUFQLENBUmpDO0FBYUgsU0EvQkQ7QUFnQ0gsS0FyQ0Q7O0FBdUNBNEksYUFBU2tFLFdBQVQsR0FBdUIsWUFBVztBQUM5QixZQUFJeEQsVUFBVXlELGlCQUFWLEVBQUosRUFBbUN6RCxVQUFVMEQsZUFBVixHQUFuQyxLQUVJMUQsVUFBVTJELGNBQVYsQ0FBeUI7QUFDckJDLHNCQUFVLGtCQURXO0FBRXJCdEksa0JBQU0wRSxVQUFVNkQsS0FGSztBQUdyQkMsd0JBQVksSUFIUztBQUlyQkMscUJBQVMsaUJBQVN6SSxJQUFULEVBQWVnRSxRQUFmLEVBQXlCO0FBQzlCVSwwQkFBVWdFLGNBQVYsQ0FBeUIxSSxJQUF6QjtBQUNBMEUsMEJBQVUwRCxlQUFWO0FBQ0g7QUFQb0IsU0FBekI7QUFTUCxLQVpEOztBQWNBcEUsYUFBU0UsUUFBVCxHQUFvQixZQUFXO0FBQzNCLFlBQUl5RSxPQUFPLEVBQVg7QUFDQSxZQUFJWixTQUFTckQsVUFBVTFFLElBQVYsQ0FBZWdJLFdBQWYsQ0FBMkIsT0FBM0IsQ0FBYjs7QUFFQXRELGtCQUFVSSxNQUFWLENBQWlCOEQsWUFBakIsR0FBaUMsS0FBS0QsSUFBTixHQUFjLEVBQTlDO0FBQ0FqRSxrQkFBVXdDLFNBQVYsQ0FBb0IyQixVQUFwQixHQUFpQyxVQUFTN0ksSUFBVCxFQUFlO0FBQzVDLGdCQUFJcEIsT0FBTyxFQUFYO0FBQ0EsaUJBQUssSUFBSXdDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLdUgsSUFBekIsRUFBK0J2SCxHQUEvQixFQUFvQztBQUNoQ3hDLHdCQUNJLGdEQUNBbUosT0FBTy9ILElBQVAsQ0FEQSxHQUVBLFFBSEo7QUFJQUEsdUJBQU8wRSxVQUFVMUUsSUFBVixDQUFlekgsR0FBZixDQUFtQnlILElBQW5CLEVBQXlCMkksSUFBekIsRUFBK0IsUUFBL0IsQ0FBUDtBQUNIO0FBQ0QsbUJBQU8vSixJQUFQO0FBQ0gsU0FWRDtBQVdILEtBaEJEOztBQWtCQW9GLGFBQVNDLE9BQVQsR0FBbUIsWUFBVztBQUMxQixZQUFJeUQsU0FBU2xSLEVBQUVHLFFBQUYsRUFBWStRLE1BQVosRUFBYjtBQUNBLFlBQUlvQixlQUFldFMsRUFBRSxTQUFGLEVBQWE4RCxXQUFiLENBQXlCLElBQXpCLENBQW5CO0FBQ0EsWUFBSXlPLGdCQUFnQnZTLEVBQUUscUJBQUYsRUFBeUI4RCxXQUF6QixDQUFxQyxJQUFyQyxDQUFwQjtBQUNBLFlBQUkwTyxhQUFheFMsRUFBRSxVQUFGLEVBQWM4RCxXQUFkLENBQTBCLElBQTFCLENBQWpCO0FBQ0EsWUFBSTJPLHFCQUFKOztBQUVBLFlBQUl6UyxFQUFFeUUsTUFBRixFQUFVQyxLQUFWLEtBQW9CLEdBQXhCLEVBQTZCO0FBQ3pCK04sMkJBQWV2QixVQUFVb0IsZUFBZUMsYUFBekIsQ0FBZjtBQUNILFNBRkQsTUFFTztBQUNIRSwyQkFBZXZCLFVBQVVvQixlQUFlQyxhQUFmLEdBQStCQyxVQUF6QyxDQUFmO0FBQ0g7QUFDRHhTLFVBQUUsYUFBRixFQUFpQnFDLEdBQWpCLENBQXFCLFFBQXJCLEVBQStCb1EsWUFBL0I7O0FBRUE5UCxnQkFBUUMsR0FBUixDQUFZLFlBQVosRUFBMEJzTyxNQUExQjtBQUNBdk8sZ0JBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQzBQLFlBQWhDO0FBQ0EzUCxnQkFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDMlAsYUFBakM7QUFDSCxLQWpCRDs7QUFtQkEvRSxhQUFTa0YsV0FBVCxHQUF1QixZQUFXLENBQUUsQ0FBcEM7O0FBRUEsV0FBT2xGLFFBQVA7QUFDSCxDQS9RZ0IsQ0ErUWRtRixNQS9RYyxDQUFqQjs7QUFpUkE3UCxXQUFXLFlBQU07QUFDYndLLGFBQVN2SCxJQUFUO0FBQ0gsQ0FGRCxFQUVHLEdBRkg7O0FBSUE7OztBQUdBLENBQUMsWUFBVztBQUNSLFFBQUk2TSxhQUFhNVMsRUFBRSxnQkFBRixDQUFqQjtBQUNBLFFBQUk2UyxjQUFjLFdBQWxCO0FBQ0EsUUFBSUMsZUFBZSxhQUFuQjtBQUNBLFFBQUlDLFVBQVUsSUFBSXRLLElBQUosRUFBZDtBQUNBLFFBQUl1SyxZQUFZLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixFQUF6QixFQUE2QixFQUE3QixFQUFpQyxFQUFqQyxFQUFxQyxFQUFyQyxFQUF5QyxFQUF6QyxFQUE2QyxFQUE3QyxDQUFoQjs7QUFFQSxRQUFJQyxTQUFTLENBQ1QsUUFEUyxFQUVULFNBRlMsRUFHVCxNQUhTLEVBSVQsUUFKUyxFQUtULEtBTFMsRUFNVCxNQU5TLEVBT1QsTUFQUyxFQVFULFFBUlMsRUFTVCxVQVRTLEVBVVQsU0FWUyxFQVdULFFBWFMsRUFZVCxTQVpTLENBQWI7O0FBZUFMLGVBQVduTCxJQUFYLENBQWdCLFlBQVc7QUFDdkIsWUFBSTNGLFFBQVE5QixFQUFFLElBQUYsQ0FBWjtBQUNBLFlBQUlrVCxVQUFVLENBQWQ7QUFDQUMsZUFBT3JSLEtBQVA7QUFDQXNSLGtCQUFVdFIsS0FBVjs7QUFFQSxZQUFJdVIsUUFBUXZSLE1BQU1FLElBQU4sQ0FBVyxtQkFBWCxDQUFaO0FBQ0EsWUFBSXNSLFVBQVV4UixNQUFNRSxJQUFOLENBQVcsMkJBQVgsQ0FBZDtBQUNBLFlBQUl1UixVQUFVelIsTUFBTUUsSUFBTixDQUFXLDBCQUFYLENBQWQ7O0FBRUFxUixjQUFNL1IsRUFBTixDQUFTLE9BQVQsRUFBa0IsVUFBU0ssQ0FBVCxFQUFZO0FBQzFCLGdCQUFJLENBQUMzQixFQUFFLElBQUYsRUFBUW1DLFFBQVIsQ0FBaUIyUSxZQUFqQixDQUFMLEVBQXFDO0FBQ2pDTyxzQkFBTTVSLFdBQU4sQ0FBa0JvUixXQUFsQjtBQUNBN1Msa0JBQUUsSUFBRixFQUFRb0MsUUFBUixDQUFpQnlRLFdBQWpCO0FBQ0g7O0FBRURsUixjQUFFNlIsZUFBRjtBQUNBN1IsY0FBRVksY0FBRjtBQUNILFNBUkQ7O0FBVUErUSxnQkFBUWhTLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFlBQVc7QUFDM0I0Ujs7QUFFQUssb0JBQVE5UixXQUFSLENBQW9CcVIsWUFBcEI7QUFDQVcsMEJBQWMzUixLQUFkO0FBQ0E0UixxQkFBUzVSLEtBQVQ7QUFDQTZSLHNCQUFVN1IsS0FBVixFQUFpQm9SLE9BQWpCOztBQUVBVSxvQkFBUTlSLEtBQVIsRUFBZXVSLEtBQWY7QUFDSCxTQVREOztBQVdBRSxnQkFBUWpTLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFlBQVc7QUFDM0IsZ0JBQUksQ0FBQ2lTLFFBQVFwUixRQUFSLENBQWlCMlEsWUFBakIsQ0FBTCxFQUFxQztBQUNqQ0k7O0FBRUFXLDhCQUFjL1IsS0FBZDtBQUNBZ1MseUJBQVNoUyxLQUFUOztBQUVBaVMsMkJBQVdqUyxLQUFYO0FBQ0E2UiwwQkFBVTdSLEtBQVYsRUFBaUJvUixPQUFqQjtBQUNIOztBQUVEVSxvQkFBUTlSLEtBQVIsRUFBZXVSLEtBQWY7QUFDSCxTQVpEO0FBYUgsS0E1Q0Q7O0FBOENBLGFBQVNGLE1BQVQsQ0FBZ0J4UCxFQUFoQixFQUFvQjtBQUNoQkEsV0FBR3ZCLFFBQUgsQ0FBWSxZQUFaOztBQUVBLFlBQUlnRyx3bEZBQUo7O0FBa0RBekUsV0FBR3lFLElBQUgsQ0FBUUEsSUFBUjtBQUNIOztBQUVEO0FBQ0EsYUFBU2dMLFNBQVQsQ0FBbUJ6UCxFQUFuQixFQUF1QjtBQUNuQixZQUFJcVEsYUFBYXJRLEdBQUczQixJQUFILENBQVEsc0JBQVIsQ0FBakI7QUFDQSxZQUFJaVMsU0FBU3RRLEdBQUczQixJQUFILENBQVEsb0JBQVIsQ0FBYjtBQUNBLFlBQUlrUyxRQUFRdlEsR0FBRzNCLElBQUgsQ0FBUSxtQkFBUixDQUFaO0FBQ0EsWUFBSW1TLFlBQVl4USxHQUFHM0IsSUFBSCxDQUFRLG1CQUFSLENBQWhCO0FBQ0EsWUFBSXVSLFVBQVU1UCxHQUFHM0IsSUFBSCxDQUFRLDBCQUFSLENBQWQ7QUFDQSxZQUFJb1MsZ0JBQWdCckIsUUFBUTlJLE1BQVIsS0FBbUIsQ0FBdkM7QUFDQSxZQUFJb0ssY0FBY3RCLFFBQVFsSixPQUFSLEVBQWxCO0FBQ0EsWUFBSXlLLFdBQVd2QixRQUFRaEosUUFBUixFQUFmO0FBQ0EsWUFBSXdLLFVBQVV4QixRQUFRL0ksV0FBUixFQUFkO0FBQ0EsWUFBSXdLLFVBQVVSLFdBQVdTLEVBQVgsQ0FBY0wsYUFBZCxDQUFkO0FBQ0EsWUFBSWYsUUFBUTFQLEdBQUczQixJQUFILENBQVEsbUJBQVIsQ0FBWjs7QUFFQXVSLGdCQUFRblIsUUFBUixDQUFpQjBRLFlBQWpCO0FBQ0FxQixrQkFBVXRULElBQVYsQ0FBZSxZQUFmO0FBQ0FvVCxlQUFPcFQsSUFBUCxDQUFZb1MsT0FBT3FCLFFBQVAsQ0FBWjtBQUNBSixjQUFNclQsSUFBTixDQUFXMFQsT0FBWDtBQUNBQyxnQkFBUTNULElBQVIsQ0FBYXdULFdBQWI7QUFDQUcsZ0JBQVEzUyxPQUFSLENBQWdCLG1CQUFoQixFQUFxQ08sUUFBckMsQ0FBOEN5USxXQUE5Qzs7QUFFQTZCLHVCQUFlL1EsRUFBZjtBQUNBZ1Isd0JBQWdCaFIsRUFBaEI7QUFDQWlRLGdCQUFRalEsRUFBUixFQUFZMFAsS0FBWjtBQUNIOztBQUVEO0FBQ0EsYUFBU0ssUUFBVCxDQUFrQi9QLEVBQWxCLEVBQXNCO0FBQ2xCLFlBQUlxUSxhQUFhclEsR0FBRzNCLElBQUgsQ0FBUSxzQkFBUixDQUFqQjtBQUNBLFlBQUk0UyxjQUFjOVQsU0FBU2tULFdBQVdTLEVBQVgsQ0FBYyxDQUFkLEVBQWlCNVQsSUFBakIsRUFBVCxJQUFvQyxDQUF0RDs7QUFFQSxhQUFLLElBQUkrSixJQUFJLENBQWIsRUFBZ0JBLElBQUksQ0FBcEIsRUFBdUJBLEdBQXZCLEVBQTRCO0FBQ3hCb0osdUJBQVdTLEVBQVgsQ0FBYzdKLENBQWQsRUFBaUIvSixJQUFqQixDQUFzQitULGFBQXRCOztBQUVBWix1QkFDS1MsRUFETCxDQUNRN0osQ0FEUixFQUVLL0ksT0FGTCxDQUVhLG1CQUZiLEVBR0tKLFdBSEwsQ0FHaUJxUixZQUhqQjtBQUlBa0IsdUJBQ0tTLEVBREwsQ0FDUTdKLENBRFIsRUFFSy9JLE9BRkwsQ0FFYSxtQkFGYixFQUdLSixXQUhMLENBR2lCb1IsV0FIakI7O0FBS0EsZ0JBQUltQixXQUFXUyxFQUFYLENBQWM3SixDQUFkLEVBQWlCL0osSUFBakIsS0FBMEJtUyxVQUFVNkIsU0FBU2xSLEVBQVQsQ0FBVixDQUE5QixFQUF1RDtBQUNuRGlSLDhCQUFjLENBQWQ7QUFDQVosMkJBQVdTLEVBQVgsQ0FBYzdKLENBQWQsRUFBaUIvSixJQUFqQixDQUFzQitULGFBQXRCO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0EsYUFBU2QsUUFBVCxDQUFrQm5RLEVBQWxCLEVBQXNCO0FBQ2xCLFlBQUlxUSxhQUFhclEsR0FBRzNCLElBQUgsQ0FBUSxzQkFBUixDQUFqQjtBQUNBLFlBQUk4UyxlQUFlaFUsU0FBU2tULFdBQVdTLEVBQVgsQ0FBYyxDQUFkLEVBQWlCNVQsSUFBakIsRUFBVCxJQUFvQyxDQUF2RDtBQUNBLFlBQUlrVSxZQUFZRixTQUFTbFIsRUFBVCxJQUFlLENBQS9COztBQUVBLGFBQUssSUFBSWlILElBQUksQ0FBYixFQUFnQkEsS0FBSyxDQUFyQixFQUF3QkEsR0FBeEIsRUFBNkI7QUFDekJvSix1QkFBV1MsRUFBWCxDQUFjN0osQ0FBZCxFQUFpQi9KLElBQWpCLENBQXNCaVUsY0FBdEI7QUFDQWQsdUJBQ0tTLEVBREwsQ0FDUTdKLENBRFIsRUFFSy9JLE9BRkwsQ0FFYSxtQkFGYixFQUdLSixXQUhMLENBR2lCcVIsWUFIakI7QUFJQWtCLHVCQUNLUyxFQURMLENBQ1E3SixDQURSLEVBRUsvSSxPQUZMLENBRWEsbUJBRmIsRUFHS0osV0FITCxDQUdpQm9SLFdBSGpCOztBQUtBLGdCQUFJbUIsV0FBV1MsRUFBWCxDQUFjN0osQ0FBZCxFQUFpQi9KLElBQWpCLEtBQTBCLENBQTlCLEVBQWlDO0FBQzdCLG9CQUFJa1UsWUFBWSxDQUFoQixFQUFtQjtBQUNmQSxnQ0FBWSxFQUFaO0FBQ0g7O0FBRURELCtCQUFlOUIsVUFBVStCLFNBQVYsQ0FBZjtBQUNBZiwyQkFBV1MsRUFBWCxDQUFjN0osQ0FBZCxFQUFpQi9KLElBQWpCLENBQXNCaVUsY0FBdEI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDQSxhQUFTSixjQUFULENBQXdCL1EsRUFBeEIsRUFBNEI7QUFDeEIsWUFBSXFRLGFBQWFyUSxHQUFHM0IsSUFBSCxDQUFRLHNCQUFSLENBQWpCO0FBQ0EsWUFBSWdULGVBQWVqQyxRQUFRbEosT0FBUixLQUFvQixDQUF2QztBQUNBLFlBQUlvTCxjQUFjbEMsUUFBUTlJLE1BQVIsS0FBbUIsQ0FBckM7QUFDQSxZQUFJcUssV0FBV3ZCLFFBQVFoSixRQUFSLEVBQWY7O0FBRUEsYUFBSyxJQUFJYSxJQUFJcUssV0FBYixFQUEwQnJLLEtBQUssQ0FBL0IsRUFBa0NBLEdBQWxDLEVBQXVDO0FBQ25Db0osdUJBQVdTLEVBQVgsQ0FBYzdKLENBQWQsRUFBaUIvSixJQUFqQixDQUFzQm1VLGNBQXRCOztBQUVBLGdCQUFJaEIsV0FBV1MsRUFBWCxDQUFjN0osQ0FBZCxFQUFpQi9KLElBQWpCLEtBQTBCLENBQTlCLEVBQWlDO0FBQzdCLG9CQUFJeVQsV0FBVyxDQUFmLEVBQWtCO0FBQ2RBLCtCQUFXLEVBQVg7QUFDSDs7QUFFRFUsK0JBQWVoQyxVQUFVc0IsV0FBVyxDQUFyQixDQUFmO0FBQ0FOLDJCQUFXUyxFQUFYLENBQWM3SixDQUFkLEVBQWlCL0osSUFBakIsQ0FBc0JtVSxjQUF0QjtBQUNIOztBQUVEaEIsdUJBQ0tTLEVBREwsQ0FDUTdKLENBRFIsRUFFSy9JLE9BRkwsQ0FFYSxtQkFGYixFQUdLTyxRQUhMLENBR2MwUSxZQUhkO0FBSUg7QUFDSjs7QUFFRDtBQUNBLGFBQVM2QixlQUFULENBQXlCaFIsRUFBekIsRUFBNkI7QUFDekIsWUFBSXFRLGFBQWFyUSxHQUFHM0IsSUFBSCxDQUFRLHNCQUFSLENBQWpCO0FBQ0EsWUFBSW9TLGdCQUFnQnJCLFFBQVE5SSxNQUFSLEtBQW1CLENBQXZDO0FBQ0EsWUFBSW9LLGNBQWN0QixRQUFRbEosT0FBUixFQUFsQjtBQUNBLFlBQUl5SyxXQUFXdkIsUUFBUWhKLFFBQVIsRUFBZjs7QUFFQSxhQUFLLElBQUlhLElBQUl3SixhQUFiLEVBQTRCeEosSUFBSSxDQUFoQyxFQUFtQ0EsR0FBbkMsRUFBd0M7QUFDcENvSix1QkFBV1MsRUFBWCxDQUFjN0osQ0FBZCxFQUFpQi9KLElBQWpCLENBQXNCd1QsYUFBdEI7O0FBRUEsZ0JBQUlMLFdBQVdTLEVBQVgsQ0FBYzdKLENBQWQsRUFBaUIvSixJQUFqQixLQUEwQm1TLFVBQVVzQixRQUFWLENBQTlCLEVBQW1EO0FBQy9DRCw4QkFBYyxDQUFkO0FBQ0FMLDJCQUFXUyxFQUFYLENBQWM3SixDQUFkLEVBQWlCL0osSUFBakIsQ0FBc0J3VCxhQUF0QjtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxhQUFTUSxRQUFULENBQWtCbFIsRUFBbEIsRUFBc0I7QUFDbEIsWUFBSXVSLFlBQVl2UixHQUFHM0IsSUFBSCxDQUFRLG9CQUFSLENBQWhCO0FBQ0EsWUFBSW1ULGVBQWUsRUFBbkI7O0FBRUEsYUFBSyxJQUFJdkssSUFBSSxDQUFiLEVBQWdCQSxJQUFJcUksT0FBT2hULE1BQTNCLEVBQW1DMkssR0FBbkMsRUFBd0M7QUFDcEMsZ0JBQUlxSSxPQUFPckksQ0FBUCxLQUFhc0ssVUFBVXJVLElBQVYsRUFBakIsRUFBbUM7QUFDL0JzVSwrQkFBZXZLLENBQWY7QUFDSDtBQUNKOztBQUVELGVBQU85SixTQUFTcVUsWUFBVCxDQUFQO0FBQ0g7O0FBRUQ7QUFDQSxhQUFTMUIsYUFBVCxDQUF1QjlQLEVBQXZCLEVBQTJCO0FBQ3ZCLFlBQUlxUSxhQUFhclEsR0FBRzNCLElBQUgsQ0FBUSxzQkFBUixDQUFqQjtBQUNBLFlBQUlrVCxZQUFZdlIsR0FBRzNCLElBQUgsQ0FBUSxvQkFBUixDQUFoQjtBQUNBLFlBQUlrUyxRQUFRdlEsR0FBRzNCLElBQUgsQ0FBUSxtQkFBUixDQUFaO0FBQ0EsWUFBSW9ULFVBQVV0VSxTQUFTb1QsTUFBTXJULElBQU4sRUFBVCxDQUFkO0FBQ0EsWUFBSXNVLGVBQWUsRUFBbkI7O0FBRUEsYUFBSyxJQUFJdkssSUFBSSxDQUFiLEVBQWdCQSxJQUFJb0osV0FBVy9ULE1BQS9CLEVBQXVDMkssR0FBdkMsRUFBNEM7QUFDeEMsZ0JBQUlvSixXQUFXUyxFQUFYLENBQWM3SixDQUFkLEVBQWlCL0osSUFBakIsTUFBMkJtUyxVQUFVNkIsU0FBU2xSLEVBQVQsQ0FBVixDQUEvQixFQUF3RDtBQUNwRHdSLCtCQUFlTixTQUFTbFIsRUFBVCxJQUFlLENBQTlCOztBQUVBLG9CQUFJd1IsZUFBZSxFQUFuQixFQUF1QjtBQUNuQkEsbUNBQWUsQ0FBZjtBQUNIOztBQUVERCwwQkFBVXJVLElBQVYsQ0FBZW9TLE9BQU9rQyxZQUFQLENBQWY7QUFDSDs7QUFFRCxnQkFDSUQsVUFBVXJVLElBQVYsTUFBb0IsUUFBcEIsSUFDQW1ULFdBQVdTLEVBQVgsQ0FBYzdKLENBQWQsRUFBaUIvSixJQUFqQixNQUEyQm1TLFVBQVU2QixTQUFTbFIsRUFBVCxDQUFWLENBRi9CLEVBR0U7QUFDRXVRLHNCQUFNclQsSUFBTixDQUFXdVUsVUFBVSxDQUFyQjtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNBLGFBQVN2QixhQUFULENBQXVCbFEsRUFBdkIsRUFBMkI7QUFDdkIsWUFBSXFRLGFBQWFyUSxHQUFHM0IsSUFBSCxDQUFRLHNCQUFSLENBQWpCO0FBQ0EsWUFBSWtULFlBQVl2UixHQUFHM0IsSUFBSCxDQUFRLG9CQUFSLENBQWhCO0FBQ0EsWUFBSWtTLFFBQVF2USxHQUFHM0IsSUFBSCxDQUFRLG1CQUFSLENBQVo7QUFDQSxZQUFJb1QsVUFBVXRVLFNBQVNvVCxNQUFNclQsSUFBTixFQUFULENBQWQ7QUFDQSxZQUFJc1UsZUFBZSxFQUFuQjs7QUFFQSxhQUFLLElBQUl2SyxJQUFJLENBQWIsRUFBZ0JBLElBQUlvSixXQUFXL1QsTUFBL0IsRUFBdUMySyxHQUF2QyxFQUE0QztBQUN4QyxnQkFBSW9KLFdBQVdTLEVBQVgsQ0FBYzdKLENBQWQsRUFBaUIvSixJQUFqQixNQUEyQixDQUEvQixFQUFrQztBQUM5QnNVLCtCQUFlTixTQUFTbFIsRUFBVCxJQUFlLENBQTlCOztBQUVBLG9CQUFJd1IsZUFBZSxDQUFuQixFQUFzQjtBQUNsQkEsbUNBQWUsRUFBZjtBQUNIOztBQUVERCwwQkFBVXJVLElBQVYsQ0FBZW9TLE9BQU9rQyxZQUFQLENBQWY7QUFDSDs7QUFFRCxnQkFBSUQsVUFBVXJVLElBQVYsTUFBb0IsU0FBcEIsSUFBaUNtVCxXQUFXUyxFQUFYLENBQWM3SixDQUFkLEVBQWlCL0osSUFBakIsTUFBMkIsQ0FBaEUsRUFBbUU7QUFDL0RxVCxzQkFBTXJULElBQU4sQ0FBV3VVLFVBQVUsQ0FBckI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDQSxhQUFTckIsVUFBVCxDQUFvQnBRLEVBQXBCLEVBQXdCO0FBQ3BCLFlBQUlxUSxhQUFhclEsR0FBRzNCLElBQUgsQ0FBUSxzQkFBUixDQUFqQjtBQUNBLFlBQUlrVCxZQUFZdlIsR0FBRzNCLElBQUgsQ0FBUSxvQkFBUixDQUFoQjs7QUFFQSxhQUFLLElBQUk0SSxJQUFJLENBQWIsRUFBZ0JBLElBQUlvSixXQUFXL1QsTUFBL0IsRUFBdUMySyxHQUF2QyxFQUE0QztBQUN4QyxnQkFDSW9KLFdBQVdTLEVBQVgsQ0FBYzdKLENBQWQsRUFBaUIvSixJQUFqQixNQUEyQmtTLFFBQVFsSixPQUFSLEVBQTNCLElBQ0FxTCxVQUFVclUsSUFBVixNQUFvQm9TLE9BQU9GLFFBQVFoSixRQUFSLEVBQVAsQ0FGeEIsRUFHRTtBQUNFcUosMEJBQVV6UCxFQUFWO0FBQ0g7QUFDSjtBQUNKOztBQUVEO0FBQ0EsYUFBU2dRLFNBQVQsQ0FBbUJoUSxFQUFuQixFQUF1QnVQLE9BQXZCLEVBQWdDO0FBQzVCLFlBQUlpQixZQUFZeFEsR0FBRzNCLElBQUgsQ0FBUSxtQkFBUixDQUFoQjs7QUFFQSxZQUFJa1IsV0FBVyxDQUFmLEVBQWtCO0FBQ2RpQixzQkFBVXRULElBQVYsQ0FBZSxrQkFBZjtBQUNILFNBRkQsTUFFTyxJQUFJcVMsVUFBVSxDQUFWLElBQWVBLFdBQVcsQ0FBOUIsRUFBaUM7QUFDcENpQixzQkFBVXRULElBQVYsQ0FBZSxXQUFXcVMsT0FBWCxHQUFxQixTQUFwQztBQUNILFNBRk0sTUFFQSxJQUFJQSxVQUFVLENBQWQsRUFBaUI7QUFDcEJpQixzQkFBVXRULElBQVYsQ0FBZSxXQUFXcVMsT0FBWCxHQUFxQixTQUFwQztBQUNIO0FBQ0o7O0FBRUQ7QUFDQSxhQUFTVSxPQUFULENBQWlCalEsRUFBakIsRUFBcUJ1QixJQUFyQixFQUEyQjtBQUN2QixZQUFJbVEsT0FBT3JWLEVBQUUsbUJBQUYsRUFBdUJhLElBQXZCLEVBQVg7QUFDQTtBQUNBLFlBQUl1TCxRQUFReUksU0FBU2xSLEVBQVQsSUFBZSxDQUEzQjtBQUNBLFlBQUkyUixNQUFNdFYsRUFBRSxzQkFBRixDQUFWOztBQUVBa0YsYUFBS3VDLElBQUwsQ0FBVSxhQUFLO0FBQ1h2QyxpQkFBS3VQLEVBQUwsQ0FBUTdKLENBQVIsRUFBVzlCLElBQVgsQ0FDSSxXQURKLEVBRUl1TSxPQUFPLEdBQVAsR0FBYWpKLEtBQWIsR0FBcUIsR0FBckIsR0FBMkJrSixJQUFJYixFQUFKLENBQU83SixDQUFQLEVBQVUvSixJQUFWLEVBRi9CO0FBSUgsU0FMRDtBQU1IO0FBQ0osQ0FwV0Q7O0FBdVdBOzs7QUFHQSxJQUFNMFUsUUFBUyxZQUFXO0FBQ3RCLFFBQUlDLFFBQVEsRUFBWjtBQUNBLFFBQUlDLFFBQVF6VixFQUFFLE1BQUYsQ0FBWjtBQUNBLFFBQUkwVixrQkFBa0IxVixFQUFFLHNCQUFGLEVBQTBCMlYsR0FBMUIsQ0FBOEIsY0FBOUIsQ0FBdEI7QUFDQSxRQUFJQyxhQUFhNVYsRUFBRSxnQkFBRixDQUFqQjtBQUNBLFFBQUk2VixjQUFjN1YsRUFBRSxpQkFBRixDQUFsQjtBQUNBLFFBQUk4VixlQUFlOVYsRUFBRSxrQkFBRixDQUFuQjtBQUNBLFFBQUkrVixnQkFBZ0IvVixFQUFFLGdCQUFGLENBQXBCO0FBQ0EsUUFBSWdXLGdCQUFnQmhXLEVBQUUsZ0JBQUYsQ0FBcEI7QUFDQSxRQUFJaVcsZ0JBQWdCalcsRUFBRSxvQkFBRixDQUFwQjtBQUNBLFFBQUlrVyxlQUFlbFcsRUFBRSxpQkFBRixDQUFuQjtBQUNBLFFBQUltVyxrQkFBa0JuVyxFQUFFLG9CQUFGLENBQXRCO0FBQ0EsUUFBSW9XLGVBQWVwVyxFQUFFLGlCQUFGLENBQW5CO0FBQ0EsUUFBSTZTLGNBQWMsV0FBbEI7QUFDQSxRQUFJd0QsY0FBYyxXQUFsQjtBQUNBLFFBQUlDLE9BQU8sS0FBWDs7QUFFQWQsVUFBTXpQLElBQU4sR0FBYSxZQUFXO0FBQUE7O0FBQ3BCLGFBQUt3USxVQUFMO0FBQ0EsYUFBS0MsWUFBTDs7QUFFQSxhQUFLQyxVQUFMLENBQWdCelcsRUFBRSxlQUFGLENBQWhCOztBQUVBLFlBQUlBLEVBQUV5RSxNQUFGLEVBQVVDLEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUIsaUJBQUtnUyxnQkFBTDtBQUNBLGlCQUFLQyxjQUFMOztBQUVBN1QsdUJBQVcsWUFBTTtBQUNiLHVCQUFLMlQsVUFBTCxDQUFnQnpXLEVBQUUsZ0JBQUYsQ0FBaEI7QUFDSCxhQUZELEVBRUcsR0FGSDtBQUdIO0FBQ0osS0FkRDs7QUFnQkF3VixVQUFNZSxVQUFOLEdBQW1CLFlBQVc7QUFDMUJiLHdCQUFnQnBVLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFlBQVc7QUFDbkM7QUFDQW9VLDRCQUFnQkMsR0FBaEIsQ0FBb0IzVixFQUFFLElBQUYsQ0FBcEIsRUFBNkJ5QixXQUE3QixDQUF5Q29SLFdBQXpDO0FBQ0E3UyxjQUFFLElBQUYsRUFBUXNDLFdBQVIsQ0FBb0J1USxXQUFwQjs7QUFFQTtBQUNBdUQseUJBQWFoVSxRQUFiLENBQXNCeVEsV0FBdEI7O0FBRUE7QUFDQW9ELDBCQUFjN1QsUUFBZCxDQUF1QmlVLFdBQXZCO0FBQ0FILHlCQUFhOVQsUUFBYixDQUFzQnlRLFdBQXRCOztBQUVBO0FBQ0ErQyx1QkFBVy9VLElBQVgsQ0FBZ0JiLEVBQUUsSUFBRixFQUFRYSxJQUFSLEVBQWhCO0FBQ0gsU0FkRDtBQWVILEtBaEJEOztBQWtCQTJVLFVBQU1rQixnQkFBTixHQUF5QixZQUFXO0FBQ2hDaEIsd0JBQWdCcFUsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsWUFBVztBQUNuQztBQUNBd1UseUJBQWExVCxRQUFiLENBQXNCeVEsV0FBdEI7O0FBRUE7QUFDQWdELHdCQUFZaFYsSUFBWixDQUFpQixzQkFBakI7QUFDQTRVLGtCQUFNclQsUUFBTixDQUFlLFVBQWY7O0FBRUE7QUFDQStULDRCQUFnQi9ULFFBQWhCLENBQXlCeVEsV0FBekI7QUFDQXlELG1CQUFPLElBQVA7QUFDSCxTQVhEO0FBWUgsS0FiRDs7QUFlQTtBQUNBZCxVQUFNaUIsVUFBTixHQUFtQixVQUFTQSxVQUFULEVBQXFCO0FBQ3BDLFlBQUl2RixTQUFTdUYsV0FBVzNTLFdBQVgsQ0FBdUIsSUFBdkIsQ0FBYjtBQUNBLFlBQUk4UyxTQUFTNVcsRUFBRSxxQkFBRixDQUFiO0FBQ0E0VyxlQUFPQyxXQUFQLENBQW1CSixVQUFuQjtBQUNBRyxlQUFPdlUsR0FBUCxDQUFXLFFBQVgsRUFBcUI2TyxNQUFyQixFQUE2QnBKLElBQTdCOztBQUVBLFlBQUlnUCxtQkFBbUJMLFdBQVdNLE1BQVgsR0FBb0JDLEdBQTNDOztBQUVBO0FBQ0EsWUFBSWhYLEVBQUV5RSxNQUFGLEVBQVVDLEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUJvUywrQkFBbUJMLFdBQVdNLE1BQVgsR0FBb0JDLEdBQXBCLEdBQTBCLEVBQTdDO0FBQ0g7O0FBRURoWCxVQUFFeUUsTUFBRixFQUFVd1MsTUFBVixDQUFpQixZQUFXO0FBQ3hCLGdCQUFJQSxTQUFTalgsRUFBRSxJQUFGLEVBQVFrWCxTQUFSLEVBQWI7O0FBRUEsZ0JBQUlELFVBQVVILGdCQUFkLEVBQWdDO0FBQzVCTCwyQkFBV3JVLFFBQVgsQ0FBb0IsVUFBcEI7QUFDQXdVLHVCQUFPN08sSUFBUDtBQUNILGFBSEQsTUFHTyxJQUFJa1AsU0FBU0gsZ0JBQWIsRUFBK0I7QUFDbENMLDJCQUFXaFYsV0FBWCxDQUF1QixVQUF2QjtBQUNBbVYsdUJBQU85TyxJQUFQO0FBQ0g7QUFDSixTQVZEO0FBV0gsS0F4QkQ7O0FBMEJBME4sVUFBTW1CLGNBQU4sR0FBdUIsWUFBVztBQUM5QjtBQUNBWixzQkFBY3pVLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsVUFBU0ssQ0FBVCxFQUFZO0FBQ2xDa1Usd0JBQVloVixJQUFaLENBQWlCLGlCQUFqQjs7QUFFQSxnQkFBSXlWLElBQUosRUFBVTtBQUNOYTtBQUNBekIsZ0NBQWdCalUsV0FBaEIsQ0FBNEJvUixXQUE1QjtBQUNBbFIsa0JBQUVZLGNBQUY7QUFDSDtBQUNKLFNBUkQ7O0FBVUE7QUFDQXlULHNCQUFjMVUsRUFBZCxDQUFpQixPQUFqQixFQUEwQixZQUFXO0FBQ2pDdVUsd0JBQVloVixJQUFaLENBQWlCLHVCQUFqQjtBQUNBc1c7QUFDSCxTQUhEOztBQUtBLGlCQUFTQSxZQUFULEdBQXdCO0FBQ3BCckIseUJBQWFyVSxXQUFiLENBQXlCb1IsV0FBekI7QUFDQXNELDRCQUFnQjFVLFdBQWhCLENBQTRCb1IsV0FBNUI7QUFDQTRDLGtCQUFNaFUsV0FBTixDQUFrQixVQUFsQjtBQUNBNlUsbUJBQU8sS0FBUDtBQUNIO0FBQ0osS0F4QkQ7O0FBMEJBO0FBQ0FkLFVBQU1nQixZQUFOLEdBQXFCLFlBQVc7QUFDNUIsWUFBSVksY0FBY3BYLEVBQUUsZUFBRixFQUFtQmdDLElBQW5CLENBQXdCLHNCQUF4QixDQUFsQjs7QUFFQW9WLG9CQUFZOVYsRUFBWixDQUFlLE9BQWYsRUFBd0IsWUFBVztBQUFBOztBQUMvQndCLHVCQUFXLFlBQU07QUFDYjlDLDBCQUNLNkIsT0FETCxDQUNhLGVBRGIsRUFFS3dDLEtBRkwsQ0FFVyxNQUZYO0FBR0gsYUFKRCxFQUlHLEdBSkg7QUFLSCxTQU5EO0FBT0gsS0FWRDs7QUFZQSxXQUFPbVIsS0FBUDtBQUNILENBcklhLEVBQWQ7O0FBdUlBRCxNQUFNeFAsSUFBTjs7QUFFQTs7O0FBR0EsSUFBTXNSLGtCQUFtQixhQUFLO0FBQzFCLFFBQUlDLFNBQVN0WCxFQUFFLGlCQUFGLENBQWI7QUFDQSxRQUFJc1gsT0FBT3JYLE1BQVgsRUFBbUI7QUFDZixZQUFJc1gsUUFBUSxFQUFaOztBQUVBO0FBQ0EsWUFBSUMsU0FBUztBQUNUUixpQkFBSyxFQURJO0FBRVQ5UyxvQkFBUSxFQUZDO0FBR1R1VCxrQkFBTSxFQUhHO0FBSVRDLG1CQUFPO0FBSkUsU0FBYjs7QUFPQTtBQUNBLFlBQUlDLGNBQWMsQ0FBQyxTQUFELEVBQVksbUJBQVosQ0FBbEI7O0FBRUE7QUFDQSxZQUFNQyxhQUFhLENBQUMsbUJBQUQsRUFBc0IsbUJBQXRCLENBQW5COztBQUVBO0FBQ0EsWUFBSUMsY0FBY1AsT0FBTzlVLE1BQVAsR0FBZ0JrQyxLQUFoQixFQUFsQjs7QUFFQSxZQUFJQSxRQUFRbVQsY0FBY0wsT0FBT0MsSUFBckIsR0FBNEJELE9BQU9FLEtBQS9DO0FBQ0EsWUFBSXhHLFNBQVMsTUFBTXhNLEtBQW5COztBQUVBO0FBQ0EsWUFBSW9ULElBQUlDLEdBQUdDLFNBQUgsR0FBZTdXLEtBQWYsQ0FBcUIsQ0FBQyxDQUFELEVBQUl1RCxLQUFKLENBQXJCLENBQVI7QUFDQTtBQUNBLFlBQUlpRyxJQUFJb04sR0FBR0UsV0FBSCxHQUFpQjlXLEtBQWpCLENBQXVCLENBQUMrUCxNQUFELEVBQVMsQ0FBVCxDQUF2QixDQUFSOztBQUVBO0FBQ0EsWUFBTWdILE1BQU1ILEdBQ1AvUCxNQURPLENBQ0EsaUJBREEsRUFFUHFGLE1BRk8sQ0FFQSxLQUZBLEVBR1B2RSxJQUhPLENBR0YsT0FIRSxFQUdPcEUsUUFBUThTLE9BQU9DLElBQWYsR0FBc0JELE9BQU9FLEtBSHBDLEVBSVA1TyxJQUpPLENBSUYsUUFKRSxFQUlRb0ksU0FBU3NHLE9BQU9SLEdBQWhCLEdBQXNCUSxPQUFPdFQsTUFKckMsRUFLUG1KLE1BTE8sQ0FLQSxHQUxBLEVBTVB2RSxJQU5PLENBT0osV0FQSSxFQVFKLGVBQWUwTyxPQUFPQyxJQUF0QixHQUE2QixHQUE3QixHQUFtQ0QsT0FBT1IsR0FBMUMsR0FBZ0QsR0FSNUMsQ0FBWjs7QUFXQTtBQUNBLFlBQU1tQixxQkFBcUJKLEdBQ3RCSyxZQURzQixHQUV0QkMsTUFGc0IsQ0FFZixDQUFDLFNBQUQsRUFBWSxTQUFaLENBRmUsRUFHdEJsWCxLQUhzQixDQUdoQixDQUFDLHNCQUFELEVBQXlCLHNCQUF6QixDQUhnQixDQUEzQjs7QUFLQTtBQUNBLFlBQU1tWCxtQkFBbUJQLEdBQ3BCSyxZQURvQixHQUVwQkMsTUFGb0IsQ0FFYixDQUFDLFNBQUQsRUFBWSxTQUFaLENBRmEsRUFHcEJsWCxLQUhvQixDQUdkLENBQUN5VyxXQUFXLENBQVgsQ0FBRCxFQUFnQkEsV0FBVyxDQUFYLENBQWhCLENBSGMsQ0FBekI7O0FBS0FMLGNBQU14UixJQUFOLEdBQWEsWUFBTTtBQUNmZ1MsZUFBR1EsSUFBSCxDQUFRLDhCQUFSLEVBQXdDQyxJQUF4QyxDQUE2QyxnQkFBUTtBQUNqRGxZLHFCQUFLbVksT0FBTCxDQUFhLGFBQUs7QUFDZGhPLHNCQUFFakIsSUFBRixHQUFTLElBQUlmLElBQUosQ0FBU2dDLEVBQUVqQixJQUFYLENBQVQ7QUFDQWlCLHNCQUFFaU8sT0FBRixHQUFZLENBQUNqTyxFQUFFaU8sT0FBZjtBQUNBak8sc0JBQUVrTyxPQUFGLEdBQVksQ0FBQ2xPLEVBQUVrTyxPQUFmO0FBQ0gsaUJBSkQ7O0FBTUE7QUFDQSxvQkFBSUMsT0FBT2IsR0FBR2EsSUFBSCxDQUFRdFksS0FBSyxDQUFMLENBQVIsQ0FBWDtBQUNBLG9CQUFJc0ssSUFBSWdPLEtBQUtuTixPQUFMLENBQWEsTUFBYixDQUFSOztBQUVBLG9CQUFJYixLQUFLLENBQUMsQ0FBVixFQUFhO0FBQ1RnTyx5QkFBS0MsTUFBTCxDQUFZak8sQ0FBWixFQUFlLENBQWY7QUFDSDtBQUNELG9CQUFJbUcsUUFBUTZILEtBQUs5SyxHQUFMLENBQVMsYUFBSztBQUN0QiwyQkFBTztBQUNIZ0wsNEJBQUlyTyxDQUREO0FBRUhsSixnQ0FBUWpCLEtBQUt3TixHQUFMLENBQVMsYUFBSztBQUNsQixtQ0FBTztBQUNIdEUsc0NBQU03SCxFQUFFNkgsSUFETDtBQUVIdVAsd0NBQVFwWCxFQUFFOEksQ0FBRjtBQUZMLDZCQUFQO0FBSUgseUJBTE87QUFGTCxxQkFBUDtBQVNILGlCQVZXLENBQVo7O0FBWUE7QUFDQXFOLGtCQUFFTyxNQUFGLENBQ0lOLEdBQUdpQixNQUFILENBQVUxWSxJQUFWLEVBQWdCLGFBQUs7QUFDakIsMkJBQU9tSyxFQUFFakIsSUFBVDtBQUNILGlCQUZELENBREo7O0FBTUE7QUFDQW1CLGtCQUFFME4sTUFBRixDQUFTLENBQ0xOLEdBQUczVyxHQUFILENBQU8yUCxLQUFQLEVBQWMsYUFBSztBQUNmLDJCQUFPZ0gsR0FBRzNXLEdBQUgsQ0FBTzZYLEVBQUUxWCxNQUFULEVBQWlCLGFBQUs7QUFDekIsK0JBQU9rSixFQUFFc08sTUFBVDtBQUNILHFCQUZNLENBQVA7QUFHSCxpQkFKRCxDQURLLEVBTUxoQixHQUFHMVcsR0FBSCxDQUFPMFAsS0FBUCxFQUFjLGFBQUs7QUFDZiwyQkFBT2dILEdBQUcxVyxHQUFILENBQU80WCxFQUFFMVgsTUFBVCxFQUFpQixhQUFLO0FBQ3pCLCtCQUFPa0osRUFBRXNPLE1BQVQ7QUFDSCxxQkFGTSxDQUFQO0FBR0gsaUJBSkQsQ0FOSyxDQUFUOztBQWFBeEIsc0JBQU0yQixjQUFOO0FBQ0EzQixzQkFBTTRCLGdCQUFOO0FBQ0E1QixzQkFBTTZCLFVBQU4sQ0FBaUJySSxLQUFqQjtBQUNBd0csc0JBQU04QixlQUFOLENBQXNCdEksS0FBdEI7QUFDQXdHLHNCQUFNK0IsWUFBTixDQUFtQmhaLElBQW5CO0FBQ0FpWCxzQkFBTWdDLFNBQU4sQ0FBZ0IsY0FBaEIsRUFBZ0MzQixXQUFXLENBQVgsQ0FBaEM7QUFDQUwsc0JBQU1nQyxTQUFOLENBQWdCLGNBQWhCLEVBQWdDM0IsV0FBVyxDQUFYLENBQWhDO0FBQ0FMLHNCQUFNaUMsT0FBTixDQUFjekksS0FBZDs7QUFFQXdHLHNCQUFNa0MsTUFBTjtBQUNBbEMsc0JBQU1tQyxJQUFOLENBQVdwWixJQUFYO0FBQ0gsYUExREQ7QUEyREgsU0E1REQ7O0FBOERBaVgsY0FBTTJCLGNBQU4sR0FBdUIsWUFBTTtBQUN6QixnQkFBSVMsUUFBUTVCLEdBQUc2QixRQUFILENBQVlqUCxDQUFaLEVBQWVrUCxVQUFmLENBQTBCOUIsR0FBR3hHLE1BQUgsQ0FBVSxLQUFWLENBQTFCLENBQVo7O0FBRUEyRyxnQkFBSTdLLE1BQUosQ0FBVyxHQUFYLEVBQ0t2RSxJQURMLENBQ1UsT0FEVixFQUNtQixjQURuQixFQUVLL0UsS0FGTCxDQUVXLFdBRlgsRUFFd0IsSUFGeEIsRUFHSytWLElBSEwsQ0FHVUgsS0FIVjtBQUlILFNBUEQ7O0FBU0FwQyxjQUFNNEIsZ0JBQU4sR0FBeUIsWUFBTTtBQUMzQixnQkFBSVksUUFBUWhDLEdBQ1BpQyxVQURPLENBQ0lsQyxDQURKLEVBRVBtQyxLQUZPLENBRUQsQ0FGQyxFQUdQSixVQUhPLENBR0k5QixHQUFHbUMsVUFBSCxDQUFjLE9BQWQsQ0FISixDQUFaOztBQUtBaEMsZ0JBQUk3SyxNQUFKLENBQVcsR0FBWCxFQUNLdkUsSUFETCxDQUNVLE9BRFYsRUFDbUIsY0FEbkIsRUFFS0EsSUFGTCxDQUVVLFdBRlYsRUFFdUIsaUJBQWlCb0ksTUFBakIsR0FBMEIsR0FGakQsRUFHS25OLEtBSEwsQ0FHVyxXQUhYLEVBR3dCLElBSHhCLEVBSUsrVixJQUpMLENBSVVDLEtBSlY7QUFLSCxTQVhEOztBQWFBeEMsY0FBTTZCLFVBQU4sR0FBbUIsZ0JBQVE7QUFDdkIsZ0JBQUllLE9BQU9wQyxHQUNOb0MsSUFETSxHQUVOQyxLQUZNLENBRUFyQyxHQUFHc0MsZUFGSCxFQUdOdkMsQ0FITSxDQUdKLGFBQUs7QUFDSix1QkFBT0EsRUFBRXJOLEVBQUVqQixJQUFKLENBQVA7QUFDSCxhQUxNLEVBTU44USxFQU5NLENBTUgzUCxFQUFFLENBQUYsQ0FORyxFQU9ONFAsRUFQTSxDQU9ILGFBQUs7QUFDTCx1QkFBTzVQLEVBQUVGLEVBQUVzTyxNQUFKLENBQVA7QUFDSCxhQVRNLENBQVg7O0FBV0EsZ0JBQUl5QixhQUFhdEMsSUFDWnVDLFNBRFksQ0FDRixPQURFLEVBRVpuYSxJQUZZLENBRVBBLElBRk8sRUFHWm9hLEtBSFksR0FJWnJOLE1BSlksQ0FJTCxHQUpLLEVBS1p2RSxJQUxZLENBS1AsT0FMTyxFQUtFLGFBQUs7QUFDaEIsaUNBQWUyQixFQUFFcU8sRUFBakI7QUFDSCxhQVBZLEVBUVovVSxLQVJZLENBUU4sTUFSTSxFQVFFLGFBQUs7QUFDaEIsdUJBQU9vVSxtQkFBbUIxTixFQUFFcU8sRUFBckIsQ0FBUDtBQUNILGFBVlksQ0FBakI7O0FBWUEwQix1QkFBV25OLE1BQVgsQ0FBa0IsTUFBbEIsRUFBMEJ2RSxJQUExQixDQUErQixHQUEvQixFQUFvQyxhQUFLO0FBQ3JDLHVCQUFPcVIsS0FBSzFQLEVBQUVsSixNQUFQLENBQVA7QUFDSCxhQUZEOztBQUlBLG1CQUFPNFksSUFBUDtBQUNILFNBN0JEOztBQStCQTVDLGNBQU04QixlQUFOLEdBQXdCLGdCQUFRO0FBQzVCLGdCQUFJc0IsWUFBWTVDLEdBQ1g2QyxJQURXLEdBRVhSLEtBRlcsQ0FFTHJDLEdBQUdzQyxlQUZFLEVBR1h2QyxDQUhXLENBR1QsYUFBSztBQUNKLHVCQUFPQSxFQUFFck4sRUFBRWpCLElBQUosQ0FBUDtBQUNILGFBTFcsRUFNWG1CLENBTlcsQ0FNVCxhQUFLO0FBQ0osdUJBQU9BLEVBQUVGLEVBQUVzTyxNQUFKLENBQVA7QUFDSCxhQVJXLENBQWhCOztBQVVBLGdCQUFJOEIsY0FBYzNDLElBQ2J1QyxTQURhLENBQ0gsT0FERyxFQUVibmEsSUFGYSxDQUVSQSxJQUZRLEVBR2JvYSxLQUhhLEdBSWJyTixNQUphLENBSU4sR0FKTSxFQUtidkUsSUFMYSxDQUtSLE9BTFEsRUFLQyxhQUFLO0FBQ2hCLGlDQUFlMkIsRUFBRXFPLEVBQWpCO0FBQ0gsYUFQYSxFQVFiL1UsS0FSYSxDQVFQLFFBUk8sRUFRRyxhQUFLO0FBQ2xCLHVCQUFPdVUsaUJBQWlCN04sRUFBRXFPLEVBQW5CLENBQVA7QUFDSCxhQVZhLEVBV2IvVSxLQVhhLENBV1AsTUFYTyxFQVdDLGFBWEQsQ0FBbEI7O0FBYUE4Vyx3QkFBWXhOLE1BQVosQ0FBbUIsTUFBbkIsRUFBMkJ2RSxJQUEzQixDQUFnQyxHQUFoQyxFQUFxQyxhQUFLO0FBQ3RDLHVCQUFPNlIsVUFBVWxRLEVBQUVsSixNQUFaLENBQVA7QUFDSCxhQUZEO0FBR0gsU0EzQkQ7O0FBNkJBZ1csY0FBTStCLFlBQU4sR0FBcUIsZ0JBQVE7QUFDekIsZ0JBQUl3QixVQUFVNUMsSUFDVHVDLFNBRFMsQ0FDQyxlQURELEVBRVRuYSxJQUZTLENBRUpBLElBRkksRUFHVG9hLEtBSFMsR0FJVHJOLE1BSlMsQ0FJRixZQUpFLEVBS1R2RSxJQUxTLENBS0osT0FMSSxFQUtLLGNBTEwsQ0FBZDs7QUFPQSxnQkFBSWlTLFVBQVU3QyxJQUNUdUMsU0FEUyxDQUNDLGVBREQsRUFFVG5hLElBRlMsQ0FFSkEsSUFGSSxFQUdUb2EsS0FIUyxHQUlUck4sTUFKUyxDQUlGLFlBSkUsRUFLVHZFLElBTFMsQ0FLSixPQUxJLEVBS0ssY0FMTCxDQUFkOztBQU9BLGdCQUFJa1MsVUFBVSxDQUFkOztBQUVBRixvQkFDS2hTLElBREwsQ0FDVSxJQURWLEVBQ2dCLGFBQUs7QUFDYm5HLHdCQUFRQyxHQUFSO0FBQ0EsdUJBQU9rVixFQUFFck4sRUFBRWpCLElBQUosQ0FBUDtBQUNILGFBSkwsRUFLS1YsSUFMTCxDQUtVLElBTFYsRUFLZ0IsYUFBSztBQUNiLHVCQUFPNkIsRUFBRUYsRUFBRWlPLE9BQUosQ0FBUDtBQUNILGFBUEwsRUFRSzVQLElBUkwsQ0FRVSxHQVJWLEVBUWVrUyxPQVJmLEVBU0tsUyxJQVRMLENBU1UsT0FUVixFQVNtQixhQUFLO0FBQ2hCLHVCQUFPMkIsRUFBRWlPLE9BQVQ7QUFDSCxhQVhMLEVBWUszVSxLQVpMLENBWVcsUUFaWCxFQVlxQjZULFdBQVcsQ0FBWCxDQVpyQixFQWFLN1QsS0FiTCxDQWFXLE1BYlgsRUFhbUIsTUFibkI7O0FBZUFnWCxvQkFDS2pTLElBREwsQ0FDVSxJQURWLEVBQ2dCLGFBQUs7QUFDYix1QkFBT2dQLEVBQUVyTixFQUFFakIsSUFBSixDQUFQO0FBQ0gsYUFITCxFQUlLVixJQUpMLENBSVUsSUFKVixFQUlnQixhQUFLO0FBQ2IsdUJBQU82QixFQUFFRixFQUFFa08sT0FBSixDQUFQO0FBQ0gsYUFOTCxFQU9LN1AsSUFQTCxDQU9VLEdBUFYsRUFPZWtTLE9BUGYsRUFRS2xTLElBUkwsQ0FRVSxPQVJWLEVBUW1CLGFBQUs7QUFDaEIsdUJBQU8yQixFQUFFa08sT0FBVDtBQUNILGFBVkwsRUFXSzVVLEtBWEwsQ0FXVyxRQVhYLEVBV3FCNlQsV0FBVyxDQUFYLENBWHJCLEVBWUs3VCxLQVpMLENBWVcsTUFaWCxFQVltQixNQVpuQjtBQWFILFNBN0NEOztBQStDQXdULGNBQU1nQyxTQUFOLEdBQWtCLFVBQUNULEVBQUQsRUFBS21DLEtBQUwsRUFBZTtBQUM3QixnQkFBTUMsV0FBV2hELElBQ1o3SyxNQURZLENBQ0wsZ0JBREssRUFFWnZFLElBRlksQ0FFUCxJQUZPLEVBRURnUSxFQUZDLEVBR1poUSxJQUhZLENBR1AsbUJBSE8sRUFHYyxZQUhkLEVBSVpBLElBSlksQ0FJUCxJQUpPLEVBSUQsSUFKQyxFQUtaQSxJQUxZLENBS1AsSUFMTyxFQUtELE1BTEMsRUFNWkEsSUFOWSxDQU1QLElBTk8sRUFNRCxJQU5DLEVBT1pBLElBUFksQ0FPUCxJQVBPLEVBT0QsTUFQQyxDQUFqQjs7QUFTQTtBQUNBb1MscUJBQ0s3TixNQURMLENBQ1ksTUFEWixFQUVLdkUsSUFGTCxDQUVVLE9BRlYsRUFFbUIsT0FGbkIsRUFHS0EsSUFITCxDQUdVLFFBSFYsRUFHb0IsR0FIcEIsRUFJS0EsSUFKTCxDQUlVLFlBSlYsRUFJd0JtUyxLQUp4QixFQUtLblMsSUFMTCxDQUtVLGNBTFYsRUFLMEIsQ0FMMUI7O0FBT0E7QUFDQW9TLHFCQUNLN04sTUFETCxDQUNZLE1BRFosRUFFS3ZFLElBRkwsQ0FFVSxPQUZWLEVBRW1CLEtBRm5CLEVBR0tBLElBSEwsQ0FHVSxRQUhWLEVBR29CLEtBSHBCLEVBSUtBLElBSkwsQ0FJVSxZQUpWLEVBSXdCLHNCQUp4QixFQUtLQSxJQUxMLENBS1UsY0FMVixFQUswQixDQUwxQjtBQU1ILFNBekJEOztBQTJCQXlPLGNBQU1pQyxPQUFOLEdBQWdCLFlBQU07QUFDbEIsZ0JBQUkyQixTQUFTakQsSUFDUjdLLE1BRFEsQ0FDRCxHQURDLEVBRVJ2RSxJQUZRLENBRUgsT0FGRyxFQUVNLFFBRk4sRUFHUkEsSUFIUSxDQUdILFFBSEcsRUFHTyxHQUhQLEVBSVJBLElBSlEsQ0FJSCxPQUpHLEVBSU0sR0FKTixFQUtSQSxJQUxRLENBS0gsR0FMRyxFQUtFLENBTEYsRUFNUkEsSUFOUSxDQU1ILEdBTkcsRUFNRSxDQU5GLEVBT1JBLElBUFEsQ0FPSCxXQVBHLEVBT1UscUJBUFYsQ0FBYjs7QUFTQTtBQUNBcVMsbUJBQ0tWLFNBREwsQ0FDZSxlQURmLEVBRUtuYSxJQUZMLENBRVVzWCxVQUZWLEVBR0s4QyxLQUhMLEdBSUtyTixNQUpMLENBSVksWUFKWixFQUtLdkUsSUFMTCxDQUtVLElBTFYsRUFLZ0IsVUFBQzJCLENBQUQsRUFBSUcsQ0FBSixFQUFVO0FBQ2xCLHVCQUFPQSxJQUFJLEdBQVg7QUFDSCxhQVBMLEVBUUs5QixJQVJMLENBUVUsSUFSVixFQVFnQixDQVJoQixFQVNLQSxJQVRMLENBU1UsV0FUVixFQVN1QixpQkFUdkIsRUFVS0EsSUFWTCxDQVVVLEdBVlYsRUFVZSxFQVZmLEVBV0tBLElBWEwsQ0FXVSxPQVhWLEVBV21CLGNBWG5CLEVBWUsvRSxLQVpMLENBWVcsTUFaWCxFQVltQixhQUFLO0FBQ2hCLHVCQUFPMEcsQ0FBUDtBQUNILGFBZEw7O0FBZ0JBO0FBQ0EwUSxtQkFDS1YsU0FETCxDQUNlLGFBRGYsRUFFS25hLElBRkwsQ0FFVXFYLFdBRlYsRUFHSytDLEtBSEwsR0FJS3JOLE1BSkwsQ0FJWSxNQUpaLEVBS0t4TSxJQUxMLENBS1UsYUFBSztBQUNQLHVCQUFPNEosQ0FBUDtBQUNILGFBUEwsRUFRSzNCLElBUkwsQ0FRVSxHQVJWLEVBUWUsVUFBQzJCLENBQUQsRUFBSUcsQ0FBSixFQUFVO0FBQ2pCLHVCQUFPQSxJQUFJLEdBQUosR0FBVSxFQUFqQjtBQUNILGFBVkwsRUFXSzlCLElBWEwsQ0FXVSxHQVhWLEVBV2UsQ0FYZixFQVlLQSxJQVpMLENBWVUsT0FaVixFQVltQixZQVpuQjtBQWFILFNBekNEOztBQTJDQXlPLGNBQU1tQyxJQUFOLEdBQWEsZ0JBQVE7QUFDakIsZ0JBQUkwQixRQUFRcGIsRUFBRSxrQkFBRixDQUFaO0FBQ0EsZ0JBQUlxYixTQUFTRCxNQUFNcFosSUFBTixDQUFXLGlCQUFYLENBQWI7QUFDQSxnQkFBSXNaLFFBQVF0YixFQUFFLFVBQUYsRUFBY2dDLElBQWQsQ0FBbUIsT0FBbkIsQ0FBWjs7QUFFQXNaLGtCQUFNN1QsSUFBTixDQUFXLGFBQUs7QUFDWjZULHNCQUFNN0csRUFBTixDQUFTN0osQ0FBVCxFQUFZdEosRUFBWixDQUFlLFdBQWYsRUFBNEIsWUFBTTtBQUM5Qix3QkFBSWlhLE9BQU9GLE9BQU81RyxFQUFQLENBQVUsQ0FBVixFQUFhelMsSUFBYixDQUFrQixpQkFBbEIsQ0FBWDtBQUNBLHdCQUFJd1osT0FBT0gsT0FBTzVHLEVBQVAsQ0FBVSxDQUFWLEVBQWF6UyxJQUFiLENBQWtCLGlCQUFsQixDQUFYOztBQUVBdVoseUJBQUsxYSxJQUFMLENBQVVQLEtBQUtzSyxDQUFMLEVBQVEsU0FBUixDQUFWO0FBQ0E0USx5QkFBSzNhLElBQUwsQ0FBVVAsS0FBS3NLLENBQUwsRUFBUSxTQUFSLENBQVY7QUFDSCxpQkFORDtBQU9ILGFBUkQ7QUFTSCxTQWREOztBQWdCQTJNLGNBQU1rQyxNQUFOLEdBQWUsWUFBTTtBQUNqQixnQkFBSTJCLFFBQVFwYixFQUFFLGtCQUFGLENBQVo7O0FBRUFrWSxnQkFBSXVDLFNBQUosQ0FBYyxnQkFBZCxFQUFnQ25aLEVBQWhDLENBQW1DLFdBQW5DLEVBQWdELFlBQU07QUFDbEQ7QUFDQSxvQkFBSW1hLFNBQVNuVCxNQUFNb1QsS0FBTixHQUFjMWIsRUFBRXlFLE1BQUYsRUFBVXlTLFNBQVYsRUFBM0I7QUFDQTtBQUNBLG9CQUFJeUUsU0FBU3JULE1BQU1zVCxLQUFuQjtBQUNBO0FBQ0Esb0JBQUkxSyxTQUFTa0ssTUFBTWxLLE1BQU4sRUFBYjtBQUNBLG9CQUFJeE0sUUFBUTBXLE1BQU0xVyxLQUFOLEVBQVo7O0FBRUE7QUFDQSxvQkFBSXNTLE1BQU15RSxTQUFTdkssTUFBVCxHQUFrQixFQUE1QjtBQUNBLG9CQUFJd0csUUFBUWlFLFNBQVNqWCxRQUFRLENBQTdCOztBQUVBO0FBQ0Esb0JBQUlnVCxRQUFRLEVBQVosRUFBZ0I7QUFDWkEsNEJBQVFpRSxTQUFTLEVBQWpCO0FBQ0E7QUFDSCxpQkFIRCxNQUdPLElBQUlqRSxRQUFRMVgsRUFBRXlFLE1BQUYsRUFBVUMsS0FBVixFQUFaLEVBQStCO0FBQ2xDZ1QsNEJBQVFpRSxTQUFTalgsS0FBakI7QUFDQTtBQUNILGlCQUhNLE1BR0EsSUFBSXNTLE1BQU0sRUFBVixFQUFjO0FBQ2pCQSwwQkFBTXlFLFNBQVN2SyxNQUFULEdBQWtCLEVBQXhCO0FBQ0g7O0FBRUQ7QUFDQWtLLHNCQUFNL1ksR0FBTixDQUFVO0FBQ04yVSx5QkFBS0EsR0FEQztBQUVOUywwQkFBTUM7QUFGQSxpQkFBVjs7QUFLQTtBQUNBMEQsc0JBQU1TLE1BQU47QUFDSCxhQWhDRDs7QUFrQ0EzRCxnQkFBSXVDLFNBQUosQ0FBYyxnQkFBZCxFQUFnQ25aLEVBQWhDLENBQW1DLFVBQW5DLEVBQStDLFlBQU07QUFDakQ7QUFDQThaLHNCQUFNdFQsSUFBTjtBQUNILGFBSEQ7QUFJSCxTQXpDRDs7QUEyQ0EsZUFBT3lQLEtBQVA7QUFDSDtBQUNKLENBeFh1QixDQXdYckI1RSxNQXhYcUIsQ0FBeEI7O0FBMFhBLElBQU1tSixXQUFZLGFBQUs7QUFDbkIsUUFBSXhFLFNBQVN0WCxFQUFFLGtCQUFGLENBQWI7QUFDQSxRQUFJc1gsT0FBT3JYLE1BQVgsRUFBbUI7QUFDZixZQUFJc1gsUUFBUSxFQUFaOztBQUVBLFlBQUlDLFNBQVM7QUFDVFIsaUJBQUssRUFESTtBQUVUOVMsb0JBQVEsRUFGQztBQUdUdVQsa0JBQU0sRUFIRztBQUlUQyxtQkFBTztBQUpFLFNBQWI7O0FBT0E7QUFDQSxZQUFJRyxjQUFjUCxPQUFPOVUsTUFBUCxHQUFnQmtDLEtBQWhCLEVBQWxCOztBQUVBLFlBQUlBLFFBQVFtVCxjQUFjTCxPQUFPQyxJQUFyQixHQUE0QkQsT0FBT0UsS0FBL0M7QUFDQSxZQUFJeEcsU0FBUyxNQUFNeE0sS0FBbkI7O0FBRUEsWUFBSXFYLGNBQWMsRUFBbEI7QUFDQSxZQUFJQyxjQUFjLEVBQWxCOztBQUVBLFlBQUloYyxFQUFFeUUsTUFBRixFQUFVQyxLQUFWLE1BQXFCLEdBQXpCLEVBQThCO0FBQzFCO0FBQ0FxWCwwQkFBYzdLLFNBQVMsQ0FBdkI7QUFDQTtBQUNBOEssMEJBQWN0WCxRQUFRLEdBQXRCO0FBQ0gsU0FMRCxNQUtPO0FBQ0g7QUFDQXFYLDBCQUFjN0ssU0FBUyxHQUF2QjtBQUNBO0FBQ0E4SywwQkFBY3RYLFFBQVEsR0FBdEI7QUFDSDs7QUFFRDtBQUNBLFlBQU13VCxNQUFNSCxHQUNQL1AsTUFETyxDQUNBLGtCQURBLEVBRVBxRixNQUZPLENBRUEsS0FGQSxFQUdQdkUsSUFITyxDQUdGLE9BSEUsRUFHT3BFLFFBQVE4UyxPQUFPQyxJQUFmLEdBQXNCRCxPQUFPRSxLQUhwQyxFQUlQNU8sSUFKTyxDQUlGLFFBSkUsRUFJUW9JLFNBQVNzRyxPQUFPUixHQUFoQixHQUFzQlEsT0FBT3RULE1BSnJDLEVBS1BtSixNQUxPLENBS0EsR0FMQSxFQU1QdkUsSUFOTyxDQU9KLFdBUEksRUFRSixlQUFlME8sT0FBT0MsSUFBdEIsR0FBNkIsR0FBN0IsR0FBbUNELE9BQU9SLEdBQTFDLEdBQWdELEdBUjVDLENBQVo7O0FBV0E7QUFDQSxZQUFNaUYsYUFBYWxFLEdBQ2RLLFlBRGMsR0FFZGpYLEtBRmMsQ0FFUixDQUNILG9CQURHLEVBRUgsbUJBRkcsRUFHSCxvQkFIRyxFQUlILGtCQUpHLENBRlEsQ0FBbkI7O0FBU0FvVyxjQUFNeFIsSUFBTixHQUFhLFlBQU07QUFDZmdTLGVBQUdRLElBQUgsQ0FBUSwwQkFBUixFQUFvQ0MsSUFBcEMsQ0FBeUMsZ0JBQVE7QUFDN0NsWSxxQkFBS21ZLE9BQUwsQ0FBYSxhQUFLO0FBQ2RoTyxzQkFBRWpILEtBQUYsR0FBVSxDQUFDaUgsRUFBRWpILEtBQWI7QUFDSCxpQkFGRDs7QUFJQTtBQUNBLG9CQUFNMFksV0FBVyxTQUFYQSxRQUFXLElBQUs7QUFDbEIsMkJBQU96UixFQUFFakgsS0FBVDtBQUNILGlCQUZEO0FBR0E7QUFDQSxvQkFBTTJZLE1BQU1wRSxHQUFHb0UsR0FBSCxHQUFTM1ksS0FBVCxDQUFlMFksUUFBZixDQUFaO0FBQ0E7QUFDQSxvQkFBTUUsVUFBVUQsSUFBSTdiLElBQUosQ0FBaEI7O0FBRUFpWCxzQkFBTThFLFNBQU4sQ0FBZ0JELE9BQWhCO0FBQ0E7QUFDQTdFLHNCQUFNK0UsWUFBTixDQUFtQkYsT0FBbkI7QUFDSCxhQWpCRDtBQWtCSCxTQW5CRDs7QUFxQkE3RSxjQUFNOEUsU0FBTixHQUFrQixnQkFBUTtBQUN0QixnQkFBTUUsWUFBWXhFLEdBQ2J5RSxHQURhLEdBRWJULFdBRmEsQ0FFREEsV0FGQyxFQUdiQyxXQUhhLENBR0RBLFdBSEMsQ0FBbEI7O0FBS0EsZ0JBQU1TLGVBQWV2RSxJQUNoQjdLLE1BRGdCLENBQ1QsR0FEUyxFQUVoQnZFLElBRmdCLENBR2IsV0FIYSxFQUliLGdCQUNLcEUsUUFBUUEsUUFBUSxHQURyQixJQUVJLEdBRkosR0FHSXdNLFNBQVMsQ0FIYixHQUlJLEdBUlMsQ0FBckI7O0FBV0F1TCx5QkFDS2hDLFNBREwsQ0FDZSxNQURmLEVBRUtuYSxJQUZMLENBRVVBLElBRlYsRUFHS29hLEtBSEwsR0FJS3JOLE1BSkwsQ0FJWSxNQUpaLEVBS0t2RSxJQUxMLENBS1UsR0FMVixFQUtleVQsU0FMZixFQU1LelQsSUFOTCxDQU1VLE1BTlYsRUFNa0IsYUFBSztBQUNmLHVCQUFPbVQsV0FBV3hSLEVBQUVqSCxLQUFiLENBQVA7QUFDSCxhQVJMOztBQVVBK1Qsa0JBQU1tRixlQUFOLENBQXNCRCxZQUF0Qjs7QUFFQTtBQUNBLGdCQUFJemMsRUFBRXlFLE1BQUYsRUFBVUMsS0FBVixNQUFxQixJQUF6QixFQUErQjtBQUMzQitYLDZCQUNLaEMsU0FETCxDQUNlLE1BRGYsRUFFS25hLElBRkwsQ0FFVUEsSUFGVixFQUdLb2EsS0FITCxHQUlLck4sTUFKTCxDQUlZLE1BSlosRUFLSzVGLElBTEwsQ0FLVSxVQUFTZ0QsQ0FBVCxFQUFZO0FBQ2Qsd0JBQUlrUyxXQUFXSixVQUFVSSxRQUFWLENBQW1CbFMsQ0FBbkIsQ0FBZjtBQUNBc04sdUJBQUcvUCxNQUFILENBQVUsSUFBVixFQUNLYyxJQURMLENBQ1UsR0FEVixFQUNlNlQsU0FBUyxDQUFULENBRGYsRUFFSzdULElBRkwsQ0FFVSxHQUZWLEVBRWU2VCxTQUFTLENBQVQsQ0FGZixFQUdLN1QsSUFITCxDQUdVLElBSFYsRUFHZ0IsR0FIaEIsRUFJS0EsSUFKTCxDQUlVLElBSlYsRUFJZ0IsSUFKaEIsRUFLS0EsSUFMTCxDQUtVLE9BTFYsRUFLbUIsU0FMbkIsRUFNS2pJLElBTkwsQ0FNVTRKLEVBQUVuSyxJQUFGLENBQU9rRCxLQU5qQjtBQU9ILGlCQWRMO0FBZUg7QUFDSixTQS9DRDs7QUFpREErVCxjQUFNbUYsZUFBTixHQUF3QixlQUFPO0FBQzNCLGdCQUFJMWMsRUFBRXlFLE1BQUYsRUFBVUMsS0FBVixLQUFvQixJQUF4QixFQUE4QjtBQUMxQixvQkFBTWtZLGFBQWEsU0FBbkI7O0FBRUEsb0JBQU1DLHVCQUF1QlYsSUFDeEI5TyxNQUR3QixDQUNqQixHQURpQixFQUV4QnZFLElBRndCLENBR3JCLFdBSHFCLEVBSXJCLGVBQWUsQ0FBQ2lULFdBQUQsR0FBZSxHQUE5QixHQUFvQyxLQUpmLENBQTdCOztBQU9BYyxxQ0FDS3hQLE1BREwsQ0FDWSxNQURaLEVBRUt2RSxJQUZMLENBRVUsT0FGVixFQUVtQixjQUZuQixFQUdLQSxJQUhMLENBR1UsR0FIVixFQUdlLENBSGYsRUFJS0EsSUFKTCxDQUlVLEdBSlYsRUFJZSxDQUpmLEVBS0tqSSxJQUxMLENBS1UrYixVQUxWO0FBTUg7QUFDSixTQWxCRDs7QUFvQkFyRixjQUFNK0UsWUFBTixHQUFxQixnQkFBUTtBQUN6QixnQkFBSXRjLEVBQUV5RSxNQUFGLEVBQVVDLEtBQVYsTUFBcUIsR0FBekIsRUFBOEI7QUFDMUIsb0JBQUl5VyxTQUFTakQsSUFDUjdLLE1BRFEsQ0FDRCxHQURDLEVBRVJ2RSxJQUZRLENBRUgsT0FGRyxFQUVNLFFBRk4sRUFHUkEsSUFIUSxDQUdILFFBSEcsRUFHTyxHQUhQLEVBSVJBLElBSlEsQ0FJSCxPQUpHLEVBSU0sR0FKTixFQUtSQSxJQUxRLENBS0gsV0FMRyxFQUtVLGlCQUFpQm9JLFNBQVMsR0FBMUIsR0FBZ0MsR0FMMUMsQ0FBYjs7QUFPQTtBQUNBaUssdUJBQ0tWLFNBREwsQ0FDZSxlQURmLEVBRUtuYSxJQUZMLENBRVVBLElBRlYsRUFHS29hLEtBSEwsR0FJS3JOLE1BSkwsQ0FJWSxZQUpaLEVBS0t2RSxJQUxMLENBS1UsSUFMVixFQUtnQixFQUxoQixFQU1LQSxJQU5MLENBTVUsSUFOVixFQU1nQixVQUFDMkIsQ0FBRCxFQUFJRyxDQUFKLEVBQVU7QUFDbEIsMkJBQVFBLElBQUlzRyxNQUFMLEdBQWUsQ0FBdEI7QUFDSCxpQkFSTCxFQVNLcEksSUFUTCxDQVNVLFdBVFYsRUFTdUIsaUJBVHZCLEVBVUtBLElBVkwsQ0FVVSxHQVZWLEVBVWVwRSxRQUFRLEVBVnZCLEVBV0tvRSxJQVhMLENBV1UsT0FYVixFQVdtQixjQVhuQixFQVlLL0UsS0FaTCxDQVlXLE1BWlgsRUFZbUIsYUFBSztBQUNoQiwyQkFBT2tZLFdBQVd4UixFQUFFbkssSUFBRixDQUFPa0QsS0FBbEIsQ0FBUDtBQUNILGlCQWRMOztBQWdCQTtBQUNBMlgsdUJBQ0tWLFNBREwsQ0FDZSxhQURmLEVBRUtuYSxJQUZMLENBRVVBLElBRlYsRUFHS29hLEtBSEwsR0FJS3JOLE1BSkwsQ0FJWSxNQUpaLEVBS0t4TSxJQUxMLENBS1UsYUFBSztBQUNQLDJCQUFPNEosRUFBRW5LLElBQUYsQ0FBT2tKLElBQWQ7QUFDSCxpQkFQTCxFQVFLVixJQVJMLENBUVUsR0FSVixFQVFlLEVBUmYsRUFTS0EsSUFUTCxDQVNVLEdBVFYsRUFTZSxVQUFDMkIsQ0FBRCxFQUFJRyxDQUFKLEVBQVU7QUFDakIsMkJBQVFBLElBQUlzRyxNQUFMLEdBQWUsQ0FBdEI7QUFDSCxpQkFYTCxFQVlLcEksSUFaTCxDQVlVLE9BWlYsRUFZbUIsWUFabkI7QUFhSCxhQXZDRCxNQXVDTztBQUNILG9CQUFJcVMsVUFBU2pELElBQ1I3SyxNQURRLENBQ0QsR0FEQyxFQUVSdkUsSUFGUSxDQUVILE9BRkcsRUFFTSxRQUZOLEVBR1JBLElBSFEsQ0FHSCxRQUhHLEVBR08sR0FIUCxFQUlSQSxJQUpRLENBSUgsT0FKRyxFQUlNLEdBSk4sRUFLUkEsSUFMUSxDQUtILFdBTEcsRUFLVSxpQkFBaUJvSSxTQUFTLEdBQTFCLEdBQWdDLEdBTDFDLENBQWI7O0FBT0E7QUFDQWlLLHdCQUNLVixTQURMLENBQ2UsZUFEZixFQUVLbmEsSUFGTCxDQUVVQSxJQUZWLEVBR0tvYSxLQUhMLEdBSUtyTixNQUpMLENBSVksWUFKWixFQUtLdkUsSUFMTCxDQUtVLElBTFYsRUFLZ0IsQ0FMaEIsRUFNS0EsSUFOTCxDQU1VLElBTlYsRUFNZ0IsVUFBQzJCLENBQUQsRUFBSUcsQ0FBSixFQUFVO0FBQ2xCLDJCQUFRQSxJQUFJc0csTUFBTCxHQUFlLENBQXRCO0FBQ0gsaUJBUkwsRUFTS3BJLElBVEwsQ0FTVSxXQVRWLEVBU3VCLGlCQVR2QixFQVVLQSxJQVZMLENBVVUsR0FWVixFQVVlcEUsUUFBUSxFQVZ2QixFQVdLb0UsSUFYTCxDQVdVLE9BWFYsRUFXbUIsY0FYbkIsRUFZSy9FLEtBWkwsQ0FZVyxNQVpYLEVBWW1CLGFBQUs7QUFDaEIsMkJBQU9rWSxXQUFXeFIsRUFBRW5LLElBQUYsQ0FBT2tELEtBQWxCLENBQVA7QUFDSCxpQkFkTDs7QUFnQkE7QUFDQTJYLHdCQUNLVixTQURMLENBQ2UsYUFEZixFQUVLbmEsSUFGTCxDQUVVQSxJQUZWLEVBR0tvYSxLQUhMLEdBSUtyTixNQUpMLENBSVksTUFKWixFQUtLeE0sSUFMTCxDQUtVLGFBQUs7QUFDUCwyQkFBTzRKLEVBQUVuSyxJQUFGLENBQU9rSixJQUFkO0FBQ0gsaUJBUEwsRUFRS1YsSUFSTCxDQVFVLEdBUlYsRUFRZSxFQVJmLEVBU0tBLElBVEwsQ0FTVSxHQVRWLEVBU2UsVUFBQzJCLENBQUQsRUFBSUcsQ0FBSixFQUFVO0FBQ2pCLDJCQUFRQSxJQUFJc0csTUFBTCxHQUFlLENBQXRCO0FBQ0gsaUJBWEwsRUFZS3BJLElBWkwsQ0FZVSxPQVpWLEVBWW1CLFlBWm5COztBQWNBLG9CQUFJOUksRUFBRXlFLE1BQUYsRUFBVUMsS0FBVixLQUFvQixJQUF4QixFQUE4QjtBQUMxQnlXLDRCQUNLVixTQURMLENBQ2UsV0FEZixFQUVLbmEsSUFGTCxDQUVVQSxJQUZWLEVBR0tvYSxLQUhMLEdBSUtyTixNQUpMLENBSVksTUFKWixFQUtLeE0sSUFMTCxDQUtVLGFBQUs7QUFDUCwrQkFBTzRKLEVBQUVuSyxJQUFGLENBQU9rRCxLQUFkO0FBQ0gscUJBUEwsRUFRS3NGLElBUkwsQ0FRVSxHQVJWLEVBUWUsR0FSZixFQVNLQSxJQVRMLENBU1UsR0FUVixFQVNlLFVBQUMyQixDQUFELEVBQUlHLENBQUosRUFBVTtBQUNqQiwrQkFBUUEsSUFBSXNHLE1BQUwsR0FBZSxDQUF0QjtBQUNILHFCQVhMLEVBWUtwSSxJQVpMLENBWVUsT0FaVixFQVltQixVQVpuQjtBQWFIO0FBQ0o7QUFDSixTQWhHRDs7QUFrR0EsZUFBT3lPLEtBQVA7QUFDSDtBQUNKLENBclBnQixDQXFQZDVFLE1BclBjLENBQWpCOztBQXVQQSxJQUFJM1MsRUFBRSxpQkFBRixFQUFxQkMsTUFBekIsRUFBaUM7QUFDN0JvWCxvQkFBZ0J0UixJQUFoQjtBQUNIO0FBQ0QsSUFBSS9GLEVBQUUsa0JBQUYsRUFBc0JDLE1BQTFCLEVBQWtDO0FBQzlCNmIsYUFBUy9WLElBQVQ7QUFDSCIsImZpbGUiOiJkZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0Z1bmN0aW9uIHdoaWNoIGhhdmUgYmVlbiBtb3ZlZCBpbiBERVZcclxuXHJcbmlmICgkKCcuY2F0YWxvZy1maWx0ZXJfX2l0ZW1fcHJpY2UnKS5sZW5ndGgpIHtcclxuICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJyk7XHJcbiAgICB2YXIgYWxsUHJpY2VTdGFydCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdzdGFydCcpO1xyXG4gICAgdmFyIGFsbFByaWNlRW5kID0gJCgnI2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpLmRhdGEoJ2VuZCcpO1xyXG4gICAgdmFyIHNwYW5zID0gWyQoJyNqc1ByaWNlU3RhcnQnKSwgJCgnI2pzUHJpY2VFbmQnKV07XHJcbiAgICB2YXIgc3RhcnRQcmljZTtcclxuICAgIHZhciBlbmRQcmljZTtcclxuICAgIHZhciBhcnJQYXJhbXM7XHJcbiAgICB2YXIgc1VybDtcclxuXHJcbiAgICBpZiAoc3BhbnNbMF0udGV4dCgpID09ICcnKSB7XHJcbiAgICAgICAgc3RhcnRQcmljZSA9IGFsbFByaWNlU3RhcnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXJ0UHJpY2UgPSBwYXJzZUludChzcGFuc1swXS50ZXh0KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzcGFuc1sxXS50ZXh0KCkgPT0gJycpIHtcclxuICAgICAgICBlbmRQcmljZSA9IGFsbFByaWNlRW5kO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBlbmRQcmljZSA9IHBhcnNlSW50KHNwYW5zWzFdLnRleHQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcbiAgICAgICAgc3RhcnQ6IFtzdGFydFByaWNlLCBlbmRQcmljZV0sXHJcbiAgICAgICAgY29ubmVjdDogdHJ1ZSxcclxuICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICBtaW46IGFsbFByaWNlU3RhcnQsXHJcbiAgICAgICAgICAgIG1heDogYWxsUHJpY2VFbmRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHNsaWRlci5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xyXG4gICAgICAgIHNwYW5zW2hhbmRsZV0udGV4dChwYXJzZUludCh2YWx1ZXNbaGFuZGxlXSkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbiQoJy5qcy1jYXRhbG9nLWZpbHRlci0tY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuJCgnLmpzLWNhcmQtc2VydmljZXMtaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGlmIChcclxuICAgICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KFxyXG4gICAgICAgICAgICAnLmNhcmQtc2VydmljZXMtaXRlbV9fbWlkZGxlLCAuY2FyZC1zZXJ2aWNlcy1pdGVtX19pbmZvLWJsb2NrLCAuY2FyZC1zZXJ2aWNlcy1pdGVtX19ib3R0b20nXHJcbiAgICAgICAgKS5sZW5ndGhcclxuICAgICkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgYWRkID0gX3RoaXMuZmluZCgnLmNhcmQtc2VydmljZXMtaXRlbV9fYWN0aW9uX2FkZCcpO1xyXG4gICAgICAgIHZhciBkb25lID0gX3RoaXMuZmluZCgnLmNhcmQtc2VydmljZXMtaXRlbV9fYWN0aW9uX2RvbmUnKTtcclxuICAgICAgICB2YXIgZGVsID0gX3RoaXMuZmluZCgnLmNhcmQtc2VydmljZXMtaXRlbV9fYWN0aW9uX2RlbCcpO1xyXG5cclxuICAgICAgICBpZiAoX3RoaXMuaGFzQ2xhc3MoJ2lzLWJvb2tlZCcpKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZUNsYXNzKCdpcy1ib29rZWQnKTtcclxuICAgICAgICAgICAgYWRkLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIGRvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfdGhpcy5hZGRDbGFzcygnaXMtYm9va2VkJyk7XHJcbiAgICAgICAgICAgIGFkZC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICBkb25lLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vL0Zhdm9yaXRlIGJ0blxyXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWJ0bi1mYXYnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxuLy9Db25maXJtIHBob25lXHJcbiQoJy5qcy10aW1lci0tcmVwZWF0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgJCh0aGlzKVxyXG4gICAgICAgIC5wYXJlbnQoJy5waG9uZS1jb25maXJtX19yZXBlYXQnKVxyXG4gICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpXHJcbiAgICAgICAgLmNsb3Nlc3QoJy5qcy1jb25maXJtJylcclxuICAgICAgICAuZmluZCgnLmNvbmZpcm1fX3RpbWVyLCAuY29uZmlybV9fZmllbGQnKVxyXG4gICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgcGhvbmVDb25maXJtVGltZXIoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBwaG9uZUNvbmZpcm1UaW1lcigpIHtcclxuICAgIHZhciB0aW1lciA9ICQoJy5qcy10aW1lcicpO1xyXG4gICAgY29uc29sZS5sb2codGltZXIuZGF0YSgndGltZXInKSk7XHJcbiAgICB2YXIgdGltID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHQgPSB0aW1lci5kYXRhKCd0aW1lcicpO1xyXG4gICAgICAgICAgICB0aW1lci50ZXh0KHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0KTtcclxuICAgICAgICAgICAgdmFyIGludCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdC0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXIucGFyZW50KCkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuanMtdGltZXItLXJlcGVhdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJlbnQoJy5waG9uZS1jb25maXJtX19yZXBlYXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXIudGV4dCh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICQoJy5qcy10aW1lci0tcmVwZWF0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnQpO1xyXG4gICAgICAgICAgICAgICAgdGltKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHRpbSgpO1xyXG59XHJcblxyXG4vL1RleHRhcmVhIGF1dG9IZWlnaHRcclxuaWYgKCQoJy5qcy10ZXh0YXJlYScpLmxlbmd0aCkge1xyXG4gICAgdmFyIHRleHRhcmVhID0gJCgnLmpzLXRleHRhcmVhJyk7XHJcbiAgICB0ZXh0YXJlYS5vbigna2V5ZG93bicsIGF1dG9zaXplKTtcclxuXHJcbiAgICB0ZXh0YXJlYS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSAmJlxyXG4gICAgICAgICAgICAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDEwKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSArPSAnXFxyXFxuJztcclxuICAgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXV0b3NpemUoKSB7XHJcbiAgICBsZXQgZWwgPSB0aGlzO1xyXG4gICAgbGV0IGNoYXRCb2R5ID0gJCgnLmNoYXRfX2JvZHknKTtcclxuICAgIGxldCBjaGF0Rm9vdGVySGVpZ2h0ID0gJCgnLmNoYXRfX2Zvb3RlcicpLm91dGVySGVpZ2h0KCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGVsLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OjM3cHgnO1xyXG4gICAgICAgIGVsLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIGNoYXRCb2R5LmNzcyh7XHJcbiAgICAgICAgICAgIGJvdHRvbTogMzkgKyBlbC5zY3JvbGxIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+PSAxMjMpIHtcclxuICAgICAgICAgICAgZWwuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XHJcbiAgICAgICAgICAgIGNoYXRCb2R5LmNzcyh7XHJcbiAgICAgICAgICAgICAgICBib3R0b206IGNoYXRGb290ZXJIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDApO1xyXG59XHJcblxyXG4kKCcuanMtZGlzYWJsZS1jYXRlZ29yeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRpdGxlID0gJCh0aGlzKS5kYXRhKCd0aXRsZScpO1xyXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICQoJyNkaXNhYmxlLWNhdGVnb3J5JykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAkKCcuZGlzYWJsZS1jYXRlZ29yeV9fZGF0YS10aXRsZScpLnRleHQodGl0bGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy9TZWFyY2ggSGludFxyXG5pZiAoJCgnLmpzLXNlYXJjaC1pbnB1dCcpLmxlbmd0aCkge1xyXG4gICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xyXG4gICAgc2VhcmNoSW5wdXRcclxuICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8vQ3JtLmFwbGljYXRpb24uY2hhbmdlU3J2aWNlXHJcbiQoZG9jdW1lbnQpLm9uKCdzZWxlY3QyOnNlbGVjdCcsICcuanMtc2VsZWN0LS1zZXJ2aWNlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0ICRwYXJyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtYXBsaWNhdGlvbi1pdGVtJyk7XHJcbiAgICAkcGFycmVudFxyXG4gICAgICAgIC5maW5kKCcuanMtYXBsaWNhdGlvbi1pdGVtLXNlcnZpY2UnKVxyXG4gICAgICAgIC5maW5kKCcuYmItaW5wdXRfX3dyYXAnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnaXMtaGlkZGVuJylcclxuICAgICAgICAuZW5kKClcclxuICAgICAgICAuZmluZCgnLmpzLWFwbGljYXRpb24taXRlbS0tZWRpdCcpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxufSk7XHJcblxyXG4vL0NybS5yZXF1ZXN0IHNvcnRhYmxlXHJcbiQoJy5qcy1zb3J0YWJsZScpXHJcbiAgICAuc29ydGFibGUoe1xyXG4gICAgICAgIGNvbm5lY3RXaXRoOiAnLmpzLXNvcnRhYmxlJyxcclxuICAgICAgICBjdXJzb3I6ICdtb3ZlJyxcclxuICAgICAgICB0b2xlcmFuY2U6ICdwb2ludGVyJyxcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24oZSwgdWkpIHtcclxuICAgICAgICAgICAgdWkuaXRlbS5hZGRDbGFzcygnZHJhZy1zb3J0Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wOiBmdW5jdGlvbihlLCB1aSkge1xyXG4gICAgICAgICAgICB1aS5pdGVtLnJlbW92ZUNsYXNzKCdkcmFnLXNvcnQnKTtcclxuICAgICAgICAgICAgdWkuaXRlbS5yZW1vdmVDbGFzcygncmVxdWVzdC1pdGVtLS1uZXcnKTtcclxuICAgICAgICAgICAgQ3JtLnJlcXVlc3Qud2lnZXRSZXBsYWNlSWNvbih1aS5pdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLmRpc2FibGVTZWxlY3Rpb24oKTtcclxuXHJcbi8vU3R1ZGlvIHRvZ2dsZSBjb250cm9sXHJcbmZ1bmN0aW9uIHRvZ2dsZUNvbnRyb2woKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXN0dWRpby1zeXN0ZW0tYnRuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1zdHVkaW8tc3lzdGVtJyk7XHJcbiAgICAgICAgbGV0ICR3aWRnZXRMZWZ0ID0gJHBhcmVudC5maW5kKCcud2lkZ2V0X19sZWZ0Jyk7XHJcbiAgICAgICAgbGV0ICR3aWRnZXRSaWdodCA9ICRwYXJlbnQuZmluZCgnLndpZGdldF9fcmlnaHQnKTtcclxuICAgICAgICBsZXQgJHRpdGxlTGVmdCA9ICRwYXJlbnQuZmluZCgnLmJiLWNoZWNrYm94X190aXRsZS0tbGVmdCcpO1xyXG4gICAgICAgIGxldCAkdGl0bGVSaWdodCA9ICRwYXJlbnQuZmluZCgnLmJiLWNoZWNrYm94X190aXRsZS0tcmlnaHQnKTtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICByZW1vdmUoJHdpZGdldFJpZ2h0KTtcclxuICAgICAgICAgICAgYWRkKCR3aWRnZXRMZWZ0KTtcclxuICAgICAgICAgICAgJHRpdGxlTGVmdC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkdGl0bGVSaWdodC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbW92ZSgkd2lkZ2V0TGVmdCk7XHJcbiAgICAgICAgICAgIGFkZCgkd2lkZ2V0UmlnaHQpO1xyXG4gICAgICAgICAgICAkdGl0bGVMZWZ0LnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgICAgICR0aXRsZVJpZ2h0LmFkZENsYXNzKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkKGVsKSB7XHJcbiAgICAgICAgZWwuZmluZCgnLmxpc3QtLWljb24nKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpc3QtY29sb3ItLXN1Y2Nlc3MnKVxyXG4gICAgICAgICAgICAuZmluZCgnLmxpc3RfX2ljb24nKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhbCcpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGVsKSB7XHJcbiAgICAgICAgZWwuZmluZCgnLmxpc3QtLWljb24nKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpc3QtY29sb3ItLXN1Y2Nlc3MnKVxyXG4gICAgICAgICAgICAuZmluZCgnLmxpc3RfX2ljb24nKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhcycpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFsJyk7XHJcbiAgICB9XHJcbn1cclxudG9nZ2xlQ29udHJvbCgpO1xyXG5cclxuLy9DYXJkIEFkcmVzcyBNYXBcclxuaWYgKCQoJyNjYXJkLW1hcCcpLmxlbmd0aCkge1xyXG4gICAgeW1hcHMucmVhZHkoaW5pdCk7XHJcbiAgICB2YXIgbXlNYXAsIG15UGxhY2VtYXJrLCBteVBpbjtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY2FyZC1tYXAnLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSxcclxuICAgICAgICAgICAgem9vbTogMTZcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoWydzY3JvbGxab29tJ10pO1xyXG5cclxuICAgICAgICBteU1hcC5jb250cm9sc1xyXG4gICAgICAgICAgICAucmVtb3ZlKCdzZWFyY2hDb250cm9sJylcclxuICAgICAgICAgICAgLnJlbW92ZSgndHlwZVNlbGVjdG9yJylcclxuICAgICAgICAgICAgLmFkZCgncm91dGVFZGl0b3InKTtcclxuXHJcbiAgICAgICAgbXlQaW4gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbihcclxuICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvaWNvbnMvc3ZnL21hcC1waW4uc3ZnJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLCB7XHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOlxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fdGl0bGVcIj5OYWlseiBYIENvbGxhYjwvc3Bhbj4nLFxyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudEJvZHk6XHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtcGluX19wbGFjZVwiPtGD0LsuINCR0L7Qu9GM0YjQsNGPINCf0L7Qu9GP0L3QutCwLCA1MdCQLzksINCc0L7RgdC60L7QstGB0LrQuNC5INGALdC9PC9zcGFuPiA8ZGl2IGNsYXNzPVwibWFwLXBpbl9fcHJvcGVydGllc1wiPjx1bCBjbGFzcz1cInByb3BlcnRpZXNfX2xpc3RcIj48bGkgY2xhc3M9XCJwcm9wZXJ0aWVzX19pdGVtIHByb3BlcnRpZXNfX2l0ZW1fc2FsZSBiYi1kcm9wZG93biB0b3AgYmItZHJvcGRvd24tLWhvdmVyIGpzLWJiLWRyb3Bkb3duXCI+IDxzdmcgY2xhc3M9XCJpY29uIGljb24tcHJvY2VudCBcIj48dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNwcm9jZW50XCI+PC91c2U+PC9zdmc+PGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19saXN0XCI+0LXRgdGC0Ywg0YHQutC40LTQutC4PC9kaXY+PC9saT48bGkgY2xhc3M9XCJwcm9wZXJ0aWVzX19pdGVtIHByb3BlcnRpZXNfX2l0ZW1fY2FyIGJiLWRyb3Bkb3duIHRvcCBiYi1kcm9wZG93bi0taG92ZXIganMtYmItZHJvcGRvd25cIj4gPHN2ZyBjbGFzcz1cImljb24gaWNvbi1jYXIgXCI+PHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2FyXCI+PC91c2U+PC9zdmc+PGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19saXN0XCI+0LzQvtCz0YMg0L/RgNC40LXRhdCw0YLRjDwvZGl2PjwvbGk+PC91bD48L2Rpdj4nLFxyXG4gICAgICAgICAgICBoaW50Q29udGVudDpcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faG92ZXJcIj4xLdC60L7QvNC90LDRgtC90LDRjyDQutCy0LDRgNGC0LjRgNCwIDxkaXYgY2xhc3M9XCJyYXRpbmdcIj48ZGl2IGNsYXNzPVwicmF0aW5nX19pbm5lclwiIHN0eWxlPVwid2lkdGg6IDkwJVwiPjwvZGl2PjwvZGl2PiA8c3Bhbj7QvtGCIDIgODAwIDxpIGNsYXNzPVwicnViXCI+YTwvaT48L3NwYW4+IDwvZGl2PidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBpbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vQ2FiaW5ldCBNYXBcclxuaWYgKCQoJyNjYWJpbmV0LW1hcCcpLmxlbmd0aCkge1xyXG4gICAgeW1hcHMucmVhZHkoaW5pdCk7XHJcbiAgICB2YXIgbXlNYXAsIG15UGxhY2VtYXJrLCBteVBpbjtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY2FiaW5ldC1tYXAnLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSxcclxuICAgICAgICAgICAgem9vbTogMTZcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoWydzY3JvbGxab29tJ10pO1xyXG5cclxuICAgICAgICBteU1hcC5jb250cm9sc1xyXG4gICAgICAgICAgICAucmVtb3ZlKCdzZWFyY2hDb250cm9sJylcclxuICAgICAgICAgICAgLnJlbW92ZSgndHlwZVNlbGVjdG9yJylcclxuICAgICAgICAgICAgLmFkZCgncm91dGVFZGl0b3InKTtcclxuXHJcbiAgICAgICAgbXlQaW4gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbihcclxuICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvaWNvbnMvc3ZnL21hcC1waW4uc3ZnJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdKTtcclxuXHJcbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBpbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vQ2F0YWxvZyBNYXBcclxuaWYgKCQoJyNjYXRhbG9nLW1hcCwgI21hcCcpLmxlbmd0aCkge1xyXG4gICAgeW1hcHMucmVhZHkoaW5pdCk7XHJcbiAgICB2YXIgbXlNYXAsIG15UGxhY2VtYXJrLCBteVBpbjtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIG15TWFwID0gbmV3IHltYXBzLk1hcCgnY2F0YWxvZy1tYXAnLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzU1LjczMjI2ODUzLCAzNy42MjA5MTkxXSxcclxuICAgICAgICAgICAgem9vbTogMTZcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoWydzY3JvbGxab29tJ10pO1xyXG5cclxuICAgICAgICBteU1hcC5jb250cm9sc1xyXG4gICAgICAgICAgICAucmVtb3ZlKCdzZWFyY2hDb250cm9sJylcclxuICAgICAgICAgICAgLnJlbW92ZSgndHlwZVNlbGVjdG9yJylcclxuICAgICAgICAgICAgLmFkZCgncm91dGVFZGl0b3InKTtcclxuXHJcbiAgICAgICAgbXlQaW4gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbihcclxuICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICdpbWcvaWNvbnMvc3ZnL21hcC1waW4uc3ZnJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLCB7XHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOlxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fdGl0bGVcIj7QodGC0YPQtNC40Y8gXCLQodC70LXQt9CwINC00YDQsNC60L7QvdCwXCI8L3NwYW4+PGRpdiBjbGFzcz1cIm1hcC1waW5fX2FkZHJlc3NcIj7QnNC+0YHQutCy0LAsINGD0LsuINCT0LDQs9Cw0YDQuNC90LAsIDI4LzIsINC8LiDQm9GD0LHRj9C90LrQsDwvZGl2PicsXHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50Qm9keTpcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faW1hZ2UganMtc3MtbWFwLXNsaWRlciBpbWFnZS13cmFwcGVyXCIgICAgICAgICAgICAgICAgZGF0YS1zcy1pbWFnZXM9XCIuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMC5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTEuanBnOy4uL2ltZy9leGFtcGxlcy91c2VyL2NhdGFsb2cvY2F0YWxvZy0yLmpwZzsuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMy5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTQuanBnXCI+PGltZyBzcmM9XCIuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMC5qcGdcIj48L2Rpdj48ZGl2IGNsYXNzPVwibWFwLXBpbl9faW5mb1wiPjxkaXYgY2xhc3M9XCJyYXRpbmcgbWFwLXBpbl9fcmF0aW5nXCI+PGRpdiBjbGFzcz1cInJhdGluZ19faW5uZXJcIiBzdHlsZT1cIndpZHRoOiA3MCVcIj48L2Rpdj48c3BhbiBjbGFzcz1cInJhdGluZ19fcmV2LWNvdW50XCI+KDc3KTwvc3Bhbj48L2Rpdj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uLWljb24gYnV0dG9uLWljb24tLWZhdiBtYXAtcGluX19mYXYganMtYnRuLWZhdlwiPjwvYnV0dG9uPjwvZGl2PidcclxuICAgICAgICAgICAgLy8gaGludENvbnRlbnQ6XHJcbiAgICAgICAgICAgIC8vICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faG92ZXJcIj4xLdC60L7QvNC90LDRgtC90LDRjyDQutCy0LDRgNGC0LjRgNCwIDxkaXYgY2xhc3M9XCJyYXRpbmdcIj48ZGl2IGNsYXNzPVwicmF0aW5nX19pbm5lclwiIHN0eWxlPVwid2lkdGg6IDkwJVwiPjwvZGl2PjwvZGl2PiA8c3Bhbj7QvtGCIDIgODAwIDxpIGNsYXNzPVwicnViXCI+YTwvaT48L3NwYW4+IDwvZGl2PidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlNYXAuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jdGlvbigpIHt9KTtcclxuXHJcbiAgICAgICAgbXlQbGFjZW1hcmsuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLXNzLW1hcC1zbGlkZXInKS5zaW1wbGVzbGlkZXIoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdiYWxvb24gY2xpY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBpbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vRmllbGQgRWRpdFxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgZmllbGRFZGl0ID0gJy5qcy1maWVsZC1lZGl0JztcclxuICAgIGxldCAkZmllbGRFZGl0ID0gJChkb2N1bWVudCkuZmluZCgnLmpzLWZpZWxkLWVkaXQnKTtcclxuXHJcbiAgICAkZmllbGRFZGl0LmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0ICRmaWVsZEVkaXRJbnB1dCA9ICQodGhpcykuZmluZCgnLmZpZWxkLWVkaXRfX2lucHV0Jyk7XHJcbiAgICAgICAgbGV0ICRmaWVsZEVkaXRCdG4gPSAkKHRoaXMpLmZpbmQoJy5maWVsZC1lZGl0X19idG4nKTtcclxuXHJcbiAgICAgICAgJGZpZWxkRWRpdEJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRmaWVsZEVkaXRJbnB1dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KGZpZWxkRWRpdClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9faW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCAkZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KGZpZWxkRWRpdClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuZmllbGQtZWRpdF9fdGV4dCcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpZWxkRWRpdFRleHQgPSAkZmllbGRFZGl0VGV4dC50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgJGZpZWxkRWRpdFRleHQuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgJGZpZWxkRWRpdElucHV0XHJcbiAgICAgICAgICAgICAgICAudmFsKGZpZWxkRWRpdFRleHQpXHJcbiAgICAgICAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRmaWVsZEVkaXRJbnB1dFxyXG4gICAgICAgICAgICAuYmx1cihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCAkZmllbGRFZGl0VGV4dCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuY2xvc2VzdChmaWVsZEVkaXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5maWVsZC1lZGl0X190ZXh0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZSA/IHRoaXMuZGVmYXVsdFZhbHVlIDogJyc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAkZmllbGRFZGl0VGV4dC5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5rZXlwcmVzcyhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRmaWVsZEVkaXRUZXh0ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KGZpZWxkRWRpdClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmZpZWxkLWVkaXRfX3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAnMTMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQudHJpbSh0aGlzLnZhbHVlKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWUgPyB0aGlzLmRlZmF1bHRWYWx1ZSA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZEVkaXRUZXh0Lmh0bWwodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAkZmllbGRFZGl0QnRuLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZpZWxkRWRpdFRleHQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSgpO1xyXG5cclxuLypcclxuICoqKiBEYXRlUGlja2VyXHJcbiAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJGRhdGVwaWNrZXIgPSAkKCcuanMtZGF0ZScpO1xyXG4gICAgbGV0IGRhdGVUb2RheSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgJGRhdGVwaWNrZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLmJiLWRhdGUnKTtcclxuICAgICAgICBsZXQgJGJ0blRvZGF5ID0gJHBhcmVudC5maW5kKCcuYmItZGF0ZV9fYnRuLS10b2RheScpO1xyXG4gICAgICAgIGxldCAkYnRuUHJldiA9ICRwYXJlbnQuZmluZCgnLmJiLWRhdGVfX2J0bi0tcHJldicpO1xyXG4gICAgICAgIGxldCAkYnRuTmV4dCA9ICRwYXJlbnQuZmluZCgnLmJiLWRhdGVfX2J0bi0tbmV4dCcpO1xyXG4gICAgICAgIGxldCB0eXBlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXR5cGUnKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdleHBhbmRlZCcpIHtcclxuICAgICAgICAgICAgbGV0IF9zZWxmID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VWYWwoJCh0aGlzKSwgdmFsKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihmb3JtYXR0ZWREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVZhbChfc2VsZiwgZm9ybWF0dGVkRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgIC5zZWxlY3REYXRlKGRhdGVUb2RheSk7XHJcblxyXG4gICAgICAgICAgICAvL1BpY2tlciB3aXRoIGNvbnRyb2xzXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29udHJvbHMnKSB7XHJcbiAgICAgICAgICAgIGxldCBfc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlVmFsKCQodGhpcyksIHZhbCk7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dXZWVrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbkRhdGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZm9ybWF0dGVkRGF0ZSwgZGF0ZSwgaW5zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TW9udGggPSBkYXRlLmdldE1vbnRoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmREYXRlID0gbmV3IERhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBkYXRlLmdldERhdGUoKSAtIGRhdGUuZ2V0RGF5KCkgKyA3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0RGF5KCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgNyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXRNb250aCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlVmFsKF9zZWxmLCBmb3JtYXR0ZWREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdERhdGUoZGF0ZVRvZGF5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcclxuICAgICAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdkZC5tbS55eScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogZGF0ZVRvZGF5XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdERhdGUoZGF0ZVRvZGF5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRkYXRlcGlja2VyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCd0eXBlJywgJ2RhdGUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2V0SW5wdXREYXRlKCcuanMtZGF0ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkYnRuVG9kYXkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRwYXJlbnRcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0RGF0ZShkYXRlVG9kYXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkYnRuUHJldi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgIC5wcmV2KCk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ2NsaWNrIHByZXYnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9TaG93IERhdGVwaWNrZXIgd2hlbiBjbGljayBwYXJyZW50IGNvbnRhaW5lclxyXG4gICAgICAgICRwYXJlbnQuZmluZCgnLmpzLWRhdGUtZmllbGQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0ICRkYXRlcGlja2VyID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5iYi1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuanMtZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0ZXBpY2tlcigpXHJcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpO1xyXG5cclxuICAgICAgICAgICAgJGRhdGVwaWNrZXIuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL0NoYW5nZSBkYXRlIGZpZWxkIChub3QgaW5wdXQpIHZhbHVlXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlVmFsKGVsLCB2YWwpIHtcclxuICAgICAgICAgICAgZWwuY2xvc2VzdCgnLmJiLWRhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlLWZpZWxkJylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9DbGljayBpY29uIC0gc2hvdyBwaWNrZXJcclxuICAgICQoJy5qcy1pbnB1dC1pY29uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKCcuanMtZGF0ZScpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1NldCBJbnB1dCBEYXRlIFZhbHVlXHJcbiAgICBmdW5jdGlvbiBzZXRJbnB1dERhdGUoZWwpIHtcclxuICAgICAgICBsZXQgX2RhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWwpO1xyXG4gICAgICAgIGxldCBob3kgPSBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBkID0gaG95LmdldERhdGUoKSxcclxuICAgICAgICAgICAgbSA9IGhveS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICAgICAgeSA9IGhveS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBkYXRhO1xyXG5cclxuICAgICAgICBpZiAoZCA8IDEwKSB7XHJcbiAgICAgICAgICAgIGQgPSAnMCcgKyBkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobSA8IDEwKSB7XHJcbiAgICAgICAgICAgIG0gPSAnMCcgKyBtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YSA9IHkgKyAnLScgKyBtICsgJy0nICsgZDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IF9kYXQubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgX2RhdFtpXS52YWx1ZSA9IGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlRGF0YVNjaGVkdWxlKCkge1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGNybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcCA9ICQoJy5qc0NybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcCcpO1xyXG4gICAgbGV0IHJ1RGF0ZXMgPSBnZXRXZWVrU2NoZWR1bGUoZGF0ZSk7XHJcblxyXG4gICAgdXBkYXRlVmFsU2NoZWR1bGUocnVEYXRlcyk7XHJcblxyXG4gICAgaWYgKGNybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcC5sZW5ndGgpIHtcclxuICAgICAgICBjcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3BcclxuICAgICAgICAgICAgLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlU2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWluRGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZm9ybWF0dGVkRGF0ZSwgZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBydURhdGVzID0gZ2V0V2Vla1NjaGVkdWxlKGRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxTY2hlZHVsZShydURhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAuc2VsZWN0RGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbnVwZGF0ZURhdGFTY2hlZHVsZSgpO1xyXG5cclxuKGZ1bmN0aW9uIGRhdGVQaWNrZXJJbmxpbmUoKSB7XHJcbiAgICB2YXIgZXZlbnREYXRlcyA9IFsxLCAxMCwgMTIsIDIyXTtcclxuXHJcbiAgICAkKCcuanMtZGF0ZS1pbmxpbmUnKS5kYXRlcGlja2VyKHtcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgbXVsdGlwbGVEYXRlczogdHJ1ZSxcclxuICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGxUeXBlID09ICdkYXknICYmIGV2ZW50RGF0ZXMuaW5kZXhPZihjdXJyZW50RGF0ZSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2lzLWNoZWNrZWQnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVWYWxTY2hlZHVsZSh2YWx1ZSkge1xyXG4gICAgbGV0IGNybVNjaGVkdWxlRGF0ZUZpZWxkVG9wID0gJCgnLmpzQ3JtU2NoZWR1bGVEYXRlRmllbGRUb3AnKTtcclxuXHJcbiAgICBjcm1TY2hlZHVsZURhdGVGaWVsZFRvcC50ZXh0KHZhbHVlLmdldCgndGV4dCcpKTtcclxuXHJcbiAgICBjcm1TY2hlZHVsZURhdGVGaWVsZFRvcC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanNDcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3AnKVxyXG4gICAgICAgICAgICAuZGF0ZXBpY2tlcigpXHJcbiAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgLnNob3coKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXZWVrU2NoZWR1bGUoZGF0ZSkge1xyXG4gICAgbGV0IGN1cnIgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgIGxldCBjdXJyRGF5ID0gY3Vyci5nZXREYXkoKTtcclxuICAgIGxldCBjdXJyTW9udGggPSBjdXJyLmdldE1vbnRoKCk7XHJcbiAgICBsZXQgbW9uZGF5O1xyXG4gICAgbGV0IHN1bmRheTtcclxuXHJcbiAgICBpZiAoY3VyckRheSA9PT0gMCkge1xyXG4gICAgICAgIG1vbmRheSA9IGN1cnIuZ2V0RGF0ZSgpIC0gNjtcclxuICAgICAgICBzdW5kYXkgPSBjdXJyLmdldERhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbW9uZGF5ID0gY3Vyci5nZXREYXRlKCkgLSBjdXJyLmdldERheSgpICsgMTtcclxuICAgICAgICBzdW5kYXkgPSBtb25kYXkgKyA2O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZXRSaWdodFdlZWtUZXh0KGN1cnIsIG1vbmRheSwgc3VuZGF5LCBjdXJyTW9udGgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSaWdodFdlZWtUZXh0KGN1cnJEYXRlLCBtb25kYXksIHN1bmRheSwgbW9udGgpIHtcclxuICAgIGxldCBmaXJzdERheTtcclxuICAgIGxldCBsYXN0RGF5O1xyXG4gICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICBtb250aDogJ3Nob3J0J1xyXG4gICAgfTtcclxuICAgIGxldCBvRGF5RjtcclxuICAgIGxldCBvRGF5TDtcclxuICAgIGxldCBvTW9udGhGO1xyXG4gICAgbGV0IG9Nb250aEw7XHJcbiAgICBsZXQgb1llYXJGO1xyXG4gICAgbGV0IG9ZZWFyTDtcclxuICAgIGxldCBhcnJEYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBsZXQgdGVtcDtcclxuXHJcbiAgICBpZiAoc3VuZGF5ID4gbW9uZGF5ICYmIChtb25kYXkgPT09IDAgfHwgbW9uZGF5IDwgMCkpIHtcclxuICAgICAgICBsZXQgbmV3TW9udGggPSBuZXcgRGF0ZShjdXJyRGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aCwgMSk7XHJcblxyXG4gICAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUoY3VyckRhdGUuc2V0RGF0ZShtb25kYXkpKTtcclxuICAgICAgICBvRGF5RiA9IGZpcnN0RGF5LmdldERhdGUoKTtcclxuICAgICAgICBvWWVhckYgPSBmaXJzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBmaXJzdERheSA9IGZpcnN0RGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIHBhcmFtcyk7XHJcbiAgICAgICAgb01vbnRoRiA9IGZpcnN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGxhc3REYXkgPSBuZXcgRGF0ZShuZXdNb250aC5zZXREYXRlKHN1bmRheSkpO1xyXG4gICAgICAgIG9EYXlMID0gbGFzdERheS5nZXREYXRlKCk7XHJcbiAgICAgICAgb1llYXJMID0gbGFzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBsYXN0RGF5ID0gbGFzdERheS50b0xvY2FsZVN0cmluZygncnUnLCBwYXJhbXMpO1xyXG4gICAgICAgIG9Nb250aEwgPSBsYXN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChvWWVhckYgPT09IG9ZZWFyTCkge1xyXG4gICAgICAgICAgICB0ZW1wID1cclxuICAgICAgICAgICAgICAgIG9EYXlGICtcclxuICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICBvTW9udGhGICtcclxuICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgIG9EYXlMICtcclxuICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgb1llYXJGO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXAgPVxyXG4gICAgICAgICAgICAgICAgb0RheUYgK1xyXG4gICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgIG9Nb250aEYgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBvWWVhckYgK1xyXG4gICAgICAgICAgICAgICAgJyAtICcgK1xyXG4gICAgICAgICAgICAgICAgb0RheUwgK1xyXG4gICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgIG9Nb250aEwgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBvWWVhckw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyckRhdGEuYXBwZW5kKCd0ZXh0JywgdGVtcCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUoY3VyckRhdGUuc2V0RGF0ZShtb25kYXkpKTtcclxuICAgICAgICBvRGF5RiA9IGZpcnN0RGF5LmdldERhdGUoKTtcclxuICAgICAgICBvWWVhckYgPSBmaXJzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBmaXJzdERheSA9IGZpcnN0RGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIHBhcmFtcyk7XHJcbiAgICAgICAgb01vbnRoRiA9IGZpcnN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGxhc3REYXkgPSBuZXcgRGF0ZShjdXJyRGF0ZS5zZXREYXRlKHN1bmRheSkpO1xyXG4gICAgICAgIG9EYXlMID0gbGFzdERheS5nZXREYXRlKCk7XHJcbiAgICAgICAgb1llYXJMID0gbGFzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBsYXN0RGF5ID0gbGFzdERheS50b0xvY2FsZVN0cmluZygncnUnLCBwYXJhbXMpO1xyXG4gICAgICAgIG9Nb250aEwgPSBsYXN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChvTW9udGhMID09PSBvTW9udGhGKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBvRGF5RiArICcgLSAnICsgb0RheUwgKyAnICcgKyBvTW9udGhGICsgJywgJyArIG9ZZWFyRjtcclxuICAgICAgICAgICAgYXJyRGF0YS5hcHBlbmQoJ3RleHQnLCB0ZW1wKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAob1llYXJGID09PSBvWWVhckwpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPVxyXG4gICAgICAgICAgICAgICAgICAgIG9EYXlGICtcclxuICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9Nb250aEYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgICAgICBvRGF5TCArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckY7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID1cclxuICAgICAgICAgICAgICAgICAgICBvRGF5RiArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhGICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgICAgICBvRGF5TCArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJyRGF0YS5hcHBlbmQoJ3RleHQnLCB0ZW1wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFyckRhdGE7XHJcbn1cclxuXHJcblxyXG4vKlxyXG4gKioqIENhbGVuZGFyXHJcbiAqL1xyXG5jb25zdCBDYWxlbmRhciA9IChmdW5jdGlvbigkKSB7XHJcbiAgICBsZXQgJGNhbGVuZGFyID0gJCgnI2NhbGVuZGFyJyk7XHJcbiAgICBsZXQgY2FsZW5kYXIgPSB7fTtcclxuXHJcbiAgICBjYWxlbmRhci5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCRjYWxlbmRhci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZVN0ZXAoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcnJFbXBsb3llZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcnJEYXRhID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL2NhcmEtYXZhdGFyLmpwZycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ9CQ0LvQtdC90LAg0J7Rh9C10L3RjNC00LvQuNC90L3QsNGP0YTQsNC80LjQu9C40Y8nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL2NhcmEtYXZhdGFyLTEuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JDQu9C10L3QsCDQntGH0LXQvdGM0LTQu9C40L3QvdCw0Y/RhNCw0LzQuNC70LjRjydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvZGFuaWVsYS1hdmF0YXIuanBnJyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn0JDQu9C10L3QsCDQntGH0LXQvdGM0LTQu9C40L3QvdCw0Y/RhNCw0LzQuNC70LjRjydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiAnaW1nL2V4YW1wbGVzL3VzZXIvbGltYS1hdmF0YXItMS5qcGcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQkNC70LXQvdCwINCe0YfQtdC90YzQtNC70LjQvdC90LDRj9GE0LDQvNC40LvQuNGPJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9saW1hLWF2YXRhci5qcGcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQkNC70LXQvdCwINCe0YfQtdC90YzQtNC70LjQvdC90LDRj9GE0LDQvNC40LvQuNGPJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6ICdpbWcvZXhhbXBsZXMvdXNlci9ub2F2YXRhci5qcGcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQnNC40YHRgtC10YAg0JPQuNC/0YEnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogJ2ltZy9leGFtcGxlcy91c2VyL2F2YXRhci5qcGcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfQlNGP0LTRjyDQktCw0YHRjydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGFyckRhdGEubWFwKGZ1bmN0aW9uKGRhdGEsIGkpIHtcclxuICAgICAgICAgICAgICAgIGFyckVtcGxveWVlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidXNlciB1c2VyLS1zbWFsbFwiPjxkaXYgY2xhc3M9XCJ1c2VyX19pbWdcIj48aW1nIHNyYz1cIicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmF2YXRhciArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIiAvPjwvZGl2PjxkaXYgY2xhc3M9XCJ1c2VyX19uYW1lXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubmFtZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIueHkuc2NhbGVfaGVpZ2h0ID0gODU7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci54eS5uYXZfaGVpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5jb25maWcubXVsdGlfZGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy54bWxfZGF0ZSA9ICclWS0lbS0lZCAlSDolaSc7XHJcblxyXG4gICAgICAgICAgICBjYWxlbmRhci50b29sdGlwKCk7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuY29uZmlnLm1hcmtfbm93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmxvY2FsZS5sYWJlbHMudW5pdF90YWIgPSAnVW5pdCc7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5sb2NhbGUubGFiZWxzLnNlY3Rpb25fY3VzdG9tID0gJ1NlY3Rpb24nO1xyXG4gICAgICAgICAgICBzY2hlZHVsZXIuY29uZmlnLmZpcnN0X2hvdXIgPSA0O1xyXG4gICAgICAgICAgICBzY2hlZHVsZXIuY29uZmlnLmxpbWl0X3RpbWVfc2VsZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5kZXRhaWxzX29uX2NyZWF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuY3JlYXRlVW5pdHNWaWV3KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICd1bml0JyxcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnc2VjdGlvbl9pZCcsXHJcbiAgICAgICAgICAgICAgICBsaXN0OiBhcnJFbXBsb3llZXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY2hlZHVsZXIuYWRkTWFya2VkVGltZXNwYW4oe1xyXG4gICAgICAgICAgICAgICAgc3RhcnRfZGF0ZTogbmV3IERhdGUoMjAxOCwgMTEsIDE2LCA2LCAzMCksXHJcbiAgICAgICAgICAgICAgICBlbmRfZGF0ZTogbmV3IERhdGUoMjAxOCwgMTEsIDE2LCAxMSksXHJcbiAgICAgICAgICAgICAgICBjc3M6ICdkaHhfdGltZV9yZXNlcnZlZCcsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZGh4X3RpbWVfYmxvY2snLCAvLyB3aWxsIGFjdCBhcyBibG9ja2VkIHNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHNlY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmU6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgdW5pdDogNFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNhbGVuZGFyLnN0YXR1c0luaXQoKTtcclxuXHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5pbml0KCdjYWxlbmRhcicsIG5ldyBEYXRlKDIwMTgsIDExLCAxNiksICd3ZWVrJyk7XHJcbiAgICAgICAgICAgIGNhbGVuZGFyLnRpbWVTcGFuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjYWxlbmRhci50aW1lU3BhbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBmaXhfZGF0ZSA9IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgLy8gMTc6NDg6NTYgLT4gMTc6MzA6MDBcclxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICAvLyBpZiAoZGF0ZS5nZXRNaW51dGVzKCkgPiAzMClcclxuICAgICAgICAgICAgLy8gICAgIGRhdGUuc2V0TWludXRlcygxNSk7XHJcbiAgICAgICAgICAgIC8vIGVsc2VcclxuICAgICAgICAgICAgLy8gICAgIGRhdGUuc2V0TWludXRlcygwKTtcclxuICAgICAgICAgICAgLy8gZGF0ZS5zZXRTZWNvbmRzKDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaXhfZGF0ZSk7XHJcblxyXG4gICAgICAgIHZhciBtYXJrZWRfZGF0ZSA9IG51bGw7XHJcbiAgICAgICAgdmFyIG1hcmtlZCA9IG51bGw7XHJcbiAgICAgICAgdmFyIGV2ZW50X3N0ZXAgPSAxNTtcclxuXHJcbiAgICAgICAgc2NoZWR1bGVyLmF0dGFjaEV2ZW50KCdvbk1vdXNlTW92ZScsIGZ1bmN0aW9uKGV2ZW50X2lkLCBuYXRpdmVfZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBzY2hlZHVsZXIuZ2V0QWN0aW9uRGF0YShuYXRpdmVfZXZlbnQpLmRhdGU7XHJcbiAgICAgICAgICAgIHZhciBmaXhlZF9kYXRlID0gZml4X2RhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpeGVkX2RhdGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCtmaXhlZF9kYXRlICE9ICttYXJrZWRfZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2NoZWR1bGVyLnVubWFya1RpbWVzcGFuKG1hcmtlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWFya2VkX2RhdGUgPSBmaXhlZF9kYXRlO1xyXG4gICAgICAgICAgICAgICAgbWFya2VkID0gc2NoZWR1bGVyLm1hcmtUaW1lc3Bhbih7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRfZGF0ZTogZml4ZWRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmRfZGF0ZTogc2NoZWR1bGVyLmRhdGUuYWRkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhlZF9kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudF9zdGVwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWludXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzOiAnYy1jYWxlbmRhcl9fdGltZXNwYW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRfZGF0ZS5nZXRIb3VycygpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzonICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRfZGF0ZS5nZXRNaW51dGVzKCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGVuZGFyLnN0YXR1c0luaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzY2hlZHVsZXIudGVtcGxhdGVzLmV2ZW50X2NsYXNzID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGNzcyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmV2VHlwZSlcclxuICAgICAgICAgICAgICAgIC8vIGlmIGV2ZW50IGhhcyB0eXBlIHByb3BlcnR5IHRoZW4gc3BlY2lhbCBjbGFzcyBzaG91bGQgYmUgYXNzaWduZWRcclxuICAgICAgICAgICAgICAgIGNzcyArPSAnZXZlbnRfJyArIGdldExhYmVsKGV2VHlwZSwgZXZlbnQuZXZUeXBlKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNzczsgLy8gZGVmYXVsdCByZXR1cm5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRMYWJlbChhcnJheSwga2V5KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gYXJyYXlbaV0ua2V5KSByZXR1cm4gYXJyYXlbaV0ubGFiZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZXZUeXBlID0gW1xyXG4gICAgICAgICAgICB7IGtleTogJycsIGxhYmVsOiAnU2VsZWN0IGV2ZW50IHR5cGUnIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiAxLCBsYWJlbDogJ25ldycgfSxcclxuICAgICAgICAgICAgeyBrZXk6IDIsIGxhYmVsOiAnd29ya2luZycgfSxcclxuICAgICAgICAgICAgeyBrZXk6IDMsIGxhYmVsOiAnZG9uZScgfSxcclxuICAgICAgICAgICAgeyBrZXk6IDQsIGxhYmVsOiAnY2FuY2VsZWQnIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBzY2hlZHVsZXIubG9jYWxlLmxhYmVscy5zZWN0aW9uX2V2VHlwZSA9ICdFdmVudCB0eXBlJztcclxuXHJcbiAgICAgICAgc2NoZWR1bGVyLmNvbmZpZy5saWdodGJveC5zZWN0aW9ucyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ2V2VHlwZScsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3NlbGVjdCcsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBldlR5cGUsXHJcbiAgICAgICAgICAgICAgICBtYXBfdG86ICdldlR5cGUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYWxlbmRhci50b29sdGlwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHRvb2x0aXAgPSBzY2hlZHVsZXIuZGh0bWxYVG9vbHRpcDtcclxuICAgICAgICB0b29sdGlwLmNvbmZpZy5jbGFzc05hbWUgPSAnZGh0bWxYVG9vbHRpcCB0b29sdGlwIGMtY2FsZW5kYXItdG9vbHRpcCc7XHJcblxyXG4gICAgICAgIGxldCBmb3JtYXQgPSBzY2hlZHVsZXIuZGF0ZS5kYXRlX3RvX3N0cignJUg6JWknKTtcclxuICAgICAgICBzY2hlZHVsZXIudGVtcGxhdGVzLnRvb2x0aXBfdGV4dCA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCBldmVudCk7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZTtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmV2VHlwZSA9PT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICfQndC+0LLQsNGPJztcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdldmVudF9uZXcnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmV2VHlwZSA9PT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICfQkiDRgNCw0LHQvtGC0LUnO1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2V2ZW50X3dvcmtpbmcnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmV2VHlwZSA9PT0gJzMnKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICfQktGL0L/QvtC70L3QtdC90LAnO1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gJ2V2ZW50X2RvbmUnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmV2VHlwZSA9PT0gJzQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICfQntGC0LzQtdC90LXQvdCwJztcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdldmVudF9jYW5jZWxlZCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsIGZvcm1hdChzdGFydCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX19oZWFkZXIgJHtjbGFzc05hbWV9XCI+JHt0aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX19ib2R5ICR7Y2xhc3NOYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX191c2VyXCI+0JXQu9C10L3QsCDQkNCy0LjQu9C+0LLQsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImMtY2FsZW5kYXItdG9vbHRpcF9fc3RhdHVzXCI+0J3QvtCy0YvQuTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX3Bob25lXCI+KzcgKDkyNykgMTA3LTExLTM5PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX19zZXJ2aWNlXCI+0JDQv9C/0LDRgNCw0YLQvdGL0Lkg0LzQsNC90LjQutGO0YA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjLWNhbGVuZGFyLXRvb2x0aXBfX3RpbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtmb3JtYXQoc3RhcnQpfSAtICR7Zm9ybWF0KGVuZCl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYy1jYWxlbmRhci10b29sdGlwX19wcmljZVwiPjgwMCA8aSBjbGFzcz1cImZhciBmYS1ydWJsZS1zaWduXCI+PC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImMtY2FsZW5kYXItdG9vbHRpcF9fbWFzdGVyXCI+0JzQsNGB0YLQtdGAINCe0LvRjNCz0LAg0JrQsNGA0Y/QutC40L3QsDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuc2hvd01pbmljYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoc2NoZWR1bGVyLmlzQ2FsZW5kYXJWaXNpYmxlKCkpIHNjaGVkdWxlci5kZXN0cm95Q2FsZW5kYXIoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNjaGVkdWxlci5yZW5kZXJDYWxlbmRhcih7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2RoeF9taW5pY2FsX2ljb24nLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogc2NoZWR1bGVyLl9kYXRlLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGRhdGUsIGNhbGVuZGFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyLnNldEN1cnJlbnRWaWV3KGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlci5kZXN0cm95Q2FsZW5kYXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGVuZGFyLnRpbWVTdGVwID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHN0ZXAgPSAxNTtcclxuICAgICAgICBsZXQgZm9ybWF0ID0gc2NoZWR1bGVyLmRhdGUuZGF0ZV90b19zdHIoJyVIOiVpJyk7XHJcblxyXG4gICAgICAgIHNjaGVkdWxlci5jb25maWcuaG91cl9zaXplX3B4ID0gKDYwIC8gc3RlcCkgKiAyMjtcclxuICAgICAgICBzY2hlZHVsZXIudGVtcGxhdGVzLmhvdXJfc2NhbGUgPSBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjAgLyBzdGVwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz1cclxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2hlaWdodDoyMnB4O2xpbmUtaGVpZ2h0OjIycHg7Jz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0KGRhdGUpICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgIGRhdGUgPSBzY2hlZHVsZXIuZGF0ZS5hZGQoZGF0ZSwgc3RlcCwgJ21pbnV0ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbGVuZGFyLmhlaWdodHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XHJcbiAgICAgICAgbGV0IGhlYWRlckhlaWdodCA9ICQoJy5oZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBsZXQgdG9wTGluZUhlaWdodCA9ICQoJy5jYWxlbmRhcl9fdG9wLWxpbmUnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBsZXQgbWVudUhlaWdodCA9ICQoJy5qcy1tZW51Jykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdEhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdEhlaWdodCA9IGhlaWdodCAtIChoZWFkZXJIZWlnaHQgKyB0b3BMaW5lSGVpZ2h0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHRIZWlnaHQgPSBoZWlnaHQgLSAoaGVhZGVySGVpZ2h0ICsgdG9wTGluZUhlaWdodCArIG1lbnVIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcuYy1jYWxlbmRhcicpLmNzcygnaGVpZ2h0JywgcmVzdWx0SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJy0tLSBoZWlnaHQnLCBoZWlnaHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0gaGVhZGVySGVpZ2h0JywgaGVhZGVySGVpZ2h0KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnLS0tIHRvcExpbmVIZWlnaHQnLCB0b3BMaW5lSGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgY2FsZW5kYXIuY3VzdG9uRXZlbnQgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuICAgIHJldHVybiBjYWxlbmRhcjtcclxufSkoalF1ZXJ5KTtcclxuXHJcbnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgQ2FsZW5kYXIuaW5pdCgpO1xyXG59LCAyMDApO1xyXG5cclxuLypcclxuICoqKiBEYXlQaWNrZXJcclxuICovXHJcbihmdW5jdGlvbigpIHtcclxuICAgIGxldCAkZGF5UGlja2VyID0gJCgnLmpzLWRheS1waWNrZXInKTtcclxuICAgIGxldCBhY3RpdmVDbGFzcyA9ICdpcy1hY3RpdmUnO1xyXG4gICAgbGV0IGRpc2FibGVDbGFzcyA9ICdpcy1kaXNhYmxlZCc7XHJcbiAgICBsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgbW9udGhEYXlzID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xyXG5cclxuICAgIGxldCBtb250aHMgPSBbXHJcbiAgICAgICAgJ9Cv0L3QstCw0YDRjCcsXHJcbiAgICAgICAgJ9Ck0LXQstGA0LDQu9GMJyxcclxuICAgICAgICAn0JzQsNGA0YInLFxyXG4gICAgICAgICfQkNC/0YDQtdC70YwnLFxyXG4gICAgICAgICfQnNCw0LknLFxyXG4gICAgICAgICfQmNGO0L3RjCcsXHJcbiAgICAgICAgJ9CY0Y7Qu9GMJyxcclxuICAgICAgICAn0JDQstCz0YPRgdGCJyxcclxuICAgICAgICAn0KHQtdC90YLRj9Cx0YDRjCcsXHJcbiAgICAgICAgJ9Ce0LrRgtGP0LHRgNGMJyxcclxuICAgICAgICAn0J3QvtGP0LHRgNGMJyxcclxuICAgICAgICAn0JTQtdC60LDQsdGA0YwnXHJcbiAgICBdO1xyXG5cclxuICAgICRkYXlQaWNrZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgICAgICByZW5kZXIoX3RoaXMpO1xyXG4gICAgICAgIHRvZGF5V2VlayhfdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCAkaXRlbSA9IF90aGlzLmZpbmQoJy5kYXktcGlja2VyX19pdGVtJyk7XHJcbiAgICAgICAgbGV0ICRhcnJvd1IgPSBfdGhpcy5maW5kKCcuZGF5LXBpY2tlcl9fYXJyb3ctLXJpZ2h0Jyk7XHJcbiAgICAgICAgbGV0ICRhcnJvd0wgPSBfdGhpcy5maW5kKCcuZGF5LXBpY2tlcl9fYXJyb3ctLWxlZnQnKTtcclxuXHJcbiAgICAgICAgJGl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoZGlzYWJsZUNsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgJGl0ZW0ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGFycm93Ui5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgJGFycm93TC5yZW1vdmVDbGFzcyhkaXNhYmxlQ2xhc3MpO1xyXG4gICAgICAgICAgICBtb250aE5hbWVOZXh0KF90aGlzKTtcclxuICAgICAgICAgICAgbmV4dFdlZWsoX3RoaXMpO1xyXG4gICAgICAgICAgICB3ZWVrQ2hlY2soX3RoaXMsIGNvdW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgZGF0YVNldChfdGhpcywgJGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkYXJyb3dMLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoISRhcnJvd0wuaGFzQ2xhc3MoZGlzYWJsZUNsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlci0tO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vbnRoTmFtZVByZXYoX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgcHJldldlZWsoX3RoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGJsb2NrQXJyb3coX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgd2Vla0NoZWNrKF90aGlzLCBjb3VudGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGF0YVNldChfdGhpcywgJGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyKGVsKSB7XHJcbiAgICAgICAgZWwuYWRkQ2xhc3MoJ2RheS1waWNrZXInKTtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBgPGRpdiBjbGFzcz1cImRheS1waWNrZXJfX3RvcFwiPlxyXG5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fbW9udGhcIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX3llYXJcIj48L3NwYW4+LFxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LXBpY2tlcl9fd2Vla1wiPjwvc3Bhbj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXktcGlja2VyX19ib3R0b21cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF5LXBpY2tlcl9fY2Fyb3VzZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRheS1waWNrZXJfX2Fycm93IGRheS1waWNrZXJfX2Fycm93LS1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhbCBmYS1hbmdsZS1sZWZ0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImRheS1waWNrZXJfX2xpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCf0L08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCS0YI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCh0YA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCn0YI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCf0YI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCh0LE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImRheS1waWNrZXJfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRheS1waWNrZXJfX2RheV90aXRsZVwiPtCS0YE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXktcGlja2VyX19kYXlfbnVtXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXktcGlja2VyX19hcnJvdyBkYXktcGlja2VyX19hcnJvdy0tcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFsIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgIGVsLmh0bWwoaHRtbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0YTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INGC0LXQutGD0YnQtdC5INC90LXQtNC10LvQuFxyXG4gICAgZnVuY3Rpb24gdG9kYXlXZWVrKGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCAkbW9udGggPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fbW9udGgnKTtcclxuICAgICAgICBsZXQgJHllYXIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9feWVhcicpO1xyXG4gICAgICAgIGxldCAkd2Vla0Rlc2MgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fd2VlaycpO1xyXG4gICAgICAgIGxldCAkYXJyb3dMID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2Fycm93LS1sZWZ0Jyk7XHJcbiAgICAgICAgbGV0IG5vd1dlZWtEYXlOdW0gPSBuZXdEYXRlLmdldERheSgpIC0gMTtcclxuICAgICAgICBsZXQgbm93TW9udGhEYXkgPSBuZXdEYXRlLmdldERhdGUoKTtcclxuICAgICAgICBsZXQgbm93TW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgbGV0IG5vd1llYXIgPSBuZXdEYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgbGV0IHdlZWtEYXkgPSB3ZWVrRGF5QXJyLmVxKG5vd1dlZWtEYXlOdW0pO1xyXG4gICAgICAgIGxldCAkaXRlbSA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19pdGVtJyk7XHJcblxyXG4gICAgICAgICRhcnJvd0wuYWRkQ2xhc3MoZGlzYWJsZUNsYXNzKTtcclxuICAgICAgICAkd2Vla0Rlc2MudGV4dCgn0Y3RgtCwINC90LXQtNC10LvRjycpO1xyXG4gICAgICAgICRtb250aC50ZXh0KG1vbnRoc1tub3dNb250aF0pO1xyXG4gICAgICAgICR5ZWFyLnRleHQobm93WWVhcik7XHJcbiAgICAgICAgd2Vla0RheS50ZXh0KG5vd01vbnRoRGF5KTtcclxuICAgICAgICB3ZWVrRGF5LmNsb3Nlc3QoJy5kYXktcGlja2VyX19pdGVtJykuYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICBpbnNlcnRMZWZ0U2lkZShlbCk7XHJcbiAgICAgICAgaW5zZXJ0UmlnaHRTaWRlKGVsKTtcclxuICAgICAgICBkYXRhU2V0KGVsLCAkaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0YTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INGB0LvQtdC00YPRjtGJ0LXQuSDQvdC10LTQtdC70LhcclxuICAgIGZ1bmN0aW9uIG5leHRXZWVrKGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCB3ZWVrRGF5TGFzdCA9IHBhcnNlSW50KHdlZWtEYXlBcnIuZXEoNikudGV4dCgpKSArIDE7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHdlZWtEYXlBcnIuZXEoaSkudGV4dCh3ZWVrRGF5TGFzdCsrKTtcclxuXHJcbiAgICAgICAgICAgIHdlZWtEYXlBcnJcclxuICAgICAgICAgICAgICAgIC5lcShpKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5kYXktcGlja2VyX19pdGVtJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhkaXNhYmxlQ2xhc3MpO1xyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyXHJcbiAgICAgICAgICAgICAgICAuZXEoaSlcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZGF5LXBpY2tlcl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdlZWtEYXlBcnIuZXEoaSkudGV4dCgpID4gbW9udGhEYXlzW21vbnRoTnVtKGVsKV0pIHtcclxuICAgICAgICAgICAgICAgIHdlZWtEYXlMYXN0ID0gMTtcclxuICAgICAgICAgICAgICAgIHdlZWtEYXlBcnIuZXEoaSkudGV4dCh3ZWVrRGF5TGFzdCsrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDRhNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0L/RgNC10LTRi9C00YPRidC10Lkg0L3QtdC00LXQu9C4XHJcbiAgICBmdW5jdGlvbiBwcmV2V2VlayhlbCkge1xyXG4gICAgICAgIGxldCB3ZWVrRGF5QXJyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2RheV9udW0nKTtcclxuICAgICAgICBsZXQgd2Vla0RheUZpcnN0ID0gcGFyc2VJbnQod2Vla0RheUFyci5lcSgwKS50ZXh0KCkpIC0gMTtcclxuICAgICAgICBsZXQgbW9udGhQcmV2ID0gbW9udGhOdW0oZWwpIC0gMTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDY7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHdlZWtEYXlBcnIuZXEoaSkudGV4dCh3ZWVrRGF5Rmlyc3QtLSk7XHJcbiAgICAgICAgICAgIHdlZWtEYXlBcnJcclxuICAgICAgICAgICAgICAgIC5lcShpKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5kYXktcGlja2VyX19pdGVtJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhkaXNhYmxlQ2xhc3MpO1xyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyXHJcbiAgICAgICAgICAgICAgICAuZXEoaSlcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuZGF5LXBpY2tlcl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdlZWtEYXlBcnIuZXEoaSkudGV4dCgpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnRoUHJldiA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBtb250aFByZXYgPSAxMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB3ZWVrRGF5Rmlyc3QgPSBtb250aERheXNbbW9udGhQcmV2XTtcclxuICAgICAgICAgICAgICAgIHdlZWtEYXlBcnIuZXEoaSkudGV4dCh3ZWVrRGF5Rmlyc3QtLSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LTQu9GPINGE0YPQvdC60YbQuNC4IHRvZGF5V2Vlaywg0YTQvtGA0LzQuNGA0YPQtdGCINC70LXQstGD0Y4g0YHRgtC+0YDQvtC90YMg0L7RgiDRgtC10LrRg9GJ0LXQuSDQtNCw0YLRi1xyXG4gICAgZnVuY3Rpb24gaW5zZXJ0TGVmdFNpZGUoZWwpIHtcclxuICAgICAgICBsZXQgd2Vla0RheUFyciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19kYXlfbnVtJyk7XHJcbiAgICAgICAgbGV0IHByZXZNb250aERheSA9IG5ld0RhdGUuZ2V0RGF0ZSgpIC0gMTtcclxuICAgICAgICBsZXQgcHJldldlZWtEYXkgPSBuZXdEYXRlLmdldERheSgpIC0gMjtcclxuICAgICAgICBsZXQgbm93TW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSBwcmV2V2Vla0RheTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KHByZXZNb250aERheS0tKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3ZWVrRGF5QXJyLmVxKGkpLnRleHQoKSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChub3dNb250aCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBub3dNb250aCA9IDExO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByZXZNb250aERheSA9IG1vbnRoRGF5c1tub3dNb250aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KHByZXZNb250aERheS0tKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2Vla0RheUFyclxyXG4gICAgICAgICAgICAgICAgLmVxKGkpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmRheS1waWNrZXJfX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKGRpc2FibGVDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINC00LvRjyDRhNGD0L3QutGG0LjQuCB0b2RheVdlZWssINGE0L7RgNC80LjRgNGD0LXRgiDQv9GA0LDQstGD0Y4g0YHRgtC+0YDQvtC90YMg0L7RgiDRgtC10LrRg9GJ0LXQuSDQtNCw0YLRi1xyXG4gICAgZnVuY3Rpb24gaW5zZXJ0UmlnaHRTaWRlKGVsKSB7XHJcbiAgICAgICAgbGV0IHdlZWtEYXlBcnIgPSBlbC5maW5kKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG4gICAgICAgIGxldCBub3dXZWVrRGF5TnVtID0gbmV3RGF0ZS5nZXREYXkoKSAtIDE7XHJcbiAgICAgICAgbGV0IG5vd01vbnRoRGF5ID0gbmV3RGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgbGV0IG5vd01vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gbm93V2Vla0RheU51bTsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQobm93TW9udGhEYXkrKyk7XHJcblxyXG4gICAgICAgICAgICBpZiAod2Vla0RheUFyci5lcShpKS50ZXh0KCkgPiBtb250aERheXNbbm93TW9udGhdKSB7XHJcbiAgICAgICAgICAgICAgICBub3dNb250aERheSA9IDE7XHJcbiAgICAgICAgICAgICAgICB3ZWVrRGF5QXJyLmVxKGkpLnRleHQobm93TW9udGhEYXkrKyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LLRi9GP0LLQu9GP0LXRgiDQvdC+0LzQtdGAINC80LXRgdGP0YbQsCwg0YPQutCw0LfQsNC90L3QvtCz0L4g0LIg0LTQsNC90L3Ri9C5INC80L7QvNC10L3RglxyXG4gICAgLy8g0L3QvtC80LXRgCDQvNC10YHRj9GG0LAg0L3QsNGH0LjQvdCw0LXRgtGB0Y8g0YEgMCDQtNC+IDExXHJcbiAgICAvLyDRh9C10YDQtdC3INC80LDRgdGB0LjQsiBtb250aHNcclxuICAgIGZ1bmN0aW9uIG1vbnRoTnVtKGVsKSB7XHJcbiAgICAgICAgbGV0IHRoaXNNb250aCA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19tb250aCcpO1xyXG4gICAgICAgIGxldCB0aGlzTW9udGhOdW0gPSAnJztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb250aHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1vbnRoc1tpXSA9PSB0aGlzTW9udGgudGV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzTW9udGhOdW0gPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpc01vbnRoTnVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDRhNC+0YDQvNC40YDRg9C10YIg0L3QsNC30LLQsNC90LjQtSDQvNC10YHRj9GG0LAg0LTQu9GPINGB0LvQtdC00YPRjtGJ0LXQuSDQvdC10LTQtdC70LhcclxuICAgIGZ1bmN0aW9uIG1vbnRoTmFtZU5leHQoZWwpIHtcclxuICAgICAgICBsZXQgd2Vla0RheUFyciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19kYXlfbnVtJyk7XHJcbiAgICAgICAgbGV0IHRoaXNNb250aCA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19tb250aCcpO1xyXG4gICAgICAgIGxldCAkeWVhciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX195ZWFyJyk7XHJcbiAgICAgICAgbGV0IHllYXJOdW0gPSBwYXJzZUludCgkeWVhci50ZXh0KCkpO1xyXG4gICAgICAgIGxldCB0aGlzTW9udGhOdW0gPSAnJztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3ZWVrRGF5QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh3ZWVrRGF5QXJyLmVxKGkpLnRleHQoKSA9PSBtb250aERheXNbbW9udGhOdW0oZWwpXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc01vbnRoTnVtID0gbW9udGhOdW0oZWwpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc01vbnRoTnVtID4gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGhOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXNNb250aC50ZXh0KG1vbnRoc1t0aGlzTW9udGhOdW1dKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgdGhpc01vbnRoLnRleHQoKSA9PSAn0K/QvdCy0LDRgNGMJyAmJlxyXG4gICAgICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KCkgPT0gbW9udGhEYXlzW21vbnRoTnVtKGVsKV1cclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAkeWVhci50ZXh0KHllYXJOdW0gKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDRhNC+0YDQvNC40YDRg9C10YIg0L3QsNC30LLQsNC90LjQtSDQvNC10YHRj9GG0LAg0LTQu9GPINC/0YDQtdC00YvQtNGD0YnQtdC5INC90LXQtNC10LvQuFxyXG4gICAgZnVuY3Rpb24gbW9udGhOYW1lUHJldihlbCkge1xyXG4gICAgICAgIGxldCB3ZWVrRGF5QXJyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX2RheV9udW0nKTtcclxuICAgICAgICBsZXQgdGhpc01vbnRoID0gZWwuZmluZCgnLmRheS1waWNrZXJfX21vbnRoJyk7XHJcbiAgICAgICAgbGV0ICR5ZWFyID0gZWwuZmluZCgnLmRheS1waWNrZXJfX3llYXInKTtcclxuICAgICAgICBsZXQgeWVhck51bSA9IHBhcnNlSW50KCR5ZWFyLnRleHQoKSk7XHJcbiAgICAgICAgbGV0IHRoaXNNb250aE51bSA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdlZWtEYXlBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHdlZWtEYXlBcnIuZXEoaSkudGV4dCgpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNNb250aE51bSA9IG1vbnRoTnVtKGVsKSAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNNb250aE51bSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzTW9udGhOdW0gPSAxMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzTW9udGgudGV4dChtb250aHNbdGhpc01vbnRoTnVtXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzTW9udGgudGV4dCgpID09ICfQlNC10LrQsNCx0YDRjCcgJiYgd2Vla0RheUFyci5lcShpKS50ZXh0KCkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgJHllYXIudGV4dCh5ZWFyTnVtIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LHQu9C+0LrQuNGA0L7QstC60LAg0YHRgtGA0LXQu9C60LhcclxuICAgIGZ1bmN0aW9uIGJsb2NrQXJyb3coZWwpIHtcclxuICAgICAgICBsZXQgd2Vla0RheUFyciA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19kYXlfbnVtJyk7XHJcbiAgICAgICAgbGV0IHRoaXNNb250aCA9IGVsLmZpbmQoJy5kYXktcGlja2VyX19tb250aCcpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdlZWtEYXlBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgd2Vla0RheUFyci5lcShpKS50ZXh0KCkgPT0gbmV3RGF0ZS5nZXREYXRlKCkgJiZcclxuICAgICAgICAgICAgICAgIHRoaXNNb250aC50ZXh0KCkgPT0gbW9udGhzW25ld0RhdGUuZ2V0TW9udGgoKV1cclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0b2RheVdlZWsoZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINC90LDQtNC/0LjRgdGMINC00LvRjyDRg9C60LDQt9Cw0L3QuNGPINC60L7Qu9C40YfQtdGB0YLQstCwINC90LXQtNC10LvRjCDQvtGCINGC0LXQutGD0YnQtdC5INC00LDRgtGLXHJcbiAgICBmdW5jdGlvbiB3ZWVrQ2hlY2soZWwsIGNvdW50ZXIpIHtcclxuICAgICAgICBsZXQgJHdlZWtEZXNjID0gZWwuZmluZCgnLmRheS1waWNrZXJfX3dlZWsnKTtcclxuXHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPT0gMSkge1xyXG4gICAgICAgICAgICAkd2Vla0Rlc2MudGV4dCgn0YHQu9C10LTRg9GO0YnQsNGPINC90LXQtNC10LvRjycpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY291bnRlciA+IDEgJiYgY291bnRlciA8PSA0KSB7XHJcbiAgICAgICAgICAgICR3ZWVrRGVzYy50ZXh0KCfRh9C10YDQtdC3ICcgKyBjb3VudGVyICsgJyDQvdC10LTQtdC70LgnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPiA0KSB7XHJcbiAgICAgICAgICAgICR3ZWVrRGVzYy50ZXh0KCfRh9C10YDQtdC3ICcgKyBjb3VudGVyICsgJyDQvdC10LTQtdC70YwnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0LfQsNC/0LjRgdGMINC/0L7Qu9C90L7QuSDQtNCw0YLRiyDQsiBkYXRhLWRhdGU90JPQk9CT0JMt0JzQnC3QlNCUXHJcbiAgICBmdW5jdGlvbiBkYXRhU2V0KGVsLCBpdGVtKSB7XHJcbiAgICAgICAgbGV0IHllYXIgPSAkKCcuZGF5LXBpY2tlcl9feWVhcicpLnRleHQoKTtcclxuICAgICAgICAvLyDQvNC10YHRj9GGINC60LDQu9C10L3QtNCw0YDQvdGL0LlcclxuICAgICAgICBsZXQgbW9udGggPSBtb250aE51bShlbCkgKyAxO1xyXG4gICAgICAgIGxldCBudW0gPSAkKCcuZGF5LXBpY2tlcl9fZGF5X251bScpO1xyXG5cclxuICAgICAgICBpdGVtLmVhY2goaSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uZXEoaSkuYXR0cihcclxuICAgICAgICAgICAgICAgICdkYXRhLWRhdGUnLFxyXG4gICAgICAgICAgICAgICAgeWVhciArICctJyArIG1vbnRoICsgJy0nICsgbnVtLmVxKGkpLnRleHQoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuXHJcbi8qXHJcbiAqKiogT3JkZXJcclxuICovXHJcbmNvbnN0IE9yZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IG9yZGVyID0ge307XHJcbiAgICBsZXQgJGh0bWwgPSAkKCdodG1sJyk7XHJcbiAgICBsZXQgJHRpbWVQaWNrZXJJdGVtID0gJCgnLmpzLXRpbWUtcGlja2VyLWl0ZW0nKS5ub3QoJy5pcy1kaXNhYmxlZCcpO1xyXG4gICAgbGV0ICRvcmRlclRpbWUgPSAkKCcuanMtb3JkZXItdGltZScpO1xyXG4gICAgbGV0ICRvcmRlclRpdGxlID0gJCgnLmpzLW9yZGVyLXRpdGxlJyk7XHJcbiAgICBsZXQgJG9yZGVyRGV0YWlsID0gJCgnLmpzLXNlcnZpY2UtbGlzdCcpO1xyXG4gICAgbGV0ICRvcmRlckJ0bkJhY2sgPSAkKCcuanMtb3JkZXItcHJldicpO1xyXG4gICAgbGV0ICRvcmRlckJ0bkVkaXQgPSAkKCcuanMtb3JkZXItZWRpdCcpO1xyXG4gICAgbGV0ICR1c2VySW5mb05vdGUgPSAkKCcuanMtdXNlci1pbmZvLW5vdGUnKTtcclxuICAgIGxldCAkdXNlckNhcnRCdG4gPSAkKCcudXNlci1pbmZvX19idG4nKTtcclxuICAgIGxldCAkdXNlckluZm9Cb3R0b20gPSAkKCcudXNlci1pbmZvX19ib3R0b20nKTtcclxuICAgIGxldCAkdXNlckluZm9Ub3AgPSAkKCcudXNlci1pbmZvX190b3AnKTtcclxuICAgIGxldCBhY3RpdmVDbGFzcyA9ICdpcy1hY3RpdmUnO1xyXG4gICAgbGV0IGhpZGRlbkNsYXNzID0gJ2lzLWhpZGRlbic7XHJcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIG9yZGVyLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdFRpbWUoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdE1hc3RlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmZpeGVkQmxvY2soJCgnLmpzLXVzZXItaW5mbycpKTtcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRpbWVNb2JpbGUoKTtcclxuICAgICAgICAgICAgdGhpcy5jbGlja09uQnRuQmFjaygpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpeGVkQmxvY2soJCgnLmpzLWRheS1waWNrZXInKSk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBvcmRlci5zZWxlY3RUaW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHRpbWVQaWNrZXJJdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvL3RpbWUgY2hvb3NpbmdcclxuICAgICAgICAgICAgJHRpbWVQaWNrZXJJdGVtLm5vdCgkKHRoaXMpKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2hvd3MgZGF0ZSBhbmQgdGltZSBvZiBvcmRlciAoZGVza3RvcClcclxuICAgICAgICAgICAgJHVzZXJJbmZvVG9wLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNob3dzIGNvbmZpcm0gYnV0dG9uXHJcbiAgICAgICAgICAgICR1c2VySW5mb05vdGUuYWRkQ2xhc3MoaGlkZGVuQ2xhc3MpO1xyXG4gICAgICAgICAgICAkdXNlckNhcnRCdG4uYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgLy9zZXQgdGltZVxyXG4gICAgICAgICAgICAkb3JkZXJUaW1lLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcmRlci5zZWxlY3RUaW1lTW9iaWxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHRpbWVQaWNrZXJJdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBvcmRlciBkZXRhaWxzIG9wZW5pbmdcclxuICAgICAgICAgICAgJG9yZGVyRGV0YWlsLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJld3JpdHRpbmcgb3JkZXIgdGl0bGVcclxuICAgICAgICAgICAgJG9yZGVyVGl0bGUudGV4dCgn0J/QvtC00YLQstC10YDQttC00LXQvdC40LUg0LfQsNGP0LLQutC4Jyk7XHJcbiAgICAgICAgICAgICRodG1sLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2hvd3MgY29uZmlybSBidXR0b25cclxuICAgICAgICAgICAgJHVzZXJJbmZvQm90dG9tLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHNldCBmaXhlZCBibG9jayBhdCB0aGUgdG9wIG9mIGEgcGFnZVxyXG4gICAgb3JkZXIuZml4ZWRCbG9jayA9IGZ1bmN0aW9uKGZpeGVkQmxvY2spIHtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gZml4ZWRCbG9jay5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICBsZXQgJGNsb25lID0gJCgnPGRpdiBjbGFzcz1cImNsb25lXCI+Jyk7XHJcbiAgICAgICAgJGNsb25lLmluc2VydEFmdGVyKGZpeGVkQmxvY2spO1xyXG4gICAgICAgICRjbG9uZS5jc3MoJ2hlaWdodCcsIGhlaWdodCkuaGlkZSgpO1xyXG5cclxuICAgICAgICBsZXQgZml4ZWRCbG9ja09mZnNldCA9IGZpeGVkQmxvY2sub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAvL2ZvciBmaXhlZCB0b3AgYmxvY2sgd2l0aCB3aWR0aCA1MHB4XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDc2OCkge1xyXG4gICAgICAgICAgICBmaXhlZEJsb2NrT2Zmc2V0ID0gZml4ZWRCbG9jay5vZmZzZXQoKS50b3AgLSA1MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNjcm9sbCA+PSBmaXhlZEJsb2NrT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLmFkZENsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGNsb25lLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzY3JvbGwgPCBmaXhlZEJsb2NrT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBmaXhlZEJsb2NrLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGNsb25lLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcmRlci5jbGlja09uQnRuQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGNsaWNrIG9uIHRoZSBwcmV2IGJ0blxyXG4gICAgICAgICRvcmRlckJ0bkJhY2sub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAkb3JkZXJUaXRsZS50ZXh0KCfQodC+0LfQtNCw0L3QuNC1INC30LDRj9Cy0LrQuCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIF9yZW1vdmVDbGFzcygpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVQaWNrZXJJdGVtLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjbGljayBvbiB0aGUgZWRpdCBidG5cclxuICAgICAgICAkb3JkZXJCdG5FZGl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkb3JkZXJUaXRsZS50ZXh0KCfQoNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INC30LDRj9Cy0LrQuCcpO1xyXG4gICAgICAgICAgICBfcmVtb3ZlQ2xhc3MoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUNsYXNzKCkge1xyXG4gICAgICAgICAgICAkb3JkZXJEZXRhaWwucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICAkdXNlckluZm9Cb3R0b20ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICAkaHRtbC5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcclxuICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9DbG9zZSBtb2RhbCBhZnRyZSBzZWxlY3QgbWFzdGVyXHJcbiAgICBvcmRlci5zZWxlY3RNYXN0ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgJG1hc3Rlckl0ZW0gPSAkKCcjbWFzdGVyUGlja2VyJykuZmluZCgnLm1hc3Rlci1waWNrZXJfX2l0ZW0nKTtcclxuXHJcbiAgICAgICAgJG1hc3Rlckl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcjbWFzdGVyUGlja2VyJylcclxuICAgICAgICAgICAgICAgICAgICAubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG9yZGVyO1xyXG59KSgpO1xyXG5cclxuT3JkZXIuaW5pdCgpO1xyXG5cclxuLypcclxuICoqKiBDaGFydFxyXG4gKi9cclxuY29uc3QgRG91YmxlQXJlYUNoYXJ0ID0gKCQgPT4ge1xyXG4gICAgbGV0ICRjaGFydCA9ICQoJy5qcy1jaGFydC0tc3RhdCcpO1xyXG4gICAgaWYgKCRjaGFydC5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgY2hhcnQgPSB7fTtcclxuXHJcbiAgICAgICAgLy8g0L7RgtGB0YLRg9C/0YtcclxuICAgICAgICBsZXQgbWFyZ2luID0ge1xyXG4gICAgICAgICAgICB0b3A6IDcwLFxyXG4gICAgICAgICAgICBib3R0b206IDUwLFxyXG4gICAgICAgICAgICBsZWZ0OiA1MCxcclxuICAgICAgICAgICAgcmlnaHQ6IDM1XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8g0L3QsNC30LLQsNC90LjRjyDQvtGB0LXQuVxyXG4gICAgICAgIGxldCBsZWdlbmRBcnJheSA9IFsn0JLRi9GA0YPRh9C60LAnLCAn0JrQvtC70LjRh9C10YHRgtCy0L4g0LfQsNGP0LLQvtC6J107XHJcblxyXG4gICAgICAgIC8vINC+0L/RgNC10LTQtdC70Y/RjtGJ0LjQtSDRhtCy0LXRgtCwINCz0YDQsNGE0LjQutCwXHJcbiAgICAgICAgY29uc3QgY29sb3JBcnJheSA9IFsncmdiYSg4LCAyMjUsIDI1MyknLCAncmdiYSgxNjcsMTY3LDI1NSknXTtcclxuXHJcbiAgICAgICAgLy8g0YDQsNC30LzQtdGA0Ysg0LrQvtC90YLQtdC50L3QtdGA0LBcclxuICAgICAgICBsZXQgcGFyZW50V2lkdGggPSAkY2hhcnQucGFyZW50KCkud2lkdGgoKTtcclxuXHJcbiAgICAgICAgbGV0IHdpZHRoID0gcGFyZW50V2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gMC43ICogd2lkdGg7XHJcblxyXG4gICAgICAgIC8vINGI0LjRgNC40L3QsCDQs9GA0LDRhNC40LrQsFxyXG4gICAgICAgIGxldCB4ID0gZDMuc2NhbGVUaW1lKCkucmFuZ2UoWzAsIHdpZHRoXSk7XHJcbiAgICAgICAgLy8g0LLRi9GB0L7RgtCwINCz0YDQsNGE0LjQutCwXHJcbiAgICAgICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlKFtoZWlnaHQsIDBdKTtcclxuXHJcbiAgICAgICAgLy8g0LPQu9Cw0LLQvdGL0Lkg0LrQvtC90YLQtdC50L3QtdGAXHJcbiAgICAgICAgY29uc3Qgc3ZnID0gZDNcclxuICAgICAgICAgICAgLnNlbGVjdCgnLmpzLWNoYXJ0LS1zdGF0JylcclxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcclxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcclxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoXHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywnICsgbWFyZ2luLnRvcCArICcpJ1xyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyDQt9Cw0LvQuNCy0LrQsCDQs9GA0LDQtNC40LXQvdGC0L7QvFxyXG4gICAgICAgIGNvbnN0IGNvbG9yU2NhbGVHcmFkaWVudCA9IGQzXHJcbiAgICAgICAgICAgIC5zY2FsZU9yZGluYWwoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFsndmFsdWVfMScsICd2YWx1ZV8yJ10pXHJcbiAgICAgICAgICAgIC5yYW5nZShbXCJ1cmwoJyNzdmdHcmFkaWVudDEnKVwiLCBcInVybCgnI3N2Z0dyYWRpZW50MicpXCJdKTtcclxuXHJcbiAgICAgICAgLy8g0LfQsNC70LjQstC60LAg0L3QtdC/0YDQvtC30YDQsNGH0L3Ri9C8INGG0LLQtdGC0L7QvCDQv9C+0LQg0YbQstC10YIg0LPRgNCw0LTQuNC10L3RgtCwXHJcbiAgICAgICAgY29uc3QgY29sb3JTY2FsZU9wYXF1ZSA9IGQzXHJcbiAgICAgICAgICAgIC5zY2FsZU9yZGluYWwoKVxyXG4gICAgICAgICAgICAuZG9tYWluKFsndmFsdWVfMScsICd2YWx1ZV8yJ10pXHJcbiAgICAgICAgICAgIC5yYW5nZShbY29sb3JBcnJheVswXSwgY29sb3JBcnJheVsxXV0pO1xyXG5cclxuICAgICAgICBjaGFydC5pbml0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBkMy5qc29uKCdqcy9kYXRhL2RhdGEtc3RhdGlzdGljcy5qc29uJykudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkLmRhdGUgPSBuZXcgRGF0ZShkLmRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQudmFsdWVfMSA9ICtkLnZhbHVlXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgZC52YWx1ZV8yID0gK2QudmFsdWVfMjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINGA0LDQt9Cx0LjQstC60LAg0LTQsNC90L3Ri9GFINC90LAg0LTQstCwINC/0L7RgtC+0LrQsCDRgSDQvtC00L3QuNC8IGlkXHJcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IGQzLmtleXMoZGF0YVswXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaSA9IGtleXMuaW5kZXhPZignZGF0ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBrZXlzLm1hcChkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBkYXRhLm1hcChlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogZS5kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZVtkXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0LPRgNCw0LTQsNGG0LjRjyDRiNC60LDQu9GLIHhcclxuICAgICAgICAgICAgICAgIHguZG9tYWluKFxyXG4gICAgICAgICAgICAgICAgICAgIGQzLmV4dGVudChkYXRhLCBkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQs9GA0LDQtNCw0YbQuNGPINGI0LrQsNC70YsgeVxyXG4gICAgICAgICAgICAgICAgeS5kb21haW4oW1xyXG4gICAgICAgICAgICAgICAgICAgIGQzLm1pbihhcnJheSwgYyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5taW4oYy52YWx1ZXMsIGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuc291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBkMy5tYXgoYXJyYXksIGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMubWF4KGMudmFsdWVzLCBkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoYXJ0LmNyZWF0ZUxlZnRBeGlzKCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5jcmVhdGVCb3R0b21BeGlzKCk7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5jcmVhdGVBcmVhKGFycmF5KTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LmNyZWF0ZVZhbHVlTGluZShhcnJheSk7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5jcmVhdGVDaXJjbGUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjaGFydC5ncmFkaWVudHMoJ3N2Z0dyYWRpZW50MScsIGNvbG9yQXJyYXlbMF0pO1xyXG4gICAgICAgICAgICAgICAgY2hhcnQuZ3JhZGllbnRzKCdzdmdHcmFkaWVudDInLCBjb2xvckFycmF5WzFdKTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LmxlZ2VuZHMoYXJyYXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoYXJ0LmFuY2hvcigpO1xyXG4gICAgICAgICAgICAgICAgY2hhcnQuaW5mbyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2hhcnQuY3JlYXRlTGVmdEF4aXMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB5QXhpcyA9IGQzLmF4aXNMZWZ0KHkpLnRpY2tGb3JtYXQoZDMuZm9ybWF0KCcuMHMnKSk7XHJcblxyXG4gICAgICAgICAgICBzdmcuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIGF4aXMtLXknKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCAnMTInKVxyXG4gICAgICAgICAgICAgICAgLmNhbGwoeUF4aXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNoYXJ0LmNyZWF0ZUJvdHRvbUF4aXMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB4QXhpcyA9IGQzXHJcbiAgICAgICAgICAgICAgICAuYXhpc0JvdHRvbSh4KVxyXG4gICAgICAgICAgICAgICAgLnRpY2tzKDYpXHJcbiAgICAgICAgICAgICAgICAudGlja0Zvcm1hdChkMy50aW1lRm9ybWF0KCclZC4lbScpKTtcclxuXHJcbiAgICAgICAgICAgIHN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgYXhpcy0teCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyBoZWlnaHQgKyAnKScpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsICcxMicpXHJcbiAgICAgICAgICAgICAgICAuY2FsbCh4QXhpcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2hhcnQuY3JlYXRlQXJlYSA9IGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXJlYSA9IGQzXHJcbiAgICAgICAgICAgICAgICAuYXJlYSgpXHJcbiAgICAgICAgICAgICAgICAuY3VydmUoZDMuY3VydmVDYXRtdWxsUm9tKVxyXG4gICAgICAgICAgICAgICAgLngoZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoZC5kYXRlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAueTAoeSgwKSlcclxuICAgICAgICAgICAgICAgIC55MShkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geShkLnNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcmVhU291cmNlID0gc3ZnXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcuYXJlYScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBhcmVhICR7ZC5pZH1gO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xvclNjYWxlR3JhZGllbnQoZC5pZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFyZWFTb3VyY2UuYXBwZW5kKCdwYXRoJykuYXR0cignZCcsIGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZWEoZC52YWx1ZXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhcmVhO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNoYXJ0LmNyZWF0ZVZhbHVlTGluZSA9IGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVsaW5lID0gZDNcclxuICAgICAgICAgICAgICAgIC5saW5lKClcclxuICAgICAgICAgICAgICAgIC5jdXJ2ZShkMy5jdXJ2ZUNhdG11bGxSb20pXHJcbiAgICAgICAgICAgICAgICAueChkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geChkLmRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC55KGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5KGQuc291cmNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlU291cmNlID0gc3ZnXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubGluZScpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBsaW5lICR7ZC5pZH1gO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yU2NhbGVPcGFxdWUoZC5pZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ3RyYW5zcGFyZW50Jyk7XHJcblxyXG4gICAgICAgICAgICB2YWx1ZVNvdXJjZS5hcHBlbmQoJ3BhdGgnKS5hdHRyKCdkJywgZCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVsaW5lKGQudmFsdWVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2hhcnQuY3JlYXRlQ2lyY2xlID0gZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaXJjbGUxID0gc3ZnXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcuY2lyY2xlVmFsdWUxJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOmNpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY2lyY2xlVmFsdWUxJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2lyY2xlMiA9IHN2Z1xyXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmNpcmNsZVZhbHVlMicpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZVZhbHVlMicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNpcmNsZVIgPSAzO1xyXG5cclxuICAgICAgICAgICAgY2lyY2xlMVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geChkLmRhdGUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB5KGQudmFsdWVfMSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCBjaXJjbGVSKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3ZhbHVlJywgZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQudmFsdWVfMTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGNvbG9yQXJyYXlbMF0pXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnI2ZmZicpO1xyXG5cclxuICAgICAgICAgICAgY2lyY2xlMlxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgoZC5kYXRlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3knLCBkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geShkLnZhbHVlXzIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdyJywgY2lyY2xlUilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd2YWx1ZScsIGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnZhbHVlXzI7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBjb2xvckFycmF5WzFdKVxyXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJyNmZmYnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjaGFydC5ncmFkaWVudHMgPSAoaWQsIGNvbG9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyYWRpZW50ID0gc3ZnXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdsaW5lYXJHcmFkaWVudCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCBpZClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdncmFkaWVudFRyYW5zZm9ybScsICdyb3RhdGUoNDUpJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4MScsICcwJScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneDInLCAnMTAwJScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigneTEnLCAnMCUnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3kyJywgJzEwMCUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vINCy0LXRgNGF0L3QuNC5INGG0LLQtdGCXHJcbiAgICAgICAgICAgIGdyYWRpZW50XHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdzdG9wJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdGFydCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzAnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCBjb2xvcilcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdzdG9wLW9wYWNpdHknLCAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vINC90LjQttC90LjQuSDRhtCy0LXRglxyXG4gICAgICAgICAgICBncmFkaWVudFxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnc3RvcCcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZW5kJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdvZmZzZXQnLCAnNjUlJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgJ3JnYmEoMjU1LDI1NSwyNTUsMC4zJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdzdG9wLW9wYWNpdHknLCAxKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjaGFydC5sZWdlbmRzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGVnZW5kID0gc3ZnXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwMClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIDEwMClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgMClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMClcclxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKC0xNywgLTMwKScpO1xyXG5cclxuICAgICAgICAgICAgLy8g0LzQsNGA0LrQtdGA0YtcclxuICAgICAgICAgICAgbGVnZW5kXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcuY2lyY2xlTGVnZW5kJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKGNvbG9yQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOmNpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpICogMTMwO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjeScsIDApXHJcbiAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLC00KScpXHJcbiAgICAgICAgICAgICAgICAuYXR0cigncicsIDEwKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NpcmNsZUxlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g0L3QsNC30LLQsNC90LjQtVxyXG4gICAgICAgICAgICBsZWdlbmRcclxuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy50ZXh0TGVnZW5kJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKGxlZ2VuZEFycmF5KVxyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQoZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpICogMTMwICsgMjA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RleHRMZWdlbmQnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjaGFydC5pbmZvID0gZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwb3B1cCA9ICQoJy5qcy13aWRnZXQtcG9wdXAnKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHBvcHVwLmZpbmQoJy53aWRnZXRfX3Jlc3VsdCcpO1xyXG4gICAgICAgICAgICBsZXQgdGlja1ggPSAkKCcuYXhpcy0teCcpLmZpbmQoJy50aWNrJyk7XHJcblxyXG4gICAgICAgICAgICB0aWNrWC5lYWNoKGkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGlja1guZXEoaSkub24oJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsMSA9IHJlc3VsdC5lcSgwKS5maW5kKCcud2lkZ2V0X19udW1iZXInKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsMiA9IHJlc3VsdC5lcSgxKS5maW5kKCcud2lkZ2V0X19udW1iZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsMS50ZXh0KGRhdGFbaV1bJ3ZhbHVlXzEnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsMi50ZXh0KGRhdGFbaV1bJ3ZhbHVlXzInXSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2hhcnQuYW5jaG9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcG9wdXAgPSAkKCcuanMtd2lkZ2V0LXBvcHVwJyk7XHJcblxyXG4gICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcuYXhpcy0teCAudGljaycpLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvtGCINCy0LXRgNGF0L3QtdCz0L4g0LrRgNCw0Y8g0L7QutC90LAg0YEg0YPRh9C10YLQvtC8INC/0YDQvtC60YDRg9GC0LrQuFxyXG4gICAgICAgICAgICAgICAgbGV0IG1vdXNlWSA9IGV2ZW50LnBhZ2VZIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgLy8g0YDQsNGB0YHRgtC+0Y/QvdC40LUg0L7RgiDQu9C10LLQvtCz0L4g0LrRgNCw0Y8g0L7QutC90LBcclxuICAgICAgICAgICAgICAgIGxldCBtb3VzZVggPSBldmVudC5wYWdlWDtcclxuICAgICAgICAgICAgICAgIC8vINGA0LDQt9C80LXRgNGLINCy0YHQv9C70YvQstCw0Y7RidC10LPQviDQvtC60L3QsFxyXG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodCA9IHBvcHVwLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gcG9wdXAud2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQvdC+0LLRi9C1INGB0LLQvtC50YHRgtCy0LBcclxuICAgICAgICAgICAgICAgIGxldCB0b3AgPSBtb3VzZVkgLSBoZWlnaHQgLSAzMDtcclxuICAgICAgICAgICAgICAgIGxldCByaWdodCA9IG1vdXNlWCAtIHdpZHRoIC8gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQvtCz0YDQsNC90LjRh9C10L3QuNC1INGB0LvQtdCy0LBcclxuICAgICAgICAgICAgICAgIGlmIChyaWdodCA8IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSBtb3VzZVggLSAyMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDQvtCz0YDQsNC90LjRh9C10L3QuNC1INGB0L/RgNCw0LLQsFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyaWdodCA+ICQod2luZG93KS53aWR0aCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSBtb3VzZVggLSB3aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAvLyDQvtCz0YDQsNC90LjRh9C10L3QuNC1INGB0LLQtdGA0YXRg1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b3AgPCA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IG1vdXNlWSArIGhlaWdodCArIDEwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vINC40LfQvNC10L3QtdC90LjQtSDRgNCw0YHQv9C+0LvQvtC20LXQvdC40Y9cclxuICAgICAgICAgICAgICAgIHBvcHVwLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcmlnaHRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINCy0YHQv9C70YvRgtC40LVcclxuICAgICAgICAgICAgICAgIHBvcHVwLmZhZGVJbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJy5heGlzLS14IC50aWNrJykub24oJ21vdXNlb3V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g0YHQutGA0YvRgtC40LVcclxuICAgICAgICAgICAgICAgIHBvcHVwLmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgfVxyXG59KShqUXVlcnkpO1xyXG5cclxuY29uc3QgUGllQ2hhcnQgPSAoJCA9PiB7XHJcbiAgICBsZXQgJGNoYXJ0ID0gJCgnLmpzLWNoYXJ0LS1kb251dCcpO1xyXG4gICAgaWYgKCRjaGFydC5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgY2hhcnQgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IG1hcmdpbiA9IHtcclxuICAgICAgICAgICAgdG9wOiAyMCxcclxuICAgICAgICAgICAgYm90dG9tOiAyMCxcclxuICAgICAgICAgICAgbGVmdDogMzAsXHJcbiAgICAgICAgICAgIHJpZ2h0OiAyNVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vINGA0LDQt9C80LXRgNGLINC60L7QvdGC0LXQudC90LXRgNCwXHJcbiAgICAgICAgbGV0IHBhcmVudFdpZHRoID0gJGNoYXJ0LnBhcmVudCgpLndpZHRoKCk7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IHBhcmVudFdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IDAuNiAqIHdpZHRoO1xyXG5cclxuICAgICAgICBsZXQgaW5uZXJSYWRpdXMgPSAnJztcclxuICAgICAgICBsZXQgb3V0ZXJSYWRpdXMgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID09IDc2OCkge1xyXG4gICAgICAgICAgICAvLyDQstC90LXRiNC90LjQuSDRgNCw0LTQuNGD0YFcclxuICAgICAgICAgICAgaW5uZXJSYWRpdXMgPSBoZWlnaHQgLyA2O1xyXG4gICAgICAgICAgICAvLyDQstC90YPRgtGA0LXQvdC90LjQuSDRgNCw0LTQuNGD0YFcclxuICAgICAgICAgICAgb3V0ZXJSYWRpdXMgPSB3aWR0aCAvIDQuNTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDQstC90LXRiNC90LjQuSDRgNCw0LTQuNGD0YFcclxuICAgICAgICAgICAgaW5uZXJSYWRpdXMgPSBoZWlnaHQgLyA0LjM7XHJcbiAgICAgICAgICAgIC8vINCy0L3Rg9GC0YDQtdC90L3QuNC5INGA0LDQtNC40YPRgVxyXG4gICAgICAgICAgICBvdXRlclJhZGl1cyA9IHdpZHRoIC8gMy44O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g0LPQu9Cw0LLQvdGL0Lkg0LrQvtC90YLQtdC50L3QtdGAXHJcbiAgICAgICAgY29uc3Qgc3ZnID0gZDNcclxuICAgICAgICAgICAgLnNlbGVjdCgnLmpzLWNoYXJ0LS1kb251dCcpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXHJcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcclxuICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyBtYXJnaW4ubGVmdCArICcsJyArIG1hcmdpbi50b3AgKyAnKSdcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8g0L7Qv9GA0LXQtNC10L3QuNC1INGG0LLQtdGC0L7QslxyXG4gICAgICAgIGNvbnN0IGNvbG9yU2NhbGUgPSBkM1xyXG4gICAgICAgICAgICAuc2NhbGVPcmRpbmFsKClcclxuICAgICAgICAgICAgLnJhbmdlKFtcclxuICAgICAgICAgICAgICAgICdyZ2IoMTE5LCAxODIsIDIzMSknLFxyXG4gICAgICAgICAgICAgICAgJ3JnYigyNTUsIDIxNywgOTkpJyxcclxuICAgICAgICAgICAgICAgICdyZ2IoMTUxLCAyMDQsIDEwMCknLFxyXG4gICAgICAgICAgICAgICAgJ3JnYigyNTMsIDkwLCA2MiknXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICBjaGFydC5pbml0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBkMy5qc29uKCdqcy9kYXRhL2RhdGEtc3RhdHVzLmpzb24nKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGQudmFsdWUgPSArZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINC+0L/RgNC10LTQtdC70LXQvdC40LUg0LfQvdCw0YfQtdC90LjQuVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGllVmFsdWUgPSBkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyDRgNCw0YHRgdGC0LDQvdC+0LLQutCwINC30L3QsNGH0LXQvdC40LlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpZSA9IGQzLnBpZSgpLnZhbHVlKHBpZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vINC30LDQs9GA0YPQt9C60LAg0LfQvdCw0YfQtdC90LjQuVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGllRGF0YSA9IHBpZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGFydC5jcmVhdGVQaWUocGllRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGFydC5jcmVhdGVQaWVMZWdlbmQoKTtcclxuICAgICAgICAgICAgICAgIGNoYXJ0LmNyZWF0ZUxlZ2VuZChwaWVEYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2hhcnQuY3JlYXRlUGllID0gZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpZVNpemluZyA9IGQzXHJcbiAgICAgICAgICAgICAgICAuYXJjKClcclxuICAgICAgICAgICAgICAgIC5pbm5lclJhZGl1cyhpbm5lclJhZGl1cylcclxuICAgICAgICAgICAgICAgIC5vdXRlclJhZGl1cyhvdXRlclJhZGl1cyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwaWVDb250YWluZXIgPSBzdmdcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHdpZHRoIC0gd2lkdGggLyAzLjgpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0IC8gMiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcpJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHBpZUNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgncGF0aCcpXHJcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgLmVudGVyKClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBwaWVTaXppbmcpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZmlsbCcsIGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xvclNjYWxlKGQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjaGFydC5jcmVhdGVQaWVMZWdlbmQocGllQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vINC30L3QsNGH0LXQvdC40Y8g0LLQvdGD0YLRgNC4INCz0YDQsNGE0LjQutCwXHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSAxMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBwaWVDb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2VudHJvaWQgPSBwaWVTaXppbmcuY2VudHJvaWQoZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBjZW50cm9pZFswXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgY2VudHJvaWRbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZHknLCAnNScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZHgnLCAnLTcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZVRleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoZC5kYXRhLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNoYXJ0LmNyZWF0ZVBpZUxlZ2VuZCA9IHBpZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDEyMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yTGFiZWwgPSAn0KHQtdCz0L7QtNC90Y8nO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yTGVnZW5kQ29udGFpbmVyID0gcGllXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKCcgKyAtaW5uZXJSYWRpdXMgLyAxLjUgKyAnLDQpJ1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29sb3JMZWdlbmRDb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWxhYmVsJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KGNvbG9yTGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2hhcnQuY3JlYXRlTGVnZW5kID0gZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA9PSA3NjgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZWdlbmQgPSBzdmdcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIDEwMClcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLCcgKyBoZWlnaHQgLyAzLjUgKyAnKScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINC80LDRgNC60LXRgNGLXHJcbiAgICAgICAgICAgICAgICBsZWdlbmRcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcuY2lyY2xlTGVnZW5kJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnc3ZnOmNpcmNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgNTApXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgKGQsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChpICogaGVpZ2h0KSAvIDY7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLC00KScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCB3aWR0aCAvIDgwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVMZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3JTY2FsZShkLmRhdGEudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINC90LDQt9Cy0LDQvdC40LVcclxuICAgICAgICAgICAgICAgIGxlZ2VuZFxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy50ZXh0TGVnZW5kJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmRhdGEuZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgNzApXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGkgKiBoZWlnaHQpIC8gNjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0ZXh0TGVnZW5kJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVnZW5kID0gc3ZnXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEwMClcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCAxMDApXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMCwnICsgaGVpZ2h0IC8gMy41ICsgJyknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDQvNCw0YDQutC10YDRi1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmNpcmNsZUxlZ2VuZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZzpjaXJjbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgKGQsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChpICogaGVpZ2h0KSAvIDY7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgwLC00KScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3InLCB3aWR0aCAvIDgwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjaXJjbGVMZWdlbmQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sb3JTY2FsZShkLmRhdGEudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vINC90LDQt9Cy0LDQvdC40LVcclxuICAgICAgICAgICAgICAgIGxlZ2VuZFxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy50ZXh0TGVnZW5kJylcclxuICAgICAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lbnRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmRhdGEuZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgMjApXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGkgKiBoZWlnaHQpIC8gNjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0ZXh0TGVnZW5kJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gMTIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZ2VuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcucGllVmFsdWUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZW50ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5kYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIDExMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChpICogaGVpZ2h0KSAvIDY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVWYWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoYXJ0O1xyXG4gICAgfVxyXG59KShqUXVlcnkpO1xyXG5cclxuaWYgKCQoJy5qcy1jaGFydC0tc3RhdCcpLmxlbmd0aCkge1xyXG4gICAgRG91YmxlQXJlYUNoYXJ0LmluaXQoKTtcclxufVxyXG5pZiAoJCgnLmpzLWNoYXJ0LS1kb251dCcpLmxlbmd0aCkge1xyXG4gICAgUGllQ2hhcnQuaW5pdCgpO1xyXG59XHJcbiJdfQ==
