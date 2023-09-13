import Select from 'react-select'

const DemoSelect = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <>
            <Select options={options} onChange={(val) => {
                console.log('val', val)
            }} />
        </>
    )
}

export default DemoSelect