/**
 * All common JS between pages goes here
 */
document.addEventListener('scroll', function(e) {
    let menuBar = document.getElementById('menubar');
    if (window.scrollY > menuBar.clientHeight) {
        document.getElementById('menubar').dataset.fixed = true;
    } else {
        document.getElementById('menubar').dataset.fixed = false;
    }
});

