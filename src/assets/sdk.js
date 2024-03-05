(function (d, s, id) {
  SE_BASE = "containers.sphere-engine.com";
  SE_HTTPS = true;
  SE = window.SE || (window.SE = []);
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src =
    (SE_HTTPS ? "https" : "http") + "://" + SE_BASE + "/static/sdk/sdk.min.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "sphere-engine-jssdk");
SE.ready = function (f) {
  if (document.readyState != "loading" && document.readyState != "interactive")
    f();
  else window.addEventListener("load", f);
};
