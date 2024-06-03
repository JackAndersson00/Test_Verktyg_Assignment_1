# Test_Verktyg_Assignment_1

# Projektbeskrivning

I detta projekt har vi byggt en enkel webbapplikation med HTML, CSS och JavaScript. Vi har också skapat en server som tar emot requests och skickar tillbaka responses från en MySQL-databas. Huvudfokuset ligger dock på testning av servern.

## Krav

- Konto och inloggningsuppgifter till MySQL

## Installationsguide

1. Ladda ner zip-filen till valfri plats.
2. Extrahera alla filer.
3. Öppna terminalen.
4. Navigera till mappen "Test_Verktyg_Assignment_1" via terminalen.
5. Starta servern i terminalen genom att ange kommandot: `npm start`
6. Öppna filen `routes.js`.
    - Ändra `username` och `password` på rad 9 och 10 till dina egna uppgifter.
7. I alla testfiler i mapparna `__tests__` och `tests`:
    - Ändra `username` och `password` till dina egna uppgifter i creatConnection-funktionen.
8. Kör `npm run test:unit` för enhetstester.
9. Kör `npm run test:int` för integrationstester.
10. Kör `npm run test:e2e` för end-2-end-tester
11. Om du vill köra testerna med mocha och generera testrapport, kör `npm run mocha:test` 



## Skapad av

- Jack Andersson
- Kemal Hadziavdic
- Tomislav Vuckovic
- Joakim Christoffersson
