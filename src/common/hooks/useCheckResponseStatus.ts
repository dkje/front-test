import React, { useEffect, useState } from "react";

const useCheckResponseStatus = (activeStatus: { status?: number }[]) => {
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);

  useEffect(() => {
    let isRequestErrorContains = false;
    let isServerErrorContains = false;
    activeStatus.forEach((el) => {
      if (!el.status) return;
      if (el.status >= 500 && el.status < 600) {
        isServerErrorContains = true;
      }
      if (el.status >= 400 && el.status < 500) {
        isRequestErrorContains = true;
      }
      setIsServerError(isServerErrorContains);
      setIsRequestError(isRequestErrorContains);
    });
  }, [activeStatus]);

  return { isServerError, isRequestError };
};

export default useCheckResponseStatus;
