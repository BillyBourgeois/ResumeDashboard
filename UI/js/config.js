
//add constants
app.constant('API', {
    baseUrl: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/api/'
});

angular
  .module('OData', [])
  .constant('ODataFilterBuilder', ODataFilterBuilder);
//preload templates cache
//app.run(function ($templateCache, $http) {
//$http.get('views/templates/sort.html', { cache: $templateCache });
//$http.get('views/templates/spinner.html', { cache: $templateCache });
//$http.get('views/templates/accordion-group.html', { cache: $templateCache });
//$http.get('views/templates/assignments-table.html', { cache: $templateCache });
//$http.get('views/templates/tasks-table.html', { cache: $templateCache });
//$http.get('views/templates/sort.html', { cache: $templateCache });
//$http.get('views/templates/filters/filter.html', { cache: $templateCache });
//$http.get('views/templates/vertex-status-tooltip.html', { cache: $templateCache });
//$http.get('views/templates/assignment-status-tooltip.html', { cache: $templateCache });
//});



//pagination display settings
app.config(['uibPaginationConfig', function (uibPaginationConfig) {
    uibPaginationConfig.boundaryLinks = true;
    uibPaginationConfig.rotate = false;
    uibPaginationConfig.boundaryLinkNumbers = true;
    uibPaginationConfig.forceellipses = false;
}]);

//toastr config
app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: true,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 2000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: true,
        tapToDismiss: false,
        templates: {
            toast: 'views/templates/toast-custom.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 2000,
        titleClass: 'toast-title',
        toastClass: 'toast',
        positionClass: 'toast-bottom-right',
    });
});


//bootstrap data
//app.config(['UserLookupsProvider', 'CurrentUserProvider', 'GroupLookupsProvider', 'ProjectLookupsProvider', 'StatusLookupsProvider',
//    function (UserLookupsProvider, CurrentUserProvider, GroupLookupsProvider, ProjectLookupsProvider, StatusLookupsProvider) {

//        var currentUser = CurrentUserProvider.config();
//        UserLookupsProvider.config(currentUser.company_Id);
//        GroupLookupsProvider.config(currentUser.company_Id);
//        ProjectLookupsProvider.config(currentUser.company_Id);
//        StatusLookupsProvider.config();
//    }]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.transformResponse.push(function (responseData) {
        convertDateStringsToDates(responseData);
        return responseData;
    });
}]);


app.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDVDgloVTBqxEZDuPi8S2azDc33DibtMpo',
        //v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});