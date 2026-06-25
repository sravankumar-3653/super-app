import registerBg from "../assets/register-bg.jpg";
import RegistrationForm from "../components/RegistrationForm";

const Register = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1180px",
          minHeight: "720px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "#000",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${registerBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            minHeight: "720px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "36px",
              bottom: "32px",
              color: "#ffffff",
              fontSize: "52px",
              fontWeight: "700",
              lineHeight: "1.15",
              maxWidth: "320px",
            }}
          >
            Discover new things on Superapp
          </div>
        </div>

        <div
          style={{
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 48px",
          }}
        >
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;