
/**
 * Formata um telefone com a mascara correta ex: (xx) xxxx-xxx
 * @param {string} value - O telefone para ter formatado.
 * @returns {string} O tefone já formatado.
 */
export function formatPhone(value: string) {
  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length > 11) {
    return value.slice(0, 15);
  }

  const formattedValue = cleanedValue
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");

  return formattedValue;
}

/**
 * Remove caracteres especiais do telefone para obter apenas o valor n mero.
 * @param {string} phone - O telefone com caracteres especiais.
 * @returns {string} O telefone sem caracteres especiais.
 */
export function extractPhoneNumber(phone: string) {
  const phoneValue = phone.replace(/[\(\)\s-]/g, "");

  return phoneValue;
}
