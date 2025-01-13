# Personal Code to Birthday

[![NPM Version](https://img.shields.io/npm/v/%40remato%2Fpersonal-code-to-birthday)](https://www.npmjs.com/package/@remato/personal-code-to-birthday)
[![Build](https://img.shields.io/github/actions/workflow/status/rematocorp/personal-code-to-birthday/ci.yml)](https://github.com/rematocorp/personal-code-to-birthday/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/rematocorp/personal-code-to-birthday?token=NDT35FM2LG&style=flat)](https://codecov.io/gh/rematocorp/personal-code-to-birthday)

Converts personal identification codes from various countries into birthdate.

**[Try it out](https://rematocorp.github.io/personal-code-to-birthday/)**

### Features

- **Built-in Validation**: Confirms personal code validity using checksum verification before returning a date.
- **Country-Agnostic**: Automatically identifies and processes the country format, requiring no additional parameters.
- **Lightweight**: Designed for easy integration into any project with no extra dependencies.

### Limitations

- Only supports personal codes issued from 1900 to the present. Future-dated codes are not currently supported.

### Installation

```bash
npm install @remato/personal-code-to-birthday
```

### Usage

```ts
const birthday = personalCodeToBirthday('39309262855')

console.log(birthday) // outputs { day: 26, month: 9, year: 1993 }
```

### Countries supported

1. 🇺🇦 Ukraine
2. 🇪🇪 Estonia
3. 🇱🇻 Latvia
4. 🇱🇹 Lithuania
5. 🇵🇱 Poland
6. 🇫🇮 Finland
7. 🇸🇪 Sweden
8. 🇳🇴 Norway
9. 🇩🇰 Denmark
10. 🇷🇴 Romania

Need support for a new country or have feedback? [Create an issue.](https://github.com/rematocorp/personal-code-to-birthday/issues/new)

### Random facts

1. In Ukraine, the first five digits of the code indicate birthdate as days since January 1, 1900
2. Lithuania and Estonia use a nearly identical personal code system.
3. Estonia's personal code used to include hospital where the person was born.
4. Denmark dropped the check digit in 2007 due to running out of available numbers.
5. Latvia removed the birthdate component from their new personal codes starting in 2017.
6. In Sweden, individuals who turn 100 receive a new personal code, where “-” is replaced by “+”.
7. Norway plans to remove gender and century indicators from personal codes in 2032.
8. Finland’s personal codes include both numbers and letters for the checksum.
9. Romania’s personal code includes a county indicator.
10. Poland’s system differentiates centuries by altering the month digits.

### Authors

Created by the [Remato team](https://remato.com) to auto-complete birthdate entries based on the construction worker’s personal ID input (country unknown).
