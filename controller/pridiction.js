const Pridiction = require("../models/pridiction");
const resp = require("../helpers/apiResponse");

exports.addPridiction  = async (req, res) => {
  const { title,rashiName,pre_type,desc,status,date} = req.body;

  const newPridiction = new Pridiction({
    title:title,
    rashiName:rashiName,
    pre_type:pre_type,
    desc:desc,
    status:status,
    date:date
   });
  
   newPridiction
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.getPridiction= async (req, res) => {
    await Pridiction.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getonePridiction = async (req, res) => {
    await Pridiction.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editPridiction = async (req, res) => {
    await Pridiction.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltPridiction = async (req, res) => {
    await Pridiction.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  