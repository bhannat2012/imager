var viewService = (function ($) {
    var container = '.container-fluid';
    var row = 1, col = 1;
    var rowTemplate = function (row) {
        return '<div class="row" id=row' + row + '></div>';
    };
    var btnTemplate = function (activeRow, activeCol, msg, tag) {
        activeRow = activeRow || row;
        activeCol = activeCol || (col = col + 1);
        return '<button class="sqr" id=col' + activeRow + activeCol + ' item="' + tag + '">' + msg + '</button>';
    };

    var msgTemp = function (msg) {
        return '<p class="orngMsg">' + msg + '</p>';
    };
    return {
        addButton: function (activeRow, activeCol, tag, handler) {
            activeRow = activeRow || row;
            activeCol = activeCol || (col = col + 1);

            var rowDiv = $('#row' + activeRow);
            if (rowDiv.length == 0) {
                activeCol = 1;
                col = 1;
                row = activeRow;
                rowDiv = $(rowTemplate(activeRow)).appendTo(container);       // creating new row
                //rowDiv = $('#row'+activeRow)
            }
            var btn = $('#col' + activeRow + activeCol);
            if (btn.length == 0) {
                btn = $(btnTemplate(activeRow, activeCol, [activeRow, activeCol].join('/'), tag)).appendTo(rowDiv);
            }    // adding a button to selected row
            btn.on('click', handler);
            return btn;
        },
        showMsg: function (msg, timeOut) {
            timeOut = timeOut || 2000;
            $('.container-fluid').first().after(msgTemp(msg));
            setTimeout(function () {
                $('.orngMsg').remove();
            }, timeOut);
        },
        drawGame: function (elemt, handler) {
            var columns = 3, activeRow = 1;
            var container = $('.container-fluid');
            container.css('display', 'none');
            var lng = elemt.length;
            while (lng > 0) {
                for (var col = 0; col < columns; col++) {
                    this.addButton(activeRow, col + 1, elemt[lng - 1].name, handler);
                    lng--;
                }
                activeRow++;
            }
            container.css('display', '');
        }
    }
})(jQuery);

var dataService = (function ($) {
    var url = 'data/data.json';
    var dataCache = [];

    var init = function () {
        $.ajax({url: url, async: false})
            .done(function (data) {
                dataCache = data;
            })
            .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
                dataCache = [];
            });
    };

    init();

    return {
        loadData: function () {
            init();
            return  dataCache;
        }, getData: function (no) {
            return  dataCache;
        }, getDataN: function (no) {
            var slice = dataCache.slice(0, no);
            return  slice.concat(dataCache.slice(0, no));
        }, getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }, shuffleEl: function (data) {
            return data.sort(function () {
                return .5 - Math.random();
            });
        }
    }
})(jQuery);


var app = (function (view, data) {
    //http://www.placehold.it/350x160
    //http://www.placehold.it/350x150/fffxff/ffffff&text=akhil
    var no = data.getRandomInt(6, 12);
    var nEnteries = data.shuffleEl(data.getDataN(no));
    var selectedIndex = -1;
    return {
        init: function () {
            view.drawGame(nEnteries, this.handler);
        }, handler: function (event) {

            if (selectedIndex >= -1) {
                var selectItem = this.getAttribute('item');
            }

            alert(selectItem);
        }
    }
})(viewService, dataService);
