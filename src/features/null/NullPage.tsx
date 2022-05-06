import { AufContainer } from "features/auf_container/AufContainer";

import "styles/Nullpage.scss";

export const NullPage = () => {
  return (
    <AufContainer>
      <div className="nullpage">
        <h1 className="nullpage__title">404 Not Found</h1>
      </div>
    </AufContainer>
  );
};
