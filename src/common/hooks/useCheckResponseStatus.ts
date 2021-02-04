import React, { useEffect, useState } from "react";

const useCheckResponseStatus = (activeStatus: { statusCode?: number }[]) => {
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);

  useEffect(() => {
    let isRequestErrorContains = false;
    let isServerErrorContains = false;
    activeStatus.forEach((el) => {
      if (!el.statusCode) return;
      if (el.statusCode >= 500 && el.statusCode < 600) {
        isServerErrorContains = true;
      }
      if (el.statusCode >= 400 && el.statusCode < 500) {
        isRequestErrorContains = true;
      }
      setIsServerError(isServerErrorContains);
      setIsRequestError(isRequestErrorContains);
    });
  }, [activeStatus]);

  return { isServerError, isRequestError };
};

export default useCheckResponseStatus;
