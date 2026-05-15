const vndFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatVnd(amount: number) {
  return `${vndFormatter.format(amount)} đ`;
}

export function formatSignedVnd(amount: number) {
  const prefix = amount > 0 ? "+" : amount < 0 ? "-" : "";
  return `${prefix}${formatVnd(Math.abs(amount))}`;
}

export function formatDateVi(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

export function formatDateTimeVi(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return `${dateFormatter.format(value)} ${timeFormatter.format(value)}`;
}

export function formatDateKey(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
