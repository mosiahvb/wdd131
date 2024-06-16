let participantCount = 1;

function participantTemplate(count) {
    return `
        <section class="participant${count}">
        </section>
    `;
}

document.getElementById('add').addEventListener('click', function() {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    document.querySelector('.participants').insertAdjacentHTML('beforeend', newParticipantHTML);
});