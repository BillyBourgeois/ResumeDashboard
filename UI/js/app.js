'use strict';

var app = angular.module('app', [
      // Angular modules 
      'Controllers',
      'ngRoute',
      'ngAnimate',
      'Hub',
      'Filters',
      'Cache',
      'Dialog',
      'Directives',
      'DataFilters',
      //'contextMenu',
      'as.sortable',
      //'queryBuilder',
      //'AuthorizationService',
      //'DialogService',
      //'ui.bootstrap.datetimepicker',
      'ngSanitize',
      'ngMessages',
      'ui.bootstrap',
      'ui.bootstrap.accordion.custom',
       //'ui.bootstrap.accordion.sortable',
       'toastr',
       'uiGmapgoogle-maps',

]);

var Controllers = angular.module('Controllers', [
    'DataServices',
    'toastr',
    'BoardServices',
    'Graphing',
//'CacheService',
'OData',
//'Filters',
//'toastr'
]);

var DataFilters = angular.module('DataFilters', [
'DataServices',
//'CacheService',
'OData',
'Filters',
'toastr'
]);

var Graphing = angular.module('Graphing', []);

var Directives = angular.module('Directives', []);


var DataServices = angular.module('DataServices', ['ngResource']);

var GeneralServices = angular.module('GeneralServices', ['ngResource']);
var Filters = angular.module('Filters', ['DataServices']);
var BoardServices = angular.module('BoardServices', []);