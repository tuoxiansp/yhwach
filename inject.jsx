/**
 * Created by b1ncer on 2017/1/19.
 *
 * 向 component 注入 props
 * Usage: const injectedComponent = inject({...toInjectProps})(component)
 */
import React, {Component, PropTypes} from 'react'

export default toInjectProps => Comp => props => <Comp {...{...toInjectProps, ...props}} />
