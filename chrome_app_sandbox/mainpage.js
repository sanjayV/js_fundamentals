// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var counter=0;
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('reset').addEventListener('click', function(event) {
    counter=0;
    document.querySelector("#result").innerHTML="";
  });

  document.getElementById('sendMessage').addEventListener('click', function(event) {
    counter++;
    var message = {
      command: 'render',
      templateName: 'sample-template-'+counter,
      context: {'counter': counter}
    };
    document.getElementById('theFrame').contentWindow.postMessage(message, '*');
  });

    document.getElementById('testMessage').addEventListener('click', function() {
        document.getElementById('theFrame').contentWindow.postMessage({type: 'test', message: 'This is test data'}, '*');
    });

  // on result from sandboxed frame:
  window.addEventListener('message', function(event) {
    document.querySelector("#result").innerHTML=event.data.result || "invalid result"
  });






    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent,function(e) {
      console.log('parent received message!:  ',e.data);

        /*var chooseDirButton = document.querySelector('#choose_dir');
        chooseDirButton.addEventListener('click', function(e) {*/
          chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(theEntry) {
            if (!theEntry) {
              output.textContent = 'No Directory selected.';
              return;
            }
            // use local storage to retain access to this file
            chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(theEntry)});
            loadDirEntry(theEntry);
          });
        /*});*/
    },false);
});

