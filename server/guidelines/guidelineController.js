const { GuidelineModel } = require("./guidelinesSchema");
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
    const finalGuideline = guideline[guideline.length - 1];
    if (!finalGuideline) {
      return res.status(201).json({ status: 201 });
    }
    return res.json({
      status: 200,
      data: finalGuideline,
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
    const id = req.params.id;
    const { title, content } = req.body;
    const guideline = await GuidelineModel.findById(id);

    if (!guideline) {
      return res.status(404).json({ message: "Guideline not found." });
    }
    let updateValue = {};
    if (title) {
      updateValue.title = title;
    }
    if (content) {
      updateValue.content = content;
    }

    const newGuideline = await GuidelineModel.findByIdAndUpdate(
      id,
      updateValue,
      { new: true }
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
