'use strict';

const phases = Array.from(document.querySelectorAll("main > div"));
const nextPhase = Array.from(document.getElementsByClassName("nextPhase"));
const openBtn = document.getElementById("infoOpen");
let phaseIndex = 0;

// Rydder data når man trykker "spil igen"
if (window.location.hash === "#retry") {
    phaseIndex = 1;
    window.location.hash = "";
}

function playAgain() {
    window.location.hash = "#retry";
    window.location.reload();
}

// Ændrer farve på info knappen
const infoColor = {
    1: "#008A69",
    6: "#008A69",
    8: "#008A69",
    9: "#008A69",
    10: "#008A69",
    12: "#008A69",
    14: "#008A69",
    15: "#008A69"
};

// Putter display none på alle faser eksklusiv den første
phases.forEach(phase => {
    phase.style.display = "none";
});
phases[phaseIndex].removeAttribute("style");

// Skifter display fra fase til fase, når man klikker på knapperne
function changePhase() {
    phases.forEach(phase => {
        phase.style.display = "none";
    });
    phaseIndex++;
    phases[phaseIndex].removeAttribute("style");
    openBtn.classList.remove("hidden");
    openBtn.style.color = infoColor[phaseIndex] || "";
}

nextPhase.forEach(button => {
    button.addEventListener("click", event => {
        if (!event.currentTarget.classList.contains("disabledBtn")) {
            changePhase();
        }
    });
});

// Deaktiverer og aktiverer knapper
function disableBtn(button) {
    button.classList.add("disabledBtn");
}

function enableBtn(button) {
    button.classList.remove("disabledBtn");
}


// Om projektet info knap/fase
const showContent = document.getElementById("popupInfo");
const closeBtn = document.getElementsByClassName("infoClose")[0];

function showFunction() {
    showContent.style.display = "block";
}

function closeFunction() {
    showContent.style.display = "none";
}

openBtn.addEventListener("click", showFunction);
closeBtn.addEventListener("click", closeFunction);


// Hackerbar timer
let barMoving = false;
function loadingBarMove() {
  if (!barMoving) {
    barMoving = true;
    let display = document.getElementById("hacket");
    let none = document.getElementById("indtast");
    let barLoading = document.getElementById("barIndtast");
    let procentShow = document.getElementById("showProcent");
    let width = 90;
    let id = setInterval(frame, 5454); //tempo > how fast the bar runs
    function frame() {
      if (width >= 100 && phaseIndex === 17) { 
        clearInterval(id);
        barMoving = false;
        openBtn.classList.add("hidden");
        none.style.display = "none"; 
        display.style.display = "grid";
        barLoading.style.background = "";
        barLoading.style.width = "";
        procentShow.innerHTML = "90%";
      } else {
        width++;
        barLoading.style.background = "red";
        barLoading.style.width = width + "%";
        procentShow.innerHTML = width  + "%";
      }
    }
  }
}


// Kategori fasen (Værdi i array = 5)
let categoryList = ["Hvad er din yndlingssang?", "Hvad er din livret?", "Hvem er din yndlingskunstner?", "Hvad er din yndlingsfilm?" ];
let text = document.getElementById("kategoriValg");
const rightButton = document.getElementById("skiftRight");
const leftButton = document.getElementById("skiftLeft");
const categoryEnter = document.getElementById("kategoriEnter");
const categoryInput = document.getElementById("inputFelt");
let categoryIndex = 0;

text.innerHTML = categoryList[0];
disableBtn(categoryEnter);

function activeCategoryBtn() {
    if (categoryInput.value.length > 0) {
        enableBtn(categoryEnter);
    } else {
        disableBtn(categoryEnter);
    }
}

function changeTextLeft(){
    if(categoryIndex === 0){
        categoryIndex = categoryList.length - 1;}
    else {
        categoryIndex--;}

    text.innerHTML = categoryList[categoryIndex];
}

function changeTextRight(){
    if(categoryIndex === categoryList.length - 1){
        categoryIndex = 0;}
    else {
        categoryIndex++;}

    text.innerHTML = categoryList[categoryIndex];
}

rightButton.addEventListener("click", changeTextRight);
leftButton.addEventListener("click", changeTextLeft);
categoryInput.addEventListener("input", activeCategoryBtn);


