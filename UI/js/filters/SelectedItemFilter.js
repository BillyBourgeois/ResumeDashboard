// Setup the filter
Filters.filter('selectedItemFilter', ['$parse', function ($parse) {
    return function (input, filter) {
        if (filter != null) {
            var out = [];
            var getter = $parse(filter.property);
            angular.forEach(input, function (item) {
                var prop = getter(item);
                angular.forEach(filter.items, function (filterItem) {
                    if (prop == filterItem.value) {
                        if (filterItem.selected) {
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