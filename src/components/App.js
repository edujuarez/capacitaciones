import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import Layout from './Layout';

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


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login} />

        <Layout user={"Usuario"}>
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
          <Route exact path="/login" component={Login} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;