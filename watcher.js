/**
 * Created by 11592 on 2016/12/11.
 */
Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function (key) {
        Dep.target = this;
        var value = this.vm[exp];
        Dep.target = null;
        return value;
    }
};
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();
}