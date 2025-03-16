export interface Recolector {
  id: string;
  nombre: string;
  kilos: number;
  precioPorKilo: number;
  fecha: string;
}

export interface PagoRecolector extends Recolector {
  total: number;
}

export interface ResumenRecolector {
  nombre: string;
  totalKilos: number;
  totalPago: number;
  registros: PagoRecolector[];
}
