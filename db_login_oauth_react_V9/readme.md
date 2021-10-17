## Projet dashboard

### Librairies

Technologies utilisées

- [Java](https://fr.wikipedia.org/wiki/Java_\(technique\))
- [Spring boot](https://spring.io/projects/spring-boot)
- [Gradle](https://gradle.org)
- [React](https://fr.reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)

Les API utilisées
- [Deezer](https://developers.deezer.com/api)
- [OpenWeather](https://openweathermap.org/api)
- [API Gouv](https://api.gouv.fr/les-api/jours-feries)


### Compilation du programme

- Compilation avec gradle
- fichier .war

## Services

### Deezer

- Artist : Nombre de musique de l'artiste entré
- Song : Présentation de plusieurs titre de l'artiste
- Picture : Image d'une pochette d'un album de l'artiste
- Player : Lecteur jouant une musique de l'artiste

### OpenWeather

- Temperature :Température dans une ville
- Wind : Vitesse et direction du vent dans une ville
- Humidity : Taux d'humidité dans une ville
- Global : Présentation de la température, du vent et du taux d'humidité de la ville 

### API Gouv

- Présentation des jours fériés de l'année fournie par l'utilisateur

## Fonctionnement

- Réception de l'entré de l'utilisation
```
<Form >
    <Label>Année : </Label>
    <Input type="text" name = "Annee" onChange ={this.handleChange}/>
    <Button color="outline-success" onClick={this.handleSubmit}>Submit</Button>
</Form>
```
- Requête vers le back-end
```
fetch("/home/service/gouv?annee=" + annee, {method: 'GET'})
                .then(this.handleErrors)
                .then(res => res.json())
                .then(res => this.setState({ferieData : res,
                    ferieDataLoaded : true,
                    showErrorMessage : false,
                    annee : annee}))
                .catch((error) => {console.log(error);
                    this.setState({
                        showErrorMessage : true})})
```
- Redirection vers la méthode permettant la requête API
```
@RequestMapping(path = "/service/gouv")
    public String ferie(@RequestParam("annee") String annee) {
        
        return GouvService.jourFerie(annee);
    }
```
- Execution de la requête vers l'API avec la valeur en paramètre et envoi vers le front-end
```
public String jourFerie(String annee) {
        String url = "https://calendrier.api.gouv.fr/jours-feries/metropole/" + annee + ".json";

        RestTemplate restTemplate = new RestTemplate();
        String list = restTemplate.getForObject(url, String.class);


        return list;
    }
}
```
- Manipulation des données par le front-end
```
let entries = Object.entries(this.state.ferieData)
                let entriesAsText = [];
                entries.forEach(entry => {
                    entriesAsText.push( entry[1] + " : " + entry[0])
                })

                element = <ul>
                    {entriesAsText.map(entry => (
                        <li key={entry}>{entry}</li>
                    ))}
                </ul>      
```
- Affichage du widget sur la page
```
<div className="p-1 m-1 border-0 rounded bg-light">
    Widget jours férié
    {this.state.anneeGouv ? <div>{this.state.anneeGouv}</div> :
        this.ferieForm}
    {element}
    <Button color="outline-danger" onClick = {this.handleDeleteButton}>Delete</Button>
</div>
```
