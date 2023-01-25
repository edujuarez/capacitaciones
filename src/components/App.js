import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Layout from './Layout';

import NuevaCapacitacionForm from './NuevaCapacitacionForm';
import NuevoAsistente from './NuevoAsistente';
import AsistentesList from './AsistentesList';
import CapacitacionView from './capacitacionView';
import Capacitacion from './Capacitacion';
import AsistenteView from './AsistenteView';
import AsistenteEdit from './AsistenteEdit';
import Login from './Login';
import AddAsistentes from './AddAsistentes';
import Search from './Search';
import Certification from './Certification';
import PuntajeEdit from './PuntajeEdit';
import Informes from './Informes';
import Historial from './Historial';

function App() {
  const user = 'Usuario';
  const view = "";
  return (
    <>
    <BrowserRouter>
    <Route exact path='/login' component={Login} />
    </BrowserRouter>
    
    <BrowserRouter>
      
      <Layout user={user}>
        
        <Switch>
            <Route exact path="/home" component={Capacitacion}/>
            <Route exact path="/nuevacapacitacion" component={NuevaCapacitacionForm} />
            <Route exact path="/nuevoasistente" component={NuevoAsistente} />
            <Route exact path="/asistentes" component={AsistentesList} />
            <Route exact path="/capacitacion" component={Capacitacion} />
            <Route exact path="/capacitaciones/:idcapacitacion" component={CapacitacionView} />
            <Route exact path='/asistentes/:idasistente' component={AsistenteView}/>
            <Route exact path='/asistentes/:idasistente/edit' component={AsistenteEdit}/>
            <Route exact path="/addasistentes/:idcapacitacion" component={AddAsistentes}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/informes" component={Informes}/>
            <Route exact path="/asistencia/:idasistencia" component={PuntajeEdit}/>
            <Route exact path="/historial" component={Historial} />
            <Route exact path="/certification/:idcapacitacion" component={Certification} />
        </Switch>
      </Layout>
    </BrowserRouter>
    </>
  );
}

export default App;