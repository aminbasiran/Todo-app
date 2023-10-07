const asyncErrorHandler = (err, req, res, next) => {

    if (err.name ==="SyntaxError"){
        console.log(err.name);
        console.log("it goes in here")
    }

    else{
        console.log(err.name,"others")
    }
}

module.exports = asyncErrorHandler