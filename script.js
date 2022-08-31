var inputCity = document.querySelector(".city-name")
inputCity.value = ""
const inputSection = document.querySelector(".inputs")
const bodyResult = document.querySelector(".body")
const footerResult = document.querySelector(".footer")
const backBtn = document.querySelector(".header i")
let api;

document.addEventListener("keypress", (e) => {
    if (e.key == "Enter" && inputCity.value.trim()) {
        var city = inputCity.value.trim();
        requestApi(city)
    }
})
backBtn.addEventListener("click", () => {
    inputSection.classList.add("active")
    bodyResult.classList.remove("result")
    footerResult.classList.remove("result")
    backBtn.classList.remove("active")
    document.querySelector(".result-info").classList.remove("error", "message");
    document.querySelector(".result-info").innerHTML = ""
})

let requestApi = (city) => {
    api = `http://api.weatherapi.com/v1/current.json?key=8ef563ef7e5d4c12866225957220706&q=${city}&aqi=no`;
    fetchData();    
}

let fetchData = ()=>{
    document.querySelector(".result-info").classList.remove("error");
    document.querySelector(".result-info").classList.add("message");
    document.querySelector(".result-info").innerHTML = "getting city data ..."
    fetch(api).then(response => response.json()).then(result => showResult(result)).catch(() => {
    })
}

let showResult = (result) => {
    inputCity.value = ""
    if (!result.location) {
        inputSection.classList.add("active")
        bodyResult.classList.remove("result")
        footerResult.classList.remove("result")
        backBtn.classList.remove("active")

        document.querySelector(".result-info").innerHTML = result.error.message
        document.querySelector(".result-info").classList.add("error");
    }else if(result.location){
        inputSection.classList.remove("active")
        bodyResult.classList.add("result")
        footerResult.classList.add("result")
        backBtn.classList.add("active")
        //    console.log(result);
        document.querySelector("img").setAttribute("src", "https:"+result.current.condition.icon)
        document.querySelector(".circumstances").innerHTML = result.current.condition.text
        if (result.location.name == result.location.region) {
            document.querySelector("#city-result").innerHTML = result.location.name + " , " + result.location.country;  
        }else{
            document.querySelector("#city-result").innerHTML = result.location.name + " , "+result.location.region+" , " + result.location.country;
        }
        document.querySelector(".degree").innerHTML = Math.floor(result.current.temp_c) + "°C"
        document.querySelector("#time").innerHTML =  result.location.localtime.substr(10,6)
        document.querySelector("#feel").innerHTML = Math.floor(result.current.feelslike_c) + "°C"
        document.querySelector("#humidity").innerHTML = result.current.humidity + "%"
    }
}