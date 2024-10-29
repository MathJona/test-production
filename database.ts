import { createPool, Pool, QueryResult } from "mysql2/promise";
import { HttpStatus } from "./src/utils/enums";
import { Exception } from "./src/exceptions";

export function connect() {
  return createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWORD,
    database: process.env.DB_NAME,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
  });
}

export async function query(
  sql: string,
  params?: (string | number | boolean | null)[],
): Promise<Exception | QueryResult> {
  try {
    const connection: Pool = connect();
    const results = await connection.query(sql, params);
    connection.end();

    const usableResults: QueryResult = results[0];
    return usableResults;
  } catch (error: unknown) {
    if (error) {
      const DatabaseError = error as {
        code?: string;
        errno?: number;
        sqlMessage?: string;
      };
      if (DatabaseError.code === "ECONNREFUSED") {
        throw new Exception(
          "Error de Conexion a Base de Datos",
          "Asegurate que la Base de Datos este funcionando correctamente.",
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else if (DatabaseError.code === "TimeoutError") {
        throw new Exception(
          "Tiempo de Espera para Conexion a Base de Datos Agotado",
          "Intentalo de nuevo. Asegurate que la Base de Datos este funcionando correctamente.",
          HttpStatus.GATEWAY_TIMEOUT,
        );
      } else if (DatabaseError.errno === 1452) {
        throw new Exception(
          "Incongruencia en Informacion",
          "Asegurate de que la informacion suministrada sea congruente con la informacion en la Base de Datos.",
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new Exception(
          `Error en Base de Datos no reconocido`,
          `Error inesperado: ${DatabaseError}`,
        );
      }
    } else {
      throw new Exception(
        `Error Irreconocible`,
        `Comunicate con el equipo de soporte para indigar.`,
      );
    }
  }
}
