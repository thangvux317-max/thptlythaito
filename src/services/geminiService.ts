import { GoogleGenAI } from "@google/genai";
import { UNIVERSITY_SCORES, EXAM_INFO } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SCHOOL_CONTEXT = `
Thông tin về Trường THPT Lý Thái Tổ (Hải Phòng):
- Tên trường: Trường Trung học phổ thông Lý Thái Tổ.
- Địa chỉ: 1/271 Trần Nguyên Hãn, An Biên, Lê Chân, Hải Phòng.
- Điện thoại: 0225.650.8111 - 0982.062.799.
- Email: contact@lythaitohp.edu.vn.
- Sứ mệnh: Bồi dưỡng nhân tài, trang bị kiến thức và kỹ năng thế kỷ 21.
- Tuyển sinh lớp 10: Xét học bạ & Điểm thi khảo sát. Dành cho học sinh tốt nghiệp THCS có hạnh kiểm khá trở lên.

Dữ liệu tuyển sinh Đại học (Ground Truth):
${JSON.stringify(UNIVERSITY_SCORES, null, 2)}

Thông tin kỳ thi THPT Quốc gia 2026:
${JSON.stringify(EXAM_INFO, null, 2)}
`;

export async function chatWithAI(message: string, history: { role: string, parts: { text: string }[] }[] = []) {
  try {
    const model = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `Bạn là trợ lý ảo của trường THPT Lý Thái Tổ Hải Phòng. 
        Hãy trả lời học sinh một cách thân thiện, chuyên nghiệp, thông minh và cực kỳ chính xác dựa trên ngữ cảnh sau:
        ${SCHOOL_CONTEXT}
        
        Quy tắc:
        1. Nếu câu hỏi liên quan đến điểm chuẩn hoặc kỳ thi, ưu tiên sử dụng dữ liệu 'Ground Truth' được cung cấp ở trên.
        2. Nếu thông tin không có trong dữ liệu trên, hãy trả lời dựa trên kiến thức chung nhưng phải ghi chú là 'Thông tin tham khảo'.
        3. Luôn khuyến khích học sinh nỗ lực học tập.
        4. Sử dụng tông màu xanh dương, vàng (màu của trường) trong cách diễn đạt nếu phù hợp.`,
      }
    });

    const response = await model;
    return response.text || "Xin lỗi, mình không thể trả lời câu hỏi này lúc này.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.";
  }
}

export async function solveHomework(subject: string, problem: string) {
  try {
    const model = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "user", parts: [{ text: `Hãy giải bài tập môn ${subject} sau đây từng bước một: ${problem}` }] }
      ],
      config: {
        systemInstruction: `Bạn là một giáo viên giỏi của trường THPT Lý Thái Tổ. 
        Hãy giải bài tập một cách chi tiết, trình bày rõ ràng từng bước (step-by-step) để học sinh dễ hiểu nhất. 
        Sử dụng Markdown để trình bày công thức (sử dụng LaTeX nếu cần), các đề mục và nhấn mạnh các điểm quan trọng.
        Ngữ cảnh trường: ${SCHOOL_CONTEXT}`,
      }
    });

    const response = await model;
    return response.text || "Không tìm thấy lời giải cho bài tập này.";
  } catch (error) {
    console.error("Homework Solver Error:", error);
    return "Đã có lỗi xảy ra khi phân tích bài tập. Vui lòng thử lại sau.";
  }
}
