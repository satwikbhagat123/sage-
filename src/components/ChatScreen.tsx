import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { INITIAL_MESSAGES, QUICK_CHIPS } from '../data/initialData';

interface ChatScreenProps {
  onNavigateToCheckin: () => void;
  onOpenSOSModal: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  onNavigateToCheckin,
  onOpenSOSModal
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      time: getCurrentTime()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Empathetic response generation matching the bilingual Sage personality
    setTimeout(() => {
      let sageResponse = "I hear you, Satwik. Take a slow, gentle breath. I am right here with you.";
      const lower = text.toLowerCase();

      if (lower.includes('suddenly') || lower.includes('clear reason') || lower.includes('anxiety')) {
        sageResponse = "Kabhi kabhi anxiety bina kisi warning ke aa jaati hai, and that is completely valid. Let us pause for a second. Would you like to do a quick 1-minute Box Breathing together?";
      } else if (lower.includes('work') || lower.includes('stress') || lower.includes('deadline')) {
        sageResponse = "Work pressure can build up so quietly in our muscles and mind. Let's ground ourselves first. What feels heaviest right now—thoughts or your body?";
      } else if (lower.includes('tense') || lower.includes('tight') || lower.includes('chest')) {
        sageResponse = "I notice that physical tightness often speaks before our thoughts do. Let's do a body check-in to release your shoulders and soften your breath.";
      } else if (lower.includes('breathe') || lower.includes('breathing')) {
        sageResponse = "Yes, let's anchor ourselves. Deep inhale for 4 seconds, hold, and gently let it go. We can open the interactive breathing exercise anytime.";
      } else if (lower.includes('danger') || lower.includes('unsafe') || lower.includes('sos') || lower.includes('emergency')) {
        sageResponse = "Satwik, if you feel in immediate danger or severe crisis, please tap the SOS button above or let me activate your safety net right now. Your safety comes first.";
      } else {
        sageResponse = "Thank you for sharing that with me gently. Har feeling ko observe karo bina judge kiye. How can I best support you in this moment?";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `sage-${Date.now()}`,
          sender: 'sage',
          text: sageResponse,
          time: getCurrentTime()
        }
      ]);
      setIsTyping(false);
    }, 1100);
  };

  const handleMicToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice capture
      setTimeout(() => {
        setInputText("I am feeling a little tense in my chest right now.");
        setIsRecording(false);
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pb-24">
      {/* Sage Companion Profile Header */}
      <div className="p-4 pt-2">
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface-container-low border border-[#424844]/20 shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center mb-2 shadow-inner">
            <span className="material-symbols-outlined text-[24px]">spa</span>
          </div>
          <h2 className="font-headline-md text-2xl text-on-surface font-normal">
            Sage
          </h2>
          <p className="font-body-sm text-on-surface-variant text-xs mt-0.5">
            Your wellbeing companion · Always here
          </p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pt-2 pb-4">
        {messages.map(msg => {
          const isSage = msg.sender === 'sage';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${
                isSage ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Sage Avatar on left */}
              {isSage && (
                <div className="w-8 h-8 rounded-full bg-primary-fixed/30 text-primary flex items-center justify-center flex-shrink-0 mb-1 border border-primary/20">
                  <span className="material-symbols-outlined text-[16px]">spa</span>
                </div>
              )}

              <div className="flex flex-col max-w-[82%]">
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    isSage
                      ? 'bg-surface-container text-on-surface rounded-bl-sm border border-[#424844]/25'
                      : 'bg-[#b3cdbb] text-[#182e22] rounded-br-sm font-medium'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Timestamp */}
                <span
                  className={`text-[11px] text-on-surface-variant/70 mt-1 px-1 ${
                    isSage ? 'text-left' : 'text-right'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-on-surface-variant">
            <div className="w-8 h-8 rounded-full bg-primary-fixed/30 text-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">spa</span>
            </div>
            <div className="bg-surface-container py-3 px-4 rounded-2xl rounded-bl-sm flex items-center gap-1.5 border border-[#424844]/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Response Chips Carousel */}
      <div className="px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
        {QUICK_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="flex-shrink-0 px-3.5 py-2 rounded-full bg-surface-container hover:bg-surface-container-high border border-[#424844]/30 text-on-surface text-xs font-medium transition-all hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap shadow-sm"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Action Menu Popover when '+' is clicked */}
      {showActionMenu && (
        <div className="mx-4 mb-2 p-3 rounded-xl bg-surface-container-high border border-[#424844]/40 shadow-xl flex flex-col gap-2 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider px-2 py-1">
            Gentle Support Tools
          </div>
          <button
            onClick={() => {
              setShowActionMenu(false);
              onNavigateToCheckin();
            }}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container text-left text-sm text-on-surface transition-colors cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-primary-fixed/30 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">spa</span>
            </span>
            <div>
              <div className="font-medium">1-Minute Box Breathing</div>
              <div className="text-xs text-on-surface-variant">Calm racing thoughts & heart rate</div>
            </div>
          </button>

          <button
            onClick={() => {
              setShowActionMenu(false);
              onNavigateToCheckin();
            }}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container text-left text-sm text-on-surface transition-colors cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-secondary-fixed/30 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
            </span>
            <div>
              <div className="font-medium">Pause & Sensation Check-In</div>
              <div className="text-xs text-on-surface-variant">Map where you feel it in your body</div>
            </div>
          </button>

          <button
            onClick={() => {
              setShowActionMenu(false);
              onOpenSOSModal();
            }}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-error-container/20 text-left text-sm text-error transition-colors cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">sos</span>
            </span>
            <div>
              <div className="font-medium text-error">Emergency Safety Protocol</div>
              <div className="text-xs text-error/80">Activate crisis verification & trusted contacts</div>
            </div>
          </button>
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <div className="p-4 pt-1">
        <div className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-surface-container-low border border-[#424844]/40 shadow-md">
          {/* Plus action button */}
          <button
            id="chat-action-menu-btn"
            onClick={() => setShowActionMenu(!showActionMenu)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            title="Mindful tools"
          >
            <span className={`material-symbols-outlined text-[22px] transition-transform ${showActionMenu ? 'rotate-45' : ''}`}>
              add_circle
            </span>
          </button>

          {/* Text input */}
          <input
            id="chat-message-input"
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Type your thoughts gently."
            className="flex-1 bg-transparent border-0 text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none px-1"
          />

          {/* Microphone button */}
          <button
            id="chat-mic-btn"
            onClick={handleMicToggle}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isRecording
                ? 'bg-error text-on-error animate-pulse'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            title="Speak your thoughts"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isRecording ? 'graphic_eq' : 'mic'}
            </span>
          </button>

          {/* Send button */}
          <button
            id="chat-send-btn"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Send message"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
