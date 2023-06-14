// All todos gets, posts, Deletes goes here
const route = require('express').Router();// All user gets posts Deletes goes here
const Todo = require('../models/todo')
const User = require('../models/user')
require('../db')

route.get('/', async(req, res)=>{
    const foundUser = await User.find({username: req.user.username})
    if(foundUser){
        let now = new Date()
        const active = await Todo.find({user:foundUser, deadline: { $gt: now }, startDate: { $lt: now }}).sort({ done: 1 }).sort({startDate: 1})
        const future = await Todo.find({user:foundUser, deadline: { $gt: now }, startDate: { $gt: now }}).sort({ done: 1 }).sort({deadline: -1})
        const overdue = await Todo.find({user:foundUser, deadline: { $lt: now }, done: false}).sort({ done: 1 }).sort({deadline: -1})
        const done = await Todo.find({user:foundUser, deadline: { $lt: now }, done: true}).sort({ done: 1 }).sort({startDate: -1})
        if(
            active.length == 0 && 
            overdue.length == 0 &&
            future.length == 0
            ){
            res.render('todos/index', {errorMessage: "No todos", user:req.user})
        }else{
            res.render('todos/index', {active: active, overdue:overdue, future:future, done:done, user:req.user})
        }
    }else{
        // Finding user in db error
        res.render('todos/index', {errorMessage:"No user found!"})
    }
})

// Create new todo form
route.get('/new', async(req, res)=>{
    res.render('todos/new', {user:req.user})
})



// Edit todo form
route.get('/:id/edit', async(req, res)=>{
    console.log(req.params.id);
    try {
        const todo = await Todo.findById(req.params.id)
        res.render('todos/edit', {user:req.user, todo: todo})
    } catch (error) {
        res.redirect('/todos')
    }
})

// Save edited todo
route.put('/:id/', async(req, res)=>{
    let todo
    try {
        todo = Todo.findById(req.params.id)
        await todo.save()
        res.redirect('/')
    } catch (error) {
        if(todo == null){
            console.log(error);
            res.redirect(`/todos/`)
        } else{
            console.log(error);
            res.render('todos/edit', {
                todo: todo,
                errorMessage: "Erro updateing todo"
            })
        }
    }
})

// Create new todo post req
route.post('/new', async (req, res)=>{
    // Validering
    const foundUser = await User.findOne({username: req.user.username})
    console.log(req.body);
    if(req.body.startDate == ''){
       console.log("startDate is null");
       req.body.startDate = new Date()
    }
    if(foundUser){
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            deadline: req.body.deadline,
            done: req.body.done,
            user: foundUser
        })
        if(req.body.startDate > req.body.deadline){
            res.render('todos/new', {errorMessage: "Start date shoulnt be later than deadline", todo, user:req.user})
        }else{
            const newTodo = await todo.save()
            if(newTodo){
                res.redirect('/todos')
            }else{
                res.render('todos/new', {errorMessage: newTodo, todo, user:req.user})
            }
        }
    }else{
        res.redirect('/')
    }
})
// Update todo status to done
route.post('/todo', async (req, res)=>{
    const foundUser = await User.find({username: req.user.username})
    const query = {_id:req.body.id}
    const foundTodo = await Todo.findOne(query)
    if(foundTodo.done == false){
        await Todo.findOneAndUpdate(query, { $set: { done: true }})
        res.redirect("/todos")
    }else{
        if(await Todo.findOneAndUpdate(query, { $set: { done: false }})){
            res.redirect("/todos") 
        }
    }
})
module.exports = route