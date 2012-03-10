var tab_closer = function(){};

tab_closer.close_tabs = function(array) {
  if (typeof(array) !== undefined){
    var ids = [];
    for (var i=0; i < array.length; i++) {
      ids[i] = array[i].id;
    };
    chrome.tabs.remove(ids);
    return true;
  }
  else {
    return false;
  }
}

tab_closer.check_window_close_tabs = function(win) {
  init();
  var matchers = localStorage["tab-closer-matchers"].split(",");
  var window_setting = (localStorage["tab-closer-window-setting"] === "true");
  for (var i=0; i < matchers.length; i++){
    // console.log(matchers[i]);
    var query;
    if (window_setting) {
      query = {"url":matchers[i],"windowId":win.id};
    }
    else {
      query = {"url":matchers[i]};
    }
    chrome.tabs.query(query,tab_closer.close_tabs);
  }
}

tab_closer.button_handler = function(tab) {
  chrome.windows.getCurrent(tab_closer.check_window_close_tabs);
}

chrome.browserAction.onClicked.addListener(tab_closer.button_handler);
