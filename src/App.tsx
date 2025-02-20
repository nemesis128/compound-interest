// src/App.tsx
import React, { useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FormComponent, { CalculationData } from "./components/FormComponent";
import ChartComponent from "./components/ChartComponent";
import { ChartData } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const App: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const calculateData = (data: CalculationData) => {
    const {
      initialInvestment,
      recurrentInvestment,
      annualInterest,
      period,
      periodType,
    } = data;
    // Límite: 10 años para anual, 60 meses (5 años) para mensual
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

  const exportPDF = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    // Abre el PDF en una nueva pestaña
    window.open(pdf.output("bloburl"), "_blank");
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "960px" }}>
        <Row>
          <Col>
            <h1 className="text-center mb-4">
              Calculadora de Interés Compuesto
            </h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <div ref={chartRef}>
              {chartData ? (
                <ChartComponent data={chartData} />
              ) : (
                <p className="text-center">
                  Realiza el cálculo para ver el gráfico
                </p>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="text-center">
            {chartData && (
              <Button variant="secondary" onClick={exportPDF}>
                Exportar PDF
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <FormComponent onCalculate={calculateData} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default App;
