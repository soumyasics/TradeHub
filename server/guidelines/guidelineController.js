const {GuidelineModel} = require("./guidelinesSchema");
const createGuideline = async (req, res) => {
  try {
    const { title, content } = req.body;

    const guideline = new GuidelineModel({
      title,
      content,
    });
    await guideline.save();
    return res.json({
      status: 200,
      msg: "Guideline created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Guideline not created",
      error: error.message,
    });
  }
};

const viewGuideline = async (req, res) => {
  try {
    const guideline = await GuidelineModel.find();
    return res.json({
      status: 200,
      data: guideline[0],
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Guideline not found",
      error: error.message,
    });
  }
};

const editGuidelines = async (req, res) => {
  try {
    const { title, content } = req.body;
    let updateValue = {};
    if (title) {
      updateValue.title = title;
    }
    if (content) {
      updateValue.content = content;
    }
    const guideline = await GuidelineModel.find();

    if (guideline.length === 0) {
      return res.status(404).json({ msg: "Guideline not found" });
    }

    const newGuideline = await GuidelineModel.findByIdAndUpdate(
      guideline[0]._id,
      updateValue
    );
    return res.json({
      status: 200,
      data: newGuideline,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Guideline not found",
      error: error.message,
    });
  }
};

module.exports = {
  createGuideline,
  viewGuideline,
  editGuidelines,
};
