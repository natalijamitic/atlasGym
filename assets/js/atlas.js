

function makePDF(type) {

    var doc = new jsPDF()
    var pageWidth = 210;
    var pageHeight = 297;
    doc.text(pageWidth / 2, 40, 'Uspesno ste rezervisali termin za', { align: "center" })
    doc.setFontStyle("bold")
    doc.text(pageWidth / 2, 50, type + ", \tdana   " + $("#inputDate").val(), { align: "center" })
    doc.setFontStyle("normal")
    doc.text(20, 80, "Podaci:")
    doc.text(30, 90, "puno ime:")
    doc.text(85, 90, $("#inputName").val() + " " + $("#inputLastName").val())
    doc.text(30, 100, "email:")
    doc.text(85, 100, $("#inputEmail").val())
    doc.text(30, 110, "tel:");
    doc.text(85, 110, $("#inputPhone").val())
    msg = $("#inputText").val()
    msg = (msg == "") ? "/" : msg
    doc.text(30, 120, "poruka:")
    msg = msg.length > 270 ? (msg.substring(0, 267) + " ...") : msg;
    doc.text(85, 120, msg, { maxWidth: "96" })



    doc.text(30, 200, "Vidimo se na nasoj lokaciji Bregovita 11, 11080 Zemun!");
    doc.text(130, 230, "Vas Atlas Tim")
    doc.text(130, 240, "mail: info@atlas.com")
    doc.text(130, 250, "tel: +381 64 321 0990")
    if (type == "masazu")
        doc.save("Masaza.pdf");
    else
        doc.save("Nutricionista.pdf")
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

        patternPhone = /^(\d){3}(\ )?(\d){3}(\ )?(\d){4}$/g
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