function init(){
  if (!localStorage["init"]) {
    localStorage["matchers"] = "[]";
    localStorage["window-setting"] = "false";
    localStorage["init"] = "true";
  }
}
