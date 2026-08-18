import axios from "axios";

const API = "http://127.0.0.1:5000";


export const generateSustainabilityReport =
  async (
    fabricType,
    quantity,
    condition
  ) => {

    const response = await axios.post(
      `${API}/sustainability-report`,
      {
        fabric_type: fabricType,
        quantity: Number(quantity),
        condition: condition
      }
    );

    return response.data;
  };


export const emailReport = async ({
  pdfBase64,
  recipientEmail,
  filename = "Textile_Prediction_Report.pdf"
}) => {

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user")
    );
  } catch {
    user = null;
  }

  const response = await axios.post(
    `${API}/reports/email`,
    {
      pdf_base64: pdfBase64,
      recipient_email:
        recipientEmail || user?.email,
      user_id: user?.id || null,
      filename
    }
  );

  return response.data;
};