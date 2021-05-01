
document.addEventListener("DOMContentLoaded", function (event) {
	document.querySelectorAll(".burger-ico").forEach((burger) =>
		burger.addEventListener("click", function (eBurger) {
			this.querySelector("span")
				? this.querySelector("span").classList.toggle("burger-ico--active")
				: false
		})
	)
})
