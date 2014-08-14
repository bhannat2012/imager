viewService = (function ($) {
    var container = '.container-fluid';
    var row = 0, col = 0;
    var rowTemplate = function (row) {
        return '<div class="row" id=row' + row + '></div>';
    };
    var btnTemplate = function (activeRow, activeCol) {
        activeRow = activeRow || row;
        activeCol = activeCol || (col = col + 1);
        return '<button class="sqr" id=col' + activeRow + activeCol + '></button>';
    };

    return {

        addButton: function (activeRow, activeCol) {
            activeRow = activeRow || row;
            activeCol = activeCol || (col = col + 1);

            var rowDiv = $('#row' + activeRow)
            if (rowDiv.length == 0) {
                rowDiv = $(rowTemplate(activeRow))
                    .appendTo(container);       // creating new row
                //rowDiv = $('#row'+activeRow)
            }

            $(btnTemplate()).appendTo(rowDiv);    // adding a button to selected row
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
