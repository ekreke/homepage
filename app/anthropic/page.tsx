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
  "Tell me about yourself",
  "What projects have you worked on?",
  "What is your tech stack?",
  "How can I contact you?",
];

export default function AnthropicPage() {
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
    if (
      lower.includes("project") ||
      lower.includes("作品") ||
      lower.includes("项目")
    ) {
      return `Here are some projects I've worked on:\n\n${projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.description}`).join("\n\n")}`;
    }
    if (
      lower.includes("skill") ||
      lower.includes("tech") ||
      lower.includes("stack") ||
      lower.includes("技术")
    ) {
      return `My core skills include ${siteConfig.skills.join(", ")}. I focus on building beautiful and functional digital experiences.`;
    }
    if (
      lower.includes("contact") ||
      lower.includes("reach") ||
      lower.includes("find") ||
      lower.includes("联系")
    ) {
      return `You can reach me through:\n\n- Bento: ${siteConfig.links.bento}\n- Blog: ${siteConfig.links.blog}\n- GitHub: ${siteConfig.links.github}`;
    }
    if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("about") ||
      lower.includes("introduce") ||
      lower.includes("介绍")
    ) {
      return `Hello! I'm ${siteConfig.name}, ${siteConfig.tagline}.\n\n${siteConfig.bio}`;
    }
    return `I'm an AI assistant for ${siteConfig.name}. Feel free to ask about his work, skills, projects, or how to get in touch.`;
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
    <div className="flex flex-col h-screen bg-[#FAF9F6] text-[#1A1A1A]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#E8E6E1] bg-[#FAF9F6]">
        <Link
          href="/"
          className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-sm font-medium">{siteConfig.name}</h1>
        <div className="w-20" />
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6">
            <div className="mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-white text-lg font-bold">A</span>
              </div>
            </div>
            <h2 className="text-3xl font-light mb-10 text-center max-w-md">
              {t.chat.welcome}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(q);
                    inputRef.current?.focus();
                  }}
                  className="p-4 rounded-xl border border-[#E8E6E1] bg-white hover:bg-[#F5F3EF] hover:border-[#D4D0C8] transition-all text-left text-sm text-[#4A4A4A]"
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
                className="py-6 px-6"
              >
                <div className="max-w-3xl mx-auto flex gap-5">
                  <div
                    className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
                      msg.role === "assistant"
                        ? "bg-[#1A1A1A] text-white"
                        : "bg-[#E8E6E1] text-[#1A1A1A]"
                    }`}
                  >
                    {msg.role === "assistant" ? "A" : "U"}
                  </div>
                  <div className="flex-1 text-[15px] leading-7 whitespace-pre-wrap text-[#1A1A1A]">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="py-6 px-6">
                <div className="max-w-3xl mx-auto flex gap-5">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-xs font-semibold text-white">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#C4C0B8] animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-[#C4C0B8] animate-bounce [animation-delay:0.15s]" />
                      <div className="w-2 h-2 rounded-full bg-[#C4C0B8] animate-bounce [animation-delay:0.3s]" />
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
      <div className="border-t border-[#E8E6E1] bg-[#FAF9F6] px-6 py-5">
        <div className="max-w-3xl mx-auto relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chat.placeholder}
            rows={1}
            className="w-full bg-white border border-[#E8E6E1] rounded-xl pl-5 pr-14 py-3.5 text-[15px] text-[#1A1A1A] placeholder-[#9B9B9B] resize-none focus:outline-none focus:border-[#C4C0B8] focus:ring-1 focus:ring-[#C4C0B8] shadow-sm"
            style={{ minHeight: "52px", maxHeight: "200px" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-3 p-2 rounded-lg bg-[#1A1A1A] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#333333] transition-colors"
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
        <p className="text-center text-xs text-[#9B9B9B] mt-3">
          AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
}
