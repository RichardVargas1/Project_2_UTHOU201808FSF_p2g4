// search history functionality

module.exports = function (sequelize, DataTypes) {
	var history = sequelize.define("history", {
		item: {
			type: DataTypes.STRING,
      		allowNull: false,
      		validate: {
        		len: [1]
      		}
		}
	});

	history.associate = function(models) {
		// We're saying that a history should belong to an Author
		// A history can't be created without an Author due to the foreign key constraint
		history.belongsTo(models.usertwos, {
			foreignKey: {
				allowNull: false
			}
		});
};
	return history;
}