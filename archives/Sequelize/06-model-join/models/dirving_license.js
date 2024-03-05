const DrivingLicense = (sequelize, DataTypes, Model) => {
  class DrivingLicense extends Model {}

  DrivingLicense.init({
    // userId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true
    // },
    licenseId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize 
  });

  return DrivingLicense;
};

module.exports = DrivingLicense;