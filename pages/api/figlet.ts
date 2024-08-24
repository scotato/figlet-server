import { NextApiRequest, NextApiResponse } from "next";
import figlet from "figlet";

type ResponseData = {
  result: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { text, font } = req.body;

    if (!text) {
      res.status(400).json({ result: "", error: "Text is required" });
      return;
    }

    figlet.text(
      text,
      { font: font || "Standard" }, // Optional font parameter, defaults to 'Standard'
      (err, result) => {
        if (err) {
          res.status(500).json({ result: "", error: err.message });
          return;
        }
        res.status(200).json({ result: result || "" });
      }
    );
  } else {
    res.status(405).json({ result: "", error: "Method not allowed" });
  }
}
