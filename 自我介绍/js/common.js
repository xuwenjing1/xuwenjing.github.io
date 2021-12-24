// 通过id名获取元素
function my$(id) {
    return document.getElementById(id);
}

// 通过class名获取元素
function cl$(cla) {
    return document.getElementsByClassName(cla);
}

// 通过标签名获取元素
function ele$(el) {
    return document.getElementsByTagName(el);
}

// 元素绑定事件兼容处理
// function addEventListener(element, type, fn) {
//     // 判断是不是支持这个方法
//     if(element.addEventListener) {
//         element.addEventListener(type, fn, false);
//     }else if(element.attachEvent) {
//         element.attachEvent("on" + type, fn);
//     }else {
//         element["on" + type] = fn;
//     }
// }

// 封装匀速动画函数--->任意一个元素移动到指定的目标位置
// @params：元素 目标位置
function animate(element, target) {
    // 先清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function() {
        var flag = true;
        // 1.获取元素当前的位置
        var current = element.offsetLeft;
        // 2.div每次移动多少
        var step = 10;
        // 判断往哪边移动
        step = current <= target ? step : -step;
        // 3.每次移动后得距离
        current += step;
        // 4.判断移动后的位置是否达到目标位置
        if(Math.abs(target - current) > Math.abs(step)) {
            element.style.left = current + "px";
            flag = false;
        }else {
            // 清理定时器
            clearInterval(element.timeId);
            element.style.left = target + "px";
            flag = true;
        }
    }, 5)
}

// 简化：封装获取页面向上或者向左卷曲出去的距离值
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft,
        top: window.pageYOffset || document.documentElement.scrollTop
    }
}

// 封装变速动画函数--->任意一个元素移动到指定的目标位置
// @params：元素 目标位置
function animateBian(element, target) {
    // 先清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function() {
        var flag = true;
        // 1.获取元素当前的位置
        var current = element.offsetLeft;
        // 2.div每次移动多少
        var step = (target - current) / 10;
        // 判断步数 > 0 向上取整，否则向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 3.每次移动后得距离
        current += step;
        element.style.left = current + "px";
        if(current == target) {
            clearInterval(element.timeId);
        }
        // console.log("目标位置：" + target);
        // console.log("每步的距离：" + step);
        // console.log("当前位置：" + current);
    }, 10)
}

// 获取任意一个元素的任意一个样式属性值
// @params：element（元素）   attr（属性名）
function getStyle(element, attr) {
    // 判断是否支持该方法
    if(window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attr];
    }else {
        return element.currentStyle[attr];
    }
}