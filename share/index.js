"user strict";
let localStream;
var peer

const mediaStreamConstraints = {
    audio: {
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: 2
    },
    video: {
      //width: 1280,
      //height: 720, 
      mediaSource: "screen",
      "frameRate": {"max": 60}
    } 
  };

var ID
var dataConnection
var iswebsocket=0
var webSocket
//スタートボタンが押されたときidboxに入ってるidでpeer connectを行う
document.getElementById('start').onclick = function() {
    ID=document.getElementById("set-id").value
    if (ID!=""){
        peer = new Peer(ID,{
            key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
            debug: 3
        });
        peer.on('error', e => {
            document.getElementById('my-id').textContent = "指定したIDは使用することができないので別のIDに変更するかランダムなIDでの画面共有をお願いします";
            document.getElementById('my-id2').textContent = "IDは画面共有に成功した際に表示されます";
        });
        peer.on('call', mediaConnection => {
            mediaConnection.answer(localStream, {videoBandwidth: 14000, audioBandwidth: 4000});
            setEventListener(mediaConnection);
        });
        //peerが接続できたときidを画面に表示する
        peer.on('open', () => {
            console.log("connected")
            document.getElementById('my-id').textContent = "ID："+peer.id;
            document.getElementById('my-id2').textContent = "";
            document.getElementById('set-id').style.display ="none"
            document.getElementById('start').style.display ="none"
            document.getElementById('start_r').style.display ="none"
            document.getElementById('op2').style.display ="none"
            document.getElementById('url').style.display ="block"
            navigator.clipboard.writeText(location.protocol + "//" + location.hostname + location.pathname.replace('share/', 'operation')+"?id="+peer.id);
            navigator.mediaDevices
            .getDisplayMedia(mediaStreamConstraints)
            .then(gotLocalMediaStream)
            .catch(handleLocalMediaStreamError);
        });
        //detachannelに接続できたとき
        peer.on("connection", (conn) => {
            //document.getElementById('getconnected').textContent = "接続されました";
            //dataが送られたとき発火
            conn.on("data", (data) => {
                //console.log(`${name}: ${msg}`);
                // => 'SkyWay: Hello, World!'
                try {
                    webSocket.send(data);
                    document.getElementById('dame').style.display ="none"
                } catch (error) {
                    document.getElementById('dame').style.display ="block"
                }
            });
        });
    }
}
//スタートボタンが押されたときidboxに入ってるidでpeer connectを行う
document.getElementById('start_r').onclick = function() {
    peer = new Peer(ID,{
        key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
        debug: 3
    });
    peer.on('call', mediaConnection => {
        mediaConnection.answer(localStream, {videoBandwidth: 14000, audioBandwidth: 4000});
        setEventListener(mediaConnection);
    });
    //peerが接続できたときidを画面に表示する
    peer.on('open', () => {
        console.log("connected")
        document.getElementById('my-id').textContent = "ID："+peer.id;
        document.getElementById('my-id2').textContent = "";
        document.getElementById('set-id').style.display ="none"
        document.getElementById('start').style.display ="none"
        document.getElementById('start_r').style.display ="none"
        document.getElementById('op2').style.display ="none"
        document.getElementById('url').style.display ="block"
        navigator.clipboard.writeText(location.protocol + "//" + location.hostname + location.pathname.replace('share/', 'operation')+"?id="+peer.id);
        navigator.mediaDevices
        .getDisplayMedia(mediaStreamConstraints)
        .then(gotLocalMediaStream)
        .catch(handleLocalMediaStreamError);
    });
    //detachannelに接続できたとき
    peer.on("connection", (conn) => {
        //document.getElementById('getconnected').textContent = "接続されました";
        //dataが送られたとき発火
        conn.on("data", (name) => {
            //console.log(`${name}: ${msg}`);
            // => 'SkyWay: Hello, World!'
            try {
                webSocket.send(data);
                document.getElementById('dame').style.display ="none"
            } catch (error) {
                document.getElementById('dame').style.display ="block"
            }
        });
    });
}

document.getElementById('url').onclick = function() {
    navigator.clipboard.writeText(location.protocol + "//" + location.hostname + location.pathname.replace('share/', 'operation')+"?id="+peer.id);
    document.getElementById('copyy').textContent = "コピーされました";
}

window.onload = function(){
    setInterval(() => {
        webSocket = new WebSocket("ws://localhost:9998")
    }, 5000);
}

//Socket通信をするボタンを押したときSocket通信をする
/*document.getElementById('start_socket').onclick = function() {
    // ウェブサーバを接続する。
    webSocket = new WebSocket("ws://localhost:9998");

    webSocket.onopen = function(message){
        console.log("Server connect...");
    };
    webSocket.onclose = function(message){
        console.log("Server Disconnect...\n");
    };
}*/

const localVideo = document.querySelector("video");

function gotLocalMediaStream(mediaStream) {
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
    console.log("navigator.getUserMedia error: ", error);
}