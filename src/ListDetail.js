import {

} from 'react-bootstrap'

import {
    useParams
} from 'react-router-dom'

import {
    useSelector
} from 'react-redux'

const ListDetail = (props) => {

    const {_id} = useParams()
    console.log('seçili kullanıcı id', _id)

    const selectedUserLong = useSelector((state) => {

        // code

        const foundUser = state.user.find((user, index) => {

            // code
            return user._id === _id
        })
    
        return foundUser
    })

    const selectedUser = useSelector(state => state.user.find(user => user._id === _id))

    // const dummy = {
    //     firstName: 'Mehmet',
    //     lastName: 'Demir'
    // }

    // const {firstName, lastName} = dummy

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div>Ad</div>
                <div>{selectedUser.firstName}</div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div>Soyad</div>
                <div>{selectedUser.lastName}</div>
            </div>
        </>
    )
}

export default ListDetail