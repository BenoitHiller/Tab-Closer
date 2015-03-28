function notify(text) {
  var notification = document.getElementById("notifications");
  notification.innerText = text;
  notification.style.display = "block";
}

function save_settings(manager) {
  var syntax_error = false;
  var options = document.getElementById("matchers");
  var window_setting = document.getElementById("windowSetting");
  var regex_setting = document.getElementById("regexSetting");
  syntax_error = manager.save_matchers();
  if (!syntax_error) {
    notify("Could not save settings! There are errors in your matchers.");
  }
  else {
    localStorage["window-setting"] = window_setting.checked; 
    if (manager) {
      notify("Settings saved successfully."); 
    }
    else {
      notify("Settings saved but there are no matchers so it probably won't do anything.");
    }
  }
}

function load_matchers(manager) {
  init();
  if (localStorage["window-setting"] === "true") {
    document.getElementById("windowSetting").checked = true;
  }
  manager.load_matchers();
}

var pageManager = new MatcherManager(false);

function setup(manager) {
  manager.add_to_page('matchers');
  load_matchers(manager);
}

function toggle_help(id) {
  var divs = document.getElementById("switcher").children;
  var open_after;
  for (i=0;i< divs.length; i++) {
    if (divs[i].id == id) {
      open_after = i;
    }
    divs[i].style.display = "none";
  }
  divs[open_after].style.display = "";
}
document.addEventListener('DOMContentLoaded', function () {
  setup(pageManager);
  document.querySelector("#add_matcher").addEventListener("click", pageManager.create_matcher_and_add_to_page.bind(pageManager));
  document.querySelector("#save_matchers").addEventListener("click",save_settings.bind(this,pageManager));
});
