import LoadJSON from './helpers/load-json';
import TemplateFullScreen from './template-fullscreen';

class ImageFader {
	constructor() {
		//the video selector
		this.videoSelector = "gdn-video-";

		//store callbacks
		this.store = [];
		// watch this object for changes
		this.dataset = {};

		// main targeted element in the dom
		this._element = document.querySelector("#image-fader-container .inner");

		//key appended to the end ?anzac || ?mothersday
		// TODO: may actually change this
		this._key = window.location.search.slice(1);

		// google spreasheet key
		this.key = "1-k2df5bFJYAu_7kAxDXYf845kQ58vqhYJDJjz32zE7g";

		// load returns a promise
		this.load(
				`http://interactive.guim.co.uk/spreadsheetdata/${this.key}.json`)
			.then((data) => {
				// filter out according to the above key
				this.handleMainDataResponse(data)
			})
			.then(() => {
				// build out the sliders using the template class
				this.buildSliders();
			})
			.then(() => {
				// add the listeners
				this.addListeners();
			}).then(() => {
				this.fireCalls();
			});
	}
	register(cb, context) {
		this.store.push({
			cb: cb,
			context: context
		});

	}
	fireCalls() {
		this.store.forEach((item) => {
			item.cb.call(item.context);
		})
	}

	load(url) {
		return new Promise((resolve, reject) => {
			new LoadJSON(url, (data) => {
				resolve(data);
			}, (err) => {
				resolve(err)
			});
		});
	}

	handleMainDataResponse(data) {
		// filters on fadername column
		//

		// This is dumb. TODO: fix
		var d = data.sheets.Sheet1;
		this.dataset = d.filter(data => data.uniquefadername == this._key);
	}

	buildSliders() {
		// Builds out the sliders using a
		// Template class
		// type is either video || image
		var htmlString = ""
		this.dataset.forEach((item, index) => {
			var template = new TemplateFullScreen(
				item.beforeimage,
				item.afterimage,
				item.posterimage,
				item.alttag,
				item.caption,
				item.credit,
				item.type,
				index
			)
			htmlString += template.template
		});
		this._element.innerHTML = htmlString;
		this._element.style.width = this.dataset.length * 100 + "vw";
	}

	handleImageClick(event) {
		// Basic Handler for image click,
		// adds and removes a class
		event.preventDefault();
		var parent = event.target.parentNode;
		var index = parseInt(parent.getAttribute("rel"));
		var type = this.dataset[index].type;
		var video = undefined;

		// plays the video on click to save CPU computation
		if (type == "video") {
			video = document.getElementById(this.videoSelector + index);
		}

		if (parent.hasClass("on")) {
			parent.removeClass("on");
			setTimeout(function() {
				if (video) {
					video.pause()
				}
			}, 5000)
		} else {
			if (video) {
				video.play()
			}
			parent.addClass("on");
		}

	}

	addListeners() {
		// DOM event function for click event on images
		// Should probably add a touch event too
		// TODO: add touch event on this.
		var images = document.querySelectorAll(".before-image")
		for (var i = 0; i < images.length; i++) {
			images[i].addEventListener("load", (event) => {
				var parent = event.target.parentNode;
				parent.addClass("ready");
			});
			images[i].addEventListener("click", (event) => {
				this.handleImageClick(event);
			});
		}
	}
}

export default ImageFader;
