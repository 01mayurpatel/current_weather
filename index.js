
const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html","utf-8");
const replaceVal = (tempVal,orgVal) =>{
    let temperature = tempVal.replace("{%tempval%}",(orgVal.main.temp - 273.15).toFixed(2))
    temperature = temperature.replace("{%tempmin%}",(orgVal.main.temp_min - 273.15).toFixed(2))
    temperature = temperature.replace("{%tempmax%}",(orgVal.main.temp_max - 273.15).toFixed(2))
    temperature = temperature.replace("{%location%}",orgVal.name)
    temperature = temperature.replace("{%country%}",orgVal.sys.country)
    return temperature;
}
const server = http.createServer((req,res) =>{
    if(req.url = "/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=2b0c2b92bbda53df84bfcfedc08287a2')
        .on('data', function (chunk) {
            const objdata = JSON.parse(chunk); 
            const arrData = [objdata];
            // console.log(parseFloat(arrData[0].main.temp - 273.15).toFixed(2));
            const realTimeData = arrData.map(val => replaceVal(homeFile,val)).join();
            res.write(realTimeData);
            console.log(realTimeData);
        })
        .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
        res.end();
        
        });
    }
    
});
server.listen(8000,"127.0.0.1");
console.log("working")