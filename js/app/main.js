viewService = (function ($) {
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

    return {

        addButton: function (activeRow, activeCol) {
            activeRow = activeRow || row;
            activeCol = activeCol || (col = col + 1);

            var rowDiv = $('#row' + activeRow);
            if (rowDiv.length == 0) {
                activeCol = 0;
                col = 0;
                row = activeCol;
                rowDiv = $(rowTemplate(activeRow))
                    .appendTo(container);       // creating new row
                //rowDiv = $('#row'+activeRow)
            }
            var btn = $('#col' + activeRow + activeCol);
            if (btn.length == 0) {
                btn = $(btnTemplate(activeRow, activeCol)).appendTo(rowDiv);
            }    // adding a button to selected row


            return btn;

        }
    }
})(jQuery);


/*var app = (
 function(){



 function init(){
 alert('loaded');
 }

 return {
 init : init
 }
 }
 )();*/

//debugger;
