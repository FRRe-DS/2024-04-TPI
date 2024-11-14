import { useAuth } from "../context/AuthContext"
function ControlesVotacion({idEscultura, openModal}){
    const user = useAuth()


    const handleClick = async (value) =>{
        console.log('USER:',user)

        try {
            let bodyJSON = {
                puntaje:value
            }
            const response = await fetch(
                `http://127.0.0.1:8000/api/esculturas/${idEscultura}/votar/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.authTokens.access}`
                    },
                    body: JSON.stringify(bodyJSON)
                }
            )
            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                if(response.status === 401){
                    openModal()
                }
                throw new Error(`Error en la solicitud: ${response.status} ${response}`);
            }
        } catch (e) {
            console.error(e)
        }
        
    }
    return <div className="controles-votacion">
        <button onClick={()=>handleClick(1)}>1</button>
        <button onClick={()=>handleClick(2)}>2</button>
        <button onClick={()=>handleClick(3)}>3</button>
        <button onClick={()=>handleClick(4)}>4</button>
        <button onClick={()=>handleClick(5)}>5</button>
    </div>
}

export default ControlesVotacion