const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const xSite = localStorage.getItem('xSite');
const xSiteObject = JSON.parse(xSite);
const hashMap = xSiteObject || [
    { logo: 'Z', url: "https://www.zhihu.com" },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('www.', '')
        .replace('http://', '')
        .replace(/\/.*/, '') //删除/开头的内容
}
let render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                    <div class="site">
                        <div class='logo'>${node.logo}</div>
                        <div class='link'>${simplifyUrl(node.url)}</div>
                         <div class=close><span class="iconfont">&#xe6c9;</span></div>
                    </div>             
            </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })

}
render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加什么网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(), //首字母变成大写
            url: simplifyUrl(url)
        });
        render();
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('xSite', string)
}
$(document).on('keypress', (e) => {
    const keyword = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === keyword) {
            window.open(hashMap[i].url)
        }
    }
})