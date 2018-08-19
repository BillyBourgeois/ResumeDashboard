Filters.filter('customDate', function ($filter) {
    var standardDateFilterFn = $filter('date');
    return function (dateToFormat) {
        var returnValue = (new Date(dateToFormat)).setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0) ?
            'Today, ' + standardDateFilterFn(dateToFormat, 'h:mm a') : 
            standardDateFilterFn(dateToFormat, 'M/d/yy  EEE, h:mm a');
        return returnValue;
    }
});