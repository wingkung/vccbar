/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');

app.factory('socket', function($rootScope, CTI) {
    var socket = io(CTI.url);
    return {
        connected: socket.connected,
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data){
            socket.emit(eventName, data);
        }
    };
});

