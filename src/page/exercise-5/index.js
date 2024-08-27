import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Exercise5 = () => {
  // Schema validation với Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z0-9\sÀ-ỹ]+$/, "Chỉ bao gồm chữ, số và khoảng trắng")
      .max(100, "Tối đa 100 ký tự")
      .required("Bắt buộc"),
    age: Yup.number()
      .min(0, "Tuổi phải lớn hơn hoặc bằng 0")
      .max(100, "Tuổi phải nhỏ hơn hoặc bằng 100")
      .required("Bắt buộc"),
    startTime: Yup.date()
      .nullable()
      .required("Bắt buộc")
      .min(new Date(), "Ngày bắt đầu phải lớn hơn ngày hiện tại"),
    endTime: Yup.date()
      .nullable()
      .required("Bắt buộc")
      .min(new Date(), "Ngày kết thúc phải lớn hơn ngày hiện tại")
      .test(
        "check-endTime",
        "Ngày kết thúc phải lớn hơn ngày bắt đầu",
        function (value) {
          const { startTime } = this.parent;
          return !startTime || !value || new Date(value) > new Date(startTime);
        }
      ),
  });

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-8 col-md-5 p-5 bg-dark-subtle rounded">
        <Formik
          initialValues={{
            name: "",
            age: "",
            startTime: "",
            endTime: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="row mb-4">
                <label htmlFor="name" className="col-4">
                  Tên
                </label>
                <div className="col-8">
                  <Field type="text" name="name" className="w-100" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <label htmlFor="name" className="col-4">
                  Tuổi
                </label>
                <div className="col-8">
                  <Field type="number" name="age" className="w-100" />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="row mb-4">
                <label htmlFor="name" className="col-4">
                  Ngày Bắt Đầu
                </label>
                <div className="col-8">
                  <Field type="date" name="startTime" />
                  <ErrorMessage
                    name="startTime"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="row mb-4">
                <label htmlFor="name" className="col-4">
                  Ngày Kết Thúc
                </label>
                <div className="col-8">
                  <Field type="date" name="endTime" />
                  <ErrorMessage
                    name="endTime"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSubmitting || !isValid}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Exercise5;
