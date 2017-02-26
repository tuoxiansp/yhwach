# yhwach
更简单的 React 状态管理库。  

## 设计理念
任何 React 程序都由一个个组件拼装而成。  

在 yhwach 中，container 作为一个特殊的组件，从 store 获取最新的状态，并同步更新到 component。  

与此同时，container 在 component 上挂载的函数，通过内建 dispatch 函数通知 store 状态变更。  

即 flux 的单向数据流： store -> component -> dispatch -> store  

面对复杂的应用，提供一个叫做 reducer 的包装器，帮助构建更加清晰的数据流： store -> component -> action -> dispatch -> store  

## Hello world
- 从服务器获得数据，并显示的场景  

```
    import {store, container} from 'yhwach'
    import ReactDOM from 'react-dom'
    import React from 'react'

    //一个最简单的 component
    const ShowSomethingComponent = ({something}) =>
        <div>
            {something}
        </div>

    //模拟从服务器获取数据
    const getDataFromServer = () => {
        return new Promise(function(resolve, reject){
            setTimeout(resolve.bind(null, 'Hello world!'), 2000)
        })
    }

    //创建 store
    const egStore = store(dispatch => {
        getDataFromServer().then(something => dispatch(something))
        dispatch('Wait for 2 sec')
    })

    //创建 container
    const ContainedComponent = container(
        props => egStore,
        storedProps => {
            return {
                something: storedProps
            }
        }
    )(ShowSomethingComponent)

    //render
    ReactDOM.render(
        <ContainedComponent />,
        document.body
    )
```
