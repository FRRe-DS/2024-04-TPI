import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import './Evento.css'
import { Container, Button, Carousel, Modal, Badge } from 'react-bootstrap'
import testImg from '../assets/test.jpg'
import useAuth from '../context/AuthContext'

import AgregarEsculturasAEventoModal from '../components/AgregarEsculturasAEventoModal'
import ControlesVotacion from '../components/ControlesVotacion'
import LoginModal from '../components/LoginModal'
import ModificarEventoModal from '../components/ModificarEventoModal'

import CompartirBoton from '../components/CompartirBoton'

function Evento() {
    const [dataEvento, setDataEvento] = useState(null)
    const [showModalLogin, setShowModalLogin] = useState(false)
    const [showModalVotar, setShowModalVotar] = useState(false)
    const [showModalModificar, setShowModalModificar] = useState(false)
    const [showModalAgregar, setShowModalAgregar] = useState(false)
    const [esculturaSeleccionada, setEsculturaSeleccionada] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { user } = useContext(useAuth)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const esculturaIdParam = searchParams.get('escultura')

    const shareUrl = `Mira el evento "${dataEvento?.titulo}": http://localhost:5173/eventos/${id}`

    const obtenerData = async () => {
        try {
            setLoading(true)
            const response = await fetch(
                `http://127.0.0.1:8000/api/eventos/${id}`,
                {
                    method: 'GET',
                }
            )
            const data = await response.json()
            setDataEvento(data)
        } catch (e) {
            console.error(e)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        obtenerData()
    }, [id])

    const actualizarEvento = async (eventoModificado) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/eventos/${id}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventoModificado),
                }
            )

            if (response.ok) {
                alert('Evento modificado exitosamente')
                setShowModalModificar(false)
                await obtenerData()
            } else {
                console.error('Error al actualizar el evento')
                setError(true)
            }
        } catch (error) {
            console.error(error)
            setError(true)
        }
    }

    const eliminarEvento = async () => {
        const confirmacion1 = window.confirm(
            '¿Estás seguro de que deseas eliminar este evento?'
        )

        if (confirmacion1) {
            const confirmacion2 = window.confirm(
                'Esta acción no se puede deshacer. ¿Deseas continuar?'
            )

            if (confirmacion2) {
                try {
                    const response = await fetch(
                        `http://127.0.0.1:8000/api/eventos/${id}/`,
                        {
                            method: 'DELETE',
                        }
                    )

                    if (response.ok) {
                        alert('Evento eliminado exitosamente')
                        navigate('/eventos')
                    } else {
                        console.error('Error al eliminar el evento')
                        setError(true)
                    }
                } catch (error) {
                    console.error(error)
                    setError(true)
                }
            } else {
                alert('Eliminación cancelada.')
            }
        } else {
            alert('Eliminación cancelada.')
        }
    }

    const agregarEsculturas = async (ids) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/eventos/${id}/agregar-esculturas/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ esculturas_ids: ids }),
                }
            )
            const data = await response.json()
            if (response.ok) {
                alert('Esculturas agregadas exitosamente.')
                await obtenerData()
            } else {
                console.error(data.detail || 'Error al agregar esculturas.')
            }
        } catch (error) {
            console.error('Error al agregar esculturas:', error)
        }
    }

    const handleVotarEscultura = (escultura) => {
        if (user) {
            setEsculturaSeleccionada(escultura)
            setShowModalVotar(true)
        } else {
            setShowModalLogin(true)
        }
    }

    useEffect(() => {
        if (esculturaIdParam) {
            if (user) {
                setEsculturaSeleccionada(esculturaIdParam)
                setShowModalVotar(true)
            } else {
                setShowModalLogin(true)
            }
        }
    }, [esculturaIdParam])

    if (error) return <span>Error al cargar el evento.</span>
    if (loading) return <span>Cargando...</span>

    if (dataEvento && dataEvento.message)
        return <span>{dataEvento.message}</span>

    const obtenerEsculturaMasVotada = () => {
        if (!dataEvento?.esculturas) return null

        const esculturaMasVotada = dataEvento.esculturas.reduce(
            (max, escultura) => {
                const puntajePromedio = escultura.promedio_votos || 0
                return puntajePromedio > (max.promedio_votos || 0)
                    ? escultura
                    : max
            },
            {}
        )

        return esculturaMasVotada
    }

    const esculturaMasVotada = obtenerEsculturaMasVotada()
    const puntajeEsculturaMasVotada = esculturaMasVotada
        ? esculturaMasVotada.promedio_votos
        : 0
    const cantidadVotosEsculturaMasVotada = esculturaMasVotada
        ? esculturaMasVotada.total_votos
        : 0

    const fechaActual = new Date()
    const fechaInicio = new Date(dataEvento?.fecha_inicio)
    const fechaFin = new Date(dataEvento?.fecha_fin)
    const eventoEnCurso = fechaActual >= fechaInicio && fechaActual <= fechaFin
    const eventoFinalizado = fechaActual > fechaFin

    return (
        <Container>
            <br /> <br />
            {user?.is_admin && (
                <div className="text-center mt-3 admin-controls">
                    <Button
                        variant="dark"
                        onClick={eliminarEvento}
                        className="mx-3"
                    >
                        Eliminar evento
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => setShowModalModificar(true)}
                        className="mx-3"
                    >
                        Modificar evento
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => setShowModalAgregar(true)}
                        className="mx-3"
                    >
                        Agregar esculturas
                    </Button>
                </div>
            )}
            <Badge bg="dark">
                {eventoEnCurso
                    ? 'En curso'
                    : eventoFinalizado
                    ? 'Finalizado'
                    : 'Próximamente'}
            </Badge>
            <h1 className="evento-titulo">{dataEvento?.titulo}</h1>
            <div className="evento-detalle">
                <p>{dataEvento?.descripcion}</p>
                <span>
                    Fecha de inicio: <b>{dataEvento?.fecha_inicio}</b>
                </span>
                <span>
                    Fecha de finalización: <b>{dataEvento?.fecha_fin}</b>
                </span>
                <span>
                    Ubicación: <b>{dataEvento?.lugar}</b>
                </span>
                <CompartirBoton shareUrl={shareUrl}></CompartirBoton>
            </div>
            {eventoFinalizado && esculturaMasVotada ? (
                <div className="card escultura-card border-0 shadow-sm p-3 mb-4">
                    <h3>Escultura más votada</h3>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="text-dark fw-bold mb-1">
                                {esculturaMasVotada?.titulo || 'Sin título'}
                            </h5>
                            <p className="text-muted mb-0">
                                Escultor:{' '}
                                <span className="text-secondary">
                                    {esculturaMasVotada?.escultor?.nombre ||
                                        'Desconocido'}
                                </span>
                            </p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-dark fw-bold mb-1">
                                {cantidadVotosEsculturaMasVotada || 0}
                            </h4>
                            <p className="text-muted mb-0">Votos totales</p>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div>
                        <p className="text-muted mb-1">
                            Puntaje promedio:{' '}
                            <span className="fw-bold text-dark">
                                {puntajeEsculturaMasVotada?.toFixed(2) ||
                                    '0.00'}
                            </span>
                        </p>
                    </div>
                </div>
            ) : (
                <p>
                    Las esculturas más votadas se mostrarán una vez que el
                    evento haya finalizado.
                </p>
            )}
            <h5>Esculturas del evento</h5>
            {dataEvento?.esculturas?.length === 0 ? (
                <p>Este evento no tiene esculturas disponibles.</p>
            ) : (
                <div className="evento-galeria">
                    {dataEvento?.esculturas?.map((escultura) => (
                        <div key={escultura.id} className="evento-galeria-item">
                            <div
                                onClick={() =>
                                    navigate(`/esculturas/${escultura.id}`)
                                }
                            >
                                <span className="evento-galeria-titulo hover-subrayado">
                                    {escultura.titulo}
                                </span>
                            </div>
                            {escultura.imagenes.length > 1 ? (
                                <Carousel>
                                    {escultura.imagenes.map((img, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                src={`${img.imagen}`}
                                                alt={`${
                                                    escultura.titulo
                                                } - Imagen ${index + 1}`}
                                                className="escultor-galeria-imagen d-block w-100"
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            ) : (
                                <img
                                    src={
                                        escultura.imagenes[0]?.imagen
                                            ? `${escultura.imagenes[0]?.imagen}`
                                            : testImg
                                    }
                                    alt={escultura.titulo}
                                    className="escultor-galeria-imagen"
                                />
                            )}
                            <span>Autor: {escultura.escultor.nombre}</span>

                            <div>
                                {eventoEnCurso && (
                                    <Button
                                        variant="dark"
                                        onClick={() =>
                                            handleVotarEscultura(escultura)
                                        }
                                        className="mt-3"
                                    >
                                        Votar escultura
                                    </Button>
                                )}
                                {!eventoEnCurso && <p>No puedes votar</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <LoginModal
                isOpen={showModalLogin}
                closeModal={() => setShowModalLogin(false)}
            />
            <ModificarEventoModal
                show={showModalModificar}
                handleClose={() => setShowModalModificar(false)}
                handleSubmit={actualizarEvento}
                eventoActual={dataEvento}
            />
            <AgregarEsculturasAEventoModal
                show={showModalAgregar}
                handleClose={() => setShowModalAgregar(false)}
                onSubmit={agregarEsculturas}
                eventoId={id}
            />
            <Modal
                show={showModalVotar}
                onHide={() => setShowModalVotar(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Votar escultura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ControlesVotacion
                        idEscultura={esculturaSeleccionada}
                        openModal={() => setShowModalLogin(true)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModalVotar(false)}
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Evento
