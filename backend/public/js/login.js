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
            username_email: "Bitte einen Usernamen eingeben",
            passwordLogin: {
                required: "Bitte ein Passwort eingeben",
                minlength: "Das Passwort muss mind. 5 Zeichen lang sein"
            }
        }
    });
});