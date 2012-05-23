var manager = new MatcherManager(false);

check_window_close_tabs = function(win) {
  init();
  manager.load_matchers();
  // var matchers = localStorage["tab-closer-matchers"].split(",");
  var window_setting = (localStorage["window-setting"] === "true");
  for (var i=0; i < manager.matchers.length; i++){
    if (manager.matchers[i]._regex) {
      manager.matchers[i].find_all_tabs(window_setting,win.id);
    }
    else {
      manager.matchers[i].find_tabs(window_setting,win.id);
    }
  }
}

check_window_regex_tabs = function(win) {
  var window_setting = (localStorage["window-setting"] === "true");
  this.find_all_tabs(window_setting, win.id);
}

button_handler = function(tab) {
  chrome.windows.getCurrent(check_window_close_tabs);
}

omnibox_handler = function(string) {
  var matcher = new Matcher({'string':string});
  var callback = check_window_regex_tabs.bind(matcher);
  chrome.windows.getCurrent(callback);
}

chrome.browserAction.onClicked.addListener(button_handler);
chrome.omnibox.onInputEntered.addListener(omnibox_handler);
