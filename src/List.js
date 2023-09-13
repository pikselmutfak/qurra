import Button from "./Button"
import {useState, useEffect} from 'react'
import User from "./User"

const List = () => {

    const newUserTemplate = {
        firstName: "",
        lastName: "",
        image: "https://i.imgur.com/nRkdyKG.jpeg",
        age: 32
    }

    const [updateIndex, setUpdateIndex] = useState(-1)

    const [selectedUser, setSelectedUser] = useState(undefined)
    const [newUser, setNewUser] = useState(newUserTemplate)
    const [userList, setUserList] = useState([
        {
            firstName: "Kazım",
            lastName: "Etiksan",
            image: "https://i.imgur.com/rmNWp90.jpeg",
            age: 43
        },
        {
            firstName: "Leyla",
            lastName: "Demir",
            image: "https://i.imgur.com/lxzUnpb.jpeg",
            age: 45
        },
        {
            firstName: "Hasan",
            lastName: "Tekin",
            image: "https://i.imgur.com/nRkdyKG.jpeg",
            age: 37
        },
        {
            firstName: "Elif",
            lastName: "Tekin",
            image: "https://i.imgur.com/nRkdyKG.jpeg",
            age: 32
        }
    ])

    useEffect(() => {
        console.log('userList state değişti', userList)
    }, [userList, newUser])

    useEffect(() => {
        console.log('uygulama ilk kez ayağa kalktı')
    }, [])

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

    return (
        <>
        {
            selectedUser && (
                <div>
                    <div>Seçili Kullanıcı: {selectedUser.firstName}</div>
                </div>
            )
        }
        {
            userList.map((user, index) => (
                <User 
                    key={index} 
                    data={user} 
                    index={index} 
                    onSelect={(user) => {
                        console.log('list level', user)
                        setSelectedUser(user)
                    }}
                    onUpdate={(index) => {
                        setUpdateIndex(index)
                    }}
                />
            ))
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

                        const newList = userList.map((user, index) => {

                            if (index === updateIndex) {
                                return newUser
                            }

                            return user
                        })

                        setUserList(newList)
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

        </>
    )
}

export default List