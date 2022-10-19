import "./css/index.css"
import IMask from "imask";

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


// security code
const idSecurityCode = document.getElementById('security-code');



function cardValidationMask() {

    numberValidation();
    cardHolderValidation();
    expirationDate();
    secorityCode();

    /**
     *  card number validation
     * */
    function numberValidation(cardNumber, cardNumberPattern, cardNumberMasked) {
        cardNumber = document.getElementById('card-number');
        cardNumberPattern = {
            mask: [
                {
                    mask: "0000 0000 0000 0000",
                    regex: /^4\d{0,15}/,
                    cardType: "visa",
                },
                {
                    mask: "0000 0000 0000 0000",
                    regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3,7]\d{0,2})\d{0,12}/,
                    cardType: "mastercard",
                },
                {
                    mask: "0000 0000 0000 0000",
                    cardType: "default",
                },
            ],

            dispatch: function (appended, dynamicMasked) {
                const number = (dynamicMasked.value + appended).replace(/\D/g, "");
                const foundMask = dynamicMasked.compiledMasks.find(function (item) {
                    return number.match(item.regex);
                })
                return foundMask;
            },
        }

        cardNumberMasked = IMask(cardNumber, cardNumberPattern);
    }


    /**
     *  card holder validation
     * */
    function cardHolderValidation(cardHolder, cardHolderPattern, cardHolderMasked) {
        cardHolder = document.getElementById("card-holder");
        cardHolderPattern = {
            mask: /^[a-záàâãéèêíïóôõöúçñ ]+$/i,

        }
        cardHolderMasked = IMask(cardHolder, cardHolderPattern);
    }

    /**
     *  card expiration date validation
     * */
    function expirationDate(expirationDate, expirationDatePattern, expirationDateMasked) {
        expirationDate = document.getElementById("expiration-date")
        expirationDatePattern = {
            mask: "MM{/}YY",
            blocks: {
                YY: {
                    mask: IMask.MaskedRange,
                    from: String(new Date().getFullYear()).slice(2),
                    to: String(new Date().getFullYear() + 10).slice(2),
                },
                MM: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12
                }
            }
        }
        expirationDateMasked = IMask(expirationDate, expirationDatePattern);
    } 

    /**
     *  security code validation
     * */
    function secorityCode(securityCode, securityCodePattern, securityCodeMask) {
        
        securityCode = idSecurityCode;
        securityCodePattern = { mask: "0000" }
        securityCodeMask = IMask(securityCode, securityCodePattern)

    }

} cardValidationMask();


function cardVerificationCode() {

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

