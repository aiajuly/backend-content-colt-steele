// 1-- keep in mind that when using passprt, it will add req.user which tells you the user details if you are logged in

// 2-- you can add to your schema model an author or owner which will refer to the user

const schemaofsomething = new mongoose.Schema({
    somethingName: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

// 3-- when a user is logged in he will have the ability to create, and since he is logged in we have his info in req.user; so when creating something we can set the author or onwer of it to req.user._id. This way you can associate every single thing you create to an owner




// 4-- so to protect your something and only allow the owner to edit or delete it( at least on the frontend); you can add an if statement to your show template that compares the something.author and req.user( remember we set req.user in locals as currentUser) and if they match add the delete, edit button, otherwise hide them


// checking if the user exist, if so them compare
// ejs code
/* <%  if( currentUser && review.author.equals(currentUser._id))  {%>
    <form action="/campgrounds/<%=campground._id%>/reviews/<%=review._id%>?_method=DELETE" method="POST">
        <button class="btn btn-sm btn-danger">Delete</button>
    </form>
    <% } %> */



// 5-- so in the previous step we hid the delete and edit button, be the user can still type /edit in the url and go to the edit page or he can even send a request through postman; meaning our routes are not protected
// to protect the routes you: before you edit or delete or send user to edit route, compare the something.owner with req.user:

router.get('/:id/edit', isLoggedIn, async (req, res) => {

    const { id } = req.params;
    const something = await Something.findById(id);
    if (!something.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/something/${id}`)};

    res.render('campgrounds/edit', { campground });
})

    
// 6-- you can move the authorization functionality into its own middlewear:

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

    