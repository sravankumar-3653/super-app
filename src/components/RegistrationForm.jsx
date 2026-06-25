import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Field is required";
    if (!formData.username.trim()) newErrors.username = "Field is required";

    if (!formData.email.trim()) {
      newErrors.email = "Field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Field is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile";
    }

    if (!formData.agreed) {
      newErrors.agreed = "Check this box if you want to proceed";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setUser({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      mobile: formData.mobile,
    });

    navigate("/categories");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "470px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color: "#72DB73",
          textAlign: "center",
          marginBottom: "6px",
          fontSize: "50px",
          fontWeight: "700",
        }}
      >
        Super app
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#ffffff",
          marginBottom: "22px",
          fontSize: "18px",
          fontWeight: "400",
        }}
      >
        Create your new account
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.name && <span style={errorStyle}>{errors.name}</span>}

        <input
          type="text"
          name="username"
          placeholder="UserName"
          value={formData.username}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.username && <span style={errorStyle}>{errors.username}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.email && <span style={errorStyle}>{errors.email}</span>}

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.mobile && <span style={errorStyle}>{errors.mobile}</span>}

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#7C7C7C",
            fontSize: "14px",
            marginTop: "2px",
            lineHeight: "1.4",
          }}
        >
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
            style={{
              width: "16px",
              height: "16px",
              accentColor: "#72DB73",
              flexShrink: 0,
            }}
          />
          Share my registration data with Superapp
        </label>

        {errors.agreed && <span style={errorStyle}>{errors.agreed}</span>}

        <button
          type="submit"
          style={{
            marginTop: "8px",
            background: "#72DB73",
            color: "#ffffff",
            border: "none",
            borderRadius: "28px",
            padding: "13px",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          SIGN UP
        </button>

        <p
          style={{
            color: "#7C7C7C",
            fontSize: "12px",
            marginTop: "8px",
            lineHeight: "18px",
          }}
        >
          By clicking on Sign Up, you agree to Superapp Terms and Conditions of
          Use.
        </p>

        <p
          style={{
            color: "#7C7C7C",
            fontSize: "12px",
            lineHeight: "18px",
          }}
        >
          To learn more about how Superapp collects, uses, shares and protects
          your personal data please read Superapp Privacy Policy.
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  height: "50px",
  padding: "0 16px",
  background: "#292929",
  border: "none",
  color: "#ffffff",
  borderRadius: "4px",
  fontSize: "16px",
  boxSizing: "border-box",
};

const errorStyle = {
  color: "#ff4d4f",
  fontSize: "11px",
  marginTop: "-5px",
};

export default RegistrationForm;