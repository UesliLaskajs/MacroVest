import axios from "axios";
import { useCallback } from "react";
import FormSubmit from "./FormSubmit";

// eslint-disable-next-line react/prop-types
const FormPost = ({ theme, productId, reference }) => {
  const handleSubmit = useCallback(
    (orderDetails) => {
      axios.post(`${productId}/tirane/${reference}`),
        {
          orderDetails,
        };
    },
    [productId, reference]
  );

  return (
    <div className={theme}>
      <FormSubmit onSumbit={handleSubmit} />
    </div>
  );
};

export default FormPost;
