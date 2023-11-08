import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useRedux } from "./redux/hooks"
import { Table, InputGroup, Form, DropdownButton, Dropdown, Button } from "react-bootstrap"
import { useState, Fragment, useEffect } from "react"
import { saveContext } from "./redux/requests"

const Edit = () => {

    const navigate = useNavigate()

    const { xauth, codes } = useRedux()
    const { _id } = useParams()

    console.log({
        codes
    })

    const options = [
        {
            title: "Custom",
            value: "custom"
        }, {
            title: "Youtube",
            value: "youtube"
        }, {
            title: "Facebook",
            value: "facebook"
        }, {
            title: "Instagram",
            value: "instagram"
        }]

    const infoTemplate = {
        platform: options[0],
        url: '',
        active: false,
        title: ''
    }
    const arrayTemplate = [{
        platform: options[0],
        url: 'https://www.pikselmutfak.com',
        active: true,
        title: 'Piksel Web'
    },{
        platform: options[0],
        url: 'https://www.youtube.com/watch?v=Rt8CYpOzAW0&t=1s',
        active: false,
        title: 'Youtube'
    },{
        platform: options[9],
        url: 'https://www.instagram.com/linyajewellery/',
        active: true,
        title: 'Instagram'
    }]

    const code = codes.find(c => c._id === _id)
    const [context, setContext] = useState([])

    useEffect(() => {
        if (code) {
            setContext(code.context)
        }
    }, [code])

    if (!xauth) {
        return (
            <Navigate to="/signin" replace />
        )
    }

    return (
        <>
            {
                context?.map((row, index) => (
                    <div key={index}>
                        <InputGroup>
                            <InputGroup.Checkbox onChange={(e) => {
                                console.log(e.target.checked)

                                const active = e.target.checked
                                const updated = context.map((u, ui) => {

                                    if (ui === index) {

                                        return {
                                            ...u,
                                            active
                                        }
                                    }

                                    return u
                                })

                                setContext(updated)
                            }} checked={row.active} />
                            <DropdownButton onSelect={(e) => {

                                const platform = options.find(o => o.value === e)

                                const updated = context.map((u, ui) => {

                                    if (ui === index) {

                                        return {
                                            ...u,
                                            platform
                                        }
                                    }

                                    return u
                                })

                                setContext(updated)

                            }} title={row.platform.title}>
                                <Dropdown.ItemText>Choose One</Dropdown.ItemText>
                                {
                                    options.map((item) => (
                                        <Dropdown.Item key={item.value} eventKey={item.value}>{item.title}</Dropdown.Item>
                                    ))
                                }
                            </DropdownButton>
                            <Form.Control onChange={(e) => {
                                const title = e.target.value
                                const updated = context.map((u, ui) => {

                                    if (ui === index) {

                                        return {
                                            ...u,
                                            title
                                        }
                                    }

                                    return u
                                })

                                setContext(updated)
                            }} value={row.title} />
                            <Form.Control onChange={(e) => {
                                const url = e.target.value
                                const updated = context.map((u, ui) => {

                                    if (ui === index) {

                                        return {
                                            ...u,
                                            url
                                        }
                                    }

                                    return u
                                })

                                setContext(updated)
                            }} value={row.url} />
                            <Button variant="danger" onClick={() => {

                                const updated = context.filter((u, ui) => ui !== index)
                                setContext(updated)
                            }}>Remove</Button>
                        </InputGroup>
                    </div>
                ))
            }
            <div style={{
                marginTop: 10,
                width: 280,
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Button onClick={() => {
                    setContext([
                        ...context,
                        infoTemplate
                    ])
                }}>Add New</Button>
                <Button variant="success" onClick={() => {
                    saveContext({
                        callback: (obj) => {
                            console.log('response obj', obj)
                        },
                        context,
                        _id
                    })
                }}>Kaydet</Button>
                <Button variant="secondary" onClick={() => {
                    navigate("/")
                }}>Anasayfa</Button>
            </div>
        </>
    )
}

export default Edit