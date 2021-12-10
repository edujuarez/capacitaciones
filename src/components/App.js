import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Layout from './Layout';

import NuevaCapacitacionForm from './NuevaCapacitacionForm';
import NuevoAsistente from './NuevoAsistente';
import AsistentesList from './AsistentesList';
import CapacitacionView from './CapacitacionView';
import Capacitacion from './Capacitacion';
import AsistenteView from './AsistenteView';
import AsistenteEdit from './AsistenteEdit';
import Login from './Login';

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
            
        </Switch>
      </Layout>
    </BrowserRouter>
    </>
  );
}

export default App;