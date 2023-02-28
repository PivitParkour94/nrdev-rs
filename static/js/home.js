/**
 * Home page specific js here
 */

const OFFLINE_REASON = 0;
const UPDATE_REASON = 1;

document.addEventListener('DOMContentLoaded', (event) => {
    initialise();
});

function initialise() {


    let offlineBtn = document.getElementById('offline-button');
    if (!offlineBtn) {
        console.error('missing offline button');
    }
    let updateBtn = document.getElementById('update-button');
    if (!updateBtn) {
        console.error('missing update button');
    }
    let form = document.getElementById('update-button');
    if (!updateBtn) {
        console.error('missing update button');
    }

    offlineBtn.addEventListener('click', (elem) => {
        scrollToForm();
        selectReason(OFFLINE_REASON);
        // let reasons = document.getElementsByName('reason');
        // reasons.forEach((reason) => {
        //     reason.value = OFFLINE_REASON;
        // });
    });
    
    updateBtn.addEventListener('click', (elem) => {
        scrollToForm();
        selectReason(UPDATE_REASON);
        // let reasons = document.getElementsByName('reason');
        // reasons.forEach((reason) => {
        //     reason.value = UPDATE_REASON;
        // });
    });
    
    let reasonSelector = document.getElementsByClassName('reason-ul')[0];

    let reasons = Array.from(reasonSelector.getElementsByTagName('li'));
    reasons.forEach((reason) => {
        reason.addEventListener('click', handleSelectReason);
    });

    animatePopWord();

    expandMenu = function(event) {
        alert('expand the expander');
    }
        
}

function handleSelectReason(event) {
    let elem = event.target;
    selectReason(elem.dataset.value);
}

/**
 * Scroll to the request form
 * @returns 
 */
function scrollToForm() {
    let form = document.getElementById('request-form');
    if (!form) {
        console.error('missing request form');
        return;
    }
    var scrollDiv = document.getElementsByClassName("help-request")[0].offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
}

/**
 * Select a reason
 * @param {*} number 
 */
function selectReason(number) {
    let reasonSelector = document.getElementsByClassName('reason-ul')[0];

    let reasons = Array.from(reasonSelector.getElementsByTagName('li'));
    reasons.forEach((reason) => {
        reason.dataset.selected = false;
    });

    reasons.forEach((reason) => {
        if (reason.dataset.value == number) {
            reason.dataset.selected = true;
        }
    });

    document.getElementById('reason-input').value = number;
}

/**
 * Animate the typing of pop words
 * @returns 
 */
function animatePopWord() {
    let popWordSpan = document.getElementById('pop-word');
    if (!popWordSpan) {
        return;
    }

    // popWordSpan.style.width = 'inherit';

    setTimeout(function() {
        window.POP_WORD_INDEX = 2;
        triggerNextWord();
        typeWriter();
    }, 5000);
}

/**
 * Trigger next word
 */
function triggerNextWord() {
    let popWords = [
        'get',
        'survive',
        'thrive',
        'get noticed',
        'sell your products',
        'reach new audiences',
        'stand out'
    ];
    document.getElementById('pop-word').innerHTML = '';
    window.CURRENT_ANIMATED_LETTER = 0;
    window.POP_WORD_INDEX++;
    if (window.POP_WORD_INDEX > popWords.length - 1) {
        // infinite loop words
        window.POP_WORD_INDEX = 0;
    }
    window.WORD_TO_ANIMATE = popWords[window.POP_WORD_INDEX];    
}

function typeWriter() {
    if (window.CURRENT_ANIMATED_LETTER < WORD_TO_ANIMATE.length) {
        document.getElementById('pop-word').innerHTML += WORD_TO_ANIMATE.charAt(CURRENT_ANIMATED_LETTER);
        window.CURRENT_ANIMATED_LETTER++;
        setTimeout(typeWriter, 85);
        return;
    }
    setTimeout(function() {
        triggerNextWord();
        typeWriter();
    }, 5000);
}