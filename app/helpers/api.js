

var deleteIt = function (Model, id, request, response){
    Model.findById(id, function(err, result){
        if(err){
            response.status(501).json(err);
        } else {
            if(result){
                result.remove(function(err){
                    if(err){
                        response.status(501).json(err);
                    }else{
                        response.send({message: 'Successfully deleted'});
                    }
                });
            }
        }
    });
}


exports.deleteIt = deleteIt;