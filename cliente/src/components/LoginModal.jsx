import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function LoginModal({isOpen,closeModal}) {
    const navigate = useNavigate()

    const redirectToLogin = () =>{
        navigate('/login')
    }

    return (
        <>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar sesión para votar</Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{justifyContent:'center'}}>
                    <Button variant="primary" onClick={redirectToLogin}>
                        Iniciar Sesión
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginModal
