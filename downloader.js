var ssQuery = "bycicle"

var puppeteer = require("puppeteer")
var enar = "https://translate.google.com/?sl=en&tl=ar&op=translate"
var enfi = "https://translate.google.com/?sl=en&tl=tl&op=translate"
var enhi = "https://translate.google.com/?sl=en&tl=hi&op=translate"
var enru = "https://translate.google.com/?sl=en&tl=ru&op=translate"
var entu = "https://translate.google.com/?sl=en&tl=tr&op=translate"
var ench = "https://translate.google.com/?sl=en&tl=zh-CN&op=translate"
var enge = "https://translate.google.com/?sl=en&tl=de&op=translate"
var enin = "https://translate.google.com/?sl=en&tl=id&op=translate"
var enja = "https://translate.google.com/?sl=en&tl=el&op=translate"
var enhe = "https://translate.google.com/?sl=en&tl=iw&op=translate"
var lang = [entu , enfi , enhi , enru , enar , ench , enge , enin , enja , enhe]
var results = []

async function scrape(msg) {
var browser = await puppeteer.launch({headless: true})
var loop = await new Promise ((res , rej) => lang.forEach(async function(item){
var page = await browser.newPage()
await page.setDefaultNavigationTimeout(0)
await page.goto(item)
await page.waitForSelector(".er8xn")
var box = await page.$(".er8xn")
await box.click()
await box.type(msg)
await page.waitForSelector("#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > c-wiz.P6w8m.BDJ8fb > div.dePhmb > div > div.J0lOec > span.VIiyi > span > span")
var translation = await page.evaluate(function(){
var tran = document.querySelector("#yDmH0d > c-wiz > div > div.WFnNle > c-wiz > div.OlSOob > c-wiz > div.ccvoYb > div.AxqVh > div.OPPzxe > c-wiz.P6w8m.BDJ8fb > div.dePhmb > div > div.J0lOec > span.VIiyi > span > span")
return tran.innerHTML})
var urllink = await "https://www.google.com/search?q=" + translation.split(" ").join("+") + "&tbm=isch&ved=2ahUKEwi2jebBnNjtAhWS7-AKHRzbBTIQ2-cCegQIABAA&oq=croco&gs_lcp=CgNpbWcQARgBMgQIIxAnMgcIABCxAxBDMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgQIABBDOgcIIxDqAhAnUJd6WKCGAWCloQFoAXAAeACAAawBiAHmBZIBAzAuNZgBAKABAaoBC2d3cy13aXotaW1nsAEKwAEB&sclient=img&ei=T_3cX_apK5LfgwectpeQAw&bih=662&biw=1299"
await results.push(urllink)
await page.close()
if (results.length == 10) {res(results)}})).then(async (x) => {
var numbz = 0
var inc = 0
console.log(x)
while(numbz < 10) {
var page = await browser.newPage()
await page.goto(x[numbz])
await page.evaluate(function(){setInterval(function() {
document.scrollingElement.scrollBy(0 , 50000)
} , 2000)})
await page.waitForSelector(".mye4qd" , {visible: true})
var more = await page.$(".mye4qd")
await more.click()
var imgs = await page.$$("div > a:nth-child(1) > div:nth-child(1) > img:nth-child(1)")
await console.log(imgs.length)
var numb = 0
while(numb < imgs.length) {imgs[numb].screenshot({path: "imgs/" + ssQuery + (inc + numb) + ".png"})
numb++
await page.waitFor(3000)
}
inc = inc + imgs.length
numbz++
}
})
}
scrape(ssQuery)
