$(document).ready(function () {
    $('#loginForm').validate({
        rules: {
            username_email: "required",
            passwordLogin: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            username_email: "Username cannot be empty",
            passwordLogin: {
                required: "Password cannot be empty",
                minlength: "Password must contain at least 5 characters"
            }
        }
    });
});