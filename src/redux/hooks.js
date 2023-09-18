import {
    useSelector
} from 'react-redux'

export const useRedux = () => {
    
    const list = useSelector(state => state.user.list)
    const xauth = useSelector(state => state.user.xauth)
    const profile = useSelector(state => state.user.profile)

    return {list, xauth, profile}
}