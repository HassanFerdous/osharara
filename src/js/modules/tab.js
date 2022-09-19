export default class TabMenu {
	constructor(config = {}) {
		this.config = config;
		this.buttons = $(config.item);
		this.content = $(config.content);
		this.defaultOpenIndex = this.config.defaultOpenIndex ? this.config.defaultOpenIndex : 0;
		this.event();
	}

	event() {
		//default open
		let defaultBtn = this.buttons[this.defaultOpenIndex];
		let defaultContent = this.content[this.defaultOpenIndex];
		this.defaultOpen(defaultBtn, defaultContent);

		//change-tab link
		$(this.buttons).on('click', (e) => {
			e.preventDefault();
			let currBtn = $(e.currentTarget);
			let dataId = $(currBtn).attr('href').replace('#', '');
			let activeBtn = currBtn.parent().siblings().find(this.config.item).hasClass(this.config.activeClass);
			if (activeBtn) {
				currBtn.parent().siblings().find(this.config.item).removeClass(this.config.activeClass);
				currBtn.addClass(this.config.activeClass);
				this.openContent(dataId);
				return;
			}
			currBtn.addClass(this.config.activeClass);
		});
	}

	//change-tab content
	openContent(dataId) {
		$(this.content).each((idx, content) => {
			if ($(content).data('id') === dataId) {
				$(content).show(0).addClass('active');
				return;
			}
			$(content).hide(0).removeClass('active');
		});
	}

	//default-open
	defaultOpen(defaultBtn, defaultContent) {
		if (defaultBtn && defaultContent) {
			$(defaultBtn).addClass(this.config.activeClass);
			$(defaultContent).show(0);
		}
	}
}

// new TabMenu({
//     item: 'item-selector',
//     content: 'content-selector',
//     activeClass: 'active class',
//     defaultOpenIndex: 'default open tab index(number)',
// });
