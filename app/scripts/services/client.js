/**
 * Created by wing on 2014/6/4.
 */
var app = angular.module('vccbarApp');

app.factory('socket', function($rootScope) {
    var socket = io(VCC_URL);
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


app.factory('agent', function(socket){
    var agent = {
        tenantId: VCC_TENANTID,
        agentId: '',
        agentName: '',
        state: '',
        subState: '',
        stateDescr: '',
        wrapupMode: '',
        adminMode: '',
        typeCode: '',
        ext: '',
        scene: '',
        ctls: '',

        hasCtl: function(ctls, ctl){
            if ((ctls & ctl) != 0){
                return true;
            }
            return false;
        },

        ctl: {
            A_TRANS: 1<< 1,
            A_HOLD: 1<<2,
            A_UNHOLD:1<<3,
            A_CONSULT:1<<4,
            A_CONSULT_TRANS:1<<5,
            A_DIAL: 1<<10
        }
    };

    socket.on('info', function(data){
        agent.agentName = data.agentName;
        agent.agentId = data.agentId;
        agent.ext = data.ext;
        agent.typeCode = data.typeCode;
        agent.wrapupMode = data.wrapupMode;
    });

    socket.on('state', function(data){
        agent.state = data.state;
        agent.subState = data.subState;
        agent.stateDescr = data.stateDescr;
    });

    socket.on('status', function(data){
        agent.agentName = data.agentName;
        agent.agentId = data.agentId;
        agent.ext = data.ext;
        agent.typeCode = data.typeCode;
        agent.wrapupMode = data.wrapupMode;
        agent.state = data.state;
        agent.stateDescr = data.stateDescr;
        agent.scene = data.scene;
        agent.ctls = data.ctls;
    });
    return agent;
});
