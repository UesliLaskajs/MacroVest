import { useReducer } from "react";
function Testing() {
  function reducer(state,action) {
    switch (action.type) {
      case "increment": {
        return {
          ...state,
          count: state.count + 1,
          name: state.name,
        };
      }
      case "changed_name": {
        return {
          ...state,
          count: state.count,
          name: action.changedName,
        };
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, { count: 20, name: "Uesli" });

  return (
    <>
      <h1>Count: {state.count}</h1>
      <button
        onClick={() => {
          dispatch({
            type: "increment",
          });
        }}
      >
        {" "}
        Click me
      </button>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        onChange={(e) => {
          dispatch({
            type: "changed_name",
            changedName: e.target.value,
          });
        }}
      />
    </>
  );
}

export default Testing;
