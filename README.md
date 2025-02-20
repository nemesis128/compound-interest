# Calculadora de Interés Compuesto

Bienvenido a la Calculadora de Interés Compuesto, una aplicación web creada con React, Vite y TypeScript que te permite estimar el crecimiento de una inversión inicial, junto con aportes recurrentes, usando el poder del interés compuesto.

Esta aplicación está diseñada para ser sencilla, intuitiva y agradable a la vista, aprovechando los últimos estándares en UI/UX gracias a Bootstrap. Además, puedes exportar tus resultados a PDF para tener un registro visual de tu progreso.

---

## Características

- **Cálculo de Interés Compuesto:**
  La aplicación realiza cálculos compuestos de forma acumulativa. Esto significa que el interés generado se suma al principal para el siguiente periodo, permitiéndote ver cómo crece tu inversión a lo largo del tiempo.

- **Modo de Visualización Flexible:**
  Puedes elegir entre ver los resultados de forma anual o mensual. Si seleccionas "anual", el periodo de inversión se limita a 10 años; si eliges "mensual", se calcularán hasta 60 meses (5 años).

- **Gráficos Interactivos:**
  El progreso de tu inversión se muestra en un gráfico de barras apiladas, donde cada barra incluye:
  - La inversión inicial.
  - Las inversiones recurrentes acumuladas.
  - El interés generado acumulado.

- **Exportación a PDF:**
  Con un solo clic, puedes exportar el gráfico y los datos de entrada a PDF para revisarlos o compartirlos fácilmente.

- **Diseño Centrado y Accesible:**
  Toda la interfaz está cuidadosamente centrada (tanto vertical como horizontalmente) para ofrecer una experiencia de usuario limpia y profesional.

---

## Requerimientos

Para trabajar con este proyecto necesitarás:

- **Node.js y npm:**
  Asegúrate de tener instaladas las últimas versiones de [Node.js](https://nodejs.org/) y npm.

- **Vite:**
  Usamos Vite para una experiencia de desarrollo rápida y moderna.

- **Dependencias principales:**
  - React y ReactDOM con TypeScript.
  - Bootstrap y react-bootstrap para una interfaz de usuario atractiva y accesible.
  - Chart.js y react-chartjs-2 para la visualización de datos.
  - jsPDF y html2canvas para la exportación a PDF.

---

## Instalación y Configuración

1. **Clona el repositorio o crea un nuevo proyecto usando Vite y TypeScript:**

   ```bash
   npm create vite@latest compound-interest-app -- --template react-ts
   cd compound-interest-app
   npm install
