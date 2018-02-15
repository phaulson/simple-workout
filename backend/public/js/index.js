$(document).ready(function() {
    $('tr').on('click', function() {
        $(this).toggleClass('active');
    });

    $('#edit').on('click', function() {
        var id = $('.active').find('input').val();
        if(id !== undefined)
            window.location.href = '/editWorkout/' + id;
    });

    $('#delete').on('click', function() {
        $('.active').each(function(index, tr) {
            var id = $(tr).find('input').val();
            if(id !== undefined) {
                $.ajax({
                    url: '/' + id,
                    type: 'DELETE',
                    success: function(data) {
                        var arr = JSON.parse(data).progress;
                        var ges = JSON.parse(data).ges;

                        $('tbody').empty();
                        
                        arr.forEach(function(workout) {
                            var tr = $('<tr></tr>');
                            tr.append('<td>' + workout.date + '</td>');
                            tr.append('<td>' + workout.descr + '</td>');
                            tr.append('<td>' + workout.start + '</td>');
                            tr.append('<td>' + workout.end + '</td>');
                            tr.append('<td>' + workout.duration + '</td>');
                            $('tbody').append(tr);
                        });

                        $('h2').html('Gesamt: ' + ges);
                    }
                });
            }
        });
    });
});