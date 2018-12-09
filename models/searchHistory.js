// search history functionality

module.exports = function (sequelize, DataTypes) {
	const history = sequelize.define("history", {
		item: {
			type: DataTypes.STRING,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		}
	});

	history.associate = function(models) {
		// Any history should belong to an author
		// foreign key constraint
		history.belongsTo(models.multipleUsers, {
			foreignKey: {
				allowNull: false
			}
		});
};
	return history;
}