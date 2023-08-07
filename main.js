// TODO
// add functionality for numbers bc ascii


const optionNames = ["spaces", "commas", "describe"]

let mode = "commas"

function updateText(){
    var expectedString;
    switch (mode) {
        case "spaces":
            expectedString = null
            try {console.log(document.getElementById("spaces-input").value)
                expectedString = JSON.stringify(document.getElementById("input").value.split(" ".repeat(parseInt(document.getElementById("spaces-input-count").value))).filter(elm => elm))
            } catch (error){

            }
            if (expectedString) document.getElementById("output").innerHTML = expectedString
            break;
        case "commas":
            expectedString = null
            try {
                expectedString = document.getElementById("output").innerHTML = JSON.stringify(document.getElementById("input").value.replace(/\s+/g, '').split(",").filter(elm => elm))
            } catch (error){

            }
            if (expectedString) document.getElementById("output").innerHTML = expectedString
            
            break;
        case "describe":
            // []
            expectedString = null
            if (document.getElementById("describe-input-lines").checked){
                document.getElementById("output").innerHTML = JSON.stringify(document.getElementById("input").value.replace(/\d+(,\d+)*/g, "").replace(document.getElementById("describe-input-struct-front").value, "").replace(document.getElementById("describe-input-struct-back").value, "").replace(/[\t\f\r]+/g, '').split("\n").filter(elm => elm))
            } else {
                let oriString = document.getElementById("input").value
                let frontString = document.getElementById("describe-input-struct-front").value
                let backString = document.getElementById("describe-input-struct-back").value
                let insertString;
                if (frontString != "") insertString = frontString
                else if (backString != "") insertString = backString
                if (insertString != ""){
                    for (let i of indexes(oriString, insertString)){
                        oriString = oriString.slice(0, i) + "," + oriString.slice(i+1)
                    }
                }
                console.log(insertString , frontString, backString)
                document.getElementById("output").innerHTML = JSON.stringify(oriString.replace(/\d+(,\d+)*/g, "").replace(frontString, "").replace(backString, "").replace(/\s+/g, '').split(",").filter(elm => elm))
                
            }
            // document.getElementById("output").innerHTML = JSON.stringify(
            //     document.getElementById(
            //         "input"
            //     ).value.split(
            //         " ".repeat(
            //             parseInt(
                            
            //             )
            //         )
            //     )
            // )
            break;
    }
}

function update(checked){
    let optionNamesCopy = [...optionNames]
    let splicedElement = checked ? optionNamesCopy.splice(optionNames.indexOf(checked), 1) : "null"
    if (document.getElementById(splicedElement + "-input")) document.getElementById(splicedElement + "-input").style.display = "block"
    for (let optionName of optionNamesCopy){
        document.getElementById(optionName).checked = false
        if (document.getElementById(optionName + "-input")) document.getElementById(optionName + "-input").style.display = "none"
    }
    mode = checked
}

for (let checkbox of document.getElementsByClassName("checkbox")){
    checkbox.addEventListener('change', function () {
        if (this.checked){
            update(this.id)
        } else {
            update()
        }
        updateText()
    });
}
/*
document.getElementById("describe-input-numbers").addEventListener('change', function () {
    if (this.checked){
        document.getElementById("describe-input-numbers-input").style.display = "block"
    } else {
        document.getElementById("describe-input-numbers-input").style.display = "none"
    }
});
*/
document.getElementById("input").addEventListener('input', updateText);
document.getElementById("spaces-input-count").addEventListener('input', updateText);
document.getElementById("describe-input-lines").addEventListener('change', updateText);
document.getElementById("describe-input-struct-front").addEventListener('input', updateText);
document.getElementById("describe-input-struct-back").addEventListener('input', updateText);

updateText()