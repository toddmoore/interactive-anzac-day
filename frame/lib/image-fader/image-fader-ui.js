import ImageFader from './image-fader'


class ImageFaderUI extends ImageFader {
	constructor() {
		this.total = 0;
		this.currentIndex = 0;
		this.count = document.querySelector('.js-gallery-count');;
		this.index = document.querySelector('.js-gallery-index')

		super();
		// resize listener
		window.addEventListener('resize', (event) => {
			this.handleResize(event)
		});

		// next and previous listener
		document.querySelector('.next').addEventListener('click', (event) => {
			this.handleNext(event)
		});
		document.querySelector('.prev').addEventListener('click', (event) => {
			this.handlePrev(event)
		});
		this.register(this.handleDataSetChanges, this);
	}

	//change the total length and update the UI with totals
	handleDataSetChanges() {
		this.total = this.dataset.length;
		this.count.textContent = this.total;
		this.index.textContent = this.currentIndex +
			1;
		this.handleResize()
	}
	setIndex(increment) {
		this.currentIndex += increment
		return this.index.textContent = this.currentIndex + 1
	}
	handleResize(event) {
		return this.vw = window.innerWidth;
	}
	_transform() {
		this._element.style.transform =
			`translate3d(calc(-${this.vw*this.currentIndex}px + ${3.6*this.currentIndex}rem),0,0)`;
	}
	handleNext(event) {
		if (this.currentIndex != (this.total) - 1) {
			this.setIndex(1)
			this._transform();
		}
	}

	handlePrev(event) {
		if (this.currentIndex != 0) {
			this.setIndex(-1);
			this._transform();
		}
	}


}

export default ImageFaderUI;
