import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportHistoryToExcel = (history) => {
  if (!history || history.length === 0) {
    alert("No history available to export.");
    return;
  }

  // Convert data into Excel format
  const excelData = history.map((item) => ({
    ID: item.id,
    Image: item.image_name,
    Prediction: item.prediction,
    Confidence: `${item.confidence}%`,
    Date: item.created_at,
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Create workbook
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Prediction History"
  );

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(fileData, "Prediction_History.xlsx");
};