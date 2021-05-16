function toggle_dropdown() {
    var elem = document.getElementById("nav_dropdown");
    var cover = document.getElementById("cover_screen_dropdown");
    if (elem.style.display=="block") {
        elem.style.display="none";
        cover.style.display="none";
    } else {
        elem.style.display="block";
        cover.style.display="block";
    }
}
function toggle_minimizer() {
    var elem_left = document.getElementById("main_div_cell_left");
    var elem_right = document.getElementById("main_div_cell_right");
    var maximizer = document.getElementById("maximizer");
    elem_left.style.display="none";
    maximizer.style.display="block";
    elem_right.style.paddingLeft="16px";
}
function toggle_maximizer() {
    var elem_left = document.getElementById("main_div_cell_left");
    var elem_right = document.getElementById("main_div_cell_right");
    var maximizer = document.getElementById("maximizer");
    elem_left.style.display="table-cell";
    maximizer.style.display="none";
    elem_right.style.paddingLeft="5%";
}
function expand_collapse_item(spanBlock, expandButton) {
    var thisBlock = document.getElementById(spanBlock);
    var thisButton = document.getElementById(expandButton);
    if (thisBlock.style.display=="none") {
        thisBlock.style.display="block";
        thisButton.innerHTML="-";
    } else {
        thisBlock.style.display="none";
        thisButton.innerHTML="+"; 
    }
}
function expandAll() {
    var allElemsSpans = document.getElementsByClassName('left_nav_sub');
    var allElemsButtons = document.getElementsByClassName('menu_expand');
    var i;
    for (i = 0; i < allElemsSpans.length; i++) {
        allElemsSpans[i].style.display="block";
    }
    for (i = 0; i < allElemsButtons.length; i++) {
        allElemsButtons[i].innerHTML="-";
    }
}
function collapseAll() {
    var allElemsSpans = document.getElementsByClassName('left_nav_sub');
    var allElemsButtons = document.getElementsByClassName('menu_expand');
    var i;
    for (i = 0; i < allElemsSpans.length; i++) {
        allElemsSpans[i].style.display="none";
    }
    for (i = 0; i < allElemsButtons.length; i++) {
        allElemsButtons[i].innerHTML="+";
    }
}