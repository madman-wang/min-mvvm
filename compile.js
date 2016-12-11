/**
 * Created by 11592 on 2016/12/11.
 */
function Compile(el) {
    this.$el = this.isElementNode ? el: document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}
Compile.prototype = {
    init: function () {
        this.compileElement(this.$fragment);
    },
    node2Fragment: function (el) {
        var fragment = document.createDocumentFragment(), child;
        while (child = el.child) {
            fragment.appendChild(child);
        }
        return fragment;
    }
};

//  指令渲染
var comileUtil = {
    text: function (node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    bind: function (node, vm, exp, dir) {
        var updaterFn = updater[dir + 'updater'];
        updaterFn && updaterFn(node, vm[exp]);
        new Watcher(vm, exp, function (value, oldVaule) {
            updaterFn && updaterFn(node, value, oldVaule);
        })
    }
};

var updater = {
  textUpdater: function (node, value) {
      node.textContent = typeof value == 'undefined' ? '' : value;
  }
};