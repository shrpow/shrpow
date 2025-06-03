class IpInfo {
    constructor(ip, lat, lon, city) {
        this.ip = ip;
        this.lat = lat;
        this.lon = lon;
        this.city = city;
    }
}

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
const getRandomInt = (min, max) => Math.random() * (max - min) + min;
const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)
const getIpInfo = async () => {
    resp = await fetch("https://freeipapi.com/api/json");
    resp_json = await resp.json();
    return new IpInfo(
        resp_json.ipAddress,
        resp_json.latitude,
        resp_json.longitude,
        resp_json.cityName
    );
};

document.addEventListener("DOMContentLoaded", async () => {
    let ip_info = await getIpInfo();

    let contentDiv = document.querySelector("#content");
    let contentText = `
<b>your ip</b> is ${ip_info.ip}<br/>
<b>you're currently at</b> ${ip_info.lat}, ${ip_info.lon}<br/>
<b>and your fuckin' ua is</b> ${navigator.userAgent}<br/>
    `;

    const fillText = async () => {
        for (let i = 0; i < contentText.length; i += 1) {
            contentDiv.innerHTML = contentText.slice(0, i);
            await delay(getRandomInt(10, 40));
        }
    };

    const changePageBackground = async () => {
        while (1) {
            document.body.style.backgroundColor = getRandomColor();
            await delay(4000);
        }
    };

    Promise.all([fillText(), changePageBackground()]).then(() => {});
});
