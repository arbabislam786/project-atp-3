var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from customer where customer_id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from customer where username=?";
		db.getResult(sql, [uname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from customer where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "SELECT * FROM customer";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(customer, callback){
		var sql = "insert into customer values(?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, customer.username, customer.name, customer.phone, customer.active_posts,customer.pending_posts,customer.sold_posts,customer.total_posts], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from customer where customer_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(customer, callback){
		var sql = "update customer set username=?, name=?, phone=?, active_posts=?, pending_posts=?, sold_posts=?, total_posts=? where customer_id=?";
		db.execute(sql, [customer.username, customer.name, customer.phone, customer.active_posts,customer.pending_posts,customer.sold_posts,customer.total_posts, customer.customer_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}