var localStorage;
var chrome = function(){};
chrome.tabs = function(){};
chrome.windows = function(){};
chrome.tabs.remove = function(array) {
  return array;
};
chrome.browserAction = function(){};
chrome.browserAction.onClicked = function(){};
chrome.browserAction.onClicked.addListener = function(a){return a;};

chrome.tabs.query = function(thing,func) {
  if (!thing.windowId){
    func([{"id":2}]);
  }
  else {
    func([]);
  }
}

chrome.windows.getCurrent = function(func) {
  func({"id":1});
}

describe('Button', function () {
  beforeEach(function () {
    localStorage = {};
    init();
  });

  it('should close tabs',function() {
    expect(tab_closer.close_tabs([{"id":2}])).toEqual(true);
  });

  it('should locate and close tabs', function () {
    spyOn(tab_closer,"close_tabs");
    tab_closer.check_window_close_tabs({"id":2});
    expect(tab_closer.close_tabs).toHaveBeenCalledWith([{"id":2}]);
  });

  it('should respect the close by window setting',function() {
    localStorage["tab-closer-window-setting"] = "true";
    spyOn(tab_closer,"close_tabs");
    tab_closer.check_window_close_tabs({"id":2});
    expect(tab_closer.close_tabs).toHaveBeenCalledWith([]);
  });

});
