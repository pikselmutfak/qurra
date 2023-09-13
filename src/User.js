import Button from "./Button"

const User = ({
    data,
    index,
    onSelect,
    onUpdate
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
            <div>
                <Button onClick={() => {
                    onUpdate(index)
                }} title="Güncelle" />
            </div>
        </div>
    )
}

export default User