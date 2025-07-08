import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const Sidebar = ({ onFilterChange, onCreatePlanet }) => {
  const [filters, setFilters] = useState({
    name: '',
    population: ''
  });

  const [newPlanet, setNewPlanet] = useState({
    nombre: '',
    poblacion: '',
    terrenos: [],
    climas: []
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleCreatePlanet = () => {
    onCreatePlanet({
      ...newPlanet,
      poblacion: newPlanet.poblacion ? parseInt(newPlanet.poblacion) : null
    });
    setNewPlanet({
      nombre: '',
      poblacion: '',
      terrenos: [],
      climas: []
    });
  };

  return (
    <div className="sidebar">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Filtros</Card.Title>
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Población mínima:</Form.Label>
            <Form.Control
              type="number"
              name="population"
              value={filters.population}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Nuevo Planeta</Card.Title>
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={newPlanet.nombre}
              onChange={(e) => setNewPlanet({...newPlanet, nombre: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Población:</Form.Label>
            <Form.Control
              type="number"
              value={newPlanet.poblacion}
              onChange={(e) => setNewPlanet({...newPlanet, poblacion: e.target.value})}
            />
          </Form.Group>
          <Button 
            variant="success" 
            onClick={handleCreatePlanet}
            disabled={!newPlanet.nombre}
          >
            Crear Planeta
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;