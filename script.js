// Mobile nav
const burgerMenu = document.querySelector("#burger-menu");
const closeMenu = document.querySelector("#close-menu");
const slider = document.querySelector(".slider-inactive");
const darken = document.querySelector(".darken");

// Button that opens the modal
const backThisProject = document.querySelector("#back-this-project");
const modal = document.querySelector(".modal");

// Button that closes the modal
let closeModalBtn = document.querySelector("#close-modal");

// Modal Thanks
const modalThanks = document.querySelector("#modal-thanks");
const modalThanksButton = document.querySelector("#modal-thanks-button");
const continueButtons = document.querySelectorAll(".continue-button");

// Modal title
const modalOptionTitles = document.querySelectorAll(".is-clickable");

// Bottom section buttons to pop up the modal
const bottomSectionButtons = document.querySelectorAll(
	".bottom-section-button"
);

// Money and Backers
const backers = document.querySelector(".backers");
const money = document.querySelector("#money");
const moneyInputs = document.querySelectorAll(".pledge-input");

const progressBar = document.querySelector(".fg-progress-bar");

// Querries all radio buttons except the disabled one
const radioButtons = document.querySelectorAll(".valid-radio-button");
const modalOptions = document.querySelectorAll(".modal-content .option");

// Bookmark
const bookmarkContainer = document.querySelector(".bookmark");
const bookmarkButton = bookmarkContainer.querySelector("#image-bookmark");
const bookmarkText = bookmarkContainer.querySelector("#bookmark-text");

// Toggle nav on mobile
burgerMenu.addEventListener("click", () => toggleNav());
closeMenu.addEventListener("click", () => toggleNav());

function toggleNav() {
	slider.classList.toggle("slider-active");
	slider.classList.toggle("slider-inactive");
	darken.classList.toggle("darken-active");
	burgerMenu.classList.toggle("hidden");
	closeMenu.classList.toggle("hidden");
}

// Open and close modal with options
backThisProject.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

function openModal() {
	modal.style.display = "block";
	document.body.classList.add("bg-not-scrollable");
}

function closeModal() {
	modal.style.display = "none";
	document.body.classList.remove("bg-not-scrollable");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		document.body.classList.remove("bg-not-scrollable");
	}
};

radioButtons.forEach((radioButton) => {
	radioButton.addEventListener("change", () => {
		checkAndRemoveFocus();
		focusOption(radioButton.value);
	});
});

modalOptionTitles.forEach((title, index) => {
	title.addEventListener("click", () => {
		checkAndRemoveFocus();
		focusOption(index);
		radioButtons[index].checked = "true";
	});
});

bottomSectionButtons.forEach((button, index) => {
	button.addEventListener("click", () => {
		checkAndRemoveFocus();
		openModal();
		// There is an extra option at the top of the modal, hence the + 1
		focusOption(index + 1);
		radioButtons[index + 1].checked = "true";
	});
});

function focusOption(index) {
	modalOptions[index].classList.add("focused");
}
function checkAndRemoveFocus() {
	modalOptions.forEach((modalOption) => {
		if (modalOption.classList.contains("focused")) {
			modalOption.classList.remove("focused");
		}
	});
}

continueButtons.forEach((continueButton, index) => {
	continueButton.addEventListener("click", (e) => {
		e.preventDefault();
		checkAndRemoveFocus();
		closeModal();
		openThanksModal();
		// Updates money backed, backers and progress bar on submition
		updatePool(index);
	});
});

modalThanksButton.addEventListener("click", closeThanksModal);

function openThanksModal() {
	modalThanks.style.display = "block";
}

function closeThanksModal() {
	modalThanks.style.display = "none";
}
function updatePool(index) {
	const value = moneyInputs[index].value;
	if (value) {
		addMoneyToPool(value);
		addBacker();
	}
}

function addMoneyToPool(value) {
	let moneyNumber = parseInt(money.textContent.split(",").join(""));
	const valueInt = parseInt(value);
	// Add current money backed to the value from the user input
	moneyNumber += valueInt;
	console.log(moneyNumber);

	//Update progressBar to the latest value
	updateProgressBar(moneyNumber);

	// Updates innerText to new number with commas
	money.textContent = moneyNumber.toLocaleString();
}
function addBacker() {
	let backersNumber = parseInt(backers.textContent.split(",").join(""));
	backersNumber++;

	backers.textContent = backersNumber.toLocaleString();
}
function updateProgressBar(value) {
	const percentage = value / 1000;
	progressBar.style.width = `${percentage}%`;
}

bookmarkContainer.addEventListener("click", toggleBookmark);

function toggleBookmark() {
	if (window.innerWidth > 800) {
		isBookmarked = bookmarkButton.src.includes("bookmarked");
		if (!isBookmarked) {
			bookmarkButton.src = "./images/icon-bookmarked.svg";
			bookmarkText.style.color = "hsl(176, 72%, 28%)";
			bookmarkText.textContent = "Bookmarked";
			bookmarkContainer.style.backgroundColor = "hsl(176, 50%, 97%)";
		} else {
			bookmarkButton.src = "./images/icon-bookmark.svg";
			bookmarkText.style.color = "hsl(0, 0%, 48%)";
			bookmarkText.textContent = "Bookmark";
			bookmarkContainer.style.backgroundColor = "rgb(243, 243, 243)";
		}
	}
}
