const Event = require('../models/event');


module.exports = {
    showEvents: showEvents,
    singleEvent: singleEvent,
    createEvent: createEvent,
    saveEvent: saveEvent,
    editEvent: editEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
    seedEvent: seedEvent
}

/*
Create Event
*/ 
function createEvent(req, res){
    res.render('pages/create');
}


/*
Save Event
*/ 
function saveEvent(req, res){
    const newEvent = new Event(req.body);
    
    newEvent.save(function(err){
        if(err){
            console.log("Erro " + err);
        }else{
            res.redirect('/events');
        }
    })
}


/*
Edit Event
*/ 
function editEvent(req, res){
    Event.findOne({_id: req.params.id}).exec(function(err, event){
        if(err){
            console.log("Erro " + err);
        }else{
            res.render('pages/edit', {event: event});
        }
    })
}

/*
Update Event
*/ 
function updateEvent(req, res){
    Event.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        },
        {
            new: true
        },
        function(err, event){
            if(err){
                console.log('Error '+ err);
                res.render('pages/edit', {event: req.body});
            }else{
                res.redirect('/events/'+ event._id);
            }
        }

    );
}



/*
Delete Event
*/ 
function deleteEvent(req, res){
    Event.remove({_id: req.params.id}, function(err){
        if(err){
            console.log('Error '+ err);
        }else{
            res.redirect("/events");
        }
    })
}

/*
Show all events
*/ 
function showEvents(req, res){

    Event.find({}).exec(function(err, events){
        if(err){
            console.log('Error: '+ err);
        }else{
            res.render('pages/events', {events: events});
        }
    })
   
}

/*
Show Single Event
*/ 
function singleEvent(req, res){
    const event = {name: 'busketball' , slug: 'busketball', description: 'This is a sample description fro busketball'};

    Event.findOne({_id: req.params.id}).exec(function(err, event){
        if(err){
            console.log('Error: '+ err);
        }else{
            res.render('pages/single', {event: event});
        }
    })

}


/*
Seed event Database
*/ 
function seedEvent(req, res){
    const events = [
        {name: 'badminton' ,description: 'This is a sample description fro badminton'},
        {name: 'cricket', description: 'This is a sample description fro cricket'},
        {name: 'football', description: 'This is a sample description fro football'},
    ];

    Event.remove({}, () =>{
        for(event of events){
            var newEvent = new Event(event);
            newEvent.save();
         }
    })



    res.send('databas eseeded!!');

}


