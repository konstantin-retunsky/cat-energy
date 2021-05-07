document.addEventListener("DOMContentLoaded", function (event) {
	let btnToggle = document.querySelector(".header__toggle-nav");
	let pageNavList = document.querySelector(".navigation__list");
	let pageNavItems = document.querySelectorAll(".navigation__list-item a");

	if (pageNavList && pageNavList && pageNavItems) {
		btnToggle.addEventListener("click", () => {
			if (pageNavList.classList.toggle("navigation__list--active")) {
				btnToggle.attributes["aria-label"].value = "Закрыть меню";
				pageNavItems.forEach((el) => (el.tabIndex = 0));
			} else {
				btnToggle.attributes["aria-label"].value = "Открыть меню";
				pageNavItems.forEach((el) => (el.tabIndex = -1));
			}
		});
	}

	const navLine = document.querySelector(".navigation__line");
	const navItems = document.querySelectorAll(".navigation__link");
	let lastActive = document.querySelector(".navigation__link--active");

	if (navLine && navItems) {
		function changePositionLine(width, left) {
			if (window.innerWidth > 768) {
				navLine.style.width = `${width}px`;
				navLine.style.left = `${left}px`;
			}
		}

		setTimeout(() => {
			changePositionLine(lastActive.offsetWidth, lastActive.offsetLeft);
		}, 1000);

		navItems.forEach((navItem) => {
			navItem.addEventListener("mouseenter", (e) => {
				changePositionLine(
					e.currentTarget.offsetWidth,
					e.currentTarget.offsetLeft
				);
			});

			navItem.addEventListener("mouseleave", () => {
				changePositionLine(lastActive.offsetWidth, lastActive.offsetLeft);
			});

			navItem.addEventListener("focus", (e) => {
				changePositionLine(
					e.currentTarget.offsetWidth,
					e.currentTarget.offsetLeft
				);
			});

			navItem.addEventListener("click", (e) => {
				lastActive.classList.toggle(".navigation__link--active");
				lastActive = e.currentTarget;
				lastActive.classList.toggle(".navigation__link--active");
			});
		});
	}
});
