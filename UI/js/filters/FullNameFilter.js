Filters.filter('fullName', [ function () {
    return function (input) {
        var returnValue = input.middleName != null ?  input.lastName + ', ' + input.firstName + " " + input.middleName :
                                                      input.lastName + ', ' + input.firstName;
            
        return returnValue;
    }
}]);