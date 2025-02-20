// src/components/FormComponent.tsx
import React, { useState, FormEvent } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export interface CalculationData {
  initialInvestment: number;
  recurrentInvestment: number;
  annualInterest: number;
  period: number;
  periodType: "anual" | "mensual";
}

interface FormComponentProps {
  onCalculate: (data: CalculationData) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onCalculate }) => {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [recurrentInvestment, setRecurrentInvestment] = useState<string>("");
  const [annualInterest, setAnnualInterest] = useState<string>("");
  const [period, setPeriod] = useState<string>("");
  const [periodType, setPeriodType] = useState<"anual" | "mensual">("anual");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCalculate({
      initialInvestment: parseFloat(initialInvestment),
      recurrentInvestment: parseFloat(recurrentInvestment) || 0,
      annualInterest: parseFloat(annualInterest),
      period: parseInt(period, 10),
      periodType,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="initialInvestment">
            <Form.Label>Inversión Inicial</Form.Label>
            <Form.Control
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              placeholder="Monto inicial"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="recurrentInvestment">
            <Form.Label>Inversiones Recurrentes (opcional)</Form.Label>
            <Form.Control
              type="number"
              value={recurrentInvestment}
              onChange={(e) => setRecurrentInvestment(e.target.value)}
              placeholder="Monto recurrente"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="annualInterest">
            <Form.Label>Tasa de Interés Anual (%)</Form.Label>
            <Form.Control
              type="number"
              value={annualInterest}
              onChange={(e) => setAnnualInterest(e.target.value)}
              placeholder="Ej: 5"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="period">
            <Form.Label>Periodo de Inversión</Form.Label>
            <Form.Control
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="Cantidad de años o meses"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="periodType">
            <Form.Label>Tipo de Periodo</Form.Label>
            <Form.Select
              value={periodType}
              onChange={(e) =>
                setPeriodType(e.target.value as "anual" | "mensual")
              }
            >
              <option value="anual">Anual</option>
              <option value="mensual">Mensual</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Calcular
      </Button>
    </Form>
  );
};

export default FormComponent;
