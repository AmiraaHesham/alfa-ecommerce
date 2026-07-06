export const CustomTable = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};