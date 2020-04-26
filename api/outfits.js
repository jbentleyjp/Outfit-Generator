const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

// function isValidWeather(req, res, next) {
//     if(...) return next();
//     next(new Error('Invalid Weather'));
// }

function validOutfit(outfit) {
    const hasTitle = typeof outfit.title === 'string' && outfit.title.trim() !== '';
    const hasDescription = typeof outfit.description === 'string' && outfit.description.trim() !== '';
    const hasWeather = typeof outfit.weather === 'string' && outfit.weather.trim() !== '';
    return hasTitle && hasDescription && hasWeather;
}

router.get('/', (req, res) => {

    const { weather } = req.query
    queries.getByWeather( { weather }).then(outfits => {
        const randomSelection = Math.floor(Math.random() * outfits.length)
        res.json(outfits[randomSelection]);
    })
    
});

router.get('/:id', (req, res, next) => {
    queries.getOne(req.params.id).then(outfit => {
        if(outfit) {
            res.json(outfit);
        } else {
            res.status(404);
            next();
        }
    })
});

router.post('/', (req, res, next) => {
    if(validOutfit(req.body)) {
        queries.create(req.body).then(outfits => {
            res.json(outfits[0]);
        })        
    } else {
        next(new Error('Invalid Outfit'));
    }
});

router.put('/:id', isValidId, (req, res, next) => {
    if(validOutfit(req.body)) {
        queries.update(req.params.id, req.body).then(outfits => {
            res.json(outfits[0]);
        })
    } else {
        next(new Error('Invalid Outfit'));
    }

});

router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });        
});

module.exports = router;