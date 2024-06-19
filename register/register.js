import { successTemplate, participantTemplate } from './Templates.js';

let participantCount = 1;
const button1 = document.getElementById('add');
const button2 = document.getElementById('submitButton');

function addParticipant() {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    insertParticipantHTML(newParticipantHTML);
}

function submitForm(event) {
    event.preventDefault();
    
    const totalFee = totalFees();
    const adultName = document.getElementById('adult_name').value;
    const info = {
        adult_name: adultName,
        number_of_participants: participantCount,
        fee_total: totalFee.toFixed(2)
    };
    const message = successTemplate(info);
    const summarySection = document.getElementById('summary');
    summarySection.innerHTML = `<p>${message}</p>`;
}

function totalFees() {
    // the selector below lets us grab any element that has an id that begins with "fee"
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log(feeElements);
    // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
    // The line below is an easy way to convert something that is list-like to an actual Array so we can use all of the helpful Array methods...like reduce
    // The "..." is called the spread operator. It "spreads" apart the list, then the [] we wrapped it in inserts those list items into a new Array.
    feeElements = [...feeElements];
    // sum up all of the fees. Something like Array.reduce() could be very helpful here :) Or you could use a Array.forEach() as well.
    // Remember that the text that was entered into the input element will be found in the .value of the element.
    const total = feeElements.reduce((accumulator, currentElement) => {
        return accumulator + parseFloat(currentElement.value) || 0;
    }, 0);
    return total;
}

function insertParticipantHTML(html) {
    const initialParticipant = document.querySelector('.participant1');
    initialParticipant.insertAdjacentHTML('afterend', html);
}

button1.addEventListener('click', addParticipant);
button2.addEventListener('click', submitForm);
