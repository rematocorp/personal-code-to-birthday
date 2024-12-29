# Surprising Facts About European National Identification Numbers

**At [Remato](https://remato.com/crew-management/), where we build software for construction crews, we faced an interesting challenge:** using workers’ personal codes to automatically determine their birthdays—saving managers from tedious manual input. The twist? Our system doesn’t know the worker’s country of origin. 

This led us to develop the [personal-code-to-birthday](https://rematocorp.github.io/personal-code-to-birthday/) library, which uncovered fascinating differences in how European nations structure their personal codes.

### 🇺🇦 Ukraine
Personal codes include the first five digits, which represent the **number of days since January 1, 1900**. This encodes the individual’s birthdate.

### 🇸🇪 Sweden
When individuals **turn 100 years old,** their personal code is updated. The separator between numbers changes from a “-” to a “+”.

### 🇪🇪 Estonia
Previously, personal codes included a detail about the **hospital where the person was born**. This practice has since been discontinued.

### 🇩🇰 Denmark
In 2007, Denmark stopped using a check digit in personal codes because they were running out of unique code combinations **(too many people)**.

### 🇱🇻 Latvia
Starting in 2017, Latvia’s new personal codes **no longer include the birthdate**, which was previously part of the code.

### 🇱🇹 Lithuania
The first digit of the personal code indicates the **century and gender** (e.g., 3 for males born in the 1900s, 4 for females born in the 1900s).

### 🇳🇴 Norway
By 2032, Norway plans to **remove gender and century indicators** from personal codes, making them more neutral and less identifiable.

### 🇫🇮 Finland
Personal codes include can **include letters** for advanced checksum.

### 🇷🇴 Romania
Romanian personal codes contain an indicator for the **county where the individual was born**.

#### 🇵🇱 Poland
Personal codes **modify month digits** to indicate the century, e.g., January 1900s: 01, January 2000s: 21.
