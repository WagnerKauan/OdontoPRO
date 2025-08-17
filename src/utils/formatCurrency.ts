

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
});


/**
 *  Formata um numero em reais
 * @param number numero que deseja formatar
 * @returns { string } numero formatado
 * @example
 * formatCurrency(100) // R$ 100,00
 */
export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
