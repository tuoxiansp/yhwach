/**
 * Created by b1ncer on 2017/2/22.
 * store: 存储状态。
 * 参数：
 * init @type - Function 使用 dispatch 参数初始化 store 。
 * Usage: const store =
 */
const Emitter = function Emitter() {
    const eventHandlers = []
    this.on = function(handler) {
        eventHandlers.push(handler)
    }
    this.emit = function(data) {
        for (let i = 0, j = eventHandlers.length; i < j; i++) {
            eventHandlers[i](data)
        }
    }
}

//init: dispatch => dispatch(initialStoredData)
const store = (init) => {
    const emitter = new Emitter()

    let storedData

    const dispatch = data => {
        storedData = data
        emitter.emit(storedData)
    }

    function storeInstance() {}

    function get() {
        return storedData
    }

    storeInstance.on = handler => {
        emitter.on(handler)
        return storeInstance
    }

    storeInstance.dispatch = data => {
        dispatch(data)
        return storeInstance
    }

    storeInstance.get = get

    init(dispatch)

    return storeInstance
}

export default store
