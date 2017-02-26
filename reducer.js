/**
 * Created by b1ncer on 2017/2/24.
 * 引入 Action , 引入类似 Redux 的 Reducer 概念。
 * 将 container 的 select 函数预处理, 使其支持 Action。select 函数的 dispatch 被处理为发送一个会被 actionHandler 接收并处理的 action 分发器。
 * Usage: reducer(actionHandler)(select)
 * Eg:
 * const containedComponent = container(
 *     props => {return store},
 *     reducer(
 *         (storedProps, action, props) => {
 *             switch (action.type) {
 *                 case 'INIT_ACTION':
 *                     return {
 *                         ...storedProps,
 *                         value: action.value
 *                     }
 *                 ...
 *             }
 *         }
 *     )(
 *         (storedProps, dispatch, props) => {
 *             return {
 *                 ...selectedProps
 *             }
 *         }
 *     )
 * )(OriginalComponent)
 */
const reducer = actionHandler => select =>
    (storedProps, dispatch, props) => {
        const actionDispatch = action => dispatch(actionHandler(storedProps, action, props))
        return select(storedProps, actionDispatch, props)
    }

export default reducer
