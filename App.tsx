import React, { useState, useCallback } from 'react';
import { STYLES, CONCEPTS } from './constants';
import type { Style, Concept } from './types';
import { generateTeacherPortrait } from './services/geminiService';

const Header: React.FC = () => (
  <header className="text-center p-6 bg-white shadow-md rounded-b-xl">
    <h1 className="text-4xl md:text-5xl font-black gradient-text">
      TẠO HÌNH ẢNH AI PRO
    </h1>
    <p className="text-lg font-bold text-red-700">BY HÀ DUY TƯ</p>
    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
      Hỗ trợ giáo viên tạo ảnh AI chân dung chuyên nghiệp theo phong cách cá nhân để sử dụng cho truyền thông, giới thiệu bản thân, hồ sơ giảng dạy hoặc quảng bá khóa học.
    </p>
    <a href="https://zalo.me/g/yuhzjn816" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300">
      Tham gia học AI MIỄN PHÍ cùng HÀ DUY TƯ
    </a>
  </header>
);

interface ImageUploaderProps {
  uploadedImage: File | null;
  setUploadedImage: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadedImage, setUploadedImage, previewUrl, setPreviewUrl }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-red-700 mb-4">1. Tải ảnh chân dung</h2>
      <div className="border-2 border-dashed border-yellow-400 rounded-lg p-6 text-center">
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
        <label htmlFor="imageUpload" className="cursor-pointer bg-yellow-400 text-red-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
          Chọn ảnh từ máy tính
        </label>
        {previewUrl && (
          <div className="mt-4">
            <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-md" />
          </div>
        )}
      </div>
    </div>
  );
};

interface StyleSelectorProps {
  selectedStyle: string | null;
  onSelectStyle: (styleId: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-red-700 mb-4">2. Chọn phong cách</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STYLES.map((style: Style) => (
                <button
                    key={style.id}
                    onClick={() => onSelectStyle(style.id)}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ${
                        selectedStyle === style.id
                            ? 'bg-red-600 text-white border-red-700 shadow-xl scale-105'
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50'
                    }`}
                >
                    <div className="mb-2">{style.icon}</div>
                    <span className="font-semibold text-sm text-center">{style.name}</span>
                </button>
            ))}
        </div>
    </div>
);

interface ConceptSelectorProps {
  selectedConcepts: string[];
  onToggleConcept: (conceptId: string) => void;
  customConcept: string;
  onCustomConceptChange: (value: string) => void;
}

const ConceptSelector: React.FC<ConceptSelectorProps> = ({ selectedConcepts, onToggleConcept, customConcept, onCustomConceptChange }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-red-700 mb-4">3. Chọn concept yêu thích</h2>
        <div className="space-y-3">
            {CONCEPTS.map((concept: Concept) => (
                <label key={concept.id} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                    <input
                        type="checkbox"
                        checked={selectedConcepts.includes(concept.id)}
                        onChange={() => onToggleConcept(concept.id)}
                        className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-3 text-gray-800 font-medium">{concept.name}</span>
                </label>
            ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
            <label htmlFor="customConcept" className="block text-gray-800 font-medium mb-2">Hoặc tự điền concept của bạn:</label>
            <textarea
                id="customConcept"
                value={customConcept}
                onChange={(e) => onCustomConceptChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                placeholder="Ví dụ: Dạy học trên đỉnh núi, trong một khu vườn..."
                rows={3}
            />
        </div>
    </div>
);


const ResultDisplay: React.FC<{ generatedImage: string | null; isLoading: boolean; error: string | null; }> = ({ generatedImage, isLoading, error }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg min-h-[300px] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4 self-start">Kết quả</h2>
        <div className="w-full flex-grow flex justify-center items-center">
        {isLoading && (
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto"></div>
                <p className="mt-4 font-semibold text-yellow-600">Đang tạo ảnh 8K siêu thực... Vui lòng chờ trong giây lát!</p>
            </div>
        )}
        {error && <p className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>}
        {generatedImage && (
            <div className="text-center w-full">
                <a 
                    href={generatedImage} 
                    download="TaoHinhAnhAIPro-by-HaDuyTu.png" 
                    className="relative group inline-block shadow-2xl rounded-lg"
                    aria-label="Tải ảnh về"
                >
                    <img 
                        src={generatedImage} 
                        alt="Generated Portrait" 
                        className="max-w-full max-h-[500px] rounded-lg mx-auto block animate-zoom-in" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </div>
                </a>
            </div>
        )}
        {!isLoading && !error && !generatedImage && (
            <div className="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2">Ảnh của bạn sẽ xuất hiện ở đây</p>
            </div>
        )}
        </div>
    </div>
);

const Footer: React.FC = () => (
    <footer className="text-center p-6 mt-8 bg-white shadow-inner rounded-t-xl">
        <p className="font-bold text-red-700">Liên hệ hỗ trợ kỹ thuật: <a href="tel:0981854040" className="text-yellow-600 hover:underline">0981 85 4040</a></p>
        <p className="mt-2 text-gray-600">&copy; 2024 - Phát triển bởi Hà Duy Tư AI</p>
    </footer>
);


export default function App() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [customConcept, setCustomConcept] = useState<string>('');
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleConcept = useCallback((conceptId: string) => {
    setSelectedConcepts(prev => 
      prev.includes(conceptId) 
        ? prev.filter(c => c !== conceptId) 
        : [...prev, conceptId]
    );
  }, []);

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle || (selectedConcepts.length === 0 && customConcept.trim() === '')) {
      setError("Vui lòng tải ảnh lên, chọn 1 phong cách và chọn hoặc nhập ít nhất 1 concept.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
        const styleName = STYLES.find(s => s.id === selectedStyle)?.name || selectedStyle;
        const conceptNames = selectedConcepts.map(id => CONCEPTS.find(c => c.id === id)?.name || id);
        
        if (customConcept.trim() !== '') {
          conceptNames.push(customConcept.trim());
        }
        
        const result = await generateTeacherPortrait(uploadedImage, styleName, conceptNames);
        setGeneratedImage(result);
    } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
        setIsLoading(false);
    }
  };

  const isButtonDisabled = !uploadedImage || !selectedStyle || (selectedConcepts.length === 0 && customConcept.trim() === '') || isLoading;

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ImageUploader 
              uploadedImage={uploadedImage} 
              setUploadedImage={setUploadedImage} 
              previewUrl={previewUrl} 
              setPreviewUrl={setPreviewUrl} 
            />
            <StyleSelector selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} />
            <ConceptSelector 
              selectedConcepts={selectedConcepts} 
              onToggleConcept={handleToggleConcept}
              customConcept={customConcept}
              onCustomConceptChange={setCustomConcept}
            />
          </div>
          <div className="lg:sticky top-8 self-start">
             <ResultDisplay generatedImage={generatedImage} isLoading={isLoading} error={error} />
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={handleGenerate}
            disabled={isButtonDisabled}
            className={`px-16 py-5 text-2xl font-black text-white rounded-full transition-all duration-300 shadow-2xl transform hover:scale-105 ${
              isButtonDisabled 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600'
            }`}
          >
            {isLoading ? 'Đang Xử Lý...' : 'Tạo Ảnh Ngay'}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}