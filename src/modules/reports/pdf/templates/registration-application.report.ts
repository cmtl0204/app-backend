import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import {backgroundDefault} from './layouts/background_default'


export const registrationApplicationReport = (data: any): TDocumentDefinitions => {
  return {
    pageOrientation: 'portrait',
    pageSize: 'A4',
    pageMargins: [40, 120, 40, 60],

    content: [
      buildHeader(data),
      buildStudentInformation(data),
      buildRegistrationDetails(data),
      
      buildSubjectsTable(data), 
      
      buildStatusBadge(data),
      buildImportantTerms(),
      buildSignatures(data),
    ],

   background:backgroundDefault(),

    styles: styles,
  };
};

export const styles: StyleDictionary = {
  title: {
    fontSize: 16,
    bold: true,
    alignment: 'center',
    color: '#1F2937',
    margin: [0, 10, 0, 5],
  },
  subtitle: {
    fontSize: 12,
    bold: true,
    color: '#1F2937',
    margin: [0, 15, 0, 8],
  },
  personName: {
    fontSize: 14,
    bold: true,
    color: '#000000',
  },
  statusBadge: {
    fontSize: 14,
    bold: true,
    alignment: 'center',
    color: '#047857', // Verde indicando éxito/registro
    margin: [0, 20, 0, 20],
  },
  importantTitle: {
    fontSize: 11,
    bold: true,
    color: '#424141',
    margin: [0, 30, 0, 5],
  },
  importantText: {
    fontSize: 10,
    color: '#4B5563',
    margin: [0, 5, 0, 5],
  },
  tableHeader: {
    fontSize: 10,
    bold: true,
    color: '#000000',
    fillColor: '#E5E7EB',
    alignment: 'left',
    margin: [5, 5, 5, 5],
  },
  tableText: {
    fontSize: 10,
    color: '#374151',
    margin: [5, 5, 5, 5],
  },
  signature: {
    fontSize: 11,
    bold: true,
    alignment: 'center',
    color: '#000000',
  },
  signatureRole: {
    fontSize: 9,
    alignment: 'center',
    color: '#4B5563',
  },
};

const buildHeader = (data: any): Content => ({
  stack: [
    {
      text: 'CERTIFICADO DE MATRÍCULA',
      style: 'title',
    },
    {
      text: `N° COMPROBANTE: ${data.registration.id.split('-')[0].toUpperCase()}`,
      fontSize: 10,
      alignment: 'center',
      color: '#6B7280',
      margin: [0, 0, 0, 20],
    },
  ],
});

const buildStudentInformation = (data: any): Content => ({
  stack: [
    { text: 'DATOS DEL ESTUDIANTE', style: 'subtitle' },
    {
      table: {
        widths: ['30%', '70%'],
        body: [
          [
            { text: 'Nombres y Apellidos:', style: 'tableHeader' },
            {
              text: `${data.registration.student.user.name} ${data.registration.student.user.lastname}`,
              style: 'tableText',
            },
          ],
          [
            { text: 'Identificación:', style: 'tableHeader' },
            { text: data.registration.student.user.identification, style: 'tableText' },
          ],
          [
            { text: 'Correo Institucional:', style: 'tableHeader' },
            { text: data.registration.student.user.email, style: 'tableText' },
          ],
        ],
      },
      layout: 'lightHorizontalLines',
    },
  ],
});

const buildRegistrationDetails = (data: any): Content => ({
  stack: [
    { text: 'DETALLES ACADÉMICOS', style: 'subtitle' },
    {
      table: {
        widths: ['30%', '70%'],
        body: [
          [
            { text: 'Carrera / Programa:', style: 'tableHeader' },
            { text: data.registration.career.name, style: 'tableText' },
          ],
          [
            { text: 'Período Académico:', style: 'tableHeader' },
            { text: data.registration.academicPeriod.name, style: 'tableText' },
          ],
          [
            { text: 'Fecha de Registro:', style: 'tableHeader' },
            {
              text: new Date(data.registration.createdAt).toLocaleDateString('es-ES'),
              style: 'tableText',
            },
          ],
        ],
      },
      layout: 'lightHorizontalLines',
    },
  ],
});

const buildStatusBadge = (data: any): Content => ({
  stack: [
    {
      text: 'ESTADO DE MATRÍCULA: REGISTRADO',
      style: 'statusBadge',
    },
    {
      canvas: [
        {
          type: 'line',
          x1: 150,
          y1: 0,
          x2: 365,
          y2: 0,
          lineColor: '#047857',
          lineWidth: 1.5,
        },
      ],
      alignment: 'center',
      margin: [0, -15, 0, 20],
    },
  ],
});

const buildImportantTerms = (): Content => ({
  stack: [
    {
      text: 'INFORMACIÓN IMPORTANTE',
      style: 'importantTitle',
    },
    {
      text: '• El presente documento certifica que el estudiante ha completado exitosamente su proceso de matriculación para el período académico vigente.',
      style: 'importantText',
    },
    {
      text: '• La condición de "Registrado" formaliza el vínculo académico y administrativo con la institución.',
      style: 'importantText',
    },
  ],
});

const buildSignatures = (data: any): Content => ({
  columns: [
    {
      stack: [
        {
          margin: [0, 80, 0, 5],
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 150, y2: 0, lineColor: '#000000' }],
          alignment: 'center',
        },
        { text: 'Firma del Estudiante', style: 'signature' },
        { text: data.registration.student.identification, style: 'signatureRole' },
      ],
    },
    {
      stack: [
        {
          margin: [0, 80, 0, 5],
          canvas: [{ type: 'line', x1: 0, y1: 0, x2: 150, y2: 0, lineColor: '#000000' }],
          alignment: 'center',
        },
        { text: 'Secretaría Académica', style: 'signature' },
        { text: 'Sello Institucional', style: 'signatureRole' },
      ],
    },
  ],
  margin: [0, 20, 0, 0],
});

const buildSubjectsTable = (data: any): Content => {
  // Verificamos que existan detalles para evitar errores
  const details = data.registration.enrollmentDetails || [];

  return {
    stack: [
      { text: 'ASIGNATURAS MATRICULADAS', style: 'subtitle', margin: [0, 15, 0, 10] },
      {
        table: {
          headerRows: 1,
          // Definimos el ancho de las columnas (Nro, Código/Número, Asignatura)
          widths: ['auto', 'auto', '*'],
          body: [
            // Fila de encabezados
            [
              { text: 'N°', style: 'tableHeader' },
              { text: 'Nro. Matrícula', style: 'tableHeader' },
              { text: 'Asignatura', style: 'tableHeader' },
            ],

            // Filas dinámicas generadas a partir de la base de datos
            ...details.map((detail: any, index: number) => [
              { text: (index + 1).toString(), style: 'tableText', alignment: 'center' },
              {
                text: detail.number ? detail.number.toString() : '-',
                style: 'tableText',
                alignment: 'center',
              },
              // Nota: Ajusta "name" por el campo real que tenga tu SubjectEntity (ej. "nombre", "title", etc)
              { text: detail.subject?.name || 'Sin nombre', style: 'tableText' },
            ]),
          ],
        },
        layout: 'lightHorizontalLines',
      },
    ],
  };
};
