import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyApi } from "../reducers/slice";
import TableDynamic from "../components/TableDynamic";

const Currency = () => {
  const selector = useSelector((state) => ({ ...state.currency }));
  const dispatch = useDispatch();

  const [data, getData] = useState([]);

  useEffect(() => {
    dispatch(currencyApi());
  }, []);

  useEffect(() => {
    getData(selector.currency);
  }, [selector.currency]);

  if (selector.isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <div>
        <TableDynamic data={data} />
      </div>
    </>
  );
};

export default Currency;
