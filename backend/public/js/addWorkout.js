$(document).ready(function() {
    var date = new Date();
    var start = new Date();
    var end = new Date();
    $('#date').bootstrapMaterialDatePicker({ weekStart : 1, time: false,
        format : 'ddd DD MMM YYYY', lang: 'de', cancelText : 'ABBRECHEN' }).on('change', function(e, d) {
            date = d;
        });
        $('#date').bootstrapMaterialDatePicker('setDate', date);
        
    $('#start').bootstrapMaterialDatePicker({ date: false, format: 'HH:mm',
        lang: 'de', cancelText: 'ABBRECHEN' }).on('change', function(e, s) {
            start = s;
            if(end < start) {
                end = start;
                $('#end').bootstrapMaterialDatePicker('setMinDate', end);
            }
        });
    //$('#start').bootstrapMaterialDatePicker('setDate', start);

    $('#end').bootstrapMaterialDatePicker({ date: false, format: 'HH:mm',
        lang: 'de', cancelText: 'ABBRECHEN' }).on('change', function(e, en) {
            end = en;
            if(start > end) {
                start = end;
                $('#start').bootstrapMaterialDatePicker('setMaxDate', start);
            }
        });
    //$('#end').bootstrapMaterialDatePicker('setDate', end);
});