import React from 'react';
import { Card } from 'react-bootstrap';

const Summary = ({ planets }) => {
  const totalPlanets = planets.length;
  const totalPopulation = planets.reduce((sum, planet) => {
    return sum + (planet.poblacion || 0);
  }, 0);

  return (
    <Card className="mt-4">
      <Card.Header>
        <Card.Title>Resumen</Card.Title>
      </Card.Header>
      <Card.Body>
        <p>Total planetas: <strong>{totalPlanets}</strong></p>
        <p>Población total: <strong>{totalPopulation.toLocaleString()}</strong></p>
      </Card.Body>
    </Card>
  );
};

export default Summary;