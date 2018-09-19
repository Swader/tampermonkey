// ==UserScript==
// @name         ACF - Entry price percentage change
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       @bitfalls
// @match        https://altcoinfantasy.com/user_contests/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Start");

    var i, el, ints, boughtCells, currentCells, buyprice, nowprice, change;
    ints = 0;
    setInterval(function(){
    console.log("Interval");
        boughtCells = document.querySelectorAll("#DataTables_Table_1 tbody tr td:nth-child(4)");
        if (ints === 0) {
            for (i = 0; i < boughtCells.length; i++) {boughtCells[i].innerHTML += '<span class="chg"><span>';}
        }
        currentCells = document.querySelectorAll("#DataTables_Table_1 tbody tr td:nth-child(5)");
        for (var i = 0; i < boughtCells.length; i++) {
            buyprice = /\d+\.\d+/g.exec(boughtCells[i].outerText)[0];
            nowprice = /\d+\.\d+/g.exec(currentCells[i].outerText)[0];

            change = 100 - (parseFloat(buyprice) / parseFloat(nowprice)) * 100;
            el = boughtCells[i].querySelector(".chg");
            if (change > 0) {
                el.classList.add("text-success");
                el.classList.remove("text-danger");
            } else {
                el.classList.add("text-danger");
                el.classList.remove("text-success");
            }
            el.innerHTML = change.toFixed(2) + "%";
        }
        ints++;
    }, 10000);
})();
