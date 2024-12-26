import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    gender: "female",
    email: "",
    name: "",
    age: "",
    image: null,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleGenderChange = (e) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await fetch(
        "https://mustafocoder.pythonanywhere.com/auth/update-profile/",
        {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: data,
        }
      );

      if (response.ok) {
        alert("Profile updated successfully");
        handleClose();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to update profile"}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleOpen}
        sx={{ textTransform: "capitalize", fontWeight: "bold" }}
      >
        Edit Profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col gap-6">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            className="text-center font-bold"
          >
            Update Your Profile
          </Typography>
          <TextField
            id="outlined-username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <TextField
            id="outlined-email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            id="outlined-age"
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <Button
            component="label"
            variant="outlined"
            fullWidth
            sx={{ textTransform: "capitalize" }}
          >
            Upload Profile Picture
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <div className="flex gap-4 justify-end">
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              sx={{ textTransform: "capitalize" }}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              sx={{ textTransform: "capitalize" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
