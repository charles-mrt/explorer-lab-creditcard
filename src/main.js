import "./css/index.css"

const creditCardBGColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const creditCardBGColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img");


function setCardType(type) {
    const colors = {
        visa: ["#36dd99", "#2d57f2"],
        mastercard: ["#df6f29", "#c69347"],
        default: ["#000000", "#525252"]
    }


    creditCardBGColor01.setAttribute('fill', colors[type][0]);
    creditCardBGColor01.setAttribute('fill', colors[type][1]);
    creditCardLogo.setAttribute('src', `cc-${type}.svg`)

}
setCardType("mastercard")

function cardVerificationCode() {
    const idSecurityCode = document.getElementById('security-code');
    const creditcard = document.querySelector(".cc");
    const creditcardFields = document.querySelector(".cc-field");

    const ccSecurityTyped = document.querySelector(".cc-security .value");
    const backOfCreditcard = document.querySelector('.cc-back');

    backOfCreditcard.classList.add('cc-back-field');


    idSecurityCode.addEventListener('focus', () => {

        const idSecurityCodeTyped = document.querySelector('.cc-back > div span')

        idSecurityCode.onkeyup = function () {
            idSecurityCodeTyped.innerHTML = idSecurityCode.value;
            ccSecurityTyped.innerHTML = idSecurityCode.value;
        }

        creditcard.classList.add('securityField');
        creditcard.classList.add('backOfCreditcard');
        creditcardFields.classList.add('cc-erase-field');
        backOfCreditcard.classList.remove('cc-back-field');



        idSecurityCode.addEventListener('blur', () => {
            creditcard.classList.remove('securityField');
            creditcardFields.classList.remove('cc-erase-field');
            backOfCreditcard.classList.add('cc-back-field');

        })
    })

} cardVerificationCode();

