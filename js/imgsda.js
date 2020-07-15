/*jshint esversion: 6 */
(function () {
	"use strict";
	var texts = "";
	var spiner = document.getElementById("loader");
	var imgTotal = document.getElementById("imgTotal");
	var alts = document.getElementById("alts");
	var down = document.getElementById("down");
	var closes = document.getElementById("kclose");
	var prevImg = document.getElementById("prevImg");
	var nextImg = document.getElementById("nextImg");
	var imagesShow = document.getElementById("imgShow");
	var imagesDiv = document.getElementsByClassName("imgDiv");
	var elements = [...imagesDiv].flatMap(e => [...e.getElementsByTagName("img")]);
	var imgIndex = 0;
	let elema = elements[imgIndex];
	var img = new Image();
	var arr = [];
	for (var i = 0; i < elements.length; i++) {
		arr.push(elements[i]);
		elements[i].addEventListener("click", redirect, false);
	}

	function redirect(event) {
		event.preventDefault();
		imagesShow.style.display = "block";
		imgIndex = arr.indexOf(event.target);
		imgIndex += 1;
		indexer();
	}

	function indexer() {
		elema = elements[imgIndex - 1];
		var filename = elema.src.replace(/^.*[\\\/]/, '').replace(/\D/g, "");
		let source = (elema.src.split('.').pop() === "svg") ? elema.src : "photo/" + filename + ".jpg";
		img.src = "";
		loader.style.display = "block";
		imagesShow.appendChild(img);
		texts = elements[imgIndex - 1].getAttribute('alt');
		alts.innerText = texts || "No alt attribute in image";
		img.src = source;
		imgTotal.innerText = imgIndex + "/" + elements.length;
		img.alt = texts;
		img.className = "bg";
		down.href = source;
		down.setAttribute("target", "_blank");
		down.download = source;
		if (elements.length === imgIndex) {
			nextImg.style.display = "none";
		} else {
			nextImg.style.display = "block";
		}

		if (imgIndex === 1) {
			prevImg.style.display = "none";
		} else {
			prevImg.style.display = "block";
		}

	}
	nextImg.addEventListener("click", function () {

		if (imgIndex < arr.length) {
			imgIndex += 1;
			indexer();
		}
		return false;
	});

	prevImg.addEventListener("click", function () {

		if (imgIndex > 1) {
			imgIndex -= 1;
			indexer();
		}
		return false;
	});
	closes.addEventListener("click", function () {
		imagesShow.style.display = "none";
	});

	function checkKey(e) {
		e = e || window.event;
		switch (e.keyCode) {
			case 37:
				if (imgIndex > 1) {
					imgIndex -= 1;
					indexer();
				}
				break;
			case 39:
				if (imgIndex < arr.length) {
					imgIndex += 1;
					indexer();
				}
				break;
			case 27:
				imagesShow.style.display = "none";
				break;
		}
	}
	document.onkeydown = checkKey;

	function imgLoaded() {
		loader.style.display = "none";
	}
	img.onload = imgLoaded;

	document.addEventListener("DOMContentLoaded", () => {
		const HIDE = document.querySelector(".conhide");
		const ALLC = document.querySelector(".allcontainer");
		const ALIM = ALLC.querySelectorAll("img");
		const STOP = ALLC.querySelector(".pbtn");
		const CONI = ALIM.length;
		let ind = 0;
		let tim = 0;
		let cou = 0;

		[].forEach.call([...ALIM], function (img) {
			if (img.complete) incrementcou();
			else img.addEventListener('load', incrementcou, false);
		});

		function incrementcou() {
			cou++;
			if (cou === CONI) {
				HIDE.style.display = "none";
			}
		}

		function setIs() {
			btn();
			tim = setTimeout(setIs, 4000);
		}

		setIs();
		ALLC.addEventListener("click", buttons);

		function buttons(e) {
			if (e.target.classList.contains("pbtn")) {
				tim
					?
					(clearTimeout(tim), (tim = 0), STOP.classList.add("act")) :
					(setIs(), STOP.classList.remove("act"));
			} else {
				clearTimeout(tim), (tim = 0);
			}

			if (e.target.classList.contains("lbtn"))
				btn(), STOP.classList.add("act");
			if (e.target.classList.contains("rbtn"))
				btn(1), STOP.classList.add("act");
		}

		function btn(k) {
			ALIM[ind].classList.remove("act");
			ind = k ? (ind - 1 + CONI) % CONI : (ind + 1) % CONI;
			ALIM[ind].classList.add("act");
		}
	});
})();