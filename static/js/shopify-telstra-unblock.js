const validateEmail = function(email) {
    console.log(email);
}
const validateDomain = function(domain) {
    console.log(domain);
}

const handleSubmit = function(event) {
    const email = $('.form input.email-input').val();
    const domain = $('.form input.domain-input').val();
    validateEmail(email);
    validateDomain(domain);
    let posting = $.post('/shopify-telstra.php', {
        email: email,
        domain: domain
    });
    posting.done(function(data) {
        window.location.href = './shopify-telstra-success.html';
    });
}

$(function() {
    $('.submit-btn').on('click', handleSubmit)
});
