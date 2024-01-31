import express, { response } from "express"
import bodyParser from "body-parser"

const app = express();

const port = process.env.PORT || 3000;
const API_URL = "https://pokeapi.co/api/v2"
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/search-pokemon", (req, res) => {
    res.redirect("/");
})

app.post("/search-pokemon", (req, res) => {

    fetchData(req.body.name.toLowerCase(), (info, error) => {
        if(error){
            return res.render("index.ejs", {
                error: "Has escrito bien el pokemon?"
            })
        }
        res.render("index.ejs", {
            image: info.sprites?.front_default,
            name: info.name,
            type: info.types[0]?.type.name,
            type2: info.types[1]?.type.name,
        }) 
    })
});

function fetchData(endpoint, callback) {
    fetch(`${API_URL}/pokemon/${endpoint}`)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {
            callback(null, "error");
        });

}

app.listen(port,() => {
    console.log("Server runnin' on port: " + port);
});
