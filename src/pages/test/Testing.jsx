import { useState } from "react";
import FormPost from "./FormPost";
function Testing() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div>
      <label htmlFor="checkBox">
        {isDark ? "Dark" : "Light"} Mode
        <input
          type="checkbox"
          onChange={(e) => {
            setIsDark(e.target.checked);
          }}
        />
      </label>
      <FormPost
        theme={isDark ? "dark" : "light"}
        productId={777}
        reference={"iceCream"}
      />
    </div>
  );
}

export default Testing;
