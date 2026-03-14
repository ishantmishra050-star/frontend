import React from 'react';

function DataAnnexure({ data }) {
    const downloadCSV = (type) => {
        let csv = "Year," + (type === 'india' ? "India_Investors_Mn,India_GDP_Perc" : "USA_Investors_Mn,USA_GDP_Perc") + "\n";
        data.years.forEach((y, i) => {
            csv += `${y},` + (type === 'india'
                ? `${data.investors.india[i]},${data.gdp.india[i]}`
                : `${data.investors.usa[i]},${data.gdp.usa[i]}`) + "\n";
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `investment_data_${type}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <section id="data-annexure" className="annexure-section">
            <div className="annexure-header">
                <h2>7. Data Annexure (Combined Historical View)</h2>
                <div className="export-buttons">
                    <button onClick={() => downloadCSV('india')} className="btn-export blue">Export India CSV</button>
                    <button onClick={() => downloadCSV('usa')} className="btn-export dark">Export USA CSV</button>
                </div>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>India (Mn Investors)</th>
                            <th>USA (Mn Investors)</th>
                            <th>India GDP (%)</th>
                            <th>USA GDP (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.years.map((year, i) => (
                            <tr key={year}>
                                <td className="font-bold">{year}</td>
                                <td className="text-blue font-medium">{data.investors.india[i]}</td>
                                <td className="text-gray">{data.investors.usa[i]}</td>
                                <td className="text-purple">{data.gdp.india[i]}%</td>
                                <td className="text-red">{data.gdp.usa[i]}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default DataAnnexure;
