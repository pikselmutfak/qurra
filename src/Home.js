import {
    Button
} from 'react-bootstrap'

import { useRedux } from './redux/hooks'

import {Navigate} from 'react-router-dom'

import { generateQR, getMyCodes } from './redux/requests'
import QRBox from './QRBox'
import { useEffect } from 'react'

const Home = () => {

    useEffect(() => {
        getMyCodes({
            callback: () => {

            }
        })
    }, [])

    const {xauth, profile, codes} = useRedux()

    if (!xauth) {
        return (
            <Navigate to="/signin" replace />
        )
    }

    return (
        <>
            <div>{profile?.name}</div>
            <div>Home</div>
            <div>
                <Button variant="primary" onClick={() => {
                    generateQR({
                        callback: () => {

                        }
                    })
                }}>
                    Generate New
                </Button>
            </div>
            <div>
            {
                codes.map(code => (
                    <QRBox code={code} key={code._id} />
                ))
            }
            </div>
        </>
    )
}

export default Home