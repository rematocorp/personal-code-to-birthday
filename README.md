# Personal Code to Birthday

[![Build](https://img.shields.io/github/actions/workflow/status/rematocorp/personal-code-to-birthday/ci.yml)](https://github.com/rematocorp/personal-code-to-birthday/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/rematocorp/personal-code-to-birthday?token=NDT35FM2LG&style=flat)](https://codecov.io/gh/rematocorp/personal-code-to-birthday)

Converts personal identification codes from various countries into birthdate.

### Features

-   **Automatic Birthdate Extraction**: Effortlessly extracts birthdates from national ID codes.
-   **Built-in Validation**: Confirms personal code validity using checksum verification before returning a date.
-   **Country-Agnostic**: Automatically identifies and processes the country format, requiring no additional parameters.
-   **Lightweight & Seamless Integration**: Designed for easy integration into any project with minimal setup.

### Limitations

-   **Date Range Restriction**: Only supports personal codes issued from 1900 to the present. Future-dated codes are not currently supported.

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
