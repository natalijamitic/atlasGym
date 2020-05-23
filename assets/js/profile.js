function populateProfileWithBookedTrainings() {
    let container = document.getElementById('bookedTrainings');
    let days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota'];
    for(let i = 0; i < user.booked.length; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'col-lg-4 col-md-6 mb-5');
        let workout = workouts[user.booked[i].workoutId-1];
        
        let button = `<a href="#" class="btn btn-warning view zak" onclick="cancelProfileTraining(${user.booked[i].workoutId},${user.booked[i].trainingIndex})">Otkaži</a>`;
        let today = new Date(); today = today.getDay();
        let time = new Date();
        let trainingDay = workout.trainings[user.booked[i].trainingIndex].day;
        if(today == 0) today = 7;
        if(trainingDay == 0) trainingDay = 7;
        if(today > trainingDay) button = '';

        let hours1, hours2, min1, min2;
        hours1 = time.getHours(); hours2 = workout.trainings[user.booked[i].trainingIndex].time.slice(0,2);
        min1 = time.getMinutes(); min2 = workout.trainings[user.booked[i].trainingIndex].time.slice(3,5);
        if((hours1 > hours2 || (hours1 == hours2 && min1 > min2)) && (today == trainingDay))
            button = '';
        if(today == 7) today = 0;
        if(trainingDay == 7) trainingDay = 0;

        div.innerHTML = `
        <div class="card bg-dark text-white">
            <img class="img-fluid" src="${workout.profile}" alt="">
            <div class="card-body">
                <h5 class="card-title">
                    ${workout.category}&nbsp;${workout.name}
                </h5>
                <p>Trajanje: ${workout.duration}</p>
                <p>Tezina: ${workout.level}</p>


                <div class="text-center">
                    <button class="btn btn-outline-warning trening mb-3">
                        ${days[workout.trainings[user.booked[i].trainingIndex].day]}&nbsp;${workout.trainings[user.booked[i].trainingIndex].time}
                    </button>
                    <br>
                    ${button}
                </div>
            </div>
        </div>
        `;
        container.appendChild(div);
    }
}

function cancelProfileTraining(id, ix) {
    let trainingCard = event.target.parentElement.parentElement.parentElement;
    for (let i = 0; i < user.booked.length; i++) {
        if (user.booked[i].workoutId == id && user.booked[i].trainingIndex == ix) {
            user.booked.splice(i, 1);
            break;
        }
    }
    ++workouts[id - 1].trainings[ix].available;

    memorize();

    trainingCard.remove();    
}