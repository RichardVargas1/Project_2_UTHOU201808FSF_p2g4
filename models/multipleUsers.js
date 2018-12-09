// helps navigate multiple user sign-ups

module.exports = function (sequelize, DataTypes) {
	const multipleUsers = sequelize.define("multipleUsers", {
		username: {
			type: DataTypes.STRING,
      		allowNull: false,
					unique: true,
      		validate: {
        		len: [1]
      		}
		},
		password: {
			type: DataTypes.STRING.BINARY,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		},
		email: {
			type: DataTypes.STRING,
      		allowNull: false,
					unique: true,
      		validate: {
        		len: [1]
      		}
		}
	});

	multipleUsers.associate = function(models) {
		// Associating User Profiles, with Posts. When an User is deleted, this will also delete any associated Posts
		multipleUsers.hasMany(models.history, {
		  onDelete: "cascade"
		});
	};
	return multipleUsers;
}