/**
 * Created by b1ncer on 2017/2/22.
 * container: 给 Component 包裹一层状态管理器,生成一个被经过加工的新的 Component
 * 参数
 * init: @type - Function 初始化函数, 参数为传入的 props, 返回一个 store 对象
 * select: @type - Function props 选择器函数, 有三个参数
 * 1. storedProps(store 中存储的 props),
 * 2. props(传入的 props),
 * 3. dispatch(函数, 修改 store 的值)
 *
 * 使用:
 * const containedComponent = container(
 *     props => {return store},
 *     (storedProps, props, dispatch) => {
 *         return {
 *             value: storedProps.value,
 *             onInit: () => {
 *                 requestData().then(response => {
 *                     dispatch({value: response})
 *                 })
 *             }
 *         }
 *     }
 * )(OriginalComponent)
 */
import React, {Component, PropTypes} from 'react'
import inject from './inject'
import shallowCompare from './shallowCompare'

class Controller extends Component {

    state = {}

    constructor(...args) {
        super(...args)
        const {_init, _select, _comp, ...rest} = this.props
        this.store = _init(rest)
        this.state.storedProps = this.store.on(this.onUpdate.bind(this)).get()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState)
    }

    onUpdate(storedProps) {
        this.setState({
            storedProps: storedProps
        })
    }

    render() {
        const {storedProps} = this.state
        const {_select, _comp, _init, ...rest} = this.props
        const props = _select(storedProps, this.store.dispatch, rest)

        return React.createElement(
            _comp,
            props
        )
    }
}

const container = function container(

    init,
    select = (storedProps, dispatch, props) => ({...storedProps})

) {
    return comp => inject({

        _init: init,
        _select: select,
        _comp: comp

    })(Controller)
}

export default container
