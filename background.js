browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "sampleContextMenu",
    title: "Sample Context Menu",
    contexts: ["selection"],
  });
});

//// This will run when a bookmark is created.
//browser.bookmarks.onCreated.addListener(() => {
//  // do something
//});


//browser.runtime.onMessage.addListener(notify);
//
//function notify(message) {
//  browser.notifications.create({
//    type: "basic",
//    title: "You clicked!",
//    message: message.data,
//  });
//}


// TODO: test implement
//https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#connection-based_messaging

// bad doesn't work?
//function handleMessage(request, sender, sendResponse) {
//  console.log(`content script sent a message: ${request.content}`);
//  setTimeout(() => {
//    sendResponse({ response: `async response from background script: received ${request.content}` });
//  }, 1000);
//  return true;
//}
//
//
//browser.runtime.onMessage.addListener(handleMessage);
