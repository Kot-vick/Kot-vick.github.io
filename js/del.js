'use strict';

if ($('.catalog-filter__item_price').length > 0) {
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
if ($('.js-textarea').length > 0) {
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
if ($('.js-search-input').length > 0) {
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
if ($('#card-map').length > 0) {
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
if ($('#cabinet-map').length > 0) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbC5qcyJdLCJuYW1lcyI6WyIkIiwibGVuZ3RoIiwic2xpZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFsbFByaWNlU3RhcnQiLCJkYXRhIiwiYWxsUHJpY2VFbmQiLCJzcGFucyIsInN0YXJ0UHJpY2UiLCJlbmRQcmljZSIsImFyclBhcmFtcyIsInNVcmwiLCJ0ZXh0IiwicGFyc2VJbnQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJjb25uZWN0IiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJvbiIsInZhbHVlcyIsImhhbmRsZSIsInJlbW92ZUNsYXNzIiwicmVtb3ZlQXR0ciIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwiX3RoaXMiLCJhZGQiLCJmaW5kIiwiZG9uZSIsImRlbCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJjc3MiLCJ0b2dnbGVDbGFzcyIsInBhcmVudCIsInBob25lQ29uZmlybVRpbWVyIiwidGltZXIiLCJjb25zb2xlIiwibG9nIiwidGltIiwic2V0VGltZW91dCIsInQiLCJpbnQiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0ZXh0YXJlYSIsImF1dG9zaXplIiwiY3RybEtleSIsIm1ldGFLZXkiLCJrZXlDb2RlIiwidmFsdWUiLCJwYXJlbnROb2RlIiwic3VibWl0IiwicHJldmVudERlZmF1bHQiLCJlbCIsImNoYXRCb2R5IiwiY2hhdEZvb3RlckhlaWdodCIsIm91dGVySGVpZ2h0Iiwic3R5bGUiLCJjc3NUZXh0Iiwic2Nyb2xsSGVpZ2h0IiwiYm90dG9tIiwib3ZlcmZsb3ciLCJ0aXRsZSIsIm1vZGFsIiwic2VhcmNoSW5wdXQiLCJoaW50IiwidmFsIiwid2luZG93Iiwid2lkdGgiLCJ0b2dnbGVDb250cm9sIiwiJGRvY3VtZW50IiwiJHBhcmVudCIsIiR3aWRnZXRMZWZ0IiwiJHdpZGdldFJpZ2h0IiwiJHRpdGxlTGVmdCIsIiR0aXRsZVJpZ2h0IiwicmVtb3ZlIiwiaW5pdCIsIm15TWFwIiwieW1hcHMiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwiYmVoYXZpb3JzIiwiZGlzYWJsZSIsImNvbnRyb2xzIiwibXlQaW4iLCJHZW9PYmplY3RDb2xsZWN0aW9uIiwiaWNvbkxheW91dCIsImljb25JbWFnZUhyZWYiLCJpY29uSW1hZ2VTaXplIiwiaWNvbkltYWdlT2Zmc2V0IiwibXlQbGFjZW1hcmsiLCJQbGFjZW1hcmsiLCJiYWxsb29uQ29udGVudEhlYWRlciIsImJhbGxvb25Db250ZW50Qm9keSIsImhpbnRDb250ZW50IiwiZ2VvT2JqZWN0cyIsInJlYWR5IiwiZXZlbnRzIiwic2ltcGxlc2xpZGVyIiwiJGRhdGVwaWNrZXIiLCJkYXRlVG9kYXkiLCJEYXRlIiwiZWFjaCIsIiRidG5Ub2RheSIsIiRidG5QcmV2IiwiJGJ0bk5leHQiLCJ0eXBlIiwiYXR0ciIsIl9zZWxmIiwiY2hhbmdlVmFsIiwiZGF0ZXBpY2tlciIsImF1dG9DbG9zZSIsIm1pbkRhdGUiLCJvblNlbGVjdCIsImZvcm1hdHRlZERhdGUiLCJzZWxlY3REYXRlIiwic2hvd1dlZWsiLCJkYXRlIiwiaW5zdCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJjdXJyZW50RGF0ZSIsImdldERhdGUiLCJjdXJyZW50TW9udGgiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwiZ2V0RGF5IiwiZGF0ZUZvcm1hdCIsInNldElucHV0RGF0ZSIsInByZXYiLCJzaG93IiwiZm9jdXMiLCJ1cGRhdGVEYXRhU2NoZWR1bGUiLCJjcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3AiLCJydURhdGVzIiwiZ2V0V2Vla1NjaGVkdWxlIiwidXBkYXRlVmFsU2NoZWR1bGUiLCJ0b2dnbGVTZWxlY3RlZCIsImRhdGVQaWNrZXJJbmxpbmUiLCJldmVudERhdGVzIiwiaW5saW5lIiwibXVsdGlwbGVEYXRlcyIsIm9uUmVuZGVyQ2VsbCIsImNlbGxUeXBlIiwiaW5kZXhPZiIsImNsYXNzZXMiLCJjcm1TY2hlZHVsZURhdGVGaWVsZFRvcCIsImdldCIsImN1cnIiLCJjdXJyRGF5IiwiY3Vyck1vbnRoIiwibW9uZGF5Iiwic3VuZGF5IiwiZ2V0UmlnaHRXZWVrVGV4dCIsImN1cnJEYXRlIiwibW9udGgiLCJmaXJzdERheSIsImxhc3REYXkiLCJwYXJhbXMiLCJvRGF5RiIsIm9EYXlMIiwib01vbnRoRiIsIm9Nb250aEwiLCJvWWVhckYiLCJvWWVhckwiLCJhcnJEYXRhIiwiRm9ybURhdGEiLCJ0ZW1wIiwibmV3TW9udGgiLCJzZXREYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJyZXBsYWNlIiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLEVBQUUsNkJBQUYsRUFBaUNDLE1BQWpDLEdBQTBDLENBQTlDLEVBQWlEO0FBQzdDLFFBQUlDLFNBQVNDLFNBQVNDLGNBQVQsQ0FBd0IsMEJBQXhCLENBQWI7QUFDQSxRQUFJQyxnQkFBZ0JMLEVBQUUsMkJBQUYsRUFBK0JNLElBQS9CLENBQW9DLE9BQXBDLENBQXBCO0FBQ0EsUUFBSUMsY0FBY1AsRUFBRSwyQkFBRixFQUErQk0sSUFBL0IsQ0FBb0MsS0FBcEMsQ0FBbEI7QUFDQSxRQUFJRSxRQUFRLENBQUNSLEVBQUUsZUFBRixDQUFELEVBQXFCQSxFQUFFLGFBQUYsQ0FBckIsQ0FBWjtBQUNBLFFBQUlTLFVBQUo7QUFDQSxRQUFJQyxRQUFKO0FBQ0EsUUFBSUMsU0FBSjtBQUNBLFFBQUlDLElBQUo7O0FBRUEsUUFBSUosTUFBTSxDQUFOLEVBQVNLLElBQVQsTUFBbUIsRUFBdkIsRUFBMkI7QUFDdkJKLHFCQUFhSixhQUFiO0FBQ0gsS0FGRCxNQUVPO0FBQ0hJLHFCQUFhSyxTQUFTTixNQUFNLENBQU4sRUFBU0ssSUFBVCxFQUFULENBQWI7QUFDSDs7QUFFRCxRQUFJTCxNQUFNLENBQU4sRUFBU0ssSUFBVCxNQUFtQixFQUF2QixFQUEyQjtBQUN2QkgsbUJBQVdILFdBQVg7QUFDSCxLQUZELE1BRU87QUFDSEcsbUJBQVdJLFNBQVNOLE1BQU0sQ0FBTixFQUFTSyxJQUFULEVBQVQsQ0FBWDtBQUNIOztBQUVERSxlQUFXQyxNQUFYLENBQWtCZCxNQUFsQixFQUEwQjtBQUN0QmUsZUFBTyxDQUFDUixVQUFELEVBQWFDLFFBQWIsQ0FEZTtBQUV0QlEsaUJBQVMsSUFGYTtBQUd0QkMsZUFBTztBQUNIQyxpQkFBS2YsYUFERjtBQUVIZ0IsaUJBQUtkO0FBRkY7QUFIZSxLQUExQjtBQVFBTCxXQUFPYSxVQUFQLENBQWtCTyxFQUFsQixDQUFxQixRQUFyQixFQUErQixVQUFTQyxNQUFULEVBQWlCQyxNQUFqQixFQUF5QjtBQUNwRGhCLGNBQU1nQixNQUFOLEVBQWNYLElBQWQsQ0FBbUJDLFNBQVNTLE9BQU9DLE1BQVAsQ0FBVCxDQUFuQjtBQUNILEtBRkQ7QUFHSDs7QUFFRHhCLEVBQUUsMkJBQUYsRUFBK0JzQixFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxZQUFXO0FBQ2xEdEIsTUFBRSxpQkFBRixFQUFxQnlCLFdBQXJCLENBQWlDLFNBQWpDO0FBQ0F6QixNQUFFLE1BQUYsRUFBVTBCLFVBQVYsQ0FBcUIsT0FBckI7O0FBRUEsV0FBTyxLQUFQO0FBQ0gsQ0FMRDs7QUFPQTFCLEVBQUUsd0JBQUYsRUFBNEJzQixFQUE1QixDQUErQixPQUEvQixFQUF3QyxVQUFTSyxDQUFULEVBQVk7QUFDaEQsUUFDSTNCLEVBQUUyQixFQUFFQyxNQUFKLEVBQVlDLE9BQVosQ0FDSSwyRkFESixFQUVFNUIsTUFITixFQUlFO0FBQ0U7QUFDSCxLQU5ELE1BTU87QUFDSCxZQUFJNkIsUUFBUTlCLEVBQUUsSUFBRixDQUFaO0FBQ0EsWUFBSStCLE1BQU1ELE1BQU1FLElBQU4sQ0FBVyxpQ0FBWCxDQUFWO0FBQ0EsWUFBSUMsT0FBT0gsTUFBTUUsSUFBTixDQUFXLGtDQUFYLENBQVg7QUFDQSxZQUFJRSxNQUFNSixNQUFNRSxJQUFOLENBQVcsaUNBQVgsQ0FBVjs7QUFFQSxZQUFJRixNQUFNSyxRQUFOLENBQWUsV0FBZixDQUFKLEVBQWlDO0FBQzdCTCxrQkFBTUwsV0FBTixDQUFrQixXQUFsQjtBQUNBTSxnQkFBSUwsVUFBSixDQUFlLE9BQWY7QUFDQU8saUJBQUtQLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDSCxTQUpELE1BSU87QUFDSEksa0JBQU1NLFFBQU4sQ0FBZSxXQUFmO0FBQ0FMLGdCQUFJTSxHQUFKLENBQVEsU0FBUixFQUFtQixNQUFuQjtBQUNBSixpQkFBS0ksR0FBTCxDQUFTLFNBQVQsRUFBb0IsT0FBcEI7QUFDSDtBQUNKO0FBQ0osQ0F2QkQ7O0FBeUJBO0FBQ0FyQyxFQUFFRyxRQUFGLEVBQVltQixFQUFaLENBQWUsT0FBZixFQUF3QixhQUF4QixFQUF1QyxVQUFTSyxDQUFULEVBQVk7QUFDL0MzQixNQUFFLElBQUYsRUFBUXNDLFdBQVIsQ0FBb0IsWUFBcEI7QUFDQSxXQUFPLEtBQVA7QUFDSCxDQUhEOztBQUtBO0FBQ0F0QyxFQUFFLG1CQUFGLEVBQXVCc0IsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBU0ssQ0FBVCxFQUFZO0FBQzNDM0IsTUFBRSxJQUFGLEVBQ0t1QyxNQURMLENBQ1ksd0JBRFosRUFFS0YsR0FGTCxDQUVTLFNBRlQsRUFFb0IsTUFGcEIsRUFHS1IsT0FITCxDQUdhLGFBSGIsRUFJS0csSUFKTCxDQUlVLGtDQUpWLEVBS0tOLFVBTEwsQ0FLZ0IsT0FMaEI7QUFNQWM7QUFDSCxDQVJEOztBQVVBLFNBQVNBLGlCQUFULEdBQTZCO0FBQ3pCLFFBQUlDLFFBQVF6QyxFQUFFLFdBQUYsQ0FBWjtBQUNBMEMsWUFBUUMsR0FBUixDQUFZRixNQUFNbkMsSUFBTixDQUFXLE9BQVgsQ0FBWjtBQUNBLFFBQUlzQyxNQUFNLFNBQU5BLEdBQU0sR0FBVztBQUNqQkMsbUJBQVcsWUFBVztBQUNsQixnQkFBSUMsSUFBSUwsTUFBTW5DLElBQU4sQ0FBVyxPQUFYLENBQVI7QUFDQW1DLGtCQUFNNUIsSUFBTixDQUFXaUMsQ0FBWDtBQUNBSixvQkFBUUMsR0FBUixDQUFZRyxDQUFaO0FBQ0EsZ0JBQUlDLE1BQU1DLFlBQVksWUFBVztBQUM3QkY7QUFDQSxvQkFBSUEsS0FBSyxDQUFDLENBQVYsRUFBYTtBQUNURyxrQ0FBY0YsR0FBZDtBQUNBTiwwQkFBTUYsTUFBTixHQUFlRixHQUFmLENBQW1CLFNBQW5CLEVBQThCLE1BQTlCO0FBQ0FyQyxzQkFBRSxtQkFBRixFQUNLdUMsTUFETCxDQUNZLHdCQURaLEVBRUtiLFVBRkwsQ0FFZ0IsT0FGaEI7QUFHSCxpQkFORCxNQU1PO0FBQ0hlLDBCQUFNNUIsSUFBTixDQUFXaUMsQ0FBWDtBQUNIO0FBQ0osYUFYUyxFQVdQLElBWE8sQ0FBVjtBQVlBOUMsY0FBRSxtQkFBRixFQUF1QnNCLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFVBQVNLLENBQVQsRUFBWTtBQUMzQ3NCLDhCQUFjRixHQUFkO0FBQ0FIO0FBQ0gsYUFIRDtBQUlILFNBcEJEO0FBcUJILEtBdEJEO0FBdUJBQTtBQUNIOztBQUVEO0FBQ0EsSUFBSTVDLEVBQUUsY0FBRixFQUFrQkMsTUFBbEIsR0FBMkIsQ0FBL0IsRUFBa0M7QUFDOUIsUUFBSWlELFdBQVdsRCxFQUFFLGNBQUYsQ0FBZjtBQUNBa0QsYUFBUzVCLEVBQVQsQ0FBWSxTQUFaLEVBQXVCNkIsUUFBdkI7O0FBRUFELGFBQVM1QixFQUFULENBQVksU0FBWixFQUF1QixVQUFTSyxDQUFULEVBQVk7QUFDL0IsWUFDSSxDQUFDQSxFQUFFeUIsT0FBRixJQUFhekIsRUFBRTBCLE9BQWhCLE1BQ0MxQixFQUFFMkIsT0FBRixLQUFjLEVBQWQsSUFBb0IzQixFQUFFMkIsT0FBRixLQUFjLEVBRG5DLENBREosRUFHRTtBQUNFSixxQkFBU0ssS0FBVCxJQUFrQixNQUFsQjtBQUNILFNBTEQsTUFLTyxJQUFJNUIsRUFBRTJCLE9BQUYsS0FBYyxFQUFkLElBQW9CM0IsRUFBRTJCLE9BQUYsS0FBYyxFQUF0QyxFQUEwQztBQUM3QyxpQkFBS0UsVUFBTCxDQUFnQkMsTUFBaEI7QUFDQTlCLGNBQUUrQixjQUFGO0FBQ0g7QUFDSixLQVZEO0FBV0g7O0FBRUQsU0FBU1AsUUFBVCxHQUFvQjtBQUNoQixRQUFJUSxLQUFLLElBQVQ7QUFDQSxRQUFJQyxXQUFXNUQsRUFBRSxhQUFGLENBQWY7QUFDQSxRQUFJNkQsbUJBQW1CN0QsRUFBRSxlQUFGLEVBQW1COEQsV0FBbkIsRUFBdkI7QUFDQWpCLGVBQVcsWUFBVztBQUNsQmMsV0FBR0ksS0FBSCxDQUFTQyxPQUFULEdBQW1CLGFBQW5CO0FBQ0FMLFdBQUdJLEtBQUgsQ0FBU0MsT0FBVCxHQUFtQixZQUFZTCxHQUFHTSxZQUFmLEdBQThCLElBQWpEO0FBQ0FMLGlCQUFTdkIsR0FBVCxDQUFhO0FBQ1Q2QixvQkFBUSxLQUFLUCxHQUFHTSxZQUFSLEdBQXVCO0FBRHRCLFNBQWI7QUFHQSxZQUFJTixHQUFHTSxZQUFILElBQW1CLEdBQXZCLEVBQTRCO0FBQ3hCTixlQUFHSSxLQUFILENBQVNJLFFBQVQsR0FBb0IsTUFBcEI7QUFDQVAscUJBQVN2QixHQUFULENBQWE7QUFDVDZCLHdCQUFRTCxtQkFBbUI7QUFEbEIsYUFBYjtBQUdIO0FBQ0osS0FaRCxFQVlHLENBWkg7QUFhSDs7QUFFRDdELEVBQUUsc0JBQUYsRUFBMEJzQixFQUExQixDQUE2QixPQUE3QixFQUFzQyxZQUFXO0FBQzdDLFFBQUk4QyxRQUFRcEUsRUFBRSxJQUFGLEVBQVFNLElBQVIsQ0FBYSxPQUFiLENBQVo7QUFDQSxRQUFJTixFQUFFLElBQUYsRUFBUW1DLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSixFQUFvQztBQUNoQ25DLFVBQUUsbUJBQUYsRUFBdUJxRSxLQUF2QixDQUE2QixNQUE3QjtBQUNBckUsVUFBRSwrQkFBRixFQUFtQ2EsSUFBbkMsQ0FBd0N1RCxLQUF4QztBQUNILEtBSEQsTUFHTztBQUNIcEUsVUFBRSxJQUFGLEVBQVFvQyxRQUFSLENBQWlCLFlBQWpCO0FBQ0g7QUFDSixDQVJEOztBQVVBO0FBQ0EsSUFBSXBDLEVBQUUsa0JBQUYsRUFBc0JDLE1BQXRCLEdBQStCLENBQW5DLEVBQXNDO0FBQ2xDLFFBQUlxRSxjQUFjdEUsRUFBRSxrQkFBRixDQUFsQjtBQUNBc0UsZ0JBQ0toRCxFQURMLENBQ1EsT0FEUixFQUNpQixZQUFXO0FBQ3BCLFlBQUlpRCxPQUFPdkUsRUFBRSxJQUFGLEVBQ042QixPQURNLENBQ0UsWUFERixFQUVORyxJQUZNLENBRUQsZUFGQyxDQUFYO0FBR0EsWUFBSWhDLEVBQUUsSUFBRixFQUFRd0UsR0FBUixNQUFpQixFQUFyQixFQUF5QjtBQUNyQkQsaUJBQUs3QyxVQUFMLENBQWdCLE9BQWhCO0FBQ0gsU0FGRCxNQUVPO0FBQ0g2QyxpQkFBS2xDLEdBQUwsQ0FBUyxTQUFULEVBQW9CLE1BQXBCO0FBQ0g7QUFDSixLQVZMLEVBV0tmLEVBWEwsQ0FXUSxPQVhSLEVBV2lCLFlBQVc7QUFDcEIsWUFBSWlELE9BQU92RSxFQUFFLElBQUYsRUFDTjZCLE9BRE0sQ0FDRSxZQURGLEVBRU5HLElBRk0sQ0FFRCxlQUZDLENBQVg7QUFHQSxZQUFJaEMsRUFBRSxJQUFGLEVBQVF3RSxHQUFSLE1BQWlCLEVBQXJCLEVBQXlCO0FBQ3JCRCxpQkFBSzdDLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDSDtBQUNKLEtBbEJMLEVBbUJLSixFQW5CTCxDQW1CUSxNQW5CUixFQW1CZ0IsWUFBVztBQUNuQixZQUFJaUQsT0FBT3ZFLEVBQUUsSUFBRixFQUNONkIsT0FETSxDQUNFLFlBREYsRUFFTkcsSUFGTSxDQUVELGVBRkMsQ0FBWDs7QUFJQSxZQUFJaEMsRUFBRXlFLE1BQUYsRUFBVUMsS0FBVixLQUFvQixHQUF4QixFQUE2QjtBQUN6QixnQkFBSTFFLEVBQUUsSUFBRixFQUFRd0UsR0FBUixNQUFpQixFQUFyQixFQUF5QjtBQUNyQkQscUJBQUtsQyxHQUFMLENBQVMsU0FBVCxFQUFvQixNQUFwQjtBQUNIO0FBQ0o7QUFDSixLQTdCTDtBQThCSDs7QUFFRDtBQUNBLFNBQVNzQyxhQUFULEdBQXlCO0FBQ3JCQyxjQUFVdEQsRUFBVixDQUFhLE9BQWIsRUFBc0IsdUJBQXRCLEVBQStDLFlBQVc7QUFDdEQsWUFBSXVELFVBQVU3RSxFQUFFLElBQUYsRUFBUTZCLE9BQVIsQ0FBZ0IsbUJBQWhCLENBQWQ7QUFDQSxZQUFJaUQsY0FBY0QsUUFBUTdDLElBQVIsQ0FBYSxlQUFiLENBQWxCO0FBQ0EsWUFBSStDLGVBQWVGLFFBQVE3QyxJQUFSLENBQWEsZ0JBQWIsQ0FBbkI7QUFDQSxZQUFJZ0QsYUFBYUgsUUFBUTdDLElBQVIsQ0FBYSwyQkFBYixDQUFqQjtBQUNBLFlBQUlpRCxjQUFjSixRQUFRN0MsSUFBUixDQUFhLDRCQUFiLENBQWxCOztBQUVBLFlBQUloQyxFQUFFLElBQUYsRUFBUW1DLFFBQVIsQ0FBaUIsWUFBakIsQ0FBSixFQUFvQztBQUNoQytDLG1CQUFPSCxZQUFQO0FBQ0FoRCxnQkFBSStDLFdBQUo7QUFDQUUsdUJBQVc1QyxRQUFYLENBQW9CLFlBQXBCO0FBQ0E2Qyx3QkFBWXhELFdBQVosQ0FBd0IsWUFBeEI7QUFDSCxTQUxELE1BS087QUFDSHlELG1CQUFPSixXQUFQO0FBQ0EvQyxnQkFBSWdELFlBQUo7QUFDQUMsdUJBQVd2RCxXQUFYLENBQXVCLFlBQXZCO0FBQ0F3RCx3QkFBWTdDLFFBQVosQ0FBcUIsWUFBckI7QUFDSDtBQUNKLEtBbEJEOztBQW9CQSxhQUFTTCxHQUFULENBQWE0QixFQUFiLEVBQWlCO0FBQ2JBLFdBQUczQixJQUFILENBQVEsYUFBUixFQUNLSSxRQURMLENBQ2MscUJBRGQsRUFFS0osSUFGTCxDQUVVLGFBRlYsRUFHS1AsV0FITCxDQUdpQixLQUhqQixFQUlLVyxRQUpMLENBSWMsS0FKZDtBQUtIOztBQUVELGFBQVM4QyxNQUFULENBQWdCdkIsRUFBaEIsRUFBb0I7QUFDaEJBLFdBQUczQixJQUFILENBQVEsYUFBUixFQUNLUCxXQURMLENBQ2lCLHFCQURqQixFQUVLTyxJQUZMLENBRVUsYUFGVixFQUdLUCxXQUhMLENBR2lCLEtBSGpCLEVBSUtXLFFBSkwsQ0FJYyxLQUpkO0FBS0g7QUFDSjtBQUNEdUM7O0FBRUE7QUFDQSxJQUFJM0UsRUFBRSxXQUFGLEVBQWVDLE1BQWYsR0FBd0IsQ0FBNUIsRUFBK0I7QUFBQSxRQUlsQmtGLElBSmtCLEdBSTNCLFNBQVNBLElBQVQsR0FBZ0I7QUFDWkMsZ0JBQVEsSUFBSUMsTUFBTUMsR0FBVixDQUFjLFVBQWQsRUFBMEI7QUFDOUJDLG9CQUFRLENBQUMsV0FBRCxFQUFjLFVBQWQsQ0FEc0I7QUFFOUJDLGtCQUFNO0FBRndCLFNBQTFCLENBQVI7O0FBS0FKLGNBQU1LLFNBQU4sQ0FBZ0JDLE9BQWhCLENBQXdCLENBQUMsWUFBRCxDQUF4Qjs7QUFFQU4sY0FBTU8sUUFBTixDQUNLVCxNQURMLENBQ1ksZUFEWixFQUVLQSxNQUZMLENBRVksY0FGWixFQUdLbkQsR0FITCxDQUdTLGFBSFQ7O0FBS0E2RCxnQkFBUSxJQUFJUCxNQUFNUSxtQkFBVixDQUNKLEVBREksRUFFSjtBQUNJQyx3QkFBWSxlQURoQjtBQUVJQywyQkFBZSx5QkFGbkI7QUFHSUMsMkJBQWUsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUhuQjtBQUlJQyw2QkFBaUIsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFDLEVBQU47QUFKckIsU0FGSSxDQUFSOztBQVVBQyxzQkFBYyxJQUFJYixNQUFNYyxTQUFWLENBQW9CLENBQUMsV0FBRCxFQUFjLFVBQWQsQ0FBcEIsRUFBK0M7QUFDekRDLGtDQUNJLG9EQUZxRDtBQUd6REMsZ0NBQ0ksbW5CQUpxRDtBQUt6REMseUJBQ0k7QUFOcUQsU0FBL0MsQ0FBZDs7QUFTQVYsY0FBTTdELEdBQU4sQ0FBVW1FLFdBQVY7QUFDQWQsY0FBTW1CLFVBQU4sQ0FBaUJ4RSxHQUFqQixDQUFxQjZELEtBQXJCO0FBQ0gsS0F0QzBCOztBQUMzQlAsVUFBTW1CLEtBQU4sQ0FBWXJCLElBQVo7QUFDQSxRQUFJQyxLQUFKLEVBQVdjLFdBQVgsRUFBd0JOLEtBQXhCO0FBcUNIOztBQUVEO0FBQ0EsSUFBSTVGLEVBQUUsY0FBRixFQUFrQkMsTUFBbEIsR0FBMkIsQ0FBL0IsRUFBa0M7QUFBQSxRQUlyQmtGLEtBSnFCLEdBSTlCLFNBQVNBLEtBQVQsR0FBZ0I7QUFDWkMsZ0JBQVEsSUFBSUMsTUFBTUMsR0FBVixDQUFjLGFBQWQsRUFBNkI7QUFDakNDLG9CQUFRLENBQUMsV0FBRCxFQUFjLFVBQWQsQ0FEeUI7QUFFakNDLGtCQUFNO0FBRjJCLFNBQTdCLENBQVI7O0FBS0FKLGNBQU1LLFNBQU4sQ0FBZ0JDLE9BQWhCLENBQXdCLENBQUMsWUFBRCxDQUF4Qjs7QUFFQU4sY0FBTU8sUUFBTixDQUNLVCxNQURMLENBQ1ksZUFEWixFQUVLQSxNQUZMLENBRVksY0FGWixFQUdLbkQsR0FITCxDQUdTLGFBSFQ7O0FBS0E2RCxnQkFBUSxJQUFJUCxNQUFNUSxtQkFBVixDQUNKLEVBREksRUFFSjtBQUNJQyx3QkFBWSxlQURoQjtBQUVJQywyQkFBZSx5QkFGbkI7QUFHSUMsMkJBQWUsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUhuQjtBQUlJQyw2QkFBaUIsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFDLEVBQU47QUFKckIsU0FGSSxDQUFSOztBQVVBQyxzQkFBYyxJQUFJYixNQUFNYyxTQUFWLENBQW9CLENBQUMsV0FBRCxFQUFjLFVBQWQsQ0FBcEIsQ0FBZDs7QUFFQVAsY0FBTTdELEdBQU4sQ0FBVW1FLFdBQVY7QUFDQWQsY0FBTW1CLFVBQU4sQ0FBaUJ4RSxHQUFqQixDQUFxQjZELEtBQXJCO0FBQ0gsS0EvQjZCOztBQUM5QlAsVUFBTW1CLEtBQU4sQ0FBWXJCLEtBQVo7QUFDQSxRQUFJQyxLQUFKLEVBQVdjLFdBQVgsRUFBd0JOLEtBQXhCO0FBOEJIOztBQUVEO0FBQ0EsSUFBSTVGLEVBQUUsb0JBQUYsRUFBd0JDLE1BQTVCLEVBQW9DO0FBQUEsUUFJdkJrRixNQUp1QixHQUloQyxTQUFTQSxNQUFULEdBQWdCO0FBQ1pDLGdCQUFRLElBQUlDLE1BQU1DLEdBQVYsQ0FBYyxhQUFkLEVBQTZCO0FBQ2pDQyxvQkFBUSxDQUFDLFdBQUQsRUFBYyxVQUFkLENBRHlCO0FBRWpDQyxrQkFBTTtBQUYyQixTQUE3QixDQUFSOztBQUtBSixjQUFNSyxTQUFOLENBQWdCQyxPQUFoQixDQUF3QixDQUFDLFlBQUQsQ0FBeEI7O0FBRUFOLGNBQU1PLFFBQU4sQ0FDS1QsTUFETCxDQUNZLGVBRFosRUFFS0EsTUFGTCxDQUVZLGNBRlosRUFHS25ELEdBSEwsQ0FHUyxhQUhUOztBQUtBNkQsZ0JBQVEsSUFBSVAsTUFBTVEsbUJBQVYsQ0FDSixFQURJLEVBRUo7QUFDSUMsd0JBQVksZUFEaEI7QUFFSUMsMkJBQWUseUJBRm5CO0FBR0lDLDJCQUFlLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FIbkI7QUFJSUMsNkJBQWlCLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBQyxFQUFOO0FBSnJCLFNBRkksQ0FBUjs7QUFVQUMsc0JBQWMsSUFBSWIsTUFBTWMsU0FBVixDQUFvQixDQUFDLFdBQUQsRUFBYyxVQUFkLENBQXBCLEVBQStDO0FBQ3pEQyxrQ0FDSSxzSUFGcUQ7QUFHekRDLGdDQUNJO0FBQ0o7QUFDQTtBQU55RCxTQUEvQyxDQUFkOztBQVNBakIsY0FBTXFCLE1BQU4sQ0FBYTFFLEdBQWIsQ0FBaUIsT0FBakIsRUFBMEIsWUFBVyxDQUFFLENBQXZDOztBQUVBbUUsb0JBQVlPLE1BQVosQ0FBbUIxRSxHQUFuQixDQUF1QixPQUF2QixFQUFnQyxZQUFXO0FBQ3ZDL0IsY0FBRSxtQkFBRixFQUF1QjBHLFlBQXZCO0FBQ0FoRSxvQkFBUUMsR0FBUixDQUFZLEtBQVosRUFBbUIsY0FBbkI7QUFDSCxTQUhEOztBQUtBaUQsY0FBTTdELEdBQU4sQ0FBVW1FLFdBQVY7QUFDQWQsY0FBTW1CLFVBQU4sQ0FBaUJ4RSxHQUFqQixDQUFxQjZELEtBQXJCO0FBQ0gsS0E3QytCOztBQUNoQ1AsVUFBTW1CLEtBQU4sQ0FBWXJCLE1BQVo7QUFDQSxRQUFJQyxLQUFKLEVBQVdjLFdBQVgsRUFBd0JOLEtBQXhCO0FBNENIOztBQUVEOzs7QUFHQSxDQUFDLFlBQVc7QUFDUixRQUFJZSxjQUFjM0csRUFBRSxVQUFGLENBQWxCO0FBQ0EsUUFBSTRHLFlBQVksSUFBSUMsSUFBSixFQUFoQjs7QUFFQUYsZ0JBQVlHLElBQVosQ0FBaUIsWUFBVztBQUN4QixZQUFJakMsVUFBVTdFLEVBQUUsSUFBRixFQUFRNkIsT0FBUixDQUFnQixVQUFoQixDQUFkO0FBQ0EsWUFBSWtGLFlBQVlsQyxRQUFRN0MsSUFBUixDQUFhLHNCQUFiLENBQWhCO0FBQ0EsWUFBSWdGLFdBQVduQyxRQUFRN0MsSUFBUixDQUFhLHFCQUFiLENBQWY7QUFDQSxZQUFJaUYsV0FBV3BDLFFBQVE3QyxJQUFSLENBQWEscUJBQWIsQ0FBZjtBQUNBLFlBQUlrRixPQUFPbEgsRUFBRSxJQUFGLEVBQVFtSCxJQUFSLENBQWEsV0FBYixDQUFYOztBQUVBLFlBQUlELFNBQVMsVUFBYixFQUF5QjtBQUNyQixnQkFBSUUsUUFBUXBILEVBQUUsSUFBRixDQUFaO0FBQ0EsZ0JBQUl3RSxNQUFNeEUsRUFBRSxJQUFGLEVBQVF3RSxHQUFSLEVBQVY7O0FBRUE2QyxzQkFBVXJILEVBQUUsSUFBRixDQUFWLEVBQW1Cd0UsR0FBbkI7O0FBRUF4RSxjQUFFLElBQUYsRUFDS3NILFVBREwsQ0FDZ0I7QUFDUkMsMkJBQVcsSUFESDtBQUVSQyx5QkFBUyxLQUZEOztBQUlSQywwQkFBVSxrQkFBU0MsYUFBVCxFQUF3QjtBQUM5QkwsOEJBQVVELEtBQVYsRUFBaUJNLGFBQWpCO0FBQ0g7QUFOTyxhQURoQixFQVNLcEgsSUFUTCxDQVNVLFlBVFYsRUFVS3FILFVBVkwsQ0FVZ0JmLFNBVmhCOztBQVlBO0FBQ0gsU0FuQkQsTUFtQk8sSUFBSU0sU0FBUyxVQUFiLEVBQXlCO0FBQzVCLGdCQUFJRSxTQUFRcEgsRUFBRSxJQUFGLENBQVo7QUFDQSxnQkFBSXdFLE9BQU14RSxFQUFFLElBQUYsRUFBUXdFLEdBQVIsRUFBVjs7QUFFQTZDLHNCQUFVckgsRUFBRSxJQUFGLENBQVYsRUFBbUJ3RSxJQUFuQjs7QUFFQXhFLGNBQUUsSUFBRixFQUNLc0gsVUFETCxDQUNnQjtBQUNSQywyQkFBVyxJQURIO0FBRVJLLDBCQUFVLElBRkY7QUFHUkoseUJBQVMsS0FIRDs7QUFLUkMsMEJBQVUsa0JBQVNDLGFBQVQsRUFBd0JHLElBQXhCLEVBQThCQyxJQUE5QixFQUFvQztBQUMxQyx3QkFBSUMsa0JBQUo7QUFBQSx3QkFBZUMsZ0JBQWY7O0FBRUEsd0JBQUlDLGNBQWNKLEtBQUtLLE9BQUwsRUFBbEI7QUFDQSx3QkFBSUMsZUFBZU4sS0FBS08sUUFBTCxFQUFuQjs7QUFFQUwsZ0NBQVksSUFBSWxCLElBQUosQ0FDUmdCLEtBQUtRLFdBQUwsRUFEUSxFQUVSUixLQUFLTyxRQUFMLEVBRlEsRUFHUlAsS0FBS0ssT0FBTCxFQUhRLENBQVo7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUYsOEJBQ0lILEtBQUtLLE9BQUwsS0FDQUwsS0FBS1MsTUFBTCxFQURBLEdBRUEsQ0FGQSxHQUdBLEdBSEEsR0FJQVQsS0FBS08sUUFBTCxFQUxKOztBQU9BZiw4QkFBVUQsTUFBVixFQUFpQk0sYUFBakI7QUFDSDtBQS9CTyxhQURoQixFQWtDS3BILElBbENMLENBa0NVLFlBbENWLEVBbUNLcUgsVUFuQ0wsQ0FtQ2dCZixTQW5DaEI7QUFvQ0gsU0ExQ00sTUEwQ0E7QUFDSCxnQkFBSTVHLEVBQUV5RSxNQUFGLEVBQVVDLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFDekIxRSxrQkFBRSxJQUFGLEVBQ0tzSCxVQURMLENBQ2dCO0FBQ1JpQixnQ0FBWSxVQURKO0FBRVJoQiwrQkFBVyxJQUZIO0FBR1JDLDZCQUFTWjtBQUhELGlCQURoQixFQU1LdEcsSUFOTCxDQU1VLFlBTlYsRUFPS3FILFVBUEwsQ0FPZ0JmLFNBUGhCO0FBUUgsYUFURCxNQVNPO0FBQ0hELDRCQUFZRyxJQUFaLENBQWlCLFlBQVc7QUFDeEI5RyxzQkFBRSxJQUFGLEVBQVFtSCxJQUFSLENBQWEsTUFBYixFQUFxQixNQUFyQjtBQUNILGlCQUZEO0FBR0FxQiw2QkFBYSxVQUFiO0FBQ0g7QUFDSjs7QUFFRHpCLGtCQUFVekYsRUFBVixDQUFhLE9BQWIsRUFBc0IsVUFBU0ssQ0FBVCxFQUFZO0FBQzlCQSxjQUFFK0IsY0FBRjtBQUNBbUIsb0JBQ0s3QyxJQURMLENBQ1UsVUFEVixFQUVLMUIsSUFGTCxDQUVVLFlBRlYsRUFHS3FILFVBSEwsQ0FHZ0JmLFNBSGhCO0FBSUgsU0FORDs7QUFRQUksaUJBQVMxRixFQUFULENBQVksT0FBWixFQUFxQixVQUFTSyxDQUFULEVBQVk7QUFDN0JBLGNBQUUrQixjQUFGO0FBQ0FtQixvQkFDSzdDLElBREwsQ0FDVSxVQURWLEVBRUsxQixJQUZMLENBRVUsWUFGVixFQUdLbUksSUFITDs7QUFLQS9GLG9CQUFRQyxHQUFSLENBQVksS0FBWixFQUFtQixZQUFuQjtBQUNILFNBUkQ7O0FBVUE7QUFDQWtDLGdCQUFRN0MsSUFBUixDQUFhLGdCQUFiLEVBQStCVixFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxZQUFXO0FBQ2xELGdCQUFJcUYsY0FBYzNHLEVBQUUsSUFBRixFQUNiNkIsT0FEYSxDQUNMLFVBREssRUFFYkcsSUFGYSxDQUVSLFVBRlEsRUFHYnNGLFVBSGEsR0FJYmhILElBSmEsQ0FJUixZQUpRLENBQWxCOztBQU1BcUcsd0JBQVkrQixJQUFaO0FBQ0gsU0FSRDs7QUFVQTtBQUNBLGlCQUFTckIsU0FBVCxDQUFtQjFELEVBQW5CLEVBQXVCYSxHQUF2QixFQUE0QjtBQUN4QmIsZUFBRzlCLE9BQUgsQ0FBVyxVQUFYLEVBQ0tHLElBREwsQ0FDVSxnQkFEVixFQUVLbkIsSUFGTCxDQUVVMkQsR0FGVjtBQUdIO0FBQ0osS0F6SEQ7O0FBMkhBO0FBQ0F4RSxNQUFFLGdCQUFGLEVBQW9Cc0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBU0ssQ0FBVCxFQUFZO0FBQ3hDQSxVQUFFK0IsY0FBRjtBQUNBMUQsVUFBRSxVQUFGLEVBQWMySSxLQUFkO0FBQ0gsS0FIRDtBQUlILENBcElEOztBQXNJQSxTQUFTQyxrQkFBVCxHQUE4QjtBQUMxQixRQUFJZixPQUFPLElBQUloQixJQUFKLEVBQVg7QUFDQSxRQUFJZ0MsOEJBQThCN0ksRUFBRSxnQ0FBRixDQUFsQztBQUNBLFFBQUk4SSxVQUFVQyxnQkFBZ0JsQixJQUFoQixDQUFkOztBQUVBbUIsc0JBQWtCRixPQUFsQjs7QUFFQSxRQUFJRCw0QkFBNEI1SSxNQUFoQyxFQUF3QztBQUNwQzRJLG9DQUNLdkIsVUFETCxDQUNnQjtBQUNSQyx1QkFBVyxJQURIO0FBRVIwQiw0QkFBZ0IsS0FGUjtBQUdSekIscUJBQVMsS0FIRDtBQUlSQyxzQkFBVSxrQkFBU0MsYUFBVCxFQUF3QkcsSUFBeEIsRUFBOEI7QUFDcEMsb0JBQUlpQixVQUFVQyxnQkFBZ0JsQixJQUFoQixDQUFkOztBQUVBbUIsa0NBQWtCRixPQUFsQjtBQUNIO0FBUk8sU0FEaEIsRUFXS3hJLElBWEwsQ0FXVSxZQVhWLEVBWUtxSCxVQVpMO0FBYUg7QUFDSjtBQUNEaUI7O0FBRUEsQ0FBQyxTQUFTTSxnQkFBVCxHQUE0QjtBQUN6QixRQUFJQyxhQUFhLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixDQUFqQjs7QUFFQW5KLE1BQUUsaUJBQUYsRUFBcUJzSCxVQUFyQixDQUFnQztBQUM1QjhCLGdCQUFRLElBRG9CO0FBRTVCQyx1QkFBZSxJQUZhO0FBRzVCQyxzQkFBYyxzQkFBU3pCLElBQVQsRUFBZTBCLFFBQWYsRUFBeUI7QUFDbkMsZ0JBQUl0QixjQUFjSixLQUFLSyxPQUFMLEVBQWxCOztBQUVBLGdCQUFJcUIsWUFBWSxLQUFaLElBQXFCSixXQUFXSyxPQUFYLENBQW1CdkIsV0FBbkIsS0FBbUMsQ0FBQyxDQUE3RCxFQUFnRTtBQUM1RCx1QkFBTztBQUNId0IsNkJBQVM7QUFETixpQkFBUDtBQUdIO0FBQ0o7QUFYMkIsS0FBaEM7QUFhSCxDQWhCRDs7QUFrQkEsU0FBU1QsaUJBQVQsQ0FBMkJ6RixLQUEzQixFQUFrQztBQUM5QixRQUFJbUcsMEJBQTBCMUosRUFBRSw0QkFBRixDQUE5Qjs7QUFFQTBKLDRCQUF3QjdJLElBQXhCLENBQTZCMEMsTUFBTW9HLEdBQU4sQ0FBVSxNQUFWLENBQTdCOztBQUVBRCw0QkFBd0JwSSxFQUF4QixDQUEyQixPQUEzQixFQUFvQyxZQUFXO0FBQzNDdEIsVUFBRSxnQ0FBRixFQUNLc0gsVUFETCxHQUVLaEgsSUFGTCxDQUVVLFlBRlYsRUFHS29JLElBSEw7QUFJSCxLQUxEO0FBTUg7O0FBRUQsU0FBU0ssZUFBVCxDQUF5QmxCLElBQXpCLEVBQStCO0FBQzNCLFFBQUkrQixPQUFPLElBQUkvQyxJQUFKLENBQVNnQixJQUFULENBQVg7QUFDQSxRQUFJZ0MsVUFBVUQsS0FBS3RCLE1BQUwsRUFBZDtBQUNBLFFBQUl3QixZQUFZRixLQUFLeEIsUUFBTCxFQUFoQjtBQUNBLFFBQUkyQixlQUFKO0FBQ0EsUUFBSUMsZUFBSjs7QUFFQSxRQUFJSCxZQUFZLENBQWhCLEVBQW1CO0FBQ2ZFLGlCQUFTSCxLQUFLMUIsT0FBTCxLQUFpQixDQUExQjtBQUNBOEIsaUJBQVNKLEtBQUsxQixPQUFMLEVBQVQ7QUFDSCxLQUhELE1BR087QUFDSDZCLGlCQUFTSCxLQUFLMUIsT0FBTCxLQUFpQjBCLEtBQUt0QixNQUFMLEVBQWpCLEdBQWlDLENBQTFDO0FBQ0EwQixpQkFBU0QsU0FBUyxDQUFsQjtBQUNIOztBQUVELFdBQU9FLGlCQUFpQkwsSUFBakIsRUFBdUJHLE1BQXZCLEVBQStCQyxNQUEvQixFQUF1Q0YsU0FBdkMsQ0FBUDtBQUNIOztBQUVELFNBQVNHLGdCQUFULENBQTBCQyxRQUExQixFQUFvQ0gsTUFBcEMsRUFBNENDLE1BQTVDLEVBQW9ERyxLQUFwRCxFQUEyRDtBQUN2RCxRQUFJQyxpQkFBSjtBQUNBLFFBQUlDLGdCQUFKO0FBQ0EsUUFBSUMsU0FBUztBQUNUSCxlQUFPO0FBREUsS0FBYjtBQUdBLFFBQUlJLGNBQUo7QUFDQSxRQUFJQyxjQUFKO0FBQ0EsUUFBSUMsZ0JBQUo7QUFDQSxRQUFJQyxnQkFBSjtBQUNBLFFBQUlDLGVBQUo7QUFDQSxRQUFJQyxlQUFKO0FBQ0EsUUFBSUMsVUFBVSxJQUFJQyxRQUFKLEVBQWQ7QUFDQSxRQUFJQyxhQUFKOztBQUVBLFFBQUlmLFNBQVNELE1BQVQsS0FBb0JBLFdBQVcsQ0FBWCxJQUFnQkEsU0FBUyxDQUE3QyxDQUFKLEVBQXFEO0FBQ2pELFlBQUlpQixXQUFXLElBQUluRSxJQUFKLENBQVNxRCxTQUFTN0IsV0FBVCxFQUFULEVBQWlDOEIsS0FBakMsRUFBd0MsQ0FBeEMsQ0FBZjs7QUFFQUMsbUJBQVcsSUFBSXZELElBQUosQ0FBU3FELFNBQVNlLE9BQVQsQ0FBaUJsQixNQUFqQixDQUFULENBQVg7QUFDQVEsZ0JBQVFILFNBQVNsQyxPQUFULEVBQVI7QUFDQXlDLGlCQUFTUCxTQUFTL0IsV0FBVCxFQUFUOztBQUVBK0IsbUJBQVdBLFNBQVNjLGNBQVQsQ0FBd0IsSUFBeEIsRUFBOEJaLE1BQTlCLENBQVg7QUFDQUcsa0JBQVVMLFNBQVNlLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsRUFBdEIsQ0FBVjs7QUFFQWQsa0JBQVUsSUFBSXhELElBQUosQ0FBU21FLFNBQVNDLE9BQVQsQ0FBaUJqQixNQUFqQixDQUFULENBQVY7QUFDQVEsZ0JBQVFILFFBQVFuQyxPQUFSLEVBQVI7QUFDQTBDLGlCQUFTUCxRQUFRaEMsV0FBUixFQUFUOztBQUVBZ0Msa0JBQVVBLFFBQVFhLGNBQVIsQ0FBdUIsSUFBdkIsRUFBNkJaLE1BQTdCLENBQVY7QUFDQUksa0JBQVVMLFFBQVFjLE9BQVIsQ0FBZ0IsR0FBaEIsRUFBcUIsRUFBckIsQ0FBVjs7QUFFQSxZQUFJUixXQUFXQyxNQUFmLEVBQXVCO0FBQ25CRyxtQkFDSVIsUUFDQSxHQURBLEdBRUFFLE9BRkEsR0FHQSxLQUhBLEdBSUFELEtBSkEsR0FLQSxHQUxBLEdBTUFFLE9BTkEsR0FPQSxJQVBBLEdBUUFDLE1BVEo7QUFVSCxTQVhELE1BV087QUFDSEksbUJBQ0lSLFFBQ0EsR0FEQSxHQUVBRSxPQUZBLEdBR0EsSUFIQSxHQUlBRSxNQUpBLEdBS0EsS0FMQSxHQU1BSCxLQU5BLEdBT0EsR0FQQSxHQVFBRSxPQVJBLEdBU0EsSUFUQSxHQVVBRSxNQVhKO0FBWUg7QUFDREMsZ0JBQVFPLE1BQVIsQ0FBZSxNQUFmLEVBQXVCTCxJQUF2QjtBQUNILEtBM0NELE1BMkNPO0FBQ0hYLG1CQUFXLElBQUl2RCxJQUFKLENBQVNxRCxTQUFTZSxPQUFULENBQWlCbEIsTUFBakIsQ0FBVCxDQUFYO0FBQ0FRLGdCQUFRSCxTQUFTbEMsT0FBVCxFQUFSO0FBQ0F5QyxpQkFBU1AsU0FBUy9CLFdBQVQsRUFBVDs7QUFFQStCLG1CQUFXQSxTQUFTYyxjQUFULENBQXdCLElBQXhCLEVBQThCWixNQUE5QixDQUFYO0FBQ0FHLGtCQUFVTCxTQUFTZSxPQUFULENBQWlCLEdBQWpCLEVBQXNCLEVBQXRCLENBQVY7O0FBRUFkLGtCQUFVLElBQUl4RCxJQUFKLENBQVNxRCxTQUFTZSxPQUFULENBQWlCakIsTUFBakIsQ0FBVCxDQUFWO0FBQ0FRLGdCQUFRSCxRQUFRbkMsT0FBUixFQUFSO0FBQ0EwQyxpQkFBU1AsUUFBUWhDLFdBQVIsRUFBVDs7QUFFQWdDLGtCQUFVQSxRQUFRYSxjQUFSLENBQXVCLElBQXZCLEVBQTZCWixNQUE3QixDQUFWO0FBQ0FJLGtCQUFVTCxRQUFRYyxPQUFSLENBQWdCLEdBQWhCLEVBQXFCLEVBQXJCLENBQVY7O0FBRUEsWUFBSVQsWUFBWUQsT0FBaEIsRUFBeUI7QUFDckJNLG1CQUFPUixRQUFRLEtBQVIsR0FBZ0JDLEtBQWhCLEdBQXdCLEdBQXhCLEdBQThCQyxPQUE5QixHQUF3QyxJQUF4QyxHQUErQ0UsTUFBdEQ7QUFDQUUsb0JBQVFPLE1BQVIsQ0FBZSxNQUFmLEVBQXVCTCxJQUF2QjtBQUNILFNBSEQsTUFHTztBQUNILGdCQUFJSixXQUFXQyxNQUFmLEVBQXVCO0FBQ25CRyx1QkFDSVIsUUFDQSxHQURBLEdBRUFFLE9BRkEsR0FHQSxLQUhBLEdBSUFELEtBSkEsR0FLQSxHQUxBLEdBTUFFLE9BTkEsR0FPQSxJQVBBLEdBUUFDLE1BVEo7QUFVSCxhQVhELE1BV087QUFDSEksdUJBQ0lSLFFBQ0EsR0FEQSxHQUVBRSxPQUZBLEdBR0EsSUFIQSxHQUlBRSxNQUpBLEdBS0EsS0FMQSxHQU1BSCxLQU5BLEdBT0EsR0FQQSxHQVFBRSxPQVJBLEdBU0EsSUFUQSxHQVVBRSxNQVhKO0FBWUg7QUFDREMsb0JBQVFPLE1BQVIsQ0FBZSxNQUFmLEVBQXVCTCxJQUF2QjtBQUNIO0FBQ0o7O0FBRUQsV0FBT0YsT0FBUDtBQUNIIiwiZmlsZSI6ImRlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICgkKCcuY2F0YWxvZy1maWx0ZXJfX2l0ZW1fcHJpY2UnKS5sZW5ndGggPiAwKSB7XHJcbiAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLWNhdGFsb2ctZmlsdGVyLXNsaWRlcicpO1xyXG4gICAgdmFyIGFsbFByaWNlU3RhcnQgPSAkKCcjanMtY2F0YWxvZy1maWx0ZXItc2xpZGVyJykuZGF0YSgnc3RhcnQnKTtcclxuICAgIHZhciBhbGxQcmljZUVuZCA9ICQoJyNqcy1jYXRhbG9nLWZpbHRlci1zbGlkZXInKS5kYXRhKCdlbmQnKTtcclxuICAgIHZhciBzcGFucyA9IFskKCcjanNQcmljZVN0YXJ0JyksICQoJyNqc1ByaWNlRW5kJyldO1xyXG4gICAgdmFyIHN0YXJ0UHJpY2U7XHJcbiAgICB2YXIgZW5kUHJpY2U7XHJcbiAgICB2YXIgYXJyUGFyYW1zO1xyXG4gICAgdmFyIHNVcmw7XHJcblxyXG4gICAgaWYgKHNwYW5zWzBdLnRleHQoKSA9PSAnJykge1xyXG4gICAgICAgIHN0YXJ0UHJpY2UgPSBhbGxQcmljZVN0YXJ0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzdGFydFByaWNlID0gcGFyc2VJbnQoc3BhbnNbMF0udGV4dCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3BhbnNbMV0udGV4dCgpID09ICcnKSB7XHJcbiAgICAgICAgZW5kUHJpY2UgPSBhbGxQcmljZUVuZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZW5kUHJpY2UgPSBwYXJzZUludChzcGFuc1sxXS50ZXh0KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xyXG4gICAgICAgIHN0YXJ0OiBbc3RhcnRQcmljZSwgZW5kUHJpY2VdLFxyXG4gICAgICAgIGNvbm5lY3Q6IHRydWUsXHJcbiAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgbWluOiBhbGxQcmljZVN0YXJ0LFxyXG4gICAgICAgICAgICBtYXg6IGFsbFByaWNlRW5kXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzbGlkZXIubm9VaVNsaWRlci5vbigndXBkYXRlJywgZnVuY3Rpb24odmFsdWVzLCBoYW5kbGUpIHtcclxuICAgICAgICBzcGFuc1toYW5kbGVdLnRleHQocGFyc2VJbnQodmFsdWVzW2hhbmRsZV0pKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4kKCcuanMtY2F0YWxvZy1maWx0ZXItLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCcuY2F0YWxvZy1maWx0ZXInKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbiQoJy5qcy1jYXJkLXNlcnZpY2VzLWl0ZW0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICAgJChlLnRhcmdldCkuY2xvc2VzdChcclxuICAgICAgICAgICAgJy5jYXJkLXNlcnZpY2VzLWl0ZW1fX21pZGRsZSwgLmNhcmQtc2VydmljZXMtaXRlbV9faW5mby1ibG9jaywgLmNhcmQtc2VydmljZXMtaXRlbV9fYm90dG9tJ1xyXG4gICAgICAgICkubGVuZ3RoXHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgdmFyIGFkZCA9IF90aGlzLmZpbmQoJy5jYXJkLXNlcnZpY2VzLWl0ZW1fX2FjdGlvbl9hZGQnKTtcclxuICAgICAgICB2YXIgZG9uZSA9IF90aGlzLmZpbmQoJy5jYXJkLXNlcnZpY2VzLWl0ZW1fX2FjdGlvbl9kb25lJyk7XHJcbiAgICAgICAgdmFyIGRlbCA9IF90aGlzLmZpbmQoJy5jYXJkLXNlcnZpY2VzLWl0ZW1fX2FjdGlvbl9kZWwnKTtcclxuXHJcbiAgICAgICAgaWYgKF90aGlzLmhhc0NsYXNzKCdpcy1ib29rZWQnKSkge1xyXG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVDbGFzcygnaXMtYm9va2VkJyk7XHJcbiAgICAgICAgICAgIGFkZC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICBkb25lLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RoaXMuYWRkQ2xhc3MoJ2lzLWJvb2tlZCcpO1xyXG4gICAgICAgICAgICBhZGQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgZG9uZS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy9GYXZvcml0ZSBidG5cclxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1idG4tZmF2JywgZnVuY3Rpb24oZSkge1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8vQ29uZmlybSBwaG9uZVxyXG4kKCcuanMtdGltZXItLXJlcGVhdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICQodGhpcylcclxuICAgICAgICAucGFyZW50KCcucGhvbmUtY29uZmlybV9fcmVwZWF0JylcclxuICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxyXG4gICAgICAgIC5jbG9zZXN0KCcuanMtY29uZmlybScpXHJcbiAgICAgICAgLmZpbmQoJy5jb25maXJtX190aW1lciwgLmNvbmZpcm1fX2ZpZWxkJylcclxuICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgIHBob25lQ29uZmlybVRpbWVyKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gcGhvbmVDb25maXJtVGltZXIoKSB7XHJcbiAgICB2YXIgdGltZXIgPSAkKCcuanMtdGltZXInKTtcclxuICAgIGNvbnNvbGUubG9nKHRpbWVyLmRhdGEoJ3RpbWVyJykpO1xyXG4gICAgdmFyIHRpbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0ID0gdGltZXIuZGF0YSgndGltZXInKTtcclxuICAgICAgICAgICAgdGltZXIudGV4dCh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codCk7XHJcbiAgICAgICAgICAgIHZhciBpbnQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHQtLTtcclxuICAgICAgICAgICAgICAgIGlmICh0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyLnBhcmVudCgpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLXRpbWVyLS1yZXBlYXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyZW50KCcucGhvbmUtY29uZmlybV9fcmVwZWF0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyLnRleHQodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAkKCcuanMtdGltZXItLXJlcGVhdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50KTtcclxuICAgICAgICAgICAgICAgIHRpbSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICB0aW0oKTtcclxufVxyXG5cclxuLy9UZXh0YXJlYSBhdXRvSGVpZ2h0XHJcbmlmICgkKCcuanMtdGV4dGFyZWEnKS5sZW5ndGggPiAwKSB7XHJcbiAgICB2YXIgdGV4dGFyZWEgPSAkKCcuanMtdGV4dGFyZWEnKTtcclxuICAgIHRleHRhcmVhLm9uKCdrZXlkb3duJywgYXV0b3NpemUpO1xyXG5cclxuICAgIHRleHRhcmVhLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpICYmXHJcbiAgICAgICAgICAgIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMTApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRleHRhcmVhLnZhbHVlICs9ICdcXHJcXG4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhdXRvc2l6ZSgpIHtcclxuICAgIGxldCBlbCA9IHRoaXM7XHJcbiAgICBsZXQgY2hhdEJvZHkgPSAkKCcuY2hhdF9fYm9keScpO1xyXG4gICAgbGV0IGNoYXRGb290ZXJIZWlnaHQgPSAkKCcuY2hhdF9fZm9vdGVyJykub3V0ZXJIZWlnaHQoKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6MzdweCc7XHJcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6JyArIGVsLnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICAgICAgY2hhdEJvZHkuY3NzKHtcclxuICAgICAgICAgICAgYm90dG9tOiAzOSArIGVsLnNjcm9sbEhlaWdodCArICdweCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZWwuc2Nyb2xsSGVpZ2h0ID49IDEyMykge1xyXG4gICAgICAgICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcclxuICAgICAgICAgICAgY2hhdEJvZHkuY3NzKHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogY2hhdEZvb3RlckhlaWdodCArICdweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMCk7XHJcbn1cclxuXHJcbiQoJy5qcy1kaXNhYmxlLWNhdGVnb3J5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGl0bGUgPSAkKHRoaXMpLmRhdGEoJ3RpdGxlJyk7XHJcbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgJCgnI2Rpc2FibGUtY2F0ZWdvcnknKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgICQoJy5kaXNhYmxlLWNhdGVnb3J5X19kYXRhLXRpdGxlJykudGV4dCh0aXRsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL1NlYXJjaCBIaW50XHJcbmlmICgkKCcuanMtc2VhcmNoLWlucHV0JykubGVuZ3RoID4gMCkge1xyXG4gICAgdmFyIHNlYXJjaElucHV0ID0gJCgnLmpzLXNlYXJjaC1pbnB1dCcpO1xyXG4gICAgc2VhcmNoSW5wdXRcclxuICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoaW50ID0gJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5qcy1zZWFyY2gnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zZWFyY2hfX2hpbnQnKTtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGhpbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpbnQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBoaW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGludCA9ICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KCcuanMtc2VhcmNoJylcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc2VhcmNoX19oaW50Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGludC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8vU3R1ZGlvIHRvZ2dsZSBjb250cm9sXHJcbmZ1bmN0aW9uIHRvZ2dsZUNvbnRyb2woKSB7XHJcbiAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgJy5qcy1zdHVkaW8tc3lzdGVtLWJ0bicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtc3R1ZGlvLXN5c3RlbScpO1xyXG4gICAgICAgIGxldCAkd2lkZ2V0TGVmdCA9ICRwYXJlbnQuZmluZCgnLndpZGdldF9fbGVmdCcpO1xyXG4gICAgICAgIGxldCAkd2lkZ2V0UmlnaHQgPSAkcGFyZW50LmZpbmQoJy53aWRnZXRfX3JpZ2h0Jyk7XHJcbiAgICAgICAgbGV0ICR0aXRsZUxlZnQgPSAkcGFyZW50LmZpbmQoJy5iYi1jaGVja2JveF9fdGl0bGUtLWxlZnQnKTtcclxuICAgICAgICBsZXQgJHRpdGxlUmlnaHQgPSAkcGFyZW50LmZpbmQoJy5iYi1jaGVja2JveF9fdGl0bGUtLXJpZ2h0Jyk7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1jaGVja2VkJykpIHtcclxuICAgICAgICAgICAgcmVtb3ZlKCR3aWRnZXRSaWdodCk7XHJcbiAgICAgICAgICAgIGFkZCgkd2lkZ2V0TGVmdCk7XHJcbiAgICAgICAgICAgICR0aXRsZUxlZnQuYWRkQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICAgICAgJHRpdGxlUmlnaHQucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW1vdmUoJHdpZGdldExlZnQpO1xyXG4gICAgICAgICAgICBhZGQoJHdpZGdldFJpZ2h0KTtcclxuICAgICAgICAgICAgJHRpdGxlTGVmdC5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAkdGl0bGVSaWdodC5hZGRDbGFzcygnaXMtY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZChlbCkge1xyXG4gICAgICAgIGVsLmZpbmQoJy5saXN0LS1pY29uJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdsaXN0LWNvbG9yLS1zdWNjZXNzJylcclxuICAgICAgICAgICAgLmZpbmQoJy5saXN0X19pY29uJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWwnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhcycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZShlbCkge1xyXG4gICAgICAgIGVsLmZpbmQoJy5saXN0LS1pY29uJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsaXN0LWNvbG9yLS1zdWNjZXNzJylcclxuICAgICAgICAgICAgLmZpbmQoJy5saXN0X19pY29uJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYXMnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhbCcpO1xyXG4gICAgfVxyXG59XHJcbnRvZ2dsZUNvbnRyb2woKTtcclxuXHJcbi8vQ2FyZCBBZHJlc3MgTWFwXHJcbmlmICgkKCcjY2FyZC1tYXAnKS5sZW5ndGggPiAwKSB7XHJcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcclxuICAgIHZhciBteU1hcCwgbXlQbGFjZW1hcmssIG15UGluO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdjYXJkLW1hcCcsIHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLFxyXG4gICAgICAgICAgICB6b29tOiAxNlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XHJcblxyXG4gICAgICAgIG15TWFwLmNvbnRyb2xzXHJcbiAgICAgICAgICAgIC5yZW1vdmUoJ3NlYXJjaENvbnRyb2wnKVxyXG4gICAgICAgICAgICAucmVtb3ZlKCd0eXBlU2VsZWN0b3InKVxyXG4gICAgICAgICAgICAuYWRkKCdyb3V0ZUVkaXRvcicpO1xyXG5cclxuICAgICAgICBteVBpbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKFxyXG4gICAgICAgICAgICB7fSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlSHJlZjogJ2ltZy9nZW5lcmFsL21hcC1waW4uc3ZnJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLCB7XHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOlxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fdGl0bGVcIj5OYWlseiBYIENvbGxhYjwvc3Bhbj4nLFxyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudEJvZHk6XHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtYXAtcGluX19wbGFjZVwiPtGD0LsuINCR0L7Qu9GM0YjQsNGPINCf0L7Qu9GP0L3QutCwLCA1MdCQLzksINCc0L7RgdC60L7QstGB0LrQuNC5INGALdC9PC9zcGFuPiA8ZGl2IGNsYXNzPVwibWFwLXBpbl9fcHJvcGVydGllc1wiPjx1bCBjbGFzcz1cInByb3BlcnRpZXNfX2xpc3RcIj48bGkgY2xhc3M9XCJwcm9wZXJ0aWVzX19pdGVtIHByb3BlcnRpZXNfX2l0ZW1fc2FsZSBiYi1kcm9wZG93biB0b3AgYmItZHJvcGRvd24tLWhvdmVyIGpzLWJiLWRyb3Bkb3duXCI+IDxzdmcgY2xhc3M9XCJpY29uIGljb24tcHJvY2VudCBcIj48dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNwcm9jZW50XCI+PC91c2U+PC9zdmc+PGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19saXN0XCI+0LXRgdGC0Ywg0YHQutC40LTQutC4PC9kaXY+PC9saT48bGkgY2xhc3M9XCJwcm9wZXJ0aWVzX19pdGVtIHByb3BlcnRpZXNfX2l0ZW1fY2FyIGJiLWRyb3Bkb3duIHRvcCBiYi1kcm9wZG93bi0taG92ZXIganMtYmItZHJvcGRvd25cIj4gPHN2ZyBjbGFzcz1cImljb24gaWNvbi1jYXIgXCI+PHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2FyXCI+PC91c2U+PC9zdmc+PGRpdiBjbGFzcz1cImJiLWRyb3Bkb3duX19saXN0XCI+0LzQvtCz0YMg0L/RgNC40LXRhdCw0YLRjDwvZGl2PjwvbGk+PC91bD48L2Rpdj4nLFxyXG4gICAgICAgICAgICBoaW50Q29udGVudDpcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faG92ZXJcIj4xLdC60L7QvNC90LDRgtC90LDRjyDQutCy0LDRgNGC0LjRgNCwIDxkaXYgY2xhc3M9XCJyYXRpbmdcIj48ZGl2IGNsYXNzPVwicmF0aW5nX19pbm5lclwiIHN0eWxlPVwid2lkdGg6IDkwJVwiPjwvZGl2PjwvZGl2PiA8c3Bhbj7QvtGCIDIgODAwIDxpIGNsYXNzPVwicnViXCI+YTwvaT48L3NwYW4+IDwvZGl2PidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBpbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vQ2FiaW5ldCBNYXBcclxuaWYgKCQoJyNjYWJpbmV0LW1hcCcpLmxlbmd0aCA+IDApIHtcclxuICAgIHltYXBzLnJlYWR5KGluaXQpO1xyXG4gICAgdmFyIG15TWFwLCBteVBsYWNlbWFyaywgbXlQaW47XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoJ2NhYmluZXQtbWFwJywge1xyXG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0sXHJcbiAgICAgICAgICAgIHpvb206IDE2XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKFsnc2Nyb2xsWm9vbSddKTtcclxuXHJcbiAgICAgICAgbXlNYXAuY29udHJvbHNcclxuICAgICAgICAgICAgLnJlbW92ZSgnc2VhcmNoQ29udHJvbCcpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoJ3R5cGVTZWxlY3RvcicpXHJcbiAgICAgICAgICAgIC5hZGQoJ3JvdXRlRWRpdG9yJyk7XHJcblxyXG4gICAgICAgIG15UGluID0gbmV3IHltYXBzLkdlb09iamVjdENvbGxlY3Rpb24oXHJcbiAgICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnaW1nL2dlbmVyYWwvbWFwLXBpbi5zdmcnLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzMwLCA0Ml0sXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstMywgLTQyXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43MzIyNjg1MywgMzcuNjIwOTE5MV0pO1xyXG5cclxuICAgICAgICBteVBpbi5hZGQobXlQbGFjZW1hcmspO1xyXG4gICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15UGluKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9DYXRhbG9nIE1hcFxyXG5pZiAoJCgnI2NhdGFsb2ctbWFwLCAjbWFwJykubGVuZ3RoKSB7XHJcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcclxuICAgIHZhciBteU1hcCwgbXlQbGFjZW1hcmssIG15UGluO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKCdjYXRhbG9nLW1hcCcsIHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLFxyXG4gICAgICAgICAgICB6b29tOiAxNlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XHJcblxyXG4gICAgICAgIG15TWFwLmNvbnRyb2xzXHJcbiAgICAgICAgICAgIC5yZW1vdmUoJ3NlYXJjaENvbnRyb2wnKVxyXG4gICAgICAgICAgICAucmVtb3ZlKCd0eXBlU2VsZWN0b3InKVxyXG4gICAgICAgICAgICAuYWRkKCdyb3V0ZUVkaXRvcicpO1xyXG5cclxuICAgICAgICBteVBpbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKFxyXG4gICAgICAgICAgICB7fSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlSHJlZjogJ2ltZy9nZW5lcmFsL21hcC1waW4uc3ZnJyxcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFszMCwgNDJdLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG15UGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTUuNzMyMjY4NTMsIDM3LjYyMDkxOTFdLCB7XHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50SGVhZGVyOlxyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibWFwLXBpbl9fdGl0bGVcIj7QodGC0YPQtNC40Y8gXCLQodC70LXQt9CwINC00YDQsNC60L7QvdCwXCI8L3NwYW4+PGRpdiBjbGFzcz1cIm1hcC1waW5fX2FkZHJlc3NcIj7QnNC+0YHQutCy0LAsINGD0LsuINCT0LDQs9Cw0YDQuNC90LAsIDI4LzIsINC8LiDQm9GD0LHRj9C90LrQsDwvZGl2PicsXHJcbiAgICAgICAgICAgIGJhbGxvb25Db250ZW50Qm9keTpcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faW1hZ2UganMtc3MtbWFwLXNsaWRlciBpbWFnZS13cmFwcGVyXCIgICAgICAgICAgICAgICAgZGF0YS1zcy1pbWFnZXM9XCIuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMC5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTEuanBnOy4uL2ltZy9leGFtcGxlcy91c2VyL2NhdGFsb2cvY2F0YWxvZy0yLmpwZzsuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMy5qcGc7Li4vaW1nL2V4YW1wbGVzL3VzZXIvY2F0YWxvZy9jYXRhbG9nLTQuanBnXCI+PGltZyBzcmM9XCIuLi9pbWcvZXhhbXBsZXMvdXNlci9jYXRhbG9nL2NhdGFsb2ctMC5qcGdcIj48L2Rpdj48ZGl2IGNsYXNzPVwibWFwLXBpbl9faW5mb1wiPjxkaXYgY2xhc3M9XCJyYXRpbmcgbWFwLXBpbl9fcmF0aW5nXCI+PGRpdiBjbGFzcz1cInJhdGluZ19faW5uZXJcIiBzdHlsZT1cIndpZHRoOiA3MCVcIj48L2Rpdj48c3BhbiBjbGFzcz1cInJhdGluZ19fcmV2LWNvdW50XCI+KDc3KTwvc3Bhbj48L2Rpdj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uLWljb24gYnV0dG9uLWljb24tLWZhdiBtYXAtcGluX19mYXYganMtYnRuLWZhdlwiPjwvYnV0dG9uPjwvZGl2PidcclxuICAgICAgICAgICAgLy8gaGludENvbnRlbnQ6XHJcbiAgICAgICAgICAgIC8vICc8ZGl2IGNsYXNzPVwibWFwLXBpbl9faG92ZXJcIj4xLdC60L7QvNC90LDRgtC90LDRjyDQutCy0LDRgNGC0LjRgNCwIDxkaXYgY2xhc3M9XCJyYXRpbmdcIj48ZGl2IGNsYXNzPVwicmF0aW5nX19pbm5lclwiIHN0eWxlPVwid2lkdGg6IDkwJVwiPjwvZGl2PjwvZGl2PiA8c3Bhbj7QvtGCIDIgODAwIDxpIGNsYXNzPVwicnViXCI+YTwvaT48L3NwYW4+IDwvZGl2PidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlNYXAuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jdGlvbigpIHt9KTtcclxuXHJcbiAgICAgICAgbXlQbGFjZW1hcmsuZXZlbnRzLmFkZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJCgnLmpzLXNzLW1hcC1zbGlkZXInKS5zaW1wbGVzbGlkZXIoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLScsICdiYWxvb24gY2xpY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXlQaW4uYWRkKG15UGxhY2VtYXJrKTtcclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBpbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qXHJcbioqKiBEYXRlUGlja2VyXHJcbiovXHJcbihmdW5jdGlvbigpIHtcclxuICAgIGxldCAkZGF0ZXBpY2tlciA9ICQoJy5qcy1kYXRlJyk7XHJcbiAgICBsZXQgZGF0ZVRvZGF5ID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAkZGF0ZXBpY2tlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuYmItZGF0ZScpO1xyXG4gICAgICAgIGxldCAkYnRuVG9kYXkgPSAkcGFyZW50LmZpbmQoJy5iYi1kYXRlX19idG4tLXRvZGF5Jyk7XHJcbiAgICAgICAgbGV0ICRidG5QcmV2ID0gJHBhcmVudC5maW5kKCcuYmItZGF0ZV9fYnRuLS1wcmV2Jyk7XHJcbiAgICAgICAgbGV0ICRidG5OZXh0ID0gJHBhcmVudC5maW5kKCcuYmItZGF0ZV9fYnRuLS1uZXh0Jyk7XHJcbiAgICAgICAgbGV0IHR5cGUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2V4cGFuZGVkJykge1xyXG4gICAgICAgICAgICBsZXQgX3NlbGYgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBsZXQgdmFsID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGNoYW5nZVZhbCgkKHRoaXMpLCB2YWwpO1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6IGZ1bmN0aW9uKGZvcm1hdHRlZERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlVmFsKF9zZWxmLCBmb3JtYXR0ZWREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdERhdGUoZGF0ZVRvZGF5KTtcclxuXHJcbiAgICAgICAgICAgIC8vUGlja2VyIHdpdGggY29udHJvbHNcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb250cm9scycpIHtcclxuICAgICAgICAgICAgbGV0IF9zZWxmID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBjaGFuZ2VWYWwoJCh0aGlzKSwgdmFsKTtcclxuXHJcbiAgICAgICAgICAgICQodGhpcylcclxuICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1dlZWs6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbihmb3JtYXR0ZWREYXRlLCBkYXRlLCBpbnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGUsIGVuZERhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudERhdGUgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRNb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXREYXRlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZERhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhdGUuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhdGUuZ2V0RGF0ZSgpIC0gZGF0ZS5nZXREYXkoKSArIDdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXREYXRlKCkgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZS5nZXREYXkoKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA3ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlLmdldE1vbnRoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VWYWwoX3NlbGYsIGZvcm1hdHRlZERhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZGF0YSgnZGF0ZXBpY2tlcicpXHJcbiAgICAgICAgICAgICAgICAuc2VsZWN0RGF0ZShkYXRlVG9kYXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ2RkLm1tLnl5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBkYXRlVG9kYXlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgICAgICAuc2VsZWN0RGF0ZShkYXRlVG9kYXkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGRhdGVwaWNrZXIuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3R5cGUnLCAnZGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXRJbnB1dERhdGUoJy5qcy1kYXRlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRidG5Ub2RheS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJHBhcmVudFxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgICAgIC5zZWxlY3REYXRlKGRhdGVUb2RheSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRidG5QcmV2Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkcGFyZW50XHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWRhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAgICAgLnByZXYoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0nLCAnY2xpY2sgcHJldicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1Nob3cgRGF0ZXBpY2tlciB3aGVuIGNsaWNrIHBhcnJlbnQgY29udGFpbmVyXHJcbiAgICAgICAgJHBhcmVudC5maW5kKCcuanMtZGF0ZS1maWVsZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgJGRhdGVwaWNrZXIgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAuY2xvc2VzdCgnLmJiLWRhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5qcy1kYXRlJylcclxuICAgICAgICAgICAgICAgIC5kYXRlcGlja2VyKClcclxuICAgICAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJyk7XHJcblxyXG4gICAgICAgICAgICAkZGF0ZXBpY2tlci5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vQ2hhbmdlIGRhdGUgZmllbGQgKG5vdCBpbnB1dCkgdmFsdWVcclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VWYWwoZWwsIHZhbCkge1xyXG4gICAgICAgICAgICBlbC5jbG9zZXN0KCcuYmItZGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmpzLWRhdGUtZmllbGQnKVxyXG4gICAgICAgICAgICAgICAgLnRleHQodmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaWNrIGljb24gLSBzaG93IHBpY2tlclxyXG4gICAgJCgnLmpzLWlucHV0LWljb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5qcy1kYXRlJykuZm9jdXMoKTtcclxuICAgIH0pO1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlRGF0YVNjaGVkdWxlKCkge1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgbGV0IGNybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcCA9ICQoJy5qc0NybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcCcpO1xyXG4gICAgbGV0IHJ1RGF0ZXMgPSBnZXRXZWVrU2NoZWR1bGUoZGF0ZSk7XHJcblxyXG4gICAgdXBkYXRlVmFsU2NoZWR1bGUocnVEYXRlcyk7XHJcblxyXG4gICAgaWYgKGNybVNjaGVkdWxlSW5wdXRDYWxlbmRhclRvcC5sZW5ndGgpIHtcclxuICAgICAgICBjcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3BcclxuICAgICAgICAgICAgLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdG9nZ2xlU2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWluRGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24oZm9ybWF0dGVkRGF0ZSwgZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBydURhdGVzID0gZ2V0V2Vla1NjaGVkdWxlKGRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxTY2hlZHVsZShydURhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmRhdGEoJ2RhdGVwaWNrZXInKVxyXG4gICAgICAgICAgICAuc2VsZWN0RGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbnVwZGF0ZURhdGFTY2hlZHVsZSgpO1xyXG5cclxuKGZ1bmN0aW9uIGRhdGVQaWNrZXJJbmxpbmUoKSB7XHJcbiAgICB2YXIgZXZlbnREYXRlcyA9IFsxLCAxMCwgMTIsIDIyXTtcclxuXHJcbiAgICAkKCcuanMtZGF0ZS1pbmxpbmUnKS5kYXRlcGlja2VyKHtcclxuICAgICAgICBpbmxpbmU6IHRydWUsXHJcbiAgICAgICAgbXVsdGlwbGVEYXRlczogdHJ1ZSxcclxuICAgICAgICBvblJlbmRlckNlbGw6IGZ1bmN0aW9uKGRhdGUsIGNlbGxUeXBlKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNlbGxUeXBlID09ICdkYXknICYmIGV2ZW50RGF0ZXMuaW5kZXhPZihjdXJyZW50RGF0ZSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2lzLWNoZWNrZWQnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVWYWxTY2hlZHVsZSh2YWx1ZSkge1xyXG4gICAgbGV0IGNybVNjaGVkdWxlRGF0ZUZpZWxkVG9wID0gJCgnLmpzQ3JtU2NoZWR1bGVEYXRlRmllbGRUb3AnKTtcclxuXHJcbiAgICBjcm1TY2hlZHVsZURhdGVGaWVsZFRvcC50ZXh0KHZhbHVlLmdldCgndGV4dCcpKTtcclxuXHJcbiAgICBjcm1TY2hlZHVsZURhdGVGaWVsZFRvcC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuanNDcm1TY2hlZHVsZUlucHV0Q2FsZW5kYXJUb3AnKVxyXG4gICAgICAgICAgICAuZGF0ZXBpY2tlcigpXHJcbiAgICAgICAgICAgIC5kYXRhKCdkYXRlcGlja2VyJylcclxuICAgICAgICAgICAgLnNob3coKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXZWVrU2NoZWR1bGUoZGF0ZSkge1xyXG4gICAgbGV0IGN1cnIgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgIGxldCBjdXJyRGF5ID0gY3Vyci5nZXREYXkoKTtcclxuICAgIGxldCBjdXJyTW9udGggPSBjdXJyLmdldE1vbnRoKCk7XHJcbiAgICBsZXQgbW9uZGF5O1xyXG4gICAgbGV0IHN1bmRheTtcclxuXHJcbiAgICBpZiAoY3VyckRheSA9PT0gMCkge1xyXG4gICAgICAgIG1vbmRheSA9IGN1cnIuZ2V0RGF0ZSgpIC0gNjtcclxuICAgICAgICBzdW5kYXkgPSBjdXJyLmdldERhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbW9uZGF5ID0gY3Vyci5nZXREYXRlKCkgLSBjdXJyLmdldERheSgpICsgMTtcclxuICAgICAgICBzdW5kYXkgPSBtb25kYXkgKyA2O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZXRSaWdodFdlZWtUZXh0KGN1cnIsIG1vbmRheSwgc3VuZGF5LCBjdXJyTW9udGgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSaWdodFdlZWtUZXh0KGN1cnJEYXRlLCBtb25kYXksIHN1bmRheSwgbW9udGgpIHtcclxuICAgIGxldCBmaXJzdERheTtcclxuICAgIGxldCBsYXN0RGF5O1xyXG4gICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICBtb250aDogJ3Nob3J0J1xyXG4gICAgfTtcclxuICAgIGxldCBvRGF5RjtcclxuICAgIGxldCBvRGF5TDtcclxuICAgIGxldCBvTW9udGhGO1xyXG4gICAgbGV0IG9Nb250aEw7XHJcbiAgICBsZXQgb1llYXJGO1xyXG4gICAgbGV0IG9ZZWFyTDtcclxuICAgIGxldCBhcnJEYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBsZXQgdGVtcDtcclxuXHJcbiAgICBpZiAoc3VuZGF5ID4gbW9uZGF5ICYmIChtb25kYXkgPT09IDAgfHwgbW9uZGF5IDwgMCkpIHtcclxuICAgICAgICBsZXQgbmV3TW9udGggPSBuZXcgRGF0ZShjdXJyRGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aCwgMSk7XHJcblxyXG4gICAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUoY3VyckRhdGUuc2V0RGF0ZShtb25kYXkpKTtcclxuICAgICAgICBvRGF5RiA9IGZpcnN0RGF5LmdldERhdGUoKTtcclxuICAgICAgICBvWWVhckYgPSBmaXJzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBmaXJzdERheSA9IGZpcnN0RGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIHBhcmFtcyk7XHJcbiAgICAgICAgb01vbnRoRiA9IGZpcnN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGxhc3REYXkgPSBuZXcgRGF0ZShuZXdNb250aC5zZXREYXRlKHN1bmRheSkpO1xyXG4gICAgICAgIG9EYXlMID0gbGFzdERheS5nZXREYXRlKCk7XHJcbiAgICAgICAgb1llYXJMID0gbGFzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBsYXN0RGF5ID0gbGFzdERheS50b0xvY2FsZVN0cmluZygncnUnLCBwYXJhbXMpO1xyXG4gICAgICAgIG9Nb250aEwgPSBsYXN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChvWWVhckYgPT09IG9ZZWFyTCkge1xyXG4gICAgICAgICAgICB0ZW1wID1cclxuICAgICAgICAgICAgICAgIG9EYXlGICtcclxuICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICBvTW9udGhGICtcclxuICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgIG9EYXlMICtcclxuICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICcsICcgK1xyXG4gICAgICAgICAgICAgICAgb1llYXJGO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXAgPVxyXG4gICAgICAgICAgICAgICAgb0RheUYgK1xyXG4gICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgIG9Nb250aEYgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBvWWVhckYgK1xyXG4gICAgICAgICAgICAgICAgJyAtICcgK1xyXG4gICAgICAgICAgICAgICAgb0RheUwgK1xyXG4gICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgIG9Nb250aEwgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBvWWVhckw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyckRhdGEuYXBwZW5kKCd0ZXh0JywgdGVtcCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUoY3VyckRhdGUuc2V0RGF0ZShtb25kYXkpKTtcclxuICAgICAgICBvRGF5RiA9IGZpcnN0RGF5LmdldERhdGUoKTtcclxuICAgICAgICBvWWVhckYgPSBmaXJzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBmaXJzdERheSA9IGZpcnN0RGF5LnRvTG9jYWxlU3RyaW5nKCdydScsIHBhcmFtcyk7XHJcbiAgICAgICAgb01vbnRoRiA9IGZpcnN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGxhc3REYXkgPSBuZXcgRGF0ZShjdXJyRGF0ZS5zZXREYXRlKHN1bmRheSkpO1xyXG4gICAgICAgIG9EYXlMID0gbGFzdERheS5nZXREYXRlKCk7XHJcbiAgICAgICAgb1llYXJMID0gbGFzdERheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICBsYXN0RGF5ID0gbGFzdERheS50b0xvY2FsZVN0cmluZygncnUnLCBwYXJhbXMpO1xyXG4gICAgICAgIG9Nb250aEwgPSBsYXN0RGF5LnJlcGxhY2UoJy4nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmIChvTW9udGhMID09PSBvTW9udGhGKSB7XHJcbiAgICAgICAgICAgIHRlbXAgPSBvRGF5RiArICcgLSAnICsgb0RheUwgKyAnICcgKyBvTW9udGhGICsgJywgJyArIG9ZZWFyRjtcclxuICAgICAgICAgICAgYXJyRGF0YS5hcHBlbmQoJ3RleHQnLCB0ZW1wKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAob1llYXJGID09PSBvWWVhckwpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPVxyXG4gICAgICAgICAgICAgICAgICAgIG9EYXlGICtcclxuICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgIG9Nb250aEYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgICAgICBvRGF5TCArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckY7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID1cclxuICAgICAgICAgICAgICAgICAgICBvRGF5RiArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhGICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckYgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgLSAnICtcclxuICAgICAgICAgICAgICAgICAgICBvRGF5TCArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICBvTW9udGhMICtcclxuICAgICAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgICAgICBvWWVhckw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJyRGF0YS5hcHBlbmQoJ3RleHQnLCB0ZW1wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFyckRhdGE7XHJcbn1cclxuXHJcbiJdfQ==
