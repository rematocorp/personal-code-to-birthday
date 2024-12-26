"use strict";
var personalCodeToBirthday = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    default: () => personalCodeToBirthday
  });

  // src/utils.ts
  function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    if (year < 1900 || year > (/* @__PURE__ */ new Date()).getFullYear()) {
      return false;
    }
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  // src/parsers/denmark.ts
  function denmarkParser(code) {
    code = code.replace("-", "");
    const day = parseInt(code.slice(0, 2), 10);
    const month = parseInt(code.slice(2, 4), 10);
    let year = parseInt(code.slice(4, 6), 10);
    const centuryIndicator = parseInt(code.slice(6, 7), 10);
    if (centuryIndicator >= 0 && centuryIndicator <= 3) {
      year += 1900;
    } else if (centuryIndicator >= 4 && centuryIndicator <= 9) {
      if (year >= 0 && year <= 36) {
        year += 2e3;
      } else {
        year += 1900;
      }
    }
    if (year < 2007 && !isValidChecksum(code)) {
      return null;
    }
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum(code) {
    const weights = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    const digits = code.substring(0, 9).split("").map(Number);
    const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const checksum = sum % 11 === 0 ? 0 : 11 - sum % 11;
    if (checksum === 10) {
      return false;
    }
    return checksum === parseInt(code[9], 10);
  }

  // src/parsers/estoniaLithuania.ts
  function estoniaLithuaniaParser(code) {
    if (!isValidChecksum2(code)) {
      return null;
    }
    const centuryCode = parseInt(code[0], 10);
    const day = parseInt(code.slice(5, 7), 10);
    const month = parseInt(code.slice(3, 5), 10);
    let year = parseInt(code.slice(1, 3), 10);
    if (centuryCode === 3 || centuryCode === 4) {
      year += 1900;
    }
    if (centuryCode === 5 || centuryCode === 6) {
      year += 2e3;
    }
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum2(code) {
    const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    const weights2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];
    let checksum = 0;
    let total = 0;
    for (let i = 0; i < 10; ++i) {
      total += Number(code.charAt(i)) * weights1[i];
    }
    checksum = total % 11;
    total = 0;
    if (checksum === 10) {
      for (let i = 0; i < 10; ++i) {
        total += Number(code.charAt(i)) * weights2[i];
      }
      checksum = total % 11;
      if (10 === checksum) {
        checksum = 0;
      }
    }
    return checksum === Number(code[10]);
  }

  // src/parsers/finland.ts
  function finlandParser(code) {
    if (!isValidChecksum3(code)) {
      return null;
    }
    const day = parseInt(code.slice(0, 2), 10);
    const month = parseInt(code.slice(2, 4), 10);
    const yearSuffix = parseInt(code.slice(4, 6), 10);
    const centuryMarker = code[6];
    let year = yearSuffix;
    if (centuryMarker === "-") {
      year += 1900;
    } else if (centuryMarker === "A") {
      year += 2e3;
    }
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum3(code) {
    const validChars = "0123456789ABCDEFHJKLMNPRSTUVWXY";
    const serial = code.slice(0, 6) + code.slice(7, 10);
    const checksum = code[10];
    const num = parseInt(serial, 10);
    const remainder = num % 31;
    const expectedChecksum = validChars.charAt(remainder);
    return expectedChecksum === checksum.toUpperCase();
  }

  // src/parsers/latvia.ts
  function latviaParser(code) {
    code = code.replace("-", "");
    if (!isValidChecksum4(code)) {
      return null;
    }
    const day = parseInt(code.slice(0, 2), 10);
    const month = parseInt(code.slice(2, 4), 10);
    let year = parseInt(code.slice(4, 6), 10);
    const centuryCode = parseInt(code[6], 10);
    if (centuryCode === 3) {
      year += 2e3;
    } else {
      year += 1900;
    }
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum4(personalCode) {
    const weights = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const digits = personalCode.substring(0, 10).split("").map(Number);
    const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    let checksum = sum % 11;
    if (checksum === 10) {
      checksum = 0;
    }
    return checksum === parseInt(personalCode[10], 10);
  }

  // src/parsers/norway.ts
  function norwayParser(code) {
    code = code.replace(" ", "");
    if (!isValidChecksum5(code)) {
      return null;
    }
    const day = parseInt(code.slice(0, 2), 10);
    const month = parseInt(code.slice(2, 4), 10);
    let year = parseInt(code.slice(4, 6), 10);
    const centuryMarker = parseInt(code.slice(6, 7), 10);
    if (centuryMarker <= 4 || centuryMarker === 9) {
      year += year >= 40 ? 1900 : 2e3;
    } else if (centuryMarker >= 5 && centuryMarker <= 8) {
      year += 2e3;
    }
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum5(code) {
    const weights1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
    const weights2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const digits = code.substring(0, 9).split("").map(Number);
    const providedFirstCheckDigit = parseInt(code[9], 10);
    const providedSecondCheckDigit = parseInt(code[10], 10);
    const sum1 = digits.reduce((sum, digit, index) => sum + digit * weights1[index], 0);
    let firstCheckDigit = 11 - sum1 % 11;
    if (firstCheckDigit === 11) {
      firstCheckDigit = 0;
    }
    if (firstCheckDigit === 10) {
      return false;
    }
    const digitsWithFirstCheck = [...digits, firstCheckDigit];
    const sum2 = digitsWithFirstCheck.reduce((sum, digit, index) => sum + digit * weights2[index], 0);
    let secondCheckDigit = 11 - sum2 % 11;
    if (secondCheckDigit === 11) {
      secondCheckDigit = 0;
    }
    if (secondCheckDigit === 10) {
      return false;
    }
    return firstCheckDigit === providedFirstCheckDigit && secondCheckDigit === providedSecondCheckDigit;
  }

  // src/parsers/poland.ts
  function polandParser(code) {
    if (!isValidChecksum6(code)) {
      return null;
    }
    const day = parseInt(code.slice(4, 6), 10);
    let month = parseInt(code.slice(2, 4), 10);
    let year = parseInt(code.slice(0, 2), 10);
    if (month >= 1 && month <= 12) {
      year += 1900;
    } else if (month >= 21 && month <= 32) {
      year += 2e3;
      month -= 20;
    }
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum6(code) {
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const digits = code.slice(0, 10).split("").map(Number);
    const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const expectedChecksum = (10 - sum % 10) % 10;
    return expectedChecksum === parseInt(code[10], 10);
  }

  // src/parsers/romania.ts
  function romaniaParser(code) {
    if (!isValidChecksum7(code)) {
      return null;
    }
    let year = parseInt(code.slice(1, 3), 10);
    const month = parseInt(code.slice(3, 5), 10);
    const day = parseInt(code.slice(5, 7), 10);
    const gender = parseInt(code[0], 10);
    if (gender === 1 || gender === 2) {
      year += 1900;
    } else if (gender === 5 || gender === 6) {
      year += 2e3;
    }
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum7(code) {
    const weights = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(code[i]) * weights[i];
    }
    const checksum = sum % 11 === 10 ? 1 : sum % 11;
    return checksum === parseInt(code[12]);
  }

  // src/parsers/sweden.ts
  function swedenParser(code) {
    code = code.replace("-", "");
    if (!isValidChecksum8(code)) {
      return null;
    }
    let year;
    let month;
    let day;
    if (code.length === 12) {
      year = parseInt(code.slice(0, 4), 10);
      month = parseInt(code.slice(4, 6), 10);
      day = parseInt(code.slice(6, 8), 10);
    } else {
      year = parseInt(code.slice(0, 2), 10);
      month = parseInt(code.slice(2, 4), 10);
      day = parseInt(code.slice(4, 6), 10);
      if ((/* @__PURE__ */ new Date()).getFullYear() - (1900 + year) > 99) {
        year += 2e3;
      } else {
        year += 1900;
      }
    }
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum8(code) {
    const digits = code.length === 12 ? code.slice(2, 11) : code.slice(0, 9);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = parseInt(digits[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    const expectedChecksum = (10 - sum % 10) % 10;
    return expectedChecksum === Number(code[code.length - 1]);
  }

  // src/parsers/ukraine.ts
  function ukrainianParser(code) {
    if (!isValidChecksum9(code)) {
      return null;
    }
    const daysSinceBaseDate = parseInt(code.slice(0, 5), 10);
    const baseDate = new Date(1899, 11, 31);
    const birthDate = new Date(baseDate.getTime() + daysSinceBaseDate * 24 * 60 * 60 * 1e3);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();
    if (!isValidDate(day, month, year)) {
      return null;
    }
    return { day, month, year };
  }
  function isValidChecksum9(code) {
    const digits = code.slice(0, 9).split("").map(Number);
    const weights = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
    const controlSum = digits.reduce((sum, digit, index) => sum + digit * weights[index], 0);
    let controlNumber = controlSum % 11;
    if (controlNumber === 10) {
      controlNumber = 0;
    }
    return controlNumber === parseInt(code[9], 10);
  }

  // src/index.ts
  function personalCodeToBirthday(code) {
    if (/^\d{10}$/.test(code)) {
      return ukrainianParser(code) || swedenParser(code);
    } else if (/^\d{11}$/.test(code)) {
      return estoniaLithuaniaParser(code) || polandParser(code) || norwayParser(code);
    } else if (/^\d{12}$/.test(code)) {
      return swedenParser(code);
    } else if (/^\d{13}$/.test(code)) {
      return romaniaParser(code);
    } else if (/^\d{6}\s\d{5}$/.test(code)) {
      return norwayParser(code);
    } else if (/^\d{6}-\d{5}$/.test(code)) {
      return latviaParser(code);
    } else if (/^\d{6}[+-A]\d{3}[A-Za-z]$/.test(code)) {
      return finlandParser(code);
    } else if (/^\d{6}-\d{4}$/.test(code)) {
      return finlandParser(code) || swedenParser(code) || denmarkParser(code);
    } else if (/^\d{6}A\d{4}$/.test(code)) {
      return finlandParser(code);
    } else if (/^\d{8}-\d{4}$/.test(code)) {
      return swedenParser(code);
    }
    return null;
  }
  return __toCommonJS(index_exports);
})();
