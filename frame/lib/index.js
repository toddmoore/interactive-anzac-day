import ClassName from './image-fader/helpers/class-name';
import ImageFader from './image-fader/image-fader-ui';

var eventMethod = window.addEventListener ? "addEventListener" :
	"attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function(e) {
	if (e) {
		var hash = JSON.parse(e.data).hash || "";

		// window.currentIndex = hash.split("/")[1] || 0;
		// window.loadCurrentIndex();
	}
}, false);


export default new ImageFader();
