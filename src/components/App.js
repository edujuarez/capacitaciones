import { BrowserRouter, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { auth } from './googleSignIn/config';
import { onAuthStateChanged } from 'firebase/auth';
import Layout from './Layout';

//Vistas y componentes
import NuevaCapacitacionForm from './NuevaCapacitacionForm';
import NuevoAsistente from './NuevoAsistente';
import AsistentesList from './AsistentesList';
import CapacitacionView from './capacitacionView';
import Capacitacion from './Capacitacion';
import AsistenteView from './AsistenteView';
import AsistenteEdit from './AsistenteEdit';
import AddAsistentes from './AddAsistentes';
import Search from './Search';
import Certification from './certification';
import PuntajeEdit from './PuntajeEdit';
import Informes from './Informes';
import Historial from './Historial';
import Calificaciones from './Calificaciones';
import CapacitacionEdit from './CapacitacionEdit';
import Login from './googleSignIn/Login';

function App() {
  const [user, setUser] = useState(null)
  const history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })
  }, [])

  console.log(user)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />

        {
          (
            <>
              <Layout>
                <Route exact path="/" component={Capacitacion} />
                <Route exact path="/home" component={Capacitacion} />
                <Route exact path="/nuevacapacitacion" component={NuevaCapacitacionForm} />
                <Route exact path="/nuevoasistente" component={NuevoAsistente} />
                <Route exact path="/asistentes" component={AsistentesList} />
                <Route exact path="/capacitacion" component={Capacitacion} />
                <Route exact path="/capacitaciones/:idcapacitacion" component={CapacitacionView} />
                <Route exact path='/asistentes/:idasistente' component={AsistenteView} />
                <Route exact path='/asistentes/:idasistente/edit' component={AsistenteEdit} />
                <Route exact path="/addasistentes/:idcapacitacion" component={AddAsistentes} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/informes" component={Informes} />
                <Route exact path="/asistencia/:idasistencia" component={PuntajeEdit} />
                <Route exact path="/historial" component={Historial} />
                <Route exact path="/certification/:idcapacitacion" component={Certification} />
                <Route exact path="/calificaciones/:idcapacitacion" component={Calificaciones} />
                <Route exact path="/capacitaciones/:idcapacitacion/edit" component={CapacitacionEdit} />
              </Layout>
            </>


          )
        }

      </Switch>
    </BrowserRouter >
  );
}

export default App;