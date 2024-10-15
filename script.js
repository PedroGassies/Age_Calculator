function calculateAge(birthYear, birthMonth, birthDay) {
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay); //les jours commencent à 0

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate(); //si jour négatif, on ajoute le nombre de jours du dernier mois 
        //cas concret: 25 avril en date et on est le 10 mai: 10-25=-15, -15+30=15 (30 jours en avril)
    }

    if (months < 0) {
        years--;
        months += 12; // si mois négatif, on ajoute 12 aux nombre de mois
    }

    return { years, months, days };
}
function displayErrorMessage(inputId, message) {
    const errorElement = document.getElementById(`error-message-${inputId}`);
    const inputElement = document.getElementById(inputId);
    const labelElement = inputElement.previousElementSibling;

    // Ajoute le message d'erreur
    errorElement.textContent = message;

    // Ajoute les classes d'erreur aux inputs et aux labels
    inputElement.classList.add('error');
    labelElement.classList.add('error');
}

function clearErrorMessages() {
    // Efface tous les messages d'erreur
    document.getElementById('error-message-day').textContent = '';
    document.getElementById('error-message-month').textContent = '';
    document.getElementById('error-message-year').textContent = '';

    // Supprime les classes d'erreur des inputs et des labels
    document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
    document.querySelectorAll('p.label').forEach(label => label.classList.remove('error'));
}

function validateMonth(month) {
    if (month < 1 || month > 12) {
        displayErrorMessage('month', "Must be a valid month");
        return false;
    }
    return true;
}

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
}

function isFutureDate(day, month, year) {
    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    return inputDate > currentDate;
}

function handleSubmit(event) {
    event.preventDefault();
    clearErrorMessages(); // Efface tous les messages d'erreur avant de valider

    const day = parseInt(document.getElementById('day').value, 10);
    const month = parseInt(document.getElementById('month').value, 10);
    const year = parseInt(document.getElementById('year').value, 10);



    // Vérification des erreurs pour le jour
    if (isNaN(day)) {
        displayErrorMessage('day', "Must be a valid day");
        return;
    }

    // Vérification des erreurs pour le mois
    if (isNaN(month) || !validateMonth(month)) {
        return;
    }

    // Vérification des erreurs pour l'année
    if (isNaN(year)) {
        displayErrorMessage('year', "Must be a valid year");
        return;
    }

    if (!isValidDate(day, month, year)) {
        const daysInMonth = getDaysInMonth(month, year);
        displayErrorMessage('day', `Must be a valid day. ${month}'s month has ${daysInMonth} days.`);
        return;
    }

    if (isFutureDate(day, month, year)) {
        displayErrorMessage('year', "Must be in the past");
        return;
    }



    const age = calculateAge(year, month, day);

    document.getElementById('years').textContent = age.years;
    document.getElementById('months').textContent = age.months;
    document.getElementById('days').textContent = age.days;
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});
