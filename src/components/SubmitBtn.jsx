import { useFormStatus } from "react-dom";
import { BsFlower1 } from "react-icons/bs";

const SubmitBtn = ({ children, className }) => {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button disabled={pending} type="submit" className={className}>
      {children}
      {pending && <BsFlower1></BsFlower1>}
    </button>
  );
};

export default SubmitBtn;
