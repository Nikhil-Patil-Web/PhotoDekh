exports.uploadImages = async (req, res) => {
  try {
    res.json({ message: 'You are in the uploads controller' })
  } catch (error) {
    return res.status(500).json({ message: error?.message })
  }
}
