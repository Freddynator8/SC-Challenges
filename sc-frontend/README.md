## Installation
```bash
$ npm install
```
## Start App
```bash
$ npm start run
```
Zum Öffnen auf http://localhost:3000

## Aufbau
Da ich am wenigsten erfahrung mit React besitze musste hier von ganz vorne angefangen werden.
Nach dem gründlichen Lesen der Documentation wurde mit dem kleinstem Baustein gestartet. Dem Feld.
Danach kam das Board und danach die Spiellogic. Die Daten wurden dann von oben hinunter geparsed.
Die Figuren bestehen aus den Queens (QB,QW) und den Knights (KB,KW). Ist ein Feld bespringbar so bekommt es den Marker X.
Wird eine Figur attackiert so wird das mit einem A vermerkt (QBA,QWA,KBA,KWA). 
Das Spielende wird in der Browserconsole angezeigt da leider nicht mehr Zeit für einen Output auf der Spielfläche blieb und das auch in der Angabe nicht näher beschrieben war.