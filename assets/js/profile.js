function populateProfileWithBookedTrainings() {
    let container = document.getElementById('bookedTrainings');
    let days = [['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
                ['sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']];
    for(let i = 0; i < user.booked.length; i++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'col-lg-4 col-md-6 mb-5');
        let workout = workouts[user.booked[i].workoutId-1];
        
        let btnText = ["Otkaži", "Cancel"]
        let button = `<a href="javascript:;" class="btn btn-warning view zak" onclick="cancelProfileTraining(${user.booked[i].workoutId},${user.booked[i].trainingIndex})">${btnText[lang]}</a>`;
        
        let minutes = minutesToTraining(workout.trainings[user.booked[i].trainingIndex]);
        if(minutes <= 30) button = '';

        let text = [["Trajanje", "Težina"], ["Duration", "Level"]]
        let cnt = 0;
        div.innerHTML = `
        <div class="card h-100 bg-dark text-white">
            <img class="img-fluid" src="${workout.profile}" alt="">
            <div class="card-body">
                <h5 class="card-title">
                    ${workout.category}&nbsp;${workout.name}
                </h5>
                <p>${text[lang][cnt++]}: ${workout.duration}</p>
                <p>${text[lang][cnt++]}: ${workout.level}</p>
            </div>
            <div class="card-footer mb-3">
                <div class="text-center mt-3">
                    <button class="btn btn-outline-warning trening mb-3">
                        ${days[lang][workout.trainings[user.booked[i].trainingIndex].day]}&nbsp;${workout.trainings[user.booked[i].trainingIndex].time}
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

    trainingCard.parentElement.style.display = 'none';    
}