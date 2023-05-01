import { useEffect, useState } from "react";

const TableDynamic = (props) => {
  const { data } = props;
  const [arr, getArr] = useState([]);

  const column = arr?.length > 0 ? Object.keys(arr[0]) : [];

  const thData = () => {
    return column.map((data) => {
      return <th key={data}>{data.replace("_", " ")}</th>;
    });
  };

  const tdData = () => {
    return arr.map((data) => {
      return (
        <tr>
          {column?.map((v) => {
            return <td>{data[v]}</td>;
          })}
        </tr>
      );
    });
  };

  useEffect(() => {
    getArr(data);
  }, [data]);

  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {/* <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th> */}
            {thData()}
          </tr>
        </thead>
        <tbody>
          {/* {arr?.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value?.currency}</td>
                <td>{value?.we_buy}</td>
                <td>{value?.exchange_rate}</td>
                <td>{value?.we_sell}</td>
              </tr>
            );
          })} */}
          {tdData()}
        </tbody>
      </table>
    </>
  );
};

export default TableDynamic;
