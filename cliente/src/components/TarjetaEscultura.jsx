import testImg from '../assets/test.jpg'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function TarjetaEscultura({ escultura }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img
                variant="top"
                src={
                    escultura?.imagenes[0]?.imagen
                        ? escultura?.imagenes[0]?.imagen
                        : testImg
                }
            />
            <Card.Body>
                <Card.Title>{escultura.titulo}</Card.Title>
                <Card.Subtitle>{escultura.tematica}</Card.Subtitle>
                <Card.Text>{escultura.descripcion}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default TarjetaEscultura
