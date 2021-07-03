"user strict";
let localStream;
var peer = new Peer(ID,{
    key: 'c2ad39ff-ed02-41e1-b1f1-c918871c1f28',
    debug: 3
});
var ID
var dataConnection

document.getElementById('start').onclick = function() {
    console.log(document.getElementById('set-id').value)
    dataConnection = peer.connect(document.getElementById('set-id').textContent);
}

peer.on('open', () => {
    console.log("wwwwww")
    document.getElementById('my-id').textContent = peer.id;
});

peer.on("connection", (dataConnection) => {
    console.log("接続されました")
});