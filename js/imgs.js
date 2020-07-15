    (function () {
        "use strict";

        for (var e = "", t = (document.getElementById("loader"), document.getElementById("imgTotal")), n = document.getElementById("alts"), a = document.getElementById("down"), l = document.getElementById("kclose"), s = document.getElementById("prevImg"), c = document.getElementById("nextImg"), o = document.getElementById("imgShow"), i = document.getElementsByClassName("imgDiv"), d = [], r = 0, m = i.length; r < m; r++) {
            for (var g = 0, u = i[r].getElementsByTagName("img").length; g < u; g++) {
                d.push(i[r].getElementsByTagName("img")[g]);
            }
        }

        var y = 0;
        var p = d[y];
        var E = new Image(),
            v = [];

        for (r = 0; r < d.length; r++) {
            v.push(d[r]), d[r].addEventListener("click", f, !1); // jshint ignore:line
        }

        function f(e) {
            e.preventDefault(), o.style.display = "block", y = v.indexOf(e.target), y += 1, h(); // jshint ignore:line
        }

        function h() {
            var l = (p = d[y - 1]).src.replace(/^.*[\\\/]/, "").replace(/\D/g, "");
            var i = "svg" === p.src.split(".").pop() ? p.src : "photo/" + l + ".jpg";
            E.src = "", loader.style.display = "block", o.appendChild(E), e = d[y - 1].getAttribute("alt"), n.innerText = e || "No alt attribute in image", E.src = i, t.innerText = y + "/" + d.length, E.alt = e, E.className = "bg", a.href = i, a.setAttribute("target", "_blank"), a.download = i, d.length === y ? c.style.display = "none" : c.style.display = "block", s.style.display = 1 === y ? "none" : "block"; // jshint ignore:line
        }

        c.addEventListener("click", function () {
            return y < v.length && (y += 1, h()), !1;
        });
        s.addEventListener("click", function () {
            return y > 1 && (y -= 1, h()), !1;
        });
        l.addEventListener("click", function () {
            o.style.display = "none";
        });
        document.onkeydown = function (e) {
            switch ((e = e || window.event).keyCode) {
                case 37:
                    y > 1 && (y -= 1, h()); // jshint ignore:line
                    break;

                case 39:
                    y < v.length && (y += 1, h()); // jshint ignore:line
                    break;

                case 27:
                    o.style.display = "none";
            }
        };
        E.onload = function () {
            loader.style.display = "none";
        };

        var LOADER = document.getElementsByClassName("loader")[0];
        var ALLC = document.getElementsByClassName("allcontainer")[0]; //get all container in oldscoolway

        var STOP = ALLC.getElementsByClassName("pbtn")[0];
        var ALIM = ALLC.getElementsByTagName("img"); //get all images in ALLC container

        var CONI = ALIM.length, ind = 0, tim = 0, cou = 0;

        for (var x = 0; x < CONI; ++x) {
            if (ALIM[x].complete) incrementcou();
            else ALIM[x].addEventListener('load', incrementcou, false);
        }

        function incrementcou() {
            if (++cou === CONI) {
                LOADER.style.display = "none";
                ALIM[0].parentElement.classList.add("actim");
            }
        }

        function setIs() {
            btn();
            tim = setTimeout(setIs, 1000);
        }

        function buttons(e) {
            if (e.target.classList.contains("pbtn")) {
                STOP.classList.remove("acts");
                if (tim) {
                    clearTimeout(tim);
                    tim = 0;
                } else {
                    return setIs();
                }
            }
            if (e.target.classList.contains("lbtn")) btn();
            if (e.target.classList.contains("rbtn")) btn(1);
            clearTimeout(tim); tim = 0;
            STOP.classList.add("acts");
        }

        function btn(k) {
            ALIM[ind].parentElement.classList.remove("actim");
            ind = k ? (ind - 1 + CONI) % CONI : (ind + 1) % CONI;
            ALIM[ind].parentElement.classList.add("actim");
        }

        ALLC.addEventListener("click", buttons);

    })();