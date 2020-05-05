const express = require('express');

const app = express();

app.use(express.json());

const projects = [];

function verificaId(req, res, next){
    const { id } = req.params;
    const projectExist = projects.find(p => p.id == id);

    if(!projectExist){
        return res.status(400).json({ error: 'Projeto não existe'});
    }

    return next();
}

function contaReq(req, res, next){
    console.count("Total requisições");

    return next();
}

app.use(contaReq);

app.post('/projects', (req, res) => {
    const { id , title } = req.body;
    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);

    return res.json(project);
});

app.get('/projects', (req, res) => {
    return res.json(projects);
});

app.get('/projects/:id', verificaId, (req, res) => {
    const projectReturn = projects[req.params.id];
    return res.json(projectReturn);
});

app.put('/projects/:id', verificaId, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return(res.json(project));
});

app.delete('/projects/:id', verificaId, (req, res) => {
    const { id } = req.params;

    const projectDelete = projects.find(p => p.id == id);

    projects.splice(projectDelete, 1);

    return res.send();

});

app.post('/projects/:id/tasks', verificaId, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    console.log(title);


    const projectTasks = projects.find(p => p.id == id);
    projectTasks.tasks.push(title);

    return(res.json(projectTasks));

});


app.listen(3000);