import marquee from 'vanilla-marquee';
import Splide from '@splidejs/splide';
import Header from './modules/header';

window.addEventListener('DOMContentLoaded', () => {
	//header
	new Header();

	//init course marquee;
	let marquees = [...document.querySelectorAll('.marquee')];
	let courseCarousel = document.querySelector('#upcomingCourseSlider');
	if (marquees.length) {
		marquees.forEach((item) => {
			new marquee(item, {
				duplicated: true,
				speed: 100,
				recalcResize: true,
				startVisible: true,
			});
		});
	}

	if (courseCarousel) {
		let upcomingCourseSlider = new Splide('#upcomingCourseSlider', {
			perPage: 4,
			type: 'loop',
			gap: 43,
			pagination: false,
			breakpoints: {
				1600: {
					perPage: 3,
					gap: 20,
				},
				992: {
					perPage: 2,
					gap: 16,
					padding: {
						right: 80,
					},
				},
				660: {
					perPage: 1,
					padding: {
						right: 30,
					},
				},
			},
		});
		upcomingCourseSlider.mount();
	}
});
