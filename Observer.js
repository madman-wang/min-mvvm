/**
 * Created by 11592 on 2016/12/11.
 */
//  递归为对象添加数据观察
function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
}

//  数据观察事件
function defineReactive(data, key, value) {
    var dep = new Dep();
    observe(value);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function () {
            Dep.target && dep.addDep(Dep.target);
            return value;
        },
        set: function (newVal) {
            if (value == newVal) return;
            value = newVal;
            dep.notify();
        }
    })
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        })
    }
};

var a = {name: 'wangi'};
observe(a);