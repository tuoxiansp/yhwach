## API

### `store(initStore)`
  
创建一个 Store 对象。  
  
#### Arguments
  
- `initStore(dispatch)` (Function): 初始化函数，参数 dispatch 函数给 Store 对象赋值，如  

`dispatch => dispatch('Hello, I\'m the initial value')`  
  
#### Returns
  
一个 Store 对象。  

### `container(getStore, select)`
  
创建一个 Container 组件。  

#### Arguments
  
- `getStore(props): Store` (Function): 获取 Store 对象的函数，会在创建 Container 组件时执行，且在整个组件生命周期只执行一次。  
  
- `[select(storedProps, dispatch, props): selectedProps]` (Function): Props 选择器 -- 根据参数，计算出将要传入 Component 的 props 。  
  
#### Returns
  
一个 Component 包装器，接受一个 Component 作为参数，得到一个新的包装过的 Component ，新 Component 的 props 是 select 函数的返回值。  
  
### `reducer(actionHandler)(select)`
  
创建一个 reducer 类型的 select 函数，帮助在数据流中引入 Action ，以支持复杂逻辑的处理。   
  
#### Arguments

- `actionHandler(storedProps, action, props): willBeStoredProps` (Function): Action 处理器，返回值将会被保存在 Store 中。  
  
#### Returns
  
一个 select 包装器，接受一个 select 函数作为参数，得到一个新的包装过的 select ，与直接应用于 container 的 select 函数不同，新的 select 函数中的 dispatch 函数不再传入完整地 storedProps 值，而是传入 Action 对象。传入的 Action 的对象将会被自动分发给 actionHandler 处理。  
