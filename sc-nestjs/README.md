
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```
## Running the docker
```bash
# unit tests
$ docker-compose up --build
```

## Notes
Da alle Challenges sehr zeitaufwendig waren sind sich einige Dinge aus Zeitlichen gründen (Sommerjob) nicht ganz so detailiert ausgegangen wie erwünscht. 
Dennoch wurden alle gewünschten features implementiert. Was leider unter dem Zeitmangel gelitten hat sind die ausführliche Dokumentation des Codes und genügend und ausführliche tests.
Um zu zeigen das mir das Testen nicht fremd ist wurden dennoch, wenn auch nur wenige, Testcases hinzugefügt.

## Aufbau
In der Challange wird ein ProjectController zur Behandlung der eingehenden Requests verwendet. 
Der ProjectService kümmert sich dabei um das Abwickeln der Tasks sowie das Emitten für die Queue.
Im Database folder befinden sich alle Datenbank zugehörigen Files. Das darin enthaltene Database Module ist für die Connection zur Database verantwortlich.
Die Datenbank besteht aus einem Table für die Projects und einem für die Tasks. Der TaskTable beinhaltet eine projectID mit welcher die zugehörigkeit zu den jeweiligen Projects bestimmt werden kann.
Im Folder queue befindet sich der EventHandler der für die EventQueue und das Logging.
Im Folder authentication ist das für die Authentifizierung notwendige Modul zu finden. Ist ein User authentifiziert so erhält er einen JWT Token mit welchem er die übrigen Requests stellen kann.
Zuständig dafür ist der AuthGuard der duch @AuthGuard im ProjectController die Requests schützt.



