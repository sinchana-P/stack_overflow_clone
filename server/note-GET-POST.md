<!-- GET -->
# app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API")
})

<!-- POST -->
# router.post('/signup', signup); 
# router.post('/login', login);

<!-- MIDDLEWARE -->
# app.use('/user', userRoutes) 



<!-- Auth.jsx -->
# dispatch(signup({ name, email, password }, navigate))
# dispatch(login({ email, password }, navigate))
