import { PageWrapper } from "features/page-wrapper/PageWrapper";

import "styles/Nullpage.scss";

export const NullPage = () => {
  return (
    <PageWrapper>
      <div className="nullpage">
        <h1 className="nullpage__title">404 Not Found</h1>
      </div>
    </PageWrapper>
  );
};
