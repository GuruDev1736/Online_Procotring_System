import React, { useState, useRef, useEffect } from 'react';
import { 
  FaRobot, 
  FaPaperPlane, 
  FaTimes, 
  FaComments,
  FaUser,
  FaSpinner,
  FaBookOpen,
  FaQuestionCircle,
  FaCog,
  FaLightbulb
} from 'react-icons/fa';

const AIChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your AI assistant for ProctorAI. I can help you with exam preparation, platform guidance, technical support, and answer any questions about our proctoring system. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: FaBookOpen, text: "Exam Tips", action: "exam_tips" },
    { icon: FaQuestionCircle, text: "How it Works", action: "how_it_works" },
    { icon: FaCog, text: "Technical Help", action: "technical_help" },
    { icon: FaLightbulb, text: "Best Practices", action: "best_practices" }
  ];

  const predefinedResponses = {
    exam_tips: "Here are some essential exam tips:\n\n• Ensure good lighting and a quiet environment\n• Have a reliable internet connection\n• Keep your ID document ready\n• Clear your desk of unauthorized materials\n• Position your camera at eye level\n• Test your microphone and camera beforehand\n• Close unnecessary applications\n• Have backup internet (mobile hotspot) ready",
    
    how_it_works: "ProctorAI uses advanced AI technology to monitor exams:\n\n• Face detection ensures you remain visible\n• Audio monitoring detects unusual sounds\n• Screen recording prevents tab switching\n• Eye movement tracking detects suspicious behavior\n• Browser lockdown prevents cheating\n• Real-time alerts for supervisors\n• Detailed exam reports\n• Secure data encryption",
    
    technical_help: "Common technical solutions:\n\n• Camera not working: Check browser permissions and restart browser\n• Microphone issues: Ensure it's not muted and check system settings\n• Connection problems: Test your internet speed (minimum 1 Mbps)\n• Browser compatibility: Use Chrome, Firefox, or Edge latest versions\n• Screen sharing: Allow browser permissions when prompted\n• Performance issues: Close other applications and tabs\n• Login problems: Clear cache and cookies",
    
    best_practices: "Best practices for online exams:\n\n• Join 15 minutes early for system checks\n• Use a desktop/laptop instead of mobile\n• Maintain eye contact with the camera\n• Speak clearly if verbal responses are required\n• Don't look away from the screen frequently\n• Keep hands visible while typing\n• Read instructions carefully\n• Stay calm and focused\n• Have water nearby to stay hydrated"
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords and provide relevant responses
    if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return "I can help you prepare for your exam! Here are some key things to remember:\n\n• Make sure your environment is well-lit and quiet\n• Test your camera and microphone beforehand\n• Have your ID ready for verification\n• Ensure stable internet connection\n\nWould you like specific tips for exam day or technical setup?";
    }
    
    if (lowerMessage.includes('camera') || lowerMessage.includes('video')) {
      return "For camera setup:\n\n• Position camera at eye level\n• Ensure good lighting on your face\n• Test camera in browser beforehand\n• Make sure background is clear\n• Keep your face visible throughout\n\nIf you're having camera issues, try refreshing your browser or checking permissions.";
    }
    
    if (lowerMessage.includes('audio') || lowerMessage.includes('microphone') || lowerMessage.includes('sound')) {
      return "For audio setup:\n\n• Test your microphone before the exam\n• Ensure it's not muted\n• Speak clearly if verbal responses are needed\n• Minimize background noise\n• Have a backup headset if possible\n\nIf audio isn't working, check your browser permissions and system settings.";
    }
    
    if (lowerMessage.includes('connection') || lowerMessage.includes('internet') || lowerMessage.includes('network')) {
      return "For stable connection:\n\n• Minimum 1 Mbps upload/download speed required\n• Use wired connection if possible\n• Close bandwidth-heavy applications\n• Have mobile hotspot as backup\n• Test connection speed beforehand\n\nI recommend running a speed test before your exam starts.";
    }
    
    if (lowerMessage.includes('browser') || lowerMessage.includes('chrome') || lowerMessage.includes('firefox')) {
      return "Browser requirements:\n\n• Use Chrome, Firefox, or Edge (latest versions)\n• Enable camera and microphone permissions\n• Disable pop-up blockers for our site\n• Clear cache if experiencing issues\n• Ensure JavaScript is enabled\n• Close unnecessary tabs and extensions";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('problem')) {
      return "I'm here to help! I can assist with:\n\n• Exam preparation and tips\n• Technical setup and troubleshooting\n• Platform features and guidelines\n• Best practices for online exams\n• System requirements\n\nWhat specific area would you like help with?";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm your AI assistant for ProctorAI. I'm here to help you succeed in your online exams. I can provide:\n\n• Technical support\n• Exam preparation tips\n• Platform guidance\n• Best practices\n\nWhat would you like to know?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm always here to help. If you have any other questions about exams, technical setup, or our platform, feel free to ask. Good luck with your exams! 🎓";
    }
    
    // Default response
    return "I understand you're asking about: \"" + userMessage + "\"\n\nI can help you with:\n• Exam preparation and setup\n• Technical troubleshooting\n• Platform features\n• Best practices\n\nCould you be more specific about what you'd like to know? You can also use the quick action buttons below for common topics.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: generateBotResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    const response = predefinedResponses[action];
    if (response) {
      const botMessage = {
        id: Date.now(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 relative"
        >
          <FaComments className="text-xl" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-96 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-full">
                <FaRobot className="text-lg" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">Online • ProctorAI Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FaRobot className="text-blue-600 text-sm" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="p-2 bg-gray-200 rounded-full">
                      <FaUser className="text-gray-600 text-sm" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FaRobot className="text-blue-600 text-sm" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center space-x-2 p-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <action.icon className="text-blue-600" />
                  <span className="text-gray-700">{action.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-xl transition-colors"
              >
                {isTyping ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbox;