// Adgangskode data
const passwordParts = [];
const dragstart_handler = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
};

function passwordData(data){
    passwordParts.push(data);
    Array.from(document.getElementsByClassName("antalTegn")).forEach(e => e.innerHTML = passwordParts.join("").length + " tegn");
    Array.from(document.getElementsByClassName("kodeDele")).forEach(e => e.innerHTML = passwordParts.join(" "));
    let dragElement = document.createElement("p");
    dragElement.id = "dragElement" + passwordParts.length;
    dragElement.className = "dragElement";
    dragElement.innerHTML = data;
    dragElement.setAttribute("draggable", true);
    dragElement.addEventListener("dragstart", dragstart_handler);
    document.getElementById("kodeDrag").appendChild(dragElement);
}


// Flip navenet fasen (Værdi i array = 6)
const flippedWord = document.getElementById("wordFlip");
const flipEnter = document.getElementById("flipEnter");

function storeLowercase(){
    let categoryInput = document.getElementById("inputFelt").value.split(" ").join("").split("").reverse().join("").toLowerCase();
    flippedWord.innerHTML = categoryInput;
    if (categoryInput.length > 0) {
        changePhase();
        categoryList.splice(categoryIndex, 1);
        categoryIndex = 0;
        text.innerHTML = categoryList[categoryIndex];
        passwordData(categoryInput);
        document.getElementById("inputFelt").value = "";
        disableBtn(categoryEnter);
    }
}

function categoryReturn() {
    if (passwordParts.join("").length < 11) {
        phaseIndex = 4;
        document.getElementById("kategoriDialog").innerHTML = "For at garantere, at dit kodeord er langt nok, må du hellere vælge en kategori mere. Den vender vi også om.";
    }
    changePhase();
}

categoryEnter.addEventListener("click", storeLowercase);
flipEnter.addEventListener("click", categoryReturn);


// Vælg tal fasen (fornavn og efternavn) (Værdi i array = 8)
let showNumber1 = document.getElementById("fornavnTalKasse");
let showNumber2 = document.getElementById("efternavnTalKasse");

function getNumber1(data){
    showNumber1.innerHTML = data;
}

function getNumber2(data){
    showNumber2.innerHTML = data;
}

const alphabet = "abcdefghijklmnopqrstuvwxyzæøå";
let inputForNavn = document.getElementById("forNavn");
let inputEfterNavn = document.getElementById("efterNavn");
const chooseNumberEnter = document.getElementById("vaelgTalEnter");

disableBtn(chooseNumberEnter);

function activateChooseNumberBtn() {
    if (inputForNavn.value.length > 0 && inputEfterNavn.value.length > 0) {
    enableBtn(chooseNumberEnter);
    } else {
        disableBtn(chooseNumberEnter);
    }
}

function getNumberForNavn() {
    this.value = this.value.replace(/[^\p{L}]/igu, "");
    let res = "";
    let num = this.value.split("");
    for (let i = 0; i < num.length; i++) {
        res += alphabet.match(new RegExp(num[i], "i")).index + 1;
    }
    let resultatForNavn = document.getElementById("fornavnTal").innerHTML = res;
    activateChooseNumberBtn();
    getNumber1(resultatForNavn);
}

function getNumberEfterNavn() {
    this.value = this.value.replace(/[^\p{L}]/igu, "");
    let resEF = "";
    let num = this.value.split("");
    for (let i = 0; i < num.length; i++) {
        resEF += alphabet.match(new RegExp(num[i], "i")).index + 1;
    }
    let resultatEfterNavn = document.getElementById("efternavnTal").innerHTML = resEF;
    activateChooseNumberBtn();
    getNumber2(resultatEfterNavn);
}

inputForNavn.addEventListener("input", getNumberForNavn);
inputEfterNavn.addEventListener("input", getNumberEfterNavn);


//Tal ganges fasen (Værdi i array = 9)
const gangMed = document.getElementById("talDerGanges");
let endeligeTalFN = document.getElementById("finalFornavn");
let endeligeTalEN = document.getElementById("finalEfternavn");
const multiplyNumberEnter = document.getElementById("gangTalEnter");

