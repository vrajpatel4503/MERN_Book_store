// User Field Validation
export const userFieldValidation = (req, res, next) => {
  const { fullName, userName, email, password, phoneNumber } = req.body;

  if (!fullName) {
    return res.status(400).json({
      success: false,
      message: "Fullname is required",
    });
  }

  if (!userName) {
    return res.status(400).json({
      success: false,
      message: "Userame is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Phone Number is required",
    });
  }

  //   Validate Email (must contain '@' and have a proper format)
  const emailRegrex = /^\S+@\S+\.\S+$/;
  if (!emailRegrex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format. It must contain '@' and a domain",
    });
  }

  // Validate phone number (must be exactly 10 digit)
  const phoneNumberRegrex = /^\d{10}$/;
  if (!phoneNumberRegrex.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number. It must be exactly 10 digits.",
    });
  }

  next();
};

// User Address Validation
export const userAddressValidation = (req, res, next) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Address is required.",
    });
  }

  if (!address.state?.trim()) {
    return res.status(400).json({
      success: false,
      message: "State is required",
    });
  }

  if (!address.city?.trim()) {
    return res.status(400).json({
      success: false,
      message: "City is required",
    });
  }

  if (!address.street?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Street is required",
    });
  }

  if (!address.pincode?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Pincode is required",
    });
  }

  // If everything is valid, attach cleaned address
  req.address = {
    state: address.state.trim(),
    city: address.city.trim(),
    street: address.street.trim(),
    pincode: address.pincode.trim(),
  };

  next();
};
