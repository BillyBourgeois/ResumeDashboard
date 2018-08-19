// Setup the filter
Filters.filter('numberFilter', ['$parse', function ($parse) {
    return function (input, filter) {
        if (filter != null && (filter.range != '')) {
            var out = [];
            var getter = $parse(filter.property);
            var numbers = getNumbers(filter.range);
            angular.forEach(input, function (item) {
                var prop = '';
                var itemProp = getter(item);
                if (itemProp != null) {
                    prop = itemProp;
                }
                angular.forEach(numbers, function (number) {
                    if (itemProp == number) {
                        if (out.indexOf(item) == -1) {
                            out.push(item);
                        }
                    }
                });

            });
            return out;
        }
        else {
            return input;
        }
    }
}]);