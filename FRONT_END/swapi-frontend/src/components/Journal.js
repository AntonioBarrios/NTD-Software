import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Journal = ({ entries }) => {
  return (
    <Card className="mb-4 journal-card">
      <Card.Header>
        <Card.Title>Registro de Operaciones</Card.Title>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {entries.map((entry, index) => (
            <ListGroup.Item key={index}>
              <small className="text-muted">[{entry.timestamp}]</small> {entry.message}
            </ListGroup.Item>
          ))}
          {entries.length === 0 && (
            <ListGroup.Item>No hay operaciones registradas</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Journal;