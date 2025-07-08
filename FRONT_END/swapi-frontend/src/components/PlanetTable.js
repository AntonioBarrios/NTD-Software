import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Edit, Delete, Save, Close } from '@mui/icons-material';

const PlanetTable = ({ planets, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (planet) => {
    setEditingId(planet.id);
    setEditData({
      nombre: planet.nombre,
      poblacion: planet.poblacion || '',
      terrenos: planet.terrenos.join(', '),
      climas: planet.climas.join(', ')
    });
  };

  const handleSave = (id) => {
    onUpdate(id, {
      nombre: editData.nombre,
      poblacion: editData.poblacion ? parseInt(editData.poblacion) : null,
      terrenos: editData.terrenos.split(',').map(t => t.trim()),
      climas: editData.climas.split(',').map(c => c.trim())
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Población</th>
          <th>Terrenos</th>
          <th>Climas</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {planets.map(planet => (
          <tr key={planet.id}>
            {editingId === planet.id ? (
              <>
                <td>
                  <Form.Control
                    value={editData.nombre}
                    onChange={(e) => setEditData({...editData, nombre: e.target.value})}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={editData.poblacion}
                    onChange={(e) => setEditData({...editData, poblacion: e.target.value})}
                  />
                </td>
                <td>
                  <Form.Control
                    value={editData.terrenos}
                    onChange={(e) => setEditData({...editData, terrenos: e.target.value})}
                  />
                </td>
                <td>
                  <Form.Control
                    value={editData.climas}
                    onChange={(e) => setEditData({...editData, climas: e.target.value})}
                  />
                </td>
                <td>
                  <Button 
                    variant="success" 
                    size="sm" 
                    onClick={() => handleSave(planet.id)}
                    className="me-2"
                  >
                    <Save fontSize="small" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={handleCancel}
                  >
                    <Close fontSize="small" />
                  </Button>
                </td>
              </>
            ) : (
              <>
                <td>{planet.nombre}</td>
                <td>{planet.poblacion ? planet.poblacion.toLocaleString() : 'Desconocida'}</td>
                <td>{planet.terrenos.join(', ')}</td>
                <td>{planet.climas.join(', ')}</td>
                <td>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    onClick={() => handleEdit(planet)}
                    className="me-2"
                  >
                    <Edit fontSize="small" />
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => {
                      if (window.confirm('¿Eliminar este planeta?')) {
                        onDelete(planet.id);
                      }
                    }}
                  >
                    <Delete fontSize="small" />
                  </Button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PlanetTable;