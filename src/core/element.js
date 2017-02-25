const createElement = document.createElement;

document.createElement = function(tagName, options = {}) {
    let node = createElement.call(document, tagName);

    if (options.innerHTML) {
        node.innerHTML = options.innerHTML;
        delete options.innerHTML;
    }
    if (options.innerText) {
        node.innerText = options.innerText;
        delete options.innerText;
    }
    if (options.css) {
        Object.assign(node.style, options.css);
        delete options.css;
    }
    
    for (let key in options) {
        node.setAttribute(key, options[key]);
    }

    return node;
}

Element.prototype.css = function(props = {}) {
    if (props !== null) {
        Object.assign(this.style, props);
    }
}

document.sleep = function(time = 0) {
    return new Promise(resolve => {
        let id = setTimeout(()=> {
            resolve();
            clearTimeout(id);
        }, time);
    })
}