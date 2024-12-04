export enum Reporte {
  LIBRO_DIARIO_POR_ITEM = "1",
}

export class ReporteUtils {
  public static getDescripcion(reporte: Reporte): string {
    switch (reporte) {
      case Reporte.LIBRO_DIARIO_POR_ITEM:
        return "Libro Diario Por Item";
      default:
        return `Valor no reconocido: ${reporte}`;
    }
  }

  public static getReportePorDescripcion(descripcion: string): Reporte | string {
    const reportes = Object.values(Reporte);

    for (let i in reportes) {
      if (this.getDescripcion(reportes[i]) == descripcion) {
        return reportes[i];
      }
    }

    return `Valor no reconocido: ${descripcion}`;
  }
}

