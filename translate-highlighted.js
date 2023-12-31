// downloaded dictionary from
// https://www1.dict.cc/translation_file_request.php
// https://github.com/viorelsfetea/german-verbs-database

console.log(verbsConjToInf["aal"]);

// convert verb to infinitive form
// return str if already infinitive
function VerbsConjToInfWrapper(str) {
  if (!verbsConjToInf.hasOwnProperty(str))
    return "";
  return verbsConjToInf[str];
}

function MyDictDEENWrapper(str) {
  if (!mydict.hasOwnProperty(str))
    return -1;
  return mydict[str];
}

const dialog = document.createElement("dialog");
const button = document.createElement("button");
button.onclick = function() {dialog.close();};
button.style.height = '100px';
dialog.id = "myid";
dialog.appendChild(button);
document.body.appendChild(dialog);
//dialog.showModal();
//dialog.close();



const tooltiptext = document.createElement("span");
tooltiptext.id = "tooltiptext";
tooltiptext.classList.add("tooltiptext");
tooltiptext.style.position = "absolute";
tooltiptext.style.display = "none";
document.body.appendChild(tooltiptext);

//TODO add buttons to cycle through different meanings


const getHighlightedText = () => {
  if (document.getSelection) {
    return document.getSelection().toString();
  } else if (window.getSelection) {
    return window.getSelection().toString();
  } else {
    return "";
  }
}

function HideText() {
  const tooltiptext = document.getElementById("tooltiptext");
  tooltiptext.style.display = "none";
}

function ShowText(e,str) {
  const tooltiptext = document.getElementById("tooltiptext");
  tooltiptext.style.left = `${e.clientX}px`;
  tooltiptext.style.top = `${e.clientY+20}px`;
  tooltiptext.innerText = str;
  tooltiptext.style.display = "block";
}


function OnMouseUpHandler(e) {
  const text = getHighlightedText();
  if (text === "") {
    HideText();
    return;
  }
  let deconjd = VerbsConjToInfWrapper(text);
  if (deconjd === "") {
    // verb not found, just attempt with original
    deconjd = text;
  }
  let meanings = MyDictDEENWrapper(deconjd);
  if (meanings === -1) {
    ShowText(e,`${deconjd}: not found`);
    return;
  }
  ShowText(e,`${deconjd}: ${meanings[0][0]} ${meanings[0][1]}`);
  return;
}
window.addEventListener('mouseup',OnMouseUpHandler,false);
tooltiptext.addEventListener('mouseup', (e) => {
  e.stopPropagation();
  // TODO cycle through meanings
},true);


//========================================================
// testing message sending

//window.addEventListener("click", notifyExtension);
//
//function notifyExtension(e) {
//  browser.runtime.sendMessage({ data: "zarudo" });
//};


// TODO: test implement
//https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#connection-based_messaging

// bad doesn't work?
//function handleResponse(message) {
//  console.log(`background script sent a response: ${message.response}`);
//}
//
//function handleError(error) {
//  console.log(`Error: ${error}`);
//}
//
//browser.runtime.sendMessage({ content : "zarudo" })
//  .then(handleResponse, handleError);


//================================================

browser.runtime.onMessage.addListener((request) => {
  dialog.showModal();
  console.log("Message from the background script:");
  console.log(request.tab_title);
  return Promise.resolve({ response: "Hi from content script" });
});


//function TabNotesLongNameToAvoidNamespaceClash() {
//  const dialog = document.createElement("dialog");
//  const openBtn = document.getElementById("open-dialog");
//  const closeBtn = document.getElementById("close-dialog");
//
//  openBtn.addEventListener("click", () => {
//    dialog.showModal();
//    console.log("open button clicked");
//  });
//  closeBtn.addEventListener("click", () => {
//    dialog.close();
//    console.log("close button clicked");
//  });
//}
//
////TabNotesLongNameToAvoidNamespaceClash();


