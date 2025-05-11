
/*const CLAVE_UNLOCK_STORAGE = 'mi_clave_ultra_segura_123';

export function encriptarAES(texto: string): string {
  return CryptoJS.AES.encrypt(texto, CLAVE_UNLOCK_STORAGE).toString();
}

export function desencriptarAES(textoCifrado: string): string {
  const bytes = CryptoJS.AES.decrypt(textoCifrado, CLAVE_UNLOCK_STORAGE);
  return bytes.toString(CryptoJS.enc.Utf8);
}*/

// LocalStorage
export function salvarItemEnLocalStorage(key: string, valor: any, isEncriptar: boolean): void {
  let texto = typeof valor === 'object' ? JSON.stringify(valor) : String(valor);
  if (isEncriptar) texto = /*encriptarAES*/(texto);
  localStorage.setItem(key, texto);
}

export function obtenerItemDelLocalStorage(key: string, isEncriptado: boolean): any {
  const resultado = localStorage.getItem(key);
  if (!resultado) return null;

  try {
    const texto = isEncriptado ? /*desencriptarAES*/(resultado) : resultado;
    return JSON.parse(texto);
  }
  catch {
    return null;
  }
}

export function removerItemDelLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export function limpiarLocalStorage(): void {
  localStorage.clear;
}

// SessionStorage
export function salvarItemEnSessionStorage(key: string, valor: any, isEncriptar: boolean): void {
  let texto = typeof valor === 'object' ? JSON.stringify(valor) : String(valor);
  if (isEncriptar) texto = /*encriptarAES*/(texto);
  sessionStorage.setItem(key, texto);
}

export function obtenerItemDelSessionStorage(key: string, isEncriptado: boolean): any {
  const resultado = sessionStorage.getItem(key);
  if (!resultado) return null;

  try {
    const texto = isEncriptado ? /*desencriptarAES*/(resultado) : resultado;
    return JSON.parse(texto);
  }
  catch {
    return null;
  }
}

export function removerItemDelSessionStorage(key: string): void {
  sessionStorage.removeItem(key);
}

export function limpiarSessionStorage(): void {
  sessionStorage.clear;
}


