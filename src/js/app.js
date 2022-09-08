import marquee from 'vanilla-marquee';
import Splide from '@splidejs/splide';

window.addEventListener('DOMContentLoaded', () => {
	//init course marquee;
	let courseMarquee = document.querySelector('.course__marquee');
	if (courseMarquee) {
		new marquee(courseMarquee, {
			duplicated: true,
			speed: 100,
			recalcResize: true,
			startVisible: true,
		});
	}

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
});
