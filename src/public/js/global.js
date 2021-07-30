(function () {
  var socketUsers = [];
  var socket = io();
  var myUserNum = false;
  var currentCopy;

  socket.on("connected", function (uid) {
    if (myUserNum === false) {
      myUserNum = uid;
      console.log(`Hey hey, ${uid}`);
    }
  });

  socket.on("disconnected", function (uid) {
    if (socketUsers.includes(uid)) {
      socketUsers.splice(socketUsers.indexOf(uid), 1);
      console.log(`Say your prayers, ${uid}`);
    }
  });

  // Receive message from server
  socket.on("copy", async function (copy) {
    navigator.clipboard.writeText(copy);
    document.getElementById("clipText").innerText = copy;
  });

  // Sync every 3 seconds
  setInterval(() => {
    // Copy from clipboard
    navigator.clipboard.readText().then(async (copy) => {
      if (copy != currentCopy) {
        socket.emit("copy", await copy);
        currentCopy = copy;
      }
    });
  }, 500);

  copyTitle();

  function copyTitle() {
    const copyText = "copy";
    const pasteText = "PASTE";
    let copyPasteText = copyText;
    let i = 0;
    setInterval(function () {
      document.title = `greybox ${copyPasteText}`;
      var newPasteText = pasteText.slice(i, i + 1);
      var copyPasteArray = copyText.split("");
      copyPasteArray.splice(i, 0, newPasteText);
      copyPasteText = copyPasteArray.join("");
      i <= pasteText.length ? i++ : (i = 0);
    }, 1000);
  }
})();
