"user strict";
var issvideo
let localStream;
var peer = new Peer(ID,{
    key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
    debug: 3
});
var url = new URL(window.location.href);
var params = url.searchParams;


var ID
var dataConnection=0


keylists=
["dwad", "wadada","dwadawd", " ", "!", '"', "#",  "$", "%", "&", "'", "(",
")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7",
"8", "9", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "wakarann",
"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~",
"accept", "add", "alt", "altleft", "altright", "apps", "Backspace",
"browserback", "browserfavorites", 'browserforward', 'browserhome',
'browserrefresh', 'browsersearch', 'browserstop', 'CapsLock', 'clear',
'convert', 'Control', 'ctrlleft', 'ctrlright', 'decimal', 'del', 'delete',
'divide', 'ArrowDown', 'End', 'Enter', 'esc', 'Escape', 'execute', 'F1', 'F10',
'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F2', 'F20',
'F21', 'F22', 'F23', 'F24', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9',
'final', 'fn', 'hanguel', 'hangul', 'Hankaku', 'help', 'home', 'insert', 'Zenkaku',
"Hiragana", "kanji", 'launchapp1', 'launchapp2', 'launchmail',
'launchmediaselect', 'ArrowLeft', 'modechange', 'multiply', 'nexttrack',
'nonconvert', 'num0', 'num1', 'num2', 'num3', 'num4', 'num5', 'num6',
'num7', 'num8', 'num9', 'numlock', 'PageDown', 'PageUp', 'Pause', 'pgdn',
'pgup', 'playpause', 'prevtrack', 'print', 'PrintScreen', 'prntscrn',
'prtsc', 'prtscr', 'return', 'ArrowRight', 'scrolllock', 'select', 'separator',
'Shift', 'shiftleft', 'shiftright', 'sleep', 'space', 'stop', 'subtract', 'Tab',
'ArrowUp', 'volumedown', 'volumemute', 'volumeup', 'Meta', 'winleft', 'winright', "\\",
'command', 'option', 'optionleft', 'optionright'
]
document.getElementById("dispvideo").addEventListener('mousewheel', Scroll);
function Scroll (event){
    event.preventDefault();
    dataConnection.send("scroll,"+event.wheelDelta)
    console.log(event.wheelDelta)
}

document.getElementById("dispvideo").addEventListener('mousemove', Mousemove);
var _changeData = _.throttle(function (event) {
    if (dataConnection!=0){
        dataConnection.send("moveTo,"+event.offsetX*1.5+","+event.offsetY*1.5)
    }
    console.log(event.offsetX)
    console.log(event.offsetY)
  }, 150);
function Mousemove(event){
    _changeData(event)
}

document.getElementById("dispvideo").addEventListener('mousedown', Mousedown);
function Mousedown(event){
    if(event.which==1){//???????????????
        dataConnection.send("mouseDown,left")
    }else if(event.which==2){//????????????????????????
        dataConnection.send("mouseDown,middle")
    }else if(event.which==3){//???????????????
        dataConnection.send("mouseDown,right")
    }
    console.log("?????????????????????")
}

document.getElementById("dispvideo").addEventListener('mouseup', Mouseup);
function Mouseup(event){
    if(event.button==0){//?????????????????????
        dataConnection.send("MouseUp,left")
    }else if(event.button==1){//??????????????????????????????
        dataConnection.send("MouseUp,middle")
    }else if(event.button==2){//?????????????????????
        dataConnection.send("MouseUp,right")
    }
    console.log("?????????????????????")
}
document.getElementById("dispvideo").addEventListener('keydown', Keydown);
function Keydown(event){
    event.keyCode = null;
    event.returnValue = false;
    var hikaku
    if(event.key.length==1){
        hikaku=event.key.toLowerCase()
    }else{
        hikaku=event.key
    }
    if(keylists.indexOf(hikaku)){
        //console.log(keylists.indexOf(hikaku))
        dataConnection.send("keyDown,"+keylists.indexOf(hikaku))
    }
    console.log("????????????")
    console.log(event)
    console.log(keylists.indexOf(hikaku))
}
document.getElementById("dispvideo").addEventListener('keyup', Keyup);
function Keyup(event){
    var hikaku
    var retan
    if(event.key.length==1){
        hikaku=event.key.toLowerCase()
    }else{
        hikaku=event.key
    }
    if(hikaku=="Hankaku"){
        hikaku="Zenkaku"
    }else if(hikaku=="Zenkaku"){
        hikaku="Hankaku"
    }
    if(keylists.indexOf(hikaku)){
        dataConnection.send("keyUp,"+keylists.indexOf(hikaku))
        //console.log(keylists.indexOf(hikaku))
    }
    console.log("????????????")
    console.log(event)
    console.log(keylists.indexOf(hikaku))
}

//??????????????????????????????????????????idbox???????????????id???peer connect?????????
document.getElementById('start').onclick = function() {
    console.log(document.getElementById('id').value)
    dataConnection = peer.connect(document.getElementById('id').value);
    mediaConnection = peer.call(document.getElementById('id').value, localStream);
    setEventListener(mediaConnection);
}
//??????????????????????????????????????????????????????
/*document.getElementById('sending').onclick = function() {
    const data = {
        action: "move",
        msg: document.getElementById("chatsend").value
    };
    dataConnection.send(data);
}*/
//peer????????????????????????id????????????????????????
peer.on('open', () => {
    console.log("connected")
});
//detachannel????????????????????????
peer.on("connection", (conn) => {
    document.getElementById('getconnected').textContent = "?????????????????????";
    //data???????????????????????????
    conn.on("data", ({ name, msg }) => {
        //console.log(`${name}: ${msg}`);
        // => 'SkyWay: Hello, World!'
        webSocket.send(msg);
    });
});

window.onload = function() {
    document.getElementById('id').value=params.get('id');
}

const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
      // video????????????????????????????????????????????????
      const videoElm = document.getElementById('dispvideo')
      videoElm.srcObject = stream;
      videoElm.play();
    });
}

document.getElementById("dispvideo").addEventListener('mouseenter', e => {
    issvideo=1
    console.log("video??????????????????")
});
document.getElementById("dispvideo").addEventListener('mouseleave', e => {
    issvideo=0
    console.log("video??????????????????")
});