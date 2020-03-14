var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var pModel = require.main.require('./models/customer-model');
var propertyModel = require.main.require('./models/property-model');
var messageModel = require.main.require('./models/message-modal');

router.get('*', function (req, res, next) {
	if (req.cookies['username'] == null) {
		res.redirect('/login');
	} else {
		next();
	}
});

router.get('/user_detail/:username', function(req, res){
	userModel.getByUname(req.params.username, function(result){
		messageModel.getByUsernameFrom(req.params.username, function(results){
			res.render('home/user_detail', {user: result, messagelist: results});
		});
	});
});

router.post('/view_property', function(req, res){
	var property = {
	    title: req.body.title,
	    location: req.body.location,
	    bed: req.body.bed,
	    bath: req.body.bath,
	    floor: req.body.floor,
	    price_from: req.body.price_from,
	    price_to: req.body.price_to,
	    purpose: req.body.purpose,
	    type: req.body.type,
	    status: req.body.status,
	    orderby: req.body.orderby
	};
	
	propertyModel.searchProperty(property, function(results){
		if(results.length >= 0){
			res.render('home/view_property', {propertylist: results});
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/', function (req, res) {
	if (req.cookies['username'] != null) {
		userModel.getByUname(req.cookies['username'], function (result) {
			res.render('home/index', {
				user: result
			});
		});
	} else {
		res.redirect('/logout');
	}
});

router.get('/alluser', function (req, res) {
	userModel.getAll(function (results) {
		if (results.length > 0) {
			res.render('home/alluser', {
				userlist: results
			});
		} else {
			res.send('invalid username/password');
		}
	});
})

//product
router.get('/allcustomer', function (req, res) {
	pModel.getAll(function (results) {
		if (results.length > 0) {
			res.render('home/allproducts', {
				customerList: results
			});
		} else {
			res.send('invalid username/password');
		}
	});
})

//product add new
router.get('/addproduct', function (req, res) {
	res.render('home/addproduct');
})

// product add post
router.post('/addproduct', function (req, res) {

	var product = {
		name: req.body.pname,
		quantity: req.body.quantity,
		price: req.body.price,

	};

	pModel.insert(product, function (status) {
		if (status) {
			res.redirect('/home/allproduct');
		} else {
			res.redirect('/home/addproduct');
		}
	});
})


// Product edit get
router.get('/editp/:id', function (req, res) {

	pModel.getById(req.params.id, function (result) {
		res.render('home/edit-pro', {
			customer: result
		});
	});
})

// product edit post
router.post('/editp/:id', function (req, res) {

	var customer = {
		username: req.body.username,
		quantity: req.body.quantity,
		phone: req.body.phone,
		name: req.body.name,
		active_posts: req.body.active_posts,
		pending_posts: req.body.pending_posts,
		sold_posts: req.body.sold_posts,
		total_posts: req.body.total_posts,
		customer_id: req.params.id

	};

	pModel.update(customer, function (status) {
		if (status) {
			res.redirect('/home/allcustomer');
		} else {
			res.redirect('/home/editp/' + req.params.id);
		}
	});
})
// product delete get
router.get('/deletep/:id', function (req, res) {

	pModel.getById(req.params.id, function (result) {
		res.render('home/delete-pro', {
			customer: result
		});
	});
})

// product delete post
router.post('/deletep/:id', function (req, res) {

	pModel.delete(req.params.id, function (status) {
		if (status) {
			res.redirect('/home/allcustomer');
		} else {
			res.redirect('/home/deletep/' + req.params.id);
		}
	});
})

// Property Route
router.get('/view_property', function (req, res) {

	propertyModel.getAllProperty(function (results) {
		if (results.length > 0) {
			res.render('home/view_property', {
				propertylist: results
			});
		} else {
			res.redirect('/home');
		}
	});
});

router.get('/view_property_detail/:property_id', function (req, res) {
	propertyModel.getByPropertyId(req.params.property_id, function (result) {
		res.render('home/view_property_detail', {
			property: result
		});
	});
});

router.get('/delete_property/:property_id', function (req, res) {
	propertyModel.getByPropertyId(req.params.property_id, function (result) {
		res.render('home/delete_property', {
			property: result
		});
	});
});

router.post('/delete_property/:property_id', function (req, res) {

	propertyModel.delete(req.params.property_id, function (status) {
		if (status) {
			res.redirect('/home/view_property');
		} else {
			res.redirect('/home/delete/' + req.params.property_id);
		}
	});
});


router.get('/edit/:id', function (req, res) {

	userModel.getById(req.params.id, function (result) {
		res.render('home/edit', {
			user: result
		});
	});
})


router.post('/edit/:id', function (req, res) {

	var user = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id
	};

	userModel.update(user, function (status) {
		if (status) {
			res.redirect('/home/alluser');
		} else {
			res.redirect('/home/edit/' + req.params.id);
		}
	});
})


router.get('/delete/:id', function (req, res) {

	userModel.getById(req.params.id, function (result) {
		res.render('home/delete', {
			user: result
		});
	});
})

router.post('/delete/:id', function (req, res) {

	userModel.delete(req.params.id, function (status) {
		if (status) {
			res.redirect('/home/alluser');
		} else {
			res.redirect('/home/delete/' + req.params.id);
		}
	});
})

router.get('/view_message', function(req, res){
	
	messageModel.getAllMessage(function(results){
		if(results.length >= 0){
			res.render('home/view_message', {messagelist: results});
		}else{
			res.redirect('/home');
		}
	});
});

router.post('/view_message', function(req, res){
	var message = {
		from: req.body.from,
		to: req. body.to,
		msg: req.body.msg,
		orderby: req.body.orderby
	};

	messageModel.searchMessage(message, function(results){
		if(results.length >= 0){
			res.render('home/view_message', {messagelist: results});
		}else{
			res.redirect('/home');
		}
	});
});

module.exports = router;