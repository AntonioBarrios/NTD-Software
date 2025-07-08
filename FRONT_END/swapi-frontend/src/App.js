import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  getPlanets,
  createPlanet,
  updatePlanet,
  deletePlanet
} from './services/api';
import Sidebar from './components/Sidebar';
import PlanetTable from './components/PlanetTable';
import Journal from './components/Journal';
import Summary from './components/Summary';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [filters, setFilters] = useState({});

  // Función para obtener planetas
  const fetchPlanets = async () => {
    try {
      const response = await getPlanets(filters);
      setPlanets(response.data);
      addJournalEntry('Tabla de planetas actualizada');
    } catch (error) {
      addJournalEntry(`Error: ${error.message}`);
    }
  };

  // Función para añadir entradas al journal
  const addJournalEntry = (message) => {
    const entry = {
      timestamp: new Date().toLocaleString(),
      message
    };
    setJournalEntries(prev => [entry, ...prev.slice(0, 9)]);
  };

  // Efecto para cargar planetas al inicio y cuando cambian los filtros
  useEffect(() => {
    fetchPlanets();
  }, [filters]);

  return (
    <Container fluid className="app-container">
      <Row>
        <Col md={3} className="sidebar-col">
          <Sidebar 
            onFilterChange={setFilters}
            onCreatePlanet={async (planet) => {
              try {
                await createPlanet(planet);
                addJournalEntry(`Planeta creado: ${planet.nombre}`);
                fetchPlanets();
              } catch (error) {
                addJournalEntry(`Error al crear planeta: ${error.message}`);
              }
            }}
          />
        </Col>
        <Col md={9} className="main-content">
          <h1 className="mb-4">Registro de Planetas</h1>
          
          <Journal entries={journalEntries} />
          
          <PlanetTable 
            planets={planets} 
            onDelete={async (id) => {
              try {
                await deletePlanet(id);
                addJournalEntry('Planeta eliminado');
                fetchPlanets();
              } catch (error) {
                addJournalEntry(`Error al eliminar planeta: ${error.message}`);
              }
            }}
            onUpdate={async (id, planetData) => {
              try {
                await updatePlanet(id, planetData);
                addJournalEntry(`Planeta actualizado: ${planetData.nombre}`);
                fetchPlanets();
              } catch (error) {
                addJournalEntry(`Error al actualizar planeta: ${error.message}`);
              }
            }}
          />
          
          <Summary planets={planets} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;