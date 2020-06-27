const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getWeather = require('./utils/weather-data');

const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

const port = process.env.PORT || 3000;
const app = express();
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Manish Kumar Giri"
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Us",
        name:"Manish Kumar Giri"
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        helpText:"help is not provided here!",
        name:"Manish Kumar Giri"
    })
});

app.get('/weather',(req,res)=>{
    if(req.query.address){
        getWeather(req.query.address,(error,result)=>{
            if(error)
            {
                res.send({
                    error
                });
            }
            else
            {
                res.send({
                   address:req.query.address,
                   forecast:result
                });
            }
        });
    }
    else
    {
        res.send({
            error:'address query is missing'
        });
    }
    
});

app.get('/help/*',(req,res) =>{
    res.render('404page',{
        title:'404 Not Found',
        name:'Manish Kumar Giri',
        error:'Help article not found'
    })
});

app.get('*',(req,res) =>{
    res.render('404page',{
        title:'404 Not Found',
        name:'Manish Kumar Giri',
        error:'page not found'
    })
});

app.listen(port,()=>{
    console.log("Server up in port 3000");
})
