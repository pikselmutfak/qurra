import Button from "./Button"
import { useState, useEffect } from 'react'
import axios from "axios"

import {
    Table,
    Form,
    Spinner
} from 'react-bootstrap'

import {
    useNavigate
} from 'react-router-dom'

import Modal from "./Modal"

const List = () => {

    const navigate = useNavigate()

    const newUserTemplate = {
        firstName: "",
        lastName: "",
        image: "https://i.imgur.com/nRkdyKG.jpeg",
        age: 32
    }

    const [isLoading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [updateIndex, setUpdateIndex] = useState(-1)
    const [removeIndex, setRemoveIndex] = useState(-1)

    const [selectedUser, setSelectedUser] = useState(undefined)
    const [newUser, setNewUser] = useState(newUserTemplate)
    const [userList, setUserList] = useState([])

    const getData = () => {

        const url = 'https://reactpm.azurewebsites.net/api/users'

        setLoading(true)

        // axios promise tabanlı çalışır
        axios.get(url)
        .then((response) => {
            console.log('response', response.data)

            setTimeout(() => {
                setUserList(response.data)
                setLoading(false)
            }, 2000)
        })
        .catch((err) => {
            console.log('error', err)
            setLoading(false)
        })
    }

    useEffect(() => {
        console.log('userList state değişti', userList)
    }, [userList, newUser])

    useEffect(() => {
        console.log('component ilk kez ayağa kalktı')
        
        getData()
    }, [])

    useEffect(() => {
        console.log(`${removeIndex} sırasındaki satır silinecek, onay bekliyor`)
    }, [removeIndex])

    useEffect(() => {
        console.log(`${updateIndex} sırasındaki satır güncellenecek`)

        if (updateIndex !== -1) {
            console.log('güncelleme gerçekleşecek')
            setNewUser(userList[updateIndex])
        } else {
            setNewUser(newUserTemplate)
        }
    }, [updateIndex])

    const resetForm = () => {
        setNewUser(newUserTemplate)
        setUpdateIndex(-1)
    }

    const updateUser = () => {
        const newList = userList.map((user, index) => {

            if (index === updateIndex) {
                return newUser
            }

            return user
        })

        setUserList(newList)
        resetForm()
    }

    return (
        <>
            {
                selectedUser && (
                    <div>
                        <div>Seçili Kullanıcı: {selectedUser.firstName}</div>
                    </div>
                )
            }
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((user, index) => {

                            return updateIndex === index ? (

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Form.Control 
                                            placeholder="Ad"
                                            value={newUser.firstName} 
                                            onChange={(e) => {
                                                const firstName = e.target.value
                                                const updatedUser = {
                                                    ...newUser,
                                                    firstName
                                                }
                                                setNewUser(updatedUser)
                                        }} />
                                    </td>
                                    <td>
                                    <Form.Control 
                                            placeholder="Soyad"
                                            value={newUser.lastName} 
                                            onChange={(e) => {
                                                const lastName = e.target.value
                                                const updatedUser = {
                                                    ...newUser,
                                                    lastName
                                                }
                                                setNewUser(updatedUser)
                                        }} />
                                    </td>
                                    <td></td>
                                    <td>
                                        <Button title="Kaydet" onClick={updateUser} />
                                    </td>
                                    <td>
                                        <Button title="Vazgeç" onClick={() => {
                                            resetForm()
                                        }} />
                                    </td>
                                </tr>

                            ) : (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>
                                        <img
                                            src={user.image}
                                            alt={user.firstName}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 30
                                            }}
                                        />
                                    </td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Button title="Detaya Git" onClick={() => {
                                            navigate(`/detail/${user._id}`)
                                        }} />
                                    </td>
                                    <td>
                                        <Button title="Güncelle" onClick={() => {
                                            setUpdateIndex(index)
                                        }} />
                                    </td>
                                    <td>
                                        <Button title="Sil" onClick={() => {
                                            setShowModal(true)
                                            setRemoveIndex(index)
                                        }} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                isLoading && (
                    <Spinner animation="border" variant="primary" />
                )
            }
            <div style={{
                marginTop: 20
            }}>
                <div><input placeholder="Ad" value={newUser.firstName} onChange={(e) => {
                    const firstName = e.target.value

                    const updatedUser = {
                        ...newUser,
                        firstName
                    }

                    setNewUser(updatedUser)
                }} /></div>
                <div><input placeholder="Soyad" value={newUser.lastName} onChange={(e) => {
                    const lastName = e.target.value

                    const updatedUser = {
                        ...newUser,
                        lastName
                    }

                    setNewUser(updatedUser)
                }} /></div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div>Yaş:</div>
                    <select onChange={(e) => {
                        console.log('kullanıcı seçim yaptı', e.target.value)
                        const age = e.target.value

                        const updatedUser = {
                            ...newUser,
                            age
                        }

                        setNewUser(updatedUser)
                    }}>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div>
                    <Button title={updateIndex === -1 ? "Kaydet" : "Değişiklikleri Kaydet"} onClick={() => {

                        if (updateIndex === -1) {
                            // KAYDET
                            console.log('new user', newUser)

                            const newList = [
                                ...userList,
                                newUser
                            ]

                            setUserList(newList)
                        } else {
                            // GÜNCELLE

                            updateUser()
                        }

                        resetForm()
                    }} />
                    {
                        updateIndex !== -1 && (
                            <Button title="Vazgeç" onClick={() => {
                                setUpdateIndex(-1)
                            }} />
                        )
                    }
                </div>
            </div>
            <Modal 
                title="Emin misin ?" 
                body={`${userList[removeIndex]?.firstName} silinecektir.`}  
                show={showModal}
                onClose={(isOk) => {

                    if (isOk) {
                        const updatedList = userList.filter((user, i) => {
                            return removeIndex !== i
                        })

                        setUserList(updatedList)
                        setRemoveIndex(-1)
                    }

                    setShowModal(false)
                }}
            />
        </>
    )
}

export default List



// const dummyData = [
//     {
//         firstName: "Kazım",
//         lastName: "Etiksan",
//         image: "https://i.imgur.com/rmNWp90.jpeg",
//         age: 43
//     },
//     {
//         firstName: "Leyla",
//         lastName: "Demir",
//         image: "https://i.imgur.com/lxzUnpb.jpeg",
//         age: 45
//     },
//     {
//         firstName: "Hasan",
//         lastName: "Tekin",
//         image: "https://i.imgur.com/nRkdyKG.jpeg",
//         age: 37
//     },
//     {
//         firstName: "Elif",
//         lastName: "Tekin",
//         image: "https://i.imgur.com/nRkdyKG.jpeg",
//         age: 32
//     }
// ]