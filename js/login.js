var rank = {
    TOO_SHORT: 0,
    WEAK: 1,
    MEDIUM: 2,
    STRONG: 3,
    VERY_STRONG: 4
};
var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var forms = document;



function validate(isLogin = false) {
    
    
    
  
    if (isLogin) {
        // login
        var email = forms.getElementById('EmailL').value;
        var password = forms.getElementById('passL').value;

        if (!email.match(mailformat)) {
            // Test it...
            document.getElementById("emailErroeSign").innerHTML = "Enter the valid Email";
        }
        else if (password.length < 6) {
            document.getElementById("passworErr").innerHTML = "Enter the valid Password";
        }
        else{
           
            window.location.href="home/index.html";
        }
    } else {
        // signup

        var email = forms.getElementById('Email').value;
        var password = forms.getElementById('pass').value;
        var phone = forms.getElementById('Phone').value;

        if (!email.match(mailformat)) {
            document.getElementById("emailErroeSign").innerHTML = "Enter the valid Email";
        }
       else if (!phone.match(phoneno)) {
          
            document.getElementById("phoneErr").innerHTML = "Enter the valid phone Number";
        }
       else if (password.length < 6) {
            document.getElementById("PasswordRank").innerHTML = "Enter the valid Password";
        }
        else{
            window.location.href="home/index.html";
        }
        
    }

}
// Passwrord 
function passwordRank() {

    var password = forms.getElementById('pass');
    const passresult = document.getElementById('PasswordRank');


    const inputHandler = function (e) {
        var result = rankPassword(password.value),
            labels = ["Too Short", "Weak", "Medium", "Strong", "Very Strong"];
        colour = ['red', 'orangered', 'yellow', 'yellowgreen', 'green']

        passresult.innerHTML = "The Password Strength is " + labels[result];
        passresult.style.color = colour[result]
    }

    password.addEventListener('input', inputHandler);
    password.addEventListener('propertychange', inputHandler);
}

// Password ranker
function rankPassword(password) {

    var upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        special = /[^A-Za-z0-9]/,
        minLength = 8,
        score = 0;

    if (password.length < minLength) {
        return rank.TOO_SHORT; // End early
    }

    // Increment the score for each of these conditions
    if (upper.test(password)) score++;
    if (lower.test(password)) score++;
    if (number.test(password)) score++;
    if (special.test(password)) score++;

    // Penalize if there aren't at least three char types
    if (score < 3) score--;

    if (password.length > minLength) {
        // Increment the score for every 2 chars longer than the minimum
        score += Math.floor((password.length - minLength) / 2);
    }

    // Return a ranking based on the calculated score
    if (score < 3) return rank.WEAK; // score is 2 or lower
    if (score < 4) return rank.MEDIUM; // score is 3
    if (score < 6) return rank.STRONG; // score is 4 or 5
    return rank.VERY_STRONG; // score is 6 or higher
}

