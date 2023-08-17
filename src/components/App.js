import { Route, Switch, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



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
import Certification from './certification';
import Informes from './Informes';
import Historial from './Historial';
import Calificaciones from './Calificaciones';
import CapacitacionEdit from './CapacitacionEdit';
import Login from './googleSignIn/Login';

function App() {
  //inicio auth para comprobar si el usuario ha iniciado sesion
  const auth = getAuth();
  const [user, setUser] = useState('');
  const [photo, setPhoto] = useState('');


  const history = useHistory();

  onAuthStateChanged(auth, (user) => {
    if (user) {

      setUser(user.displayName);
      setPhoto(user.photoURL)

    } else {
      history.push('/login');
    }

  })

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Layout user={user} photo={photo}>
        <Route exact path="/home" component={Capacitacion} />
        <Route exact path="/nuevacapacitacion" component={NuevaCapacitacionForm} />
        <Route exact path="/nuevoasistente" component={NuevoAsistente} />
        <Route exact path="/asistentes" component={AsistentesList} />
        <Route exact path="/capacitacion" component={Capacitacion} />
        <Route exact path="/capacitaciones/:idcapacitacion" component={CapacitacionView} />
        <Route exact path='/asistentes/:idasistente' component={AsistenteView} />
        <Route exact path='/asistentes/:idasistente/edit' component={AsistenteEdit} />
        <Route exact path="/addasistentes/:idcapacitacion" component={AddAsistentes} />
        <Route exact path="/informes" component={Informes} />
        <Route exact path="/historial" component={Historial} />
        <Route exact path="/certification/:idcapacitacion" component={Certification} />
        <Route exact path="/calificaciones/:idcapacitacion" component={Calificaciones} />
        <Route exact path="/capacitaciones/:idcapacitacion/edit" component={CapacitacionEdit} />
      </Layout>
    </Switch>
  );
}

export default App;