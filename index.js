const myExpress = require('./myExpress');
const json = require('./json');

const app = myExpress();
app.use(json);
const data =  [1, 2, 3];

app.get("/api/data", (req, res) => {
  res.end(JSON.stringify({data}));
});

app.get("/api/data/{index}", (req, res) => {
  const index = Number(req.params.index);
  res.end(JSON.stringify({data: data[index]}));
});

app.post("/api/data", (req, res) => {
    const num = req.body;
    
    data.push(num);
    return res.end(JSON.stringify({data}));
});

app.put("/api/data/{index}", (req, res) => {
  const num = req.body;
  const index = Number(req.params.index);
  
  data[index] = num;
  return res.end(JSON.stringify({data}));
});

app.delete("/api/data/{index}", (req, res) => {
  const index = Number(req.params.index);
  
  data.splice(index, 1)
  return res.end("Objeto excluido com sucesso!");
});


app.listen(3000, () => console.log("Server is running"));