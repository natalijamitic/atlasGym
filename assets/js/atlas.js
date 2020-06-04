var lang = 0; //0-serbian 1-english

function setEnglish() {
    lang = 1;
}


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
    $(".wholePage").css("display", "initial");
    id = getParameterByName('id') - 1;
    workout = workouts[id];
    writeTraining(id);
}

function writeTraining(id) {
    let newLang = lang ? "srb" : "eng";
    document.getElementById("langLink").href = "../" + newLang + "/treninzi-pojedinacno.html?id=" + (id + 1);
    document.getElementById("langLink2").href = "../" + newLang + "/treninzi-pojedinacno.html?id=" + (id + 1);

    document.getElementsByClassName("card-fullName")[0].innerText = getTypeName(workout.category.toLowerCase()) + " " + workout.name;
    document.getElementsByClassName("card-link")[0].href = "treninzi-grupno.html?tip=" + workout.category;

    document.getElementsByClassName("card-name")[0].innerText = workout.name;
    document.getElementsByClassName("card-type")[0].innerText = getTypeName(workout.category.toLowerCase());
    document.getElementsByClassName("card-type")[1].innerText = getTypeName(workout.category.toLowerCase()) + "\t";
    document.getElementsByClassName("card-description")[0].innerText = workout.description[lang];

    document.getElementsByClassName("card-duration")[0].innerText = workout.duration;
    document.getElementsByClassName("card-duration-percent")[0].dataset.value = workout.duration / 60 * 100;

    document.getElementsByClassName("card-level")[0].innerText = workout.level + "/5";
    document.getElementsByClassName("card-level")[0].style.width = (workout.level * 100 / 5) + "%";
    document.getElementsByClassName("card-level")[0].ariaValueNow = workout.level;

    let roundedGrade = Math.round(workout.gradesSum / workout.gradesCnt * 10 * 10) / 10;
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

    writeComments(id);
    
    if (!lang) {    
        $("#tooltipKomentar").data("title", "Ne možete komentarisati trening koji niste posetili.")
        $("#tooltipOcena").data("title", "Ne možete ocenjivati trening koji niste posetili.")
    } else {
        $("#tooltipKomentar").data("title", "In order to comment, you need to attend this workout.")
        $("#tooltipOcena").data("title", "In order to leave a grade, you need to attend this workout.")
    }
}

