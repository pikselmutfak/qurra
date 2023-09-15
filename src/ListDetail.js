import {

} from 'react-bootstrap'

import {
    useParams
} from 'react-router-dom'

const ListDetail = (props) => {

    // console.log('props', props)

    const {_id} = useParams()
    console.log('seçili kullanıcı id', _id)

    const dummy = {
        firstName: 'Mehmet',
        lastName: 'Demir'
    }

    const {firstName, lastName} = dummy

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div>Ad</div>
                <div>{firstName}</div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div>Soyad</div>
                <div>{lastName}</div>
            </div>
        </>
    )
}

export default ListDetail