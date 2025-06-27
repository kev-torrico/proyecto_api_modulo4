async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      res.statu(404).json({ message: "User not found" });
    }

    const 



  } catch (error) {}
}
