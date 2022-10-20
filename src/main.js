import "./css/index.css"
import IMask from "imask";

/**
 * Globals
 */
const creditCardBGColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const creditCardBGColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img");


/** 
 * Global
 * credit card input
 */

// card number
const cardNumberInput = document.getElementById('card-number');

// card holder name
const cardHolderInput = document.getElementById("card-holder");

// card expiration date
const cardExpirationDateInput = document.getElementById('expiration-date');

// security code
const cardSecurityCodeInput = document.getElementById('security-code');



/**
 * Global
 * credit card field
 */

// number
const ccNumber = document.querySelector('.cc-info .cc-number');

// holder name
const ccHolder = document.querySelector('.cc-holder .value')

// expiration date
const ccExpiration = document.querySelector('.cc-expiration .value');


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
setCardType("visa")




/**
 *  card number validation
 * */


function numberValidation(cardNumber, cardNumberPattern, cardNumberMasked) {
    cardNumber = cardNumberInput;
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

    return cardNumberMasked = IMask(cardNumber, cardNumberPattern);

}


/**
 *  card holder validation
 * */
function cardHolderValidation(cardHolder, cardHolderPattern, cardHolderMasked) {
    cardHolder = cardHolderInput;
    cardHolderPattern = {
        mask: /^[a-záàâãéèêíïóôõöúçñ ]+$/i,

    }
    return cardHolderMasked = IMask(cardHolder, cardHolderPattern);
}

/**
 *  card expiration date validation
 * */
function expirationDate(expirationDate, expirationDatePattern, expirationDateMasked) {
    expirationDate = cardExpirationDateInput;
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
    return expirationDateMasked = IMask(expirationDate, expirationDatePattern);
}

/**
 *  security code validation
 * */
function securityCode(securityCode, securityCodePattern, securityCodeMask) {

    securityCode = cardSecurityCodeInput;
    securityCodePattern = { mask: "0000" }
    return securityCodeMask = IMask(securityCode, securityCodePattern)

}

/**
 * update card Number
 * @param {*} number 
 */
function updateCardNumberWithUserData(number) {
    ccNumber.innerText = number.length === 0
        ? "0000 0000 0000 0000"
        : number;
}

const cardNumberMask = numberValidation();
cardNumberMask.on('accept', () => {
    updateCardNumberWithUserData(cardNumberMask.value);
})


/**
 * update card Name
 * @param {*} holderName 
 */
function updateCardNameWithUserData(holderName) {
    ccHolder.innerText = holderName.length === 0 ? "Seu nome" : holderName;
}

const cardHolderMasked = cardHolderValidation();
cardHolderMasked.on('accept', () => {
    updateCardNameWithUserData(cardHolderMasked.value);
})


/**
 * update card Date
 * @param {*} date 
 */
function updateCardDateWithUserData(date) {
    ccExpiration.innerText = date.length === 0 ? "00/00" : date;
}

const expirationDateMasked = expirationDate();
expirationDateMasked.on('accept', () => {
    updateCardDateWithUserData(expirationDateMasked.value);
})


/**
 * update card Securitycode
 * @param {*} securityCode 
 */
function updateCardSecuritycodeWithUserData(securityCode) {
    const ccSecurityCode = document.querySelector('.cc-security .value');
    ccSecurityCode.innerText = securityCode.length === 0 ? "000" : securityCode;
}
const securityCodeMask = securityCode();
securityCodeMask.on('accept', () => {
    updateCardSecuritycodeWithUserData(securityCodeMask.value);
})


function handlesDataFromTheBackOfTheCard() {

    const creditcard = document.querySelector(".cc");
    const creditcardFields = document.querySelector(".cc-field");
    const backOfCreditcard = document.querySelector('.cc-back');

    backOfCreditcard.classList.add('cc-back-field');

    cardSecurityCodeInput.addEventListener('focus', () => {

        const idSecurityCodeTyped = document.querySelector('.cc-back > div span')

        cardSecurityCodeInput.onkeyup = function () {
            idSecurityCodeTyped.innerText = cardSecurityCodeInput.value.length === 0
                ? "123"
                : cardSecurityCodeInput.value;

            const shiftcard = document.querySelector('.shift');
            if (cardSecurityCodeInput.value.length === 3 || cardSecurityCodeInput.value.length === 4) {
                shiftcard.classList.remove('hide')
            } else {
                shiftcard.classList.add('hide')
            }
        }

        creditcard.classList.add('securityField');
        creditcard.classList.add('backOfCreditcard');
        creditcardFields.classList.add('cc-erase-field');
        backOfCreditcard.classList.remove('cc-back-field');


        cardSecurityCodeInput.addEventListener('blur', () => {
            creditcard.classList.remove('securityField');
            creditcardFields.classList.remove('cc-erase-field');
            backOfCreditcard.classList.add('cc-back-field');
        })


    })

} handlesDataFromTheBackOfTheCard();


function highlightcardField() {

    handleCcNumberInput();
    handleCcHolderInput();
    handleCcHolderInput();
    handleCcExpirationDateInput();

    function changeElementColor(color) {
        color.style.color = "#7c3aed";
        color.style.backgroundColor = "#fff";
    }
    function ressetColor(color) {
        color.style.color = "";
        color.style.backgroundColor = "";
    }

    function handleCcNumberInput() {
        cardNumberInput.addEventListener('focus', () => {
            changeElementColor(ccNumber);
        })
        cardNumberInput.addEventListener('blur', () => {
            ressetColor(ccNumber);
        });
    }

    function handleCcHolderInput() {
        cardHolderInput.addEventListener('focus', () => {
            changeElementColor(ccHolder);
        })
        cardHolderInput.addEventListener('blur', () => {
            ressetColor(ccHolder);
        });
    }

    function handleCcExpirationDateInput() {
        cardExpirationDateInput.addEventListener('focus', () => {
            changeElementColor(ccExpiration);
        });

        cardExpirationDateInput.addEventListener('blur', () => {
            ressetColor(ccExpiration);
        });
    }

} highlightcardField()


function submitCardData() {

  const addCardButton = document.querySelector("#add-card");
addCardButton.addEventListener("click", () => {
    //alert("clicado")
});
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
});
  
}submitCardData();

