var IMAGE_FADER = IMAGE_FADER || {};

var eventMethod = window.addEventListener ? "addEventListener" :
	"attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function(e) {
	if (e) {
		var hash = JSON.parse(e.data).hash || "";
		window.currentIndex = hash.split("/")[1] || 0;
		window.loadCurrentIndex();
	}
}, false);

if (!Array.indexOf) { // IE fix
	Array.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
}

window.mobilecheck = function() {
	var check = false;
	(function(a, b) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
			.test(a) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
			.test(a.substr(0, 4))) check = true
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

var beforeImage, afterImage, mouseDown = false,
	fadeTime = 2.5,
	mouseMove = false,
	startMouseX = 0,
	lastFade = 0,
	firstImage = true,
	tweens, currentFaderIndex = 0;

var _isNextGen = true;

var _element = "#image-fader-container .inner";
var _context = window;

var _flag = false;

var _key = window.location.search.slice(1);


IMAGE_FADER.App = function() {

	"use strict";

	IMAGE_FADER.load();

};

IMAGE_FADER.load = function() {

	var key = "1-k2df5bFJYAu_7kAxDXYf845kQ58vqhYJDJjz32zE7g";
	var url;

	try {

		url = "http://interactive.guim.co.uk/spreadsheetdata/" + key + ".json";

		jQ.getJSON(url, function(data) {

			IMAGE_FADER.handleMainDataResponse(data);

		});

	} catch (e) {

		url = "http://interactive.guim.co.uk/spreadsheetdata/" + key + ".jsonp";

		jQ.ajax({
			type: 'get',
			dataType: 'jsonp',
			url: url,
			jsonpCallback: 'gsS3Callback',
			cache: true
		});

	}

};

window.gsS3Callback = function(data) {

	IMAGE_FADER.handleMainDataResponse(data);

};


IMAGE_FADER.handleMainDataResponse = function(data) {

	var dataset = [],
		d = data.sheets.Sheet1;

	for (var i = 0; i < d.length; i++) {

		if (d[i].uniquefadername == _key) {
			dataset.push(d[i]);
		}

	}

	IMAGE_FADER.buildSliders(dataset);

	IMAGE_FADER.addListeners();

	//var h = jQ(_element).height();

	//jQ("body").css({"minHeight" : h});

};



IMAGE_FADER.arrayObjectIndexOf = function(myArray, searchTerm, property) {
	for (var i = 0, len = myArray.length; i < len; i++) {
		if (myArray[i][property] === searchTerm)
			return i;
	}
	return -1;
};


IMAGE_FADER.buildSliders = function(data) {

	var i, faders = [],
		beforeImage, afterImage, caption, credit, htmlString = '';


	for (i = 0; i < data.length; i++) {
		beforeImage = data[i].beforeimage;
		afterImage = data[i].afterimage;
		posterImage = data[i].posterimage;
		altTag = data[i].alttag;
		caption = data[i].caption;
		credit = data[i].credit;

		if (mobilecheck()) {
			if (data[i].type == "video") {
				htmlString +=
					'<div class="gdn-slider-item"><div class="gdn-fader-slider" style="cursor:pointer;position:relative;" ><img  class="before-image" src="' +
					beforeImage + '" alt="' + altTag +
					'" style="width:100vw;position:relative;top:0px;left:0px;" /><img class="after-image" src="' +
					posterImage + '" alt="' + altTag +
					'" style="width:100vw;position:absolute;top:0px;left:0px;" /><div class="interact-icon"><img src="images/interact_icon.svg"></div></div></div>';
			} else {
				htmlString +=
					'<div class="gdn-slider-item"><div class="gdn-fader-slider" style="cursor:pointer;position:relative;" ><img  class="before-image" src="' +
					beforeImage + '" alt="' + altTag +
					'" style="width:100vw;position:relative;top:0px;left:0px;" /><img class="after-image" src="' +
					afterImage + '" alt="' + altTag +
					'" style="width:100vw;position:absolute;top:0px;left:0px;" /><div class="interact-icon"><img src="images/interact_icon.svg"></div></div></div>';
			}
		} else {
			if (data[i].type == "video") {
				htmlString +=
					'<div class="gdn-slider-item"><div class="gdn-fader-slider" style="cursor:pointer;position:relative;" ><img  class="before-image" src="' +
					beforeImage + '" alt="' + altTag +
					'" style="width:100vw;position:relative;top:0px;left:0px;" /><video poster="' +
					posterImage +
					'" preload class="after-image" style="width:100vw;position:absolute;top:0px;left:0px;" src="' +
					afterImage +
					'" autoplay loop ></video><div class="interact-icon"><img src="images/interact_icon.svg"></div></div></div>';
			} else {
				htmlString +=
					'<div class="gdn-slider-item"><div class="gdn-fader-slider" style="cursor:pointer;position:relative;" ><img  class="before-image" src="' +
					beforeImage + '" alt="' + altTag +
					'" style="width:100vw;position:relative;top:0px;left:0px;" /><img class="after-image" src="' +
					afterImage + '" alt="' + altTag +
					'" style="width:100vw;position:absolute;top:0px;left:0px;" /><div class="interact-icon"><img src="images/interact_icon.svg"></div></div></div>';
			}

		}
	}

	window.sliderData = data;
	window.totalLength = data.length;
	window.settotals();

	jQ(_element).css("width", data.length * 100 + "vw");
	jQ(_element).html(htmlString);
	if (!_isNextGen) {

		jQ(_element).find('.caption').css({
			"font-size": "14px",
			"padding-top": "10px",
			"line-height": "1.25"
		});

		jQ(_element).find('.credit').css({
			"font-size": "12px",
			"line-height": "1.357",
			"color": "#999999",
			"padding-bottom": "25px"
		});

	} else {

		var creditHtml = jQ(_element).find('.credit').html();

		jQ(_element).find('.caption').append(" " + creditHtml).css({
			"padding-bottom": "25px"
		});

		jQ(_element).find('.credit').hide();
		setTimeout(function() {
			//jQ(".before-image").css("opacity", 1);
		}, 2000);

	}


	tweens = [];

	var ind, tween;

	jQ(_element).find('.gdn-fader-slider').each(function(index, value) {

		var slider = this;

		jQ(slider).attr('id', 'gdn-fader-slider_' + index);

		ind = index * 2;

		beforeImage = jQ(".before-image", slider);
		afterImage = jQ(".after-image", slider);

		jQ('#gdn-fader-slider_' + index + ' .before-image').on('load',
			function(event) {
				jQ('#gdn-fader-slider_' + index + ' .interact-icon').css(
					"opacity", 1);
			});

		tween = TweenMax.from(afterImage, fadeTime, {
			css: {
				autoAlpha: 0
			},
			yoyo: true,
			repeat: -1,
			onRepeat: IMAGE_FADER.repeatListener,
			onRepeatParams: [index],
			ease: Quad.easeInOut
		});

		tweens.push(tween);

		tween.pause();

	});

};


IMAGE_FADER.addListeners = function() {
	//tween.seek(0.5);

	jQ(_element).find('.gdn-fader-slider img').on('dragstart', function(event) {
		event.preventDefault();
	});



	jQ(_element).find('.gdn-fader-slider').bind('mousedown touchstart',
		function(event) {

			event.preventDefault();

			if (!_flag) {
				_flag = true;
				setTimeout(function() {
					_flag = false;
				}, 100);



				var offset = jQ(this).offset();

				var div = this;
				var splitArr = div.id.split("_");
				var index = Number(splitArr[1]);

				currentFaderIndex = index;

				startMouseX = event.originalEvent.clientX - offset.left;

				mouseDown = true;
				var ratio = tweens[index].ratio;
				if (ratio < 0.5) {
					firstImage = true;
				} else {
					firstImage = false;
				}

			}

			return false;

		});

	jQ(_element).find('.gdn-fader-slider').bind('pointermove', function(event) {

		event.preventDefault();

		if (mouseDown) {



			var div = this;
			var splitArr = div.id.split("_");
			var index = Number(splitArr[1]);

			var offset = jQ(this).offset();
			var relX;

			relX = event.originalEvent.clientX - offset.left;

			var faderWidth = jQ(this).width();

			var change;
			//var relY = event.pageY - offset.top;
			if (startMouseX < (faderWidth / 2)) {
				change = relX / faderWidth;
			} else {
				change = (faderWidth - relX) / faderWidth;
			}

			if (!firstImage) {
				change = 1 - change;
			}

			var gotoTime = change * fadeTime;

			tweens[index].pause();
			tweens[index].seek(gotoTime);
		}

	});



	jQ(_context).bind('mouseup touchend', function(event) {

		mouseDown = false;

		var targ = event.originalEvent.target.className;

		if (targ == "after-image" || targ == "before-image") {

			var ratio = tweens[currentFaderIndex].ratio;

			if (ratio > 0.5 && ratio < 0.99) {
				tweens[currentFaderIndex].seek(fadeTime);

			} else if (ratio <= 0.5 && ratio > 0.01) {
				tweens[currentFaderIndex].seek(0);

			} else {
				jQ("#gdn-fader-slider_" + currentIndex).find(".interact-icon").css(
					"opacity", 0);
				tweens[currentFaderIndex].resume();
			}

		}

		// if (targ == "before-image"){
		// 		jQ("#gdn-fader-slider_" + currentIndex).find(".interact-icon").css("opacity", 0);
		// }else{
		// 	setTimeout(function(){
		// 		jQ("#gdn-fader-slider_" + currentIndex).find(".interact-icon").css("opacity", 1);
		// 	}, 2000);
		// }



	});

	jQ(window).load(function() {

		var h = jQ(_element).innerHeight();

		iframeMessenger.resize(h);

	});

};


IMAGE_FADER.repeatListener = function(index) {
	tweens[index].pause();
}
