'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import type { DocumentWithAnalysis, ChatMessage } from '@/types/database';

// Risk badge colors
const riskColors = {
  high: 'text-[#ff1e00]',
  medium: 'text-[#ff6200]',
  low: 'text-[#00b550]',
};

const riskLabels = {
  high: '높음',
  medium: '중간',
  low: '낮음',
};

const riskBadgeColors = {
  high: 'bg-[#ff1e00]',
  medium: 'bg-[#ff6200]',
  low: 'bg-[#00b550]',
};

interface AnalysisResult {
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  summary: string;
  riskItems: Array<{
    title: string;
    description: string;
    recommendation: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  recommendations: string[];
}

export default function AnalysisPage() {
  const [activeSubTab, setActiveSubTab] = useState<'ai' | 'recent'>('ai');
  const [documents, setDocuments] = useState<DocumentWithAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 업로드 상태
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'completed' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 채팅 상태
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);
  const [currentDocumentName, setCurrentDocumentName] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadDocuments();
    }
  }, [user]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  async function loadDocuments() {
    try {
      const res = await api.getDocuments(1, 20);
      setDocuments(res.data || []);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('지원하지 않는 파일 형식입니다. PDF, DOC, DOCX, TXT 파일만 업로드 가능합니다.');
      setUploadStatus('error');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage('파일 크기가 50MB를 초과합니다.');
      setUploadStatus('error');
      return;
    }

    try {
      setUploadStatus('uploading');
      setUploadProgress('문서 업로드 중...');
      setErrorMessage('');
      setChatMessages([]);

      const uploadRes = await api.uploadDocument(file);
      const docId = uploadRes.document.id;

      setUploadStatus('analyzing');
      setUploadProgress('AI가 문서를 분석 중...');

      const analyzeRes = await api.analyzeDocument(docId);
      
      setAnalysisResult(analyzeRes.analysis as AnalysisResult);
      setCurrentDocumentId(docId);
      setCurrentDocumentName(file.name);
      setUploadStatus('completed');
      setUploadProgress('분석 완료!');
      loadDocuments();
    } catch (error) {
      console.error('Upload/Analysis error:', error);
      setErrorMessage(error instanceof Error ? error.message : '문서 처리 중 오류가 발생했습니다.');
      setUploadStatus('error');
    }
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setUploadProgress('');
    setAnalysisResult(null);
    setErrorMessage('');
    setCurrentDocumentId(null);
    setCurrentDocumentName('');
    setChatMessages([]);
    setChatInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const loadDocumentChat = async (docId: string, docName: string, analysis?: AnalysisResult) => {
    setCurrentDocumentId(docId);
    setCurrentDocumentName(docName);
    setAnalysisResult(analysis || null);
    setUploadStatus('completed');
    setActiveSubTab('ai');
    
    try {
      const res = await api.getChatMessages(docId);
      const formattedMessages = res.messages.map((m: ChatMessage & { created_at?: string }) => ({
        ...m,
        createdAt: m.createdAt ?? m.created_at ?? new Date().toISOString(),
      }));
      setChatMessages(formattedMessages);
    } catch (error) {
      console.error('Failed to load chat:', error);
      setChatMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !currentDocumentId || isSending) return;

    const userMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: chatInput.trim(),
      createdAt: new Date().toISOString(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsSending(true);

    try {
      const res = await api.sendChatMessage(currentDocumentId, userMessage.content);
      setChatMessages(prev => [...prev, res.message]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setChatMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: '메시지 전송에 실패했습니다. 다시 시도해주세요.',
        createdAt: new Date().toISOString(),
      }]);
    } finally {
      setIsSending(false);
    }
  };

  const documentList = documents.map(doc => ({
    id: doc.id,
    name: doc.file_name,
    date: new Date(doc.created_at).toLocaleDateString('ko-KR'),
    time: new Date(doc.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    size: `${(doc.file_size / (1024 * 1024)).toFixed(1)}MB`,
    items: doc.analyses?.[0]?.risk_items?.length ?? 0,
    risk: (doc.analyses?.[0]?.risk_level || 'low') as 'low' | 'medium' | 'high',
    status: doc.status as 'uploading' | 'parsing' | 'analyzing' | 'completed' | 'failed',
    analysis: doc.analyses?.[0] ? {
      riskLevel: doc.analyses[0].risk_level as 'low' | 'medium' | 'high',
      riskScore: doc.analyses[0].risk_score || 0,
      summary: doc.analyses[0].summary || '',
      riskItems: (doc.analyses[0].risk_items || []) as AnalysisResult['riskItems'],
      recommendations: [],
    } : undefined,
  }));

  const riskScoreWidth = analysisResult ? `${analysisResult.riskScore}%` : '0%';
  const riskColorMap = { low: '#00b550', medium: '#ff6200', high: '#ff1e00' };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-[#737684]">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900 leading-[30px]">법률계약서 AI분석</h1>
        <p className="text-base font-semibold text-[#737684] leading-[22px]">계약서를 업로드하여 AI 분석을 즉시 시작하세요.</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveSubTab('ai')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            activeSubTab === 'ai' ? 'bg-gray-900 text-white' : 'bg-white border border-[#e1e3ea] text-gray-900'
          }`}
        >
          AI리스크 분석
        </button>
        <button
          onClick={() => setActiveSubTab('recent')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            activeSubTab === 'recent' ? 'bg-gray-900 text-white' : 'bg-white border border-[#e1e3ea] text-gray-900'
          }`}
        >
          최근 문서
        </button>
      </div>

      {activeSubTab === 'ai' ? (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-[12px] border border-[#e1e3ea] p-6 min-h-[400px]">
              {uploadStatus === 'idle' && (
                <p className="text-base text-gray-900 mb-4">
                  안녕하세요! 법률계약서 분석 AI입니다. 아래에서 문서를 업로드하면<br />
                  AI가 법적 위험 요소를 자동으로 분석해드립니다.
                </p>
              )}

              {(uploadStatus === 'uploading' || uploadStatus === 'analyzing') && (
                <div className="flex flex-col items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                  <p className="text-base font-semibold text-gray-900">{uploadProgress}</p>
                  <p className="text-sm text-[#737684] mt-2">잠시만 기다려주세요...</p>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <p className="text-red-600 font-medium">{errorMessage}</p>
                  <button onClick={resetUpload} className="mt-2 text-sm text-primary font-semibold">
                    다시 시도
                  </button>
                </div>
              )}

              {uploadStatus === 'completed' && (
                <div className="flex flex-col h-[550px]">
                  {currentDocumentName && (
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#e1e3ea]">
                      <span className="text-sm font-semibold text-gray-900">{currentDocumentName}</span>
                      <button onClick={resetUpload} className="text-xs text-primary font-semibold">
                        새 문서 분석
                      </button>
                    </div>
                  )}
                  
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {analysisResult && (
                      <div className="space-y-4">
                        <div className="bg-[#f2f3f8] rounded-lg p-4">
                          <p className="font-bold text-sm mb-2">분석 요약</p>
                          <p className="text-sm text-[#454855]">{analysisResult.summary}</p>
                        </div>
                        
                        {analysisResult.riskItems.length > 0 && (
                          <div>
                            <p className="font-bold text-sm mb-3">발견된 위험 요소 ({analysisResult.riskItems.length}개)</p>
                            <div className="space-y-3">
                              {analysisResult.riskItems.map((item, index) => (
                                <div key={index} className="border-l-4 pl-3" style={{ borderColor: riskColorMap[item.severity] }}>
                                  <p className="font-semibold text-sm">{index + 1}. {item.title}</p>
                                  <p className="text-sm text-[#454855] mt-1">{item.description}</p>
                                  <p className="text-sm text-[#737684] mt-1">권장: {item.recommendation}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {chatMessages.length === 0 && (
                          <div className="text-center py-4 border-t border-[#e1e3ea]">
                            <p className="text-sm text-primary font-semibold">궁금한 점이 있으시면 아래에서 질문해주세요!</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            msg.role === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-[#f2f3f8] text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isSending && (
                      <div className="flex justify-start">
                        <div className="bg-[#f2f3f8] rounded-lg px-4 py-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-3 border-t border-[#e1e3ea]">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      placeholder="계약서에 대해 질문해보세요..."
                      className="flex-1 border border-[#e1e3ea] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                      disabled={isSending}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isSending || !chatInput.trim()}
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                    >
                      전송
                    </button>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div
              onClick={() => uploadStatus === 'idle' && fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mt-4 border-2 border-dashed rounded-[12px] p-8 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-primary bg-blue-50' : 'border-[#e1e3ea] hover:border-primary'
              } ${uploadStatus !== 'idle' ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <p className="text-sm text-[#737684]">
                파일을 드래그하거나 <span className="text-primary font-semibold">클릭</span>하여 업로드
              </p>
              <p className="text-xs text-[#979baa] mt-1">PDF, DOCX, DOC, TXT (최대 50MB)</p>
            </div>
          </div>

          <div className="lg:w-[280px]">
            <div className="bg-white rounded-[12px] border border-[#e1e3ea] p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">분석 요약</h3>

              {analysisResult ? (
                <>
                  <div className={`rounded-lg px-3 py-1.5 inline-block mb-3 ${
                    analysisResult.riskLevel === 'high' ? 'bg-[#ffe8e5]' : 
                    analysisResult.riskLevel === 'medium' ? 'bg-[#fff3e0]' : 'bg-[#e8f5e9]'
                  }`}>
                    <span className={`text-sm font-semibold ${
                      analysisResult.riskLevel === 'high' ? 'text-[#ff1e00]' : 
                      analysisResult.riskLevel === 'medium' ? 'text-[#ff6200]' : 'text-[#00b550]'
                    }`}>
                      위험 요소: {analysisResult.riskItems.length}개
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-gray-900 mb-2">위험도 점수</h4>
                  <div className="h-2 bg-[#e1e3ea] rounded-full mb-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: riskScoreWidth, backgroundColor: riskColorMap[analysisResult.riskLevel] }}
                    />
                  </div>
                  <span 
                    className="inline-block text-white text-xs font-medium px-2 py-0.5 rounded"
                    style={{ backgroundColor: riskColorMap[analysisResult.riskLevel] }}
                  >
                    {riskLabels[analysisResult.riskLevel]} ({analysisResult.riskScore}점)
                  </span>
                </>
              ) : (
                <p className="text-sm text-[#737684]">문서를 업로드하면 분석 결과가 여기에 표시됩니다.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {documentList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#737684]">아직 분석한 문서가 없습니다.</p>
              <button 
                onClick={() => setActiveSubTab('ai')} 
                className="mt-4 text-primary font-semibold"
              >
                첫 문서 분석하기
              </button>
            </div>
          ) : (
            documentList.map((doc) => (
              <div 
                key={doc.id} 
                onClick={() => doc.status === 'completed' && loadDocumentChat(doc.id, doc.name, doc.analysis)}
                className={`bg-white rounded-[12px] border border-[#e1e3ea] p-4 flex items-center justify-between ${
                  doc.status === 'completed' ? 'cursor-pointer hover:border-primary transition-colors' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f2f3f8] rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#737684" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="#737684" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                    <p className="text-xs text-[#737684]">
                      {doc.date} · {doc.time} · {doc.size}
                      {doc.status === 'completed' && (
                        <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs ${riskBadgeColors[doc.risk]}`}>
                          위험도: {riskLabels[doc.risk]}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    doc.status === 'completed' ? 'text-primary' : 'text-[#737684]'
                  }`}>
                    {doc.status === 'uploading' && '↻ 업로드중'}
                    {doc.status === 'parsing' && '↻ 파싱중'}
                    {doc.status === 'analyzing' && '↻ 분석중'}
                    {doc.status === 'completed' && '✓ 완료'}
                    {doc.status === 'failed' && '✕ 실패'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}