# Personal Code to Birthday

Converts personal identification codes (or national ID numbers) from various countries into birthdate.

```bash
npm install @remato/personal-code-to-birthday
```

```ts
const birthday = personalCodeToBirthday('39309262855')

console.log(birthday) // outputs { day: 26, month: 9, year: 1993 }
```

Countries currently supported:

-   Estonia
-   Latvia
-   Lithuania
-   Finland
-   Sweden
-   Norway
-   Denmark

Countries we would like to support (PRs are welcome):

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
-   Ukraine
