//baseController.js
'use strict';

module.exports = class baseController {

	  /**
    @param model Mongoose model
  	**/
	  constructor(model){
	  	this.model = model;
	  	this.getAll = this.getAll.bind(this);
	  	this.create = this.create.bind(this);
	  	this.getById = this.getById.bind(this);
	  	this.update = this.update.bind(this);
	  	this.delete = this.delete.bind(this);
	  }

		getAll (req, res, next) {
		  this.model.find( (err, records) => {
		    if (err) return next(err);
		    res.json(records);
		  });
		}

		create(req, res, next)  {
		  this.model.create(req.body, (err, post) => {
		    if (err) return next(err);
		    res.json(post);
		  });
		}

		getById(req, res, next) {
		  this.model.findById(req.params.id, (err, post) => {
		    if (err) return next(err);
		    res.json(post);
		  });
		}

		update(req, res, next) {
		  this.model.findByIdAndUpdate(req.params.id, req.body,
		    (err, post) => {
		      if (err) return next(err);
		      res.json(post);
		    });
		}

		delete(req, res, next) {
		  this.model.findByIdAndRemove(req.params.id, req.body,
		    (err, post) => {
		      if (err) return next(err);
		      res.json(post);
		    });
		}

};