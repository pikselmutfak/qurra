import {useState} from 'react'

const DemoInput = () => {

    const [text, setText] = useState('')

    return (
        <>
            <div>{text}</div>
            <div>
                <input value={text} onChange={(e) => {
                    setText(e.target.value)
                }} />
            </div>
        </>
    )
}

export default DemoInput