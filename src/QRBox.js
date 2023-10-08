import {
    Button,
    Image
} from 'react-bootstrap'

import {
    useState,
    useEffect
} from 'react'

import axios from 'axios'

import { useRedux } from './redux/hooks'

import {Navigate} from 'react-router-dom'

import { generateQR } from './redux/requests'

const QRBox = ({
    code
}) => {

    const {xauth, profile} = useRedux()

    const [qr, setQR] = useState(undefined)

    const loadQR = () => {

        const url = '/api/code/qr/'+code._id
        console.log('qr url', url)
        axios.get(url, {
            headers: {
                xauth
            }
        })
        .then((response) => {
            console.log('qrr response', response.data)
            setQR(response.data.qr)
        })
        .catch((err) => {
            console.log('qr err', err)
        })
    }

    useEffect(() => {
        loadQR()
    }, [])

    return (
        <>
            <div>{code._id}</div>
            {
                qr && (
                    <Image src={qr} />
                )
            }
        </>
    )
}

export default QRBox