export const currencyFormatter = new Intl.NumberFormat("en-IN", {
    currency: "inr",
    style: "currency",
    minimumFractionDigits: 0 //else it will add .00 after number e.g. 200.00
})