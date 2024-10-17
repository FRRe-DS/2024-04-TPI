function Eventos() {

    return (
        <>
            <h1>Eventos</h1>
            <form className='form-eventos'>
              <label htmlFor='titulo'>Título</label>
              <input type='text' name='titulo'/>

              <label htmlFor='descripcion'>Descripción</label>
              <input type='text' name='descripcion'/>  

              <label htmlFor='fecha'>Fecha</label>
              <input type='date' name='fecha'/> 

              <label htmlFor='lugar'>Lugar</label>
              <input type='text' name='lugar'/>    

              <label htmlFor='tematica'>Temática</label>
              <input type='text' name='tematica'/>  

              <input type='submit' value='Añadir Evento'/>       
            </form>
        </>
    )
}

export default Eventos