var ASQ = require('asynquence');

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var morgan = require('morgan');

var apiHelper = require('../helpers/api');

var Goal = require('../models/goal');
var User = require('../models/user');
var objectId = require('mongoose').Schema.Types.ObjectId();

router.use(morgan('combined'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
    .get(function(request, response){
        Goal.find(function(err, resuls){
            if(err){
                response.status(404).json(err);
            }else{
                response.send(results);
            }
        });
    })
    .post(function(request, response){
        var goal = new Goal();

        goal.title = request.body.title;
        goal.timeToAchieve = request.body.timeToAchieve;
        goal.dueDate = request.body.dueDate;

        ASQ(function(done){
            User.findById(request.params._user_id, function(err, result){
                if(err){
                    response.status(501).json(err);
                } else {
                    if(result){
                        done('The user id is correct');
                    }
                }
            });
        }).then(function(done, isUserIdCorrect){
            goal._user_id = new  objectId(request.params._user_id); // or objectId.Parse(request.params._user_id);
        }).then(function(done){
            goal.save(function(err){
                if(err){
                    response.status(501).json(err);
                } else {
                    response.send({message: "Goal was created"});
                }
            });
        });
    });

router.route('/:goal_id')
    .get(function(request, response){
        Goal.findById(request.params.goal_id, function(err, result){
            if(err){
                response.status(501).json(err);
            } else {
                response.send(result);
            }
        });
    })
    .put(function(request, response){
        Goal.findById(request.params.goal_id, function(err, result){
            if(err){
                response.status(501).json(err);
            } else {
                if(result){
                    result.title = response.params.title || result.title;
                    result.timeToAchieve = response.params.timeToAchieve || result.timeToAchieve;
                    result.dueDate = response.params.dueDate || result.dueDate;

                    result.save(function(err){
                        if(err){
                            response.status(501).json(err);
                        } else {
                            response.send({message: "The goal was updated"});
                        }
                    });
                }
            }
        });
    })
    .delete(function(request, response){
        apiHelper.deleteIt(Goal, request.params.goal_id, request, response);
    });


module.exports = router;
