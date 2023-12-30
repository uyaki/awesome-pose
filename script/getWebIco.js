// ==UserScript==
// @name         提取网页ico
// @description  在网页右下角显示一个按钮，点击可以复制网页的ico地址
// @version      1.0
// @author       uyaki
// @match        *://*/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function getIcoUrl() {
        // 获取网页中的<link>元素，根据rel属性选择icon
        let link = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
        // 如果找到，返回它的href属性值，否则返回默认ico地址
        return link ? link.href : window.location.origin + '/favicon.ico';
    }

    function createButton() {
        // 创建一个<button>元素
        let button = document.createElement('button');
        // 设置按钮的样式，位置，文本等
        button.style.position = 'fixed';
        button.style.bottom = '10px';
        button.style.right = '10px';
        button.style.zIndex = '9999';
        button.style.padding = '5px';
        button.style.border = 'none';
        button.style.backgroundColor = 'lightblue';
        button.style.cursor = 'pointer';
        button.textContent = '复制ico地址';
        // 设置按钮的点击事件，复制ico地址到剪贴板，并提示成功
        button.onclick = function() {
            let icoUrl = getIcoUrl();
            GM_setClipboard(icoUrl);
            alert('已复制ico地址:' + icoUrl);
        };
        // 将按钮添加到网页的右下角
        document.body.appendChild(button);
    }

    // 等待网页加载完成后，创建按钮
    window.addEventListener('load', function() {
        createButton();
    });
})();