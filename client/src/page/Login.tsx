
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../components/css/Login.css";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import publicAxios from "../config/publicAxios";
// import swal from "sweetalert";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email chưa đúng định dạng")
        .required("Vui lòng điền đầy đủ thông tin"),

      password: Yup.string()
        .min(8, "Nhập nhiều hơn 8 kí tự")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
          "Password phải chứa ít nhất một chữ hoa, số, kí tự đặc biệt và không có khoảng trắng "
        )
        .required("Vui lòng điền đầy đủ thông tin"),
    }),

    onSubmit: async (values) => {
      try {
        let response = await publicAxios.post(
          `/api/v1/login`,values
        );
        if (response.data.user.role !== 0) {
          navigate("/admin")
        }else{
          if (response.data.user.status !== 0) {
              alert("Tài khoản của bạn đang bị khoá");
              return;
          }
          navigate("/")
        }       
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userLogin",JSON.stringify(response.data.user)) 
      } catch (error:any) {
        alert(error.response.data.message);
      }
    },
  });
  return (
    <div>
      <Header />
      <section className="container">
        <div className="container-main">
          <h3>ĐĂNG NHẬP</h3>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="content" />
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="register_error">{formik.errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="content" />
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="register_error_password">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="btn">
              ĐĂNG NHẬP
            </button>
          </form>
          <div className="forget_pass">
            <p>Quên mật khẩu?</p>
            <Link to="/register" className="link">
              Đăng kí tại đây
            </Link>
          </div>
        </div>
        <hr />
      </section>
      <Footer />
    </div>
  );
}

export default Login;
