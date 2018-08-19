'use strict';
var HubService = angular.module('Hub', []);
HubService.factory('Hub', ['$rootScope','$log',
  function ($rootScope, $log) {
      var proxyName = 'Hub';
      var connected = false;
      var connectedSince = null;
      var lastConnection = null;
      var connection = $.hubConnection();
      var proxy = connection.createHubProxy(proxyName);
      proxy.on('');  // prevents: No hubs have been subscribed to.  
      // The client will not receive data from hubs.  
      // To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.
      connection.logging = false; //logging gives detailed information on the hub.  used for debugging
      connection.start().done(function (e) {
          connectedSince = lastConnection = new Date();
          setTimeout(function () {
              $rootScope.$emit('HubConnected');
              this.connected = true;
          }, 500);
      }).fail(
              function (error) {
                  connected = false;
              });
      //reports errors to the console
      connection.error(function (error) {
          $log.error('SignalR error: ' + error);
      });
      //reports slow connection to the console
      connection.connectionSlow(function () {
          $log.error('SignalR warning: We are currently experiencing difficulties with the connection.');
      });
      connection.disconnected(function () {
          this.connected = false;
          setTimeout(function () {
              connection.start().done(function () {
                  this.connected = true;
                  $rootScope.$emit('HubDisconnected');
              }).fail(
                 function (error) {
                     $log.error('SignalR error: ' + error);
                 });
          }, 5000); // Re-start connection after 5 seconds
      });

      return {
          on: function (eventName, callback) {
              proxy.on(eventName, function (result) {
                  $rootScope.$apply(function () {
                      lastConnection = new Date();
                      if (callback) {
                          callback(result);
                      }
                  });
              });
          },
          off: function (eventName, callback) {
              proxy.off(eventName);
          },
          invoke: function (methodName, parameters, callback) {
              //parameters !!!MUST!!!! always be sent as an array (if the parameter is an array send as a nested array)
              connection.start().done(function (e) {    //hub starts up to invoke
                  var task = $.merge([methodName], parameters);
                  proxy.invoke.apply(proxy, task)
                  .done(function (result) {
                      $rootScope.$apply(function () {
                          if (callback) {
                              callback(result);
                          }
                      });
                  })
                  .fail(
                  function (error) {
                      $log.error('SignalR error: ' + error);
                  });
              });
          },
          connected: function () {
              return connection.state === 1;
          },
          connecting: function () {
              return connection.state === 0;
          }
      };
  }]);
