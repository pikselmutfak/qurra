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

                setContext(filtered)
            }
        })
    }, [])

    return (
        <>
            <div>
            {
                context.map((c, index) => (
                    <div><a href={c.url}>{c.title}</a></div>
                ))
            }
            </div>
        </>
    )
}

export default Land