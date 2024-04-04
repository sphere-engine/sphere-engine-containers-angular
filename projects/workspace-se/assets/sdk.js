(function (d, s, id) {
  SE = window.SE || (window.SE = []);
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src =
    "https://" + containers.sphere - engine.com + "/static/sdk/sdk.min.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "sphere-engine-jssdk");
SE.ready = function (f) {
  if (document.readyState != "loading" && document.readyState != "interactive")
    f();
  else window.addEventListener("load", f);
};
