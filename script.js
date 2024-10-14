function calculateAge(birthYear,birthMonth, birthDay){
    const today= new Date();
    const birthDate=new Date(birthYear, birthMonth -1, birthDay); //les jours commencent à 0

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth()- birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0){
        months --;
        const lastMonth = new Date(today.getFullYear(),today.getMonth(),0);
        days+=lastMonth.getDate(); //si jour négatif, on ajoute le nombre de jours du dernier mois 
    //cas concret: 25 avril en date et on est le 10 mai: 10-25=-15, -15+30=15 (30 jours en avril)
    }

    if (months < 0){
        years --;
        months+=12; // si mois négatif, on ajoute 12 aux nombre de mois
    }

    return {years, months, days};
}
function validateMonth(month){
    if (month < 1 || month > 12) {
        alert("Must be between 1 and 12.");
        return
    }
}
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function isValidDate(day, month, year) {
    // Création d'un objet Date
    const date = new Date(year, month - 1, day);
    
    // Vérification si la date est valide
    return date.getFullYear() === year &&
           date.getMonth() === month - 1 &&
           date.getDate() === day;
}

function isFutureDate(day, month, year) {
    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    return inputDate > currentDate;
}

function handleSubmit(event){
    event.preventDefault();
    const day= parseInt(document.getElementById('day').value, 10); //on récupère la valeur avec.value, parseInt permet de convertir la chaîne de caractères en nombre, 10 pour la base décimale 
    const month= parseInt(document.getElementById('month').value, 10);
    const year= parseInt(document.getElementById('year').value, 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        alert("Must be numbers.");
        return;
    }
    if (!validateMonth(month)) {
        return; // Arrêter l'exécution si le mois est invalide
    };
    if (!isValidDate(day, month, year)) {
        const daysInMonth = getDaysInMonth(month, year);
        alert(` ${month}'s month of ${year} has ${daysInMonth} days.`);
        return;
    }

    if (isFutureDate(day, month, year)) {
        alert("Must be in the past.");
        return;
    }

    const age= calculateAge(year, month, day); // appel de la fonction après avoir récupérée les valeurs, converties en nombres.

    document.getElementById('years').textContent = age.years;
    document.getElementById('months').textContent = age.months;
    document.getElementById('days').textContent = age.days;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit); //appel de la fonction lorsque l'on envoie le formulaire
});