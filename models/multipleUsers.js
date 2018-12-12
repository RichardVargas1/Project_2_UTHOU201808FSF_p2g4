module.exports = function (sequelize, DataTypes) {
	const multipleUsers = sequelize.define("multipleUsers", {
		// Giving the users a type name STRING
		name: DataTypes.STRING
	});

	multipleUsers.associate = function (models) {
		// Associating users with Posts
		Author.hasMany(models.Post, {
			onDelete: "cascade"
		});
	};

	return multipleUsers;
};
