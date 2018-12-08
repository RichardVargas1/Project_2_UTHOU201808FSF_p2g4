// sign-in functionality

module.exports = function (sequelize, DataTypes) {
	const users = sequelize.define("users", {
		username: {
			type: DataTypes.STRING,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		},
		password: {
			type: DataTypes.STRING,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		}
	});
	return users;
}