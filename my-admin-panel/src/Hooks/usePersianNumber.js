// src/Hooks/usePersianNumber.js

// تبدیل اعداد انگلیسی به فارسی
const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

export const toPersianNumber = (value) => {
  if (value === null || value === undefined || value === "") return "";

  const str = String(value);

  return str.replace(/[0-9]/g, (digit) => persianDigits[digit]);
};

// تبدیل عدد + جداکننده هر سه رقم + فارسی
export const formatPrice = (number) => {
  if (number === null || number === undefined || number === "") return "۰";

  const num = Number(number);

  if (isNaN(num)) return "نامعتبر";

  // جداکننده هر سه رقم
  const formatted = num
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // تبدیل به فارسی
  return toPersianNumber(formatted);
};

// هوک اصلی (اختیاری — اگه بخوای توی کامپوننت use کنی)
import { useMemo } from "react";

export const usePersianNumber = (number) => {
  return useMemo(() => ({
    persian: toPersianNumber(number),
    price: formatPrice(number),
  }), [number]);
};