function writeComments(id) {
    for (i = 0; i < workout.comments.length; i++) {
        div = $(`<div class="row">
                    <div class="col-md-12 text-light">
                        <strong>${workout.comments[i].name}</strong>
                        <p>
                        <div class="10">${workout.comments[i].text}</div>
                        </p>
                    </div>
                </div>
                <hr />`);

       $("#commentsList").append(div);
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
    let newLang = lang ? "srb" : "eng";
    let type = getParameterByName('tip');
    document.getElementById("langLink").href = "../" + newLang + "/treninzi-grupno.html?tip=" + type;
    document.getElementById("langLink2").href = "../" + newLang + "/treninzi-grupno.html?tip=" + type;

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
    if (a.name < b.name)
        return -1;
    else if (a.name > b.name)
        return 1;
    return 0;
}
function sortTime(a, b) {
    if (a.duration < b.duration)
        return -1;
    else if (a.duration > b.duration)
        return 1;
    return 0;
}
function sortLevel(a, b) {
    if (a.level < b.level)
        return -1;
    else if (a.level > b.level)
        return 1;
    return 0;
}

$(document).on('change', 'select', function () {
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




/********** PDF *****************/
function makePDF(type) {

    let text = [
        ["Uspešno ste rezervisali termin za", ", \tdana   ", "Podaci:", "ime:", "prezime:",
            "poruka:", "Vidimo se na našoj lokaciji Bregovita 11, 11080 Zemun!",
            "Vaš Atlas Tim"],
        ["You have successfully booked", ", \ton   ", "Personal info:", "first name:", "last name:",
            "message:", "See you at our location at Bregovita 11, 11080 Zemun!",
            "Your Atlas Team"]
    ]

    let i = 0;
    let doc = new jsPDF()
    let pageWidth = 210;
    let pageHeight = 297;

    doc.text(pageWidth / 2, 40, text[lang][i++], { align: "center" })
    doc.setFontStyle("bold")
    doc.text(pageWidth / 2, 50, (lang == 1 ? "a " : "") + (type == "masazu" ? "masažu" : type) + text[lang][i++] + $("#inputDate").val(), { align: "center" })

    doc.setFontStyle("normal")
    doc.text(20, 80, text[lang][i++])

    doc.text(30, 90, text[lang][i++])
    doc.text(85, 90, $("#inputName").val().substring(0, 28) + "...", { maxWidth: "96" });

    doc.text(30, 100, text[lang][i++])
    doc.text(85, 100, $("#inputLastName").val().substring(0, 28) + "...", { maxWidth: "96" });

    doc.text(30, 110, "email:")
    doc.text(85, 110, $("#inputEmail").val())

    doc.text(30, 120, "tel:");
    doc.text(85, 120, $("#inputPhone").val().replace(/\s/g, ''))

    msg = $("#inputText").val()
    msg = (msg == "") ? "/" : msg
    doc.text(30, 130, text[lang][i++])
    msg = msg.length > 270 ? (msg.substring(0, 267) + " ...") : msg;
    doc.text(85, 130, msg, { maxWidth: "96" })

    doc.text(30, 200, text[lang][i++]);
    doc.text(130, 230, text[lang][i++])
    doc.text(130, 240, "email: info@atlas.com")
    doc.text(130, 250, "tel: +381 64 321 0990")

    var imgUrl = "data:image/png;base64,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"
    doc.addImage(imgUrl, "PNG", pageWidth / 2 - 17, 280, 34, 10);

    doc.setFillColor(252, 211, 7);
    doc.setDrawColor(252, 211, 7);
    doc.rect(15, 20, pageWidth - 30, pageHeight - 40)

    if (type == "masazu")
        doc.save("Masaza.pdf");
    else if (type == "nutricionista")
        doc.save("Nutricionista.pdf")
    else if (type == "massage")
        doc.save("Massage.pdf")
    else
        doc.save("Nutritionist.pdf")
}

function resetInput() {
    $("#inputName").val("");
    $("#inputLastName").val("");
    $("#inputEmail").val("");
    $("#inputPhone").val("");
    $("#inputDate").val("");
    $("#inputText").val("");
}

function book() {
    if ($("#checkPDF").is(":checked")) {
        type = $("#typeId").val()
        name = $("#inputName").val()
        lastName = $("#inputLastName").val()
        email = $("#inputEmail").val()
        phone = $("#inputPhone").val()
        phone = phone.replace(/\s/g, ''); //bez razmaka
        date = $("#inputDate").val()
        msg = $("#inputText").val()

        patternName = /^([A-Za-z]|[A-Za-z]+(\ |\'|\-)?(([A-Za-z]+)((\ |\'|\-))?)*[A-Za-z]+)$/g              //sme 1 slovo, sme vise reci, sme -', izmedju " ", "-", "'" moraju da se nadju odmah slova
        if (!name.match(patternName) || !lastName.match(patternName)) {
            alert(lang ? "Invalid name entry" : "Nevalidan unos imena.")
            resetInput();
            return;
        }

        patternEmail = /^[a-zA-Z]\w*@[a-zA-Z]\w*([-\.]\w+)*(\.[a-zA-Z]{2,3})+$/g

        if (!email.match(patternEmail)) {
            alert(lang ? "Invalid email entry" : "Nevalidan unos email adrese.")
            resetInput();
            return;
        }

        patternPhone = /^(06)(\d)(\d){6,7}$/g
        if (!phone.match(patternPhone)) {
            alert(lang ? "Invalid phone entry" : "Nevalidan unos telefona.")
            resetInput();
            return;
        }

        makePDF(type);
        alert(lang ? "Successfully booked." : "Uspesno zakazano.");        //za test
    }
    else {
        alert(lang ? "Successfully booked." : "Uspesno zakazano.");       //za test
    }
}
/********************************/
