define([], function() {
  'use strict';
  return {
    boot: function() {
      var el = document.createElement('iframe');

      var scrollTo_;
      var eventMethod = window.addEventListener ? "addEventListener" :
        "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" :
        "message";
      var s = document.body.firstChild;
      var viewPortTag = document.createElement('meta');

      function addCSS(url) {
        var head = document.querySelector('head');
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', url);
        head.appendChild(link);
      }

      addCSS(
        "http://interactive.guim.co.uk/next-gen/au/2015/mar/anzac-interactive/frame/css/photo.css"
      );

      var body = document.body.innerHTML;
      var close = function() {
        el.style.display = "none";
        document.body.style.backgroundColor = '#FFF';
        window.location.hash = "";
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }

      el.setAttribute('src',
        'http://interactive.guim.co.uk/next-gen/au/2015/mar/anzac-interactive/frame/index.html?anzac'
      );
      el.setAttribute('frameBorder', '0');
      el.setAttribute('scrolling', 'no');
      el.setAttribute('allowfullscreen', 'true');
      el.style.display = "none";
      el.style.width = "100vw";
      el.style.height = "100vh";
      el.style.zIndex = "10000000";
      el.style.position = "fixed";

      s.parentNode.insertBefore(el, s);

      eventer(messageEvent, function(e) {
        if (e.origin == "http://interactive.guim.co.uk") {
          var data = JSON.parse(e.data);
          if (data.type === "navigate") {
            if (data.value == "#close-interactive") {
              close();
              window.scrollTo(0, scrollTo_)
            }
          }
        }

      }, false);

      window.onhashchange = function() {
        el.contentWindow.postMessage(JSON.stringify({
            "hash": window.location.hash
          }),
          "http://interactive.guim.co.uk")
        if (window.location.hash === "#close-interactive") {
          close();
        }
        if (window.location.hash.split("/")[0] === "#show-interactive") {
          scrollTo_ = window.scrollY;
          document.body.style.backgroundColor = '#333';
          el.style.display = "block";
          document.body.style.height = "100vh";
          document.body.style.overflow = "hidden";
        }

      }
    }
  };
});
