import { throttle } from './utils';

export default class Header {
	constructor() {
		this.header = document.querySelector('.header');
		this.navbarToggler = document.querySelector('.navbar-toggler');
		this.navbar = document.querySelector('.navbar__nav');
		this.init();
	}

	init() {
		//header
		let _this = this;
		this.navbarToggler.addEventListener('click', function () {
			this.classList.toggle('navbar-toggler--open');
			_this.navbar.classList.toggle('show');
			document.body.classList.toggle('nav-open');
		});

		const headerSticky = () => {
			let currentScroll = window.scrollY;
			if (currentScroll >= 1) {
				_this.header.classList.add('header-sticky');
			} else {
				_this.header.classList.remove('header-sticky');
			}
		};

		Header.scrollHandler(headerSticky);
	}

	static scrollHandler(callback) {
		window.addEventListener('scroll', throttle(callback, 10));
	}
}
