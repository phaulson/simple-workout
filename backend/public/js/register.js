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
            username: "Bitte einen Usernamen eingeben",
            passwordRegister: {
                required: "Bitte ein Passwort eingeben",
                minlength: "Das Passwort muss mind. 5 Zeichen lang sein"
            },
            confirmPassword: {
                required: "Bitte Password bestätigen",
                minlength: "Das Passwort muss mind. 5 Zeichen lang sein",
                equalTo: "Die Passwörter müssen identisch sein"
            }
        }
    });
});