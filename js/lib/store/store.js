var storage = window.localStorage;
// 本地仓库
function Store() {
    if (!(this instanceof Store)) {
        return new Store();
    }
}
Store.prototype = {
    // 设置值
    set: function(key, val) {
        // 添加 key 下的值
        if (key && val) {
            storage.setItem(key, stringify(val));
        } 
        // 拆分 key 为对象存入
        else if (!val && is_JSON(key)) {
            for (var i in key) {
                this.set(i, key[i])
            }
        }
        // 删除 key 下的值
        else {
            return this.remove(key);
        }
        return this;
    },
    // 获取值
    get: function(key) {
        // 解析所有内容
        if (!key) {
            var ret = {};
            this.forEach(function(key, val) {
                ret[key] = val;
            });
            return ret;
        }
        // 解析当前内容
        return deserialize(storage.getItem(key));
    },
    // 清空值
    clear: function() {
        storage.clear();
        return this;
    },
    // 删除值
    remove: function(key) {
        var val = this.get(key);
        storage.removeItem(key);
        return val;
    },
    // 是否具有指定名称的属性
    has: function(key) {
        return storage.hasOwnProperty(key);
    },
    // 
    keys: function() {
        var d = [];
        this.forEach(function(k, list) {
            d.push(k);
        });
        return d;
    },
    // 获取长度
    size: function() {
        return this.keys().length;
    },
    // 遍历数据
    forEach: function(callback) {
        for (var i = 0; i < storage.length; i++) {
            var key = storage.key(i);
            if (callback(key, this.get(key)) === false) break;
        }
        return this;
    },
    // 查询存储数据
    search: function(str) {
        var arr = this.keys(), dt = {};
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(str) > -1) dt[arr[i]] = this.get(arr[i]);
        }
        return dt;
    },
};