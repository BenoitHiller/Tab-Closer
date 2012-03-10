function init(){
  if (!localStorage["tab-close-init"]) {
    localStorage["tab-closer-matchers"] = "*://www.google.com/*,*://www.google.ca/*";
    localStorage["tab-closer-window-setting"] = "false";
    localStorage["tab-close-init"] = "true";
  }
}
