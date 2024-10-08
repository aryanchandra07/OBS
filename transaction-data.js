// var excelApp = new ActiveXObject("Excel.Application");
// var workbook = excelApp.Workbooks.Open("C:\codes\Html\wt pro\1234.xls");
// var trans_no = workbook.Worksheets(1).UsedRange.rows.Count;
// // var trans_no = parent.user_trans_sheet.UsedRange.rows.Count;
// function create_tabledata() {
//     if (trans_no == 1) {
//         alert("No transactions found");
//         return;
//     }
//     var table = document.getElementById("table_data");
//     var row_count;
//     var row;
//     var cell1, cell2, cell3, cell4, cell5;
//     var sender, send_to, amount, date, time;
//     var set_id = 1;
//     for (var i = trans_no; i >= 2; i--, set_id++) {
//         //add row
//         row_count = table.rows.length;
//         row = table.insertRow(row_count);
//         if (parent.user_trans_sheet.Cells(i, 5).value == 1) {
//             row.style.backgroundColor = "#DEDEDE";
//         }
//         //get data
//         sender = document.createTextNode(parent.user_trans_sheet.Cells(i, 1).value);
//         send_to = document.createTextNode(parent.user_trans_sheet.Cells(i, 2).value);
//         amount = document.createTextNode(parent.user_trans_sheet.Cells(i, 3).value);
//         date = document.createTextNode(parent.user_trans_sheet.Cells(i, 4).value);
//         //add cells
//         cell1 = row.insertCell(0);
//         cell2 = row.insertCell(1);
//         cell3 = row.insertCell(2);
//         cell4 = row.insertCell(3);
//         //add data
//         cell1.appendChild(sender);
//         cell2.appendChild(send_to);
//         cell3.appendChild(amount);
//         cell4.appendChild(date);
//     }
// }

// function mark_read() {
//     for (var i = 2; i <= parent.trans; i++) {
//         parent.user_trans_sheet.Cells(i, 5).value = 0;
//     }
//     parent.document.getElementById("notification").innerHTML = "0";
//     parent.user_trans.Save();
// }


var excelApp = new ActiveXObject("Excel.Application");
var workbook = excelApp.Workbooks.Open("C:\\codes\\Html\\wt pro\\1234.xls");
var worksheet = workbook.Worksheets(1);
var trans_no = worksheet.UsedRange.rows.Count;

function create_tabledata() {
    if (trans_no == 1) {
        alert("No transactions found");
        return;
    }

    var table = document.getElementById("table_data");
    var row_count;
    var row;
    var cell1, cell2, cell3, cell4;
    var sender, send_to, amount, date;
    var set_id = 1;

    for (var i = trans_no; i >= 2; i--, set_id++) {
        // add row
        row_count = table.rows.length;
        row = table.insertRow(row_count);

        // Note: Check the correct column index (e.g., Cells(i, 5)) based on your Excel sheet
        if (worksheet.Cells(i, 5).value == 1) {
            row.style.backgroundColor = "#DEDEDE";
        }

        // get data
        sender = document.createTextNode(worksheet.Cells(i, 1).value);
        send_to = document.createTextNode(worksheet.Cells(i, 2).value);
        amount = document.createTextNode(worksheet.Cells(i, 3).value);
        date = document.createTextNode(worksheet.Cells(i, 4).value);

        // add cells
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);

        // add data
        cell1.appendChild(sender);
        cell2.appendChild(send_to);
        cell3.appendChild(amount);
        cell4.appendChild(date);
    }
}

function mark_read() {
    for (var i = 2; i <= trans_no; i++) {
        worksheet.Cells(i, 5).value = 0;
    }
    document.getElementById("notification").innerHTML = "0";

    // Save changes to the Excel file
    workbook.Save();
    workbook.Close();
    excelApp.Quit();
}
