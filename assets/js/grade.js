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
    let today = (new Date()).getDay();
    if(today == 0) today = 7;
    let time = new Date();

    for(let i = 0; i < user.booked.length; i++) {
        training = workouts[user.booked[i].workoutId-1].trainings[user.booked[i].trainingIndex];
        let trainingDay = training.day;
        if(trainingDay == 0) trainingDay = 7;
        if(today > trainingDay) {
            if(!user.attendedTrainings.includes(user.booked[i].workoutId)) {
                user.attendedTrainings.push(user.booked[i].workoutId);
                user.booked.splice(i, 1);
            }
        } else if(today == trainingDay) {
            let hours, min;

            hours = training.time.slice(0,2);
            min = training.time.slice(3,5);
            let time2 = new Date();
            time2.setHours(hours); time2.setMinutes(min); time2.setSeconds(0);

            if(time2 < time) {
                if(!user.attendedTrainings.includes(user.booked[i].workoutId)) {
                    user.attendedTrainings.push(user.booked[i].workoutId);
                    user.booked.splice(i, 1);
                }
            }
        }
    }
    memorize();
}

function checkAllowed() {
    $('.tooltip-wrapper').tooltip({position: "bottom"});

    id = getParameterByName('id') - 1;
    workout = workouts[id];

    updateAttendedTrainings();
    if(!user.attendedTrainings.includes(id+1)) {
        $('.tooltip-wrapper').tooltip({position: "bottom"});
        $('.tooltip-wrapper').css('display', 'inline-block');
        $("#submitComment").css('display', 'none');
        $("#submitGrade").css('display', 'none');
    }
    else {
        $("#submitComment").css('display', 'initial');
        $("#submitGrade").css('display', 'initial');
        $('.tooltip-wrapper').css('display', 'none');
    }

}