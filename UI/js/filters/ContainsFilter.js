// Setup the filter
Filters.filter('containsFilter', ['$parse', function ($parse) {

    // Create the return function and set the required parameter name to **input**
    return function (input, filter) {
        if (filter != null && (filter.items.length > 0 && filter.items[0] != '')) {
            var out = [];
            var getter = $parse(filter.property);
            angular.forEach(input, function (item) {
                var prop = '';
                var itemProp = getter(item);
                if (itemProp != null) {
                    prop = itemProp.toString();
                }
                angular.forEach(filter.items, function (filterItem) {
                    if (prop.toLowerCase().indexOf(filterItem.toLowerCase()) > -1 && filterItem.length > 0) {
                        if (out.indexOf(item) == -1) {
                            out.push(item);
                        }
                    }
                })
            });
            return out;
        }
        else {
            return input;
        }
    }
}]);