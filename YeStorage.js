const YeStorage = function (preId, timeSign) {
    this.preId = preId || '@'; // 键值前缀
    this.timeSign = timeSign || '_' // value值与时间的分割线
}
YeStorage.prototype = {
    status: {
        success: 0, // 成功
        failure: 1, // 失败
        overflow: 2, // 溢出
        timeout: 3 // 超时
    },
    storage: window.localStorage,
    getkey: function (key) {
        key = typeof key === 'string' ? key : JSON.stringify(key)
        return this.preId + key
    },
    set: function (key, value, fn, time) { // 设置数据
        let status = this.status.success
        let Yekey = this.getkey(key)
        let Yevalue = typeof value === 'string' ? value : JSON.stringify(value)
        let timeout = null
        // 设置过期时间，默认过期时间为1个月
        try {
            timeout = new Date(time).getTime() || time.getTime()
        } catch{
            timeout = new Date().getTime() + 1000 * 60 * 60 ** 24 * 31
        }
        try {
            this.storage.setItem(Yekey, time + this.timeSign + Yevalue)
        } catch {
            status = this.status.overflow
        }
        fn && fn.call(this, { status, key, value })
    },
    get: function (key, fn) { // 获取数据
        let status = this.status.success,
            Yekey = this.getkey(key),
            value = null,
            time,
            result;
        try {
            value = this.storage.getItem(Yekey)
        } catch (e) {
            result = {
                status: this.status.failure,
                value: null
            }
            fn && fn.call(this, result)
            return result
        }
        if (value) {
            time = value.split(this.timeSign)[0]
            // 判断是否过期
            if (time > new Date().getTime()) {
                value = value.split(this.timeSign)[1]
            } else {
                result = {
                    status: this.status.timeout,
                    value: null
                }
                this.remove(key)
                fn && fn.call(this, result)
                return result
            }
        } else {
            status = this.status.failure
        }
        result = {
            status: status,
            value: value
        }
        fn && fn.call(this, result)
        return result
    },
    remove: function (key, fn) { // 删除数据
        let status = this.status.failure
        let Yekey = this.getkey(key)
        let value = null
        try {
            value = this.storage.getItem(Yekey)
        } catch (e) {
            console.log(e)
        }
        if (value) {
            try {
                this.storage.removeItem(Yekey)
                status = this.status.success
                value = value.split(this.timeSign)[0]
            } catch (e) {
                console.log(e)
            }
        }
        fn && fn.call(this, { status, value })
    }
}

export default YeStorage