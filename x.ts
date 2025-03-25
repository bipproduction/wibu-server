/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';

// Fungsi untuk mengonversi tipe Swagger ke tipe TypeScript
function swaggerTypeToTsType(swaggerType: string, format?: string): string {
  if (swaggerType === 'string' && format === 'binary') return 'File'; // Untuk file binary
  switch (swaggerType) {
    case 'string':
      return 'string';
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      return 'any[]'; // Default, akan disesuaikan jika ada items
    case 'object':
      return 'object';
    default:
      return 'any';
  }
}

// Fungsi untuk mengonversi schema object ke interface TypeScript
function schemaToTsInterface(name: string, schema: any): string {
  let tsOutput = `interface ${name} {\n`;
  const properties = schema.properties || {};
  const required = schema.required || [];

  for (const [propName, propDetails] of Object.entries(properties)) {
    const propType = (propDetails as any).type;
    const propFormat = (propDetails as any).format;
    let tsType = swaggerTypeToTsType(propType, propFormat);

    // Jika tipe adalah array dan ada items
    if (propType === 'array' && (propDetails as any).items) {
      const itemType = swaggerTypeToTsType((propDetails as any).items.type);
      tsType = `${itemType}[]`;
    }

    const isRequired = required.includes(propName) ? '' : '?';
    tsOutput += `  ${propName}${isRequired}: ${tsType};\n`;
  }

  tsOutput += '}\n\n';
  return tsOutput;
}

// Fungsi utama untuk mengonversi Swagger JSON ke TypeScript
function convertSwaggerToTs(swaggerJsonPath: string, outputPath: string) {
  try {
    // Baca file Swagger JSON
    const swaggerData = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8'));
    const paths = swaggerData.paths || {};

    let tsOutput = '// Generated TypeScript types from Swagger JSON\n\n';

    // Iterasi setiap path dan method
    for (const [path, methods] of Object.entries(paths)) {
      for (const [method, details] of Object.entries(methods as any)) {
        const operationId = (details as any).operationId || `${method}${path.replace(/\//g, '_')}`;

        // Proses parameters (jika ada)
        if ((details as any).parameters?.length > 0) {
          const paramName = `${operationId}Params`;
          tsOutput += `interface ${paramName} {\n`;
          (details as any).parameters.forEach((param: any) => {
            const paramType = swaggerTypeToTsType(param.schema.type);
            const isRequired = param.required ? '' : '?';
            tsOutput += `  ${param.name}${isRequired}: ${paramType};\n`;
          });
          tsOutput += '}\n\n';
        }

        // Proses requestBody (jika ada)
        if ((details as any).requestBody) {
          const requestBody = (details as any).requestBody;
          const content = requestBody.content['application/json'] || requestBody.content['multipart/form-data'];
          if (content && content.schema) {
            const requestName = `${operationId}Request`;
            tsOutput += schemaToTsInterface(requestName, content.schema);
          }
        }
      }
    }

    // Tulis hasil ke file
    fs.writeFileSync(outputPath, tsOutput);
    console.log(`TypeScript types berhasil disimpan di ${outputPath}`);
  } catch (error) {
    console.error('Error saat mengonversi Swagger ke TS:', error);
  }
}

// Contoh penggunaan
convertSwaggerToTs('./swagger.json', './src/myApi.ts');