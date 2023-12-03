import {
    useParams
} from 'react-router-dom'

import {    
    retrieveCode
} from './redux/requests'

import {useEffect, useState} from 'react'

const Land = () => {

    const {identifier} = useParams()
     
    const [context, setContext] = useState([])

    useEffect(() => {
        retrieveCode({
            identifier,
            callback: (obj) => {
                console.log('landed', obj)

                const filtered = obj.context.filter(c => c.active === true)
                if (filtered.length === 1) {
                    window.location.href = filtered[0].url[getOS()]
                } else {
                    setContext(filtered)
                }
            }
        })
    }, [])

    const getOS = () => {
        if (window.navigator.userAgent.includes('Android')) {
            return 'android'
        }
        return 'ios'
    }

    return (
        <>
            <div>
            {
                context.map((c, index) => (
                    <a href={c.url} style={{
                        textDecoration: 'none'
                    }}>
                        <div style={{
                            height: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div>{c.title}</div>
                            <div>-</div>
                        </div>
                    </a>
                ))
            }
            </div>
        </>
    )
}

export default Land