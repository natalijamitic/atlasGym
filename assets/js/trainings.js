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
    row.setAttribute('class', 'row mb-5 ml-4');
    for (let i = 0; i < workouts.length; i++) {
        let html = createWorkoutPreview(workouts[i]);
        row.innerHTML = row.innerHTML + html;
    }
    container.appendChild(row);
    for (let i = 0; i < workouts.length; i++) {
        document.body.innerHTML = document.body.innerHTML + createModal(workouts[i]);
    }
}

function createWorkoutPreview(workout) {
    let text = lang ? "View" : "Vidi";
    let duration = lang ? "Duration" : "Trajanje";
    let difficulty = lang ? "Difficulty" : "Težina";
    return `<div class="col-lg-4 col-md-6 mb-5 filter-${workout.category}">
    <div class="card h-100 bg-dark text-white">
        <img class="img-fluid" src="${workout.profile}" alt="">
        <div class="card-body pb-0">
            <h5 class="card-title">
                ${workout.category}&nbsp;${workout.name}
            </h5>
            <p>${duration}: ${workout.duration}</p>
            <p>${difficulty}: ${workout.level}</p>
        </div>
        <div class="card-footer mb-3 mt-0">
            <div class="text-center mt-3">
                <a href="#" class="align-self-end btn btn-warning view zak" data-toggle="modal" data-target="#modal${workout.id}">${text}</a>
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

    let minutes = minutesToTraining(workouts[id-1].trainings[i]);
    let text = (lang == 0) ? "Otkaži" : "Cancel";
    if(minutes > 30)
        button = `<button class="btn btn-outline-danger btn-book" onclick="cancelTraining(${id},${i})">${text}</button>`;
    else button = '';

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
    let text = (lang == 0) ? "Zakaži" : "Book";
    parent.innerHTML =
        `<button class="btn btn-outline-success btn-book" onclick="bookTraining(${id},${ix})">${text}</button>`;
}

function createModal(workout) {
    let html = '';
    let days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota'];
    if(lang == 1)
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date(); today = today.getDay();
    let time = new Date();
    let hasBooked = false;
    let button = '';
    for (let i = 0; i < workout.trainings.length; i++) {
        button = '';
        hasBooked = false;
        for(let j = 0; j < user.booked.length; j++) {
            if(user.booked[j].workoutId == workout.id && user.booked[j].trainingIndex == i) {
                hasBooked = true;
                break;
            }
        }
        let minutes = minutesToTraining(workout.trainings[i]);
        if(minutes > 1 && workout.trainings[i].available > 0 && !hasBooked)
            button = `<button class="btn btn-outline-success btn-book" onclick="bookTraining(${workout.id},${i})">${(lang == 0) ? "Zakaži" : "Book"}</button>`;
        else if(minutes > 30 && hasBooked)
            button = `<button class="btn btn-outline-danger btn-book" onclick="cancelTraining(${workout.id},${i})">${(lang == 0) ? "Otkaži" : "Cancel"}</button>`;
        
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
    let text = [["Dan", "Day"], ["Vreme", "Time"], ["Mesta", "Participants"], ["Zatvori", "Close"]];
    let cnt = 0;
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
                                    <th class="p-2">${text[cnt++][lang]}</th>
                                    <th class="p-2">${text[cnt++][lang]}</th>
                                    <th class="p-2">${text[cnt++][lang]}</th>
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
                <button type="button" class="btn btn-warning" data-dismiss="modal">${text[cnt++][lang]}</button>
            </div>
        </div>
    </div>
</div>
    `;
}
