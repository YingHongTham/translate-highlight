// downloaded dictionary from
// https://www1.dict.cc/translation_file_request.php
// https://github.com/viorelsfetea/german-verbs-database

console.log(verbsConjToInf["aal"]);

function VerbsConjToInfWrapper(str) {
  if (verbsConjToInf.hasOwnProperty(str)) {
    return verbsConjToInf[str];
  }
  return "";
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


window.onmouseup = (e) => {
  const text = getHighlightedText();
  console.log(`text: ${text}`);
  let converted = VerbsConjToInfWrapper(text);
  if (text === "" || converted === "") {
    HideText();
    return;
  }
  ShowText(e,converted);
  return;
}


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


