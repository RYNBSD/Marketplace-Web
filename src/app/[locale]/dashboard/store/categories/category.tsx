import { forwardRef, useMemo } from "react";

export default forwardRef<any, Props>(
  function Category({}, ref) {
    const body = useMemo(() => <></>, []);

    const container = useMemo(
      () => (ref ? <div ref={ref}>{body}</div> : <div>{body}</div>),
      [body, ref]
    );

    return container;
  }
);

type Props = {};
