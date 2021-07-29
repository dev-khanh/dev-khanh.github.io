window.__require=function e(t,i,n){function s(r,a){if(!i[r]){if(!t[r]){var l=r.split("/");if(l=l[l.length-1],!t[l]){var c="function"==typeof __require&&__require;if(!a&&c)return c(l,!0);if(o)return o(l,!0);throw new Error("Cannot find module '"+r+"'")}r=l}var d=i[r]={exports:{}};t[r][0].call(d.exports,function(e){return s(t[r][1][e]||e)},d,d.exports,e,t,i,n)}return i[r].exports}for(var o="function"==typeof __require&&__require,r=0;r<n.length;r++)s(n[r]);return s}({AbstractSDK:[function(e,t,i){"use strict";cc._RF.push(t,"5a647rft8BPKJtrVou0TGHt","AbstractSDK"),Object.defineProperty(i,"__esModule",{value:!0});let n=(()=>{class e{constructor(e=!1,t=3,i=500){this.UPDATE_SCORE=2,this.MP_PLAYER_CONNECT=80,this.MP_START=81,this.MP_ASSIGN_NETWORKED_NODES=82,this.MP_ACKNOWLEDGE_HOST=83,this.MP_UPDATE_NODE=84,this.MP_INITIALIZE_NODE=85,this.MP_DESTROY_NODE=86,this.MP_REASSIGN_NODE_OWNER=87,this.PING=99,this.sdkApp=null,this.finalScoreSent=!1,this.opponents={},this.isGameOver=!1,this.sdkHandler=null,this.myPlayerData=null,this.prefabNameKey="_prefabName",this.playerReadyTimeKey="_playerReadyTime",this.timestampKey="_timestamp",this.senderKey="_senderID",this.hostIDKey="_hostID",this.matchIDKey="_matchID",this.newOwnerIDKey="_newOwnerID",this.networkedNodesKey="_networkedNodes",this.initializedNodesKey="_initializedNodes",this.eventNameKey="_eventName",this.pingRequesterKey="_pingRequestedBy",this.pingRecipientKey="_pingRecipient",this.gameEndTimeKey="_gameEndTime",this.isPongKey="_isPong",this.hostID="",this.matchID="",this.networkedNodes=new Map,this.playerReadyTime={},this.remainingPlayerCountToAcknowledgeHost=0,this.isRealtimeMultiplayer=!1,this.lastPingTimeStamp=0,this.gameEndTime=0,this.pingLimit=3,this.pingInterval=500,this.playerPings=new Map,this.pingRequestedTimeStamps=new Map,this.sdkApp=gpSDK,this.opponents=this.sdkApp.opponents,this.isRealtimeMultiplayer=e&&this.opponentCount()>0,this.pingLimit=t,this.pingInterval=i;let n=this;this.sdkApp.sdkOnEvent=function(e,t,i){switch(e){case n.MP_PLAYER_CONNECT:n.MP_onPlayerConnected(t);break;case n.MP_ASSIGN_NETWORKED_NODES:n.hostID&&""!=n.hostID||(n.hostID=t[n.hostIDKey],n.matchID=t[n.matchIDKey],n.playerReadyTime=t[n.playerReadyTimeKey],n.sdkHandler.MP_Client_AssignNetworkNodes(t[n.networkedNodesKey]),n.MP_Ping(n.hostID),n.sendMessage({},n.MP_ACKNOWLEDGE_HOST));break;case n.MP_ACKNOWLEDGE_HOST:if(n.isHost()&&(n.remainingPlayerCountToAcknowledgeHost--,t.hasOwnProperty(n.senderKey)&&n.MP_Ping(t[n.senderKey]),0==n.remainingPlayerCountToAcknowledgeHost)){n.sdkHandler.MP_Host_OnGameStart();let e={};e[n.gameEndTimeKey]=n.gameEndTime,n.sendMessage(e,n.MP_START)}break;case n.MP_START:n.isHost()||(t.hasOwnProperty(n.gameEndTimeKey)&&(n.gameEndTime=t[n.gameEndTimeKey]),n.sdkHandler.MP_Client_OnGameStart());break;case n.MP_UPDATE_NODE:n.matchSessionValid(t)&&t.hasOwnProperty(n.senderKey)&&t.hasOwnProperty("networkedNodeID")&&n.networkedNodes.has(t.networkedNodeID)&&n.networkedNodes.get(t.networkedNodeID).ownerID==t[n.senderKey]&&n.networkedNodes.get(t.networkedNodeID).updateFromData(t);break;case n.MP_INITIALIZE_NODE:if(n.matchSessionValid(t)&&t.hasOwnProperty(n.senderKey)&&t.hasOwnProperty(n.initializedNodesKey)){t[n.initializedNodesKey].forEach(e=>{if(e.hasOwnProperty(n.prefabNameKey)&&!n.networkedNodes.has(e.networkedNodeID)){let t=n.sdkHandler.MP_OnInitializeNetworkedNode(e[n.prefabNameKey]);t&&(t.assignOwnerID(e.ownerID),t.setNetworkID(e.networkedNodeID),t.updateFromData(e))}})}break;case n.MP_DESTROY_NODE:n.matchSessionValid(t)&&t.hasOwnProperty(n.senderKey)&&n.networkedNodes.has(t.networkedNodeID)&&n.networkedNodes.get(t.networkedNodeID).ownerID==t[n.senderKey]&&(n.networkedNodes.get(t.networkedNodeID).node.destroy(),n.networkedNodes.delete(t.networkedNodeID));break;case n.MP_REASSIGN_NODE_OWNER:n.matchSessionValid(t)&&t.hasOwnProperty(n.senderKey)&&n.networkedNodes.has(t.networkedNodeID)&&(!t.hasOwnProperty(n.newOwnerIDKey)||t[n.senderKey]!=n.networkedNodes.get(t.networkedNodeID).ownerID&&t[n.senderKey]!=n.hostID||n.networkedNodes.get(t.networkedNodeID).updateFromData(t),n.networkedNodes.get(t.networkedNodeID).ownerID=t[n.newOwnerIDKey]);break;case n.PING:if(t.hasOwnProperty(n.pingRequesterKey)&&t.hasOwnProperty(n.pingRecipientKey)&&t[n.pingRecipientKey]==n.getMyPlayerID())if(t.hasOwnProperty(n.isPongKey)){let e=t[n.pingRecipientKey];n.playerPings.has(e)||n.playerPings.set(e,[]),n.playerPings[e].push((new Date).getTime()-n.pingRequestedTimeStamps[e]),n.playerPings[e].length>n.pingLimit&&n.playerPings[e].shift(),n.isGameOver||setTimeout(()=>{n.MP_Ping(e)},n.pingInterval)}else{let e={};e[n.pingRequesterKey]=t[n.pingRequesterKey],e[n.pingRecipientKey]=n.getMyPlayerID(),e[n.isPongKey]=!0,n.sendMessage(e,n.PING)}break;default:n.onEvent(e,t,i)}},this.sdkApp.updateOpponentScore=function(e,t,i){n.updateOpponentScore(e,i)},this.sdkApp.onOpponentsReady=function(){n.sdkHandler.OnOpponentsReady()}}matchSessionValid(e){return e&&e.hasOwnProperty(this.matchIDKey)&&e[this.matchIDKey]==this.matchID}MP_Ping(e){if(e){let t={};t[this.pingRequesterKey]=this.getMyPlayerID(),t[this.pingRecipientKey]=e,this.sendMessage(t,this.PING),this.pingRequestedTimeStamps.set(e,t[this.timestampKey])}}removeNetworkedNode(e){this.networkedNodes.has(e)&&this.networkedNodes.delete(e)}MP_onPlayerConnected(e){if(!this.playerReadyTime.hasOwnProperty(e[this.senderKey])&&(this.playerReadyTime[e[this.senderKey]]=e[this.timestampKey],Object.keys(this.playerReadyTime).length==this.opponentCount()+1&&this.getMyPlayerID()==this.getFastestConnectedUser())){this.hostID=this.getMyPlayerID(),this.matchID=this.generateUUID(),this.remainingPlayerCountToAcknowledgeHost=this.opponentCount();let e=this.sdkHandler.MP_Host_AssignNetworkedNodes(),t={};t[this.hostIDKey]=this.hostID,t[this.matchIDKey]=this.matchID;let i=[];for(let t of e)i.push(t.convertToData());t[this.networkedNodesKey]=i,t[this.playerReadyTimeKey]=this.playerReadyTime,this.sdkApp.goPlaySDK.sendEvent(this.MP_ASSIGN_NETWORKED_NODES,t)}}generateUUID(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}readyToStart(){setTimeout(()=>{this.sdkApp.readyToStart()},1500)}getPlayerAveragePing(e){let t=0;return this.playerPings.has(e)&&this.playerPings[e].length>0&&(this.playerPings[e].forEach(e=>{t+=e}),t/=this.playerPings[e].length),t}getFastestConnectedUser(){let e;for(let t of Object.keys(this.playerReadyTime))e?this.playerReadyTime[t]<this.playerReadyTime[e]&&(e=t):e=t;return e}isHost(){return!!this.hostID&&this.hostID==this.getMyPlayerID()}isSinglePlayer(){return this.sdkApp.isSinglePlayer()}opponentCount(){return this.opponents?Object.keys(this.opponents).length:0}getMyPlayerID(){return this.myPlayerData&&this.myPlayerData.id?this.myPlayerData.id:""}setSDKHandler(e){this.sdkHandler=e,this.updateMyPlayerInfo();let t=Object.keys(this.opponents);t.length>0&&this.updateOpponent(this.opponents[t[0]]),this.isRealtimeMultiplayer&&this.sendMessage({},this.MP_PLAYER_CONNECT)}updateMyPlayerInfo(){let e=null;this.sdkApp.goPlaySDK.getCurrentPlayer(function(t){e=t}),e&&this.sdkHandler.OnSelfPlayerDataUpdated(e),this.myPlayerData=e}updateOpponent(e){e&&this.sdkHandler&&this.sdkHandler.OnOpponentUpdated(e)}updateOpponentScore(e,t){this.sdkHandler&&this.sdkHandler.OnOpponentScoreUpdated(e,t)}sendCurrentScore(e){this.sdkApp.setScore(e)}abortGame(){this.sdkApp.goPlaySDK.abortGame(function(){},function(){})}triggerGameOver(){this.sdkApp.updateFinalScore()}initializeNodes(...e){if(this.isRealtimeMultiplayer){let t={};t[this.initializedNodesKey]=[];let i=(new Date).getTime();e.forEach(e=>{e.generateNetworkID();let n=e.convertToData();n[this.timestampKey]=i,t[this.initializedNodesKey].push(n)}),this.sendMessage(t,this.MP_INITIALIZE_NODE)}}callRPCMethod(e,t,i){t[this.eventNameKey]=e,this.sendMessage(t,i)}sendMessage(e,t){if(e[this.senderKey]=this.getMyPlayerID(),e[this.timestampKey]=(new Date).getTime(),this.matchID&&(e[this.matchIDKey]=this.matchID),t==this.MP_PLAYER_CONNECT){this.MP_onPlayerConnected(e);let i=Object.assign({},e),n=window.setInterval(()=>{this.isMPHasHost()?window.clearInterval(n):this.sdkApp.goPlaySDK.sendEvent(t,i)},2e3)}this.sdkApp.goPlaySDK.sendEvent(t,e)}isMPHasHost(){return!!this.hostID&&this.hostID.length>0}getTimeRemainingInSeconds(){return(this.gameEndTime-(new Date).getTime())/1e3}networkDestroy(e){this.isRealtimeMultiplayer?e&&(this.sendMessage(e.convertToData(),this.MP_DESTROY_NODE),e.isSelfOwnNode()&&e.node.destroy()):e.node.destroy()}}return e.instance=null,e})();i.default=n,cc._RF.pop()},{}],Enermy:[function(e,t,i){"use strict";cc._RF.push(t,"c8668Y+oJZLyphrN3uIKrLX","Enermy");var n=this&&this.__decorate||function(e,t,i,n){var s,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o<3?s(r):o>3?s(t,i,r):s(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};Object.defineProperty(i,"__esModule",{value:!0});const s=e("./Util"),{ccclass:o,property:r}=cc._decorator;let a=(()=>{let e=class extends cc.Component{constructor(){super(...arguments),this.sfxHit=null,this.sfxHit2=null,this.sfxHitPlayer=null,this.isTouch=!1,this.randomTimer=1,this.hitSprite=null,this.script_GameController=null}start(){cc.tween(this.node).delay(1).call(()=>{this.node.parent.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,s.default.getRandom(-500,-100))}).start();this.schedule(()=>{this.moveRandom()},this.randomTimer)}moveRandom(){this.node.parent.getComponent(cc.RigidBody).linearVelocity=cc.v2(s.default.getRandom(100,-100),this.node.parent.getComponent(cc.RigidBody).linearVelocity.y),this.randomTimer=s.default.getRandomFloat(1.1,.5)}onCollisionEnter(e,t){if(!this.isTouch&&!e.name.toLowerCase().includes("enermy"))if(this.isTouch=!0,e.name.toLowerCase().includes("swordbody")){cc.audioEngine.play(this.sfxHit2,!1,1),cc.audioEngine.play(this.sfxHit,!1,1),this.script_GameController.scoreController.addScore(1),this.node.parent.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0),this.node.parent.getComponent(cc.RigidBody).enabled=!1;let e=cc.instantiate(this.hitSprite);e.parent=this.node,e.setPosition(s.default.getRandom(10,-10),s.default.getRandom(10,-10)),cc.tween(this.node.parent).delay(.2).removeSelf().start()}else e.name.toLowerCase().includes("player")&&(cc.audioEngine.play(this.sfxHitPlayer,!1,1),this.script_GameController.scoreController.addScore(-1),this.isTouch=!1);e.name.toLowerCase().includes("despawnarea")&&this.node.parent.destroy()}};return n([r({type:cc.AudioClip})],e.prototype,"sfxHit",void 0),n([r({type:cc.AudioClip})],e.prototype,"sfxHit2",void 0),n([r({type:cc.AudioClip})],e.prototype,"sfxHitPlayer",void 0),n([r(cc.Prefab)],e.prototype,"hitSprite",void 0),e=n([o],e)})();i.default=a,cc._RF.pop()},{"./Util":"Util"}],GameController:[function(e,t,i){"use strict";cc._RF.push(t,"d6119veUsNNe6b9nB+lPkhG","GameController");var n=this&&this.__decorate||function(e,t,i,n){var s,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o<3?s(r):o>3?s(t,i,r):s(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};Object.defineProperty(i,"__esModule",{value:!0});const s=e("./Util"),o=e("./ScoreController"),r=e("../SDK/Utils"),a=e("../SDK/SDKFunction"),l=e("./Enermy"),c=e("../SDK/ISDKHandler"),{ccclass:d,property:h}=cc._decorator;let p=(()=>{let e=class extends c.default{constructor(){super(...arguments),this.timer=90,this.isGameOver=!1,this.scoreController=null,this.enermyPrefab=[],this.slayer=null,this.hintObj=null,this.timerLabel=null,this.gameOverUI=null,this.grassPatch=null,this.label_PlayerName=null,this.sprite_PlayerSprite=null,this.label_OpponentName=null,this.sprite_OpponentSprite=null,this.label_OpponentScore=null,this.label_Exit=null,this.button_Exit=null,this.opponent_Profile=null,this.waitingForOpponentNode=null}OnSelfPlayerDataUpdated(e){this.label_PlayerName.string=e.firstName,e.avatar&&e.avatar.link&&r.default.loadImageFromURL(this.sprite_PlayerSprite,e.avatar.link,this.sprite_PlayerSprite.node.parent)}OnOpponentUpdated(e){this.opponent_Profile.active=!0,this.label_OpponentName.string=e.firstName,e.avatar&&e.avatar.link&&r.default.loadImageFromURL(this.sprite_OpponentSprite,e.avatar.link,this.sprite_OpponentSprite.node.parent),this.sprite_OpponentSprite.node.on(cc.Node.EventType.TOUCH_START,function(){a.default.getInstance().sdkApp.showOpponentProfile(e.id)},this)}OnOpponentScoreUpdated(e,t){this.label_OpponentScore.string=t.toString()}OnOpponentsReady(){this.startGame()}OnFinalScoreUpdated(){this.label_Exit.string="Tap the screen to Exit",this.button_Exit.interactable=!0}abortGame(){a.default.getInstance().abortGame()}onLoad(){super.onLoad(),this.scoreController=this.getComponent(o.default),cc.director.getPhysicsManager().enabled=!0,cc.director.getCollisionManager().enabled=!0}start(){a.default.getInstance().isSinglePlayer()?this.startGame():(this.waitingForOpponentNode.active=!0,a.default.getInstance().readyToStart())}startGame(){a.default.getInstance().sdkApp.goPlaySDK.startGame(),this.waitingForOpponentNode.active=!1,this.timerID=setInterval(()=>{this.timer--,this.timerLabel.string=s.default.secondToMinute(this.timer),this.timer<=0&&(this.isGameOver=!0,this.endGame()),this.spawnEnermy(),this.hintObj.active&&this.timer<=85&&(this.hintObj.active=!1)},700)}spawnEnermy(){if(!this.isGameOver){let e=cc.instantiate(this.enermyPrefab[s.default.getRandom(3)]);e.getComponentInChildren(l.default).script_GameController=this,e.setParent(this.grassPatch),e.setPosition(s.default.getRandom(this.grassPatch.width/2-50,-this.grassPatch.width/2+50),s.default.getRandom(this.grassPatch.height/2-50,-this.grassPatch.height/2+50))}}endGame(){a.default.getInstance().triggerGameOver(),cc.director.getPhysicsManager().enabled=!1,cc.director.getCollisionManager().enabled=!1,clearInterval(this.timerID),this.gameOverUI.active=!0}abort(){this.gameOverUI.getComponent(cc.Button).enabled=!0,this.gameOverUI.getComponentInChildren(cc.Label).string="Tap Now To Show Result!"}};return n([h(cc.Prefab)],e.prototype,"enermyPrefab",void 0),n([h(cc.Node)],e.prototype,"slayer",void 0),n([h(cc.Node)],e.prototype,"hintObj",void 0),n([h(cc.Label)],e.prototype,"timerLabel",void 0),n([h(cc.Node)],e.prototype,"gameOverUI",void 0),n([h(cc.Node)],e.prototype,"grassPatch",void 0),n([h(cc.Label)],e.prototype,"label_PlayerName",void 0),n([h(cc.Sprite)],e.prototype,"sprite_PlayerSprite",void 0),n([h(cc.Label)],e.prototype,"label_OpponentName",void 0),n([h(cc.Sprite)],e.prototype,"sprite_OpponentSprite",void 0),n([h(cc.Label)],e.prototype,"label_OpponentScore",void 0),n([h(cc.Label)],e.prototype,"label_Exit",void 0),n([h(cc.Button)],e.prototype,"button_Exit",void 0),n([h(cc.Node)],e.prototype,"opponent_Profile",void 0),n([h(cc.Node)],e.prototype,"waitingForOpponentNode",void 0),e=n([d],e)})();i.default=p,cc._RF.pop()},{"../SDK/ISDKHandler":"ISDKHandler","../SDK/SDKFunction":"SDKFunction","../SDK/Utils":"Utils","./Enermy":"Enermy","./ScoreController":"ScoreController","./Util":"Util"}],ISDKHandler:[function(e,t,i){"use strict";cc._RF.push(t,"03226hxTXxD0LfJ1SjK8nQw","ISDKHandler"),Object.defineProperty(i,"__esModule",{value:!0});const n=e("./SDKFunction");i.default=class extends cc.Component{onLoad(){n.default.getInstance().setSDKHandler(this)}OnOpponentsReady(){console.log("OnOpponentsReady() not overridden")}OnSelfPlayerDataUpdated(e){console.log("OnSelfPlayerDataUpdated(playerData) not overridden")}OnOpponentUpdated(e){console.log("OnOpponentUpdated(opponent) not overridden")}OnOpponentScoreUpdated(e,t){console.log("OnOpponentScoreUpdated(opponentID, opponentScore:number) not overridden")}OnFinalScoreUpdated(){console.log("OnSelfPlayerDataUpdated() not overridden")}MP_Host_AssignNetworkedNodes(){return console.log("MP_Host_AssignNetworkedNode() not overridden"),[]}MP_Client_AssignNetworkNodes(e){console.log("MP_Client_AssignNetworkNodes() not overridden")}MP_Host_OnGameStart(){console.log("MP_Host_OnGameStart() not overridden")}MP_Client_OnGameStart(){console.log("MP_Client_OnGameStart() not overridden")}MP_OnInitializeNetworkedNode(e){return console.log("MP_OnInitializeNetworkedNode(prefabName:string) not overridden"),null}},cc._RF.pop()},{"./SDKFunction":"SDKFunction"}],NetworkedNode:[function(e,t,i){"use strict";cc._RF.push(t,"003dcVcabtGmqMfCkCdOH2+","NetworkedNode"),Object.defineProperty(i,"__esModule",{value:!0});const n=e("./SDKFunction");i.default=class extends cc.Component{constructor(){super(...arguments),this._minUpdateInterval=-1,this._timeSinceLastFrame=this._minUpdateInterval,this.syncedVariables=["networkedNodeID","ownerID"],this.previousWatchedVariableValues=new Map,this._lastUpdatedTimestamp=0,this._changeDetected=!1}generateNetworkID(){this.networkedNodeID||(this.setNetworkID(this.generateUUID()),this.assignOwnerID(n.default.getInstance().getMyPlayerID()))}assignOwnerID(e){this.ownerID=e}setNetworkID(e){this.networkedNodeID=e,this.networkedNodeID&&this.networkedNodeID.trim().length>0&&n.default.getInstance().networkedNodes.set(this.networkedNodeID,this)}addSyncedVariables(...e){for(let t of e)this.syncedVariables.push(t)}convertToData(){let e={};e[n.default.getInstance().prefabNameKey]=this.node.name;for(let t of this.syncedVariables)e[t]=this.getNodeValue(t),this.previousWatchedVariableValues.has(t)&&this.previousWatchedVariableValues.get(t)==e[t]||(this.previousWatchedVariableValues.set(t,e[t]),this._changeDetected=!0);return e}updateData(){let e=this.convertToData();this._changeDetected&&(this._changeDetected=!1,n.default.getInstance().sendMessage(e,n.default.getInstance().MP_UPDATE_NODE))}reassignNodeOwner(e){if(this.ownerID!=e&&n.default.getInstance().getMyPlayerID()==this.ownerID||n.default.getInstance().isHost()){this.ownerID=e;let t=this.convertToData();t[n.default.getInstance().newOwnerIDKey]=e,n.default.getInstance().sendMessage(t,n.default.getInstance().MP_REASSIGN_NODE_OWNER)}}updateFromData(e){let t=e[n.default.getInstance().timestampKey];this._lastUpdatedTimestamp<t&&(this._lastUpdatedTimestamp=t,this.onDataReceivedImpl(e))}getNodeValue(e,t=this){return e.includes(".")?this.getNodeValue(e.substr(e.indexOf(".")+1),t[e.substr(0,e.indexOf("."))]):t[e]}generateUUID(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}isSelfOwnNode(){return!!this.ownerID&&this.ownerID==n.default.getInstance().getMyPlayerID()}update(e){this._minUpdateInterval>=0&&this.isSelfOwnNode()&&(this._timeSinceLastFrame-=e,this._timeSinceLastFrame<0&&(this._timeSinceLastFrame=this._minUpdateInterval,this.updateData()))}onDestroy(){n.default.getInstance().removeNetworkedNode(this.networkedNodeID),this.setNetworkID(null),this.assignOwnerID(null)}},cc._RF.pop()},{"./SDKFunction":"SDKFunction"}],SDKFunction:[function(e,t,i){"use strict";cc._RF.push(t,"221b8DcqM9PXboGI03So5ei","SDKFunction"),Object.defineProperty(i,"__esModule",{value:!0});const n=e("./AbstractSDK");class s extends n.default{static getInstance(){return null==this.instance&&(this.instance=new s(!1)),this.instance}onEvent(e,t,i){console.log("Unknown event",e,t)}}i.default=s,cc._RF.pop()},{"./AbstractSDK":"AbstractSDK"}],ScoreController:[function(e,t,i){"use strict";cc._RF.push(t,"0cc83eGFBRFupB+iK7IZJTC","ScoreController");var n=this&&this.__decorate||function(e,t,i,n){var s,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o<3?s(r):o>3?s(t,i,r):s(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};Object.defineProperty(i,"__esModule",{value:!0});const s=e("./GameController"),o=e("./Util"),r=e("../SDK/SDKFunction"),{ccclass:a,property:l}=cc._decorator;let c=(()=>{let e=class extends cc.Component{constructor(){super(...arguments),this.script_GameController=null,this.scoreDisplayPrefab=null,this.scoreLabel=null,this.comboLabel=null,this.combo=0,this.currentScore=0}onLoad(){this.script_GameController=this.getComponent(s.default)}addScore(e){let t=cc.instantiate(this.scoreDisplayPrefab),i="0";e<0?(t.color=cc.Color.RED,this.combo=0,this.currentScore>0&&this.currentScore--,this.comboLabel.node.parent.active=!1,i="-1"):(this.combo++,this.currentScore+=e*this.combo,this.comboLabel.string="x"+this.combo,this.comboLabel.node.parent.active=this.combo>=2,i="+"+e*this.combo),t.getComponent(cc.Label).string=i,this.scoreLabel.string=this.currentScore.toString(),r.default.getInstance().sendCurrentScore(this.currentScore),t.setParent(this.script_GameController.slayer),t.setPosition(o.default.getRandom(150,-150),0),cc.tween(t).parallel(cc.moveBy(.3,cc.v2(0,100)),cc.fadeIn(.3)).delay(.5).then(cc.fadeOut(.3)).removeSelf().start()}};return n([l(cc.Prefab)],e.prototype,"scoreDisplayPrefab",void 0),n([l(cc.Label)],e.prototype,"scoreLabel",void 0),n([l(cc.Label)],e.prototype,"comboLabel",void 0),e=n([a],e)})();i.default=c,cc._RF.pop()},{"../SDK/SDKFunction":"SDKFunction","./GameController":"GameController","./Util":"Util"}],TouchController:[function(e,t,i){"use strict";cc._RF.push(t,"af673KGIshOB654j/dNQ5VT","TouchController");var n=this&&this.__decorate||function(e,t,i,n){var s,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o<3?s(r):o>3?s(t,i,r):s(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};Object.defineProperty(i,"__esModule",{value:!0});const s=e("./GameController"),{ccclass:o,property:r}=cc._decorator;let a=(()=>{let e=class extends cc.Component{constructor(){super(...arguments),this.script_GameController=null,this.slayer=null,this.leftDash=null,this.rightDash=null,this.defaultSprite=null,this.sfxSwing=null,this.slayerSprite=null,this.lastPositionX=0,this.speed=1400,this.moveDirectionX=0,this.canMove=!1,this.currentDirection=1,this.left=!1,this.useMouse=!1}onLoad(){this.slayerSprite=this.slayer.getChildByName("player").getComponent(cc.Sprite),this.defaultSprite=this.slayerSprite.spriteFrame}start(){this.node.on(cc.Node.EventType.TOUCH_START,(e,t)=>{this.lastPositionX=e.getLocation().x,this.useMouse=!0,this.canMove=!0},this.node),this.node.on(cc.Node.EventType.TOUCH_MOVE,(e,t)=>{this.moveDirectionX=Math.sign(e.getLocation().x-this.lastPositionX),this.lastPositionX=e.getLocation().x},this.node),this.node.on(cc.Node.EventType.TOUCH_END,e=>{this.moveDirectionX=0,this.canMove=!1,this.slayerSprite.spriteFrame=this.defaultSprite},this.node),this.node.on(cc.Node.EventType.TOUCH_CANCEL,e=>{this.moveDirectionX=0,this.canMove=!1,this.slayerSprite.spriteFrame=this.defaultSprite},this.node),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)}onKeyDown(e){switch(this.useMouse=!1,this.canMove=!0,e.keyCode){case cc.macro.KEY.left:this.moveDirectionX=-1;break;case cc.macro.KEY.right:this.moveDirectionX=1}}onKeyUp(e){switch(e.keyCode){case cc.macro.KEY.left:-1==this.moveDirectionX&&(this.moveDirectionX=0,this.canMove=!1,this.slayerSprite.spriteFrame=this.defaultSprite);break;case cc.macro.KEY.right:1==this.moveDirectionX&&(this.moveDirectionX=0,this.canMove=!1,this.slayerSprite.spriteFrame=this.defaultSprite)}}update(e){if(this.canMove&&!this.script_GameController.isGameOver){let t=this.slayer.x+this.moveDirectionX*this.speed*e;t<this.node.getContentSize().width/2-100&&t>-this.node.getContentSize().width/2+100?(this.slayer.setPosition(t,this.slayer.y),0!=this.moveDirectionX&&this.currentDirection!=this.moveDirectionX?(cc.audioEngine.play(this.sfxSwing,!1,1),this.currentDirection=this.moveDirectionX,cc.tween(this.slayer.getChildByName("sword").getChildByName("AxeTrail")).call(()=>{this.slayer.getChildByName("sword").getChildByName("AxeTrail").getComponent(cc.Sprite).enabled=!0}).delay(.5).call(()=>{this.slayer.getChildByName("sword").getChildByName("AxeTrail").getComponent(cc.Sprite).enabled=!1}).start(),-1==this.moveDirectionX&&(this.slayerSprite.spriteFrame=this.leftDash,this.slayer.getChildByName("leftDust").getComponent(cc.Animation).play(),this.slayer.getChildByName("sword").scaleX=-1),1==this.moveDirectionX&&(this.slayerSprite.spriteFrame=this.rightDash,this.slayer.getChildByName("rightDust").getComponent(cc.Animation).play(),this.slayer.getChildByName("sword").scaleX=1),this.slayer.getChildByName("sword").getComponent(cc.RigidBody).angularVelocity=0,this.slayer.getChildByName("sword").getComponent(cc.RigidBody).angularVelocity+=200*this.moveDirectionX):this.slayer.getChildByName("sword").getComponent(cc.RigidBody).angularVelocity+=30*this.moveDirectionX,this.slayer.children.forEach(e=>{null!=e.getComponent(cc.RigidBody)&&e.getComponent(cc.RigidBody).syncPosition(!1)})):(this.slayer.setPosition(this.slayer.x,this.slayer.y),this.slayerSprite.spriteFrame=this.defaultSprite),1==this.useMouse&&(this.moveDirectionX=0)}}};return n([r(s.default)],e.prototype,"script_GameController",void 0),n([r(cc.Node)],e.prototype,"slayer",void 0),n([r(cc.SpriteFrame)],e.prototype,"leftDash",void 0),n([r(cc.SpriteFrame)],e.prototype,"rightDash",void 0),n([r({type:cc.AudioClip})],e.prototype,"sfxSwing",void 0),e=n([o],e)})();i.default=a,cc._RF.pop()},{"./GameController":"GameController"}],Utils:[function(e,t,i){"use strict";cc._RF.push(t,"db115ngP/pNX5olT73HaJ9u","Utils");var n=this&&this.__decorate||function(e,t,i,n){var s,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o<3?s(r):o>3?s(t,i,r):s(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};Object.defineProperty(i,"__esModule",{value:!0});const{ccclass:s,property:o}=cc._decorator;let r=(()=>{let e=class extends cc.Component{static getWorldPosition(e,t=this.LEFT,i=this.BOTTOM){if(e){let o=cc.mat4(),r=new cc.Vec3;e.getWorldMatrix(o).getTranslation(r);var n=r.x-e.width*e.anchorX,s=r.y-e.height*e.anchorY;return t==this.RIGHT?n+=e.width:t==this.CENTER&&(n+=e.width/2),i==this.TOP?s+=e.height:t==this.CENTER&&(s+=e.height/2),cc.v2(n,s)}}static getPosition(e,t=this.LEFT,i=this.BOTTOM){var n=e.x-e.width*e.anchorX,s=e.y-e.height*e.anchorY;return t==this.RIGHT?n+=e.width:t==this.CENTER&&(n+=e.width/2),i==this.TOP?s+=e.height:t==this.CENTER&&(s+=e.height/2),cc.v2(n,s)}static removeFromArray(e,t){const i=e.indexOf(t);i>-1&&e.splice(i,1)}static clearArray(e){e.length=0}static random(e,t){return Math.floor(Math.random()*(t-e+1)+e)}static randomSign(){return this.random(0,10)>5?1:-1}static shuffle(e){for(let t=e.length-1;t>0;t--){let i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}static setMaxSize(e,t,i){var n=1;e.width>t&&(n=t/e.width),e.height>i&&(n=Math.min(n,i/e.height)),e.setContentSize(e.width*n,e.height*n)}static formatTime(e){let t=Math.floor(e/60),i=Math.floor(e-60*t);return t.toLocaleString(void 0,{minimumIntegerDigits:2})+":"+i.toLocaleString(void 0,{minimumIntegerDigits:2})}static loadImageFromURL(e,t,i=null){cc.loader.load(t,function(t,n){if(!t){let t=new cc.SpriteFrame(n);if(e.spriteFrame=t,i){let n=t.getOriginalSize(),s=1;(n.height>i.height||n.width>i.width)&&(s=Math.max(i.height/n.height,i.width/n.width)),e.node.setContentSize(n.width*s,n.height*s)}}})}static adjustNodeToSize(e,t){}};return e.LEFT=0,e.RIGHT=1,e.CENTER=2,e.TOP=3,e.BOTTOM=4,e=n([s],e)})();i.default=r,cc._RF.pop()},{}],Util:[function(e,t,i){"use strict";cc._RF.push(t,"5ff3cN+wUhGsbRnCr9c7CvE","Util");var n=this&&this.__decorate||function(e,t,i,n){var s,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(r=(o<3?s(r):o>3?s(t,i,r):s(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};Object.defineProperty(i,"__esModule",{value:!0});const{ccclass:s,property:o}=cc._decorator;let r=(()=>{let e=class extends cc.Component{static calculatePosFromAngleRadius(e,t){let i=cc.misc.degreesToRadians(t),n=e*Math.sin(i),s=e*Math.cos(i);return cc.v2(n,s)}static secondToMinute(e){let t,i;return(t=Math.floor(e/60))+":"+(i=("0"+Math.floor(e>=60?e-60:e)).slice(-2))}static getRandom(e,t=0){return Math.floor(Math.random()*(e-t)+t)}static getRandomFloat(e,t=0){return Math.random()*(e-t)+t}static getRandomCollectionObject(e){let t=Math.floor(Math.random()*e.size),i=0;for(let n of e.keys())if(i++===t)return n}static getRandomArrayObject(e){let t=Math.floor(Math.random()*e.length),i=0;for(var n of e)if(i++===t)return n}static stringToVector(e){return new cc.Vec2(Number(e.split(",")[0]),Number(e.split(",")[1]))}static vectorToString(e){return e.x+","+e.y}static shuffleArray(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}}};return e=n([s],e)})();i.default=r,cc._RF.pop()},{}],use_reversed_rotateBy:[function(e,t,i){"use strict";cc._RF.push(t,"4789fRPdyRKk7cUC1UwLqWI","use_reversed_rotateBy"),cc.RotateBy._reverse=!0,cc._RF.pop()},{}]},{},["AbstractSDK","ISDKHandler","NetworkedNode","SDKFunction","Utils","Enermy","GameController","ScoreController","TouchController","Util","use_reversed_rotateBy"]);