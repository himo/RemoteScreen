"user strict";
let localStream;
var peer;
var ID

/*peer.on('open', () => {
  document.getElementById('my-id').textContent = peer.id;
});*/

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

document.getElementById('start').onclick = function() {
  navigator.mediaDevices
  .getDisplayMedia(mediaStreamConstraints)
  .then(gotLocalMediaStream)
  .catch(handleLocalMediaStreamError);
  ID=document.getElementById("set-id").value
  if (ID!=""){
    console.log("IDがセットされている")
    peer = new Peer(ID,{
      key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
      debug: 3
    });
  }else{
    console.log("IDがセットされていない")
    peer = new Peer({
      key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
      debug: 3
    });
  }
  
  peer.on('open', () => {
    document.getElementById('my-id').textContent = peer.id;
  });
  peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream, {videoBandwidth: 14000, audioBandwidth: 4000});
    setEventListener(mediaConnection);
  });
  navigator.clipboard.writeText("http://150.147.198.206/screen/receive?id="+peer.id);
  console.log(peer.id)
  document.getElementById('my-id').style.display ="none"
  document.getElementById('set-id-txt').style.display ="none"
  document.getElementById('set-id').style.display ="none"
  document.getElementById('setu-txt').style.display ="none"
  document.getElementById('url').style.display ="block"
}

document.getElementById('url').onclick = function() {
  navigator.clipboard.writeText("http://150.147.198.206/screen/receive?id="+peer.id);
}

const localVideo = document.querySelector("video");

function gotLocalMediaStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
  console.log("navigator.getUserMedia error: ", error);
}
