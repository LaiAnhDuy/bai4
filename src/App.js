import { useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  fetchAllJob,
  fetchCreateJob,
  fetchDeleteJob,
  fetchUpdateChecked,
} from "./redux/slices/todoSlice.js";

function App() {
  const dispatch = useDispatch();
  const listJob = useSelector((state) => state.todo.listJob);
  const isLoading = useSelector((state) => state.todo.isLoading);
  const isError = useSelector((state) => state.todo.isError);
  const inputRef = useRef();

  useEffect(() => {
    dispatch(fetchAllJob());
  }, []);

  const handleAddJob = (data) => {
    dispatch(fetchCreateJob(data));
  };

  const handleUpdateChecked = (id, checked) => {
    dispatch(fetchUpdateChecked({ id, checked: !checked }));
  };

  const handleDeleteJob = (id) => {
    dispatch(fetchDeleteJob(id));
  };

  if (isError) {
    alert("Have Error!");
  }

  return (
    <div className="app-custom">
      {(isLoading || isError) && (
        <div className="loading">
          <img src="./loading1.gif" alt="Loading..." />
        </div>
      )}
      <div className="container ">
        <div className="row">
          <div className="col-11 col-md-6 bg-white m-auto my-3 rounded-3">
            <div className="content">
              <p className="text-center fs-1 fw-border mt-2">To Do App</p>
              <Formik
                initialValues={{ content: "" }}
                validationSchema={Yup.object({
                  content: Yup.string().required("Input cannot be empty!"),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleAddJob(values);
                  resetForm();
                  setSubmitting(false);
                  inputRef.current.focus();
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="w-75 mx-auto">
                      <div className="input-group mb-3">
                        <Field
                          name="content"
                          type="text"
                          innerRef={inputRef}
                          placeholder="some words..."
                          className="form-control bg-body-secondary"
                        />

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-secondary"
                        >
                          +
                        </button>
                      </div>
                      <ErrorMessage name="content" component="div" className="text-danger fs-6"/>
                    </div>
                  </Form>
                )}
              </Formik>
              <hr />
              <div>
                {listJob.map((item) => (
                  <div key={item.id} className="item-custom">
                    <div className="d-flex w-100 align-items-center">
                      <input
                        disabled={isLoading}
                        type="checkbox"
                        className="checkbox"
                        checked={item.checked}
                        onChange={() =>
                          handleUpdateChecked(item.id, item.checked)
                        }
                      />
                      <div className="text-center w-100 ">{item.content}</div>
                    </div>

                    <button
                      disabled={isLoading}
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleDeleteJob(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
