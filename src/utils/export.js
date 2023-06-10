import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import React from 'react';
import { genFileName } from './format';

export function downloadExcel({ jsonDataArr, columns }) {
    const newData = convExcelData({ jsonDataArr, columns });

    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, genFileName({ strg: "Report", ext: ".xlsx" }))
}


function convExcelData({ jsonDataArr, columns }) {
    const newArr = []
    for (let i = 0; i < jsonDataArr.length; i++) {
        const jsonObj = jsonDataArr[i];
        const newObj = {};
        for (let j = 0; j < columns.length; j++) {
            const column = columns[j];
            for (var key in jsonObj) {
                if (column.id === key)
                    newObj[column.label] = jsonObj[key]
            }
        }
        newArr.push(newObj)
    }
    return newArr
}

export function downloadPDF({ jsonDataArr, columns }) {
    const doc = new jsPDF('l')
    doc.text("Shipment Report", 5, 10)
    doc.autoTable({
        theme: "grid",
        columns: columns.map(col => ({ header: col.label, dataKey: col.id })),
        body: jsonDataArr,
        margin: {left: 5, right: 5}
    })
    doc.save(genFileName({ strg: "Report", ext: ".pdf" }))
}