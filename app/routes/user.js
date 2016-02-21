var ASQ = require('asynquence');

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var morgan = require('morgan');

var apiHelper = require('../helpers/api');

var User = require('../models/user');

router.use(morgan('combined'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


function checkForDuplicateEmails(done, email){
    console.log('Checking ' + email + ' doesnt exist already\n');
    User.findOne({ email: email }, function (err, result) {
        
        if(err){
            response.status(501).json(err);
        } else {
            if(result){
                console.log('User ' + result.nickname + ' already exists');
                done('User ' + result.nickname + ' already exists');
            }
        }
        
        done();
    });
}

function updateOrSaveUser(done, userAlreadyExists, request, response, user, options){
    if(!userAlreadyExists){
        if(options && options.update){
            user.nickname = request.body.nickname || user.nickname;
            user.email = request.body.email || user.email;
        }
        
        user.save(function(err){
            if(err){
                response.status(501).json(err);
            } else {
                response.status(201).json({message: 'User ' + user.nickname + ' was created'});
            }
        });

        
    } else {
        response.status(501).json(userAlreadyExists);
    }
}


router.route('/')
    .get(function(request, response){
        User.find(function(err, users){
            if(err){
                response.status(404).json(err);
            } else {
                response.send(users);
            }
        });
    })
    .post(function(request, response){
        var user = new User();
        
        user.nickname = request.body.nickname || "nemo";
        user.email = request.body.email;
        
        if(user.nickname && user.email){

            ASQ(function(done){
                checkForDuplicateEmails(done, user.email)
            }).then(function(done, userAlreadyExists){
                updateOrSaveUser(done, userAlreadyExists, request, response, user, { update: false });
            });
        }
    });

router.route('/:user_id')
    .get(function(request, response){
        User.findById(request.params.user_id, function(err, result){
            if(err){
                response.status(501).json(err);
            } else {
                response.send(result);
            }
        });
    })
    .put(function(request, response){
        User.findById(request.params.user_id, function(err, result){
            if(err){
                response.status(501).json(err);
            } else {
                if(result){
                    ASQ(function(done){
                        checkForDuplicateEmails(done, request.body.email);
                    }).then(function(done, userAlreadyExists){
                        updateOrSaveUser(done, userAlreadyExists, request, response, result, { update: true });
                    });
                }
            }
        });
    })
    .delete(function(request, response){
        apiHelper.deleteIt(User, request.params.user_id, request, response);
    });
                
                              
                                                      


module.exports = router;
