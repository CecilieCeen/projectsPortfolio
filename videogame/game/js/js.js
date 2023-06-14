//html
const profileimgprint = document.getElementById('profileimgprint')
const userpic = document.getElementById('userpic')
var selctedimg = true
const logout = document.getElementById('logout')

// authetication

//index

//login

//register
    function showProfilPics(data){
        console.log(data)
        for(let objects of data.pics){
        const pics = document.createElement('div')
        pics.classList.add('pics')
        pics.innerHTML=`<img class="imgklik" id=${objects.id} src=${objects.img}>`
        profileimgprint.appendChild(pics)
        }
        let imgklik = document.querySelectorAll('.imgklik')
        imgklik.forEach(img =>{
            img.addEventListener("click",fetchimgData)

    function fetchimgData() {
        if(selctedimg == true) {
            this.classList.add("selectedImg")
            selctedimg = false
        } else {
            imgklik.forEach(img =>{
                img.className="imgklik"})
            this.classList.add("selectedImg")
        }
        fetch(`http://localhost:3000/profilePics/${this.id}`)
            .then(res=> res.json())
            .then((data) => printimginfo(data))

        function printimginfo(data){
            if(userpic.value.length == 0){
                userpic.setAttribute('value',`${data.imgurl[0].img}`)
            }else{
                userpic.setAttribute('value',``)
                userpic.setAttribute('value',`${data.imgurl[0].img}`)
            }
            }
    }
    })
}

//spil side

function printprofile(data){
    console.log(data)
}



async function logoutfunction() {
    window.location.replace('http://localhost:3000/logout')
}

//andet
switch (window.location.pathname){
    case "/game/registrer.html":
        fetch('http://localhost:3000/profilePics')
            .then((res)=> res.json())
            .then((data) => showProfilPics(data))
        break;
    case "/game/gameselcect.html":
        if(document.cookie == ""){
            console.log('fail')
            window.location.replace('http://localhost:3000/authentication')
        } else{
            fetch(`http://localhost:3000/userinfo`)
                .then((res)=> res.json())
                .then((data) => printprofile(data))

            logout.addEventListener('click',logoutfunction)
        }
        break;
    default:
        break;
}

