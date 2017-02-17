export class Util {
    onResizeComplete() {
        if (window.isResizing) {
            return Promise.resolve(false);
        }
        window.isResizing = true;
        let checkHeight = (currentHeight, callback)=> {
            let id = setTimeout(()=> {
                clearTimeout(id);
                if (window.innerHeight !== currentHeight) {
                    checkHeight(window.innerHeight, callback);
                } else {
                    window.isResizing = false;
                    callback(true);
                }
            }, 300);
        }
        return new Promise(resolve => {
            checkHeight(window.innerHeight, resolve);
        });
    }
}