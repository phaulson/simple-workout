$(document).ready(function () {
    $('#registerForm').validate({
        rules: {
            username: "required",
            passwordRegister: {
                required: true,
                minlength: 5
            },
            confirmPassword: {
                required: true,
                minlength: 5,
                equalTo: "#passwordRegister"
            }
        },
        messages: {
            username: "Username cannot be empty",
            passwordRegister: {
                required: "Password cannot be empty",
                minlength: "Password must contain at least 5 characters"
            },
            confirmPassword: {
                required: "Please confirm password",
                minlength: "Password must contain at least 5 characters",
                equalTo: "Passwords do not match"
            }
        }
    });
});