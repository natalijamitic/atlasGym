var lang = 0; //0-serbian 1-english


function makePDF(type) {

    let text = [
                ["Uspešno ste rezervisali termin za", ", \tdana   ", "Podaci:",  "puno ime:",
                 "poruka:", "Vidimo se na našoj lokaciji Bregovita 11, 11080 Zemun!",
                 "Vaš Atlas Tim"],
                ["You have successfully booked", ", \ton   ", "Personal info:",  "full name:",
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
    doc.text(85, 90, $("#inputName").val() + " " + $("#inputLastName").val())

    doc.text(30, 100, "email:")
    doc.text(85, 100, $("#inputEmail").val())

    doc.text(30, 110, "tel:");
    doc.text(85, 110, $("#inputPhone").val())

    msg = $("#inputText").val()
    msg = (msg == "") ? "/" : msg
    doc.text(30, 120, text[lang][i++])
    msg = msg.length > 270 ? (msg.substring(0, 267) + " ...") : msg;
    doc.text(85, 120, msg, { maxWidth: "96" })

    doc.text(30, 200, text[lang][i++]);
    doc.text(130, 230, text[lang][i++])
    doc.text(130, 240, "email: info@atlas.com")
    doc.text(130, 250, "tel: +381 64 321 0990")

    var imgUrl = "data:image/png;base64,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"
    doc.addImage(imgUrl, "PNG", pageWidth / 2 - 17, 280, 34, 10);

    doc.setFillColor(252, 211, 7);
    doc.setDrawColor(252, 211, 7);
    doc.rect(15, 20, pageWidth-30, pageHeight-40)

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
        date = $("#inputDate").val()
        msg = $("#inputText").val()

        patternName = /^([A-Za-z]|[A-Za-z]+(\ |\'|\-)?(([A-Za-z]+)((\ |\'|\-))?)*[A-Za-z]+)$/g              //sme 1 slovo, sme vise reci, sme -', izmedju " ", "-", "'" moraju da se nadju odmah slova
        if (!name.match(patternName) || !lastName.match(patternName)) {
            alert("Nevalidan unos imena.")
            resetInput();
            return;
        }

        patternEmail = "IMPLEMENTIRATI"

        patternPhone = /^(\d){3}(\ )?(\d){3}(\ )?(\d){3,4}$/g
        if (!phone.match(patternPhone)) {
            alert("Nevalidan unos telefona.")
            resetInput();
            return;
        }

        patternDate = "IMPLEMENTIRATI"


        makePDF(type);
        alert("Uspesno zakazano. IMA PDFA");        //za test
    }
    else {
        alert("Uspesno zakazano. NEMA PDFA");       //za test
    }
}