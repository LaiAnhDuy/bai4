import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllJob,
  fetchCreateJob,
  fetchDeleteJob,
  fetchUpdateChecked,
} from "./redux/slices/todoSlice.js";

function App() {
  const [job, setJob] = useState("");
  const dispatch = useDispatch();
  const listJob = useSelector((state) => state.todo.listJob);
  const isLoading = useSelector((state) => state.todo.isLoading);
  const isError = useSelector((state) => state.todo.isError);

  const inputRef = useRef();

  useEffect(() => {
    dispatch(fetchAllJob());
  }, []);

  const handleAddJob = () => {
    const input = job.trim();
    if (!input) {
      alert("Content cannot be empty!");
      return;
    }
    dispatch(fetchCreateJob({ content: job }));
    setJob("");
    inputRef.current.focus();
  };

  const handleUpdateChecked = (id, checked) => {
    dispatch(fetchUpdateChecked({ id, checked: !checked }));
  };

  const handleDeleteJob = (id) => {
    dispatch(fetchDeleteJob(id));
  };

  if(isError){
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
          <div className="col-11 col-md-6 bg-white m-auto mt-3 rounded-3">
            <div className="content">
              <p className="text-center fs-1 fw-border mt-2">To Do App</p>
              <div className="input-group mb-3 w-75 mx-auto">
                <input
                  type="text"
                  value={job}
                  ref={inputRef}
                  disabled={isLoading}
                  className="form-control bg-body-secondary"
                  placeholder="some words..."
                  onChange={(e) => setJob(e.target.value)}
                />
                <button
                  disabled={isLoading}
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleAddJob}
                >
                  +
                </button>
              </div>
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
