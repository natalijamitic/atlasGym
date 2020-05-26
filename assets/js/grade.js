function gradeTraining() {
    id = getParameterByName('id') - 1;
    workout = workouts[id];

    //PROVERI DA LI JE BIO NA TRENINGU
    updateAttendedTrainings();
    if(!user.attendedTrainings.includes(id+1))
        return;

    let grade = document.getElementById('grade-input').value;
    workouts[id].gradesSum += parseInt(grade);
    workouts[id].gradesCnt += 10;

    memorize();
}

function addNewComment() {
    id = getParameterByName('id') - 1;
    workout = workouts[id];

    //PROVERI DA LI JE BIO NA TRENINGU
    updateAttendedTrainings();
    if(!user.attendedTrainings.includes(id+1))
        return;

    let comment = document.getElementById('addComment').value;
    let name = document.getElementById('username').value;
    if(comment.length == 0 || name.length == 0) return;

    workouts[id].comments.push({
        'name': name,
        'text': comment
    });

    memorize();
}

function updateAttendedTrainings() {
    for(let i = 0; i < user.booked.length; i++) {
        training = workouts[user.booked[i].workoutId-1].trainings[user.booked[i].trainingIndex];

        let minutes = minutesToTraining(training);
        if(minutes <= 0) {
            if(!user.attendedTrainings.includes(user.booked[i].workoutId)) {
                user.attendedTrainings.push(user.booked[i].workoutId);
                user.booked.splice(i, 1);
            }
        }
    }
    memorize();
}