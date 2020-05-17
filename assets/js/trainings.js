var filter = {
    'Joga': false,
    'Pilates': false,
    'Core': false,
    'Kardio': false
};

function filterOut(name, status) {
    filter[name] = status;
    let showAll = false;
    if(!filter['Joga'] && !filter['Pilates'] && !filter['Core'] && !filter['Kardio'])
        showAll = true;
    for (var key in filter) {
        let els = document.getElementsByClassName('filter-' + key);
        for(let i = 0; i < els.length; i++) {
            els[i].style.display = ((filter[key] || showAll ) ? 'inline-block' : 'none');
        }
    }
}

function populateBookTrainings() {
    let container = document.getElementById('listTrainings');
    container.innerHTML = '';
    let row = document.createElement('div');
    for(let i = 0; i < workouts.length; i++) {
        //if(!filter[workouts[i].category]) continue;
        let html = createWorkoutPreview(workouts[i]);
        row.setAttribute('class', 'row mb-5 ml-4');
        row.innerHTML = row.innerHTML + html;
    }
    container.appendChild(row);
    for(let i = 0; i < workouts.length; i++) {
        //if(!filter[workouts[i].category]) continue;
        document.body.innerHTML = document.body.innerHTML + createModal(workouts[i]);
    }
}

function createWorkoutPreview(workout) {
    return `<div class="col-lg-4 col-md-6 mb-5 filter-${workout.category}">
    <div class="card bg-dark text-white">
        <img class="img-fluid" src="${workout.profile}" alt="">
        <div class="card-body">
            <h5 class="card-title">
                ${workout.category}&nbsp;${workout.name}
            </h5>
            <p>Trajanje: ${workout.duration}</p>
            <p>Tezina: ${workout.level}</p>
            <div class="text-center">
                <a href="#" class="btn btn-warning view zak" data-toggle="modal" data-target="#modal${workout.id}">Vidi</a>
            </div>
        </div>
    </div>
    </div>`;
}

function createModal(workout) {
    let html = '';
    for(let i = 0; i < workout.trainings.length; i++) {
        let button = '';
        if(workout.trainings[i].available > 0)
            button = '<button class="btn btn-outline-success">Zakaži</button>';

        html = html + `
        <tr>
        <td class="p-2">${workout.trainings[i].day}</td>
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
