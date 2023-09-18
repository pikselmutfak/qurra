import {
    useSelector
} from 'react-redux'

const Header = () => {

    const {
        firstName,
        lastName,
        age=40 // default değer
    } = useSelector(state => state.user.profile)

    // const firstName = "Demo"
    // const lastName = "User"

    return (
        <div style={{
            margin: 20
        }}>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{age}</div>
        </div>
    )
}

export default Header