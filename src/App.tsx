// src/App.tsx
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormComponent, { CalculationData } from "./components/FormComponent";
import ChartComponent from "./components/ChartComponent";
import { ChartData } from "chart.js";

const App: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);

  const calculateData = (data: CalculationData) => {
    const {
      initialInvestment,
      recurrentInvestment,
      annualInterest,
      period,
      periodType,
    } = data;
    // Límite de años: 10 años; para mensuales: 5 años (60 meses)
    const totalPeriods =
      periodType === "anual" ? Math.min(period, 10) : Math.min(period, 60);

    const labels: string[] = [];
    const initialArr: number[] = [];
    const recurrentArr: number[] = [];
    const interestArr: number[] = [];

    const currentInitial = initialInvestment;
    let currentRecurrent = 0;
    let currentInterest = 0;
    const periodicRate =
      periodType === "anual" ? annualInterest / 100 : annualInterest / 100 / 12;

    for (let i = 1; i <= totalPeriods; i++) {
      if (i > 1) {
        currentRecurrent += recurrentInvestment;
      }
      const totalPrincipal = currentInitial + currentRecurrent;
      const interestForPeriod = totalPrincipal * periodicRate;
      currentInterest += interestForPeriod;

      labels.push(periodType === "anual" ? `Año ${i}` : `Mes ${i}`);
      initialArr.push(currentInitial);
      recurrentArr.push(currentRecurrent);
      interestArr.push(currentInterest);
    }

    const dataChart: ChartData<"bar"> = {
      labels,
      datasets: [
        {
          label: "Inversión Inicial",
          data: initialArr,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
        },
        {
          label: "Inversiones Recurrentes",
          data: recurrentArr,
          backgroundColor: "rgba(255, 206, 86, 0.7)",
        },
        {
          label: "Interés Generado",
          data: interestArr,
          backgroundColor: "rgba(75, 192, 192, 0.7)",
        },
      ],
    };

    setChartData(dataChart);
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center">Calculadora de Interés Compuesto</h1>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          {chartData ? (
            <ChartComponent data={chartData} />
          ) : (
            <p className="text-center">
              Realiza el cálculo para ver el gráfico
            </p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <FormComponent onCalculate={calculateData} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
