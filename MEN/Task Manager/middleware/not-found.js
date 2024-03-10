const notFound = (req,res,next) => {
    res.status(404).send("Path not Found")
}

module.exports = notFound