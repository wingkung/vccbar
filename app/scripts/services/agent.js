/**
 * Created by wing on 2014/7/2.
 */

app.factory('agent', function($rootScope, socket){
    var agent = {
        connected: false,
        logined: false,
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
        tips: '',

        hasCtl: function(ctls, ctl){
            return (ctls & ctl) != 0;
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

    agent.setTips = function(tips){
        agent.tips = tips;
        $rootScope.$broadcast('agent_change');
    };

    socket.on('connect', function(){
        console.log('ws连接');
        agent.connected = true;
        $rootScope.$broadcast('agent_change');
    });
    socket.on('disconnect', function(){
        console.log('ws断开');
        agent.connected = false;
        $rootScope.$broadcast('agent_change');
    });

    socket.on("neterror", function(){
        agent.logined = false;
        agent.tips = '代理连接断开';
        $rootScope.$broadcast('agent_change');
    });

    socket.on('login', function(data){
        agent.logined = data.rtn;
        agent.tips = data.descr;
        $rootScope.$broadcast('agent_change');
    });

    socket.on('logout', function(data){
        agent.logined = false;
        agent.tips = data.descr;
        $rootScope.$broadcast('agent_change');
    });

    socket.on('info', function(data){
        agent.agentName = data.agentName;
        agent.agentId = data.agentId;
        agent.ext = data.ext;
        agent.typeCode = data.typeCode;
        agent.wrapupMode = data.wrapupMode;
        $rootScope.$broadcast('agent_change');
    });

    socket.on('state', function(data){
        agent.state = data.state;
        agent.subState = data.subState;
        agent.stateDescr = data.stateDescr;
        $rootScope.$broadcast('agent_change');
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
        $rootScope.$broadcast('agent_change');
    });

    socket.on('scene', function(data){
        agent.ctls = data.ctls;
        agent.scene = data.scene;
    });
    return agent;
});
