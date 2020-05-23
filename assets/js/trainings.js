var filter = {
    'Joga': false,
    'Pilates': false,
    'Core': false,
    'Kardio': false
};

function filterOut(name, status) {
    filter[name] = status;
    let showAll = false;
    if (!filter['Joga'] && !filter['Pilates'] && !filter['Core'] && !filter['Kardio'])
        showAll = true;
    for (var key in filter) {
        let els = document.getElementsByClassName('filter-' + key);
        for (let i = 0; i < els.length; i++) {
            els[i].style.display = ((filter[key] || showAll) ? 'inline-block' : 'none');
        }
    }
}

function populateBookTrainings() {
    let container = document.getElementById('listTrainings');
    container.innerHTML = '';
    let row = document.createElement('div');
    for (let i = 0; i < workouts.length; i++) {
        //if(!filter[workouts[i].category]) continue;
        let html = createWorkoutPreview(workouts[i]);
        row.setAttribute('class', 'row mb-5 ml-4');
        row.innerHTML = row.innerHTML + html;
    }
    container.appendChild(row);
    for (let i = 0; i < workouts.length; i++) {
        //if(!filter[workouts[i].category]) continue;
        document.body.innerHTML = document.body.innerHTML + createModal(workouts[i]);
    }
}

function createWorkoutPreview(workout) {
    return `<div class="col-lg-4 col-md-6 mb-5 filter-${workout.category}">
    <div class="card h-100 bg-dark text-white">
        <img class="img-fluid" src="${workout.profile}" alt="">
        <div class="card-body pb-0">
            <h5 class="card-title">
                ${workout.category}&nbsp;${workout.name}
            </h5>
            <p>Trajanje: ${workout.duration}</p>
            <p>Tezina: ${workout.level}</p>
        </div>
        <div class="card-footer mb-3 mt-0">
            <div class="text-center mt-3">
                <a href="#" class="align-self-end btn btn-warning view zak" data-toggle="modal" data-target="#modal${workout.id}">Vidi</a>
            </div>
        </div>
    </div>
    </div>`;
}

function bookTraining(id, i) {
    user.booked.push({
        'workoutId': id,
        'trainingIndex': i
    });
    event.target.parentElement.previousElementSibling.innerText = --workouts[id - 1].trainings[i].available;

    memorize();

    parent = event.target.parentElement;
    parent.innerHTML = '';
    button = '';
    let today = new Date(); today = today.getDay(); today = (today + 7) % 8;
    let time = new Date();
    let trainingDay = (workouts[id-1].trainings[i].day + 7) % 8;
    if(today == trainingDay) {
        let hours1, hours2, min1, min2;
        hours1 = time.getHours(); hours2 = workouts[id-1].trainings[i].time.slice(0,2);
        min1 = time.getMinutes(); min2 = workouts[id-1].trainings[i].time.slice(3,5);
        let time2 = new Date();
        time2.setHours(hours2); time2.setMinutes(min2); time2.setSeconds(0);
        if((time2-time)/60/1000 > 30)
            button = `<button class="btn btn-outline-danger" onclick="cancelTraining(${id},${i})">Otkaži</button>`;
        else button = '';
    } else if(today > trainingDay)
        button = '';
    else button = `<button class="btn btn-outline-danger" onclick="cancelTraining(${id},${i})">Otkaži</button>`;

    parent.innerHTML = button;
}

function cancelTraining(id, ix) {
    for (let i = 0; i < user.booked.length; i++) {
        if (user.booked[i].workoutId == id && user.booked[i].trainingIndex == ix) {
            user.booked.splice(i, 1);
            break;
        }
    }
    event.target.parentElement.previousElementSibling.innerText = ++workouts[id - 1].trainings[ix].available;

    memorize();

    parent = event.target.parentElement;
    parent.innerHTML = '';
    parent.innerHTML =
        `<button class="btn btn-outline-success" onclick="bookTraining(${id},${ix})">Zakaži</button>`;
}

function createModal(workout) {
    let html = '';
    let days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota'];
    let today = new Date(); today = today.getDay();
    let time = new Date();
    for (let i = 0; i < workout.trainings.length; i++) {
        let button = '';
        if (workout.trainings[i].available > 0)
            button = `<button class="btn btn-outline-success" onclick="bookTraining(${workout.id},${i})">Zakaži</button>`;
        let trainingDay = workout.trainings[i].day;
        if(today == 0) today = 7;
        if(trainingDay == 0) trainingDay = 7;
        //console.log('today ', today, 'trainingDay ', trainingDay);
        if(today > trainingDay) button = '';

        let hours1, hours2, min1, min2;
        hours1 = time.getHours(); hours2 = workout.trainings[i].time.slice(0,2);
        min1 = time.getMinutes(); min2 = workout.trainings[i].time.slice(3,5);
        if((hours1 > hours2 || (hours1 == hours2 && min1 > min2)) && (today == trainingDay))
            button = '';
        if(today == 7) today = 0;
        if(trainingDay == 7) trainingDay = 0;
        
        html = html + `
        <tr>
        <td class="p-2">${days[workout.trainings[i].day]}</td>
        <td class="p-2">${workout.trainings[i].time}</td>
        <td class="p-2">${workout.trainings[i].available}</td>
        <td class="p-2">
            ${button}
        </td>
        </tr> 
        `;
    }
    return `
    <div class="modal fade" id="modal${workout.id}" tabindex="-1" role="dialog" aria-labelledby="modalTitle${workout.id}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle${workout.id}">${workout.category}&nbsp;${workout.name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table-striped w-100 p-2">
                                <thead>
                                    <tr>
                                    <th class="p-2">Dan</th>
                                    <th class="p-2">Vreme</th>
                                    <th class="p-2">Mesta</th>
                                    <th class="p-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${html}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">Zatvori</button>
            </div>
        </div>
    </div>
</div>
    `;
}
