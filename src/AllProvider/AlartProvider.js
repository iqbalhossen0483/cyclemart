import { transitions, positions, Provider as AlertProvider } from "react-alert";

const AlartProvider = ({ children }) => {
  const AlertTemplate = ({ message }) => (
    <div className='alart'>
      {message}
      <i className='far fa-check-circle ml-5 text-green-500'></i>
    </div>
  );

  const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    offset: "20px",
    transition: transitions.SCALE,
  };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      {children}
    </AlertProvider>
  );
};

export default AlartProvider;