disableBtn(multiplyNumberEnter);

function finalNumber1(final) {
    endeligeTalFN.innerHTML = final;
}

function finalNumber2(final) {
    endeligeTalEN.innerHTML = final;
}

function multiply() {
    this.value = this.value.replace(/[^2-9]/igu, "");
    this.value = this.value.slice(-1);
    let endeligeTalResultatFN = showNumber1.innerHTML * gangMed.value;
    finalNumber1(endeligeTalResultatFN);
    let endeligeTalResultatEN = showNumber2.innerHTML * gangMed.value;
    finalNumber2(endeligeTalResultatEN);
    if (gangMed.value.length > 0) {
        enableBtn(multiplyNumberEnter);
    } else {
        disableBtn(multiplyNumberEnter);
    }
}

gangMed.addEventListener("input", multiply);


//Tal resultat fasen (Værdi i array = 10)
const talResultatEnter = document.getElementById("talResultatBtn");

function storeNumbers() {
    passwordData(document.getElementById("finalFornavn").innerHTML);
    passwordData(document.getElementById("finalEfternavn").innerHTML);
}

talResultatEnter.addEventListener("click", storeNumbers);


// Vælg tegn fasen (Værdi i array = 12)
let toggleColor = document.getElementsByClassName("specialTegn");
const symbolEnter = document.getElementById("specialtegnEnter");

disableBtn(symbolEnter);

function changeColor(e) {
    e.currentTarget.classList.toggle("active");
    let activeSymbols = document.querySelectorAll(".specialTegn.active");
    if (activeSymbols.length > 2) {
        if (e.currentTarget.classList.contains("active")) {
            e.currentTarget.classList.remove("active");
        }
    }
    if (activeSymbols.length > 1) {
        Array.from(document.querySelectorAll(".specialTegn:not(.active)")).forEach(e => e.style.cursor = "default");
    } else {
        Array.from(document.querySelectorAll(".specialTegn")).forEach(e => e.removeAttribute("style"));
    }
    if (activeSymbols.length > 0) {
        enableBtn(symbolEnter);
    } else {
        disableBtn(symbolEnter);
    }
}

function storeSymbols() {
    Array.from(document.querySelectorAll(".specialTegn.active")).forEach(e => passwordData(e.innerHTML));
}

symbolEnter.addEventListener("click", storeSymbols);
for (let i = 0 ; i < toggleColor.length; i++) {
    toggleColor[i].addEventListener('click', changeColor); 
 }

// Drag and drop fasen (Værdi i array = 14)
const dragDropEnter = document.getElementById("dragDropBtn");
const combinedParts = document.getElementById("kodeKombineret");
const ex1 = document.getElementById("eks1");
const ex2_1 = document.getElementById("eks2-1");
const ex2_2 = document.getElementById("eks2-2");

disableBtn(dragDropEnter);

function storeCombinedPassword(){
    const parts = Array.from(document.getElementById("kodeDrop").childNodes).map(e => e.innerHTML);
    let passwordChain = parts.join("");
    combinedParts.innerHTML = passwordChain;
    Array.from(document.getElementsByClassName("kodeDele")).forEach(e => e.innerHTML = passwordChain);
    ex1.innerHTML = passwordChain;
    ex2_1.innerHTML = parts.slice(0, parts.length/2).join("");
    ex2_2.innerHTML = parts.slice(parts.length/2).join("");
}

const dragover_handler = (e) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
};
const drop_handler = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    let target = e.currentTarget;
    let right = Array.from(target.childNodes).find(el => e.pageX < el.offsetLeft);
    target.insertBefore(document.getElementById(data), right);
    storeCombinedPassword();
    if (document.getElementById("kodeDrag").childNodes.length === 0) {
        enableBtn(dragDropEnter);
    }
};
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.getElementsByClassName("dragElement");
    for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute("draggable", true);
    elements[i].addEventListener("dragstart", dragstart_handler);
    }
    const dropZone = document.getElementById("kodeDrop");
    dropZone.addEventListener("drop", drop_handler); 
    dropZone.addEventListener("dragover", dragover_handler);
});


