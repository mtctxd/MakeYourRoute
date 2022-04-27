const AppInterfacePC = ({ children }) => {
  return (
    <div className="app__interface">
      <div className="app__interface-header">MakeYourRoute</div>
      <div className="app__interface-container">{children}</div>
    </div>
  );
};

export default AppInterfacePC;
