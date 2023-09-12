import Button from "./Button"
import {useState} from 'react'

const userList = [
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
]

const List = () => {

    const [selectedUser, setSelectedUser] = useState(undefined)

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