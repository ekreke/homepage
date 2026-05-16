"use client";

import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { projects } from "@/config/projects";
import { useLanguage } from "@/components/shared/LanguageProvider";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "介绍一下你自己",
  "你有哪些项目经验？",
  "你的技术栈是什么？",
  "如何联系你？",
];

export default function ChatGPTPage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (lower.includes("项目") || lower.includes("project") || lower.includes("作品")) {
      return `我参与过多个项目，包括：\n\n${projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.description}`).join("\n\n")}`;
    }
    if (lower.includes("技术") || lower.includes("skill") || lower.includes("栈")) {
      return `我的核心技术栈包括：${siteConfig.skills.join("、")}。我专注于构建美观且功能强大的数字体验。`;
    }
    if (lower.includes("联系") || lower.includes("contact") || lower.includes("找到")) {
      return `你可以通过以下方式联系我：\n\n- Bento: ${siteConfig.links.bento}\n- Blog: ${siteConfig.links.blog}\n- GitHub: ${siteConfig.links.github}`;
    }
    if (lower.includes("你好") || lower.includes("hi") || lower.includes("hello") || lower.includes("介绍")) {
      return `你好！我是 ${siteConfig.name}，${siteConfig.tagline}。\n\n${siteConfig.bio}`;
    }
    return `我是 ${siteConfig.name} 的 AI 助手。你可以问我关于他的工作、技能、项目或联系方式。`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(userMessage.content),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#343541] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50 bg-[#343541]">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← 返回首页
        </Link>
        <h1 className="text-sm font-medium">{siteConfig.name} AI</h1>
        <div className="w-16" />
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-8">{t.chat.welcome}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(q);
                    inputRef.current?.focus();
                  }}
                  className="p-3 rounded-lg border border-gray-600/50 bg-gray-700/30 hover:bg-gray-700/50 transition-colors text-left text-sm text-gray-300"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="pb-32">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`py-6 px-4 ${
                  msg.role === "assistant" ? "bg-[#444654]" : "bg-[#343541]"
                }`}
              >
                <div className="max-w-3xl mx-auto flex gap-4">
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium ${
                      msg.role === "assistant"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {msg.role === "assistant" ? "AI" : "U"}
                  </div>
                  <div className="flex-1 text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="py-6 px-4 bg-[#444654]">
                <div className="max-w-3xl mx-auto flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-medium text-green-500">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-700/50 bg-[#343541] px-4 py-4">
        <div className="max-w-3xl mx-auto relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chat.placeholder}
            rows={1}
            className="w-full bg-[#40414F] rounded-lg pl-4 pr-12 py-3 text-sm text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-gray-500"
            style={{ minHeight: "44px", maxHeight: "200px" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-1.5 rounded-md bg-green-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          AI 可能会生成不准确的信息，请核实重要信息。
        </p>
      </div>
    </div>
  );
}
