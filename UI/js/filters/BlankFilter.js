Filters.filter('blank', function () {
    return function (input, blankPhrase, test) {
        var returnValue;
        if (input == undefined || input == null || input == '')
        {
            returnValue = blankPhrase == undefined ?
                '<span class="italic light small bold">NA</span>' :
                '<span class="italic light small bold">' + blankPhrase + '</span>';           
        }
        else
        {            
            returnValue =input;
        }
        return returnValue;
    }
});