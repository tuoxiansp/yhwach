import shallowEqualIgnoreFunction from './shallowEqualIgnoreFunction'

export default function shallowCompare(instance, nextProps, nextState) {
    return !shallowEqualIgnoreFunction(instance.props, nextProps) || !shallowEqualIgnoreFunction(instance.state, nextState)
}