// Indtast (store bogstaver) fasen (Værdi i array = 17)
const accountInput = document.getElementById("inputFeltKonto");
const accountEnter = document.getElementById("kontoEnter");
const passwordLength = document.getElementById("antalTegnIndtast");
const passwordBase = document.getElementById("kodeordIndtast");
let accountIndex = 0;

disableBtn(accountEnter);

function activeAccountBtn() {
    let passwordMatch = accountInput.value.replace(/[A-ZÆØÅ]/g, "") === passwordBase.innerHTML;
    if (accountInput.value.match(/[A-ZÆØÅ]/g) && passwordMatch) {
        enableBtn(accountEnter);
    } else {
        disableBtn(accountEnter);
    }
}

function changeAccount() {
    if (!accountEnter.classList.contains("disabledBtn")) {
        disableBtn(accountEnter);
        accountIndex++;
        if (accountIndex === 1) {
            document.getElementById("googlesKode").value = accountInput.value;
            document.getElementById("kontoSpan").innerHTML = "Facebook";
            document.getElementById("kontoBeigeBox").innerHTML = "Skynd dig, hackeren bryder snart igennem!";
            loadingBarMove();
        }
        if (accountIndex === 2) {
            document.getElementById("facebooksKode").value = accountInput.value;
            document.getElementById("kontoSpan").innerHTML = "Netbank";
            document.getElementById("kontoBeigeBox").innerHTML = "Sidste konto. Du er der næsten! ";
        }
        if (accountIndex === 3) {
            document.getElementById("netbanksKode").value = accountInput.value;
            changePhase();
        }
        accountInput.value = "";
        countChars();
    }
}

function countChars() {
    passwordLength.innerHTML = Math.max(passwordBase.innerHTML.length, accountInput.value.length) + " tegn";
}

accountInput.addEventListener("input", activeAccountBtn);
accountEnter.addEventListener("click", changeAccount);
accountInput.addEventListener("input", countChars);


// Tak for spil fasen (Værdi i array = 19)
Array.from(document.getElementsByClassName("spilIgenBtn")).forEach(e => e.addEventListener("click", playAgain));


// Kopier koder fasen (Værdi i array = 20)
function copyGoogleKode() {
    const copyText = document.getElementById("googlesKode");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById("copyGoogle").style.backgroundColor = "#623cea";
    document.getElementById("copyGoogle").style.color = "white";
    document.getElementById("copyGoogle").style.border = "none";
}

function copyFacebookKode() {
    const facebookCode = document.getElementById("facebooksKode");
    facebookCode.select();
    facebookCode.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById("copyFacebook").style.backgroundColor = "#623cea";
    document.getElementById("copyFacebook").style.color = "white";
    document.getElementById("copyFacebook").style.border = "none";
}

function copyNetbankKode() {
    const netbankCode = document.getElementById("netbanksKode");
    netbankCode.select();
    netbankCode.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById("copyNetbank").style.backgroundColor = "#623cea";
    document.getElementById("copyNetbank").style.color = "white";
    document.getElementById("copyNetbank").style.border = "none";
}

function goBack() {
    phaseIndex = 18;
    changePhase();
}

document.getElementById("copyGoogle").addEventListener("click", copyGoogleKode);
document.getElementById("copyFacebook").addEventListener("click", copyFacebookKode);
document.getElementById("copyNetbank").addEventListener("click", copyNetbankKode);
document.getElementById("tilbageBtn").addEventListener("click", goBack);


// Du er blevet hacket fasen (Værdi i array = 21)
function tryAgain() {
    phaseIndex = 16;
    accountIndex = 0;
    disableBtn(accountEnter);
    document.getElementById("kontoSpan").innerHTML = "Google";
    document.getElementById("kontoBeigeBox").innerHTML =
    `<p> Indsæt store bogstaver i kodeordet til
    dine konti. Brug så mange bogstaver du
    har lyst til. Placeringen bestemmer du
    selv.
    <p>Eks. <strong>L</strong>inkedI<strong>n</strong> = <strong>LN</strong><br>
    <strong>L</strong>olim(18)relledakirf3<strong>N</strong><br>
    olim(18)<strong>LN</strong>relledakirf3</p>`;
    accountInput.value = "";
    countChars();
    changePhase();
}

document.getElementById("prøvIgen").addEventListener("click", tryAgain);
