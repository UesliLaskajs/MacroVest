import { memo, useState } from "react";

// eslint-disable-next-line react/prop-types
const FormSubmit = memo(function FormSubmit({ onSubmit }) {
  const [count, setCount] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderForm = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(orderForm),
      count,
    };
    onSubmit(orderDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <b>
          Note: <code>FormSubmit</code> is artificially slowed down!
        </b>
      </p>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount((prevCount) => Math.max(1, prevCount - 1))}>
          –
        </button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>
          +
        </button>
      </label>
      <label>
        Street:
        <input name="street" required />
      </label>
      <label>
        City:
        <input name="city" required />
      </label>
      <label>
        Postal code:
        <input name="zipCode" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

export default FormSubmit;
