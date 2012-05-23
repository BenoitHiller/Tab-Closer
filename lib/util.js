function init(){
  if (!localStorage["init"]) {
    localStorage["matchers"] = '[{"string":"*://www.google.com/*","_regex":false},{"string":"*://www.google.ca/*","_regex":false}]';
    localStorage["window-setting"] = "false";
    localStorage["init"] = "true";
  }
}
