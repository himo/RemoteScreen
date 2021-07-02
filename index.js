"user strict";
let localStream;
var peer = new Peer(ID,{
    key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
    debug: 3
});

const mediaStreamConstraints = {
    audio: {
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 2
    },
    video: {
      //width: 1280,
      //height: 720, 
      "frameRate": {"max": 60}
    } 
  };

var ID
var dataConnection
var iswebsocket=0
var webSocket
//スタートボタンが押されたときidboxに入ってるidでpeer connectを行う
document.getElementById('start').onclick = function() {
    navigator.mediaDevices
    .getDisplayMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream)
    .catch(handleLocalMediaStreamError);
    
    peer.on('call', mediaConnection => {
        mediaConnection.answer(localStream, {videoBandwidth: 14000, audioBandwidth: 4000});
        setEventListener(mediaConnection);
    });
}

window.onload = function(){
    setInterval(() => {
        webSocket = new WebSocket("ws://localhost:9998")
    }, 5000);
}

//Socket通信をするボタンを押したときSocket通信をする
document.getElementById('start_socket').onclick = function() {
    // ウェブサーバを接続する。
    webSocket = new WebSocket("ws://localhost:9998");

    webSocket.onopen = function(message){
        console.log("Server connect...");
    };
    webSocket.onclose = function(message){
        console.log("Server Disconnect...\n");
    };
}
//peerが接続できたときidを画面に表示する
peer.on('open', () => {
    console.log("wwwwww")
    document.getElementById('my-id').textContent = peer.id;
});
//detachannelに接続できたとき
peer.on("connection", (conn) => {
    document.getElementById('getconnected').textContent = "接続されました";
    //dataが送られたとき発火
    conn.on("data", (name) => {
        //console.log(`${name}: ${msg}`);
        // => 'SkyWay: Hello, World!'
        webSocket.send(name);
    });
});

const localVideo = document.querySelector("video");

function gotLocalMediaStream(mediaStream) {
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
    console.log("navigator.getUserMedia error: ", error);
}