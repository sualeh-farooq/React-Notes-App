import logo from './logo.svg';
import './App.css';
import { Row, Col, Card } from 'react-bootstrap';
import NotesComponent from './components/notesSection';
function App() {

  return (

    <div className="App">



      <div>
        <Row>
          <Col className='d-flex justify-content-center' sm="12" md="12" lg="12" >
              <NotesComponent />
          </Col>
        </Row>

      </div>

    </div>

  );
}

export default App;
