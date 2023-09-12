import {useState} from 'react'

const Demo = () => {

    const [total, setTotal] = useState(30)

    // const getter = stateArray[0] // getter
    // const setter = stateArray(1) // setter

    return (
        <>
            <div>Toplam Rakam: {total}</div>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <div>
                    <button onClick={() => {
                        console.log('total', total)
                        setTotal(total-1)
                    }}>Azalt</button>
                </div>
                <div>
                    <button onClick={() => {
                        console.log('total', total)
                        setTotal(total+1)
                    }}>Yükselt</button>
                </div>
            </div>
        </>
    )
}

export default Demo