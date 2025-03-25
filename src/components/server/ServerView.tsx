import ServerViewMuku from "./ServerViewMuku";
import ServerViewWibuDev from "./ServerViewWibudev";

function ServerView() {
    return (
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <ServerViewMuku />
        <ServerViewWibuDev />
      </div>
    );
  }

  export default ServerView;