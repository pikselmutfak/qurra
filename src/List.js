import Button from "./Button"
import {useState} from 'react'

const List = () => {

    const newUserTemplate = {
        firstName: "",
        lastName: "",
        image: "https://i.imgur.com/nRkdyKG.jpeg",
        age: 32
    }

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
                <User data={user} index={index} key={index} onSelect={(user) => {
                    console.log('list level', user)
                    setSelectedUser(user)
                }} />
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
                <Button title="Kaydet" onClick={() => {
                    console.log('new user', newUser)

                    const newList = [
                        ...userList,
                        newUser
                    ]

                    setUserList(newList)
                    setNewUser(newUserTemplate)
                }} />
            </div>
        </div>

        </>
    )
}

const User = ({
    data,
    index,
    onSelect
}) => {

    const imgSize = 70

    const getImageBorderRadius = (imageSize) => {
        return (imageSize/2) - 30
    }

    const {
        firstName,
        lastName,
        age,
        image
    } = data

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <div>{index+1}</div>
            <div>
                <img src={image} style={{
                    width: imgSize,
                    height: imgSize,
                    borderRadius: getImageBorderRadius(imgSize)
                }} alt={firstName} />
            </div>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{age}</div>
            <div>
            {
                age < 40 ? (
                    <div>Yaş Küçük</div>
                ) : (
                    <div>Yaş Uygun</div>
                )
            }
            </div>
            <div>
                <Button onClick={() => {
                    console.log('button clicked', firstName)
                    onSelect(data)
                }} title="Seç" />
            </div>
        </div>
    )
}

export default List