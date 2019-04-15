$(document).ready(function() {
    //var date = new Date();
    var start = new Date();
    var end = new Date();

    $('#date').bootstrapMaterialDatePicker({ weekStart : 1, time: false,
        format : 'ddd, DD MMM YYYY', lang: 'en', cancelText : 'CANCEL' }).on('change', function(e, d) {
            date = d;
        });
    //$('#date').bootstrapMaterialDatePicker('setDate', date);
        
    $('#start').bootstrapMaterialDatePicker({ date: false, format: 'HH:mm',
        lang: 'en', cancelText: 'CANCEL' }).on('change', function(e, s) {
            start = s;
            if(end < start) {
                end = start;
                $('#end').val(new Date(end.toString()).toTimeString().substring(0, 5));
            }
            $('#end').bootstrapMaterialDatePicker('setMinDate', start);
        });
    //$('#start').bootstrapMaterialDatePicker('setDate', start);

    $('#end').bootstrapMaterialDatePicker({ date: false, format: 'HH:mm',
        lang: 'en', cancelText: 'CANCEL' }).on('change', function(e, en) {
            end = en;
        });
    //$('#end').bootstrapMaterialDatePicker('setDate', end);

    var startHours = Number.parseInt($('#start').val().substring(0, 2));
    var startMins = Number.parseInt($('#start').val().substring(3, 5));
    var endHours = Number.parseInt($('#end').val().substring(0, 2));
    var endMins = Number.parseInt($('#end').val().substring(3, 5));

    start.setHours(startHours);
    start.setMinutes(startMins);
    end.setHours(endHours);
    end.setMinutes(endMins);
});