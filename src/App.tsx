// src/App.tsx
import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormComponent, { CalculationData } from "./components/FormComponent";
import ChartComponent from "./components/ChartComponent";
import { ChartData } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const App: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  // Se almacena la última información ingresada para incluirla en el PDF
  const [inputData, setInputData] = useState<CalculationData | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const calculateData = (data: CalculationData) => {
    setInputData(data);
    const {
      initialInvestment,
      recurrentInvestment,
      annualInterest,
      period,
      periodType,
    } = data;
    // Límite: 10 años para anual, 60 meses para mensual
    const totalPeriods =
      periodType === "anual" ? Math.min(period, 10) : Math.min(period, 60);

    const labels: string[] = [];
    const initialArr: number[] = [];
    const recurrentArr: number[] = [];
    const interestArr: number[] = [];

    let currentInitial = initialInvestment;
    let currentRecurrent = 0;
    let currentInterest = 0;
    // Para anual se aplica la tasa anual, para mensual se divide entre 12
    const periodicRate =
      periodType === "anual" ? annualInterest / 100 : annualInterest / 100 / 12;

    // En cada iteración, se suma la inversión recurrente por el periodo (año o mes)
    for (let i = 1; i <= totalPeriods; i++) {
      // A partir del segundo periodo se agrega la inversión recurrente
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
    if (!exportRef.current) return;
    // Se genera una imagen del contenedor que incluye gráfico e inputs
    const canvas = await html2canvas(exportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    // Se abre el PDF en una nueva pestaña
    window.open(pdf.output("bloburl"), "_blank");
  };

  return (
    // Container fluid centrado vertical y horizontalmente
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
        {/* Contenedor que engloba el gráfico y el formulario (incluye inputs) para la exportación */}
        <div ref={exportRef}>
          <Row className="mb-4">
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
              <FormComponent
                onCalculate={calculateData}
                onExport={exportPDF}
                exportEnabled={chartData !== null}
              />
            </Col>
          </Row>
          {/* Se muestra un resumen de los datos ingresados para que se incluya en el PDF */}
          {inputData && (
            <Row className="mt-4">
              <Col>
                <h5 className="text-center">Datos de la Inversión</h5>
                <p className="text-center">
                  <strong>Inversión Inicial:</strong>{" "}
                  {inputData.initialInvestment} &nbsp;|&nbsp;
                  <strong>Inversiones Recurrentes:</strong>{" "}
                  {inputData.recurrentInvestment} &nbsp;|&nbsp;
                  <strong>Tasa de Interés Anual:</strong>{" "}
                  {inputData.annualInterest}% &nbsp;|&nbsp;
                  <strong>Periodo de Inversión:</strong> {inputData.period}{" "}
                  {inputData.periodType === "anual" ? "años" : "meses"}
                </p>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </Container>
  );
};

export default App;
