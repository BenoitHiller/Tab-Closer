function MatcherManager(display,div) {
  this._init(display,div);
}

MatcherManager.prototype = {
  _init: function(display,div) {
    this.matchers = [];
    this._display = display;
    if (display) {
      this.add_to_page(div);
    }
  },

  add_to_page: function(div) {
    this._div = document.getElementById(div);
    this._display = true;
  },

  add_matcher: function(object) {
    new_matcher = new Matcher(object);
    this.matchers.push(new_matcher);
    return new_matcher;
  },

  add_matcher_to_page: function(matcher) {
    matcher.add_to_page(this);
  },

  add_to_matchers_div: function(node) {
    this._div.appendChild(node);
  },

  load_matchers: function() {
    var a = JSON.parse(localStorage["matchers"]);
    this.matchers = [];
    if (!a) {
      return;
    }
    for (var i=0; i < a.length; i++) {
      if (this._display) {
        this.add_matcher_to_page(this.add_matcher(a[i]));
      }
      else {
        this.add_matcher(a[i]);
      }
    }
  },

  save_matchers: function() {
    var syntax_error = false;
    var a = [];
    for (var i=0; i < this.matchers.length; i++) {
      if (this.matchers[i].on_page) {
        this.matchers[i].update_fields();
        if (!this.matchers[i].valid()) {
          this.matchers[i].set_error(true);
          syntax_error = true; 
        }
        else {
          this.matchers[i].set_error(false);
        }
      }
      a.push(this.matchers[i].to_json())
    }
    if (syntax_error) {
      return false;
    }
    else {
      localStorage["matchers"] = JSON.stringify(a);
      return true;
    }
  },

  removeMatcher: function(matcher) {
    this._div.removeChild(matcher.matcher_box);
    this.matchers.splice(this.matchers.indexOf(matcher),1);
  }
    
}


function Matcher(string) {
  this._init(string);
}

Matcher.prototype = {
  _init: function(params) {
    if (!params) {
      var params = {}
    }
    this.string = params["string"] || "";
    this._regex = params["_regex"];
    this.on_page = false;
  },

  valid: function() {
    if (this._regex) {
      return true;
    }
    else {
      return this.validate_chrome_matcher();
    }
  },

  update_fields: function() {
    if (this.on_page) {
      this.string = this._text_field.value;
      this._regex = this._regex_input.checked;
    }
  },

  set_error: function(flag) {
    if (this.on_page) {
      if (flag) {
        this.matcher_box.className+=" error";
      }
      else {
        this.matcher_box.className="matcher";
      }
    }
  },

  validate_chrome_matcher: function() {
    return this.chrome_validation_regex.test(this._text_field.value);
  },

  add_to_page: function(manager) {
    this.on_page = true;
    this.create_box_div();
    manager.add_to_matchers_div(this.matcher_box);
    this.create_text_div();
    this.matcher_box.appendChild(this._text_field);
    this.create_delete_button(manager);
    this.matcher_box.appendChild(this._delete_button);
    this.create_options_div();
    this.matcher_box.appendChild(this._regex_box);
  },

  create_options_div: function() {
    this._regex_box = document.createElement("div");
    this._regex_input = document.createElement("input");
    this._regex_input.setAttribute("type","checkbox");
    this._regex_box.appendChild(this._regex_input);
    this._regex_input.checked = this._regex;
    this._regex_box.appendChild(document.createTextNode("Use Regex"));
  },

  create_box_div: function() {
    this.matcher_box = document.createElement("div");
    this.matcher_box.setAttribute("class","matcher");
  },

  create_text_div: function() {
    this._text_field = document.createElement("input");
    this._text_field.setAttribute("type","text");
    this._text_field.setAttribute("value",this.string);
  },

  create_delete_button: function(manager) {
    this._delete_button = document.createElement("button");
    this._delete_button.innerText = "delete";
    var a = this;
    this._delete_button.onclick = function() {
      manager.removeMatcher(a);
    }
  },

  find_all_tabs: function(window_settings,id) {
    var callback = this.regex_close_tabs.bind(this);
    if (window_settings) {
      chrome.tabs.query({"windowId":id},callback)
    }
    else {
      chrome.tabs.query({},callback)
    }
  },

  regex_close_tabs: function(array) {
    if (typeof(array) !== undefined) {
      var ids = [];
      for (var i=0; i < array.length; i++) {
        if (new RegExp(this.string).test(array[i].url)) {
          ids.push(array[i].id);
        }
      };
      chrome.tabs.remove(ids);
      return true;
    }
    else {
      return false;
    }
  },

  find_tabs: function(window_setting,id) {
    var query;
    if (window_setting) {
      query = {"url":this.string,"windowId":id};
    }
    else {
      query = {"url":this.string};
    }
    chrome.tabs.query(query,this.close_tabs);
  },

  close_tabs: function(array) {
    if (typeof(array) !== undefined) {
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
  },

  _to_s: function() {
    return this.string;
  },

  to_json: function() {
    return {'string':this.string,
      '_regex':this._regex
    }
  },

  chrome_validation_regex: /(\*|http|https|ftp|file):\/\/(\*|(\*\.)?[^\/\*\,]+)\/.*/
}
