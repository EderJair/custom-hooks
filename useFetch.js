import { useEffect, useState } from "react"

// local cache para almacenar los datos de las peticiones
const localCache = {}


export const useFetch = (url) => {

    // estado inicial
    const [state, setstate] = useState({
        data: null,
        loading: true,
        hasError: false,
        error: null
    })

    // efecto para hacer la petición
    useEffect(() => {
        fetchData()
    }, [url])


    // función para establecer el estado de carga
    const setLoadingState = () => {
        setstate({
            data: null,
            loading: true,
            hasError: false,
            error: null
        })
    }


    // función para hacer la petición  
    const fetchData = async () => {

        // si ya tenemos los datos en el local cache, los obtenemos y los almacenamos en el estado
        if(localCache[url]){
            // realizamos el setstate con los datos del local cache
            setstate({
                data: localCache[url],
                loading: false,
                hasError: false,
                error: null
            });
            return
        }

        // llamamos a la función para establecer el estado de carga
        setLoadingState()


        // hacemos la petición a la API y esperamos la respuesta   
        const res = await fetch(url)

        // simulamos un retraso de 1 segundo
        await new Promise(resolve => setTimeout(resolve, 1000))

        // si la respuesta no es correcta, establecemos el estado de error
        if(!res.ok){
            setstate({
                data: null,
                loading: false,
                hasError: true,
                error: {
                    code: res.status,
                    message: res.statusText
                }
            })
            return
        }

        // si la respuesta es correcta, obtenemos los datos y los almacenamos en el estado
        const data = await res.json()
        setstate({
            data,
            loading: false,
            hasError: false,
            error: null
        })
        // almacenamos los datos en el local cache para no hacer la petición de nuevo
        localCache[url] = data;

    }

    return{
        data: state.data,
        loading: state.loading,
        hasError: state.hasError,
    }
}
