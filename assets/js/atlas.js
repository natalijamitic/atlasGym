var lang = 0; //0-serbian 1-english


//******** INDEX PAGE ***********/
function compare(a, b) {
    let valA = a.gradesSum / a.gradesCnt;
    let valB = b.gradesSum / b.gradesCnt;
    if (valA > valB) {
        return -1;
    }
    else if (valA < valB) {
        return 1;
    }
    else return 0;
}

function populateIndex() {
    
    let sortWorkouts = workouts;
    sortWorkouts.sort(compare);

    let titles = document.getElementsByClassName("card-title");
    let descriptions = document.getElementsByClassName("card-description");
    let imgs = document.getElementsByClassName("card-img");
    let links = document.getElementsByClassName("card-link");

    for (let i = 0; i < 3; i++) {
        titles[i].innerText = sortWorkouts[i].name;
        descriptions[i].innerText = sortWorkouts[i].description[lang].substring(0, 150) + "...";
        imgs[i].src = sortWorkouts[i].profile;
        links[i].href = "treninzi-pojedinacno.html?id=" + sortWorkouts[i].id;
    }
}
/*********************************/


/*********** TRAINING ************/
let workout;
function populateTraining() {
    id = getParameterByName('id')-1;
    workout = workouts[id];
    writeTraining(id);
}

function writeTraining(id) {
    document.getElementsByClassName("card-fullName")[0].innerText = getTypeName(workout.category) + " " + workout.name;
    document.getElementsByClassName("card-link")[0].href = "treninzi-grupno.html?tip="+workout.category;
    document.getElementsByClassName("card-name")[0].innerText = workout.name;
    document.getElementsByClassName("card-type")[0].innerText = getTypeName(workout.category);
    document.getElementsByClassName("card-type")[1].innerText = getTypeName(workout.category) + "\t";
    document.getElementsByClassName("card-description")[0].innerText = workout.description[lang];
    
    document.getElementsByClassName("card-duration")[0].innerText = workout.duration;
    document.getElementsByClassName("card-duration-percent")[0].dataset.value = workout.duration / 60 * 100;

    document.getElementsByClassName("card-level")[0].innerText = workout.level + "/5";
    document.getElementsByClassName("card-level")[0].style.width = (workout.level * 100 / 5) + "%";
    document.getElementsByClassName("card-level")[0].ariaValueNow = workout.level;

    let roundedGrade = Math.round(workout.gradesSum / workout.gradesCnt * 10 * 10)/10;
    document.getElementsByClassName("card-grade")[0].innerText = roundedGrade + "/10";
    document.getElementsByClassName("card-grade")[0].style.width = roundedGrade * 10 + "%";
    document.getElementsByClassName("card-grade")[0].ariaValueNow = roundedGrade

    $(".progress").each(function () {
        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');
        if (value > 0) {
            if (value <= 50) {
                right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
            } else {
                right.css('transform', 'rotate(180deg)')
                left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
            }
        }
    })

    let imgs = document.getElementsByClassName("galleryImgs");
    let modalImgs = document.getElementsByClassName("modalImgs");
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].src = modalImgs[i].src = workout.imgs[i];
    }
}


function percentageToDegrees(percentage) {
    return percentage / 100 * 360
}
/*********************************/


/********* GROUP TRAINING ********/
let type, groupWorkouts;

function getTypeName(name = null) {
    let temp = type;
    if (name)
        temp = name;
    if (lang == 1) {
        if (temp == "kardio")
            temp = "Cardio"
        else if (temp == "joga")
            temp = "Yoga"
    }
    return temp.charAt(0).toUpperCase() + temp.slice(1)
}

function getParameterByName(name, url) {
    if (!url) 
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function writeGroupTraining(workouts) {
    document.getElementsByClassName("card-type")[0].innerText = getTypeName();
    let titles = document.getElementsByClassName("card-title");
    let durations = document.getElementsByClassName("card-duration");
    let levels = document.getElementsByClassName("card-level")
    let imgs = document.getElementsByClassName("card-img");
    let links = document.getElementsByClassName("card-link");

    for (let i = 0; i < 3; i++) {
        titles[i].innerText = getTypeName() + " " + workouts[i].name;
        durations[i].innerText = workouts[i].duration;
        levels[i].innerText = workouts[i].level;
        imgs[i].src = workouts[i].profile;
        links[i].href = "treninzi-pojedinacno.html?id=" + workouts[i].id;
    }
}

function populateGroupTraining() {
    type = getParameterByName('tip').toLowerCase();
    groupWorkouts = workouts.filter(workout => {
        return workout.category.toLowerCase() == type;
    })

    writeGroupTraining(groupWorkouts);
}

function sortAlpha(a, b) {
    if(a.name < b.name)
        return -1;
    else if (a.name > b.name)
        return 1;
    return 0;
}
function sortTime(a, b) {
    if(a.duration < b.duration)
        return -1;
    else if (a.duration > b.duration)
        return 1;
    return 0;
}
function sortLevel(a, b) {
    if(a.level < b.level)
        return -1;
    else if (a.level > b.level)
        return 1;
    return 0;
}

$(document).on('change', 'select', function() {
    let option = $(this).val()
    console.log(option)
    let sortedWorkouts = groupWorkouts;
    switch (option) {
        case "1": {
            sortedWorkouts.sort(sortAlpha);
            break;
        }
        case "2": {
            sortedWorkouts.sort(sortTime);
            break;
        }
        case "3": {
            sortedWorkouts.sort(sortLevel);
            break;
        }

    }
    writeGroupTraining(sortedWorkouts)
});

/*********************************/