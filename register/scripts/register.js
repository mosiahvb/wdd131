import { successTemplate, participantTemplate } from './templates.js';

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
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log(feeElements);
    feeElements = [...feeElements];
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
