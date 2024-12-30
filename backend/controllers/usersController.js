// const checkUser = async (req, res) => {
//     const { email } = req.body;
//     console.log("Checking email:", email); // Log email check

//     if (!email) {
//       return res.status(400).json({ success: false, msg: "Email is required" });
//     }

//     // Simulate email validation
//     if (email === "test@example.com") {
//       res.json({ success: true });
//     } else {
//       res.json({ success: false, msg: "Email not found" });
//     }
//   };
