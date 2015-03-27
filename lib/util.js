function init(){
  if (!localStorage["init"]) {
    if(localStorage["tab-closer-init"]) {
      var oldMatchers = localStorage["tab-closer-matchers"].split(",");
      var newMatchers = []
      oldMatchers.forEach(function(matcher) {
        newMatchers.push({
          "string": matcher,
          "_regex": false
        });
      });
      localStorage["matchers"] = JSON.stringify(newMatchers);
      localStorage["window-setting"] = localStorage["tab-closer-window-setting"];
    } else {
      localStorage["matchers"] = '[{"string":"*://www.google.com/*","_regex":false},{"string":"*://www.google.ca/*","_regex":false}]';
      localStorage["window-setting"] = "false";
    }

    localStorage["init"] = "true";
  }
}
