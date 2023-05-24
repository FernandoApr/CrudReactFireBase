import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { firebase } from './firebase'

function App() {

  const [listaUsuarios, setListaUsuarios] = React.useState([]);
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [id, setId] = React.useState('');
  const [modoEdicion, setModoEdicion] = React.useState(false)

  React.useEffect(() => {
    const obtenerDatos = async () => {

      try {

        const db = firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        console.log(data.docs)
        console.log(arrayData);
        setListaUsuarios(arrayData);
      } catch (error) {
        console.log(error);
      }


    }
    obtenerDatos();
  }, [])

  const guardarDatos = async (e) => {
    e.preventDefault()
    //validaciones
    if (!nombre.trim()) {
      alert('Debe ingresar un nombre');
      return
    }
    if (!apellido.trim()) {
      alert('Debe ingresar un apellido');
      return
    }
    //almacenar en firebase
    try {
      const db = firebase.firestore()
      const nuevoUsuario = { nombre, apellido }
      const dato = await db.collection('usuarios').add(nuevoUsuario)
      //agregar a la lista
      setListaUsuarios([
        ...listaUsuarios,
        { ...nuevoUsuario, id: dato.id }
      ])
    } catch (error) {
      console.error(error);
    }

    //limpiar estados
    setNombre('')
    setApellido('')
    // setError(null)

  }

  const eliminarDato = async (id) => {

    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).delete();
      const listaFiltrada = listaUsuarios.filter((elemento) => elemento.id !== id)
      setListaUsuarios(listaFiltrada)
    } catch (error) {

    }

  }

  const editar = (item) => {
    setModoEdicion(true)
    setNombre(item.nombre)
    setApellido(item.apellido)
    setId(item.id)
  }

  const editarDatos = async (e) => {
    e.preventDefault()
    //validaciones
    if (!nombre.trim()) {
      alert('Debe ingresar un nombre');
      return
    }
    if (!apellido.trim()) {
      alert('Debe ingresar un apellido');
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection('usuarios').doc(id).update({ nombre, apellido })
      const listaEditada = listaUsuarios.map((elemento) => elemento.id === id ? { id, nombre, apellido } : elemento)
      setListaUsuarios(listaEditada)
      setModoEdicion(false)
      setNombre('')
      setApellido('')
      setId('')

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <div className='container'>

        <h1>Crud de usuarios</h1>


        <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
          <input type='text'
            placeholder='Ingrese el nombre'
            className='form-control mb-3'
            onChange={(e) => { setNombre(e.target.value) }}
            value={nombre} />
          <input type='text'
            placeholder='Ingrese el apellido'
            className='form-control mb-3'
            onChange={(e) => { setApellido(e.target.value) }}
            value={apellido} />
          <div className='d-grid gap-2'>
            {
              modoEdicion ? <button type='submit' className='btn btn-success'>Editar</button> :
                <button type='submit' className='btn btn-info'>Registrar</button>
            }
          </div>
        </form>


        <ul className='list-group mt-3'>
          {
            listaUsuarios.map((item) => (

              <li key={item.id} className='list-group-item'>
                {item.nombre} {item.apellido}

                <button className='btn btn-danger float-end me-2'
                  onClick={() => eliminarDato(item.id)}
                >Eliminar</button>
                <button className='btn btn-warning float-end me-2'
                  onClick={() => editar(item)}
                >Editar</button>
              </li>
            ))

          }
        </ul>
      </div>
    </>
  )
}

export default App
