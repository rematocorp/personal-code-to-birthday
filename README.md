# Personal Code to Birthday

[![Build](https://img.shields.io/github/actions/workflow/status/rematocorp/personal-code-to-birthday/ci.yml)](https://github.com/rematocorp/personal-code-to-birthday/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/rematocorp/personal-code-to-birthday?token=NDT35FM2LG&style=flat)](https://codecov.io/gh/rematocorp/personal-code-to-birthday)

Converts personal identification codes (or national ID numbers) from various countries into birthdate.

### Install

```bash
npm install @remato/personal-code-to-birthday
```

### How to use

```ts
const birthday = personalCodeToBirthday('39309262855')

console.log(birthday) // outputs { day: 26, month: 9, year: 1993 }
```

### Countries supported

-   🇪🇪 Estonia
-   🇱🇻 Latvia
-   🇱🇹 Lithuania
-   🇫🇮 Finland
-   🇸🇪 Sweden
-   🇳🇴 Norway
-   🇩🇰 Denmark

Countries we would like to support (PRs are welcome):

-   Ukraine
-   Iceland
-   South Africa
-   Romania
-   Hungary
-   Bulgaria
-   North Macedonia
-   Czech Republic
-   Slovakia
-   Poland
-   South Korea
-   Turkey
-   Moldova
-   Azerbaijan
-   Russia
