import {
    Modal as RModal
} from 'react-bootstrap'

import Button from './Button'

const Modal = ({
    title,
    body,
    show=false,
    onClose
}) => {

    // const [show, setShow] = useState(true)

    return (
        <RModal show={show} onHide={() => {
            onClose(false)
        }}>
            <RModal.Header closeButton>
                <RModal.Title>{title}</RModal.Title>
            </RModal.Header>
            <RModal.Body>{body}</RModal.Body>
            <RModal.Footer>
                <Button title="Vazgeç" onClick={() => {
                    onClose(false)
                }} />
                <Button title="Devam" onClick={() => {
                    onClose(true)
                }} />
            </RModal.Footer>
        </RModal>
    )
}

export default Modal