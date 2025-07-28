import moment from "moment"

moment.locale("pt-BR")

export const formatDate = (date: string | number) => {
    return moment(date).format("DD/MM/YYYY")
}

export function formatRevenue(value: number, locale: 'pt-BR' | 'en-US' = 'pt-BR', currency: 'BRL' | 'USD' = 'BRL'): string {
    return value.toLocaleString(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    })
}

export function formatDecimal(value: number | string, decimal: number = 1) {
    value = +value
    return value.toFixed(decimal)
}
