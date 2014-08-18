var viewService = (function ($) {
    var container = '.container-fluid';
    var row = 1, col = -1;
    var rowTemplate = function (row) {
        return '<div class="row" id=row' + row + '></div>';
    };
    var btnTemplate = function (activeRow, activeCol) {
        activeRow = activeRow || row;
        activeCol = activeCol || (col = col + 1);
        return '<button class="sqr" id=col' + activeRow + activeCol + ' item="itemx"></button>';
    };

    var msgTemp = function (msg) {
        return '<p class="orngMsg">' + msg + '</p>';
    };
    return {

        addButton: function (activeRow, activeCol) {
            activeRow = activeRow || row;
            activeCol = activeCol || (col = col + 1);

            var rowDiv = $('#row' + activeRow);
            if (rowDiv.length == 0) {
                activeCol = 0;
                col = 0;
                row = activeRow;
                rowDiv = $(rowTemplate(activeRow))
                    .appendTo(container);       // creating new row
                //rowDiv = $('#row'+activeRow)
            }
            var btn = $('#col' + activeRow + activeCol);
            if (btn.length == 0) {
                btn = $(btnTemplate(activeRow, activeCol)).appendTo(rowDiv);
            }    // adding a button to selected row

            return btn;
        }, showMsg: function (msg, timeOut) {
            timeOut = timeOut || 2000;
            $('.container-fluid').first().after(msgTemp(msg));
            setTimeout(function () {
                $('.orngMsg').remove();
            }, timeOut);
        }, drawGame: function (elemt) {
            var columns = 3, activeRow = 1;
            var container = $('.container-fluid');
            //   container.css('display','none');
            while (elemt > 0) {
                for (var col = 0; col < columns; col++) {
                    debugger;
                    this.addButton(activeRow);
                }
                elemt--;
                activeRow++;
            }

            //  container.css('display','');
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
        }, getData: function () {
            return  dataCache;
        }, getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
})(jQuery);


var app = (function (view, data) {
    //http://www.placehold.it/350x160
    //http://www.placehold.it/350x150/fffxff/ffffff&text=akhil
    var no = 2 * data.getRandomInt(6, 12);

    return {
        init: function () {
            view.drawGame(no);
        }
    }
})(viewService, dataService);


app.init();
//debugger;
