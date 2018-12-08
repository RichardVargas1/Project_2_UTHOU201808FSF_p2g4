// helps navigate multiple user sign-ups

module.exports = function (sequelize, DataTypes) {
	var usertwos = sequelize.define("usertwos", {
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

	usertwos.associate = function(models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		usertwos.hasMany(models.history, {
		  onDelete: "cascade"
		});

		usertwos.hasMany(models.favorites, {
			onDelete: "cascade"
		});

	};
	return usertwos;
}