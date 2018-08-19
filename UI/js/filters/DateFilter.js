// Setup the filter
Filters.filter('dateFilter',
    ['$parse', function ($parse) {
        // Create the return function and set the required parameter name to **input**
        return function (input, filter) {
            if (filter != null && (filter.startDate != null || filter.endDate != null)) {
                var out = [];
                var getter = $parse(filter.property);
                angular.forEach(input,
                    function (item) {
                        var prop = getter(item);
                        if (filter.endDate != null && filter.startDate == null) {
                            var endDate = new Date(new Date(filter.endDate).setHours(23, 59, 59, 9999));
                            if ((prop instanceof Date) && prop <= endDate && out.indexOf(item) == -1) {
                                out.push(item);
                            }
                        }
                        else if (filter.startDate != null && filter.endDate == null) {
                            var startDate = new Date(new Date(filter.startDate).setHours(0, 0, 0, 0));
                            if ((prop instanceof Date) && prop >= startDate && out.indexOf(item) == -1) {
                                out.push(item);
                            }
                        } else {
                            var endDate = new Date(new Date(filter.endDate).setHours(23, 59, 59, 9999));
                            var startDate = new Date(new Date(filter.startDate).setHours(0, 0, 0, 0));
                            if ((prop instanceof Date) && prop >= startDate && prop <= endDate && out.indexOf(item) == -1) {
                                out.push(item);
                            }
                        }
                    }
                );
                return out;
            }
            else {
                return input;
            }
        }
    }]);