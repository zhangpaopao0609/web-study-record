class ACompile {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;

        this.$fragment = this.node2Fragment(this.$el);
        this.compile(this.$fragment);
        this.$el.appendChild(this.$fragment);
    }

    node2Fragment(el) {
        const fragment = document.createDocumentFragment();
        let child;
        while(child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    compile(el) {
        const childNodes =  el.childNodes;
        Array.from(childNodes).forEach(node => {
            if(node.nodeType == 1) {  // 元素
               console.log(`编译元素${node.nodeName}`);
               this.complieElement(node);
            } else if(this.isMustache(node)) {
                // 只关心{{  }}
               console.log(`编译文本${node.textContent}`);
               this.compileText(node);
            }
            node.children && node.childNodes.length > 0 && this.compile(node);
        }) 
    }

    isMustache(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    compileText(node) {
        const key = RegExp.$1;
        this.update(node, key, 'text')
    }

    complieElement(node) {
        const attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            const attrName = attr.name;         // a-text
            const attrValue = attr.value;       // name
            if( /a-/.test(attrName) ) {         // a- 
                console.log(attrName, attrValue);
                this[attrName.slice(2)] && this[attrName.slice(2)](node, attrValue)
            } else if (/@/.test(attrName)) {       // @
                console.log(attrName, attrValue);
                this.eventHandle(node, attrName.slice(1), attrValue);
            }
        })        
    }

    update(node, key, attr) {
        const updator = this[`${attr}Updator`];
        updator && updator(node, this.$vm[key]);
        new Watcher(this.$vm, key, function(value){
            updator && updator(node, value);
        })
    }

    // 文本更新
    textUpdator(node, value) {
        node.textContent = value;
    }
    // a-text
    text(node, key) {
        this.update(node, key, 'text');
    }
    // model
    model(node, key) {
        node.addEventListener('input', e => {
            this.$vm[key] = e.target.value;
        });
        this.update(node, key, 'model');
    }
    // modelUpdator
    modelUpdator(node, value) {
        node.value = value;
    }
    // html
    html(node, key) {
        this.update(node, key, 'html');
    }
    // htmlUpdator
    htmlUpdator(node, value) {
        node.innerHTML = value;
    }
    // @
    eventHandle(node, eventName, event) {
        node.addEventListener(eventName, () => {
           this.$vm.$options.methods[event] && this.$vm.$options.methods[event].call(this.$vm);
        });
    }
    
}